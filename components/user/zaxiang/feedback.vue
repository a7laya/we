<template>
	<div>
		<x-header :title="'意见反馈'" :left-options="{backText:''}">
			<vue-header-nav slot="right"></vue-header-nav>
		</x-header>
		<div>
			<group>
				<x-textarea :height="200" placeholder="尊敬的会员您好，如您在使用平台中遇任何问题或需求，可在此留言并提交客服，我们会在最快的时间内给您回复或解决。智汇优库平台因为有你，才会更加优秀！" v-model="form.Explain" id="msg"></x-textarea>
			</group>
		</div>
		<div class="input_img">
			<img v-for="(item , index) in form.img" @click="removeimg(index)" style="display: inline-block; vertical-align: middle;margin-right: 20px;" :key="index" class="showimg" :src="$store.state.website.website_domain_name + '/uploads/' + item" />
			<vue-cropper @data="imgfile">
				<div style="text-align: center;">
					<i class="iconfont icon-tsh-copy"></i>
					<div class="txt">上传图片</div>
				</div>
			</vue-cropper>
		</div>
		<div class="button_max" @click="ajax">提交反馈</div>
		<a class="button_max" href="tel:400-118-6800" style="display: block;">拨打400客服电话</a>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, XTextarea, Group } from 'vux'
	import { VueCropper, VueHeaderNav, VueShareit } from '../../component'
	export default {
		components: {
			XHeader,
			VueCropper,
			XTextarea,
			Group,
			VueHeaderNav,
			VueShareit
		},
		data() {
			return {
				form: {
					img: [],
					Explain: null,
				}
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
				this.form.img.push(res.imgurl);
			},
			removeimg(index) {
				this.form.img.splice(index, 1);
			},
			ajax() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Homecenter/fankui', {
					load: false,
					..._this.form
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
</style>