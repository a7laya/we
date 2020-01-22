<template>
  <div class="wrap">
    <vue-shop-header-order :title='title'></vue-shop-header-order>
    <div style="width: 100%;height: 1px;background-color: #4B96D6;padding-top: 1.2rem;"></div>
    <!-- 商品详情 -->
    <div class="nav_list">
      <div class="list">
        <img :src="$formatImg(goods_img)" alt="">
        <div class="list_right">
          <span class="title">{{goods_name}}</span>
          <div>
            <span style="text-decoration: line-through;">原价￥{{market_price}}</span>
            <span>数量:{{goods_num}}</span>
            <span>{{goods_state}}成新</span>
          </div>
          <div>
            <span>现价￥{{shop_price}}</span>
            <span style="color: #E93939;">{{discount}}折<i class="baoyou" v-if="freight == 0">包邮</i></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 评价详情 -->
    <div class="detail" v-for="(item,index) in comments" :key='index'>
      <img :src="$formatImg(item.mem_headimgurl)">
      <div class="info">
        <span class="name">{{item.mem_nickname || '匿名'}}<i>{{item.role == 1 ? '买家' : '卖家'}}</i></span>
      </div>
      <div class="pinglun">
        <span>评价:</span>
        <div>{{item.content}}</div>
      </div>
    </div>

    <!-- <div class="detailme">
        <div class="info">
          <span class="name" ></i></span>
        </div>
        <span>我</span>
        <img src="../../../static/img/3c32ddd9819458d383e022afb15a0b45@3x.png" alt="">
      <div class="mypinglun">
        <span>回复:</span>
        <div>非常好的商品非常好的商品非常好的商品非常好的商品非常好的商品非常好的商品非常好的商品非常好的商品</div>
      </div>
    </div> -->


    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {

  } from 'vux'
  import {
    VueFoot01,
    VueShopHeaderOrder
  } from "../component/";
  export default {
    data() {
      return {
        title: '交易评价',
        comment: ['好评','中评','差评'],
        isFixed: 0,
        order_id:0,
        // 商品信息
        cat_id: 1,
        goods_id: false,
        goods_name: false,
        goods_img: false,
        goods_num: 0,
        goods_state: false,
        market_price: 0.01,
        freight: 0,
        shop_price: 0,
        comments: []
      }
    },
    components: {
      VueFoot01,
      VueShopHeaderOrder
    },
    created() {
      var _this = this;
      var order_id = this.$route.query.order_id
      _this.order_id = order_id
      console.log('传到订单详情页的order_id:', order_id);
      _this.getOrderData(order_id);
      _this.getComment(order_id);
    },
    computed: {
      discount() {
        return ((+this.shop_price * 10) / (+this.market_price)).toFixed(2)
      },
    },
    methods: {
      commentClick(id) {
        this.isFixed = id
      },
      // 获取评论内容
      getComment(order_id) {
        var _this = this;
        _this.$http
          .get(_this.$store.state.url + "/Cargo/select_comment_memid?order_id=" + order_id)
          .then(function(res) {
            _this.comments = res
          })
      },
      //获取订单数据
      getOrderData(order_id) {
        var _this = this;
        _this.$http
          .get(_this.$store.state.url + "/Cargo/order_info?order_id=" + order_id)
          .then(function(res) {
            console.log('获取到的订单详情:', res);
            if (!res) return;

            // 商品详情
            _this.cat_id = res.cargo_goods.cat_id
            _this.goods_id = res.goods_id
            _this.goods_name = res.goods_name
            _this.goods_img = res.img_name
            _this.goods_num = res.goods_num
            _this.goods_state = res.goods_state
            _this.market_price = res.market_price
            _this.shop_price = res.shop_price
            _this.freight = res.cargo_goods.freight

          });
      },
    }
  }
</script>

<style scoped>
  .wrap {
    background: #fff;
  }
  .top {
    padding-top: 1.2rem;
    height: 76px;
  }
  .top > img {
    display: inline-block;
    width: 45px;
    height: 45px;
    vertical-align: middle;
    margin: 18px;
  }
  .detail {
    padding: 20px 0 10px 0;
    border-bottom: 1px solid #ebebeb;
    border-top: 3px solid #F1F1F1;
  }
  .detail > img {
    display: inline-block;
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-left: 18px;
  }
  .detailme {
    padding: 10px 0 10px 0;
    border-bottom: 1px solid #ebebeb;
    border-top: 3px solid #F1F1F1;
  }
  .detailme > img {
    display: inline-block;
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-left: 0px;
  }


  .info {
    display: inline-block;
    vertical-align: middle;
    width: 76%;
  }
  .name {
    font-size: 14px;
  }
  .name > i{
    display: inline-block;
    float: right;
    margin-right: 16px;
  }
  .info > span {
    display: block;
    height: 30px;
    line-height: 30px;
    color: #AAAAAA;
  }

  .nav_list {
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
  .handle2>span {
    display: inline-block;
    width: 38%;
    text-align: right;
    color: #003BFF;
  }

  .handle2>i {
    display: inline-block;
    width: 20%;
    background-color: #999999;
    color: #fff;
    border-radius: 5px;
    text-align: center;
  }
  .com_top {
    width: 92%;
    margin: 0 auto;
    color: #666666;
  }
  .pinglun {
    width: 88%;
    margin: 0 auto;
    background: #EBEBEB;
    border-radius: 5px;
    color: #666;
    padding-top: 5px;
    margin-top: 15px;
  }
  .pinglun > div {
    display: inline-block;
    width: 81%;
    text-align: left;
    padding-bottom: 5px;
  }
  .pinglun > span {
    display: inline-block;
    width: 10%;
    vertical-align: top;
    text-indent: 5px;
  }
  .mypinglun {
    width: 88%;
    margin: 0 auto;
    background: #FFF5F4;
    border-radius: 5px;
    color: #666;
    padding-top: 5px;
    margin-top: 15px;
  }
  .mypinglun > div {
    display: inline-block;
    width: 81%;
    text-align: left;
    padding-bottom: 5px;
  }
  .mypinglun > span {
    display: inline-block;
    width: 10%;
    vertical-align: top;
    text-indent: 5px;
  }
</style>
