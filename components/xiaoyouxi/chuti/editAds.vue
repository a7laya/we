<template>
	<div class="container">
		<x-header class="header">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">编辑广告</div>
		</x-header>
		<div class="mineRankCenter">
			<div class="gameRankData">
				<!--        <div class="show">-->
				<!--          <img class="userHeader" v-if="user" :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl" alt="">-->
				<!--          <p class="successTitle">问题提交成功!</p>-->
				<!--          <p class="successNumber">本次共上传<span>{{$store.state.sponsor_id}}道</span>问答题目</p>-->
				<!--        </div>-->
				<div class="ads">
					<p class="adsTitle">编辑广告图<span>用户答题时展示</span></p>
					<div class="imgBlock">
						<div class="input_img">
							<div class="user_up_imgfile">
								<span v-for="(item, index) in imgUrl" :key="index">
                  <img :src="$store.state.url + '/uploads/' + item" alt="" />
                  <span class="userupicon_cal" @click="deletePic(index)" v-show="addect">
                    <x-icon type="ios-close" size="26"></x-icon>
                  </span>
								</span>

								<vue-cropper @data="fileImgarr" :autoCropWidth="345" :autoCropHeight="120" v-show="imgUrl.length < 2">
									<img src="/static/img/icon1.png" alt="" />
								</vue-cropper>
								<div class="tips">
									<p>温馨提示：</p>
									<p>图片大小不超过2M,请真实，合法，健康的表现形式表达广告。涉及色情暴力等 违规信息则不予展示。解释权归平台所有
									</p>
								</div>
							</div>

						</div>
					</div>
				</div>
				<x-button class="addAds" @click.native="addAds()">编辑广告</x-button>
			</div>
		</div>
		<div>
			<!--<confirm v-model="show" title="删除广告图片" theme="android" @on-cancel="onCancel" @on-confirm="onConfirm">
				<p style="text-align:center;">确定是否删除该广告图片？</p>
			</confirm>-->
			<div v-transfer-dom>
				<confirm v-model="show" title="温馨提示" @on-cancel="onCancel" @on-confirm="onConfirm" >
					<p style="text-align:center;">确定删除该广告图片？</p>
				</confirm>
			</div>

		</div>
		<vue-shareit></vue-shareit>
		<toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastText" :position="position"></toast>
	</div>

</template>

<script>
	import { XButton, XHeader, XTextarea, Checklist, Confirm, Toast, TransferDomDirective as TransferDom } from 'vux'
	import { VueCropper } from '../../component'
	import VueShareit from '../../component/game/gameShareit'
	const defaultListQuery = {
		imgUrl: undefined
	}

	export default {
		components: {
			XButton,
			XHeader,
			XTextarea,
			Checklist,
			VueCropper,
			Confirm,
			VueShareit,
			Toast
		},
		directives: {
			TransferDom
		},
		data() {
			return {
				borderColor: {
					borderColor: '#333'
				},
				form: Object.assign({}, defaultListQuery),
				imgUrl: [],
				addect: true,
				show: false,
				suoyin: 0,
				delImg: [],
				showPositionValue: false,
				toastText: '广告图修改成功',
				position: 'middle',
        urls:''
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		created() {
			var _this = this
			_this.$http.post(_this.$store.state.url + '/Applets/get_sponsor_img', {
				load: true,
				id: _this.$route.params.id
			}).then(function(res) {
				_this.imgUrl = res.imgurl
			})
		},
    mounted(){
      
       this.urls = new URL(window.location.href)
    },
		methods: {
			goBack() {
        if(!this.urls.searchParams.get("uidkey")){
          this.$router.push('/game/tiku')
        }else{
            this.$router.go(-1)
        }
				// history.go(-1)
			},
			onCancel() {},
			onConfirm(msg) {
				this.delImg.push(this.imgUrl[this.suoyin])
				this.imgUrl.splice(this.suoyin, 1);
			},
			deletePic(index) {
				this.show = true
				this.suoyin = index
			},
			fileImgarr(res) {
				this.imgUrl.push(res.imgurl)

			},
			addAds() {
				var _this = this;
				if(_this.imgUrl.length < 1) {
					msg("请上传至少一个广告图");
					return;
				}
				_this.$http.post(_this.$store.state.url + '/Applets/sponsor_edit_img', {
					'load': false,
					'id': _this.$route.params.id,
					'imgurl': _this.imgUrl,
					'delimg': _this.delImg
				}).then((res) => {
					_this.showPositionValue = true
					_this.timer = setInterval(() => {
						_this.$router.push('/game/tiku')
					}, 1000)
				})
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
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
		font-size: 18px;
		text-align: center;
		line-height: 1.066667rem;
	}

	.mineRankCenter {
		padding-top: 10px;
	}

	.gameRankData {
		padding-bottom: 30px;
	}

	.gameRankData .show {
		width: 345px;
		background: #FFFFFF;
		text-align: center;
		margin: 30px auto 18px;
		height: 116px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.gameRankData .show .userHeader {
		position: relative;
		top: -20px;
		display: inline-block;
		width: 48px;
		height: 48px;
		border-radius: 50px;
		border: 1px solid #FF8100;
	}

	.gameRankData .show .successTitle {
		position: relative;
		top: -15px;
		font-size: 16px;
		color: #333333;
		font-weight: bold;
	}

	.gameRankData .show .successNumber {
		position: relative;
		top: -10px;
		font-size: 12px;
		color: #333333;
	}

	.ads {
		background: #FFFFFF;
		padding: 20px;
	}

	.ads .adsTitle {
		color: #333333;
		font-weight: bold;
		font-size: 16px;
		margin-bottom: 20px;
	}

	.ads .adsTitle span {
		font-size: 12px;
		font-weight: normal;
		display: inline-block;
		margin-left: 10px;
	}

	.user_up_imgfile {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		/*justify-content: center;*/
		padding: 0 0px 10px 0px;
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

	.tips {
		margin-top: 14px;
		font-size: 12px;
		color: #666666;
	}

	.addAds {
		width: 277px;
		height: 44px;
		margin: 30px auto 0px;
		border-radius: 50px;
		background: -webkit-linear-gradient(left, #FF7F00, #FFAA01);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #FF7F00, #FFAA01);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #FF7F00, #FFAA01);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FF7F00, #FFAA01);
		/* 标准的语法 */
		color: #FFFFFF;
	}

	.weui-btn:after {
		border: 0px;
	}
</style>
