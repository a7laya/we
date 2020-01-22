<template>
	<div>
		<!-- <x-header :left-options="{backText: ''}" :right-options="{showMore: true}" @on-click-more="showMenus = true">投票活动首页</x-header> -->
		<!-- <x-header :left-options="{backText: ''}">投票活动首页<a slot="right"><img src="/static/img/sousuo1.png"></a></x-header> -->
		<!-- <x-header :title="'网选列表'" :left-options="{backText:''}" class="header" id="headerX"> -->
		<div class="header-search">
			<div class="search-content">
				<div class="fanhui" @click="back"><img src="/static/img/fanhui.png"></div>
				<div class="searchbox">
					网选列表
				</div>
			</div>
		</div>

		<!--<div slot="right">

        <div class="header-nav-icon"><img src="/static/img/sousuo1.png"></div>
		 	</div>-->
		</x-header>

		<vue-swiper :type="18"></vue-swiper>
		<!--<div class="hots">
		 	<div class="hots-txt">
		 		专业服务弱电行业&#x3000;&#x3000; 简单高效&#x3000;
		 		<div class="hots-right">
		 			<span>hot</span>
		 		</div>
		 	</div>
		 </div>-->

		<div class="search">
			<div class="searchSelect">

				<popup-picker placeholder="地区" :data="itemAddress" v-model="address" :show-name="true" :columns="2" @on-hide="hide"
				 value-text-align="left" class="sx"></popup-picker>
				<popup-picker placeholder="类型" :data="hour" v-model="Changetime" class="change" @on-hide="hide2" value-text-align="left"></popup-picker>
			</div>
		</div>

		<!--<div class="fire">
			 <span>火热投票中 ... ...</span>
		 </div>-->
		<!--<div class="center">
			 <div class="center-fire" @click="tabulation(item.id,item.type)"  v-for="(item,index) in summarizing"  :key="index">
				 <div class="center-tu"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.img"></div>
				 <div class="center-title">
					 <div class="center-head">{{item.title}}</div>
					 <div>
						 <div class="center-address">
							 <span>{{item.province}}&nbsp;{{item.city}}</span>
							  <span class="center-bi" v-if="item.type==1&&item.state!=3">可征集</span>
	             			  <span class="center-bill" v-if="item.state==1" style="background:#A50707">正在投票</span>
	             			  <span class="center-bill" v-if="item.state==2" style="background:#F88509">即将开始</span>
	             			  <span class="center-bill" v-if="item.state==3" style="background:#666">已经结束</span>
						 </div>
						 <div class="center-address">
						 <span>结束时间：</span>
			              <span style="color:#D35959;display: block;text-align: center;">{{item.end_time | returntime1}}</span>
			             </div>
		             </div>
				 </div>
			 </div>
		 </div>-->
		<div style="background:#fff;width:100%">
			<div class="card-zhi" :key="index" style="position:relative" @click="tabulation(item.id,item.type,item.title)" v-for="(item,index) in summarizing">
				<div class="card-img">
					<img :src="$store.state.website.website_domain_name + '/uploads/' + item.img" />
				</div>
				<div class="spread-wenzi">
					<div class="xiangmu-zhuti">{{item.title}}</div>
					<div class="dizhi">
						<span class="dizhi2" v-if="item.type==1&&item.state!=3">参选范围：{{item.province}}&nbsp;{{item.city}}</span>
						<!-- <span class="center-bi" v-if="item.type==1&&item.state!=3">可添加参选</span> -->
						<span class="center-bi" v-if="item.type==1&&item.region_type==1">可添加参选</span>
					</div>
					<div class="dizhi">
						<!--<span class="dizhi2">时间：</span>-->
						<span v-if="item.state==1" style="color:#A50707">结束时间：</span>
						<span v-if="item.state==2" style="color:#F88509">开始网选：</span>
						<span v-if="item.state==3" style="color:#666">网选结束：</span>
						<span v-if="item.state==1" style="color:#A50707">{{item.end_time | returntime1}}</span>
						<span v-if="item.state==2" style="color:#F88509">{{item.end_time | returntime1}}</span>
						<span v-if="item.state==3" style="color:#666">{{item.end_time | returntime1}}</span>
					</div>
				</div>
				<div class="center-address">
					<!--<span>{{item.province}}&nbsp;{{item.city}}</span>-->
					<!--<span class="dizhi3 right_center">时间：</span>
					  <span class="dizhi3 right_center">{{item.end_time | returntime1}}</span>-->
					<span class="center-bill" v-if="item.state==1" style="background:#A50707">正在网选</span>
					<span class="center-bill" v-if="item.state==2" style="background:#F88509">即将开始</span>
					<span class="center-bill" v-if="item.state==3" style="background:#666">网选结束</span>
					<!--     <span class="center-bill" v-if="item.state==4" style="background:#A50707">企业</span>
              <span class="center-bill" v-if="item.state==5" style="background:#F88509">产品</span>
              <span class="center-bill" v-if="item.state==6" style="background:#666">口碑</span>
              <span class="center-bill" v-if="item.state==7" style="background:#A50707">技术</span>
               <span class="center-bill" v-if="item.state==8" style="background:#A50707">其他</span> -->
				</div>
			</div>
		</div>
		<!--<vue-loading :url="$store.state.url + '/Vote/voteList?page=1&limit=10&type=1'" @ievent="loading" v-if="showing"></vue-loading>-->
		<vue-loading :url="$store.state.url + '/Vote/voteList4?page=1&limit=10&state_type='+state_type + '&region='+region"
		 @ievent="loading" v-if="showing"></vue-loading>
		<!--<vue-collect></vue-collect>-->
		<vue-foot></vue-foot>

		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>


