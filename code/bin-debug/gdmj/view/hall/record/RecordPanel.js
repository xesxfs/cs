var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 记录界面
 * @author huanglong
 * 2017/3/17
 */
var RecordPanel = (function (_super) {
    __extends(RecordPanel, _super);
    function RecordPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "RecordPanelSkin";
        _this.recordList.useVirtualLayout = false;
        return _this;
    }
    /**添加到场景中*/
    RecordPanel.prototype.onEnable = function () {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.setData(this.recData);
    };
    /**从场景中移除*/
    RecordPanel.prototype.onRemove = function () {
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    /**设置数据 */
    RecordPanel.prototype.setData = function (data) {
        if (data.length > 0) {
            var ac = new eui.ArrayCollection();
            ac.source = data;
            this.recordList.dataProvider = ac;
            this.recordList.itemRenderer = RecordItem;
            this.nilLabHall.visible = false;
        }
        else {
            this.nilLabHall.visible = true;
        }
    };
    /**返回 */
    RecordPanel.prototype.back = function () {
        this.hide();
    };
    return RecordPanel;
}(BasePanel));
__reflect(RecordPanel.prototype, "RecordPanel");
