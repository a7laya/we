<template>
	<div class="hezuo">
		<transition name="slide-fade">
			<vue-step v-show="!form.industry" @onClickBack="remindustry" @onClickNext="addindustry" :url="'/Cooperation/new_hangye'"
			 :title="'选择所属行业'"></vue-step>
		</transition>
		<transition name="slide-fade">
			<vue-step v-show="!form.business && form.industry" @onClickBack="rembusiness" @onClickNext="addbusiness" :url="'/Cooperation/new_yewu'"
			 :title="'选择众包类型'"></vue-step>
		</transition>
		<transition name="slide-fade">
			<div v-show="form.business && form.industry">
				<x-header :title="'发布众包'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="remupdata" class="header step"></x-header>
				<div class="biaodin1">
					<div class="ban_title">
						<strong>*</strong>
						<span>请在此输入详细的众包需求：</span>
					</div>
					<x-textarea class="hezuo_tishiyuyan" style="font-size: 0.4rem;" v-model="form.remarks" :placeholder="'请输入你要发布的众包对接内容，发布真实信息有助于快速达成众包。'" :max="10000" :rows="5"></x-textarea>
					<div class="input_img" @click="fabu">
						<img v-show="!form.imgurl" class="biao_back_img" src="/static/img/icon1.png" />
						<img v-if="form.imgurl" class="biao_back_img" :src="$store.state.website.website_domain_name + '/uploads/' + form.imgurl" />
						<div class="ban_title">
							<strong>*</strong>
							<span>请上传与众包需求相关的图片</span>
						</div>
					</div>
				</div>
				<div class="biaodin2">
					<div class="ban_title">
						<span>附件</span>
						<span class="min">文件格式可以为WORD/PDF等文档,大小不超过2M</span>
					</div>
					<div class="thsis_maes" v-for="(item,index) in form.wordurl" :key="index">
						<div style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0,0,0,0.5);" @click="removeword(index)">
							<x-icon type="ios-close" size="30" class="iconcl"></x-icon>
						</div>
						<img class="biao_back_img isfilezip" src="/static/img/icon4.png" />
					</div>
					<div class="thsis_maes">
						<vue-file-zip class="isfilezip" @data="fileword">
							<img class="biao_back_img" src="/static/img/icon2.png" />
						</vue-file-zip>
					</div>

				</div>
				<div class="biaodin3">
					<div class="hezuo_tishiyuyan">完善的个人信息有助于提升您的真实指数，请认真填写以下内容</div>
					<group gutter="0">

						<!-- 自定义标题 开始 -->
						<div class="fontSizes">
							<x-input v-model="form.ztitle" placeholder="请输入自定义标题">
								<div slot="label" class="ban_title">
									<strong>*</strong>
									<span>自定义标题：</span>
								</div>
							</x-input>
						</div>
						<!-- 自定义标题 结束 -->

						<!-- 类型 开始 -->
						<div class="fontSizes">
							<selector title="发布人类型:" placeholder="" @on-change="onChange" v-model="form.is_person" direction="rtl" :options="list"
							 class="xing">
							</selector>
						</div>
						<!-- 类型 结束 -->

						<!-- 单位简称 开始 -->
						<div class="fontSizes">
							<x-input v-model="form.subject" :max="5" placeholder="如实填写以便审核通过">
								<div slot="label" class="ban_title">
									<strong>*</strong>
									<span>{{typename}}简称：</span>
								</div>
							</x-input>
						</div>
						<!-- 单位简称 结束 -->

						<!-- 合作区域 开始 -->
						<div class="labelclass2 weui-cell fontSizes">
							<div slot="label" class="ban_title weui-cell__hd">
								<strong>*</strong>
								<span>机会所在区域：</span>
							</div>
							<vue-address v-model="form.region" show="true" class="weui-cell__bd weui-cell__primary"></vue-address>
						</div>
						<!-- 合作区域 结束 -->

						<!-- 合作预算 开始 -->
						<div class="fontSizes">
							<x-input v-model="form.budget" type="number" :show-clear="false">
								<div slot="label" class="ban_title">
									<strong>*</strong>
									<span>众包预算:</span>
									<span style="position: absolute;right: 7px;top:9px;">元</span>
								</div>
							</x-input>
						</div>
						<!-- 合作预算 结束 -->

						<div class="labelclass2 weui-cell fontSizes">
							<div slot="label" class="ban_title weui-cell__hd">
								<strong>*</strong>
								<span>招募截止时间：</span>
							</div>
							<datetime v-model="form.endtime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary"></datetime>
						</div>

						<!-- 联系电话 开始 -->
						<div class="fontSizes">
							<x-input v-model="form.phone" type="number">
								<div slot="label" class="ban_title">
									<strong>*</strong>
									<span>联系电话：</span>
								</div>
							</x-input>
						</div>
						<!-- 联系电话 结束 -->

						<!-- 验证码 开始 -->
						<div style="font-size: 0.4rem;">
							<x-input v-model="form.vcCode" :max="6">
								<div slot="label" class="ban_title">
									<strong>*</strong>
									<span>验证码：</span>
								</div>
								<div slot="right-full-height">
									<vue-code :ipone="form.phone" class="right-full-height"></vue-code>
								</div>
							</x-input>
						</div>
						<!-- 验证码 结束 -->
					</group>
				</div>
				<div class="biaodin4">
					<span class="login_remember">
						<check-icon :value.sync="form.protocol">同意</check-icon>
						<vue-xieyi :type="3" :title="'智汇优库发布协议'" class="alert"><span style="color:#3790f5;">《智汇优库发布协议》</span></vue-xieyi>
					</span>

					<div class="button_max " @click="upform" v-if="colorShow==false">发布</div>
					<div class="button_max grey" v-if="colorShow==true">发布</div>
				</div>
				<div class="biaodin5" v-transfer-dom>
					<x-dialog v-if="imgShow" class="b5_list_img_box" v-model="imgShow" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '0%'}">
						<div class="cen_imglist">
							<div class="title">选择形象图</div>
							<!--<div class="up" @click="imgjiajian(true)">
								<x-icon type="ios-arrow-right" size="30"></x-icon>
							</div>
							<div class="next" @click="imgjiajian(false)">
								<x-icon type="ios-arrow-left" size="30"></x-icon>
							</div>-->
							<swiper :aspect-ratio="9/16" :show-dots="false" :show-desc-mask="false" v-model="imgindex" @on-index-change="onIndexChange">
								<swiper-item class="swiper-demo-img" v-if="open">
									<div class="imgbox imgbox_img" style="background: #fff;">
										<vue-cropper :autoCropWidth="375" :enlarge="3" :autoCropHeight="211" @data="fileimg">
											<img class="biao_back_img" src="/static/img/icon1.png" />
										</vue-cropper>
									</div>
								</swiper-item>

								<swiper-item class="swiper-demo-img" v-for="(item, index) in imglist" :key="index">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" style="position: relative;">
									<span class="userupicon_cal" v-if="imglist.length>=3&&index==0" @click="deletePic2(imgindex)">
										<x-icon type="ios-close" size="26"></x-icon>
									</span>
								</swiper-item>
							</swiper>
							<div class="yes" v-if=" imgindex ==0 &&imglist.length<3">自主上传图片</div>
							<div class="yes" v-else="" @click="onclickbanner">确认使用</div>
							<div style="width:100%" class="dong_tu imgLocation"><img :src='imgs' style="height:1rem;width:40%"></div>
						</div>
					</x-dialog>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {
		XHeader,
		XTextarea,
		Group,
		XInput,
		Datetime,
		CheckIcon,
		XDialog,
		TransferDom,
		Swiper,
		SwiperItem,
		Selector
	} from 'vux'
	import {
		VueStep,
		VueCropper,
		VueFileZip,
		VueCode,
		VueAddress,
		VueXieyi
	} from '../component'

	export default {
		directives: {
			TransferDom
		},
		data() {
			return {
				imgindex: 0,
				imglist: [],
				form: {
					industry: null, //行业
					business: null, //业务类型
					remarks: null, //需求说明
					imgurl: null, //图片地址
					wordurl: [], //文档地址
					subject: null, //个人/单位名称
					region: null, //地区
					budget: null, //预算
					endtime: null, //截止日期
					phone: null, //手机号
					protocol: true, //协议
					vcCode: null, //验证码，
					ztitle: null,
					is_person: '1', //个人/单位类型
				},
				imgShow: false,
				colorShow: true,
				open: true,
				list: [{
					key: '2',
					value: '单位'
				}, {
					key: '1',
					value: '个人'
				}],
				defaultValue: 1,
				typename: '单位',
				//				imgs:require('../../../static/img/zuoyou.gif') + '?' + Math.random()
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
			SwiperItem,
			Selector
		},
		watch: {
			form: {
				handler() {
					var _this = this;
					if (_this.form.business && _this.form.imgurl && _this.form.subject && _this.form.region && _this.form.budget &&
						_this.form.endtime && _this.form.phone && _this.form.vcCode && _this.form.ztitle) {
						_this.colorShow = false;
					} else {
						_this.colorShow = true;
					}

				},
				deep: true

			}
		},
		mounted() {
			const timer = setInterval(() => {
				this.imgs = require('../../../static/img/zuoyou.gif') + '?' + new Date().getTime()
			}, 1);

			//			 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
			this.$once('hook:beforeDestroy', () => {
				clearInterval(timer);
			})

		},

		methods: {
			onIndexChange(index) {
				this.imgindex = index
				//				console.log(this.imgindex)
			},
			// 删除
			deletePic2(index) {
				console.log(index)
				this.imglist.splice(index, 1)
				this.open = true

			},
			onChange(val) {
				let _this = this;
				if (val == 2) {
					_this.typename = "单位";
				} else {
					_this.typename = "个人";
				}

				_this.form.is_person = val;
			},

			addindustry(res) {
				this.form.industry = res.id
			},
			remindustry() {
				this.$router.back(-1)
			},
			addbusiness(res) {
				console.log(res)
				if (!res.id) {
					msg("请选择适合的类型");
					return;
				} else {

					this.form.business = res.id;
					var _this = this;
					_this.$http.post(_this.$store.state.url + '/Common/yewu_img', {
						load: false,
						id: res.id,
					}).then((res) => {
						if (!res) return;
						_this.imglist = res.imgurl;
					})

				}
			},
			fabu() {
				this.imgShow = true

			},
			rembusiness() {
				this.form.industry = null;
			},
			remupdata() {
				this.urls = new URL(window.location.href)
				// 判断是否有uidkey 有的话是分享进来的 跳转指定页面
				if (this.urls.searchParams.get("uidkey")) {
					this.$router.push('/index')
				} else {
					this.form.business = null;
					this.imglist = [];
					this.form.imgurl = null;
				}
			},
			fileimg(res) {
				//				this.imglist.push({
				//					imgurl: res.imgurl
				//				});
				this.imglist.unshift({
					imgurl: res.imgurl
				});
				this.open = false
				//				this.imgindex = this.imglist.length - 1;
				//				console.log(this.imgindex);
			},
			fileword(res) {
				this.form.wordurl.push(res.wordurl)
			},
			removeword(index) {
				this.form.wordurl.splice(index, 1);
			},
			onclickbanner() {
				// console.log(this.imgindex)
				// console.log(this.imglist[this.imgindex].imgurl)
				this.imgShow = false;
				if (this.imglist.length >= 3) {
					this.form.imgurl = this.imglist[this.imgindex].imgurl;
				} else {
					this.form.imgurl = this.imglist[this.imgindex - 1].imgurl;
				}

			},
			upform() {
				var _this = this;
				//              if(isWeiXin()==1 && !_this.user.mem_phone){
				//              	_this.$store.state.bingPhone = true;
				//              	return;
				//              }
				//验证
				let obj = {
					remarks: '发布需求', //需求说明
					imgurl: '封面图片', //图片地址
					subject: '个人/单位名称', //个人/单位名称
					region: '发布地区', //地区
					budget: '预算', //预算
					endtime: '发布截止时间', //截止日期
					phone: '手机号', //手机号
					vcCode: '验证码', //验证码
					ztitle: '自定义标题'
				}

				if (!isNull(obj, _this.form)) return;
				if (_this.form.budget >= 100000000) {
					msg("小于10亿");
					return;
				}
				if (!/^\d+$/.test(_this.form.budget)) {
					msg("请输入整数");
					return;
				}
				_this.$http.post(_this.$store.state.url + '/Cooperation/release_coop', {
					'load': false,
					..._this.form,
					protocol: _this.form.protocol ? 1 : 2,
				}).then((res) => {
					if (!res) return;
					this.$router.replace('addok/' + res.id);
				})
			},
			imgjiajian(bool) {
				if (bool) {
					this.imgindex = (this.imglist.length - 1) == this.imgindex ? 0 : ++this.imgindex
				} else {
					this.imgindex = this.imgindex == 0 ? (this.imglist.length - 1) : --this.imgindex
				}
			},

		}
	}
</script>

<style scoped>
	/* yinger */

	.weui-input {
		font-size: 16px
	}

	.weui-cell__primary {
		font-size: 15px
	}

	/* yinger */

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
		background: #dddddd !important;
	}

	.dong_tu {
		display: flex;
		justify-content: center;
	}

	.userupicon_cal {
		position: absolute;
		top: 0;
		right: 0;
		fill: #d52121;
	}

	.imgbox_img {
		margin-top: 1.6rem
	}

	.vux-datetime div:nth-child(1) p:before,
	.weui-cell_select .weui-cell__bd:after {
		content: none !important;
	}

	.weui-cells {
		font-size: 0.1rem !important;
	}

	.fontSizes {
		font-size: 0.4rem;
		border-bottom: 1px solid #F2F2F2;
	}
	.weui-cell:before {
		border-top: 0!important;
	}
	
</style>