<script>
	import {
		XHeader,
		PopupPicker
	} from 'vux'
	import {
		VueSwiper,
		VueFoot,
		VueShareit,
		VueLoading,
		VueCollect,
		VueAddress1
	} from '../component'
	export default {
		components: {
			XHeader,
			VueSwiper,
			VueFoot,
			VueShareit,
			VueLoading,
			VueCollect,
			VueAddress1,
			PopupPicker,
		},
		data() {
			return {
				summarizing: '',
				time: '',
				showing: true,
				hour: [
					['全部', '项目', '人物', '品牌', '企业', '产品', '口碑', '技术', '其他']
				],
				//		hour:[[{name:'正在投票',value:'1'},{name:'即将开始',value:'2'},{name:'已经结束',value:'3'}]],
				Changetime: [],
				Changetime1: [],
				address: [],
				state_type: '',
				region: '',
				show: true, //是否开启省市县单选模式
				itemAddress: [],
				urls: ''
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {

				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电投票频道，他在智汇优网选频道等您！',
					imgUrl: '/static/logo.png',
					link: '',
				}
			},
		},
		mounted() {
			this.urls = new URL(window.location.href)
			//    const timer = setInterval(() => {
			//      this.time = (Date.parse(new Date()) / 1000)
			//    }, 100);
			//
			//    this.$once('hook:beforeDestroy', () => {
			//    	clearInterval(timer);
			//    })

			var _this = this;

			_this.$http.post(_this.$store.state.url + "/common/region").then(function(res) { //获取城市
				if (!res) return;
				if (_this.show) {
					_this.itemAddress.push({
						name: '全国',
						value: '-100',
						parent: '0'
					});
					_this.itemAddress.push({
						name: '',
						value: '-1',
						parent: '-100'
					});
				}
				_.each(res, function(e) {

					_this.itemAddress.push({
						name: e.typename,
						value: e.id.toString(),
						parent: e.parent_id.toString()
					});
					if (_this.show) {
						_this.itemAddress.push({
							name: '全部',
							value: '-1',
							parent: e.id.toString()
						});
					}
					_.each(e.children, function(e) {
						if (_this.show) {
							_this.itemAddress.push({
								name: '全部',
								value: '-1',
								parent: e.id.toString()
							});
						}
						_this.itemAddress.push({
							name: e.typename,
							value: e.id.toString(),
							parent: e.parent_id.toString()
						});
						_.each(e.children, function(e) {
							_this.itemAddress.push({
								name: e.typename,
								value: e.id.toString(),
								parent: e.parent_id.toString()
							});
						})
					})
				})
			});
		},
		methods: {
			// entry(){
			//   var _this=this
			//   	_this.$http.post(_this.$store.state.url + "/Vote/voteList",{

			//     }).then(res=>{
			//       _this.summarizing = res
			//     })
			// },
			back() {
				if (this.urls.searchParams.get("uidkey")) {
					this.$router.push('/index')
				} else {
					this.$router.go(-1)
				}

			},
			tabulation(id, type, title) {
				sessionStorage.setItem('title', title)
				if (type == 2) {
					this.$router.push('/vote/list/' + id)
				} else if (type == 1) {
					this.$router.push('/vote/enrolist/' + id)
				}
			},

			loading(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.summarizing = _this.summarizing || [];
					_this.summarizing.push(e);
				})
			},
			reload() {
				var _this = this;
				_this.showing = false;
				_this.$nextTick(function() {
					_this.showing = true;
				})
			},
			hide() {

				this.region = this.address

				this.summarizing = [];
				this.reload();
			},
			hide2() {
				if (this.Changetime == '项目') {
					this.Changetime1 = ['1']
					this.state_type = 1
					this.summarizing = [];
					this.reload();
				}
				if (this.Changetime == '人物') {
					this.Changetime1 = ['2']
					this.state_type = 2
					this.summarizing = [];
					this.reload();
				}
				if (this.Changetime == '品牌') {
					this.Changetime1 = ['3']
					this.state_type = 3
					this.summarizing = [];
					this.reload();
				}
				if (this.Changetime == '企业') {
					this.Changetime1 = ['4']
					this.state_type = 4
					this.summarizing = [];
					this.reload();
				}
				if (this.Changetime == '产品') {
					this.Changetime1 = ['5']
					this.state_type = 5
					this.summarizing = [];
					this.reload();
				}
				if (this.Changetime == '口碑') {
					this.Changetime1 = ['6']
					this.state_type = 6
					this.summarizing = [];
					this.reload();
				}
				if (this.Changetime == '技术') {
					this.Changetime1 = ['7']
					this.state_type = 7
					this.summarizing = [];
					this.reload();
				}
				if (this.Changetime == '其他') {
					this.Changetime1 = ['8']
					this.state_type = 8
					this.summarizing = [];
					this.reload();
				}
				if (this.Changetime == '全部') {
					this.Changetime1 = ['']
					this.state_type = ''
					this.summarizing = [];
					this.reload();
				}
			},
		}
	}
