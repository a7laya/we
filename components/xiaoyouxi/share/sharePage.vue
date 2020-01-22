<template>
	<div class="container">
		<x-header class="header step">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">弱电智能化知识竞赛</div>
		</x-header>
		<div class="body">
			<div class="wtHeader">
				<img src="/static/img/game/banner.png" alt="">
				<span class="rules" @click="$router.push('/game/gameRule')">竞赛规则</span>
			</div>
			<ul class="block">
				<li v-for="(item,index) in list[2].list" :key="index" @click="go(item.sponId)">
					<div class="left">
						<!-- <span v-if="$route.query.shareTitleId == 'null'">{{item.name}}知识竞赛</span> -->
						<span>{{item.name}}知识竞赛</span>
						<span>答题闯关领取红包</span>
					</div>
					<div class="right">
						<img src="/static/img/game/dati.png" alt="">
					</div>
				</li>
			</ul>
			<!-- <div class="mine">
        <div class="mineInner" @click="go(2)">
          <div class="left">
            <div class="top">
              <div class="headerImg">
                <img :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl" alt="">
              </div>
              <div class="personlDetail">
                <span>{{user.mem_nickname}}</span>
                <br>
                <span class="level">初出茅庐</span>
              </div>
            </div>
            <div class="bottom">
              <div class="kuai">
                <span>通关数</span>
                <br>
                <span class="number">{{this.game_num}}</span>
              </div>
              <div class="kuai">
                <span>智汇币</span>
                <br>
                <span class="number">{{this.money_currency / 100}}</span>
              </div>
            </div>
          </div> -->
			<!-- <div class="right">
            <img src="/static/img/game/indexgo.png" alt="">
            <img src="/static/img/game/male.png" alt="" v-if="user.mem_sex == 1">
            <img src="/static/img/game/female.png" alt="" v-else-if="user.mem_sex == 2">
          </div> -->
			<!-- </div>
      </div> -->
			<!-- <vue-shareit></vue-shareit> -->
			<help-share :title="fenxiang.shareTitle" :dese="fenxiang.shareDese" :link="fenxiang.shareLink" :imgUrl="fenxiang.shareimgUrl"></help-share>
		</div>
	</div>
</template>

<script>
	import {
		XHeader,
		Badge,
		Grid,
		GridItem,
		AlertModule,
		Alert,
		Confirm,
		TransferDomDirective as TransferDom
	} from 'vux'
	import {
		VueHead
	} from '../../component/'
	// import VueShareit from '../../component/game/gameShareit'
	import HelpShare from "../../component/game/helpShare";
	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			Badge,
			Grid,
			GridItem,
			VueHead,
			Confirm,
			Alert,
			HelpShare,
			// VueShareit
		},
		data() {
			return {
				list: undefined,
				borderColor: {
					borderColor: '#fff'
				},
				game_num: null,
				money_currency: null,
				status: 1,
				show: false,
				list: null,
				contentTitle: '',
				shareTitleId: '',
				sponsor_id: '',
				assist_id: ''
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			},
			fenxiang() {
				return {
					shareTitle: this.contentTitle + "-弱电知识竞赛",
					shareDese: this.$store.state.user.mem_nickname +
						"分享给你Ta的题库！快去答题赢取奖励吧！",
					shareimgUrl: "/static/img/game/share.jpg",
					shareLink: "/game/sharePage?shareTitleId=" + this.shareTitleId + '&assist_id=' + this.assist_id + '&fenurl=' +
						'/game/sharePage' + '&id' +
						this.user.mem_id
				};
			}
		},
		mounted() {
			var _this = this;
			if (!_this.$route.query.assist_id) {
				return

			} else {
				console.log('得到分享的数据！！！')
				_this.shareTitleId = _this.$route.query.shareTitleId //题库id
				_this.assist_id = _this.$route.query.assist_id; //用户id
				_this.getData(_this.shareTitleId, _this.assist_id)
			}
		},
		created() {
			// this.getData()
			// if (this.$route.query.shareTitleId != 'null') {
			//   this.getShareTitle()
			// }
		},
		methods: {
			// getShareTitle(){
			//   var _this = this;
			//   _this.$http.post(_this.$store.state.url + '/Applets/get_share_assist', {
			//     load: true,
			//     id: _this.$route.query.shareTitleId
			//   }).then(function (res) {
			//     _this.contentTitle = res.title;
			//   })
			// },
			getData(shareTitleId, assist_id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Applets/hangyes', {
					load: true,
					assist_id: assist_id,
					shareTitleId: shareTitleId,
				}).then(function(res) {
					if (!res) return;
					for (var i in res[1].list) {
						for (var j in res[2].list) {
							if (res[1].list[i].id === res[2].list[j].hangyeId) {
								res[1].list[i].sponId = res[2].list[j].sponId
							}
						}
					}
					_this.contentTitle = res[2].list[0].name.split('-')[0]
					_this.list = res;
				})
			},
			go(id) {
				this.$router.push('/game/shareExam?id=' + id + '&huodong_id=' + this.shareTitleId)
			},
			goChallenge(type) {},
			goBack() {
				this.$router.push('/index')
			}
		}
	}
</script>

<style scoped>
	.vux-header {
		background: transparent;
	}

	.weui-grid {
		padding: 10px;
	}

	.weui-grids:before {
		border-top: 0px
	}

	.container {
		width: 100%;
		background: url("/static/img/game/indexback.png") no-repeat;
		background-color: #FFebb7;
		-webkit-background-size: 100%;
		background-size: 100%;
		padding-bottom: 15px;
		padding-top: 20px;
	}

	.wtHeader {
		width: 345px;
		margin: 0px auto;
		position: relative;
		/*box-shadow: 0px 0px 20px rgba(0,0,0,.1);*/

	}

	.wtHeader img {
		border-radius: 10px;
		box-shadow: 0px 0px 20px rgba(0, 0, 0, .2);
	}

	.wtHeader .rules {
		position: absolute;
		right: 0px;
		top: 20px;
		padding: 2px 3px 2px 12px;
		background-color: #FFFFFF;
		color: #E8B367;
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
		background-color: #FFFFFF;
		height: 70px;
		border-radius: 5px;
		margin: 12px auto;
		box-shadow: 0px 0px 20px #FF720030;
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
		color: #FF9148;
		background: #FFE9D0;
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
		background: -webkit-linear-gradient(left, #FF7F52, #FF678F);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #FF7F52, #FF678F);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #FF7F52, #FF678F);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FF7F52, #FF678F);
		/* 标准的语法 */
	}
</style>
