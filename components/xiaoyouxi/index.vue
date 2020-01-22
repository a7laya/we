/** * @Author: yinger * @Date: 2019-06-24 * @Email: 2997931242@qq.com * @Project: hdzg * 小游戏首页 * user() store
数据微信个人基本信息 * fenxiang() 微信自己定义数据分享 */
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
				<li>
					<div class="left">
						<span v-if="isShareId==true" @click="goChallenge(3)">答题闯关</span>
						<!-- <span v-if="isShareTitle" @click="shareClick()" >{{contentTitle}}</span> -->
						<span v-if="isShareTitle ==true" @click="shareClick()">{{contentTitle}}</span>
						<span>进入行业题库领取现金红包</span>
					</div>
					<div class="right" @click="shareClick()">
						<img src="/static/img/game/dati.png" alt />
					</div>
				</li>
				<li @click="go(1)" v-if="is_info == null">
					<div class="left" >
						<span>排行榜</span>
						<span>排名数据实时更新</span>
					</div>
					<div class="right">
						<img src="/static/img/game/phb.png" alt />
					</div>
				</li>
				<!-- go(num) 里面的num 为10 传活动id过去 -->
				<li @click="go(10)" v-else="is_info">
					<div class="left1">
						<span>排行榜</span>
						<span>{{is_info.title}}</span>
						<span>{{is_info.start_time}}—{{is_info.end_time}}</span>
					</div>
					<div class="right">
						<img src="/static/img/game/phb.png" alt />
					</div>
				</li>
				
				
				
				
				<li @click="go(4)" v-if="isLingjiang">
					<div class="left">
						<span>领奖台</span>
						<span>了解获奖选手及实物奖品</span>
					</div>
					<div class="right">
						<img src="/static/img/game/tiku.png" alt />
					</div>
				</li>
			</ul>
			<div class="mine">
				<div class="mineInner" @click="go(2)">
					<div class="left">
						<div class="top">
							<div class="headerImg">
								<img :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl" alt />
							</div>
							<div class="personlDetail">
								<span class="person_de">{{user.mem_nickname}}</span>
								<!-- <span class="person_de" >初出茅庐初出茅庐初出茅庐</span> -->
								<!-- <br /> -->
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
	import {
		VueGame
	} from '../component/'
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
				shareTitleId: '', //分享页面的题库id
				isShareId: true, //判断是否有分享题库
				isShareTitle: false, //判断是否有分享题库
				contentTitle: '',
				sponsor_id: '', //题库id
				assist_id: '',
				isLingjiang: true, //判断是分享过来的页面，领奖台隐藏
				isPaihang: 0, //判断是否分享过来，不是的话默认为0，是的话为1
				is_info: null, //判断是否有活动，有，就显示时间和标题，没有就正常显示
				is_info_id: '', //活动的id
			};
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		mounted() {
			var _this = this;
			_this.shenglue();
			if (_this.$route.query.shareTitleId) {
				this.getshareData(_this.$route.query.shareTitleId)
				_this.isLingjiang = false
				_this.isShareId = false
				_this.isShareTitle = true
				_this.isPaihang = 1
			} else {
				// _this.isShareId = false
				// _this.isShareTitle = true
			};

		},
		created() {
			this.getData();
		},
		methods: {
			shenglue() {
				var cname = document.getElementsByClassName('person_de')
				console.log('cname')
				console.log(cname[0].innerHTML.length)
				if (cname[0].innerHTML.length > 8) {
					cname[0].innerHTML = cname[0].innerHTML.slice(0, 7) + '...'
				}
			},
			//点击进入题库列表
			shareClick() {
				this.$router.push({
					path: '/game/sharePage?assist_id=' + this.assist_id + '&shareTitleId=' + this.$route.query.shareTitleId,
				})
			},
			//将种子用户id给后台拿取数据
			getshareData(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Applets/get_game_info', {
					load: true,
					seed_id: id
				}).then(function(res) {
					_this.contentTitle = res.title; //分享标题
					// _this.sponsor_id = res.sponsor; //题库id
					_this.assist_id = res.uid; //种子用户id
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
						//获取是否有活动信息
						_this.is_info = res.info;
						//获取活动的id
						_this.is_info_id = res.info.id;
						_this.getstatus();
					});
			},
			go(type) {
				var type = Number(type);
				if (type == 1) {
					if (this.$route.query.shareTitleId) {
						this.$router.push({
							path: '/game/onlypaihang',
							query: {
								id: this.$route.query.shareTitleId,
							}
						})
					} else {
						this.$router.push({
							path: '/game/RankIndex',
							query: {
								id: this.isPaihang,
							}
						})
					}2
				} else if (type == 2) {
					this.$router.push('/game/GameMine');
				} else if (type == 4) {
					if (this.is_info_id) {
						this.$router.push({
							path: '/game/jPing',
							query: {
								is_info_id: this.is_info_id,
							}
						})
					} else {
						this.$router.push('/game/jPing');
					}
				} else if (type == 10) {
					this.$router.push({
						path: '/game/RankIndex',
						query: {
							is_info_id: this.is_info_id,
						}
					})
				}
				// switch(type) {
				// 	case 1:
				// 		url = "/game/RankIndex?id=" + this.isPaihang + '&shareId' + this.$route.query.shareTitleId;
				// 		break;
				// 	case 2:
				// 		url = "/game/GameMine";
				// 		break;
				// 	case 4:
				// 		url = "/game/jPing";
				// 		break;
				// }
				// this.$router.push(url);
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
				if (type == 3 && this.status == 1) {
					if (this.is_hint == 0) {
						this.show1 = true;
					} else {
						this.show1 = false;
						// this.$router.push("/game/exam");
						this.$router.push({
							path: '/game/exam',
							query: {
								is_info_id: this.is_info_id,
							}
						})
					}

				} else if (type == 3 && this.status == 2) {
					// this.$router.push("/game/exam");
					this.$router.push({
						path: '/game/exam',
						query: {
							is_info_id: this.is_info_id,
						}
					})
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
	
	/* ************ */
	
	.block li .left1 {
		float: left;
	}
	
	.block li .left1 span {
		display: block;
		margin-left: 24px;
	}
	
	.block li .left1 span:nth-child(1) {
		margin-top: 10px;
		font-size: 14px;
		color: #333;
		font-weight: bold;
	}
	
	.block li .left1 span:nth-child(4) {
		margin-top: 17px;
		font-size: 13px;
		color: #333;
	}
	
	
	/* ************* */
	
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
		width: 130px;
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
		width: 1.2rem;
		display: block;
		text-align: center;
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
		background: -webkit-linear-gradient(left, #ff7f52, #ff678f);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #ff7f52, #ff678f);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #ff7f52, #ff678f);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #ff7f52, #ff678f);
		/* 标准的语法 */
	}

	.person_de {
		display: inline-block;
		/*    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
	}
</style>
