var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Socket通讯协议头
 * @author chenkai
 * @date 2016/11/17
 */
var ProtocolHead = (function () {
    function ProtocolHead() {
    }
    return ProtocolHead;
}());
/**发送心跳*/
ProtocolHead.Send100000 = "100000";
/**接收心跳*/
ProtocolHead.Rev1_1_0 = "100000";
/**发送断线重连 */
ProtocolHead.Send100010 = "100010";
/**广播玩家断线重连 102 2 99*/
ProtocolHead.Rev102_2_99 = "100011";
/**玩家加入房间(广播) 102 4 2*/
ProtocolHead.Rev102_4_2 = "100145";
/**发送退出房间*/
ProtocolHead.Send102_5_0 = "100147";
/**接收退出房间(广播)*/
ProtocolHead.Rev102_5_1 = "100149";
/**接收通知玩家被踢出*/
ProtocolHead.Rev102_20_1 = "100129";
/**接收更新房卡*/
ProtocolHead.Rev103_10_0 = "100141";
/**赠送房间*/
ProtocolHead.Send104_3_0 = "104_3_0";
/**赠送返回*/
ProtocolHead.Rev104_3_1 = "104_3_1";
/**广播房间房主变更*/
ProtocolHead.Rev104_3_2 = "104_3_2";
/**申请解散房间*/
ProtocolHead.Send104_5_0 = "100151";
/**申请返回*/
// public static Rev104_5_1: string = "100155";
/**询问是否同意解散*/
ProtocolHead.Rev104_5_2 = "100157";
/**发送是否同意解散*/
ProtocolHead.Send104_5_5 = "104_5_5";
/**广播桌子解散*/
ProtocolHead.Rev104_5_6 = "100159";
/**发送再来一战*/
ProtocolHead.Send104_8_0 = "100160";
/**接收再来一战*/
ProtocolHead.Rev104_8_0 = "104_8_0";
/**长时间没有开始游戏，提示强制解散房间*/
ProtocolHead.Rev104_10_0 = "104_10_0";
// /**发送准备*/
// public static Send100162: string = "100162";
// /**广播玩家准备*/
// public static Rev100165: string = "100165";
// /**取消准备*/
// public static Send100164: string = "100164";
/**接收游戏状态*/
ProtocolHead.Rev100803 = "100803";
/**广播取消准备*/
// public static Rev100167: string = "100167";
/**发送聊天信息*/
ProtocolHead.Send111_1_0 = "111_1_0";
/**广播聊天室信息*/
ProtocolHead.Rev111_1_1 = "111_1_1";
/**禁言广播 */
ProtocolHead.Gag111_2_1 = "111_2_1";
/**发送互动表情*/
ProtocolHead.Send112_1_0 = "112_1_0";
/**互动道具失败*/
ProtocolHead.Rev112_1_1 = "112_1_1";
/**广播互动道具*/
ProtocolHead.Rev112_1_2 = "112_1_2";
/**通知领取救济金*/
ProtocolHead.Rev_113_1_0 = "113_1_0";
/**领取救济金*/
ProtocolHead.Send113_2_0 = "113_2_0";
/**接收领取救济金结果*/
ProtocolHead.Rev113_2_1 = "113_2_1";
/**请求游戏状态*/
ProtocolHead.Send100150 = "100150";
/**广播更新玩家信息*/
// public static Rev100802: string = "100802";
/**玩家(取消)托管*/
ProtocolHead.Send100804 = "100804";
/**广播玩家(取消)托管 */
ProtocolHead.Rev100805 = "100805";
/**游戏开始,获取庄家位置*/
// public static Rev100806: string = "100806";
/**发牌*/
ProtocolHead.Rev100808 = "100808";
/**摸牌*/
ProtocolHead.Rev100809 = "100809";
/**玩家请求操作(吃、碰、杠、胡等)*/
ProtocolHead.Send100810 = "100810";
/**通知玩家叫牌(是否能吃、碰等)*/
ProtocolHead.Rev100811 = "100811";
/**相应玩家操作(广播玩家吃、碰等操作)*/
ProtocolHead.Rev100812 = "100812";
/**通知玩家出牌?*/
ProtocolHead.Rev100813 = "100813";
/**游戏结束，结算*/
ProtocolHead.Rev100814 = "100814";
/**广播买马结果*/
ProtocolHead.Rev180_59_0 = "100815";
/**广播通知鬼牌*/
ProtocolHead.Rev180_60_0 = "100816";
/**广播杠结算*/
ProtocolHead.Rev180_61_0 = "100817";
/**接收牌局信息，桌子解散时接收 */
ProtocolHead.Rev180_62_0 = "100818";
/**广播玩家叫牌*/
ProtocolHead.Rev100819 = "100819";
/**测试确定下次发的牌*/
ProtocolHead.Send180_99_0 = "100820";
/**测试换牌*/
ProtocolHead.Send180_100_0 = "100821";
/**测试换牌*/
ProtocolHead.Rev100822 = "100822";
/**测试看牌 -1最后一张 0为第一张 主要用来测试海底捞月*/
ProtocolHead.Send100823 = "100823";
/**接收测试最后一张牌*/
ProtocolHead.Rev180_103_0 = "100824";
/**其他玩家登陆该账号*/
ProtocolHead.Rev10000_0_0 = "100039";
/**通知金币变化*/
ProtocolHead.Rev103_6_0 = "100137";
/**游戏中不能站起*/
ProtocolHead.Rev102_8_60 = "100044";
/**玩家离开游戏离线 */
ProtocolHead.Rev102_7_0 = "102_7_0";
/**登陆游戏服务器 {“userid”:int, “pass”:string} 其中pass为md5加密后的密文*/
ProtocolHead.Send100002 = "100002";
/**推送服务器登录*/
ProtocolHead.Send181_0_0 = "100825";
/**登陆 当 session被占用时返回 [100, 3, 9] 消息*/
ProtocolHead.Rev100_3_9 = "100035";
/**登陆 当密码错误时返回 [100, 3, 3] 消息，无结构*/
ProtocolHead.Rev100_3_3 = "100031";
/**登陆 当玩家没有登录Z服务器时返回 [100,3,19]消息，无结构*/
ProtocolHead.Rev100_3_19 = "100037";
/**登陆 当玩家在其他游戏中登录或没有正常登出时*/
ProtocolHead.Rev100_3_8 = "100033";
/**登陆 断线重连*/
// public static Rev102_2_50: string = "100010";
/**登陆 登陆成功*/
ProtocolHead.Rev100_2_1 = "100003";
/**推送服务器 登录成功*/
ProtocolHead.Rev182_1_0 = "100826";
/**接收推送消息*/
ProtocolHead.Rev182_0_0 = "100827";
/**创建房间*/
ProtocolHead.Send104_1_0 = "100120";
/**创建房间*/
ProtocolHead.Rev104_1_1 = "100121";
/**搜索房间*/
ProtocolHead.Send104_2_0 = "100122";
/**接收搜索房间*/
ProtocolHead.Rev104_2_1 = "100123";
/**进入房间*/
ProtocolHead.Send102_4_0 = "100110";
/**加入房间*/
ProtocolHead.Rev102_4_1 = "100111";
/**玩家进入广播*/
ProtocolHead.CC102_4_2 = "100145";
/**获取游戏服务器地址*/
ProtocolHead.Send200_1_0 = "100829";
/** 查询房间号是否存在*/
ProtocolHead.Send200_2_0 = "100831";
/**返回房间是否存在*/
ProtocolHead.Rev200_2_1 = "100832";
/**接收游戏服务器地址*/
ProtocolHead.Rev200_1_1 = "100830";
/**金币场 玩家请求加入排队*/
ProtocolHead.Send102_11_0 = "100126";
/**桌子结束*/
ProtocolHead.Rev104_4_0 = "100125";
/**通知房主房间结束*/
ProtocolHead.Rev104_4_1 = "100127";
/**金币场进入失败，金币太少*/
ProtocolHead.Rev102_16_0 = "102_16_0";
/**金币场进入失败，金币太多*/
ProtocolHead.Rev102_18_0 = "102_18_0";
/**专属房**/
ProtocolHead.Rev121_1_0 = "100105";
/**更改房间配置 */
ProtocolHead.Send120_1_0 = "100102";
/**加入桌子**/
ProtocolHead.Send102_8_0 = "102_8_0";
/**返回加入桌子**/
ProtocolHead.Rev102_8_1 = "102_8_1";
/**获取指定的桌子的信息**/
ProtocolHead.Send104_10_0 = "100114";
/**返回桌子的信息**/
ProtocolHead.Rev104_10_1 = "100115";
/**没有可用的专属房**/
ProtocolHead.Rev121_2_0 = "100106";
/**踢人*/
ProtocolHead.Send102_20_0 = "100128";
/**踢人返回*/
ProtocolHead.Rev102_20_2 = "100131";
/**接收踢人广播*/
ProtocolHead.Rev102_20_3 = "100133";
/**禁言*/
ProtocolHead.Send111_2_0 = "111_2_0";
/**接收禁言广播*/
ProtocolHead.Rev111_2_1 = "111_2_1";
/**更改房间配置返回 **/
//public static Rev120_1_1: string = "100103";
/**更改房间规则广播 */
ProtocolHead.Rev100103 = "100103";
/**更改房间配置广播**/
ProtocolHead.Rev120_1_2 = "100104";
//查看是否禁言*/
ProtocolHead.Send111_3_0 = "111_3_0";
/**返回是否被禁言*/
ProtocolHead.Rev111_3_1 = "111_3_1";
/**聊天失败返回*/
ProtocolHead.Rev111_1_2 = "111_1_2";
/**解除禁言返回*/
ProtocolHead.Rev111_4_0 = "111_4_0";
/**通知房主哪个人禁言解除*/
ProtocolHead.Rev111_4_1 = "111_4_1";
/**玩家站起 */
ProtocolHead.Send100040 = "100040";
/**广播玩家站起 */
ProtocolHead.Rev100041 = "100041";
/**玩家坐下 */
ProtocolHead.Send100041 = "100042";
/**广播玩家坐下 */
ProtocolHead.Rev100043 = "100043";
/**游戏中不能站起或离开 */
ProtocolHead.Rev100125 = "100125";
/**用户同意消息，排队机房间自动发送*/
ProtocolHead.Rev100135 = "100135";
/**游戏中结算信息 */
ProtocolHead.Rev100139 = "100139";
/**通知新的一轮开始游戏 */
ProtocolHead.Rev100107 = "100107";
/**通知一轮游戏结束 */
ProtocolHead.Rev100109 = "100109";
/**好友房加入房间 */
ProtocolHead.Send100110 = "100110";
/**好友房返回加入房间 */
ProtocolHead.Rev100111 = "100111";
/**专属房搜索房间 */
ProtocolHead.Send100112 = "100112";
/**查找房间返回 */
ProtocolHead.Rev100113 = "100113";
/**获取游戏状态消息，当进入房间是应当发送该消息，以便获取游戏状态 */
ProtocolHead.Rev100116 = "100116";
/**接收起手胡 */
ProtocolHead.Rev100900 = "100900";
/***
 * 快速匹配场
 */
