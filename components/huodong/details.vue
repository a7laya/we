<template>
	<div class="hezuod">
		<div class="hezuod_box" v-if="item">
			<x-header :title="'活动详情'" :left-options="{backText:'',preventGoBack:true}" class="header step" @on-click-back="fanhui()">
				<div slot="right">
					<vue-header-nav></vue-header-nav>
				</div>
			</x-header>
			<div class="hezuod_box_main">
				<div class="banner">
					<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
				</div>
				<div class="hezuod_title">
					<!--{{item.information}}-->
					<div class="title">{{item.information}}</div>
					<div class="hangye">行业：{{item.industry}}</div>
					<div class="baoming" v-if="memberId!=item.mem_id">已报名<strong style="color: #ea2121;">{{join.length}}</strong>人</div>
				</div>
				<div class="user_img" v-if="join.length != 0&&memberId==item.mem_id">
					<span class="main_user_im" v-for="(item , index) in join" :key="index" v-if="index<3">
						<!--@click="joins(item.mem_id)"-->
						<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" />
					</span>
					<span class="ainuser_num">
						{{join.length}}人发起活动申请 <span style="color: #307ee9;" @click="morePeople()">点击查看更多</span>
					</span>

				</div>
				<router-link :to="'/user/usershow/' + item.mem_id" tag="div" class="hezuod_user">
					<group gutter="0">
						<cell is-link>
							<div class="img" slot="icon">
								<img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" />
							</div>
							<div class="zongnlan" slot="title">
								<div class="name">
									{{item.nickname}}
								</div>
								<vue-pingfen :num="item.score1"></vue-pingfen>
								<div class="gongs_name">
									{{item.company}}
								</div>
							</div>
						</cell>
					</group>
				</router-link>
				<div class="hezuod_neirong">
					<div class="li">
						<span class="xiao">报名截止时间：{{item.orvertime | returntime9}}</span>
					</div>
					<div class="li">
						<span class="xiao" v-if="isDuochang==false">活动时间：{{item.starttime | returntime9}} 至 {{item.endtime | returntime9}}</span>
						<div v-else="isDuochang">
							<span class="xiao">活动时间：</span>
							<div class="moredate" v-for="v in changci_arr">
								<!-- <span @click="moredate(index)" ><strong><i v-if="item.mem_id == user.mem_id&& item.status_houtai!=0" :class="{'is_fix':isFixed == index}" class="xuanzhong"></i>{{item.starttime}}</strong>到<strong>{{item.endtime}}</strong></span> -->
								<span class="morespan" v-if="item.status ==3">
									<strong>
										<i v-if="item.mem_id != me_id || item.status == 0 && v.type == 0" @click="moredate($event,v.id)" :class="{'is_fix':isFixed == true}"
										 class="xuanzhong">
										</i>
										<em></em>
										{{v.starttime}}—{{v.endtime}}
									</strong>
								</span>
								<!-- 判断是否已经报名 -->
								<span class="morespan" v-if="item.status !=3">
									<strong>
										<i v-if="v.status == 1" class="xuanzhong is_fix">
										</i>
										<i v-else-if="v.status == 2" class="xuanzhong">
										</i>
										{{v.starttime}}—{{v.endtime}}
									</strong>
								</span>
							</div>
						</div>
					</div>
					<div class="li">

						<span class="xiao">活动地点：{{item.region}}</span>
					</div>
					<div class="li">

						<span class="xiao" v-if="item.totalmoney">费用：<strong>{{item.totalmoney}}</strong><span>元/人</span></span>
						<span class="xiao" v-else>费用：<strong>免费参加</strong></span>
					</div>
				</div>
				<div class="xiangqing">
					<div class="xiangtitle">
						<strong>活动描述</strong>
					</div>
					<div class="xiangmeirong statement" v-html="item.remarks"></div>
				</div>
			</div>
			<vue-comment-txt ref="commenttxt" :type="2" :id="Number($route.params.id)" v-if="item.status_houtai!=0"></vue-comment-txt>
			<div class="hezuod_b_button" v-if="item.mem_id != user.mem_id && item.status_houtai!=0">
				<div class="hezuo_shouc">
					<vue-collection :id="$route.params.id" :type="2" txtShow="true"></vue-collection>
				</div>
				<div class="hezuo_shouc" @click="onping">
					<i class="iconfont icon-pinglun"></i>
					<span class="txt">评论</span>
				</div>
				<div class="hezuob_zhen_button" v-if="item.status == 3">
					<div class="button_max" v-if="item.totalmoney" @click="free()">报名参加</div>
					<div class="button_max" v-else="" @click="noFree(4)">报名参加</div>
				</div>
				<div class="hezuob_zhen_button" v-if="item.status == 0">
					<div class="button_max" style="background: #9e9e9e;">已参与,等待审核</div>
				</div>

				<div class="hezuob_zhen_button" v-if="item.status == 1">
					<div class="button_max" style="background: #9e9e9e;">报名通过</div>
				</div>
				<div class="hezuob_zhen_button" v-if="item.status == 2">
					<div class="button_max" style="background: #9e9e9e;">已拒绝</div>
				</div>

				<div class="hezuob_zhen_button" v-if="item.status== 4">
					<div class="button_max" style="background: #9e9e9e;">报名已截止</div>
				</div>
				<div class="hezuob_zhen_button" v-if="item.status== 5">
					<div class="button_max" style="background: #9e9e9e;">活动已结束</div>
				</div>
			</div>
			<div class="hezuod_b_button" v-if="item.mem_id == user.mem_id&& item.status_houtai!=0" style="display: flex;justify-content: space-around;">
				<div class="hezuo_shouc">
					<vue-collection :id="$route.params.id" :type="2" txtShow="true"></vue-collection>
				</div>
				<div class="hezuo_shouc" @click="onping">
					<i class="iconfont icon-pinglun" style="width: 22px;height: 19px;"></i>
					<span class="txt">评论</span>
				</div>
				<div class="hezuob_zhen_button" @click="jiezhi()" style="width: 40%;margin-left: 0;" v-if="newTime<item.orvertime&&show1==true">
					<div class="button_max" style="width: 100%;">招募截止</div>
				</div>
				<div class="hezuob_zhen_button" @click="yanzheng()" style="width:40%; margin-left: 0;" v-if="newTime<item.endtime">
					<div class="button_max" style="width: 100%;">活动二维码</div>
				</div>
				<!--<div class="hezuob_zhen_button" @click="tuxian()" style="width:40%; margin-left: 0;" v-if="newTime>item.endtime">
					<div class="button_max" style="width: 100%;">申请提现</div>
				</div>-->
				<div class="hezuob_zhen_button" @click="lookInfo()" style="width:80%; margin-left: 0;" v-if="newTime>item.endtime">
					<div class="button_max" style="width: 100%;">查看参与信息</div>
				</div>
			</div>
		</div>
		<vue-suspen></vue-suspen>
		<vue-shareit v-if="item" :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
		<!--弹窗-->
		<div class="tanchuang" v-if="show" @click="close($event)" @touchmove.prevent>
			<div class="tanchuangcard" ref="msk">
				<div class="flex">
					<div>活动:</div>
					<div class="titlename">{{item.information}}</div>
				</div>
				<div class="flex">
					<div>收费标准:</div>
					<div>
						<span class="xiao red" v-if="item.totalmoney"><strong>￥{{item.totalmoney}}</strong><span></span></span>
						<span class="xiao red" v-else><strong>免费参加</strong></span>
					</div>
				</div>
				<div class="flex">
					<div>收费涵盖:</div>
					<div style="font-size: 13px;">
						<span v-for="(item,index) in carverMoney" v-if="carverMoney.length>0">
							<span v-if="index!=0">/</span>{{item.cover_name}}

						</span>
						<span v-else="">暂无</span>
					</div>
				</div>
				<div class="pay" @click="payType(4)">
					报名参加
				</div>
				<!--<div class="xianchang" @click="payType(4)">
					到场支付
				</div>-->

			</div>
		</div>
		<div v-transfer-dom>
			<!--<confirm v-model="tipsShow" title="温馨提示" @on-hide="onHide" :show-cancel-button="false">
				<p style="text-align:center;">截止活动成功</p>
			</confirm>-->
			<confirm v-model="tipsShow" :close-on-confirm="false" @on-confirm="onConfirm">
				<p style="text-align:center;">你确定要提前截止该活动吗？</p>
			</confirm>
		</div>
	</div>
