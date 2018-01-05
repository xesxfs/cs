var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 好友房记录
 * @author huanglong
 * 2017/4/25
 */
var GameRecordPanel = (function (_super) {
    __extends(GameRecordPanel, _super);
    function GameRecordPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameRecordPanelSkin";
        return _this;
    }
    /**添加到场景中*/
    GameRecordPanel.prototype.onEnable = function () {
        if (this.recData.length < 1) {
            this.nilLab.visible = true;
        }
        else {
            this.nilLab.visible = false;
        }
        this.setData(this.recData);
    };
    /**从场景中移除*/
    GameRecordPanel.prototype.onRemove = function () {
        this.recData = [];
    };
    /**设置数据 */
    GameRecordPanel.prototype.setData = function (data) {
        console.log("_++++++++++++", data);
        data.sort(function (a, b) {
            return b.current_play_count - a.current_play_count;
        });
        var ac = new eui.ArrayCollection();
        ac.source = data;
        this.gameRecordList.dataProvider = ac;
        this.gameRecordList.itemRenderer = GameRecordItem;
    };
    /**返回 */
    GameRecordPanel.prototype.back = function () {
        this.hide();
    };
    return GameRecordPanel;
}(BasePanel));
__reflect(GameRecordPanel.prototype, "GameRecordPanel");
