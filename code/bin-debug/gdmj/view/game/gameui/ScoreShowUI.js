var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ScoreShowUI = (function (_super) {
    __extends(ScoreShowUI, _super);
    function ScoreShowUI() {
        var _this = _super.call(this) || this;
        _this.zhenFen = [];
        _this.fuFen = [];
        return _this;
    }
    ScoreShowUI.prototype.childrenCreated = function () {
        this.init();
        this.hideAllScore();
    };
    ScoreShowUI.prototype.init = function () {
        for (var i = 0; i < 4; i++) {
            var zhen = this.gangFenGroup.getChildAt(i);
            var fu = this.gangFenGroup.getChildAt(i + 4);
            this.zhenFen.push(zhen);
            this.fuFen.push(fu);
        }
    };
    ScoreShowUI.prototype.showScore = function (pos, score) {
        if (score > 0) {
            this.showZhenScore(pos, score);
        }
        else {
            this.showFuScore(pos, score);
        }
    };
    ScoreShowUI.prototype.showFuScore = function (pos, score) {
        this.fuFen[pos].text = score.toString();
        this.gangFenGroup.addChild(this.fuFen[pos]);
        this.tweenRemove(this.fuFen[pos]);
    };
    ScoreShowUI.prototype.showZhenScore = function (pos, score) {
        this.zhenFen[pos].text = "+" + score.toString();
        this.gangFenGroup.addChild(this.zhenFen[pos]);
        this.tweenRemove(this.zhenFen[pos]);
    };
    ScoreShowUI.prototype.hideScore = function (pos) {
        this.zhenFen[pos].parent && this.zhenFen[pos].parent.removeChild(this.zhenFen[pos]);
        this.fuFen[pos].parent && this.fuFen[pos].parent.removeChild(this.fuFen[pos]);
    };
    ScoreShowUI.prototype.hideAllScore = function () {
        this.gangFenGroup.removeChildren();
    };
    ScoreShowUI.prototype.tweenRemove = function (gang) {
        egret.Tween.removeTweens(gang);
        gang.alpha = 1;
        egret.Tween.get(gang).wait(1500).to({ y: gang.y - 100, alpha: 0 }, 1000).call(function () { gang.parent && gang.parent.removeChild(gang); gang.y += 100; });
    };
    return ScoreShowUI;
}(eui.Component));
__reflect(ScoreShowUI.prototype, "ScoreShowUI");
