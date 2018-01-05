var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * App主类
 * @author chenkai
 * @date 2016/7/7

 */
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**启动框架*/
    App.prototype.startUp = function () {
        //调整适配模式
        if (App.DeviceUtils.IsWeb) {
            App.StageUtils.changeScaleMode();
            App.StageUtils.runBrowserAdapt();
        }
        //通知runtime加载页面已就绪,可以关闭runtime loading
        if (App.DeviceUtils.IsNative) {
            var json = { current: 10, total: 10 };
            var jsonStr = JSON.stringify(json);
            egret.ExternalInterface.call("customLoadingFlag", jsonStr);
        }
        //定义Native访问接口
        if (App.DeviceUtils.IsNative) {
            this.setInterfaces();
        }
        //注册Controller
        this.registerController(LoginController.NAME, new LoginController());
        this.registerController(HallController.NAME, new HallController());
        this.registerController(GameController.NAME, new GameController());
        //注册场景
        var scene = App.SceneManager;
        scene.register(SceneConst.LoginScene, LoginScene); //登录界面
        scene.register(SceneConst.HallScene, HallScene); //大厅界面
        scene.register(SceneConst.GameScene, GameScene); //游戏界面
        //注册弹框
        var panel = App.PanelManager;
        panel.register(PanelConst.ResultPanel, ResultPanel); //结算面板
        panel.register(PanelConst.ResultPanel1, ResultPanel); //结算面板
        panel.register(PanelConst.SharePanel, SharePanel); //分享面板
        panel.register(PanelConst.MallPanel, MallPanel); //商城面板
        panel.register(PanelConst.PaymentPanel, PaymentPanel); //支付面板
        panel.register(PanelConst.PaymentMethod, PaymentMethod); //选择支付面板
        panel.register(PanelConst.BackpackPanel, BackpackPanel); //背包面板
        panel.register(PanelConst.FriendPanel, FriendPanel); //好友房列表
        panel.register(PanelConst.JoinRoomPanel, JoinRoomPanel); //加入房间
        panel.register(PanelConst.JoinNumber, JoinNumber, AssetConst.InputRoom); //输入加入房间
        panel.register(PanelConst.LookRlue, LookRlue); //游戏内查看规则
        panel.register(PanelConst.ModifyRlueT, ModifyRlueT); //游戏内修改规则
        panel.register(PanelConst.RecordPanel, RecordPanel); //记录面板
        panel.register(PanelConst.RecordDetailPanel, RecordDetailPanel); //记录详情面板
        panel.register(PanelConst.RulePanel, RulePanelH, [AssetConst.Rule, AssetConst.Card]); //玩法说明面板
        panel.register(PanelConst.EmailPanel, EmailPanel); //邮件面板
        panel.register(PanelConst.EmailTwoPanel, EmailTwoPanel); //二级邮件面板
        panel.register(PanelConst.PreloadPanel, PreloadPanel); //加载
        panel.register(PanelConst.SetPanel, SetPanel, AssetConst.SetPanel); //设置
        panel.register(PanelConst.RecordPanel, RecordPanel); //记录
        panel.register(PanelConst.RecordDetailPanel, RecordDetailPanel); //记录
        panel.register(PanelConst.UserInfoPanel, UserInfoPanel); //个人信息
        panel.register(PanelConst.GameResultPanel, GameResultPanel); //结算
        panel.register(PanelConst.HuTypePanel, HuTypePanel); //胡牌类型
        panel.register(PanelConst.TapePanel, TapePanel); //录音界面
        panel.register(PanelConst.JieSanPanel, JieSanPanel); //解散房间
        panel.register(PanelConst.SendjiesanPanel, SendjiesanPanel); //提示解散房间
        panel.register(PanelConst.GameRecordPanel, GameRecordPanel); //好友房记录
        panel.register(PanelConst.ModifyRuleSurePanel, ModifyRuleSurePanel); //关闭修改规则确认
        panel.register(PanelConst.SocketClosePanel, SocketClosePanel); //socket重连弹窗
        panel.register(PanelConst.InvitePanelT, InvitePanelT); //好友房邀请好友
        panel.register(PanelConst.LoginPanel, LoginPanel); //登录界面
        panel.register(PanelConst.ShareRecordPanel, ShareRecordPanel); //好友房分享界面
        panel.register(PanelConst.ShareResultPanel, ShareResultPanel); //结算分享界面
        panel.register(PanelConst.AllRecord, AllRecord); //总结算面板
        panel.register(PanelConst.LoginChoosePanel, LoginChoosePanel); //登录选择
        panel.register(PanelConst.BindPanel, BindPanel); //绑定
        //监听事件
        this.addEvent(App.EVENT_NATIVE_SHAKE, this.nativeShake, this);
        this.addEvent(App.EVENT_SET_WEB_WXSHARE, this.setWebWxShare, this);
        this.addEvent(App.EVENT_NATIVE_WXSHARE, this.nativeWxShare, this);
        //显示登录界面
        this.sendEvent(LoginController.EVENT_SHOW_LOGIN);
        //监听断线事件
        this.addEvent(EventConst.SocketClose, this.onSocketClose, this); //socket关闭
        //初始化设置
        App.GameConfig.initUserConfig();
    };
    //Native接口
    App.prototype.setInterfaces = function () {
        //手机点击退出键
        egret.ExternalInterface.addCallback("quitApp", function (message) {
            console.log("message form native : " + message);
            var messageBox = App.MsgBoxManager.getBoxA();
            messageBox.showMsg("是否关闭游戏");
            messageBox.ok = function () {
                egret.ExternalInterface.call("quitApp", "quitApp");
            };
        });
        //Native返回微信登录请求结果
        egret.ExternalInterface.addCallback("getCode", function (code) {
            TipsLog.hallInfo("egret get code: " + code);
            if (code) {
                //这里回调必须用异步函数
                egret.setTimeout(function () {
                    var loginController = App.getController(LoginController.NAME);
                    loginController.sendLoginAppReq(code, "");
                }, this, 10);
            }
            else {
                TipsLog.hallInfo("code is null");
            }
        });
    };
    /**
     * Native分享
     * @isTimeline 是否分享到朋友圈
     */
    App.prototype.nativeWxShare = function (isTimeline) {
        egret.ExternalInterface.call("wxShare", "http://gamemj.com/mj/index.php?pid=" + App.DataCenter.UserInfo.getMyUserVo().userID + "&deskCode=" + App.DataCenter.deskInfo.deskCode + "&deskId=" + App.DataCenter.deskInfo.deskID + "&gameID=" + App.serverSocket.gameID);
    };
    /**
     * Native震动
     * @shakeTime 震动时间，默认1500ms
     */
    App.prototype.nativeShake = function (shakeTime) {
        if (shakeTime === void 0) { shakeTime = 1500; }
        egret.ExternalInterface.call("shake", shakeTime + "");
    };
    /**
     * H5分享，重置微信分享接口，传入桌子号和用户ID等
     * @userID 用户ID
     * @deskCode 桌子号
     * @replayCode 回放码
     */
    App.prototype.setWebWxShare = function (userID, deskCode, replayCode, deskId) {
        var gameID = App.serverSocket.gameID;
        console.log("调用微信分享,deskCode=" + deskCode + " userID=" + userID + " replayCode=" + replayCode
            + " gameID=" + gameID);
        if (window['wxShare']) {
            window['wxShare'](userID, deskCode, replayCode, gameID, deskId);
        }
    };
    App.prototype.onSocketClose = function () {
        App.PanelManager.open(PanelConst.SocketClosePanel, null, null, false);
    };
    /**
     * 获取控制模块
     * @ctrlName 控制模块名
     * @return 控制模块
     */
    App.getController = function (ctrlName) {
        return App.getInstance().getController(ctrlName);
    };
    Object.defineProperty(App, "DataCenter", {
        /**数据中心*/
        get: function () {
            return DataCenter.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DeviceUtils", {
        /**设备工具类*/
        get: function () {
            return DeviceUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StageUtils", {
        /**舞台工具类*/
        get: function () {
            return StageUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ResUtils", {
        /**资源管理类*/
        get: function () {
            return ResUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LayerManager", {
        /**图层管理类*/
        get: function () {
            return LayerManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SoundManager", {
        /**声音管理*/
        get: function () {
            return SoundManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "PopUpManager", {
        /**弹框管理类*/
        get: function () {
            return PopUpManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "MsgBoxManager", {
        /**消息框管理类*/
        get: function () {
            return MessageBoxManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "BottomMenuManager", {
        /**底部菜单管理类*/
        get: function () {
            return BottomMenuManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "EventManager", {
        /**事件管理类*/
        get: function () {
            return EventMananger.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "KeyWord", {
        /**关键词屏蔽*/
        get: function () {
            return KeyWord.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LoadingLock", {
        /**加载等待动画*/
        get: function () {
            return LoadingLock.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "PanelManager", {
        /**弹框管理类*/
        get: function () {
            return PanelManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SceneManager", {
        /**场景管理类*/
        get: function () {
            return SceneManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "gameSocket", {
        /**游戏Socket*/
        get: function () {
            return SocketManager.getInstance().gameSocket;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "serverSocket", {
        /**调度Socket*/
        get: function () {
            return SocketManager.getInstance().serverSocket;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "pushSocket", {
        /**推送Socket*/
        get: function () {
            return SocketManager.getInstance().pushSocket;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "NativeBridge", {
        /**原生通信类 */
        get: function () {
            return NativeBridge.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LocalStorageUtil", {
        get: function () {
            return LocalStorageUtil.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "GameConfig", {
        get: function () {
            return GameCfg.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "indepFlag", {
        get: function () {
            return this.independentFlag;
        },
        set: function (flag) {
            this.independentFlag = flag;
        },
        enumerable: true,
        configurable: true
    });
    return App;
}(BaseApp));
/**调用Native震动*/
App.EVENT_NATIVE_SHAKE = "EVENT_NATIVE_SHAKE";
/**设置web微信分享*/
App.EVENT_SET_WEB_WXSHARE = "EVENT_SET_WEB_WXSHARE";
/**native微信分享*/
App.EVENT_NATIVE_WXSHARE = "EVENT_NATIVE_WXSHARE";
__reflect(App.prototype, "App");
