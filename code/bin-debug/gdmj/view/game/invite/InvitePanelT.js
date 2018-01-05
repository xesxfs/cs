/**
 * 邀请好友界面
 * @author huanglong
 * 2017-5-5
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InvitePanelT = (function (_super) {
    __extends(InvitePanelT, _super);
    function InvitePanelT() {
        var _this = _super.call(this) || this;
        _this.skinName = "InvitePanelTSkin";
        return _this;
    }
    InvitePanelT.prototype.childrenCreated = function () {
    };
    /** 添加到场景*/
    InvitePanelT.prototype.onEnable = function () {
        this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    };
    /** 从场景中移除*/
    InvitePanelT.prototype.onRemove = function () {
        this.pengjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.qqBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.wxfriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    };
    InvitePanelT.prototype.onTouchBtn = function (e) {
        var inviteType = 0;
        switch (e.target) {
            case this.pengjiBtn:
                inviteType = 0;
                break;
            case this.qqBtn:
                inviteType = 1;
                break;
            case this.wxBtn:
                inviteType = 2;
                break;
            case this.wxfriendBtn:
                inviteType = 3;
                break;
            default:
                break;
        }
        this.setParam(inviteType.toString());
    };
    /**
     * 组织发给原生参数并发送
     */
    InvitePanelT.prototype.setParam = function (inviteType) {
        var data = {
            roomId: "0",
            gameId: "10004",
            title: "名字",
            invite: "0",
            rule: [],
            gameName: "长沙麻将"
        };
        data.roomId = App.DataCenter.deskInfo.deskID + "";
        data.title = App.DataCenter.UserInfo.getMyUserVo().nickName;
        data.invite = inviteType;
        data.rule = this.setRule(this.recData);
        App.NativeBridge.sendInviteFriend(data);
    };
    /**
     * 组织规则
     */
    InvitePanelT.prototype.setRule = function (data) {
        var json = ProtocolData.Rev100117;
        json = data;
        var ruleList = [];
        var list1 = "";
        var count = json.info.play_times_limit;
        if (count) {
            list1 = "" + count + "局";
            if (count > 99) {
                list1 = "不限";
            }
        }
        list1 = "局数：" + list1;
        ruleList.push(list1);
        var list2 = "";
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
        if (playMet != "") {
            playMet = playMet.substr(1);
            list2 = playMet;
        }
        else {
            list2 = "无";
        }
        list2 = "玩法：" + list2;
        ruleList.push(list2);
        var list3 = "抓鸟：抓" + json.info.zhaNiaoNum + "鸟";
        ruleList.push(list3);
        return ruleList;
    };
    /**关闭*/
    InvitePanelT.prototype.onCloseBtn = function () {
        this.hide();
    };
    return InvitePanelT;
}(BasePanel));
__reflect(InvitePanelT.prototype, "InvitePanelT");
