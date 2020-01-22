<template>
	<div style="background: #fff;">
		<x-header title="招采记录" :left-options="{backText:'',preventGoBack:true}" class="header" @on-click-back="fanhui($route.query.id,$route.query.is_error)"></x-header>
		<!-- <vue-headers :name='$route.query.id' :is_error='$route.query.is_error'></vue-headers> -->
    <!-- <vue-headers :name='$route.params.id'></vue-headers> -->
		<!--基本信息-->
		<div class="info">
			<div class="info_top">
				<div>招标单位：</div>
				<div>{{$route.query.des}}</div>
       <!-- <div>{{$route.params.des}}</div> -->
				<div class="guanzhu" @click="follow(dataset.is_sub,$route.query.company_id)" v-if="dataset.is_sub==1" style="background:gainsboro;">已关注</div>
				<div class="guanzhu" @click="guanzhu(dataset.is_sub,$route.query.company_id)" v-else="">关注</div>
			</div>
			<div class="head-address">
				<div class="info_bottom">企业所在地：{{$route.query.cen}}</div>
				<div class="head-pone" @click='phone($route.query.company_id)'>联系电话</div>
			</div>


		</div>

		<!-- <div class="search" id="searchId">
			<div class="searchSelect" >
				<popup-picker placeholder="类型" :data="itemHangye" v-model="add2" :show-name="true" :columns="1" @on-hide="hide2" value-text-align="left" class="sx"></popup-picker>
				<popup-picker placeholder="地区" :data="itemAddress" v-model="add" :show-name="true" :columns="2" @on-hide="hide" value-text-align="left" class="sx"></popup-picker>
			</div>
		</div>
		 -->

		<div class="zhongbiao">
			<vue-message :type="2" v-for="(item,index) in lists" :key="index" :item="item" :is_error='$route.query.is_error'></vue-message>
			<vue-loading :url="$store.state.url + '/Collection/tenderingRecord?page=1&limit=10&pId='+$route.query.id" @ievent="loaddata" v-if="isshow"></vue-loading>
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
				add:[],
				add2:[],
				itemAddress:[],
				itemHangye:[
					{
						name:"拟建信息",
						value:'-100',
						parent: '0'
					},
					{
						name:"招采信息",
						value:'-100',
						parent: '0'
					},
					{
						name:"中标结果",
						value:'-100',
						parent: '0'
					}
				],
				type: 0,
				show: true,
				text: [
					'加载中...',
					'加载完成',
					'没有更多数据了'
				],
				page: 1,
				dataset:'',
				data1:''
			}
		},
		mounted() {
      var a = new URL(window.location.href)
      console.log(a.searchParams.get("id"),1)
       // console.log(window.location.search)
       // console.log(window.location.search.split('?')[1].split('&')
			let _this=this;
			 _this.data1 = _this.$route.query.id
			 console.log(_this.data1)
// 			_this.zhaocai();
			_this.business()
			},
		methods:{
			business(){
				let _this=this;
				_this.$http.post(_this.$store.state.url + "/Collection/subStatus",{
					company_id:_this.$route.query.company_id
				}).then(res=>{
					console.log(res)
					_this.dataset=res

				})

			},
      fanhui(id,is_error){
        this.$router.push('/project/subject/'+ id + '/' + '商机分析'+ '/' + is_error )
      },
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
			hide(i) {
				var _this = this;
				_this.region = _this.add;
				_this.list = [];
				_this.reload();
			},
			hide2() {
				var _this = this;
				_this.hangye = _this.add2;
				_this.list = [];
				// _this.reload();
			},


			guanzhu(data1,id){
				let _this = this;
				_this.$http.post(_this.$store.state.url + "/Collection/coSub",{
					is_sub:data1,
					company_id:id
				}).then(res=>{
					_this.business()
				})
			},
			follow(data,id){
				let _this = this;
				_this.$http.post(_this.$store.state.url + "/Collection/coSub",{
					is_sub:data,
					company_id:id
				}).then(res=>{
					_this.business()
				})
			},
			phone(id){
				let _this=this;
				_this.$router.push("lianxi?id="+id+"&type=1" )
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
		border-bottom: 1px solid darkgrey;
		padding-bottom: 5px;
		background:#EFEFEF;
	}

	.info_top div:nth-child(1) {
		font-size: 14px;
		white-space: nowrap;
		color: #01B0B7
	}
	.info_top div:nth-child(2){
		font-size: 14px;
		font-weight: 600;
		width:64%;
		/* line-height:20px; */
	}
	.info_top .guanzhu{
		color: white;
	    background: #F88F00;
	    border-radius: 20px;
	    padding: 0px 10px;
		height: 20px;
		line-height:20px;
		width:15%;
		text-align: center;
	}

	.head-address{
		display: flex;
		justify-content: space-between;

	}

	.info_bottom{
		padding-top: 5px;
		font-size: 14px;
		width:70%
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
