var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅模块
 * @author chenkai
 * @date 2016/11/4
 */
var HallController = (function (_super) {
    __extends(HallController, _super);
    function HallController() {
        var _this = _super.call(this) || this;
        _this.isReconnection = false;
        _this.isLogin = false;
        /**记录发送请求的商品ID */
        _this.buyPropRecData = null;
        return _this;
    }
    //注册时调用
    HallController.prototype.onRegister = function () {
        this.addEvent(HallController.EVENT_SHOW_HALL, this.showHallScene, this);
        // this.addEvent(EventConst.GameStateChange, this.changeGameState, this);
    };
    //游戏状态更改
    HallController.prototype.changeGameState = function (state) {
        if (App.DataCenter.gameState != state) {
            App.DataCenter.gameState = state;
        }
    };
    //移除注册时调用
    HallController.prototype.onRemove = function () {
    };
    /**显示大厅*/
    HallController.prototype.showHallScene = function () {
        this.hallScene = App.SceneManager.runScene(SceneConst.HallScene, this);
        this.hallScene.chargeBase();
    };
    //注册socket
    HallController.prototype.registerSocket = function () {
        var gameSocket = App.gameSocket;
        gameSocket.register(ProtocolHead.Rev100_3_8, this.revLoginError, this);
        gameSocket.register(ProtocolHead.Send100010, this.revReconnection, this); //断线重连
        gameSocket.register(ProtocolHead.Send100002, this.revWLogin, this);
        gameSocket.register(ProtocolHead.Send100120, this.revMatchRoom, this); //进入匹配场返回
        gameSocket.register(ProtocolHead.Send100110, this.revFriendRoom, this); //进入好友房返回
        gameSocket.register(ProtocolHead.Send101000, this.revFriendRoomCreate, this); //创建好友房返回
        gameSocket.register(ProtocolHead.Send101001, this.revJoinFriendRoom, this); //加入好友房返回
        gameSocket.register(ProtocolHead.Rev100013, this.revOtherLogin, this); //其他人登录，被挤下线
        gameSocket.register(ProtocolHead.Rev101003, this.revUserJoin, this); //广播通知有玩家进入好友房桌子
        // gameSocket.register(ProtocolHead.Rev102_4_1, this.revInRoom, this);
        // gameSocket.register(ProtocolHead.Rev121_1_0,this.revSelfRoom,this);        
        // gameSocket.register(ProtocolHead.Rev102_8_1,this.revInDesk,this);
        // gameSocket.register(ProtocolHead.Rev104_10_1,this.revGetDesk,this);
        // gameSocket.register(ProtocolHead.Rev121_2_0,this.onSelfRoomEmpty,this);     
        // gameSocket.register(ProtocolHead.Rev120_1_1,this.RevRoomChange,this);
        // gameSocket.register(ProtocolHead.Rev120_1_2,this.RevBCRoomChange,this);  
        // gameSocket.register(ProtocolHead.Rev200_1_1, this.revGameServer, this);
        // gameSocket.register(ProtocolHead.Rev200_2_1,this.revCheckRoom,this);
        // gameSocket.register(ProtocolHead.Rev182_1_0, this.revPushLogin, this);
        // gameSocket.register(ProtocolHead.Rev182_0_0, this.revPushMessage, this);
        //socket连接成功事件
        this.addEvent(EventConst.SocketConnect, this.onSocketConnect, this);
        //socket连接错误事件
        this.addEvent(EventConst.SocketIOError, this.onSocketError, this);
    };
    HallController.prototype.unRegistSocket = function () {
        var gameSocket = App.gameSocket;
        gameSocket.unRegister(ProtocolHead.Rev100_3_8);
        gameSocket.unRegister(ProtocolHead.Send100010);
        gameSocket.unRegister(ProtocolHead.Rev100_2_1);
        gameSocket.unRegister(ProtocolHead.Rev102_4_1);
        gameSocket.unRegister(ProtocolHead.Gag111_2_1);
        gameSocket.unRegister(ProtocolHead.Rev121_1_0);
        //gameSocket.unRegister(ProtocolHead.Rev120_1_1);
        gameSocket.unRegister(ProtocolHead.Rev120_1_2);
        gameSocket.unRegister(ProtocolHead.Rev200_1_1);
        gameSocket.unRegister(ProtocolHead.Rev182_1_0);
        gameSocket.unRegister(ProtocolHead.Rev182_0_0);
        this.removeEvent(EventConst.SocketConnect, this.onSocketConnect, this);
        this.removeEvent(EventConst.SocketIOError, this.onSocketError, this);
    };
    /**socket连接成功*/
    HallController.prototype.onSocketConnect = function (socket) {
        console.log(socket.name + " hall connenct success");
        //调度服务器连接成功，去获取游戏服务器
        // if (socket == App.gameSocket) {
        //     App.MsgBoxManager.recycleAllBox();            
        //     if(this.curDeskId){
        //         this.sendCheckRoom();
        //     }else{
        //         //加入自己房间
        //         if(Server_Type.createRoom == App.gameSocket.serverType){
        //             this.sendGetGameServer();
        //         //加入别人房间
        //         }else if(Server_Type.joinRoom == App.gameSocket.serverType){
        //             this.sendCheckRoom();       
        //         }
        //     }
        // }
        //游戏服务器连接成功，发送登录请求
        if (socket == App.gameSocket && !this.isLogin) {
            this.sendWLogin();
        }
        //推送服务器连接成功，发送登录请求
        // if (socket == App.gameSocket) {
        //     this.sendPushLogin();
        // }
    };
    /**socket连接错误*/
    HallController.prototype.onSocketError = function (socket) {
        if (socket == App.gameSocket) {
            App.MsgBoxManager.recycleAllBox();
            var messageBox = App.MsgBoxManager.getBoxB();
            messageBox.showMsg("网络连接失败，请检查您的网络。");
        }
    };
    //***********************************************************************
    //------------------------ Socket通讯-------------------------------------
    //------------------------ Socket通讯-------------------------------------
    //------------------------ Socket通讯-------------------------------------
    //************************************************************************
    /**发送获取游戏服务器*/
    HallController.prototype.sendGetGameServer = function () {
        console.log("发送获取游戏服务器");
        var data = ProtocolData.Send200_1_0;
        data.serverType = App.gameSocket.serverType;
        data.userid = App.DataCenter.UserInfo.httpUserInfo.userID;
        data.gameid = Game_ID.selfRoom;
        data.deskCode = this.curRoomid;
        //查询房间所在游戏服务器
        App.gameSocket.send(ProtocolHead.Send200_1_0, data);
    };
    /**接收匹配房返回 */
    HallController.prototype.revMatchRoom = function (data) {
        App.LoadingLock.unlock();
        var json = ProtocolData.Rev100120;
        json = data;
        if (json && json.info && json.info.chat_room_id) {
            App.NativeBridge.sendJoinRoom({ roomId: json.info.chat_room_id });
        }
        if (data.code == 200) {
            console.log("进入匹配房成功");
            var len = json.info.userList.length;
            var info = json.info;
            for (var i = 0; i < len; i++) {
                var to_game = ProtocolData.to_game;
                to_game = JSON.parse(info.userList[i]);
                var userVO = App.DataCenter.UserInfo.getUser(to_game.userid);
                if (userVO == null) {
                    userVO = new UserVO();
                    userVO.userID = to_game.userid;
                    App.DataCenter.UserInfo.addUser(userVO);
                }
                userVO.nickName = to_game.nickname;
                userVO.seatID = to_game.deskstation;
                userVO.headUrl = to_game.avater;
                userVO.sex = to_game.sex;
                userVO.gold = to_game.money;
                userVO.point = to_game.point;
            }
            this.hallScene.intoMatchRoom();
        }
        else {
            var desc = data.info.desc;
            TipsLog.hallInfo(desc);
        }
        ;
        // if (data.code == 3002 || data.code == 3003) {
        //     var desc = data.info.desc;
        //     TipsLog.hallInfo(desc);
        // }
    };
    /**接收好友房返回 */
    HallController.prototype.revFriendRoom = function (data) {
        var json = ProtocolData.Rev100120;
        json = data;
        if (json && json.info && json.info.chat_room_id) {
            App.NativeBridge.sendJoinRoom({ roomId: json.info.chat_room_id });
        }
        if (data.code == 200) {
            console.log("进入好友房成功");
            var len = json.info.userList.length;
            var info = json.info;
            for (var i = 0; i < len; i++) {
                var to_game = ProtocolData.to_game;
                to_game = JSON.parse(info.userList[i]);
                var userVO = App.DataCenter.UserInfo.getUser(to_game.userid);
                if (userVO == null) {
                    userVO = new UserVO();
                    userVO.userID = to_game.userid;
                    App.DataCenter.UserInfo.addUser(userVO);
                }
                userVO.nickName = to_game.nickname;
                userVO.seatID = to_game.deskstation;
                userVO.headUrl = to_game.avater;
                userVO.sex = to_game.sex;
                userVO.gold = to_game.money;
                userVO.point = to_game.point;
            }
            //重置准备
            var userVo = App.DataCenter.UserInfo.getMyUserVo();
            userVo && (userVo.setState(PLAYER_STATE.READY, false));
            this.hallScene.intoFriendRoom();
        }
        ;
        if (data.code == 3002 || data.code == 3003) {
            var desc = data.info.desc;
            TipsLog.hallInfo(desc);
        }
    };
    /**接收获取游戏服务器*/
    HallController.prototype.revGameServer = function (data) {
        console.log("接收游戏服务器");
        //关闭调度服务器
        // App.gameSocket.close();
        var json = ProtocolData.Rev200_1_1;
        json = data;
        if (!json.retCode) {
            var ip = "ws://" + json.host + ":" + json.port;
            App.DataCenter.ServerInfo.GAME_SERVER = json.host;
            App.DataCenter.ServerInfo.GAME_PORT = json.port;
            App.gameSocket.startConnect(ip);
        }
        else if (json.retCode == 1) {
            TipsLog.hallInfo("房主不在线,返回自己的房间");
            this.sendSelfRoom();
        }
    };
    /**查询房间是否存在**/
    HallController.prototype.sendCheckRoom = function () {
        var data = ProtocolData.Send200_2_0;
        data.deskCode = this.curRoomid;
        data.gameid = Game_ID.selfRoom;
        App.gameSocket.send(ProtocolHead.Send200_2_0, data);
    };
    /**返回房间是否存在**/
    HallController.prototype.revCheckRoom = function (data) {
        var _this = this;
        var info = ProtocolData.Rev200_2_1;
        info = data;
        if (info.isExist) {
            //必须先断开连接,房间可能在不同游戏服务器里面
            console.log("game socket close!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            // App.gameSocket.close();
            egret.setTimeout(function () { _this.sendGetGameServer(); }, this, 200);
        }
        else {
            //通过链接进入,不存在将返回自己房间
            if (this.curDeskId) {
                TipsLog.hallInfo("房主不在线,房间已关闭,您已回到自己房间");
                this.sendSelfRoom();
            }
            else {
                TipsLog.hallInfo("房间不存在");
            }
        }
    };
    /**发送登录游戏服务器*/
    HallController.prototype.sendWLogin = function () {
        var data = ProtocolData.Send100002;
        data.userid = App.DataCenter.UserInfo.httpUserInfo.userID;
        data.pass = App.DataCenter.ServerInfo.MD5PASS;
        App.gameSocket.send(ProtocolHead.Send100002, data);
    };
    /**游戏服务器登录成功,服务器此时会发送该房间下所有的桌子信息 ,如果是断线重连则等待断线重连消息,revSelfRoom*/
    HallController.prototype.revWLogin = function (data) {
        // var info = ProtocolData.to_game;
        // info = data;
        // console.log("登录成功,是否断线重连:" + info.reconnect);
        // this.isReconnection=false;
        // if (info.reconnect) {
        //     this.isReconnection = true;
        //     TipsLog.hallInfo("~~嗷嗷~~断线重连中~~~~~~")
        // } else {
        //     App.MsgBoxManager.recycleAllBox();        
        // }
        // var info = ProtocolData.to_game;
        var info = ProtocolData.Rev100002;
        info = data;
        if (data.code == 200) {
            console.log("登录成功,是否断线重连:" + data.info.reconnect);
            this.isReconnection = false;
            this.isLogin = true;
            if (data.info.reconnect) {
                this.isReconnection = true;
                TipsLog.hallInfo("断线重连中~~~~~~");
                // let json = JSON.parse(data.info.data);
                var room_name = data.info.room_name;
                var desk_code = data.info.desk_code;
                console.log("*****" + desk_code);
                if (desk_code != -1) {
                    App.DataCenter.roomInfo.roomType = RoomType.FriendRoom;
                    App.DataCenter.deskInfo.deskID = parseInt(desk_code);
                    this.room_type = RoomType.FriendRoom;
                    this.SendReconnection(room_name);
                }
                else if (desk_code == -1) {
                    App.DataCenter.roomInfo.roomType = RoomType.MatchRoom;
                    this.room_type = RoomType.MatchRoom;
                    this.SendReconnection(room_name);
                }
            }
            else {
                this.judgeInvite();
            }
        }
    };
    /***接收房间桌子列表,这里接受的是自己的桌子信息**/
    HallController.prototype.revSelfRoom = function (data) {
        var info = ProtocolData.Rev121_1_0;
        info = data;
        var roomId = this.curRoomid;
        if (!this.isReconnection) {
            console.log("当前房间号_________________:", roomId);
            var deskId = 1;
            if (this.curDeskId)
                deskId = this.curDeskId;
            this.sendInRoom(roomId, deskId);
        }
    };
    /**
 * 发送进入房间
 * @deskID 房间号
 */
    HallController.prototype.sendInRoom = function (roomId, deskId) {
        var data = ProtocolData.Send102_4_0;
        data.deskCode = roomId;
        data.deskid = deskId;
        App.gameSocket.send(ProtocolHead.Send102_4_0, data);
    };
    /**发送加入房间 */
    HallController.prototype.sendInRoom1 = function (roomId) {
        var data = ProtocolData.Send102_4_0;
        data.deskCode = roomId;
        App.gameSocket.send(ProtocolHead.Send102_4_0, data);
    };
    /**
     * 创建好友房
     */
    HallController.prototype.createFriendRoom = function () {
        var json = ProtocolData.Send101000;
        json.desk_name = App.DataCenter.UserInfo.getMyUserVo().nickName;
        json.deviceID = "111";
        json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        App.gameSocket.send(ProtocolHead.Send101000, json);
    };
    /**接收进入房间*/
    HallController.prototype.revInRoom = function (data) {
        var _this = this;
        //清空非游戏内面板
        App.PanelManager.closeAllPanel();
        App.DataCenter.UserInfo.deleteAllUserExcptMe();
        var info = ProtocolData.Rev102_4_1;
        info = data;
        if (!info.retCode) {
            console.log("进入房间++++++++++++++++++++++++++++++++++++++++++++++++++++++++:" + info);
            App.DataCenter.roomInfo.readDeskList(info.deskLst);
            App.DataCenter.roomInfo.setCurDesk(info.deskno);
            var cur = App.DataCenter.roomInfo.getCurDesk();
            App.DataCenter.deskInfo = cur;
            //保存to_game用户数据
            var len = info.userList.length;
            for (var i = 0; i < len; i++) {
                var to_game = ProtocolData.to_game;
                to_game = JSON.parse(info.userList[i]);
                var userVO = App.DataCenter.UserInfo.getUser(to_game.userid);
                if (userVO == null) {
                    userVO = new UserVO();
                    userVO.userID = to_game.userid;
                    App.DataCenter.UserInfo.addUser(userVO);
                }
                userVO.nickName = to_game.nickname;
                userVO.seatID = to_game.deskstation;
                userVO.headUrl = to_game.avater;
                userVO.sex = to_game.sex;
                userVO.gold = to_game.money;
                userVO.state = to_game.userstate;
            }
            this.hallScene.intoGameDesk();
            console.log("updateDesk_______________________________________________________________________________");
            // this.hallScene.updateCurDeskUI();
            this.sendGetQRCode();
        }
        else if (info.retCode == -11) {
            this.sendSelfRoom();
            TipsLog.hallInfo(MatchCode.getCodeText(ProtocolHead.Rev102_4_1, info.retCode));
        }
        else if (info.retCode == 2 && !this.isReconnection) {
            var nextDeskId_1 = -1;
            for (var i_1 = 0; i_1 < info.deskLst.length; i_1++) {
                var desk = info.deskLst[i_1];
                if (desk.curSitPeopleCoiunt < 4) {
                    nextDeskId_1 = desk.deskID;
                    break;
                }
            }
            if (nextDeskId_1 != -1) {
                var messageBox = App.MsgBoxManager.getBoxA();
                messageBox.ok = function () {
                    _this.sendInRoom(_this.curRoomid, nextDeskId_1);
                };
                if (this.curDeskId) {
                    App.DataCenter.roomInfo.readDeskList(info.deskLst);
                    App.DataCenter.roomInfo.setCurDeskById(this.curDeskId);
                    var cur = App.DataCenter.roomInfo.getCurDesk();
                    App.DataCenter.deskInfo = cur;
                    // this.hallScene.setGameContent(null)
                    // this.hallScene.updateCurDeskUI();
                    messageBox.showMsg("当前麻将桌人数已满,房主其它麻将桌有空位,是否立即前往?");
                }
                else {
                    this.sendSelfRoom(this.curRoomid, nextDeskId_1);
                }
            }
            else {
                App.DataCenter.roomInfo.readDeskList(info.deskLst);
                App.DataCenter.roomInfo.setCurDeskById(this.curDeskId);
                var cur = App.DataCenter.roomInfo.getCurDesk();
                App.DataCenter.deskInfo = cur;
                // this.hallScene.setGameContent(null)
                var messageBox = App.MsgBoxManager.getBoxB();
                messageBox.showMsg("房主所有的麻将桌人数已满！");
            }
        }
        else if (info.retCode == -15) {
            this.hallScene.openReNew();
            App.DataCenter.roomInfo.clean();
        }
        else {
            console.log("进入房间:", info.retCode);
            TipsLog.hallInfo(MatchCode.getCodeText(ProtocolHead.Rev102_4_1, info.retCode));
        }
    };
    /**
     *  进入专属房
     * @param deskCode 房间号;没有房间号进入自己专属房，否则进入别人专属房
     */
    HallController.prototype.sendSelfRoom = function (deskCode, deskId) {
        if (deskCode === void 0) { deskCode = null; }
        if (deskId === void 0) { deskId = null; }
        var serverType;
        App.gameSocket.gameID = Game_ID.selfRoom;
        this.curDeskId = deskId;
        //加入他人专属房
        if (deskCode) {
            serverType = Server_Type.joinRoom;
            this.curRoomid = deskCode;
        }
        else {
            //自己房间
            serverType = Server_Type.createRoom;
            this.curRoomid = App.DataCenter.UserInfo.getMyUserVo().excluroomCode;
        }
        // App.gameSocket.startConnect(App.DataCenter.ServerInfo.SERVER_URL,false,serverType);
    };
    /**
     * 加入桌子
     * @param deskNo 桌子号
     */
    HallController.prototype.sendInDesk = function (deskNo) {
        var info = ProtocolData.Send102_8_0;
        info.deskno = deskNo;
        App.gameSocket.send(ProtocolHead.Send102_8_0, info);
    };
    /**
     * 接受加入桌子返回
     */
    HallController.prototype.revInDesk = function (data) {
        var info = ProtocolData.Rev102_8_1;
        info = data;
    };
    /**
     * 获取桌子信息
     * @param deskNo
     */
    HallController.prototype.sendGetDesk = function (deskNo) {
        var info = ProtocolData.Send104_10_0;
        info.deskNo = deskNo;
        App.gameSocket.send(ProtocolHead.Send104_10_0, info);
    };
    /**
     * 获取桌子信息
     */
    HallController.prototype.revGetDesk = function (data) {
        var info = ProtocolData.Rev104_10_1;
        info = data;
    };
    /**推送服务登陆成功*/
    HallController.prototype.revPushLogin = function (data) {
        console.log("推送服务器登陆成功");
    };
    /**推送消息*/
    HallController.prototype.revPushMessage = function (data) {
    };
    /**
     *  发送房间修改
     */
    HallController.prototype.sendRoomChange = function (infodata) {
        var info = ProtocolData.Send120_1_0;
        info = infodata;
        App.gameSocket.send(ProtocolHead.Send120_1_0, info);
    };
    /**
     * 房主房间修改返回
     * @param data
     */
    HallController.prototype.RevRoomChange = function (data) {
        var info = ProtocolData.Rev120_1_1;
        info = data;
        if (!info.retCode) {
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    /**
     * 接收修改规则初始值
     */
    HallController.prototype.rev100118 = function (data) {
        console.log("修改规则初始值：", data);
        var json = ProtocolData.Rev100117;
        json = data;
        if (json.code == 200) {
            App.PanelManager.open(PanelConst.ModifyRlueT, null, null, true, true, data);
        }
        else {
            if (json.code == 3002 || json.code == 3003) {
                TipsLog.hallInfo(data.info.desc);
            }
        }
    };
    /**
     *  接受房间更改广播,只返回更改的属性
     * @param data
     */
    HallController.prototype.RevBCRoomChange = function (data) {
        TipsLog.hallInfo("房间信息已修改!!");
        if (typeof (data.gameConfig) == "string") {
            data.gameConfig = JSON.parse(data.gameConfig);
        }
        var ischange = App.DataCenter.roomInfo.exCurDesk(data);
        // this.hallScene.updateCurDeskUI();
        // this.hallScene.updateCurDeskInfo();
        if (ischange) {
            this.sendEvent(EventConst.GameConfigChange);
        }
    };
    /**推送服务器*/
    HallController.prototype.sendPushLogin = function () {
        var data = ProtocolData.Send181_0_0;
        data.userid = App.DataCenter.UserInfo.httpUserInfo.userID;
        App.gameSocket.send(ProtocolHead.Send181_0_0, data);
    };
    /**玩家游戏中登录或没有正常登出*/
    HallController.prototype.revLoginError = function (data) {
        var info = ProtocolData.Rev100_3_8;
        info = data;
        console.log("没有正常登出:" + info);
    };
    /**断线重连*/
    HallController.prototype.revReconnection = function (data) {
        var json = ProtocolData.Rev100010;
        json = data;
        var info = json.info;
        if (json && json.info && json.info.chat_room_id) {
            App.NativeBridge.sendJoinRoom({ roomId: json.info.chat_room_id });
        }
        if (json.code == 200) {
            console.log("后端数据：", info.deskInfo);
            App.DataCenter.deskInfo.readData(info.deskInfo);
            console.log("前端数据：", App.DataCenter.deskInfo);
            var list = [info.deskInfo];
            // App.DataCenter.roomInfo.readDeskList(list);
            // App.DataCenter.roomInfo.setCurDesk(info.deskindex);
            // let cur: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
            // App.DataCenter.deskInfo = cur;
            var desk_code = parseInt(info.desk_code);
            //desk_code有时是int 有时是string
            if (desk_code != -1) {
                App.DataCenter.deskInfo.deskID = parseInt(info.desk_code);
            }
            // this.hallScene.updateCurDeskUI();
            // this.sendGetQRCode();
            var userList = info.userlist;
            if (userList) {
                var len = userList.length;
                for (var i = 0; i < len; i++) {
                    var toGame = ProtocolData.toGame;
                    toGame = JSON.parse(userList[i]);
                    var userVO = App.DataCenter.UserInfo.getUser(toGame.userid);
                    if (userVO == null) {
                        userVO = new UserVO();
                        userVO.userID = toGame.userid;
                        App.DataCenter.UserInfo.addUser(userVO);
                    }
                    userVO.nickName = toGame.nickname;
                    userVO.seatID = toGame.deskstation;
                    userVO.sex = toGame.sex;
                    userVO.headUrl = toGame.avater;
                    userVO.gold = toGame.money;
                    userVO.point = toGame.point;
                }
            }
            else {
                var userVO = App.DataCenter.UserInfo.getUser(info.userid);
                if (userVO == null) {
                    userVO = new UserVO();
                    userVO.userID = info.userid;
                    App.DataCenter.UserInfo.addUser(userVO);
                }
                userVO.seatID = info.deskstation;
            }
            //进入房间
            this.hallScene.intoGameDesk(false, null, true, this.room_type);
        }
        else {
            TipsLog.hallInfo("连接失败");
        }
    };
    /**创建好友房返回 */
    HallController.prototype.revFriendRoomCreate = function (data) {
        var json = ProtocolData.Rev101000;
        json = data;
        if (json && json.info && json.info.retData && json.info.retData.chat_room_id) {
            App.NativeBridge.sendJoinRoom({ roomId: json.info.retData.chat_room_id });
        }
        if (json.code == 200) {
            console.log("创建好友房成功");
            //记录桌子信息
            App.DataCenter.deskInfo.deskID = json.info.deskCode;
            App.DataCenter.deskInfo.deskName = json.info.deskName;
            App.DataCenter.deskInfo.deskNo = json.info.retData.deskno;
            App.DataCenter.deskInfo.gameConfig = json.info.gameConfig;
            App.DataCenter.deskInfo.basePoint = json.info.basePoint;
            App.DataCenter.deskInfo.ownerID = json.info.ownerID;
            App.DataCenter.deskInfo.ownerName = json.info.ownerName;
            this.hallScene.intoFriendRoom();
        }
        else {
            if (json.code == 3002 || json.code == 3003) {
                TipsLog.hallInfo(data.info.desc);
            }
            else {
                TipsLog.hallInfo("创建房间失败");
            }
        }
    };
    /**加入好友房返回 */
    HallController.prototype.revJoinFriendRoom = function (data) {
        App.LoadingLock.unlock();
        var json = ProtocolData.Rev101001;
        json = data;
        if (json && json.info && json.info.chat_room_id) {
            App.NativeBridge.sendJoinRoom({ roomId: json.info.chat_room_id });
        }
        if (json.code == 200) {
            console.log("加入房间成功");
            var len = json.info.userList.length;
            //记录桌子信息
            App.DataCenter.deskInfo.deskID = data.info.deskCode;
            App.DataCenter.deskInfo.deskName = data.info.deskName;
            App.DataCenter.deskInfo.deskNo = data.info.deskno;
            App.DataCenter.deskInfo.ownerID = data.info.ownerID;
            for (var i = 0; i < len; i++) {
                var to_game = ProtocolData.to_game;
                to_game = JSON.parse(json.info.userList[i]);
                var userVO = App.DataCenter.UserInfo.getUser(to_game.userid);
                if (userVO == null) {
                    userVO = new UserVO();
                    userVO.userID = to_game.userid;
                    App.DataCenter.UserInfo.addUser(userVO);
                }
                userVO.nickName = to_game.nickname;
                userVO.seatID = to_game.deskstation;
                userVO.headUrl = to_game.avater;
                userVO.sex = to_game.sex;
                userVO.gold = to_game.money;
                userVO.point = 0;
            }
            //重置准备状态
            var userVo = App.DataCenter.UserInfo.getMyUserVo();
            userVo && (userVo.setState(PLAYER_STATE.READY, false));
            this.hallScene.intoFriendRoom();
        }
        else if (data.code == 1006) {
            TipsLog.hallInfo("房间不存在，请检查所输入的房间号是否正确");
            App.PanelManager.getPanel(PanelConst.JoinNumber).fuckfuck();
        }
        else {
            TipsLog.hallInfo(data.info.desc);
            App.PanelManager.getPanel(PanelConst.JoinNumber).fuckfuck();
        }
    };
    HallController.prototype.onSelfRoomEmpty = function () {
        TipsLog.hallInfo("没有可用的专属房!!");
    };
    /**
     * 发送断线重连消息
     */
    HallController.prototype.SendReconnection = function (room_name) {
        var json = ProtocolData.Send100010;
        json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        json.room_name = room_name;
        App.gameSocket.send(ProtocolHead.Send100010, json);
    };
    //同时进入游戏时有可能收到用户进入消息
    /**接收用户进入*/
    HallController.prototype.revUserJoin = function (data) {
        var json = ProtocolData.Rev104_4_2;
        json = data;
        // console.log("json"+json.userid+"seatID"+json.deskstation);
        var userVo = App.DataCenter.UserInfo.getUserBySeatID(json.deskstation);
        if (userVo == null) {
            userVo = new UserVO();
            userVo.userID = json.userid;
            App.DataCenter.UserInfo.addUser(userVo);
        }
        userVo.userID = json.userid;
        userVo.seatID = json.deskstation;
        userVo.nickName = json.nickname;
        userVo.headUrl = json.avater;
        userVo.sex = json.sex;
        userVo.gold = json.money;
        if (App.DataCenter.roomInfo.roomType == RoomType.MatchRoom) {
            userVo.point = json.point;
        }
        else {
            userVo.point = 0;
        }
        userVo.userPos = CardLogic.getInstance().changeSeat(userVo.seatID);
        console.log("用户加入，用户ID:", userVo.userID, " 用户位置:", userVo.userPos);
    };
    //************************************************************************
    //------------------------ HTTP通讯---------------------------------------
    //------------------------ HTTP通讯---------------------------------------
    //------------------------ HTTP通讯---------------------------------------
    //************************************************************************
    /**
     * 获取录像数据
     * @replayCode 录像回放码
     */
    HallController.prototype.sendReplayDataReq = function (replayCode) {
        var http = new HttpSender();
        var sendData = ProtocolHttp.send_z_replayCombatGain;
        sendData.param.replaycode = parseInt(replayCode);
        http.send(sendData, this.revReplayDataReq, this);
    };
    /**返回录像数据，并进入游戏放录音*/
    HallController.prototype.revReplayDataReq = function (data) {
        if (!data.ret) {
            var replayData = data.data;
            this.hallScene.intoGameDesk(true, replayData);
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    /**
     * 发送购买物品请求
     * @id 商品id
     */
    HallController.prototype.sendBuyProp = function (id) {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_buyprop;
        data.param.propid = id;
        if (App.DeviceUtils.IsIos) {
            data.param.platform = 2;
        }
        this.buyPropRecData = id;
        http.send(data, this.revBuyPropReq, this);
    };
    /**返回购买物品结果*/
    HallController.prototype.revBuyPropReq = function (data) {
        if (!data.ret) {
            console.log("购买物品返回：：：", data);
            var paymentPanel = App.PanelManager.open(PanelConst.PaymentPanel, null, this, true, true, this.buyPropRecData);
            paymentPanel.setData(data.data);
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    /**
     * 选择支付方式
     * @id 商品id
     */
    HallController.prototype.sendBuyPayment = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_buypayment;
        http.send(data, this.rebBuyPayment, this);
    };
    /**选择支付方式返回 */
    HallController.prototype.rebBuyPayment = function (data) {
        console.log("选择支付方式返回：：：", data);
        if (!data.ret) {
            var paymentMethod = App.PanelManager.open(PanelConst.PaymentMethod);
            paymentMethod.setData(data.data);
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    /**
     * 确认支付
     * @goodsid 商品ID
     * @pay_type 支付方式
     */
    HallController.prototype.sendBuySure = function (id, type) {
        if (id === void 0) { id = 1; }
        if (type === void 0) { type = 1; }
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_buySure;
        data.param.goodsid = id;
        data.param.pay_type = type;
        http.send(data, this.revBuySure, this);
    };
    /**确认支付返回 */
    HallController.prototype.revBuySure = function (data) {
        console.log("pay http rev++++++++++");
        console.log(data);
        if (data.ret != 0) {
            TipsLog.hallInfo("获取支付信息错误");
            return;
        }
        App.LoadingLock.lock();
        App.LoadingLock.addDesc("正在为您购买，请稍候");
        var iData = data.data.pay;
        var sData = {
            subject: "长沙麻将",
            amount: iData.price,
            pay_type: iData.pay_type,
            process_type: 0,
            order_id: iData.orderid,
            app_id: "1",
            goodsid: iData.id
        };
        App.NativeBridge.sendPay(sData);
    };
    /**发送反馈信息 */
    HallController.prototype.sendFeedbackReq = function (contenter) {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_feedback;
        data.param.content = contenter;
        http.send(data, this.sendFeedbackReqCallback, this);
    };
    /** 发送反馈回调 */
    HallController.prototype.sendFeedbackReqCallback = function (data) {
    };
    /**接受二维码*/
    HallController.prototype.revQRCode = function (data) {
        if (!data.ret) {
            App.DataCenter.roomInfo.QrUrl = data.data.url;
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    /*二维码*/
    HallController.prototype.sendGetQRCode = function () {
        var http = new HttpSender();
        var qr = ProtocolHttp.ShareByQrcode;
        qr.param.deskCode = App.DataCenter.roomInfo.getCurDesk().deskCode.toString();
        qr.param.deskId = App.DataCenter.roomInfo.getCurDesk().deskNo;
        http.send(qr, this.revQRCode, this);
    };
    /*获取邮件*/
    HallController.prototype.sendGetEmail = function () {
        var http = new HttpSender();
        var qr = ProtocolHttp.send_z_emailList;
        http.send(qr, this.revGetEmail, this);
    };
    /**邮件返回 */
    HallController.prototype.revGetEmail = function (data) {
        if (!data.ret) {
            var emailPanel = App.PanelManager.open(PanelConst.EmailPanel);
            emailPanel.setData(data.data);
        }
        else {
            var emailPanel = App.PanelManager.open(PanelConst.EmailPanel);
            emailPanel.setData([]);
        }
    };
    /*获取邮件详情*/
    HallController.prototype.sendEmailDetail = function (id) {
        var http = new HttpSender();
        var qr = ProtocolHttp.send_z_emailDetail;
        qr.param.eid = id;
        http.send(qr, this.revEmailDetail, this);
    };
    /**邮件详情返回 */
    HallController.prototype.revEmailDetail = function (data) {
        if (!data.ret) {
            var emailTwoPanel = App.PanelManager.open(PanelConst.EmailTwoPanel);
            emailTwoPanel.setData(data.data);
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    /**获取邮件附件 */
    HallController.prototype.sendEmailGoods = function (id) {
        var http = new HttpSender();
        var qr = ProtocolHttp.send_z_getEmailGoods;
        qr.param.eid = id;
        http.send(qr, this.revEmailGoods, this);
    };
    /**获取附件返回 */
    HallController.prototype.revEmailGoods = function (data) {
        if (!data.ret) {
            TipsLog.hallInfo("领取成功！");
            App.PanelManager.getPanel(PanelConst.EmailTwoPanel).refreshEmailStatus();
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    // //开新桌
    // public sendOpenDesk(dds) {
    //     var http = new HttpSender();
    //     var data = ProtocolHttp.AddDesk;
    //     data.param.ip = App.DataCenter.ServerInfo.GAME_SERVER;
    //     data.param.port = App.DataCenter.ServerInfo.GAME_PORT;
    //     data.param.gameConfig = dds.gameConfig;
    //     data.param.basePoint = dds.basePoint;
    //     http.send(data, this.revOpenDesk, this);
    // }
    // //接受开新桌
    // private revOpenDesk(data) {
    //     if (!data.ret) {
    //         TipsLog.hallInfo("桌子增加成功!!");
    //         App.DataCenter.roomInfo.addDesk(data.data)
    //         this.hallScene.left = 20
    //         this.hallScene.top
    //         this.hallScene.right
    //         this.hallScene.bottom
    //         // this.hallScene.addPageView();
    //     } else {
    //         TipsLog.hallInfo(data.desc)
    //     }
    //     console.log(data);
    // }
    /**
    * 发送商城列表请求
    * @type 请求类型
    */
    HallController.prototype.sendShopListReq = function (type) {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_goodsList;
        data.param.type = type;
        http.send(data, this.revShopListReq, this);
    };
    /**返回商城列表*/
    HallController.prototype.revShopListReq = function (data) {
        var goodsList = data.data.goodses;
        console.log("商城列表:", goodsList);
        var type = data.data.type;
        if (!data.ret) {
            var mallPanel = App.PanelManager.open(PanelConst.MallPanel, null, this, true, true, goodsList);
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    /**
    * 获取背包
    * @type 请求类型
    */
    HallController.prototype.getBackpack = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.get_z_back;
        http.send(data, this.revBackpack, this);
    };
    /**
     * 背包物品返回
     */
    HallController.prototype.revBackpack = function (data) {
        console.log("背包物品返回：：：", data);
        if (!data.ret) {
            App.PanelManager.open(PanelConst.BackpackPanel, null, this, true, true, data.data);
        }
        else {
            App.PanelManager.open(PanelConst.BackpackPanel, null, this, true, true, []);
        }
    };
    /*获取公告跑马灯*/
    HallController.prototype.sendGetMsgMarquee = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_marquee;
        http.send(data, this.revMesMarquee, this);
    };
    /**接受跑马灯公告*/
    HallController.prototype.revMesMarquee = function (data) {
        console.log(data.data.marquees);
        App.DataCenter.marqueeInfo.setMsgMarquee(data.data.marquees);
        this.hallScene.starMarquee();
    };
    /**开通会员 */
    HallController.prototype.sendShopVipReq = function (gid) {
        this.sendPay(gid);
    };
    /**支付**/
    HallController.prototype.sendPay = function (id) {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_Pay;
        data.param.goodsid = id;
        //微信支付
        data.param.pay_type = 1;
        http.send(data, this.onWxPay, this);
    };
    /**拉起微信客户端支付**/
    HallController.prototype.onWxPay = function (data) {
        if (!data.ret) {
            TipsLog.hallInfo("支付成功！");
        }
    };
    /**验证支付 */
    HallController.prototype.verificationPay = function (bill) {
        var http = new HttpSender();
        //http.send1(bill, this.onVerificationPay, this);
    };
    /**验证回调 */
    HallController.prototype.onVerificationPay = function (data) {
        if (!data.ret) {
            console.log("支付验证成功！");
        }
    };
    /**记录请求 */
    HallController.prototype.sendRecord = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.GetScoreList;
        http.send(data, this.recRecord, this);
    };
    /**记录接收 */
    HallController.prototype.recRecord = function (data) {
        console.log("记录接收：", data);
        if (!data.ret) {
            if (data.ret == 301) {
                App.PanelManager.open(PanelConst.RecordPanel, null, this, true, true, []);
            }
            else {
                App.PanelManager.open(PanelConst.RecordPanel, null, this, true, true, data.data);
            }
        }
        else {
            App.PanelManager.open(PanelConst.RecordPanel, null, this, true, true, []);
        }
    };
    /**个人信息请求 */
    HallController.prototype.sendUserinfo = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.getUserInfo;
        http.send(data, this.recUserinfo, this);
    };
    /**个人接收 */
    HallController.prototype.recUserinfo = function (data) {
        console.log("个人信息接收：", data);
        if (!data.ret) {
            data.data.self = true;
            App.PanelManager.open(PanelConst.UserInfoPanel, null, this, true, true, data.data);
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    /**根据ID获取商城图片 */
    HallController.prototype.getUrl = function (id) {
        var urlStr = "";
        switch (id) {
            case 1:
                urlStr = "hall_one_card_png";
                break;
            case 2:
                urlStr = "hall_ten_card_png";
                break;
            case 3:
                urlStr = "hall_some_card_png";
                break;
            default:
                urlStr = "hall_some_card_png";
                break;
        }
        return urlStr;
    };
    //被邀请进入判断
    HallController.prototype.judgeInvite = function () {
        console.log("App.DataCenter.inviteFlag::" + App.DataCenter.inviteFlag);
        if (App.DataCenter.inviteFlag && App.DataCenter.inviteFlag != "") {
            var json = ProtocolData.Send101001;
            json.desk_code = parseInt(App.DataCenter.inviteFlag);
            json.deviceID = "111";
            json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
            App.gameSocket.send(ProtocolHead.Send101001, json);
        }
        App.DataCenter.inviteFlag = "";
    };
    //获取二维码URL
    HallController.prototype.getQrCode = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.getQrCodeImg;
        http.send(data, this.revQrCode, this, false);
    };
    HallController.prototype.revQrCode = function (data) {
        if (!data.ret) {
            App.DataCenter.qrCodeUrl = data.data.url;
        }
    };
    HallController.prototype.revOtherLogin = function () {
        App.gameSocket.close();
        var messageBoxB = App.MsgBoxManager.getBoxB();
        messageBoxB.showMsg("您的账号在其他设备登录，已与服务器断开连接。");
    };
    /**获取icon列表 */
    HallController.prototype.getIconUrl = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.getIconUrl;
        http.send(data, this.revIcon, this, false);
    };
    HallController.prototype.revIcon = function (data) {
        if (!data.ret) {
            var panel = App.PanelManager.open(PanelConst.LoginPanel, null, null, false, false, data.data);
        }
    };
    return HallController;
}(BaseController));
/**控制模块名*/
HallController.NAME = "HallController";
/**显示大厅*/
HallController.EVENT_SHOW_HALL = "ShowHallScene";
__reflect(HallController.prototype, "HallController");
