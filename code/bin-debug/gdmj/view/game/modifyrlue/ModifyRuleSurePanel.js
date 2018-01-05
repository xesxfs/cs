/**
 * 关闭修改规则确认界面
 * @author huanglong
 * 2017-4-25
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModifyRuleSurePanel = (function (_super) {
    __extends(ModifyRuleSurePanel, _super);
    function ModifyRuleSurePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ModifyRuleSureSkin";
        return _this;
    }
    /**组件创建完毕*/
    ModifyRuleSurePanel.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    ModifyRuleSurePanel.prototype.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    };
    /**从场景中移除*/
    ModifyRuleSurePanel.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    };
    ModifyRuleSurePanel.prototype.okTouch = function () {
        App.PanelManager.closeAllPanel();
    };
    ModifyRuleSurePanel.prototype.close = function () {
        this.hide();
    };
    return ModifyRuleSurePanel;
}(BasePanel));
__reflect(ModifyRuleSurePanel.prototype, "ModifyRuleSurePanel");
