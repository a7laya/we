<template>
  <div class="wrap">
    <!-- header123 -->
    <!-- <div class="header">
      <div class="h_left">
        <img src="" alt="">
        郑州
      </div>
      <div class="search">
        <input type="text" placeholder="商品关键字搜索 / 店铺搜索 ">
      </div>
    </div> -->
    <vue-shop-header></vue-shop-header>
    <!-- 顶部选项卡 -->
    <div class="top">
      <!-- <div class="top_left"> -->
        <span v-for="(item,index) in class_list" :key="index" @click="checkId(index, item.id)">
            {{item.name}}
        </span>
      <!-- </div>
      <div class="top_right">

      </div> -->
    </div>
    <!-- 轮播图 -->
    <vue-shop-swiper :type="1"></vue-shop-swiper>
    <!-- 发布尾货 -->
    <div class="nav">
      <div class="nav_left" @click="addshop()">
        <p>发布尾货</p>
        <span>大品牌、高质量、低价格</span>
      </div>
      <div class="nav_right" @click="cargoCloseToMe">
        <p>附近尾货</p>
        <span>大品牌、高质量、低价格</span>
      </div>
    </div>
    <!-- 图片 -->
    <div class="nav_img"></div>
    <!-- 推荐尾货 -->
    <div class="list">
      <div class="list_top">
        <span @click="cargoCloseToMe()">推荐尾货</span>
        <i @click="moreShop()">更多</i>
      </div>
      <div class="content">
        <div class="item item1" @click="shopDetails(item.goods_id)" v-for="(item,index) in list" :key="index">
          <img :src="$formatImg(item.img_name)" alt="">
          <span style="color: #000;display: inline-block;margin: 5px 0 0 5px;height: 20px;line-height: 20px;">{{item.goods_name}}</span>
          <div style="margin-top: 10px;">
            <span>原价￥{{item.market_price}}</span>
            <i>{{item.goods_state}}</i>
          </div>
          <div>
            <span>现价￥{{item.shop_price}}</span>
            <em>{{item.shop_price/item.market_price*10 | roundnum}}折</em>
          </div>
          <div class="d-flex w-100 j-end">{{address_city(item.region)}}</div>
        </div>
      </div>
      <vue-loading :url="$store.state.url + '/Cargo/select_goods_hots_list?page=1&limit=10'" @ievent="loaddata"></vue-loading>
    </div>
	<div style="height: 1.5rem;background: #fff;"></div>
    <!-- 底部 -->
    <vue-foot01></vue-foot01>
  </div>

</template>

