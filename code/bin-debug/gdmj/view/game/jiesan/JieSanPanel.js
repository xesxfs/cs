/**
 * @author xiongjian
 * 2017-4-11
 * 解散房间面板
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JieSanPanel = (function (_super) {
    __extends(JieSanPanel, _super);
    function JieSanPanel() {
        var _this = _super.call(this) || this;
        _this.headList = new Array(); //下排所有玩家头像
        _this.uidList = []; //所有玩家uid
        _this.count = 30;
        _this.skinName = "jiesanPanelSkin";
        return _this;
    }
    /**组件创建完毕*/
    JieSanPanel.prototype.childrenCreated = function () {
        this.btnGroup.visible = true;
        for (var i = 0; i < 3; i++) {
            this.headList.push(this.headGroup.getChildAt(i));
        }
        this.waitLabel.visible = false;
        //倒计时
        this.timer = new egret.Timer(1000, 30);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
    };
    /**添加到场景中*/
    JieSanPanel.prototype.onEnable = function () {
        // this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jujueTouch, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    };
    /**从场景中移除*/
    JieSanPanel.prototype.onRemove = function () {
        // this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.jujueTouch, this);
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
        this.uidList = [];
    };
    //拒绝解散房间
    JieSanPanel.prototype.jujueTouch = function () {
        var ctrl = App.getController(GameController.NAME);
        // ctrl.sendJieSanBack(SendJieSanState.no);
        this.btnGroup.visible = false;
        this.hide();
    };
    //同意解散房间
    JieSanPanel.prototype.okTouch = function () {
        var ctrl = App.getController(GameController.NAME);
        // ctrl.sendJieSanBack(SendJieSanState.yes);
        this.btnGroup.visible = false;
        this.hide();
    };
    //更新发送解散房间人的信息
    JieSanPanel.prototype.updateUser = function (data) {
        var json = ProtocolData.Rev100155;
        json = data;
        // let info =JSON.parse(data.info);
        var info = data.info;
        var name = info.solveUserName;
        var seat = info.deskno;
        var uid = info.solveUserID;
        console.info("更新解散" + uid);
        var userVo = App.DataCenter.UserInfo.getUserByUserID(uid);
        var userList = App.DataCenter.UserInfo.userList;
        var ulist = [];
        for (var key in userList) {
            if (userList[key].userID == uid) {
                this.sendHead.updateName(name);
                this.sendHead.updataHead(userVo.headUrl);
                this.sendHead.updataState(JieSanState.send);
            }
            else {
                ulist.push(userList[key]);
                this.uidList.push(userList[key].userID); //将uid放进数组
            }
        }
        for (var i = 0; i < ulist.length; i++) {
            console.log(ulist[i]);
            if (i == 3) {
                return;
            }
            this.headList[i].updataHead(ulist[i].headUrl);
            this.headList[i].updateName(ulist[i].nickName);
            this.headList[i].updataState(JieSanState.wait);
        }
    };
    JieSanPanel.prototype.timerStart = function () {
        this.count = 30;
        this.timer.stop();
        this.timer.reset();
        this.timer.start();
    };
    /**更新玩家返回状态 */
    JieSanPanel.prototype.updateState = function (data) {
        var userid = data.info.user_id;
        var isAgree = data.info.is_agree;
        var state;
        if (isAgree == IsAgree.agree) {
            state = JieSanState.ok;
        }
        else if (isAgree == IsAgree.noAgree) {
            state = JieSanState.jujue;
        }
        for (var i = 0; i < this.uidList.length; i++) {
            if (userid == this.uidList[i]) {
                // console.log("更新状态"+userid);
                this.headList[i].updataState(state);
            }
        }
    };
    JieSanPanel.prototype.close = function () {
        this.hide();
    };
    JieSanPanel.prototype.timerFunc = function () {
        if (this.count < 10) {
            this.tiemLabel.text = "00:0" + this.count;
        }
        else {
            this.tiemLabel.text = "00:" + this.count;
        }
        this.count--;
    };
    JieSanPanel.prototype.timerComFunc = function () {
        this.timer.stop();
        this.timer.reset();
        this.count = 30;
        this.close();
    };
    return JieSanPanel;
}(BasePanel));
__reflect(JieSanPanel.prototype, "JieSanPanel");
var SendJieSanState;
(function (SendJieSanState) {
    SendJieSanState[SendJieSanState["no"] = 0] = "no";
    SendJieSanState[SendJieSanState["yes"] = 1] = "yes";
})(SendJieSanState || (SendJieSanState = {}));
var IsAgree;
(function (IsAgree) {
    IsAgree[IsAgree["agree"] = 1] = "agree";
    IsAgree[IsAgree["noAgree"] = 2] = "noAgree";
})(IsAgree || (IsAgree = {}));
