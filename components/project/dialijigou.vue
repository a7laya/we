<template>
	<div>
		<x-header :title="'招标代理机构'" :left-options="{backText:''}" class="header"></x-header>

		<!-- 商机分析 -->
		<div class="times">
			<div class="fenxi">
				<div class='head-nav'>
					<div class="head-nav2">
						<div class="head-daili">招标代理：</div>
						<div class="head-title">{{info.agent_name}}</div>
						<!-- <div class="guanzhu">关注</div> -->
						<div class="guanzhu" @click="follow(dataset.is_sub,$route.query.id,info.company_type)" v-if="dataset.is_sub==1" style="background:gainsboro;">已关注</div>
						<div class="guanzhu" @click="guanzhu(dataset.is_sub,$route.query.id,info.company_type)" v-else="">关注</div>
					</div>
					<!-- <div class="info_bottom">
						<div class="qiye">企业所在地：{{info.agent_address}}</div>
						<div>企业主页</div>
					</div> -->
					<div class="head-address">
						<div class="info_bottom">企业所在地：{{info.agent_address}}</div>
						<div class="head-pone" @click="phone($route.query.id,info.company_type)">联系电话</div>
					</div>
					
				</div>
				<div class="zhaobiao">
					<!--<div class="zhaobiao1" >
						<div class="zhaobiao2">
							<div class="tupian"><img src="/static/img/hangye.png"></div>
							<h2>招标记录</h2>
							<div>该企业历史招标</div>
						</div>
						<div class="zhaobiao3"><span class="big">5</span>条</div>
					</div>-->

					<div class="daili" >
						<div class="history" @click="bid($route.query.id,info.agent_name,info.agent_address,info.company_type)">
							<div class="daili2">
								<div class="tupian"><img src="/static/img/hangye.png"></div>
								<div>
									<h2>代理招标记录</h2>
									<div style="white-space:nowrap;">该企业历史招采</div>
								</div>
							</div>
							<div class="daili3"><span class="big">{{info.agent_bidding}}</span>个
								<svg t="1567496013814" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1974" width="15" height="15">
									<path d="M782.222222 512L307.2 1012.622222c-14.222222 11.377778-39.822222 14.222222-51.2 2.844445-8.533333-8.533333-14.222222-28.444444 2.844444-45.511111l440.888889-455.111112L258.844444 56.888889S241.777778 28.444444 264.533333 14.222222c19.911111-14.222222 34.133333-8.533333 42.666667 0L782.222222 512z" fill="#545E68" p-id="1975"></path>
								</svg>
							</div>
						</div>
						
						<div class="history" @click="detail($route.query.id,info.agent_name,info.agent_address,info.company_type)">
							<div class="daili2">
								<div class="tupian"><img src="/static/img/hy.png"></div>
								<div>
									<h2>历史服务甲方</h2>
									<div style="white-space:nowrap;">该企业的合作方</div>
								</div>
							</div>
							<div class="daili3"><span class="big">{{info.relevant_party_a}}</span>个
								<svg t="1567496013814" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1974" width="15" height="15">
									<path d="M782.222222 512L307.2 1012.622222c-14.222222 11.377778-39.822222 14.222222-51.2 2.844445-8.533333-8.533333-14.222222-28.444444 2.844444-45.511111l440.888889-455.111112L258.844444 56.888889S241.777778 28.444444 264.533333 14.222222c19.911111-14.222222 34.133333-8.533333 42.666667 0L782.222222 512z" fill="#545E68" p-id="1975"></path>
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div style="border:1px solid #E8E8E8;margin-top:15px"></div>

				<div class="youzhi">
					<h2>历史甲方排名</h2>
					<!-- <div style="color:#2921E2;font-size: 12px;">更多></div> -->
				</div>

				<div class="foot" @click="jiafang(item.id)" v-for="(item,index) in list" :key="index">
					<div class="foot-tu"><span>{{index+1}}</span></div>
					<div class="foot-jilu">
						<h2>{{item.company}}</h2>
						<div class="foot-jilu1">
							<div class="foot-img"><img src="/static/img/wode.png"></div>
							<div>历史甲方</div>&#x3000;&#x3000;
							<!-- <div>代理记录</div> -->
						</div>
					</div>
					<div class="foot-ci">
						<!-- <div class="foot-ci2">43%</div> -->
						<div class="foot-ci3">合作记录：{{item.agent_num}}次</div>
					</div>
				</div>
				<vue-loading4 :url="$store.state.url + '/Collection/agentInfo?page=1&limit=10&agent_id='+$route.query.id" @ievent="loaddata" v-if="isshow"></vue-loading4>
			</div>
		</div>
		<vue-dingyue></vue-dingyue>
		<vue-foot></vue-foot>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	import { VueLoading4,VueDingyue,VueFoot, } from '../component/'
	export default {
		components: {
			XHeader,
			VueLoading4,
			VueDingyue,
			VueFoot,
		},
		data() {
			return {
				info:'',
				list:[],
				isshow:true,
				dataset:'',
			}
		},
		mounted() {
			let _this = this;
			_this.business()
			_this.$http.post(_this.$store.state.url + '/Collection/agentInfo',{
				agent_id:_this.$route.query.id,
				limit:10,
				page:1
			}).then(res=>{
				_this.info=res
				// _this.list = res.his_a
			})
		},
		methods: {
			
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
				})
			},
			
			
			//关注
			business(){
				let _this=this;
				_this.$http.post(_this.$store.state.url + "/Collection/subStatus",{
					company_id:_this.$route.query.id,
				}).then(res=>{
					console.log(res)
					_this.dataset=res
					
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
				
				
			jiafang(id){
				let _this=this;
				_this.$router.push("xiangmu?id="+id)
			},
			detail(id,des,cen,con){
				let _this=this;
				_this.$router.push("daifang?id="+id+"&des="+des+"&cen="+cen+"&con="+con)
			},
			//历史中标
			bid(id,des,cen,con){
				let _this=this;
				_this.$router.push('zhaocaijilu?id='+id+"&des="+des+"&cen="+cen+"&con="+con)
			},
			
			phone(id,des){
				console.log(id)
				let _this=this;
				_this.$router.push("dailian?id="+id+"&des="+des+"&type=2" )
			},
		}
	}
</script>

<style scoped>
	.times {
		background: #fff;
	}
	
	.time {
		color: #666666;
		padding-top: 15px;
		width: 90%;
		margin: 0 auto;
		font-size: 14px;
	}
	
	.time .zhuti {
		color: #F88F00
	}
	
	.time2 {
		margin-top: 10px
	}
	
	.touch,
	.fenxi {
		background: #fff;
		margin: 0 auto;
		width: 90%
	}
	
	.contact {
		border-bottom: 1px solid #707070;
		height: 50px;
		padding-top: 10px
	}
	
	.contact h2 {
		color: #000000;
		font-weight: normal;
		font-size: 14px;
	}
	
	.jiafang {
		font-size: 12px;
		color: #666666;
		display: flex;
		justify-content: space-between;
	}
	
	.jiafang .kuang {
		color: #F88F00;
		padding: 0px 6px;
		border: 1px solid #F88F00;
		border-radius: 20px;
	}
	
	.fanzhan {
		font-size: 14px;
	}
	
	h4 {
		color: #000;
		font-size: 14px;
		font-weight: normal;
		margin-bottom: 10px;
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
	
	.beizhu {
		color: #F88F00;
		font-size: 12px
	}
	
	.head-nav {
		/*height: 75px;*/
		width: 100%;
		border-bottom: 1px solid #707070;
		padding: 15px 0 10px 0;
	}
	
	.head-nav2 {
		display: flex;
		justify-content: space-between;
	}
	.head-nav2 .head-daili{
		font-size:14px;
		color: #01B0B7;
		white-space: nowrap;
	}
	.head-nav2 .head-title{
		font-size: 14px;
		font-weight: 600;
		width:64%;
		/* line-height: 20px; */
	}
	/* .qiye {
		color: #666666;
		font-size: 14px;
		margin-top: 15px;
	} */
	
	.head-nav2 .guanzhu {
		color: white;
		background: #F88F00;
		border-radius: 20px;
		padding: 0px 10px;
		height: 20px;
		line-height:20px;
		width:15%;
		text-align: center;
	}
	
	/* .head-nav2 h2 {
		color: #000000;
		width: 64%;
	} */
	
	/* .head-nav2:first-child {
		color: #01B0B7
	} */
	
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
	
	
	.zhaobiao {
		padding: 15px 0;
		/*width: 90%;*/
		margin: 0 auto;
	}
	
	.zhaobiao1 {
		background: #E8E8E8;
		padding: 0 8px;
		color: #333;
	}
	
	.zhaobiao2 {
		display: flex;
		justify-content: space-between;
		height: 48px;
		line-height: 48px;
		border-bottom: 1px solid #707070;
	}
	
	.tupian {
		height: 30px;
		width: 30px;
		margin-right:10px;
	}
	
	.zhaobiao2 img {
		width: 100%
	}
	
	.zhaobiao3 {
		height: 48px;
		text-align: center;
		color: #F88F00;
		font-size: 10px;
		line-height: 48px;
	}
	
	.daili {
		margin-top: 15px;
		display: flex;
		justify-content: space-between;
	}
	
	.history {
		width: 48%;
	}
	
	.daili2 {
		/*width: 120px;*/
		padding: 8px 8px;
		display: flex;
		/*justify-content: space-between;*/
		align-items: center;
		background: #E8E8E8;
		font-size: 12px;
	}
	
	.daili3 {
		/*width: 120px;*/
		height: 48px;
		line-height: 48px;
		border-top: 1px solid #707070;
		text-align: center;
		font-size: 10px;
		background: #E8E8E8;
		padding: 0 8px;
		color: #F88F00;
	}
	
	.youzhi {
		height: 60px;
	/* 	padding: 0 0 0 30px; */
		line-height: 70px;
		display: flex;
		justify-content: space-between;
	}
	
	.foot {
		padding: 20px 0 15px 0;
		display: flex;
		/* justify-content: space-between; */
		border-top: 1px solid #666
	}
	
	.foot-tu {
		height: 60px;
		width: 50px;
		background: url("/static/img/jiangpai.png");
		background-size: 100% 100%;
		position: relative;
	}
	
	.foot-tu span {
		color: #FFFFFF;
		text-align: center;
		display: block;
		position: relative;
		top: 20px;
		font-size: 18px;
	}
	
	.foot-jilu {
		font-weight: 12px;
		color: #666;
		/* text-align: right; */
		width:57%;
		margin-left:20px
	}
	
	.foot-jilu h2,
	.youzhi h2 {
		color: #000;
		font-size: 14px;
		font-weight: normal;
	}
	.youzhi h2{
		font-size: 16px;
	}
	.foot-jilu1 {
		display: flex;
		margin-top: 15px
	}
	
	.foot-ci {
		text-align: right;
	}
	
	.foot-ci2 {
		color: firebrick;
		font-size: 14px;
	}
	
	.foot-ci3 {
		margin-top: 15px;
		color: #F88F00;
		font-size: 12px;
		white-space: nowrap;
	}
	
	.big {
		font-size: 20px;
	}
	
	/* .info_bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 5px;
		padding-top: 5px;
		font-size: 14px;
	}
	.info_bottom div:nth-child(1){
		width:100%
	}
	.info_bottom div:nth-child(2) {
		width: 19%;
		color: white;
		background: #F88F00FF;
		border-radius: 20px;
		padding: 2px 10px;
		text-align: center;
	} */
	.foot-img{
		width:15px;
		height:15px;
		margin-right:10px
	}
	.foot-img img{
		width:100%;
		height:100%
	}
</style>