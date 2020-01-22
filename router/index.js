import Vue from 'vue'
import Router from 'vue-router'
import store from '../store.js'

const View = r => require.ensure([], () => r(require('@/components/view')), 'View') //二级视图页面
const Index = r => require.ensure([], () => r(require('@/components/index/index')), 'Index')

/*****************************************************************************************************直播**************************/
const Zhibo = r => require.ensure([], () => r(require('@/components/zhibo/index')), 'Zhibo')
const ZhiboDetails = r => require.ensure([], () => r(require('@/components/zhibo/details')), 'Zhibo') //详情
const ZhiboAdd = r => require.ensure([], () => r(require('@/components/zhibo/add')), 'Zhibo') //发布直播
const ZhiboEdit = r => require.ensure([], () => r(require('@/components/zhibo/edit')), 'Zhibo') //编辑直播
const ZhiboJuBao = r => require.ensure([], () => r(require('@/components/zhibo/jubao')), 'Zhibo') //编辑直播
const ZhiboCourse = r => require.ensure([], () => r(require('@/components/zhibo/course')), 'Zhibo') //直播教程
const ZhiboPerson = r => require.ensure([], () => r(require('@/components/zhibo/myindex')), 'Zhibo') //直播个人中心列表
/*****************************************************************************************************排名**************************/
const Paiming = r => require.ensure([], () => r(require('@/components/paiming/index')), 'Paiming')
/*****************************************************************************************************合作**************************/
const Hezuo = r => require.ensure([], () => r(require('@/components/hezuo/index')), 'Hezuo')
const HezuoAdd = r => require.ensure([], () => r(require('@/components/hezuo/add')), 'Hezuo') //发布合作
const HezuoDetails = r => require.ensure([], () => r(require('@/components/hezuo/details')), 'Hezuo') //合作详情页
const HezuoApply = r => require.ensure([], () => r(require('@/components/hezuo/zaxiang/apply')), 'Hezuo') //参与合作
const HezuoAddOk = r => require.ensure([], () => r(require('@/components/hezuo/addok')), 'Hezuo') //发布合作成功
const HezuoUserList = r => require.ensure([], () => r(require('@/components/hezuo/userList')), 'Hezuo') //参与人列表
const HezuoEdit = r => require.ensure([], () => r(require('@/components/hezuo/edit')), 'Hezuo') //参与人编辑
const HezuoJoinDetail = r => require.ensure([], () => r(require('@/components/hezuo/joindetail')), 'Hezuo') //参与人提价的信息
const HezuoPerson = r => require.ensure([], () => r(require('@/components/hezuo/myindex')), 'Hezuo') //个人中心合作列表
/*****************************************************************************************************活动**************************/
const Huodong = r => require.ensure([], () => r(require('@/components/huodong/index')), 'Huodong')
const HuodongAdd = r => require.ensure([], () => r(require('@/components/huodong/add')), 'Huodong') //发布活动
const HuodongAddOk = r => require.ensure([], () => r(require('@/components/huodong/addok')), 'Huodong') //发布活动成功
const HuodongDetails = r => require.ensure([], () => r(require('@/components/huodong/details')), 'Huodong') //活动详情页
const HuodongBaoming = r => require.ensure([], () => r(require('@/components/huodong/baoming')), 'Huodong') //参加活动1
const HuodongSignup = r => require.ensure([], () => r(require('@/components/huodong/signup')), 'Huodong') //参加活动2
const HuodongInfo = r => require.ensure([], () => r(require('@/components/huodong/info')), 'Huodong') //填写信息
const HuodongMoreInfo = r => require.ensure([], () => r(require('@/components/huodong/moreinfo')), 'Huodong') //填写多场次信息
const HuodongPay = r => require.ensure([], () => r(require('@/components/huodong/pay')), 'Huodong') //线上支付
const HuodongPayEnd = r => require.ensure([], () => r(require('@/components/huodong/payEnd')), 'Huodong') //支付完成
const HuodongYanZheng = r => require.ensure([], () => r(require('@/components/huodong/yanzheng')), 'Huodong') //入场验证
const HuodongCode = r => require.ensure([], () => r(require('@/components/huodong/code')), 'Huodong') //活动二维码
const HuodonguserList = r => require.ensure([], () => r(require('@/components/huodong/userList')), 'Huodong') //参与人列表
const HuodongEdit = r => require.ensure([], () => r(require('@/components/huodong/edit')), 'Huodong') //活动编辑
const HuodongTiXian = r => require.ensure([], () => r(require('@/components/huodong/tixian')), 'Huodong') //发起方提现
const HuodongHeSuan = r => require.ensure([], () => r(require('@/components/huodong/hesuan')), 'Huodong') //发起人名单确认
const HuodonguserListMore = r => require.ensure([], () => r(require('@/components/huodong/userListmore')), 'Huodong') //参与人列表
const HuodonMyList = r => require.ensure([], () => r(require('@/components/huodong/myindex')), 'Huodong') //个人中心活动列表
/*********************搜索**************************/
const searchIndex = r => require.ensure([], () => r(require('@/components/search/index')), 'searchIndex') //搜索
/*************************************************************************************************个人中心**************************/
const User = r => require.ensure([], () => r(require('@/components/user/index')), 'User')
const UserShow = r => require.ensure([], () => r(require('@/components/user/userShow')), 'User') //个人信息展示页
const UserUpMyskill = r => require.ensure([], () => r(require('@/components/user/updata/myskill')), 'User') //我的技能
const UserUpData = r => require.ensure([], () => r(require('@/components/user/updata/data')), 'User') //完善个人资料
const UserUpRealname = r => require.ensure([], () => r(require('@/components/user/updata/realname')), 'User') //实名认证
const UserUpMycertificate = r => require.ensure([], () => r(require('@/components/user/updata/mycertificate')), 'User') //我的证书
const UserSetupIndex = r => require.ensure([], () => r(require('@/components/user/setup/index')), 'User') //账户管理
const UserSetupCphone = r => require.ensure([], () => r(require('@/components/user/setup/Cphone')), 'User') //修改手机号
const UserSetupFpassword = r => require.ensure([], () => r(require('@/components/user/setup/Fpassword')), 'User') //忘记密码
const UserMyAttention = r => require.ensure([], () => r(require('@/components/user/miscellaneous/myattention')), 'User') //关注订阅/推送
const UserMyCollection = r => require.ensure([], () => r(require('@/components/user/zaxiang/collection')), 'User') //收藏
const UserMyhistory = r => require.ensure([], () => r(require('@/components/user/zaxiang/history')), 'User') //历史
const UserMyQRcode = r => require.ensure([], () => r(require('@/components/user/zaxiang/QRcode')), 'User') //我的邀请码
const UserMyrecharge = r => require.ensure([], () => r(require('@/components/user/zaxiang/recharge')), 'User') //充值
const UserMycwdl = r => require.ensure([], () => r(require('@/components/user/zaxiang/cwdl')), 'User') //提现
const UserMybinding = r => require.ensure([], () => r(require('@/components/user/zaxiang/binding')), 'User') //绑定手机号
const UserMymdetailed = r => require.ensure([], () => r(require('@/components/user/zaxiang/mdetailed')), 'User') //提现
const UserMyteam = r => require.ensure([], () => r(require('@/components/user/team/index')), 'User') //我的团队
const UserFeedback = r => require.ensure([], () => r(require('@/components/user/zaxiang/feedback')), 'User') //意见反馈
const UserJoin = r => require.ensure([], () => r(require('@/components/user/zaxiang/join')), 'User') //意见反馈
const UserFabuShequ = r => require.ensure([], () => r(require('@/components/user/zaxiang/fabushequ')), 'User') //意见反馈

