<template>
	<div class="min">
		<vue-batten></vue-batten>
		<!-- <tab active-color="#F88F00">
			<tab-item selected @on-item-click="show(1)">行业动态</tab-item>
			<tab-item @on-item-click="show(2)">企业资讯</tab-item>
			<tab-item @on-item-click="show(3)">新品展示</tab-item>
		</tab> -->

		<tab :line-width='2' active-color="#F88F00">
			<!-- <tab-item :selected="demo4 === index+1" v-for="(item, index) in list4" @on-item-click="show(index+1)" :key="index">{{item}}</tab-item> -->
			<tab-item :selected="demo4 === item" v-for="(item, index) in list4" @on-item-click="show(item)" :key="index">{{item}}</tab-item>
		</tab>

		<!-- <div v-if="index== 1"> -->
		<div v-if="index== '行业动态'">
			<!-- <vue-swiper1 :type="15"></vue-swiper1> -->
			<vue-swiper :type="15"></vue-swiper>
			<div class="hots">
				<div class="hots-txt">
					行业自助平台&#x3000;&#x3000;专业服务弱电行业&#x3000;
					<div class="hots-right">
						<span>hot</span>
					</div>
				</div>
			</div>
			<!-- 列表 -->
			<div class="card">
				<div class="news">
					<h2>行业动态</h2>
				</div>
			</div>
			<div class="trade" @click="hangye(item.id,item.type)" v-for="(item,index) in array" :key="index">
				<div class="picture"><img :src="item.imgUrl" /></div>
				<div class="xin-xiangmu">
					<div class="xiangmu-zhuti">{{item.title}}</div>
					<div class="dizhi">
						<span class="dizhi2">来源：{{item.source}}</span>
						<!-- <span  class="center">类型：{{item.zc}}</span> -->
						<span class="dizhi3 right_center">{{item.time|returntime6}}</span>
						<!-- <span class="dizhi3 right_center">{{item.time|returntime6}}</span> -->
					</div>
				</div>
			</div>
			<vue-loading :url="$store.state.url + '/Information/industryNews?page=1&limit=10'" @ievent="loading" v-if="showing"></vue-loading>
		</div>

		<!-- <div v-if="index== 2" > -->
		<div v-if="index== '企业资讯'">
			<vue-swiper :type="16"></vue-swiper>
			<div class="hots">
				<div class="hots-txt">
					行业自助平台&#x3000;&#x3000;专业服务弱电行业&#x3000;
					<div class="hots-right">
						<span>hot</span>
					</div>
				</div>
			</div>
			<!-- 列表 -->
			<div class="card">
				<div class="news">
					<h2>企业资讯</h2>
				</div>
			</div>
			<div class="trade" v-for="(item,index) in list" :key="index" @click="hangye(item.id,item.type)">
				<!-- <div class="picture" v-for="(item,index) in item.imgUrl" :key="index"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgUrl"></div> -->
				<div class="picture"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgUrl"></div>
				<div class="xin-xiangmu">
					<div class="xiangmu-zhuti">{{item.title}}</div>
					<div class="dizhi">
						<span class="dizhi2">发布人：{{item.mem_nickname}}</span>
						<span class="dizhi3 right_center">{{item.time|returntime6}}</span>
						<span class="center ding" @click.stop="ding(item.id)" v-if="index !=0"><img src="/static/img/anniu.png"></span>
						<!-- <span class="dizhi3 right_center">{{item.time|returntime6}}</span> -->
					</div>
				</div>
			</div>
			<vue-loading :url="$store.state.url + '/Information/enterpriseNewsList?page=1&limit=10&type=2'" @ievent="loaddata"
			 v-if="show1"></vue-loading>
		</div>
		<!-- 新品展示  -->
		<!-- <div v-if="index==3" style="background:#fff"> -->
		<div v-if="index=='新品展示'" style="background:#fff">
			<vue-swiper :type="17"></vue-swiper>
			<div class="hots">
				<div class="hots-txt">
					行业自助平台&#x3000;&#x3000;专业服务弱电行业&#x3000;
					<div class="hots-right">
						<span>hot</span>
					</div>
				</div>
			</div>
			<!-- 列表 -->
			<div class="card">
				<div class="news">
					<h2>新品展示</h2>
				</div>
			</div>
			<div class="spread1" v-for="(item,index) in project" :key="index" @click="hangye(item.id,item.type)">
				<div class="spread">
					<div class="spread-tu">
						<div class="spread-tu-pian" v-for="(item,index) in item.imgUrl"><img :src="$store.state.website.website_domain_name + '/uploads/' + item"></div>
						<!-- <div class="spread-tu-pian"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgUrl"></div> -->
					</div>
					<div class="spread-wenzi">
						<div class="xiangmu-zhuti">{{item.title}}</div>
						<div class="dizhi">
							<span class="dizhi2">发布人：{{item.mem_nickname}}</span>
							<span class="dizhi3 right_center">{{item.time|returntime6}}</span>
							<!-- <span  class="center ding" @click="isShow = true">顶</span> -->
							<span class="center ding" @click.stop="ding(item.id)" v-if="index !=0"><img src="/static/img/anniu.png"></span>
						</div>
					</div>
				</div>
			</div>
			<vue-loading :url="$store.state.url + '/Information/enterpriseNewsList?page=1&limit=10&type=3'" @ievent="loaddatas"
			 v-if="show2"></vue-loading>
		</div>
		<!-- 火箭 -->
		<div v-transfer-dom>
			<x-dialog v-model="isShow" class="dialog-backnone" hide-on-blur>
				<div class="ding_content">
					<svg @click="isShow = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
					 width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
						<path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z"
						 class="st0" />
					</svg>
					<div class="ding_help">帮助置顶</div>
					<div class="ding_px"></div>
					<div class="des">
						<div>置顶优势</div>
						<div>&nbsp;1. 刷新企业排序至资讯最前端；</div>
						<div>&nbsp;2. 同行中提高信息曝光率；</div>
						<div>&nbsp;3. 促进企业合作及平台互动；</div>
						<div>注：置顶一次需消耗10个智汇币</div>
						<div class="ding_bi">-10个智汇币</div>
						<div class="ding-sure" @click="placement()">确定置顶</div>
					</div>
				</div>
			</x-dialog>
		</div>
		<!-- 充值 -->
		<div v-transfer-dom>
			<x-dialog v-model="exhibit" class="invest_Money">
				<div class="investMoney_img">
					<div style="width:100%;display: flex;justify-content: center;margin-top:0.5rem"><img src="/static/img/zhihui.png"
						 style="height:4rem;width:70%"></div>
					<div class="investMoney_title">
						<p>智汇币不足</p>
						<p>赶紧去赚取智汇币吧</p>
					</div>
					<div class="lessMoney">
						<p>获取智汇币的途径：</p>
						<p>1、分享任何页面给好友</p>
						<p>2、分享任何页面到朋友圈、群内</p>
						<p>3、参与平台任何互动任务</p>
						<p>4、充值获取(100智汇币=1元)</p>
					</div>
					<div>
						<x-button @click.native="$router.push('/user/myrecharge')">去充值</x-button>
					</div>
				</div>
				<div class="investMoney_cha">
					<div class="investMoney_ch" @click="exhibit = false"><img src="/static/img/cha.png"></div>
				</div>
			</x-dialog>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import {
		VueSwiper,
		VueShareit,
		VueLoading,
		VueBatten,
		VueSwiper1
	} from '../component/'
	import {
		Tab,
		TabItem,
		Actionsheet,
		XButton,
		TransferDom,
		XDialog
	} from 'vux'
	export default {
		directives: {
			TransferDom
		},
		components: {
			VueShareit,
			VueLoading,
			VueBatten,
			Tab,
			TabItem,
			Actionsheet,
			VueSwiper,
			VueSwiper1,
			XButton,
			TransferDom,
			XDialog
		},
		data() {
			return {
				// index:1
				//				index:this.$route.query.cut,
				index: this.$route.params.cut,
				isShow: false,
				list: [],
				show1: true,
				project: [],
				show2: true,
				showing: true,
				array: [],
				info_id: '',
				exhibit: false,
				list4: ['行业动态', '企业资讯', '新品展示'],
				//				demo4:this.$route.query.cut
				demo4: this.$route.params.cut,
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {

				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动平台，秒得五十块！',
					imgUrl: '/static/logo.png',
					link: this.$route.params.cut
				}
			},
		},
		mounted() {
			// 			this.demo4 = this.$route.query.type
			// 			this.index = this.$route.query.type
			// 			console.log(this.$route.query.type)
			// 			console.log(this.demo4)
			// 			console.log(this.index)
		},
		methods: {
			show(i) {
				let _this = this;
				_this.index = i;
				if (i == '行业动态') {
					console.log(_this.index)
					_this.reload3()

				} else if (i == '企业资讯') {

					_this.reload1()

				} else if (i == '新品展示') {

					_this.reload2()

				}
				_this.list = [];
				_this.project = []
				_this.array = []
			},
			placement() {
				var _this = this;
				_this.$http
					.post(_this.$store.state.url + "/Information/infoTop", {
						load: true,
						info_id: _this.info_id
					})
					.then(function(res) {
						if (res == '余额不足，请充值！') {
							_this.isShow = false
							_this.exhibit = true
						} else {
							msg("置顶成功");
							_this.isShow = false;
							_this.list = [];
							_this.reload1();
							_this.project = [];
							_this.reload2()
						}

					});
			},
			hangye(id, des) {
				//				this.$router.push("/information/details?id="+id+"&des="+des)
				this.$router.push("/information/details/" + id + '/' + des)
			},
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
				})
			},
			loaddatas(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.project = _this.project || [];
					_this.project.push(e);
				})
			},
			loading(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.array = _this.array || [];
					_this.array.push(e);
				})
			},
			reload1() {
				var _this = this;
				_this.show1 = false;
				_this.$nextTick(function() {
					_this.show1 = true;
				})
			},
			reload2() {
				var _this = this;
				_this.show2 = false;
				_this.$nextTick(function() {
					_this.show2 = true;
				})
			},
			reload3() {
				var _this = this;
				_this.showing = false;
				_this.$nextTick(function() {
					_this.showing = true;
				})
			},
			ding(id) {
				this.isShow = true
				this.info_id = id
				console.log(this.info_id)
			}
		},
	}
