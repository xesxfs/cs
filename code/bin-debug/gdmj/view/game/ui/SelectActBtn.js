var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 选择操作按钮
 * @author chenkai
 * @date 2016/8/3
 *
 * @author huanglong
 * @data 2017/04/12 chongxie
 */
var SelectActBtn = (function (_super) {
    __extends(SelectActBtn, _super);
    function SelectActBtn() {
        var _this = _super.call(this) || this;
        _this.resList = []; //资源配置表
        _this.bInitRes = false;
        _this.skinName = "SelectActBtnSkin";
        return _this;
    }
    SelectActBtn.prototype.childrenCreated = function () {
        this.touchChildren = false;
        this.touchEnabled = true;
    };
    SelectActBtn.prototype.initRes = function () {
        if (this.bInitRes == false) {
            this.bInitRes = true;
            this.resList[ACT_act.Act_Pass] = "mcGuo";
            this.resList[ACT_act.Act_Chi] = "mcChi";
            this.resList[ACT_act.Act_Peng] = "mcPeng";
            this.resList[ACT_act.Act_Gang] = "mcGang";
            this.resList[ACT_act.Act_AnGang] = "mcGang";
            this.resList[ACT_act.Act_Hu] = "mcHu";
        }
    };
    /**
     * 根据动作创建MovieClip
     */
    SelectActBtn.prototype.setNewActSkin = function (act) {
        this.initRes();
        var resName = this.resList[act];
        var data = RES.getRes(resName + "_mc_json");
        var img = RES.getRes(resName + "_tex_png");
        var mcFactory = new egret.MovieClipDataFactory(data, img);
        this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(resName));
        this.mc.x = this.mc.x + 75;
        this.mc.y = this.mc.y + 75;
        this.addChild(this.mc);
    };
    /**播放动画*/
    SelectActBtn.prototype.playAnim = function () {
        this.mc.gotoAndPlay(0, -1);
    };
    /**暂停播放 */
    SelectActBtn.prototype.stopAnim = function () {
        if (this.mc) {
            this.mc.stop();
        }
    };
    return SelectActBtn;
}(eui.Component));
__reflect(SelectActBtn.prototype, "SelectActBtn");
