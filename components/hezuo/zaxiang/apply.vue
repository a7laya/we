<template>
	<div class="hezuo">
		<x-header :title="'参与众包'" :left-options="{backText:''}" class="header step"></x-header>
		<div class="biaodin1">
			<div class="ban_title">
				<strong>*</strong>
				<span>请在此输入参与众包的意向</span>
			</div>
			<x-textarea v-model="form.remarks" :placeholder="'请输入你要发布的众包对接内容，发布真实信息有助于快速达成众包。'" :max="10000" :rows="5"></x-textarea>
			<div class="input_img">
				<div class="thsis_maes" v-for="(item , index) in form.imgurl" :key="index">
					<x-icon type="ios-close" size="20" class="iconcl" @click="removeimg(index)"></x-icon>
					<img class="biao_back_img isfilezip" :src="$store.state.url + '/uploads/' + item" />
					<!--<img class="biao_back_img isfilezip" :src="$store.state.website.website_domain_name + '/uploads/' + item" />-->

				</div>
				<vue-cropper :autoCropWidth="375" :enlarge="3" :autoCropHeight="211" @data="fileimg">
					<img class="biao_back_img" src="/static/img/icon1.png" />
				</vue-cropper>
				<div class="ban_title">
					<span>请选择足以引起发布者重视的图片</span>
				</div>
			</div>
		</div>
		<div class="biaodin3">
			<group gutter="0">
				<x-input v-model="form.price"  type="number" :show-clear="false" >
					<div slot="label" class="ban_title">
						<strong>*</strong>
						<span>请输入您的报价</span>
						<span style="position: absolute;right: 7px;top:9px;">元</span>
					</div>
				</x-input>
				<x-input type="number" disabled :placeholder="user.mem_phone">
					<div slot="label" class="ban_title">
						<!--<strong>*</strong>-->
						<span>联系方式</span>
					</div>
				</x-input>
			</group>
		</div>
		<div class="biaodin4" style="border-top: none;">
			<div class="button_max" @click="upform">提交</div>
		</div>
		<div v-transfer-dom>
			<alert class="biaodin6" v-model="isshow" button-text="我知道了" @on-hide="goback">
				<div class="uphezuo">
					<img src="/static/img/icon18.png" />
					<div class="txt1">申请提交成功</div>
					<div class="txt3">+2个智汇币</div>
					<!--<div class="txt2">申请结果会通过系统消息通知您</div>-->
				</div>
			</alert>
		</div>
	</div>
</template>

<script>
	import { XHeader, XTextarea, Group, XInput, CheckIcon, Alert, TransferDom } from 'vux'
	import { VueStep, VueCropper } from '../../component'
	export default {
		directives: {
			TransferDom
		},
		data() {
			return {
				isshow: false,
				form: {
					imgurl: [], //图片地址
					price: null, //报价
					phone: null, //手机号
					remarks: null, //说明
				},
				jiage: '',

			}
		},
		components: {
			Group,
			VueStep,
			VueCropper,
			XHeader,
			XTextarea,
			XInput,
			CheckIcon,
			Alert
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		mounted() {
			var _this = this;
			if(isWeiXin() == 1 && !_this.user.mem_phone) {
				_this.$store.state.bingPhone = true;
				return;
			}
			_this.form.phone = _this.user.mem_phone;
			_this.detail();
		},
		methods: {
			
			detail() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Cooperation/new_coop_detaile', {
					load: true,
					id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
					_this.jiage = res.budget
				})
			},
			fileimg(res) {
				this.form.imgurl.push(res.imgurl);
			},
			removeimg(index) {
				this.form.imgurl.splice(index, 1);
			},
			upform() {
				var _this = this;
				//              if(isWeiXin()==1 && !_this.user.mem_phone){
				//              	_this.$store.state.bingPhone = true;
				//              	return;
				//              }

				//				if(Number(_this.form.price) > Number(_this.jiage)) {
				//					msg("报价需小于等于预算价格");
				//					return;
				//				}

				//验证
				let obj = {
					price: '报价', //报价
					phone: '手机号', //手机号
					remarks: '众包意向', //说明
				}
				if(!isNull(obj, _this.form)) return;

				if(_this.form.price >= 100000000) {
					msg("小于10亿");
					return;
				}
				if(!/^\d+$/.test(_this.form.price)) {
					msg("请输入整数");
					return;
				}
				// console.log(_this.form)
				_this.$http.post(_this.$store.state.url + '/Cooperation/new_participation_coop', {
					'load': false,
					..._this.form,
					id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
					this.isshow = true;
				})
			},
			goback() {
				this.$router.go(-1);
			},

		}
	}
