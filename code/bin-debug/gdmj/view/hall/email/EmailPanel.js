var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *	邮箱界面
 * @author eyanlong
 *	2017/2/23
 */
var EmailPanel = (function (_super) {
    __extends(EmailPanel, _super);
    function EmailPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "EmailSkin";
        return _this;
    }
    /**添加到场景中*/
    EmailPanel.prototype.onEnable = function () {
        this.email_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    /**从场景中移除*/
    EmailPanel.prototype.onRemove = function () {
        this.email_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    /**设置数据 */
    EmailPanel.prototype.setData = function (data) {
        if (data.length > 0) {
            var ac = new eui.ArrayCollection();
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var dataObj = new Object();
                dataObj["data"] = data[i];
                arr.push(dataObj);
            }
            ac.source = arr;
            this.emailList.dataProvider = ac;
            this.emailList.itemRenderer = EmailItem;
            this.nilLabHall.visible = false;
        }
        else {
            this.nilLabHall.visible = true;
        }
    };
    /*刷新邮件列表*/
    EmailPanel.prototype.sendGetEmail = function () {
        var http = new HttpSender();
        var qr = ProtocolHttp.send_z_emailList;
        http.send(qr, this.revGetEmail, this);
    };
    /**邮件返回 */
    EmailPanel.prototype.revGetEmail = function (data) {
        if (!data.ret) {
            this.setData(data.data);
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    /**返回 */
    EmailPanel.prototype.back = function () {
        this.hide();
    };
    return EmailPanel;
}(BasePanel));
__reflect(EmailPanel.prototype, "EmailPanel");
