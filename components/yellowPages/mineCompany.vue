/** * @Author: feifei * @Date: 2019-06-24 * @Project: hdzg * user() store 数据微信个人基本信息 * fenxiang() 微信自己定义数据分享 */
<template>
	<div>
		<div ref="vHeader" class="header">
			<x-header>
				<div slot="overwrite-left" class="goBack" @click="goBack()"></div>
				<div slot="overwrite-title" class="title">我的企业</div>
			</x-header>
		</div>
		<div class="outercon">
			<swiper auto ref="swiper" class="swiper" :aspect-ratio="9/16">
				<swiper-item class="black" v-for="(item,index) in companyDetailList.enterprise_imgs" :key="index">
					<img :src="$store.state.website.website_domain_name + '/uploads/' + item.img_url" alt />
				</swiper-item>
			</swiper>
			<div ref="tab" class="comTab" :class="{'is_fixed' : isFixed}">
				<tab :line-width="2" active-color="#FF7F00" v-model="tabIndex" custom-bar-width="85px">
					<tab-item class="vux-center" v-for="(item, index) in tabList" :key="index">
						<span @click="turnValue(item.id)">{{item.name}}</span>
					</tab-item>
				</tab>
			</div>
			<div class="allCon">
				<div class="companyProject companyBlock" id="a1">
					<div class="title">
						<span>企业简介&nbsp;&nbsp;company profile</span>
					</div>
					<div class="companyDetailInner">
						<div class="head">
							<div class="left">
								<img :src="$store.state.website.website_domain_name + '/uploads/' + companyDetailList.logo" alt />
							</div>
							<div class="center ell">
								<div class="top ell">{{companyDetailList.name}}</div>
								<div class="bottom ell">行业：{{companyDetailList.hangye}}</div>
							</div>
						</div>
						<div class="content">
							<img :src="$store.state.website.website_domain_name + '/uploads/' + companyDetailList.enterprise_imgs[0].img_url" alt v-if="companyDetailList.enterprise_imgs" />
							<div class="detail" style="margin-bottom:20px;margin-top:20px" v-html="companyDetailList.details">{{companyDetailList.details}}</div>
							<div class="lianxi">
								<span>联系我们：</span>
								<br />
								<span>电话：{{companyDetailList.phone}}</span>
								<br />
								<span>邮箱：{{companyDetailList.mailbox}}</span>
								<br />
								<span>地址：{{companyDetailList.region}}</span>
							</div>
							<div class="edit" @click="$router.push('/yellowPages/companyEdit?id=' + companyDetailList.id)">编辑</div>
						</div>
					</div>
				</div>
				<div class="companyQuality companyBlock" id="a3" v-if="companyDetailList.length != 0">
					<div class="title">
						<span>企业资质&nbsp;&nbsp;Qualification</span>
						<span @click="$router.push('/yellowPages/addZZ?id=' + companyDetailList.id)">+</span>
					</div>
					<div class="Quality">
						<div class="contentNull" v-if="companyDetailList.enterprise_zizhi.length == 0">您还没有添加企业资质，快去添加吧</div>
						<ul v-else>
							<li v-for="(item, index) in companyDetailList.enterprise_zizhi" :key="index">
								<div class="left shadow">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.img_url" alt />
								</div>
								<div class="center ell">{{item.name}}</div>
							</li>
						</ul>
						<div class="getMore" @click="$router.push('/yellowPages/addzizhi?id=' + companyDetailList.id)">更多...</div>
					</div>
				</div>
				<div class="companyActive companyBlock" ref="a2" id="a2" v-if="companyActiveList.length != 0">
					<div class="title">
						<span>企业动态&nbsp;&nbsp;Entreprise’s news</span>
					</div>
					<div class="hezuo activeBlock">
						<span class="title">众包动态</span>
						<div class="contentNull" v-if="companyActiveList.coop.length == 0">此企业暂无众包内容</div>
						<ul v-else>
							<li v-for="(item, index) in companyActiveList.coop" :key="index" @click="$router.push('/hezuo/details/'+item.id)">
								<div class="left">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.img" alt />
								</div>
								<div class="center">
									<span>{{item.title}}</span>
								</div>
								<div class="right">
									<span v-if="(new Date()).valueOf()/1000 < parseInt(item.starttime)">正在招募</span>
									<span v-else-if="(new Date()).valueOf()/1000 >= parseInt(item.starttime)">招募截止</span>
								</div>
							</li>
						</ul>
						<div class="getMore" @click="links(1)">更多...</div>
					</div>
					<div class="huodong activeBlock">
						<span class="title">活动动态</span>
						<div class="contentNull" v-if="companyActiveList.activity.length == 0">此企业暂无活动内容</div>
						<ul v-else>
							<li v-for="(item, index) in companyActiveList.activity" :key="index" @click="$router.push('/huodong/details/'+item.id)">
								<div class="left">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.img" alt />
								</div>
								<div class="center">
									<span>{{item.title}}</span>
								</div>
								<div class="right">
									<span v-if="(new Date()).valueOf()/1000 - parseInt(item.sign_end_time)<0">正在报名</span>
									<!--<span v-else-if="parseInt(item.end_time) >= (new Date()).valueOf()/1000  >= parseInt(item.start_time)">报名截止</span>-->
									<span v-if="(new Date()).valueOf()/1000 - parseInt(item.sign_end_time)>0&&item.process==2">报名截止</span>
									<span v-if="(new Date()).valueOf()/1000 - parseInt(item.sign_end_time)>0&&item.process==1">已经结束</span>
								</div>
							</li>
						</ul>
						<div class="getMore" @click="links(2)">更多...</div>
					</div>
					<div class="zhibo activeBlock">
						<span class="title">直播动态</span>
						<div class="contentNull" v-if="companyActiveList.live.length == 0">此企业暂无直播内容</div>
						<ul v-else>
							<li v-for="(item, index) in companyActiveList.live" :key="index" @click="$router.push('/zhibo/details/'+item.id)">
								<div class="left">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.img" alt />
								</div>
								<div class="center">
									<span>{{item.title}}</span>
								</div>
								<div class="right">
									<!--<span v-if="(new Date()).valueOf()/1000 < parseInt(item.starttime)">即将开始</span>
                  <span
                    v-else-if="parseInt(item.endtime) >= (new Date()).valueOf()/1000 >= parseInt(item.starttime)"
                  >正在直播</span>
                  <span v-else-if="(new Date()).valueOf()/1000 > parseInt(item.endtime)">直播结束</span>-->
									<span v-if="item.state==1">正在进行</span>
									<span v-if="item.state==2">即将开始</span>
									<span v-if="item.state==3">已经结束</span>
								</div>
							</li>
						</ul>
						<div class="getMore" @click="links(3)">更多...</div>
					</div>
				</div>

				<div class="companyProject companyBlock" id="a4" v-if="companyDetailList.length != 0">
					<div class="title">
						<span>项目案例&nbsp;&nbsp;Project cases</span>
						<span @click="$router.push('/yellowPages/projectAdd?id=' + companyDetailList.id)">+</span>
					</div>
					<div class="Project">
						<div class="contentNull" v-if="companyDetailList.enterprise_project.length == 0">您还没有添加项目案例，快去添加吧</div>
						<ul v-else>
							<li v-for="(item, index) in companyDetailList.enterprise_project" :key="index" @click="$router.push('/yellowPages/projectDetail?id=' + item.project_id)">
								<div class="top">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.img_url" alt />
								</div>
								<div class="bottom ell">
									<span>{{item.name}}</span>
								</div>
							</li>
						</ul>
						<div class="getMore" @click="$router.push('/yellowPages/project?id=' + companyDetailList.id)">更多...</div>
					</div>
				</div>

			</div>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, Tab, TabItem, Swiper, SwiperItem } from "vux";
	import VueShareit from "../component/game/helpShare"
	const list = () => [{
			name: "企业简介",
			id: "a1"
		},
		{
			name: "企业动态",
			id: "a2"
		},
		//{ name: "企业资质", id: "a3" },
		{
			name: "项目案例",
			id: "a4"
		}

	];
	export default {
		name: "index",
		components: {
			Tab, // tab切换组件
			TabItem,
			Swiper, // 轮播图组件
			SwiperItem,
			XHeader, // 头部组件
			VueShareit // 微信分享组件
		},
		data() {
			return {
				tabList: list(), // tab 数据
				companyActiveList: [], // 企业动态数据
				tabIndex: 0, // tab索引，0是第一个数据
				companyDetailList: [], // 企业信息详情
				imgList: [],
        offsetTop: 0,
        isFixed: false,
			};
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: "智汇优库-" + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + "邀您关注弱电智能化互动平台，秒得五十块！",
					imgUrl: "/static/logo.png",
					link: this.$route.path + "?uidkey=" + this.$store.state.mem_id
				};
			}
		},
		mounted() {
      var _this = this;
      window.addEventListener('scroll',this.initHeight);
      $(window).scroll(function() {
          var scrollTop = $(this).scrollTop();
          var scrollHeight = $(document).height();
          var windowHeight = $(this).height();
          if(scrollTop < windowHeight){
              _this.tabIndex = 0
          }
          if(scrollTop >= windowHeight){
              _this.tabIndex = 1
          }
          if(scrollTop + windowHeight > scrollHeight  ){
              _this.tabIndex = 2
          }
      })
		},
		created() {
			this.getCompanyDetail(); //企业基本信息获取
			this.getCompanyList(); //企业动态数据获取
		},
		methods: {
      initHeight () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.isFixed = scrollTop > this.offsetTop ? true : false;
      },
			getCompanyList() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/Homepages/enterprise_dynamic", {
					load: true,
					uid: _this.$store.state.user.mem_id
				}).then(function(res) {
					_this.companyActiveList = res;

				});
			},
			getCompanyDetail() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/Homepages/enterprise_details", {
					load: true,
					id: _this.$route.query.id
				}).then(function(res) {
					_this.companyDetailList = res;
					//        _this.imgList=
				});
			},
			goBack() {
        this.tabIndex = 0;
				// 分享之后根据uidkey判断返回到那一，如果是有uidkey返回到首页，如果没有返回到上一页
				if(this.$route.query.uidkey) {
					this.$router.push("/index");
				} else {
					history.go(-1);
				}
			},
			turnValue(id) {
				// 点击牟点，跳转
        document.getElementById(id).scrollIntoView();
			},
			links(i) {
				this.$router.push("/yellowPages/list/" + i + "/" + this.$store.state.user.mem_id);
			}
		},
    destroyed () {
      window.removeEventListener('scroll', this.initHeight)
    },
	};
