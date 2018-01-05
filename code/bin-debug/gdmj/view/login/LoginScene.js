var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 登录界面
 * @author chenwei
 * @date 2016/6/27
 */
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "LoginSceneSkin";
        return _this;
    }
    LoginScene.prototype.onEnable = function () {
        App.NativeBridge.getBagType();
    };
    LoginScene.prototype.onRemove = function () {
    };
    /**判断本机是否存在token */
    LoginScene.prototype.isToken = function () {
        var refreshToken = egret.localStorage.getItem("refresh_token");
        if (refreshToken != null && refreshToken != undefined) {
            var ctrl1 = new LoginController();
            ctrl1.sendLoginAppReq("", refreshToken);
        }
        else {
        }
    };
    //原生登陆放回     
    LoginScene.prototype.backWXLogin = function () {
        egret.ExternalInterface.addCallback("wxLoginBack", function (message) {
            var ctrl1 = new LoginController();
            ctrl1.sendLoginAppReq(message, "");
        });
    };
    /**点击微信登录*/
    LoginScene.prototype.onWXLogin = function (e) {
        //egret.ExternalInterface.call("wxLogin","wx"); 
        /**test */
        if (!this.editText) {
            this.showTestInput();
        }
        else {
            if (this.editText.text != "") {
                this.ctrl.sendDebugLoginReq(this.editText.text, App.DataCenter.debugInfo.password);
            }
        }
    };
    /**Native资源更新列表*/
    LoginScene.prototype.getChangeList = function () {
        var changeList = RES.getVersionController().getChangeList();
        var len = changeList.length;
        console.log("加载列表长度:" + len);
        for (var i = 0; i < len; i++) {
            console.log("加载列表" + i + ":" + changeList[i].url + "," + changeList[i].size);
        }
    };
    /**输入测试账号 */
    LoginScene.prototype.showTestInput = function () {
        this.editText = new eui.EditableText();
        this.editText.y = 800;
        this.editText.size = 40;
        this.editText.width = 200;
        this.editText.height = 100;
        this.editText.textColor = 0x8CC254;
        this.editText.horizontalCenter = 0;
        this.editText.prompt = "输入账号";
        this.editText.setFocus();
        this.addChild(this.editText);
    };
    /**测试账号按钮*/
    LoginScene.prototype.debugBtns = function () {
        var _this = this;
        var row = 2;
        var column = 6;
        var xoffset = 450;
        var yoffset = 40;
        for (var i = 1; i <= 16; i++) {
            var b = new eui.Label();
            var ii = i - 1;
            b.background = true;
            b.backgroundColor = 0x000000;
            b.text = "test" + i.toString();
            b.x = ii % column * 100 + xoffset;
            b.y = yoffset + ~~(ii / column) * 60;
            b.x = ~~(ii / row) * 80 + xoffset;
            b.y = yoffset + (ii % row) * 60;
            this.addChild(b);
            b.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                var lab = e.target;
                _this.ctrl.sendDebugLoginReq(lab.text, App.DataCenter.debugInfo.password);
            }, this);
        }
    };
    return LoginScene;
}(BaseScene));
__reflect(LoginScene.prototype, "LoginScene");
