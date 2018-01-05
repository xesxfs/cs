var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 分享好友房战绩
 * @author huanglong
 * @date 2017/05/09
 */
var ShareRecordPanel = (function (_super) {
    __extends(ShareRecordPanel, _super);
    function ShareRecordPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShareRecordPanelSkin";
        return _this;
    }
    ShareRecordPanel.prototype.onEnable = function () {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        if (this.recData) {
            this.setData();
        }
        else {
            this.setTotalData();
        }
        this.qrCodeImg.source = App.DataCenter.qrCodeUrl;
    };
    ShareRecordPanel.prototype.onRemove = function () {
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.pengjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.recData = null;
    };
    ShareRecordPanel.prototype.setData = function () {
        console.log("+++++++++++", this.recData);
        var ac = new eui.ArrayCollection();
        var arr = [];
        var list = this.recData.survey;
        for (var i = 0; i < list.length; i++) {
            var dataObj = new Object();
            dataObj["name"] = list[i].name;
            dataObj["point"] = list[i].point;
            dataObj["bigwin"] = false;
            dataObj["wincount"] = list[i].wincount;
            dataObj["headurl"] = list[i].pic;
            if (this.recData.ownerid == list[i].playerID) {
                dataObj["ower"] = true;
            }
            else {
                dataObj["ower"] = false;
            }
            if (list[i].playerID == App.DataCenter.UserInfo.getMyUserVo().userID) {
                dataObj["self"] = true;
            }
            else {
                dataObj["self"] = false;
            }
            arr.push(dataObj);
        }
        arr.sort(function (a, b) {
            return Number(b.point) - Number(a.point);
        });
        var bigwin = 0;
        var big = 0;
        for (var i = 0; i < arr.length; i++) {
            arr[i]["rank"] = i + 1;
            if (Number(arr[i].point) > bigwin) {
                big = Number(arr[i].point);
                bigwin = i;
            }
        }
        arr[0].bigwin = true;
        ac.source = arr;
        this.shareList.dataProvider = ac;
        this.shareList.itemRenderer = ShareRecordItem;
        this.overTimeLab.text = ArrayTool.formatDate1(this.recData.LastGameDate) + " " + ArrayTool.formatDate2(this.recData.LastGameDate) + " 结束";
    };
    ShareRecordPanel.prototype.setTotalData = function () {
        var ac = new eui.ArrayCollection();
        var arr = [];
        this.recData = ProtocolData.Rev100818.info;
        console.log("+++++++++++", this.recData);
        var list = this.recData.RecordList;
        for (var i = 0; i < list.length; i++) {
            var dataObj = new Object();
            dataObj["name"] = list[i].name;
            dataObj["point"] = list[i].lossWinPoint;
            dataObj["ziMoNum"] = list[i].ziMoNum;
            dataObj["huPaiNum"] = list[i].huPaiNum;
            dataObj["zhongNiaoNum"] = list[i].zhongNiaoNum;
            dataObj["avatar"] = list[i].avatar;
            if (App.DataCenter.deskInfo.ownerID == list[i].userID) {
                dataObj["ower"] = true;
            }
            else {
                dataObj["ower"] = false;
            }
            if (list[i].userID == App.DataCenter.UserInfo.getMyUserVo().userID) {
                dataObj["self"] = true;
            }
            else {
                dataObj["self"] = false;
            }
            arr.push(dataObj);
        }
        arr.sort(function (a, b) {
            return Number(b.point) - Number(a.point);
        });
        for (var i = 0; i < arr.length; i++) {
            arr[i]["rank"] = i + 1;
        }
        ac.source = arr;
        this.shareList.dataProvider = ac;
        this.shareList.itemRenderer = ShareTotalItem;
        if (this.recData.roundEndTime) {
            this.overTimeLab.text = ArrayTool.formatDate1(this.recData.roundEndTime) + " " + ArrayTool.formatDate2(this.recData.roundEndTime) + " 结束";
        }
        else {
            var date = (new Date().getTime()) / 1000;
            this.overTimeLab.text = ArrayTool.formatDate1(date) + " " + ArrayTool.formatDate2(date) + " 结束";
        }
    };
    ShareRecordPanel.prototype.onTouchShare = function (e) {
        var shareType = 0;
        switch (e.target) {
            case this.pengjiBtn:
                shareType = 0;
                break;
            case this.qqBtn:
                shareType = 1;
                break;
            case this.wxBtn:
                shareType = 2;
                break;
            case this.wxfriendBtn:
                shareType = 3;
                break;
            default:
                break;
        }
        TipsLog.hallInfo("分享请求已发送");
        this.shareTo(shareType.toString());
        this.hide();
    };
    /**分享逻辑 */
    ShareRecordPanel.prototype.shareTo = function (shareType) {
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this.shareGro);
        var base64Data = renderTexture.toDataURL("image/png");
        var data = {
            gameId: "10004",
            share: shareType,
            imageB64: base64Data,
            gameName: "长沙麻将"
        };
        App.NativeBridge.sendImageShare(data);
    };
    /**返回 */
    ShareRecordPanel.prototype.back = function () {
        this.hide();
    };
    return ShareRecordPanel;
}(BasePanel));
__reflect(ShareRecordPanel.prototype, "ShareRecordPanel");
