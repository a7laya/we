<template>
	<div style="background: #fff;">
		 <x-header class="header">
		  <div slot="overwrite-left" class="goBack"  @click="goBack()"></div>
		  <div slot="overwrite-title" class="title" >编辑新品</div>
		</x-header>
		<div class="top">
			<x-input  class="weui-vcode" placeholder="编辑发布资讯标题" v-model="project.project_name"  >
				<div slot="label" class="ban_title">
				    <strong>*</strong>
					<span>新品标题:</span>
				</div>
			</x-input>
			<!-- <x-input  class="weui-vcode" placeholder="发布企业或个人名" v-model="name" :max="14" >
				<div slot="label" class="ban_title">
					<span>发布人:</span>
				</div>
			</x-input> -->
			<div class="ImgButton">
				<strong>*</strong>
				<span class="ImgButtonTitle">上传主图:</span>
				<div class="img-box user_up_imgfile">
					<span v-for="(item, index) in project.project_imgs" :key="index">
						<img :src="$store.state.url + '/uploads/' + item" alt />
						<span class="userupicon_cal" @click="deletePic(index)" v-show="addect">
						  <x-icon type="ios-close" size="26"></x-icon>
						</span>
					</span>
					<vue-cropper @data="fileImgarr" :autoCropWidth="320" :autoCropHeight="180" v-show="project.project_imgs.length < 2">
						<img src="/static/img/icon1.png" alt />
					</vue-cropper>
				</div>
			</div>

			<div class="xiangqing">
				<strong>*</strong>
				<span class="ImgButtonTitle">新品详情:</span>
				<span class="xiangqing-wen">编辑框内输入资讯图文</span>
			</div>
			<div class="text_right">
				<divider>新品详情</divider>
				<div class="cl">
					<div class="fl" style="position: relative;z-index: 1;width:100%;overflow-x: auto;">
						<vue-html5-editor :content="project.project_details" @change="updateData($event)"></vue-html5-editor>
					</div>
				</div>
				<x-Button type="primary" class="saveZZ" @click.native="saveZZ()">提交</x-Button>
			</div>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, XInput,XButton,XDialog,TransferDomDirective as TransferDom,Group,Alert,Divider,} from 'vux'
	import { VueShareit,VueCropper} from '../component/'
	export default{
		directives: {
			TransferDom
		},
		components:{
			 XHeader,
			 XInput,
			 XButton,
			 XDialog,
			 VueCropper,
			 Group,
			 Alert,
			 Divider,
			 VueShareit,

		},
		data(){
			return{
				show2:false,
				enterpriseImgs3: false,
				addect: true,
				imgUrl:[],
				showing:false,
				project: {
					project_imgs: [], // 新品图片
					project_name: "", // 新品名称
					project_details: "" // 新品详情
				},
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
					link: this.$route.path + '?uidkey=' + this.$store.state.mem_id
				}
			},
		},
		mounted() {
			var _this = this;
			_this.getData();
		},
		methods: {
			getData() {
			  var _this = this;
			  _this.$http.post(_this.$store.state.url + '/Information/infoDetails', {
			    'load': false,
			    info_id: _this.$route.params.id
			  }).then((res) => {
			    if (!res) return;
			    _this.project.project_imgs = res.imgUrl
			    _this.project.project_name = res.title
			    _this.project.project_details = res.content
			  })
			},
			saveProjectImg(){
				var _this = this;
				_this.enterpriseImgs3 = false;
				_this.project.project_imgs = _this.imgUrl;
				_this.imgUrl = [];
			 _this.imgUrl=_this.project.project_imgs
			},
			goBack(){
				this.urls = new URL(window.location.href)
				if(this.urls.searchParams.get("uidkey")){
				  this.$router.push('/fabu/index')
				}else{
				  this.$router.go(-1)
				}
			},
			fileImgarr(res) {
				this.project.project_imgs.push(res.imgurl);
			},
			deletePic(index) {
				this.show = true;
				this.suoyin = index;
				this.project.project_imgs.splice(index, 1);
			},
			saveZZ(){
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/Information/update_information", {
						load: true,
						id: _this.$route.params.id,
						title:_this.project.project_name,
						imgUrl:_this.project.project_imgs,
						content:_this.project.project_details
					})
					.then(function(res) {
				    _this.$router.push('/information/myindex')
				    _this.show2=false

					})
			},
			updateData(data) {
				this.project.project_details = data;
			},
			beforeDestroy() {
				clearInterval(this.timer);
				this.timer = null;
			},
		},
	}
</script>

<style scoped>
	.vux-header {
	  background-color: #33495E;
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
	  color:#fff;
	  width: 210px;
	  font-size: 16px;
	  text-align: center;
	  line-height: 1.066667rem;
	}
	.top {
	  margin-top: 10px;
	  background: #ffffff;
	}
	/* .weui-vcode{
		border-bottom:1px solid #7F7F7F;
	} */



	.imgTitle {
		margin-left: 15px;
	}

	.input_img,
	.user_up_imgfile {
		display: inline-block;
	}

	.saveZZ {
		width: 200px;
		margin: 50px auto 0;
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
	.xiangqing{
		padding: 10px 15px;
	}
	.xiangqing-wen{
		color:#D2D2D2;
		font-size:12px
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
		/* height: 250px; */
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
	.fabu{
		color: #9A9A9A;
		font-size:14px;
		margin:0 auto;
		margin-top:20px;
		width:51%;
	}
	.dialogHangye .dialogHangyeBox {
		height: 170px;
		overflow: auto;
		text-align: initial;
	}

	.dialogHangye .dialogHangyeBox .makeSureHY {
		margin: 0px auto;
		background:#F88F00;
		font-size: 18px;
		border-radius: 20px;
		text-align: center;
		color: #fff;
		width:40%;
	}
	.dialoghui{
		width:55%;
		font-size: 18px;
		margin: 40px auto 20px auto;
		border-bottom: 1px solid #DADADA;
		padding-bottom: 20px;
		color:#7A7A7A;
	}

	.invest_Money {
	    border-radius: 8px;
	    padding-bottom: 8px;
	  }
	.investMoney_img {
	  background: #FFFFFF;
	  height: 250px;
	  overflow: hidden;
	}
	.investMoney_title {
	  font-size: 18px;
	  text-align: center;
	  line-height: 1.066667rem;
	  margin-top:20px
	}
	.investMoney_cha{
		width:100%;
		display: flex;
		justify-content: center;
	}
	.investMoney_ch{
		width:30px;
		height:30px;
	}
	.investMoney_ch img{
		width:100%
	}
	 .weui-btn_default {
	  background: #FF6F3A;
	  color: #fff;
	  width: 100px;
	}
	.lessMoney {
	  width: 40%;
	  font-size: 14px;
	  margin: 20px auto;
	}


</style>
