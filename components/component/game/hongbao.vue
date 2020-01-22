<template>
	<div>
		<div v-transfer-dom>
			<x-dialog v-model="isShow" class="dialog-backnone" :dialog-style="styleData">
				<div class="redopen">
					<div class="redcenters width640 ovredlist">
						<div class="hiders">
							<div class="open-red">
								<p>恭喜你,领取成功</p>
								<p>红包金额已存入账户余额</p>
								<div class="img">
									<div>￥</div>
								</div>
								<div class="money">
									<span v-if="item">{{item.red_money / 100}}</span>
									<span>元</span>
								</div>
								<div class="footer">
									<!--                <div  v-if = "times == 1">-->
									<!--                  <x-button @click.native="go(1)">去提现</x-button>-->
									<!--                  <span @click="tiaozhan()">继续挑战</span>-->
									<!--                </div>-->
									<!--                <div v-else-if = "times > 1" >-->

									<x-button @click.native="num()" v-if="status==1">继续挑战</x-button>
									<x-button @click.native="tiaozhan()" v-else="">继续挑战</x-button>
									<span @click="go(2)">返回首页</span>
									<!--                </div>-->
								</div>
							</div>
						</div>
					</div>
				</div>
			</x-dialog>
		</div>

		<!--<alert v-model="show1" :title="title" @on-show="onShow" @on-hide="onHide">{{content1}}</alert>-->
		<div v-transfer-dom>
			<confirm v-model="show1" :title="title" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
				<p style="text-align:center;">{{content}}</p>
				<p style="text-align:center;">{{content1}}</p>
			</confirm>
		</div>

	</div>
</template>

