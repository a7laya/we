<template>
	<div class="isok">
		<x-header :title="'报名成功'" :left-options="{backText:''}" class="header step"></x-header>
		<img class="he_imgwy" src="/static/img/icon123.png"/>
		<div class="he_txt1">报名成功</div>
		<div class="he_txt2">报名结果请等待系统消息通知</div>
		<router-link tag="div"  class="button_max" :to="'/huodong/details/' + $route.params.id" replace>知道了</router-link>
	</div>
</template>

<script>
	import { XHeader} from 'vux'
	export default {
		components: {
            XHeader
        },
	}
</script>

<style scoped>
	.isok .he_imgwy{
		width: 170px;
		margin: 0 auto;
		margin-top: 85px;
	}
	.isok .he_txt1{
		font-size: 18px;
		color: #333;
		line-height: 56px;
		text-align: center;
	}
	.isok .he_txt2{
		font-size: 15px;
		color: #999;
		text-align: center;
	}
	.isok .button_max{
		width: 240px;
		margin-top: 15px;
		background: linear-gradient(to right,#03E1EC, #06E7C7);
	}
	.isok .he_txt3{
		font-size: 14px;
		color: #999;
		text-align: center;
		margin-top: 12px;
	}
</style>