</script>

<style scoped>
	.hezuo {
		background: #fff;
		min-height: -webkit-fill-available;
	}
	
	.hezuo .biaodin1 {
		padding-left: 15px;
		padding-bottom: 10px;
		margin-top: 25px;
		position: relative;
	}
	
	.hezuo .biaodin2,
	.hezuo .biaodin3 {
		padding-top: 8px;
		padding-left: 23px;
		border-top: 6px solid #f2f2f2;
		padding-bottom: 10px;
	}
	
	.hezuo .biaodin4 {
		border-top: 6px solid #f2f2f2;
	}
	
	.hezuo .biaodin3 {
		padding-right: 15px;
	}
	
	.biaodin1 .vux-x-textarea::before {
		display: none;
	}
	
	.hezuo .ban_title {
		font-size: 15px;
		font-weight: 800;
	}
	
	.hezuo .ban_title>span.min {
		font-size: 12px;
		color: #B2B2B2;
	}
	
	.hezuo .ban_title>strong {
		color: red;
	}
	
	.biaodin1 .vux-x-textarea {
		padding: 5px 12px;
	}
	
	.biaodin1 .biao_back_img {
		display: inline-block;
		width: 70px;
		margin-left: 10px;
	}
	
	.biaodin1 .input_img .ban_title {
		font-size: 12px;
		vertical-align: super;
		margin-left: 10px;
	}
	
	.biaodin1 .input_img .ban_title>span {
		color: #B2B2B2;
	}
	
	.biaodin1 .thsis_maes {
		position: relative;
		margin-right: 20px;
		display: inline-block;
		vertical-align: middle;
	}
	
	.biaodin1 .thsis_maes .iconcl {
		fill: #007DDB;
		position: absolute;
		right: -10px;
		top: -10px;
	}
	
	.biaodin2 .isfilezip {
		margin-top: 15px;
		width: 40px;
		height: 40px;
	}
	
	.biaodin2 .thsis_maes {
		position: relative;
		margin-right: 20px;
		display: inline-block;
	}
	
	.biaodin2 .thsis_maes .iconcl {
		margin-left: 5px;
		margin-top: 10px;
	}
	
	.biaodin3 .ban_title {
		margin-left: -15px;
		margin-right: 5px;
	}
	
	.biaodin3 .hezuo_tishiyuyan {
		font-size: 15px;
		color: #999;
	}
	
	.biaodin4 .button_max {
		background: #3790f5;
		margin-top: 10px;
		width: 340px;
		margin-bottom: 40px;
	}
	
	.biaodin4 .login_remember {
		display: block;
		text-align: center;
		margin-top: 20px;
	}
	
	.biaodin4 .login_remember .alert {
		display: inline-block;
	}
	
	.biaodin5 .cen_imglist {
		position: fixed;
		background: #fff;
		border-radius: 5px;
		width: 345px;
		padding: 0 15px;
		width: 315px;
		left: 15px;
		bottom: 100px;
	}
	
	.biaodin5 .cen_imglist .title {
		font-size: 14px;
		color: #333;
		line-height: 40px;
	}
	
	.biaodin5 .cen_imglist .yes {
		line-height: 50px;
		font-size: 18px;
		color: #337bf1;
	}
	
	.biaodin5 .cen_imglist .up,
	.biaodin5 .cen_imglist .next {
		position: absolute;
		z-index: 3;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.biaodin5 .cen_imglist .up .vux-x-icon,
	.biaodin5 .cen_imglist .next .vux-x-icon {
		fill: #fff;
	}
	
	.biaodin5 .cen_imglist .up {
		right: 15px;
	}
	
	.biaodin5 .cen_imglist .next {
		left: 15px;
	}
	
	.biaodin5 .bottom_imglist {
		position: fixed;
		bottom: 0;
		width: 120px;
		margin-left: 133px;
	}
	
	.biaodin5 .bottom_imglist .swiper-demo-img .imgbox {
		position: absolute;
		width: 95%;
		height: 100%;
		border-radius: 5px;
		overflow: hidden;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.biaodin5 .bottom_imglist .swiper-demo-img .imgbox img {
		width: 100%;
		height: 100%;
	}
	
	.txt3 {
		margin-top: 0.4rem;
		font-size: 0.32rem;
		color: #666;
	}
	
</style>