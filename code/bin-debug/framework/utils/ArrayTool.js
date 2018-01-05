var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 数组工具
 * @author chenkai
 * @date 2016/7/19
 */
var ArrayTool = (function () {
    function ArrayTool() {
    }
    /**
     * 复制数组
     * @param srcArr 源数组
     * @return 复制的数组
     */
    ArrayTool.copyArr = function (srcArr) {
        var resultArr = [];
        var len = srcArr.length;
        for (var i = 0; i < len; i++) {
            resultArr[i] = srcArr[i];
        }
        return resultArr;
    };
    /**
     * 排序数组 自然排序，由小到大
     * @param 源数组
     */
    ArrayTool.sortArr = function (srcArr) {
        var len = srcArr.length;
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (srcArr[i] > srcArr[j]) {
                    var temp = srcArr[i];
                    srcArr[i] = srcArr[j];
                    srcArr[j] = temp;
                }
            }
        }
    };
    /**
     * 排序Scroll下的Group子元素 （EgretTile布局有点问题，这里自己排列）
     * @group
     * @colMax 行最大值
     * @width 列表项宽度
     * @height 列表项高度
     * @intervalX 行间距
     * @intervalY 列间距
     */
    ArrayTool.sortScrollGroup = function (group, colMax, width, height, intervalX, intervalY) {
        var len = group.numChildren;
        var row;
        var col;
        var item;
        for (var i = 0; i < len; i++) {
            item = group.getChildAt(i);
            row = Math.floor(i / colMax);
            col = i % colMax;
            item.anchorOffsetX = item.width / 2;
            item.anchorOffsetY = item.height / 2;
            item.x = (col + 1) * intervalX + col * width + width / 2;
            item.y = (row + 1) * intervalX + row * height + height / 2;
        }
    };
    /**
     * 获取object长度
     * @param obj 待判断Object
     * @returns object长度
     */
    ArrayTool.getObjectLength = function (obj) {
        var sum = 0;
        for (var key in obj) {
            sum++;
        }
        return sum;
    };
    /**
     * 交换数组指定索引处的元素
     * @srcArr 源数组
     * @indexA 元素A索引
     * @indexB 元素B索引
     */
    ArrayTool.swap = function (srcArr, indexA, indexB) {
        var temp = srcArr[indexA];
        srcArr[indexA] = srcArr[indexB];
        srcArr[indexB] = temp;
    };
    /**
     * 随机排序数组
     * @srcArr 源数组
     */
    ArrayTool.randSort = function (srcArr) {
        var len = srcArr.length;
        for (var i = 0; i < len; i++) {
            this.swap(srcArr, i, NumberTool.getRandInt(0, len - 1));
        }
    };
    /**
     * 时间转换,整体
     * 2017-4-6 16:46:29
     */
    ArrayTool.formatDate = function (timeS) {
        var time = new Date(parseInt(timeS) * 1000);
        return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    };
    /**
     * 时间转换,日期
     * 2017-04-06
     */
    ArrayTool.formatDate1 = function (timeS) {
        var time = new Date(parseInt(timeS) * 1000);
        return ArrayTool.aze(time.getFullYear()) + "-" + ArrayTool.aze((time.getMonth() + 1)) + "-" + ArrayTool.aze(time.getDate());
    };
    /**
     * 时间转换,时，分，秒
     * 16:46:29
     */
    ArrayTool.formatDate2 = function (timeS) {
        var time = new Date(parseInt(timeS) * 1000);
        return ArrayTool.aze(time.getHours()) + ":" + ArrayTool.aze(time.getMinutes()) + ":" + ArrayTool.aze(time.getSeconds());
    };
    ArrayTool.aze = function (num) {
        if (num > 9) {
            return "" + num;
        }
        else {
            return "0" + num;
        }
    };
    return ArrayTool;
}());
__reflect(ArrayTool.prototype, "ArrayTool");
