var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameController = (function (_super) {
    __extends(GameController, _super);
    function GameController() {
        return _super.call(this) || this;
    }
    /**注册模块时调用*/
    GameController.prototype.onRegister = function () {
        this.addEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
    };
    /**显示游戏*/
    GameController.prototype.showGameScene = function () {
        this.gameScene = App.SceneManager.runScene(SceneConst.GameScene, this);
    };
    /***注销模块时调用*/
    GameController.prototype.onRemove = function () {
        this.removeEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
    };
    /**** 注册socket*/
    GameController.prototype.registerSocket = function () {
        var socket = App.gameSocket;
        socket.register(ProtocolHead.Rev100145, this.revUserJoin, this); //玩家进入匹配房
        socket.register(ProtocolHead.Rev101003, this.revUserJoin, this); //玩家进入好友房
        socket.register(ProtocolHead.Rev100047, this.revOutRoom, this); //广播有玩家离开房间
        socket.register(ProtocolHead.Rev100165, this.revReady, this); //接收准备广播
        socket.register(ProtocolHead.Rev100806, this.revStartGame, this); //开始游戏
        socket.register(ProtocolHead.Rev100808, this.revDealCard, this); //发牌     
        socket.register(ProtocolHead.Rev100809, this.revGetCard, this); //摸牌
        socket.register(ProtocolHead.Rev100811, this.revNoticeAct, this); //通知吃碰杠胡动作
        socket.register(ProtocolHead.Rev100812, this.revAct, this); //响应出吃碰杠胡动作
        socket.register(ProtocolHead.Rev100805, this.revTuoGuan, this); //托管
        socket.register(ProtocolHead.Rev100814, this.revGameOver, this); //游戏结束
        socket.register(ProtocolHead.Rev100803, this.revGameState, this); //游戏状态    10
        socket.register(ProtocolHead.Send100121, this.revTCMatchRoom, this); //接收退出匹配房返回
        socket.register(ProtocolHead.Send101002, this.revTCFriendRoom, this); //接收退出好友房返回
        socket.register(ProtocolHead.Send100151, this.revJieSanRoom, this); //请求好友房解散房间返回
        socket.register(ProtocolHead.Rev100160, this.revJiesanSuccess, this); //广播通知解散桌子
    };
    GameController.prototype.unRegisterSocket = function () {
        var socket = App.gameSocket;
        socket.unRegister(ProtocolHead.Rev100145);
    };
    /***************************************接收数据****************************************** */
    /**接收用户进入*/
    GameController.prototype.revUserJoin = function (data) {
        var json = ProtocolData.Rev104_4_2;
        json = data;
        var userVo = App.DataCenter.UserInfo.getUserBySeatID(json.deskstation);
        if (userVo == null) {
            userVo = new UserVO();
            userVo.userID = json.userid;
            App.DataCenter.UserInfo.addUser(userVo);
        }
        userVo.userID = json.userid;
        userVo.seatID = json.deskstation;
        userVo.nickName = json.nickname;
        userVo.headUrl = json.avater;
        userVo.sex = json.sex;
        userVo.gold = json.money;
        userVo.point = json.point;
        userVo.userPos = CardLogic.getInstance().changeSeat(userVo.seatID);
        this.gameScene.userJoin(userVo);
    };
    /**广播通知有玩家离开房间 */
    GameController.prototype.revOutRoom = function (data) {
        var json = ProtocolData.Rev100047;
        json = data;
        var myuid = App.DataCenter.UserInfo.getMyUserVo().userID;
        var seat = json.deskstation;
        var pos = CardLogic.getInstance().changeSeat(seat);
        if (json.userid == myuid) {
            this.onQuitGame();
        }
        else {
            //删除被踢人员的信息
            if (App.DataCenter.UserInfo.isExist(json.userid)) {
                App.DataCenter.UserInfo.deleteUser(json.userid);
            }
            //匹配房显示loading
            this.gameScene.setMatchLoading();
            //重置用户UI
            this.gameScene.resetUserUI(pos);
        }
    };
    /**接收准备*/
    GameController.prototype.revReady = function (data) {
        var json = ProtocolData.Rev100165;
        json = data;
        console.log("接收准备,位置:", CardLogic.getInstance().changeSeat(json.deskstation));
        var pos = CardLogic.getInstance().changeSeat(json.deskstation);
        var userVo = App.DataCenter.UserInfo.getUser(json.userid);
        userVo && (userVo.setState(PLAYER_STATE.READY, true));
        this.gameScene.showReady(pos);
        if (pos == UserPosition.Down) {
            App.EventManager.sendEvent(EventConst.GameStateChange, GameState.Ready);
        }
        App.SoundManager.playEffect(SoundManager.ready);
    };
    /**接收 庄家 骰子 只保存*/
    GameController.prototype.revStartGame = function (data) {
        ProtocolData.Rev100806 = data;
        console.log("接收庄家,位置:", CardLogic.getInstance().changeSeat(ProtocolData.Rev100806.seatID));
    };
    /**游戏开始发牌每人13张*/
    GameController.prototype.revDealCard = function (data) {
        console.log("接收发牌:", data);
        this.gameScene.revDealCard(data);
    };
    /**接收玩家摸牌*/
    GameController.prototype.revGetCard = function (data) {
        var _this = this;
        //刚开始发牌等手牌显示再显示
        if (this.gameScene.gameState == GameState.DealCard) {
            this.gameScene.headShowUI.hideAllReady();
            this.gameScene.headShowUI.moveTo();
            egret.Tween.get(this).wait(3000).call(function () {
                _this.gameScene.showHandCard();
                _this.gameScene.revGetCard(data);
            });
        }
        else {
            this.gameScene.revGetCard(data);
        }
    };
    /**通知玩家叫牌*/
    GameController.prototype.revNoticeAct = function (data) {
        this.gameScene.revNoticeAct(data);
    };
    /**接收响应玩家操作*/
    GameController.prototype.revAct = function (data, bAnim) {
        this.gameScene.revAct(data);
    };
    /**接收托管*/
    GameController.prototype.revTuoGuan = function (data) {
        var json = ProtocolData.Rev180_7_0;
        json = data;
        var seatID = json.seatID;
        var pos = CardLogic.getInstance().changeSeat(seatID);
        var isTrship = json.isTrship;
        console.log("接收托管,位置:", pos, "托管:", isTrship);
        //托管
        if (isTrship == true) {
            if (pos == UserPosition.Down) {
            }
            // this.gameScene.showTuoGuan(pos);
            App.SoundManager.playEffect(SoundManager.tuoGuan);
        }
        else {
        }
    };
    /**游戏结束 180, 58, 0*/
    GameController.prototype.revGameOver = function (data) {
        this.gameScene.revGameOver(data);
    };
    /**接收游戏状态*/
    GameController.prototype.revGameState = function (data) {
        this.gameScene.revGameState(data);
    };
    /**接收退出匹配房返回 */
    GameController.prototype.revTCMatchRoom = function (data) {
        var json = ProtocolData.Rev100121;
        json = data;
        if (json.code == 200) {
            this.onQuitGame();
        }
    };
    /**接收退出好友房返回 */
    GameController.prototype.revTCFriendRoom = function (data) {
        var json = ProtocolData.Rev101002;
        json = data;
        if (json.code == 200) {
            this.onQuitGame();
        }
    };
    //接收解散房间返回
    GameController.prototype.revJieSanRoom = function (data) {
        var json = ProtocolData.Rev100151;
        json = data;
        if (json.code == 200) {
            App.PanelManager.close(PanelConst.SendjiesanPanel);
            if (data.info.is_dissolve == 1) {
            }
            if (this.gameScene.gameState == GameState.Playing || this.gameScene.gameState == GameState.DealCard || this.gameScene.gameState == GameState.GameOver || this.gameScene.gameState == GameState.Ready) {
                // if (this.gameScene.curPlayCount != this.gameScene.maxPlayCount) {
                TipsLog.gameInfo("等待其他玩家同意");
                App.PanelManager.open(PanelConst.JieSanPanel, null, null, false);
                var jiesanPanel = App.PanelManager.getPanel(PanelConst.JieSanPanel);
                var s = ProtocolData.Rev100155;
                s.info.solveUserName = App.DataCenter.UserInfo.getMyUserVo().nickName;
                s.info.solveUserID = App.DataCenter.UserInfo.getMyUserVo().userID;
                s.info.deskno = App.DataCenter.UserInfo.getMyUserVo().seatID;
                jiesanPanel.btnGroup.visible = false;
                jiesanPanel.waitLabel.visible = true;
                jiesanPanel.updateUser(s);
                jiesanPanel.timerStart();
            }
        }
    };
    /*** 广播通知解散桌子 */
    GameController.prototype.revJiesanSuccess = function (data) {
        var json = ProtocolData.Rev100160;
        json = data;
        //退出房间tween被移除，延迟处理
        setTimeout(function () {
            TipsLog.hallInfo("房间已解散，自动返回大厅");
        }, 200);
        // this.isJieSan = true;
        if (json.code == 200) {
            if (json.info.overType == 1) {
                this.onQuitGame();
            }
        }
    };
    /****************************************end***************************************************/
    ////////////////////////////////////////////////////////////////////////////
    /**发送请求游戏状态*/
    GameController.prototype.sendGameState = function () {
        var json = ProtocolData.Send100150;
        json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        var room_type = App.DataCenter.roomInfo.roomType;
        var hallController = App.getController(HallController.NAME);
        if (hallController.isReconnection) {
            json.room_name = "";
        }
        else {
            if (room_type == RoomType.FriendRoom) {
                json.room_name = "csmj_room_friend_1";
            }
            else if (room_type == RoomType.MatchRoom) {
                json.room_name = "csmj_room_match_1";
            }
        }
        App.gameSocket.send(ProtocolHead.Send100150, json);
    };
    /**
     * 玩家请求操作(吃、碰、杠、胡等)
     * @act 玩家动作
     * @cardList 动作牌列表
     */
    GameController.prototype.sendAct = function (act, cardList) {
        if (cardList === void 0) { cardList = null; }
        var json = ProtocolData.Send100810;
        json.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        json.act = act;
        json.cardList = cardList;
        App.gameSocket.send(ProtocolHead.Send100810, json);
        console.log("提交动作,act:", act, "cardList:", cardList);
    };
    /**发送准备 */
    GameController.prototype.sendReady = function () {
        var data = ProtocolData.Send100162;
        data.userid = App.DataCenter.UserInfo.getMyUserVo().userID,
            data.deviceID = "111";
        App.gameSocket.send(ProtocolHead.Send100162, data);
    };
    /**发送取消准备 */
    GameController.prototype.sendCancelReady = function () {
        App.gameSocket.send(ProtocolHead.Send100164);
    };
    /*** 好友房发送退出房间*/
    GameController.prototype.SendTCRoom = function () {
        var room_type = App.DataCenter.roomInfo.roomType;
        if (room_type == RoomType.FriendRoom) {
            this.sendJieSan();
        }
        else {
            var json = ProtocolData.Send100121;
            json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
            json.deviceID = "111";
            // if (this.gameScene.gameState == GameState.GameOver || this.gameScene.gameState == GameState.Free || this.gameScene.gameState == GameState.Ready) {
            App.gameSocket.send(ProtocolHead.Send100121, json);
        }
    };
    //发送解散房间
    GameController.prototype.sendJieSan = function () {
        var json = ProtocolData.Send100151;
        json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        json.deviceID = "111";
        App.gameSocket.send(ProtocolHead.Send100151, json);
    };
    /**离开游戏*/
    GameController.prototype.onQuitGame = function () {
        //移除所有弹框
        App.PanelManager.closeAllPanel();
        App.MsgBoxManager.recycleAllBox();
        App.DataCenter.deskInfo.ownerID = 0;
        App.DataCenter.UserInfo.deleteAllUserExcptMe();
        var userVo = App.DataCenter.UserInfo.getMyUserVo();
        userVo && (userVo.setState(PLAYER_STATE.READY, false));
        App.EventManager.sendEvent(HallController.EVENT_SHOW_HALL);
    };
    return GameController;
}(BaseController));
/**游戏模块名*/
GameController.NAME = "GameController";
/**显示游戏场景*/
GameController.EVENT_SHOW_GAME_SCENE = "EVENT_SHOW_GAME_SCENE";
__reflect(GameController.prototype, "GameController");
