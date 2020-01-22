/** * @Author: feifei * @Date: 2019-06-03 * @Project: hdzg */
<template>
	<div class="container">
		<div ref="vHeader">
			<x-header class="header">
				<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
				<div slot="overwrite-title" class="title" :style="borderColor">领奖台</div>
				<div slot="right" class="chutiRules" @click="isShowRules = true">领奖规则</div>
			</x-header>
			<div class="banner">
				<img src="/static/img/game/jtBanner.gif" alt />
			</div>
		</div>
		<div class="endTime" style="background-image: url(/static/img/timeover.png); background-repeat:no-repeat;" v-if="surplusTime>0">
			<div class="endTime_main_box" v-html="$options.filters.returntime5(surplusTime)"></div>
			<!-- <div class="endTime_main_box">123</div> -->
		</div>
		<vue-game :type="2"></vue-game>
		<div ref="tab">
			<tab :line-width="2" active-color="#FF7F00" v-model="index" custom-bar-width="60px">
				<tab-item class="vux-center" v-for="(item, index) in list2" @on-item-click="go(index+1)" :key="index">{{item}}</tab-item>
			</tab>
		</div>


		<div class="tab-swiper vux-center">
			<div class="index_box">
				<div class="mineRankCenter" v-if="type === 1">
					<ul v-for="(item,index) in list">
						<li class="rank">
							<span v-if="index < 3">
								<img :src="'/static/img/game/' + (index + 1) + '.png'" alt />
							</span>
							<span v-else>{{index+1}}</span>
						</li>
						<li class="detail ell">{{item.name}}</li>
						<li class="count">{{item.num}}名</li>
					</ul>
					<div v-if="is_have == true" class="newsports">新赛期暂时未开启</div>
				</div>

				<div v-if="type === 2">

				<!-- 	<div class="mineRankCenter" v-if="array.length>0">
						<div>
							<h3>
								<span>第1</span>季度获奖名单
							</h3>
							<ul v-for="(item,index) in array">
								<li class="rank">
									<span v-if="index < 3">
										<img :src="'/static/img/game/' + (index + 1) + '.png'" alt />
									</span>
									<span v-else>{{index+1}}</span>
								</li>
								<li class="detail ell">{{item.nickname}}</li>
								<li class="headImg">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" alt />
								</li>
							</ul>
						</div>
					</div> -->


					<div class="mineRankCenter" v-if="oldlist.length>0">
						<div>
							<h3>
								<!--{{index}}年第-->
								<span>上期</span>获奖名单
							</h3>
							<ul v-for="(item,index) in oldlist">
								<li class="rank">
									<span v-if="index < 3">
										<img :src="'/static/img/game/' + (index + 1) + '.png'" alt />
									</span>
									<span v-else>{{index+1}}</span>
								</li>
								<li class="headImg">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" alt />
								</li>
								<li class="detail ell">
								<span class="yincang">{{item.nickname}}</span>
								<span style="display: inline-block;width: 80%;text-align: left;vertical-align: top;margin-left: 5px;">{{item.name}}</span>
								</li>
								
							</ul>
						</div>
					</div>

				<!-- 	<div class="mineRankCenter" v-if="oldlists.length>0">
						<div>
							<h3>
								<span>第3</span>季度获奖名单
							</h3>
							<ul v-for="(item,index) in oldlists">
								<li class="rank">
									<span v-if="index < 3">
										<img :src="'/static/img/game/' + (index + 1) + '.png'" alt />
									</span>
									<span v-else>{{index+1}}</span>
								</li>
								<li class="detail ell">{{item.nickname}}</li>
								<li class="headImg">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" alt />
								</li>
							</ul>
						</div>
					</div> -->

					<!-- <div class="mineRankCenter" v-if="arrlist.length>0">
						<div>
							<h3>
								<span>第4</span>季度获奖名单
							</h3>
							<ul v-for="(item,index) in arrlist">
								<li class="rank">
									<span v-if="index < 3">
										<img :src="'/static/img/game/' + (index + 1) + '.png'" alt />
									</span>
									<span v-else>{{index+1}}</span>
								</li>
								<li class="detail ell">{{item.nickname}}</li>
								<li class="headImg">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" alt />
								</li>
							</ul>
						</div>
					</div> -->
				</div>

				<!--<div class="mineRankCenter" v-if="type === 2" v-for="(item,index) in oldlist">
	          <div v-for="(data,ind) in item">
	            <h3>
	              {{index}}年第
	              <span>{{ind}}</span> 季度获奖名单
	            </h3>
	            <ul v-for="(val,dex) in data">
	              <li class="rank">
	                <span v-if="dex < 3">
	                  <img :src="'/static/img/game/' + (dex + 1) + '.png'" alt />
	                </span>
	                <span v-else>{{dex+1}}</span>
	              </li>
	              <li class="detail ell">{{val.nickname}}</li>
	              <li class="headImg">
	                <img
	                  :src="$store.state.website.website_domain_name + '/uploads/' + val.headimgurl"
	                  alt
	                />
	              </li>
	            </ul>
	          </div>
	          
	        </div>-->
			</div>
		</div>
		<div class="data" style="position: relative;">
			<x-dialog v-model="isShowRules" class="dialog-backnone" :hide-on-blur="true">
				<x-icon class="cose" type="ios-close" size="30" @click="isShowRules = false"></x-icon>
				<div class="toufang">
					<div class="inner">
						<h3 class="title">竞赛介绍</h3>
						<ul class="detail">
							<li>弱电知识竞赛是一款全民H5答题活动，玩家可通过答题方式学习弱电行业专业知识、掌握行业动态信息。还可以赢取某企业赞助发放的实物大奖。同时竞赛活动支持自主上传，发起竞赛题库，获得弱电行业参与者的共鸣，提高企业、品牌、厂商、代理商等在弱电行业内的知名度。</li>
						</ul>
					</div>
					<div class="inner">
						<h3 class="title">领奖规则</h3>
						<ul class="detail">
							<li>
								<p>1、参与知识竞赛的玩家，除领取答题红包以外还有机会获得实物奖品。</p>
								<br />2、答题竞赛排行榜每期产生的前5名将获得实物大奖。
								<br />3、每一期的竞赛周期在“排行榜”封面公布。
								<br />4、每期的奖品详情在领奖台页面内公布。
								<p>5、智汇优库平台将以邮寄的方式，在10天内联系获奖人员寄出奖品。</p>
							</li>
						</ul>
					</div>
				</div>
			</x-dialog>
		</div>

		<vue-shareit></vue-shareit>
	</div>
