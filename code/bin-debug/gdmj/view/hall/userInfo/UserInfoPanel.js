/**
 * 个人信息界面
 * @author huanglong
 * 2017-030-20
 *
 * 不是玩家自己需要传递参数
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserInfoPanel = (function (_super) {
    __extends(UserInfoPanel, _super);
    function UserInfoPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "gameUserSkin";
        return _this;
    }
    UserInfoPanel.prototype.childrenCreated = function () {
        this.nameLab.maxChars = 8;
    };
    /** 添加到场景*/
    UserInfoPanel.prototype.onEnable = function () {
        this.offFlag = true;
        this.initView();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.contactBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureBtn, this);
        this.kickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.kickSomeone, this);
        this.addFriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriend, this);
        this.addFriendSBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriend, this);
        this.modifyImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onModify, this);
        this.nameLab.addEventListener(egret.FocusEvent.FOCUS_IN, this.FcousIn, this);
        this.nameLab.addEventListener(egret.FocusEvent.FOCUS_OUT, this.FcousOut, this);
        this.bindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBindBtn, this);
        this.setCenter();
    };
    /** 从场景中移除*/
    UserInfoPanel.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.contactBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureBtn, this);
        this.kickBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.kickSomeone, this);
        this.addFriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriend, this);
        this.addFriendSBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriend, this);
        this.modifyImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onModify, this);
        this.nameLab.removeEventListener(egret.FocusEvent.FOCUS_IN, this.FcousIn, this);
        this.nameLab.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.FcousOut, this);
        this.bindBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBindBtn, this);
        this.recData = null;
    };
    /**设置界面值 */
    UserInfoPanel.prototype.initView = function () {
        this.nameBg.visible = false;
        var user;
        if (this.recData.self) {
            if (App.getInstance().indepFlag && App.DataCenter.UserInfo.getMyUserVo().visitorFlag) {
                this.bindBtn.visible = true;
                this.contactBtn.visible = false;
            }
            else {
                this.bindBtn.visible = false;
                this.contactBtn.visible = true;
            }
            this.btnGro.visible = false;
            this.nameLab.touchEnabled = true;
            this.modifyImg.visible = true;
            this.addFriendSBtn.visible = false;
        }
        else {
            if (App.DataCenter.roomInfo.roomType == RoomType.FriendRoom) {
                this.contactBtn.visible = false;
                //点自己显示确定
                if (App.DataCenter.UserInfo.getMyUserVo().userID == this.recData.uid) {
                    this.contactBtn.visible = true;
                    this.addFriendSBtn.visible = false;
                    this.btnGro.visible = false;
                }
                else if (App.DataCenter.deskInfo.ownerID == App.DataCenter.UserInfo.getMyUserVo().userID) {
                    this.addFriendSBtn.visible = false;
                    this.btnGro.visible = true;
                }
                else {
                    this.addFriendSBtn.visible = true;
                    this.btnGro.visible = false;
                }
            }
            else {
                this.contactBtn.visible = true;
                this.btnGro.visible = false;
                this.addFriendSBtn.visible = false;
            }
            this.bindBtn.visible = false;
            this.nameLab.touchEnabled = false;
            this.modifyImg.visible = false;
        }
        user = this.recData;
        this.headIcon.mask = this.headMaskImg;
        //this.headIcon.source = RES.getRes(user.avater_url);
        //this.loadImg(user.avater_url);
        this.headIcon.source = user.avater_url;
        if (parseInt(user.sex) == SEX_TYPE.boy) {
            this.sexImg.texture = RES.getRes("boy_png");
        }
        else {
            this.sexImg.texture = RES.getRes("girl_png");
        }
        this.nameLab.text = user.name;
        this.idLab.text = user.accid + "";
        this.totalLab.text = user.totalgames + "";
        this.winPercentLab.text = user.ratewinning;
        this.integralLab.text = user.point + "";
        this.continuousWinLab.text = user.highest_winning_streak + "";
        this.curName = user.name;
    };
    /**头像 */
    UserInfoPanel.prototype.loadImg = function (headUrl) {
        if (headUrl && headUrl != "" && headUrl != 1) {
            this.headIcon.source = headUrl;
        }
    };
    /**改名 */
    UserInfoPanel.prototype.onModify = function () {
        this.nameLab.setFocus();
    };
    /**聚焦 */
    UserInfoPanel.prototype.FcousIn = function () {
        this.nameBg.visible = true;
    };
    /**失去焦点 */
    UserInfoPanel.prototype.FcousOut = function () {
        var _this = this;
        this.nameBg.visible = false;
        this.offFlag = true;
        var curText = this.nameLab.text;
        if (curText != this.curName) {
            var http = new HttpSender();
            var data = ProtocolHttp.editNickName;
            data.param.nickname = curText;
            http.send(data, function (data) {
                console.log("修改昵称返回：", data);
                if (data.ret) {
                    TipsLog.hallInfo(data.desc);
                    _this.nameLab.text = _this.curName;
                    _this.offFlag = false;
                }
                else {
                    _this.curName = data.data;
                    //同步昵称到本地数据
                    App.DataCenter.UserInfo.changeName(data.data);
                }
            }, this);
        }
    };
    /**踢人 */
    UserInfoPanel.prototype.kickSomeone = function () {
        // var data = ProtocolData.Send102_20_0;
        // data.kickUserID = Number(this.recData.uid);
        // App.gameSocket.send(ProtocolHead.Send102_20_0, data);
        var userid = Number(this.recData.uid);
        var ctlr = App.getController(GameController.NAME);
        // ctlr.sendKick(userid);
        this.hide();
    };
    /**加好友 */
    UserInfoPanel.prototype.addFriend = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.AddFriend;
        data.param.uid = this.recData.uid;
        http.send(data, this.friendBack, this);
    };
    /**加好友返回 */
    UserInfoPanel.prototype.friendBack = function (data) {
        if (data.ret == 0) {
            TipsLog.gameInfo("添加好友请求已发送");
            this.hide();
        }
        else {
            if (Number(data.ret) == 303) {
                TipsLog.gameInfo("你们已经是好友了哦");
            }
            else {
                TipsLog.gameInfo(data.desc);
            }
        }
    };
    /**确定 */
    UserInfoPanel.prototype.onSureBtn = function () {
        if (this.offFlag) {
            this.hide();
        }
        this.offFlag = true;
    };
    /**绑定 */
    UserInfoPanel.prototype.onBindBtn = function () {
        App.PanelManager.open(PanelConst.BindPanel);
        this.hide();
    };
    /**关闭*/
    UserInfoPanel.prototype.onCloseBtn = function (e) {
        this.hide();
    };
    return UserInfoPanel;
}(BasePanel));
__reflect(UserInfoPanel.prototype, "UserInfoPanel");
