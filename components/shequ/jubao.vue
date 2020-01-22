<template>
	<div>
		<x-header :title="'举报'" :left-options="{backText:''}" class="header">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>
		<div>
			<div class="list" v-for="(item,index) in list">
				<div class="list_item">{{item.name}}</div>
				<input type="checkbox" value="item" class="toggle" @change="xz($event,index)" />

			</div>
			<div class="js">
				注：提交投诉行为，需确定投诉信息有害，经智汇优库平 台鉴定后判断并处理，除法律法规规定的情形外，平 台不会向任何第三方透露您的个人信息。
			</div>
			<div class="button_max" @click="tijiao()">提交</div>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>

	</div>
</template>

<script>
	import { XHeader } from 'vux'
	import { VueShareit ,VueHeaderNav} from '../component/'
	export default {
		components: {
			XHeader,
			VueShareit,
			VueHeaderNav
		},
		data() {
			return {
				list: [{
						name: '内容包含色情信息',
						isCheck: false
					},
					{
						name: '内容包含欺诈信息',
						isCheck: false
					},
					{
						name: '内容包含暴力恐怖信息',
						isCheck: false
					},
					{
						name: '内容包含政治敏感信息',
						isCheck: false
					},
					{
						name: '内容包含赌博信息',
						isCheck: false
					},
					{
						name: '内容可能包含谣言信息',
						isCheck: false
					},
					{
						name: '内容包含不明或“钓鱼”连接',
						isCheck: false
					},
					{
						name: '内容包含其它有害信息',
						isCheck: false
					},
				],
				list1: []
			}
		},
		mounted() {
			var _this = this;
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动社区',
					imgUrl: '/static/logo.png',
					link: '/shequ/index'
				}
			},
		},
		methods: {
			//为了改变list里面的isCheck
			xz(e, i) {
				var _this = this;
				_this.list[i].isCheck = e.target.checked;

			},
			//提交投诉
			tijiao() {
				var _this = this;
				//判断 list里面哪些 isCheck是选中的
				for(var i = 0; i < _this.list.length; i++) {
					//如果是选中的就把对应的name放到一个新数组里面
					if(_this.list[i].isCheck == true) {
						_this.list1.push(_this.list[i].name);
					}
				}
				//至少要投诉一项
				if(_this.list1.length < 1) {
					msg("请至少选择一项");
					return;
				}
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/report_dy', {
					lood: false,
					d_id: _this.$route.params.id,
					content: _this.list1
				}).then(function(res) {
					if(!res) return;
					msg("举报成功");
					_this.$router.push('../index');
				})
			}

		}
	}
</script>

<style scoped>
	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #FFFFFF;
		padding: 10px 20px;
		margin-bottom: 1px;
		position: relative;
	}
	
	.list-item {
		font-size: 12px;
	}
	
	.wxz {
		width: 20px;
		height: 20px;
		margin-right: 20px;
	}
	
	.js {
		width: 80%;
		margin: 20px auto;
	}
	
	.toggle {
		text-align: center;
		vertical-align: middle;
		border: none;
		appearance: none;
		/*关键代码*/
		-webkit-appearance: none;
		outline: none;
		cursor: pointer;
	}
	
	.toggle::after {
		content: url('/static/img/nocheck.png');
	}
	
	.toggle:checked::after {
		content: url('/static/img/check.png');
	}
</style>