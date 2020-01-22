/** * @Author: feifei * @Date: 2019-06-24 * @Project: hdzg */
<template>
  <div>
    <div>
      <div ref="vHeader" class="header">
        <!--<x-header>
					<div slot="overwrite-left" class="goBack" @click="goBack()"></div>
					<div slot="overwrite-title" class="title">{{companyDetailList.name}}</div>
				</x-header>-->
        <x-header :left-options="{backText:'',preventGoBack:true}" @on-click-back="fanhui()" class="header">
          <div slot="overwrite-left" class="goBack" @click="goBack()"></div>
          <div class="xj" slot="right" style="width: 8.55rem;margin: 0 auto;">
            <marquee scrollamount="3" style="color: #FFFFFF;width: 80%;margin: 0 auto;font-size: 0.48rem;">{{companyDetailList.name}}</marquee>
          </div>
        </x-header>
      </div>
    </div>
    <div class="outercon">
      <swiper auto class="swiper" :aspect-ratio="9/16">
        <swiper-item class="black" v-for="(item,index) in companyDetailList.enterprise_imgs" :key="index">
          <img :src="$store.state.website.website_domain_name + '/uploads/' + item.img_url" alt />
        </swiper-item>
      </swiper>
      <div style="height:40px">
        <div ref="tab" class="comTab">
          <tab :line-width="2" active-color="#FF7F00" v-model="index" custom-bar-width="85px">
            <tab-item class="vux-center" v-for="(item, index) in list2" :key="index">
              <span @click="turnValue(item.id)">{{item.name}}</span>
            </tab-item>
          </tab>
        </div>
      </div>

      <div class="allCon">
        <div id="a1">
          <div class="companyProject companyBlock" v-if="companyDetailList">
            <div class="title">
              <span>企业简介&nbsp;&nbsp;company profile</span>
              <!-- <span @click="isShow = true">顶</span> -->
              <!--<span @click="isShow = true"><img src="/static/img/anniu.png"></span>-->
            </div>
            <div class="companyDetailInner">
              <div class="head">
                <div class="left">
                  <img :src="$store.state.website.website_domain_name + '/uploads/' + companyDetailList.logo" alt />
                </div>
                <div class="center">
                  <div class="top ell top-ell">{{companyDetailList.name}}</div>
                  <div class="bottom ell">行业：{{companyDetailList.hangye}}</div>
                </div>
              </div>
              <div class="content">
                <img :src="$store.state.website.website_domain_name + '/uploads/' + companyDetailList.enterprise_imgs[0].img_url"
                  alt v-if="companyDetailList.enterprise_imgs" />
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
              </div>
            </div>

          </div>
          <div class="imgMask" v-if="imgFlag" @click="imgFlag = false">
            <img :src="$store.state.website.website_domain_name + '/uploads/' + imgPath" alt />
          </div>
          <div class="companyQuality companyBlock" id="a3" v-if="companyDetailList.enterprise_zizhi">
            <div class="title">
              <span>企业资质&nbsp;&nbsp;Qualification</span>
            </div>
            <div class="Quality">
              <div class="contentNull" v-if="companyDetailList.enterprise_zizhi.length == 0">此企业暂无添加企业资质</div>
              <ul v-else>
                <li v-for="(item, index) in companyDetailList.enterprise_zizhi" :key="index">
                  <div class="left shadow">
                    <img :src="$store.state.website.website_domain_name + '/uploads/' + item.img_url" @click="largeImg(item.img_url)"
                      alt />
                  </div>
                  <div class="center ell">{{item.name}}</div>
                </li>
              </ul>
              <div class="getMore" @click="$router.push('/yellowPages/addzizhi?id=' + companyDetailList.id)">更多...</div>
            </div>
          </div>
        </div>
        <div class="companyActive companyBlock" id="a2" v-if="companyActiveList.length != 0">
          <div class="title">
            <span>企业动态&nbsp;&nbsp;Entreprise’s news</span>

          </div>
          <div class="hezuo activeBlock">
            <span class="title">众包动态</span>
            <div class="contentNull" v-if="companyActiveList.coop.length == 0">此企业暂无众包内容</div>
            <ul v-else>
              <li v-for="(item, index) in companyActiveList.coop" :key="index">
                <div class="left">
                  <img :src="$store.state.website.website_domain_name + '/uploads/' + item.img" alt />
                </div>
                <div class="center">
                  <span>{{item.title}}</span>
                </div>
                <div class="right">
                  <span v-if="(new Date()).valueOf()/1000 < parseInt(item.endtime)">正在招募</span>
                  <span v-else-if="(new Date()).valueOf()/1000 >= parseInt(item.endtime)">已经结束</span>
                </div>
              </li>
            </ul>
            <div class="getMore" @click="links(1)">更多...</div>
          </div>

          <div class="huodong activeBlock">
            <span class="title">活动动态</span>
            <div class="contentNull" v-if="companyActiveList.activity.length == 0">此企业暂无活动内容</div>
            <ul v-else>
              <li v-for="(item, index) in companyActiveList.activity" :key="index">
                <div class="left">
                  <img :src="$store.state.website.website_domain_name + '/uploads/' + item.img" alt />
                </div>
                <div class="center">
                  <span>{{item.title}}</span>
                </div>
                <div class="right">
                  <span v-if="(new Date()).valueOf()/1000 < parseInt(item.sign_end_time)">正在报名</span>
                  <span v-else-if="parseInt(item.end_time) >= (new Date()).valueOf()/1000  >= parseInt(item.start_time)">正在进行</span>
                  <span v-else-if="parseInt(item.end_time) < (new Date()).valueOf()/1000 ">已经结束</span>
                </div>
              </li>
            </ul>
            <div class="getMore" @click="links(2)">更多...</div>
          </div>

          <div class="zhibo activeBlock">
            <span class="title">直播动态</span>
            <div class="contentNull" v-if="companyActiveList.live.length == 0">此企业暂无直播内容</div>
            <ul v-else>
              <li v-for="(item, index) in companyActiveList.live" :key="index">
                <div class="left">
                  <img :src="$store.state.website.website_domain_name + '/uploads/' + item.img" alt />
                </div>
                <div class="center">
                  <span>{{item.title}}</span>
                </div>
                <div class="right">
                  <span v-if="(new Date()).valueOf()/1000 < parseInt(item.starttime)">即将开始</span>
                  <span v-else-if="parseInt(item.endtime) >= (new Date()).valueOf()/1000 >= parseInt(item.starttime)">正在直播</span>
                  <span v-else-if="(new Date()).valueOf()/1000 > parseInt(item.endtime)">直播结束</span>
                </div>
              </li>
            </ul>
            <div class="getMore" @click="links(3)">更多...</div>
          </div>
        </div>

        <div class="companyProject companyBlock" id="a4" v-if="companyDetailList.enterprise_project">
          <div class="title">
            <span>项目案例&nbsp;&nbsp;Project cases</span>
          </div>
          <div class="Project">
            <div class="contentNull" v-if="companyDetailList.enterprise_project.length == 0">此企业暂无添加项目案例</div>
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
        <x-button type="primary" @click.native="claim()">企业认领</x-button>
      </div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="isShow" class="dialog-backnone" hide-on-blur>
        <div class="ding_content">
          <svg @click="isShow = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
            <path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z"
              class="st0" />
          </svg>
          <div class="ding_help">帮助置顶</div>
          <div class="ding_px"></div>
          <div class="des">
            <div>置顶优势</div>
            <div>&nbsp;1. 刷新企业排序至名录最前端；</div>
            <div>&nbsp;2. 同行中提高企业曝光率；</div>
            <div>&nbsp;3. 促进企业合作及平台互动；</div>
            <div>注：置顶一次需消耗10个智汇币</div>
            <div class="ding_bi">-10个智汇币</div>
            <div class="ding-sure" @click="sureDing()">确定置顶</div>
          </div>
        </div>
      </x-dialog>
    </div>
    <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
  import {
    XButton,
    XHeader,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    TransferDom,
    XDialog
  } from "vux";
  import VueShareit from "../component/game/helpShare";
  const list = () => [{
      name: "企业简介",
      id: "a1"
    },
    {
      name: "企业动态",
      id: "a2"
    },
    //		{
    //			name: "企业资质",
    //			id: "a3"
    //		},
    {
      name: "项目案例",
      id: "a4"
    }

  ];
  export default {
    name: "index",
    directives: {
      TransferDom
    },
    components: {
      XButton,
      Tab,
      TabItem,
      Swiper,
      XHeader,
      SwiperItem,
      VueShareit,
      XDialog
    },
    data() {
      return {
        list2: list(),
        companyActiveList: [],
        index: 0,
        companyDetailList: [],
        vHeight: null,
        imgFlag: false,
        imgPath: null,
        isShow: false,

      };
    },

    computed: {
      user() {
        return this.$store.state.user;
      },
      fenxiang() {
        console.log(this.companyDetailList.name)
        return {
          //					title: "智汇优库-" + this.$route.meta.title,
          title: this.companyDetailList.name,
          dese: this.$store.state.user.mem_nickname +
            "邀您关注弱电智能化互动平台，秒得五十块！",
          imgUrl: "/static/logo.png",
          link: this.$route.path +
            "?uidkey=" +
            this.$store.state.mem_id +
            "&uid=" +
            this.$route.query.uid +
            "&id=" +
            this.$route.query.uid
        };
      },

    },
    mounted() {
      var _this = this;
      $('.allCon').scroll(function() {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop < windowHeight) {
          _this.index = 0
        }
        if (scrollTop >= windowHeight) {
          _this.index = 1
        }
        if (scrollTop > scrollHeight + windowHeight) {
          _this.index = 2
        }
      })


      var WH = document.documentElement.clientHeight || document.body.clientHeight;
      var OCH = WH - _this.$refs.vHeader.offsetHeight + "px";
      var ACH = WH - _this.$refs.vHeader.offsetHeight - _this.$refs.tab.offsetHeight + "px";
      $('.outercon').css({
        height: OCH,
        overflow: "auto"
      })
      $('.outercon').scroll(function() {
        let ds = $('.outercon').scrollTop();
        if (ds > 200) {
          $(".swiper").css({
            display: "none"
          });
          $(".allCon").css({
            overflow: "auto",
            height: ACH
          });
          $(".comTab").css({
            height: "40px",
            width: "100%",
          });
        }
        var oldadTop = 0
        $('.allCon').scroll(function() {
          var adTop = $('.allCon').scrollTop()
          var flagData = adTop - oldadTop
          oldadTop = adTop
          if (adTop == 0 && flagData <= 0) {
            $(".swiper").css({
              display: "block"
            });
            $(".allCon").css({
              overflow: "auto",
              height: "auto"
            });
            $(".comTab").css({
              height: "40px",
              width: "100%",
            });
          }
        })
      });
    },
    created() {
      this.getCompanyDetail();
      this.getCompanyList();
      this.getDing();
    },

    methods: {
      fanhui() {
        this.urls = new URL(window.location.href)
        // console.log('aaaa')
        if (this.urls.searchParams.get("uidkey")) {
          this.$router.push('/yellowPages/homePage/#link')
        } else {
          if (this.urls.hash) {
            this.$router.push('/index')
          } else {
            this.$router.go(-1)
          }

        }
      },
      getCompanyList() {
        var _this = this;
        _this.$http
          .post(_this.$store.state.url + "/Homepages/enterprise_dynamic", {
            load: true,
            uid: _this.$route.query.uid
          })
          .then(function(res) {
            _this.companyActiveList = res;
          });
      },
      getCompanyDetail() {
        var _this = this;
        _this.$http
          .post(_this.$store.state.url + "/Homepages/enterprise_details", {
            load: true,
            id: _this.$route.query.id
          })
          .then(function(res) {
            _this.companyDetailList = res;
            console.log(_this.companyDetailList, 1)
          });
      },
      largeImg(imgPath) {
        this.imgPath = imgPath;
        this.imgFlag = true;
      },
      goBack() {
        if (this.$route.query.uidkey) {
          this.$router.push("/index");
        } else {
          history.go(-1);
        }
      },
      turnValue(id) {
        console.log(id)
        document.getElementById(id).scrollIntoView();
      },
      claim() {
        this.$router.push("/yellowPages/companyClaim?id=" + this.$route.query.id);
      },
      getDing() {
        var _this = this;
        _this.$http
          .post(_this.$store.state.url + "/Homepages/paiming", {
            load: true,
            qy_id: _this.$route.query.id
          })
          .then(function(res) {
            _this.pm = res.pm;
          });
      },
      //			sureDing() {
      //				var _this = this;
      //				_this.$http
      //					.post(_this.$store.state.url + "/Homepages/qy_top", {
      //						load: true,
      //						qy_id: _this.$route.query.id
      //					})
      //					.then(function(res) {
      //						msg("置顶成功");
      //						_this.isShow = false;
      //					});
      //			},
      links(i) {
        this.$router.push("/yellowPages/list/" + i + "/" + this.$route.query.uid);
      }
    }
  };
