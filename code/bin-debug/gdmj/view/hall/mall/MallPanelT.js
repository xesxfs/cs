/**
 * 商城界面
 * @author eyanlong
 * @date 2017/2/21
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MallPanelT = (function (_super) {
    __extends(MallPanelT, _super);
    function MallPanelT() {
        var _this = _super.call(this) || this;
        _this.skinName = "MallPanelSkin";
        _this.reFreshGroup.mask = _this.reMask;
        return _this;
    }
    MallPanelT.prototype.onEnable = function () {
        this.mall_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.mallScroller.addEventListener(egret.TouchEvent.CHANGE, this.change, this);
        this.mallScroller.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
        this.mallScroller.touchEnabled = false;
        this.mallList.touchEnabled = false;
        this.setData(this.recData);
    };
    MallPanelT.prototype.onRemove = function () {
        this.mall_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.mallScroller.removeEventListener(egret.TouchEvent.CHANGE, this.change, this);
        this.mallScroller.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
    };
    /**设置数据 */
    MallPanelT.prototype.setData = function (list) {
        var ac = new eui.ArrayCollection();
        var arr = [];
        // for(var i = 0; i < list.length; i++) {
        // 	let dataObj = new MallItemData();
        // 	dataObj.setData(list[i]);
        //     arr.push(dataObj);
        // }
        /**test */
        for (var i = 0; i < 20; i++) {
            var dataObj = new MallItemData();
            arr.push(dataObj);
        }
        console.log("addChange Listenervvvv");
        ac.source = arr;
        this.mallList.dataProvider = ac;
        this.mallList.itemRenderer = MallItem;
    };
    /**test */
    MallPanelT.prototype.change = function () {
        var v = this.mallScroller.viewport.scrollV;
        console.log(v);
        if (v > 0)
            return;
        this.reFreshGroup.y = -v;
        this.refreshShow(-v);
    };
    MallPanelT.prototype.end = function () {
        var v = this.mallScroller.viewport.scrollV;
        egret.Tween.removeTweens(this.arrowAmation);
        egret.clearTimeout(this.timeOutKey);
        this.timeOutKey;
        if (-v >= 100) {
            this.mallScroller.stopAnimation();
            this.mallScroller.viewport.scrollV = -100;
            this.reFreshGroup.y = 100;
            this.arrowAmation.visible = true;
            this.arrowDown.visible = false;
            this.arrowUp.visible = false;
            this.mallScroller.touchEnabled = false;
            egret.Tween.get(this.arrowAmation, { loop: true }).to({ rotation: 360 }, 1000);
            this.timeOutKey = egret.setTimeout(this.requestSuccess, this, 3000);
        }
    };
    /**模拟请求成功 */
    MallPanelT.prototype.requestSuccess = function () {
        egret.Tween.removeTweens(this.arrowAmation);
        egret.clearTimeout(this.timeOutKey);
        this.reFreshGroup.y = 0;
        this.mallScroller.viewport.scrollV = 0;
        this.mallScroller.touchEnabled = true;
    };
    /**刷新位置显示 */
    MallPanelT.prototype.refreshShow = function (v) {
        if (v < 100) {
            this.arrowDown.visible = true;
            this.arrowUp.visible = false;
        }
        else {
            this.arrowDown.visible = false;
            this.arrowUp.visible = true;
        }
        this.arrowAmation.visible = false;
    };
    /**返回 */
    MallPanelT.prototype.back = function () {
        this.hide();
    };
    return MallPanelT;
}(BasePanel));
__reflect(MallPanelT.prototype, "MallPanelT");
