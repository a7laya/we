<template>
	<div>
			<div class="header-search">
				<div class="search-content">
					<div class="fanhui" @click="fanhui"><img src="/static/img/fanhui.png"></div>
					<div class="searchbox fl">
						<input  placeholder="请输入任务/关键字" class="txt" v-model="txt">
						<i class="iconfont icon-sousuo" @click="form"></i>
					</div>
				</div>
			</div>
			
			<!-- 企业新闻 -->
			<div class="trade"  v-for="(item,indexs) in list"  :key="indexs" @click="hangyes(item.id,item.type)" v-if="item.type=='企业资讯'">
				<div class="picture"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgUrl"></div>
				<div class="xin-xiangmu" >
					<div class="xiangmu-zhuti">{{item.title}}</div>
					<div class="dizhi">
						<span class="dizhi2">发布：{{item.mem_nickname}}</span>
						<span class="dizhi3 right_center">{{item.time|returntime6}}</span>
					</div>
				</div>
			</div>
		
			<!-- 新品 -->
			<div class="spread1" v-for="(item,indexing) in list"  :key="indexing" @click="hangyes(item.id,item.type)" v-if="item.type=='新品展示'">
				<div class="spread" >
					<div class="spread-tu" >
						<div class="spread-tu-pian" v-for="(item,index) in item.imgUrl" :key="index"><img :src="$store.state.website.website_domain_name + '/uploads/' + item"></div>
					</div>
					
					
					<div class="spread-wenzi" >
						<div class="xiangmu-zhuti">{{item.title}}</div>
						<div class="dizhi">
							<span class="dizhi2">{{item.mem_nickname}}</span>
							<span class="dizhi3 right_center">{{item.time|returntime6}}</span>
							<!-- <span  class="center ding" @click.stop="ding(item.id)">顶</span> -->
						</div>
					</div>
				</div>
			</div>
			
			
		<!-- 行业 -->
		<div class="trade" @click="hangyes(item.id,item.type)" v-for="(item,index) in list"  :key="index" v-if="item.type=='行业动态'">
			<div class="picture"><img :src="item.imgUrl"/></div>
			<div class="xin-xiangmu" >
				<div class="xiangmu-zhuti">{{item.title}}</div>
				<div class="dizhi">
					<span class="dizhi2">来源：{{item.source}}</span>
						<span class="dizhi3 right_center">{{item.time|returntime6}}</span>
				</div>
			</div>
		</div>
		
		<vue-loading :url="$store.state.url + '/Information/searchList?page=1&limit=10&' + url" @ievent="loaddata" v-if="url"></vue-loading>
		
	</div>
</template>

<script>
	import { querystring } from 'vux'
	import {VueSfilter,VueLoading} from '../component/'
	export default{
		components: {
			VueSfilter,
			VueLoading,
		},
		data(){
			return{
				list:[],
				txt:'',
				types: 0,
				show: false,
				url:undefined
				
			}
		},
		
		
		mounted(){

		},
		
		
		methods: {
			form(){
				var _this = this
				_this.url = undefined;
				_this.list = undefined;
			
			if(!this.txt){
				msg("请输入需搜索的内容");
				return;
			}
			setTimeout(() => {
					_this.url = 'keyword=' + _this.txt;
			},100)

			},
			loaddata(res) {
			    var _this = this;
			    _.each(res, function(e) {
			        _this.list = _this.list || [];
			        _this.list.push(e);
					// console.log( _this.list)
			    })
			},
			fanhui(){
				this.$router.go(-1)
			},
			hangyes(id,des){
				// this.$router.push("/information/details?id="+id+"&des="+des)
				this.$router.push("/information/details/" + id + '/' +des)
			},
		},
	}
</script>

