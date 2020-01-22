<template>
	<div class="min">
		<!-- <x-header :left-options="{backText: ''}">{{$route.params.des}}</x-header> -->
		<vue-back1 :name='$route.params.des' :type='2' :ids='SelectInfo.vote_id'></vue-back1>
		<div class="nav">
			<div class="nav-first">
				<p>排名</p>
				<p>{{$route.params.feel}}</p>
			</div>
			<div class="nav-first nav-two">
				<p>投票数</p>
				<p>{{SelectInfo.select_ticket_num}}</p>
			</div>
			<div class="nav-first">
				<p>访问量</p>
				<p>{{SelectInfo.visit_num}}</p>
			</div>
		</div>
		<div class="time">
			<p class="time-p" v-if="time>=0">
				投票<span>结束</span>倒计时<span v-html="$options.filters.returntime5(time)"></span>
				<!-- <span>8</span> 天 <span>10 </span>小时 <span>22</span> 分 <span>45</span> 秒 -->
			</p>
			<p class="time-p " v-else="">
				<!--投票<span>结束</span>倒计时<span v-html="$options.filters.returntime5(time)"></span>-->
				投票结束
				<!-- <span>8</span> 天 <span>10 </span>小时 <span>22</span> 分 <span>45</span> 秒 -->
			</p>
		</div>

		<div style="width:100%;background:#fff">
		    <div class="treat">
		      <div>{{$route.params.num}}号&#x3000;{{SelectInfo.select_name}}</div>
          <!-- <div class="control-tou1 control-jixing" @click.stop="vote($route.params.id)">给TA拉票</div> -->
		    </div>
		</div>
		<div class="tu-pian"><img :src="$store.state.website.website_domain_name + '/uploads/' + SelectInfo.select_img"></div>

		<!-- 投票 -->
		<!-- <div class="gift"> -->
			<!-- <div  v-if="0>=time" class="gift-want gift-vote">给TA投票</div> -->
			<!-- <div class="gift-want gift-vote" v-else-if="signEnd>0">给TA投票</div> -->
			<!-- <div  @click="vote($route.params.id)" v-else-if="0 >= signEnd" class="gift-vote">给TA投票</div>
			<div class="gift-want gift-vote gift-wo" v-if="0>=time">给TA赞赏</div>
			<div class="gift-want gift-vote gift-wo" v-else-if="signEnd>0">给TA赞赏</div>
			<div @click="gifts($route.params.id,$route.params.des,$route.params.feel,$route.params.time)" v-else-if="0 >= signEnd" class="gift-vote gift-wo">给TA赞赏</div>

		</div> -->
    <!-- <div class="summary">
          <div style="width:95%;margin:10px auto 0 auto;">
            选手详情：<p v-html="SelectInfo.select_remark"></p>
          </div>
      </div> -->
		<!-- 列表 -->
    <!-- 投票列表 -->
