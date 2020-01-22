/** * @Author: yinger * @Date: 2019-06-24 * @Email: 2997931242@qq.com * @Project: hdzg * 小游戏首页 * user() store 数据微信个人基本信息 * fenxiang() 微信自己定义数据分享 */
<template>
	<div class="container">
		<x-header class="header step">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">弱电智能化知识竞赛</div>
		</x-header>
		<div class="body">
			<div class="wtHeader">
				<img src="/static/img/game/banner.png" alt />
				<span class="rules" @click="$router.push('/game/gameRule')">竞赛规则</span>
			</div>
			<ul class="block">
				<li >
					<div class="left" @click="shareClick()" >
						<span>{{contentTitle}}</span>
						<span>进入行业题库领取现金红包</span>
					</div>
					<div class="right">
						<img src="/static/img/game/dati.png" alt />
					</div>
				</li>
				<li @click="go()">
					<div class="left">
						<span>排行榜</span>
						<span>排名数据实时更新</span>
					</div>
					<div class="right">
						<img src="/static/img/game/phb.png" alt />
					</div>
				</li>
			</ul>
			<div class="mine">
				<div class="mineInner" @click="gohome()">
					<div class="left">
						<div class="top">
							<div class="headerImg">
								<img :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl" alt />
							</div>
							<div class="personlDetail">
								<span>{{user.mem_nickname}}</span>
								<br />
								<span class="level">初出茅庐</span>
							</div>
						</div>
						<div class="bottom">
							<div class="kuai">
								<span>通关数</span>
								<br />
								<span class="number">{{this.game_num}}</span>
							</div>
							<div class="kuai">
								<span>智汇币</span>
								<br />
								<span class="number">{{this.money_currency / 100}}</span>
							</div>
						</div>
					</div>
					<div class="right">
						<img src="/static/img/game/indexgo.png" alt />
						<img src="/static/img/game/female.png" alt v-if="user.mem_sex == 0" />
						<img src="/static/img/game/male.png" alt v-if="user.mem_sex == 1" />
						<img src="/static/img/game/baomi.png" alt v-if="user.mem_sex == 2" />
					</div>
				</div>
			</div>
			<!--<alert v-model="show1" :title="title" @on-show="onShow" @on-hide="onHide">{{content1}}</alert>-->
			<div v-transfer-dom>
				<confirm v-model="show1" :title="title" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
					<p style="text-align:center;">{{content}}</p>
					<p style="text-align:center;">{{content1}}</p>
				</confirm>
			</div>
			<vue-game :type="1"></vue-game>
			<vue-shareit></vue-shareit>
		</div>
	</div>
</template>

<script>
	import {
		XHeader,
		AlertModule,
		Alert,
		Confirm,
		TransferDomDirective as TransferDom
	} from "vux";
	import VueShareit from "../component/game/gameShareit";
	import { VueGame } from '../component/'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			Alert,
			VueShareit,
			VueGame,
			Confirm
		},
		data() {
			return {
				list: undefined,
				borderColor: {
					borderColor: "#fff"
				},
				game_num: null,
				money_currency: null,
				status: 1,
				show: false,
				title: '温馨提示',
				content: '小玩怡情，大玩伤身！',
				content1: '如需继续答题，每轮扣除20个智汇。',
				show1: false,
				is_hint: '',
        shareId: '', //分享页面的用户id
        shareTitleId: '',//分享页面的题库id
        isShareTitle: false,//判断是否有分享题库
        contentTitle: '',
        sponsor_id: '', //题库id
        assist_id: '',
        fenxiangshareId: '',
        isTime: '',  //判断活动开始还是未开始
        startTime: '',
			};
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		mounted() {
			var _this = this;
      if (_this.$route.query.shareId) {
        this.getshareData(_this.$route.query.shareId)
        _this.isShareId = false
        _this.isShareTitle = true
        _this.fenxiangshareId = _this.$route.query.shareId
      }

		},
		created() {
			this.getData();
		},
		methods: {
      //点击进入题库列表
      shareClick() {
        this.$router.push({
          path: '/game/onlysharePage?huodong_id=' + this.fenxiangshareId + '&id=' + this.startTime,
        })
      },
      //将活动id传给后台
      getshareData(id) {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Applets/sponsorList', {
          load: true,
          act_id: id
        }).then(function (res) {
          _this.contentTitle = res.title; //分享标题
          //获取活动开始时间，到onlysharePage页面判断活动开始还是未开始
          _this.startTime = res.start_time
        })
      },


			getData() {
				var _this = this;
				_this.$http
					.post(_this.$store.state.url + "/Applets/get_game_info", {
						load: false
					})
					.then(res => {
						_this.game_num = res.game_num;
						_this.money_currency = res.money_currency;
						_this.status = res.status;
						_this.getstatus();
					});
			},
			go() {
				this.$router.push("/game/onlypaihang?id=" + this.fenxiangshareId );
			},
      gohome() {
        this.$router.push("/game/GameMine")
      },
			getstatus() {
				let _this = this;
				_this.$http
					.post(_this.$store.state.url + "/Applets/is_hint", {
						load: false,
						type: 1
					})
					.then(res => {
						_this.is_hint = res.is_hint;
					});
			},
			goChallenge(type) {
				if(type == 3 && this.status == 1) {
					if(this.is_hint == 0) {
						this.show1 = true;
					} else {
						this.show1 = false;
						this.$router.push("/game/exam");
					}

				} else if(type == 3 && this.status == 2) {
					this.$router.push("/game/exam");
				}
			},

			onShow() {

			},
			onHide() {

			},
			onConfirm() {
				let _this = this;
				_this.$http
					.post(_this.$store.state.url + "/Applets/is_hint", {
						load: false,
						type: 2
					})
					.then(res => {
						_this.is_hint = res.is_hint;
						_this.$router.push("/game/exam");
					});
			},
			onCancel() {
				let _this = this;
				_this.$http
					.post(_this.$store.state.url + "/Applets/is_hint", {
						load: false,
						type: 2
					})
					.then(res => {
						_this.is_hint = res.is_hint;

					});
			},
			goBack() {
				this.$router.push("/index");
			},
		}
	};
