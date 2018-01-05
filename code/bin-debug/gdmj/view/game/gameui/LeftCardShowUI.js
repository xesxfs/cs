var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LeftCardShowUI = (function (_super) {
    __extends(LeftCardShowUI, _super);
    function LeftCardShowUI() {
        var _this = _super.call(this) || this;
        /***当前牌局剩余牌数最大值 */
        _this.leftCardLimit = 108;
        return _this;
    }
    LeftCardShowUI.prototype.setLeftCard = function (nCount) {
        if (nCount) {
            this.leftCardLabel.text = nCount.toString();
        }
        else {
            this.leftCardLabel.text = this.leftCardLimit.toString();
        }
    };
    LeftCardShowUI.prototype.hide = function () {
        this.visible = false;
    };
    LeftCardShowUI.prototype.show = function () {
        this.visible = true;
    };
    return LeftCardShowUI;
}(BaseUI));
__reflect(LeftCardShowUI.prototype, "LeftCardShowUI");
