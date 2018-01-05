var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TopTitleShowUI = (function (_super) {
    __extends(TopTitleShowUI, _super);
    function TopTitleShowUI() {
        return _super.call(this) || this;
    }
    TopTitleShowUI.prototype.childrenCreated = function () {
    };
    TopTitleShowUI.prototype.showFriendTitle = function () {
        this.matchTitleGroup.visible = false;
        this.friendTitleGroup.visible = true;
    };
    TopTitleShowUI.prototype.showMatchTitle = function () {
        this.matchTitleGroup.visible = true;
        this.friendTitleGroup.visible = false;
    };
    TopTitleShowUI.prototype.setDeskNum = function (deskNo) {
        this.t_desknum.text = deskNo.toString();
    };
    TopTitleShowUI.prototype.resetDeskNum = function () {
        this.t_desknum.text = "";
    };
    TopTitleShowUI.prototype.setJuShu = function (cur, max) {
        var maxStr = max.toString();
        if (max > 999) {
            maxStr = '-';
        }
        this.t_jushu.text = cur.toString() + "/" + maxStr;
    };
    return TopTitleShowUI;
}(eui.Component));
__reflect(TopTitleShowUI.prototype, "TopTitleShowUI");
