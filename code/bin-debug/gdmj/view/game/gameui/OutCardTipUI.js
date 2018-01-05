var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var OutCardTipUI = (function (_super) {
    __extends(OutCardTipUI, _super);
    function OutCardTipUI() {
        var _this = _super.call(this) || this;
        _this.outEffectTime = 2000; //出牌效果显示时间ms
        return _this;
    }
    OutCardTipUI.prototype.childrenCreated = function () {
        this.init();
        this.hideAllOutEffect();
    };
    OutCardTipUI.prototype.init = function () {
        this.outEffectList = [];
        var len = this.outEffectGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var group = this.outEffectGroup.getChildAt(i);
            this.outEffectList.push(group);
        }
    };
    //显示出牌效果
    OutCardTipUI.prototype.showOutEffect = function (cardValue, pos) {
        var group = this.outEffectList[pos];
        if (group.numChildren <= 1) {
            var card = CardFactory.getInstance().getHandCard(cardValue, UserPosition.Down);
            group.addChild(card);
            card.x = (group.width - card.cardBg.width) / 2 + 2; //微调
            card.y = (group.height - card.cardBg.height) / 2 + 2;
        }
        else {
            card = group.getChildAt(1);
            card.setHandSkin(cardValue, UserPosition.Down);
        }
        this.outEffectGroup.addChild(group);
        egret.Tween.removeTweens(group);
        egret.Tween.get(group).wait(this.outEffectTime).call(function () {
            group.parent && group.parent.removeChild(group);
        });
    };
    //隐藏所有出牌效果
    OutCardTipUI.prototype.hideAllOutEffect = function () {
        this.outEffectGroup.removeChildren();
    };
    return OutCardTipUI;
}(eui.Component));
__reflect(OutCardTipUI.prototype, "OutCardTipUI");
