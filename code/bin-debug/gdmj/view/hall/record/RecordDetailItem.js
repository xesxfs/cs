/**
 * 记录详情item
 * @author huanglong
 * 2017/03/17
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RecordDetailItem = (function (_super) {
    __extends(RecordDetailItem, _super);
    function RecordDetailItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "RecordDetailItemSkin";
        return _this;
    }
    RecordDetailItem.prototype.dataChanged = function () {
        var itemData = this.data;
        this.roundLab.text = "第" + itemData.roundNum + "局";
        this.dateLab.text = ArrayTool.formatDate1(itemData.gameDate);
        this.timeLab.text = ArrayTool.formatDate2(itemData.gameDate);
        itemData = itemData.userinfo_sig;
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
            this.winLabGro.getChildAt(i * 2).text = StringTool.formatNickName(itemData[i].name);
            this.winLabGro.getChildAt(i * 2).textColor = nameColor;
            this.winLabGro.getChildAt(i * 2 + 1).text = point;
            this.winLabGro.getChildAt(i * 2 + 1).textColor = pointColor;
        }
        var selfId = App.DataCenter.UserInfo.httpUserInfo.userID;
        for (var i = 0; i < itemData.length; i++) {
            if (selfId == Number(itemData[i].playerID)) {
                this.selfGro.getChildAt(i).visible = true;
            }
            else {
                this.selfGro.getChildAt(i).visible = false;
            }
        }
    };
    RecordDetailItem.prototype.childrenCreated = function () {
    };
    return RecordDetailItem;
}(eui.ItemRenderer));
__reflect(RecordDetailItem.prototype, "RecordDetailItem");
