<template>
  <div>
    <x-header :left-options="{backText:''}" style="background: #398CD3;color: #000000!important;"><span>个人中心</span></x-header>

    <!-- 头像和昵称 -->
    <div class="head-icon">
      <img v-if="user" :src="$store.state.website.website_domain_name + '/uploads/' + headimgurl" />
      <router-link to="/login/login" tag="img" v-else src="https://img.58cdn.com.cn/m58/m3/img/demo.jpg"></router-link>
      <span class="w_name">昵称:{{nickname}}</span>
    </div>
    <div class="loginBtnCon"></div>

    <!-- 尾货单 -->
    <div class="user_nav_top1">
      <div class="icetid">
        <div class="span">今日尾货单(单)</div>
        <div class="txt">{{day_order_count}}</div>
      </div>
      <div class="icetid">
        <div class="span">今日尾货付款(元)</div>
        <div class="txt">￥{{day_order_pay_sum}}</div>
      </div>
      <div class="icetid">
        <div class="span">今日尾货结算(元)</div>
        <div class="txt">￥{{day_order_confirm_sum}}</div>
      </div>
    </div>

    <!-- 待发尾货 -->
    <div class="new_nav">
      <div class="new_list"  @click="toWaitSend()">
        <img src="/static/img/person/货车@3x.png">
        <badge :text="no_consignment_count" style="margin-bottom: 0.5rem;"></badge></br>
        <span>待发尾货</span>
      </div>
      <div class="new_list" @click="toShopOrder()">
        <img src="/static/img/person/代发货@3x.png">
        <badge :text="no_harvest" style="margin-bottom: 0.5rem;"></badge></br>
        <span>尾货订单</span>
      </div>
      <div class="new_list" @click="toShopComment()">
        <img src="/static/img/person/信息@3x.png"></br>
        <span>交易评价</span>
      </div>
      <div class="new_list" @click="toAfterSale()">
        <img src="/static/img/person/锁定钱标志@3x.png">
        <badge :text="no_comment" style="margin-bottom: 0.5rem;"></badge></br>
        <span>退款/售后</span>
      </div>
    </div>

    <!-- 列表 -->
    <div class="per_list">
      <group>
        <!-- <cell :title="'我的钱包'" link="./wallet"></cell> -->
        <cell :title="'我发布的尾货'" link="./myshop"></cell>
        <cell :title="'我卖出的尾货'" link="./sellcargo"></cell>
        <cell :title="'退货地址'" link="./returnaddress"></cell>
        <cell :title="'黑名单'" link="./blacklist"></cell>
        <cell :title="'卖家交易规则'" link="/index"></cell>
      </group>
    </div>

    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {
    Tab,
    TabItem,
    Drawer,
    XHeader,
    Cell,
    Group,
    Badge
  } from 'vux'
  import {
    VueFoot01
  } from "../component/";
  export default {
    data() {
      return {
        nickname:'', // 会员昵称
        headimgurl:'', // 会员头像
        day_order_count:0, // 当天的尾货订单
        day_order_pay_sum:0, // 当天的尾货付款金额
        day_order_confirm_sum:0, // 当天确认订单的尾货金额
        no_consignment_count:0, // 待发货数量
        no_harvest:0, // 待收数量
        no_comment:0, // 待评价数量
      }
    },
    components: {
      Tab,
      TabItem,
      Drawer,
      XHeader,
      VueFoot01,
      Cell,
      Group,
      Badge
    },

    mounted() {
      this.getUserInfo();
    },

    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {

      // 交易评价
      toShopComment() {
        console.log("in toShopComment");
        this.$router.push({path: './shoporder', query: {activeTab: 2}})
      },

      // 售后
      toAfterSale() {
        console.log("in toAfterSale");
        this.$router.push({path: './shoporder', query: {activeTab: 3}})
      },

      // 待发货
      toWaitSend() {
        console.log("in toWaitSend");
        this.$router.push({path: './shoporder2', query: {activeTab: 0}})
      },

      // 尾货订单
      toShopOrder() {
        console.log("尾货订单");
        this.$router.push({path: './shoporder', query: {}})
      },

      // 获取用户相关信息
      getUserInfo() {
        var _this = this;
        _this.$http.get(_this.$store.state.url + "/Cargo/seller_centre")
        .then(function(res) {
          console.log("getUserInfo res:", res);
          if (!res) return;
          _this.nickname = res.nickname // 会员昵称
          _this.headimgurl = res.headimgurl// 会员头像
          _this.day_order_count = res.day_order_count// 当天的尾货订单
          _this.day_order_pay_sum = res.day_order_pay_sum// 当天的尾货付款金额
          _this.day_order_confirm_sum = res.day_order_confirm_sum// 当天确认订单的尾货金额

          _this.no_consignment_count = res.no_consignment_count // 待发货数量
          _this.no_harvest  = res.no_harvest // 待收数量
          _this.no_comment  = res.no_comment // 待评价数量


        })
      }
    }
  }
</script>

<style scoped="">
  .head-icon {
    height: 1.4rem;
    background-color: #398CD3;
    text-align: center;
  }

  .head-icon::before {
    content: "";
    display: block;
    background: #398CD3;
    height: 3px;
    margin-top: -2px;
  }

  .head-icon img {
    position: absolute;
    display: inline-block;
    background-color: #fff;
    width: 50px;
    height: 50px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    top: 1.1rem;
    left: 0.4rem;
  }

  .loginBtnCon {
    padding-top: 0.5rem;
    background-color: #fff;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: -10px;
  }
  .w_name {
    display: inline-block;
    position: absolute;
    left: 2.1rem;
    top: 1.5rem;
    z-index: 1;
    font-size: 16px;
    color: #fff;
  }
  .user_nav_top1 {
    display: flex;
    background: #fff;
    /* margin-bottom: 15px; */
    padding-bottom: 0.4rem;
  }

  .user_nav_top1 .icetid {
    flex: 1;
    text-align: center;
    position: relative;
  }

  .user_nav_top1 .icetid .span {
    font-size: 12px;
    color: #888;
  }

  .user_nav_top1 .icetid .txt {
    color: #F88509;
    font-size: 14px;
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
    border-top: 5px solid #dedede;
  }

  .new_list {
    display: inline-block;
    width: 24%;
    height: 2rem;
    /* line-height: 2rem; */
    text-align: center;
  }

  .new_list>img {
    width: 0.9rem;
    height: 0.8rem;
    text-align: center;
    vertical-align: bottom;
    display: inline-block;
    margin-top: 18px;
  }
  .new_list > span {
    color: #000000;
  }
  .per_list {
    width: 100%;
    background: #fff;
    border-top: 5px solid #dedede;
    color: #888;
  }
  .weui-cells {
    font-size: 14px!important;
  }
  .weui-cell {
    font-size: 14px!important;
  }
</style>