<script>
	import { TransferDom, XDialog, Confirm, XButton, Alert } from 'vux'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XDialog,
			XButton,
			Alert,
			Confirm
		},
		props: {
			value: null,
			item: null,
			times: null,
			status:null
		},
		data() {
			return {
				isShow: false,
				show: false,
				opening: false,
				styleData: {
					width: '230px'
				},
				is_hint: '',
				title: '',
				title: '温馨提示',
				content: '小玩怡情，大玩伤身！',
				content1: '如需继续答题，每轮扣除20个智汇。',
				show1: false,
				
				
			}
		},
		watch: {
			isShow(val) {
				this.$emit('input', val);
			},
			value: {
				handler: function(val) {
					this.isShow = val
				},
				immediate: true
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		mounted() {
			let _this = this;
			_this.getinfo();
			

		},
		methods: {
			getinfo() {
				let _this = this;
				_this.$http.post(_this.$store.state.url + '/Applets/get_game_info', {
					load: true
				}).then(function(res) {
					_this.status = res.status;
				})
			},
			getStatus() {
				//				let _this = this;
				//				_this.$http.post(_this.$store.state.url + '/Applets/is_hint', {
				//					load: true,
				//					type: 1
				//				}).then(function(res) {
				//					_this.is_hint = res.is_hint;
				//				})
			},
			go(type) {
				var type = Number(type)
				var url
				switch(type) {
					case 2:
						url = '/game/index'
						break
				}
				this.$router.push(url)
			},
			tiaozhan() {
				this.isShow = false
				this.$parent.tryAgain();
			},
			num() {
				let _this = this;
				_this.$http.post(_this.$store.state.url + '/Applets/is_hint', {
					load: true,
					type: 1
				}).then(function(res) {
					_this.is_hint = res.is_hint;
					if(_this.is_hint == 0) {
						_this.show1 = true;
						_this.isShow = false;
					} else {
						_this.tiaozhan();
					}
				})

			},
			onShow() {

			},
			onHide() {

			},
			onConfirm() {
				let _this = this;
				_this.$http.post(_this.$store.state.url + '/Applets/is_hint', {
					load: true,
					type: 2
				}).then(function(res) {
					_this.is_hint = res.is_hint;
					_this.tiaozhan();
				})

			},
			onCancel() {
				let _this = this;
				_this.$http.post(_this.$store.state.url + '/Applets/is_hint', {
					load: true,
					type: 2
				}).then(function(res) {
					_this.is_hint = res.is_hint;
					_this.$router.push("/game/index")
				})
			}
		}
	}
</script>

<style scoped>
	.animation {
		position: absolute;
		animation: myfirst 2s infinite linear;
	}
	
	@keyframes myfirst {
		from {
			transform: rotateY(0deg);
		}
		to {
			transform: rotateY(360deg);
		}
	}
	
	.redopen .redcenters {
		width: 100%;
		margin: 0 auto;
		/*background-color: #d84e43;*/
		/*background: -webkit-linear-gradient(left top, red , blue); !* Safari 5.1 - 6.0 *!*/
		background: -o-linear-gradient(top right, #FF6E3B, #FF678F);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(top right, #FF6E3B, #FF678F);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to top right, #FF6E3B, #FF678F);
		/* 标准的语法（必须放在最后） */
		/*height: auto;*/
		border-radius: 8px;
		/*padding-bottom: 20px;*/
		height: 283px;
	}
	
	.redopen .open-red {
		height: 89px;
		/*border-radius: 8px 8px 0 0px;*/
		/*background: #E05449;*/
		border-radius: 8px 8px 50% 50%;
		background: -webkit-gradient(linear, 0 0, 0 100%, from(#FF678F), to(#FF6E3B));
		box-shadow: 0px 0px 50px rgba(217, 27, 84, 1);
		color: #FFFFFF;
	}
	
	.redopen .open-red p:nth-child(1) {
		font-size: 16px;
		font-weight: bold;
		padding-top: 20px;
		width: 100%;
		text-align: center;
	}
	
	.redopen .open-red p:nth-child(2) {
		font-size: 11px;
		padding-top: 2px;
		color: rgba(255, 193, 181, 1);
		width: 100%;
		text-align: center;
	}
	
	.redopen .open-red .img {
		width: 39px;
		height: 39px;
		border-radius: 50px;
		background: rgba(255, 201, 71, 1);
		margin: 0px auto;
	}
	
	.redopen .open-red .img div {
		width: 30px;
		line-height: 30px;
		border-radius: 50px;
		border: 1px solid rgba(255, 139, 35, 1);
		background: rgba(255, 201, 71, 1);
		margin: 4px auto;
		display: inline-block;
		font-size: 24px;
	}
	
	.money {
		color: #FFF000;
		margin-top: 20px;
	}
	
	.money span:nth-child(1) {
		font-size: 36px;
	}
	
	.money span:nth-child(2) {
		font-size: 15px;
	}
	
	.footer {
		margin-top: 20px;
	}
	
	.footer button {
		width: 173px;
		height: 30px;
		border-radius: 50px;
		background: -o-linear-gradient(to right, #FF7F00, #FFAA01);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(to right, #FF7F00, #FFAA01);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FF7F00, #FFAA01);
		/* 标准的语法（必须放在最后） */
		color: #FFFFFF;
		font-size: 12px;
	}
	
	.weui-btn:after {
		border: 0px;
	}
	
	.footer span {
		display: inline-block;
		margin-top: 10px;
		color: #FFDD99;
		font-size: 12px;
	}
	
	.redopen .redcenters .hiders .cose {
		position: absolute;
		top: 0px;
		right: 0px;
		margin: 6px 6px;
		color: rgba(0, 0, 0, 0.59);
		cursor: pointer;
		font-size: 25px;
		opacity: 0.3;
	}
	
	.packimgs img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: 8px;
		margin-left: -30px;
	}
	
	.redcenters .text_flow {
		color: #ddbc84;
		margin: 6px 0px;
		text-align: center;
		font-size: 14px;
	}
	
	.redcenters .RedPack_Info .text_flow:last-child {
		color: #ddbc84;
		font-size: 18px;
	}
	
	.redcenters .mar10 {
		margin-top: 50px;
		font-size: 14px;
	}
	
	.redcenters .openkai {
		background-color: #DDBC84;
		width: 65px;
		height: 65px;
		border-radius: 50%;
		text-align: center;
		line-height: 65px;
		margin: -33px auto;
		padding: 3px;
		position: relative;
		cursor: pointer;
	}
	
	.redcenters .openkai .openkais {
		background-color: #DDBC84;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 1px solid #d2b27d;
		text-align: center;
		line-height: 61px;
		font-size: 26px;
	}
</style>