const Article = r => require.ensure([], () => r(require('@/components/user/miscellaneous/article')), 'User') //项目订阅关键词搜索


/************************************************************************************************登录注册**************************/
const Login = r => require.ensure([], () => r(require('@/components/login/login')), 'Login')
const Register = r => require.ensure([], () => r(require('@/components/login/register')), 'Login')
const Ceshi = r => require.ensure([], () => r(require('@/components/login/ceshi')), 'Login')
/****************************************************************************************************竞价**************************/
const JingjiaIndex = r => require.ensure([], () => r(require('@/components/jingjia/index')), 'JingjiaIndex')
/****************************************************************************************************消息**************************/
const MsgIndex = r => require.ensure([], () => r(require('@/components/msg/index')), 'MsgIndex')
const MsgTcw = r => require.ensure([], () => r(require('@/components/msg/tcw')), 'MsgIndex')
const MsgComplaint = r => require.ensure([], () => r(require('@/components/msg/complaint')), 'MsgIndex')
const MsgSystem = r => require.ensure([], () => r(require('@/components/msg/system')), 'MsgIndex')
const MsgDetail = r => require.ensure([], () => r(require('@/components/msg/detail')), 'MsgIndex') //报名详情
/**************************************************************************************************帮助中心**************************/
const HelpIndex = r => require.ensure([], () => r(require('@/components/help/index')), 'HelpIndex') //首页
const HelpMain = r => require.ensure([], () => r(require('@/components/help/main')), 'HelpIndex') //详情
/**************************************************************************************************小游戏**************************/
const GameIndex = r => require.ensure([], () => r(require('@/components/xiaoyouxi/index')), 'GameIndex') //小游戏
const RankIndex = r => require.ensure([], () => r(require('@/components/xiaoyouxi/paihang')), 'RankIndex') //小游戏排行榜
const OnlyPaihang = r => require.ensure([], () => r(require('@/components/xiaoyouxi/onlypaihang')), 'OnlyPaihang') //分享的小游戏排行榜
const OnlyIndex = r => require.ensure([], () => r(require('@/components/xiaoyouxi/onlyindex')), 'OnlyIndex') //分享的小游戏首页
const OnlySharePage = r => require.ensure([], () => r(require('@/components/xiaoyouxi/onlysharePage')), 'OnlySharePage') //分享的小游戏首页
const GameMine = r => require.ensure([], () => r(require('@/components/xiaoyouxi/mine')), 'GameMine') //小游戏排行榜
const zhDetail = r => require.ensure([], () => r(require('@/components/xiaoyouxi/zhdetail')), 'zhDetail') //小游戏排行榜
const txApply = r => require.ensure([], () => r(require('@/components/xiaoyouxi/txApply')), 'txApply') //提现申请
const txrecord = r => require.ensure([], () => r(require('@/components/xiaoyouxi/txrecord')), 'txrecord') //提现记录
const tiku = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/tiku')), 'tiku') //提现记录
const timulist = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/timulist')), 'timulist') //题目列表
const Course = r => require.ensure([], () => r(require('@/components/xiaoyouxi/course')), 'game')

const problemAdd = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/add')), 'problemAdd') //题目列表
const sharelist = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/sharelist')), 'sharelist') //题目列表
const singleAdd = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/singleAdd')), 'singleAdd') //题目列表
const problemEdit = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/edit')), 'problemEdit') //题目列表
const setAds = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/setAds')), 'setAds') // 设置广告
const editAds = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/editAds')), 'editAds') // 编辑广告
const setHongbao = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/setHongbao')), 'setHongbao') // 设置红包
const exam = r => require.ensure([], () => r(require('@/components/xiaoyouxi/startChallenge/exam')), 'exam') // 考试题目
const gameRule = r => require.ensure([], () => r(require('@/components/xiaoyouxi/gameRule')), 'gameRule') // 游戏规则
const kefu = r => require.ensure([], () => r(require('@/components/xiaoyouxi/kefu')), 'kefu') // 游戏规则
const jPing = r => require.ensure([], () => r(require('@/components/xiaoyouxi/jPing/jPing')), 'jPing') // 游戏规则
const userDetail = r => require.ensure([], () => r(require('@/components/xiaoyouxi/chuti/userDetail')), 'userDetail') // 游戏规则
const sharePage = r => require.ensure([], () => r(require('@/components/xiaoyouxi/share/sharePage')), 'sharePage') // 游戏规则
const shareExam = r => require.ensure([], () => r(require('@/components/xiaoyouxi/share/shareExam')), 'shareExam') // 游戏规则

