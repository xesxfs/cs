var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author xiongjian
 * 2017-4-20
 */
var gameResult2Item = (function (_super) {
    __extends(gameResult2Item, _super);
    function gameResult2Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "gameResultItem2Skin";
        return _this;
    }
    gameResult2Item.prototype.dataChanged = function () {
        console.log("item==", this.data);
        var point = parseInt(this.data.lossWinPoint);
        if (point > 0) {
            this.fenLabel.font = "win_fnt";
            this.fenLabel.text = "+" + this.data.lossWinPoint;
        }
        else {
            this.fenLabel.font = "lose_fnt";
            this.fenLabel.text = "" + this.data.lossWinPoint;
        }
        this.nameLabel.text = "" + this.data.name;
        // var userVo: UserVO = App.DataCenter.UserInfo.getUserByUserID(this.data.userID);
        //  var headUrl ;
        // if(userVo && userVo.headUrl){
        //      headUrl = userVo.headUrl;
        // }
        var headUrl = this.data.avatar;
        if (headUrl && headUrl != "") {
            this.avaterImg.source = headUrl;
            this.avaterImg.mask = this.headMaskImg;
        }
        this.zimoLabel.text = "" + this.data.ziMoNum;
        this.hupaiLabel.text = "" + this.data.huPaiNum;
        this.zhongniaoLabel.text = "" + this.data.zhongNiaoNum;
    };
    return gameResult2Item;
}(eui.ItemRenderer));
__reflect(gameResult2Item.prototype, "gameResult2Item");
