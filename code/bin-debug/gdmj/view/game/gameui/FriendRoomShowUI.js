var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FriendRoomShowUI = (function (_super) {
    __extends(FriendRoomShowUI, _super);
    function FriendRoomShowUI() {
        return _super.call(this) || this;
    }
    FriendRoomShowUI.prototype.childrenCreated = function () {
        this.init();
    };
    FriendRoomShowUI.prototype.init = function () {
        this.gameYaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.gameXiugai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.gameChakan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    FriendRoomShowUI.prototype.setDeskNo = function (deskNo) {
        this.deskNumberLabel.text = deskNo.toString();
    };
    FriendRoomShowUI.prototype.setRuleOwn = function (bOwn) {
        this.gameChakan.visible = !bOwn;
        this.gameXiugai.visible = bOwn;
    };
    FriendRoomShowUI.prototype.onTouch = function (e) {
        this.doAction();
    };
    FriendRoomShowUI.prototype.doAction = function () {
        this.dispatchEventWith("onFriendTouch");
    };
    FriendRoomShowUI.prototype.hide = function () {
        this.visible = false;
    };
    FriendRoomShowUI.prototype.show = function () {
        this.visible = true;
    };
    return FriendRoomShowUI;
}(eui.Component));
__reflect(FriendRoomShowUI.prototype, "FriendRoomShowUI");
