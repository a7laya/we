<template>
  <div class="wrap">
    <vue-shop-header-order title="TA的尾货"></vue-shop-header-order>
    <div style="width: 100%;height: 1px;background-color: #4B96D6;padding-top: 1.2rem;"></div>

    <div class="nav">
      <img :src="$formatImg(headimgurl)">
      <div class="user">
        <div class="user_top">
          <span style="font-size: 16px;color: #858585;">{{nickname}}</span>
          <span style="text-align: right;">12人关注</span>
        </div>
        <div class="user_bottom">
          <img src="../../../static/img/jiangpai.png" alt="">
          <span>实名制认证</span>
          <span class="evaluate">查看TA的评价</span>
        </div>
      </div>
    </div>

      <div class="nav_list" v-for="(item,index) in list.seller_list" :key="index">
        <div class="list" @click="goDetail(item.goods_id)">
          <img :src="$formatImg(item.img_name)" alt="">
          <div class="list_right">
            <span class="title">{{item.goods_name}}</span>
            <div>
              <span style="text-decoration: line-through;">原价￥{{item.market_price}}</span>
              <span>数量:{{item.store_count}}</span>
              <span>{{item.goods_state}}</span>
            </div>
            <div>
              <span>实收￥<i style="font-size: 16px;">{{item.shop_price}}</i></span>
              <span style="color: #E93939;">{{item.shop_price/item.market_price*10 | roundnum}}折<i class="baoyou" v-if="item.is_free_shipping == 1">包邮</i></span>
              <span>{{item.region_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- /Cargo/my_cargo?type=1& -->
      <!-- <vue-loading :url="$store.state.url + '/Cargo/seller_list?page=1&limit=10&bu_uid=5693'" @ievent="loaddata"></vue-loading> -->



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
        list: [],
        headimgurl: '',
        nickname: ''
      }
    },
    components: {
      VueFoot01,
      VueSwiper2,
      VueShopHeaderOrder,
      VueLoading
    },
    mounted() {
      this.getSellerData()
    },
    methods: {
     // 详情页
     goDetail (goods_id) {
       this.$router.push({
         path:'./shopdetails',
         query: {id:goods_id}
       })
     },
     getSellerData(user_id) {
        var _this = this;
        user_id = this.$route.query.id
        console.log("getSellerData user_id", user_id)
        _this.$http.post(_this.$store.state.url + "Cargo/seller_list", {
            bu_uid: user_id,
            limit:300
          }).then(function(res) {
            console.log("getSellerData res", res)
            if (!res) return;
            _this.list = res
            _this.headimgurl = res.info.headimgurl
            _this.nickname= res.info.nickname
          });
      },



    },
  }
</script>

<style scoped>
  .wrap {
    background: #fff;
  }
  .list {
    display: flex;
    padding: 10px 20px;
    margin-top: 5px;
  }
  .list > img {
    flex-shrink: 0;
    width: 85px;
    height: 85px;
    border-radius:5px;
    margin-right: 5px;
  }
  .list_right {
    width: 100%;
    color: #989898;
  }

  .list_right > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list_right > div > span:first-child {
    color: red
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
    margin-bottom: 5px;
  }
  .list .handle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    margin-left: auto;
    margin-top: 5px;
    color: #003BFF;
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
    width: 70%;
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
    border-top: 3px solid #F1F1F1;
    /* padding-bottom: 10px; */
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

</style>
