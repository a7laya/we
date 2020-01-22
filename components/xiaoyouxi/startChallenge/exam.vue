<template>
	<div class="hezuo huodong">
		<transition name="slide-fade">
			<vue-step v-show="!industry && !business" @onClickBack="remindustry" @onClickNext="addindustry" :url="'/Applets/hangyes'"
			 :title="'选择所属行业'" :assistId="specialUidkey"></vue-step>
		</transition>
		<transition name="slide-fade">
			<div class="container" v-for="(item,index) in list.datas" v-show="!business && industry" v-if="questionIndex == index"
			 :key="index">
				<x-header :title="'弱电知识竞赛'" :left-options="{backText:'', preventGoBack:true}" @on-click-back="remupdata" class="header step"
				 :hangye="industry"></x-header>
				<div class="body">
					<img class="bgImg" src="/static/img/game/bg.svg" alt="">
					<p class="examNumber">当前第{{questionIndex + 1}}/{{list.datas.length}}题</p>
					<div class="countdownCon" v-show="myChoose == 0">
						<div class="countdown">{{totalTime}}</div>
					</div>
					<div class="answerRight" v-show="myChoose == 1">
						<div class="answerRightImg">
							<img src="/static/img/game/answerRight.png" alt="">
						</div>
					</div>
					<div class="answerError" v-show="myChoose == 2">
						<div class="answerErrorImg">
							<img src="/static/img/game/answerError.png" alt="">
						</div>
					</div>
					<div class="question">
						<p>问:&nbsp;{{item.problem}}</p>
					</div>
					<div class="answers">
						<ul>
							<li :class="{success:show == 1 && chooseId == 1, error:show == 2 && chooseId == 1}" class="answer1" @click="clickFlag && chooseAnswer(1,item.answer_num)">
								<span>答:&nbsp;{{item.answer_group[0]}}</span>
							</li>
							<li :class="{success:show == 1 && chooseId == 2, error:show == 2 && chooseId == 2}" class="answer2" @click="clickFlag && chooseAnswer(2,item.answer_num)">
								<span>答:&nbsp;{{item.answer_group[1]}}</span>
							</li>
						</ul>
					</div>
					<div class="adImg">
						<img class="userHeader" v-if="user" :src="$store.state.website.website_domain_name + '/uploads/' + list.imgurl[randomData]"
						 alt="">
					</div>
				</div>
			</div>
		</transition>
		<transition name="slide-fade">
			<div class="businesscontainer" v-show="industry && business">
				<x-header class="header">
					<div slot="overwrite-left" class="goBack" style="border-color: #333" @click="goBack()"></div>
					<div slot="overwrite-title" class="title" style="border-color: #333">弱电知识竞赛</div>
				</x-header>
				<div class="mineRankCenter">
					<div class="gameRankData">
						<div class="show">
							<img class="userHeader" v-if="user" :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl"
							 alt="">
							<p class="successTitle">恭喜你{{user.mem_nickname}}，挑战成功!!</p>
							<div class="hongbaoImg">
								<img src="/static/img/game/hongbao.png" alt="">
							</div>
							<p class="tishi">“阁下真是才高八斗，学富五车。”</p>
							<div class="share" @click="showMask()">
								<img src="/static/img/game/share.png" alt="">
								<span>领取红包</span>
							</div>
							<div class="returnIndex">
								<span @click="returnIndex()">返回首页</span>
							</div>
						</div>
					</div>
				</div>

				<vue-red :item="list.red" v-model="isShow" :times="times" :status="status"></vue-red>
			</div>
		</transition>
		<div v-transfer-dom>
			<x-dialog v-model="showDialog" class="errorDialog">
				<div class="img-box">
					<div class="box-header">
						<img src="/static/img/game/left.png" alt="" class="left">
						{{dialogTitle}}
						<img src="/static/img/game/right.png" alt="" class="right"></div>
					<img src="/static/img/game/fight.png" alt="" v-if="!helpFlag">
					<img src="/static/img/game/shareImg.png" alt="" v-else>
					<p class="great" v-if="!helpFlag">别灰心，再接再厉~</p>
					<p class="great" v-else>点击右上角分享，邀请好友 助力答题，他答题，你过关，同时你还可以获取智汇币哦！</p>
					<x-button class="share" @click.native="friendHelp()" v-if="!helpFlag">分享好友助力</x-button>
					<x-button class="again" @click.native="tryAgain()" v-if="!helpFlag">再来一次</x-button>
					<x-button class="returnIndex" @click.native="returnIndex()">返回首页</x-button>
				</div>
			</x-dialog>
		</div>
		<!--<div v-transfer-dom>
      <confirm v-model="tipsShow"
               title="温馨提示"
               @on-hide="onHide"
               :show-cancel-button="false"
      >
        <p style="text-align:center;">您今天的答题次数已用完啦！明天再来吧！</p>
      </confirm>
    </div>-->
		<div v-transfer-dom>
			<x-dialog :show.sync="investMoney" class="investMoney">
				<div class="img-box" style="height:12rem">
					<div style="width:100%;display: flex;justify-content: center;margin-top:0.5rem"><img src="/static/img/zhihui.png"
						 style="height:4rem;width:70%"></div>
					<div class="xian">
						<p>智汇币不足</p>
						<p>赶紧去赚取智汇币吧</p>
					</div>
					<!--<div class="title">

          </div>-->
					<div class="lessMoney">
						<!--分享给好友、朋友圈或关注公众平
            台参与平台互动都可以获得智汇币-->
						<p>获取智汇币的途径：</p>
						<p>1、分享任何页面给好友</p>
						<p>2、分享任何页面到朋友圈、群内</p>
						<p>3、参与平台任何互动任务</p>
						<p>4、充值获取(100智汇币=1元)</p>
					</div>
					<div>
						<x-button @click.native="$router.push('/user/myrecharge')">去充值</x-button>
					</div>
				</div>
				<div @click="investMoney = false">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
		<audio hidden="hidden" ref="audio" src="/static/audio/daojishi.mp3" preload="auto">
		</audio>
		<audio hidden="hidden" ref="audio2" src="/static/audio/dadui.mp3" preload="auto">
		</audio>
		<audio hidden="hidden" ref="audio3" src="/static/audio/fail.mp3" preload="auto">
		</audio>
		<audio hidden="hidden" ref="audio4" src="/static/audio/succeed.mp3" preload="auto">
		</audio>
		<audio hidden="hidden" ref="audio5" src="/static/audio/chaoshi.wav" preload="auto">
		</audio>
		<audio hidden="hidden" ref="audio6" src="/static/audio/jinbi.mp3" preload="auto">
		</audio>
		<help-share :title="shareTitle" :dese="shareDese" :link="shareLink" :imgUrl="shareimgUrl"></help-share>
	</div>

