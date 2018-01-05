var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MatchLoadingUI = (function (_super) {
    __extends(MatchLoadingUI, _super);
    function MatchLoadingUI() {
        var _this = _super.call(this) || this;
        _this.bMatching = false;
        _this.delay = 300;
        return _this;
    }
    MatchLoadingUI.prototype.startMatching = function () {
        var _this = this;
        if (this.bMatching)
            return;
        this.bMatching = true;
        this.showMatching();
        egret.Tween.removeTweens(this.loadingLabel);
        egret.Tween.get(this.loadingLabel, { loop: true }).wait(this.delay).call(function () {
            _this.loadingLabel.text = "拼命匹配中.";
        }).wait(this.delay).call(function () {
            _this.loadingLabel.text = "拼命匹配中..";
        }).wait(this.delay).call(function () {
            _this.loadingLabel.text = "拼命匹配中...";
        });
    };
    MatchLoadingUI.prototype.stopMatching = function () {
        egret.Tween.removeTweens(this.loadingLabel);
        this.loadingLabel.text = "牌局即将开始";
        this.bMatching = false;
    };
    MatchLoadingUI.prototype.showMatching = function () {
        this.loadingGroup.visible = true;
    };
    MatchLoadingUI.prototype.hideMatching = function () {
        this.loadingGroup.visible = false;
    };
    return MatchLoadingUI;
}(eui.Component));
__reflect(MatchLoadingUI.prototype, "MatchLoadingUI");