</template>

<script>
	import {
		XHeader,
		Group,
		Cell,
		Confirm,
		TransferDomDirective as TransferDom
	} from 'vux'
	import {
		VueSuspen,
		VueShareit,
		VuePingfen,
		VueCollection,
		VueCommentTxt,
		VueHeaderNav
	} from '../component'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			VueShareit,
			VueSuspen,
			VuePingfen,
			Group,
			Cell,
			VueCollection,
			VueCommentTxt,
			VueHeaderNav,
			Confirm,

		},
		data() {
			return {
				item: '',
				userlist: [],
				carverMoney: [],
				show: false,
				memberId: '',
				join: '',
				status: '',
				newTime: '',
				money: '',
				money1: '',
				tipsShow: false,
				show1: true,
				is_many: '', //0代表单场，1代表多场
				changci_arr: [],
				isFixed: false,
				data_list: [],
				isDuochang: false, //判断显示多场时间还是单场时间
				me_id: '',
				isFixed1: '1'
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				if (this.item.mem_id == this.$store.state.user.mem_id) {
					return {
						title: this.item.information,
						dese: this.$store.state.user.mem_nickname + '邀您参与活动，关注/分享秒得奖励！',
						imgUrl: '/static/img/hd.jpg',
						link: '/huodong/index'
					}
				} else {
					return {
						title: this.item.information,
						dese: this.$store.state.user.mem_nickname + '邀您关注弱电行业活动，他在智汇优库等您！',
						imgUrl: '/static/img/hd.jpg',
						link: '/huodong/index'
					}
				}

			}
		},
		mounted() {

			var _this = this;
			_this.me_id = _this.$store.state.user;
			_this.memberId = _this.$store.state.token;
			_this.detail();
			_this.joinPeople();
			_this.newTime = (Date.parse(new Date()) / 1000);
			_this.allMoney();
		},
		methods: {
			moredate(e, data) {
				var _this = this;
				if (e.target.className.indexOf("is_fix") == -1) {
					e.target.className = "xuanzhong is_fix"; //切换按钮样式
					_this.data_list.push(data)
				} else {
					e.target.className = "xuanzhong"; //切换按钮样式
					for (var i = 0; i < _this.data_list.length; i++) {
						if (_this.data_list[i] == data.id) {
							_this.data_list.splice(i, 1)
						}
					}
				};
			},
			detail() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/activityb/new_act_detaile', {
					load: true,
					id: _this.$route.params.id,
				}).then((res) => {
					if (!res) return;
					res.wordurl = res.wordurl ? res.wordurl : [];
					_this.item = res;
					_this.me_id = _this.$store.state.user.mem_id
					if (res.next_num) {
						_this.changci_arr = res.next_num;
						_this.isDuochang = true
					}
					_this.carverMoney = res.carver_money;
					_this.is_many = res.is_many;
				})
			},
			onping() {
				this.$refs.commenttxt.onshow({
					type: 1,
					module: 1,
					project_id: this.$route.params.id
				});
			},

			noFree(i) {
				var _this = this;
				if (_this.changci_arr.length > 0) {
					if (_this.data_list.length != 0) {
						_this.$router.push('../moreinfo/' + _this.$route.params.id + '/' + i + '/' + _this.item.totalmoney);
						sessionStorage.setItem('changci_list', _this.data_list)
						console.log('_this.data_list')
						console.log(_this.data_list)
					} else {
						msg('请选择场次时间')
					}
				} else {
					_this.$router.push('../info/' + _this.$route.params.id + '/' + i + '/' + _this.item.totalmoney);
				}



			},
			free() {
				var _this = this;
				//				_this.show = true;
				_this.payType(4)
			},
			//选择支付类型
			payType(i) {
				console.log(i)
				var _this = this;
				// _this.$router.push('../info/' + _this.$route.params.id + '/' + i + '/' + _this.item.totalmoney);
				if (_this.is_many == 1) {
					if (_this.changci_arr) {
						if (_this.data_list.length != 0) {
							_this.$router.push('../moreinfo/' + _this.$route.params.id + '/' + i + '/' + _this.item.totalmoney);
							sessionStorage.setItem('changci_list', _this.data_list)
							console.log('_this.data_list')
							console.log(_this.data_list)
						} else {
							msg('请选择场次时间')
						}

					}
				} else {
					_this.$router.push('../info/' + _this.$route.params.id + '/' + i + '/' + _this.item.totalmoney);
				}


			},
			//关闭弹窗
			close(ev) {
				var _this = this;
				if (!_this.$refs.msk.contains(ev.target)) {
					_this.show = false;
				}
			},
			//入场验证
			yanzheng() {
				var _this = this;
				_this.$router.push('../code/' + _this.$route.params.id);
				//				_this.$router.push('../yanzheng/' + _this.$route.params.id);
			},
			//参与人信息
			joinPeople() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Homecenter/get_cy', {
					load: true,
					act_id: _this.$route.params.id,
				}).then((res) => {
					if (!res) return;
					_this.join = res;
				})
			},
			//			joins(i) {
			//				var _this = this;
			//				_this.$router.push('../../user/usershow/' + i);
			//			},
			morePeople() {
				var _this = this;
				// _this.is_many = 1
				if (_this.is_many == 0) {
					_this.$router.push('../userList/' + _this.$route.params.id + '?m=' + _this.item.totalmoney);
				} else if (_this.is_many == 1) {
					_this.$router.push('../userListmore/' + _this.$route.params.id);
				}

			},
			jiezhi() {
				var _this = this;
				_this.tipsShow = true;
			},
			onConfirm() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Activityb/sign_end_act', {
					load: true,
					act_id: _this.$route.params.id,
				}).then((res) => {
					if (!res) return;
					_this.detail();
					_this.tipsShow = false;
					_this.show1 = false;

				})
			},
			//			tuxian() {
			//				var _this = this;
			//				if(_this.money > 200) {
			//					_this.$router.push('../tixian/' +_this.money);
			//				} else {
			//					msg("您当前的活动所得费用小于200,活动费用将在活动结束3-7天内通过公众号发放");
			//				}
			//
			//			},
			//申请提现
			allMoney() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Activityb/get_act_total', {
					load: true,
					act_id: _this.$route.params.id,
				}).then((res) => {
					if (!res) return;
					_this.money = res.name2;
					_this.money1 = res.name1;
				})
			},
			//查看参与人信息
			lookInfo() {
				var _this = this;
				_this.$router.push('../hesuan/' + _this.money + '/' + _this.money1 + '/' + _this.$route.params.id);
			},
			fanhui() {
				// 获取url
				this.urls = new URL(window.location.href)
				// 判断是否有uidkey 有的话是分享进来的 跳转指定页面
				if (this.urls.searchParams.get("uidkey")) {
					this.$router.push('/huodong/index/#link')
				} else {
					// 是否有锚点 没有锚点返回历史页
					if (this.urls.hash) {
						this.$router.push('/index')
					} else {
						this.$router.go(-1)
					}
				}
			}
		}
	}
