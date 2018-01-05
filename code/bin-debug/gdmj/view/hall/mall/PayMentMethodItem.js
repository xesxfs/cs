/**
 * 支付方式ITEM
 * @author huanglong
 *  2017/05/05
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PayMentMethodItem = (function (_super) {
    __extends(PayMentMethodItem, _super);
    function PayMentMethodItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "PaymentMethodItemSkin";
        return _this;
    }
    PayMentMethodItem.prototype.dataChanged = function () {
        this.itemData = this.data;
        if (this.itemData.pay_type == 4) {
            this.payNameLab.textFlow = [
                { text: "钱包剩余", style: { "size": 30, "textColor": 0x000000, "fontFamily": "Microsoft YaHei" } },
                { text: "(¥" + this.itemData.name + ")", style: { "size": 30, "textColor": 0x943300, "fontFamily": "Microsoft YaHei" } }
            ];
        }
        else {
            this.payNameLab.text = this.itemData.name;
        }
    };
    PayMentMethodItem.prototype.childrenCreated = function () {
        this.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    PayMentMethodItem.prototype.onTouch = function (e) {
        var payMentPanelObj = App.PanelManager.getPanel(PanelConst.PaymentPanel);
        payMentPanelObj.changeMethod(this.itemData.pay_type, this.itemData.name);
        App.PanelManager.getPanel(PanelConst.PaymentMethod).hide();
    };
    return PayMentMethodItem;
}(eui.ItemRenderer));
__reflect(PayMentMethodItem.prototype, "PayMentMethodItem");
