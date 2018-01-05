var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 2017-3-8
 * author:xiongjian
 */
var GameResultItem = (function (_super) {
    __extends(GameResultItem, _super);
    function GameResultItem() {
        var _this = _super.call(this) || this;
        _this.offX = 36;
        _this.cardOff = 86;
        _this.skinName = "gameResultItemSkin";
        return _this;
    }
    GameResultItem.prototype.dataChanged = function () {
        console.log("item==", this.data);
        var point = parseInt(this.data.point);
        if (point > 0) {
            this.fenLabel.font = "win_fnt";
            this.fenLabel.text = "+" + this.data.point;
        }
        else {
            this.fenLabel.font = "lose_fnt";
            this.fenLabel.text = "" + this.data.point;
        }
        this.typeLabel.text = this.data.type;
        this.nameLabel.text = this.data.name;
        //this.avaterImg.source = this.data.headUrl;
        var headUrl = this.data.headUrl;
        if (headUrl && headUrl != "") {
            this.avaterImg.source = headUrl;
            this.avaterImg.mask = this.headMaskImg;
        }
        var qiShouHu = this.data.qiShouHu;
        var niao = this.data.niao;
        if (niao.length > 0) {
            this.zhongNiaoGroup.visible = true;
            if (qiShouHu) {
                this.setDiceList(niao);
            }
            else {
                this.setNiaoList(niao);
            }
        }
        else {
            this.zhongNiaoGroup.visible = false;
        }
        var huType = this.data.huType;
        if (huType) {
            var text = "";
            for (var i = 0; i < huType.length; i++) {
                text = text + "" + App.DataCenter.GameInfo.csHuTypeList[huType[i]] + "  ";
            }
            this.huTypeLabel.text = text;
        }
        else {
            this.huTypeLabel.visible = false;
        }
        // let cardList = [0x11];
        // let ganglist =[0x11,0x22];
        var ganglist = this.data.gangCards;
        var cardList = this.data.handCards;
        var cardX = this.setGangList(ganglist);
        this.setCardList(cardList, cardX);
    };
    //杠牌
    GameResultItem.prototype.setGangList = function (ganglist) {
        var len = ganglist.length;
        var cardX = 0;
        var card;
        var cardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < 4; j++) {
                if (j == 3) {
                    card = cardFactory.getOutCard(ganglist[i], UserPosition.Down);
                    card.x = this.cardOff + this.offX * (i * 3 + 1);
                    card.y = -10;
                    card.scaleX = 0.70;
                    card.scaleY = 0.70;
                    this.hupaiGroup.addChild(card);
                }
                else {
                    card = cardFactory.getOutCard(ganglist[i], UserPosition.Down);
                    card.x = this.cardOff + this.offX * (i * 3 + j);
                    card.y = 3;
                    card.scaleX = 0.70;
                    card.scaleY = 0.70;
                    this.hupaiGroup.addChild(card);
                    cardX = card.x + this.offX;
                }
            }
        }
        return cardX;
    };
    //胡牌
    GameResultItem.prototype.setCardList = function (cardList, cardX) {
        var len = cardList.length;
        var card;
        var cardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(cardList[i], UserPosition.Down);
            // card.x = 50 + this.offX * i;
            if (cardX < this.cardOff) {
                cardX = this.cardOff;
            }
            card.x = cardX + this.offX * i;
            card.y = 3;
            card.scaleX = 0.70;
            card.scaleY = 0.70;
            this.hupaiGroup.addChild(card);
        }
    };
    //骰子鸟
    GameResultItem.prototype.setDiceList = function (niaoList) {
        var len = niaoList.length;
        for (var i = 0; i < len; i++) {
            var niao = new eui.Image();
            niao.source = RES.getRes("s" + niaoList[i] + "_png");
            console.log("niao" + niao.source);
            niao.x = 50 + 50 * i;
            niao.y = -6;
            niao.scaleX = 0.8;
            niao.scaleY = 0.8;
            this.zhongNiaoGroup.addChild(niao);
        }
    };
    //牌鸟
    GameResultItem.prototype.setNiaoList = function (niaoList) {
        var len = niaoList.length;
        var card;
        var cardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(niaoList[i], UserPosition.Down);
            card.x = 50 + this.offX * i;
            card.y = -10;
            card.scaleX = 0.6;
            card.scaleY = 0.6;
            this.zhongNiaoGroup.addChild(card);
        }
    };
    return GameResultItem;
}(eui.ItemRenderer));
__reflect(GameResultItem.prototype, "GameResultItem");