</script>

<style>
	.is_fix {
		background: url(../../../static/img/heiseduihao.png) no-repeat 0;
		/* background-position-x: 10px; */
	}

	/*  .noxuanzhong {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    border: 1px solid #666;
    position: relative;
    top: 3px;
    margin: 0 0.4rem 0 0.4rem;
    background: url(../../../static/img/heiseduihao.png) no-repeat 0;
  } */

	.hezuod {
		background: #fff;
		min-height: -webkit-fill-available;
		padding-bottom: 100px;
	}

	.hezuod .hezuod_box_main {}

	.hezuod_box_main .banner {
		width: 345px;
		/*box-shadow: 0 0 0.266667rem 0 #ccc;
		border-radius: 5px;*/
		overflow: hidden;
		margin: 0 auto;
		margin-top: 10px;
	}

	.hezuod .hezuod_title,
	.hezuod .hezuod_neirong,
	.hezuod .xiangqing {
		padding: 0 15px;
		position: relative;
	}

	.hezuod .hezuod_user,
	.hezuod .hezuod_neirong,
	.hezuod .xiangqing,
	.hezuod .user_img {
		border-top: 5px solid #f2f2f2;
	}

	.hezuod .hezuod_title .title {
		font-size: 17px;
		color: #333;
		line-height: 30px;
		margin-top: 15px;
		font-weight: 800;
	}

	.hezuod .hezuod_title .hangye {
		font-size: 14px;
		color: #666;
		margin-bottom: 5px;
	}

	.hezuod_user .img {
		width: 63px;
		height: 63px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10px;
	}

	.hezuod_user .zongnlan .name {
		font-size: 14px;
		color: #333;
	}

	.hezuod_user .zongnlan .gongs_name {
		font-size: 12px;
		color: #666;
	}

	.hezuod_user .zongnlan .pingfen {
		line-height: 15px;
	}

	.hezuod_user .zongnlan .pingfen .icon-xingxing1 {
		margin-right: 2px;
	}

	.hezuod .hezuod_neirong {
		line-height: 55px;
	}

	.hezuod .hezuod_neirong .li {
		/*content: '';
		display: block;
		height: 1px;
		width: 90%;
		margin-left: 10%;
		background: #cccccc;*/
		border-bottom: 1px solid #cccccc;
	}

	.hezuod .hezuod_neirong .li:nth-child(3)::after {
		display: none;
	}

	.hezuod .hezuod_neirong .li .iconfont {
		font-size: 18px;
		color: #d0d0d0;
		display: inline-block;
		vertical-align: middle;
	}

	.hezuod .hezuod_neirong .li .xiao {
		font-size: 14px;
	}

	.hezuod .hezuod_neirong .li .xiao>strong {
		font-weight: 800;
		color: #ea2121;
		margin-right: 10px;
	}

	.hezuod .hezuod_neirong .li .xiao>span {
		font-size: 12px;
	}

	.moredate {
		width: 100%;
		height: auto;
	}

	.morespan {
		display: block;
		font-size: 14px;
	}

	.morespan>strong {
		color: #F88509;
	}

	.xuanzhong {
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		border: 1px solid #666;
		position: relative;
		top: 3px;
		margin: 0 0.4rem 0 0.4rem;
	}

	.xiangqing .xiangtitle>strong {
		font-size: 17px;
		color: #333;
		font-weight: 800;
		line-height: 50px;
	}

	.xiangqing .xiangmeirong {
		color: #666;
		font-size: 14px;
		margin-bottom: 15px;
	}

	.xiangqing .xiangfujian .xiangfu_tit strong {
		font-size: 12px;
		color: #333;
		font-weight: 800;
	}

	.xiangqing .xiangfujian .xiangfu_nei .li {
		display: inline-block;
		text-align: center;
		width: 35px;
		margin-top: 15px;
		margin-left: 10px;
	}

	.xiangqing .xiangfujian .xiangfu_nei .li>span {
		font-size: 12px;
		color: #34a2ff;
	}

	.hezuod .hezuod_b_button {
		position: fixed;
		bottom: 0;
		width: 100%;
		box-shadow: 0 0 10px 0 #999;
		background: #fff;
		padding: 5px 0;
	}

	.hezuod .hezuod_b_button .button_max {
		width: 260px;
		line-height: 34px;
		font-size: 18px;
		background: linear-gradient(to right, #03E1EC, #06E7C7);
	}

	.hezuod .hezuod_b_button .hezuo_shouc {
		display: inline-block;
		margin-left: 15px;
		vertical-align: middle;
		text-align: center;
	}
	.hezuod .hezuod_b_button .hezuo_shouc>i {
		font-size: 22px;
		line-height: 22px;
		color: #9c9c9c;
	}

	.hezuod .hezuod_b_button .hezuo_shouc>span.txt {
		font-size: 12px;
		line-height: 14px;
		display: block;
		color: #9c9c9c;
	}

	.hezuod .hezuod_b_button .hezuob_zhen_button {
		display: inline-block;
		vertical-align: middle;
		margin-left: 5px;
	}

	.hezuod .user_img {
		padding: 0 15px;
		background: #f2f2f2;
	}

	.hezuod .user_img .main_user_im {
		display: inline-block;
		width: 34px;
		height: 34px;
		overflow: hidden;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 3px;
	}

	.hezuod .user_img .ainuser_num {
		font-size: 12px;
		color: #999;
	}

	.tanchuang {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		background: rgba(153, 153, 153, 0.8);
	}

	.tanchuangcard {
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0.5rem;
	}

	.flex {
		display: flex;
		align-items: center;
		font-size: 16px;
		margin-bottom: 15px;
		position: relative;
	}

	.pay {
		background: linear-gradient(90deg, rgba(3, 225, 236, 1), rgba(6, 231, 199, 1));
		border-radius: 6px;
		text-align: center;
		color: #FFFFFF;
		font-size: 15px;
		padding: 0.2rem 0;
		margin-top: 30px;
	}

	.flex>div:nth-child(1) {
		margin-right: 10px;
	}

	.titlename {
		background: #04E3E0;
		color: #FFFFFF;
		font-size: 14px;
		padding: 5px 25px;
	}

	.titlename:before,
	.titlename:after {
		content: ' ';
		width: 16px;
		height: 16px;
		border-radius: 8px;
		background-color: #FFFFFF;
		position: absolute;
	}

	.titlename:before {
		top: 8px;
		left: 39px;
	}

	.titlename:after {
		top: 8px;
		right: 25px;
		;
	}

	.xianchang {
		text-align: center;
		font-size: 14px;
		margin-top: 10px;
	}

	.red {
		color: #E23737;
	}

	.weui-cells:before,
	.weui-cells:after {
		content: none !important;
	}

	.baoming {
		position: absolute;
		right: 10px;
		top: 58%;
	}

	.header-nav-icon {
		color: #1e79ea !important;
	}
</style>
