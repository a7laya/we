<template>
	<div>
		<x-header class="header step">
			<div slot="overwrite-left" class="goBack" @click="goBack()"></div>
			<div slot="overwrite-title" class="title">支付</div>
		</x-header>
		<div class="heji" style="margin-top: 30px;">
			<div class="xians">合计支付</div>
			<div class="daizhifu ">待支付：<span>￥ {{paymoney}}</span></div>
		</div>
		<div class="heji">
			<div class="xians">请选择支付方式</div>
			<div style="margin-top: 10px;">
				<!--<div class="heji_flex" @click="pay(1)">
					<img src="../../../static/img/yue.png" alt="" class="paytype" />
					<div class="num">
						余额&nbsp;<span>({{money}}智汇豆)</span>
					</div>
					<img src="../../../static/img/check.png" alt="" class="heji_check" v-if="type1" />
					<img src="../../../static/img/nocheck.png" alt="" class="heji_check" v-else="" />
				</div>-->
				<div class="heji_flex" @click="pay(2)">
					<img src="../../../static/img/weixin.png" alt="" class="paytype" />
					<div class="num">
						微信&nbsp;<span>(￥{{paymoney}})</span>
					</div>
					<img src="../../../static/img/check.png" alt="" class="heji_check" v-if="type2" />
					<img src="../../../static/img/nocheck.png" alt="" class="heji_check" v-else="" />
				</div>
				<!--<div class="heji_flex" @click="pay(3)">
					<img src="../../../static/img/zuhe.png" alt="" class="paytype" />

					<div class="num">
						组合支付&nbsp;<span>(优先使用余额)</span>
					</div>
					<img src="../../../static/img/check.png" alt="" class="heji_check" v-if="type3" />
					<img src="../../../static/img/nocheck.png" alt="" class="heji_check" v-else="" />
				</div>-->
			</div>
		</div>
		<div class="pay_tijiao" @click="surePay()">
			确认支付
		</div>
	</div>

</template>

<script>
	var paypar = "";
	import { XHeader } from 'vux';
	export default {

		components: {
			XHeader,

		},
		data() {
			return {
				type1: false,
				type2: true,
				type3: false,
				money: '',
				paymoney: '',
				index: 1,
				paypar: ''
			}
		},

		mounted() {
			var _this = this;
			_this.money = window.localStorage.money;
			_this.paymoney = _this.$route.params.money
		},
		methods: {
			goBack() {
				history.go(-1)
			},
			pay(i) {
				var _this = this;
				_this.index = i;
				if(i == 2) {
					//微信
					_this.type1 = false;
					_this.type2 = true;
					_this.type3 = false;
				}
			},
			payMoney() {
//				console.log(data)

			},
			surePay() {

				var _this = this;
				var data = {
					sign_money: _this.$route.params.money,
					type: 2,
					sign_name: _this.$route.params.name,
					sign_phone: _this.$route.params.phone,
					sign_actid: _this.$route.params.id,
					fq_memid: _this.$route.params.fq_memid,
					sign_memid: _this.$store.state.token
				}
//				console.log(data)
								this.$pay.pays(_this,data).then(function(res) {
									msg(res.msg);
				
								});

			},
		}
	}
</script>
<style type="text/css">
	.header {
		background: #FFFFFF!important;
	}
	
	.goBack {
		position: absolute;
		width: 12px;
		height: 12px;
		border-style: solid;
		border-color: #333333;
		border-width: 1px 0 0 1px;
		-webkit-transform: rotate(315deg);
		transform: rotate(315deg);
		top: 3px;
	}
	
	.title {
		color: #333333;
		/*font-weight: 400;*/
		font-size: 20px;
		text-align: center;
		line-height: 1.066667rem;
	}
	
	.heji {
		box-shadow: 0px 0px 27px 0px rgba(6, 0, 1, 0.06);
		width: 90%;
		padding: 5px 20px;
		margin: 10px auto;
		box-sizing: border-box;
		background: #FFFFFF
	}
	
	.heji div {
		line-height: 40px;
	}
	
	.xians {
		color: #999999;
		border-bottom: 1px solid #F2F2F2;
	}
	
	.heji .daizhifu {
		font-size: 17px;
		/*font-weight: 500;*/
	}
	
	.heji .daizhifu span {
		color: #DB2626;
		/*font-weight: 500;*/
	}
	
	.paytype {
		width: 40px;
		margin-right: 10px;
	}
	
	.heji_check {
		width: 20px;
		position: absolute;
		right: 10px;
		top: 14px;
	}
	
	.heji_flex {
		display: flex;
		align-items: center;
		position: relative;
		padding: 5px 0;
	}
	
	.num {
		/*font-weight: 550;*/
		font-size: 17px;
	}
	
	.num span {
		font-size: 15px;
		color: #666666;
		/*font-weight: 400;*/
	}
	
	.pay_tijiao {
		color: #FFFFFF;
		background: linear-gradient(90deg, rgba(3, 225, 236, 1), rgba(6, 231, 199, 1));
		text-align: center;
		padding: 5px 0;
		font-size: 18px;
		margin: 20% auto 0;
		width: 80%;
	}
</style>