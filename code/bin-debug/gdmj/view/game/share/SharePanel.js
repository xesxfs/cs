var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *  分享
 * @author chenkai
 * @date 2016/8/15
 *
 * change 2017/05/09
 * huanglong
 */
var SharePanel = (function (_super) {
    __extends(SharePanel, _super);
    function SharePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "SharePanelSkin";
        return _this;
    }
    SharePanel.prototype.onEnable = function () {
        this.share_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qrCodeImg.source = App.DataCenter.qrCodeUrl;
    };
    SharePanel.prototype.onRemove = function () {
        this.share_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.pengjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
    };
    SharePanel.prototype.onTouchShare = function (e) {
        var shareType = 0;
        switch (e.target) {
            case this.pengjiBtn:
                shareType = 0;
                break;
            case this.qqBtn:
                shareType = 1;
                break;
            case this.wxBtn:
                shareType = 2;
                break;
            case this.wxfriendBtn:
                shareType = 3;
                break;
            default:
                break;
        }
        TipsLog.hallInfo("分享请求已发送");
        this.shareTo(shareType.toString());
        this.hide();
    };
    SharePanel.prototype.shareTo = function (shareType) {
        var data = {
            gameId: "10004",
            share: shareType,
            gameName: "长沙麻将",
            description: "采用长沙最流行的麻将规则，完美还原长沙当地玩法的正宗长沙麻将！"
        };
        App.NativeBridge.sendNormalShare(data);
    };
    /**关闭 */
    SharePanel.prototype.close = function () {
        this.hide();
    };
    return SharePanel;
}(BasePanel));
__reflect(SharePanel.prototype, "SharePanel");
