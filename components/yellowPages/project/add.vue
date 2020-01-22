<template>
	<div class="center">
		<x-header class="header">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">添加项目</div>
		</x-header>
		<div class="bottom">
			<!-- <group> -->
			<div class="ImgButton">
				<strong>*</strong>
				<span class="ImgButtonTitle">项目案例:</span>
				<x-button class="buttonD" type="primary" @click.native="enterpriseImgs3 = true">上传项目主图</x-button>
			</div>
			<x-input v-model="project.project_name" placeholder="输入项目名称">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>项目名称:</span>
				</div>
			</x-input>
			<!-- <x-input v-model="project.project_address" placeholder="输入项目地址">
		          <div slot="label" class="ban_title">
		            <strong>*</strong>
		            <span>项目地址:</span>
		          </div>
      </x-input>-->
			<vue-address ref="address" :title="'所在地区:'" :placeholder="'请选择区域'" v-model="project.project_address"></vue-address>
			<datetime v-model="project.project_time">
				<div slot="title" class="ban_title">
					<strong>*</strong>
					<span>项目时间:</span>
				</div>
			</datetime>

			<x-input v-model="project.project_price" type="number" placeholder="输入项目总价">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>项目总价(元):</span>
				</div>
			</x-input>
			<div class="text_right">
				<divider>项目详情</divider>
				<div class="cl">
					<div class="fl" style="position: relative;z-index: 1;width:100%;overflow-x: auto;">
						<vue-html5-editor :content="project.project_details" @change="updateData($event)"></vue-html5-editor>
					</div>
				</div>
				<x-Button type="primary" class="saveZZ" @click.native="saveZZ()">保存</x-Button>
			</div>
			<!-- </group> -->
		</div>

		<div v-transfer-dom>
			<x-dialog :show.sync="enterpriseImgs3" class="investMoney" :hide-on-blur="true">
				<div class="title">上传项目主图</div>
				<div class="img-box user_up_imgfile">
					<span v-for="(item, index) in imgUrl" :key="index">
						<img :src="$store.state.url + '/uploads/' + item" alt />
						<span class="userupicon_cal" @click="deletePic(index)" v-show="addect">
						<x-icon type="ios-close" size="26"></x-icon>
						</span>
					</span>
					<vue-cropper @data="fileImgarr" :autoCropWidth="320" :autoCropHeight="180" v-show="imgUrl.length < 6">
						<img src="/static/img/icon1.png" alt />
					</vue-cropper>
				</div>
				<div class="button_max" @click="saveProjectImg()" style="background: #3092ff;">保存</div>
			</x-dialog>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import {
		XHeader,
		Group,
		XInput,
		XButton,
		Alert,
		Divider,
		XDialog,
		Datetime,
		TransferDomDirective as TransferDom
	} from "vux";
	import { VueCropper } from "../../component";
	import VueShareit from "../../component/game/helpShare"
	import VueAddress from "../../component/yellowPage/address";

	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			Group,
			XInput,
			XButton,
			VueCropper,
			Divider,
			XDialog,
			VueAddress,
			Datetime,
			VueShareit
		},
		data() {
			return {
				borderColor: {
					borderColor: "#333"
				},
				imgUrl: [],
				addect: true,
				name: null,
				project: {
					project_imgs: [], // 项目图片
					project_name: "", // 项目名称
					project_address: "", // 项目地址
					project_time: "", // 项目时间(日期格式)
					project_price: "", // 项目价格
					project_details: "" // 项目详情
				},
				enterpriseImgs3: false
			};
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
					link: this.$route.path + '?uidkey=' + this.$store.state.mem_id
				}
			},
		},
		created() {},
		methods: {
			saveProjectImg(){
				var _this = this;
				_this.enterpriseImgs3 = false;
				_this.project.project_imgs = _this.imgUrl;
				_this.imgUrl = [];
			 _this.imgUrl=_this.project.project_imgs
			},
			fileImgarr(res) {
				this.imgUrl.push(res.imgurl);
			},
			deletePic(index) {
				this.show = true;
				this.suoyin = index;
				this.imgUrl.splice(index, 1);
			},
			saveZZ() {
				var _this = this;
				_this.project.project_address = _this.$refs.address.add;
				console.log( _this.$refs.address.add)
				if(_this.project.project_imgs.length < 1) {
					msg("请上传项目主图");
					return;
				}

				if(!_this.project.project_name) {
					msg("请输入项目名称");
					return;
				}
				if(_this.project.project_address.length<2) {
					msg("请选择所在地区");
					return;
				}
				if(!_this.project.project_time) {
					msg("请选择项目时间");
					return;
				}
				if(!_this.project.project_price) {
					msg("请输入项目总价");
					return;
				}
				_this.$http
					.post(_this.$store.state.url + "/Homepages/add_project", {
						load: true,
						id: _this.$route.query.id,
						..._this.project
					})
					.then(function(res) {
						if(!res) return;
						msg('添加成功');
						_this.timer = setInterval(() => {
							_this.$router.push('/yellowPages/mineCompany?id=' + _this.$route.query.id)
						}, 1000)
					});
			},
			updateData(data) {
				this.project.project_details = data;
			},
			goBack() {
				history.go(-1);
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
			this.timer = null;
		}
	};
