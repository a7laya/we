<template>
	<div @click="isShow = true">
		<slot></slot>
		<div v-transfer-dom>
			<popup v-model="isShow">
				<div class="red_box">
					<div class="li" v-if="many">
						<span class="left">红包个数</span>
						<span class="right">个</span>
						<input class="right" type="number" placeholder="填写个数" v-model="num" style="margin-right: 5px;" />
					</div>
					<div class="li">
						<span class="left">总金额</span>
						<span class="right">元现金红包</span>
						<input class="right" type="number" placeholder="填写金额" v-model="money" style="margin-right: 5px;" />
					</div>
					<div class="li class1 li_linclass1" v-if="many">
						<span class="left">拼手气红包</span>
						<!--<span class="left color">改为固定红包</span>-->
						<span class="right">每个红包最少0.01个现金红包</span>
					</div>
					<div class="li class2">
						<span class="left">留言</span>
						<input placeholder="恭喜发财!" type="text" v-model="data" />
					</div>
					<div class="li class1">
						<span class="button" @click="form()">塞钱进红包</span>
					</div>
					<div class="li class1" @click="isShow = false">
						<span class="button class1">取消</span>
					</div>
				</div>
			</popup>
		</div>
	</div>
</template>

<script>
	import { TransferDom, Popup } from 'vux'
	export default {
		directives: {
			TransferDom
		},
		components: {
			Popup,
		},
		props: {
			receive: undefined, //接受方id
			id: undefined, //直播间id
			many: undefined, //红包类型false一对一，true一对多
			url: undefined //请求的api接口
		},
		data() {
			return {
				isShow: false,
				num: undefined,
				money: undefined,
				data: undefined,
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		methods: {
			form() {
				var _this = this;
				var form = {

					num: _this.num,
					money: Number(_this.money),
					data: _this.data || '恭喜发财！',
					id: _this.id,
					receive: _this.receive,
					type: _this.many ? 1 : 2,
					Arrivaltype: 5
				}
				//验证
				let obj = _this.many ? {
					num: '红包个数',
					money: '红包金额'
				} : {
					money: '红包金额'
				}
				if(!isNull(obj, form)) return;
				if(!(/^(\d+|\d+\.\d{1,2})$/.test(_this.money))) { //
					msg('请输入正确金额');
					return;
				}
				if(_this.many) { //如果是多人
					if(!(/(^[1-9]\d*$)/.test(_this.num))) { //红包个数是否是正整数
						msg('请输入正确红包个数');
						return;
					}
					if(_this.num * 0.01 > _this.money) {
						msg('请输入正确金额');
						return;
					}
				}
				// console.log(form)
				_this.$pay.redPays(this, form).then((res) => {
					if(!res) return;
					// _this.isShow  = false;
				})
			},

		}
	}
</script>

<style scoped>
	.red_box {
		background: #fff5f4;
		padding: 16px 0;
	}
	
	.red_box .li {
		margin: 0 10px;
		padding: 0 10px;
		margin-bottom: 16px;
		line-height: 40px;
		font-size: 14px;
		background: #fff;
		border-radius: 5px;
	}
	
	.red_box .li::after {
		content: '';
		display: block;
		clear: both;
	}
	
	.red_box .li .left {
		float: left;
	}
	
	.red_box .li .right {
		float: right;
	}
	
	.red_box .li input {
		min-width: 200px;
		line-height: 40px;
		height: 40px;
		text-align: right;
	}
	
	.red_box .li.class1 {
		padding: 0;
		background: none;
		font-size: 12px;
	}
	
	.red_box .li.class1 .left.color {
		color: #4bb28a;
	}
	
	.red_box .li.class2 input {
		width: 300px;
		float: right;
	}
	
	.red_box .button {
		display: block;
		background: #d84e41;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		line-height: 30px;
		font-size: 14px;
	}
	
	.red_box .button.class1 {
		background: #80d2f8;
	}
	
	.red_box .li_linclass1 {
		line-height: 25px;
	}
</style>
