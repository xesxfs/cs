/**
 * 查看规则
 * @author huanglong
 * @date 2017/3/28
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LookRlue = (function (_super) {
    __extends(LookRlue, _super);
    function LookRlue() {
        var _this = _super.call(this) || this;
        _this.skinName = "LookRlueSkin";
        return _this;
    }
    LookRlue.prototype.childrenCreated = function () {
        // this.initView();
    };
    LookRlue.prototype.onEnable = function () {
        this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    };
    LookRlue.prototype.onRemove = function () {
        this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    };
    /**设置界面值 */
    LookRlue.prototype.initView = function () {
        this.roomerLab.text = "萌萌萌";
        this.roundLab.text = "7局";
        this.playMetLab.text = "瞎猫打";
        this.zhuaLab.text = "抓鸡";
    };
    LookRlue.prototype.updataView = function (data) {
        var json = ProtocolData.Rev100117;
        json = data;
        var owner = json.info.desk_owner_id;
        var user = App.DataCenter.UserInfo.getUserByUserID(owner);
        var name = user.nickName;
        this.roomerLab.text = "" + name;
        var hasBuBuGao = json.info.hasBuBuGao;
        var hasSanTong = json.info.hasSanTong;
        var hasYiPaoSanXiangs = json.info.hasYiPaoSanXiang;
        var hasYiZhiHua = json.info.hasYiZhiHua;
        var playMet = "";
        if (hasBuBuGao) {
            playMet += "、" + "步步高";
        }
        if (hasSanTong) {
            playMet += "、" + "三同";
        }
        if (hasYiZhiHua) {
            playMet += "、" + "一枝花";
        }
        // if(hasYiPaoSanXiangs){
        // 	playMet += "、"+"一炮三响";
        // }
        if (playMet != "") {
            playMet = playMet.substr(1);
            this.playMetLab.text = playMet;
        }
        else {
            this.playMetLab.text = "无";
        }
        var count = json.info.play_times_limit;
        if (count) {
            this.roundLab.text = "" + count + "局";
            if (count > 99) {
                this.roundLab.text = "不限";
            }
        }
        var zhaniao = json.info.zhaNiaoNum;
        this.zhuaLab.text = "抓" + zhaniao + "鸟";
    };
    /**关闭*/
    LookRlue.prototype.onCloseBtn = function () {
        this.hide();
    };
    return LookRlue;
}(BasePanel));
__reflect(LookRlue.prototype, "LookRlue");
