<template>
	<div style="background: #fff;">
		<x-header title="项目信息" :left-options="{backText:''}" class="header"></x-header>
		<!--基本信息-->
		<!-- <div class="info">
			<div class="info_top">
				<div>{{$route.query.des}}</div>
				<div class="guanzhu" @click="follow(dataset.is_sub,$route.query.company_id)" v-if="dataset.is_sub==1" style="background:gainsboro;">已关注</div>
				<div class="guanzhu" @click="guanzhu(dataset.is_sub,$route.query.company_id)" v-else="">关注</div>
			</div>
			<div class="info_bottom">企业所在地:{{$route.query.cen}}</div>
		</div> -->
		
		<!-- <div class="search" id="searchId">
			<div class="searchSelect" >
				<popup-picker placeholder="类型" :data="itemHangye" v-model="add2" :show-name="true" :columns="1" @on-hide="hide2" value-text-align="left" class="sx"></popup-picker>
				<popup-picker placeholder="地区" :data="itemAddress" v-model="add" :show-name="true" :columns="2" @on-hide="hide" value-text-align="left" class="sx"></popup-picker>
			</div>
		</div>
		 -->
		
		<div class="zhongbiao" >
			<vue-message :type="6" v-for="(item,index) in lists" :key="index" :item="item"></vue-message>
			<vue-loading :url="$store.state.url + '/Collection/comBidList?page=1&limit=10&bid_id='+$route.query.id" @ievent="loaddata" v-if="isshow"></vue-loading>
		</div>
		
		
		
		<vue-dingyue></vue-dingyue>
		<vue-foot></vue-foot>
	</div>
</template>

<script>
	import { XHeader,PopupPicker,querystring} from 'vux'
	import {  VueMessage,VueDingyue,VueLoading,VueHeaders,VueFoot, } from '../component/'
	export default{
		components:{
			XHeader,
			VueMessage,
			VueDingyue,
			VueLoading,
			PopupPicker,
			querystring,
			VueHeaders,
			VueFoot,
		},
		data(){
			return{
				lists:[],
				isshow:true,
				dataset:'',
			}
		},
		created(){
// 			this.type = this.$route.query.des;
// 			if(this.type){
// 				this.shows=true
// 			}else{
// 				this.show=true
// 			}
		},
		mounted() {
			let _this=this;
			 _this.data1 = _this.$route.query.id
			 console.log(_this.data1)
// 			_this.zhaocai();
			// _this.business()
			},
		methods:{
// 			business(){
// 				let _this=this;
// 				_this.$http.post(_this.$store.state.url + "/Collection/subStatus",{
// 					company_id:_this.$route.query.company_id
// 				}).then(res=>{
// 					console.log(res)
// 					_this.dataset=res
// 					
// 				})
// 							
// 			},
			/*zhaocai(){
				let _this = this;
				_this.$http.post(_this.$store.state.url + "/Collection/tenderingRecord",{
					pId:_this.$route.query.id,
					limit:10,
					page:1
				}).then(res=>{
					console.log(res)
					_this.lists=res
				})
			},*/
			// 下拉加载
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.lists = _this.lists || [];
					_this.lists.push(e);
				})
			},
			reload() {
				var _this = this;
				_this.isshow = false;
				_this.$nextTick(function() {
					_this.isshow = true;
				})
			},
			
// 			guanzhu(data1,id){
// 				let _this = this;
// 				_this.$http.post(_this.$store.state.url + "/Collection/coSub",{
// 					is_sub:data1,
// 					company_id:id
// 				}).then(res=>{
// 					_this.business()
// 				})
// 			},
// 			follow(data,id){
// 				let _this = this;
// 				_this.$http.post(_this.$store.state.url + "/Collection/coSub",{
// 					is_sub:data,
// 					company_id:id
// 				}).then(res=>{
// 					_this.business()
// 				})
// 			}
			
		},
	}
</script>

<style scoped>
	.info{
		
       margin: 20px auto 10px;
       background: #EFEFEF;
       padding: 10px;
       box-sizing: border-box;
       border-radius: 5px;
       padding: 10px;
	   box-sizing: border-box;
	   width:90%;
	  box-shadow:0px 3px 6px rgba(0,0,0,0.16)
	}
	.info_top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid darkgrey;
		padding-bottom: 5px;
		background:#EFEFEF;
	}
	.info_top div:nth-child(1){
		font-size: 16px;
		width:80%
	}
	.info_top div:nth-child(2){
		color: white;
          background: #F88F00FF;
         border-radius: 20px;
         padding: 2px 10px;
	}
	.info_bottom{
		padding-top: 5px;
	}
	.zhongbiao{
		background: #FFFFFF;
	}
	
	.search {
		background: #EFEFEF;
		padding-top: 10px ;
		/* margin-bottom:10px */
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
	
</style>
