var TipsLog;
(function (TipsLog) {
    /**
     * 顶部悬浮提示
     * @author huanglong
     * 2017/04/27
     */
    function info(str) {
        show(str);
    }
    TipsLog.info = info;
    function hallInfo(str) {
        showTop(str);
    }
    TipsLog.hallInfo = hallInfo;
    function gameInfo(str) {
        showTop(str, true);
    }
    TipsLog.gameInfo = gameInfo;
    function staticInfo(str) {
        var tipGro = new eui.Group();
        tipGro.width = App.StageUtils.stageWidth;
        tipGro.height = 100;
        var tipsBg = new eui.Image();
        tipsBg.texture = RES.getRes("tiplog_hall_png");
        tipsBg.horizontalCenter = 0;
        tipGro.y = 0;
        var showText = new eui.Label();
        showText.size = 30;
        showText.textColor = 0xfff1be;
        showText.text = str;
        showText.horizontalCenter = 0;
        showText.y = (tipsBg.height - showText.size) / 2;
        tipGro.addChild(tipsBg);
        tipGro.addChild(showText);
        if (App.LayerManager.tipLayer.numChildren > 0) {
            egret.Tween.removeAllTweens();
            App.LayerManager.tipLayer.removeChildren();
        }
        setTimeout(function () {
            App.LayerManager.tipLayer.removeChildren();
        }, 2500);
    }
    TipsLog.staticInfo = staticInfo;
    function showTop(str, game) {
        if (game === void 0) { game = false; }
        var tipGro = new eui.Group();
        tipGro.width = App.StageUtils.stageWidth;
        tipGro.height = 100;
        var tipsBg = new eui.Image();
        if (!game) {
            tipsBg.texture = RES.getRes("tiplog_hall_png");
        }
        else {
            tipsBg.texture = RES.getRes("tiplog_game_png");
            tipsBg.scale9Grid = new egret.Rectangle(20, 7, 123, 45);
            tipsBg.width = 600;
            tipsBg.alpha = 0.95;
        }
        tipsBg.horizontalCenter = 0;
        tipGro.y = -tipsBg.height;
        var showText = new eui.Label();
        showText.size = 30;
        showText.textColor = 0xfff1be;
        showText.text = str;
        showText.horizontalCenter = 0;
        showText.y = (tipsBg.height - showText.size) / 2;
        if (!game) {
            showText.y = showText.y - 3;
        }
        tipGro.addChild(tipsBg);
        tipGro.addChild(showText);
        if (App.LayerManager.tipLayer.numChildren > 0) {
            egret.Tween.removeTweens(tipGro);
            App.LayerManager.tipLayer.removeChildren();
        }
        App.LayerManager.tipLayer.addChild(tipGro);
        egret.Tween.get(tipGro)
            .to({ y: 0 }, 200)
            .wait(2000)
            .to({ y: -tipsBg.height, alpha: 0 }, 300)
            .call(function () {
            egret.Tween.removeTweens(tipGro);
            App.LayerManager.tipLayer.removeChildren();
        });
        setTimeout(function () {
            if (tipGro && tipGro.parent) {
                App.LayerManager.tipLayer.removeChild(tipGro);
            }
        }, 3000);
    }
    function show(str) {
        var showtext = new egret.TextField();
        showtext.size = 28;
        showtext.strokeColor = 0x934c26;
        var tipsBg = new egret.Sprite();
        tipsBg.graphics.beginFill(0x934c26);
        var x = 0;
        var y = 0;
        var offset = 40;
        tipsBg.graphics.drawRoundRect(x, y, str.length * showtext.size + offset, showtext.size + offset, 50);
        tipsBg.graphics.endFill();
        tipsBg.alpha = 0.9;
        showtext.stroke = 2;
        showtext.bold = true;
        showtext.text = str;
        tipsBg.addChild(showtext);
        showtext.x = (tipsBg.width - showtext.width) / 2;
        showtext.y = (tipsBg.height - showtext.height) / 2;
        tipsBg.x = (App.StageUtils.stageWidth - tipsBg.width) / 2;
        tipsBg.y = (App.StageUtils.stageHeight - tipsBg.height) / 2;
        App.LayerManager.tipLayer && App.LayerManager.tipLayer.addChild(tipsBg);
        EffectUtils.showFload(tipsBg, 2000);
    }
})(TipsLog || (TipsLog = {}));
