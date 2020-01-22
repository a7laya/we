<template>
	<div v-if="user">
		<x-header :title="(user.mem_nickname || '我') + '的资料'" :left-options="{backText:''}">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>
		<group>
			<cell :title="'头像'" is-link style="font-size: 16px;">
				<vue-cropper @data="fileImg" :autoCropWidth="200" :autoCropHeight="200">
					<img style="width: 70px;float: right;" :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl" />
				</vue-cropper>
			</cell>
			<cell :title="'昵称'" is-link class="sign">
				<span class="name" @click="onshow('nameShow')">

					<span v-if="!user.mem_nickname">请填写昵称</span>
					<span v-else>{{user.mem_nickname}}</span>
				</span>
			</cell>
			<cell :title="'性别'" class="sign">
				<span class="user-data-name-cuud">
					<checklist :options="commonList" v-model="user.mem_sex" :max="1" @on-change="onsex"></checklist>
				</span>
			</cell>
			<vue-address :title="'城市'" v-model="user.mem_region" :placeholder="'请选择所属城市'" class="sign"></vue-address>
		</group>
		<group>
			<selector placeholder="" @on-change="onChange" v-model="user.mem_type" direction="rtl" :options="list" title="类型:"
			 class="xuanze"></selector>
			<!-- 	<cell :title="'单位'" is-link class="sign">
				<span class="name" @click="onshow('mem_company')">
                	<span v-if="!user.mem_company">请填写所属单位</span>
				<span v-else>{{user.mem_company}}</span>
				</span>
				</cell> -->
			<!-- <vue-user-position :title="'职位'" :placeholder="'请选择职位'" v-model="user.mem_position" class="sign"></vue-user-position>
				<vue-user-company :title="'主体'" :placeholder="'请选择单位主体'" v-model="user.mem_subject" class="sign"></vue-user-company>
				<vue-industry :title="'行业'" :placeholder="'请选择所属行业'" v-model="user.mem_hangye" class="sign"></vue-industry> -->
			<div v-if='user.mem_type==0'>
				<cell :title="'单位'" is-link class="sign">
					<span class="name" @click="onshow('mem_company')">
						<span v-if="!user.mem_company">请填写所属单位</span>
						<span v-else>{{user.mem_company}}</span>
					</span>
				</cell>
				<vue-user-position :title="'职位'" :placeholder="'请选择职位'" v-model="user.mem_position" class="sign"></vue-user-position>
				<vue-user-company :title="'主体'" :placeholder="'请选择单位主体'" v-model="user.mem_subject" class="sign"></vue-user-company>
				<vue-industry :title="'行业'" :placeholder="'请选择所属行业'" v-model="user.mem_hangye" class="sign"></vue-industry>
			</div>
			<div v-else="">
				<vue-user-position :title="'职位'" :placeholder="'请选择职位'" v-model="user.mem_position" class="sign"></vue-user-position>
			</div>
		</group>
		<group>
			<cell :title="'所属单位'" is-link>
				<div class="user_up_title" slot="title">
					<span>个人/企业形象照</span>
					<span class="user_up_title_shuoming">最多可上传五张</span>
				</div>
				<span style="color: #35495e;" @click="onshow('addect')" v-if="addect==false&&user.mem_personalimg.length>0">编辑</span>
				<span style="color: #35495e;" @click="picMsg()" v-if="addect==false&&user.mem_personalimg.length<1">编辑</span>
				<span style="color: #35495e;" @click="onshow('addect')" v-if="addect==true">完成</span>
			</cell>
			<div class="user_up_imgfile">
				<span v-for="(item, index) in user.mem_personalimg" :key="index">
					<img :src="$store.state.website.website_domain_name + '/uploads/' + item" alt="" />
					<span class="userupicon_cal" @click="removeFimg(index)" v-show="addect">
						<x-icon type="ios-close" size="30"></x-icon>
					</span>
				</span>
				<vue-cropper @data="fileImgarr" :autoCropWidth="320" :autoCropHeight="180" v-show="user.mem_personalimg.length<5">
					<img src="/static/img/icon1.png" />
				</vue-cropper>
			</div>
		</group>
		<div class="button_max" @click="form" style="margin: 50px auto;">保存</div>
		<confirm v-model="nameShow" show-input :title="'修改昵称'" :input-attrs="{type: 'txt'}" @on-confirm="onConfirm" @on-show="onShow5"
		 ref="confirm5"></confirm>
		<confirm v-model="mem_company" show-input :title="'所属单位'" :input-attrs="{type: 'txt'}" @on-confirm="memCompany"
		 @on-show="onShow1" ref="confirm1"></confirm>
	</div>
</template>

