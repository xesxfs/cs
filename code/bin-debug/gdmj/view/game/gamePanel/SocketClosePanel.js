var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * socket 关闭弹窗
 */
var SocketClosePanel = (function (_super) {
    __extends(SocketClosePanel, _super);
    function SocketClosePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "socketClosePanelSkin";
        return _this;
    }
    /**添加到场景中*/
    SocketClosePanel.prototype.onEnable = function () {
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    };
    /**从场景中移除*/
    SocketClosePanel.prototype.onRemove = function () {
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    };
    //重启游戏
    SocketClosePanel.prototype.okTouch = function () {
        this.hide();
        if (App.SceneManager.getCurScene() == App.SceneManager.getScene(SceneConst.GameScene)) {
            App.SceneManager.getScene(SceneConst.GameScene) && App.SceneManager.getScene(SceneConst.GameScene).resetScene();
        }
        App.getController(LoginController.NAME).unRegister();
        App.SceneManager.sceneList[SceneConst.GameScene] = null;
        App.SceneManager.sceneList[SceneConst.HallScene] = null;
        App.DataCenter.socketClose = true;
        egret.Tween.removeAllTweens();
        App.getInstance().startUp();
    };
    SocketClosePanel.prototype.sentHeart = function () {
        var data = ProtocolHead.Send100000;
        App.gameSocket.send(data);
    };
    return SocketClosePanel;
}(BasePanel));
__reflect(SocketClosePanel.prototype, "SocketClosePanel");
