var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 侧边栏
 * @author huanglong
 * @date 2017/04/05
 */
var SideMenu = (function (_super) {
    __extends(SideMenu, _super);
    function SideMenu() {
        var _this = _super.call(this) || this;
        _this.skinName = "SideMenuSkin";
        return _this;
    }
    SideMenu.prototype.childrenCreated = function () {
        this.touchEnabled = true;
        this.newsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNews, this);
        this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFriend, this);
    };
    SideMenu.prototype.onNews = function () {
        console.log("onNews");
    };
    SideMenu.prototype.onFriend = function () {
        console.log("onFriend");
    };
    return SideMenu;
}(eui.Component));
__reflect(SideMenu.prototype, "SideMenu");
