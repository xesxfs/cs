var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 弹框管理
 * @author chenkai
 * @date 2016/6/28
 */
var PopUpManager = (function (_super) {
    __extends(PopUpManager, _super);
    function PopUpManager() {
        var _this = _super.call(this) || this;
        _this.lockCount = 0; //黑色背景锁定次数
        _this.clickClose = []; //点击黑色背景关闭弹框
        _this.clickCallback = []; //点击背景回调列表
        _this.thisObjectList = []; //回调域
        _this.panelList = [];
        _this.createLockBg();
        return _this;
    }
    /**
     * 显示弹框
     * @panel 弹框
     * @lock 是否锁定屏幕(增加黑色半透明背景)
     * @click 是否监听点击黑色背景关闭弹框事件
     */
    PopUpManager.prototype.addPopUp = function (panel, lock, click, clickCallback, thisObject) {
        if (lock === void 0) { lock = true; }
        if (click === void 0) { click = true; }
        if (clickCallback === void 0) { clickCallback = null; }
        if (thisObject === void 0) { thisObject = null; }
        var popLayer = App.LayerManager.popLayer;
        if (this.curPanel == panel) {
            console.log("panel repitition!!!!!!!!!!!!!");
            this.curPanel.hide();
        }
        if (lock) {
            this.lockCount++;
            popLayer.addChild(this.lockBg);
        }
        this.clickClose[this.lockCount] = click;
        this.clickCallback[this.lockCount] = clickCallback;
        this.thisObjectList[this.lockCount] = thisObject;
        popLayer.addChild(panel);
        this.curPanel = panel;
        this.panelList.push(panel);
    };
    /**移除弹框*/
    PopUpManager.prototype.removePopUp = function (panel) {
        panel.parent && panel.parent.removeChild(panel);
        var popLayer = App.LayerManager.popLayer;
        this.lockCount--;
        if (this.lockCount > 0) {
            //this.clickClose[this.lockCount] = false;
            popLayer.setChildIndex(this.lockBg, popLayer.numChildren - 2);
        }
        else {
            this.lockCount = 0;
            this.clickClose[this.lockCount] = false;
            this.clickCallback[this.lockCount] = null;
            this.thisObjectList[this.lockCount] = null;
            this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
            this.curPanel = null;
        }
        this.panelList.pop();
        if (this.panelList.length > 0) {
            this.curPanel = this.panelList[this.panelList.length - 1];
        }
        if (this.panelList.length < 1) {
            this.curPanel = null;
            this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
        }
    };
    /**移除所有弹框*/
    PopUpManager.prototype.removeAllPopUp = function () {
        var popLayer = App.LayerManager.popLayer;
        popLayer.removeChildren();
        this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
        this.lockCount = 0;
        this.clickClose.length = 0;
        this.clickCallback.length = 0;
        this.thisObjectList.length = 0;
        this.curPanel = null;
    };
    /**改变透明度*/
    PopUpManager.prototype.changeTransparency = function (transparency) {
        this.lockBg.alpha = transparency;
    };
    //创建黑色半透明背景
    PopUpManager.prototype.createLockBg = function () {
        this.lockBg = new egret.Sprite();
        this.lockBg.graphics.beginFill(0x000000, 0.7);
        var stage = App.StageUtils.stage;
        this.lockBg.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
        this.lockBg.graphics.endFill();
        this.lockBg.touchEnabled = true;
        this.lockBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    //点击黑色背景
    PopUpManager.prototype.onTouchTap = function () {
        if (this.clickClose[this.lockCount]) {
            if (this.clickCallback[this.lockCount]) {
                this.clickCallback[this.lockCount].bind(this.thisObjectList[this.lockCount])();
            }
            else {
                this.removePopUp(this.curPanel);
            }
        }
    };
    /**
     * 设置当前弹窗点击背景回调和域
     */
    PopUpManager.prototype.setClickCallback = function (clickCallback, thisObject) {
        if (thisObject === void 0) { thisObject = null; }
        if (!this.clickClose[this.lockCount]) {
            console.log("点击背景关闭为False,设置回调无用");
        }
        this.clickCallback[this.lockCount] = clickCallback;
        this.thisObjectList[this.lockCount] = thisObject;
    };
    return PopUpManager;
}(SingleClass));
__reflect(PopUpManager.prototype, "PopUpManager");
