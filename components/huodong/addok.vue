<template>
	<div class="isok">
		<x-header :title="'发布成功'" :left-options="{backText:''}" class="header step"></x-header>
		<img class="he_imgwy" src="/static/img/icon123.png" />
		<!--<div class="he_txt1">活动发起成功</div>-->
		<!--<div class="he_txt2">快来发起一场免费活动直播吧</div>-->
		<div class="he_txt1">您的需求已提交</div>
		<div class="he_txt1">我们会在24小时内审核</div>
		<div class="he_txt1">请关注您的系统消息</div>
		<router-link tag="div" class="button_max" replace :to="'/huodong/index/'">已提交/等待审核</router-link>
		<!--<router-link tag="div"  replace class="he_txt3" to="/zhibo/add"><u>我不需要</u></router-link>-->
		<vue-reward message="+10个智汇币"></vue-reward>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>

	</div>
</template>

<script>
	import { XHeader } from 'vux'
	import { VueReward, VueShareit } from '../component'
	export default {
		components: {
			XHeader,
			VueReward,
			VueShareit
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您参与活动，关注/分享秒得奖励！',
					 imgUrl: '/static/img/hd.jpg',
					link: '/huodong/index'
				}
			}
		},
	}
</script>

<style scoped>
	.isok .he_imgwy {
		width: 170px;
		margin: 0 auto;
		margin-top: 85px;
	}
	
	.isok .he_txt1 {
		font-size: 14px;
		color: #333;
		/*line-height: 56px;*/
		text-align: center;
	}
	
	.isok .he_txt2 {
		font-size: 15px;
		color: #999;
		text-align: center;
	}
	
	.isok .button_max {
		width: 240px;
		margin-top: 15px;
		background: linear-gradient(to right, #03E1EC, #06E7C7);
	}
	
	.isok .he_txt3 {
		font-size: 14px;
		color: #999;
		text-align: center;
		margin-top: 12px;
	}
</style>