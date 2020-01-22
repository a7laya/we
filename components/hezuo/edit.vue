<template>
	<div class="hezuo">

		<div>
			<x-header :title="'编辑众包'" :left-options="{backText:''}" class="header step"></x-header>
			<div class="biaodin1">
				<div class="ban_title">
					<strong>*</strong>
					<span>请在此输入详细的众包需求</span>
				</div>
				<x-textarea v-model="remarks" :placeholder="'请输入你要发布的众包对接内容，发布真实信息有助于快速达 成众包。'"  :rows="5"></x-textarea>

			</div>

			<div class="biaodin3">
				<group gutter="0">
					<x-input v-model="subject" :max="5">
						<div slot="label" class="ban_title">
							<strong>*</strong>
							<span>{{name|person}}简称</span>
						</div>
					</x-input>

					<x-input v-model="budget" type="number" :show-clear="false">
						<div slot="label" class="ban_title">
							<strong>*</strong>
							<span>众包预算</span>
							<span style="position: absolute;right: 7px;top:9px;">元</span>
						</div>

					</x-input>

					<div class="labelclass2 weui-cell">
						<div slot="label" class="ban_title weui-cell__hd">
							<strong>*</strong>
							<span>招募截止时间</span>
						</div>
						<datetime v-model="endtime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary"></datetime>
					</div>

				</group>
			</div>
			<div class="biaodin4">
				<div class="button_max " @click="upform">保存</div>
			</div>

		</div>

	</div>
</template>

<script>
	import { XHeader, XTextarea, Group, XInput, Datetime, CheckIcon, XDialog, TransferDom, Swiper, SwiperItem } from 'vux'
	import { VueStep, VueCropper, VueFileZip, VueCode, VueAddress, VueXieyi } from '../component'
	export default {
		directives: {
			TransferDom
		},
		data() {
			return {
				imgindex: 0,
				imglist: [],
				info: '',
				imgShow: false,
				colorShow: true,
				remarks: '',
				subject: '',
				budget: '',
				endtime: '',
				name:''
			}
		},
		components: {
			Group,
			VueStep,
			VueCropper,
			XHeader,
			XTextarea,
			VueFileZip,
			XInput,
			VueCode,
			VueAddress,
			Datetime,
			VueXieyi,
			CheckIcon,
			XDialog,
			Swiper,
			SwiperItem
		},
		mounted() {
			var _this = this;
			_this.detail();
		},
		methods: {

			addindustry(res) {
				this.form.industry = res.id
			},
			remindustry() {
				this.$router.back(-1)
			},
			detail() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Cooperation/get_coop', {
					'load': false,
					id: _this.$route.params.id
				}).then((res) => {
					if(!resizeBy) return;
					_this.info = res;
					console.log(res);
					_this.remarks = res.coop_remarks;
					_this.subject = res.coop_subject;
					_this.budget = res.coop_budget;
					_this.endtime = returntime1(res.coop_endtime);
					_this.name=res.coop_is_person

				})
			},
			upform() {
				var _this = this;

				if(!_this.remarks){
					msg("众包需求不能为空");
					return
				}
				if(!_this.subject){
					msg("众包意向不能为空");
					return
				}
				if(!_this.budget){
					msg("预算不能为空");
					return
				}
				if(_this.budget>=1000000000){
					msg("小于10亿");
					return;
				}
				if(!/^\d+$/.test(_this.budget)) {
					msg("请输入整数");
					return;
				}

				if(!_this.endtime){
					msg("结束时间不能为空");
					return
				}
				_this.$http.post(_this.$store.state.url + '/Cooperation/up_coop', {
					'load': false,
					remarks: _this.remarks,
					subject: _this.subject,
					budget: _this.budget,
					endtime: _this.endtime,
					title: _this.info.coop_title,
					id: _this.$route.params.id
				}).then((res) => {
					if(!res) return;
					this.$router.replace('../../user/history');
				})
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
		/*font-weight: 800;*/
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
		display: inline-block;
		font-size: 12px;
		vertical-align: super;
		margin-left: 10px;
	}

	.biaodin1 .input_img .ban_title>span {
		color: #B2B2B2;
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
		margin-left: -10px;
		margin-right: 20px;
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

	.grey {
		background: #dddddd!important;
	}
</style>