<script>
	import {
		Cell,
		Group,
		Confirm,
		Checklist,
		XHeader,
		PopupPicker,
		Selector
	} from 'vux'
	import {
		VueCropper,
		VueAddress,
		VueIndustry,
		VueHeaderNav,
		VueUserCompany,
		VueUserPosition
	} from '../../component'
	export default {
		components: {
			Cell,
			Group,
			VueCropper,
			Confirm,
			Checklist,
			XHeader,
			PopupPicker,
			VueAddress,
			VueIndustry,
			VueHeaderNav,
			VueUserCompany,
			VueUserPosition,
			Selector
		},
		data() {
			return {
				user: undefined,
				nameShow: false, //名称弹窗
				mem_company: false, //公司名称弹窗
				commonList: [{
					key: '0',
					value: '女'
				}, {
					key: '1',
					value: '男'
				}, {
					key: '2',
					value: '其他'
				}], //性别配置
				addect: false, //编辑图片
				show1: false,
				list: [{
					key: '0',
					value: '单位'
				}, {
					key: '1',
					value: '个人'
				}],
				is_person: 0, //类型

			}
		},
		mounted() {
			var _this = this;
			_this.$http.post(_this.$store.state.url + '/Homecenter/getUser', {
				'load': true,
			}).then((res) => {
				if (!res) return;
				res.mem_region = res.mem_region || []; //地区
				res.mem_sex = [res.mem_sex.toString()]; //性别
				res.mem_position = res.mem_position || []; //职位
				res.mem_hangye = res.mem_hangye || []; //所属行业
				res.mem_subject = res.mem_subject || []; //单位主体
				res.mem_personalimg = res.mem_personalimg || []; //个人形象照
				res.mem_type = res.mem_type || 0 //类型
				_this.user = res;
				if (res.mem_position || res.mem_hangye || res.mem_subject || _this.user.mem_nickname) {
					_this.show1 = true;
				} else {
					_this.show1 = false;
				}

			})

		},
		methods: {

			onChange(val) {
				let _this = this;
				if (val == 1) {


					_this.typename = "个人";
				} else {


					_this.typename = "单位";
				}

				_this.is_person = val;
				this.user.mem_type = _this.is_person
			},


			onshow(val) {
				this[val] = !this[val];
			},
			fileImg(res) { //头像
				var _this = this;
				_this.user.mem_headimgurl = res.imgurl;
			},
			onConfirm(e) { //修改昵称
				this.user.mem_nickname = e
			},
			removeFimg(index) {
				this.user.mem_personalimg.splice(index, 1);
			},
			fileImgarr(res) { //个人形象照
				this.user.mem_personalimg.push(res.imgurl);
			},
			onsex(e) { //修改男女
				if (e.length == 0) {
					this.mem_sex = [this.user.mem_sex.toString()];
				}
			},
			memCompany(e) {
				this.user.mem_company = e;
			},
			picMsg() {
				msg("请先上传....");
			},
			form() {
				var _this = this;
				if (_this.is_person == 0) {
					let obj = {
						mem_nickname: '昵称',
						mem_sex: '性别',
						mem_region: '所属城市', //地区
						mem_company: '所属单位',
						mem_position: '职位',
						mem_subject: '单位主体', //个人/单位名称，
						mem_hangye: '所属行业',
						mem_type: '类型'
					}
					if (!isNull(obj, _this.user)) return;
				} else {
					this.user.mem_company = '个人'
					this.user.mem_subject = '21'
					this.user.mem_hangye = ["3", "419"]
					let obj = {
						mem_nickname: '昵称',
						mem_sex: '性别',
						mem_region: '所属城市', //地区
						mem_company: '暂无',
						mem_position: '职位',
						mem_subject: '暂无',
						mem_hangye: '暂无',
						mem_type: '类型'
					}
					if (!isNull(obj, _this.user)) return;
				}
				//				let obj = {
				//					mem_nickname:'昵称',
				//					mem_sex:'性别',
				//					mem_region: '所属城市', //地区
				//					mem_company: '所属单位',
				//					mem_position: '职位',
				//					mem_subject: '单位主体', //个人/单位名称，
				//					mem_hangye: '所属行业',
				//					mem_type:'类型'
				//				}
				//				if(!isNull(obj, _this.user)) return;
				_this.$http.post(_this.$store.state.url + '/Homecenter/edit_member_info', {
					load: true,
					..._this.user,
				}).then(function(res) {
					if (!res) return;
					msg('保存成功');
					_this.$store.dispatch('getUser');
					_this.$router.go(-1);
				})
			},
			onShow5() {
				this.$refs.confirm5.setInputValue(this.user.mem_nickname);
			},
			onShow1() {
				this.$refs.confirm1.setInputValue(this.user.mem_company);
			}
		},
	}
</script>

<style>
	.user_up_imgfile {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		/*justify-content: center;*/
		padding: 0 15px 10px 15px;
	}

	.user_up_imgfile .userupicon_cal {
		position: absolute;
		top: -10px;
		right: -10px;
		fill: #d52121;
	}

	.user_up_imgfile>span {
		/*display: ;*/
		width: 48%;
		margin-bottom: 10px;
		position: relative;
	}

	.user_up_title_shuoming {
		font-size: 12px;
		color: #999999;
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
		font-size: 16px;
		color: #35495e;
	}

	.sign .vux-label:before,
	.sign .weui-label:before,
	.weui-label:before {
		content: "*";
		color: red;
	}
	.name {
		display: inline-block;
		width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: middle;
	}
</style>
