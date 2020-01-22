<template>
	<div class="wrap">
		<x-header :title="'社区'" :left-options="{backText:'',showBack:false}">

			<div class="xj" slot="right" @click="fbsq()">
				<svg t="1562826968111" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2564"
				 width="23" height="23">
					<path d="M860.032 976.704H162.688c-39.104 0-81.152-20.032-115.264-54.912C18.176 891.648 0 844.48 0 798.336V298.176c0-42.944 16-81.088 47.488-113.344 28.672-29.376 68.48-44.864 115.264-44.864h26.624c7.872 0 19.776-7.488 24.192-10.304 5.696-3.648 11.968-11.968 17.28-22.72l31.232-62.656c8.512-17.344 21.952-27.584 34.048-35.264 16-10.112 30.336-9.216 42.624-8.704l6.528 0.128 344.768-0.128c10.176 0 23.552 1.024 36.416 9.216l2.368 1.472c11.648 7.36 23.744 14.976 31.808 31.616l31.296 65.024c4.608 9.536 10.88 17.344 17.152 21.312 6.208 3.904 17.408 11.072 24.256 11.072h26.624c46.656 0 86.656 15.488 115.392 44.864 31.36 32.256 47.36 70.4 47.36 113.344v500.16c0 46.272-18.24 93.312-47.36 123.52-34.24 34.688-76.16 54.784-115.328 54.784zM162.688 186.496c-34.432 0-62.016 10.368-81.984 30.784-23.04 23.68-34.24 50.112-34.24 80.896v500.16c0 33.92 13.44 69.696 34.24 90.816 25.344 26.176 55.296 41.152 81.984 41.152h697.344c26.624 0 56.512-14.848 81.856-41.152 20.736-21.12 34.24-56.896 34.24-90.816V298.176c0-30.784-11.2-57.28-34.24-80.896-20.032-20.416-47.488-30.784-81.856-30.784h-26.752c-18.624 0-35.008-9.408-49.152-18.304a98.112 98.112 0 0 1-33.984-40.256L718.912 62.912c-2.176-4.352-5.504-6.656-14.784-12.48l-2.432-1.6c-2.304-1.472-5.568-2.048-11.648-2.048l-12.544 0.256h-332.16L337.216 46.912 330.624 46.656c-6.08 0-8.192 0.768-9.6 1.664-9.856 6.208-14.336 10.624-17.216 16.576l-31.296 62.592c-6.336 12.992-17.472 30.848-34.048 41.344-13.76 8.704-30.336 17.664-49.152 17.664h-26.624z"
					 fill="#ffffff" p-id="2565"></path>
					<path d="M511.36 814.08a279.296 279.296 0 0 1-278.912-278.912A279.168 279.168 0 0 1 511.36 256.32a279.168 279.168 0 0 1 278.848 278.848A279.232 279.232 0 0 1 511.36 814.08z m0-511.36a232.64 232.64 0 0 0-232.384 232.384 232.704 232.704 0 0 0 232.384 232.512 232.768 232.768 0 0 0 232.384-232.512A232.64 232.64 0 0 0 511.36 302.72zM813.504 325.952l0 0z m0-46.528v23.232-23.232zM813.504 325.952l0 0z m0-46.528v23.232-23.232z"
					 fill="#ffffff" p-id="2566"></path>
				</svg>


			</div>
		</x-header>

		<!--<tab>
			<tab-item selected @on-item-click="show(1)">社区</tab-item>
			<tab-item @on-item-click="show(2)">我的</tab-item>
		</tab>-->

		<div v-if="zindex==1" style="margin-bottom: 60px;">
			<!--轮播-->
			<vue-swiper :type="11"></vue-swiper>
			<!--选择类型-->
			<div style="padding-top: 2.7rem;">
				<div class="type-body" :class="{'is_fixed' : isFixed}">
					<div class="type-change">
						<div v-for="(item, index) in titleList" @click="shequ(index+1)" :class="index==index1?'active':''"> {{item}}</div>
					</div>
				</div>
				<!--类型下面的大咖-->
				<div class="list">
					<div class="daka" @click="guanzhu()">
						<div class="gz">我关注的大咖：</div>
						<div class="tx">
							<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" alt="" v-for="(item,index) in dakaList"
							 v-if="index<7" />
						</div>
						<img src="/static/img/jt.png" alt="" class="jt" />
					</div>

					<vue-she-qu v-for="(item,index) in list" :item="item" :key="index" :type="1"></vue-she-qu>

					<vue-loading :url="$store.state.url + '/Follow/shequ?page=1&limit=10&type='+index3" @ievent="loaddata" v-if="isshow"></vue-loading>
				</div>
			</div>
		</div>
		<!--<div v-if="zindex==2">
			<router-link tag="div" :to="'pinglun'" class="pl_list">
				<div>我的评论</div>
				<img src="/static/img/jt.png" alt="" />
			</router-link>
			<vue-she-qu v-for="(item,index) in lists" :item="item" :key="index" :type="2"></vue-she-qu>
			<vue-loading1 :url="$store.state.url + '/Follow/dy_list?page=1&limit=5'" @ievent="loaddatas" v-if="isshow"></vue-loading1>
		</div>-->
		<div class="fb" @touchmove.prevent @click="close($event)" v-if="show3">
			<div class="fb-card" ref="msk">
				<!--<div @click="fbxz(1)">拍摄照片</div>-->
				<div @click="fbxz(2)">拍摄视频</div>
				<div @click="fbxz(3)">手机照片选择</div>
				<div @click="close1()">取消</div>
			</div>
		</div>
		<vue-suspen></vue-suspen>
		<vue-foot></vue-foot>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import {
		XHeader,
		Grid,
		GridItem,
		Panel,
		Tab,
		TabItem,
		Swiper,
		SwiperItem,
		Actionsheet
	} from 'vux'
	import {
		VueList,
		VueFoot,
		VueHead,
		VueSwiper,
		VueLoading,
		VueSuspen,
		VueShareit,
		VueSheQu,
		VueLoading1
	} from '../component'
	export default {
		components: {
			XHeader,
			Grid,
			GridItem,
			Panel,
			VueList,
			VueFoot,
			VueHead,
			VueSwiper,
			VueLoading,
			VueSuspen,
			VueShareit,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			Actionsheet,
			VueSheQu,
			VueLoading1
		},
		data() {
			return {
				index1: 0,
				titleList: ['全部', '厂商', '代理', '工程', '设计'],
				demo2: '全部',
				zindex: 1,
				show1: false,
				show2: false,
				show3: false,
				dakaList: '',
				show4: false,
				list: [],
				scroll: false,
				pages: 1,
				limit: 2,
				index3: 1,
				isshow: true,
				show5: true,
				lists: [],
				info: '',
				scrollTop: '',
				isFixed: false,
				offsetTop: 0

			}
		},
		mounted() {
			var _this = this;
			_this.getdaka();
			_this.shequ(1);
			_this.getInfo();

			window.addEventListener('scroll', this.initHeight);
			this.$nextTick(() => {
				this.offsetTop = document.querySelector('.type-body').offsetTop;
			})
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动社区',
					imgUrl: '/static/logo.png',
					link: '/shequ/index'
				}
			},
		},
		methods: {

			initHeight() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				this.isFixed = scrollTop > this.offsetTop ? true : false;
			},

			//获取当前登录人的资料
			getInfo() {
				let _this = this;
				_this.$http.post(_this.$store.state.url + '/Homecenter/getUser', {
					'load': true,
				}).then((res) => {
					if (!res) return;
					_this.info = res;


				})
			},
			//判断是那个行业显示
			show(index) {
				this.list = "";
				this.lists = "";
				this.zindex = index;
			},
			//查看我关注的大咖
			guanzhu() {
				var _this = this;
				_this.$router.push('guanzhu');
			},
			//关闭弹窗
			close(ev) {
				var _this = this;
				if (!_this.$refs.msk.contains(ev.target)) {
					_this.show3 = false;
				}
			},
			// 发布弹窗显示
			fbsq() {

				var _this = this;
				console.log(_this.info)
				if (!_this.info.mem_company || !_this.info.mem_hangye || !_this.info.mem_region || !_this.info.mem_position || !
					_this.info.mem_region || !_this.info.mem_subject) {
					msg("请先去个人中心-我的资料中去完善个人信息");
				} else {
					_this.show3 = true;

				}

			},
			//关闭弹窗
			close1() {
				var _this = this;
				_this.show3 = false;
			},
			//发布选择
			fbxz(i) {
				var _this = this;
				_this.$router.push('fabu/' + i);
				if (i == 2) {
					_this.$router.push('video');
				}

			},
			//获取我关注的大咖
			getdaka() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/get_daka', {
					lood: false,
				}).then(function(res) {
					if (!res) return;
					_this.dakaList = res;
				})
			},
			//加载对应行业下面的社区
			shequ(i) {
				var _this = this;

				_this.index1 = i - 1;
				_this.index3 = i;
				_this.list = "";
				_this.reload();
			},
			//社区下拉加载
			loaddata(res) {
				var _this = this;


				_.each(res, function(e) {

					_this.list = _this.list || []
					_this.list.push(e)
					// console.log(_this.list)


				})


			},
			//我的下载加载
			loaddatas(res) {
				var _this = this
				_.each(res, function(e) {
					_this.lists = _this.lists || []
					_this.lists.push(e)
				})
			},
			//刷新下载刷新节点
			reload() {
				var _this = this;
				_this.isshow = false;
				_this.$nextTick(function() {
					_this.isshow = true;
				})
			},

		},
		destroyed() {
			window.removeEventListener('scroll', this.initHeight)
		},


	}
