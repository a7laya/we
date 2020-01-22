<template>
	<div style="background:#fff">
		<x-header title="该企业联系方法" :left-options="{backText:''}" class="header"></x-header>
		<div class="info">
			<div class="info-dan">招标单位：</div>
			<div class="info_top">
				<!-- <div>招标单位：</div> -->
				<!-- <div>{{$route.query.des}}</div> -->
				<div>{{list.tenderer}}</div>
				<!-- <div>关注</div> -->
				<div class="guanzhu" @click="follow(dataset.is_sub,$route.query.id)" v-if="dataset.is_sub==1" style="background:gainsboro;">已关注</div>
				<div class="guanzhu" @click="guanzhu(dataset.is_sub,$route.query.id)" v-else="">关注</div>
			</div>
			<!-- <div class="info_bottom">企业所在地:{{$route.query.cen}}</div> -->
		</div>
		
		<div class="touch">
			<div class="fazhuan" >
				<!-- <h4>招标信息</h4> -->
				<div style="margin-bottom:10px">单位：{{list.tenderer}}</div>
				<div style="margin-bottom:10px">姓名：{{list.bid_name}}</div>
				<div class="handset" style="margin-bottom:10px" v-if="tend">
					<div class="handsets">电话：{{list.bid_phone}}</div>
						
						<a  :href="'tel://'+list.bid_phone">
							<div class="hand" >
							<img src="/static/img/xiaoxi.png">
							</div>
						</a>
		
				</div>
				<div>地址：{{list.bid_address}}</div>
		
			</div>
			<!-- <div class="fazhuan">
				<h4>招标代理信息</h4>
				<div style="margin-bottom:10px">单位：河南天马招标带有有限公司</div>
				<div style="margin-bottom:10px">姓名：王总</div>
				<div class="handset" style="margin-bottom:10px" v-if="tends">
					<div class="handsets">1300000000</div>
					
						<a  :href="'tel://'+prosonInfo.agent_phone" >
							<div class="hand" >
							<img src="/static/img/xiaoxi.png">
							</div>
						</a>
					
				
				</div>
				
				<div>河南省郑州市金水区东风路金城国际广场50楼</div>
		
			</div> -->
		</div>
		<vue-dingyue></vue-dingyue>
		<vue-foot></vue-foot>
	</div>
</template>

<script>
	import { XHeader} from 'vux'
	import { VueDingyue,VueFoot, } from '../component/'
	export default{
		components:{
			XHeader,
			VueDingyue,
			VueFoot,
		},
		data(){
			return{
				tends:true,
				tend:true,
				list:'',
				dataset:''
			}
		},
		mounted(){
			var _this = this;
			_this.business();
			_this.$http.post(_this.$store.state.url + "/Collection/bidAgentTel",{
				com_id:_this.$route.query.id,
				type:_this.$route.query.type
			}).then(res=>{
				_this.list = res
        if(!_this.list.bid_phone ){
        	_this.tend=false
        }
			})
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
			}
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
		/* border-bottom: 1px solid darkgrey; */
		padding-bottom: 5px;
		background:#EFEFEF;
	}
	
	.info-dan {
		font-size: 14px;
		white-space: nowrap;
		color: #01B0B7
	}
	.info_top div:nth-child(1){
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
	.touch{
		width:90%;
		margin: 0 auto
	}
	.fazhuan {
		padding: 20px 10px;
		box-sizing: border-box;
		margin-bottom: 1px;
		background: #FFFFFF;
		border-bottom:1px solid #707070 ;
	}
	.handset {
		display: flex;
		justify-content: space-between;
	}
	
	.handset .hand {
		width: 23px;
		height: 18px;
	}
	
	.handset .hand img {
		width: 100%
	}
</style>
