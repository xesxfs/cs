var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TuoGuanShowUI = (function (_super) {
    __extends(TuoGuanShowUI, _super);
    function TuoGuanShowUI() {
        var _this = _super.call(this) || this;
        _this.bTuoGuan = false;
        return _this;
    }
    TuoGuanShowUI.prototype.showTuoGuan = function () {
        this.bTuoGuan = true;
        this.visible = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuoGuanTouch, this);
    };
    TuoGuanShowUI.prototype.hideTuoGuan = function () {
        this.bTuoGuan = false;
        this.visible = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuoGuanTouch, this);
    };
    TuoGuanShowUI.prototype.onTuoGuanTouch = function () {
        console.log("取消托管");
    };
    return TuoGuanShowUI;
}(eui.Component));
__reflect(TuoGuanShowUI.prototype, "TuoGuanShowUI");
