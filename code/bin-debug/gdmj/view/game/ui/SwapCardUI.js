var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 换牌UI
 * @author chenkai
 * @date 2016/9/5
 */
var SwapCardUI = (function (_super) {
    __extends(SwapCardUI, _super);
    function SwapCardUI() {
        var _this = _super.call(this) || this;
        //显示交换牌的选择面板
        _this.selectGroup = new eui.Group(); //弹出选择牌Group
        _this.skinName = "SwapCardUISkin";
        return _this;
    }
    SwapCardUI.prototype.childrenCreated = function () {
    };
    SwapCardUI.prototype.onEnable = function () {
    };
    SwapCardUI.prototype.onRemove = function () {
    };
    SwapCardUI.prototype.init = function (gameScene) {
        var _this = this;
        this.gameScene = gameScene;
        this.cardFactory = this.gameScene.cardFactory;
        this.gameScene.swapCardGroup.addChild(this);
        this.swapCardGroup = this.gameScene.swapCardGroup;
        this.selectBtn0 = new Card();
        this.selectBtn0.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup0.addChild(this.selectBtn0);
        this.selectBtn0.touchEnabled = true;
        this.selectBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.curSelcet = 0;
            _this.showSwapCard();
        }, this);
        this.selectBtn1 = new Card();
        this.selectBtn1.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup1.addChild(this.selectBtn1);
        this.selectBtn1.touchEnabled = true;
        this.selectBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.curSelcet = 1;
            _this.showSwapCard();
        }, this);
        this.selectBtn2 = new Card();
        this.selectBtn2.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup2.addChild(this.selectBtn2);
        this.selectBtn2.touchEnabled = true;
        this.selectBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.curSelcet = 2;
            _this.showSwapCard();
        }, this);
        this.selectBtn3 = new Card();
        this.selectBtn3.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup3.addChild(this.selectBtn3);
        this.selectBtn3.touchEnabled = true;
        this.selectBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.sendLookCard();
        }, this);
        this.selectBtn4 = new Card();
        this.selectBtn4.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup4.addChild(this.selectBtn4);
        this.selectBtn4.touchEnabled = true;
        this.selectBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.sendHuCard();
        }, this);
        this.selectBtn5 = new Card();
        this.selectBtn5.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup5.addChild(this.selectBtn5);
        this.selectBtn5.touchEnabled = true;
        this.selectBtn5.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            App.gameSocket.close();
            App.EventManager.sendEvent(EventConst.SocketClose, App.gameSocket);
        }, this);
        this.selectBtn6 = new Card();
        this.selectBtn6.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup6.addChild(this.selectBtn6);
        this.selectBtn6.touchEnabled = true;
        this.selectBtn6.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.selectValue0 = 0;
            _this.selectValue1 = 0;
            _this.curSelcet = 6;
            _this.showSwapCard(true);
        }, this);
        this.selectBtn7 = new Card();
        this.selectBtn7.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup7.addChild(this.selectBtn7);
        this.selectBtn7.touchEnabled = true;
        this.selectBtn7.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            App.getController("GameController").send100117();
        }, this);
    };
    SwapCardUI.prototype.showSwapCard = function (dice) {
        var _this = this;
        if (dice === void 0) { dice = false; }
        this.selectGroup.parent && this.removeChild(this.selectGroup);
        if (this.selectGroup.numChildren > 15 && !dice) {
            this.addChild(this.selectGroup);
            return;
        }
        else {
            this.selectGroup.removeChildren();
        }
        var groupWidth = 45 * 9;
        var groupHeight = 60 * 4;
        this.selectGroup.width = groupWidth;
        this.selectGroup.height = groupHeight;
        this.selectGroup.x = -60;
        this.selectGroup.y = 80;
        var sp = new egret.Sprite();
        sp.graphics.beginFill(0, 0.5);
        sp.graphics.drawRect(0, 0, groupWidth, groupHeight + 100);
        sp.touchEnabled = true;
        sp.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.selectGroup.parent && _this.removeChild(_this.selectGroup);
        }, this);
        this.selectGroup.addChild(sp);
        this.addChild(this.selectGroup);
        var card;
        if (!dice) {
            for (var i = 0; i < 9; i++) {
                card = this.cardFactory.getOutCard(0x11 + i, 0);
                card.x = card.width * i;
                card.y = 0;
                card.scaleX = 0.8;
                card.scaleY = 0.8;
                card.touchEnabled = true;
                this.selectGroup.addChild(card);
            }
            for (var i = 0; i < 9; i++) {
                card = this.cardFactory.getOutCard(0x21 + i, 0);
                card.x = card.width * i;
                card.y = card.height;
                card.scaleX = 0.8;
                card.scaleY = 0.8;
                card.touchEnabled = true;
                this.selectGroup.addChild(card);
            }
            for (var i = 0; i < 9; i++) {
                card = this.cardFactory.getOutCard(0x31 + i, 0);
                card.x = card.width * i;
                card.y = card.height * 2;
                card.scaleX = 0.8;
                card.scaleY = 0.8;
                card.touchEnabled = true;
                this.selectGroup.addChild(card);
            }
            for (var i = 0; i < 4; i++) {
                card = this.cardFactory.getOutCard(0x41 + i, 0);
                card.x = card.width * i;
                card.y = card.height * 3;
                card.scaleX = 0.8;
                card.scaleY = 0.8;
                card.touchEnabled = true;
                this.selectGroup.addChild(card);
            }
            for (var i = 0; i < 3; i++) {
                card = this.cardFactory.getOutCard(0x51 + i, 0);
                card.x = card.width * (i + 4);
                card.y = card.height * 3;
                card.scaleX = 0.8;
                card.scaleY = 0.8;
                card.touchEnabled = true;
                this.selectGroup.addChild(card);
            }
        }
        else {
            for (var i = 0; i < 6; i++) {
                card = this.cardFactory.getOutCard(0x11 + i, 0);
                card.x = card.width * i;
                card.y = 0;
                card.scaleX = 0.8;
                card.scaleY = 0.8;
                card.touchEnabled = true;
                this.selectGroup.addChild(card);
            }
            for (var i = 0; i < 6; i++) {
                card = this.cardFactory.getOutCard(0x21 + i, 0);
                card.x = card.width * i;
                card.y = card.height;
                card.scaleX = 0.8;
                card.scaleY = 0.8;
                card.touchEnabled = true;
                this.selectGroup.addChild(card);
            }
        }
        this.selectGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
    };
    SwapCardUI.prototype.onSelect = function (e) {
        if (e.target instanceof Card) {
            var card = e.target;
            if (this.curSelcet == 0) {
                this.selectValue0 = card.cardValue;
                this.selectBtn0.cardImg.y = 0;
                this.selectBtn0.setOutSkin(card.cardValue, 0);
                this.selectGroup.parent && this.removeChild(this.selectGroup);
            }
            else if (this.curSelcet == 1) {
                this.selectValue1 = card.cardValue;
                this.selectBtn1.cardImg.y = 0;
                this.selectBtn1.setOutSkin(card.cardValue, 0);
                var json = ProtocolData.Send180_100_0;
                json.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
                json.preCard = this.selectValue0;
                json.newCard = this.selectValue1;
                App.gameSocket.send(ProtocolHead.Send180_100_0, json);
                console.log("发送换牌:", this.selectValue0, this.selectValue1);
                this.selectGroup.parent && this.removeChild(this.selectGroup);
            }
            else if (this.curSelcet == 2) {
                this.selectBtn2.cardImg.y = 0;
                this.selectBtn2.setOutSkin(card.cardValue, 0);
                var nextCardJson = ProtocolData.Send180_99_0;
                nextCardJson.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
                nextCardJson.cardList = [card.cardValue];
                App.gameSocket.send(ProtocolHead.Send180_99_0, nextCardJson);
                console.log("发送确认下一张牌，牌值", card.cardValue);
                this.selectGroup.parent && this.removeChild(this.selectGroup);
            }
            else if (this.curSelcet == 6) {
                if (!this.selectValue0) {
                    this.selectValue0 = card.cardValue;
                }
                else {
                    this.selectValue1 = card.cardValue;
                    var diceJson = ProtocolData.Send100824;
                    diceJson.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
                    if (this.selectValue0 > 30) {
                        diceJson.dice1 = this.selectValue0 - 33 + 1;
                        diceJson.dice2 = this.selectValue1 - 17 + 1;
                    }
                    else {
                        diceJson.dice1 = this.selectValue0 - 17 + 1;
                        diceJson.dice2 = this.selectValue1 - 33 + 1;
                    }
                    if (diceJson.dice2 > 6) {
                        diceJson.dice2 = 6;
                    }
                    if (diceJson.dice1 > 6) {
                        diceJson.dice1 = 6;
                    }
                    console.log("发送测试色子:" + diceJson.dice1 + "&&" + diceJson.dice2);
                    this.diceLabel.text = diceJson.dice1 + "&" + diceJson.dice2;
                    App.gameSocket.send(ProtocolHead.Send100824, diceJson);
                    this.selectGroup.parent && this.removeChild(this.selectGroup);
                }
            }
        }
    };
    //发送换牌，换成能胡的牌
    SwapCardUI.prototype.sendHuCard = function () {
        // var nextCardJson = ProtocolData.Send180_99_0;
        // nextCardJson.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        // nextCardJson.cardList = [0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x21, 0x21, 0x21, 0x22, 0x22];
        // App.gameSocket.send(ProtocolHead.Send180_99_0, nextCardJson);
        // console.log("发送确认下14张牌值");
        // Tips.info("发送成功");
        App.PanelManager.open(PanelConst.HuTypePanel);
    };
    //发送看最后一张牌
    SwapCardUI.prototype.sendLookCard = function () {
        var json = ProtocolData.Send180_102_0;
        json.cardpos = -1;
        App.gameSocket.send(ProtocolHead.Rev100822, json);
    };
    return SwapCardUI;
}(BaseUI));
__reflect(SwapCardUI.prototype, "SwapCardUI");
