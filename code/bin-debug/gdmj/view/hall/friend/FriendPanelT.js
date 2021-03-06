var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *	好友房列表界面
 * @author huanglong
 *	2017/3/23
 */
var FriendPanel = (function (_super) {
    __extends(FriendPanel, _super);
    function FriendPanel() {
        var _this = _super.call(this) || this;
        /**图片宽度 */
        _this.scrolImgWidth = 671;
        _this.skinName = "FriendPanelTSkin";
        //关闭scroller的松手滑动
        _this.joinRoomScroller.throwSpeed = 0;
        return _this;
    }
    FriendPanel.prototype.onEnable = function () {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoin, this);
        this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCreate, this);
        this.radioBtnA.group.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_START, this.changeStart, this);
        this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_END, this.changeEnd, this);
        this.setUI();
        this.autoScroll();
    };
    FriendPanel.prototype.onRemove = function () {
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.joinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoin, this);
        this.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCreate, this);
        this.radioBtnA.group.removeEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_START, this.changeStart, this);
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_END, this.changeEnd, this);
    };
    /**初始化界面 */
    FriendPanel.prototype.setUI = function () {
        this.joinRoomScroller.viewport.scrollH = 0;
        this.radioBtnA.selected = true;
    };
    FriendPanel.prototype.changeStart = function () {
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_START, this.changeStart, this);
        this.scrollStartTime = egret.getTimer();
        this.scrollStartH = this.joinRoomScroller.viewport.scrollH;
    };
    FriendPanel.prototype.changeEnd = function () {
        this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_START, this.changeStart, this);
        this.scrollEndTime = egret.getTimer();
        this.scrollEndH = this.joinRoomScroller.viewport.scrollH;
        this.judgeScroll();
    };
    FriendPanel.prototype.judgeScroll = function () {
        var targetH = 0;
        var distanceH = this.scrollEndH - this.scrollStartH;
        var expectH = distanceH / (this.scrollEndTime - this.scrollStartTime) * 1000;
        if (Math.abs(distanceH) >= this.scrolImgWidth / 2) {
            if (distanceH > 0) {
                targetH = this.scrollStartH + this.scrolImgWidth;
            }
            else {
                targetH = this.scrollStartH - this.scrolImgWidth;
            }
        }
        else if (Math.abs(expectH) >= this.scrolImgWidth / 2) {
            if (expectH > 0) {
                targetH = this.scrollStartH + this.scrolImgWidth;
            }
            else {
                targetH = this.scrollStartH - this.scrolImgWidth;
            }
        }
        else {
            targetH = this.scrollStartH;
        }
        this.scrollToTarget(targetH, true);
    };
    FriendPanel.prototype.scrollToTarget = function (targetScrollH, move) {
        var _this = this;
        if (targetScrollH === void 0) { targetScrollH = 0; }
        if (move === void 0) { move = false; }
        //判断H的值是否合理
        if (targetScrollH != 0 && targetScrollH != this.scrolImgWidth && targetScrollH != this.scrolImgWidth * 2 && targetScrollH != this.scrolImgWidth * 3) {
            targetScrollH = 0;
        }
        egret.Tween.removeTweens(this.joinRoomScroller.viewport);
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_START, this.changeStart, this);
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_END, this.changeEnd, this);
        this.radioBtnA.group.removeEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        var needTime = Math.abs(targetScrollH - this.joinRoomScroller.viewport.scrollH) * 300 / this.scrolImgWidth;
        egret.Tween.get(this.joinRoomScroller.viewport)
            .to({ scrollH: targetScrollH }, needTime)
            .call(function () {
            if (targetScrollH == _this.scrolImgWidth * 3) {
                _this.setUI();
            }
            _this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_START, _this.changeStart, _this);
            _this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_END, _this.changeEnd, _this);
            _this.radioBtnA.group.addEventListener(eui.UIEvent.CHANGE, _this.onChange, _this);
            _this.autoScroll();
            if (move) {
                _this.changeRadio();
            }
        }, this);
    };
    /**定时滑动 */
    FriendPanel.prototype.autoScroll = function () {
        var _this = this;
        egret.Tween.get(this.joinRoomScroller.viewport)
            .wait(3000)
            .call(function () {
            var targetH = _this.joinRoomScroller.viewport.scrollH + _this.scrolImgWidth;
            _this.scrollToTarget(targetH, true);
        }, this);
    };
    /**滑动后刷新小圆点显示 */
    FriendPanel.prototype.changeRadio = function () {
        switch (this.joinRoomScroller.viewport.scrollH) {
            case 0:
                this.radioBtnA.selected = true;
                break;
            case this.scrolImgWidth:
                this.radioBtnB.selected = true;
                break;
            case this.scrolImgWidth * 2:
                this.radioBtnC.selected = true;
                break;
            default:
                break;
        }
    };
    /**小圆点选中改变 */
    FriendPanel.prototype.onChange = function () {
        var targetH = 0;
        switch (Number(this.radioBtnA.group.selectedValue)) {
            case 0:
                targetH = 0;
                break;
            case 1:
                targetH = this.scrolImgWidth;
                break;
            case 2:
                targetH = this.scrolImgWidth * 2;
                break;
            default:
                break;
        }
        this.scrollToTarget(targetH);
    };
    /**加入房间 */
    FriendPanel.prototype.onJoin = function () {
        App.PanelManager.open(PanelConst.JoinNumber);
    };
    /**创建房间 */
    FriendPanel.prototype.onCreate = function () {
        var json = ProtocolData.Send101000;
        json.desk_name = App.DataCenter.UserInfo.getMyUserVo().nickName;
        json.deviceID = "111";
        json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        App.gameSocket.send(ProtocolHead.Send101000, json);
    };
    /**返回 */
    FriendPanel.prototype.back = function () {
        egret.Tween.removeTweens(this.joinRoomScroller.viewport);
        this.hide();
    };
    return FriendPanel;
}(BasePanel));
__reflect(FriendPanel.prototype, "FriendPanel");
