/**
 * 支付界面
 * @author eyanlong
 * @date 2017/2/21
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PaymentPanel = (function (_super) {
    __extends(PaymentPanel, _super);
    function PaymentPanel() {
        var _this = _super.call(this) || this;
        /**支付对象ID */
        _this.targetId = 1;
        /**支付方式 */
        _this.payType = 1;
        _this.skinName = "PaymentPanelSkin";
        return _this;
    }
    PaymentPanel.prototype.onEnable = function () {
        this.payment_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.payment_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rights, this);
        this.payment_method.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    };
    PaymentPanel.prototype.onRemove = function () {
        this.payment_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.payment_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rights, this);
        this.payment_method.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    };
    /**设置数据 */
    PaymentPanel.prototype.setData = function (data) {
        this.targetId = Number(this.recData);
        this.iconImg.source = App.getController("HallController").getUrl(this.recData);
        this.payment_name.text = data.name;
        this.payType = Number(data.pay_type);
        this.payment_money.text = "¥" + data.price + ".00";
        if (Number(this.payType) == 4) {
            var purseElement = [
                { text: "钱包剩余", style: { "size": 30, "textColor": 0x000000, "fontFamily": "Microsoft YaHei" } },
                { text: "（¥" + data.paymentname + "）", style: { "size": 30, "textColor": 0x943300, "fontFamily": "Microsoft YaHei" } }
            ];
            this.purseLab.textFlow = purseElement;
        }
        else {
            this.purseLab.text = data.paymentname;
        }
    };
    /**关闭 */
    PaymentPanel.prototype.close = function () {
        this.hide();
    };
    /**确认支付 */
    PaymentPanel.prototype.rights = function () {
        var ctrl = new HallController();
        ctrl.sendBuySure(this.targetId, this.payType);
        this.hide();
    };
    /**选择支付方式 */
    PaymentPanel.prototype.method = function () {
        if (App.DeviceUtils.IsIos) {
            return;
        }
        App.getController("HallController").sendBuyPayment();
    };
    /**接收支付方式变更 */
    PaymentPanel.prototype.changeMethod = function (type, name) {
        if (type === void 0) { type = 1; }
        if (name === void 0) { name = 0; }
        this.payType = type;
        if (Number(name)) {
            var purseElement = [
                { text: "钱包剩余", style: { "size": 30, "textColor": 0x000000, "fontFamily": "Microsoft YaHei" } },
                { text: "（¥" + name + "）", style: { "size": 30, "textColor": 0x943300, "fontFamily": "Microsoft YaHei" } }
            ];
            this.purseLab.textFlow = purseElement;
        }
        else {
            this.purseLab.text = name;
        }
    };
    return PaymentPanel;
}(BasePanel));
__reflect(PaymentPanel.prototype, "PaymentPanel");
