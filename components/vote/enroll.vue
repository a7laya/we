<template>
	<div>
		<!-- <x-header :left-options="{backText: ''}" :right-options="{showMore: true}" @on-click-more="showMenus = true">投票活动首页</x-header> -->
		<!-- <x-header :left-options="{backText: ''}">投票活动首页<a slot="right"><img src="/static/img/sousuo1.png"></a></x-header> -->
		<x-header :title="'网选选手征集'" :left-options="{backText:''}" class="header" id="headerX">
			<!--<div slot="right">
				
				<div class="header-nav-icon"><img src="/static/img/sousuo1.png"></div>
			</div>-->
		</x-header>

		<!-- <vue-swiper :type="4"></vue-swiper> -->
		<div class="hots">
			<div class="hots-txt">
				专业服务弱电行业&#x3000;&#x3000; 简单高效&#x3000;
				<div class="hots-right">
					<span>hot</span>
				</div>
			</div>
		</div>
		<div class="fire">
			<span>火热征集中 ... ...</span>
		</div>
		<div class="center">
			<div class="center-fire" @click="tabulation(item.id)" v-for="(item,index) in summarizing" :key="index">
				<div class="center-tu">
					<!-- <img src="/static/img/veer-132993762.jpg"> --><img :src="$store.state.website.website_domain_name + '/uploads/' + item.img"></div>
				<div class="center-title">
					<div class="center-head">{{item.title}}</div>
					<div>
						<div class="center-address">
							<!-- <span>征集地址</span> -->
							<span>{{item.address}}</span>
							<span class="center-bill" v-if="time >= item.end_time ">投票结束</span>
							<span class="center-bill" v-else-if="time >= item.start_time">投票进行中</span>

							<span class="center-bill" v-else-if="time<item.start_time">选手征集中</span>
							<!-- <span class="center-bill" v-if="item.end_time>= time">正在投票</span>
               <span class="center-bill" v-else="">投票结束</span> -->
						</div>
						<div class="center-address">
							<span >开始时间：</span>
							<span style="color:#D35959;display: block;text-align: center;">{{item.start_time | returntime1}}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- <div class="center-fire" @click="tabulation">
				 <div class="center-tu"><img src="/static/img/veer-132993762.jpg"></div>
				 <div class="center-title">
					 <div class="center-head">2019《兆龙杯》最美汽车投票活动</div>
					 <div class="center-address">
						 <span>地址：郑州</span>
						 <span class="center-bill">正在投票</span>
					 </div>
				 </div>
			</div> -->
		</div>
		<vue-loading :url="$store.state.url + '/Vote/voteList?page=1&limit=10&type=2'" @ievent="loading" v-if="showing"></vue-loading>
		<!-- <vue-collect></vue-collect> -->
		<vue-foot></vue-foot>

		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, } from 'vux'
	import { VueSwiper, VueFoot, VueShareit, VueLoading, VueCollect, } from '../component'
	export default {
		components: {
			XHeader,
			VueSwiper,
			VueFoot,
			VueShareit,
			VueLoading,
			VueCollect,
		},
		data() {
			return {
				summarizing: '',
				time: '',
				showing: true,
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {

				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电投票频道，他在智汇优库网选频道等您！',
					imgUrl: '/static/logo.png',
					link: ''
				}
			},
		},
		mounted() {
			// this.entry()
			// console.log(Date.parse(new Date()) / 1000)
			const timer = setInterval(() => {
				// this.time = this.item.end_time - (Date.parse(new Date()) / 1000);
				// console.log(Date.parse(new Date()) / 1000)
				this.time = (Date.parse(new Date()) / 1000)
				// console.log(this.time)
			}, 100);

			this.$once('hook:beforeDestroy', () => {
				clearInterval(timer);
			})

		},
		methods: {
			// entry(){
			//   var _this=this
			//   	_this.$http.post(_this.$store.state.url + "/Vote/voteList",{

			//     }).then(res=>{
			//       _this.summarizing = res
			//     })
			// },
			tabulation(id) {
				this.$router.push('/vote/enrolist/' + id)
			},

			loading(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.summarizing = _this.summarizing || [];
					_this.summarizing.push(e);
				})
			},
		}
	}
</script>

<style scoped>
	.hots {
		width: 100%;
		/*height: 36px;*/
		/* background: rgba(153, 153, 153, 0.2); */
		background: #22BAC0;
		color: #666;
		font-size: 16px;
		text-align: center;
		font-weight: normal;
		/*padding-top: 6px*/
		padding: 10px 0;
		position: relative;
		color: #fff
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
		border-top: 1px solid #E3E3E3
	}
	
	.center {
		/* width:100%;
		margin:0 auto; */
		padding: 0 10px;
		background: #EAEAEA;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.center-fire {
		border: 1px solid #D1D1D1;
		box-sizing: border-box;
		width: 49%;
		padding: 10px 5px;
		margin-top: 10px;
	}
	
	.center-tu {
		width: 100%;
		height: 110px;
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
		 height:108px; 
		/*height:2.7rem;*/
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
		font-size: 10px;
		color: #969696;
	}
	
	.center-address .center-bill {
		float: right;
		color: #D35959;
	}
	
	.header-nav-icon {
		color: #fff;
	}
	
	.header-nav-icon img {
		width: 30px;
		height: 30px;
		margin-top: -3px
	}
</style>