<template>
	<div class="Msg_box">
		<x-header :title="'详情'" :left-options="{backText:''}"></x-header>
		<div class="Msg_main">
			<div class="title">报名成功</div>
			<div class="huodong_name pad-10">{{info.act_information}}</div>
			<div class="pad-10">时间：{{info.act_start_time|returntime8 }}-{{info.act_end_time|returntime8}}</div>
			<div class="pad-10">
				地址：{{info.act_region}}{{info.act_address}}
			</div>
			<div class="pad-10">票价：{{info.act_total_cost/100}}元</div>
			<div class="pad-10" v-if="info.sign_type=='2'">支付方式：微信支付</div>
			<div class="pad-10" v-if="info.sign_type=='4'">支付方式：免费支付</div>
			<div class="pad-10 yzm">
				<span style="margin-right: 10px;">入场码：{{info.sign_code}}</span>
				<span>此码为入场凭证，切不可告诉他人</span>
			</div>
		</div>
		<div class="center">
			<div>请在活动开始前1小时至具体活动地址验证入场码</div>
			<div>如有特殊情况，请联系平台客服咨询</div>
			<div class="look" @click="more()">查看更多活动</div>
		</div>
	</div>
</template>

<script>
	import { XHeader } from 'vux'

	export default {
		components: {
			XHeader,

		},
		data() {
			return {
				show: false,
				info:''
			}
		},

		mounted() {
			var _this = this;
			_this.detail();
		},
		methods: {
			detail() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/activityb/act_suc', {
					load: true,
					sign_actid:_this.$route.params.id,
					sign_memid:_this.$store.state.token
				}).then(function(res) {
					_this.info = res;
				})
			},
			more(){
				var _this = this;
					_this.$router.push('../../huodong/index');
			
			}
		}
	}
</script>

<style scoped>
	.vux-header {
		/*background: #FFFFFF;*/
		color: #000000;
	}
	
	.left-arrow {
		background: #000000;
	}
	
	.Msg_main {
		background: #fff;
		width: 90%;
		border-radius: 10px;
		margin: 20px auto;
		padding-bottom: 20px;
		border: 1px solid #CCCCCC;
	}
	
	.title {
		color: #FFFFFF;
		background: #00C06B;
		font-size: 15px;
		text-align: center;
		padding: 8px 0;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	
	.huodong_name {
		font-size: 15px;
	}
	
	.pad-10 {
		padding: 5px 10px;
	}
	
	.yzm {
		border-top: 1px solid #CCCCCC;
		margin-top: 30px;
		padding-top: 20px;
	}
	
	.yzm span:nth-child(1) {
		color: #000000;
		font-size: 14px;
	}
	
	.yzm span:nth-child(2) {
		color: #FFBC64;
	}
	
	.center {
		text-align: center;
		margin-top: 30px;
	}
	
	.center div:nth-child(2) {
		color: #000000;
	}
	
	.look {
		background: linear-gradient(90deg, rgba(3, 225, 236, 1), rgba(6, 231, 199, 1));
		border-radius: 20px;
		color: #FFFFFF;
		width: 90%;
		margin: 50px auto 0;
		padding: 8px 0;
	}
</style>