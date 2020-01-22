<template>
	<div class="hezuo_add" style="padding-bottom: 20px;">
		<x-header :title="'编辑修改'" :left-options="{backText:''}"></x-header>
		<group class="fontsize">
			<x-input :placeholder="'标题,用一句话描述您的直播'" :type="'text'" v-model="form.title">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>标题:</span>
				</div>
			</x-input>
			<x-textarea :max="500" :placeholder="'循环滚动字幕'" v-model="form.explain">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>字幕:</span>
				</div>
			</x-textarea>
			<div class="input_img">
				<vue-cropper :autoCropWidth="375" :autoCropHeight="211" @data="imgfile">
					<div style="text-align: center;" v-if="!form.imgurl">
						<i class="iconfont icon-tsh-copy"></i>
						<div class="txt"><strong style="color: red;"> *</strong>上传图片</div>
					</div>
					<img class="showimg" :src="$store.state.website.website_domain_name + '/uploads/' + form.imgurl" v-else/>
				</vue-cropper>
			</div>
			<vue-address ref="address" :title="'所在地区'" v-model="form.region" :placeholder="'请选择区域'" class="xing"></vue-address>
			<vue-industry ref="industry" :title="'所属行业'" v-model="form.industry" :placeholder="'请选择行业'" class="xing"></vue-industry>
			<vue-main-body ref="mainbody" :title="'所属主体'" v-model="form.subject" :placeholder="'请选择主体'" class="xing"></vue-main-body>
			<datetime ref="starttime" :title="'开始时间'" v-model="form.starttime" :placeholder="'请选择直播开始时间'" format="YYYY-MM-DD HH:mm" class="xing"></datetime>
			<datetime ref="datetime" :title="'结束时间'" v-model="form.endtime" :placeholder="'请选择直播结束时间'" format="YYYY-MM-DD HH:mm" class="xing"></datetime>
			<!--<cell :title="'电话'" class="phone">
				<x-input :placeholder="user.mem_phone" v-model="form.phone" :type="'number'" :show-clear="false" class="tel"></x-input>
			</cell>-->
			<div class="text_right">
				<divider>直播详情内容</divider>
				<div class="cl" v-for="(item,index) in num_list" v-if="index==0">
					<!--<x-input :placeholder="'请输入菜单名称'" :type="'text'" v-model="item.name"  ></x-input>-->
					<div class="fl" style="position: relative;z-index: 1;width:100%;overflow-x: auto;">
						<vue-html5-editor :content="item.num" @change="updateData(index,$event)"></vue-html5-editor>
					</div>
				</div>
				<divider>自助添加模块内容</divider>
				<div class="cl" v-for="(item,index) in num_list" v-if="index==1">
					<x-input :placeholder="'请输入菜单名称'" :type="'text'" v-model="item.name"  >
						<div slot="label" class="ban_title">
						 <span>自定义模块：</span>
						</div>
					</x-input>
					<div class="fl" style="position: relative;z-index: 1;width:100%;overflow-x: auto;">
						<vue-html5-editor :content="item.num" @change="updateData(index,$event)"></vue-html5-editor>
					</div>
				</div>
			</div>
		</group>
		<div class="button_max" @click="forms">确认保存</div>
	</div>
</template>

