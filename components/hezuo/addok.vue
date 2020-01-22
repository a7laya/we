<template>
	<div class="isok">
		<x-header :title="'发布成功'" :left-options="{backText:''}" class="header step"></x-header>
		<img class="he_imgwy" src="/static/img/icon10.png"/>
		<div class="he_txt1">您的需求已提交</div>
		<div class="he_txt1">我们会在24小时内审核</div>
		<div class="he_txt1">请关注您的系统消息</div>
		<router-link tag="div"  class="button_max" replace :to="'/hezuo/index/'">已提交/等待审核</router-link>
		<router-link tag="div" to="/index" replace class="he_txt3"><u>返回首页</u></router-link>
		<vue-reward message="+10个智汇币"></vue-reward>
	</div>
</template>

<script>
	import { XHeader} from 'vux'
	  import {VueReward} from '../component'
	export default {
		components: {
            XHeader,
            VueReward
        },
	}
</script>

<style scoped>
	.isok .he_imgwy{
		width: 170px;
		margin: 0 auto;
		margin-top: 85px;
	}
	.isok .he_txt1:nth-child(1){
		margin-top: 20px;
	}
	.isok .he_txt1{
		font-size: 14px;
		color: #333;
		/*line-height: 56px;*/
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
		background: #1d79ea;
	}
	.isok .he_txt3{
		font-size: 14px;
		color: #999;
		text-align: center;
		margin-top: 12px;
	}
</style>
