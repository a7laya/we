<template>
  <!-- 头部 -->
  <div class="wrap">
    <vue-shop-header-order :title='title'></vue-shop-header-order>
    <div class="nav">
      <tab :line-width="3" active-color="#F88509">
        <tab-item :selected="demo3 === item.id" v-for="(item, index) in list3" @on-item-click="changeTab(item.id)" :key="index">{{item.name}}</tab-item>
      </tab>
    </div>

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

        </div>
      </div>
    </div>

    <!-- 预约发货 -->
    <div class="main" v-if="demo3 == 0">
      <div class="margin">
        <span class="type">预约快递:</span>
        <popup-picker placeholder="预约快递、物流" :data="expressList" v-model="express" value-text-align="left" class="sx"></popup-picker>
      </div>
      <div class="margin">
        <span class="type">预约时间:</span>
        <datetime ref="starttime" v-model="starttime" :placeholder="'选择预约时间'" format="YYYY-MM-DD HH:mm" class="sx"></datetime>
      </div>
      <div class="margin">
        <span class="type">收揽地址:</span>
        <popup-picker placeholder="默认地址" :data="address_list" v-model="address" value-text-align="left" class="sx"></popup-picker>
      </div>
    </div>

    <!-- 手动输入 -->
    <div class="main" v-if="demo3 == 1">
      <div class="margin">
        <span class="type">输入单号:</span>
        <input type="text" placeholder="输入快递、物流单号" class="sx" v-model="express_num">
      </div>
      <div class="margin">
        <span class="type">选择快递:</span>
        <popup-picker placeholder="预约快递、物流" :data="expressList1" v-model="express1" value-text-align="left" class="sx"></popup-picker>
      </div>
    </div>

    <!-- 预约发货提交 -->
    <div class="sure">
      <span>提交</span>
    </div>



    <!-- 底部Bar -->
    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {
    Tab,
    TabItem,
    PopupPicker,
    Datetime
  } from 'vux'
  import {
    VueFoot01,
    VueShopHeaderOrder
  } from "../component/";
  export default {
    data () {
      return {
        title: '待发尾货',
        list3: [{
            id: 0,
            name: '预约发货'
          },
          {
            id: 1,
            name: '手动输入'
          },
        ],
        demo3: 0,
        expressList: [['圆通速递','申通快递','韵达快递']],
        express: [],
        starttime: '',
        address_list: [['这是默认地址','这是第二个地址']],
        address: [],
        express_num: '',
        expressList1: [['圆通速递','申通快递','韵达快递']],
        express1: [],
      }
    },
    components: {
      Tab,
      TabItem,
      VueFoot01,
      VueShopHeaderOrder,
      PopupPicker,
      Datetime
    },
    mounted() {

    },
    methods: {
      changeTab(id) {
        this.demo3 = id
      },
    },

  }
</script>

<style scoped>
  .wrap {
    background: #fff;
  }
  .nav {
    padding-top: 1.2rem;
  }
  .nav_list {
    border-top: 3px solid #F1F1F1;
    padding-bottom: 10px;
  }

  .list {
    width: 92%;
    margin: 0 auto;
    height: 120px;
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
  .margin {
    width: 92%;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
  }
  .vux-cell-box:not(:first-child):before {
    border: 0!important;
  }
  .sx {
    display: inline-block;
    width: 60%;
    border-bottom: 1px solid #999;
    text-indent: 10px;
    background: url(../../../static/img/down.png) no-repeat;
    background-size: 8px;
    background-position: right center;
    color: #999999;
    vertical-align: middle;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
  .main {
    width: 92%;
    margin: 0 auto;
    padding: 20px 0;
    font-size: 14px;
    color: #666666;
  }
  .type {
    display: inline-block;
    width: 21%;
  }
  .sure {
    text-align: center;
    padding: 120px 0;
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