</script>

<style scoped>
	.vux-header {
		background: transparent;
	}

	.weui-grid {
		padding: 10px;
	}

	.weui-grids:before {
		border-top: 0px;
	}

	.container {
		/* position: fixed; */
		/* top: 0; */
		/* left: 0; */
		/* right: 0; */
		/* bottom: 0; */
		width: 100%;
		/* height: 100vh; */
		/* overflow: scroll; */
		background: url("/static/img/game/indexback.png") no-repeat;
		background-color: #ffebb7;
		-webkit-background-size: 100%;
		background-size: 100%;
		padding-bottom: 15px;
	}

	.wtHeader {
		width: 345px;
		margin: 10px auto;
		position: relative;
		/*box-shadow: 0px 0px 20px rgba(0,0,0,.1);*/
	}

	.wtHeader img {
		border-radius: 10px;
		box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
	}

	.wtHeader .rules {
		position: absolute;
		right: 0px;
		top: 20px;
		padding: 2px 3px 2px 12px;
		background-color: #ffffff;
		color: #e8b367;
		border-bottom-left-radius: 50px;
		border-top-left-radius: 50px;
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
		color: #fff;
	}

	.block {
		width: 100%;
	}

	.block li {
		width: 345px;
		background-color: #ffffff;
		height: 70px;
		border-radius: 5px;
		margin: 12px auto;
		box-shadow: 0px 0px 20px #ff720030;
	}

	.block li .left {
		float: left;
	}

	.block li .left span {
		display: block;
		margin-left: 24px;
	}

	.block li .left span:nth-child(1) {
		margin-top: 17px;
		font-size: 14px;
		color: #333;
		font-weight: bold;
	}

	.block li .left span:nth-child(4) {
		margin-top: 17px;
		font-size: 13px;
		color: #333;
	}

	.block li .right {
		float: right;
		width: 52px;
		height: 52px;
		margin-top: 8px;
		margin-right: 10px;
	}

	.mine {
		width: 100%;
		height: 127px;
	}

	.mineInner {
		width: 345px;
		margin: 15px auto 0px;
		height: 127px;
		background: #fff;
	}

	.mineInner .left {
		float: left;
		width: 200px;
		margin-left: 15px;
		margin-top: 15px;
	}

	.mineInner .left .top {
		width: 100%;
		overflow: hidden;
	}

	.mineInner .left .top .headerImg {
		width: 44px;
		height: 44px;
		float: left;
	}

	.mineInner .left .top .headerImg img {
		width: 44px;
		height: 44px;
		border-radius: 50px;
	}

	.mineInner .left .top .personlDetail {
		/* width: 130px; */
		float: left;
		margin-left: 10px;
		height: 44px;
	}

	.mineInner .left .top .personlDetail span:nth-child(1) {
		font-size: 16px;
		font-weight: bold;
	}

	.mineInner .left .top .personlDetail .level {
		font-size: 10px;
		padding: 2px 4px;
		border-radius: 1px;
		color: #ff9148;
		background: #ffe9d0;
	}

	.mineInner .left .bottom {
		margin-top: 10px;
		overflow: hidden;
	}

	.mineInner .left .bottom .kuai {
		width: 50px;
		margin-right: 10px;
		text-align: center;
		float: left;
	}

	.mineInner .left .bottom .kuai span:nth-child(1) {
		font-size: 12px;
		color: #999;
	}

	.mineInner .left .bottom .kuai .number {
		font-size: 19px;
		color: #333;
	}

	.mineInner .right {
		float: right;
		overflow: hidden;
	}

	.mineInner .right img:nth-child(1) {
		float: right;
		width: 10px;
		margin-top: 55px;
		margin-right: 13px;
	}

	.mineInner .right img:nth-child(2) {
		float: right;
		width: 82px;
		margin-top: 12px;
		margin-right: 20px;
	}

	.weui-dialog__ft {
		background: -webkit-linear-gradient( left, #ff7f52, #ff678f);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient( right, #ff7f52, #ff678f);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient( right, #ff7f52, #ff678f);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #ff7f52, #ff678f);
		/* 标准的语法 */
	}
</style>
