<template>
  <div>
    <!-- 头部 -->
    <x-header :left-options="{backText:''}" style="background: #9BC5E8;color: #000000!important;"><span>我的钱包</span></x-header>

    <!-- 头像和昵称 -->
    <div class="head-icon">
      <img v-if="user" :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl" />
      <router-link to="/login/login" tag="img" v-else src="https://img.58cdn.com.cn/m58/m3/img/demo.jpg"></router-link>
      <span class="w_name">昵称:{{user.mem_nickname}}</span>
    </div>
    <div class="loginBtnCon"></div>

    <!-- 钱包金额 -->
    <div class="w_money">
      <div>
        <span class="wm_left">
          账户余额(元)</br>
          <i>￥48396.00</i>
        </span>
        <span class="wm_right">提现</span>
      </div>
    </div>

    <!-- 订单详情 -->
    <div class="user_nav_top1">
      <div class="icetid">
        <div class="span">本月订单(单)</div>
        <div class="txt">135</div>
      </div>
      <div class="icetid">
        <div class="span">本月收入(元)</div>
        <div class="txt">￥48396.00</div>
      </div>
      <div class="icetid">
        <div class="span">本月消费(元)</div>
        <div class="txt">￥2588.00</div>
      </div>
    </div>

    <!-- 半年收入条形图 -->
    <div class="w_map">
      <template>
        <div>
          <v-chart ref="demo" :data="data">
            <v-scale x field="月份" colors="#3CF2EB" />
            <v-scale y field="月均降雨量" />
            <v-bar series-field="name" :adjust="{
              type: 'dodge',
              marginRatio: 0.05 // 设置分组间柱子的间距
            }" />
            <v-tooltip show-value-in-legend />
          </v-chart>

          <!-- <x-button type="primary" plain @click.native="$refs.demo.rerender()">rerender</x-button> -->
          <span class="map_more">查看更多数据</span>
        </div>
      </template>
    </div>

    <!-- 绑定卡片列表 -->
    <div class="w_card">
      <group>
        <cell :title="'绑定卡片'" link="/index"></cell>
        <cell :title="'提现记录'" link="/index"></cell>
        <cell :title="'消费明细'" link="/index"></cell>
      </group>
    </div>

    <!-- 底部 -->
    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {
    XHeader,
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton,
    VScale,
    Cell,
    Group,
  } from 'vux'
  import {
    VueFoot01
  } from '../component'

  export default {
    data() {
      return {
        data: [{
            name: '收入数据',
            月份: 'Jan.',
            月均降雨量: 18.9
          },
          {
            name: '收入数据',
            月份: 'Feb.',
            月均降雨量: 28.8
          },
          {
            name: '收入数据',
            月份: 'Mar.',
            月均降雨量: 39.3
          },
          {
            name: '收入数据',
            月份: 'Apr.',
            月均降雨量: 81.4
          },
          {
            name: '收入数据',
            月份: 'May.',
            月均降雨量: 47
          },
          {
            name: '收入数据',
            月份: 'Jun.',
            月均降雨量: 20.3
          },
          {
            name: '收入数据',
            月份: 'Jul.',
            月均降雨量: 24
          },
          {
            name: '收入数据',
            月份: 'Aug.',
            月均降雨量: 35.6
          },
          {
            name: '支出数据',
            月份: 'Jan.',
            月均降雨量: 12.4
          },
          {
            name: '支出数据',
            月份: 'Feb.',
            月均降雨量: 23.2
          },
          {
            name: '支出数据',
            月份: 'Mar.',
            月均降雨量: 34.5
          },
          {
            name: '支出数据',
            月份: 'Apr.',
            月均降雨量: 99.7
          },
          {
            name: '支出数据',
            月份: 'May.',
            月均降雨量: 52.6
          },
          {
            name: '支出数据',
            月份: 'Jun.',
            月均降雨量: 35.5
          },
          {
            name: '支出数据',
            月份: 'Jul.',
            月均降雨量: 37.4
          },
          {
            name: '支出数据',
            月份: 'Aug.',
            月均降雨量: 42.4
          }
        ]
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    components: {
      XHeader,
      VChart,
      VLine,
      VArea,
      VTooltip,
      VLegend,
      VBar,
      XButton,
      VScale,
      Cell,
      Group,
      VueFoot01
    },
  }
</script>

<style scoped>
  .head-icon {
    height: 1.4rem;
    background-color: #9BC5E8;
    text-align: center;
  }

  .head-icon::before {
    content: "";
    display: block;
    background: #9BC5E8;
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

  .w_money {
    width: 100%;
    height: 1.8rem;
    background: #fff;
  }

  .w_money>div {
    width: 60%;
    margin: 0 auto;

  }

  .w_money>div>span {
    display: inline-block;
    font-size: 14px;
  }

  .wm_left {
    float: left;
    color: #888888;
    text-align: center;
  }

  .wm_right {
    float: right;
    width: 70px;
    height: 20px;
    line-height: 20px;
    background: #F88509;
    color: #fff;
    border-radius: 10px;
    text-align: center;
    margin-top: 15px;
  }

  .wm_left>i {
    color: #F88509;
    font-size: 16px;
  }

  .user_nav_top1 {
    display: flex;
    background: #fff;
    /* margin-bottom: 15px; */
    padding-bottom: 20px;
    padding-top: 20px;
    border-top: 5px solid #dedede;
  }

  .user_nav_top1 .icetid {
    flex: 1;
    text-align: center;
    position: relative;
  }

  .user_nav_top1 .icetid .span {
    font-size: 14px;
    color: #202e3e;
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

  .w_map {
    width: 100%;
    background: #fff;
    border-top: 5px solid #dedede;
    padding-bottom: 25px;
  }

  .map_more {
    display: inline-block;
    color: #0014FF;
    float: right;
    margin-right: 10px;
  }

  .w_card {
    width: 100%;
    background: #fff;
    border-top: 5px solid #dedede;
    color: #888;
  }
  .sub-item {
    color: #888;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }

</style>