//发布
const FabuIndex = r => require.ensure([], () => r(require('@/components/fabu/index')), 'Fabu') // 游戏规则
// 黄页
const yellowPages = r => require.ensure([], () => r(require('@/components/yellowPages/index')), 'yellowPages') // 社区
const homePage = r => require.ensure([], () => r(require('@/components/yellowPages/homePage')), 'homePage') // 社区
const addCompany = r => require.ensure([], () => r(require('@/components/yellowPages/addCompany')), 'addCompany') // 社区
const mineCompany = r => require.ensure([], () => r(require('@/components/yellowPages/mineCompany')), 'mineCompany') // 社区
const addzizhi = r => require.ensure([], () => r(require('@/components/yellowPages/addzizhi')), 'addzizhi') // 社区
const addZZ = r => require.ensure([], () => r(require('@/components/yellowPages/zuzhi/add')), 'addZZ') // 社区
const editZZ = r => require.ensure([], () => r(require('@/components/yellowPages/zuzhi/edit')), 'editZZ') // 社区
const project = r => require.ensure([], () => r(require('@/components/yellowPages/project')), 'project') // 社区
const projectAdd = r => require.ensure([], () => r(require('@/components/yellowPages/project/add')), 'projectAdd') // 社区
const projectEdit = r => require.ensure([], () => r(require('@/components/yellowPages/project/edit')), 'projectEdit') // 社区
const projectDetail = r => require.ensure([], () => r(require('@/components/yellowPages/project/detail')),
  'projectDetail') // 社区
const companyEdit = r => require.ensure([], () => r(require('@/components/yellowPages/company/edit')), 'companyEdit') // 社区
const companyClaim = r => require.ensure([], () => r(require('@/components/yellowPages/companyClaim')), 'companyClaim') // 企业认领
const companyList = r => require.ensure([], () => r(require('@/components/yellowPages/list')), 'yellowPages') // 活动合作直播列表
//社区
//社区

const SheQuIndex = r => require.ensure([], () => r(require('@/components/shequ/index')), 'shequ') // 社区
const SheQuGuanZhu = r => require.ensure([], () => r(require('@/components/shequ/guanzhu')), 'shequ') // 我的关注
const SheQuFaBu = r => require.ensure([], () => r(require('@/components/shequ/fabu')), 'shequ') // 发布
const SheQuDetail = r => require.ensure([], () => r(require('@/components/shequ/detail')), 'shequ') // 社区详情
const SheQuJuBao = r => require.ensure([], () => r(require('@/components/shequ/jubao')), 'shequ') // 举报
const SheQuHistory = r => require.ensure([], () => r(require('@/components/shequ/history')), 'shequ') // 举报
const SheQuPingLun = r => require.ensure([], () => r(require('@/components/shequ/pinglun')), 'shequ') // 评论
const SheQuVideo = r => require.ensure([], () => r(require('@/components/shequ/video')), 'shequ') // 评论Q
//项目
const ProjectIndex = r => require.ensure([], () => r(require('@/components/project/index')), 'project') // 项目首页
const News = r => require.ensure([], () => r(require('@/components/project/news')), 'project') //拟建信息
const ZhaoCai = r => require.ensure([], () => r(require('@/components/project/zhaocai')), 'project') //招采信息
const Searched = r => require.ensure([], () => r(require('@/components/project/searched')), 'project') //招采信息搜索
const Subject = r => require.ensure([], () => r(require('@/components/project/Subject')), 'project') //项目概况
const ZhaoBiao = r => require.ensure([], () => r(require('@/components/project/zhaobiao')), 'project') //招标记录
const JiaFang = r => require.ensure([], () => r(require('@/components/project/jiafang')), 'project') //甲方记录
const jiafangDetail = r => require.ensure([], () => r(require('@/components/project/jiafangDetail')), 'project') //甲方详情
const ZhongBiao = r => require.ensure([], () => r(require('@/components/project/zhongbiao')), 'project') // 中标单位数据分析
const YiFang = r => require.ensure([], () => r(require('@/components/project/yifang')), 'project') // 乙方中标记录
const DaiLi = r => require.ensure([], () => r(require('@/components/project/daili')), 'project') // 招标代理
const JiGouDetail = r => require.ensure([], () => r(require('@/components/project/jigouDetail')), 'project') // 代理机构详情
const DailiZhaobiao = r => require.ensure([], () => r(require('@/components/project/dailiZhaobiao')), 'project') // 代理机构代理招标
const DailiYiFang = r => require.ensure([], () => r(require('@/components/project/dailiyifang')), 'project') //历史乙方
const BiaoSearch = r => require.ensure([], () => r(require('@/components/project/biaosearch')), 'project') //标搜索
const DingYueSearch = r => require.ensure([], () => r(require('@/components/project/dingyuesearch')), 'project') //订阅选项卡
const Searching = r => require.ensure([], () => r(require('@/components/project/searching')), 'project') //订阅选项卡
const ZhongBiaoSearch = r => require.ensure([], () => r(require('@/components/project/zhongbiaosearch')), 'project') //中标搜索
const ZhongBiaoDetail = r => require.ensure([], () => r(require('@/components/project/zhongbiaodetail')), 'project') //中标详情
const ProDetail = r => require.ensure([], () => r(require('@/components/project/ProDetails')), 'project') //项目详情
const GouSearch = r => require.ensure([], () => r(require('@/components/project/gousearch')), 'project') //关联的代理机构搜索
const LiShiZhongBiao = r => require.ensure([], () => r(require('@/components/project/lishizhongbiao')), 'project') //历史中标
const DiaLiJiGou = r => require.ensure([], () => r(require('@/components/project/dialijigou')), 'project') //招标代理机构
const ZhaoCaiJiLu = r => require.ensure([], () => r(require('@/components/project/zhaocaijilu')), 'project') //
const DaiFang = r => require.ensure([], () => r(require('@/components/project/daifang')), 'project') //代理关联甲方
const XiangMu = r => require.ensure([], () => r(require('@/components/project/xiangmu')), 'project') //代理关联甲方
const ZhaoZhongDetail = r => require.ensure([], () => r(require('@/components/project/zhaozhongdetail')), 'project') //招中标详情
const LianXi = r => require.ensure([], () => r(require('@/components/project/lianxi')), 'project') //招标联系单位
const DaiLian = r => require.ensure([], () => r(require('@/components/project/dailian')), 'project') //代理联系单位
// 弱电资讯
const InformationIndex = r => require.ensure([], () => r(require('@/components/information/index')), 'information') // 资讯首页
const InforSearch = r => require.ensure([], () => r(require('@/components/information/inforsearch')), 'information') //首页搜索
const Release = r => require.ensure([], () => r(require('@/components/information/release')), 'information') //发布新闻
const ProNews = r => require.ensure([], () => r(require('@/components/information/pronews')), 'information') //发布新品
const Details = r => require.ensure([], () => r(require('@/components/information/details')), 'information') //企业、行业详情
const PostingDetail = r => require.ensure([], () => r(require('@/components/information/postingdetail')), 'information') //个人发布详情
const InforPerson = r => require.ensure([], () => r(require('@/components/information/myindex')), 'information') //个人中心我的资讯列表
const InforNewEdit = r => require.ensure([], () => r(require('@/components/information/newedit')), 'information') //新闻发布编辑
const InforNewpEdit = r => require.ensure([], () => r(require('@/components/information/newpedit')), 'information') //新闻发布编辑

