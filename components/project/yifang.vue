<template>
	<div>
		<x-header title="关联的甲方" :left-options="{backText:''}" class="header"></x-header>
		<!--基本信息-->
		<div class="info">
			<div class="info_top">
				<div>河南智汇优库网络科技有限公司</div>
				<div>+关注</div>
			</div>
			<div class="info_bottom">
				<div>企业所在地:郑州市</div>
				<div>企业主页</div>
			</div>
      </div>
		  <div class="list">
        	<vue-message ></vue-message>
        </div>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	import { VueMessage } from '../component/'
	export default {
		components: {
			XHeader,
			VueMessage
		},
		data() {
			return {

			}
		},
		mounted() {
			let _this = this;

		},
		methods: {
           detail(){
           	let _this=this;
           	_this.$router.push("jiafangDetail")
           }
		}
	}
</script>

<style scoped>
	.info {
		margin: 20px auto 10px;
		background: #FFFFFF;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 5px;
		padding: 10px;
		box-sizing: border-box;
	}
	
	.info_top,
	.info_bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 5px;
	}
	
	.info_top {
		border-bottom: 1px solid darkgrey;
	}
	
	.info_bottom {
		padding-top: 5px;
	}
	
	.info_top div:nth-child(1) {
		font-size: 16px;
	}
	
	.info_top div:nth-child(2),
	.info_bottom div:nth-child(2) {
		width: 19%;
		color: white;
		background: #F88F00FF;
		border-radius: 20px;
		padding: 2px 10px;
		text-align: center;
	}
	
	.left_info {
		display: flex;
		width: 50%;
		/*justify-content: ;*/
	}
	.list{
		background: #FFFFFF;
		margin-top: 10px;
	}
	
</style>