</template>

<script>
	import {
		XHeader,
		Badge,
		Grid,
		GridItem,
		Tab,
		TabItem,
		Swiper,
		SwiperItem,
		XDialog
	} from "vux";
	import VueShareit from "../../component/game/gameShareit";
	const list = () => ["本期奖品", "获奖名单"];
	// const list = () => ["本季奖品"];
	import {
		VueGame
	} from '../../component/'
	export default {
		components: {
			XHeader,
			Badge,
			Grid,
			GridItem,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			VueShareit,
			XDialog,
			VueGame
		},
		data() {
			return {
				list: null,
				result: null,
				borderColor: {
					borderColor: "#333333"
				},
				index: 0,
				list2: list(),
				type: 1,
				banner_list: [{
					img: "/static/img/game/guanggao.png"
				}],
				isShowRules: false,
				oldlist: '',
				oldlists: '',
				array: '',
				arrlist: '',
				is_info_id: '', //首页传的活动id
				is_have: false, //判断是否有奖品
				surplusTime: 0, //活动剩余时间
			};
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		mounted() {},
		created() {
			if (this.$route.query.is_info_id) {
				this.is_info_id = this.$route.query.is_info_id
			} else {
				this.is_info_id = ''
			}
			this.go(this.type);
			console.log(this.type)
			
		},
		methods: {
			getData(url) {
				var _this = this;
				console.log(_this.is_info_id)
				_this.$http
					.post(this.$store.state.url + url, {
						load: true,
						assist_id: _this.is_info_id
					})
					.then(function(res) {
						if (res == '') {
							_this.is_have = true
							return
						}
						_this.surplusTime = res.assist_info.surplusTime
						_this.list = res.podium_info;
						
						//活动倒计时
						const timer = setInterval(() => {
							_this.surplusTime--
						}, 1000);
						// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
						this.$once('hook:beforeDestroy', () => {
							clearInterval(timer);
						})
						
					});
			},
			go(type) {
				this.type = type;
				if (type === 1) {
					this.getData("/Applets/app_podium");
				} else if (type === 2) {
					//      this.finish("/Applets/podiumList");
					this.$http.post(this.$store.state.url + '/Applets/podiumList', {
						// assist_id: this.is_info_id
					}).then(res => {
						this.oldlist = res
					})
				}
			},
			goBack() {
				// history.go(-1);
				this.$router.push('/game/index')
			},
			// 已发放奖品
			//  finish(url) {
			//    var _this = this;
			//    this.$http
			//      .post(this.$store.state.url + url, {
			//        load: true
			//      })
			//      .then(function(res) {
			//      	console.log(res)
			//        _this.oldlist = res;
			//        _this.oldlist = {
			//          2019: {
			//            1: [
			//              {
			//                id: 1,
			//                award_name: "500G三星固态移动硬盘【价值590元】",
			//                addtime: "1559718550",
			//                year: "2019",
			//                phase: 2,
			//                order: 1,
			//                nickname: "学海",
			//                mem_id: 5,
			//                headimgurl: "headimgurl/15490178715c54230f40add.png"
			//              },
			//              {
			//                id: 2,
			//                award_name: "256G爱国者U盘【价值280元】",
			//                addtime: "1559718550",
			//                year: "2019",
			//                phase: 2,
			//                order: 2,
			//                nickname: "唯美惠品阁（更省）",
			//                mem_id: 831,
			//                headimgurl: "headimgurl/15595586345cf4f9ea64435.png"
			//              },
			//              {
			//                id: 3,
			//                award_name: "天猫精灵【价值108元】",
			//                addtime: "1559718550",
			//                year: "2019",
			//                phase: 3,
			//                order: 3,
			//                nickname: "Grow up",
			//                mem_id: 452,
			//                headimgurl: "headimgurl/15517707985c7e24ae7ffae.png"
			//              },
			//              {
			//                id: 4,
			//                award_name: "惠普无线鼠标",
			//                addtime: "1559718550",
			//                year: "2019",
			//                phase: 2,
			//                order: 4,
			//                nickname: "水晶双鱼",
			//                mem_id: 13,
			//                headimgurl: "headimgurl/15490255135c5440e95e7e1.png"
			//              },
			//              {
			//                id: 5,
			//                award_name: "飞毛腿大容量充电宝【价值58元】",
			//                addtime: "1559718550",
			//                year: "2018",
			//                phase: 2,
			//                order: 5,
			//                nickname: "Arbitrary",
			//                mem_id: 14,
			//                headimgurl: "headimgurl/15490255225c5440f22d5ee.png"
			//              }
			//            ]
			//          }
			//        };
			//      });
			//  }
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
		font-size: 18px;
		text-align: center;
		line-height: 1.066667rem;
	}

	.chutiRules {
		color: #333333;
	}

	.index_box {
		width: 100%;
		/*padding: 10px;*/
		background: #ffffff;
	}

	.mineRankCenter {
		margin: 0 15px;
	}

	.mineRankCenter ul {
		border-bottom: 1px solid #eee;
		overflow: hidden;
		padding: 5px 10px;
		line-height: 28px;
	}
	.mineRankCenter ul li {
		float: left;
		overflow: hidden;
	}

	.mineRankCenter ul .rank {
		margin-right: 10px;
	}

	.mineRankCenter ul span {
		width: 15px;
		display: inline-block;
		text-align: center;
	}

	.mineRankCenter ul .rank img {
		width: 15px;
		float: left;
	}

	.mineRankCenter ul .detail {
		width: 260px;
		float: left;
	}

	.mineRankCenter ul .count {
		float: left;
	}

	.headImg {
		/* float: right; */
		width: 28px;
		border-radius: 50px;
		margin-right: 5px;
	}

	.chutiRules {
		color: #333333;
		font-size: 12px;
	}

	.toufang {
		background: #ffffff;
		height: 400px;
		text-align: left;
		overflow: auto;
	}

	.inner {
		width: 280px;
		margin: 0px auto;
	}

	.inner .title {
		color: #333333;
		font-size: 15px;
		font-weight: bold;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.mineRankCenter h3 {
		text-align: center;
		font-size: 18px;
		line-height: 50px;
	}

	.footer {
		width: 345px;
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
	.newsports {
		font-size: 16px;
		text-align: center;
		padding: 10px 0;
	}
	
	.endTime {
		background-size: 100%;
		position: fixed;
		bottom: 10px;
		left: 16%;
		top: 170px;
		width: 268px;
		height: 80px;
		color: #fff;
		z-index: 11111;
	}
	
	.endTime .endTime_main_box {
		position: absolute;
		top: 1rem;
		left: 2.5rem;
		font-size: 16px;
	}
	
	.endTime .endTime_main_box .bgtime {
		font-size: 28px;
	}
	
	.endTime .endTime_main_box .bgtime::after {
		content: ':';
	}
	
	.endTime .endTime_main_box span:nth-last-child(2)::after {
		opacity: 0;
	}
	
	.endTime .endTime_main_box .shuoming {
		display: inline-block;
		width: 0;
		position: relative;
		top: -23px;
		left: -8px;
	}
	.yincang {
		display: inline-block;
		width: 15%!important;
		
		overflow:hidden; 
		text-overflow:ellipsis; 
		white-space:nowrap; 
	}
</style>
