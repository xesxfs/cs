/**
 * @author xiongjian
 * 2017-4-11
 * 解散房间面板
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SendjiesanPanel = (function (_super) {
    __extends(SendjiesanPanel, _super);
    function SendjiesanPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "sendJiesanPanelSKin";
        return _this;
    }
    /**添加到场景中*/
    SendjiesanPanel.prototype.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jujueTouch, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    };
    SendjiesanPanel.prototype.jujueTouch = function () {
        this.close();
    };
    SendjiesanPanel.prototype.okTouch = function () {
        //发送解散房间
        var gameCtrl = App.getController(GameController.NAME);
        //    gameCtrl.sendJieSan();
        this.close();
        TipsLog.gameInfo("消息已发送");
    };
    SendjiesanPanel.prototype.close = function () {
        this.hide();
    };
    return SendjiesanPanel;
}(BasePanel));
__reflect(SendjiesanPanel.prototype, "SendjiesanPanel");
