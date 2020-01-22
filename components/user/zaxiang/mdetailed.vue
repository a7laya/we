<template>
	<div class="ul">
		<x-header :title="'明细'" :left-options="{backText:''}">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>


		<tab :line-width='2' active-color="#F88F00">
			 <tab-item :selected="demo4 === index+1" v-for="(item, index) in list4" @on-item-click="show(index+1)" :key="index">{{item}}</tab-item>
		</tab>

		 <div v-if="index== 1" style="padding-top: 2.4rem;">
		 	<div class="li cl" v-for="(item,index) in list" :key="index">
				<span class="fl">
	            	<span class="txt">
	            		<span class="#000">{{item.account_txt}}</span>
				</span>
				<span class="time">{{item.add_time | returntime1}}</span>
				</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==1&&item.type==1">   + {{item.money/100}}个智汇币</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==1">- {{item.money/100}}个智汇币</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==2">- {{item.money/100}}个智汇豆</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==3&&item.type==1"> {{item.money/100}}个智汇币</span>
			</div>

		  	<vue-loading :url="$store.state.url + '/moneytype/record?page=1&limit=10&type=1'" @ievent="loaddata" v-if="show1"></vue-loading>
		 </div>

		 <div v-if="index== 2" style="padding-top: 2.4rem;">
		 	<div class="li cl" v-for="(item,index) in wisdom" :key="index">
				<span class="fl">
	            	<span class="txt">
	            		<span class="#000">{{item.account_txt}}</span>
				</span>
				<span class="time">{{item.add_time | returntime1}}</span>
				</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==1&&item.type==2">+ {{item.money/100}}个智汇豆</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==2">- {{item.money/100}}个智汇豆</span>
			</div>

		 	<vue-loading1 :url="$store.state.url + '/moneytype/record?page=1&limit=10&type=2'" @ievent="loaddataing" v-if="show2"></vue-loading1>
		 </div>

		 <div v-if="index== 3" style="padding-top: 2.4rem;">
		 	<div class="li cl" v-for="(item,index) in words" :key="index">
				<span class="fl">
	            	<span class="txt">
	            		<span class="#000">{{item.account_txt}}</span>
				</span>
				<span class="time">{{item.add_time | returntime1}}</span>
				</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==1&&item.type==3">+ {{item.money/100}}元</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==1&&item.type==5">+ {{item.money/100}}元</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==3">- {{item.money/100}}元</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==6">- {{item.money/100}}元</span>
				<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==7">- {{item.money/100}}元</span>
			</div>


		 	<vue-loading :url="$store.state.url + '/moneytype/record?page=1&limit=10&type=3'" @ievent="loaddatas" v-if="show3"></vue-loading>
		 </div>
		<!--<div class="li cl" v-for="(item,index) in list">
			<span class="fl">
            	<span class="txt">
            		<span class="#000">{{item.account_txt}}</span>
			</span>
			<span class="time">{{item.add_time | returntime1}}</span>
			</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==1&&item.type==1">   + {{item.money/100}}个智汇币</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==1&&item.type==2">+ {{item.money/100}}个智汇豆</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==1&&item.type==3">+ {{item.money/100}}元</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==1&&item.type==5">+ {{item.money/100}}元</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==1">- {{item.money/100}}个智汇币</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==2">- {{item.money/100}}个智汇豆</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==3">- {{item.money/100}}元</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==6">- {{item.money/100}}元</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==2&&item.type==7">- {{item.money/100}}元</span>
			<span class="fr" style="color: #007DDB;" v-if="item.capital_type==3&&item.type==1"> {{item.money/100}}个智汇币</span>
		</div>
		<vue-loading1 :url="$store.state.url + '/moneytype/record?page=1&limit=15'" @ievent="loaddata"></vue-loading1>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>-->
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader,Tab, TabItem } from 'vux'
	import { VueLoading1, VueHeaderNav, VueShareit,VueLoading } from '../../component/'
	export default {
		components: {
			XHeader,
			VueLoading1,
			VueHeaderNav,
			VueShareit,
			Tab, TabItem,
			VueLoading,
		},
		data() {
			return {
				list:[],
				list4:['智汇币','智汇豆','资金明细'],
				index:1,
				demo4:1,
				wisdom:[],
				words:[],
				show1:true,
				show2:true,
				show3:true,
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
					link: '/user/index'
				}
			}
		},
		methods: {





			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
				})
			},
			loaddataing(res){
				var _this = this;
				_.each(res, function(e) {
					_this.wisdom = _this.wisdom || [];
					_this.wisdom.push(e);
				})
			},
			loaddatas(res){
				var _this = this;
				_.each(res, function(e) {
					_this.words = _this.words || [];
					_this.words.push(e);
					console.log(_this.words)
				})
			},
			reload() {
				var _this = this;
				_this.show1 = false;
				_this.$nextTick(function() {
					_this.show1 = true;
				})
			},
			reload1() {
				var _this = this;
				_this.show2 = false;
				_this.$nextTick(function() {
					_this.show2 = true;
				})
			},
			reload2() {
				var _this = this;
				_this.show3 = false;
				_this.$nextTick(function() {
					_this.show3 = true;
				})
			},
			show(i) {
				let _this = this;
				_this.index = i;
				if(i == 1) {
					_this.reload()

				} else if(i == 2) {
					_this.reload1()



				} else if(i == 3) {
					_this.reload2()
				}
				_this.list=[],
				_this.wisdom=[],
				_this.words=[]
			},

		}
	}
</script>

<style scoped>
	.li {
		line-height: 30px;
		font-size: 14px;
		padding: 0 15px;
		background: #fff;
		margin-top: 1px;
	}

	.li .txt,
	.li .time {
		display: block;
	}

	.li .time {
		color: #999;
	}

	.vux-header {
		position: fixed!important;
		top: 0;
		width: 100%;
    z-index: 1111;
	}
  .vux-tab-wrap {
    position: fixed!important;
    width: 100%;
    top: 1.2rem;
    z-index: 1000;
  }


</style>
