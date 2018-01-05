/**
 * 游客绑定
 * @author huanglong
 * @date 2017/06/16
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BindPanel = (function (_super) {
    __extends(BindPanel, _super);
    function BindPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "BindPanelSkin";
        return _this;
    }
    BindPanel.prototype.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.registBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRegist, this);
        this.getVerify.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getRegistCode, this);
    };
    BindPanel.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.registBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRegist, this);
        this.getVerify.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getRegistCode, this);
    };
    BindPanel.prototype.back = function () {
        this.hide();
    };
    /**获取注册验证码 */
    BindPanel.prototype.getRegistCode = function () {
        var phoneText = this.phoneEdit.text;
        if (phoneText && phoneText.length == 11) {
            TipsLog.hallInfo("验证码已发送，请耐心等待");
            var data = {
                phone: phoneText
            };
            App.NativeBridge.sendRegistCode(data);
        }
        else {
            TipsLog.hallInfo("请输入正确的手机号");
        }
    };
    /**点击注册 */
    BindPanel.prototype.onTouchRegist = function () {
        if (!this.phoneEdit.text) {
            TipsLog.hallInfo("手机号不能为空");
        }
        else if (!this.verifyEdit.text) {
            TipsLog.hallInfo("验证码不能为空");
        }
        else if (!this.passEditZS.text) {
            TipsLog.hallInfo("密码不能为空");
        }
        else if (!this.passEditZU.text) {
            TipsLog.hallInfo("确认密码不能为空");
        }
        else if (this.phoneEdit.text.length < 11) {
            TipsLog.hallInfo("请输入11位手机号");
        }
        else if (this.passEditZS.text.length < 6) {
            TipsLog.hallInfo("密码为6~16位数字或字母组合");
        }
        else if (this.passEditZS.text != this.passEditZU.text) {
            TipsLog.hallInfo("密码和确认密码不一致");
        }
        else {
            var data = {
                phone: this.phoneEdit.text,
                password: this.passEditZS.text,
                verificationcode: this.verifyEdit.text
            };
            App.NativeBridge.sendBind(data);
        }
    };
    return BindPanel;
}(BasePanel));
__reflect(BindPanel.prototype, "BindPanel");
