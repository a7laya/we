<template>
	<div class="min">
		<x-header :title="'企业新闻--AI时代那些“数据隐私”与“算'" :left-options="{backText:''}" class="header"></x-header>
		<div>
			<vue-swiper :type="13"></vue-swiper>
		</div>
		<div class="center">
			<h2>AI时代那些“数据隐私”与“算法歧视”</h2>
			<div class="center-time">
				<span>来源：新闻网</span>&#x3000;&#x3000;
				<span>2019-09-09 09:30</span>
			</div>
			<div>东南方控股覅给你看代付款拉几十块功能模块枫蓝国际大功率发动机高考满分客观地发</div>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
		import { XHeader } from 'vux'
		import { VueShareit,VueSwiper} from '../component/'
		export default{
			components: {
				XHeader,
				VueShareit,
				VueSwiper
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
		}
</script>

<style scoped>
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
