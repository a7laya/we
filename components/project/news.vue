<template>
	<div>
		<!-- type=2为评标结果 -->
		<vue-searchhead :type='2'></vue-searchhead>
		<div style="margin-top:12%">
			<vue-message :type="3" v-for="(item,index) in projects" :item="item" :key="index" ></vue-message>
			<vue-loading :url="$store.state.url + '/Collection/winningList?page=1&limit=10'" @ievent="loaddata" v-if="isshow"></vue-loading> 
		</div>
		<vue-dingyue></vue-dingyue>
		<vue-foot></vue-foot>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	
	</div>
</template>

<script>
	import { XHeader,Badge, PopupPicker} from 'vux'
	import {  VueShareit, VueMessage,VueRed,VueAddress1,VueHangye,VueHeader,VueLoading,VueSearchhead,VueDingyue,VueFoot, } from '../component/'
	export default {
		components:{
			XHeader,
			Badge,
			PopupPicker,
			VueShareit,
			VueMessage,
			VueAddress1,
			VueHangye,
			VueHeader,
			VueLoading,
			VueSearchhead,
			VueDingyue,
			VueFoot,
		},
		data(){
			return{
				address:'',
// 				time:[['全部', '今天', '昨天', '本周', '上周','本月', '上月', '今年','去年']],
// 				Changetime:[['1']],
				showPopupPicker: false,
				hangye:'',
				projects:'',
				isshow:true
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
			loaddata(res) {
				// console.log(res)
				var _this = this;
				_.each(res, function(e) {
					_this.projects = _this.projects || [];
					_this.projects.push(e);
					// console.log(_this.projects)
				})
			}
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
		/* text-align: center; */
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
	.dingyue{
		position: fixed;
		z-index: 4;
		top: 12.5rem;
		right: 15px;
		border-radius: 50%;
		background: #999999;
		line-height: 40px;
		height: 40px;
		width: 40px;
		text-align: center;
		color: #FFFFFF;
		box-shadow: 0 0 5px 0 rgba(50, 71, 94, 0.5);
		font-size: 12px;
		transition: all 0.4s;

	}
	/* .search .searchSelect {
		width: 100%;
		text-align: center;
		
	}
	
	.search .vux-cell-box {
		width: 2rem;
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
	} */
</style>
