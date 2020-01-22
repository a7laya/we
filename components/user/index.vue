<template>
  <div>
    <header>
      <!--<router-link to="/" class="logo" rel="nofollow"><img src="/static/logo.png" /></router-link>-->
      <!--<a class="post">发布</a>-->
    </header>
    <div class="head-icon">
      <img v-if="user" :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl" />
      <router-link to="/login/login" tag="img" v-else src="https://img.58cdn.com.cn/m58/m3/img/demo.jpg"></router-link>
    </div>
    <div class="loginBtnCon"></div>
    <div class="user_nav_top1">
      <div class="icetid">
        <div class="span">{{moneyb/100}}</div>
        <div class="txt">智汇币</div>
      </div>
      <router-link to="mycwdl/2" tag="div" class="icetid">
        <div class="span">{{moneyd/100}}</div>
        <div class="txt">智汇豆提现</div>
      </router-link>
      <router-link to="mycwdl/3" tag="div" class="icetid">
        <div class="span">{{moneyj/100}}</div>
        <div class="txt">直播红包提现(元)</div>
        <!--<div class="span"><img src="/static/img/sm.png"/></div>
        <div class="txt">提现</div>-->
      </router-link>
    </div>
    <grid :show-lr-borders="false" :show-vertical-dividers="false" class="uindex_title_nav_grid">
      <grid-item v-for="(item,index) in nav_list_title" :key="index" :link="item.link" :label="item.txt">
        <img slot="icon" :src="item.img" />
      </grid-item>
    </grid>

    <!-- 历史-个人中心 -->
