<template>
	<div class="min">
		<x-header :left-options="{backText: ''}"></x-header>
		<marquee scrollamount="3" style="color: #FFFFFF;width: 80%;margin: 0 auto;font-size: 0.48rem;position: fixed;top: 10px;left: 50px;z-index: 1110;">{{info.vote_title}}活动</marquee>
		<!--  <vue-back1 :name='info.vote_title' :type='1' :ids='$route.params.id'></vue-back1> -->
		<!--<vue-swiper :type="4"></vue-swiper>-->
		<div class="tu-pian"><img :src="$store.state.website.website_domain_name + '/uploads/' + info.vote_img"></div>
		<div class="nav">
			<div class="nav-first">
				<p>参与者</p>
				<p>{{info.user_id_num}}</p>
			</div>
			<div class="nav-first nav-two">
				<p>投票数</p>
				<p>{{info.vote_id_sum}}</p>
			</div>
			<div class="nav-first">
				<p>访问量</p>
				<p>{{info.visit}}</p>
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
		<div class="search">
			<input placeholder="请输入参赛选手名称、品牌......" class="txt" v-model="add" onfocus="this.placeholder=''" onblur="this.placeholder='请输入参赛选手名称、品牌......'">
			<span class="search-span" @click="searched">搜索</span>
		</div>

		<!-- 当前排名 -->

		<div class="rank">当前排名</div>
		<div style="margin-bottom:20px">
			<div class="sum" v-for='(item,index) in vote_list' :key="index">
				<div class="sum-frist">
					<div class="sum-tu" v-if="3>=item.v_order"><span>{{item.v_order}}</span></div>
					<div class="sum-tus" v-else><span>{{item.v_order}}</span></div>
					<div class="sum-title">{{item.title_s}}</div>
				</div>
				<div class="sum-last">{{item.s_id}}票</div>
			</div>
		</div>

		<vue-loading5 :url="$store.state.url + '/Vote/voteInfo?page=1&limit=10&vote_id='+$route.params.id+'&keyword='+keyword"
		 @ievent="loaddata" v-if="isshow"></vue-loading5>
		<!-- 底部 -->
		<!--<vue-collect></vue-collect>-->
		<div style="height:60px">
			<div class="foot">
				<div @click="home">平台首页</div>
				<div @click="page">投票首页</div>
				<div>当前排名</div>
				<div @click="meet($route.params.id)">添加参选</div>
			</div>
		</div>


		<div v-transfer-dom>
			<x-dialog v-model="isShowing" class="dialog-backnone" hide-on-blur>
				<div class="ding_content">
					<svg @click="isShowing = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
					 width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
						<path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z"
						 class="st0" />
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
						<p>4.作品涉及著作权，肖像权等法律责任由活动参与者自行承担法律责任。</p>
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
	import {
		XHeader,
		TransferDom,
		XDialog
	} from 'vux'
	import {
		VueSwiper,
		VueLoading5,
		VueCollect,
		VueShareit,
		VueBack1
	} from '../component'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			VueSwiper,
			VueLoading5,
			VueCollect,
			TransferDom,
			XDialog,
			VueShareit,
			VueBack1
		},
		data() {
			return {
				info: '',
				vote_list: '',
				isshow: true,
				keyword: '',
				time: '',
				add: '',
				isShowing: false,
				now_time: '',
				end_time: '',
			}
		},

		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {

				return {
					title: this.info.vote_title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电投票，他在智汇优库网选频道等您！',
					imgUrl: '/static/logo.png',
					link: '&id=' + this.$route.params.id
				}
			},
		},

		mounted() {
			this.now_time = Date.parse(new Date()); //当前时间的时间戳
			const timer = setInterval(() => {
				this.time = this.info.vote_end_time - (Date.parse(new Date()) / 1000)
				//			console.log(this.time)
				this.time--
			}, 10);
			// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
			this.$once('hook:beforeDestroy', () => {
				clearInterval(timer);
			})
			this.voteInfo()
		},

		methods: {
			// meet(id) {
			//   if (this.end_time<this.now_time/1000) {
			//     msg('投票已经结束不可以添加选手')
			//   } else {
			//     this.$router.push("/vote/write/" + id)
			// }
			// else {
			//   if (this.add_count == 3) {
			//     msg('添加选手次数已用完')
			//   } else{
			//     this.$router.push("/vote/write/" + this.$route.params.time)
			//   }
			// }

			// },
			meet(id) {
				if (this.end_time > this.now_time / 1000) {
					if (this.vote_select_count1 < 3 && this.info.region_type == 1) {
						this.$router.push("/vote/write/" + id)
					} else if (this.info.region_type == 2) {
						msg('你所在的区域不在候选范围内')
					} else {
						msg('只能添加3个选手')
					}
				} else {
					msg('投票已经结束不可以添加选手')
				}
			},
			voteInfo() {
				let _this = this
				_this.$http.post(_this.$store.state.url + "/Vote/voteInfo", {
					// vote_id: _this.$route.query.id,
					vote_id: _this.$route.params.id,
					page: 1,
					limit: 10,
					keyword: '',
				}).then(res => {
					_this.info = res
					_this.end_time = res.vote_end_time
				})
			},

			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.vote_list = _this.vote_list || [];
					_this.vote_list.push(e);
				})
			},
			reload() {
				var _this = this;
				_this.isshow = false;
				_this.$nextTick(function() {
					_this.isshow = true;
				})
			},
			searched(i) {
				// console.log(i)
				// if(!this.add){
				// 	msg("请填写详情内容");
				// 	return;
				// }
				var _this = this;

				_this.keyword = _this.add;
				_this.vote_list = [];
				_this.reload();
			},
			top(id) {
				this.$router.push("/vote/position/" + id)
			},
			home() {
				this.$router.push('/index')
			},
			page() {
				this.$router.push("/vote/index")
			},
		}
	}
