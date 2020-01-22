<template>
  <div class="hezuod">
    <div class="hezuod_box" v-if="item">
      <x-header :title="'众包需求详情'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="fanhui()" class="header step">
        <div slot="right">
          <vue-header-nav></vue-header-nav>
        </div>
      </x-header>
      <div class="hezuod_box_main">
        <div class="banner">
          <img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
        </div>
        <div class="hezuod_title" style="position: relative;">
          <div class="title" v-if="item.ztitle">{{item.ztitle}}</div>
          <div class="hangye">行业：{{item.industry}}</div>
          <div class="baoming" v-if="memberId!=item.mem_id"> 已报名<strong style="color: #ea2121;">{{userlist.length}}</strong>人</div>

        </div>
        <div class="user_img" v-if="userlist.length != 0&&memberId==item.mem_id">
          <span class="main_user_im" v-for="(item , index) in userlist" :key="index" v-if="index<3">
            <img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" />
          </span>
          <!--<span class="ainuser_num">
                		人发起合作申请
                	</span>-->
          <span class="ainuser_num">
            {{userlist.length}}人发起参与申请 <span style="color: #307ee9;" @click="morePeople()">点击查看更多</span>
          </span>
        </div>

        <!---->
        <router-link tag="div" class="hezuod_user" :to="'/user/usershow/' + item.mem_id">
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
            <!--<i class="iconfont icon-hours"></i>-->
            <span class="xiao">招募截止时间：{{item.endtime | returntime9}}</span>
          </div>
          <div class="li">
            <!--<i class="iconfont icon-dingwei"></i>-->
            <span class="xiao">区域：{{item.region}}</span>
          </div>
          <div class="li" v-if="item.budget.length<5">
            <!--<i class="iconfont icon-caifuhover"></i>-->
            <span class="xiao">预算：<strong>{{item.budget}}</strong><span>元</span></span>
          </div>
          <div class="li" v-else="">
            <!--<i class="iconfont icon-caifuhover"></i>-->
            <span class="xiao">预算：<strong>{{item.budget/10000}}</strong><span>万</span></span>
          </div>
        </div>
        <div class="xiangqing">
          <div class="xiangtitle">
            <strong>需求描述</strong>
          </div>
          <div class="xiangmeirong">
            {{item.remarks}}
          </div>
          <div class="xiangfujian" v-if="item.wordurl.length != 0">
            <div class="xiangfu_tit">
              <strong>相关附件</strong>
            </div>
            <div class="xiangfu_nei">
              <a :href="$store.state.website.website_domain_name + '/words/' + item" class="li" v-for="item in item.wordurl">
                <img src="/static/img/icon4.png" />
                <span>下载</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <vue-comment-txt ref="commenttxt" :type="1" :id="Number($route.params.id)" v-if="item.status_houtai!=0"></vue-comment-txt>
      <div class="hezuod_b_button" v-if="item.mem_id != user.mem_id&&item.status_houtai!=0">
        <div class="hezuo_shouc">
          <vue-collection :id="$route.params.id" txtShow="true"></vue-collection>
        </div>
        <div class="hezuo_shouc" @click="onping">
          <i class="iconfont icon-pinglun"></i>
          <span class="txt">评论</span>
        </div>

        <div class="hezuob_zhen_button" v-if="item.status == 0">
          <router-link :to="'/hezuo/apply/' + item.id" tag="div" v-if="newTime<item.endtime" class="button_max">报名激活</router-link>
          <div v-else="" class="button_max" style="background: #9e9e9e;;">招募截止</div>
        </div>
        <div class="hezuob_zhen_button" v-if="item.status == 1">
          <div class="button_max" style="background: #9e9e9e;" @click="chat(item.mem_id)">已参与，找TA聊聊</div>
        </div>
        <div class="hezuob_zhen_button" v-if="item.status == 8" @click="chat(item.mem_id)">
          <div class="button_max" style="background: #00a0ea;">您的众包请求已通过审核</div>
        </div>
        <div class="hezuob_zhen_button" v-if="item.status == 9">
          <div class="button_max" style="background: #9e9e9e;">已拒绝</div>
        </div>

      </div>

      <div class="hezuod_b_button" v-if="item.mem_id == user.mem_id&&item.status_houtai!=0" style="display: flex;justify-content: space-around;">
        <!--<div class="hezuo_shouc">
					<vue-collection :id="$route.params.id" :type="2" txtShow="true"></vue-collection>
				</div>-->
        <div class="hezuo_shouc" @click="onping">
          <i class="iconfont icon-pinglun"></i>
          <span class="txt">评论</span>
        </div>

        <div class="hezuob_zhen_button" @click="jiezhi()" style="width: 80%;margin-left: 0;" v-if="newTime<item.endtime&&show1==true">
          <div class="button_max" style="width: 100%;">提前截止</div>
        </div>
        <div class="hezuob_zhen_button" v-else="" style="width: 80%;">
          <div class="button_max" style="background: #9e9e9e;;">招募截止</div>
        </div>
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
    <vue-suspen></vue-suspen>
    <vue-shareit v-if="item" :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
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
      Confirm
    },
    data() {
      return {
        item: undefined,
        userlist: [],
        memberId: '',
        newTime: '',
        show1: true,
        tipsShow: false
      }
    },

    computed: {
      user() {
        return this.$store.state.user;
      },
      fenxiang() {
        if (this.item.mem_id == this.$store.state.user.mem_id) {
          return {
            title: this.item.ztitle,
            dese: this.$store.state.user.mem_nickname + '邀您参与众包，关注/分享秒得奖励！',
            imgUrl: '/static/img/hz.jpg',
            link: '/hezuo/details'
          }
        } else {
          return {
            title: this.item.ztitle,
            dese: this.$store.state.user.mem_nickname + '邀您关注弱电行业众包伙伴/项目，他在智汇优库等您！',
            imgUrl: '/static/img/hz.jpg',
            link: '/hezuo/details'
          }
        }
      }
    },

    mounted() {
      var _this = this;
      _this.$http.post(_this.$store.state.url + '/Cooperation/new_coop_register', {
        load: true,
        id: _this.$route.params.id,
      }).then((res) => {
        if (!res) return;
        _this.userlist = res;
      })
      _this.memberId = this.$store.state.token;
      _this.newTime = (Date.parse(new Date()) / 1000);
      _this.detail();
    },
    methods: {
      fanhui() {
        this.urls = new URL(window.location.href)
        // console.log('aaaa')
        if (this.urls.searchParams.get("uidkey")) {
          this.$router.push('/hezuo/index/#link')
        } else {
          if (this.urls.hash) {
            this.$router.push('/index')
          } else {
            this.$router.go(-1)
          }
        }
      },
      detail() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Cooperation/new_coop_detaile', {
          load: true,
          id: _this.$route.params.id,
        }).then((res) => {
          if (!res) return;
          res.wordurl = res.wordurl ? res.wordurl : [];
          _this.item = res;
        })
      },
      onping() {
        this.$refs.commenttxt.onshow({
          type: 1,
          module: 1,
          project_id: this.$route.params.id
        });
      },
      morePeople() {
        var _this = this;
        _this.$router.push('../userList/' + _this.$route.params.id);
      },
      chat(id) {
        var _this = this;
        _this.$router.push('../../msg/tcw/' + id);
      },

      jiezhi() {
        var _this = this;
        _this.tipsShow = true;
      },
      //			onHide() {
      //				var _this = this;
      //			}
      onConfirm() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Cooperation/sign_end_coop', {
          load: true,
          coop_id: _this.$route.params.id,
        }).then((res) => {
          if (!res) return;
          _this.detail();
          _this.tipsShow = false;
          _this.show1 = false;
        })
      }
    }
  }
</script>

<style>
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

  .hezuod .hezuod_neirong .li::after {
    /*content: '';
		display: block;
		height: 1px;
		width: 90%;
		margin-left: 10%;
		background: #cccccc;*/
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
    /*margin-left: 18px;*/
  }

  .hezuod .hezuod_neirong .li .xiao>strong {
    font-weight: 800;
    color: #ea2121;
    margin-right: 10px;
  }

  .hezuod .hezuod_neirong .li .xiao>span {
    font-size: 12px;
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
    background: #1e79ea;
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
    /*margin-left: 15px;*/
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
