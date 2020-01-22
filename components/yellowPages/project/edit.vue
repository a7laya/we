<template>
	<div class="center">
		<x-header class="header">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">编辑资质</div>
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
			<vue-address ref="address" :title="'所在地区:'" :placeholder="'请选择区域'" style="font-size:14px" v-model="project.project_address"></vue-address>

			<datetime v-model="project.project_time">
				<div slot="title" class="ban_title">
					<strong>*</strong>
					<span>项目时间:</span>
				</div>
			</datetime>
			<x-input v-model="project.project_price" type="number" placeholder="输入项目总价">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>项目总价:</span>
				</div>
			</x-input>
			<div class="text_right">
				<divider>项目详情</divider>
				<div class="cl">
					<div class="fl" style="position: relative;z-index: 1;width:100%;overflow-x: auto;">
						<vue-html5-editor :content="project.project_details" @change="updateData($event)"></vue-html5-editor>
					</div>
				</div>
			</div>
			<!-- </group> -->
			<div class="saveZZ" @click="saveZZ()">编辑</div>
		</div>

		<div v-transfer-dom>
			<x-dialog :show.sync="enterpriseImgs3" class="investMoney" :hide-on-blur="true">
				<div class="title">上传项目主图</div>
				<div class="img-box user_up_imgfile">
					<span v-for="(item, index) in project.imgs_url" :key="index">
            <img :src="$store.state.url + '/uploads/' + item.img_url" alt />
            <span class="userupicon_cal" @click="deletePic(index,item.id)" v-show="addect">
              <x-icon type="ios-close" size="26"></x-icon>
            </span>
					</span>
					<vue-cropper @data="fileImgarr" :autoCropWidth="320" :autoCropHeight="180" v-show="project.imgs_url.length < 6">
						<img src="/static/img/icon1.png" alt />
					</vue-cropper>
				</div>
				<div class="button_max saveP" @click="saveProjectImg()" style="background: #3092ff;">保存</div>
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
	import VueCropper from "../../component/yellowPage/companyImg";
	import VueAddress from "../../component/yellowPage/address";
	import VueShareit from "../../component/game/helpShare";
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
			Datetime,
			VueAddress,
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
					imgs_url: [], // 项目图片
					project_name: "", // 项目名称
					project_address: "", // 项目地址
					project_time: "", // 项目时间(日期格式)
					project_price: "", // 项目价格
					project_details: "" // 项目详情
				},
				cundangImg: [],
				enterpriseImgs3: false,
				id: ''
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
		created() {
			this.getData();
		},
		methods: {
			getData() {
				var _this = this;
				_this.$http
					.post(_this.$store.state.url + "/Homepages/check_project", {
						load: true,
						id: _this.$route.query.id
					})
					.then(function(res) {
						_this.id = res.home_id;
						_this.project.imgs_url = res.imgs;
						_this.project.project_name = res.project_name;
						_this.project.project_address = res.project_address;
						_this.project.project_time = returntime6(res.project_time);
						_this.project.project_price = res.project_price;
						_this.project.project_details = res.project_details;

					});
			},
			updateData(data) {
				this.project.project_details = data;
			},
			saveProjectImg() {
				var _this = this;
				_this.enterpriseImgs3 = false;
				// _this.project.project_imgs = _this.imgUrl;
			},
			fileImgarr(res) {
				//				this.imgUrl.push(res.imgurl);
				var _this = this;
				_this.projectimg(res.imgurl);
			},
			projectimg(imgUrl) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/Homepages/add_enterprise_img", {
						load: true,
						id: _this.$route.query.id,
						img_url: imgUrl,

					})
					.then(function(res) {
						if(!res) return;

						let img = {

							img_url: res.img_url,
							id: res.img_id
						}
						_this.project.imgs_url.push(img);

					});
			},
			deletePic(index, id) {
				this.project.imgs_url.splice(index, 1);
				this.projectdel(id);
			},
			projectdel(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/Homepages/enterprise_imgs_del", {
						id: id
					})
					.then(function(res) {
						if(!res) return;
					});

			},
			ArrayIsEqual(arr1, arr2) {
				//判断2个数组是否相等
				if(arr1 === arr2) {
					//如果2个数组对应的指针相同，那么肯定相等，同时也对比一下类型
					return true;
				} else {
					if(arr1.length != arr2.length) {
						return false;
					} else {
						//长度相同
						for(let i in arr1) {
							//循环遍历对比每个位置的元素
							if(arr1[i] != arr2[i]) {
								//只要出现一次不相等，那么2个数组就不相等
								return false;
							}
						} //for循环完成，没有出现不相等的情况，那么2个数组相等
						return true;
					}
				}
			},
			ArrayBeforeIsEqual(arr1, arr2) {
				//判断2个数组是否相等
				for(var i = 0; i < arr1.length; i++) {
					for(var j = 0; j < arr2.length; j++) {
						if(i == j) {
							if(arr1[i] == arr2[i]) {
								return true;
							} else {
								return false;
							}
						}
					}
				}
			},

			saveZZ() {
				var _this = this;
				//				var address = "";
				//
				//				address =
				//					_this.$refs.address.add[0] == -100 ?
				//					0 :
				//					_this.$refs.address.add[_this.$refs.address.add.length - 1] == -1 ?
				//					_.initial(_this.$refs.address.add, 1) :
				//					_this.$refs.address.add;
				_this.project.project_address = _this.$refs.address.add;

				if(_this.project.imgs_url.length < 1) {
					msg("请上传项目主图");
					return;
				}

				if(!_this.project.project_name) {
					msg("请输入项目名称");
					return;
				}
				if(!_this.project.project_address) {
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
                 console.log(_this.project)
				_this.$http
					.post(_this.$store.state.url + "/Homepages/edit_project", {
						load: true,
						id: _this.$route.query.id,
						..._this.project
					})
					.then(function(res) {
						if(!res) return;
						msg('修改成功');
						_this.timer = setInterval(() => {
							history.go(-1);
						}, 1000)
					});
			},
			// },
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
		padding-bottom: 10px
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
		margin: 50px auto 0px;
		background-color: #1AAD19;
		position: relative;
		display: block;
		padding-left: 0.373333rem;
		padding-right: 0.373333rem;
		box-sizing: border-box;
		font-size: 0.48rem;
		text-align: center;
		text-decoration: none;
		color: #FFFFFF;
		line-height: 2.33333333;
		border-radius: 0.133333rem;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		overflow: hidden;
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