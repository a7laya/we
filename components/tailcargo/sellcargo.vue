<template>
  <div class="wrap">
    <vue-shop-header-order title="卖出的尾货"></vue-shop-header-order>
    <div style="width: 100%;height: 1px;background-color: #4B96D6;padding-top: 1.2rem;"></div>



      <div class="nav_list" v-for="(item,index) in list" :key='index'>
        <div class="list">
          <img :src="$formatImg(item.img_name)" alt="">
          <div class="list_right">
            <span class="title font-md">{{item.goods_name}}</span>
            <div>
              <span class="line-through font-sm">原价￥{{item.market_price}}</span>
              <span class="font-sm">数量:{{item.goods_num}}</span>
              <span class="font-sm">{{item.goods_state}}成新</span>
            </div>
            <div class="d-flex flex-nowrap">
              <span class="font-sm flex-1">实收￥<i  class="font-md">{{item.shop_price}}</i></span>
              <span class="font-sm flex-1" style="color: #E93939;">{{item.shop_price/item.market_price*10 | roundnum}}折<i class="baoyou" v-if="item.is_free_shipping == 1">包邮</i></span>
              <span class="font-sm flex-1" style="overflow: hidden;">{{item.region}}</span>
            </div>
            <p class="handle">
              <span class="font" @click="callQin(item.goods_id)">联系买家</span>
              <span class="font" @click="lookOverComment(item.order_id)"
              v-if='item.pay_type == 0'>查看评价</span>
            </p>
          </div>
        </div>
        <div class="item-badge font-md" v-show="item.pay_type != 0">线下单</div>
      </div>
      <!-- /Cargo/my_cargo?type=1& -->
      <vue-loading :url="$store.state.url + '/Cargo/sell_cargo?page=1&limit=10'" @ievent="loaddata"></vue-loading>



    <div style="width: 100%;height: 1.5rem;background: #fff;"></div>
    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {

  } from 'vux'
  import {
    VueFoot01,
    VueSwiper2,
    VueShopHeaderOrder,
    VueLoading
  } from "../component/";
  export default {
    inject: ['reload'],
    data() {
      return {
        list: undefined,
      }
    },
    components: {
      VueFoot01,
      VueSwiper2,
      VueShopHeaderOrder,
      VueLoading
    },
    mounted() {

    },
    methods: {

      loaddata(res) {
        var _this = this;
        _.each(res, function(e) {
          _this.list = _this.list || [];
          _this.list.push(e);
        })
      },
      // 联系买家
      callQin(id) {
        console.log("in callQin");
        // this.$router.push({path: './editshop', query: {id: id}})
      },

      //查看评价
      lookOverComment(order_id) {
        this.$router.push({
          path:'./shop_review',
          query:{order_id}
        })
      },


    },
  }
</script>

<style scoped>
  .wrap {
    background: #fff;
  }

  .searchbox {
    display: inline-block;
    width: 100%;
    color: #666;
    font-size: 0.75rem;
    background-color: #398CD3;
    text-align: center;
    position: relative;
    height: 40px;
    line-height: 40px;
  }

  .searchbox input.txt {
    width: 70%;
    background: rgba(255, 255, 255, 0.1);
    line-height: 0.7rem;
    height: 0.7rem;
    border-radius: 30px;
    text-indent: 10px;
    color: #fff;
  }

  .searchbox input.txt::-webkit-input-placeholder {
    color: #fff;
  }

  .searchbox i.icon-sousuo {
    position: absolute;
    color: #fff;
    font-size: 22px;
    top: -3px;
    right: 2.6rem;
  }

  .searchbox i.icon-sousuo::before {
    display: inline-block;
    vertical-align: middle;
  }

  .nav {
    width: 100%;
    padding-bottom: 10px;
  }

  .nav>img {
    display: inline-block;
    width: 60px;
    height: 60px;
    vertical-align: middle;
    margin: 15px 10px 0 15px;
  }

  .user {
    display: inline-block;
    vertical-align: middle;
    width: 76.4%;
  }

  .user_top {
    width: 98%;
    height: 30px;
    line-height: 30px;
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .user_top>span {
    display: inline-block;
    width: 50%;

  }

  .user_bottom {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #A2A2A2;
  }

  .user_bottom>img {
    display: inline-block;
    width: 12px;
    height: 15px;
    vertical-align: middle;
  }

  .user_bottom>span {
    display: inline-block;
    width: 46%;
  }

  .guanzhu {
    display: inline-block;
    background-color: #F88509;
    color: #fff;
    border-radius: 10px 0 0 10px;
    height: 20px;
    line-height: 20px;
    width: 50px;
    margin-left: 20px;
    text-align: center;
  }

  .evaluate {
    display: inline-block;
    color: #0031FF;
    text-align: right;
  }

  .nav_top {
    border-top: 1px solid #F3F3F3;
  }

  .nav_list {
    position: relative;
    border-top: 3px solid #F1F1F1;
    padding-bottom: 10px;
  }

  .list {
    width: 92%;
    margin: 0 auto;
    height: 3rem;
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

  .handle {
    margin-top: 8px;
  }

  .handle>span {
    display: inline-block;
    width: 49%;
    text-align: right;
    color: #003BFF;
  }
  .item-badge {
    height: 0.6rem;
    width: 1.5rem;
    background-color: #398CD3;
    color: white;
    border-radius: 0.3rem 0 0 0.3rem;
    position: absolute;
    top: 0.1rem;
    right: 0;
    font-size: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
