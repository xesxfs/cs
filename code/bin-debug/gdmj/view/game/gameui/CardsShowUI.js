var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CardsShowUI = (function (_super) {
    __extends(CardsShowUI, _super);
    function CardsShowUI() {
        var _this = _super.call(this) || this;
        _this.playNum = 4; //4人
        return _this;
    }
    CardsShowUI.prototype.childrenCreated = function () {
        this.cardLogic = CardLogic.getInstance();
        this.cardFactory = CardFactory.getInstance();
        this.initPos();
        this.cardGroups[UserPosition.Down].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.reset();
        this.rectGroup.visible = false;
    };
    CardsShowUI.prototype.initCardList = function () {
        this.handleList = [];
        this.outList = [];
        this.CPGList = [];
        for (var i = 0; i < this.playNum; i++) {
            this.handleList[i] = [];
            this.outList[i] = [];
            this.CPGList[i] = [];
        }
    };
    CardsShowUI.prototype.initPos = function () {
        this.handlePointList = [];
        this.takePointList = [];
        this.outPointList = [];
        this.cardGroups = [];
        this.CPGPointList = [];
        for (var i = 0; i < this.playNum; i++) {
            this.handlePointList[i] = [];
            this.outPointList[i] = [];
            this.CPGPointList[i] = [];
        }
        var len = this.cardGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var cardgroup = this.cardGroup.getChildAt(i);
            this.cardGroups.push(cardgroup);
        }
        this.initDown();
        this.initRight();
        this.initUp();
        this.initLeft();
        this.initCPG();
    };
    CardsShowUI.prototype.initCPG = function () {
        for (var i = 0; i < this.playNum; i++) {
            var cpgGroup = this.rectGroup.getChildAt(i + this.playNum * 2);
            var cpgPosList = this.CPGPointList[i];
            var len = cpgGroup.numChildren;
            for (var i_1 = 0; i_1 < len; i_1++) {
                var cp = cpgGroup.getChildAt(i_1);
                var pos = new egret.Point(cp.x, cp.y);
                cpgPosList.push(pos);
            }
        }
    };
    CardsShowUI.prototype.initDown = function () {
        var len = this.hand0.numChildren;
        var locateGet = this.hand0.getChildAt(len - 1);
        var locateGetPoint = new egret.Point(locateGet.x, locateGet.y);
        this.takePointList.push(locateGetPoint);
        for (var i = len - 2; i >= 0; i--) {
            var op = this.hand0.getChildAt(i);
            var p = new egret.Point(op.x, op.y);
            this.handlePointList[0].push(p);
        }
        var out = this.out0;
        var olen = out.numChildren;
        var outPointList = this.outPointList[0];
        for (var i = 0; i < olen; i++) {
            var co = out.getChildAt(i);
            var point = new egret.Point(co.x, co.y);
            var oper = new CardOper();
            oper.childAt = i;
            oper.point = point;
            var posName = co.name;
            posName && (oper.pos = parseInt(posName));
            outPointList.push(oper);
        }
        this.sortCardOper(outPointList);
    };
    CardsShowUI.prototype.initRight = function () {
        var hlen = this.hand1.numChildren;
        var locateGet = this.hand1.getChildAt(0);
        var locateGetPoint = new egret.Point(locateGet.x, locateGet.y);
        this.takePointList.push(locateGetPoint);
        for (var i = 1; i < hlen; i++) {
            var op = this.hand1.getChildAt(i);
            var p = new egret.Point(op.x, op.y);
            this.handlePointList[1].push(p);
        }
        var out = this.out1;
        var olen = out.numChildren;
        var outPointList = this.outPointList[1];
        for (var i = 0; i < olen; i++) {
            var co = out.getChildAt(i);
            var point = new egret.Point(co.x, co.y);
            var oper = new CardOper();
            oper.childAt = i;
            oper.point = point;
            var posName = co.name;
            posName && (oper.pos = parseInt(posName));
            outPointList.push(oper);
        }
        this.sortCardOper(outPointList);
    };
    CardsShowUI.prototype.initUp = function () {
        var len = this.hand2.numChildren;
        var locateGet = this.hand2.getChildAt(len - 1);
        var locateGetPoint = new egret.Point(locateGet.x, locateGet.y);
        this.takePointList.push(locateGetPoint);
        for (var i = 0; i < len - 1; i++) {
            var op = this.hand2.getChildAt(i);
            var p = new egret.Point(op.x, op.y);
            this.handlePointList[UserPosition.Up].push(p);
        }
        var out = this.out2;
        var olen = out.numChildren;
        var outPointList = this.outPointList[2];
        for (var i = 0; i < olen; i++) {
            var co = out.getChildAt(i);
            var point = new egret.Point(co.x, co.y);
            var oper = new CardOper();
            oper.childAt = i;
            oper.point = point;
            var posName = co.name;
            posName && (oper.pos = parseInt(posName));
            outPointList.push(oper);
        }
        this.sortCardOper(outPointList);
    };
    CardsShowUI.prototype.initLeft = function () {
        var len = this.hand3.numChildren;
        var locateGet = this.hand3.getChildAt(len - 1);
        var locateGetPoint = new egret.Point(locateGet.x, locateGet.y);
        this.takePointList.push(locateGetPoint);
        for (var i = len - 2; i >= 0; i--) {
            var op = this.hand3.getChildAt(i);
            var p = new egret.Point(op.x, op.y);
            this.handlePointList[3].push(p);
        }
        var out = this.out3;
        var olen = out.numChildren;
        var outPointList = this.outPointList[3];
        for (var i = 0; i < olen; i++) {
            var co = out.getChildAt(i);
            var point = new egret.Point(co.x, co.y);
            var oper = new CardOper();
            oper.childAt = i;
            oper.point = point;
            var posName = co.name;
            posName && (oper.pos = parseInt(posName));
            outPointList.push(oper);
        }
        this.sortCardOper(outPointList);
    };
    CardsShowUI.prototype.getHandleCard = function (pos) {
        return this.handleList[pos];
    };
    /***生成手牌，并不显示*/
    CardsShowUI.prototype.createHandCard = function (data) {
        var json = ProtocolData.Rev180_52_0;
        json = data;
        var dealCardList = json.deleaveCard;
        var len = dealCardList.length;
        var card;
        for (var i = 0; i < len; i++) {
            var dealCardInfo = ProtocolData.deleaveCardInfo;
            dealCardInfo = dealCardList[i];
            var pos = this.cardLogic.changeSeat(dealCardInfo.seatID); //获取位置
            var cardList = dealCardInfo.cardList;
            var cardListLen = cardList.length;
            for (var j = 0; j < cardListLen; j++) {
                this.pushHandCard(cardList[j], pos);
            }
        }
    };
    CardsShowUI.prototype.pushHandCard = function (cardValue, pos) {
        var card = this.cardFactory.getHandCard(cardValue, pos);
        this.handleList[pos].push(card);
    };
    /***显示手牌*/
    CardsShowUI.prototype.showHandCard = function (pos) {
        var cardList = this.handleList[pos];
        var cardPoint = this.handlePointList[pos];
        var len = cardList.length;
        var card;
        //自己的牌排列手牌 万 条 筒 字
        if (pos == UserPosition.Down) {
            this.cardLogic.sortHandCard(this.handleList[pos]);
        }
        for (var i = 0; i < len; i++) {
            card = cardList[i];
            card.x = cardPoint[i].x;
            card.y = cardPoint[i].y;
            this.cardGroups[pos].addChild(card);
        }
    };
    /**摸牌*/
    CardsShowUI.prototype.takeCard = function (pos, cardValue) {
        var card;
        var tpoint = this.takePointList[pos];
        card = this.cardFactory.getHandCard(cardValue, pos);
        card.x = tpoint.x;
        card.y = tpoint.y;
        // if (pos == UserPosition.R) {
        // 	this.cardGroups[pos].addChildAt(card, 0);
        // } else {
        this.cardGroups[pos].addChild(card);
        // }
        this.curTakeCard = card;
    };
    /**出牌区域*/
    CardsShowUI.prototype.addCard2Out = function (pos, cardValue) {
        var _this = this;
        var card = this.cardFactory.getOutCard(cardValue, pos);
        this.outList[pos].push(card);
        this.curOutCard = card;
        var op = this.outPointList[pos][this.outList[pos].length - 1];
        card.x = op.point.x;
        card.y = op.point.y;
        card.childAt = op.childAt;
        this.sortCardChildAt(this.outList[pos]);
        this.outList[pos].forEach(function (card) {
            _this.cardGroups[pos + _this.playNum].addChild(card);
        });
    };
    /**吃碰杠移动位置 从手牌拿出一张放到摸牌位置，其他手牌往前移动*/
    CardsShowUI.prototype.offsetHandCard = function (pos) {
        var takePoint = this.takePointList[pos];
        var handCardList = this.getHandleCard(pos);
        var firstCard = handCardList[0];
        firstCard.x = takePoint.x;
        firstCard.y = takePoint.y;
        var handPoint = this.handlePointList[pos];
        var len = handCardList.length;
        var card;
        for (var i = 1; i < len; i++) {
            card = handCardList[i];
            card.x = handPoint[i - 1].x;
            card.y = handPoint[i - 1].y;
        }
    };
    /***通知可以出牌*/
    CardsShowUI.prototype.noticeOutCard = function () {
        this.bAllowOutCard = true;
    };
    /***点击出牌*/
    CardsShowUI.prototype.checkOutCard = function (card) {
        if (card.parent == this.cardGroups[UserPosition.Down]) {
            if (this.bAllowOutCard) {
                if (card.bUp) {
                    this.bAllowOutCard = false;
                    this.curTouchCard = card;
                    this.doAction(ACT_act.Act_NormalDo, [card.cardValue]);
                }
                else {
                    this.downAllHandCard();
                    card.toUp();
                }
            }
            else {
                if (card.bUp) {
                    card.toDown();
                }
                else {
                    this.downAllHandCard();
                    card.toUp();
                }
            }
            App.SoundManager.playEffect(SoundManager.clickCard);
        }
    };
    /**移除出牌区域最后一张牌 */
    CardsShowUI.prototype.rmLastOutCard = function () {
        if (this.curOutCard) {
            var index = this.outList[this.curOutCard.userPos].indexOf(this.curOutCard);
            this.outList[this.curOutCard.userPos].splice(index, 1);
            this.curOutCard.recycle();
            this.curOutCard = null;
        }
    };
    /**从后面移除其他玩家的手牌 */
    CardsShowUI.prototype.rmOtherEndCard = function (pos, nCount) {
        if (nCount === void 0) { nCount = 1; }
        var card;
        for (var i = 0; i < nCount; i++) {
            if (pos == UserPosition.L) {
                card = this.handleList[pos].shift();
            }
            else {
                card = this.handleList[pos].pop();
            }
            card && card.recycle();
        }
    };
    /**从前面移除其他玩家的手牌 */
    CardsShowUI.prototype.rmOtherFirstCard = function (pos, nCount) {
        if (nCount === void 0) { nCount = 1; }
        var card;
        for (var i = 0; i < nCount; i++) {
            card = this.handleList[pos].shift();
            card && card.recycle();
        }
    };
    /**移除指定手牌*/
    CardsShowUI.prototype.removeHandCardByValue = function (cardValue) {
        var cardList = this.handleList[UserPosition.Down];
        var len = cardList.length;
        var card;
        for (var i = 0; i < len; i++) {
            card = cardList[i];
            if (cardValue == card.cardValue) {
                cardList.splice(i, 1);
                card && card.recycle();
                break;
            }
        }
    };
    /**移除手牌列表 */
    CardsShowUI.prototype.removeHandCardByList = function (pos, cardList) {
        var _this = this;
        if (pos == UserPosition.Down) {
            cardList.forEach(function (value) {
                _this.removeHandCardByValue(value);
            });
        }
        else {
            this.rmOtherEndCard(pos, cardList.length);
        }
    };
    /**增加手牌数据,并不显示*/
    CardsShowUI.prototype.addHandCard = function (cardValue) {
        // var cardList = this.handleList[UserPosition.Down];
        // var cardPoint:Array<egret.Point>=this.handlePointList[UserPosition.Down];
        // cardList.push(this.cardFactory.getHandCard(cardValue, UserPosition.Down));
        this.pushHandCard(cardValue, UserPosition.Down);
    };
    /***查找并删除手牌，没有删除第一张牌 并返回*/
    CardsShowUI.prototype.findAndRmHandCard = function (cardValue) {
        var curHandCardList = this.getHandleCard(UserPosition.Down);
        var findValue;
        var findCard;
        for (var i = 0; i < curHandCardList.length; i++) {
            findCard = curHandCardList[i];
            if (findCard.cardValue == cardValue) {
                findValue = cardValue;
                curHandCardList.splice(i, 1);
                findCard.recycle();
                break;
            }
        }
        if (!findValue) {
            findValue = curHandCardList[0].cardValue;
            findCard = curHandCardList.shift();
            findCard && findCard.recycle();
        }
        return findValue;
    };
    /**出牌逻辑*/
    CardsShowUI.prototype.dealOutAction = function (pos, cardValue) {
        /**移动到出牌区域*/
        this.addCard2Out(pos, cardValue);
        //当前有拿过牌,
        if (this.curTakeCard) {
            if (pos == UserPosition.Down) {
                //当前没有点击出牌
                if (!this.curTouchCard)
                    this.curTouchCard = this.curTakeCard;
                if ((this.curTakeCard != this.curTouchCard) || (this.curTakeCard.cardValue != cardValue)) {
                    //移除要出的手牌
                    this.removeHandCardByValue(cardValue);
                    //把当前牌加入手牌
                    this.addHandCard(this.curTakeCard.cardValue);
                    //显示手牌
                    this.showHandCard(pos);
                }
            }
            this.curTakeCard.recycle();
        }
        else {
            console.log("吃碰没有拿牌——+——+——+——+——+——+");
            if (pos == UserPosition.Down) {
                //移除要出的手牌
                this.removeHandCardByValue(cardValue);
                //重新显示手牌
                this.showHandCard(pos);
            }
            else {
                //吃碰杠后手牌移动到摸牌位置，这时候移除第一张手牌
                this.rmOtherFirstCard(pos);
            }
        }
        this.curTakeCard = this.curTouchCard = null;
    };
    /**处理吃碰刚 */
    CardsShowUI.prototype.dealCPGAction = function (act, pos, cardList, actParam) {
        var _this = this;
        //服务端没有传送完整牌值列表，这里拼接牌值列表
        var cardValue = cardList[0];
        var cardListValue = []; //需要显示到吃碰区域的牌
        var deleteCardList = []; //需要从手上删除的牌
        var cpgcardList = [];
        if (act == ACT_act.Act_Peng) {
            cardListValue = [cardValue, cardValue, cardValue];
            deleteCardList = [cardValue, cardValue];
            cardListValue.forEach(function (value) {
                cpgcardList.push(_this.cardFactory.getOutCard(pos, value));
            });
        }
        else if (act == ACT_act.Act_Chi) {
            cardListValue = cardList;
            deleteCardList = [cardList[1], cardList[2]];
            ArrayTool.sortArr(cardListValue);
        }
        else if (act == ACT_act.Act_Gang) {
            if (actParam == 1) {
                cardListValue = [cardValue];
                deleteCardList = [cardValue];
            }
            else if (actParam == 3) {
                cardListValue = [cardValue, cardValue, cardValue, cardValue];
                deleteCardList = [cardValue, cardValue, cardValue];
            }
        }
        else if (act == ACT_act.Act_AnGang) {
            cardListValue = [cardValue, cardValue, cardValue, cardValue];
            deleteCardList = [cardValue, cardValue, cardValue, cardValue];
        }
        var cgpCards = this.createCPGCard(pos, act, cardListValue);
        /** 暗杠和补杠移除当前拿到的牌，其他要移除出牌区域的最后出的牌*/
        if (act == ACT_act.Act_AnGang || actParam == 1) {
            this.addHandCard(this.curTakeCard.cardValue);
            this.curTakeCard.recycle();
            this.curTakeCard = null;
        }
        else {
            this.rmLastOutCard();
        }
        /**添加补刚 */
        if (actParam == 1) {
            this.addBuGang(pos, cgpCards[0]);
        }
        else {
            this.addCPG(pos, cgpCards);
        }
        /**删除玩家的手牌 */
        this.removeHandCardByList(pos, deleteCardList);
        if (pos == UserPosition.Down) {
            this.showHandCard(pos);
            /**吃碰需要再次出牌 */
            if (act == ACT_act.Act_Chi || act == ACT_act.Act_Peng) {
                this.noticeOutCard();
                this.offsetHandCard(pos);
            }
        }
    };
    CardsShowUI.prototype.createCPGCard = function (pos, act, cardsValue) {
        var _this = this;
        var cardList = [];
        cardsValue.forEach(function (value) {
            switch (act) {
                case ACT_act.Act_Chi:
                case ACT_act.Act_Peng:
                case ACT_act.Act_Gang:
                    cardList.push(_this.cardFactory.getEatCard(value, pos));
                    break;
                case ACT_act.Act_AnGang:
                    cardList.push(_this.cardFactory.getAnGangCard(value, pos));
                    break;
            }
        });
        return cardList;
    };
    /**添加吃碰刚 */
    CardsShowUI.prototype.addCPG = function (pos, cardList) {
        if (cardList.length > 4 || cardList.length < 3)
            return;
        var card;
        var cardPoint;
        for (var i = 0; i < cardList.length; i++) {
            card = cardList[i];
            this.CPGList[pos].push(card);
            cardPoint = this.CPGPointList[pos][this.CPGList[pos].length - 1];
            card.x = cardPoint.x;
            card.y = cardPoint.y;
            this.cardGroups[pos + this.playNum * 2].addChild(card);
        }
        //保证是4的整数倍
        if (cardList.length == 3) {
            this.CPGList[pos].push(null);
        }
    };
    CardsShowUI.prototype.pushCPG = function (pos, act, cardsValue) {
        var cards = this.createCPGCard(pos, act, cardsValue);
        this.addCPG(pos, cards);
    };
    /**补刚 */
    CardsShowUI.prototype.addBuGang = function (pos, card) {
        var cpgList = this.CPGList[pos];
        var len = cpgList.length;
        if (len % 4 != 0)
            return;
        for (var i = 0; i < len; i++) {
            var tcard = cpgList[i];
            if (tcard && tcard.cardValue == card.cardValue) {
                cpgList[i + 3] = card;
                var point = this.CPGPointList[pos][i + 3];
                card.x = point.x;
                card.y = point.y;
                this.cardGroups[pos + this.playNum * 2].addChild(card);
                return true;
            }
        }
        return false;
    };
    CardsShowUI.prototype.doAction = function (act, cardList) {
        if (cardList === void 0) { cardList = null; }
        var data = [act, cardList];
        this.dispatchEventWith("cardAction", false, data);
    };
    /**排序 从小到大*/
    CardsShowUI.prototype.sortCardOper = function (cardOpers) {
        var len = cardOpers.length;
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (cardOpers[i].pos > cardOpers[j].pos) {
                    var temp = cardOpers[i];
                    cardOpers[i] = cardOpers[j];
                    cardOpers[j] = temp;
                }
            }
        }
    };
    CardsShowUI.prototype.sortCardChildAt = function (cards) {
        var len = cards.length;
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (cards[i].childAt > cards[j].childAt) {
                    var temp = cards[i];
                    cards[i] = cards[j];
                    cards[j] = temp;
                }
            }
        }
    };
    CardsShowUI.prototype.onTouchTap = function (e) {
        if (e.target instanceof Card) {
            this.checkOutCard(e.target);
            return;
        }
    };
    CardsShowUI.prototype.downAllHandCard = function () {
        var handList = this.handleList[UserPosition.Down];
        var len = handList.length;
        for (var i = 0; i < len; i++) {
            handList[i].toDown();
        }
    };
    CardsShowUI.prototype.reset = function () {
        this.cardGroups.forEach(function (group) {
            group.removeChildren();
        });
        this.initCardList();
    };
    return CardsShowUI;
}(eui.Component));
__reflect(CardsShowUI.prototype, "CardsShowUI");
//牌的配置
var CardOper = (function () {
    function CardOper() {
    }
    return CardOper;
}());
__reflect(CardOper.prototype, "CardOper");