<!--      <group>
      <div @click="dingyue()">
        <cell :title="'我的订阅'" is-link></cell>
      </div>
      <cell :title="'我的项目'" is-link link="/project/dingyuesearch"></cell>
      <cell :title="'我的账号'" is-link link="usersetupindex"></cell>
      <cell :title="'我的资料'" is-link link="updata"></cell>
      <cell :title="'我的社区'" is-link link="fabushequ"></cell>
      <cell :title="'我参与的'" is-link link="join"></cell>
      <cell :title="'我的收藏'" is-link link="mycollection"></cell>
      <cell :title="'我的主页'" @click.native="getData()" is-link></cell>
      <cell :title="'意见反馈'" is-link link="feedback">
        <span class="name" style="color: #35495e;"></span>
      </cell>
      <cell :title="'我的尾货'" @click.native="tailcargo()" is-link></cell>
    </group> -->

    <!-- 修改-个人中心 -->
   <div class="new_nav">
      <div class="new_list" v-for="list in nav_list" @click="newClick(list.link)">
        <img :src="list.img"> </br>
        <span>{{list.txt}}</span>
      </div>
    </div>

    <!-- <div class="button_max" @click="out" v-if="isWeiXin==9" style="margin-top: 30px;">退出登录</div> -->
    <div class="button_max" @click="out" style="margin-top: 30px;">退出登录</div>
    <vue-foot></vue-foot>
    <!-- <div v-transfer-dom>
      <confirm v-model="tipsShow" title="温馨提示" @on-hide="onHide" :show-cancel-button="false">
        <p style="text-align:center;">您今天的答题次数已用完啦！明天再来吧！</p>
      </confirm>
    </div> -->
    <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
  import {
    go,
    getUrl
  } from "../../util.js";
  import {
    XHeader,
    Grid,
    GridItem,
    Group,
    Cell,
    TransferDomDirective as TransferDom,
    Confirm
  } from "vux";
  import {
    VueFoot,
    VueShareit
  } from "../component/";
  export default {
    components: {
      Grid,
      GridItem,
      Group,
      Cell,
      VueFoot,
      VueShareit,
      Confirm,
    },
    directives: {
      TransferDom
    },

    data() {
      return {
        isWeiXin: isWeiXin(),
        nav_list: [
          // {
          //   img: "/static/img/person/4483 - Shop@3x.png",
          //   txt: "我的店铺",
          //   link: ""
          // },
		  {
		    img: "/static/img/person/Man.png",
		    txt: "我的资料",
		    link: "updata"
		  },
          {
            img: "/static/img/person/4509 - Full Cart@3x.png",
            txt: "我的尾货",
            link: "/tailcargo/index"
          },
          // {
          //   img: "/static/img/person/4510 - Receipt@3x.png",
          //   txt: "采购订单",
          //   link: ""
          // },
          // {
          //   img: "/static/img/person/4502 - Wallet full of money@3x.png",
          //   txt: "我的钱包",
          //   link: "/tailcargo/wallet"
          // },
          {
            img: "/static/img/person/3277 - Directory Submission@3x.png",
            txt: "我的项目",
            link: "/project/dingyuesearch"
          },
          {
            img: "/static/img/person/3271 - Local Business@3x.png",
            txt: "我的活动",
            link: "/huodong/myindex"
          },
          {
            img: "/static/img/person/4522 - Handshake@3x.png",
            txt: "我的众包",
            link: "/hezuo/myindex"
          },
          {
            img: "/static/img/person/7467 - Camera on Stand@3x.png",
            txt: "我的直播",
            link: "/zhibo/myindex"
          },
          {
            img: "/static/img/person/2757 - House IV@3x.png",
            txt: "我的社区",
            link: "fabushequ"
          },
          {
            img: "/static/img/person/7600 - Responsibility@3x.png",
            txt: "我的资讯",
            link: "/information/myindex"
          },

          {
            img: "/static/img/person/3259 - Image Search@3x.png",
            txt: "我的订阅",
            link: "/user/usermyattention"
          },
          {
            img: "/static/img/person/3248 - Domain Registration@3x.png",
            txt: "我的主页",
            link: "/yellowPages/mineCompany"
          },
          // {
          //   img: "/static/img/person/7567 - Communication Skills@3x.png",
          //   txt: "邀请好友",
          //   link: ""
          // },
          {
            img: "/static/img/person/4528 - Vault@3x.png",
            txt: "账号安全",
            link: "usersetupindex"
          },
          // {
          //   img: "/static/img/person/3175 - Chat Bubble@3x.png",
          //   txt: "平台公告",
          //   link: ""
          // },
          {
            img: "/static/img/person/3243 - Team Support@3x.png",
            txt: "意见反馈",
            link: "feedback"
          },

        ],
        nav_list_title: [{
            url: "www.baidu.com",
            img: "/static/img/perMsg.png",
            txt: "智汇币充值",
            link: "myrecharge"
          },
          {
            url: "www.baidu.com",
            img: "/static/img/zs.png",
            txt: "交易明细",
            link: "mymdetailed"
          },
          {
            url: "www.baidu.com",
            img: "/static/img/tuandui.png",
            txt: "粉丝团队",
            link: "myteam"
          },
          // {
          //   url: "www.baidu.com",
          //   img: "/static/img/dian.png",
          //   txt: "历史发布",
          //   link: "history"
          // }
        ],
        moneyd: undefined,
        moneyb: undefined,
        moneyj: "",
        memSubscribe: '',
      };
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      fenxiang() {
        return {
          title: "智汇优库-" + this.$route.meta.title,
          dese: this.$store.state.user.mem_nickname +
            "邀您关注弱电智能化互动平台，秒得五十块！",
          imgUrl: "/static/logo.png",
          link: "/user/index"
        };
      }
    },
    mounted() {
      var _this = this;
      //  _this.band()
      _this.$http
        .post(_this.$store.state.url + "/moneytype/zhdoumoney", {
          load: true
        })
        .then(function(res) {
          if (!res) return;
          _this.moneyd = res.money;
        });
      _this.$http
        .post(_this.$store.state.url + "/moneytype/zhbmoney", {
          load: true
        })
        .then(function(res) {
          if (!res) return;
          _this.moneyb = res.money;
        });
      _this.$http
        .post(_this.$store.state.url + "/moneytype/get_xj", {
          load: true
        })
        .then(function(res) {
          if (!res) return;
          _this.moneyj = res.money;
        });
    },
    created() {},
    methods: {
      newClick(link) {
        if (link == '/yellowPages/mineCompany') {
          this.getData()
        } else if(link == '') {
          msg('正在维护中')
        } else {
          this.$router.push(link)
        }

      },
      getData() {
        var _this = this;
        _this.$http
          .post(_this.$store.state.url + "/Homepages/is_enterprise", {
            load: true
          })
          .then(function(res) {
            if (!res) return;
            if (res.status == 0) {
              msg('您还没有添加企业信息，快去发布里面添加吧')
            } else {
              _this.$router.push("/yellowPages/mineCompany?id=" + res.id)
              //              console.log("/yellowPages/mineCompany?id="+res.id)
            }
          });
      },
      tailcargo() {
        let _this = this;
        _this.$router.push("/tailcargo/index")
      },
      getshequ() {
        let _this = this;
        _this.$router.push("/shequ/pinglun")
      },
      out() {
        var _this = this;
        _this.$http
          .post(_this.$store.state.url + "/login/logout", {
            load: true
          })
          .then(function(res) {
            if (!res) return;
            window.location.href = "http://" + window.location.host + "/index";
          });
      },

      //  band(){
      //				var _this = this;
      //				_this.$http.post(_this.$store.state.url +'/Collection/isSubscribe',{
      //
      //				}).then(res=>{
      //
      //					 _this.memSubscribe=res.memSubscribe
      //				})
      //			},
      dingyue() {
        console.log(1)
        this.$router.push('/user/usermyattention')
      },
    }
  };
