var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Socket管理类
 * @author chenkai
 * @date 2016/6/28
 *
 * 1 连接socket
 * 2 注册回调
 * 3 断线重连
 */
var ClientSocket = (function () {
    function ClientSocket() {
        this.name = ""; //socket名字，用于判断push和game
        this.callBackList = {}; //回调列表
        this.objList = {}; //执行对象列表
        this.reconnecting = false; //是否断线重连中，重连中时不派发连接错误事件
        this.reconInvalTime = 3000; //断线重连时间间隔
        this.curReconnectCount = 0; //当前断线重连次数
        this.reconnenctLimit = 5; //断线重连限制次数
        this.bAllowReconnnect = false; //是否允许断线重连
        this.protoBuffer = ""; //断线时，协议缓存
        this.dataBuffer = null; //断线时，数据缓存
        this.url = ""; //IP地址
        this.headSize = 12; //头大小
    }
    /**
     * 注册通讯回调
     * @param proto 协议
     * @param callBack 回调函数
     * @param thisObject 回调函数绑定对象
     */
    ClientSocket.prototype.register = function (proto, callBack, thisObject) {
        this.callBackList[proto] = callBack;
        this.objList[proto] = thisObject;
    };
    /**
     * 取消注册
     * @param proto 协议
     */
    ClientSocket.prototype.unRegister = function (proto) {
        delete this.callBackList[proto];
        delete this.objList[proto];
    };
    /**
     * 开始连接socket
     * @url IP地址
     * @bAllowReconnnect 是否允许断线重连
     * @serverType  服务器类型
     */
    ClientSocket.prototype.startConnect = function (url, bAllowReconnnect, serverType) {
        if (bAllowReconnnect === void 0) { bAllowReconnnect = false; }
        if (serverType === void 0) { serverType = 1; }
        console.log("开始连接" + this.name + ":" + url);
        this.url = url;
        this.serverType = serverType;
        this.bAllowReconnnect = bAllowReconnnect;
        this.createSocket();
        this.socket.connectByUrl(url);
    };
    //创建socket; egret引擎bug，不重新创建socket就不派发事件。
    ClientSocket.prototype.createSocket = function () {
        if (this.socket) {
            this.socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecieve, this);
            this.socket.connected && this.socket.close();
        }
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecieve, this);
    };
    //连接成功
    ClientSocket.prototype.onConnect = function (e) {
        egret.log(this.name + " connect success");
        this.resetReconnenct();
        App.EventManager.sendEvent(EventConst.SocketConnect, this);
    };
    //连接关闭
    ClientSocket.prototype.onClose = function (e) {
        egret.log(this.name + " close");
        //socket断开，派发事件，重启游戏
        App.EventManager.sendEvent(EventConst.SocketClose, this);
        // //如果无重连动作，派发关闭事件,并重置重连
        // if(this.bAllowReconnnect == false || (this.bAllowReconnnect && (this.curReconnectCount > this.reconnenctLimit))){
        //     this.resetReconnenct();
        //     App.EventManager.sendEvent(EventConst.SocketClose, this);
        // }
    };
    //连接错误
    ClientSocket.prototype.onError = function (e) {
        egret.log(this.name + " error");
        App.PanelManager.open(PanelConst.SocketClosePanel, null, null, false);
        // //如果无重连动作，则派发错误事件
        // if(this.tryReconnect() == false){
        //     App.EventManager.sendEvent(EventConst.SocketIOError,this); 
        // } 
    };
    /**
     * 尝试断线重连
     * @return 是否进行重连
     */
    ClientSocket.prototype.tryReconnect = function () {
        //不允许断线重连
        if (this.bAllowReconnnect == false) {
            return false;
        }
        //断线重连
        this.curReconnectCount++;
        if (this.curReconnectCount <= this.reconnenctLimit) {
            //如果第一次重连，则派发事件
            if (this.curReconnectCount == 1) {
                App.EventManager.sendEvent(EventConst.StartReconnect, this);
            }
            //开始断线重连
            egret.setTimeout(this.startConnect, this, this.reconInvalTime, this.url, true);
            return true;
        }
        return false;
    };
    //主动关闭Socket，不派发事件
    ClientSocket.prototype.close = function () {
        if (this.socket) {
            this.socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecieve, this);
            this.socket.connected && this.socket.close();
        }
        this.resetReconnenct();
        this.dataBuffer = null;
        this.protoBuffer = null;
    };
    //重置重连
    ClientSocket.prototype.resetReconnenct = function () {
        this.reconnecting = false;
        this.curReconnectCount = 0;
    };
    /**是否已连接*/
    ClientSocket.prototype.isConnected = function () {
        if (this.socket && this.socket.connected) {
            return true;
        }
        return false;
    };
    /**
     * 发送数据
     * @param data 待发送json数据
     * @param d1 协议号1
     * @param d2 协议号2
     */
    ClientSocket.prototype.send = function (proto, data) {
        if (data === void 0) { data = {}; }
        if (this.socket && this.socket.connected) {
            var sendDataByte = new egret.ByteArray();
            var sendJson = JSON.stringify(data);
            sendDataByte.writeUTFBytes(sendJson);
            var size = this.headSize + sendDataByte.length;
            var protoList = proto.split("_");
            var head = this.getHead(size, protoList[0]);
            head.writeBytes(sendDataByte);
            this.socket.writeBytes(head);
            this.socket.flush();
            console.log("Send:", MatchCode.MecthProto(proto), proto, JSON.stringify(data));
        }
        else {
            egret.log("socket is not connected");
            this.dataBuffer = data;
            this.protoBuffer = proto;
            App.EventManager.sendEvent(EventConst.SocketNotConnect, this);
            App.PanelManager.open(PanelConst.SocketClosePanel, null, null, false);
        }
    };
    //接收数据
    ClientSocket.prototype.onRecieve = function (e) {
        // console.log("--------------------------------------")
        var b = new egret.ByteArray();
        b.endian = egret.Endian.LITTLE_ENDIAN;
        this.socket.readBytes(b);
        this.process(b);
    };
    /**
     * 解析数据
     * @param b 待解析数据
     */
    ClientSocket.prototype.process = function (b) {
        var size = b.readInt();
        if (size != b.length) {
            console.log("数据错误!!");
            return;
        }
        var id1 = b.readInt();
        var reserve2 = b.readInt();
        var str = b.readUTFBytes(b.length - this.headSize);
        var data;
        if ("" != str) {
            data = JSON.parse(str);
        }
        var proto = id1 + "";
        var callBack = this.callBackList[proto];
        var thisObject = this.objList[proto];
        console.log("rev:", MatchCode.MecthProto(proto), proto, data);
        if (callBack && thisObject) {
            callBack.call(thisObject, data);
        }
        else {
            console.log("不存在对应消息:", proto);
        }
    };
    /**
     * 消息头部
     * @param size 数据长度
     * @param id1
     * @param id2
     */
    ClientSocket.prototype.getHead = function (size, id1) {
        var a = new egret.ByteArray();
        a.endian = egret.Endian.LITTLE_ENDIAN;
        a.writeInt(size);
        a.writeInt(id1);
        a.writeInt(0);
        return a;
    };
    return ClientSocket;
}());
__reflect(ClientSocket.prototype, "ClientSocket");