//投票频道
const VoteIndex = r => require.ensure([], () => r(require('@/components/vote/index')), 'vote') //投票频道首页
const VoteList = r => require.ensure([], () => r(require('@/components/vote/list')), 'vote') //投票频道列表
const VoteMore1 = r => require.ensure([], () => r(require('@/components/vote/more1')), 'vote') //投票频道更多1列表
const VoteMore2 = r => require.ensure([], () => r(require('@/components/vote/more2')), 'vote') //投票频道更多1列表
const VoteDetail = r => require.ensure([], () => r(require('@/components/vote/detail')), 'vote') //单个投票页面
const VotePresent = r => require.ensure([], () => r(require('@/components/vote/present')), 'vote') //送礼品
const VotePosition = r => require.ensure([], () => r(require('@/components/vote/position')), 'vote') //当前排名
const VoteEnroll = r => require.ensure([], () => r(require('@/components/vote/enroll')), 'vote') //投票征集
const VoteEnrolist = r => require.ensure([], () => r(require('@/components/vote/enrolist')), 'vote') //征集列表
const VoteEnrodetail = r => require.ensure([], () => r(require('@/components/vote/enrodetail')), 'vote') //征集列表详情
const VoteSelectrule = r => require.ensure([], () => r(require('@/components/vote/selectRule')), 'vote') //海选规则介绍
// const VoteMore = r => require.ensure([], () => r(require('@/components/vote/VoteMore')), 'vote') //投票详情介绍
const VoteWrite = r => require.ensure([], () => r(require('@/components/vote/write')), 'vote') //征集选手填写
const VoteCode = r => require.ensure([], () => r(require('@/components/vote/code')), 'vote') //分享海报


//尾货
const TailcargoIndex = r => require.ensure([], () => r(require('@/components/tailcargo/index')), 'tailcargo') //尾货首页
const TailcargoNews = r => require.ensure([], () => r(require('@/components/tailcargo/news')), 'tailcargo') //尾货我的消息
const TailcargoCollect = r => require.ensure([], () => r(require('@/components/tailcargo/collect')), 'tailcargo') //尾货我的收藏
const TailcargoGofa = r => require.ensure([], () => r(require('@/components/tailcargo/gofa')), 'tailcargo') //尾货发货
const TailcargoYuyue = r => require.ensure([], () => r(require('@/components/tailcargo/yuyue')), 'tailcargo') //尾货预约代发货
const TailcargoQaddress = r => require.ensure([], () => r(require('@/components/tailcargo/qaddress')), 'tailcargo') //尾货确认地址
const TailcargoExpress = r => require.ensure([], () => r(require('@/components/tailcargo/express')), 'tailcargo') //尾货物流
const TailcargoT = r => require.ensure([], () => r(require('@/components/tailcargo/tuihuo')), 'tailcargo') //尾货确认退货详情
const TailcargoTS = r => require.ensure([], () => r(require('@/components/tailcargo/tuihuo_shenqing')), 'tailcargo') //退货申请
const TailcargoQ = r => require.ensure([], () => r(require('@/components/tailcargo/qdth')), 'tailcargo') //尾货同意退货退货详情
const TailcargoSC = r => require.ensure([], () => r(require('@/components/tailcargo/shipping_confirm')), 'tailcargo') //尾货同意退货退货详情


