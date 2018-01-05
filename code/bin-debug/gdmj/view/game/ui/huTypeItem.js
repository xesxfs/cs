var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author xiongjian
 * 2017-3-28
 */
var HuTypeItem = (function (_super) {
    __extends(HuTypeItem, _super);
    function HuTypeItem() {
        var _this = _super.call(this) || this;
        _this.cardList = [];
        _this.skinName = "huTypeItemSkin";
        _this.touchEnabled = true;
        return _this;
    }
    HuTypeItem.prototype.dataChanged = function () {
        this.cardList = this.data.cardList;
        this.huLabel.text = this.data.hulabel;
        //  console.log("cardlist"+this.data.cardList);
        this.setCardList(this.cardList);
    };
    HuTypeItem.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    HuTypeItem.prototype.onTouch = function () {
        var nextCardJson = ProtocolData.Send180_99_0;
        nextCardJson.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        nextCardJson.cardList = this.cardList;
        App.gameSocket.send(ProtocolHead.Send180_99_0, nextCardJson);
        console.log("发送确认下14张牌值");
        TipsLog.gameInfo("发送成功");
        App.PanelManager.close(PanelConst.HuTypePanel);
    };
    HuTypeItem.prototype.setCardList = function (cardList) {
        var len = cardList.length;
        var card;
        var cardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(cardList[i], UserPosition.Up);
            card.x = 40 * i;
            card.y = 0;
            this.cardListGroup.addChild(card);
        }
    };
    return HuTypeItem;
}(eui.ItemRenderer));
__reflect(HuTypeItem.prototype, "HuTypeItem");