<script>
	import { XHeader, XTextarea, Group, XInput, Cell, CheckIcon, Datetime, Confirm, XButton, Divider } from 'vux'
	import {
		VueAddress,
		VueIndustry,
		VueMainBody,
		VueBusiness,
		VueCropper
	} from '../component'
	export default {
		components: {
			XHeader,
			XTextarea,
			Group,
			XInput,
			Cell,
			CheckIcon,
			Datetime,
			VueAddress,
			VueIndustry,
			VueMainBody,
			VueBusiness,
			VueCropper,
			Confirm,
			XButton,
			Divider
		},
		data() {
			return {
				alsrtShow: true,
				form: {
					title: undefined, //标题
					region: undefined, //地区
					starttime: undefined, //开始时间
					endtime: undefined, //结束时间
					subject: undefined, //主体
					industry: undefined, //行业
					imgurl: undefined, //图片地址
					explain: undefined, //简介
					phone: undefined, //预留电话
				},
				tlm: undefined,
				num_list: [{
						name: undefined,
						num: ''
					},
					{
						name: undefined,
						num: ''
					}
				],
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		mounted() {
			this.ajax();
		},
		methods: {
			ajax() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Live/getLive', { //获取直播间数据
					'load': false,
					room_id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
					_this.form.title = res.room_title;
					_this.form.explain = res.room_explain;
					_this.form.imgurl = res.room_imgurl;
					_this.form.phone = res.room_phone;
					_this.form.endtime = returntime1(res.room_endtime);
					_this.form.starttime = returntime1(res.room_starttime);
					_this.form.region = res.room_region;
					_this.form.subject = res.room_subject;
					_this.form.industry = res.room_industry;
					_this.num_list = res.room_remarks || _this.num_list;
				});
			},
			forms() { //登录
				var _this = this;
				_this.form.phone = _this.form.phone || _this.user.mem_phone;
				_this.form.region = _this.$refs.address.add[0] == -100 ? 0 : _this.$refs.address.add[_this.$refs.address.add.length - 1] == -1 ? _.initial(_this.$refs.address.add, 1) : _this.$refs.address.add;
				//验证
				let obj = {
					imgurl: '图片',
					title: '标题',
					explain: '滚动字幕',
					subject: '地区',
					industry: '行业',
					subject: '主体',
					starttime: '开始时间',
					endtime: '结束时间',

				}
				if(!isNull(obj, _this.form)) return;
				_this.$http.post(_this.$store.state.url + '/Live/editLive', {
					'load': false,
					id: _this.$route.params.id,
					..._this.form,
					remarks: _this.num_list[0].name ? _this.num_list : undefined
				}).then((res) => {
					if(!res) return;
					this.$router.push('../../zhibo/myindex');
//					_this.$router.push('/zhibo/details/' + _this.$route.params.id);
				})
			},
			imgfile(res) {
				this.form.imgurl = res.imgurl
			},
			jian(index) {
				this.num_list.splice(index, 1);
			},
			jia(index) {
				this.num_list.splice(index + 1, 0, {
					name: undefined,
					num: ''
				});
			},
			onCopy() {
				msg('复制成功');
			},
			onError() {
				msg('复制失败');
			},
			updateData(value, data) {
				this.num_list[value].num = data;
			}
		}

	}
</script>

<style>
	.hezuo_add .fontsize .weui-cells {
		font-size: 14px;
		margin-top: 0;
	}
	
	.hezuo_add .text_right {
		text-align: right;
		margin: 5px 10px;
	}
	
	.hezuo_add .hezuo_add_r_icon .weui-icon-success,
	.hezuo_add .hezuo_add_r_icon .weui-icon-circle {
		font-size: 16px;
	}
	
	.hezuo_add .vux-x-input .weui-cell__ft::after {
		/*display: none;*/
	}
	
	.hezuo_add .weui-cell.pnone {
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.hezuo_add .pnone .vux-x-input .weui-input {
		text-align: right;
	}
	
	.input_img {
		position: relative;
		margin-left: 15px;
		text-align: left;
		border-top: 1px solid #D9D9D9;
	}
	
	.input_img i {
		font-size: 30px;
		color: #999;
	}
	
	.input_img img.showimg {
		width: 50px;
		height: 50px;
	}
	
	.input_img .txt {
		font-size: 12px;
	}
	
	.xing .weui-cell__hd:before,
	.xing+.vux-datetime div:nth-child(1) p:before {
		content: "*";
		color: red;
		position: absolute;
		top: 13px;
		left: 13px;
	}
	
	.xing .weui-cell__hd,
	.xing+.vux-datetime div:nth-child(1) p {
		margin-left: 10px;
	}
	
	.tel .weui-cell__hd:before {
		content: none!important;
	}
	.ban_title {
		font-size: 15px;
		/*font-weight: 800;*/
		margin-right: 5px;
	}
	
	.ban_title>span.min {
		font-size: 12px;
		color: #B2B2B2;
	}
	
	.ban_title>strong {
		color: red;
	}
</style>