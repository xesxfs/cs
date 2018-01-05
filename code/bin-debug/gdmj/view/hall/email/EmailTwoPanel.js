var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *	二级邮箱界面
 * @author eyanlong
 *	2017/2/23
 */
var EmailTwoPanel = (function (_super) {
    __extends(EmailTwoPanel, _super);
    function EmailTwoPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "EmailTwoSkin";
        return _this;
    }
    /**添加到场景中*/
    EmailTwoPanel.prototype.onEnable = function () {
        this.email_two_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.email_two_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receive, this);
    };
    /**从场景中移除*/
    EmailTwoPanel.prototype.onRemove = function () {
        this.email_two_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.email_two_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receive, this);
    };
    /**设置内容 */
    EmailTwoPanel.prototype.setData = function (data) {
        this.eid = data.id;
        if (data.reward.length < 1) {
            this.enclosure.visible = false;
        }
        else {
            this.enclosure.visible = true;
            this.email_name.text = data.reward[0].name + "(" + data.reward[0].quantity + ")";
        }
        if (data.is_receive == 0) {
            this.getedGro.visible = false;
            this.getGro.visible = true;
            this.setIconColor();
        }
        else {
            this.getedGro.visible = true;
            this.getGro.visible = false;
            this.setIconGray();
        }
        this.email_title.text = data.title;
        this.email_content.text = data.content;
    };
    /**领取附件 */
    EmailTwoPanel.prototype.receive = function () {
        var ctrl = new HallController();
        ctrl.sendEmailGoods(this.eid);
    };
    /**更新邮件状态,领取成功回调 */
    EmailTwoPanel.prototype.refreshEmailStatus = function () {
        this.getedGro.visible = true;
        this.getGro.visible = false;
        this.setIconGray();
    };
    EmailTwoPanel.prototype.setIconColor = function () {
        this.iconImg.filters = [];
    };
    EmailTwoPanel.prototype.setIconGray = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        this.iconImg.filters = [colorFlilter];
    };
    EmailTwoPanel.prototype.back = function () {
        App.PanelManager.getPanel(PanelConst.EmailPanel).sendGetEmail();
        this.hide();
    };
    return EmailTwoPanel;
}(BasePanel));
__reflect(EmailTwoPanel.prototype, "EmailTwoPanel");
