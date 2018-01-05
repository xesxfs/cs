/**
 * 登录方式界面
 * @author huanglong
 * @date 2017/06/15
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginChoosePanel = (function (_super) {
    __extends(LoginChoosePanel, _super);
    function LoginChoosePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "LoginChoosePanelSkin";
        return _this;
    }
    LoginChoosePanel.prototype.onEnable = function () {
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.elseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.imBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    LoginChoosePanel.prototype.onRemove = function () {
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.elseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.imBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    LoginChoosePanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.wxBtn:
                var data = {
                    type: "wxLogin",
                    data: {
                        gameid: "10004",
                    }
                };
                App.NativeBridge.sendLoginType(data);
                break;
            case this.elseBtn:
                var data = {
                    type: "visitorLogin",
                    data: {
                        gameid: "10004",
                    }
                };
                App.NativeBridge.sendLoginType(data);
                break;
            case this.imBtn:
                //登录界面
                App.PanelManager.open(PanelConst.LoginPanel);
                break;
            default:
                break;
        }
    };
    return LoginChoosePanel;
}(BasePanel));
__reflect(LoginChoosePanel.prototype, "LoginChoosePanel");