</script>

<style scoped>
	.min {
		background: #EAEAEA
	}

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

	.search,
	.time {
		width: 93%;
		margin: 10px auto 0 auto;
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

	.search {
		display: flex;
	}

	.search .txt {
		width: 75%;
		/* padding:8px 0; */
		background: #FFFFFF;
		border-radius: 20px 0 0 20px;
		text-align: center;
		font-size: 12px;
		height: 38px;
		float: left;
		color: #000
	}

	.search-span {
		width: 25%;
		/* padding:8px 0; */
		background: #FFFFFF;
		border-radius: 0 20px 20px 0;
		text-align: center;
		font-size: 14px;
		float: left;
		height: 38px;
		line-height: 38px;
		background: #05D8E8;
		color: #fff;
	}

	.rank {
		width: 100%;
		text-align: center;
		font-size: 16px;
		color: #999;
		height: 40px;
		line-height: 50px;
	}

	.sum {
		width: 93%;
		padding: 8px 0;
		margin: 0 auto;
		border-bottom: 1px solid #DDDDDD;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.sum-frist {
		width: 70%;
		display: flex;
		align-items: center;
	}

	.sum-tu {
		height: 60px;
		width: 50px;
		background: url("/static/img/jiangpai.png");
		background-size: 100% 100%;
		position: relative;
	}

	.sum-tus {
		height: 60px;
		width: 50px;
		/*background: url("/static/img/jiangpai.png");*/
		background-size: 100% 100%;
		position: relative;
	}

	.sum-tu span,
	.sum-tus span {
		color: #FFFFFF;
		text-align: center;
		display: block;
		position: relative;
		top: 20px;
		font-size: 18px;
	}

	.sum-tus span {
		color: #999;
	}

	.sum-title {
		font-size: 14px;
		color: #5892F6;
		width: 70%;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}

	.sum-last {
		width: 20%;
		text-align: center;
		font-size: 14px;
		color: #999;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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

	.ding_content {
		/* background: url("/static/img/ding.png"); */
		/* background-size: 100% 100%; */
		width: 90%;
		margin: 0 auto;
		padding: 10px 20px;
		box-sizing: border-box;
		text-align: left;
		background: #fff;
		height: 12rem;
		max-height: 12rem;
		overflow-y: scroll;
		border-radius: 12px;
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

	.tu-pian {
		width: 100%;
		height: 200px;
		padding-top: 1.2rem;
	}

	.tu-pian img {
		width: 100%;
		height: 100%
	}

	.vux-header {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 1000;
	}
</style>