<div class="entry">
			<div class="entry-title">投票列表</div>
			<div class="entry-list" v-for="(item,index) in RankingList" :key="index">
				<div class="list-tu">
					<div class="tu-pian"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl"></div>
					<div class="list-title">{{item.mem_nickname}}</div>
				</div>
				<div class="list-time times">
					{{item.ticket_total}}票
				</div>
			</div>
			<vue-loading :url="$store.state.url + '/Vote/voteRankingList?page=1&limit=10&vote_select_id='+$route.params.id" @ievent="loaddatas" v-if="show2"></vue-loading>
		</div>
    <!-- 赞赏列表 -->
		<div class="entry present">
			<div class="entry-title">赞赏列表</div>
			<div class="entry-list" v-for="(item,index) in array" :key='index'>
				<div class="list-tu">
					<div><img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl"></div>
					<div class="title-tu">{{item.mem_nickname}}</div>
				</div>
				<div class="list-time">
					<span>{{item.add_time | returntime1}}</span>
					<!-- <span>10：28</span> -->
				</div>
			</div>
			<vue-loading1 :url="$store.state.url + '/Vote/voteSelectHelpList?page=1&limit=10&vote_select_id='+$route.params.id" @ievent="loading" v-if="showing"></vue-loading1>
		</div>

		<!-- 投票 -->


		<!--<vue-collect></vue-collect>-->
		<!-- 底部 -->

    <!-- 简介 -->
    <div class="summary">
          <div style="width:95%;margin:10px auto 0 auto;">
            选手详情：<p v-html="SelectInfo.select_remark"></p>
          </div>
      </div>

		<div style="height:60px">
		  <div class="foot">
		    <div @click="home">平台首页</div>
		    <div @click="page">投票首页</div>
		    <div @click=present(SelectInfo.vote_id)>当前排名</div>
		    <div @click="isShowing=true">投票规则</div>
		  <!--   投票 -->
		   </div>
		  </div>

   <div class="toupiao-wrap">
      <div class="toupiao"  @click.stop="vote($route.params.id)"  v-if="0<=time">
         <div class="heart">
          <img src="/static/img/xin.png">
         </div>
        <div class="figure">投票</div>
    </div>
    </div>

		<!-- 投票弹框 -->
		<div v-transfer-dom>
			<x-dialog v-model="isShow" class="dialog-backnone" hide-on-blur>
				<div class="ding_content">
					<svg @click="isShow = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
						<path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z" class="st0" />
					</svg>
					<div class="ding-tu"><img src="/static/img/3pimrmnn.png"></div>
					<div class="des">
						<div class="ding-title">投票成功</div>
						<div class="ding-title">{{$route.params.id}}号 {{SelectInfo.select_name}}</div>
						<div class="ding_bi">+1</div>
						<div class="ding-sure" @click="sureDing($route.params.id,$route.params.des,$route.params.feel,$route.params.time)">送TA礼物加票</div>
					</div>
				</div>
			</x-dialog>
		</div>

		<div v-transfer-dom>
			<x-dialog v-model="isShowing" class="dialog-backnone" hide-on-blur>
				<div class="ding_contents">
					<svg @click="isShowing = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close coses">
						<path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z" class="st0" />
					</svg>
					<div class="rulelation">
						<p class="rule"></p>
						<p class="rule-vote">投票规则</p>

					</div>
					<div style="font-size: 14px;color:#000000">
						<p>网选规则：</p>
						<p>1.每个微信号每天有3次选投机会。</p>
						<p>2.根据发起规则可以单选或者多选。</p>
						<p>3.可根据需求给选手赞赏，赞赏票数累计到有效投票总数内。</p>
						<p>4.投票结束后，根据排名发放奖品。</p>
						<p>5.获奖选手须在10天内填写奖品寄送地址，逾期视为放弃奖品处理。</p>
						<p>6.本活动最终解释权归主办方所有。</p>
					</div>
					<div style="margin-top:20px;font-size: 14px;color:#000000">
						<p>征集规则：</p>
						<p>1.参赛者上传信息，严禁盗用他人照片等信息。</p>
						<p>2. 禁止参赛作品出现任何非法内容、言论不当等行为。</p>
						<p>3.严禁任何作弊行为，系统发现会自动对票数清空。</p>
						<p>4.作品设计著作权，肖像权等法律责任由活动参与者自行承担法律责任。</p>
						<p>5.以上行为一经发现，主办方有权删除照片并 取消参赛资格。</p>
						<p>6.禁止加入诱导关注/诱导分享内容。</p>
					</div>
				</div>
			</x-dialog>
		</div>

 <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import QRCode from 'qrcode'
	import { qrcanvas } from 'qrcanvas'
	import html2canvas from 'html2canvas'
	import { XHeader, SwiperItem, TransferDom, XDialog,} from 'vux'
	import { VueSwiper, VueCollect, VueLoading1, VueLoading,VueShareit,VueBack1} from '../component'
	export default {
		directives: {
			TransferDom
		},
		data() {
			return {
				isShow: false,
				SelectInfo: '',
				showing: true,
				array: '',
				show2: true,
				RankingList: '',
				time: '',
				isShowing: false,
				isShows: false,
				imgUrl: '',
				signEnd:'',
//				posterDataUrl:'',
//      		qrCodeUrl: 'https://www.baidu.com',

				// postcode:true
			}
		},
		components: {
			XHeader,
			VueSwiper,
			SwiperItem,
			TransferDom,
			XDialog,
			VueCollect,
			VueLoading1,
			VueLoading,
			VueShareit,
      VueBack1,
		},

			computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {

				return {
					title: this.$route.params.des,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电投票，他在智汇优库网选频道等您！',
					imgUrl: '/static/logo.png',
					link: '&id=' + this.$route.params.id +'&time=' +this.$route.params.time+'&feel='+this.$route.params.feel+"&des="+this.$route.params.des+'&num='+this.$route.params.num
				}
			},
		},
		mounted() {
//			this.createQRCode()
			this.voteSelectInfo()
			const timer = setInterval(() => {
				this.time = this.$route.params.time - (Date.parse(new Date()) / 1000)
				this.signEnd = this.SelectInfo.start_time - (Date.parse(new Date()) / 1000)
				this.signEnd--
				//			console.log(this.time)
				this.time--
			}, 10);
			// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
			this.$once('hook:beforeDestroy', () => {
				clearInterval(timer);
			})

		},
		methods: {

			voteSelectInfo() {
				var _this = this
				_this.$http.post(_this.$store.state.url + "/Vote/voteSelectInfo", {
					vote_select_id: _this.$route.params.id
				}).then(res => {
					_this.SelectInfo = res
				})
			},
			//助力列表
			loading(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.array = _this.array || [];
					_this.array.push(e);
				})
			},
			//投票列表
			loaddatas(res) {
        if(res[0].id==null){
          return
        }
				var _this = this;
				_.each(res, function(e) {
					_this.RankingList = _this.RankingList || [];
					_this.RankingList.push(e);
				})
			},

			vote(id) {
				let _this = this
				_this.$http.post(_this.$store.state.url + "/Vote/userVote", {
					vote_id: _this.SelectInfo.vote_id,
					vote_select_id: id
				}).then(res => {

					if(res == '您的票数已经用完啦！') {
						msg('您的票数已经用完啦！')
					} else if(res == '您已经为该选手投过票啦！') {
						msg('您已经为该选手投过票啦！')
					}
					else {
						_this.isShow = true
						_this.voteSelectInfo()
						_this.RankingList = []
						_this.reload1()
					}

				})
			},

			reload() {
				var _this = this;
				_this.showing = false;
				_this.$nextTick(function() {
					_this.showing = true;
				})
			},
			reload1() {
				var _this = this;
				_this.show2 = false;
				_this.$nextTick(function() {
					_this.show2 = true;
				})
			},

			gifts(id, des, feel, time) {
				this.$router.push("/vote/present/" + id + "/" + des + "/" + feel + "/" + time)
			},
			sureDing(id, des, feel, time) {
				this.$router.push("/vote/present/" + id + "/" + des + "/" + feel + "/" + time)
			},
			top() {
				this.$router.push("/vote/position")
			},
			present(id) {
				this.$router.push("/vote/position/" + id)
			},
			home() {
				this.$router.push('/index')
			},
			page() {
				this.$router.push("/vote/index")
			},