</template>

<script>
	import {
		XButton,
		XHeader,
		XDialog,
		Confirm,
		TransferDomDirective as TransferDom
	} from 'vux'
	import VueStep from '../../component/game/step'
	import HelpShare from '../../component/game/helpShare'
	import VueRed from '../../component/game/hongbao'

	export default {
		data() {
			return {
				industry: null, // 显示 逻辑显示判断
				business: null, // 业务类型  逻辑显示判断
				list: {},
				questionIndex: 0, // 问题索引
				chooseId: 0,
				myChoose: 0, // 选择图片
				totalTime: 15, // 答题开始时间
				show: 0, // 显示对错null，error，success
				showDialog: false, // 展示错误框
				// 弹出框
				dialogTitle: '答题错误',
				isShow: false,
				showData: false,
				// confirm 框
				confirmshow: false,
				times: null, // 通关次数
				status: 1,
				tipsShow: false,
				clickFlag: true,
				randomData: 0,
				investMoney: false,
				helpFlag: null,
				tid: this.guid(),
				shareTitle: null,
				shareDese: null,
				shareLink: null,
				shareimgUrl: null,
				userStatus: 1,
				assistId: null,
				shareFd: null,
				specialUidkey: null,
				is_info_id: '', //首页传的活动id，领取红包接口需要
			}
		},
		directives: {
			TransferDom
		},
		components: {
			VueStep,
			XHeader,
			XButton,
			XDialog,
			Confirm,
			VueRed,
			HelpShare
		},
		mounted() {
			var _this = this
			// setInterval(function(){
			//   _this.num=_this.$store.state.data_list;
			//   console.log('_this.num')
			//   console.log(_this.num)
			// },500)
			if (_this.$route.query.is_info_id) {
				_this.is_info_id = _this.$route.query.is_info_id
			} else {
				_this.is_info_id = ''
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			},

		},
		watch: {},
		beforeCreate() {

		},
		created() {
			var _this = this
			if (!_this.$route.query.sponsor_id && !_this.$route.query.specialUidkey) {
				_this.getThroughNumber()
				_this.fenxiang()
			} else if (!_this.$route.query.sponsor_id && _this.$route.query.specialUidkey) {
				_this.specialUidkey = _this.$route.query.specialUidkey
				_this.getThroughNumber()
				_this.fenxiang()
			} else if (_this.$route.query.sponsor_id) {
				_this.industry = _this.$route.query.sponsor_id
				_this.userStatus = 2
				_this.assistId = _this.$route.query.uidkey
				_this.shareFd = _this.$route.query.fd
				_this.getExamData(_this.industry)

			}
		},
		methods: {
			fenxiang() {
				// type为0助力分享
				var _this = this
				console.log('_this.$route.query.specialUidkey')
				console.log(_this.$route.query.specialUidkey)
				var shareDese = '这道题好难啊！' + this.$store.state.user.mem_nickname + '向你求助！快去帮助Ta吧！助力即可领取红包！'
				var shareimgUrl = '/static/img/game/share.jpg'
				var shareTitle = '弱电知识竞赛-好友助力'
				if (!_this.helpFlag && !_this.$route.query.specialUidkey) {
					_this.shareTitle = '智汇优库-赛事频道'
					_this.shareDese = this.$store.state.user.mem_nickname + '邀您免费挑战弱电行业知识竞赛，领现金红包、冲刺夺冠大奖！'
					_this.shareimgUrl = shareimgUrl
					_this.shareLink = '/game/index?'
				} else if (!_this.helpFlag && _this.$route.query.specialUidkey) {
					_this.shareTitle = '智汇优库-种子分享'
					_this.shareDese = this.$store.state.user.mem_nickname + '邀您免费挑战弱电行业知识竞赛，领现金红包、冲刺夺冠大奖！'
					_this.shareimgUrl = shareimgUrl
					_this.shareLink = '/game/exam?specialUidkey=' + this.$route.query.specialUidkey
				} else if (_this.helpFlag && !_this.$route.query.specialUidkey) {
					_this.shareTitle = shareTitle
					_this.shareDese = shareDese
					_this.shareimgUrl = shareimgUrl
					_this.shareLink = '/game/exam?fd=' + this.tid + '&sponsor_id=' + this.industry
				} else if (_this.helpFlag && _this.$route.query.specialUidkey) {
					_this.shareTitle = shareTitle
					_this.shareDese = shareDese
					_this.shareimgUrl = shareimgUrl
					_this.shareLink = '/game/exam?fd=' + this.tid + '&sponsor_id=' + this.industry + '&specialUidkey=' + this.$route.query
						.specialUidkey
				}
			},
			friendHelp() {
				this.helpFlag = 1
				this.fenxiang()
			},
			guid() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					let r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8)
					return v.toString(16)
				})
			},
			// 答题计时器方法
			timer() {
				let _this = this
				this.timer1 = setInterval(() => {
					_this.totalTime--
					if (this.totalTime > 0) {
						this.$refs.audio.play()
					} else if (this.totalTime <= 0) {
						this.$refs.audio5.play()
						clearInterval(this.timer1)
						this.setTimes(2)
						this.dialogTitle = '答题超时'
						this.showDialog = true
					}
				}, 1000)
			},
			// 清除计时器
			stop() {
				clearInterval(this.timer1)
				clearInterval(this.timerA)
			},
			// 答对跳转计时器
			timer2() {
				let time = 1
				this.timerA = setInterval(() => {
					time--
					if (time <= 0) {
						this.questionIndex++
						this.clickFlag = true
						// 答题成功跳转到领红包页面
						clearInterval(this.timerA)
						if (this.questionIndex >= this.list.datas.length) {
							this.$refs.audio4.play()
							this.business = 1
							this.isShow = false
							this.setTimes(1)
						} else {
							time = 1
							this.totalTime = 15
							this.myChoose = 0
							this.show = 0
							this.timer()
						}
					}
				}, 1000)
			},
			// 设置时间类型
			setTimes(type) {
				var _this = this
				_this.$http.post(_this.$store.state.url + '/Applets/memberGameRecord', {
					'load': false,
					'type': type,
					'status': _this.userStatus,
					'assist_id': _this.assistId,
					'fd': _this.shareFd
				}).then((res) => {})
			},
			addindustry(res) {
				let _this = this
				_this.industry = res.sponId
				_this.getExamData(_this.industry)
			},
			remindustry() {
				this.$router.push('/game/index')
				// this.$router.back(-1)
			},
			remupdata() {
				this.stop()
				this.$router.push('/game/index')
			},
			// 请求题目
			getExamData(id) {
				var _this = this
				console.log('_this.$route.query.sponsor_id')
				console.log(_this.$route.query.sponsor_id)
				console.log(id)
				if (!_this.$route.query.sponsor_id) {
					_this.$http.post(_this.$store.state.url + '/Applets/get_sponsor_topic', {
						'load': false,
						'id': id,
						'type': 1
					}).then((res) => {
						if (res === '智汇币不足') {
							_this.investMoney = true
							_this.industry = null
							_this.business = null
						} else if (res === '我是默认值') {
							_this.industry = null
							_this.business = null
						} else {
							_this.list = res
							_this.randomData = Math.floor(Math.random() * _this.list.imgurl.length)
							_this.timer()
						}
					})
				} else {
					_this.$http.post(_this.$store.state.url + '/Applets/get_assist_topic', {
						'load': false,
						'sponsor_id': _this.$route.query.sponsor_id,
						'assist_id': _this.$route.query.uidkey,
						'fd': _this.$route.query.fd
					}).then((res) => {
						if (res === '智汇币不足') {
							_this.investMoney = true
							_this.industry = null
							_this.business = null
						} else if (res === '我是默认值') {
							_this.industry = null
							_this.business = null
						} else {
							_this.list = res
							_this.randomData = Math.floor(Math.random() * _this.list.imgurl.length)
							_this.timer()
						}
					})
				}
			},
			chooseAnswer(index, answerNumber) {
				let _this = this
				_this.clickFlag = false
				_this.chooseId = index
				clearInterval(_this.timer1)
				if (index == answerNumber) {
					_this.$refs.audio2.play()
					_this.myChoose = 1
					_this.show = 1
					_this.timer2()
				} else {
					_this.$refs.audio3.play()
					_this.setTimes(2)
					_this.myChoose = 2
					_this.show = 2
					_this.dialogTitle = '答题错误'
					_this.showDialog = true
				}
			},
			tryAgain() {
				let _this = this
				_this.stop()
				_this.clickFlag = true
				_this.showDialog = false
				_this.totalTime = 15
				_this.myChoose = 0
				_this.chooseId = 0
				_this.show = 0
				_this.questionIndex = 0
				_this.list = {}
				_this.business = null
				_this.getExamData(_this.industry)
			},
			returnIndex() {
				this.$router.push('/game/index')
			},

			getThroughNumber() {
				var _this = this
				var a = 0
				_this.$http.post(_this.$store.state.url + '/Applets/get_game_info', {
					load: true
				}).then(function(res) {
					_this.times = res.game_num
					_this.status = res.status
					a = _this.status
					if (_this.status == 1) {
						_this.tipsShow = true
					}
					return a
				})
			},
			goBack() {
				this.$router.push('/game/index')
			},
			showMask() {
				var _this = this
				this.showData = true
				_this.$http.post(_this.$store.state.url + '/Applets/sponsor_update_red', {
					load: true,
					id: _this.list.red.red_id,
					status: '1',
					money: _this.list.red.red_money,
					red_act_id: _this.is_info_id
					// red_act_id: 193
				}).then(function(res) {
					_this.isShow = true
					_this.$refs.audio6.play()
					_this.getThroughNumber()
				})
			},
			onHide() {
				this.$router.push('/game/index')
			}
		},
		beforeDestroy() {
			clearInterval(this.timer1)
			clearInterval(this.timerA)
		}
	}
