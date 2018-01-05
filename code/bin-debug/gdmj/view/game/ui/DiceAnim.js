var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 骰子动画
 * @author chenkai
 * @date 2016/6/30
 */
var DiceAnim = (function (_super) {
    __extends(DiceAnim, _super);
    function DiceAnim() {
        var _this = _super.call(this) || this;
        _this.sz0List = []; //骰子具体点数图片
        _this.sz1List = [];
        _this.bInitRes = false; //是否初始化过
        _this.skinName = "DiceAnimSkin";
        return _this;
    }
    DiceAnim.prototype.childrenCreated = function () {
    };
    DiceAnim.prototype.initRes = function () {
    };
    /**
     * 播放骰子动画
     * @point0 骰子点数
     * @point1
     */
    DiceAnim.prototype.playAnim = function (point0, point1) {
    };
    /**初始化序列帧 */
    DiceAnim.prototype.initMovieClip = function () {
        var resName = "shaizi";
        var data = RES.getRes(resName + "_mc_json");
        var img = RES.getRes(resName + "_tex_png");
        var mcFactory = new egret.MovieClipDataFactory(data, img);
        this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(resName));
        this.mc.x = 75;
        this.mc.y = 49;
        this.addChild(this.mc);
    };
    /**播放色子序列帧 */
    DiceAnim.prototype.playAnimation = function (point1, point2) {
        var _this = this;
        var times = 4;
        this.initMovieClip();
        this.mc.gotoAndPlay(0, times);
        this.diceGro.visible = false;
        setTimeout(function () {
            _this.mc.stop();
            _this.mc.parent && _this.mc.parent.removeChild(_this.mc);
            _this.diceGro.alpha = 1;
            _this.diceGro.scaleX = 0.6;
            _this.diceGro.scaleY = 0.6;
            _this.diceGro.visible = true;
            (_this.diceGro.getChildAt(0)).texture = RES.getRes("s" + point1 + "_png");
            (_this.diceGro.getChildAt(1)).texture = RES.getRes("s" + point2 + "_png");
            _this.diceGro.visible = true;
            egret.Tween.get(_this.diceGro)
                .wait(300)
                .to({ scaleX: 1, scaleY: 1 }, 200)
                .wait(700)
                .to({ alpha: 0 }, 200)
                .set({ visible: false })
                .call(function () {
                _this.onComplete();
            }, _this);
        }, times * 330);
    };
    /**播放完成 */
    DiceAnim.prototype.onComplete = function () {
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    //骰子动画播放完成
    DiceAnim.prototype.onAnimComplete = function () {
        this.anim0.stop();
        this.removeChild(this.anim0);
        this.addChild(this.sz0List[this.point0 - 1]);
        this.anim1.stop();
        this.removeChild(this.anim1);
        this.addChild(this.sz1List[this.point1 - 1]);
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    return DiceAnim;
}(eui.Component));
__reflect(DiceAnim.prototype, "DiceAnim");
