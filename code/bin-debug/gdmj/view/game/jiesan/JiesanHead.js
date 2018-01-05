var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author xiongjian
 * 2017-4-11
 *
 * 解散房间头像
 */
var JiesanHead = (function (_super) {
    __extends(JiesanHead, _super);
    function JiesanHead() {
        var _this = _super.call(this) || this;
        _this.skinName = "jiesanHeadSKin";
        return _this;
    }
    JiesanHead.prototype.updataHead = function (url) {
        if (url && url != "" && url != 1) {
            this.headImg.source = url;
        }
    };
    JiesanHead.prototype.updateName = function (name) {
        if (name && name != "") {
            this.nameLabel.text = StringTool.formatNickName("" + name);
        }
    };
    JiesanHead.prototype.updataState = function (data) {
        switch (data) {
            case JieSanState.wait:
                this.stateLabel.text = "等待中";
                this.stateLabel.textColor = 0x3c3c3c;
                break;
            case JieSanState.send:
                this.stateLabel.text = "申请解散";
                this.stateLabel.textColor = 0xb33318;
                break;
            case JieSanState.ok:
                this.stateLabel.text = "同意解散";
                this.stateLabel.textColor = 0x269111;
                break;
            case JieSanState.jujue:
                this.stateLabel.text = "拒绝解散";
                this.stateLabel.textColor = 0xb33318;
                break;
        }
    };
    return JiesanHead;
}(eui.Component));
__reflect(JiesanHead.prototype, "JiesanHead");
var JieSanState;
(function (JieSanState) {
    JieSanState[JieSanState["wait"] = 0] = "wait";
    JieSanState[JieSanState["send"] = 1] = "send";
    JieSanState[JieSanState["ok"] = 2] = "ok";
    JieSanState[JieSanState["jujue"] = 3] = "jujue"; //拒绝解散
})(JieSanState || (JieSanState = {}));
