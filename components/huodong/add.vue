<template>
	<div class="hezuo huodong">
		<transition name="slide-fade">
			<vue-step v-show="!form.industry" @onClickBack="remindustry" @onClickNext="addindustry" :url="'/Cooperation/new_hangye'"
			 :title="'选择所属行业'"></vue-step>
		</transition>
		<transition name="slide-fade">
			<vue-step v-show="!form.business && form.industry" @onClickBack="rembusiness" @onClickNext="addbusiness" :url="'/activityb/new_act_yewu'"
			 :title="'选择活动类型'"></vue-step>
		</transition>
		<transition name="slide-fade">
			<div v-show="form.business && form.industry">
				<x-header :title="'发布活动'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="remupdata" class="header step"></x-header>
				<div class="biaodin1">
					<!--<div class="ban_title">
						<strong>*</strong>
						<span>请描述活动的主题</span>
					</div>-->
					<!--<div style="margin: 20px 0px;">邀请您参加{{form.theme}}活动</div>-->
					<!--<x-textarea v-model="form.theme" :placeholder="'请填写几句活动的核心亮点，有助于增加报名量'" :max="120" :rows="5"  ></x-textarea>-->
					<div>
						<!--<div style="display: flex;align-items: center;padding: 0 13px;">
							<div class="ban_title bottom" style="margin-right: 10px;">
								<strong>*</strong>
								<span>类型:</span>
							</div>
							<div style="display: flex;align-items: center;">
								<div class="list" v-for="(item,index) in list">
									<div class="list_item">{{item.name}}</div>
									<!--<input type="radio" :value="index+1" :checked='item.isCheck' class="toggle" @change="xz($event,index)" name="type" />-->
						<!--<radio fill-mode fill-label="Other" fill-placeholder="other" :options="radio003" @on-change="change"></radio>
								</div>
							</div>
						</div>-->
						<!--<div>
							<group>
								<!--<radio :options="list" @on-change="change" v-model="form.is_person"></radio>-->
						<!--<cell :title="'发布类型'">
									<span class="user-data-name-cuud">
                	              <checklist :options="list" v-model="form.is_person" :max="1" @on-change="change" ></checklist>
                                 </span>
								</cell>
							</group>
						</div>-->
						<!--<selector ref="defaultValueRef" title="类型" direction="rtl" :options="list" v-model="form.is_person"></selector>-->
						<selector placeholder="" @on-change="onChange" v-model="form.is_person" direction="rtl" :options="list" title="类型:">

						</selector>
						<x-input v-model="form.subject" :max="5" placeholder="如实填写以便审核通过" style="font-size: 15px;">
							<div slot="label" class="ban_title bottom" style="margin-right: 10px;">
								<strong>*</strong>
								<span>{{typename}}简称:</span>
							</div>
						</x-input>

						<div class="input_img" @click="imgShow=true" style="margin-top: 30px;border-top:none ;">
							<img v-show="!form.imgurl" class="biao_back_img" src="/static/img/icon1.png" />
							<img v-if="form.imgurl" class="biao_back_img" :src="$store.state.website.website_domain_name + '/uploads/' + form.imgurl"
							 disabled="" />

							<div class="ban_title">
								<strong>*</strong>
								<span>请上传活动海报</span>
							</div>
						</div>
					</div>

				</div>
				<div class="biaodin7">
					<!--<div class="ban_title">
						<!--<strong>*</strong>-->
					<!--<span>活动赞助</span>
						<span class="fuchu">非必填项目，不填写默认为免费活动</span>
					</div>-->
					<x-input v-model="form.totalmoney" type="number" placeholder="填写0元活动免费" style="border-bottom: 1px solid #D9D9D9;font-size: 15px;">
						<div slot="label" class="ban_title" style="margin-right: 10px;">
							<!--<strong>*</strong>-->
							<span>设置收费标准(元/人):</span>

						</div>
					</x-input>
					<div class="ban_title">
						<span class="fuchu" style="color: #666;">根据实际情况选择费用涵盖</span>
					</div>
					<div class="list_4">
						<span class="main" v-for="(item,index) in moneylist" :key="index" @click="onmoneyarr(item.id)" :class="[form.caver_money.indexOf(item.id)== -1 ? '' : 'on']">{{item.name}}</span>
					</div>
				</div>

				<div class="biaodin3">
					<x-input v-model="form.ztitle" placeholder="请输入自定义标题">
						<div slot="label" class="ban_title">
							<strong>*</strong>
							<span>自定义标题:</span>
						</div>
					</x-input>
					<div class="labelclass2 weui-cell">
						<div slot="label" class="ban_title weui-cell__hd">
							<strong>*</strong>
							<span>活动区域:</span>
						</div>
						<vue-address v-model="form.region" show="true" class="weui-cell__bd weui-cell__primary" placeholder="请输入活动区域"></vue-address>
					</div>
					<x-input v-model="form.specreg" placeholder="请输入具体地址">
						<div slot="label" class="ban_title">
							<strong>*</strong>
							<span>具体地址:</span>
						</div>
					</x-input>
					<div class="ban_title" style="margin-bottom: 10px;margin-left: 0;padding-top: 0.26rem;">
						<strong>*</strong>
						<span>请编辑活动详情</span>
					</div>
					<vue-html5-editor content="" @change="updateData($event)"></vue-html5-editor>

					<div class="hezuo_tishiyuyan" style="margin-top: 10px;">完善的个人信息有助于提升您的真实指数，请认真填写以下内容</div>
					<div class="check">
						<span :class="{'isyangshi':isyangshi == 0}" style="margin-left: 1.8rem;" @click="one()"><i class="anniu"></i>单场活动</span>
						<span :class="{'isyangshi':isyangshi == 1}" style="float: right;margin-right: 1.6rem;" @click="more()"><i class="anniu"></i>多场活动</span>
					</div>
					<!-- 单场活动 -->
					<group gutter="0" v-if="isyangshi == 0">
						<!-- <x-input v-model="form.ztitle" placeholder="请输入自定义标题">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>自定义标题:</span>
              </div>
            </x-input>
            <div class="labelclass2 weui-cell">
              <div slot="label" class="ban_title weui-cell__hd">
                <strong>*</strong>
                <span>活动区域:</span>
              </div>
              <vue-address v-model="form.region" show="true" class="weui-cell__bd weui-cell__primary" placeholder="请输入活动区域"></vue-address>
            </div>
            <x-input v-model="form.specreg" placeholder="请输入具体地址">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>具体地址:</span>
              </div>
            </x-input> -->
						<div class="labelclass2 weui-cell">
							<div slot="label" class="ban_title weui-cell__hd">
								<strong>*</strong>
								<span>报名截止时间:</span>
							</div>
							<datetime v-model="form.endtime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary" placeholder="请选择报名截止时间"></datetime>
						</div>
						<div class="labelclass2 weui-cell">
							<div slot="label" class="ban_title weui-cell__hd">
								<strong>*</strong>
								<span>活动开始时间:</span>
							</div>
							<datetime v-model="form.starttime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary"
							 placeholder="请选择活动开始时间"></datetime>
						</div>
						<div class="labelclass2 weui-cell">
							<div slot="label" class="ban_title weui-cell__hd">
								<strong>*</strong>
								<span>活动结束时间:</span>
							</div>
							<datetime v-model="form.orvertime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary"
							 placeholder="请选择活动结束时间"></datetime>
						</div>
						<x-input v-model="form.phone" type="number" placeholder="请输入联系电话">
							<div slot="label" class="ban_title">
								<strong>*</strong>
								<span>联系电话:</span>
							</div>
						</x-input>
						<x-input v-model="form.vcCode" type="number" placeholder="请输入验证码">
							<div slot="label" class="ban_title">
								<strong>*</strong>
								<span>验证码:</span>
							</div>
							<div slot="right-full-height">
								<vue-code :ipone="form.phone" class="right-full-height"></vue-code>
							</div>
						</x-input>
					</group>
					<!-- 多场活动 -->
					<group gutter="0" v-if="isyangshi == 1">
						<!-- <x-input v-model="form.ztitle" placeholder="请输入自定义标题">
							<div slot="label" class="ban_title">
								<strong>*</strong>
								<span>自定义标题:</span>
							</div>
						</x-input>
						<div class="labelclass2 weui-cell">
							<div slot="label" class="ban_title weui-cell__hd">
								<strong>*</strong>
								<span>活动区域:</span>
							</div>
							<vue-address v-model="form.region" show="true" class="weui-cell__bd weui-cell__primary" placeholder="请输入活动区域"></vue-address>
						</div>
						<x-input v-model="form.specreg" placeholder="请输入具体地址">
							<div slot="label" class="ban_title">
								<strong>*</strong>
								<span>具体地址:</span>
							</div>
						</x-input> -->
						<div class="labelclass2 weui-cell">
							<div slot="label" class="ban_title weui-cell__hd label_changci">
								<strong>*</strong>
								<span>场次设定</span>
								<span class="changci" @click="isChangci=true">设定场次活动</span>
							</div>

							<!-- <datetime v-model="form.starttime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary" placeholder="请选择活动开始时间"></datetime> -->
						</div>
						<!-- 选择多场场次之后点击确定的页面 -->
						<div class="addbefore" v-for="(item,index) in changci_arr" :key="index" v-if="isAddbefore">
							<span>第{{index+1}}场</span>
							<span style="color: #F88509;">{{item.starttime}}</span>
							<!-- <datetime format="YYYY-MM-DD HH:mm" v-model="item.data1"  class="add_data" placeholder="__________________"></datetime> -->
							<span>到</span>
							<span style="color: #F88509;">{{item.orvertime}}</span>
							<!-- <datetime format="YYYY-MM-DD HH:mm" v-model="item.data2"  class="add_data" placeholder="__________________"></datetime> -->
						</div>
						<!-- 	<div class="labelclass2 weui-cell">
          		<div slot="label" class="ban_title weui-cell__hd">
          			<strong>*</strong>
          			<span>活动结束时间:</span>
          		</div>
          		<datetime v-model="form.orvertime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary" placeholder="请选择活动结束时间"></datetime>
          	</div> -->
						<div class="labelclass2 weui-cell">
							<div slot="label" class="ban_title weui-cell__hd">
								<strong>*</strong>
								<span>报名截止时间:</span>
							</div>
							<datetime v-model="form.endtime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary" placeholder="请选择报名截止时间"></datetime>
						</div>
						<x-input v-model="form.phone" type="number" placeholder="请输入联系电话">
							<div slot="label" class="ban_title">
								<strong>*</strong>
								<span>联系电话:</span>
							</div>
						</x-input>
						<x-input v-model="form.vcCode" type="number" placeholder="请输入验证码">
							<div slot="label" class="ban_title">
								<strong>*</strong>
								<span>验证码:</span>
							</div>
							<div slot="right-full-height">
								<vue-code :ipone="form.phone" class="right-full-height"></vue-code>
							</div>
						</x-input>
					</group>

				</div>
				<div class="biaodin4">
					<span class="login_remember">
						<check-icon :value.sync="form.protocol">同意</check-icon>
						<vue-xieyi :type="3" :title="'智汇优库发布协议'" class="alert"><span style="color:#09CED6;">《智汇优库发布协议》</span></vue-xieyi>
					</span>
					<div class="button_max " @click="upform" v-if="colorShow==false">发布</div>
					<div class="button_max grey" v-if="colorShow==true">发布</div>
				</div>
				<!-- 添加场次的div -->
				<div class="addchangci" v-if="isChangci" @click="isChangci=false">
					<div class="nav_add" @click.stop>
						<p>添加场/次</p>
						<div v-for="(item,index) in changci_arr" :key="index" class="changciDiv">
							<!-- <span @click="changciDelClick(index)" >{{item.id}}</span> -->
							<span>第{{index+1}}场</span>
							<datetime format="YYYY-MM-DD HH:mm" v-model="item.starttime" class="add_data" placeholder="__________________"></datetime>
							<span>到</span>
							<datetime format="YYYY-MM-DD HH:mm" v-model="item.orvertime" class="add_data" placeholder="__________________"></datetime>
							<!-- <box gap="10px 10px"><icon type="cancel"></icon></box> -->
							<span class="add_icon" @click="changciDelClick(index)"></span>
						</div>

						<i @click="addChangci()"></i>
						<span @click="changciClick()">确定</span>
					</div>
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
									<!--<span  class="userupicon_cal" v-show="imgindex==0" @click="deletePic2(imgindex)">
								        <x-icon type="ios-close" size="26"></x-icon>
								    </span>-->
									<span class="userupicon_cal" v-if="imglist.length>=3&&index==0" @click="deletePic2(imgindex)">
										<x-icon type="ios-close" size="26"></x-icon>
									</span>
								</swiper-item>



							</swiper>


							<!--<div class="yes" @click="onclickbanner" v-show="">确认使用</div>-->
							<div class="yes" v-if=" imgindex ==0 &&imglist.length<3">自主上传图片</div>
							<div class="yes" v-else="" @click="onclickbanner">确认使用</div>
							<div style="width:100%" class="dong_tu"><img src="/static/img/zuoyou.gif" style="height:1rem;width:40%" class="imgLocation"></div>
							<!--<div class="yes" @click="onclickbanner" v-show="(imglist.length-1) >= imgindex">确认使用</div>
							<div class="yes" v-show="(imglist.length-1) < imgindex">自主上传图片</div>-->
						</div>
						<!--<div class="bottom_imglist">
							<swiper :aspect-ratio="9/16" :show-dots="false" :show-desc-mask="false" v-model="imgindex">
								<swiper-item class="swiper-demo-img" v-for="(item, index) in imglist" :key="index">
									<div class="imgbox">
										<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl">
									</div>
								</swiper-item>
								<swiper-item class="swiper-demo-img">
									<div class="imgbox" style="background: #fff;">
										<vue-cropper :autoCropWidth="375" :enlarge="3" :autoCropHeight="211" @data="fileimg">
											<img class="biao_back_img" src="/static/img/icon1.png" />
										</vue-cropper>
									</div>
								</swiper-item>
							</swiper>
						</div>-->
					</x-dialog>
				</div>
			</div>
		</transition>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>

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
		Cell,
		Checklist,
		Selector,
		Box,
		Icon
	} from 'vux'
	import {
		VueStep,
		VueCropper,
		VueFileZip,
		VueCode,
		VueAddress,
		VueXieyi,
		VueShareit
	} from '../component'
	export default {
		directives: {
			TransferDom,
			Box,
			Icon
		},
		data() {
			return {
				imgindex: 0,
				imglist: [],
				form: {
					industry: null, //行业
					business: null, //业务类型
					theme: '活动主题', //活动主题
					imgurl: null, //图片地址
					totalmoney: null, //活动赞助
					caver_money: [], //费用明细
					remarks: null, //活动详情
					subject: null, //个人/单位名称
					is_person: '1', //个人/单位类型
					region: null, //地区
					specreg: null, //具体地址
					endtime: null, //报名截止日期
					starttime: null, //活动开始时间
					orvertime: null, //活动结束时间
					phone: null, //手机号
					protocol: true, //协议
					vcCode: null, //验证码
					ztitle: null,
					is_many: 0, //向后台声明是多场次还是单场次，0代表单场次，1代表多场次
				},
				imgShow: false,
				moneylist: null,
				colorShow: true,
				addect: true,
				typename: '单位',
				open: true,
				list: [{
					key: '1',
					value: '单位'
				}, {
					key: '2',
					value: '个人'
				}],
				defaultValue: 1,
				isyangshi: 0, //判断是否加上对号样式
				isChangci: false, //控制添加场次的div
				changci_arr: [{
					id: '第一场/次',
					starttime: '',
					orvertime: ''
				}, ],
				isAddbefore: false, //判断选择完多场场次后场次设定显示的内容
				istiem: '',
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
			VueShareit,
			Cell,
			Checklist,
			Selector

		},
		mounted() {
			var _this = this;
			_this.$http.post(_this.$store.state.url + '/activityb/new_caver_money', {
				load: true,
			}).then(function(res) {
				if (!res) return;
				_this.moneylist = res;
			})


			var imgText = `<img src="/static/img/zuoyou.gif?+${Math.random()}" />`
			$(".imgLocation").append(imgText);


		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您参与活动，关注/分享秒得奖励！',
					imgUrl: '/static/img/hd.jpg',
					link: '/huodong/index'
				}
			}
		},
		watch: {
			// 'changci_arr': {

			//   handler () {
			//     var _this = this;
			//     for (let i = 0; i < this.changci_arr.length; i++) {
			//       console.log(111)
			//       let time = Date.parse(new Date()); //当前时间的时间戳
			//       let endTime = Date.parse(_this.changci_arr[i].data2); //结束时间的时间戳
			//       let starttime = Date.parse(_this.changci_arr[i].data1); //开始时间的时间戳
			//       if (endTime < starttime) {
			//         msg("第一场/次结束时间不能小于开始时间");
			//         _this.changci_arr[i].data1 = ''
			//         _this.changci_arr[i].data2 = ''
			//         _this.isAddbefore = false
			//       } else if(endTime < time) {
			//         msg("第一场/次结束时间不能小于当前时间");
			//         _this.changci_arr[i].data1 = ''
			//         _this.changci_arr[i].data2 = ''
			//         _this.isAddbefore = false
			//       }
			//     }
			//   },
			//   deep: true,//深度监听
			//   immediate: false
			// },

			form: {
				handler() {
					var _this = this;
					if (_this.form.theme && _this.form.imgurl && _this.form.subject && _this.form.region && _this.form.specreg &&
						_this.form.phone && _this.form.vcCode && _this.form.ztitle) {
						_this.colorShow = false;
					} else {
						_this.colorShow = true;
					};
				},
				deep: true,
			},

		},
		methods: {
			//判断多场次选择时间
			addChangci() {
				this.istiem = this.changci_arr[0].starttime
				if (this.changci_arr.length == 1) {
					if (this.changci_arr[0].starttime && this.changci_arr[0].orvertime) {
						this.changci_arr.push({
							'id': '第二场/次',
							'starttime': '',
							'orvertime': ''
						})
					} else {
						msg('请先选择第一场/次时间')
					}
				} else if (this.changci_arr.length == 2) {
					if (this.changci_arr[1].starttime && this.changci_arr[1].orvertime) {
						this.changci_arr.push({
							'id': '第三场/次',
							'starttime': '',
							'orvertime': ''
						})
					} else {
						msg('请先选择第二场/次时间')
					}
				} else if (this.changci_arr.length == 3) {
					if (this.changci_arr[2].starttime && this.changci_arr[2].orvertime) {
						this.changci_arr.push({
							'id': '第四场/次',
							'starttime': '',
							'orvertime': ''
						})
					} else {
						msg('请先选择第三场/次时间')
					}
				} else if (this.changci_arr.length == 4) {
					if (this.changci_arr[3].starttime && this.changci_arr[3].orvertime) {
						this.changci_arr.push({
							'id': '第五场/次',
							'starttime': '',
							'orvertime': ''
						})
					} else {
						msg('请先选择第四场/次时间')
					}
				}
			},
			changciClick() {

				for (let i = 0; i < this.changci_arr.length; i++) {
					if (i == 0) {
						let end = Date.parse(this.changci_arr[i].orvertime)
						let sta = Date.parse(this.changci_arr[i].starttime)
						if (end < sta) {
							msg('结束时间不得小于开始时间')
							return
						}
					} else {
						let f_start = Date.parse(this.changci_arr[i].starttime)
						let s_start = Date.parse(this.changci_arr[i - 1].starttime)
						console.log('end,sta')
						console.log(this.changci_arr[i])
						console.log(f_start, s_start)
						let end_time = Date.parse(this.changci_arr[i].orvertime)
						let str_time = Date.parse(this.changci_arr[i].starttime)
						if (end_time < str_time) {
							msg('结束时间不得小于开始时间')
							return
						}
						if (f_start < s_start) {
							msg('开始时间不得小于上一场开始时间')
							return
						}
					}
				}

				let changci_arr_length = this.changci_arr.length; // 数组的个数
				// 判断多场次活动的最后一个元素 开始时间和结束时间是否为空
				if ((!this.changci_arr[changci_arr_length - 1].starttime) && (!this.changci_arr[changci_arr_length - 1].orvertime)) {
					this.changci_arr.pop() // 删除最后一个数组元素
				}

				this.isChangci = false;
				if (this.changci_arr[0].starttime && this.changci_arr[0].orvertime) {
					this.isAddbefore = true
				}
				this.$set(this.form, 'next_num', this.changci_arr)
			},
			//点击单场活动事件
			one() {
				this.isyangshi = 0;
				this.form.is_many = 0
			},
			//点击多场活动事件
			more() {
				this.isyangshi = 1;
				this.form.is_many = 1
			},
			onIndexChange(index) {
				//				console.log(index,33)
				//				console.log(this.imgindex,55)
				this.imgindex = index
				console.log(this.imgindex)
			},
			deletePic2(index) {
				console.log(index)
				this.imglist.splice(index, 1)
				this.open = true

			},
			change() {

			},
			//为了改变list里面的isCheck
			//			xz(e, i) {
			//				var _this = this;
			//				_this.list[i].isCheck = e.target.checked;
			//				console.log(i)
			//				if(i == 0) {
			//					_this.typename = "单位";
			//				} else {
			//					_this.typename = "个人";
			//				}
			//
			//			},
			onChange(val) {
				let _this = this;
				if (val == 1) {
					_this.typename = "单位";
				} else {
					_this.typename = "个人";
				}

				_this.form.is_person = val;
			},
			addindustry(res) {
				this.form.industry = res.id
			},
			ontype(e) {

			},
			remindustry() {
				this.$router.back(-1)
			},
			addbusiness(res) {
				//				console.log(res.name)
				//				this.form.theme=res.name
				this.form.business = res.id;
				if (!res.id) {
					msg("请选择适合的类型");
					return;
				} else {
					var _this = this;
					_this.$http.post(_this.$store.state.url + '/Common/yewu_img', {
						load: false,
						id: res.id,
					}).then((res) => {
						if (!res) return;
						_this.imglist = res.imgurl;
						console.log(_this.imglist)
					})
				}
			},
			rembusiness() {
				this.form.industry = null;

			},
			remupdata() {
				// 获取url
				this.urls = new URL(window.location.href)
				// 判断是否有uidkey 有的话是分享进来的 跳转指定页面
				if (this.urls.searchParams.get("uidkey")) {
					this.$router.push('/fabu/index')
				} else {
					// 是否有锚点 没有锚点返回历史页
					this.form.business = null;
					this.imglist = [];
					this.form.imgurl = null;
				}
			},
			fileimg(res) {
				this.imglist.unshift({
					imgurl: res.imgurl
				});
				//				console.log(this.imglist.length,2)
				this.open = false
				//				this.imglist.push({
				//					imgurl: res.imgurl
				//				});
			},
			onclickbanner() {
				this.imgShow = false;
				if (this.imglist.length >= 3) {
					this.form.imgurl = this.imglist[this.imgindex].imgurl;
				} else {
					this.form.imgurl = this.imglist[this.imgindex - 1].imgurl;
				}
			},

			upform() {
				console.log('11111')
				var _this = this;

				//              if(isWeiXin() == 1 && !_this.user.mem_phone) {
				//                  _this.$store.state.bingPhone = true;
				//                  return;
				//              }
				//验证
				let obj = {
					remarks: '发布需求', //需求说明
					imgurl: '封面图片', //图片地址
					subject: '个人/单位名称', //个人/单位名称
					region: '发布地区', //地区
					specreg: '活动具体地址', //具体地址
					starttime: '活动开始时间', //活动开始时间
					orvertime: '活动结束时间', //活动结束时间
					endtime: '报名截止时间', //截止日期
					phone: '手机号', //手机号
					vcCode: '验证码', //验证码
					ztitle: '自定义标题',
				}
				_this.$http.post(_this.$store.state.url + '/activityb/new_act_release', {
					'load': false,
					..._this.form,
					protocol: _this.form.protocol ? 1 : 2,
				}).then((res) => {
					if (!res) return;
					this.$router.replace('addok/' + res.id);
					// _this.colorShow = false
				})
				// setTimeout(function() {
				//   _this.colorShow = true
				// }, 3000);
			},
			imgjiajian(bool) {
				console.log(bool)
				console.log(this.imgindex)
				if (bool) {
					this.imgindex = (this.imglist.length - 1) == this.imgindex ? 2 : --this.imgindex
					//					this.imgindex = (this.imglist.length - 1) == this.imgindex ? 0 : ++this.imgindex
					//					console.log(this.imgindex,33)
				} else {
					this.imgindex = this.imgindex == 2 ? (this.imglist.length - 1) : ++this.imgindex
					//					this.imgindex = this.imgindex == 0 ? (this.imglist.length - 1) : --this.imgindex
					//					console.log(this.imgindex,44)
				}
			},
			onmoneyarr(index) {
				var i = this.form.caver_money.indexOf(index)
				if (i == -1) {
					this.form.caver_money.push(index);
				} else {
					this.form.caver_money.splice(i, 1)
				}
			},
			updateData(e) {
				this.form.remarks = e;
			},
			// 删除多场次点击事件
			changciDelClick(index) {

				if (this.changci_arr.length != 1) {
					this.changci_arr.splice(index, 1)
				}

			}
		}
	}
