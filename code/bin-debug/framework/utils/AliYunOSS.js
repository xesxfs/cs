/**
 * @author xiongjian
 * 2017-5-6
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AliYunOSS = (function () {
    function AliYunOSS() {
    }
    AliYunOSS.getURL = function (md5) {
        // var oss = new OSS({
        //     region: 'oss-cn-shenzhen',
        //     accessKeyId: 'LTAIQX5I2hDXyp8A',
        //     accessKeySecret: 'yP6IAmOWEAqSuphM8lPeAfGuhPgYrh',
        //     bucket: 'athletics'
        // });
        // var url = oss.signatureUrl(md5);
        return md5;
    };
    return AliYunOSS;
}());
__reflect(AliYunOSS.prototype, "AliYunOSS");
