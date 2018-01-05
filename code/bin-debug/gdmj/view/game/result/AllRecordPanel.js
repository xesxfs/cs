/**
 * @author xiongjian
 * 2017-5-15
 * 解散房间总结算界面
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AllRecord = (function (_super) {
    __extends(AllRecord, _super);
    function AllRecord() {
        var _this = _super.call(this) || this;
        _this.skinName = "AllRecordSkin";
        return _this;
    }
    AllRecord.prototype.childrenCreated = function () {
    };
    AllRecord.prototype.onEnable = function () {
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    AllRecord.prototype.onRemove = function () {
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
    };
    /**
 * 更新总list数据
 */
    AllRecord.prototype.updateZongList = function () {
        var json = ProtocolData.Rev100818;
        var recordlist = json.info.RecordList;
        var ac = new eui.ArrayCollection();
        var arr = [];
        for (var i = 0; i < recordlist.length; i++) {
            var dataObj = new Object();
            dataObj["userID"] = recordlist[i].userID;
            dataObj["lossWinPoint"] = recordlist[i].lossWinPoint;
            dataObj["name"] = StringTool.formatNickName(recordlist[i].name);
            dataObj["ziMoNum"] = recordlist[i].ziMoNum;
            dataObj["huPaiNum"] = recordlist[i].huPaiNum;
            dataObj["zhongNiaoNum"] = recordlist[i].zhongNiaoNum;
            dataObj["avatar"] = recordlist[i].avatar;
            arr.push(dataObj);
        }
        ac.source = arr;
        // ac.source=[[],[],[]];
        this.allList.dataProvider = ac;
        this.allList.itemRenderer = gameResult2Item;
    };
    /**
     * 分享
     */
    AllRecord.prototype.onShare = function () {
        App.PanelManager.open(PanelConst.ShareRecordPanel);
    };
    //返回
    AllRecord.prototype.back = function () {
        this.hide();
    };
    return AllRecord;
}(BasePanel));
__reflect(AllRecord.prototype, "AllRecord");
