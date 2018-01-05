var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 背包界面
 * @author eyanlong
 * @date 2017/2/22
 */
var BackpackPanel = (function (_super) {
    __extends(BackpackPanel, _super);
    function BackpackPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "BackpackPanelSkin";
        return _this;
    }
    BackpackPanel.prototype.onEnable = function () {
        this.mall_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        if (this.gameBool) {
            this.hallGro.visible = false;
            this.gameGro.visible = true;
            this.backpackList = this.backpackListGame;
        }
        else {
            this.hallGro.visible = true;
            this.gameGro.visible = false;
            this.backpackList = this.backpackListHall;
        }
        this.setData(this.recData);
    };
    BackpackPanel.prototype.onRemove = function () {
        this.mall_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.gameBool = false;
    };
    BackpackPanel.prototype.setData = function (list) {
        if (list.length > 0) {
            var ac = new eui.ArrayCollection();
            if (this.gameBool) {
                for (var i = 0; i < list.length; i++) {
                    list[i].gameBool = true;
                }
            }
            ac.source = list;
            this.backpackList.dataProvider = ac;
            this.backpackList.itemRenderer = BackpackItem;
            this.nilLabHall.visible = false;
            this.nilLabGame.visible = false;
        }
        else {
            if (this.gameBool) {
                this.nilLabHall.visible = false;
                this.nilLabGame.visible = true;
            }
            else {
                this.nilLabHall.visible = true;
                this.nilLabGame.visible = false;
            }
        }
    };
    /**返回 */
    BackpackPanel.prototype.back = function () {
        this.hide();
    };
    return BackpackPanel;
}(BasePanel));
__reflect(BackpackPanel.prototype, "BackpackPanel");
