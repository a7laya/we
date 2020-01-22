<template>
	<div>
		<x-header :title="'提现'" :left-options="{backText:''}">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>
		<group>
			<x-input title="金额" v-model="maskValue" @input="oninput" :type="'number'" :placeholder=" '输入金额(总金额:' + moneyb/100+')'"></x-input>
			<popup-radio title="提现方式" :options="options1" v-model="option1"></popup-radio>
		</group>
		<div style="margin-top: 30px;padding: 0 20px;">
			<x-button v-if="is_click==true&&type==2" type="primary" @click.native="form">智汇豆提现</x-button>
			<x-button v-if="is_click==false&&type==2" style="background: rgb(220, 220, 220); color: #999;">智汇豆提现</x-button>
			<x-button v-if="is_click==true&&type==3" type="primary" @click.native="form">红包提现</x-button>
			<x-button v-if="is_click==false&&type==3" style="background: rgb(220, 220, 220); color: #999;">红包提现</x-button>
		</div>
		<div style="margin: 28px 17px 10px;" v-if="type=='2'">
			<div style="font-size: 14px;">提现说明:</div>
			<p>1.为避免提现失败，请保持关注公众号<span style="color: #043FF1;margin-left: 5px;" @click="$store.commit('erweima');">点击关注</span></p>
			<p>2.提现最低金额为5个智汇豆</p>

		</div>
		<divider style="margin-top: 30px;font-size: 0.4rem;">提现记录</divider>
		<div class="tixian_list">
			<x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
				<thead>
					<tr style="background-color: #F7F7F7">
						<th>提现金额</th>
						<th>时间</th>
						<th>方式</th>
						<th>状态</th>
						<th>备注</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item , index) in list" :key="index" v-if="type=='2'&&item.account_type=='2'">
						<td>{{item.money}}智汇豆</td>
						<td>{{item.add_time | returntime1}}</td>
						<td>{{item.tx_type | tx_type}}</td>
						<td>{{item.admin_type | admin_type}}</td>
						<td>{{item.admin_explain}}</td>
					</tr>
					<tr v-for="(item , index) in list" :key="index" v-if="type=='3'&&item.account_type=='39'">
						<td>{{item.money}}元</td>
						<td>{{item.add_time | returntime1}}</td>
						<td>{{item.tx_type | tx_type}}</td>
						<td>{{item.admin_type | admin_type}}</td>
						<td>{{item.admin_explain}}</td>
					</tr>
				</tbody>
			</x-table>
			<vue-loading v-if="updata" :url="$store.state.url + '/index/withdrawmoney?page=1&limit=10'" @ievent="loaddata"></vue-loading>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
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
			VueLoading,
			XTable,
			VueHeaderNav,
			VueShareit
		},
		data() {
			return {
				maskValue: undefined,
				option1: '微信',
				options1: ['微信'],
				is_click: false,
				list: undefined,
				updata: true, //获取提现明细
				moneyb: '...',
				type: ''
			}
		},
		mounted() {
			var _this = this;
			_this.ajax();
			_this.type = _this.$route.params.type;
		},
		filters: {
			tx_type(value) {
				if(!value) return '未知';
				var txt;
				switch(value * 1) {
					case 1:
						txt = '微信'
						break;
					case 2:
						txt = '支付宝'
						break;
					case 3:
						txt = '银联'
						break;
				}
				return txt;
			},
			admin_type(value) {
				if(!value) return '未知';
				var txt;
				switch(value * 1) {
					case 1:
						txt = '审核中'
						break;
					case 2:
						txt = '提现成功'
						break;
					case 3:
						txt = '审核未通过'
						break;
				}
				return txt;
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
		methods: {
			ajax() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/moneytype/get_money', {
					type: _this.$route.params.type
				}).then(function(res) {
					if(!res) return;
					_this.moneyb = res.money;
				})
			},
			oninput() {
				if(this.maskValue > 0) {
					this.is_click = true;
				} else {
					this.is_click = false;
				}
			},
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
				})
			},
			form() {
				var _this = this;
				if(_this.type == 2) {
					if(_this.maskValue % 5 != 0) {
						msg("提现金额必须为5的整数倍");
						return;
					}
				} else if(_this.type == 3) {
          console.log(_this.maskValue)
					let money = _this.maskValue.split(".");
          // console.log(money)
					// if(money[1].length > 2) {
					// 	msg("提现金额小数为两位数");
					// 	return;
					// }
					if(_this.maskValue < 1) {
						msg("提现金额最低1元");
						return;
					}else if(money.length > 1){
              if(money[1].length > 2){
                msg("提现金额小数为两位数");
                 	return;
              }
          }
				}

				if(isWeiXin() == 1 && !_this.user.mem_phone) {
					_this.$store.state.bingPhone = true;
					return;
				}
				var num = _this.maskValue * 100;
				_this.$http.post(_this.$store.state.url + '/Moneytype/Reflect', {
					lood: false,
					money: num,
					type: _this.options1.indexOf(_this.option1) + 1,
					m_type: _this.$route.params.type
				}).then(function(res) {
					if(!res) return;
					msg('提交成功！等待审核');
					_this.maskValue = undefined;
					_this.ajax();
					_this.$store.dispatch('getUser');
					_this.fupdata();
					//                  _this.$router.go(-1);
				})
			},
			fupdata() { //更新列表
				this.list = undefined;
				this.updata = false;
				setTimeout(() => {
					this.updata = true;
				}, 20)
			}
		}
	}
</script>

<style scoped>
	.tixian_list .li {
		line-height: 30px;
		font-size: 14px;
		padding: 0 15px;
		margin-top: 1px;
	}

	.tixian_list .li .txt,
	.tixian_list .li .time {
		display: block;
	}

	.tixian_list .li .time {
		color: #999;
	}

	.weui-input {
		font-size: 12px!important;
	}
</style>
