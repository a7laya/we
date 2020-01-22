<template>
	<div class="min">
		<x-header :left-options="{backText: ''}">投票选手征集</x-header>
		<div class="hots">
			<div class="hots-txt">
				专业服务弱电行业&#x3000;&#x3000; 简单高效&#x3000;
				<div class="hots-right">
					<span>hot</span>
				</div>
			</div>
		</div>
		<div class="fire">
			<span>火热征集中 ... ...</span>
		</div>

		<div class="subject">
			<div class="sub">
				<div class="sub-title">&#x3000;{{SolicitationInfo.title}}</div>
				<div class="sub-tu"><img :src="$store.state.website.website_domain_name + '/uploads/' + SolicitationInfo.img "></div>
				<div class="sub-address">
					<span>征集地址</span>&#x3000;&#x3000;&#x3000;
					<span>{{SolicitationInfo.address}}</span>
				</div>
				<div class="sub-address sub-start">
					<span>开始投票</span>&#x3000;&#x3000;
					<span>{{SolicitationInfo.start_time | returntime1}}</span>
				</div>
			</div>
		</div>

		<div v-for="(item,i) in addlist" :key="i">
			<div style="margin:15px 0;border:4px solid #C2C2C2"></div>

			<div class="party">
				<group gutter="0">
					<x-input v-model="addlist[i].title_s" placeholder="输入参加投票选手的名称">
						<div slot="label" class="ban_title">
							<strong>*</strong>
							<span>选手名称：</span>
						</div>
					</x-input>

					<div class="imgBlock">
						<span class="imgTitle"> <strong>* </strong>添加图片：</span>

						<div class="sctp">

							<!--<div v-if="addlist[i].img_s" controls class="vjs-tech sp" style="width= 100%; height=100%; object-fit: fill" id="headvideo" :src="$store.state.website.website_domain_name + '/uploads/' + addlist[i].img_s">
								<img src="../../../static/img/d.png" alt="" class="del" @click="del(i)" />
								<img :src="$store.state.website.website_domain_name + '/uploads/' + addlist[i].img_s" alt />
							</div>-->
							<div v-if="ImgList[i]" controls class="vjs-tech sp" style="width= 100%; height=100%; object-fit: fill" id="headvideo" :src="$store.state.website.website_domain_name + '/uploads/' + ImgList[i]">
								<img src="../../../static/img/d.png" alt="" class="del" @click="del(i)" />
								<img :src="$store.state.website.website_domain_name + '/uploads/' + ImgList[i]" alt="" />
							</div>
							
							<div id="upload" v-if="!ImgList[i]">

								<form enctype="multipart/form-data" method="post" id="upload" style="width:100%;height:100%">
									<img src="../../../static/img/jh.png" alt="" class="tp" />
									<!-- <input  type="file" name="upload" capture="camera" accept="image/*"  > -->
									<input type="file" capture="camera" accept="image/*" id="filetest" name="filetest" @change="doUpload1($event,i)" class="upload1" style="width: 100%; height: 100%;  opacity: 0;position: absolute;top: 0;left: 0;">
								</form>
							</div>
						</div>

						<!--<div class="input_img">
							<div class="user_up_imgfile">
								<span v-for="(item, index) in imgUrl" :key="index">
                <img :src="$store.state.url + '/uploads/' + item" alt />
                <span class="userupicon_cal" @click="removeFimg(index)" v-show="addect">
                  <x-icon type="ios-close" size="30"></x-icon>
                </span>
								</span>
								<vue-cropper2 @data="fileImgarr" :autoCropWidth="225" :autoCropHeight="160" v-show="imgUrl.length<1">
									<img src="/static/img/icon1.png" alt />
								</vue-cropper2>
							</div>
						</div>-->
					</div>
					<!--<x-input v-model="video" placeholder="">
          <div slot="label" class="ban_title">
            <strong>*</strong>
            <span>添加视频：</span>
          </div>
        </x-input>-->

					<x-textarea :max="500" :placeholder="''" v-model="addlist[i].remark_s">
						<div slot="label" class="ban_title">
							<strong>*</strong>
							<span>选手详情:</span>
						</div>
					</x-textarea>

				</group>
			</div>
			<div style="margin:15px 0;border:4px solid #C2C2C2"></div>
		</div>

		<div class="keep">继续添加选手，每个用户最多可投3位选手</div>
		<div class="plus">
			<x-icon type="ios-plus-outline" size="30" @click="addTet"></x-icon>
		</div>
		<div class="submit" @click="submit">
			<p>提交</p>
		</div>
		<vue-foot></vue-foot>

		<div v-transfer-dom>
			<x-dialog v-model="isShow" class="dialog-backnone" hide-on-blur>
				<div class="ding_content">
					<!--<svg @click="isShow = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
						<path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z" class="st0" />
					</svg>-->
					<div class="subject">
						<div class="sub">
							<div class="sub-title">&#x3000;{{SolicitationInfo.title}}</div>
							<div class="sub-tu"><img :src="$store.state.website.website_domain_name + '/uploads/' + SolicitationInfo.img "></div>
							<div class="sub-address">
								<span>征集地址</span>&#x3000;&#x3000;&#x3000;
								<span>{{SolicitationInfo.address}}</span>
							</div>
							<div class="sub-address sub-start">
								<span>开始投票</span>&#x3000;&#x3000;
								<span>{{SolicitationInfo.start_time | returntime1}}</span>
							</div>

							<div class="success">信息提交成功！</div>
							<div class="success">请及时关注投票开启时间</div>
							<div class="success">
								<p @click="fanhui($route.params.id)">返回投票列表</p>
							</div>
						</div>
					</div>
				</div>
			</x-dialog>
		</div>

	</div>