//尾货商城
const ShopWallet = r => require.ensure([], () => r(require('@/components/tailcargo/wallet')), 'tailcargo')//我的钱包
const TailcargoPerson = r => require.ensure([], () => r(require('@/components/tailcargo/person')), 'tailcargo') //尾货个人中心
const AddShop = r => require.ensure([], () => r(require('@/components/tailcargo/addshop')), 'tailcargo')//添加尾货
const EditShop = r => require.ensure([], () => r(require('@/components/tailcargo/editshop')), 'tailcargo')//添加尾货
const ShopDetail = r => require.ensure([], () => r(require('@/components/tailcargo/shopdetails')), 'tailcargo')//商品详情
const TailcargoOrder = r => require.ensure([], () => r(require('@/components/tailcargo/order')), 'tailcargo') //尾货订单详情
const AddAddress = r => require.ensure([], () => r(require('@/components/tailcargo/addaddress')), 'tailcargo') //尾货添加地址
const ReturnAddress = r => require.ensure([], () => r(require('@/components/tailcargo/returnaddress')), 'tailcargo') //尾货添加地址
const MyOrder = r => require.ensure([], () => r(require('@/components/tailcargo/myorder')), 'tailcargo') //我的订单
const ShopClass = r => require.ensure([], () => r(require('@/components/tailcargo/shopclass')), 'tailcargo') //商品分类
const MyShop = r => require.ensure([], () => r(require('@/components/tailcargo/myshop')), 'tailcargo') //我的尾货
const ShopOrder = r => require.ensure([], () => r(require('@/components/tailcargo/shoporder')), 'tailcargo') //尾货订单
const ShopList = r => require.ensure([], () => r(require('@/components/tailcargo/shoplist')), 'tailcargo') //商品列表
const BrandList = r => require.ensure([], () => r(require('@/components/tailcargo/brandlist')), 'tailcargo') //商品品牌列表
const OrderInfo = r => require.ensure([], () => r(require('@/components/tailcargo/orderinfo')), 'tailcargo') // 订单详情页
const ShopComment = r => require.ensure([], () => r(require('@/components/tailcargo/shopcomment')), 'tailcargo') //交易评论
const ShopCommentOver = r => require.ensure([], () => r(require('@/components/tailcargo/shopcommentover')), 'tailcargo') //交易评论完成
const SelleReturn = r => require.ensure([], () => r(require('@/components/tailcargo/sellereturn')), 'tailcargo') //卖家退款售后详情
const TailcargoSend = r => require.ensure([], () => r(require('@/components/tailcargo/waitsend')), 'tailcargo') //尾货代发货
const Blacklist = r => require.ensure([], () => r(require('@/components/tailcargo/blacklist')), 'tailcargo') //黑名单
const SellCargo = r => require.ensure([], () => r(require('@/components/tailcargo/sellcargo')), 'tailcargo') //卖出的尾货
const SellerShop = r => require.ensure([], () => r(require('@/components/tailcargo/sellershop')), 'tailcargo') //ta的尾货
const ShopReview = r => require.ensure([], () => r(require('@/components/tailcargo/shop_review')), 'tailcargo') //ta的尾货
const RefoundDetail = r => require.ensure([], () => r(require('@/components/tailcargo/refound_detail')), 'tailcargo') //ta的尾货
const EditAddress = r => require.ensure([], () => r(require('@/components/tailcargo/edit_address')), 'tailcargo') // 编辑收货地址
const ShopOrder2 = r => require.ensure([], () => r(require('@/components/tailcargo/shoporder2')), 'tailcargo') //尾货订单
// const EditAddress = r => require.ensure([], () => r(require('@/components/tailcargo/edit_address')), 'tailcargo') // 编辑收货地址



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: Index
          },
          meta: {
            title: '平台首页'
          }
        }
      ]
    },
    //发布
    {
      path: '/fabu',
      components: { //路由匹配多个模块
        default: View
      },
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: FabuIndex
          },
          meta: {
            title: '发布'
          }
        },
      ]
    },
    /********************帮助中心**************************/
    {
      path: '/help',
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: HelpIndex
          },
          meta: {
            title: '帮助中心'
          }
        },
        {
          path: 'main/:id',
          components: { //详情
            default: HelpMain
          },
          meta: {
            title: '帮助中心'
          }
        },
      ]
    },
    /********************竞价**************************/
    {
      path: '/jingjia',
      components: { //路由匹配多个模块
        default: View
      },
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index/:id',
          components: { //首页
            default: JingjiaIndex
          },
          meta: {
            title: '竞价频道'
          }
        },
      ]
    },
    /********************消息**************************/
    {
      path: '/msg',
      components: { //路由匹配多个模块
        default: View
      },
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          meta: {
            keepalive: true
          },
          components: { //首页
            default: MsgIndex
          },
          meta: {
            title: '消息中心'
          }
        },
        {
          path: 'tcw/:id/',
          components: { //聊天
            default: MsgTcw
          },
          meta: {
            title: '消息中心'
          }
        },
        {
          path: 'system',
          components: { //系统消息
            default: MsgSystem
          },
          meta: {
            title: '消息中心'
          }
        },
        {
          path: 'complaint/:tid', //tid被投诉人id //pid项目id //type项目类型
          components: { //投诉某个用户
            default: MsgComplaint
          },
          meta: {
            title: '消息中心'
          }
        },
        {
          path: 'detail/:id',
          components: {
            default: MsgDetail
          },
          meta: {
            title: '消息中心'
          }
        }
      ]
    },
    /********************直播**************************/
    {
      path: '/zhibo',
      components: { //路由匹配多个模块
        default: View
      },
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: Zhibo
          },
          meta: {
            title: '直播频道',
            keepalive: true
          }
        },
        {
          path: 'add',
          components: { //发布
            default: ZhiboAdd
          },
          meta: {
            title: '直播频道'
          }
        },
        {
          path: 'edit/:id',
          components: { //编辑
            default: ZhiboEdit
          },
          meta: {
            title: '直播频道'
          }
        },
        {
          path: 'details/:id',
          components: { //详情
            default: ZhiboDetails
          },
          meta: {
            title: '直播频道'
          }
        },
        {
          path: 'jubao/:id',
          components: { //详情
            default: ZhiboJuBao
          },
          meta: {
            title: '直播频道'
          }
        },
        {
          path: 'course',
          components: { //详情
            default: ZhiboCourse
          },
          meta: {
            title: '直播频道'
          }
        },
        {
          path: 'myindex',
          components: { //详情
            default: ZhiboPerson
          },
          meta: {
            title: '直播频道'
          }
        },

      ]
    },
    /********************合作**************************/
    {
      path: '/hezuo',
      components: { //路由匹配多个模块
        default: View
      },
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: Hezuo
          },
          meta: {
            title: '合作频道'
          }
        },
        {
          path: 'add',
          components: { //发布合作
            default: HezuoAdd
          },
          meta: {
            title: '合作频道'
          }
        },
        {
          path: 'addok/:id',
          components: { //发布合作
            default: HezuoAddOk
          },
          meta: {
            title: '合作频道'
          }
        },
        {
          path: 'details/:id',
          components: { //详情
            default: HezuoDetails
          },
          meta: {
            title: '合作频道'
          }
        },
        {
          path: 'apply/:id',
          components: { //申请
            default: HezuoApply
          },
          meta: {
            title: '合作频道'
          }
        },
        {
          path: 'userList/:id',
          components: { //申请
            default: HezuoUserList
          },
          meta: {
            title: '合作频道'
          }
        },
        {
          path: 'edit/:id',
          components: { //申请
            default: HezuoEdit
          },
          meta: {
            title: '合作频道'
          }
        },
        {
          path: 'joindetail',
          components: { //申请
            default: HezuoJoinDetail
          },
          meta: {
            title: '合作频道'
          }
        },
        {
          path: 'myindex',
          components: { //申请
            default: HezuoPerson
          },
          meta: {
            title: '合作频道'
          }
        },

      ]
    },
    /********************活动**************************/
    {
      path: '/huodong',
      components: { //路由匹配多个模块
        default: View
      },
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: Huodong
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'add',
          components: { //活动
            default: HuodongAdd
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'addok/:id',
          components: { //活动
            default: HuodongAddOk
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'details/:id',
          components: { //详情
            default: HuodongDetails
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'signup/:id',
          components: { //参加活动
            default: HuodongSignup
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'baoming/:id',
          components: { //参加活动
            default: HuodongBaoming
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'info/:id/:type/:money/', //当前活动的ID  type 支付类型  money钱数
          components: { //参加活动
            default: HuodongInfo
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'moreinfo/:id/:type/:money/', //当前活动的ID  type 支付类型  money钱数 changci_id 场次
          components: { //参加活动
            default: HuodongMoreInfo
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'pay/:id/:money/:name/:phone/:fq_memid',
          components: { //参加活动
            default: HuodongPay
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'payEnd',
          components: { //参加活动
            default: HuodongPayEnd
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'yanzheng/:id',
          components: { //参加活动
            default: HuodongYanZheng
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'code/:id',
          components: { //参加活动
            default: HuodongCode
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'userList/:id',
          components: { //参加活动
            default: HuodonguserList
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'userListmore/:id',
          components: { //参加活动
            default: HuodonguserListMore
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'myindex',
          components: { //参加活动
            default: HuodonMyList
          },
          meta: {
            title: '活动频道'
          }
        },

        {
          path: 'edit/:id',
          components: { //申请
            default: HuodongEdit
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'tixian/:id',
          components: {
            default: HuodongTiXian
          },
          meta: {
            title: '活动频道'
          }
        },
        {
          path: 'hesuan/:money/:money1/:id',
          components: {
            default: HuodongHeSuan
          },
          meta: {
            title: '活动频道'
          }
        }
      ]
    },
    /********************个人中心**************************/
    {
      path: '/user',
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: User
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'usershow/:id',
          components: { //个人中心展示
            default: UserShow
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'updata',
          components: { //完善个人资料
            default: UserUpData
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'uprealname',
          components: { //实名认证
            default: UserUpRealname
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'upmyskill',
          components: { //我的技能
            default: UserUpMyskill
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'upmycertificate',
          components: { //我的证书
            default: UserUpMycertificate
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'usersetupindex',
          components: { //账户管理
            default: UserSetupIndex
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'usersetupcphone',
          components: { //修改手机号
            default: UserSetupCphone
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'usermyattention',
          components: { //我的订阅/关注
            default: UserMyAttention
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'mycollection',
          components: { //收藏
            default: UserMyCollection
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'history',
          components: { //历史
            default: UserMyhistory
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'QRcode',
          components: { //二维码
            default: UserMyQRcode
          },
          meta: {
            title: '邀请有礼'
          }
        },
        {
          path: 'myrecharge',
          components: { //充值
            default: UserMyrecharge
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'mycwdl/:type',
          components: { //提现
            default: UserMycwdl
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'mymdetailed',
          components: { //明细
            default: UserMymdetailed
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'myteam',
          components: { //团队
            default: UserMyteam
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'feedback',
          components: { //意见反馈
            default: UserFeedback
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'join',
          components: { //我参与的
            default: UserJoin
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'fabushequ',
          components: { //意见反馈
            default: UserFabuShequ
          },
          meta: {
            title: '会员中心'
          }
        },
        {
          path: 'article',
          components: { //  项目订阅
            default: Article
          },
          meta: {
            title: '会员中心'
          }
        }
      ]
    },
    /********************搜索**************************/
    {
      path: '/search',
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: searchIndex
          },
          meta: {
            title: '搜索'
          }
        },
      ]
    },
    /********************登录注册**************************/
    {
      path: '/login',
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'login'
        },
        {
          path: 'login',
          components: { //登录
            default: Login
          },
          meta: {
            title: '登录'
          }
        },
        {
          path: 'register',
          components: { //注册
            default: Register
          },
          meta: {
            title: '注册'
          }
        },
        {
          path: 'ceshi',
          components: { //注册
            default: Ceshi
          }
        },
        {
          path: 'usersetupfpassword',
          components: { //忘记密码
            default: UserSetupFpassword
          },
          meta: {
            title: '忘记密码'
          }
        },
        {
          path: 'binding',
          components: { //绑定手机号
            default: UserMybinding
          },
          meta: {
            title: '会员中心'
          }
        },
      ]
    },
    /********************小游戏**************************/
    {
      path: '/game',
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: GameIndex
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'RankIndex',
          components: { //首页
            default: RankIndex
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'onlypaihang',
          components: { //分享的排行榜
            default: OnlyPaihang
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'onlyindex',
          components: { //分享的首页
            default: OnlyIndex
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'onlysharePage',
          components: { //分享的题库列表页
            default: OnlySharePage
          },
          meta: {
            title: '赛事频道'
          }
        },

        {
          path: 'GameMine',
          components: {
            default: GameMine
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'zhDetail',
          components: {
            default: zhDetail
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'txApply',
          components: {
            default: txApply
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'txrecord',
          components: {
            default: txrecord
          },
          meta: {
            title: '赛事频道'
          }
        },

        {
          path: 'tiku',
          components: {
            default: tiku
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'timulist/:id',
          components: {
            default: timulist
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'problemAdd',
          components: {
            default: problemAdd
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'sharelist',
          components: {
            default: sharelist
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'singleAdd/:id/:hangyeid',
          components: {
            default: singleAdd
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'problemEdit/:id',
          components: {
            default: problemEdit
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'setAds/:id',
          components: {
            default: setAds
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'editAds/:id',
          components: {
            default: editAds
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'setHongbao/:id',
          components: {
            default: setHongbao
          },
          meta: {
            title: '赛事频道'
          }
        }, {
          path: 'userDetail/:id',
          components: {
            default: userDetail
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'exam',
          components: {
            default: exam
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'gameRule',
          components: {
            default: gameRule
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'kefu',
          components: {
            default: kefu
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'jPing',
          components: {
            default: jPing
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'sharePage',
          components: {
            default: sharePage
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'shareExam',
          components: {
            default: shareExam
          },
          meta: {
            title: '赛事频道'
          }
        },
        {
          path: 'course',
          components: {
            default: Course
          },
          meta: {
            title: '赛事频道'
          }
        }
      ]
    },

    /********************黄页**************************/
    {
      path: '/yellowPages',
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: yellowPages
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'addCompany',
          components: { //首页
            default: addCompany
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'mineCompany',
          components: { //首页
            default: mineCompany
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'addzizhi',
          components: { //首页
            default: addzizhi
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'addZZ',
          components: { //首页
            default: addZZ
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'editZZ',
          components: { //首页
            default: editZZ
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'project',
          components: { //首页
            default: project
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'projectAdd',
          components: { //首页
            default: projectAdd
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'projectEdit',
          components: { //首页
            default: projectEdit
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'projectDetail',
          components: { //首页
            default: projectDetail
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'companyEdit',
          components: { //首页
            default: companyEdit
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'homePage',
          components: { //首页
            default: homePage
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'companyClaim',
          components: { //首页
            default: companyClaim
          },
          meta: {
            title: '企业名录'
          }
        },
        {
          path: 'list/:type/:uid',
          components: {
            default: companyList
          },
          meta: {
            title: '赛事频道'
          }
        }
      ]
    },
    //社区
    {
      path: '/shequ',
      components: { //路由匹配多个模块
        default: View
      },
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next();
        } else {
          next('/login');
        }
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: SheQuIndex
          },
          meta: {
            title: '社区'
          }
        },
        {
          path: 'guanzhu',
          components: { //首页
            default: SheQuGuanZhu
          },
          meta: {
            title: '社区'
          }
        },

        {
          path: 'fabu/:type',
          components: { //首页
            default: SheQuFaBu
          },
          meta: {
            title: '社区'
          }
        },
        {
          path: 'detail/:id/:type/:des',
          components: { //首页
            default: SheQuDetail
          },
          meta: {
            title: '社区'
          }
        },
        {
          path: 'jubao/:id',
          components: { //首页
            default: SheQuJuBao
          },
          meta: {
            title: '社区'
          }
        },
        {
          path: 'history/:id',
          components: { //首页
            default: SheQuHistory
          },
          meta: {
            title: '社区'
          }
        },
        {
          path: 'pinglun/',
          components: { //首页
            default: SheQuPingLun
          },
          meta: {
            title: '社区'
          }
        },
        {
          path: 'video/',
          components: { //首页
            default: SheQuVideo
          },
          meta: {
            title: '社区'
          }
        },

      ]
    },
    //项目
    {
      path: '/project',
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: ProjectIndex
          },
          meta: {
            title: '项目频道',
            keepalive: true
          }
        },
        {
          path: 'news',
          components: { //招采信息
            default: News
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'subject/:id/:type/:is_error',
          components: { //项目概况
            default: Subject
          },
          meta: {
            title: '项目频道'
          }
        },

        // {
        // 	path:'subject',
        // 	components:{  //项目概况
        // 		default:Subject
        // 	},
        // 	meta:{
        // 		title: '项目频道'
        // 	}
        // },
        {
          path: 'zhaobiao',
          components: { //招标记录
            default: ZhaoBiao
          },
          meta: {
            title: '项目频道'
          }
        },

        // {
        // 	path:'zhaobiao/:id/:des/:cen/:company_id',
        // 	components:{  //招标记录
        // 		default:ZhaoBiao
        // 	},
        // 	meta:{
        // 		title: '项目频道'
        // 	}
        // },

        {
          path: 'jiafang',
          components: { //招标记录
            default: JiaFang
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'jiafangDetail',
          components: { //甲方详情
            default: jiafangDetail
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'zhongbiao',
          components: { //中标
            default: ZhongBiao
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'yifang',
          components: { //中标
            default: YiFang
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'daili',
          components: { //中标
            default: DaiLi
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'jigouDetail',
          components: { //中标
            default: JiGouDetail
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'dailiZhaobiao',
          components: { //中标
            default: DailiZhaobiao
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'dailiyifang',
          components: { //中标
            default: DailiYiFang
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'zhaocai',
          components: { //招采信息
            default: ZhaoCai
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'searched',
          components: { //招采信息搜索
            default: Searched
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'biaosearch',
          components: { //招标信息搜索
            default: BiaoSearch
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'dingyuesearch',
          components: { //订阅选项卡
            default: DingYueSearch
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'searching',
          components: { //订阅选项卡搜索
            default: Searching
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'zhongbiaosearch',
          components: { //中标搜索
            default: ZhongBiaoSearch
          },
          meta: {
            title: '项目频道'
          }
        },

        {
          path: 'zhongbiaodetail/:id/:des',
          components: { //中标详情
            default: ZhongBiaoDetail
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'ProDetails/:id/:des/:type',
          components: { //中标详情
            default: ProDetail
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'gousearch',
          components: { //关联的代理机构搜索
            default: GouSearch
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'lishizhongbiao',
          components: { //历史中标
            default: LiShiZhongBiao
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'dialijigou',
          components: { //招标代理机构
            default: DiaLiJiGou
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'zhaocaijilu',
          components: { //招标代理机构
            default: ZhaoCaiJiLu
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'daifang',
          components: { //代理关联甲方
            default: DaiFang
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'xiangmu',
          components: { //新增项目
            default: XiangMu
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'zhaozhongdetail',
          components: { //招中详情
            default: ZhaoZhongDetail
          },
          meta: {
            title: '项目频道'
          }
        },
        {
          path: 'lianxi',
          components: { //招标联系单位
            default: LianXi
          },
          meta: {
            title: '项目频道'
          }
        },

        {
          path: 'dailian',
          components: { //代理联系单位
            default: DaiLian
          },
          meta: {
            title: '项目频道'
          }
        },
      ]
    },
    //弱电资讯
    {
      path: '/information',
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index/:cut',
          components: { //首页
            default: InformationIndex
          },
          meta: {
            title: '弱电资讯'
          }
        },
        {
          path: 'release',
          components: { //发布新闻
            default: Release
          },
          meta: {
            title: '弱电资讯'
          }
        },
        {
          path: 'details/:id/:des',
          components: { //详情
            default: Details
          },
          meta: {
            title: '弱电资讯'
          }
        },
        {
          path: 'pronews',
          components: { //发布新品
            default: ProNews
          },
          meta: {
            title: '弱电资讯'
          }
        },
        {
          path: 'postingdetail',
          components: { //个人发布
            default: PostingDetail
          },
          meta: {
            title: '弱电资讯'
          }
        },
        {
          path: 'inforsearch',
          components: { //搜索
            default: InforSearch
          },
          meta: {
            title: '弱电资讯'
          }
        },
        {
          path: 'myindex',
          components: { //搜索
            default: InforPerson
          },
          meta: {
            title: '我的资讯'
          }
        },
        {
          path: 'newedit/:id',
          components: { //搜索
            default: InforNewEdit
          },
          meta: {
            title: '编辑新闻'
          }
        },
        {
          path: 'newpedit/:id',
          components: { //搜索
            default: InforNewpEdit
          },
          meta: {
            title: '编辑新品'
          }
        },
      ]
    },
    //投票频道
    {
      path: '/vote',
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next('/login')
        }
      },
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: VoteIndex
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'more1/:id',
          components: { //首页
            default: VoteMore1
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'more2/:vote_select_id',
          components: { //首页
            default: VoteMore2
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'selectRule/:id',
          components: { //海选规则
            default: VoteSelectrule
          },
          meta: {
            title: '网选频道'
          }
        },
        // {
        // 	path: 'voteMore/:id',
        // 	components: { //海选规则
        // 		default: voteMore
        // 	},
        // 	meta: {
        // 		title: '网选频道'
        // 	}
        // },
        {
          path: 'list/:id',
          components: { //列表
            default: VoteList
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'detail/:id/:time/:feel/:des/:num',
          components: { //详情页
            default: VoteDetail
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'present/:id/:v_order',
          components: { //送礼品
            default: VotePresent
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'position/:id',
          components: { //排名
            default: VotePosition
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'enroll',
          components: { //排名
            default: VoteEnroll
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'enrolist/:id',
          components: { //排名
            default: VoteEnrolist
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          // path: 'enrodetail/:id/:time/:vote_id/:feel/:des/:num',
		  // id 选手的id  vote_id 参选比赛的id  v_order 选手排名
          path: 'enrodetail/:id/:vote_id/:v_order',
          components: { //排名
            default: VoteEnrodetail
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'write/:id',
          components: { //征集选手填写
            default: VoteWrite,
          },
          meta: {
            title: '网选频道'
          }
        },
        {
          path: 'code/:id/:feel',
          components: { //征集选手填写
            default: VoteCode
          },
          meta: {
            title: '网选频道'
          }
        }

      ]

    },
    {
      path: '/tailcargo',
      components: { //路由匹配多个模块
        default: View
      },
      children: [{
          path: '/',
          redirect: 'index'
        },
        {
          path: 'index',
          components: { //首页
            default: TailcargoIndex
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'news',
          components: { //消息
            default: TailcargoNews
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'collect',
          components: { //首页
            default: TailcargoCollect
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'order',
          components: { //首页
            default: TailcargoOrder
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'addaddress',
          components: { //首页
            default: AddAddress
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'returnaddress',
          components: { //首页
            default: ReturnAddress
          },
          meta: {
            title: '尾货退货地址'
          }
        },
        {
          path: 'myorder',
          components: { //首页
            default: MyOrder
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'shopclass',
          components: { //首页
            default: ShopClass
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'myshop',
          components: { //首页
            default: MyShop
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'shoporder',
          components: { //首页
            default: ShopOrder
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'shoporder2',
          components: { // 待发尾货
            default: ShopOrder2
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'shoplist',
          components: { //首页
            default: ShopList
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'brandlist',
          components: { //品牌列表
            default: BrandList
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'orderinfo',
          components: { //订单详情
            default: OrderInfo
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'shopcomment',
          components: { //首页
            default: ShopComment
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'shopcommentover',
          components: { //首页
            default: ShopCommentOver
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'sellereturn',
          components: { //首页
            default: SelleReturn
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'blacklist',
          components: { //首页
            default: Blacklist
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'sellcargo',
          components: { //首页
            default: SellCargo
          },
          meta: {
            title: '尾货'
          }
        },

        {
          path: 'shop_review',
          components: { // TA的评价
            default: ShopReview
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'refound_detail',
          components: { // TA的评价
            default: RefoundDetail
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'edit_address',
          components: { // 编辑收货地址
            default: EditAddress
          },
          meta: {
            title: '尾货'
          }
        },
        // {
        //   path: 'shouhou_chuli',
        //   components: { //售后处理
        //     default: ShouHouChuLi
        //   },
        //   meta: {
        //     title: '尾货'
        //   }
        // },
        {
          path: 'sellershop',
          components: { //首页
            default: SellerShop
          },
          meta: {
            title: '尾货'
          }
        },
        {
          path: 'person',
          components: { //首页
            default: TailcargoPerson
          },
          meta: {
            title: '商城'
          }
        },
        {
          path: 'waitsend',
          components: { //首页
            default: TailcargoSend
          },
          meta: {
            title: '商城'
          }
        },
        {
          path: 'gofa',
          components: { //首页
            default: TailcargoGofa
          },
          meta: {
            title: '商城'
          }
        },
        {
          path: 'yuyue',
          components: { //首页
            default: TailcargoYuyue
          },
          meta: {
            title: '商城'
          }
        },
        {
          path: 'qaddress',
          components: { //首页
            default: TailcargoQaddress
          },
          meta: {
            title: '商城'
          }
        },
        {
          path: 'express',
          components: { //首页
            default: TailcargoExpress
          },
          meta: {
            title: '商城'
          }
        },
        {
          path: 'wallet',
          components: { //我的钱包
            default: ShopWallet
          },
          meta: {
            title: '我的钱包'
          }
        },
        {
          path: 'addshop',
          components: {
            default: AddShop
          },
          meta: {
            title: '新增尾货'
          }
        },
        {
          path: 'editshop',
          components: {
            default: EditShop
          },
          meta: {
            title: '编辑尾货'
          }
        },
        {
          path: 'shopdetails',
          components: {
            default: ShopDetail
          },
          meta: {
            title: '商品详情'
          }
        },

        {
          path: 'tuihuo',
          components: { //我的钱包
            default: TailcargoT
          },
          meta: {
            title: '我的钱包'
          }
        },
        {
          path: 'tuihuo_shenqing',
          components: { //我的钱包
            default: TailcargoTS
          },
          meta: {
            title: '我的钱包'
          }
        },
        {
          path: 'qtuihuo',
          components: { //我的钱包
            default: TailcargoQ
          },
          meta: {
            title: '我的钱包'
          }
        },
        {
          path: 'shipping_confirm',
          components: { //确认发货
            default: TailcargoSC
          },
          meta: {
            title: '确认发货'
          }
        }
      ]
    }
  ]
})
