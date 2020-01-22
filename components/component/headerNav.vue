<template>
	<!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：顶部导航
    -->
	<div>
		<div class="header-nav-icon" @click="show=true"><i class="iconfont icon-caidan"></i></div>
		<div v-transfer-dom >
			<x-dialog v-model="show" :hide-on-blur="true" class="header-nav-main">
				<div class="header-nav-main">
					<router-link tag="div" to="/" class="header-nav-list">
						<i class="iconfont icon-shouye"></i><span>官网首页</span>
					</router-link>
					<router-link tag="div" to="/zhibo" class="header-nav-list">
						<i class="iconfont icon-zhibokecheng"></i><span>直播秀场</span>
					</router-link>
					<router-link tag="div" to="/hezuo" class="header-nav-list">
						<i class="iconfont icon-hezuo"></i><span>众包合作</span>
					</router-link>
					<router-link tag="div" to="/huodong" class="header-nav-list">
						<i class="iconfont icon-huodong"></i><span>达人活动</span>
					</router-link>
					<div class="header-nav-list" @click="$store.commit('erweima');show=false">
						<i class="iconfont icon-guanzhu"></i><span>关注平台</span>
					</div>
					<router-link tag="div" to="/user" class="header-nav-list">
						<i class="iconfont icon-app_icons--"></i><span>个人中心</span>
					</router-link>
				</div>
			</x-dialog>
		</div>
	</div>
</template>

<script>
	import { XDialog, TransferDomDirective as TransferDom } from 'vux'

	export default {
		directives: {
			TransferDom
		},
		components: {
			XDialog
		},
		data() {
			return {
				show: false
			}
		}
	}
</script>

<style scoped>
	.header-nav-main::after {
		content: '';
		position: absolute;
		right: 5px;
		top: -13px;
		width: 0;
		height: 0;
		border-style: dashed;
		border-color: transparent;
		overflow: hidden;
		border-width: 8px;
		border-bottom-style: solid;
		border-bottom-color: #fff;
	}
	
	.header-nav-icon {
		color: #fff;
	}
	
	.header-nav-icon i {
		font-size: 16px;
	}
	
	.header-nav-main {
		background: #fff;
		top: 40px;
		width: 85px;
		right: 10px;
		padding: 0 5px;
		border-radius: 3px;
	}
	
	.header-nav-main .header-nav-list+.header-nav-list {
		border-top: 1px solid #dadada;
	}
	
	.header-nav-list {
		text-align: left;
		padding: 0 2px;
	}
	
	.header-nav-list span {
		margin-left: 2px;
		font-size: 14px;
		color: #000;
		display: inline-block;
		vertical-align: middle;
	}
	
	.header-nav-list i {
		font-size: 18px;
		color: #6d6d6d;
		display: inline-block;
		vertical-align: middle;
	}
</style>