</script>

<style scoped>
  .is_fixed{
      position: fixed!important;
      top: 1.2rem!important;
      z-index: 11111;
      width: 100%;

    }
	.header {
		position: fixed;
    z-index: 100;
		/* height: 45px; */
	}
  .vux-slider {
    position: relative;
    /* top: 1.2rem; */
  }
  .outercon {
    padding-top: 1.2rem;
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

	.vux-header .title {
		width: 210px;
		font-size: 16px;
		text-align: center;
		line-height: 1.066667rem;
		color: #fff;
	}

	.shadow {
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	}

	.allCon {
		/* overflow: auto; */
	}

	.companyBlock {
		padding: 18px;
		background: #ffffff;
		margin-bottom: 15px;
		margin-top: 5px;
	}

	.companyBlock .title {
		overflow: hidden;
	}

	.companyBlock .title span:nth-child(1) {
		float: left;
		/* width: 215px; */
		font-size: 15px;
		/* font-weight: bold; */
		border-bottom: 1.5px solid #999;
		color: #999;
		margin-bottom: 10px;
	}

	.companyBlock .title span:nth-child(2) {
		float: right;
		width: 20px;
		height: 20px;
		line-height: 1;
		text-align: center;
		font-size: 18px;
		border: 1px solid #999;
		border-radius: 50px;
		margin-top: 5px;
		color: #999;
	}

	.activeBlock {
		width: 100%;
		border-radius: 3px;
		background: #f5f5f5;
		height: 200px;
		position: relative;
		margin-top: 8px;
	}

	.activeBlock .title {
		font-size: 11px;
		color: #fff;
		background: #5fb5f4;
		border-radius: 10px;
		padding: 2px 10px;
		display: inline-block;
		margin-top: 10px;
		margin-left: 10px;
	}

	.activeBlock ul li {
		overflow: hidden;
		margin: 6px 10px;
		height: 33px;
		background: #ffffff;
		border-radius: 2px;
	}

	.activeBlock ul li .left {
		float: left;
		width: 24px;
		height: 24px;
		margin-left: 5px;
		margin-top: 5px;
	}

	.activeBlock ul li .left img {
		width: 24px;
		height: 24px;
	}

	.activeBlock ul li .center {
		float: left;
		margin-top: 7px;
		font-size: 12px;
		color: #333;
		margin-left: 10px;
	}

	.activeBlock ul li .right {
		float: right;
		margin-top: 7px;
		font-size: 12px;
		color: #333;
		margin-right: 10px;
	}

	.getMore {
		position: absolute;
		bottom: 2px;
		right: 10px;
	}

	.Quality {
		border-radius: 3px;
		background: #f5f5f5;
		/* height: 182px; */
		position: relative;
		margin-top: 8px;
		padding: 10px;
		min-height: 100px;
	}

	.Quality li {
		margin-bottom: 20px;
		overflow: hidden;
	}

	.Quality .left {
		float: left;
		width: 175px;
		height: 95px;
		margin-right: 10px;
	}

	.Quality .center {
		float: left;
		height: 95px;
		margin-right: 20px;
		vertical-align: middle;
		font-size: 16px;
		width: 100px;
	}

	.Quality .center::before {
		content: "";
		height: 100%;
		display: inline-block;
		vertical-align: middle;
	}

	.Project {
		position: relative;
		margin-top: 8px;
		min-height: 100px;
	}

	.Project li {
		margin-bottom: 20px;
		display: block;
		width: 160px;
		display: inline-block;
	}

	.Project li:nth-child(2n) {
		margin-left: 18px;
	}

	.Project li .bottom {
		text-align: center;
		font-size: 14px;
	}

	.companyDetailInner {
		border-radius: 3px;
		background: #f5f5f5;
		/* height: 182px; */
		position: relative;
		margin-top: 8px;
		padding: 10px;
		overflow: hidden;
	}

	.companyDetailInner .head {
		overflow: hidden;
		/* border-bottom:1px solid #999; */
		margin-bottom: 15px;
		padding-bottom: 10px;
	}

	.companyDetailInner .head .left {
		float: left;
		width: 60px;
		height: 60px;
		margin-left: 19px;
		margin-top: 20px;
		border-radius: 50px;
	}

	.companyDetailInner .head .left img {
		border-radius: 50px;
	}

	.companyDetailInner .head .center {
		float: left;
		margin-left: 20px;
		margin-top: 20px;
		width: 200px;
	}

	.companyDetailInner .head .center .top {
		font-size: 16px;
		font-weight: bold;
		color: #333;
	}

	.companyDetailInner .head .center .bottom {
		font-size: 12px;
		color: #333;
		margin-top: 10px;
	}

	.edit {
		color: #5fb5f4;
		float: right;
		font-size: 14px;
		margin-top: 10px;
	}

	.contentNull {
		width: 100%;
		text-align: center;
		line-height: 100px;
	}
</style>
