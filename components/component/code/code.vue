<template>
	<div class="main_box">
		<div @click="isShowIpone(ipone)" v-if="$store.state.codeTime==60" class="txt">发送验证码</div>
		<div class="txt" v-else>验证码({{$store.state.codeTime}})</div>
		<confirm v-model="show" title="验证码" @on-confirm="onyes" @on-cancel="onCancel">
			<input class="alert_code_img_input" type="text" v-model="code_img" />
			<vue-code-img class="alert_code_img" v-if="show"></vue-code-img>
		</confirm>
	</div>
</template>

<script>
	import { Confirm } from 'vux'
	import VueCodeImg from './codeImg'
	export default {
		components: {
			VueCodeImg,
			Confirm
		},
		props: {
			ipone: undefined,
			type: undefined,
		},
		data() {
			return {
				show: false,
				code_img: undefined,
			}
		},
		methods: {
			onCancel() {
				let _this=this;
				_this.code_img = undefined //点击确定后清空验证框
			},
			isShowIpone(value) { //手机号验证等
				var _this = this;
				if(!isPoneAvailable(_this.ipone)) return;
				//询问框
				_this.show = true;
			},
			onyes() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/index/yzm', {
					'load': false,
					'phone': _this.ipone,
					'yzm': _this.code_img,
					'type': _this.type
				}).then((res) => {
					if(!res) return
					_this.$store.dispatch('codeTime');
					_this.code_img = undefined
				})
				_this.code_img = undefined //点击确定后清空验证框
			}
		}
	}
</script>

<style scoped>

</style>