/**创建房间请求 */
ProtocolHead.Send100120 = "100120";
/**创建房间返回 */
ProtocolHead.Rev100121 = "100121";
/**查找房间请求 */
ProtocolHead.Send100122 = "100122";
/**查找房间返回 */
ProtocolHead.Rev100123 = "100123";
/**房间解散请求 */
ProtocolHead.Send100125 = "100125";
/**房间解散返回 */
ProtocolHead.Rev100127 = "100127";
/**加入房间广播 */
ProtocolHead.Rev100145 = "100145";
/**玩家准备 */
ProtocolHead.Send100162 = "100162";
/**玩家取消准备 */
ProtocolHead.Send100164 = "100164";
/**广播玩家准备 */
ProtocolHead.Rev100165 = "100165";
/**广播玩家取消准备 */
ProtocolHead.Rev100167 = "100167";
/**广播更新玩家信息*/
ProtocolHead.Rev100802 = "100802";
/**游戏开始,获取庄家位置*/
ProtocolHead.Rev100806 = "100806";
/**发送断线重连消息 */
ProtocolHead.Send100801 = "100801";
/**测试换牌返回 */
// public static Rev100823: string = "100823";
/**发送创建好友房 */
ProtocolHead.Send101000 = "101000";
/**发送加入好友房 */
ProtocolHead.Send101001 = "101001";
/**广播通知有玩家进入好友房桌子 */
ProtocolHead.Rev101003 = "101003";
/**发送好友房内记录 */
ProtocolHead.Send101004 = "101004";
/**匹配房发送退出房间 */
ProtocolHead.Send100121 = "100121";
/**好友房发送退出房间 */
ProtocolHead.Send101002 = "101002";
/**广播通知有玩家断线 */
ProtocolHead.Rev100012 = "100012";
/**广播由玩家重连 */
ProtocolHead.Rev100011 = "100011";
/**测试确认色子点数 */
ProtocolHead.Send100824 = "100824";
/**发送修改好友房 */
ProtocolHead.Send100102 = "100102";
/**游戏结束扎鸟 */
ProtocolHead.Rev100901 = "100901";
/**发送查看规则测试 */
ProtocolHead.Send100117 = "100117";
/**修改规则界面获取初始值 */
ProtocolHead.Send100118 = "100118";
/**发送邀请好友时的规则 */
ProtocolHead.Send100119 = "100119";
/**发送好友房解散房间 */
ProtocolHead.Send100151 = "100151";
/**广播通知玩家请求解散桌子 */
ProtocolHead.Rev100155 = "100155";
/**广播通知某玩家对解散桌子的回应 */
ProtocolHead.Rev100159 = "100159";
/**广播通知解散桌子 */
ProtocolHead.Rev100160 = "100160";
/**发送是否同意解散 */
ProtocolHead.Send100156 = "100156";
/**广播通知有人离开房间 */
ProtocolHead.Rev100047 = "100047";
/**广播一轮游戏结束通知 */
ProtocolHead.Rev100818 = "100818";
/**设备在其他设备登陆 */
ProtocolHead.Rev100013 = "100013";
/**拒绝解散房间消息 */
ProtocolHead.Rev100161 = "100161";
/**发送踢人消息 */
ProtocolHead.Send100128 = "100128";
/**广播踢人消息 */
ProtocolHead.Rev100129 = "100129";
/**通知自己被踢出 */
ProtocolHead.Rev100133 = "100133";
/**匹配场换桌 */
ProtocolHead.Send100124 = "100124";
/**广播当前局数 */
ProtocolHead.Rev100108 = "100108";
__reflect(ProtocolHead.prototype, "ProtocolHead");
