<template>
	<div>
		<!--<x-header class="header step">
			<div slot="overwrite-left" class="goBack" @click="goBack()"></div>
		</x-header>-->
		<x-header :title="''" :left-options="{backText:''}" class="header"></x-header>
		<div class="huodong">
			<div class="flex" style="height: 115px;">
				<div class="huodong_detail">
					<div>活动名称</div>
					<div class="huodong_name">{{info.information}}</div>
					<div class="flex">
						<img src="../../../static/img/weizhi.png" alt="" class="weizhi" />{{info.specreg}}
					</div>
				</div>
				<!--<div class="rights" @click="huodong()"></div>-->
			</div>
			<div class="type">
				<div class="flex">
					<div class="huodong_info">活动时间</div>
					<div class="time">{{info.starttime | returntime8}} - {{info.endtime | returntime8}}</div>
				</div>
				<div class="flex ">
					<div class="huodong_info">支付方式</div>
					<div class="time">{{type}}</div>
				</div>
			</div>

		</div>
		<div class="edit">
			<div class="huodong_info ">请填写联系方式</div>
			<x-input v-model="name" type="text">
				<div slot="label" class="ban_title">
					<strong class="red">*</strong>
					<span>参与人姓名:</span>
				</div>
			</x-input>
			<x-input type="number" :placeholder="user.mem_phone" disabled>
				<div slot="label" class="ban_title">
					<strong class="red">*</strong>
					<span>参与人电话:</span>
				</div>
			</x-input>
			<div class="huodong_tijiao" @click="tijiao">提交</div>
		</div>
		<div v-transfer-dom @click="back">
			<!--"/-->
			<alert class="biaodin6" v-model="isshow" button-text="我知道了">
				<div class="uphezuo">
					<img src="/static/img/icon18.png" />
					<div class="txt1">申请提交成功</div>
					<div class="txt3">+2个智汇币</div>
					<!--<div class="txt2">报名结果会通过系统消息通知您</div>-->
				</div>
			</alert>
		</div>
	</div>

</template>

<script>
	import { XHeader, Group, XInput, Alert, TransferDom } from 'vux';
	import { VueStep, VueCropper } from '../component'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			XInput,
			Group,
			Alert,
			VueStep,
			VueCropper
		},
		data() {
			return {
				name: '',
				phone: '',
				info: '',
				type: '',
				isshow: false,
        next_num: ''
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		mounted() {

			var _this = this;
			//			_this.phone = window.localStorage.ipone;
			var money = _this.$route.params.money;
			if(money > 0) {
				_this.type = "线下支付";
			} else {
				_this.type = "无需支付";
			}

			_this.detail();
			if(isWeiXin() == 1 && !_this.user.mem_phone) {
				_this.$store.state.bingPhone = true;
				return;
			}
			_this.phone = _this.user.mem_phone;
//			console.log(_this.phone)
		},
		methods: {
			//活动详情
			detail() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/activityb/new_act_detaile', {
					load: true,
					id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
					_this.info = res;

				})
			},
			back() {
				this.$router.go(-1);
			},
			tijiao() {

				var _this = this;
				if(!_this.name) {
					msg("请填写联系人姓名");
					return;
				}
				_this.phone = _this.phone || _this.user.mem_phone;
//				console.log("当前手机号" + _this.phone)
				//				if(!isPoneAvailable(_this.phone)) return;

				//				if(!_this.phone) {
				//
				//					msg("请填写联系电话")
				//					if(!isPoneAvailable(_this.ipone)) return;
				//					return;
				//				}
				//				console.log(_this.phone)

				if(_this.$route.params.type == 1) {
//					console.log(_this.info.mem_id);
					_this.$router.push('../../../pay/' + _this.$route.params.id + '/' + _this.$route.params.money + '/' + _this.name + '/' + _this.phone + '/' + _this.info.mem_id);
				} else {

					if(_this.$route.params.type == '0') {
						_this.$route.params.type = 4;
					}
					_this.$http.post(_this.$store.state.url + '/activityb/new_sign_up', {
						load: true,
						sign_actid: _this.$route.params.id,
						type: _this.$route.params.type,
						sign_name: _this.name,
						sign_phone: _this.phone,
						sign_memid: _this.$store.state.token,
						sign_money: _this.$route.params.money,
						fq_memid: _this.info.mem_id,
						sign_memid: _this.$store.state.token,
            next_num: _this.next_num
					}).then((res) => {
						_this.isshow = true;

					})
				}
			},
			huodong() {
				//				var _this = this;
				//					_this.$router.push('/detail/' + _this.$route.params.id);
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped="">
	.header {
		background: #25C286!important;
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

	.huodong {
		background: #25C286;
		color: #FFFFFF;
		padding-bottom: 45px;
	}

	.weizhi {
		width: 20px;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.huodong_name {
		font-size: 16px;
	}

	.huodong_detail {
		padding: 0 15px;
		width: 70%;
	}

	.rights {
		display: inline-block;
		border-right: 2px solid;
		border-bottom: 2px solid;
		width: 10px;
		height: 10px;
		transform: rotate(-45deg);
		margin-left: 12%;
	}

	.huodong_info {
		color: #333333;
		font-size: 16px;
		font-family: PingFang-SC-Bold;
		/*font-weight: 600;*/
		color: rgba(51, 51, 51, 1);
	}

	.type {
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		width: 90%;
		margin: 0 auto;
		padding: 15px;
		box-sizing: border-box;
	}

	.time {
		color: #05E6D0;
	}

	.type .flex {
		justify-content: space-between;
		font-size: 14px;
	}

	.type .flex:nth-child(1) {
		margin-bottom: 15px;
	}

	.red {
		color: #EF2222;
	}

	.edit {
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		width: 90%;
		margin: 0 auto;
		padding: 15px;
		box-sizing: border-box;
		margin-top: -7%;
	}

	.weui-cell:before {
		content: none;
	}

	.weui-cell:after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 0.026667rem;
		border-top: 0.026667rem solid #D9D9D9;
		color: #D9D9D9;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		left: 0.4rem;
	}

	.weui-cell {
		padding: 0.266667rem 0;
	}

	.ban_title {
		margin-right: 15px;
	}

	.huodong_tijiao {
		color: #FFFFFF;
		background: linear-gradient(90deg, rgba(3, 225, 236, 1), rgba(6, 231, 199, 1));
		border-radius: 20px;
		text-align: center;
		padding: 5px 0;
		font-size: 18px;
		margin-top: 40%;
	}

	.txt3 {
		margin-top: 0.4rem;
		font-size: 0.32rem;
		color: #666;
	}
</style>