</script>

<style lang="less" scoped>
	.hezuo {
		background: #fff;
		min-height: -webkit-fill-available;
	}

	.container {
		position: relative;
		width: 100%;
		height: 100vh;
		background: url("/static/img/game/answerBg.png");
		-webkit-background-size: cover;
		background-size: cover;
		overflow: hidden;
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

	.examNumber {
		display: block;
		text-align: center;
		font-size: 15px;
		color: #333333;
		font-weight: bold;
		margin-top: 57px;
	}

	.countdownCon,
	.answerRight,
	.answerError {
		margin-top: 15px;
		margin-left: 156px;
	}

	.countdown {
		width: 67px;
		height: 67px;
		border: 5px solid #FED500;
		border-radius: 50px;
		background: #ffffff;
		font-size: 24px;
		text-align: center;
		vertical-align: middle;
		display: table-cell;
	}

	.answerRightImg {
		width: 67px;
		height: 67px;
		border: 5px solid #3CD058;
		border-radius: 50px;
		text-align: center;
		vertical-align: middle;
		display: table-cell;
	}

	.answerRightImg img {
		width: 33px;
		margin: 0px auto;
	}

	.answerErrorImg {
		width: 67px;
		height: 67px;
		border: 5px solid #FD5959;
		border-radius: 50px;
		text-align: center;
		vertical-align: middle;
		display: table-cell;
	}

	.answerErrorImg img {
		width: 33px;
		margin: 0px auto;
	}

	.question {
		padding: 10px 30px 0px;
		font-size: 16px;
		color: #333333;
		text-align: center;
	}

	.answer1,
	.answer2 {
		width: 270px;
		height: 42px;
		background: #fff;
		border-radius: 50px;
		display: table;
		text-align: center;
		margin: 15px auto;
		color: #333333;
	}

	.answer1 span,
	.answer2 span {
		text-align: center;
		font-weight: 400;
		vertical-align: middle;
		display: table-cell;
		font-size: 16px;
	}

	.success {
		background: #3CD058;
		color: #fff;
	}

	.error {
		background: #FD5959;
		color: #fff;
	}

	.errorDialog {
		.weui-dialog {
			border-radius: 8px;
			padding-bottom: 8px;
			width: 247px;
			height: 311px;
		}

		.dialog-title {
			line-height: 30px;
			color: #666;
		}

		.img-box {
			background: #FFFCD8;
			height: 351px;
			/* height:12rem;*/
			overflow: hidden;
			position: relative;
		}

		.box-header {
			width: 100%;
			background: -webkit-linear-gradient(left, #FF7F52, #FF678F);
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(right, #FF7F52, #FF678F);
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(right, #FF7F52, #FF678F);
			/* Firefox 3.6 - 15 */
			background: linear-gradient(to right, #FF7F52, #FF678F);
			/* 标准的语法 */
			color: #FFFFFF;
			font-size: 15px;
			font-weight: bold;
			line-height: 43px;
			box-shadow: 0 0 50px #fff,
				/* outer white */
				0 0 50px #FF7F52,
				/* outer left magenta */
				0 0 50px #FF678F;
			/* outer right cyan */

			.left {
				display: inline-block;
				width: 1.44rem;
				height: 0.426667rem;
				margin: 17px 0px 0px 15px;
				float: left
			}

			.right {
				display: inline-block;
				width: 1.44rem;
				height: 0.426667rem;
				margin: 17px 15px 0px 0px;
				float: right
			}
		}

		.img-box img {
			margin: 10px auto 15px;
			width: 131px;
		}

		.great {
			width: 200px;
			text-align: center;
			color: #666666;
			font-size: 0.32rem;
			font-weight: bold;
			margin: 0px auto;
		}

		.vux-close {
			margin-top: 8px;
			margin-bottom: 8px;
		}

		.again {
			background: -webkit-linear-gradient(left, #FF6F3A, #FFA462);
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(right, #FF6F3A, #FFA462);
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(right, #FF6F3A, #FFA462);
			/* Firefox 3.6 - 15 */
			background: linear-gradient(to right, #FF6F3A, #FFA462);
			/* 标准的语法 */
			display: inline-block;
			width: 180px;
			height: 32px;
			border-radius: 50px;
			color: #fff;
			line-height: 32px;
			font-size: 14px;
			margin-top: 15px;
			box-shadow: 0 0 15px #FF6F3A80;
		}

		.share {
			background: transparent;
			/* Safari 5.1 - 6.0 */
			display: inline-block;
			width: 180px;
			height: 32px;
			border-radius: 50px;
			color: #FF6F3A;
			line-height: 32px;
			font-size: 14px;
			margin-top: 15px;
			border: 1px solid #FF6F3A;
		}

		.returnIndex {
			font-size: 12px;
			color: #FD5959;
			display: inline-block;
			width: 120px;
			background: transparent;
			margin-top: 5px;
		}
	}

	.weui-btn:after {
		border: 0px;
	}

	.adImg img {
		width: 345px;
		height: 120px;
		margin: 2px auto;
		position: fixed;
		bottom: 1px;
		left: 15px;
	}

	//成功之后领取红包设置样式
	.businesscontainer {
		height: 100vh;
		background: #F2F2F2;
	}

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
		display: inline-block;
		width: 323px;
		background: rgba(255, 255, 255, .5);
		margin: 30px 26px;
		padding: 10px 0px;
	}

	.gameRankData .show {
		width: 310px;
		background: #FFFFFF;
		text-align: center;
		margin: 0px auto;
		border-radius: 5px;
		padding-bottom: 10px;
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

	.gameRankData .show .hongbaoImg {
		width: 109px;
		margin: 10px auto;
	}

	.gameRankData .show .tishi {
		margin: 10px auto;
		color: #666;
	}

	.gameRankData .show .share {
		width: 200px;
		position: relative;
		margin: 0px auto;
		color: #666;
	}

	.gameRankData .show .share span {
		position: absolute;
		display: inline-block;
		text-shadow: 0px 0px 5px red;
		color: #FFFFFF;
		left: 50%;
		font-size: 16px;
		/*font-weight: bold;*/
		top: 5px;
		margin-left: -30px;
	}

	.gameRankData .show .returnIndex {
		margin: 10px auto;
		color: #666;
		font-size: 15px;
	}

	.bgImg {
		position: fixed;
		left: 20px;
		width: 20px;
		-webkit-animation: xuanzhuan 3s linear infinite;
	}


	@-webkit-keyframes xuanzhuan {

		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}

	}

	@import '~vux/src/styles/close';

	.investMoney {
		.weui-dialog {
			border-radius: 8px;
			padding-bottom: 8px;
		}

		.dialog-title {
			line-height: 30px;
			color: #666;
		}

		/*.title {
      margin-top: 20px;
    }*/

		.lessMoney {
			width: 220px;
			font-size: 14px;
			margin: 20px auto;
			text-align: left;
		}

		.img-box {
			background: #FFFFFF;
			height: 250px;
			overflow: hidden;
			/*height:12rem;*/
		}

		.vux-close {
			margin-top: 8px;
			margin-bottom: 8px;
		}

		.weui-btn_default {
			background: #FF6F3A;
			color: #fff;
			width: 100px;
		}

		.xian {
			width: 80%;
			margin: 0 auto;
			border-bottom: 1px solid #999;
			margin-top: 10px;
			height: 1.9rem;
			font-size: 18px;
			text-align: center;
		}
	}
</style>
