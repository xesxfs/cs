/**
 * 弹框常量，用于PanelManager打开和关闭弹框
 * @author chenkai
 * @date 2016/11/9
 */
var PanelConst;
(function (PanelConst) {
    /**聊天*/
    PanelConst[PanelConst["ChatPanel"] = 0] = "ChatPanel";
    /**结算 老版本*/
    PanelConst[PanelConst["ResultPanel"] = 1] = "ResultPanel";
    /**结算*/
    PanelConst[PanelConst["ResultPanel1"] = 2] = "ResultPanel1";
    /**牌局信息*/
    PanelConst[PanelConst["MacthInfoPanel"] = 3] = "MacthInfoPanel";
    /**抓马*/
    PanelConst[PanelConst["ZhuaMaPanel"] = 4] = "ZhuaMaPanel";
    /**分享*/
    PanelConst[PanelConst["SharePanel"] = 5] = "SharePanel";
    /**签名*/
    PanelConst[PanelConst["SignPanel"] = 6] = "SignPanel";
    /**玩法说明*/
    PanelConst[PanelConst["RulePanel"] = 7] = "RulePanel";
    /**邮件*/
    PanelConst[PanelConst["EmailPanel"] = 8] = "EmailPanel";
    /**福利*/
    PanelConst[PanelConst["FuliPanel"] = 9] = "FuliPanel";
    /**反馈*/
    PanelConst[PanelConst["NewFeedBackPanel"] = 10] = "NewFeedBackPanel";
    /**救济金*/
    PanelConst[PanelConst["JjjPanel"] = 11] = "JjjPanel";
    /**排名*/
    PanelConst[PanelConst["RankPanel"] = 12] = "RankPanel";
    /**创建房间*/
    PanelConst[PanelConst["CreateRoomPanel"] = 13] = "CreateRoomPanel";
    /**加载界面*/
    PanelConst[PanelConst["PreloadPanel"] = 14] = "PreloadPanel";
    /**非专属房提示面板 */
    PanelConst[PanelConst["ExRoomOpenVipPanel"] = 15] = "ExRoomOpenVipPanel";
    /**二维码 */
    PanelConst[PanelConst["QRCode"] = 16] = "QRCode";
    /**加入房间 */
    PanelConst[PanelConst["InputRoom"] = 17] = "InputRoom";
    /**设置界面 */
    PanelConst[PanelConst["SetPanel"] = 18] = "SetPanel";
    /**修改房间*/
    PanelConst[PanelConst["ExcRoom"] = 19] = "ExcRoom";
    /**新排行榜 */
    PanelConst[PanelConst["RankPanel1"] = 20] = "RankPanel1";
    /**
     * 排行榜规则
     */
    PanelConst[PanelConst["RankNewRuleDetail"] = 21] = "RankNewRuleDetail";
    /**
     * 算分
     */
    PanelConst[PanelConst["ScorePanel"] = 22] = "ScorePanel";
    /**续费*/
    PanelConst[PanelConst["ReNew"] = 23] = "ReNew";
    /**
     * 战绩详情
     */
    PanelConst[PanelConst["ScoreDetailPanel1"] = 24] = "ScoreDetailPanel1";
    /**
     * 战局回弹窗
     */
    PanelConst[PanelConst["LookPswPanel"] = 25] = "LookPswPanel";
    /**
     * 战绩分享
     */
    PanelConst[PanelConst["ScoreSharePanel"] = 26] = "ScoreSharePanel";
    /**
     * 商城
     */
    PanelConst[PanelConst["MallPanel"] = 27] = "MallPanel";
    /**
     * 支付
     */
    PanelConst[PanelConst["PaymentPanel"] = 28] = "PaymentPanel";
    /**
     * 支付方式
     */
    PanelConst[PanelConst["PaymentMethod"] = 29] = "PaymentMethod";
    /**
     * 背包
     */
    PanelConst[PanelConst["BackpackPanel"] = 30] = "BackpackPanel";
    /**
     * 二级邮箱
     */
    PanelConst[PanelConst["EmailTwoPanel"] = 31] = "EmailTwoPanel";
    /**
    * 好友房列表
    */
    PanelConst[PanelConst["FriendPanel"] = 32] = "FriendPanel";
    /**
   * 加入房间
   */
    PanelConst[PanelConst["JoinRoomPanel"] = 33] = "JoinRoomPanel";
    /**
     * 输入加入房间
     */
    PanelConst[PanelConst["JoinNumber"] = 34] = "JoinNumber";
    /**
     * 游戏内背包
     */
    PanelConst[PanelConst["GameBack"] = 35] = "GameBack";
    /**
     * 游戏内邮件
     */
    PanelConst[PanelConst["GameMall"] = 36] = "GameMall";
    /**
     * 游戏内设置
     */
    PanelConst[PanelConst["GameSet"] = 37] = "GameSet";
    /**
     * 游戏内查看规则
     */
    PanelConst[PanelConst["LookRlue"] = 38] = "LookRlue";
    /**
     * 游戏内修改规则
     */
    PanelConst[PanelConst["ModifyRlueT"] = 39] = "ModifyRlueT";
    /**
     * 邀请好友列表
     */
    PanelConst[PanelConst["InvitePanel"] = 40] = "InvitePanel";
    /**
     * 记录界面
     */
    PanelConst[PanelConst["RecordPanel"] = 41] = "RecordPanel";
    /**
     * 记录详情界面
     */
    PanelConst[PanelConst["RecordDetailPanel"] = 42] = "RecordDetailPanel";
    /**
     * 个人信息
     */
    PanelConst[PanelConst["UserInfoPanel"] = 43] = "UserInfoPanel";
    /**
     * 结算
     */
    PanelConst[PanelConst["GameResultPanel"] = 44] = "GameResultPanel";
    /**
     * 胡牌类型
     */
    PanelConst[PanelConst["HuTypePanel"] = 45] = "HuTypePanel";
    /**
     * 录音
     */
    PanelConst[PanelConst["TapePanel"] = 46] = "TapePanel";
    /**
     * 解散房间
     */
    PanelConst[PanelConst["JieSanPanel"] = 47] = "JieSanPanel";
    /**
     * 提示解散房间
     */
    PanelConst[PanelConst["SendjiesanPanel"] = 48] = "SendjiesanPanel";
    /**
     * 好友房记录
     */
    PanelConst[PanelConst["GameRecordPanel"] = 49] = "GameRecordPanel";
    /**
     * 关闭修改规则确认
     */
    PanelConst[PanelConst["ModifyRuleSurePanel"] = 50] = "ModifyRuleSurePanel";
    /**
     * socket关闭弹窗
     */
    PanelConst[PanelConst["SocketClosePanel"] = 51] = "SocketClosePanel";
    /**
    * 好友房邀请好友
    */
    PanelConst[PanelConst["InvitePanelT"] = 52] = "InvitePanelT";
    /**
     * 登录界面
     */
    PanelConst[PanelConst["LoginPanel"] = 53] = "LoginPanel";
    /**
     * 好友房分享界面
     */
    PanelConst[PanelConst["ShareRecordPanel"] = 54] = "ShareRecordPanel";
    /**
     * 结算分享界面
     */
    PanelConst[PanelConst["ShareResultPanel"] = 55] = "ShareResultPanel";
    /**
     * 总结算面板
     */
    PanelConst[PanelConst["AllRecord"] = 56] = "AllRecord";
    /**
     * 登录选择
     */
    PanelConst[PanelConst["LoginChoosePanel"] = 57] = "LoginChoosePanel";
    /**
     * 绑定
     */
    PanelConst[PanelConst["BindPanel"] = 58] = "BindPanel";
})(PanelConst || (PanelConst = {}));
