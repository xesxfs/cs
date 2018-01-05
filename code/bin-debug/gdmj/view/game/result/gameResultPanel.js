/**
 * 2017-3-8
 * author:xiongjian
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameResultPanel = (function (_super) {
    __extends(GameResultPanel, _super);
    function GameResultPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "gameResultSkin";
        return _this;
    }
    GameResultPanel.prototype.childrenCreated = function () {
    };
    GameResultPanel.prototype.onEnable = function () {
        // this.setCenter();
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.changDeskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
        this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);
        this.chakanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChakan, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.xujuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xujuTouch, this);
        this.jixuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jixuTouch, this);
        //隐藏总结算list
        this.zongScroller.visible = false;
        this.resultScoller.visible = true;
        // console.log("type" + App.DataCenter.roomInfo.roomType);
        //好友房跟匹配房显示不同按钮
        if (App.DataCenter.roomInfo.roomType == RoomType.MatchRoom) {
            this.matchGroup.visible = true;
            this.friendGroup.visible = false;
        }
        else if (App.DataCenter.roomInfo.roomType == RoomType.FriendRoom) {
            this.matchGroup.visible = false;
            this.friendGroup.visible = true;
        }
    };
    GameResultPanel.prototype.onRemove = function () {
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.changDeskBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
        this.continueBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);
        this.chakanBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChakan, this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.xujuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xujuTouch, this);
        this.jixuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.jixuTouch, this);
        this.mResultData = null;
    };
    //更新结算数据
    GameResultPanel.prototype.updateInfo = function (data) {
        var json = ProtocolData.Rev180_58_0;
        json = data;
        //隐藏总结算list
        this.zongScroller.visible = false;
        this.resultScoller.visible = true;
        this.curPlayCount = json.curPlayCount;
        this.maxPlayCount = json.maxPlayCount;
        //显示不同按钮
        if (json.curPlayCount < json.maxPlayCount) {
            this.xujuBtn.visible = false;
            this.jixuBtn.visible = true;
            this.chakanBtn.visible = false;
        }
        else if (json.curPlayCount == json.maxPlayCount) {
            this.xujuBtn.visible = false;
            this.jixuBtn.visible = false;
            this.chakanBtn.visible = true;
        }
        var len = json.resultList.length;
        var resultList = json.resultList;
        var isQiShouHU = json.isQiShouHu; //是否是起手胡
        var zhongNiaoList = json.zhongNiaolist; //中鸟列表
        var dice = json.dice; //骰子
        var niaoPai = json.niaoPai; //鸟牌
        var zhuangSeat = json.zhuangSeat; //庄桌位号
        var huSeatList = json.huSeatList; //胡牌人桌位号
        // console.log("鸟牌"+niaoPai);
        var ac = new eui.ArrayCollection();
        var arr = [];
        for (var i = 0; i < len; i++) {
            //获取用户信息
            var userVo = App.DataCenter.UserInfo.getUserBySeatID(resultList[i].seatID);
            var dataObj = new Object();
            var handCards = [];
            var gangCardsX = [];
            var result = resultList[i];
            var uSeat = resultList[i].seatID;
            if (userVo && userVo != undefined) {
                if (uSeat == zhuangSeat) {
                    dataObj["name"] = StringTool.formatNickName("" + userVo.nickName) + "   庄";
                }
                else {
                    dataObj["name"] = StringTool.formatNickName("" + userVo.nickName);
                }
                dataObj["headUrl"] = "" + userVo.headUrl;
            }
            dataObj["point"] = result.curPiont;
            dataObj["niao"] = [];
            // dataObj["zhongniao"]= resultList[i];
            var type = "";
            if (result.is_dian_pao) {
                type = "点炮";
            }
            else if (result.is_liu_ju) {
                type = "流局";
            }
            else if (result.is_zhuo_pao) {
                type = "捉炮";
            }
            else if (result.is_zi_mo) {
                type = "自摸";
            }
            dataObj["type"] = type;
            //所有暗杠牌
            if (result.anGangCards) {
                for (var j = 0; j < result.anGangCards.length; j++) {
                    // for (let h = 0; h < 4; h++) {
                    //     handCards.push(result.anGangCards[j]);
                    // }
                    gangCardsX.push(result.anGangCards[j]);
                }
            }
            //所有杠牌
            if (result.gangCards) {
                for (var j = 0; j < result.gangCards.length; j++) {
                    if (result.gangCards.length > 0) {
                        // for (let h = 0; h < 4; h++) {
                        //     handCards.push(result.gangCards[j]);
                        // }
                        gangCardsX.push(result.gangCards[j]);
                    }
                }
            }
            //碰牌
            if (result.pengCards) {
                for (var j = 0; j < result.pengCards.length; j++) {
                    if (result.pengCards.length > 0) {
                        for (var h = 0; h < 3; h++) {
                            handCards.push(result.pengCards[j]);
                        }
                    }
                }
            }
            //所有吃牌
            if (result.chiCards) {
                for (var j = 0; j < result.chiCards.length; j++) {
                    if (result.chiCards.length > 0) {
                        handCards.push(result.chiCards[j]);
                    }
                }
            }
            //所有手牌
            if (result.cards) {
                for (var j = 0; j < result.cards.length; j++) {
                    handCards.push(result.cards[j]);
                }
            }
            //胡牌
            // if (result.huCard) {
            //     if (result.huCard != 0) {
            //         handCards.push(result.huCard);
            //     }
            // }
            //中鸟数据
            if (isQiShouHU) {
                dataObj["qiShouHu"] = true;
                for (var i_1 = 0; i_1 < huSeatList.length; i_1++) {
                    for (var key in dice) {
                        var seat = (dice[key] - 1) % 4;
                        var pos = (seat + huSeatList[i_1]) % 4; //庄家位置加中鸟位置 对4取余,ttt是不是反了？
                        // console.log("最终" + pos);
                        if (uSeat == pos) {
                            dataObj["niao"].push(dice[key]);
                        }
                    }
                }
            }
            else {
                dataObj["qiShouHu"] = false;
                for (var key in niaoPai) {
                    var seat = (niaoPai[key] % 16 - 1) % 4;
                    var pos = (seat + zhuangSeat) % 4; //胡牌人位置加中鸟位置 对4取余
                    // console.log("最终" + pos);
                    if (uSeat == pos) {
                        dataObj["niao"].push(niaoPai[key]);
                    }
                }
            }
            ArrayTool.sortArr(handCards);
            dataObj["gangCards"] = gangCardsX;
            dataObj["handCards"] = handCards;
            dataObj["huType"] = result.huType;
            arr.push(dataObj);
            if (userVo.userID == App.DataCenter.UserInfo.getMyUserVo().userID) {
                this.mResultData = dataObj;
            }
        }
        ac.source = arr;
        this.resultList.dataProvider = ac;
        this.resultList.itemRenderer = GameResultItem;
    };
    /**
     * 更新总list数据
     */
    GameResultPanel.prototype.updateZongList = function () {
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
        this.zongList.dataProvider = ac;
        this.zongList.itemRenderer = gameResult2Item;
    };
    GameResultPanel.prototype.setData = function () {
        var ac = new eui.ArrayCollection();
        var arr = [];
        ac.source = [[], [], [], []];
        this.resultList.dataProvider = ac;
        this.resultList.itemRenderer = GameResultItem;
    };
    /**换桌 */
    GameResultPanel.prototype.onChangeDesk = function () {
        var gameCtrl = App.getController(GameController.NAME);
        // gameCtrl.sendChangeDesk();
        var gamescene = App.SceneManager.getScene(SceneConst.GameScene);
        var gameCtrl = App.getController(GameController.NAME);
        gamescene.resetHeadUI();
        gamescene.hideDisc();
        // gamescene.readyBtn.visible = true;
        gamescene.resetGame();
        this.hide();
    };
    /**继续 */
    GameResultPanel.prototype.onContinue = function () {
        // var gameCtrl: GameController = App.getController(GameController.NAME);
        // gameCtrl.sendReady();
        // this.hide();
        if (App.DataCenter.roomInfo.roomType == RoomType.MatchRoom) {
            var game = App.SceneManager.getScene(SceneConst.GameScene);
            game.readyBtn.visible = true;
            game.resetGame();
            game.resetHeadUI();
            game.hideDisc();
            this.hide();
            var gameCtrl = App.getController(GameController.NAME);
        }
        else {
            var game = App.SceneManager.getScene(SceneConst.GameScene);
            game.readyBtn.visible = true;
            this.hide();
        }
    };
    /**
     * 分享
     */
    GameResultPanel.prototype.onShare = function () {
        if (this.resultScoller.visible) {
            App.PanelManager.open(PanelConst.ShareResultPanel, null, null, true, true, this.mResultData);
        }
        else {
            App.PanelManager.open(PanelConst.ShareRecordPanel);
        }
    };
    /**
     * 查看总战绩
     */
    GameResultPanel.prototype.onChakan = function () {
        var gamescene = App.SceneManager.getScene(SceneConst.GameScene);
        this.chakanBtn.visible = false;
        // if (gamescene.isDeskOwner()) {
        //     this.xujuBtn.visible = true;
        // } else {
        //     this.xujuBtn.visible = false;
        //     this.jixuBtn.visible = true;
        // }
        this.resultScoller.visible = false;
        this.zongScroller.visible = true;
        this.updateZongList();
    };
    //续局
    GameResultPanel.prototype.xujuTouch = function () {
        var gamescene = App.SceneManager.getScene(SceneConst.GameScene);
        gamescene.resetGame();
        gamescene.hideBtnGroup();
        gamescene.readyBtn.visible = true;
        gamescene.resetHeadUI();
        gamescene.hideDisc();
        gamescene.friendRoomGroup.visible = true;
        this.hide();
    };
    //继续
    GameResultPanel.prototype.jixuTouch = function () {
        if (App.DataCenter.roomInfo.roomType == RoomType.MatchRoom) {
            var gamescene = App.SceneManager.getScene(SceneConst.GameScene);
            var gameCtrl = App.getController(GameController.NAME);
            gamescene.resetHeadUI();
            gamescene.hideDisc();
            gamescene.hideBtnGroup();
            // gameCtrl.sendReady();
            this.hide();
        }
        else {
            var gameCtrl = App.getController(GameController.NAME);
            var gamescene = App.SceneManager.getScene(SceneConst.GameScene);
            if (this.curPlayCount == this.maxPlayCount) {
                gamescene.resetGame();
                gamescene.hideBtnGroup();
                gamescene.resetHeadUI();
                gamescene.hideDisc();
                gamescene.friendRoomGroup.visible = true;
                gamescene.readyBtn.visible = true;
            }
            else {
                // gameCtrl.sendReady();
                gamescene.hideBtnGroup();
            }
            this.hide();
        }
    };
    /**返回 */
    GameResultPanel.prototype.back = function () {
        if (App.DataCenter.roomInfo.roomType == RoomType.MatchRoom) {
            var game = App.SceneManager.getScene(SceneConst.GameScene);
            game.readyBtn.visible = true;
            game.resetGame();
            game.resetHeadUI();
            game.hideDisc();
            this.hide();
        }
        else {
            var game = App.SceneManager.getScene(SceneConst.GameScene);
            game.readyBtn.visible = true;
            this.hide();
        }
    };
    return GameResultPanel;
}(BasePanel));
__reflect(GameResultPanel.prototype, "GameResultPanel");
