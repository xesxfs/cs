/**
 * @author xiongjian
 *
 * 2016-12-29
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SetPanel = (function (_super) {
    __extends(SetPanel, _super);
    function SetPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "SetPanelSkin";
        return _this;
    }
    SetPanel.prototype.childrenCreated = function () {
    };
    /** 添加到场景*/
    SetPanel.prototype.onEnable = function () {
        if (this.gameBool) {
            this.hallGro.visible = false;
            this.hallIndGro.visible = false;
            this.gameGro.visible = true;
            this.music_togBtn = this.music_togBtn_game;
            this.voice_togBtn = this.voice_togBtn_game;
        }
        else {
            if (App.getInstance().indepFlag) {
                this.hallGro.visible = false;
                this.hallIndGro.visible = true;
                this.gameGro.visible = false;
                this.music_togBtn = this.music_togBtn_hall0;
                this.voice_togBtn = this.voice_togBtn_hall0;
            }
            else {
                this.hallGro.visible = true;
                this.hallIndGro.visible = false;
                this.gameGro.visible = false;
                this.music_togBtn = this.music_togBtn_hall;
                this.voice_togBtn = this.voice_togBtn_hall;
            }
        }
        this.touchNum = 0;
        this.setEdit.visible = false;
        this.music_togBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.voice_togBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.voice_autoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.tuoguanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.closeBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.setImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);
        this.setEdit.addEventListener(egret.FocusEvent.FOCUS_OUT, this.FcousOut, this);
        this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeBtn, this);
        this.setCenter();
        this.initView();
    };
    /** 从场景中移除*/
    SetPanel.prototype.onRemove = function () {
        this.music_togBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.voice_togBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.voice_autoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.closeBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.tuoguanBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.setImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);
        this.setEdit.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.FcousOut, this);
        this.changeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeBtn, this);
        this.gameBool = false;
        this.touchNum = 0;
    };
    SetPanel.prototype.onSet = function () {
        var _this = this;
        this.touchNum++;
        clearTimeout(this.timeNum);
        this.timeNum = setTimeout(function () {
            _this.touchNum = 0;
        }, 700);
        if (this.touchNum > 13) {
            this.setEdit.visible = true;
            this.setEdit.text = "";
        }
    };
    SetPanel.prototype.FcousOut = function () {
        var curText = this.setEdit.text;
        var date = (new Date().getTime()) / 1000;
        var secretText = "open" + ArrayTool.formatDate1(date);
        if (curText == secretText) {
            App.DataCenter.secret = true;
            App.SceneManager.getCurScene().showSwapCard();
        }
        else {
            this.setEdit.visible = false;
        }
    };
    /**设置界面值 */
    SetPanel.prototype.initView = function () {
        this.music_togBtn_game.selected = this.music_togBtn_hall.selected = App.SoundManager.allowPlayBGM;
        this.voice_togBtn_game.selected = this.voice_togBtn_hall.selected = App.SoundManager.allowPlayEffect;
        ;
        this.voice_autoBtn.selected = App.LocalStorageUtil.autoVoice;
        var gameScene = App.SceneManager.getScene(SceneConst.GameScene);
        // if (gameScene && gameScene.tuoGuanGroup) {
        //     this.tuoguanBtn.selected = gameScene.tuoGuanGroup.visible;
        // }
        // else {
        //     this.tuoguanBtn.selected = false;
        // }
    };
    /** 设置页面(开关监听) */
    SetPanel.prototype.setToggleSwitchTouch = function (event) {
        switch (event.target) {
            case this.music_togBtn:
                console.log("target ++++++", event.target);
                var musicEvent = event.target;
                var music = musicEvent.selected;
                App.LocalStorageUtil.allowMusic = App.SoundManager.allowPlayBGM = music;
                //游戏中开关背景音乐
                if (App.SoundManager.allowPlayBGM && App.SceneManager.getCurScene() instanceof GameScene) {
                    RES.loadGroup(AssetConst.Sound_BGM);
                }
                else {
                    App.SoundManager.stopBGM();
                }
                break;
            case this.voice_togBtn:
                var soundEvent = event.target;
                var sound = soundEvent.selected;
                App.LocalStorageUtil.allowEffect = App.SoundManager.allowPlayEffect = sound;
                //游戏中加载音效
                if (App.SoundManager.allowPlayEffect && App.SceneManager.getCurScene() instanceof GameScene) {
                    if (App.SoundManager.isGuangDongSpeak) {
                        RES.loadGroup(AssetConst.Sound_GuangDong);
                    }
                    else {
                        RES.loadGroup(AssetConst.Sound_PuTong);
                    }
                    RES.loadGroup(AssetConst.Sound_Other);
                }
                break;
            case this.voice_autoBtn:
                App.NativeBridge.sendAutoVoice(App.LocalStorageUtil.autoVoice = this.voice_autoBtn.selected);
                break;
            case this.tuoguanBtn:
                App.getController(GameController.NAME).sendTuoGuan(this.tuoguanBtn.selected);
                break;
            default:
                break;
        }
        console.log();
    };
    /**关闭*/
    SetPanel.prototype.onCloseBtn = function (e) {
        this.hide();
    };
    /**切换 */
    SetPanel.prototype.onChangeBtn = function () {
        var messageBox = App.MsgBoxManager.getBoxA();
        messageBox.showMsg("您确认要注销登录吗？", function () {
            App.NativeBridge.sendCancle();
            App.PanelManager.closeAllPanel();
            var loginScene = App.SceneManager.runScene(SceneConst.LoginScene);
            loginScene.setController(App.getController(LoginController.NAME));
            App.PanelManager.open(PanelConst.LoginChoosePanel, null, null, false, false);
        }, this);
    };
    return SetPanel;
}(BasePanel));
__reflect(SetPanel.prototype, "SetPanel");
