<template>
	<div>
		 <!--<x-header :title="'招采信息'" :left-options="{backText:''}" class="header"></x-header>--> 
		
		<!-- <vue-header></vue-header> -->
		<!-- type=1为招采结果 -->
		<vue-searchhead :type='1'></vue-searchhead>
		 <!--<div class="button_fabu fl">
		    <vue-caixuan ref="sfilter" @ievent="ievent">筛选</vue-caixuan>
		 </div>-->
		
		<!--<div class="header-search">
		    <div class="search-content">
		        <div class="searchbox fl">
		            <input  placeholder="请输入任务/关键字" class="txt" v-model="txt">
		            <i class="iconfont icon-sousuo" @click="form"></i>
		        </div>
		        <div class="button_fabu fl">
		        	<vue-caixuan ref="sfilter" @ievent="ievent">筛选</vue-caixuan>
		        </div>
		    </div>
		</div>-->
		
		<!--<div class="search">
			<div class="searchSelect" >
				 <vue-address1 v-model="address" show="true"  title="地区" class="change"></vue-address1>
				<popup-picker  title="时间" :data="time" v-model="Changetime" class="change"></popup-picker>
				<vue-hangye :title="'行业'" v-model="hangye" show="true" class="change"></vue-hangye> 
			</div>
		</div>-->
		<div style="margin-top:12%">
		   <vue-message :type="1" v-for="(item,index) in projects" :item="item" :key="index"></vue-message>
		 
		</div>
		<vue-loading :url="$store.state.url + '/Collection/projectList?page=1&limit=10&type=1'" @ievent="loaddata" v-if="isshow"></vue-loading>
		<!--<div style="margin-top:12%" >
		   <vue-message :type="1" v-for="(item,index) in projects" :item="item" :key="index"></vue-message>
		   <vue-loading :url="$store.state.url + '/Collection/projectList?page=1&limit=10'" @ievent="loaddata" v-if="isshow"></vue-loading>
		</div>-->
		
		
		<vue-dingyue></vue-dingyue>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader,Badge, PopupPicker} from 'vux'
	import {  VueShareit, VueMessage,VueRed,VueAddress1,VueHangye,VueLoading,VueSearchhead,VueHeader,VueDingyue,VueCaixuan} from '../component/'
	export default {
		components:{
			XHeader,
			Badge,
			PopupPicker,
			VueShareit,
			VueMessage,
			VueAddress1,
			VueHangye,
			VueLoading,
			VueHeader,
			VueDingyue,
			VueCaixuan,
			VueSearchhead
		},
		data(){
			return{
				address:'',
				time:[['最近3天','一周','一月']],
				Changetime:[[]],
				showPopupPicker: false,
				hangye:'',
				projects:[],
				isshow:true,
				list:[],
				url:undefined,
				txt:'',
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
					link: this.$route.path + '?uidkey=' + this.$store.state.mem_id
				}
			},
		},
		methods:{
			project(){
				let _this = this;
				_this.$http.post(_this.$store.state.url + '/Collection/projectList', { //最新项目信息
					'load': false,
					page:1,
					limit:10,
					type: 1
				}).then((res) => {
					if(!res) return;
					_this.projects= res;
				})
			},
			loaddata(res) {
				// console.log(res)
				var _this = this;
				_.each(res, function(e) {
					_this.projects = _this.projects || [];
					_this.projects.push(e);
					// console.log(_this.projects)
				})
			},
			reload() {
				var _this = this;
				_this.isshow = false;
				_this.$nextTick(function() {
					_this.isshow = true;
				})
			},
			
			
			
			
//			form(){
//				this.url = undefined;
//				this.list = [];
//				this.$refs.sfilter.clickcelbuttom()
//				if(!this.txt){
//					msg("请输入需搜索的内容");
//					return;
//				}
//				setTimeout(() => {
//					this.url = 'keyword=' + this.txt;
//				},100)
//			},
//			 ievent(res){
//				// console.log(res)
//				if(this.txt){
//					res.keyword = this.txt;
//				}
//				this.url = undefined;
//				this.list = [];
//				setTimeout(() => {
//					this.url = querystring.stringify(res);
//				},100)
//			},
//			 loaddata(res) {
//			    var _this = this;
//			    _.each(res, function(e) {
//			        _this.list = _this.list || [];
//			        _this.list.push(e);
//			    })
//			},
			
			
			
			
			
			
			
			
			
		},
		mounted(){
			this.project()
			
		    var _this = this;
			
		},
		created(){
			this.reload()
			
		}
	}
</script>

<style scoped>
	
	.search {
		background: #fff;
	}
	
	.search .title {
		width: 100%;
		text-align: center;
		margin: 10px auto;
		font-size: 15px;
		font-weight: bold;
	}
	
	.search .searchSelect {
		display:flex;
		justify-content: space-around;
		width: 100%;
		
	}
	
	.search .vux-cell-box {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
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
	.icondown{
		padding:5px 0;
		background:#fff;
		border-top:1px solid #707070;
		text-align: center;
	}
	.message{
		background:#fff;
	}
	
	
	
	/*.search {
		background: #fff;
		padding-top: 10px ;
	}
	
	.search .title {
		width: 100%;
		text-align: center;
		margin: 10px auto;
		font-size: 15px;
		font-weight: bold;
	}
	
	.search .searchSelect {
		width: 100%;
		text-align: center;
	}
	
	.search .vux-cell-box {
		width: 2.8rem;
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
	}*/
	
	
	
	
</style>