<script>
  import {

  } from 'vux'
  import {
    VueFoot01,
    VueSwiper2,
    VueShopHeader,
    VueShopSwiper,
    VueLoading
  } from "../component/";
  export default {
    components: {
      VueFoot01,
      VueSwiper2,
      VueShopHeader,
      VueShopSwiper,
      VueLoading
    },
    data() {
      return {
        class_list: [],
        isFixed: 0,
        demo06_index: 0,
        list: [],
      }
    },
    computed:{
    },
    mounted() {
      var _this = this;
      console.log("$store.state.website",this.$store.state.website)
      console.log("$store.state.website.website_domain_name",this.$store.state.website.website_domain_name)
      _this.getTopCategory();
      // _this.getData();
    },
    methods: {
      // 地址处理 XXX-XXX => XXX
      address_city(region){
        return region.split('-').length>0 ? region.split('-')[1] : region
      },
      checkId(index, id) {
        console.log("in checkId id:", id)
        this.isFixed = index
        this.$router.push({path: './shopclass', query: {id: id}})
      },
      demo06_onIndexChange(index) {
        this.demo06_index = index
      },
      shopDetails(id) {
        this.$router.push({
          path:'./shopdetails',
          query: {
            id: id
          }
        })
      },
      moreShop() {
        this.$router.push('./shopclass')
      },
      addshop() {
        this.$router.push('./addshop')
      },
      // 获取首页TOP分类
      getTopCategory() {
        // console.log("in getTopCategory")
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Cargo/select_hangye_list'
        ).then(function (res) {
          console.log("getTopCategory:",res)
          if (!res) return
          _this.class_list = res
        })
      },
	  // 附近尾货
	  cargoCloseToMe() {
	    this.$router.push({path: './shoplist', query: {peripheral: 1}})
	  },
      //获取推荐尾货数据
      // getData() {
      //   var _this = this;
      //   _this.$http.post(_this.$store.state.url + '/Cargo/select_goods_hots_list', {
      //     load: true,
      //     param: _this.type || 1
      //   }).then(function (res) {
      //     if (!res) return
      //     _this.list = res
      //   })
      // },
      loaddata(res) {
      	var _this = this;
        console.log('res')
        console.log(res)
      	_.each(res, function(e) {
      		// console.log(e)
      		_this.list = _this.list || [];
      		_this.list.push(e);
      	})
      },
    },

  }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 1rem;
    background: #398CD3;
    line-height: 1rem;
    position: fixed;
    top: 0;
    z-index: 1000;
  }

  .header>div {
    display: inline-block;
    font-size: 14px;
  }

  .h_left {
    width: 15%;
    text-align: center;
    color: #fff;
  }

  .search {
    width: 65%;
  }

  .search>input {
    width: 100%;
    height: 0.6rem;
    border-radius: 15px;
    text-indent: 10px;
  }

  .top {
    width: 100%;
    height: 0.8rem;
    font-size: 12px;
    color: #fff;
    background: #398CD3;
    position: fixed;
    top: 45px;
    z-index: 500;
    display: flex;
    justify-content:space-around;
    align-items: center;
  }

  .top>div {
    display: inline-block;
  }

  .top_left {
    width: 80%;
    height: 30px;
    line-height: 30px;
  }

  .top_right {
    width: 20%;
    float: right;
  }

  .top_left>span {
    display: inline-block;
    width: 33%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .is_fix {
    font-size: 16px;
    border-bottom: 2px solid #fff;
    font-weight: bold;
  }

  .top_right>span {
    display: inline-block;
    width: 80%;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #F88509;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    float: right;
    margin-right: 5px;
  }

  .nav {
    width: 96%;
    margin: 0 auto;
    padding-top: 8px;
  }

  .nav>div {
    display: inline-block;
  }

  .nav_left {
    width: 49%;
    height: 1.7rem;
    background: #fff;
    border-radius: 5px;
  }

  .nav_right {
    width: 49%;
    height: 1.7rem;
    background: #fff;
    border-radius: 5px;
    float: right;
  }

  .nav_left>p {
    font-size: 16px;
    color: #F88509;
    font-weight: bold;
    margin: 0.3rem 0 0 20px;
  }

  .nav_left>span {
    margin-left: 20px;
  }

  .nav_right>p {
    font-size: 16px;
    color: #2A5B79;
    font-weight: bold;
    margin: 0.3rem 0 0 20px;
  }

  .nav_right>span {
    margin-left: 20px;
  }

  .nav_img {
    width: 100%;
    height: 2.5rem;
    background: url(../../../static/img/双十二入口胶囊图21@3x.png) no-repeat;
    background-size: 100%;
  }

  .list_top {
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    background: #fff;
    font-size: 14px;
  }

  .list_top>span {
    display: inline-block;
    color: #fff;
    width: 3rem;
    height: 30px;
    line-height: 30px;
    background: #DE3636;
    text-align: center;
    border-radius: 0 10px 10px 0;
  }

  .list_top>i {
    display: inline-block;
    float: right;
    margin-right: 30px;
    color: #0041F0;
  }

  .content {
    width: 96%;
    margin: 0 auto;
    font-size: 12px;
    display: flex;
    flex-warp: warp;
    /*CSS3样式，支持webkit，ms*/
    -ms-flex-wrap: wrap;
    /*IE9以及一下不支持*/
    -webkit-flex-wrap: wrap;
    /* padding-bottom: 80px; */
  }

  .demo {}

  .item {
    border: 1px solid #999;
    display: inline-block;
    flex: 0 0 48%;
    flex-wrap: 1;
    margin-top: 8px;
    margin-left: 5px;

  }

  .item>img {
    width: 100%;
    height: 3rem;
  }

  .item>div {
    height: 20px;
    line-height: 20px;
  }

  .item>div>i {
    display: inline-block;
    float: right;
    color: #666;
    margin-right: 5px;
  }

  .item>div>span {
    color: #FF0000;
    margin-left: 5px;
  }

  .item>div>em {
    display: inline-block;
    color: #FF0000;
    font-size: 14px;
    margin-left: 5px;
  }

  .vuxSlider {
    padding-top: 2rem;
  }

  .carousel {
    overflow: hidden;
    width: 100%;
    height: 500px;
    position: relative;
  }
</style>
