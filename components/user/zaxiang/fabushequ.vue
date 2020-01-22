<template>
	<div>
		<x-header :title="'我的社区'" :left-options="{backText:''}"></x-header>
		<tab>
			<!-- <tab-item selected @on-item-click="show(1)">我发布的</tab-item>
      <tab-item @on-item-click="show(2)">我评论的</tab-item> -->
      <tab-item :selected="demo4 === index+1" v-for="(item, index) in list4" @on-item-click="show(index+1)" :key="index">{{item}}</tab-item>
		</tab>
		<div v-if="index==1">
			<vue-she-qu v-for="(item,index) in lists" :item="item" :key="index" :type="2"></vue-she-qu>
			<vue-loading :url="$store.state.url + '/Follow/dy_list?page=1&limit=10'" @ievent="loaddatas" v-if="show1"></vue-loading>
		</div>
		<div v-if="index==2">
			<vue-she-qu v-for="(item,index) in list" :item="item" :key="index" :type="2"></vue-she-qu>
			<vue-loading1 :url="$store.state.url + '/Follow/review_list?page=1&limit=10'" @ievent="loaddata" v-if="show2"></vue-loading1>
		</div>

		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, Tab, TabItem } from 'vux'
	import { VueLoading, VueLoading1, VueShareit, VueSheQu } from '../../component'
	export default {
		components: {
			XHeader,
			VueShareit,
			VueSheQu,
			VueLoading,
			Tab,
			TabItem,
			VueLoading1
		},
		data() {
			return {
				lists: [],
				index: 1,
				list: [],
				show1: true,
				show2: true,
        demo4: 1,
        list4: ['我发布的','我评论的']
			}
		},
		mounted() {
			var _this = this;
      if (_this.$route.query.id) {
        _this.demo4 = 2
        _this.show(2)
      } 
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
			//下载加载
			loaddatas(res) {
				var _this = this
				_.each(res, function(e) {
					_this.lists = _this.lists || []
					_this.lists.push(e)
				})
			},
			loaddata(res) {
				var _this = this
				_.each(res, function(e) {
					_this.list = _this.list || []
					_this.list.push(e)
				})
			},

			//刷新下载刷新节点
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
			show(i) {
				let _this = this;
				_this.index = i;
				if(i == 1) {
					_this.reload1();
				} else {
					_this.reload2();
				}
				_this.list = [];
				_this.lists = [];
			}

		}
	}
</script>

<style scoped>

</style>
