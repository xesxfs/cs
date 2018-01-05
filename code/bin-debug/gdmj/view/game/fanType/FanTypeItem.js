var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 番型项
 * @author chenkai
 * @date 2016/8/31
 */
var FanTypeItem = (function (_super) {
    __extends(FanTypeItem, _super);
    function FanTypeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "FanTypeItemSkin";
        return _this;
    }
    FanTypeItem.prototype.setName = function (fanName) {
        this.nameLabel.text = fanName;
    };
    FanTypeItem.prototype.setDescripe = function (des, color) {
        if (color === void 0) { color = null; }
        this.descripeLabel.text = des;
        if (color) {
            this.descripeLabel.textColor = color;
        }
        //描述超过两行时，牌容器下移和Item高度增加
        if (this.descripeLabel.numLines >= 2) {
            var offerY = this.descripeLabel.size * (this.descripeLabel.numLines - 1);
            this.cardGroup.y += offerY;
            this.height += offerY;
        }
    };
    FanTypeItem.prototype.setCardList = function (cardList) {
        var len = cardList.length;
        var card;
        var cardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(cardList[i], UserPosition.Down);
            card.scaleX = 0.8;
            card.scaleY = 0.8;
            card.x = 0.7 * card.width * i;
            card.y = 0;
            this.cardGroup.addChild(card);
        }
        //牌数组为0时，Item高度减少
        if (len == 0) {
            this.height += (this.descripeLabel.numLines - 2) * this.descripeLabel.size - 50;
        }
    };
    return FanTypeItem;
}(eui.Component));
__reflect(FanTypeItem.prototype, "FanTypeItem");
