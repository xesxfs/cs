var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 麻将牌
 * @author chenkai
 * @date 2016/6/29
 */
var Card = (function (_super) {
    __extends(Card, _super);
    function Card() {
        var _this = _super.call(this) || this;
        _this.bUp = false; //双击出牌，第一次点击会弹起，第二次点击才出牌
        _this.upDist = 20; //弹起的距离
        _this.initPosY = 0; //初始y位置，用于牌的多种动画后，恢复原位时，防止位置错乱
        _this.childAt = 0; //牌的层次
        _this.cardBg = new egret.Bitmap();
        _this.cardImg = new egret.Bitmap();
        _this.addChild(_this.cardBg);
        _this.addChild(_this.cardImg);
        _this.touchChildren = false;
        _this.touchEnabled = false;
        return _this;
    }
    /**
     * 设置手牌皮肤
     * @param cardValue 牌值
     * @dir 牌方向
     */
    Card.prototype.setHandSkin = function (cardValue, userPos) {
        this.cardValue = cardValue;
        this.userPos = userPos;
        if (userPos == UserPosition.Down) {
            this.cardBg.bitmapData = RES.getRes("card_big_bg1_png");
            this.cardImg.bitmapData = RES.getRes("card_big_" + cardValue + "_png");
            this.cardImg.x = 3;
            this.scaleX = 1;
            this.scaleY = 1;
        }
        else if (userPos == UserPosition.R) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg1_png");
            this.cardImg.bitmapData = null;
            this.scaleX = -1;
            this.scaleY = 1;
        }
        else if (userPos == UserPosition.Up) {
            this.cardBg.bitmapData = RES.getRes("card_bgup_png");
            this.cardImg.bitmapData = null;
        }
        else if (userPos == UserPosition.L) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg1_png");
            this.cardImg.bitmapData = null;
        }
    };
    /**
     * 设置出牌皮肤
     * @param cardValue 牌值
     * @dir 牌方向
     */
    Card.prototype.setOutSkin = function (cardValue, userPos) {
        this.cardValue = cardValue;
        this.userPos = userPos;
        if (userPos == UserPosition.Down) {
            this.cardBg.bitmapData = RES.getRes("card_midself_bg_png");
            this.cardImg.bitmapData = RES.getRes("card_small_" + cardValue + "_png");
            this.cardImg.x = 13;
            this.cardImg.y = 8;
            this.scaleX = 1;
            this.scaleY = 1;
        }
        else if (userPos == UserPosition.R) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg0_png");
            this.cardImg.bitmapData = RES.getRes("card_right_" + cardValue + "_png");
            this.cardImg.x = 10;
            this.cardImg.y = 2;
            this.scaleX = 1;
            this.scaleY = 1;
        }
        else if (userPos == UserPosition.Up) {
            this.cardBg.bitmapData = RES.getRes("card_bgup1_png");
            this.cardImg.bitmapData = RES.getRes("card_small_" + cardValue + "_png");
            this.cardImg.x = 8;
            this.cardImg.y = 17;
            this.scaleX = 1;
            this.scaleY = 1;
        }
        else if (userPos == UserPosition.L) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg0_png");
            this.cardImg.bitmapData = RES.getRes("card_left_" + cardValue + "_png");
            this.cardImg.x = 10;
            this.cardImg.y = 2;
            // this.width =64;
            // this.height = 53;
            this.scaleX = 1;
            this.scaleY = 1;
        }
    };
    /**
     * 设置吃碰杠牌皮肤，只有自己手牌吃碰杠牌时，和打出牌皮肤不一致
     * @param cardValue 牌值
     * @param userPos 位置
     */
    Card.prototype.setEatSkin = function (cardValue, userPos) {
        this.cardValue = cardValue;
        this.userPos = userPos;
        this.cardBg.bitmapData = RES.getRes("card_big_bg0_png");
        this.cardImg.bitmapData = RES.getRes("card_big_" + cardValue + "_png");
        this.cardImg.scaleX = 0.8;
        this.cardImg.scaleY = 0.8;
        this.cardImg.x = 5;
        this.cardImg.y = -12;
    };
    /**
     * 设置上家吃碰杠牌皮肤
     */
    Card.prototype.setUpEatSkin = function (cardValue, userPos) {
        this.cardValue = cardValue;
        this.cardBg.bitmapData = RES.getRes("card_bgup2_png");
        this.cardImg.bitmapData = RES.getRes("card_small_" + cardValue + "_png");
        this.cardBg.scaleX = 1.1;
        this.cardBg.scaleY = 1.1;
        this.cardImg.x = 8;
        this.cardImg.y = 5;
        this.scaleX = 1.2;
        this.scaleY = 1.2;
    };
    //设置暗杠皮肤
    Card.prototype.setAnGangSkin = function (cardValue, userPos) {
        this.cardValue = cardValue;
        this.userPos = userPos;
        if (userPos == UserPosition.Down) {
            this.cardBg.bitmapData = RES.getRes("card_big_bg2_png");
            this.cardImg.bitmapData = null;
            this.scaleX = 1;
            this.scaleY = 1;
        }
        else if (userPos == UserPosition.R) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg2_png");
            this.cardImg.bitmapData = null;
            this.scaleX = 0.933;
            this.scaleY = 0.87;
        }
        else if (userPos == UserPosition.Up) {
            this.cardBg.bitmapData = RES.getRes("card_big_bg2_png");
            this.cardImg.bitmapData = null;
            this.cardBg.scaleX = 0.7;
            this.cardBg.scaleY = 0.7;
        }
        else if (userPos == UserPosition.L) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg2_png");
            this.cardImg.bitmapData = null;
            this.scaleX = 0.933;
            this.scaleY = 0.87;
        }
    };
    /**弹起*/
    Card.prototype.toUp = function () {
        if (this.bUp == false) {
            this.y -= this.upDist;
            this.bUp = true;
        }
    };
    /**放下*/
    Card.prototype.toDown = function () {
        if (this.bUp == true) {
            this.y += this.upDist;
            this.bUp = false;
        }
    };
    //回收到对象池
    Card.prototype.recycle = function () {
        this.bUp = false;
        this.userPos = 0;
        this.cardValue = 0;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.cardBg.bitmapData = null;
        this.cardImg.bitmapData = null;
        this.x = 0;
        this.y = 0;
        this.childAt = 0;
        this.cardBg.x = 0;
        this.cardBg.y = 0;
        this.cardImg.x = 0;
        this.cardImg.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.cardImg.scaleX = 1;
        this.cardImg.scaleY = 1;
        this.cardBg.scaleX = 1;
        this.cardBg.scaleY = 1;
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Card.NAME).returnObject(this);
    };
    return Card;
}(egret.DisplayObjectContainer));
Card.NAME = "Card";
__reflect(Card.prototype, "Card");
