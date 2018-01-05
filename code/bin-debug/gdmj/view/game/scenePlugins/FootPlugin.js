var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 头角插件
 * @author xiongjian
 * @date 2017/6/29
 */
var FootPlugin = (function (_super) {
    __extends(FootPlugin, _super);
    function FootPlugin() {
        var _this = _super.call(this) || this;
        _this.skinName = "footPlugin";
        return _this;
    }
    /**
     * 根据房间类型显示不同头部
     * @type RoomType
     *
     */
    FootPlugin.prototype.setTitle = function (type) {
        switch (type) {
            case RoomType.FriendRoom:
                this.matchTitleGroup.visible = true;
                this.friendTitleGroup.visible = false;
                break;
            case RoomType.MatchRoom:
                this.matchTitleGroup.visible = false;
                this.friendTitleGroup.visible = true;
                break;
        }
    };
    /**设置房间号 */
    FootPlugin.prototype.setRoomNumber = function (number) {
        if (number && number != "") {
            this.desknum.text = number;
        }
    };
    /**设置局数 */
    FootPlugin.prototype.setJushu = function (count) {
        if (count && count != "") {
            this.desknum.text = count;
        }
    };
    return FootPlugin;
}(BaseUI));
__reflect(FootPlugin.prototype, "FootPlugin");
