<template>
	<div v-if="item">
		<x-header :left-options="{backText:'',}" :title="'竞价'">
			<!--<div slot="right" class="iconfont icon-3"></div>-->
		</x-header>
		<div class="title cl">
			<i class="iconfont icon-hours"></i>
			<span class="">第{{item.ban_stage_num}}期</span>
			<span class="" v-if="item.ban_status==1">仅剩<span v-html="$options.filters.returntime5(item.ban_end_time)"></span></span>
			<span class="" v-else>竞拍尚未开始</span>
		</div>
		
		<div class="ul cl">
			<div class="list">
				<div style="display: flex;align-items: center;justify-content: space-between;">
				  <badge text="当前最高价"></badge>
				  <div style="font-size: 16px;color: rgb(53, 73, 94);">智汇币剩余：{{moneyb/100}}</div>
				</div>
				<div style="display: flex;align-items: center;justify-content: space-between;">
					<span class="number" v-if="item.bidd_info.length==0">{{item.startPrice}}智汇币</span> 
					<span class="number" v-else>{{item.bidd_info[0].bidd_money}}智汇币</span>
					<div  style="color: #35495e;">  此广告位已被竞拍<span class="color">{{item.bidd_info.length}}</span>次</div>
				</div>
			</div>
			<div class="list min fl">起拍价：{{item.startPrice}}智汇币</div>
			<!--<div></div>-->
			<div class="list fr" style="color: #35495e;">100个智汇币等值于1元人民币</div>
			<!--<div class="list fr" style="color: #35495e;">  此广告位已被竞拍<span class="color">{{item.bidd_info.length}}</span>次</div>-->
		</div>

		<div class="list_user_box">
			<div class="user-title">
				<group>
					<cell style="padding: 5px 15px;">
						<span slot="title">
                        	<i class="iconfont icon-jilu" style="color: #35495e;font-size: 24px;vertical-align: middle;"></i>
                        	<span style="vertical-align: middle;">竞价记录</span>
						</span>
					</cell>
				</group>
			</div>
			<div class="ul_box">
				<div class="li_box" v-for="(item,index) in item.bidd_info" :key="index" :class="[index==0 ? 'on' :'']">
					<div class="herder">
						<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" />
					</div>
					<div class="center">
						<div class="top">{{item.mem_nickname || '昵称为空'}}</div>
					</div>
					<div class="center2">
						<div class="top" v-if="index==0">领先</div>
						<div class="top" v-else>出局</div>
					</div>
					<div class="right">
						<div class="top">￥{{item.bidd_money}}</div>
					</div>
				</div>
				<div v-if="item.bidd_info.length<1" class="nopeople">
					暂时无人竞价
				</div>
			</div>
		</div>
		<div class="button_this">
			<span class="input">
        		<input type="number" v-model="input" placeholder="输入价格" />
        	</span>
			<span class="shuming">
        		智汇币
        	</span>
			<span class="this_button" @click="form">
        		立即出价
        	</span>
		</div>
		<divider>规则说明</divider>
		<div class="statement" v-html="item.ban_explain"></div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, Badge, Cell, Group, Divider } from 'vux'
	import { VueShareit } from '../component/'
	export default {
		components: {
			XHeader,
			Badge,
			Cell,
			Group,
			Divider,
			VueShareit
		},
		data() {
			return {
				item: undefined,
				input: undefined,
				moneyb:'',
			}
		},
		mounted() {
			var _this = this;
			_this.ajax();
			const timer = setInterval(() => {
				if(this.item) {
					this.item.ban_end_time--;
					if(this.item.ban_end_time % 9 == 0) {
						_this.ajax();
					}
				}

			}, 1000);
			// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
			this.$once('hook:beforeDestroy', () => {
				clearInterval(timer);
			})
			_this.money()
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: '智汇优库',
					dese: this.$store.state.user.mem_nickname + '邀请你竞价广告位',
					imgUrl: this.$store.state.website.website_domain_name + '/uploads/logo.png',
					link: ''
				}
			}
		},
		methods: {
			ajax() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Banners/bidd_info', {
					'load': false,
					imgid: _this.$route.params.id
				}).then((res) => {
					if(!res) return;
					_this.item = res;

				})
			},
			money(){
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/moneytype/zhbmoney", { load: true })
			      .then(function(res) {
			        if (!res) return;
			        _this.moneyb = res.money;
			      });
				},
			form() {
				var _this = this;
				if(isWeiXin() == 1 && !_this.user.mem_phone) {
					_this.$store.state.bingPhone = true;
					return;
				}

				if(!_this.input) {
					msg("请输入价格");
					return;
				}
				if(!/^\d+$/.test(_this.input)) {
					msg("请输入整数");
					return;
				}
				_this.$http.post(_this.$store.state.url + '/Banners/bannerBidd', {
					'load': false,
					imgid: _this.$route.params.id,
					money: _this.input * 100
				}).then((res) => {
					if(_this.$store.state.successStatus == true) {
						msg("出价成功");
						_this.input = "";
						_this.money()
					}
					_this.ajax();
				})
			}
		}
	}
