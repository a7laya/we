<template>
	<div class="center">
		<x-header class="header">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">企业信息编辑</div>
		</x-header>
		<div class="top">
			<div class="ImgButton">
				<strong>*</strong>
				<span class="ImgButtonTitle">企业图片:</span>
				<div class="user_up_imgfile">
					<span v-for="(item, index) in formCompany.imgs" :key="index">
            <img :src="$store.state.url + '/uploads/' + item.img_url" alt>
            <span class="userupicon_cal" @click="deletePic(index,item.id)" v-show="addect">
              <x-icon type="ios-close" size="26"></x-icon>
            </span>
					</span>
					<vue-cropper @data="fileImgarr" :autoCropWidth="320" :autoCropHeight="180" v-show="formCompany.imgs.length < 2">
						<img src="/static/img/icon1.png" alt>
					</vue-cropper>
				</div>
			</div>
			<div class="ImgButton">
				<strong>*</strong>
				<span class="ImgButtonTitle">企业图标:</span>
				<div class="user_up_imgfile">
					<span v-for="(item, index) in imgUrlLogo" :key="index">
            <img :src="$store.state.url + '/uploads/' + item" alt>
            <span class="userupicon_cal" @click="deletePic2(index)" v-show="addect">
              <x-icon type="ios-close" size="26"></x-icon>
            </span>
					</span>
					<vue-cropper @data="fileImgarrLogo" :autoCropWidth="180" :autoCropHeight="180" v-show="imgUrlLogo.length < 1">
						<img src="/static/img/icon1.png" alt>
					</vue-cropper>
				</div>
			</div>
			<x-input v-model="formCompany.name" placeholder="输入企业名称">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>企业名称:</span>
				</div>
			</x-input>
			<vue-address ref="address" :title="'所在地区:'" :placeholder="'请选择区域'" v-model="formCompany.region"></vue-address>
			<!-- <vue-industry
        ref="industry"
        :title="'所属行业:'"
        :placeholder="'请选择行业'"
         v-model="formCompany.class"
      ></vue-industry> -->
			<popup-picker :data="mainList" v-model="mainValue" @on-hide="onHide1" placeholder="请选择单位主体" :columns="1" ref="picker3" show-name class="HYmain">
				<div slot="title" class="ban_title">
					<strong>*</strong>
					<span>单位主体:</span>
				</div>
			</popup-picker>
			
			<div class="hyNameList">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>所属行业:</span>
				</div>
				<x-button type="primary" mini @click.native="chooseHangye()">选择行业</x-button>
				<div class="content">
					<span v-for="(item,index) in hyNameList" class="mav_span on" :key="index">{{item}}</span>
				</div>
			</div>

			<x-input v-model="formCompany.phone" type="number" placeholder="输入联系电话">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>联系电话:</span>
				</div>
			</x-input>
			<x-input v-model="formCompany.mailbox" placeholder="输入企业邮箱">
				<div slot="label" class="ban_title">
					<!--<strong>*</strong>-->
					<span>企业邮箱:</span>
				</div>
			</x-input>
			<div class="text_right">
				<divider>企业详情</divider>
				<div class="cl">
					<div class="fl" style="position: relative;z-index: 1;width:100%;overflow-x: auto;">
						<vue-html5-editor :content="formCompany.details" @change="updateData($event)"></vue-html5-editor>
					</div>
				</div>
			</div>
			<x-Button type="primary" class="saveZZ" @click.native="saveZZ()">编辑</x-Button>
		</div>
		
		<div v-transfer-dom style="position:relative">
			<x-dialog v-model="showHangye" class="dialogHangye" :hide-on-blur="true">
				<div style="padding:15px;" class="dialogHangyeBox">
					<div class="checkBox">
						<checker v-model="hangyeList" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected" :max="5">
							<checker-item :value="item" v-for="(item, index) in itemHangye" :key="index">{{item.typename}}</checker-item>
						</checker>
					</div>
					<x-button type="primary" mini @click.native="makeSureHY" class="makeSureHY">确定</x-button>
				</div>
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
		PopupPicker,
		Checker,
		CheckerItem,
		TransferDomDirective as TransferDom
	} from "vux";
	import VueCropper from "../../component/yellowPage/companyImg";
	import VueAddress from "../../component/yellowPage/address";
	import VueIndustry from "../../component/yellowPage/industry";
	import VueShareit from "../../component/game/helpShare"

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
			VueIndustry,
			VueShareit,
			PopupPicker,
			Checker,
			CheckerItem,
		},
		data() {
			return {
				borderColor: {
					borderColor: "#333"
				},
				imgUrl: [],
				addect: true,
				imgUrlLogo: [],
				name: null,
				formCompany: {
					imgs: [], // 企业图片（多张）
					logo: "", // logo图
					name: "", // 企业名称
					class: "", // 企业分类
					hangye: [], //行业分类
					region: "910008", // 企业区域
					phone: "", // 座机号
					mailbox: "", // 企业邮箱
					details: "" // 企业详情
				},
				cundangImg: [],
				enterpriseImgs: false,
				enterpriseImgs2: false,
				mainList: [{
						name: "品牌商",
						value: "1"
					},
					{
						name: "代理商",
						value: "2"
					},
					{
						name: "集成商",
						value: "3"
					},
					{
						name: "设计商",
						value: "4"
					},
					{
						name: "工程队",
						value: "5"
					}
				],
				mainValue: [],
				hyNameList: [],
				hangyeList: [],
				itemHangye: [],
				showHangye: false,
				city: '',
				img_id: '', //删除图片的id
			};
		},
		mounted() {
			var _this = this;
			_this.$http
				.post(_this.$store.state.url + "/Common/hangye")
				.then(function(res) {
					console.log(res)
//					_this.itemHangye = res;
					for(var i=0;i<res.length;i++){
					let a={
						id:res[i].id,
						typename:res[i].typename
					}
					_this.itemHangye.push(a)
					}
					
				});
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
					.post(_this.$store.state.url + "/Homepages/enterprise_info", {
						load: true,
						id: _this.$route.query.id
					})
					.then(function(res) {
						_this.formCompany.logo = res.logo;
						_this.formCompany.name = res.name;
						_this.mainValue.push(res.class.toString());
						_this.formCompany.region = res.enterprise_region.toString();
						_this.formCompany.phone = res.phone;
						_this.formCompany.mailbox = res.mailbox;
						_this.formCompany.details = res.details;
						_this.formCompany.imgs = res.imgs;
                        _this.imgUrlLogo.push(res.logo);
						
						for(var i in res.enterprise_hangye) {
							_this.hyNameList.push(res.enterprise_hangye[i].typename)
							_this.formCompany.hangye.push(res.enterprise_hangye[i].id)
							console.log(res.enterprise_hangye[i].id)
						}
						console.log(res.enterprise_hangye)
						_this.hangyeList = res.enterprise_hangye
						console.log(_this.hangyeList)
					});
			},
			updateData(data) {
				this.formCompany.details = data;
			},
			fileImgarr(res) {
				var _this = this;
				_this.qiyeimg(res.imgurl);
             },
			qiyeimg(imgUrl) {
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
						console.log(img)
						_this.formCompany.imgs.push(img);
						console.log(_this.formCompany.imgs)
					});
			},
			fileImgarrLogo(res) {
				this.imgUrlLogo.push(res.imgurl);
			},
			deletePic(index,id) {
				this.formCompany.imgs.splice(index, 1);
				this.img_id = id
				console.log(index)
				
			},
			qiyedel(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/Homepages/enterprise_imgs_del", {
						id: id
					})
					.then(function(res) {
						if(!res) return;
					});

			},
			deletePic2(index) {
				this.imgUrlLogo.splice(index, 1);
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
			onHide1() {
				this.formCompany.class = this.mainValue[0];
			},

			saveZZ() {
				var _this = this;
				console.log(_this.formCompany.region)
				if(_this.formCompany.region.length == 1) {
					_this.city = _this.formCompany.region[0]
				} else if(_this.formCompany.region.length == 2) {
					_this.city = _this.formCompany.region[1]
				}
				_this.formCompany.class = _this.mainValue[0];
				_this.city = _this.formCompany.region;
				console.log(_this.formCompany)
				if(_this.formCompany.imgs.length < 1) {
					msg("企业图片不能为空");
					return;
				}
				if(!_this.imgUrlLogo[0]) {
					msg("企业logo不能为空");
					return;
				}
				if(!_this.formCompany.name) {
					msg("企业名称不能为空");
					return;
				}

				if(!_this.formCompany.class) {
					msg("单位主体不能为空");
					return;
				}
				if(!_this.city.length) {
					msg('所在地区不能为空');
					return;
				}
				if(_this.formCompany.hangye.length < 1) {
					msg("所属行业不能为空");
					return;
				}
				if(!_this.formCompany.phone) {
					msg("联系电话不能为空");
					return;
				}
                if(!isPoneAvailable(_this.formCompany.phone)) return;
				_this.qiyedel(_this.img_id);
				_this.$http
					.post(_this.$store.state.url + "/Homepages/edit_enterprise_info", {
						load: true,
						id: _this.$route.query.id,
						enterprise_logo: _this.imgUrlLogo[0],
						enterprise_name: _this.formCompany.name,
						enterprise_hangye: _this.formCompany.hangye,
						enterprise_class: _this.formCompany.class,
						enterprise_region: _this.city,
						mailbox: _this.formCompany.mailbox,
						enterprise_details: _this.formCompany.details,
						enterprise_phone: _this.formCompany.phone,
						imgs_url: _this.formCompany.imgs
					})
					.then(function(res) {
						if(!res) return;
						msg('修改成功');
						_this.timer = setInterval(() => {
							_this.$router.push('/yellowPages/mineCompany?id=' + _this.$route.query.id)
						}, 1000)
					});
			},
			goBack() {
				let _this=this;
				if(_this.formCompany.imgs.length < 1) {
					msg("企业图片不能为空");
					return;
				}
				if(!_this.imgUrlLogo[0]) {
					msg("企业logo不能为空");
					return;
				}
				if(!_this.formCompany.name) {
					msg("企业名称不能为空");
					return;
				}
                if(_this.formCompany.hangye.length < 1) {
					msg("所属行业不能为空");
					return;
				}
				if(!_this.formCompany.phone) {
					msg("联系电话不能为空");
					return;
				}
				
				if(this.$route.query.uidkey) {
					this.$router.push('/index')
				} else {
					history.go(-1);
				}
			},
			makeSureHY() {
				this.showHangye = false;
				this.formCompany.hangye = [];
				this.hyNameList = [];
				for(var i in this.hangyeList) {
					this.formCompany.hangye.push(this.hangyeList[i].id);
					this.hyNameList.push(this.hangyeList[i].typename);
				}
			},
			chooseHangye() {
				this.showHangye = true
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
	
	.top {
		background: #ffffff;
		margin-top: 10px;
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
	
	.text_right {
		text-align: right;
		margin: 5px 10px;
	}
	
	.vux-header .vux-header-right {
		top: 5px;
	}
	/* .content {
  margin-top: 45px;
} */
	
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
		font-size: 18px;
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
	
	.biaodin4 .button_max {
		background: linear-gradient(to right, #03e1ec, #06e7c7);
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
	
	.weui-cell:before {
		border-top: 0px;
	}
	/*@import '~vux/src/styles/close';*/
	/*.investMoney {*/
	
	.investMoney .title {
		margin-top: 15px;
		margin-bottom: 15px;
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
	/*}*/
	
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
	
	.hyNameList {
		padding-left: 15px;
		overflow: hidden;
	}
	
	.hyNameList .ban_title {
		display: inline-block;
	}
	
	.HYmain {
		font-size: 15px;
	}
	
	.mav_span {
		font-size: 13px;
		line-height: 20px;
		background: #ebf3fe;
		border-radius: 20px;
		padding: 0 10px;
		margin: 5px 5px;
		border: 1px solid #5b7ec2;
		color: #517fd7;
		display: inline-block;
	}
	
	.mav_span.on {
		border-color: #d26739;
		background: #ffeee6;
		color: #ff4b28;
	}
	
	.dialogHangye .dialogHangyeBox {
		height: 300px;
		overflow: auto;
		text-align: initial;
	}
	
	.dialogHangye .dialogHangyeBox .makeSureHY {
		display: block;
		margin: 0px auto;
	}
	
	.dialogHangye .dialogHangyeBox .checkBox {
		height: 250px;
		overflow: auto;
		text-align: initial;
		margin-bottom: 10px;
	}
	
	.dialogHangye .dialogHangyeBox .checkBox .demo1-item {
		font-size: 13px;
		line-height: 20px;
		background: #ebf3fe;
		border-radius: 20px;
		padding: 0 10px;
		margin: 5px 5px;
		border: 1px solid #5b7ec2;
		color: #517fd7;
		display: inline-block;
	}
	
	.dialogHangye .dialogHangyeBox .checkBox .demo1-item-selected {
		border-color: #d26739;
		background: #ffeee6;
		color: #ff4b28;
	}
	
	.vux-cell-box:not(:first-child):before {
		border-top: 0px;
	}
	
	.vux-cell-value {
		font-size: 15px;
	}
</style>