</script>

<style scoped>
	/* 添加场次样式 */
	.addchangci {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: #666;
		/* opacity: 0.5; */
		z-index: 1111;
		background: rgba(0, 0, 0, 0.6);
	}

	.nav_add {
		width: 90%;
		height: 300px;
		background: #fff;
		border-radius: 10px;
		position: relative;
		top: 28%;
		left: 5%;
	}

	.nav_add>p {
		text-align: center;
		font-size: 20px;
		padding: 20px 0 20px 0;
	}

	.nav_add>div {
		width: 94%;
		margin: 0 auto;
		font-size: 14px;
		color: #999;
		height: 0.75rem;
		line-height: 0.75rem;
	}

	.addbefore {
		/* width: 94%; */
		margin: 0 auto;
		font-size: 14px;
		color: #999;
		height: 0.75rem;
		line-height: 0.75rem;
	}

	.nav_add>span {
		display: inline-block;
		text-align: center;
		width: 70px;
		height: 0.65rem;
		line-height: 0.65rem;
		position: relative;
		left: 41%;
		color: #F88509;
		border: 1px solid #F88509;
		border-radius: 15px;
		font-size: 16px;
	}

	.nav_add>i {
		display: block;
		text-align: center;
		background: url(../../../static/img/quan.png) no-repeat 0;
		width: 30px;
		height: 30px;
		background-size: 20px 20px !important;
		position: relative;
		left: 48%;
	}

	.add_data {
		display: inline-block;
		width: 2;
		font-size: 12px;
		padding: 0;
	}

	.weui-cell_access .weui-cell__ft:after {
		display: none !important;
		border: none !important;
	}

	.weui-cell:before {
		border: none !important;
	}

	#vux-datetime-adnmx {
		border: none !important;
	}

	.vux-cell-value {
		width: 50px !important;
	}

	.weui-cell__ft {
		text-align: left !important;
		width: 126px !important;
	}

	.vux-cell-primary {
		text-align: left !important;
		width: 126px !important;
	}

	.vux-datetime-value {
		text-align: left !important;
		width: 126px !important;
	}

	/* 多人场次样式 */
	.changci {
		display: inline-block;
		float: right;
		width: 100px;
		background: url(../../../static/img/game/mineRight.png) no-repeat 0 !important;
		background-size: 10px !important;
		background-position-x: 2.4rem !important;
		position: absolute;
		right: 0;
		/* top: 8px; */
		color: #999;
	}

	.isyangshi {
		background: url(../../../static/img/heiseduihao.png) no-repeat 0 !important;
	}

	.check {
		width: 100%;
		height: 0.7rem;
		line-height: 0.7rem;
		font-size: 0.4rem;
	}

	.anniu {
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		border: 1px solid #7C7C7C;
		position: relative;
		top: 3px;
		margin-right: 10px;
	}

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
	.hezuo .biaodin3,
	.hezuo .biaodin7 {
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
		font-size: 0.4rem;
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
		margin-left: -15px;
		margin-right: 10px;
	}

	.biaodin3 .hezuo_tishiyuyan {
		font-size: 15px;
		color: #999;
	}

	.biaodin4 .button_max {
		background: linear-gradient(to right, #03E1EC, #06E7C7);
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

	.imgbox_img {
		margin-top: 1.6rem
	}

	.biaodin5 .bottom_imglist .swiper-demo-img .imgbox img {
		width: 100%;
		height: 100%;
	}

	.hezuo .biaodin7 {
		padding-right: 20px;
	}

	.biaodin7 .ban_title .fuchu {
		font-size: 12px;
		font-weight: 300;
		color: #999;
	}

	.biaodin7 .list_4 {
		font-size: 12px;
		color: #666;
		position: relative;
		width: 105%;
		left: -17px;
	}

	.biaodin7 .list_4 .main {
		display: inline-block;
		border-radius: 2px;
		border: 1px solid #ccc;
		width: 65px;
		margin-left: 17px;
		margin-top: 10px;
		text-align: center;
		padding: 4px 0px;
	}

	.biaodin7 .list_4 .main.on {
		background: #09CED6;
		border-color: #09CED6;
		color: #fff;
	}

	.biaodin7 .vux-x-input {
		padding-left: 0;
	}

	.biaodin7 .vux-x-input::before {
		bottom: 0;
		top: auto;
	}

	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #999 !important;
	}

	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #999 !important;
	}

	input:-ms-input-placeholder,
	textarea:-ms-input-placeholder {
		color: #999 !important;
	}

	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		color: #999 !important;
	}

	.grey {
		background: #dddddd !important;
	}

	.bottom:after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 0.026667rem;
		border-top: 0.026667rem solid #D9D9D9;
		color: #D9D9D9;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		left: 0.4rem;
	}

	.vux-datetime div:nth-child(1) p:before {
		content: none;
	}

	.list {
		display: flex;
		align-items: center;
		background: #FFFFFF;
		padding: 10px 20px;
		margin-bottom: 1px;
		position: relative;
		font-size: 14px;
	}

	.list-item {
		font-size: 14px;
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
		position: relative;
		top: 3px;
	}

	.toggle::after {
		content: url('/static/img/nocheck.png');
	}

	.toggle:checked::after {
		content: url('/static/img/check.png');
	}

	.weui-cells__title+.weui-cells {
		display: flex !important;
	}

	.changetype {
		display: flex;
	}

	.user-data-name-cuud {
		float: right;
	}

	.user-data-name-cuud .weui-cell {
		padding: 0;
		border: none;
		display: inline-block;
	}

	.user-data-name-cuud .weui-cell+.weui-cell {
		margin-left: 10px;
	}

	.user-data-name-cuud .weui-cell .weui-cell__hd {
		display: inline-block;
		padding-right: 0;
	}

	.user-data-name-cuud .weui-cell__bd {
		display: inline-block;
	}

	.user-data-name-cuud .weui-cells_checkbox .weui-icon-checked:before {
		margin: 0;
	}

	.user-data-name-cuud .weui-cells:before,
	.user-data-name-cuud .weui-cells:after,
	.user-data-name-cuud .weui-cell:before {
		display: none;
	}

	.user-data-name-cuud .weui-cells_checkbox .vux-checklist-icon-checked:before,
	.user-data-name-cuud .weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before {
		font-size: 15px;
		color: #35495e;
	}

	#vux-selector-mdmzk option {
		text-align: right;
	}

	.userupicon_cal {
		position: absolute;
		top: 0;
		right: 0;
		fill: #d52121;
	}

	.dong_tu {
		display: flex;
		justify-content: center;
	}

	.changciDiv {
		position: relative;
	}

	.add_icon {
		background: url(../../../static/img/close.png) no-repeat;
		display: inline-block;
		width: 0.326667rem;
		height: 0.326667rem;
		vertical-align: middle;
		background-position: -2px -2px;
	}

	.label_changci {
		width: 100%;
	}
</style>