</script>

<style scoped>
	.is_fixed {
		position: fixed !important;
		top: 1.2rem !important;
	}

	.vux-header {
		position: fixed !important;
		width: 100%;
		top: 0;
		z-index: 11;
	}

	.vuxSlider {
		z-index: 1;
		top: 1.2rem;
		width: 100%;
	}

	.type-body {
		position: absolute;
		z-index: 2;
		width: 100%;
		top: 6.8rem;
	}

	.tab-swiper {
		background-color: #fff;
		height: 100px;
	}

	.daka {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #f3f3f3;
		background: white;
	}

	.tx {
		display: flex;
		width: 63%;
	}

	.tx img {
		width: 32px;
		height: 32px;
		margin: 0 2px;
		border-radius: 50%;
	}

	.jt {
		width: 30px;
		height: 30px;
	}

	.fb {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(210, 210, 210, 0.8);
		z-index: 100;
	}

	.fb-card {
		position: absolute;
		bottom: 50px;
		right: 0;
		left: 0;
	}

	.fb-card div {
		background: white;
		text-align: center;
		font-size: 12px;
		padding: 15px 0;
	}

	.fb-card div:nth-child(2) {
		margin: 1px 0;
	}

	.fb-card div:nth-child(4) {
		margin-top: 3px;
	}

	.type-change {
		width: 95%;
		padding: 0 10px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: middle;
		-ms-flex-align: middle;
		align-items: middle;
		overflow: auto;
		background: #FFFFFF;
		margin-bottom: 1px;
	}

	.type-change div {
		text-align: center;
		font-size: 16px;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		padding: 10px;
		margin: 5px;
		width: 12%;
	}

	.active {
		color: #04BE02;
		border-bottom: 0.08rem solid #04BE02;
	}

	.pl_list {
		background: white;
		padding: 9px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.pl_list img {
		width: 20px;
		height: 20px;
	}

	.xj {
		width: 25px;
		height: 25px;
	}
</style>
