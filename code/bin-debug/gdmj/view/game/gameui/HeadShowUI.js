var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var XX;
(function (XX) {
    var HeadShowUI = (function (_super) {
        __extends(HeadShowUI, _super);
        function HeadShowUI() {
            var _this = _super.call(this) || this;
            _this.bMove = false;
            _this.readyList1 = [];
            _this.readyList2 = [];
            return _this;
        }
        HeadShowUI.prototype.childrenCreated = function () {
            this.init();
            this.hideAllReady();
            /**删除*/
            this.headGroup1.parent && this.headGroup1.parent.removeChild(this.headGroup1);
        };
        HeadShowUI.prototype.init = function () {
            this.headList = [];
            this.originList = [];
            this.toList = [];
            var len = this.headGroup.numChildren;
            for (var i = 0; i < len; i++) {
                var orginObj = this.headGroup.getChildAt(i);
                this.headList.push(orginObj);
                var toObj = this.headGroup1.getChildAt(i);
                this.originList.push(new egret.Point(orginObj.x, orginObj.y));
                this.toList.push(new egret.Point(toObj.x, toObj.y));
            }
            for (var i = 0; i < 4; i++) {
                this.readyList1.push(this.readyGroup.getChildAt(i));
                this.readyList2.push(this.readyGroup.getChildAt(i + 4));
            }
        };
        /** 设置更新头像信息*/
        HeadShowUI.prototype.updateUserHead = function (pos, seatID, userID, headUrl, nickName, score) {
            var headUI = this.headList[pos];
            headUI.seatID = seatID;
            headUI.userID = userID;
            headUI.loadImg(headUrl);
            headUI.nameLabel.text = nickName;
            headUI.scoreLabel.visible = true; //显示积分
            headUI.sidai.visible = true; //显示丝带
            this.updateScore(pos, score);
        };
        /**更新积分 */
        HeadShowUI.prototype.updateScore = function (pos, score) {
            this.headList[pos].scoreLabel.text = score.toString();
        };
        /**显示托管*/
        HeadShowUI.prototype.showTuoGuan = function (pos) {
            this.headList[pos].showTuoGuanIcon();
        };
        /**隐藏托管*/
        HeadShowUI.prototype.hideTuoGuan = function (pos) {
            this.headList[pos].hideTuoGuanIcon();
        };
        /**显示掉线*/
        HeadShowUI.prototype.showUnConnect = function (pos) {
            this.headList[pos].showUnconnect();
        };
        /**隐藏掉线*/
        HeadShowUI.prototype.hideUnconect = function (pos) {
            this.headList[pos].hideUnconnect();
        };
        /**隐藏玩家头像*/
        HeadShowUI.prototype.hideHeadUI = function (pos) {
            var headUI = this.headList[pos];
            headUI && headUI.clear();
        };
        /**清理所有玩家头像UI*/
        HeadShowUI.prototype.hideAllHeadUI = function () {
            var len = this.headList.length;
            var headUI;
            for (var i = 0; i < len; i++) {
                headUI = this.headList[i];
                headUI.clear();
            }
        };
        /**移动 */
        HeadShowUI.prototype.moveTo = function (delay) {
            if (delay === void 0) { delay = 500; }
            this.bMove = true;
            for (var i = 0; i < this.headList.length; i++) {
                this.headMove(this.headList[i], this.toList[i], false, delay);
            }
        };
        /**回位 */
        HeadShowUI.prototype.resetMove = function () {
            this.bMove = false;
            for (var i = 0; i < this.headList.length; i++) {
                this.headMove(this.headList[i], this.originList[i], true, 0);
            }
        };
        HeadShowUI.prototype.headMove = function (headUI, toPoint, visible, time) {
            egret.Tween.removeTweens(headUI);
            egret.Tween.get(headUI).to({ x: toPoint.x, y: toPoint.y }, time).call(function () {
                headUI.nameLabel.visible = visible; //隐藏昵称
            });
        };
        /**显示准备图标*/
        HeadShowUI.prototype.showReady = function (pos) {
            //最初状态准备按钮
            if (!this.bMove) {
                this.readyList = this.readyList1;
                this.readyGroup.addChild(this.readyList[pos]);
            }
            else {
                this.readyList = this.readyList2;
                this.readyGroup.addChild(this.readyList[pos]);
            }
        };
        /***隐藏准备图标*/
        HeadShowUI.prototype.hideReady = function (pos) {
            //最初状态准备按钮
            if (!this.bMove) {
                this.readyList = this.readyList1;
                var ready = this.readyList[pos];
                ready && ready.parent && ready.parent.removeChild(ready);
            }
            else {
                this.readyList = this.readyList2;
                var ready = this.readyList[pos];
                ready && ready.parent && ready.parent.removeChild(ready);
            }
        };
        /***重置准备*/
        HeadShowUI.prototype.resetReady = function () {
            this.hideAllReady();
        };
        /***隐藏所有准备图标*/
        HeadShowUI.prototype.hideAllReady = function () {
            this.readyGroup.removeChildren();
        };
        return HeadShowUI;
    }(eui.Component));
    XX.HeadShowUI = HeadShowUI;
    __reflect(HeadShowUI.prototype, "XX.HeadShowUI");
})(XX || (XX = {}));
