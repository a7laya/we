<template>
	<div>
		<x-header :title="'举报'" :left-options="{backText:''}">
			<vue-header-nav slot="right"></vue-header-nav>
		</x-header>
		<div>
			<div class="list" v-for="(item,index) in list">
				<div class="list_item">{{item.name}}</div>
				<input type="checkbox" value="item" class="toggle" @change="xz($event,index)" />

			</div>
		</div>
		<div class="input_img">
			<img v-for="(item , index) in img" @click="removeimg(index)" style="display: inline-block; vertical-align: middle;margin-right: 20px;" :key="index" class="showimg" :src="$store.state.website.website_domain_name + '/uploads/' + item" />
			<vue-cropper @data="imgfile">
				<div style="text-align: center;">
					<i class="iconfont icon-tsh-copy"></i>
					<div class="txt">上传图片</div>
				</div>
			</vue-cropper>
		</div>
		<div class="js">
				注：提交投诉行为，需确定投诉信息有害，经智汇优库平台鉴定后判断并处理，除法律法规规定的情形外，平台不会向任何第三方透露您的个人信息。
			</div>
		<div class="button_max" @click="ajax">提交</div>
		
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	import { VueCropper, VueHeaderNav, VueShareit } from '../component'
	export default {
		components: {
			XHeader,
			VueCropper,
			VueHeaderNav,
			VueShareit
		},
		data() {
			return {
				
					img: [],
				
				
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
			imgfile(res) {
				this.img.push(res.imgurl);
			},
			removeimg(index) {
				this.form.img.splice(index, 1);
			},
			xz(e, i) {
				var _this = this;
				_this.list[i].isCheck = e.target.checked;

			},
			ajax() {
				var _this = this;
				for(var i = 0; i < _this.list.length; i++) {
					if(_this.list[i].isCheck == true) {
						_this.list1.push(_this.list[i].name);
					}
				}
				if(_this.list1.length < 1) {
					msg("请至少选择一项");
					return;
				}
				_this.$http.post(_this.$store.state.url + '/Live/report_live', {
					load: false,
					 l_id:_this.$route.params.id,
					 content:_this.list1,
					 img:_this.img
				}).then(function(res) {
					if(!res) return;
					msg('感谢您的反馈');
					_this.$router.go(-1);
				})
			}
		}
	}
</script>

<style scoped>
	.input_img {
		position: relative;
		margin-left: 15px;
		text-align: left;
	}
	
	.input_img i {
		font-size: 30px;
		color: #999;
	}
	
	.input_img .txt {
		font-size: 12px;
	}
	
	.input_img img.showimg {
		width: auto;
		height: 50px;
	}
	
	.button_max {
		width: 80%;
		line-height: 40px;
		height: 40px;
		font-size: 18px;
		color: #fff;
		background: #35495e;
		border-radius: 5px;
		text-align: center;
		margin: 0 auto;
		margin-top: 20px;
	}
	
	#msg {
		font-size: 14px;
	}
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