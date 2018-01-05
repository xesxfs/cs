var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 头像插件
 * @author xiongjian
 * @date 2017/6/29
 */
var HeadPlugin = (function (_super) {
    __extends(HeadPlugin, _super);
    function HeadPlugin() {
        var _this = _super.call(this) || this;
        _this.playerNum = 4; //玩家人数
        _this.gangZhengList = []; //杠正分
        _this.gangFuList = []; //杠负分
        _this.gangFenYList = []; //杠分的y轴位置
        _this.readyList = []; //所有玩家准备图标
        /**准备按钮list*/
        _this.readyList1 = [];
        _this.readyList2 = [];
        //-----------头像----------------
        _this.headUIList = new Array(); //所有玩家头像列表
        _this.headUIList1 = new Array(); //散开所有玩家头像列表 (定位用)
        _this.headUIPointXlist = [1, 583, 583, 1]; //开始游戏后个人头像X坐标
        _this.headUIPointYlist = [848, 709, 30, 137]; //开始游戏后个人头像Y坐标
        _this.headScaleX = 1; //游戏开始之后头像X缩小
        _this.headScaleY = 1; //游戏开始之后头像Y缩小
        _this.headUIPointSXlist = [285, 490, 285, 60]; //开始游戏前个人头像X坐标
        _this.headUIPointSYlist = [671, 423, 147, 423]; //开始游戏前个人头像Y坐标
        _this.skinName = "headPlugin";
        return _this;
    }
    HeadPlugin.prototype.childrenCreated = function () {
        for (var i = 0; i < this.playerNum; i++) {
            this.headUIList.push(this.headGroup.getChildAt(i));
            this.headUIList1.push(this.headGroup.getChildAt(i + 4));
            this.gangZhengList.push(this.gangFenGroup.getChildAt(i));
            this.gangFuList.push(this.gangFenGroup.getChildAt(i + 4));
            this.gangFenYList.push(this.gangZhengList[i].y);
            // 准备
            this.readyList1.push(this.readyGroup.getChildAt(i));
            this.readyList2.push(this.readyGroup.getChildAt(i + 4));
        }
        //头像点击
        this.headGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.headTouch, this);
    };
    HeadPlugin.prototype.onEnable = function () {
        this.jixuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJixuTouch, this);
        this.xujuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXujuTouch, this);
        this.readyBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReady1Touch, this);
    };
    /**重置头像 */
    HeadPlugin.prototype.resetHeadUI = function () {
        var len = this.headUIList.length;
        for (var i = 0; i < len; i++) {
            this.headUIList[i].scaleX = 1;
            this.headUIList[i].scaleY = 1;
            this.headUIList[i].x = this.headUIPointSXlist[i];
            this.headUIList[i].y = this.headUIPointSYlist[i];
            this.headUIList[i].nameLabel.visible = true;
        }
        this.hideAllReady();
        this.setUserReady(); //重置准备
    };
    /**隐藏所有准备图标*/
    HeadPlugin.prototype.hideAllReady = function () {
        this.readyGroup.removeChildren();
    };
    /**显示准备图标*/
    HeadPlugin.prototype.showReady = function (pos) {
        //最初状态准备按钮
        if (this.headUIList[0].x != this.headUIPointXlist[0]) {
            this.readyList = this.readyList1;
            this.readyGroup.addChild(this.readyList[pos]);
        }
        else {
            this.readyList = this.readyList2;
            this.readyGroup.addChild(this.readyList[pos]);
        }
    };
    /**隐藏准备图标*/
    HeadPlugin.prototype.hideReady = function (pos) {
        if (this.readyList.length) {
            //最初状态准备按钮
            if (this.headUIList[0].x != this.headUIPointXlist[0]) {
                this.readyList = this.readyList1;
                var ready = this.readyList[pos];
                ready && ready.parent && ready.parent.removeChild(ready);
            }
            else {
                this.readyList = this.readyList2;
                var ready = this.readyList[pos];
                ready && ready.parent && ready.parent.removeChild(ready);
            }
        }
    };
    /**设置准备按钮*/
    HeadPlugin.prototype.showReadyBtn = function () {
        this.readyGroup.addChild(this.readyBtn);
        this.readyBtn.visible = true;
    };
    //显示已进入房间的玩家头像和准备
    HeadPlugin.prototype.setInviteUserHead = function () {
        var userList = App.DataCenter.UserInfo.userList;
        console.log("设置已进入邀请界面玩家的头像,用户列表:", userList);
        for (var key in userList) {
            this.updateUserHead(userList[key]);
        }
    };
    /**设置已进入房间玩家状态*/
    HeadPlugin.prototype.setUserReady = function () {
        var userList = App.DataCenter.UserInfo.userList;
        console.log("设置玩家状态,用户列表:", userList);
        for (var key in userList) {
            var userVo = userList[key];
            //设置准备
            if (userVo.checkState(PLAYER_STATE.READY)) {
                this.showReady(userVo.userPos);
            }
            else {
                if (userVo.userPos == UserPosition.Down) {
                    this.showReadyBtn();
                }
            }
        }
    };
    /**显示玩家头像、昵称等信息*/
    HeadPlugin.prototype.updateUserHead = function (userVo) {
        if (userVo) {
            this.cardLogic = CardLogic.getInstance();
            var deskVo = App.DataCenter.deskInfo;
            userVo.userPos = this.cardLogic.changeSeat(userVo.seatID);
            var headUI = this.headUIList[userVo.userPos];
            headUI.loadImg(userVo.headUrl);
            //开始游戏后隐藏昵称
            if (this.headUIList[0].x == this.headUIPointXlist[0]) {
                headUI.nameLabel.visible = false;
            }
            else {
                headUI.nameLabel.visible = true;
            }
            headUI.nameLabel.text = StringTool.formatNickName(userVo.nickName);
            headUI.scoreLabel.visible = true; //显示积分
            headUI.sidai.visible = true; //显示丝带
            headUI.scoreLabel.text = NumberTool.formatMoney(userVo.point);
            headUI.seatID = userVo.seatID;
            //显示房主标识
            deskVo && (headUI.headOwner.visible = userVo.userID == deskVo.ownerID);
            this.headGroup.addChild(headUI);
        }
    };
    /**更新积分*/
    HeadPlugin.prototype.updatePoint = function () {
        var userList = App.DataCenter.UserInfo.userList;
        for (var key in userList) {
            var userVo = userList[key];
            this.headUIList[userVo.userPos].scoreLabel.text = NumberTool.formatMoney(userVo.point);
        }
    };
    /**隐藏玩家头像*/
    HeadPlugin.prototype.hideHeadUI = function (pos) {
        var headUI = this.headUIList[pos];
        headUI.clear();
    };
    /**清理头像UI*/
    HeadPlugin.prototype.hideAllHeadUI = function () {
        var len = this.headUIList.length;
        var headUI;
        for (var i = 0; i < len; i++) {
            headUI = this.headUIList[i];
            headUI.clear();
        }
    };
    /**设置头像位置*/
    HeadPlugin.prototype.setGameHeadPos = function (pos) {
        var _this = this;
        if (pos === void 0) { pos = null; }
        console.log("设置头像");
        var time = 500;
        //此处不能用循环处理
        egret.Tween.get(this.headUIList[0]).to({ x: this.headUIPointXlist[0], y: this.headUIPointYlist[0] }, time).call(function () {
            _this.headUIList[0].scaleX = _this.headScaleX;
            _this.headUIList[0].scaleY = _this.headScaleY;
            _this.headUIList[0].nameLabel.visible = false; //游戏开始隐藏昵称
        });
        egret.Tween.get(this.headUIList[1]).to({ x: this.headUIPointXlist[1], y: this.headUIPointYlist[1] }, time).call(function () {
            _this.headUIList[1].scaleX = _this.headScaleX;
            _this.headUIList[1].scaleY = _this.headScaleY;
            _this.headUIList[1].nameLabel.visible = false;
        });
        egret.Tween.get(this.headUIList[2]).to({ x: this.headUIPointXlist[2], y: this.headUIPointYlist[2] }, time).call(function () {
            _this.headUIList[2].scaleX = _this.headScaleX;
            _this.headUIList[2].scaleY = _this.headScaleY;
            _this.headUIList[2].nameLabel.visible = false;
        });
        egret.Tween.get(this.headUIList[3]).to({ x: this.headUIPointXlist[3], y: this.headUIPointYlist[3] }, time).call(function () {
            _this.headUIList[3].scaleX = _this.headScaleX;
            _this.headUIList[3].scaleY = _this.headScaleY;
            _this.headUIList[3].nameLabel.visible = false;
            //需要做延时处理 怕资源未被加载  显示庄
            egret.Tween.get(_this).wait(500).call(function () {
                if (pos != null) {
                    var headUI = _this.headUIList[pos];
                    var headImg = headUI.headImg;
                    _this.zhuangFlag || (_this.zhuangFlag = new ZhuangFlag());
                    _this.zhuangFlag.x = headUI.x + headImg.x + 96 - 10;
                    _this.zhuangFlag.y = headUI.y + headImg.y;
                    _this.headGroup.addChild(_this.zhuangFlag);
                }
            });
        });
    };
    HeadPlugin.prototype.headTouch = function (e) {
        // console.log(e.target);
        switch (e.target.parent) {
            case this.headUIList[0]:
                this.getOtherUserInfo(0);
                break;
            case this.headUIList[1]:
                this.getOtherUserInfo(1);
                break;
            case this.headUIList[2]:
                this.getOtherUserInfo(2);
                break;
            case this.headUIList[3]:
                this.getOtherUserInfo(3);
                break;
        }
    };
    /**
     * 发送Http请求玩家信息
     */
    HeadPlugin.prototype.getOtherUserInfo = function (num) {
        var user = App.DataCenter.UserInfo.getUserByPos(num);
        if (user) {
            var http = new HttpSender();
            var data = ProtocolHttp.getOtherUserInfo;
            data.param.uid = user.userID;
            http.send(data, this.updateUserInfo, this);
        }
    };
    /**
     * 更新用户资料
     */
    HeadPlugin.prototype.updateUserInfo = function (data) {
        if (!data.ret) {
            App.PanelManager.open(PanelConst.UserInfoPanel, null, this, true, true, data.data);
        }
        else {
            TipsLog.gameInfo(data.desc);
        }
    };
    //继续
    HeadPlugin.prototype.onJixuTouch = function () {
        // this.resetGame();
        this.readyBtn.visible = true;
        this.resetHeadUI();
        // this.hideDisc();
        // this.friendRoomGroup.visible = true;
    };
    //续局
    HeadPlugin.prototype.onXujuTouch = function () {
        // this.resetGame();
        this.readyBtn.visible = true;
        this.resetHeadUI();
        // this.hideDisc();
        // this.friendRoomGroup.visible = true;
    };
    //结算后准备
    HeadPlugin.prototype.onReady1Touch = function () {
        // this.hideBtnGroup();
        // this.resetGame();
        // this.onInitPosition();
        // App.ResUtils.loadGroup([AssetConst.Game, AssetConst.Card], this, this.sendReady, null, 10);
    };
    return HeadPlugin;
}(BaseUI));
__reflect(HeadPlugin.prototype, "HeadPlugin");
