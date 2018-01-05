/**
 * 登录、注册、找回密码界面
 * @author huanglong
 * @date 2017/05/06
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginPanel = (function (_super) {
    __extends(LoginPanel, _super);
    function LoginPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "LoginPanelSkin";
        return _this;
    }
    LoginPanel.prototype.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.closeBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.closeBtnB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backChoose, this);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        this.registBtnC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegistLab, this);
        this.forgetLab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFind, this);
        this.registBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRegist, this);
        this.getVerify.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getRegistCode, this);
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFind, this);
        this.getVerify0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFindCode, this);
        this.loginBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSubmit, this);
        this.sexMRadio.group.addEventListener(eui.UIEvent.CHANGE, this.sexChange, this);
        if (this.recData) {
            this.showBaseInfo();
        }
        else {
            this.showGro("login");
        }
    };
    LoginPanel.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.closeBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.closeBtnB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backChoose, this);
        this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        this.registBtnC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegistLab, this);
        this.forgetLab.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFind, this);
        this.registBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRegist, this);
        this.getVerify.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getRegistCode, this);
        this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getFind, this);
        this.getVerify0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getFindCode, this);
        this.loginBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSubmit, this);
        this.sexMRadio.group.removeEventListener(eui.UIEvent.CHANGE, this.sexChange, this);
        this.recData = null;
    };
    /**界面切换
     * param: "login","regist","find","base"
    */
    LoginPanel.prototype.showGro = function (type) {
        if (type === void 0) { type = "login"; }
        switch (type) {
            case "login":
                this.bigImg.visible = true;
                this.loginGro.visible = true;
                this.registGro.visible = false;
                this.findPassGro.visible = false;
                this.baseInfoGro.visible = false;
                this.nameEdit.text = null;
                this.passEdit.text = null;
                break;
            case "regist":
                this.bigImg.visible = true;
                this.loginGro.visible = false;
                this.registGro.visible = true;
                this.findPassGro.visible = false;
                this.baseInfoGro.visible = false;
                this.phoneEdit.text = null;
                this.verifyEdit.text = null;
                this.passEditZS.text = null;
                this.passEditZU.text = null;
                break;
            case "find":
                this.bigImg.visible = true;
                this.loginGro.visible = false;
                this.registGro.visible = false;
                this.findPassGro.visible = true;
                this.baseInfoGro.visible = false;
                this.phoneEdit0.text = null;
                this.verifyEdit0.text = null;
                this.passEditZS0.text = null;
                this.passEditZU0.text = null;
                break;
            case "base":
                this.bigImg.visible = false;
                this.loginGro.visible = false;
                this.registGro.visible = false;
                this.findPassGro.visible = false;
                this.baseInfoGro.visible = true;
                this.nameEdit0.text = null;
                break;
            default:
                this.bigImg.visible = true;
                this.loginGro.visible = true;
                this.registGro.visible = false;
                this.findPassGro.visible = false;
                this.nameEdit.text = null;
                this.passEdit.text = null;
                break;
        }
    };
    /**点击登录 */
    LoginPanel.prototype.onLogin = function () {
        if (!this.nameEdit.text || !this.passEdit.text) {
            TipsLog.hallInfo("账号或密码不能为空");
        }
        else {
            var data = {
                type: "login",
                data: {
                    phone: this.nameEdit.text,
                    passwd: this.passEdit.text
                }
            };
            App.NativeBridge.sendLoginType(data);
        }
    };
    /**点击注册字 */
    LoginPanel.prototype.onRegistLab = function () {
        this.showGro("regist");
    };
    /**点击忘记 */
    LoginPanel.prototype.onFind = function () {
        this.showGro("find");
    };
    /**切换到基本信息界面 */
    LoginPanel.prototype.showBaseInfo = function () {
        this.showGro("base");
        this.iconRadio.group.selectedValue = "0";
        this.sexMRadio.group.selectedValue == "0";
        this.sexChange();
    };
    /**返回到登录 */
    LoginPanel.prototype.back = function () {
        this.showGro("login");
    };
    /**登录关闭按钮 */
    LoginPanel.prototype.backChoose = function () {
        this.hide();
        App.PanelManager.open(PanelConst.LoginChoosePanel, null, null, false, false);
    };
    /**获取注册验证码 */
    LoginPanel.prototype.getRegistCode = function () {
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
    LoginPanel.prototype.onTouchRegist = function () {
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
            App.NativeBridge.sendRegistInfo(data);
        }
    };
    /**获取找回密码验证 */
    LoginPanel.prototype.getFindCode = function () {
        var phoneText = this.phoneEdit0.text;
        if (phoneText && phoneText.length == 11) {
            TipsLog.hallInfo("验证码已发送，请耐心等待");
            var data = {
                phone: phoneText
            };
            App.NativeBridge.sendFindCode(data);
        }
        else {
            TipsLog.hallInfo("请输入正确的手机号");
        }
    };
    /**点击提交 */
    LoginPanel.prototype.getFind = function () {
        if (!this.phoneEdit0.text) {
            TipsLog.hallInfo("手机号不能为空");
        }
        else if (!this.verifyEdit0.text) {
            TipsLog.hallInfo("验证码不能为空");
        }
        else if (!this.passEditZS0.text) {
            TipsLog.hallInfo("密码不能为空");
        }
        else if (!this.passEditZU0.text) {
            TipsLog.hallInfo("确认密码不能为空");
        }
        else if (this.phoneEdit0.text.length < 11) {
            TipsLog.hallInfo("请输入11位手机号");
        }
        else if (this.passEditZS0.text.length < 6) {
            TipsLog.hallInfo("密码为6~16位数字或字母组合");
        }
        else if (this.passEditZS0.text != this.passEditZU0.text) {
            TipsLog.hallInfo("密码和确认密码不一致");
        }
        else {
            var data = {
                phone: this.phoneEdit0.text,
                password: this.passEditZS0.text,
                verificationcode: this.verifyEdit0.text
            };
            App.NativeBridge.sendFind(data);
        }
    };
    /**完成 */
    LoginPanel.prototype.onTouchSubmit = function () {
        var _this = this;
        var phoneText = this.nameEdit0.text;
        if (phoneText) {
            var data = {
                nickname: this.nameEdit0.text,
                sex: Number(this.sexMRadio.group.selectedValue) + 1,
                icon: this.iconGro.getChildAt(Number(this.iconRadio.group.selectedValue)).source
            };
            App.NativeBridge.sendBaseInfo(data);
            var http = new HttpSender();
            var dataGame = ProtocolHttp.sendBaseInfo;
            dataGame.param.name = this.nameEdit0.text;
            dataGame.param.sex = (this.sexMRadio.group.selectedValue + 1) + "";
            dataGame.param.headimgindex = (Number(this.iconRadio.group.selectedValue) + 1) + "";
            http.send(dataGame, function (data) {
                console.log("基本信息返回" + data);
                if (!data.ret) {
                    var myInfo = App.DataCenter.UserInfo.getMyUserVo();
                    myInfo.sex = data.data.sex;
                    myInfo.nickName = data.data.name;
                    _this.hide();
                }
                else {
                    TipsLog.hallInfo("个人信息修改失败");
                }
            }, this, false);
        }
        else {
            TipsLog.hallInfo("请输入昵称");
        }
    };
    LoginPanel.prototype.sexChange = function () {
        if (!this.recData) {
            this.hide();
            return;
        }
        this.iconRadio.group.selectedValue = "0";
        var iconList = this.recData.headimg_1;
        if (this.sexMRadio.group.selectedValue == "1") {
            iconList = this.recData.headimg_2;
        }
        for (var i = 0; i < 3; i++) {
            this.iconGro.getChildAt(i).source = iconList[(i + 1) + ""];
        }
    };
    return LoginPanel;
}(BasePanel));
__reflect(LoginPanel.prototype, "LoginPanel");
