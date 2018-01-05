var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActShowUI = (function (_super) {
    __extends(ActShowUI, _super);
    function ActShowUI() {
        var _this = _super.call(this) || this;
        _this.eatComboListShow = [];
        _this.eatComboListSend = [];
        _this.gangComboList = [];
        return _this;
    }
    ActShowUI.prototype.childrenCreated = function () {
        this.selectActUI.addEventListener("sendActEvent", this.onActUITouch, this);
    };
    /**state=0 非自己回合触发的操作*/
    ActShowUI.prototype.showSelectAct = function (actList, handCard, curCard, eatCardList, state) {
        if (state === void 0) { state = 0; }
        this.state = state;
        this.eatCardList = eatCardList;
        this.curActCard = curCard;
        this.handCard = handCard;
        this.selectActUI.updateInfo(actList);
        // this.selectActUI.x = (App.StageUtils.stageWidth - this.selectActUI.panelWidth) / 2;     
        this.selectActUI.show();
    };
    ActShowUI.prototype.onActUITouch = function (e) {
        this.hideSelectAct();
        var state = e.data;
        var act = CardLogic.getInstance().changeStateToAct(state);
        var cardList = [];
        var cardValue = this.curActCard;
        //console.log("curActCard", this.curActCard);
        //如果是碰或胡，直接发送
        if (act == ACT_act.Act_Peng || act == ACT_act.Act_Hu) {
            cardList = [cardValue];
            this.doAction(act, cardList);
        }
        else if (act == ACT_act.Act_Gang || act == ACT_act.Act_AnGang) {
            this.checkGangCombo();
            if (this.gangComboList.length == 1) {
                //判断暗杠或明杠,因为没有暗杠按钮，这里用bAnGang标志位表示明暗杠
                if (act == ACT_act.Act_Gang && this.selectActUI.bAnGang) {
                    act = ACT_act.Act_AnGang;
                }
                cardList = [this.gangComboList[0]];
                this.doAction(act, cardList);
            }
            else if (this.gangComboList.length > 1) {
                this.hideSelectAct();
                this.eatComboUI.showGangCombo(this.gangComboList, CardFactory.getInstance(), -82);
                this.eatComboUI.addEventListener("selectComboEvent", this.onGangComboTouch, this);
                this.eatComboUI.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
                this.eatComboUI.passBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
            }
            else {
                console.error("手上没有能杠的牌");
            }
        }
        else if (act == ACT_act.Act_Chi) {
            this.checkEatCombo(cardValue);
            if (this.eatComboListShow.length == 1) {
                cardList = this.eatComboListSend[0];
                this.doAction(act, cardList);
            }
            else if (this.eatComboListShow.length > 1) {
                this.hideSelectAct();
                this.eatComboUI.showEatCombo(this.eatComboListShow, CardFactory.getInstance(), 30);
                this.eatComboUI.addEventListener("selectComboEvent", this.onEatComboTouch, this);
                this.eatComboUI.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
                this.eatComboUI.passBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
            }
            else {
                console.error("手上没有能吃的牌");
            }
        }
        else if (act == ACT_act.Act_Pass) {
            this.doAction(ACT_act.Act_Pass);
        }
    };
    //点击吃牌组合
    ActShowUI.prototype.onEatComboTouch = function (e) {
        var comboIndex = e.data;
        if (comboIndex >= 0) {
            this.doAction(ACT_act.Act_Chi, this.eatComboListSend[comboIndex]);
        }
    };
    //点击杠组合
    ActShowUI.prototype.onGangComboTouch = function (e) {
        var comboIndex = e.data;
        if (comboIndex >= 0) {
            var cardValue = this.gangComboList[comboIndex];
            if (this.selectActUI.bAnGang) {
                this.doAction(ACT_act.Act_AnGang, [this.gangComboList[comboIndex]]);
            }
            else {
                this.doAction(ACT_act.Act_Gang, [this.gangComboList[comboIndex]]);
            }
        }
    };
    //点击吃牌组合时的过
    ActShowUI.prototype.onEatComboUIPass = function () {
        this.doAction(ACT_act.Act_Pass);
    };
    /**
 * 检查手牌中有几种吃牌可能
 * @param cardValue 待吃的牌
 */
    ActShowUI.prototype.checkEatCombo = function (cardValue) {
        this.eatComboListSend.length = 0;
        this.eatComboListShow.length = 0;
        var handList = this.handCard;
        var len = handList.length;
        var card;
        //吃牌组合牌值L2 L1 cardValue R1 R2
        var L1 = 0;
        var L2 = 0;
        var R1 = 0;
        var R2 = 0;
        for (var i = 0; i < len; i++) {
            card = handList[i];
            if (card.cardValue == (cardValue - 2)) {
                L2 = card.cardValue;
            }
            else if (card.cardValue == (cardValue - 1)) {
                L1 = card.cardValue;
            }
            else if (card.cardValue == (cardValue + 2)) {
                R2 = card.cardValue;
            }
            else if (card.cardValue == (cardValue + 1)) {
                R1 = card.cardValue;
            }
        }
        var combo = 0;
        if (L1 != 0 && L2 != 0) {
            combo++;
            this.eatComboListSend.push([cardValue, L2, L1]);
            //吃牌调整为统一放在中间
            this.eatComboListShow.push([L2, cardValue, L1]);
        }
        if (L1 != 0 && R1 != 0) {
            combo++;
            this.eatComboListSend.push([cardValue, L1, R1]);
            this.eatComboListShow.push([L1, cardValue, R1]);
        }
        if (R1 != 0 && R2 != 0) {
            combo++;
            this.eatComboListSend.push([cardValue, R1, R2]);
            this.eatComboListShow.push([R1, cardValue, R2]);
        }
    };
    /**
     * 检查当前有几种杠牌组合
     * @comboList 保存能杠的牌值列表
     */
    ActShowUI.prototype.checkGangCombo = function () {
        this.gangComboList.length = 0;
        var curActCard = this.curActCard;
        var handList = this.handCard;
        //获取暗杠和明杠牌值
        if (this.state) {
            handList.push(CardFactory.getInstance().getHandCard(curActCard, UserPosition.Down));
            var resultList = CardLogic.getInstance().getSameList(handList, 4);
            this.gangComboList = this.gangComboList.concat(resultList);
            resultList = CardLogic.getInstance().getBuGang(handList, this.eatCardList);
            this.gangComboList = this.gangComboList.concat(resultList);
            handList.pop();
        }
        //获取点杠牌值
        if (!this.state) {
            if (CardLogic.getInstance().checkSameByValue(handList, curActCard, 3)) {
                this.gangComboList.push(curActCard);
            }
        }
    };
    ActShowUI.prototype.doAction = function (act, cardValueList) {
        if (cardValueList === void 0) { cardValueList = null; }
        var data = [act, cardValueList];
        this.dispatchEventWith("actAction", false, data);
    };
    ActShowUI.prototype.hideSelectAct = function () {
        this.selectActUI.hide();
    };
    return ActShowUI;
}(eui.Component));
__reflect(ActShowUI.prototype, "ActShowUI");
