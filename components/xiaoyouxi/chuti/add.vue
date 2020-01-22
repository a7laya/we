<template>
	<div class="hezuo huodong">
		<!--    预览-->
		<div class="data" style="position: relative;">
			<x-dialog v-model="isShow" class="dialog-backnone">
				<div class="yvlan">
					<x-icon class="cose" type="ios-close" size="30" @click="isShow = false"></x-icon>
					<div v-if="topic.length == 0" style="margin-top: 100px;color: #999;font-size: 16px;">
						还未上传题目，请先上传题目
					</div>
					<div class="libiao" v-for="(data,index) in topic" :key="index" v-else>
						<div class="left">
							<span class="title ell">问题：{{data.problem}}</span>
							<span class="answer1">答案一：<span>{{data.answer_group[0]}}</span></span>
							<span class="answer2">答案二：<span>{{data.answer_group[1]}}</span></span>
						</div>
					</div>
				</div>
			</x-dialog>
		</div>

		<transition name="slide-fade">
			<vue-step v-show="!industry && !business" @onClickBack="remindustry" @onClickNext="addindustry" :url="'/Applets/add_hangyes'" :title="'选择所属行业'"></vue-step>

		</transition>
		<transition name="slide-fade">
			<vue-city v-show="!business && industry" @onClickBack="rembusiness" @onClickNext="addbusiness" :url="'/common/region'" :title="'选择投放城市'"></vue-city>
		</transition>
		<transition name="slide-fade">
			<div v-show="business && industry">
				<x-header :title="'添加题目'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="remupdata" class="header step" :hangye="industry">
					<div slot="right" @click="yvlan" v-show="typeTab === 1">预览题目</div>
				</x-header>
				<div id="tab">
					<tab :line-width=2 active-color='#FF7F00' v-model="tabIndex" custom-bar-width="90px">
						<tab-item class="vux-center" v-for="(item, index) in tabList" @on-item-click="goTab(index+1)" :key="index">{{item}}</tab-item>
					</tab>
				</div>
				<div class="mineRankCenter" v-show="typeTab === 1">
					<div class="gameRankData">
						<div class="tishi1">
							<img src="/static/img/game/shuru.png" alt="">
							<p>请输入简洁明了的问题</p>
						</div>
						<div class="w-textarea">
							<!--<textarea v-model="form.problem" placeholder="填写题干（不超过60个字）" onfocus="this.placeholder=''" @blur="blur1()" maxlength="60" onblur="this.placeholder='填写题干（不超过60个字）'" onchange="this.value=this.value.substring(0, 60)" onkeydown="this.value=this.value.substring(0, 60)" onkeyup="this.value=this.value.substring(0, 60)"></textarea>-->
							<textarea v-model="form.problem" placeholder="填写题干（不超过60个字）" onfocus="this.placeholder=''" @blur="blur1()" maxlength="60" onblur="this.placeholder='填写题干（不超过60个字）'" ></textarea>
							<span style="color: red;font-size: 11px" v-show="flag1">题干不能为空</span>
						</div>
					</div>
					<div class="gameRankData2">
						<div class="tishi1">
							<img src="/static/img/game/wentifankui.png" alt="">
							<p>请输入并最少勾选一项为正确选项</p>
						</div>
						<div class="w-textarea">
							<label style="display: block;overflow: hidden;margin-bottom: 10px">
                <input type="radio" name="type" id="adviceRadio1" value="1" v-model="checkedValue" hidden/>
                <label for="adviceRadio1" class="advice"></label>
							<textarea v-model="answer1" placeholder="请输入选项(最多可输入10个字）" onfocus="this.placeholder=''" onblur="this.placeholder='请输入选项(最多可输入10个字）'" @blur="blur2()" maxlength="10"></textarea>
							<span style="color: red;font-size: 11px;padding-left: 40px" v-show="flag2">选项不能为空</span>
							</label>
							<label style="display: block;overflow: hidden;margin-bottom: 10px">
                <input type="radio" name="type" id="adviceRadio2" value="2" v-model="checkedValue" hidden/>
                <label for="adviceRadio2" class="advice"></label>
							<textarea v-model="answer2" placeholder="请输入选项(最多可输入10个字）" onfocus="this.placeholder=''" onblur="this.placeholder='请输入选项(最多可输入10个字）'" @blur="blur3()" maxlength="10"></textarea>
							<span style="color: red;font-size: 11px;padding-left: 40px" v-show="flag3">选项不能为空</span>
							</label>
						</div>
					</div>
					<div class="gameRankData3">
						<x-button class="jixvUpdate" @click.native="jixvUpdate()">{{title}}</x-button>

						<x-button class="checked" v-if="topic.length >= 5" @click.native="shenhe()">提交审核</x-button>
						<div class="action">
							<span class="tishi">温馨提示：</span>
							<br>
							<span>1.选题请务必与弱电行业知识相关。</span>
							<br>
							<span>2.为了给用户好的体验请选择难易适中的题目。</span>
							<br>
							<span>3.请至少上传五道题以供作答。</span>
						</div>
					</div>
				</div>
				<div id="excel" v-show="typeTab === 2">
					<div class="mineRankCenter">
						<a :href="href" class="down weui-btn" :download="href">下载题库模版</a>
						<div class="up">
							一键上传附件
							<input type="file" @change="upExcel($event)" name="file" accept="xlsx" />
						</div>
					</div>
					<div class="gameRankData3">
						<div class="action">
							<span class="tishi">温馨提示：</span>
							<br>
							<span>1.选题请务必与弱电行业知识相关。</span>
							<br>
							<span>2.为了给用户好的体验请选择难易适中的题目。</span>
							<br>
							<span>3.请至少上传五道题以供作答。</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastText" :position="position"></toast>


		<vue-shareit></vue-shareit>
	</div>
