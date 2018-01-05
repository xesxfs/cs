/**
 * 好友房记录item
 * @author huanglong
 * 2017/04/25
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameRecordItem = (function (_super) {
    __extends(GameRecordItem, _super);
    function GameRecordItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameRecordPanelItemSkin";
        return _this;
    }
    GameRecordItem.prototype.dataChanged = function () {
        var itemData = this.data;
        this.roundLab.text = "第" + itemData.current_play_count + "局";
        this.dateLab.text = ArrayTool.formatDate1(itemData.game_over_time);
        this.timeLab.text = ArrayTool.formatDate2(itemData.game_over_time);
        for (var i = 0; i < 4; i++) {
            var point = "";
            var nameColor = 0x696969;
            var pointColor = 0x696969;
            if (Number(itemData["seat" + i][1]) > 0) {
                point = "+" + itemData["seat" + i][1];
                nameColor = 0x7e5a3d;
                pointColor = 0xb33318;
            }
            else {
                point = itemData["seat" + i][1];
            }
            this.winLabGro.getChildAt(i * 2).text = StringTool.formatNickName(itemData["seat" + i][0]);
            this.winLabGro.getChildAt(i * 2).textColor = nameColor;
            this.winLabGro.getChildAt(i * 2 + 1).text = point + "";
            this.winLabGro.getChildAt(i * 2 + 1).textColor = pointColor;
        }
        var selfId = App.DataCenter.UserInfo.httpUserInfo.userID;
        for (var i = 0; i < 4; i++) {
            if (selfId == Number(itemData["seat" + i][2])) {
                this.selfGro.getChildAt(i).visible = true;
            }
            else {
                this.selfGro.getChildAt(i).visible = false;
            }
            if (itemData.banker_seat == i) {
                this.zhuangGro.getChildAt(i).visible = true;
            }
            else {
                this.zhuangGro.getChildAt(i).visible = false;
            }
        }
    };
    GameRecordItem.prototype.childrenCreated = function () {
    };
    return GameRecordItem;
}(eui.ItemRenderer));
__reflect(GameRecordItem.prototype, "GameRecordItem");
