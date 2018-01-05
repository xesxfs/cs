var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 分享结算战绩
 * @author huanglong
 * @date 2017/05/10
 */
var ShareResultPanel = (function (_super) {
    __extends(ShareResultPanel, _super);
    function ShareResultPanel() {
        var _this = _super.call(this) || this;
        _this.beginX = 87;
        _this.skinName = "ShareResultPanelSkin";
        return _this;
    }
    ShareResultPanel.prototype.onEnable = function () {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.initUI();
    };
    ShareResultPanel.prototype.onRemove = function () {
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.pengjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.recData = null;
    };
    ShareResultPanel.prototype.initUI = function () {
        this.headImg.mask = this.headMaskImg;
        var iData = this.recData;
        if (!iData) {
            TipsLog.gameInfo("分享数据有误");
            return;
        }
        console.log("+++++++++++++", iData);
        this.headImg.source = iData.headUrl;
        var point = parseInt(iData.point);
        if (point > 0) {
            this.scoreFont.font = "win_fnt";
            this.scoreFont.text = "+" + iData.point;
        }
        else {
            this.scoreFont.font = "lose_fnt";
            this.scoreFont.text = "" + iData.point;
        }
        var ImgStr = "";
        if (iData.type == "流局") {
            ImgStr = "share_result_liuju_png";
        }
        else if (iData.type == "捉炮" || iData.type == "自摸") {
            ImgStr = "share_result_ying_png";
        }
        else {
            ImgStr = "share_result_shu_png";
        }
        this.titleImg.texture = RES.getRes(ImgStr);
        this.nameLabel.text = StringTool.formatNickName("" + iData.name);
        var qiShouHu = iData.qiShouHu;
        var niao = iData.niao;
        if (niao.length > 0) {
            this.zhongniaopaiGroup.visible = true;
            if (qiShouHu) {
                this.setDiceList(niao);
            }
            else {
                this.setNiaoList(niao);
            }
        }
        else {
            this.zhongniaopaiGroup.visible = false;
        }
        this.typeLabel.text = iData.type;
        var huType = iData.huType;
        if (huType) {
            var text = "";
            for (var i = 0; i < huType.length; i++) {
                text = text + "" + App.DataCenter.GameInfo.csHuTypeList[huType[i]] + "  ";
            }
            this.huTypeLabel.text = text;
        }
        else {
            this.huTypeLabel.visible = false;
        }
        var ganglist = iData.gangCards;
        var cardList = iData.handCards;
        var cardX = this.setGangList(ganglist);
        this.setCardList(cardList, cardX);
    };
    ShareResultPanel.prototype.onTouchShare = function (e) {
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
    ShareResultPanel.prototype.shareTo = function (shareType) {
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this, new egret.Rectangle(0, 270, 750, 700));
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
    ShareResultPanel.prototype.back = function () {
        this.hide();
    };
    //杠牌
    ShareResultPanel.prototype.setGangList = function (ganglist) {
        var len = ganglist.length;
        var cardX = 0;
        var card;
        var cardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < 4; j++) {
                if (j == 3) {
                    card = cardFactory.getOutCard(ganglist[i], UserPosition.Down);
                    card.x = this.beginX + 36 * (i * 3 + 1);
                    card.y = -8;
                    card.scaleX = 0.70;
                    card.scaleY = 0.70;
                    this.hupaiGroup.addChild(card);
                }
                else {
                    card = cardFactory.getOutCard(ganglist[i], UserPosition.Down);
                    card.x = this.beginX + 36 * (i * 3 + j);
                    card.y = 5;
                    card.scaleX = 0.70;
                    card.scaleY = 0.70;
                    this.hupaiGroup.addChild(card);
                    cardX = card.x + 36;
                }
            }
        }
        return cardX;
    };
    //胡牌
    ShareResultPanel.prototype.setCardList = function (cardList, cardX) {
        var len = cardList.length;
        var card;
        var cardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(cardList[i], UserPosition.Down);
            if (cardX < this.beginX) {
                cardX = this.beginX;
            }
            card.x = cardX + 36 * i;
            card.y = 8;
            card.scaleX = 0.70;
            card.scaleY = 0.70;
            this.hupaiGroup.addChild(card);
        }
    };
    //骰子鸟
    ShareResultPanel.prototype.setDiceList = function (niaoList) {
        var len = niaoList.length;
        for (var i = 0; i < len; i++) {
            var niao = new eui.Image();
            niao.source = RES.getRes("s" + niaoList[i] + "_png");
            console.log("niao" + niao.source);
            niao.x = 10 + 70 * i;
            niao.y = 0;
            niao.scaleX = 1;
            niao.scaleY = 1;
            this.zhongniaopaiGroup.addChild(niao);
        }
    };
    //牌鸟
    ShareResultPanel.prototype.setNiaoList = function (niaoList) {
        var len = niaoList.length;
        var card;
        var cardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(niaoList[i], UserPosition.Down);
            card.x = 10 + 36 * i;
            card.y = -5;
            card.scaleX = 0.6;
            card.scaleY = 0.6;
            this.zhongniaopaiGroup.addChild(card);
        }
    };
    return ShareResultPanel;
}(BasePanel));
__reflect(ShareResultPanel.prototype, "ShareResultPanel");
