<template>
	<div class="code">
		<div class="code_title">活动验证通道</div>
		<div class="code_info">
			<!-- <img src="../../../static/img/goBack.png" alt="" class="goBackImg" @click="goBackImg()"> -->
			<img :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl" class="mem_img">
			<div class="center">
				<!--<div>{{info.nickname}} 邀请你参加</div>-->
				<div class="title"><strong>{{info.information}}</strong> </div>
				<div>扫码验证入场资格</div>
				<!--<img id="avatar" />-->

				<img :src="imgSrc" alt="" class="imgSrc" />
				<!--<div style="color: #307ee9;" @click="dowm()">下载二维码</div>-->
				<div class="des">来自智汇优库达人活动</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Qrcode, Divider } from 'vux'

	export default {
		components: {
			Qrcode,
			Divider

		},
		data() {
			return {
				info: '',
				imgSrc: ''

			}
		},

		mounted() {
			var _this = this;
			_this.memInfo();
			_this.ajax();

		},
		computed: {
			user() {
				return this.$store.state.user;
			}

		},
		methods: {

			memInfo() { //个人信息
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/activityb/new_act_detaile', {
					load: true,
					id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
					_this.info = res;

				})
			},
			ajax() { //登录
				var _this = this;
				this.$http.post(this.$store.state.url + '/Homecenter/ewcode2', {
					'load': true,
					act_id:_this.$route.params.id
				}).then((res) => {
					if(!res) return;
					_this.imgSrc = _this.$store.state.url + res.imgUrl
				})
			},
			goBackImg() { //返回上一步
				var _this = this;
				_this.$router.go(-1)
			},

		}
	}
</script>

<style scoped>
	.code {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url(../../../static/img/code.png);
		background-size: 100% 100%;
	}
	
	.code_title {
		color: #FFFFFF;
		font-size: 17px;
		text-align: center;
		margin-top: 40px;
	}
	
	.mem_img {
		border-radius: 50%;
		width: 80px;
		height: 80px;
		position: absolute;
		top: -30px;
		left: 38%;
		border: 2px solid #FFFFFF;
	}
	
	.code_info {
		/* background: url(../../../static/img/goBack.png) no-repeat; */
		background-color: #FFFFFF;
		width: 80%;
		margin: 80px auto 0px;
		padding: 70px 0px 20px 0px;
		box-sizing: border-box;
		position: relative;
	}
	
	.center {
		text-align: center;
	}
	
	.title {
		font-size: 15px;
		color: #000000;
		font-weight: 600;
		margin: 20px 0px;
	}
	
	.des {
		color: #999999;
		margin-top: 30px;
	}
	
	.imgSrc {
		width: 120px;
		height: 120px;
		display: block;
		margin: 15px auto;
		border: 1px solid #cccccc;
	}
	.goBackImg {
		display: inline-block;
		width: 10px;
		height: 15px;
		position: absolute;
		top: 10px;
		left: 10px;
	}
</style>