</script>

<style scoped>
	.vux-header {
		background-color: #ffffff;
	}
	
	.goBack {
		position: absolute;
		width: 12px;
		height: 12px;
		border-style: solid;
		border-color: white;
		border-width: 1px 0 0 1px;
		-webkit-transform: rotate(315deg);
		transform: rotate(315deg);
		top: 3px;
	}
	
	.title {
		width: 210px;
		font-size: 16px;
		text-align: center;
		line-height: 1.066667rem;
	}
	
	.bottom {
		background: #ffffff;
		margin-top: 10px;
		padding-bottom: 5px
	}
	
	.imgTitle {
		margin-left: 15px;
	}
	
	.input_img,
	.user_up_imgfile {
		display: inline-block;
	}
	
	.saveZZ {
		width: 200px;
		margin: 50px auto;
	}
	
	.saveP {
		width: 200px;
		margin: 15px auto;
	}
	
	.text_right {
		text-align: right;
		margin: 5px 10px;
	}
	
	.vux-header .vux-header-right {
		top: 5px;
	}
	
	.content {
		margin-top: 45px;
	}
	
	.head img {
		width: 25px;
	}
	
	strong {
		color: red;
	}
	
	.ImgButton {
		padding: 10px 15px;
	}
	
	.ImgButtonTitle {
		margin-right: 20px;
		color: #333;
		font-size: 15px;
	}
	
	.ImgButton .buttonD {
		width: 120px;
		display: inline-block;
		line-height: 30px;
		font-size: 15px;
	}
	
	.right-full-height {
		position: relative;
		top: 10px;
		font-size: 14px;
		right: 15px;
	}
	
	.ban_title {
		margin-right: 20px;
		color: #333;
		font-size: 15px;
	}
	
	.weui-label:before {
		content: "1515" !important;
		color: red;
		font-size: 15px;
		width: 15px;
		height: 15px;
	}
	
	.biaodin4 {
		border-top: 6px solid #f2f2f2;
	}
	
	.button_max {
		background: linear-gradient(to right, #03e1ec, #06e7c7);
		margin-top: 5px;
		margin-bottom: 5px;
		width: 150px;
		border-radius: 4px
	}
	
	.biaodin4 .login_remember {
		display: block;
		text-align: center;
		margin-top: 20px;
	}
	
	.biaodin4 .login_remember .alert {
		display: inline-block;
	}
	
	.weui-cell:before {
		border-top: 0px;
	}
	
	.investMoney .title {
		margin: 15px auto;
		font-size: 16px;
		font-weight: bold;
	}
	
	.img-box {
		background: #ffffff;
		height: 250px;
		overflow: hidden;
	}
	
	.vux-close {
		margin-top: 8px;
		margin-bottom: 8px;
	}
	
	.user_up_imgfile {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		/*justify-content: center;*/
		padding: 15px 15px 10px 15px;
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
	
	.user_up_imgfile>span {
		/*display: ;*/
		width: 48%;
		margin-bottom: 10px;
		position: relative;
	}
	
	.addCompanyQua {
		width: 100%;
		text-align: center;
	}
	
	.addCompanyQua span {
		display: inline-block;
		border: 1px solid #333;
		width: 20px;
		line-height: 20px;
		text-align: center;
		border-radius: 50px;
		font-size: 18px;
		margin-bottom: 10px;
	}
	
	.vux-cell-box:not(:first-child):before {
		border-top: 0px;
	}
	
	.vux-cell-value {
		font-size: 15px;
	}
</style>