</script>

<style scoped>
  header {
    height: 40px;
    line-height: 40px;
    background-color: #35495e;
    color: #fff;
    font-size: 16px;
  }

  .logo {
    width: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
  }

  .post {
    color: #fff;
    font-size: 12px;
    display: inline-block;
    height: 100%;
    float: right;
    margin-right: 0;
    width: 60px;
    text-align: center;
  }

  .head-icon {
    height: 25px;
    background-color: #35495e;
    text-align: center;
  }

  .head-icon::before {
    content: "";
    display: block;
    background: #35495e;
    height: 3px;
    margin-top: -2px;
  }

  .head-icon img {
    position: relative;
    display: inline-block;
    background-color: #fff;
    width: 50px;
    height: 50px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    top: -10px;
  }

  .loginBtnCon {
    padding-top: 30px;
    background-color: #fff;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: -10px;
  }

  .username {
    font-size: 0.40625rem;
    line-height: 0.625rem;
  }

  .uindex_title_nav_grid::before {
    display: none;
  }

  .uindex_title_nav_grid {
    background: #fff;
  }

  .user_nav_top1 {
    display: flex;
    background: #fff;
    margin-bottom: 15px;
    padding-bottom: 10px;
    padding-top: 5px;
  }

  .user_nav_top1 .icetid {
    flex: 1;
    text-align: center;
    position: relative;
  }

  .user_nav_top1 .icetid .span {
    font-size: 16px;
    color: #202e3e;
  }

  .user_nav_top1 .icetid .txt {
    color: #8a8a8a;
  }

  .user_nav_top1 .icetid+.icetid::before {
    content: "";
    border-left: 1px solid #e3e3e3;
    position: absolute;
    width: 0;
    height: 30px;
    left: 0;
    top: 10px;
  }

  .name {
    display: block;
    font-size: 14px;
  }

  .user_nav_top1 .icetid .span img {
    width: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  .user_nav_top1 .icetid .span {
    min-height: 30px;
  }

  .new_nav {
    background: #fff;
    margin-top: 10px;
  }

  .new_list {
    display: inline-block;
    width: 25%;
    height: 2rem;
    /* line-height: 2rem; */
    text-align: center;
  }

  .new_list>img {
    width: 30px;
    height: 30px;
    text-align: center;
    vertical-align: bottom;
    display: inline-block;
    margin-top: 18px;
  }
</style>
