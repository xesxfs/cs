/**
 * 分享记录item
 * @author huanglong
 *  2017/05/09
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareRecordItem = (function (_super) {
    __extends(ShareRecordItem, _super);
    function ShareRecordItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShareRecordItemSkin";
        return _this;
    }
    ShareRecordItem.prototype.childrenCreated = function () {
    };
    ShareRecordItem.prototype.dataChanged = function () {
        var itemData = this.data;
        console.log("itemData++++++", itemData);
        this.headImg.mask = this.headMaskImg;
        this.headImg.source = itemData.headurl;
        if (itemData.self) {
            this.bgImg.texture = RES.getRes("share_record_self_png");
        }
        else {
            this.bgImg.texture = RES.getRes("share_record_else_png");
        }
        this.bigWinImg.visible = itemData.bigwin;
        if (itemData.rank == 1) {
            this.numImg.visible = true;
            this.numLab.visible = false;
        }
        else {
            this.numImg.visible = false;
            this.numLab.visible = true;
            this.numLab.text = itemData.rank + "";
        }
        this.nameLab.text = StringTool.formatNickName(itemData.name + "");
        var point = parseInt(itemData.point);
        if (point > 0) {
            this.winNumLab.font = "win_fnt";
            this.winNumLab.text = "+" + itemData.point;
        }
        else {
            this.winNumLab.font = "lose_fnt";
            this.winNumLab.text = "" + itemData.point;
        }
        this.winLab.text = itemData.wincount + "";
        this.ownerImg.visible = itemData.ower;
    };
    return ShareRecordItem;
}(eui.ItemRenderer));
__reflect(ShareRecordItem.prototype, "ShareRecordItem");
