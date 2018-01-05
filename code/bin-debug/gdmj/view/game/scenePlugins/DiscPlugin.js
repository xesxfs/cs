var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 圆盘处理插件
 * @author xiongjian
 * @date 2017/6/29
 */
var DiscPlugin = (function (_super) {
    __extends(DiscPlugin, _super);
    function DiscPlugin() {
        var _this = _super.call(this) || this;
        _this.redDiscList = []; //圆盘红色指示块 
        _this.redDiscBGList = []; //圆盘红色指示块底图
        _this.fengList = []; //风位字列表
        _this.curLeftCard = 0; //当前剩余牌数
        _this.lightFlashTime = 400; //中间圆盘光的闪烁时间ms
        _this.skinName = "discPlugin";
        return _this;
    }
    DiscPlugin.prototype.childrenCreated = function () {
        //初始化UI列表
        for (var i = 0; i < 4; i++) {
            this.redDiscList.push(this.discGroup.getChildAt(i + 9));
            this.redDiscBGList.push(this.discGroup.getChildAt(i + 5));
            this.fengList.push(this.discGroup.getChildAt(i + 1));
        }
    };
    /**隐藏剩余计数*/
    DiscPlugin.prototype.hideLeftLabel = function () {
        this.juGroup.visible = false;
    };
    /**显示剩余多少张计数*/
    DiscPlugin.prototype.showLeftLabel = function (lastCardNum, curPlayCount) {
        this.leftCardLabel.text = NumberTool.formatTime(lastCardNum) + "张";
        this.curLeftCard = lastCardNum;
        this.juGroup.visible = true;
    };
    /**减少剩余牌数*/
    DiscPlugin.prototype.reduceLeftCard = function (reduceNum) {
        if (reduceNum === void 0) { reduceNum = 1; }
        this.curLeftCard -= reduceNum;
        this.leftCardLabel.text = NumberTool.formatTime(this.curLeftCard) + "张";
    };
    /**增加剩余牌数*/
    DiscPlugin.prototype.addLeftCard = function (a) {
        if (a === void 0) { a = 1; }
        console.log(a + "增加数");
        this.curLeftCard = this.curLeftCard + 1;
        this.leftCardLabel.text = NumberTool.formatTime(this.curLeftCard) + "张";
    };
    /**显示中间圆盘*/
    DiscPlugin.prototype.showDisc = function () {
        this.discGroup.visible = true;
        //        this.deskLogo.visible = false;
    };
    /**隐藏中间圆盘*/
    DiscPlugin.prototype.hideDisc = function () {
        this.discGroup.visible = false;
        //        this.deskLogo.visible = true;
    };
    /**显示中间圆盘光*/
    DiscPlugin.prototype.showLight = function (pos) {
        this.hideAllLight();
        this.redDiscList[pos].visible = true;
        this.redDiscBGList[pos].visible = true;
        egret.Tween.get(this.redDiscList[pos], { loop: true }).to({ alpha: 1 }, this.lightFlashTime + 100).wait(this.lightFlashTime - 200).to({ alpha: 0.5 }, this.lightFlashTime + 100);
    };
    /**隐藏所有光*/
    DiscPlugin.prototype.hideAllLight = function () {
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
    /**显示圆盘上的风位(东南西北)*/
    DiscPlugin.prototype.showDiceFengWei = function (pos) {
        this.hideAllFengWei();
        console.log("fengList" + this.fengList[pos]);
        if (typeof pos != "number") {
            return;
        }
        this.fengList[pos].visible = true;
    };
    /**隐藏所有风位*/
    DiscPlugin.prototype.hideAllFengWei = function () {
        var len = this.fengList.length;
        for (var i = 0; i < len; i++) {
            this.fengList[i].visible = false;
        }
    };
    /**设置cd文本**/
    DiscPlugin.prototype.setCdLabel = function (time) {
        this.cdLabel.text = time;
    };
    return DiscPlugin;
}(BaseUI));
__reflect(DiscPlugin.prototype, "DiscPlugin");
