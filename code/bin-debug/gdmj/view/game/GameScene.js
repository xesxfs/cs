var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        /*** 玩家人数 */
        _this.playerNum = 4;
        /*****************************************************/
        _this.autoReadyTimer = new DateTimer(1000); //自动准备计时器
        _this.readyTime = 2; //自动准备时间
        _this.skinName = "GameSceneSkin1";
        return _this;
    }
    /**组件初始化完成 */
    GameScene.prototype.childrenCreated = function () {
        this.cardLogic = CardLogic.getInstance();
        this.cardFactory = CardFactory.getInstance();
        console.log("childrenCreated");
    };
    GameScene.prototype.onEnable = function () {
        this.actShowUI.addEventListener("actAction", this.actAction, this);
        this.cardShowUI.addEventListener("cardAction", this.cardAction, this);
        this.setBottomMenu();
        this.resetScene();
        this.setMatchLoading();
        this.updateAllHeadUI();
        this.setRoomInfo();
        this.ctrl.registerSocket();
        this.getGameState();
        this.startReadyTimer(this.readyTime);
        this.showSwapCard();
        console.log("onEnable");
    };
    GameScene.prototype.onRemove = function () {
        App.SoundManager.stopBGM();
    };
    /*******************************************************************************
     ****************************UI Action start************************************/
    /**cardAction*/
    GameScene.prototype.cardAction = function (e) {
        var data = e.data;
        this.sendAct(data[0], data[1]);
    };
    /**actShowUI*/
    GameScene.prototype.actAction = function (e) {
        var data = e.data;
        this.sendAct(data[0], data[1]);
    };
    /******************************************************************************
     ****************************UI　Action end************************************/
    /******************************************************************************
     ****************************牌逻辑处理****************************************/
    /***显示手牌**/
    GameScene.prototype.showHandCard = function () {
        console.log("显示手牌");
        for (var i = 0; i < this.playerNum; i++) {
            this.cardShowUI.showHandCard(i);
        }
    };
    /**接收发牌 并保存 不显示**/
    GameScene.prototype.revDealCard = function (data) {
        console.log("接收发牌");
        this.gameState = GameState.DealCard;
        this.cardShowUI.createHandCard(data);
        /***第一局，需要滚骰子**/
        var diceList = ProtocolData.Rev100806.dice1;
        if (diceList == null) {
        }
        else {
        }
    };
    /**玩家摸牌*/
    GameScene.prototype.revGetCard = function (data) {
        console.log("玩家摸牌");
        this.gameState = GameState.Playing;
        var json = ProtocolData.Rev180_53_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var cardValue = json.cardList[0];
        this.cardShowUI.takeCard(pos, cardValue);
        // this.showLight(pos);
        // this.reduceLeftCard();
        // this.startOutTimer(this.outTime);
        //其他动作处理
        if (json.state != 0) {
            //自己摸牌,可能触发出牌,暗杠,明杠,胡
            if (pos == UserPosition.Down) {
                console.log("玩家摸牌：", cardValue, " 状态:", json.state);
                if (this.cardLogic.checkActState(json.state, ACT_state.Act_NormalDo)) {
                    this.cardShowUI.noticeOutCard();
                }
                var actList = this.cardLogic.anylzyeActState(json.state);
                this.actShowUI.showSelectAct(actList, this.cardShowUI.getHandleCard(UserPosition.Down), cardValue, this.cardShowUI.CPGList[UserPosition.Down], 1);
            }
        }
    };
    /***通知玩家叫牌  (能不能吃、碰、点杠、点炮) ***/
    GameScene.prototype.revNoticeAct = function (data) {
        console.log("通知玩家叫牌");
        var json = ProtocolData.Rev180_55_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        console.log("通知玩家叫牌,位置:", pos, "牌值:", json.card, "状态:", json.state);
        if (pos == UserPosition.Down) {
            var actList = this.cardLogic.anylzyeActState(json.state);
            this.actShowUI.showSelectAct(actList, this.cardShowUI.getHandleCard(UserPosition.Down), json.card, this.cardShowUI.CPGList[UserPosition.Down]);
        }
        // this.startOutTimer(this.actTime);
    };
    /**
     * 响应玩家操作 (其他玩家吃、碰等，广播给另外3玩家) 180, 56, 0
     * @data 操作数据
     * @bAnim 是否播放动画、声音
     */
    GameScene.prototype.revAct = function (data, bAnim) {
        if (bAnim === void 0) { bAnim = true; }
        console.log("响应玩家操作");
        var json = ProtocolData.Rev180_56_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var cardValue = json.cardList[0];
        var cardList = json.cardList;
        var act = json.act;
        var actParam = json.actParam;
        var userVo = App.DataCenter.UserInfo.getUserBySeatID(json.seatID);
        this.actShowUI.hideSelectAct();
        //因为没有自摸字段，这里判断是否自摸
        if (act == ACT_act.Act_Hu) {
        }
        else {
        }
        //console.log("接收动作,位置:",pos,"动作:",act,"data:",json);
        switch (act) {
            case ACT_act.Act_NormalDo:
                bAnim && App.SoundManager.playOutCard(cardValue, userVo.sex);
                this.cardShowUI.dealOutAction(pos, cardValue);
                // this.hideAllActTip();
                // this.hideAllOutEffect();
                // bAnim && this.showOutEffect(cardValue, pos);
                break;
            case ACT_act.Act_Pass:
                break;
            case ACT_act.Act_Hu:
                // this.showActTip(act, pos);
                break;
            case ACT_act.Act_Peng: //碰牌
            case ACT_act.Act_Chi: //吃牌
            case ACT_act.Act_Gang: //杠
            case ACT_act.Act_AnGang:
                // this.showLight(pos);
                // this.startOutTimer(this.outTime);
                //this.offHandCard(pos, 1);//偏移手牌
                // this.eatHandler(act, pos, cardList, actParam);
                this.cardShowUI.dealCPGAction(act, pos, cardList, actParam);
                // bAnim && this.showActTip(act, pos);
                // if (pos == UserPosition.Down) {
                //     this.bAllowOutCard = true;
                // }
                break;
        }
    };
    /**通知玩家出牌  已经没有用**/
    GameScene.prototype.revNoticeOutCard = function (data) {
        console.log("通知玩家出牌");
        var json = ProtocolData.Rev180_57_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        if (pos == UserPosition.Down) {
            this.cardShowUI.noticeOutCard();
        }
    };
    /***广播玩家叫牌 **/
    GameScene.prototype.revNoticeJiao = function () {
        console.log("广播玩家叫牌");
    };
    /**接收牌局信息*/
    GameScene.prototype.revRecordInfo = function (data) {
        console.log("接收牌局信息");
        var json = ProtocolData.Rev180_62_0;
        json = data;
    };
    /***获取游戏状态**/
    GameScene.prototype.getGameState = function () {
        console.log("请求获取游戏状态");
        //暂时屏蔽超时退回大厅回调
        //App.LoadingLock.lock(this.quitToHall,this);
        App.LoadingLock.lock(null, this);
        this.ctrl.sendGameState();
    };
    /***接收游戏状态**/
    GameScene.prototype.revGameState = function (data) {
        App.LoadingLock.unlock();
        var json = ProtocolData.Rev100803;
        json = data;
        var deskStatus = json.deskStatus;
        var gameSeatInfo = json.gameSeatInfo;
        var lastCardNum = json.lastCardNum;
        var count = json.curPlayCount;
        //游戏中就把当前局数加1
        if (deskStatus == GS_GAME_STATION.GS_GAME_PLAYING) {
            count += 1;
        }
        var curPlayCount = count;
        var maxPlayCount = json.maxPlayCount;
        //baoc游戏规则
        ProtocolData.gameConfig = json.gameConfig;
        /***玩家信息 */
        this.saveGameSeatInfo(gameSeatInfo);
        this.setAllUserReady();
        /***剩余牌数 */
        this.leftCardUI.setLeftCard(json.lastCardNum);
        /***局数*/
        this.topTitleShowUI.setJuShu(curPlayCount, maxPlayCount);
        switch (deskStatus) {
            case GS_GAME_STATION.GS_WAIT_SETGAME:
                this.gameState = GameState.Free;
                break;
            case GS_GAME_STATION.GS_WAIT_ARGEE:
                // if (this.curPlayCount > 0) {
                //     this.gameState = GameState.GameOver;
                // } else {
                //     this.gameState = GameState.Free;
                // }
                // this.gsWaitAgree(data);
                break;
            case GS_GAME_STATION.GS_GAME_PLAYING:
                this.gameState = GameState.Playing;
                this.gsGamePlaying(data);
                break;
            case GS_GAME_STATION.GS_GAME_FINSHED:
                this.gameState = GameState.GameOver;
                break;
        }
    };
    /***断线游戏中,恢复游戏场景**/
    GameScene.prototype.gsGamePlaying = function (data) {
        var json = ProtocolData.Rev100803;
        json = data;
        var deskStatus = json.deskStatus;
        this.gameState = GameState.Playing;
        App.DataCenter.gameState = GameState.Playing;
        this.headShowUI.moveTo();
        this.froomInfoShowUI.hide();
        this.hideAllReady();
        this.resumeDesk(data);
    };
    /***恢复桌子场景**/
    GameScene.prototype.resumeDesk = function (data) {
        var json = ProtocolData.Rev100803;
        json = data;
        var bankerSeat = json.bankerSeat;
        var gameSeatInfo = json.gameSeatInfo;
        var curCanDoAct = json.curCanDoAct; //游戏动作状态
        // this.curActCard = json.pre_op_card;//最后一张打出的牌       
        var pre_speaker_seat = json.pre_speaker_seat; // 最后一个出牌的人
        var lastpos;
        if (pre_speaker_seat != -1) {
            var speakSeat = (pre_speaker_seat + 1) % 4; //最后一个出牌人的下家
            lastpos = CardLogic.getInstance().changeSeat(speakSeat); //当前出牌人pos     
        }
        var seatInfoLen = gameSeatInfo.length;
        for (var i = 0; i < seatInfoLen; i++) {
            var seatInfo = ProtocolData.GameSeatInfo;
            seatInfo = gameSeatInfo[i];
            var seatID = seatInfo.seatID;
            var pos = this.cardLogic.changeSeat(seatID);
            //吃牌
            var chiCards = seatInfo.chiCards;
            if (chiCards != null) {
                var chiCardLen = chiCards.length;
                var chiNum = chiCardLen / 3;
                for (var j = 0; j < chiNum; j++) {
                    var chiList = [chiCards[j * 3], chiCards[j * 3 + 1], chiCards[j * 3 + 2]];
                    ArrayTool.sortArr(chiList); //排序
                    this.cardShowUI.pushCPG(pos, ACT_act.Act_Chi, chiList);
                }
            }
            //碰牌
            var pengCards = seatInfo.pengCards;
            if (pengCards != null) {
                var pengCardLen = pengCards.length;
                for (var j = 0; j < pengCardLen; j++) {
                    var cardValue = pengCards[j];
                    var pengList = [cardValue, cardValue, cardValue];
                    this.cardShowUI.pushCPG(pos, ACT_act.Act_Peng, pengList);
                }
            }
            //杠牌
            var gangCards = seatInfo.gangCards;
            if (gangCards != null) {
                var gangCardLen = gangCards.length;
                for (var j = 0; j < gangCardLen; j++) {
                    var cardValue = gangCards[j];
                    var gangList = [cardValue, cardValue, cardValue, cardValue];
                    this.cardShowUI.pushCPG(pos, ACT_act.Act_Gang, gangList);
                }
            }
            //暗杠
            var anGangCards = seatInfo.anGangCards;
            if (anGangCards != null) {
                var anGangCardLen = anGangCards.length;
                for (var j = 0; j < anGangCardLen; j++) {
                    var cardValue = anGangCards[j];
                    var anGangList = [cardValue, cardValue, cardValue, cardValue];
                    this.cardShowUI.pushCPG(pos, ACT_act.Act_AnGang, anGangList);
                }
            }
            //出牌
            var playOutCards = seatInfo.playOutCards;
            if (playOutCards != null) {
                var outCardLen = playOutCards.length;
                for (j = 0; j < outCardLen; j++) {
                    this.cardShowUI.addCard2Out(pos, playOutCards[j]);
                }
            }
            //手牌
            var handCards = seatInfo.handCards;
            if (handCards != null) {
                var handCardLen = handCards.length;
                for (var j = 0; j < handCardLen; j++) {
                    var cardValue = handCards[j];
                    this.cardShowUI.pushHandCard(cardValue, pos);
                }
                if (handCardLen % 3 == 2) {
                    lastpos = pos;
                    if (pos == UserPosition.Down) {
                        var findValue = this.cardShowUI.findAndRmHandCard(seatInfo.last_card);
                        this.cardShowUI.takeCard(pos, findValue);
                    }
                    else {
                        this.cardShowUI.removeHandCardByList(pos, [seatInfo.last_card]);
                        this.cardShowUI.takeCard(pos, seatInfo.last_card);
                    }
                }
            }
            this.cardShowUI.showHandCard(pos);
        }
        //设置庄家
        // this.zhuangPos = this.cardLogic.changeSeat(bankerSeat);
        // this.zhuangSeat = bankerSeat;
        var actList = this.cardLogic.anylzyeActState(curCanDoAct);
        var actType = 0;
        if (lastpos == UserPosition.Down) {
            this.cardShowUI.noticeOutCard();
            actType = 1;
            this.actShowUI.showSelectAct(actList, this.cardShowUI.getHandleCard(UserPosition.Down), json.pre_op_card, this.cardShowUI.CPGList[UserPosition.Down], actType);
        }
        else {
            this.actShowUI.showSelectAct(actList, this.cardShowUI.getHandleCard(UserPosition.Down), json.pre_op_card, this.cardShowUI.CPGList[UserPosition.Down], actType);
        }
        this.discShowUI.showLight(lastpos);
        this.discShowUI.startOutTimer();
        // this.showZhuangFlag(this.zhuangPos);
        //显示圆盘
        this.showDisc();
        //隐藏当前出牌指示
        // this.outFlag.hide();
    };
    //保存游戏位置信息中的用户id等数据 (由于进入房间之前，就已经传递了用户信息，这里重复传送不保存)
    GameScene.prototype.saveGameSeatInfo = function (gameSeatInfo) {
        var len = gameSeatInfo.length;
        for (var i = 0; i < len; i++) {
            var seatInfo = ProtocolData.GameSeatInfo;
            seatInfo = gameSeatInfo[i];
            var userVo = App.DataCenter.UserInfo.getUser(seatInfo.userID);
            if (userVo == null) {
                userVo = new UserVO();
                userVo.userID = seatInfo.userID;
                App.DataCenter.UserInfo.addUser(userVo);
            }
            userVo.seatID = seatInfo.seatID;
            userVo.state = seatInfo.status;
            userVo.point = seatInfo.point;
        }
    };
    /***接收新换的牌*/
    GameScene.prototype.revSwapCard = function (data) {
        console.log("新换得的牌:", json);
        var json = ProtocolData.Rev100822;
        json = data;
    };
    /** 广播杠立刻结算*/
    GameScene.prototype.revGangResult = function (data) {
        var json = ProtocolData.Rev180_61_0;
        json = data;
    };
    /***游戏结束***/
    GameScene.prototype.revGameOver = function (data) {
        console.log("游戏结束");
        ProtocolData.Rev180_58_0 = data;
        var json = ProtocolData.Rev180_58_0;
    };
    /***玩家请求操作(出,吃、碰、杠、胡等) */
    GameScene.prototype.sendAct = function (act, cardList) {
        if (cardList === void 0) { cardList = null; }
        this.ctrl.sendAct(act, cardList);
    };
    /******************************************************************************
     ****************************牌逻辑结束****************************************/
    /**
     * 匹配场loading 设置
     */
    GameScene.prototype.setMatchLoading = function () {
        if (App.DataCenter.roomInfo.roomType != RoomType.MatchRoom) {
            return;
        }
        var len = App.DataCenter.UserInfo.getUserNum();
        if (len >= 4) {
            this.matchLoadingUI.stopMatching();
        }
        else {
            this.matchLoadingUI.startMatching();
        }
    };
    /***显示换牌**/
    GameScene.prototype.showSwapCard = function () {
        if (App.DataCenter.debugInfo.isDebug || App.DataCenter.secret) {
            this.swapCardUI || (this.swapCardUI = new SwapCardUI());
            this.swapCardUI.init(this);
        }
    };
    /**发送退出游戏*/
    GameScene.prototype.quitToHall = function () {
        // this.ctrl.onQuitGame();
    };
    /***加载资源**/
    GameScene.prototype.loadAsset = function () {
        //加载游戏其他资源
        App.ResUtils.loadGroupQuiet(AssetConst.Game, 5); //游戏
        App.ResUtils.loadGroupQuiet(AssetConst.Result, 4); //结算
        //加载打牌语音
        if (App.SoundManager.allowPlayEffect) {
            if (App.SoundManager.isGuangDongSpeak) {
                App.ResUtils.loadGroupQuiet(AssetConst.Sound_GuangDong);
            }
            else {
                App.ResUtils.loadGroupQuiet(AssetConst.Sound_PuTong);
            }
            App.ResUtils.loadGroupQuiet(AssetConst.Sound_Other);
        }
        //加载背景音乐
        if (App.SoundManager.allowPlayBGM) {
            App.ResUtils.loadGroupQuiet(AssetConst.Sound_BGM, 2);
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
    };
    /**加载资源完成**/
    GameScene.prototype.onGroupComplete = function (event) {
        if (event.groupName == AssetConst.Sound_BGM) {
            App.SoundManager.playBGM(SoundManager.bgm);
        }
        else if (event.groupName == AssetConst.Card) {
            this.showSwapCard();
        }
    };
    //********************************************************************/
    GameScene.prototype.resetScene = function () {
        this.hideTuoGuan();
        this.hideDisc();
        this.hideFriendInfo();
        this.hideLeftCard();
        this.hideMatchLoading();
        this.hideAllReady();
    };
    GameScene.prototype.resetGame = function () {
    };
    GameScene.prototype.hideDisc = function () {
        this.discShowUI.hide();
    };
    GameScene.prototype.showDisc = function () {
        this.discShowUI.show();
    };
    GameScene.prototype.hideLeftCard = function () {
        this.leftCardUI.hide();
    };
    GameScene.prototype.showLeftCard = function () {
        this.leftCardUI.show();
    };
    GameScene.prototype.hideFriendInfo = function () {
        this.froomInfoShowUI.hide();
    };
    GameScene.prototype.showFriendInfo = function () {
        this.froomInfoShowUI.show();
    };
    GameScene.prototype.hideMatchLoading = function () {
        this.matchLoadingUI.hideMatching();
    };
    GameScene.prototype.showMatchLoading = function () {
        this.matchLoadingUI.showMatching();
    };
    GameScene.prototype.hideTuoGuan = function () {
        this.tuoguanShowUI.hideTuoGuan();
    };
    GameScene.prototype.showTuoGuan = function () {
        this.tuoguanShowUI.showTuoGuan();
    };
    GameScene.prototype.showReady = function (pos) {
        this.headShowUI.showReady(pos);
    };
    GameScene.prototype.hideReady = function (pos) {
        this.headShowUI.hideReady(pos);
    };
    /**************************************************************** */
    GameScene.prototype.userJoin = function (user) {
        //匹配房显示loading     
        this.setMatchLoading();
        this.updateHeadUI(user);
    };
    /***更新所有头像 */
    GameScene.prototype.updateAllHeadUI = function () {
        var userList = App.DataCenter.UserInfo.userList;
        for (var key in userList) {
            var user = userList[key];
            user.checkState;
            user.userPos = this.cardLogic.changeSeat(user.seatID);
            this.headShowUI.updateUserHead(user.userPos, user.seatID, user.userID, user.headUrl, user.nickName, user.point);
        }
    };
    /****更新头像 */
    GameScene.prototype.updateHeadUI = function (user) {
        user.userPos = this.cardLogic.changeSeat(user.seatID);
        this.headShowUI.updateUserHead(user.userPos, user.seatID, user.userID, user.headUrl, user.nickName, user.point);
    };
    /**设置已进入房间玩家准备状态**/
    GameScene.prototype.setAllUserReady = function () {
        var userList = App.DataCenter.UserInfo.userList;
        for (var key in userList) {
            var userVo = userList[key];
            if (userVo.checkState(PLAYER_STATE.READY)) {
                this.showReady(userVo.userPos);
            }
            else {
                this.hideReady(userVo.userPos);
            }
        }
    };
    GameScene.prototype.hideHeadUI = function (pos) {
        this.headShowUI.hideHeadUI(pos);
    };
    GameScene.prototype.hideAllReady = function () {
        this.headShowUI.hideAllReady();
    };
    GameScene.prototype.resetUserUI = function (pos) {
        this.hideHeadUI(pos);
        this.hideReady(pos);
    };
    ///////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    /**开始自动准备倒计时***/
    GameScene.prototype.startReadyTimer = function (time) {
        this.autoReadyTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onAutoReadyTime, this);
        this.autoReadyTimer.repeatCount = time;
        this.autoReadyTimer.reset();
        this.autoReadyTimer.start();
    };
    /**停止自动准备倒计时***/
    GameScene.prototype.stopReadyTimer = function () {
        this.autoReadyTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onAutoReadyTime, this);
        this.autoReadyTimer.stop();
    };
    /***计时结束自动准备***/
    GameScene.prototype.onAutoReadyTime = function () {
        this.stopReadyTimer();
        this.autoReady();
    };
    /***自动准备***/
    GameScene.prototype.autoReady = function () {
        this.sendReady();
    };
    /***发送准备***/
    GameScene.prototype.sendReady = function () {
        this.ctrl.sendReady();
    };
    /////////////////////////////////////////////////////////////////////////////////
    /**设置房间信息 */
    GameScene.prototype.setRoomInfo = function () {
        var roomInfo = App.DataCenter.roomInfo;
        var deskInfo = App.DataCenter.deskInfo;
        if (roomInfo.roomType == RoomType.FriendRoom) {
            this.froomInfoShowUI.setDeskNo(deskInfo.deskID);
            this.froomInfoShowUI.show();
            this.topTitleShowUI.setDeskNum(deskInfo.deskID);
            this.topTitleShowUI.showFriendTitle();
        }
        else {
            this.topTitleShowUI.showMatchTitle();
        }
    };
    /**设置底部菜单 */
    GameScene.prototype.setBottomMenu = function () {
        var _this = this;
        var bSkin = (App.DataCenter.roomInfo.roomType == RoomType.FriendRoom);
        var bottomMenus;
        if (bSkin) {
            bottomMenus = App.BottomMenuManager.getBoxB();
        }
        else {
            bottomMenus = App.BottomMenuManager.getBoxC();
        }
        bottomMenus.showMenu(this);
        bottomMenus.ok = function (bottomName) {
            _this.onMenusTouch(bottomName);
        };
    };
    /**点击底部菜单栏*/
    GameScene.prototype.onMenusTouch = function (bottomName) {
        switch (bottomName) {
            case BottomName.mall:
                //this.ctrl.sendShopListReq(1);
                break;
            case BottomName.knapsack:
                //this.ctrl.getBackpack();
                break;
            case BottomName.set:
                App.PanelManager.open(PanelConst.SetPanel, null, this, true, true, null, true);
                break;
            case BottomName.record:
                //this.ctrl.send101004();
                break;
            case BottomName.tc:
                this.ctrl.SendTCRoom();
                break;
            case BottomName.talk:
                App.PanelManager.open(PanelConst.TapePanel);
                break;
            case BottomName.take:
                App.PanelManager.open(PanelConst.RulePanel, null, this, true, true, null, true);
                break;
            default:
                break;
        }
    };
    return GameScene;
}(BaseScene));
__reflect(GameScene.prototype, "GameScene");
