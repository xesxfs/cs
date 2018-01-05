var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 记录详情界面
 * @author huanglong
 * 2017/3/17
 */
var RecordDetailPanel = (function (_super) {
    __extends(RecordDetailPanel, _super);
    function RecordDetailPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "RecordDetailPanelSkin";
        return _this;
    }
    /**添加到场景中*/
    RecordDetailPanel.prototype.onEnable = function () {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.initView();
        this.setData(this.recData.detail);
    };
    /**从场景中移除*/
    RecordDetailPanel.prototype.onRemove = function () {
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    RecordDetailPanel.prototype.initView = function () {
        var itemData = this.recData.survey;
        console.log(this.recData);
        this.roomLab.text = "房号:" + this.recData.deskCode;
        this.dateLab.text = ArrayTool.formatDate1(this.recData.deskBuildDate);
        this.timeLab.text = ArrayTool.formatDate2(this.recData.deskBuildDate);
        for (var i = 0; i < itemData.length; i++) {
            var point = "";
            var nameColor = 0x696969;
            var pointColor = 0x696969;
            if (Number(itemData[i].point) > 0) {
                point = "+" + itemData[i].point;
                nameColor = 0x7e5a3d;
                pointColor = 0xb33318;
            }
            else {
                point = itemData[i].point;
            }
            this.listGro.getChildAt(4 + i * 2).text = StringTool.formatNickName(itemData[i].name);
            this.listGro.getChildAt(4 + i * 2).textColor = nameColor;
            this.listGro.getChildAt(4 + i * 2 + 1).text = point;
            this.listGro.getChildAt(4 + i * 2 + 1).textColor = pointColor;
        }
        var selfId = App.DataCenter.UserInfo.httpUserInfo.userID;
        for (var i = 0; i < itemData.length; i++) {
            if (selfId == Number(itemData[i].playerID)) {
                this.myselfGro.getChildAt(i).visible = true;
            }
            else {
                this.myselfGro.getChildAt(i).visible = false;
            }
        }
        var totalStr = "";
        if (this.recData.pattern == "9999") {
            totalStr = "-";
        }
        else {
            totalStr = this.recData.pattern;
        }
        this.roundLab.text = this.recData.playtotal + "/" + totalStr;
    };
    /**设置数据 */
    RecordDetailPanel.prototype.setData = function (data) {
        var ac = new eui.ArrayCollection();
        for (var i = 0; i < data.length; i++) {
            data[i]["roundNum"] = i + 1;
        }
        ac.source = data;
        this.recordDetailList.dataProvider = ac;
        this.recordDetailList.itemRenderer = RecordDetailItem;
    };
    /**返回 */
    RecordDetailPanel.prototype.back = function () {
        this.hide();
    };
    return RecordDetailPanel;
}(BasePanel));
__reflect(RecordDetailPanel.prototype, "RecordDetailPanel");