</script>

<style scoped>
	.vux-header {
		position: fixed !important;
		width: 100%;
		z-index: 11;
		top: 0;
	}

	.vuxSlider {
		position: relative;
		width: 100%;
		z-index: 10;
		top: 1.2rem;
	}

	.hots {
		width: 100%;
		/*height: 36px;*/
		/* background: rgba(153, 153, 153, 0.2); */
		background: #ECECEC;
		color: #666;
		font-size: 16px;
		text-align: center;
		font-weight: normal;
		/*padding-top: 6px*/
		padding: 10px 0;
		position: relative;
		top: 1.2rem;
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

	.fire {
		padding: 15px 0;
		text-align: center;
		font-size: 16px;
		width: 100%;
		color: #FD142C;
		background: #EAEAEA;
		border-top: 1px solid #E3E3E3;
		position: absolute;
		top: 8rem;

	}

	.center {
		/* width:100%;
		margin:0 auto; */
		padding: 0 10px;
		background: #EAEAEA;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		/*padding-top: 2rem;*/
	}

	.center-fire {
		border: 1px solid #D1D1D1;
		box-sizing: border-box;
		width: 49%;
		padding: 10px 5px;
		margin-top: 10px;
		position: relative;
	}

	.center-tu {
		width: 100%;
		/*height:110px;*/
		height: 3.933333rem;
		/* background:#f00; */
	}

	.center-tu img {
		width: 100%;
		height: 100%
	}

	.center-title {
		margin-top: 5px;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		justify-content: space-between;
		/*height: 108px;*/
		height: 1.7rem;
	}

	.center-head {
		font-size: 14px;
		font-weight: 600;
		color: #313131;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.center-address {
		font-size: 12px;
		color: #969696;
	}

	.center-address .center-bi {
		float: right;
		color: #D35959;
	}

	.center-address .center-bill {
		/*float:right;
		color: #D35959;*/
		position: absolute;
		color: #fff;
		z-index: 1;
		top: 0.4rem;
		left: 0rem;
		background: #00D6CF;
		font-size: 0.32rem;
		border-radius: 0 0.533333rem 0.533333rem 0;
		padding: 0.053333rem 0.266667rem 0.053333rem 0.533333rem;
	}

	.header-nav-icon {
		color: #fff;
	}

	.header-nav-icon img {
		width: 30px;
		height: 30px;
		margin-top: -3px
	}

	.center-address {
		font-size: 10px;
		color: #969696;
	}


	/*搜索*/
	.search {
		background: #fff;
		padding-top: 10px;
		/*position: absolute;
	    z-index: 11;*/
		width: 100%;
		/* top: 6.8rem;*/
		margin-top: 1.2rem;
	}

	.search .title {
		width: 100%;
		text-align: center;
		/*font-weight: 400;*/
		margin: 10px auto;
		font-size: 15px;
		font-weight: bold;
	}

	.search .searchSelect {
		width: 100%;
		text-align: center;
		/*font-weight: 400;*/
	}

	.search .vux-cell-box {
		width: 4rem;
		display: inline-block;
		border: 1px solid #d3d3d3;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		border-radius: 3px;
		padding: 0px 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.search .vux-cell-box .vux-popup-picker-select {
		text-align: left !important;
	}

	.search .vux-cell-box::before {
		border: 0px;
	}


	.card-zhi {
		width: 95%;
		margin: 0 auto;

	}

	.card-img {
		width: 100%;
		/* background: #f00; */
		height: 200px;
	}

	.card-img img {
		width: 100%;
		height: 100%;
		display: block;
		/* border-radius: 10px;
		box-shadow: 1px 1px 2px; */
		border: 1px solid #B2B2B2;
		box-sizing: border-box;
	}

	.spread-wenzi {
		width: 95%;
		margin: 0 auto;
		padding: 10px 0;
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

	.dizhi {
		color: #666;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		margin: 0 0px 0 15px;
		align-items: center;
	}


	.header-search {

		width: 100%;
		z-index: 11;
		height: 45px;
		color: #fff;
		font-size: 16px;
		position: fixed;
	}

	.search-content {
		line-height: 45px;
		height: 45px;
		background: rgba(53, 73, 94, 1);
		text-align: center;

	}

	.fanhui {
		width: 30px;
		height: 45px;
		line-height: 45px;
		float: left;
		display: flex;
		align-items: center;
	}

	.fanhui img {
		height: 30px;
		width: 100%;
	}

	.searchbox {
		display: inline-block;
		width: 225px;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
