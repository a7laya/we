<template>
	<div style="min-height: -webkit-fill-available;position: relative;">
		<x-header :title="'充值'" :left-options="{backText:''}">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>
		<group>
			<div style="height:40px;line-height: 40px;font-size:18px;margin-left:16px;color:#333333">当前智汇币余额{{moneyb/100}}</div>
			<x-input title="金额：" v-model="maskValue" @input="oninput" :type="'number'" :placeholder="'1元=100智汇币' "></x-input>
			<popup-radio title="支付方式" :options="options1" v-model="option1" readonly v-if="isWeiXin==1"></popup-radio>
			<popup-radio title="支付方式" :options="options1" v-model="option1" v-else></popup-radio>
		</group>
		<div style="margin-top: 30px;padding: 0 20px;">
			<x-button v-if="is_click" type="primary" @click.native="form">智汇币充值</x-button>
			<x-button v-else style="background: rgb(220, 220, 220); color: #999;">智汇币充值</x-button>
		</div>
		<!--<div class="shuoming" style="font-size: 12px;color: #999;text-align: center;position: absolute;width: 100%;bottom: 10px;" v-if="isWeiXin==1">在微信中不能使用其他支付方式</div>-->
		<divider style="margin-top: 30px;font-size: 0.4rem;">充值记录</divider>
		<div class="tixian_list">
			<x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
				<thead>
					<tr style="background-color: #F7F7F7">
						<th>充值金额</th>
						<th>充值时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item , index) in list" :key="index">
						<td>{{item.money}}智汇币</td>
						<td>{{item.add_time | returntime1}}</td>
					</tr>
				</tbody>
			</x-table>
			<vue-loading v-if="updata" :url="$store.state.url + '/index/recharge?page=1&limit=10'" @ievent="loaddata"></vue-loading>
			<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
		</div>
	</div>
</template>

<script>
	import { XHeader, Group, XInput, PopupRadio, XButton, Divider, XTable } from 'vux'
	import { VueLoading, VueHeaderNav, VueShareit } from '../../component/'
	export default {
		components: {
			XHeader,
			Group,
			XInput,
			PopupRadio,
			XButton,
			Divider,
			XTable,
			VueLoading,
			VueHeaderNav,
			VueShareit
		},
		data() {
			return {
				maskValue: undefined || this.$route.query.num,
				option1: '微信',
				options1: ['微信'],
				is_click: false,
				isWeiXin: isWeiXin(),
				list: undefined,
				updata: true, //获取提现明细
				moneyb: '...',
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动平台，秒得五十块！',
					imgUrl: '/static/logo.png',
					link: '/user/index'
				}
			}
		},
		mounted() {
			var _this = this;
			_this.ajax();
		},
		methods: {
			ajax() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/moneytype/zhbmoney').then(function(res) {
					if(!res) return;
					_this.moneyb = res.money;
				})
			},
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
				})
			},
			fupdata() { //更新列表
				this.list = undefined;
				this.updata = false;
				setTimeout(() => {
					this.updata = true;
				}, 20)
			},
			oninput() {
				if(this.maskValue > 0) {
					this.is_click = true;
				} else {
					this.is_click = false;
				}
			},
			form() {
				var _this = this;
				//              if(isWeiXin()==1 && !_this.user.mem_phone){
				//              	_this.$store.state.bingPhone = true;
				//              	return;
				//              }
				if(_this.maskValue < 1) {
					msg("充值金额必须大于等于1元");
					return;
				}
				this.$pay.pay(_this, {
					paytype: _this.option1 == '微信' ? 'wechat' : "alipay",
					num: _this.maskValue * 100,
					Arrivaltype: 1,
				}).then(function(res) {
					msg(res.msg);
					_this.fupdata();
					_this.ajax();
					_this.maskValue = undefined;
				});
			}
		}
	}
</script>

<style>

</style>