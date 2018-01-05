var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiscShowUI = (function (_super) {
    __extends(DiscShowUI, _super);
    function DiscShowUI() {
        var _this = _super.call(this) || this;
        _this.lightFlashTime = 400; //中间圆盘光的闪烁时间ms
        _this.outTimer = new DateTimer(1000); //出牌计时器
        _this.redDiscList = []; //圆盘红色指示块 
        _this.redDiscBGList = []; //圆盘红色指示块底图
        _this.curOutTimeLimit = 0; //当前出牌计时
        _this.outTime = 15;
        return _this;
    }
    DiscShowUI.prototype.childrenCreated = function () {
        this.init();
    };
    DiscShowUI.prototype.init = function () {
        for (var i = 0; i < 4; i++) {
            this.redDiscList.push(this.discGroup.getChildAt(i + 9));
            this.redDiscBGList.push(this.discGroup.getChildAt(i + 5));
        }
    };
    /****显示中间圆盘光**/
    DiscShowUI.prototype.showLight = function (pos) {
        this.hideAllLight();
        this.redDiscList[pos].visible = true;
        this.redDiscBGList[pos].visible = true;
        egret.Tween.removeTweens(this.redDiscList[pos]);
        egret.Tween.get(this.redDiscList[pos], { loop: true }).to({ alpha: 1 }, this.lightFlashTime + 100).wait(this.lightFlashTime - 200).to({ alpha: 0.5 }, this.lightFlashTime + 100);
    };
    /***隐藏所有光*/
    DiscShowUI.prototype.hideAllLight = function () {
        var len = this.redDiscList.length;
        var light;
        for (var i = 0; i < len; i++) {
            this.redDiscList[i].alpha = 1;
            this.redDiscList[i].visible = false;
            egret.Tween.removeTweens(this.redDiscList[i]);
        }
        var bgLen = this.redDiscList.length;
        for (var i = 0; i < bgLen; i++) {
            this.redDiscBGList[i].visible = false;
        }
    };
    /***设置cd文本*/
    DiscShowUI.prototype.setCdLabel = function (time) {
        this.cdLabel.text = time;
    };
    /***开始出牌计时器*/
    DiscShowUI.prototype.startOutTimer = function () {
        this.outTimer.addEventListener(egret.TimerEvent.TIMER, this.onOutTime, this);
        this.outTimer.repeatCount = this.outTime;
        this.curOutTimeLimit = this.outTime;
        this.outTimer.reset();
        this.outTimer.start();
        this.setCdLabel(NumberTool.formatTime(this.outTime));
    };
    /**出牌计时处理*/
    DiscShowUI.prototype.onOutTime = function (e) {
        if (this.outTimer.currentCount > this.curOutTimeLimit) {
            this.stopOutTimer();
            return;
        }
        var count = this.curOutTimeLimit - this.outTimer.currentCount;
        this.setCdLabel(NumberTool.formatTime(count));
        if (count <= 3) {
            App.SoundManager.playEffect(SoundManager.warn);
        }
    };
    /**停止出牌计时*/
    DiscShowUI.prototype.stopOutTimer = function () {
        this.outTimer.removeEventListener(egret.TimerEvent.TIMER, this.onOutTime, this);
        this.outTimer.stop();
        this.setCdLabel("");
    };
    DiscShowUI.prototype.hide = function () {
        this.visible = false;
    };
    DiscShowUI.prototype.show = function () {
        this.visible = true;
    };
    return DiscShowUI;
}(eui.Component));
__reflect(DiscShowUI.prototype, "DiscShowUI");
