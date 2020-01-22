<template>
	<div class="container">
		<x-header class="header">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">账户明细</div>
		</x-header>
		<tab :line-width=2 active-color='#FF7F00' custom-bar-width="60px">
			<tab-item selected @on-item-click="onItemClick(1)">红包明细</tab-item>
			<tab-item @on-item-click="onItemClick(2)">智汇币明细</tab-item>
		</tab>
		<div class="block"></div>
		<template v-if="index==1">
			<div class="body">
				<div class="list_box" v-for="(item,index) in list">
					<img :src='"/static/img/game/26.png"' alt="">
					<div class="detail">
						<span>收入红包</span>
						<span>{{item.time| returntime6}}</span>
					</div>
					<div class="money">
						<span>+</span>
						<span>{{item.money/100}}元</span>
					</div>
				</div>
			</div>
			<vue-loading :url="$store.state.url + '/Applets/personal_center_account?page=1&limit=10&type=25'" @ievent="loaddata"></vue-loading>
		</template>
		<template v-if="index==2">
			<div class="body">
				<div class="list_box" v-for="(item,index) in list">
					<img :src='"/static/img/game/34.png"' alt="">
					<div class="detail">
						<span>{{item.account_txt}}</span>
						<span>{{item.add_time| returntime6}}</span>
					</div>
					<div class="money">
						<span v-if="item.capital_type == 1">+</span>
						<span v-else="item.capital_type == 2">-</span>
						<span>{{item.money / 100}}智汇币</span>
					</div>
				</div>
			</div>
			<vue-loading :url="$store.state.url + '/Applets/game_detail?page=1&limit=10'" @ievent="loaddata"></vue-loading>
		</template>
		<vue-game :type="2"></vue-game>
		<vue-shareit></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, Badge, Tab, TabItem } from 'vux'
	import { VueLoading, VueList, VueHeaderNav } from '../component/'
	import VueShareit from '../component/game/gameShareit'
    import {VueGame} from '../component/'
	export default {
		components: {
			XHeader,
			Badge,
			VueLoading,
			VueShareit,
			Tab,
			TabItem,
			VueList,
			VueHeaderNav,
			VueGame
		},
		data() {
			return {
				borderColor: {
					borderColor: '#333333'
				},
				list: undefined,
				index: 1,
				type: 25
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
		created() {},
		watch: {

		},
		methods: {
			goBack() {
				// history.go(-1)
        this.$router.push('/game/GameMine')
			},
			onItemClick(index) {
				var _this = this;
				this.index = -1
				setTimeout(function() {
					_this.index = index;
					_this.list = undefined;
				}, 50)
			},
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		position: relative;
		width: 100%;
		-webkit-background-size: 100%;
		background-size: 100%;
		overflow: hidden;
		background: white;
	}

	.vux-header {
		background-color: #ffffff;
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
		/*height: 90vh;*/
		background: white;
		overflow: scroll;
	}

	.body .list_box {
		width: 345px;
		margin: 0px auto;
	}

	.body .list_box {
		height: 55px;
		font-size: 14px;
		border-bottom: 1px solid #EEEEEE;
		color: #666666;
	}

	.body .list_box img {
		float: left;
		display: inline-block;
		width: 29px;
		height: 29px;
		margin-top: 13px;
	}

	.body .list_box .detail {
		float: left;
		margin-left: 17px;
		margin-top: 11px;
	}

	.body .list_box .detail span:nth-child(1) {
		display: block;
	}

	.body .list_box .detail span:nth-child(2) {
		display: block;
	}

	.body .list_box .money {
		float: right;
		margin-right: 30px;
		font-weight: bold;
		font-size: 16px;
		color: #333;
		margin-top: 18px;
	}

	.block {
		width: 100%;
		height: 10px;
		background: #F2F2F2;
	}
</style>
