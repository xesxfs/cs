var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 资源加载等待时锁定动画
 * @author chenkai
 * @date 2016/9/19
 */
var LoadingLock = (function (_super) {
    __extends(LoadingLock, _super);
    function LoadingLock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**超时计时器*/
        _this.overTimer = new egret.Timer(10000, 1);
        return _this;
    }
    /**
     * 锁定
     * @callBack 超时回调
     * @thisObject 超时回调执行对象
     */
    LoadingLock.prototype.lock = function (callBack, thisObject) {
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        this.callBack = callBack;
        this.thisObject = thisObject;
        this.startOverTimer();
        if (this.mc == null) {
            var data = RES.getRes("loadMc_json");
            var texture = RES.getRes("loadMc_png");
            var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
            this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("load"));
            this.mc.x = (App.StageUtils.stageWidth - this.mc.width) / 2;
            this.mc.y = (App.StageUtils.stageHeight - this.mc.height) / 2;
        }
        if (this.rect == null) {
            this.rect = new eui.Rect();
            this.rect.width = App.StageUtils.stageWidth;
            this.rect.height = App.StageUtils.stageHeight;
            this.rect.touchEnabled = true;
            this.rect.alpha = 0.5;
        }
        this.rect.alpha = 0.5;
        if (!this.rect.parent) {
            App.LayerManager.lockLayer.addChild(this.rect);
        }
        App.LayerManager.lockLayer.addChild(this.mc);
        this.mc.gotoAndPlay("roll", -1);
        if (this.descGro) {
            App.LayerManager.lockLayer.addChild(this.descGro);
        }
    };
    //http请求遮罩
    LoadingLock.prototype.httpLock = function (callBack, thisObject) {
        var _this = this;
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (this.rect == null) {
            this.rect = new eui.Rect();
            this.rect.width = App.StageUtils.stageWidth;
            this.rect.height = App.StageUtils.stageHeight;
            this.rect.touchEnabled = true;
            this.rect.alpha = 0.2;
        }
        this.rect.alpha = 0.2;
        App.LayerManager.lockLayer.addChild(this.rect);
        this.timeNum = setTimeout(function () {
            _this.timeNum && clearTimeout(_this.timeNum);
            _this.lock();
        }, 1000);
    };
    //停止加载动画
    LoadingLock.prototype.unlock = function () {
        this.timeNum && clearTimeout(this.timeNum);
        this.callBack = null;
        this.thisObject = null;
        this.stopOverTimer();
        this.mc && this.mc.parent && this.mc.parent.removeChild(this.mc);
        this.rect && this.rect.parent && this.rect.parent.removeChild(this.rect);
        this.descGro && this.descGro.parent && this.descGro.parent.removeChild(this.descGro);
        this.descGro = null;
    };
    //开始超时计时
    LoadingLock.prototype.startOverTimer = function () {
        this.overTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.overTimer.reset();
        this.overTimer.start();
    };
    //停止超时计时
    LoadingLock.prototype.stopOverTimer = function () {
        this.overTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.overTimer.stop();
    };
    //超时
    LoadingLock.prototype.onTimerComplete = function () {
        if (this.callBack != null && this.thisObject != null) {
            this.callBack.call(this.thisObject);
        }
        this.unlock();
    };
    //添加Loading描述
    LoadingLock.prototype.addDesc = function (tips) {
        if (this.descGro == null) {
            this.descGro = new eui.Group();
            this.descGro.width = App.StageUtils.stageWidth;
            this.descGro.height = App.StageUtils.stageHeight;
            var bg = new eui.Image();
            bg.texture = RES.getRes("game_bg2_png");
            bg.verticalCenter = 100;
            bg.horizontalCenter = 0;
            bg.scale9Grid = new egret.Rectangle(24, 5, 149, 36);
            bg.width = 500;
            this.descGro.addChild(bg);
            this.descLab = new eui.Label();
            this.descLab.verticalCenter = 103;
            this.descLab.horizontalCenter = 0;
            this.descLab.size = 30;
            this.descLab.textColor = 0xfff1be;
            this.descGro.addChild(this.descLab);
        }
        this.descLab.text = tips;
        App.LayerManager.lockLayer.addChild(this.descGro);
    };
    return LoadingLock;
}(SingleClass));
__reflect(LoadingLock.prototype, "LoadingLock");
