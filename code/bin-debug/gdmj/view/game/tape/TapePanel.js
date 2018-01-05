/**
 * 录音界面
 * @author huanglong
 * 2017-4-5
 * 录音不发送是否需要给IM消息中加入参数
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TapePanel = (function (_super) {
    __extends(TapePanel, _super);
    function TapePanel() {
        var _this = _super.call(this) || this;
        _this.blueList = []; //蓝色音量方块
        _this.moveFlag = false;
        _this.delay = 100;
        _this.skinName = "TapePanelSkin";
        return _this;
    }
    TapePanel.prototype.childrenCreated = function () {
        for (var i = 0; i < 5; i++) {
            this.blueList.push(this.blueGroup.getChildAt(i));
        }
    };
    /** 添加到场景*/
    TapePanel.prototype.onEnable = function () {
        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOutside, this);
        this.Timer = new egret.Timer(this.delay, 60 * 10);
        this.Timer.addEventListener(egret.TimerEvent.TIMER, this.timeTicker, this);
        this.Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeCom, this);
        this.initView();
    };
    /** 从场景中移除*/
    TapePanel.prototype.onRemove = function () {
        this.tapeImg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.tapeImg.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.tapeImg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOutside, this);
        this.Timer.stop();
        this.Timer = null;
        this.Totaltime = 0;
    };
    /**初始化界面 */
    TapePanel.prototype.initView = function () {
        this.tapLabel.visible = true;
        this.timeGro.visible = false;
        this.blueGroup.visible = false;
        this.tipLabel.visible = false;
        this.timeLabel.text = "00:00";
    };
    /**话筒动画 */
    TapePanel.prototype.voiceAnimation = function () {
        var _this = this;
        var flashTime = 90;
        egret.Tween.get(this, { loop: true }).wait(flashTime).call(function () {
            _this.blueList[1].visible = false; //1亮
            _this.blueList[2].visible = false;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //12亮
            _this.blueList[2].visible = false;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //123亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //1234亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = true;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //123亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //12亮
            _this.blueList[2].visible = false;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //123亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //1234亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = true;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //12345亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = true;
            _this.blueList[4].visible = true;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //1234亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = true;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //123亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //12亮
            _this.blueList[2].visible = false;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        });
    };
    TapePanel.prototype.onBegin = function (event) {
        this.moveFlag = false;
        //发送给IM录音开始事件
        App.NativeBridge.sendTapeBegin();
        this.recordBeginTime = egret.getTimer();
        this.recordBeginPos = event.stageY;
        this.tapLabel.visible = false;
        this.timeGro.visible = true;
        this.blueGroup.visible = true;
        this.tipLabel.visible = true;
        //开始计时
        this.Totaltime = 0;
        this.Timer.start();
        this.voiceAnimation();
        //关闭背景音乐
        App.SoundManager.bgmVolume = 0;
    };
    TapePanel.prototype.onEnd = function () {
        this.overTape();
    };
    TapePanel.prototype.onOutside = function () {
        this.overTape();
    };
    TapePanel.prototype.timeTicker = function () {
        this.Totaltime += this.delay;
        var m = Math.floor(this.Totaltime / 1000);
        var s = ((this.Totaltime % 1000) / 100) * 6 + NumberTool.getRandInt(0, 6);
        this.timeLabel.text = Math.floor(m / 10).toString() + (m % 10).toString() + ":" + Math.floor(s / 10).toString() + (s % 10).toString();
    };
    TapePanel.prototype.timeCom = function () {
        TipsLog.gameInfo("录音时间已满60秒，自动发送");
        this.overTape();
    };
    /**结束录音处理 */
    TapePanel.prototype.overTape = function () {
        //发送给IM录音结束事件
        this.overAnimation();
        this.initView();
        this.Timer.reset();
        if ((egret.getTimer() - this.recordBeginTime) < 1000) {
            TipsLog.gameInfo("录音时间过短，自动撤销录音");
            App.NativeBridge.sendTageEnd({ state: "cancle" });
        }
        else if (this.moveFlag && ((this.recordBeginPos - this.recordEndPos) > 50 || this.recordEndPos < 940)) {
            TipsLog.gameInfo("已撤销录音内容");
            App.NativeBridge.sendTageEnd({ state: "cancle" });
        }
        else {
            App.NativeBridge.sendTageEnd({ state: "normal" });
        }
        App.SoundManager.bgmVolume = 1;
        this.hide();
    };
    /**结束录音动画处理 */
    TapePanel.prototype.overAnimation = function () {
        egret.Tween.removeTweens(this);
        //计时器复原
        this.Totaltime = 0;
    };
    TapePanel.prototype.onMove = function (event) {
        this.moveFlag = true;
        this.recordEndPos = event.stageY;
    };
    return TapePanel;
}(BasePanel));
__reflect(TapePanel.prototype, "TapePanel");
