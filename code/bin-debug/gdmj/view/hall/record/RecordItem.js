/**
 * 记录item
 * @author huanglong
 * 2017/03/17
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RecordItem = (function (_super) {
    __extends(RecordItem, _super);
    function RecordItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "RecordItemSkin";
        _this.shareGro.visible = false;
        return _this;
    }
    RecordItem.prototype.dataChanged = function () {
        var itemData = this.data;
        this.roomLab.text = "房号:" + itemData.deskCode;
        this.dateLab.text = ArrayTool.formatDate1(itemData.deskBuildDate);
        this.timeLab.text = ArrayTool.formatDate2(itemData.deskBuildDate);
        for (var i = 0; i < itemData.userinfo.length; i++) {
            var point = "";
            var nameColor = 0x696969;
            var pointColor = 0x696969;
            if (Number(itemData.userinfo[i].point) > 0) {
                point = "+" + itemData.userinfo[i].point;
                nameColor = 0x7e5a3d;
                pointColor = 0xb33318;
            }
            else {
                point = itemData.userinfo[i].point;
            }
            this.listGro.getChildAt(4 + i * 2).text = StringTool.formatNickName(itemData.userinfo[i].name);
            this.listGro.getChildAt(4 + i * 2).textColor = nameColor;
            this.listGro.getChildAt(4 + i * 2 + 1).text = point;
            this.listGro.getChildAt(4 + i * 2 + 1).textColor = pointColor;
        }
        var selfId = App.DataCenter.UserInfo.httpUserInfo.userID;
        for (var i = 0; i < itemData.userinfo.length; i++) {
            if (selfId == Number(itemData.userinfo[i].playerID)) {
                this.myselfGro.getChildAt(i).visible = true;
            }
            else {
                this.myselfGro.getChildAt(i).visible = false;
            }
        }
        var totalStr = "";
        if (itemData.pattern == "9999") {
            totalStr = "-";
        }
        else {
            totalStr = itemData.pattern;
        }
        this.roundLab.text = itemData.playtotal + "/" + totalStr;
    };
    RecordItem.prototype.childrenCreated = function () {
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.detailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetail, this);
        this.addLis();
    };
    /**分享平台选择按钮事件 */
    RecordItem.prototype.addLis = function () {
        this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareChoose, this);
        this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareChoose, this);
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareChoose, this);
        this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareChoose, this);
    };
    RecordItem.prototype.onShareChoose = function (e) {
        switch (e.target) {
            case this.pengjiBtn:
                break;
            case this.qqBtn:
                break;
            case this.wxBtn:
                break;
            case this.wxfriendBtn:
                break;
            default:
                return;
        }
        egret.Tween.removeTweens(this.shareGro);
        this.shareGro.visible = false;
    };
    /** 分享*/
    RecordItem.prototype.onShare = function () {
        // this.shareGro.visible = !this.shareGro.visible;
        // egret.Tween.removeTweens(this.shareGro);
        // if (this.shareGro.visible) {
        //     egret.Tween.get(this.shareGro).wait(3000).set({visible:false})
        //     .call(()=>{
        //         egret.Tween.removeTweens(this.shareGro);
        //     })
        // }
        var http = new HttpSender();
        var data = ProtocolHttp.getShareRecord;
        data.param.deskBuildDate = this.data.deskBuildDate;
        data.param.deskCode = this.data.deskCode;
        http.send(data, this.revShare, this);
    };
    RecordItem.prototype.revShare = function (data) {
        if (data.ret == 0) {
            App.PanelManager.open(PanelConst.ShareRecordPanel, null, null, true, true, data.data);
        }
        else {
            TipsLog.hallInfo("获取分享信息失败");
        }
    };
    /** 详情*/
    RecordItem.prototype.onDetail = function () {
        this.sendRecordDetail();
    };
    /**记录详情请求 */
    RecordItem.prototype.sendRecordDetail = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.GetScoreDetailList;
        data.param.deskBuildDate = this.data.deskBuildDate;
        data.param.deskCode = this.data.deskCode;
        http.send(data, this.recRecordDetail, this);
    };
    /**记录详情接收 */
    RecordItem.prototype.recRecordDetail = function (data) {
        console.log("详情：" + data);
        if (!data.ret) {
            App.PanelManager.open(PanelConst.RecordDetailPanel, null, this, true, true, data.data);
        }
        else {
            TipsLog.hallInfo(data.desc);
        }
    };
    return RecordItem;
}(eui.ItemRenderer));
__reflect(RecordItem.prototype, "RecordItem");
