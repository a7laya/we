<template>
	<div class="container">
		<x-header class="header">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">提现记录</div>
		</x-header>
		<!--    <tab :line-width=3 active-color='#FF7F00' v-model="index" custom-bar-width="65px">-->
		<!--      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @on-item-click="go(index+1)" :key="index">{{item}}</tab-item>-->
		<!--    </tab>-->
		<!--    <div class="tab-swiper vux-center">-->
		<!--      <vue-list :type="type" :item="list" :result="result"></vue-list>-->
		<!--    </div>-->
		<div class="block"></div>
		<vue-game :type="2"></vue-game>
		<div class="body">
			<ul v-for="(item,index) in list">
				<li>
					<div class="detail">
						<span>提现申请</span>
						<span>{{item.time| returntime4}}</span>
					</div>
					<div class="money">
						<span>{{item.typename}}</span>
						<span class="moneyData">{{item.money/100}}元</span>
					</div>
				</li>
			</ul>
		</div>
		<vue-loading :url="$store.state.url + '/Applets/personal_center_cash?page=1&limit=10'" @ievent="loaddata"></vue-loading>
		
		<vue-shareit></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, Badge, Tab, TabItem, Swiper } from 'vux'
	import VueLoading from '../component/game/loading'
	import VueShareit from '../component/game/gameShareit'
	import {VueGame} from '../component/'
	// const list = () => ['创建发布', '正在使用', '历史发布']
	export default {
		components: {
			XHeader,
			Badge,
			VueLoading,
			VueShareit,
			Tab,
			TabItem,
			Swiper,
			VueGame
		},
		data() {
			return {
				list: null,
				borderColor: {
					borderColor: '#333333'
				},
				// index: 0,
				// list2: list(),
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		mounted() {
			var _this = this
		},
		created() {
			// this.getData()
		},
		methods: {

			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
				})
			},
			goBack() {
				history.go(-1)
			}
		}
	}
</script>

<style scoped>
	.vux-header {
		background-color: #ffffff;
	}

	.container {
		position: relative;
		width: 100%;
		/*height:100vh;*/
		-webkit-background-size: 100%;
		background-size: 100%;
		overflow: hidden;
		background: white;
	}

	.goBack {
		position: absolute;
		width: 12px;
		height: 12px;
		border-style: solid;
		border-color: white;
		border-width: 1px 0 0 1px;
		-webkit-transform: rotate(315deg);
		transform: rotate(315deg);
		top: 3px;
	}

	.title {
		font-size: 18px;
		text-align: center;
		line-height: 1.066667rem;
	}

	.body {
		width: 100%;
		background: white;
		margin-top: 10px;
	}

	.body ul {
		margin: 0px auto;
	}

	.body ul li {
		height: 55px;
		font-size: 14px;
		border-bottom: 1px solid #EEEEEE;
		color: #666666;
		overflow: hidden;
	}

	.body ul li img {
		float: left;
		display: inline-block;
		width: 29px;
		height: 29px;
		margin-top: 13px;
	}

	.body ul li .detail {
		float: left;
		margin-left: 17px;
		margin-top: 11px;
	}

	.body ul li .detail span:nth-child(1) {
		display: block;
	}

	.body ul li .detail span:nth-child(2) {
		display: block;
	}

	.body ul li .money {
		float: right;
		margin-right: 30px;
		font-size: 12px;
		color: #999999;
		margin-top: 15px;
		text-align: right;
	}

	.body ul li .money span {
		display: block;
	}

	.moneyData {
		font-size: 15px;
		font-weight: bold;
		color: #E41F1F;
	}

	.noData {
		text-align: center;
		color: #CCCCCC;
		margin-top: 19px;
		padding-bottom: 19px;
	}

	.block {
		width: 100%;
		height: 10px;
		background: #F2F2F2;
	}
</style>
