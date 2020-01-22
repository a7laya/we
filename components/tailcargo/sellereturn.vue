<template>
  <div class="wrap">
    <vue-shop-header-order :title='title'></vue-shop-header-order>
    <!-- 退款商品 -->
    <div class="nav_list">
      <div class="list">
        <img src="../../../static/img/60ba417dfd40dab26a5f16d23add529d@2x.png" alt="">
        <div class="list_right">
          <span class="title">商品名称名称商品名称名称商品名称名商品名称名称</span>
          <div>
            <span style="text-decoration: line-through;">原价￥350.00</span>
            <span>数量:200</span>
            <span>全新</span>
          </div>
          <div>
            <span>现价￥<i style="font-size: 16px;">350.00</i></span>
            <span style="color: #E93939;">1.3折<i class="baoyou">包邮</i></span>
            <span style="color: #E93939;font-size: 16px;">￥4396.00</span>
          </div>
          <p class="order">
            <span>订单号:1222123133</span>
            <span>时间:2019.12.21 12:32:46</span>
          </p>

        </div>
      </div>
    </div>
    <div class="address">
      <div class="addr">退货地址:</div>
      <div>
        <span>张三丰<i>169****4568</i></span>
        <div class="gray">河南省郑州市上面镇XXX街道XXX有限公司</div>
      </div>
    </div>
    <!-- 确认发货 -->
    <div class="content" v-if="isAgree == 0">

      <div class="sure">
        <span>确认</span>
      </div>
    </div>
    <!-- 物流信息 -->
    <div class="content" v-if="isAgree == 1">
      <p class="express_top">买家状态:已发货</p>
      <p class="express_top">退货物流:顺丰速运</p>
      <p class="express_top">物流单号:5245382572837528</p>
      <p class="express_top">最新物流信息:</p>
      <div class="express gray">
        <span>
          <i>2019.12.9 04:50</i>
          <em>正在派送</em>
        </span>
        <span>
          <i>2019.12.9 04:50</i>
          <em>正在派送</em>
        </span>
        <span>
          <i>2019.12.9 04:50</i>
          <em>正在派送</em>
        </span>
      </div>
      <div class="sure">
        <span>返回</span>
      </div>
    </div>

    <vue-foot01></vue-foot01>
  </div>

</template>

<script>
  import {} from 'vux'
  import {
    VueFoot01,
    VueShopHeaderOrder
  } from "../component/";
  export default {
    data() {
      return {
        title: '尾货订单',
        isAgree: 0, //判断是否确认退货 0 代表还未同意  1代表同意 显示物流信息
      }
    },
    components: {
      VueFoot01,
      VueShopHeaderOrder
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped>
  .wrap {
    background-color: #fff;
  }

  .nav_list {
    border-top: 3px solid #F1F1F1;
    padding-bottom: 10px;
    padding-top: 1.2rem;
  }

  .list {
    width: 92%;
    margin: 0 auto;
    height: 120px;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #F0F0F0;
  }

  .list>img {
    display: inline-block;
    width: 85px;
    height: 85px;
    vertical-align: middle;
  }

  .list_right {
    display: inline-block;
    vertical-align: middle;
    width: 74%;
  }

  .title {
    display: inline-block;
    color: #989898;
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-top: 10px;
  }

  .list_right>div {
    height: 25px;
    line-height: 25px;
    color: #999999;
  }

  .list_right>div>span {
    display: inline-block;
    width: 32%;
  }

  .list_right>div :last-child {
    text-align: right;
  }

  .list_right>div :first-child {
    color: #E93939;
  }

  .baoyou {
    display: inline-block;
    background-color: #E5B900;
    color: #fff !important;
    border-radius: 5px;
    width: 36px;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center !important;
    margin-left: 5px;
  }

  .order {
    height: 30px;
    line-height: 30px;
  }

  .order>span {
    display: inline-block;
    color: #999999;
  }

  .order :first-child {
    width: 39%;
  }

  .order :last-child {
    width: 59%;
    text-align: right;
  }

  .address>div {
    width: 92%;
    margin: 0 auto;
    font-size: 12px;
    padding: 5px 0 5px 0;
  }

  .addr {
    font-size: 14px !important;
    font-weight: bold;
    color: #2C2A2A;
  }

  .gray {
    color: #8E8E8E;
  }

  .font12px {
    font-size: 12px;
  }

  .content {
    border-top: 3px solid #EBEBEB;
    padding: 10px 0;
  }

  .express_top {
    width: 92%;
    margin: 0 auto;
    font-size: 13px;
    font-weight: bold;
  }

  .express {
    width: 80%;
    margin: 0 auto;
  }
  .express span:first-child {
    color: #F88509;
  }
  .express > span {
    display: block;
    height: 20px;
    line-height: 20px;
  }
  .sure {
    width: 100%;
    text-align: center;
    padding: 30px 0;
  }
  .sure > span {
    display: inline-block;
    width: 100px;
    border: 1px solid #F88509;
    border-radius: 15px;
    height: 25px;
    line-height: 25px;
    color: #F88509;
    font-size: 14px;
  }
</style>
