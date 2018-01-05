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
 * 2017-3-31
 */
var QishouhuTipUI = (function (_super) {
    __extends(QishouhuTipUI, _super);
    function QishouhuTipUI() {
        var _this = _super.call(this) || this;
        _this.bmList = []; //位图缓存
        _this.imgList = []; //显示的图片
        _this.bInitRes = false;
        _this.skinName = "QishouhuTipSkin";
        return _this;
    }
    QishouhuTipUI.prototype.childrenCreated = function () {
        for (var i = 0; i < 4; i++) {
            this.imgList.push(this.getChildAt(i));
        }
    };
    /**
 * 设置提示皮肤
 * @act 动作类型
 */
    QishouhuTipUI.prototype.showAct = function () {
        var _this = this;
        var foot = this.imgList[0]; //底层
        foot.scaleX = 0.3;
        foot.scaleY = 0.3;
        foot.alpha = 0;
        egret.Tween.get(foot).wait(200).to({ scaleX: 0.8, scaleY: 0.8, alpha: 0.3 }, 200);
        var mid = this.imgList[1]; //底层烟
        mid.scaleX = 0.6;
        mid.scaleY = 0.6;
        mid.alpha = 1;
        egret.Tween.get(mid).wait(200).to({ scaleX: 1.4, scaleY: 1.4, alpha: 0 }, 300);
        var top = this.imgList[2]; //底层雾状
        top.visible = false;
        egret.Tween.get(top).wait(200).call(function () { top.visible = true; }, this);
        var font0 = this.imgList[3]; //不变化的字
        font0.visible = true;
        font0.alpha = 0;
        egret.Tween.get(font0).wait(240).call(function () { font0.visible = false; }, this);
        egret.Tween.get(font0).wait(40).to({ scaleX: 0.85, scaleY: 0.85, alpha: 1 }, 200).to({ scaleX: 1, scaleY: 1 }, 160).wait(1000).call(function () {
            _this.hide();
        }, this);
    };
    QishouhuTipUI.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return QishouhuTipUI;
}(eui.Component));
__reflect(QishouhuTipUI.prototype, "QishouhuTipUI");