</script>

<style scoped>
	div.icon-3 {
		font-size: 24px;
		color: #fff;
	}
	
	.title {
		padding: 0 15px;
	}
	
	.title {
		line-height: 40px;
		font-size: 16px;
		background: linear-gradient(to bottom, #ff7956, #f6907b, #fd7053);
		/* 标准的语法 */
		color: #fff;
	}
	
	.ul {
		border-radius: 5px;
		background: #dadada;
		margin: 5px 10px 0 10px;
		padding: 10px;
	}
	
	.list.min {
		color: #35495e;
		text-decoration: line-through;
	}
	
	.list .number {
		display: block;
		font-size: 20px;
		color: #f23443;
	}
	
	.list .vux-badge {
		background: #35495e;
		border-radius: 3px;
	}
	
	.list .color {
		/*color: #f23443;*/
	}
	
	.ul_box {
		border-bottom: 1px solid #D9D9D9;
		background: #fff;
		padding: 0 10px;
		max-height: 300px;
		overflow: scroll;
	}
	
	.ul_box .li_box {
		display: flex;
		justify-content: center;
		align-content: center;
		color: #505050;
		padding: 5px 0;
	}
	
	.ul_box .li_box.on {
		color: #f23443;
	}
	
	.ul_box .li_box+.li_box {
		border-top: 1px solid #D9D9D9;
	}
	
	.ul_box .herder {
		border-radius: 50%;
		overflow: hidden;
	}
	
	.ul_box .herder img {
		width: 25px;
	}
	
	.ul_box .center {
		text-align: left;
		width: 140px;
		font-size: 16px;
	}
	
	.ul_box .center2 {
		font-size: 16px;
		width: 60px;
	}
	
	.ul_box .center .top,
	.ul_box .center2 .top {
		margin-left: 10px;
	}
	
	.ul_box .right {
		text-align: right;
		width: 120px;
		font-size: 16px;
	}
	
	.button_this {
		text-align: center;
		padding: 10px 0;
		margin: 10px 0;
		background: #fff;
	}
	
	.button_this .input {
		border: 1px solid #adadad;
		display: inline-block;
		padding: 0 5px;
		border-radius: 5px;
	}
	
	.button_this .shuming {
		vertical-align: bottom;
		color: #666;
	}
	
	.button_this .input input {
		width: 80px;
		height: 30px;
		line-height: 30px;
		background: none;
	}
	
	.button_this .this_button {
		border-radius: 5px;
		display: inline-block;
		margin-left: 90px;
		color: #fff;
		line-height: 30px;
		width: 80px;
		background: linear-gradient(to left, #ff7956, #fd7053);
	}
	
	.nopeople {
		font-size: 15px;
		text-align: center;
		padding: 7px;
	}
</style>