</template>

<script>
	import { XButton, Tab, TabItem, XHeader, XTextarea, Checklist, XDialog, Toast, Confirm, TransferDomDirective as TransferDom } from 'vux'
	import VueStep from '../../component/game/step1'
	import VueCity from '../../component/game/city'
	import VueShareit from '../../component/game/gameShareit'
	import VueFileZip from '../../component/filezip'
	import VueSuspen from '../../component/game/gameSuspen'

	const list = () => ['手机端逐条录入', '电脑端批量导入']
	const defaultListQuery = {
		problem: '',
		answer_group: [],
		answer_num: []
	}
	export default {
		directives: {
			TransferDom
		},
		components: {
			VueStep,
			XHeader,
			XButton,
			XTextarea,
			Checklist,
			XDialog,
			Toast,
			VueShareit,
			VueCity,
			VueFileZip,
			VueSuspen,
			Confirm,
			Tab,
			TabItem,

		},
		data() {
			return {
				imgindex: 0,
				imglist: [],
				industry: null, //行业
				business: null, //业务类型
				addType: null,
				addType2: null,
				imgShow: false,
				moneylist: null,
				colorShow: true,
				checkedValue: 1,
				borderColor: {
					borderColor: '#333'
				},
				form: Object.assign({}, defaultListQuery),
				topic: [], // 组合全部数据
				answer1: '',
				answer2: '',
				answer_num: null,
				show: false,
				isShow: false,
				index: 0,
				title: '题目上传',
				showPositionValue: false,
				toastText: null,
				position: 'middle',
				flag1: false,
				flag2: false,
				flag3: false,
				href: '',
				wordurl: '',
				tabList: list(),
				tabIndex: 0,
				typeTab: 1
			}
		},
		mounted() {
			var _this = this
			_this.$http.post(_this.$store.state.url + '/activityb/new_caver_money', {
				load: true
			}).then(function(res) {
				if(!res) return
				_this.moneylist = res
			})
			_this.href = _this.$store.state.website.website_address + '/static/excel.xlsx'

		},
		watch: {
			index: { // 深度监听，可监听到对象、数组的变化
				handler(val, oldVal) {
					if(val !== 0) {
						this.title = '继续上传'
					}
				},
				deep: true
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		methods: {
			// 判断题库类型是否重复
			addindustry(res) {
				var _this = this
				console.log(res)
				if(res.id) {
					_this.$http.post(_this.$store.state.url + '/Applets/check_sponsor', {
						'load': false,
						'hangye_id': res.id
					}).then((response) => {
						if(typeof response != 'string') {
							this.industry = res.id
						}
					})
				}
			},
			addbusiness(res) {
				let _this = this
				_this.business = res
			},

			remindustry() {
				// this.$router.back(-1)
				this.$router.push('/game/tiku')
			},
			rembusiness() {
				this.industry = null
			},
			remupdata() {
				this.business = null
			},
			blur1() {
				if(this.form.problem == '') {
					this.flag1 = true
				} else {
					this.flag1 = false
				}
			},
			blur2() {
				if(this.answer1 == '') {
					this.flag2 = true
				} else {
					this.flag2 = false
				}
			},
			blur3() {
				if(this.answer2 == '') {
					this.flag3 = true
				} else {
					this.flag3 = false
				}
			},
			jixvUpdate() {

				if(!this.form.problem) {
					msg("题目不能为空");
					return;
				} else if(!this.answer1) {
					msg("答案一不能为空");
					return;
				} else if(!this.answer2) {
					msg("答案二不能为空");
					return;
				}
//				var patrn = /[`~!@#$%^&*()_\-+=<>:"{}|,.\/'\\[\]·~！#%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im; //匹配除汉字，字母，数字，逗号，句号外的特殊字符（
//
//				if(patrn.test(this.form.problem)) { // 如果包含特殊字符返回false
//					msg("不能上传特殊字符")
//					return;
//
//				}
				if(this.form.problem == '') {
					this.flag1 = true
				} else if(this.answer1 == '') {
					this.flag2 = true
				} else if(this.answer2 == '') {
					this.flag3 = true
				} else {
					this.index++
						// 向topic里面添加数据
						this.form.answer_num = this.checkedValue
					this.form.answer_group.push(this.answer1, this.answer2)
					this.topic.push(this.form)
					// toast
					this.showPositionValue = true
					this.toastText = '上传成功'
					// 清除数据
					this.form = Object.assign({}, defaultListQuery)
					this.form.answer_group = []

					this.answer1 = null
					this.answer2 = null
					this.checkedValue = 1
					this.form.answer_num = null
				}
			},
			shenhe() {
				var _this = this
				_this.$http.post(_this.$store.state.url + '/Applets/create_sponsor_topic', {
					'load': false,
					'hangye_id': _this.industry,
					'topic': _this.topic,
					'address': _this.business
				}).then((res) => {
					this.showPositionValue = true
					this.toastText = '上传成功，等待审核'
					_this.$router.push({
						path: '/game/setAds/' + res.sponsor_id,
						query: {
							number: _this.topic.length
						}
					})
					_this.topic = []
				})
			},
			yvlan() {
				this.isShow = true
			},
			upExcel(e) {
				let _this = this
				let file = e.target.files[0]
        console.log(file,2)
        let files = []
          files = file.name.split('.')
        if (files[1] !== 'xls' && files[1] !== 'xlsx') {
                 msg('文件格式错误！');
                 return;
               }
				let param = new FormData() // 创建form对象

				param.append('word', file) // 通过append向form对象添加数据,
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				} // 添加请求头
				this.$store.commit('loadingOFFON', true)
				_this.$http.post(_this.$store.state.url + '/Common/get_document', param, config).then(function(res) {
					if(!res) return
					_this.updateData(res.wordurl)
				})
			},
			updateData(file) {
        // console.log(file)

				var _this = this
				_this.$http.post(_this.$store.state.url + '/Applets/applets_import', {
					'load': false,
					hangye_id: _this.industry,
					address: _this.business,
					file: file
				}).then((res) => {

					if(_this.$store.state.successStatus == true) {
						_this.showPositionValue = true
						_this.toastText = '上传成功，等待审核'
						_this.$router.push({
							path: '/game/setAds/' + res.sponsor_id,
							query: {
								number: res.num
							}
						})
					}

				})
			},
			goTab(i) {
				this.typeTab = i
			}
		}
	}
</script>

<style scoped>
	.hezuo {
		background: #fff;
		min-height: -webkit-fill-available;
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

	.mineRankCenter {
		background: #F2F2F2;
		padding-top: 10px;
	}

	.gameRankData {
		background: #fff;
	}

	.gameRankData .w-textarea {
		width: 345px;
		padding: 20px 15px 15px;
	}

	.gameRankData .w-textarea textarea {
		height: 50px;
		width: 325px;
		background-color: #F7F7F7;
		border: 0;
		padding: 15px 10px 10px;
	}

	.gameRankData .tishi1 {
		padding: 20px 15px 0px;
	}

	.gameRankData .tishi1 img {
		display: inline-block;
		width: 25px;
		height: 21px;
		margin-right: 10px;
	}

	.gameRankData .tishi1 p {
		display: inline-block;
		font-size: 14px;
		color: #333;
		font-weight: bold;
	}

	.gameRankData2 {
		background: #fff;
		margin-top: 10px;
	}

	.gameRankData2 .w-textarea {
		width: 345px;
		padding: 20px 15px 15px;
	}

	.gameRankData2 .w-textarea textarea {
		height: 20px;
		width: 260px;
		background-color: #F7F7F7;
		border: 0;
		padding: 10px 15px 10px;
	}

	.gameRankData2 .tishi1 {
		padding: 20px 15px 0px;
	}

	.gameRankData2 .tishi1 img {
		display: inline-block;
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}

	.gameRankData2 .tishi1 p {
		display: inline-block;
		font-size: 14px;
		color: #333;
		font-weight: bold;
	}

	.weui-cells_radio .weui-cell__ft {
		padding-left: 0;
		width: 24px;
		height: 24px;
		background: #eee;
		border-radius: 50px;
		display: inline-block;
	}

	.advice {
		float: left;
		height: 26px;
		width: 26px;
		border-radius: 50px;
		display: inline-block;
		background-image: url('/static/img/game/uncheck.png');
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center;
		vertical-align: middle;
		margin-top: 6px;
		/*   margin-bottom: 30px;*/
		margin-right: 10px;
	}

	input[type="radio"]:checked+.advice {
		background-image: url('/static/img/game/check.png');
	}

	.gameRankData3 {
		background: #FFFFFF;
		margin-top: 10px;
		padding-top: 24px;
	}

	.jixvUpdate {
		width: 268px;
		margin: 0 auto;
		background: -webkit-linear-gradient(left, #FF7F00, #FFAA01);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #FF7F00, #FFAA01);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #FF7F00, #FFAA01);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FF7F00, #FFAA01);
		/* 标准的语法 */
		color: #FFFFFF;
		border-radius: 50px;
	}

	.checked {
		width: 269px;
		margin: 0 auto;
		color: #FFAA01;
		border: 1px solid #FFAA01;
		border-radius: 50px;
		margin-top: 20px;
	}

	.action {
		height: 92px;
		background: #FFEACE;
		margin-top: 26px;
		padding: 20px 30px;
		color: #976421;
		line-height: 22px;
		margin-bottom: 20px;
	}

	.action .tishi {
		width: 100%;
		height: 92px;
		font-weight: bold;
		margin-top: 26px;
	}

	.cose {
		position: absolute;
		top: 0px;
		right: 0px;
		margin: 6px 6px;
		color: rgba(0, 0, 0, 0.59);
		cursor: pointer;
		font-size: 25px;
		opacity: 0.3;
	}

	.dialog-backnone {
		/*height: 400px;*/
	}

	.yvlan {
		width: 100%;
		background-color: #FFFFFF;
		height: 300px;
		padding-top: 35px;
		overflow: scroll;
    padding-bottom:35px;
	}

	.libiao {
		/* height: 83px; */
		background: #fff;
		margin: 0px auto;
	}

	.weui-btn:after {
		border: 0px;
	}

	.libiao .left {
		/* float: left; */
		margin-top:10px
	}

	.libiao .left .title {
		display: block;
		margin-left: 29px;
		margin-top: 6px;
		color: #333333;
		font-size: 16px;
		text-align: left;
		line-height: 30px;
		white-space: normal
	}

	.libiao .left .answer1,
	.libiao .left .answer2 {
		display: block;
		margin-left: 29px;
		font-size: 13px;
		color: #666666;
		text-align: left
	}

	textarea {
		resize: none
	}

	.vux-cell-box:not(:first-child):before {
		border: 0px;
	}

	.labelclass2 {
		width: 100%;
		overflow: hidden;
	}

	.labelclass2 .ban_title {
		width: 100px;
		margin-left: 10px;
		float: left;
		font-size: 16px;
	}

	.labelclass2 .address {
		width: 150px;
		height: 20px;
		margin-left: 10px;
		float: left;
		border-bottom: 1px solid #D9D9D9;
		font-size: 16px;
		text-align: left;
	}

	.weui-cell_access {
		padding: 0;
		min-height: 0.533333rem;
	}

	.toufang {
		height: 300px;
		background: #FFFFFF;
		padding-top: 20px;
	}

	.toufang h3 {
		font-size: 18px;
		margin-bottom: 50px;
	}

	.toufang button {
		width: 250px;
		border-radius: 50px;
		margin-top: 50px;
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

	.down {
		width: 7.146667rem;
		margin: 0 auto;
		background: -webkit-linear-gradient(left, #FF7F00, #FFAA01);
		background: linear-gradient(to right, #FF7F00, #FFAA01);
		margin-top: 30px;
		color: #FFFFFF;
		border-radius: 1.333333rem;
	}

	.up {
		width: 7.146667rem;
		margin: 16px auto 0;
		background: -webkit-linear-gradient(left, #FF7F00, #FFAA01);
		background: linear-gradient(to right, #FF7F00, #FFAA01);
		color: #FFFFFF;
		border-radius: 1.333333rem;
		line-height: 2.33333333;
		display: block !important;
		font-size: 17px;
		text-align: center;
		position: relative;
	}

	.up input {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.suspen .showsbottom>span {
		font-size: 16px;
	}

	#excel .mineRankCenter {
		background: #FFFFFF;
	}
</style>
