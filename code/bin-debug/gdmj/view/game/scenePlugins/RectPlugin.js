var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 麻将牌处理插件
 * @author xiongjian
 * @date 2017/6/29
 */
var RectPlugin = (function (_super) {
    __extends(RectPlugin, _super);
    function RectPlugin() {
        var _this = _super.call(this) || this;
        _this.skinName = "rectPlugin";
        return _this;
    }
    return RectPlugin;
}(BaseUI));
__reflect(RectPlugin.prototype, "RectPlugin");
