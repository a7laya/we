<template>
	<div style="background: #fff;">
		<x-header title="代理机构招采记录" :left-options="{backText:''}" class="header"></x-header>
		<!--基本信息-->
		<div class="info">
			<div class="info_top">
				<div>招标代理：</div>
				<div>{{$route.query.des}}</div>
				<div class="guanzhu" @click="follow(dataset.is_sub,$route.query.id,$route.query.con)" v-if="dataset.is_sub==1" style="background:gainsboro;">已关注</div>
				<div class="guanzhu" @click="guanzhu(dataset.is_sub,$route.query.id,$route.query.con)" v-else="">关注</div>
			</div>
			<div class="head-address">
				<div class="info_bottom">企业所在地:{{$route.query.cen}}</div>
				<div class="head-pone" @click="phone($route.query.id,$route.query.con)">联系电话</div>
			</div>
		</div>
		
	
		
		<div class="zhongbiao">
			<vue-message :type="2" v-for="(item,index) in lists" :key="index" :item="item"></vue-message>
			<vue-loading :url="$store.state.url + '/Collection/agentBiddingList?page=1&limit=10&agent_id='+$route.query.id" @ievent="loaddata" v-if="isshow"></vue-loading>
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
		mounted() {
			let _this=this;
			 _this.data1 = _this.$route.query.id
			_this.business()
			},
		methods:{
			business(){
				let _this=this;
				_this.$http.post(_this.$store.state.url + "/Collection/subStatus",{
					company_id:_this.$route.query.id
				}).then(res=>{
					console.log(res)
					_this.dataset=res
					
				})
							
			},
			zhaocai(){
				let _this = this;
				_this.$http.post(_this.$store.state.url + "/Collection/agentBiddingList",{
					agent_id:_this.$route.query.id,
					limit:10,
					page:1
				}).then(res=>{
					console.log(res)
					_this.lists=res
				})
			},
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

			
			guanzhu(data1,id,des){
				let _this = this;
				_this.$http.post(_this.$store.state.url + "/Collection/coSub",{
					is_sub:data1,
					company_id:id,
					company_type:des
				}).then(res=>{
					_this.business()
				})
			},
			follow(data,id,des){
				let _this = this;
				_this.$http.post(_this.$store.state.url + "/Collection/coSub",{
					is_sub:data,
					company_id:id,
					company_type:des
				}).then(res=>{
					_this.business()
				})
			},
			 phone(id,des){
				let _this=this;
				_this.$router.push("dailian?id="+id+"&des="+des+"&type=2" )
			},
			
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
		/* align-items: center; */
		border-bottom: 1px solid darkgrey;
		padding-bottom: 5px;
		background:#EFEFEF;
	}
	.info_top div:nth-child(1){
		font-size: 14px;
		white-space: nowrap;
		color: #01B0B7
	}
	.info_top div:nth-child(2){
		font-size: 14px;
		width:64%;
		/* line-height: 20px; */
		font-weight: 600;
	}
	.info_top div:nth-child(3){
		color: white;
         background: #F88F00;
         border-radius: 20px;
         padding: 0px 10px;
		 height: 20px;
		 line-height: 20px;
		 width:15%;
		 text-align: center;
	}
	.head-address{
		display: flex;
		justify-content: space-between;
	}
	
	.info_bottom {
		padding-top: 5px;
		font-size: 14px;
		/* align-items: center; */
		width:70%;
	}
	.head-pone{
		font-size:12px;
		background: #F88F00;
		padding:0 4px;
		border-radius: 20px;
		color:#fff;
		height:25px;
		line-height: 25px;
		margin-top:10px;
		width: 20%;
		text-align: center;
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

