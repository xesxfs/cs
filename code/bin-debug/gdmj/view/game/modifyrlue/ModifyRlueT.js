var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 修改规则
 * @author huanglong
 * @date 2017/3/27
 */
var ModifyRlueT = (function (_super) {
    __extends(ModifyRlueT, _super);
    function ModifyRlueT() {
        var _this = _super.call(this) || this;
        _this.posList = [];
        _this.choosedNum = 0;
        _this.skinName = "ModifyRlueSkinT";
        return _this;
    }
    ModifyRlueT.prototype.onEnable = function () {
        this.mViewStack.selectedIndex = 0;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickNext, this);
        this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSure, this);
        this.posImgA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPoint, this);
        this.posImgB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPoint, this);
        this.posImgC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPoint, this);
        this.posImgD.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPoint, this);
        this.moveImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginTouch, this);
        this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.endTouch, this);
        this.moveImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.endTouch, this);
        this.init();
    };
    ModifyRlueT.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickNext, this);
        this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSure, this);
        this.posImgA.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPoint, this);
        this.posImgB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPoint, this);
        this.posImgC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPoint, this);
        this.posImgD.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPoint, this);
        this.moveImg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginTouch, this);
        this.moveImg.removeEventListener(egret.TouchEvent.TOUCH_END, this.endTouch, this);
        this.moveImg.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.endTouch, this);
    };
    ModifyRlueT.prototype.init = function () {
        var _this = this;
        this.posList = [this.posImgA.x - 7, this.posImgB.x - 7, this.posImgC.x - 7, this.posImgD.x - 7];
        this.setCenter();
        //设置局数卡数量
        this.hadLab.text = "拥有局数卡X" + this.recData.info.round_card_num;
        //根据数据设置UI
        this.setRoundNumUI();
        this.setPlayMothod();
        this.setZhuaniao();
        //设置点击黑色背景回调
        App.PopUpManager.setClickCallback(function () {
            _this.onCloseBtn();
        }, this);
        this.recordOrigonRule();
    };
    ModifyRlueT.prototype.beginTouch = function () {
        this.moveGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveTouch, this);
    };
    ModifyRlueT.prototype.endTouch = function () {
        this.moveGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveTouch, this);
        this.getShort();
    };
    ModifyRlueT.prototype.moveTouch = function (e) {
        if (e.stageX < this.moveGroup.x + this.posList[0] || e.stageX > this.moveGroup.x + this.posList[3] + this.moveImg.width) {
            this.endTouch();
            return;
        }
        if ((e.stageX - this.moveGroup.x) > this.posList[3]) {
            return;
        }
        this.moveImg.x = e.stageX - this.moveGroup.x;
    };
    ModifyRlueT.prototype.clickPoint = function (e) {
        var shortI = 0;
        switch (e.target) {
            case this.posImgA:
                shortI = 0;
                break;
            case this.posImgB:
                shortI = 1;
                break;
            case this.posImgC:
                shortI = 2;
                break;
            case this.posImgD:
                shortI = 3;
                break;
            default:
                shortI = 0;
                return;
        }
        if (this.choosedNum == shortI) {
            return;
        }
        this.choosedNum = shortI;
        this.showMove(shortI);
    };
    ModifyRlueT.prototype.getShort = function () {
        //取最近目标位置
        var curPos = this.moveImg.x;
        var shortLen = 10000;
        var shortI;
        for (var i = 0; i < this.posList.length; i++) {
            var len = Math.abs(curPos - this.posList[i]);
            if (len < shortLen) {
                shortLen = len;
                shortI = i;
            }
        }
        this.choosedNum = shortI;
        this.showMove(shortI);
    };
    ModifyRlueT.prototype.showMove = function (index) {
        var _this = this;
        var shortLen = Math.abs(this.posList[index] - this.moveImg.x);
        egret.Tween.get(this.moveImg).to({ x: this.posList[index] }, shortLen / 150 * 250).call(function () {
            for (var i = 0; i < 4; i++) {
                if (index == i) {
                    _this.roudLabGro.getChildAt(i).textColor = 0x6bc235;
                }
                else {
                    _this.roudLabGro.getChildAt(i).textColor = 0x5F5C5B;
                }
            }
            egret.Tween.removeTweens(_this.moveImg);
        });
    };
    /**设置当前局数 */
    ModifyRlueT.prototype.setRoundNumUI = function () {
        var index = 3;
        switch (this.recData.info.play_times_limit) {
            case 4:
                index = 0;
                break;
            case 8:
                index = 1;
                break;
            case 16:
                index = 2;
                break;
            case 9999:
                index = 3;
                break;
            default:
                break;
        }
        this.choosedNum = index;
        this.moveImg.x = this.posList[index];
        for (var i = 0; i < 4; i++) {
            if (index == i) {
                this.roudLabGro.getChildAt(i).textColor = 0x6bc235;
            }
            else {
                this.roudLabGro.getChildAt(i).textColor = 0x5F5C5B;
            }
        }
    };
    /**设置当前玩法 */
    ModifyRlueT.prototype.setPlayMothod = function () {
        var selectedList = [];
        selectedList.push(this.recData.info.hasSanTong);
        selectedList.push(this.recData.info.hasBuBuGao);
        selectedList.push(this.recData.info.hasYiZhiHua);
        for (var i = 0; i < 3; i++) {
            this.toggleBtnGro.getChildAt(i).selected = selectedList[i];
        }
    };
    /**设置当前抓鸟 */
    ModifyRlueT.prototype.setZhuaniao = function () {
        var value = 0;
        switch (this.recData.info.zhaNiaoNum) {
            case 1:
                value = 0;
                break;
            case 2:
                value = 1;
                break;
            case 4:
                value = 2;
                break;
            case 6:
                value = 3;
                break;
            default:
                break;
        }
        for (var i = 0; i < 4; i++) {
            if (i == value) {
                this.radioGro.getChildAt(i).selected = true;
            }
            else {
                this.radioGro.getChildAt(i).selected = false;
            }
        }
    };
    /**获取当前选择的局数 */
    ModifyRlueT.prototype.getRoundNum = function () {
        var roundNum = 4;
        switch (this.moveImg.x) {
            case this.posList[0]:
                roundNum = 4;
                break;
            case this.posList[1]:
                roundNum = 8;
                break;
            case this.posList[2]:
                roundNum = 16;
                break;
            case this.posList[3]:
                roundNum = 9999;
                break;
            default:
                break;
        }
        return roundNum;
    };
    /**获取玩法 根据数组得到 */
    ModifyRlueT.prototype.getPlayMothod = function () {
        var selectedList = [];
        for (var i = 0; i < 3; i++) {
            selectedList.push(this.toggleBtnGro.getChildAt(i).selected);
        }
        return selectedList;
    };
    /**获取抓鸟 */
    ModifyRlueT.prototype.getZhuaniao = function () {
        var value = 0;
        for (var i = 0; i < 4; i++) {
            if (this.radioGro.getChildAt(i).selected) {
                value = i;
                break;
            }
        }
        var zhuaNum = 1;
        switch (value) {
            case 0:
                zhuaNum = 1;
                break;
            case 1:
                zhuaNum = 2;
                break;
            case 2:
                zhuaNum = 4;
                break;
            case 3:
                zhuaNum = 6;
                break;
            default:
                break;
        }
        return zhuaNum;
    };
    ModifyRlueT.prototype.clickNext = function () {
        this.mViewStack.selectedIndex = 1;
    };
    /**进入页面时的规则 */
    ModifyRlueT.prototype.recordOrigonRule = function () {
        this.playCount = this.getRoundNum();
        this.mothodList = this.getPlayMothod();
        this.zhuaNum = this.getZhuaniao();
    };
    /**获取是否修改 */
    ModifyRlueT.prototype.getChangeFlag = function () {
        var playCount = this.getRoundNum();
        if (playCount != this.playCount) {
            return true;
        }
        var zhuaNum = this.getZhuaniao();
        if (zhuaNum != this.zhuaNum) {
            return true;
        }
        var mothodList = this.getPlayMothod();
        if (mothodList[0] != this.mothodList[0] || mothodList[1] != this.mothodList[1] || mothodList[2] != this.mothodList[2]) {
            return true;
        }
        return false;
    };
    /**确认修改 */
    ModifyRlueT.prototype.clickSure = function () {
        if (!this.getChangeFlag()) {
            this.hide();
        }
        var playCount = this.getRoundNum();
        var mothodList = this.getPlayMothod(); //[0]santong [1]bubugao [2]yizhihua
        var zhuaNum = this.getZhuaniao();
        var json = ProtocolData.Send100102;
        json.desk_id = App.DataCenter.deskInfo.deskNo;
        json.play_times_limit = playCount;
        json.gameConfig.zhaNiaoNum = zhuaNum;
        json.gameConfig.hasSanTong = mothodList[0];
        json.gameConfig.hasBuBuGao = mothodList[1];
        json.gameConfig.hasYiZhiHua = mothodList[2];
        App.gameSocket.send(ProtocolHead.Send100102, json);
    };
    /**关闭*/
    ModifyRlueT.prototype.onCloseBtn = function () {
        if (this.getChangeFlag()) {
            // var messagebox:MessageBox = App.MsgBoxManager.getBoxA();
            // messagebox.showMsg("您是否要放弃对房间信息的修改？",()=>{
            //     this.hide();
            // },this);
            App.PanelManager.open(PanelConst.ModifyRuleSurePanel);
        }
        else {
            this.hide();
        }
    };
    return ModifyRlueT;
}(BasePanel));
__reflect(ModifyRlueT.prototype, "ModifyRlueT");
