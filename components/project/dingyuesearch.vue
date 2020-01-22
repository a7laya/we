<template>
	<div>
		<!-- <vue-heading></vue-heading> -->
		<x-header title="项目订阅信息" :left-options="{backText:''}" class="header"></x-header>
		<tab active-color="#F88F00">
			<tab-item selected @on-item-click="show(1)">关键词</tab-item>
			<tab-item @on-item-click="show(2)">单位</tab-item>
		</tab>
		
		
		
		
		<!-- 关键词 -->
		<div v-if="index==1" class="times">
			<vue-message :type="4" v-for="(item,index) in list" :item="item" :key="index"></vue-message>
			<vue-loading :url="$store.state.url + '/Collection/subscribeList?page=1&limit=10&type=1'" @ievent="loaddata" v-if="show1"></vue-loading>
		</div>
		
		<!-- 单位 -->
		<div v-if="index==2" class="times">
			<vue-message :type="7" v-for="(item,index) in project" :item="item" :key="index"></vue-message>
			<vue-loading1 :url="$store.state.url + '/Collection/subscribeList?page=1&limit=10&type=2'" @ievent="loaddatas" v-if="show2"></vue-loading1>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { Tab, TabItem,XHeader} from 'vux'
	import {VueMessage,VueHeading,VueLoading,VueLoading1,VueShareit} from '../component/'
	export default {
		components:{
			Tab,
			TabItem,
			VueMessage,
			VueHeading,
			VueLoading,
			VueLoading1,
			XHeader,
			VueShareit
			
		},
		data(){
			return{
				index:1,
				show1:true,
				show2: true,
				project:[],
				list:[],
				num:1,
			}
		},
		mounted(){
		},
		computed: {
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
			show(i) {
				let _this = this;
				_this.index = i;
				if(i == 1) {
					this.reload1()
				}  else {
					this.reload2()
				}
				this.list = [];
				this.project = []
			
			},
			loaddatas(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.project = _this.project || [];
					_this.project.push(e);
				})
			},
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
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
		},
	}
</script>

<style scoped>
</style>
