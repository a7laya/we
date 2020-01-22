<template>
	<div class="main_box">
		<x-header :title="'完善提现信息'" :left-options="{backText:''}"></x-header>

		<div class="txt" style="font-size: 13px;text-align: center;margin-top: 15px;">
			请如实、认真填写收款信息
		</div>
		<div>
			<group>
				<!--<vue-bank-name :title="'选择开户行'" :placeholder="'选择开户行'"></vue-bank-name>-->
				<x-input type="text" placeholder="请填写开户行" v-model="bankname">
					<div slot="label" class="ban_title">
						<!--<strong>*</strong>-->
						<span>开户行:</span>
					</div>
				</x-input>
				<x-input type="text" placeholder="请填写银行卡号" v-model="banknum">
					<div slot="label" class="ban_title">
						<!--<strong>*</strong>-->
						<span>银行卡账号:</span>
					</div>
				</x-input>
				<x-input type="text" placeholder="请填写收款人姓名" v-model="name">
					<div slot="label" class="ban_title">
						<!--<strong>*</strong>-->
						<span>收款人姓名:</span>
					</div>
				</x-input>
				<x-input v-model="address" type="text" placeholder="请填写支行地址">
					<div slot="label" class="ban_title">
						<!--<strong>*</strong>-->
						<span>支行地址:</span>
					</div>
				</x-input>
				<x-input v-model="ipone" type="number" placeholder="银行预留电话">
					<div slot="label" class="ban_title">
						<!--<strong>*</strong>-->
						<span>联系电话:</span>
					</div>
				</x-input>

				<x-input v-model="vcCode" type="number" placeholder="请填写验证码">
					<div slot="label" class="ban_title">
						<!--<strong>*</strong>-->
						<span>验证码:</span>
					</div>
					<div slot="right-full-height">
						<vue-code :ipone="ipone" class="right-full-height"></vue-code>
					</div>
				</x-input>
			</group>
		</div>
		<div class="biaodin4">
			<span class="login_remember">
                	<check-icon :value.sync="protocol">同意</check-icon>
                	<vue-xieyi :type="12" :title="'智汇优库提现协议'" class="alert"><span style="color:#3092ff;">《智汇优库提现》</span></vue-xieyi>
			</span>
			<div class="button_max " @click="upform()" style="background: #3092ff;">提交</div>

		</div>
	</div>
</template>

<script>
	import { XHeader, Group, XInput, Selector, CheckIcon, PopupPicker, Picker } from 'vux'
	import { VueCode, VueXieyi, VueBankName, VueUserPosition } from '../component'
	export default {
		components: {

			XHeader,
			Group,
			XInput,
			Selector,
			VueCode,
			CheckIcon,
			VueXieyi,
			PopupPicker,
			Picker,
			VueBankName,
			VueUserPosition
		},
		data() {
			return {
				bankname: '',
				vcCode: '',
				ipone: '',
				protocol: true,
				address: '',
				name: '',

				banknum: ''
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		mounted() {
			var _this = this;
		},
		methods: {
			onChange(val) {
				console.log(val)
			},
			onShow() {
				console.log('on show')
			},
			onHide(type) {
				console.log('on hide', type)
			},
			upform() {
				var _this = this;
				//				
				if(!_this.bankname) {
					msg("请填写开户行");
					return;
				}
				if(!_this.name) {
					msg("请填写银行卡号");
					return;
				}
				if(!_this.name) {
					msg("请填写收款人姓名");
					return;
				}
				if(!_this.address) {
					msg("请填写支行地址");
					return;
				}
				if(!_this.ipone) {
					msg("请填写银行预留电话");
					return;
				}
				if(!_this.vcCode) {
					msg("请填写验证码");
					return;
				}
				if(_this.protocol == false) {
					msg("请勾选同意智汇优库提现协议")
					return;
				}
				var data = {
					money_num: _this.$route.params.money,
					b_name: _this.bankname,
					bk_name: _this.address,
					bank: _this.banknum,
					phone: _this.ipone,
					name: _this.name
				}
				console.log(data);
				_this.$http.post(_this.$store.state.url + '/Activityb/get_bank', data).then((res) => {
					if(!res) return;
					_this.$router.push('../index');
				})

			}
		}
	}
</script>

<style scoped>
	.head img {
		width: 25px;
	}
	
	.head {
		padding: 10px;
	}
	
	.ban_title strong {
		color: red;
	}
	
	.weui-cell {
		/*padding: 0!important;*/
	}
	
	.right-full-height {
		position: relative;
		top: 10px;
		font-size: 14px;
		right: 15px;
	}
	
	.ban_title {
		margin-right: 20px;
	}
	
	.weui-label:before {
		content: '1515'!important;
		color: red;
		font-size: 15px;
		width: 15px;
		height: 15px;
	}
	
	.biaodin4 {
		border-top: 6px solid #f2f2f2;
	}
	
	.biaodin4 .button_max {
		background: linear-gradient(to right, #03E1EC, #06E7C7);
		margin-top: 10px;
		width: 340px;
		margin-bottom: 40px;
	}
	
	.biaodin4 .login_remember {
		display: block;
		text-align: center;
		margin-top: 20px;
	}
	
	.biaodin4 .login_remember .alert {
		display: inline-block;
	}
</style>