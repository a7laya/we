<template>
	<div class="min">
		<x-header :title="$route.params.des+'--' + info.title" :left-options="{backText:''}" class="header"></x-header>
		<div class="center">
			<h2>{{info.title}}</h2>
			<div class="center-time">
				<span>来源：{{info.source}}</span>&#x3000;&#x3000;
				<span>{{info.time|returntime6}}</span>
			</div>
		</div>
		<div class="centers">
			<div v-html="info.content"></div>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	import { VueShareit,} from '../component/'
	export default{
		components: {
			XHeader,
			VueShareit,
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {

				return {
					title: this.info.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动平台，秒得五十块！',
					imgUrl: '/static/logo.png',
//					link: this.$route.path + '?uidkey=' + this.$store.state.mem_id
					link:"?id="+this.$route.query.id + "&des="+this.$route.query.des
				}
			},
		},
		data(){
			return{
				info:'',
				// titles:[行业要闻,企业新闻]
				titles:{
					hangye:'行业要闻',
					qiye:'企业新闻'
				},
			}
		},
		mounted(){
			var _this= this
			_this.$http.post(_this.$store.state.url+'/Information/infoDetails',{
//				info_id:_this.$route.query.id
				info_id:_this.$route.params.id
			}).then(res=>{
				console.log(res)
				_this.info=res

			})
		},

	}
</script>

<style scoped>
	.min{
		background:#fff;
	}
	.centers{
		width:95%;
		margin:0 auto;
		margin-bottom:15px;
	}
	.min{
		background:#fff
	}
	.center{
		width:95%;
		margin:20px auto 0 auto;
		font-size:12px;
		color:#A3A3A3
	}
	.center h2{
		width:82%;
		color: #383838;
		font-size:16px;
		font-weight: normal;
		margin:0 auto;
	}
	.center-time{
		margin:10px 0
	}
</style>