</script>

<style scoped>
  /* 	.header {
  position: fixed;
  z-index: 100;
} */

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
    overflow: auto;
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
    width: 25px;
    height: 25px;
    /* line-height: 20px; */
    text-align: center;
    font-size: 18px;
    /* border: 1px solid rgb(255, 127, 0);
		border-radius: 50px; */
    margin-top: 5px;
    /* color: rgb(255, 127, 0); */
  }

  .companyBlock .title span:nth-child(2) img {
    width: 100%;
    height: 100%;
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
    /* position: absolute;
  bottom: 10px;
  right: 10px; */
    width: 97%;
    text-align: -webkit-right;
    padding-right: 10px;
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
    /* position: relative; */
    margin-top: 8px;
    padding: 10px;
    overflow: hidden;
    margin-bottom: 20px;
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

  .imgMask {
    position: fixed;
    left: 0px;
    bottom: 0px;
    right: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  .imgMask img {
    position: absolute;
    top: 50%;
    margin-top: -100px;
  }

  .ding_content {
    background: url("/static/img/ding.png");
    background-size: 100% 100%;
    width: 90%;
    margin: 0 auto;
    padding: 1.7rem 0.5rem 0.8rem;
    box-sizing: border-box;
    text-align: left;
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

  .ding_bi {
    color: rgba(255, 107, 0, 1);
    text-align: center;
    margin-top: 8px;
    font-size: 15px;
  }

  .ding-sure {
    background: url("/static/img/btn.png");
    background-size: 100% 100%;
    width: 90%;
    padding: 8px;
    box-sizing: border-box;
    color: #ffffff;
    text-align: center;
    font-size: 15px;
    margin-top: 20px;
  }

  .cose {
    position: absolute;
    top: 57px;
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

  .top-ell {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    white-space: pre-wrap;
  }
</style>
