<template>
	<div class="container">
		<x-header class="header">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">设置红包</div>
		</x-header>
		<div class="hongbaoCon">
			<div class="hongbaoInn">
				<p class="title">请输入红包金额：</p>
				<div class="money">
					<span>请输入金额</span>
					<!-- <input type='number' v-model="value" placeholder="" autofocus onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"> -->
					<!-- <input   v-model="value"  placeholder="" autofocus onkeyup="if(value.length==1){value=parseInt(value.replace(/[^1-9]/g,''))}else{value=parseInt(value.replace(/\D+/, ''))}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"> -->
					<input v-model="value" type="text" onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')" >
          <span>元</span>
					<span>=</span>
					<span>红包数:{{number}}个</span>
				</div>
				<p class="tishi">用户答题挑战成功就能领取随机金额的红包</p>
			</div>
		</div>
		<div class="choose">
			<p>支付方式</p>
			<p>
				<img src="/static/img/weixin.png" alt=""> 微信余额支付（{{value}}）元
			</p>
		</div>
		<x-button class="add" @click.native="pay()">立即支付</x-button>
		<toast v-model="showPositionValue" type="text" :time="2000" is-show-mask :text="toastText" :position="position"></toast>
		<vue-shareit></vue-shareit>
	</div>
</template>

<script>
	import { XButton, XHeader, XInput, Alert, AlertPlugin, Toast } from 'vux'
	import VueShareit from '../../component/game/gameShareit'
	export default {
		components: {
			XButton,
			XHeader,
			XInput,
			Alert,
			AlertPlugin,
			Toast,
			VueShareit,
		},
		name: 'setHongbao',
		data() {
			return {
				borderColor: {
					borderColor: '#333'
				},
				value:'',
				number: null,
				show: false,
				showPositionValue: false,
				toastText: '充值金额不可以小于10元',
				position: 'middle',
				ratio:'',
				urls:''
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		watch: {
			value() {
				var _this = this
				_this.number = _this.value * _this.ratio
        _this.number =  Math.round(_this.number)
			}
		},
		mounted(){
			let _this=this;
			_this.bili();
			 _this.urls = new URL(window.location.href)
       
		},
		methods: {
			//红包比例
			bili() {
				let _this = this
				_this.$http.post(_this.$store.state.url + '/Applets/retRatio', {
					load: true,
				}).then(function(res) {
			     _this.ratio=res;
           // console.log(_this.ratio)
				})
			},
			goBack() {
        if(this.urls.searchParams.get("uidkey")){
          this.$router.push('/game/tiku')
        }else{
            this.$router.go(-1)
        }
				//      this.$router.push('/game/index')
				// history.go(-1);
			},
			pay() {
				var _this = this
				if(!_this.value){
					msg('请输入红包金额')
          return
				}
				if(_this.value < 10) {
					this.showPositionValue = true
				} else if(_this.value >= 10) {
					var data = {
						sign_money: _this.value * 100,
						type: 2,
						id: _this.$route.params.id
					}
					this.$pay.gamePays(_this, data).then(function(res) {
            console.log(res)
						msg(res.msg)
					})
				}
			}
		}
	}
</script>

<style scoped>
	.vux-header {
		background-color: #ffffff;
	}

	.goBack {
		position: absolute;
		width: 12px;
		height: 12px;
		border-style: solid;
		border-color: white;
		border-width: 1px 0 0 1px;
		-webkit-transform: rotate(315deg);
		transform: rotate(315deg);
		top: 3px;
	}

	.title {
		width: 210px;
		font-size: 16px;
		text-align: center;
		line-height: 1.066667rem;
		font-family: PingFang-SC-Bold;
		margin-bottom: 5px;
		margin-top: 5px;
	}

	.hongbaoCon {
		margin-top: 10px;
		/*padding: 10px 0px;*/
		width: 100%;
		height: 120px;
		background: #FFFFFF;
	}

	.hongbaoInn {
		padding: 0px 50px;
		margin: 0 auto;
		background: #FFFFFF;
	}

	.hongbaoInn .title {
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		text-align: left;
		display: inline-block;
		margin-top: 15px;
	}

	.hongbaoInn .money {
		font-size: 13px;
		color: #333333;
		text-align: left;
		padding: 5px 0px;
	}

	.hongbaoInn .money input {
		width: 50px;
		font-size: 18px;
		color: #333333;
		font-weight: bold;
		text-align: center;
		border-bottom: 1px solid #999;
	}

	.hongbaoInn .money span {
		width: 50px;
		font-size: 12px;
		color: #999999;
		text-align: left;
	}

	.hongbaoInn .tishi {
		font-size: 10px;
		color: #999999;
		text-align: left;
	}

	.advice {
		height: 26px;
		width: 26px;
		border-radius: 50px;
		display: inline-block;
		background-image: url('/static/img/game/uncheck.png');
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center;
		vertical-align: middle;
		margin-top: -4px;
	}

	input[type="radio"]:checked+.advice {
		background-image: url('/static/img/game/check.png');
	}

	.choose {
		width: 100%;
		height: 100px;
		background: #FFFFFF;
		margin-top: 10px;
		padding-bottom: 10px;
	}

	.choose img {
		width: 50px;
		height: 50px;
		background: #FFFFFF;
		float: left;
		margin-right: 15px;
	}

	.choose p:nth-child(1) {
		padding: 10px 50px;
		background: #FFFFFF;
		margin-top: 10px;
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		text-align: left;
	}

	.choose p:nth-child(2) {
		line-height: 50px;
		padding: 0px 50px;
		background: #FFFFFF;
		font-size: 14px;
	}

	.add {
		width: 270px;
		line-height: 44px;
		background: -webkit-linear-gradient(left, #FF7F00, #FFAA01);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #FF7F00, #FFAA01);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #FF7F00, #FFAA01);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FF7F00, #FFAA01);
		/* 标准的语法 */
		margin: 39px auto 30px;
		border-radius: 50px;
		color: #fff;
	}
</style>
