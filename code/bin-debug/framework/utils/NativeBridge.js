/**
 * 原生通信
 * @author huanglong
 * 2017-03-23
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NativeBridge = (function (_super) {
    __extends(NativeBridge, _super);
    function NativeBridge() {
        var _this = _super.call(this) || this;
        _this.addNativeListener();
        _this.gameId = "10004";
        return _this;
    }
    /**
     * 添加原生消息监听
     */
    NativeBridge.prototype.addNativeListener = function () {
        //登录
        egret.ExternalInterface.addCallback("applyLogin", this.listenLogin);
        //退出
        egret.ExternalInterface.addCallback("QUIT_GAME_NTE", this.listenQuit);
        //获取本地图片
        egret.ExternalInterface.addCallback("IMImage", this.listenIMImage);
        //支付结果
        egret.ExternalInterface.addCallback("PayResult", this.listenPayResult);
        //录音发送结果
        egret.ExternalInterface.addCallback("sendTapeSuccess", this.listenTapeResult);
        //资源状态返回
        egret.ExternalInterface.addCallback("loadResState", this.listeResState);
        //录音权限返回
        egret.ExternalInterface.addCallback("IMRecord", this.listenTapePermission);
        //包类型返回
        egret.ExternalInterface.addCallback("chargeBag", this.listenBagType);
        //是否有本地登录数据
        egret.ExternalInterface.addCallback("isToken", this.listenLocalLogin);
        //监听IM接口返回异常
        egret.ExternalInterface.addCallback("backNet", this.listenIMError);
    };
    NativeBridge.prototype.listenLogin = function (message) {
        var _this = this;
        setTimeout(function () {
            var data = JSON.parse(message);
            if (Number(data.ret)) {
                var info = data.info;
                if (info.isInvite != "NO") {
                    App.DataCenter.inviteFlag = info.roomId;
                }
                App.getController(LoginController.NAME).sendImLoginReq(info.token, info.uid.toString());
            }
            else {
                App.NativeBridge.sendCloseStart();
                var messagebox = App.MsgBoxManager.getBoxA();
                messagebox.showMsg("获取登录信息错误,是否重新获取？", function () {
                    App.NativeBridge.getLogin();
                }, _this, function () {
                    App.NativeBridge.sendToPengji();
                });
            }
        }, 100, this);
    };
    NativeBridge.prototype.listenQuit = function (message) {
        setTimeout(function () {
            console.log("退出NET消息：" + message);
        }, 100);
    };
    NativeBridge.prototype.listenIMImage = function (message) {
        setTimeout(function () {
            var data = JSON.parse(message);
            App.SceneManager.getCurScene().getChildAt(0).getChildAt(0).source = data;
        }, 100);
    };
    NativeBridge.prototype.listenPayResult = function (message) {
        setTimeout(function () {
            var data = JSON.parse(message);
            App.LoadingLock.unlock();
            if (Number(data) == 1) {
                TipsLog.hallInfo("支付成功");
            }
            else {
                TipsLog.hallInfo("支付失败");
            }
        }, 100);
    };
    NativeBridge.prototype.listenTapeResult = function (message) {
        setTimeout(function () {
            var data = JSON.parse(message);
            if (Number(data) == 1) {
                TipsLog.gameInfo("录音发送成功");
            }
            else {
                TipsLog.gameInfo("录音发送失败");
            }
        }, 100);
    };
    NativeBridge.prototype.listeResState = function (message) {
        setTimeout(function () {
            var data = JSON.parse(message);
        }, 100);
    };
    NativeBridge.prototype.listenTapePermission = function (message) {
        setTimeout(function () {
            var data = JSON.parse(message);
            if (Number(data) == 1) {
            }
            else {
                var tapeP = App.PanelManager.getPanel(PanelConst.TapePanel);
                tapeP.overTape();
            }
        }, 100);
    };
    NativeBridge.prototype.listenBagType = function (message) {
        setTimeout(function () {
            var data = JSON.parse(message);
            if (data && Number(data) == 1) {
                App.getInstance().indepFlag = true;
                App.NativeBridge.getLocalLogin();
            }
            else {
                App.NativeBridge.getLogin();
            }
        }, 100);
    };
    NativeBridge.prototype.listenLocalLogin = function (message) {
        setTimeout(function () {
            var data = JSON.parse(message);
            if (data && Number(data) == 1) {
                console.log("auto login");
            }
            else {
                console.log("choose login");
                //登录选择界面
                App.PanelManager.open(PanelConst.LoginChoosePanel, null, null, false, false);
            }
        }, 100);
    };
    NativeBridge.prototype.listenIMError = function (message) {
        setTimeout(function () {
            console.log("local imError +++++++++++++：");
            var data = JSON.parse(message);
            console.log(JSON.stringify(data));
            if (!data.ret) {
                TipsLog.hallInfo(data.info.desc);
            }
            else if (data.type == "register") {
            }
            else if (data.type == "findPassword") {
                if (data.ret) {
                    TipsLog.hallInfo("找回成功");
                    App.PanelManager.getPanel(PanelConst.LoginPanel).back();
                }
            }
            else if (data.type == "userBindingPhone") {
                if (data.ret) {
                    TipsLog.hallInfo("绑定成功");
                    App.getInstance().indepFlag = false;
                    App.PanelManager.getPanel(PanelConst.BindPanel).hide();
                }
            }
            else if (data.type == "IMPay") {
                App.LoadingLock.unlock();
                if (data.ret) {
                    TipsLog.hallInfo("购买成功");
                }
                else {
                    TipsLog.hallInfo("购买失败");
                }
            }
        }, 100);
    };
    /**----------------------------ETN-------------------------------- */
    /**
     * 获取包类型
     */
    NativeBridge.prototype.getBagType = function () {
        console.log(("++++++++++++getBagType"));
        var data = {};
        egret.ExternalInterface.call("chargeBag", JSON.stringify(data));
    };
    /**
     * 是否存在登录信息
     */
    NativeBridge.prototype.getLocalLogin = function () {
        console.log(("++++++++++++getLocalLogin"));
        var data = {};
        egret.ExternalInterface.call("isToken", JSON.stringify(data));
    };
    /**
     * 请求登录信息
     */
    NativeBridge.prototype.getLogin = function () {
        console.log("+++++++++++getLogin");
        var data = {
            gameId: "10004"
        };
        data.gameId = this.gameId;
        egret.ExternalInterface.call("applyLogin", JSON.stringify(data));
    };
    /**
     * 是否登录成功
     */
    NativeBridge.prototype.sendLogin = function (success) {
        var data = {
            success: success
        };
        if (success) {
            var dataT = {
                gameId: "10004"
            };
            dataT.gameId = this.gameId;
            egret.ExternalInterface.call("isLogin", JSON.stringify(dataT));
        }
        else {
            egret.ExternalInterface.call("closeGame", JSON.stringify(data));
        }
    };
    /**
     * 点击朋际
     */
    NativeBridge.prototype.sendToPengji = function () {
        var data = {
            gameId: "10004"
        };
        data.gameId = this.gameId;
        App.SoundManager.stopAllSound();
        egret.ExternalInterface.call("closeGame", JSON.stringify(data));
    };
    /**
     * 原生加载界面关闭
     */
    NativeBridge.prototype.sendCloseStart = function () {
        egret.ExternalInterface.call("closeStartView", "");
    };
    /**
     * 邀请好友
     */
    NativeBridge.prototype.sendInviteFriend = function (data) {
        // var data = {
        //     roomId: "0",
        //     gameId: "10004",
        //     title: "名字",
        //     invite: "0",
        //     rule: [],
        //     gameName: "广东麻将"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("IMInvite", JSON.stringify(data));
    };
    /**
     * 开始录音
     */
    NativeBridge.prototype.sendTapeBegin = function () {
        egret.ExternalInterface.call("beginTape", "");
    };
    /**
     * 结束录音
     */
    NativeBridge.prototype.sendTageEnd = function (data) {
        /**
         * 参数说明
         * "cancle" 录音时间不足，或者上滑取消录音，该录音不发送
         * "normal" 正常录音，需要发送
         */
        // var data = {
        //     state: "cancle"
        // }
        egret.ExternalInterface.call("endTape", JSON.stringify(data));
    };
    /**
     * 图片请求
     */
    NativeBridge.prototype.sendIMImage = function () {
        var data = {};
        egret.ExternalInterface.call("IMImage", JSON.stringify(data));
    };
    /**
     * 普通分享
     */
    NativeBridge.prototype.sendNormalShare = function (data) {
        // var data = {
        //     gameId:"10004",
        //     share:"0",
        //     gameName:"长沙麻将",
        //     description:"长沙麻将,好玩到爆"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("ShareUrl", JSON.stringify(data));
    };
    /**
     * 图片分享
     */
    NativeBridge.prototype.sendImageShare = function (data) {
        // var data = {
        //     gameId:"10004",
        //     share:"0",
        //     imageB64:"sdfasdfdf5a4564564",
        //     gameName:"长沙麻将"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("ShareImage", JSON.stringify(data));
    };
    /**
     * 支付
     */
    NativeBridge.prototype.sendPay = function (data) {
        // var data = {
        //     subject: "长沙麻将",      商品标题
        //     amount: 1,               金额
        //     pay_type: 0,             支付类型
        //     process_type: 0,         操作类型
        //     order_id: ""             订单号
        //     app_id: "1"              游戏ID
        //     goodsid: 1               物品ID
        // }
        console.log("sendPay+++++");
        console.log(JSON.stringify(data));
        egret.ExternalInterface.call("IMPay", JSON.stringify(data));
    };
    /**
     * 登录聊天室
     */
    NativeBridge.prototype.sendJoinRoom = function (data) {
        // var data = {
        //     roomId: "0"
        // }
        egret.ExternalInterface.call("joinRoom", JSON.stringify(data));
    };
    /**
     * 退出
     */
    NativeBridge.prototype.sendQuitRoom = function () {
        // var data = {
        //     roomId: "0"
        // }
        egret.ExternalInterface.call("quitRoom", "");
    };
    /**
     * 自动播放语音-开关
     */
    NativeBridge.prototype.sendAutoVoice = function (flag) {
        if (flag) {
            egret.ExternalInterface.call("autoVoiceOn", "");
        }
        else {
            egret.ExternalInterface.call("autoVoiceOff", "");
        }
    };
    /**
     * 获取资源状态
     */
    NativeBridge.prototype.sendResourceState = function () {
        egret.ExternalInterface.call("loadResState", "");
    };
    /**
     * 发送下载进度
     */
    NativeBridge.prototype.sendLoadProgress = function () {
        var data = {
            progress: "0"
        };
        egret.ExternalInterface.call("loadProgress", "");
    };
    /**
     * 发送登录方式
     */
    NativeBridge.prototype.sendLoginType = function (data) {
        // var data = {
        //     type: "login",
        //     data: {
        //         gameId: "10004",
        //         phone: "15818543240",
        //         passwd: "123456"
        //     }
        // }
        data.data.gameId = this.gameId;
        egret.ExternalInterface.call("login", JSON.stringify(data));
    };
    /**
     * 获取注册验证码
     */
    NativeBridge.prototype.sendRegistCode = function (data) {
        // var data = {
        //     gameId: "10004",
        //     phone: "15818543240"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("sendVerificationCode", JSON.stringify(data));
    };
    /**
     * 发送注册信息
     */
    NativeBridge.prototype.sendRegistInfo = function (data) {
        // var data = {
        //     gameid: "10004",
        //     phone: "111111",
        //     password: "1234556",
        //     verificationcode: "1234"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("register", JSON.stringify(data));
    };
    /**
     * 获取找回密码验证码
     */
    NativeBridge.prototype.sendFindCode = function (data) {
        // var data = {
        //     gameId: "10004",
        //     phone: "15818543240"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("sendVerificationCodeForModify", JSON.stringify(data));
    };
    /**
     * 找回密码
     */
    NativeBridge.prototype.sendFind = function (data) {
        // var data = {
        //     gameId: "10004",
        //     phone: "15818543240"
        //     verificationcode: "1234"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("findPassword", JSON.stringify(data));
    };
    /**
     * 注销账号
     */
    NativeBridge.prototype.sendCancle = function () {
        var data = {};
        egret.ExternalInterface.call("cancel", JSON.stringify(data));
    };
    /**
     * 绑定账号
     */
    NativeBridge.prototype.sendBind = function (data) {
        // var data = {
        //     gameid: "10004",
        //     phone: "111111",
        //     password: "1234556",
        //     verificationcode: "1234"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("userBindingPhone", JSON.stringify(data));
    };
    /**
     * 提交个人信息
     */
    NativeBridge.prototype.sendBaseInfo = function (data) {
        // var data = {
        //     nickname: "111",
        //     sex: 1,
        //     icon: "111"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("updateBaseInfo", JSON.stringify(data));
    };
    return NativeBridge;
}(SingleClass));
__reflect(NativeBridge.prototype, "NativeBridge");
