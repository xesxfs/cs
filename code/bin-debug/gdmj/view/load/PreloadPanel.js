var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 预加载面板
 * @author chenwei
 * @date 2016/07/14
 */
var PreloadPanel = (function (_super) {
    __extends(PreloadPanel, _super);
    function PreloadPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "PreloadPanelSkin";
        return _this;
    }
    PreloadPanel.prototype.onEnable = function () {
        this.setProgress(0);
        if (this.recData) {
            this.gameGro.visible = true;
            this.preGro.visible = false;
            if (!this.mcCir) {
                var data = RES.getRes("loadMc_json");
                var texture = RES.getRes("loadMc_png");
                var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
                this.mcCir = new egret.MovieClip(mcDataFactory.generateMovieClipData("load"));
                this.mcCir.x = (App.StageUtils.stageWidth - this.mcCir.width) / 2;
                this.mcCir.y = (App.StageUtils.stageHeight - this.mcCir.height) / 2 - this.mcCir.height + 10;
            }
            this.gameGro.addChild(this.mcCir);
            this.mcCir.gotoAndPlay("roll", -1);
        }
        else {
            //关闭原生Loading
            App.NativeBridge.sendCloseStart();
            this.gameGro.visible = true;
            this.preGro.visible = true;
            // if(this.mc == null) {
            //     var data = RES.getRes("pload_json");
            //     var texture = RES.getRes("pload_png");
            //     var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
            //     this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("pload"));
            //     this.mc.x = (App.StageUtils.stageWidth - this.mc.width) / 2;
            //     this.mc.y = (App.StageUtils.stageHeight - this.mc.height) *0.6;
            // }
            // this.preGro.addChild(this.mc);
            // this.mc.gotoAndPlay("load",-1);
            if (!this.mcCir) {
                var data = RES.getRes("loadMc_json");
                var texture = RES.getRes("loadMc_png");
                var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
                this.mcCir = new egret.MovieClip(mcDataFactory.generateMovieClipData("load"));
                this.mcCir.x = (App.StageUtils.stageWidth - this.mcCir.width) / 2;
                this.mcCir.y = (App.StageUtils.stageHeight - this.mcCir.height) / 2 - this.mcCir.height + 10;
            }
            this.gameGro.addChild(this.mcCir);
            this.mcCir.gotoAndPlay("roll", -1);
        }
    };
    PreloadPanel.prototype.onRemove = function () {
        this.setProgress(0);
    };
    /**
     * 设置加载进度
     * @value 进度 0-100
     */
    PreloadPanel.prototype.setProgress = function (value) {
        if (this.percentLab) {
            this.percentLab.text = value + "%";
        }
        //        this.loadProgress.value = value;
    };
    return PreloadPanel;
}(BasePanel));
__reflect(PreloadPanel.prototype, "PreloadPanel");