<style scoped>
	  .header-search {
	    height: 45px;
	    color: #fff;
	    font-size: 16px;
	}
	
	.location {
	    display: inline-block;
	    margin-left: 10px;
	    width: 70px;
	}
	
	.location i.icon-dingwei {
	    font-size: 15px;
	    margin-right: 5px;
	}
	
	.search-content {
	    line-height: 45px;
	    height: 45px;
	    background: #35495e;
	}
	
	.searchbox {
	    display: inline-block;
	    width: 305px;
	    margin-left: 13px;
	    position: relative;
	}
	
	.searchbox input.txt {
	    width: 100%;
	    background: rgba(255, 255, 255, 0.1);
	    line-height: 30px;
	    height: 30px;
	    border-radius: 30px;
	    text-indent: 10px;
	    color: #fff;
	}
	
	.searchbox input.txt::-webkit-input-placeholder {
	    color: #fff;
	}
	
	.searchbox i.icon-sousuo {
	    position: absolute;
	    color: #fff;
	    font-size: 22px;
	    top: 0;
	    right: 10px;
	    padding: 0 10px;
	}
	
	.searchbox i.icon-sousuo::before {
	    display: inline-block;
	    vertical-align: middle;
	}
	
	.button_fabu {
	    display: inline-block;
	    margin-left: 13px;
	}
	
	.button_fabu i {
	    font-size: 25px;
	}
	
	
	.fanhui{
		width:30px;
		height:45px;
		line-height:45px;
		float:left;
		display: flex;
		align-items: center;
	}
	.fanhui img{
		height:30px;
		width:100%;
	}
	
	
	.trade{
		width: 95%;
		margin: 10px auto;
		display: flex;
	}
	.picture{
		height:80px;
		width:40%;
	}
	.picture img{
		width:100%;
		height:100%;
	}
	.xin-xiangmu {
			width: 60%;
			/* margin: 0 auto; */
			padding-top: 5px;
			border-top: 1px solid rgba(112, 112, 112, 0.5);
			padding-bottom: 5px;
			display: flex;
			flex-direction: column;
			justify-content: space-between
		}
		
		.xiangmu-zhuti {
			color: #000000;
			font-size: 14px;
			margin-left: 15px;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		
		.xiangmu-biaoti {
			color: #666;
			font-size: 14px;
			margin-left: 15px;
			margin-right: 15px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 90%
		}
		
		.dizhi {
			color: #666;
			font-size: 12px;
			display: flex;
			justify-content: space-between;
			margin: 0 0px 0 15px;
		}
		.dizhi span{
			/* width: 70%; */
			white-space: nowrap;
			/* overflow: hidden;
			text-overflow: ellipsis; */
		}
		.message {
			background: #fff;
			margin-top: 10px;
		}
		.right_center{
			text-align: right;
		}
		#dizhi2{
			width: 70%;
		}
		.center{
			text-align: center;
		}
		.spread1{
			width:100%;
			background:#F5F5F5;
			margin-top:10px
		}
		.spread{
			width: 95%;
			margin:0 auto;
			
			/* margin-top:10px; */
		}
		.spread-tu{
			display:flex;
			justify-content: space-between;
		}
		.spread-tu-pian{
			width:48%;
			height:100px;
			/* background: #F73A3A; */
			/* border:1px solid rgba(112,112,112,1); */
		}
		.spread-tu-pian img{
			width:100%
		}
		.spread-wenzi{
			width:95%;
			margin:0 auto;
			padding:10px 0 ;
		}
		.s_list_box {
			padding: 0 10px;
			padding-bottom: 10px;
			border-bottom: 1px solid #eeeeee;
		}
		
		.s_list_box+.s_list_box {
			border-bottom: 1px solid #eeeeee;
			padding-top: 7px;
		}
		
		.s_list_box .title_box {
			font-size: 14px;
			color: #565656;
			line-height: 30px;
			margin-top: 5px;
		}
		
		.min_main_box {
			color: #232323;
			max-height: 100px;
			overflow-y: scroll;
		}
		
		.min_main_box .class1 {
			background: #f5f5f5;
			display: inline-block;
			border-radius: 3px;
			font-size: 12px;
			padding: 5px 10px;
			margin-bottom: 10px;
			margin-right: 5px;
		}
		
		.min_main_box .class1.on {
			background: #35495e;
			color: #fff;
		}
		
		
		
		.loading {
			padding-top: 0.1rem;
			clear: both;
		}
		
		.toup {
			position: fixed;
			right: 0.2rem;
			bottom: 1.5rem;
			z-index: 50;
		}
		
		.toup i {
			font-size: 0.4rem;
		}
		
		.toup i::before {
			display: block;
			float: left;
			background: #0e8ee7;
			width: 0.6rem;
			height: 0.6rem;
			line-height: 0.6rem;
			text-align: center;
			color: #fff;
		}
		
</style>