</script>

<style scoped>
	.header-search {
		position: fixed;
		z-index: 11;
		width: 100%;
		top: 0;
	}

	.vux-tab-wrap {
		position: fixed;
		z-index: 11;
		width: 100%;
		top: 1.2rem;
	}

	.vuxSlider {
		padding-top: 2.3rem;
	}

	.min {
		background: #fff
	}

	.hots {
		width: 100%;
		/*height: 36px;*/
		background: rgba(153, 153, 153, 0.2);
		color: #666;
		font-size: 16px;
		text-align: center;
		font-weight: normal;
		/*padding-top: 6px*/
		padding: 10px 0;
		position: relative;
	}

	.hots-right {
		display: inline-block;
		background: url('/static/img/sanjiao.png');
		background-size: 100% 100%;
		position: relative;
		height: 25px;
		width: 40px;
	}

	.hots-right span {
		color: #FFFFFF;
		text-align: center;
		display: block;
		position: relative;
		top: -2px;
		font-size: 14px;
	}

	.card {
		background: #fff;
		margin-top: 10px;
		width: 100%;
	}

	.news {
		width: 95%;
		margin: 0 auto;
		height: 50px
	}

	.news h2 {
		float: left;
		font-weight: normal;
		font-size: 18px;
		margin-top: 12px;
		border-left: 7px solid #4DADFF;
		padding-left: 5px;

	}

	.trade {
		width: 95%;
		margin: 10px auto;
		display: flex;
	}

	.picture {
		height: 80px;
		width: 40%;
	}

	.picture img {
		width: 100%;
		height: 100%;
	}

	.xin-xiangmu {
		width: 60%;
		/* margin: 0 auto; */
		padding-top: 5px;
		border-top: 1px solid rgba(112, 112, 112, 0.5);
		padding-bottom: 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-between
	}

	.xiangmu-zhuti {
		color: #000000;
		font-size: 14px;
		margin-left: 15px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.xiangmu-biaoti {
		color: #666;
		font-size: 14px;
		margin-left: 15px;
		margin-right: 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 90%
	}

	.dizhi {
		color: #666;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		margin: 0 0px 0 15px;
		align-items: center;
		
	}

	.dizhi span {
		/* width: 70%; */
		white-space: nowrap;
		/* overflow: hidden;
			text-overflow: ellipsis; */
	}

	.message {
		background: #fff;
		margin-top: 10px;
	}

	.right_center {
		text-align: right;
	}

	#dizhi2 {
		width: 70%;
	}
	.dizhi2 {
		width: 120px;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.center {
		text-align: center;
	}

	.ding {
		/* border-radius: 50%;
			border:#666666 solid 1px;
			font-size: 12px; */
		padding: 1px 3px;

	}

	.ding img {
		width: 25px;
		height: 25px;
	}

	.spread1 {
		width: 100%;
		background: #F5F5F5;
		margin-top: 10px
	}

	.spread {
		width: 95%;
		margin: 0 auto;

		/* margin-top:10px; */
	}

	.spread-tu {
		display: flex;
		justify-content: space-between;
	}

	.spread-tu-pian {
		width: 48%;
		height: 100px;
		/* background: #F73A3A; */
		/* border:1px solid rgba(112,112,112,1); */
	}

	.spread-tu-pian img {
		width: 100%;
		height: 100%
	}

	.spread-wenzi {
		width: 95%;
		margin: 0 auto;
		padding: 10px 0;
	}

	.ding_content {
		background: url("/static/img/ding.png");
		background-size: 100% 100%;
		width: 90%;
		margin: 0 auto;
		padding: 1.7rem 0.5rem 0.8rem;
		box-sizing: border-box;
		text-align: left;
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

	.ding_bi {
		color: rgba(255, 107, 0, 1);
		text-align: center;
		margin-top: 8px;
		font-size: 15px;
	}

	.ding-sure {
		background: url("/static/img/btn.png");
		background-size: 100% 100%;
		width: 90%;
		padding: 8px;
		box-sizing: border-box;
		color: #ffffff;
		text-align: center;
		font-size: 15px;
		margin-top: 20px;
	}

	.cose {
		position: absolute;
		top: 57px;
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

	.invest_Money {
		border-radius: 8px;
		padding-bottom: 8px;
	}

	.investMoney_img {
		background: #FFFFFF;
		height: 12rem;
		overflow: hidden;
	}

	.investMoney_title {
		width: 80%;
		margin: 0 auto;
		border-bottom: 1px solid #999;
		margin-top: 10px;
		height: 1.9rem;
		font-size: 18px;
		text-align: center;
	}

	.investMoney_cha {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.investMoney_ch {
		width: 30px;
		height: 30px;
	}

	.investMoney_ch img {
		width: 100%
	}

	.weui-btn_default {
		background: #FF6F3A;
		color: #fff;
		width: 100px;
	}

	.lessMoney {
		width: 220px;
		font-size: 14px;
		margin: 20px auto;
		text-align: left;
	}
</style>