//			share(id,feel) {
//				this.isShows = true
//				this.$router.push("/vote/code/" + id + '/' + feel)
//			},

		}
	}
</script>

<style scoped>
	.min {
		background: #EAEAEA
	}

	.nav-cen,
	.nav {
		width: 100%;
		color: #F5FDFE;
		display: flex;
	}

	.nav {
		background: #05D8E8;
		padding: 15px 0;
	}

	.nav-first {
		width: 33.33%;
		text-align: center;
		/* float: left; */
	}

	.nav-two {
		border-right: 2px solid #F5FDFE;
		border-left: 2px solid #F5FDFE;
	}

	.nav-first p {
		font-size: 14px;
	}

	.time {
		width: 93%;
		margin: 10px auto 10px auto;
	}

	.time p {
		width: 100%;
		padding: 8px 0;
		background: #FFFFFF;
		border-radius: 20px;
		text-align: center;
		font-size: 14px;
		color: #999999;
	}

	.time .time-p span {
		color: #F21B1B
	}

	.treat {
		width: 93%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		align-items: center;

	}

	.treat :nth-child(1) {
		font-size: 14px;
		color: #A11C1C;
	}

	.treat :nth-child(2) {
		background: #EC5C1C;
		padding: 6px 5px;
		width: 20%;
		border-radius: 20px;
		text-align: center;
		color: #fff;
	}

	.nav-cen {
		background: #fff;
		padding: 8px 0;
	}

	.nav-cen .nav-first :nth-child(1) {
		color: #999999;
	}

	.nav-cen .nav-first :nth-child(2) {
		color: #F21B1B
	}

	.summary {
		/* padding: 10px 0 0 10px; */
		width:100%;
		margin: 10px auto 0 auto;
		/* height: 80px; */
    height:7rem;
		background: #fff;
		border-radius: 5px;
		color: #999999;
		font-size: 14px;
		max-height:7rem;
		overflow-y: scroll;
		word-wrap: break-word;
    margin-bottom:50px;
	}

	.gift {
		padding: 20px 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
    background:#fff;
    margin-top:10px;
	}

	.gift .gift-vote {
		background: #EC5C1C;
		color: #fff;
		font-size: 14px;
		width: 28%;
		padding: 5px 2px;
		text-align: center;
		border-radius: 20px;
	}

	.gift .gift-want {
		background: #999999;
	}

	.gift .gift-wo {
		margin-top: 10px
	}
   .toupiao-wrap{
     width: 100%;
     height: 50px;
     position: relative;
     position:fixed;
     bottom:20px;
     left:0;
     width: 100%;
   }
   .toupiao{
    width:50px;
    height:50px;
    position: absolute;
    top: -15px;
    left: 42%;
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: 50%;
    border:3px solid #205A9A;
    opacity:1;
    color: #FF0000;
    font-size: 12px;
     }
     .heart{
       width: 20px;
      /* height: 44px; */
       border: none;
       position: absolute;
       left: 48%;
       top:10px;
       margin-left: -8px;
     }
     .figure{
       width: 40px;
       position: absolute;
       left: 64%;
       top:30px;
       margin-left: -20px;
       border: none;
      /* font-size: 16px; */
       /* margin-top: -22px; */
     }

	.present {
		/* width:95%;
    background:#fff; */
		max-height: 200px;
		/* padding:8px 0 8px 0;
    border-radius:15px; */
		overflow-y: scroll;
		/* margin:0 auto; */
		/*height:200px;*/
	}

	.present-title {
		font-size: 14px;
		color: #696969;
		width: 100%;
		text-align: center;
	}

	.present-cent {}

	.sub-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 20%;
		margin-top: 8px;
		float: left;
	}

	.sub-tu,
	.list-tu :nth-child(1) {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		/* background:#f0f; */
	}

	.sub-tu,
	.list-tu :nth-child(1) img {
		width: 100%;
		height: 100%;
	}

	.sub-name,
	.sub-num {
		width: 40px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 12px;
		color: #999;
	}

	.tu-pian {
		width: 100%;
		height: 200px;
	}

	.tu-pian img {
		width: 100%;
		height: 100%
	}

	.list-title {
		margin-left: 10px;
		width: 65%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.title-tu {
		margin-left: 10px;
		width: 35%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.entry {
		width: 95%;
		margin: 10px auto 20px auto;
		background: #fff;
		border-radius: 15px;
		/* padding:10px 0; */
		padding-bottom: 10px;
		color: #999;
	}

	.entry-title {
		width: 100%;
		text-align: center;
		font-size: 14px;
		padding-top: 10px;
		border-radius: 15px 15px 0 0;
		background: #ccc;
	}

	.entry-list {
		width: 94%;
		display: flex;
		justify-content: space-between;
		padding-bottom: 8px;
		border-bottom: 1px solid #E3E3E3;
		margin: 10px auto 0 auto;
	}

	.list-tu {
		width: 60%;
		display: flex;
		/*justify-content: space-between;*/
		align-items: center;
	}

	.list-time {
		width: 45%;
		line-height: 50px;
		font-size: 14px;
	}

	.times {
		width: 20%;
		text-align: center;
	}

	.foot {
		font-size: 14px;
		background: #34495E;
		color: #fff;
		height: 45px;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.foot div {
		height: 45px;
		width: 25%;
		line-height: 45px;
		text-align: center;
		float: left;
		box-sizing: border-box;
		border-right: 1px solid #C4CAD0
	}

	.foot :nth-child(4) {
		border-right: 0
	}
	/* ? */

	.ding_content {
		/* background: url("/static/img/ding.png"); */
		/* background-size: 100% 100%; */
		width: 90%;
		margin: 0 auto;
		padding: 10px 20px;
		box-sizing: border-box;
		text-align: left;
		background: #fff;
	}

	.ding_help {
		font-size: 20px;
		font-weight: 600;
		color: #ffffff;
	}

	.ding_px {
		margin-bottom: 2rem;
		background: #ffffff;
		color: rgba(255, 119, 72, 1);
		border-radius: 10px;
		width: 3rem;
		text-align: center;
		font-size: 10px;
	}

	.des {
		font-size: 10px;
	}

	.ding-title,
	.ding_bi {
		/* color: rgba(255, 107, 0, 1); */
		text-align: center;
		margin-top: 8px;
		font-size: 15px;
	}

	.ding-title {
		color: #666666
	}

	.ding_bi {
		color: #147AFF
	}

	.ding-sure {
		background: #FF8000;
		/* background-size: 100% 100%; */
		width: 60%;
		padding: 8px;
		box-sizing: border-box;
		color: #ffffff;
		text-align: center;
		font-size: 15px;
		/* margin-top: 20px; */
		border-radius: 20px;
		margin: 10px auto 0 auto
	}

	.cose {
		position: absolute;
		top: -5px;
		right: 9px;
		margin: 0.16rem 0.16rem;
		color: rgba(0, 0, 0, 0.59);
		cursor: pointer;
		font-size: 0.666667rem;
		opacity: 0.3;
	}

	button.weui-btn,
	input.weui-btn {
		border-radius: 20px;
		width: 50%;
		margin-bottom: 20px;
	}

	.ding-tu {
		position: relative;
		top: 5px;
		left: 50%;
		height: 100px;
		width: 50%;
		margin-left: -25%;
		/* background:#f0f; */
	}

	.ding-tu img {
		width: 100%;
		height: 100%;
	}

	.ding_contents {
		/*background: url("/static/img/ding.png");
		 background-size: 100% 100%; */
		width: 90%;
		margin: 0 auto;
		padding: 10px 20px;
		box-sizing: border-box;
		text-align: left;
		background: #fff;
		height: 12rem;
		max-height: 12rem;
		border-radius: 12px;
		overflow-y:scroll;
	}

	.rulelation {
		height: 40px;
		display: flex;
		align-items: center;
	}

	.rule {
		border-left: 0.186667rem solid #FF0000;
		width: 5%;
		border-left: 0.186667rem solid #FF0000;
		display: inline-block;
		padding: 12px 0;
	}

	.rule-vote {
		font-size: 0.426667rem;
		border-bottom: 0.026667rem solid #ff000;
		border-bottom: 1px solid #999;
		width: 95%;
	}

	.coses {
		position: absolute;
		top: -5px;
		right: 9px;
		margin: 0.16rem 0.16rem;
		color: rgba(0, 0, 0, 0.59);
		cursor: pointer;
		font-size: 0.666667rem;
		opacity: 0.3;
	}
	/* .creat-img img{ z-index: 3;  }*/

	.qrcode {
		position: absolute;
		bottom: 1.35rem;
		left: 38%;
		/* margin-left: -64px;*/
		z-index: 5;
	}

	.box-cent {
		position: absolute;
		z-index: 5;
		margin: 0 auto;
		top: 114px;
		width: 77%;
		height: 160px;
	}

	.productShare {
		/*background: url("/static/img/jinli.png");
		background-size: 100% 100%;*/
		width: 100%;
		margin: 0 auto;
		padding: 10px 20px;
		box-sizing: border-box;
		/*text-align: left;*/
		height: 505px;
		border-radius: 12px;
		background:#FFFFFF;
	}

	.container {
		width: 90%;
		margin: 0 auto;
	}

	.container-name {
		position: absolute;
		z-index: 5;
		top: 80px;
		left: 38%;
		font-size: 16px;
	}

	.container-title {
		position: absolute;
		z-index: 5;
		/* top: 311px;*/
		top: 8rem;
		left: 19%;
		font-size: 16px;
		width: 60%;
	}
	#qrCode-canvas{
		position:absolute;
		left:38%;
		bottom:52px;
		}
	.invitePosterPage{
		/*height:800px;*/
		width:100%;
	}
	.poster-bg{
		height:500px;
		width:100%;
	}
	.poster-img img{
		width:200px;
		height:200px;
		position:absolute;
		top:10px;
		left:20%
	}
</style>