</template>

<script>
	import { XHeader, XInput, Group, XTextarea, TransferDomDirective as TransferDom, XDialog } from 'vux'
	import { VueCropper2, VueFoot, } from '../component'

	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			XInput,
			Group,
			VueCropper2,
			XTextarea,
			VueFoot,
			XDialog,
		},
		data() {
			return {
				//        name:'',
				ImgList:[],
				imgUrl: [],
				SolicitationInfo: '',

				addlist: [{
					title_s: '',
					remark_s: '',
					img_s: '',
				}],

				title: [],
				picture: [],
				detail: [],
				block: [],
				addect: false,
				video: '',
				links: '',
				isShow: false,
				

			}
		},
		mounted() {
			var _this = this
			_this.$http.post(_this.$store.state.url + "/Vote/voteSolicitationInfo", {
				vote_id: _this.$route.params.id,
			}).then(res => {
				_this.SolicitationInfo = res
			})

			//				this.addlist.forEach(v=>{
			//					console.log(v.name)
			//					this.title.push(v.name)
			//					this.picture.push(v.src)
			//					this.detail.push(v.explain)
			//				})
			//				console.log(this.title)
		},
		methods: {
			fileImgarr(res) {
				this.imgUrl.push(res.imgurl);
			},
			submit() {
				var _this = this
				_this.addlist.forEach((v, index, arry) => {
					_this.title.push(v.title_s)
					_this.picture.push(v.img_s)
					_this.detail.push(v.remark_s)
					_this.block = arry
				})
				
				console.log(_this.block)
				_this.addlist.forEach((v, i, arr) => {
					_this.title_s = v.title_s
					_this.img_s = v.img_s
					_this.remark_s = v.remark_s
//					if(!v.title_s) {
//						msg("请输入选手名称");
//						return;
//					}
//					if(!v.img_s) {
//						msg("请拍照上传照片");
//						return;
//					}
//					if(!v.remark_s) {
//						msg("请填写详情内容");
//						return;
//					}
					

				})
				console.log(_this.title_s)
				if(!_this.title_s) {
					msg("请输入选手名称");
					return;
				}
				if(!_this.img_s) {
					msg("请拍照上传照片");
					return;
				}
				if(!_this.remark_s) {
					msg("请填写详情内容");
					return;
				}
				_this.$http.post(_this.$store.state.url + "/Vote/addSolicitation", {
					vote_id: _this.$route.params.id,
					content: _this.block
					}).then(res => {
						console.log(res)
						_this.isShow = true
					})
				
			},

			doUpload1(e, i) {

				var _this = this;
				let file = e.target.files[0]
				let param = new FormData() // 创建form对象
				param.append('img', file) // 通过append向form对象添加数据
				console.log(param)
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				} // 添加请求头
				this.$store.commit('loadingOFFON', true)
				this.isshow = false
				_this.$http.post(_this.$store.state.url + '/index/uploadImgs', param, config).then(function(res) {
					if(!res) return
					console.log(res)
					_this.addlist[i].img_s = res.imgurl;
//					_this.ImgList.push(res.imgurl);
					_this.$set(_this.ImgList,i,res.imgurl)
					console.log(_this.ImgList ,i)
					//					console.log(_this.addlist[i].src)
				})
			},
			//			删除
			del(i) {
				
				var _this = this;
				console.log(_this.ImgList ,i)
				_this.ImgList.splice(i,1)
			},
			
			addTet() {
				this.addlist.push({
					title_s: '',
					remark_s: '',
					img_s: '',
				})
			},
			fanhui(id){
				this.$router.push("/vote/enrolist/" + id)
			},

		},
	}
</script>

<style scoped>
	.min {
		background: #EAEAEA;
	}
	
	.hots {
		width: 100%;
		/*height: 36px;*/
		/* background: rgba(153, 153, 153, 0.2); */
		background: #22BAC0;
		color: #666;
		font-size: 16px;
		text-align: center;
		font-weight: normal;
		/*padding-top: 6px*/
		padding: 10px 0;
		position: relative;
		color: #fff
	}
	
	.hots-right {
		display: inline-block;
		background: url('/static/img/sanjiao.png');
		background-size: 100% 100%;
		position: relative;
		height: 25px;
		width: 40px;
	}
	
	.hots-right span {
		color: #FFFFFF;
		text-align: center;
		display: block;
		position: relative;
		top: -2px;
		font-size: 14px;
	}
	
	.fire {
		padding: 15px 0;
		text-align: center;
		font-size: 16px;
		width: 100%;
		color: #FD142C;
		background: #EAEAEA;
		border-top: 1px solid #E3E3E3
	}
	
	.subject {
		width: 96%;
		margin: 0 auto;
		background: #fff;
		border-radius: 10px;
		padding-bottom: 8px
	}
	
	.sub {
		width: 95%;
		margin: 0 auto;
	}
	
	.sub-title {
		padding: 8px 0;
		width: 100%;
		/* text-align: center; */
		border-bottom: 2px solid #BFBFBF;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
		font-weight: 600;
	}
	
	.sub-tu {
		width: 100%;
		height: 200px;
		/*background: #f00;*/
		margin-top: 8px
	}
	
	.sub-tu img {
		width: 100%;
		height: 100%;
	}
	
	.sub-address {
		margin: 8px 0;
		color: #BFBFBF;
		font-size: 12px
	}
	
	.sub-start {
		color: #D25555
	}
	
	.party {
		/*width:90%;
    margin:0 auto;*/
		width: 100%;
	}
	
	.party .ban_title {
		font-size: 15px;
	}
	/* .party .ban_title>strong {
  	color: red;
  } */
	
	.imgBlock {
		overflow: hidden;
	}
	
	.imgTitle {
		margin-left: 15px;
		float: left;
	}
	
	.input_img,
	.user_up_imgfile {
		display: inline-block;
		width: 225px;
		float: right;
	}
	
	.saveZZ {
		width: 200px;
		margin: 50px auto;
	}
	
	strong {
		color: red;
	}
	
	.keep {
		padding: 10px 0;
		font-size: 14px;
		color: #858585;
		width: 100%;
		text-align: center;
	}
	
	.plus {
		width: 100%;
		text-align: center;
	}
	
	.plus span {
		padding: 8px;
		border: 1px solid #5C5C65;
		font-size: 14px;
		color: #5C5C65
	}
	
	.submit {
		margin: 15px 0;
		display: flex;
		justify-content: center;
	}
	
	.submit p {
		padding: 10px 30px;
		font-size: 14px;
		background: #22BAC0;
		border-radius: 20px;
		color: #fff;
		width: 20%;
		text-align: center;
	}
	
	.sctp {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		box-sizing: border-box;
		/*width: 95%;*/
		width: 65%;
		margin: 30px 0;
		float: right;
		margin-right: 20px;
	}
	
	.sctp div {
		width: 100%;
		height: 180px;
		/*margin: 2%;*/
		position: relative;
	}
	
	.sctp div img {
		width: 100%;
		height: 100%;
	}
	
	.del {
		width: 18px!important;
		height: 18px!important;
		position: absolute;
		right: -10px;
		top: -10px;
	}
	
	.sp {
		width: 70%;
		height: 200px;
	}
	
	.ding_content {
		/* background: url("/static/img/ding.png"); */
		/* background-size: 100% 100%; */
		width: 100%;
		margin: 0 auto;
		padding: 10px 0px;
		box-sizing: border-box;
		text-align: left;
		background: #fff;
	}
	
	.ding_help {
		font-size: 20px;
		font-weight: 600;
		color: #ffffff;
	}
	
	.ding_px {
		margin-bottom: 2rem;
		background: #ffffff;
		color: rgba(255, 119, 72, 1);
		border-radius: 10px;
		width: 3rem;
		text-align: center;
		font-size: 10px;
	}
	
	.des {
		font-size: 10px;
	}
	
	.ding-title,
	.ding_bi {
		/* color: rgba(255, 107, 0, 1); */
		text-align: center;
		margin-top: 8px;
		font-size: 15px;
	}
	
	.ding-title {
		color: #666666
	}
	
	.ding_bi {
		color: #147AFF
	}
	
	.ding-sure {
		background: #FF8000;
		/* background-size: 100% 100%; */
		width: 60%;
		padding: 8px;
		box-sizing: border-box;
		color: #ffffff;
		text-align: center;
		font-size: 15px;
		/* margin-top: 20px; */
		border-radius: 20px;
		margin: 10px auto 0 auto
	}
	
	.cose {
		position: absolute;
		top: -5px;
		right: 9px;
		margin: 0.16rem 0.16rem;
		color: rgba(0, 0, 0, 0.59);
		cursor: pointer;
		font-size: 0.666667rem;
		opacity: 0.3;
	}
	
	button.weui-btn,
	input.weui-btn {
		border-radius: 20px;
		width: 50%;
		margin-bottom: 20px;
	}
	
	.ding-tu {
		position: relative;
		top: 5px;
		left: 50%;
		height: 100px;
		width: 50%;
		margin-left: -25%;
		/* background:#f0f; */
	}
	
	.ding-tu img {
		width: 100%;
		height: 100%;
	}
	
	.success {
		padding: 10px 0;
		width: 100%;
		/*text-align: center;*/
		color: #AF2B2B;
		font-size: 14px;
		display: flex;
		justify-content: center;
	}
	
	.success p {
		width: 35%;
		text-align: center;
		padding: 5px 10px;
		background: #01B0B7;
		color: #fff;
		border-radius: 20px;
	}
</style>