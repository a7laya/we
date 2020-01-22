<template>
  <div class="wrap">
    <div class="banner">
      <div class="banner-top">
        <img style="width: 20px; height: 20px;" src="/static/img/icon/goBack_white.png" @click="goMyOrder"/>
        <div style="color: #FFFFFF; font-size: 16px; font-weight: 500; margin-left: 5px;">订单详情</div>
        <img style="width: 20px; height: 20px; margin-left: auto; margin-right: 10px;" src="/static/img/icon/more_white.png" />
      </div>
      <div class="banner-body">
        <div style="font-size: 16px; font-weight: 400;">卖家已发货<span v-if="order_status == 5">(已申请退款)</span></div>
        <!-- <div style="font-size: 14px;">还剩9天自动确认</div> -->
      </div>
    </div>
    <!-- 物流信息 -->
    <div class="logistics" @click="goExpress">
      <img class="left-icon" src="/static/img/icon/logistics.png" />
      <div class="center-info">
        <div class="info-top" style="font-size: 12px; color: #3385FF;">{{currentLogitics}}</div>
        <div class="info-bottom" style="font-size: 12px; color: #BBBBBB;">{{currentLogiticsTime}}</div>
      </div>
      <img class="right-arrow" style="height: 25px; width: 25px;" src="/static/img/icon/arrow-right.png"/>
    </div>
    <!-- 收货地址 -->
    <div class="address">
      <img class="left-icon" src="/static/img/icon/position.png" />
      <div class="center-info" style="color: #555555;font-size: 12px;">
        <div class="info-top">
          {{consignee}}<span style="line-height: 12px; color: #BBBBBB; font-size: 12px;margin-left: 10px;">{{mobile}}</span>
        </div>
        <div class="info-bottom">{{region+address}}</div>
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="goods-info">
      <!-- 卖家信息 -->
      <div class="seller" @click="goSellerShop(seller_id)">
        <img src="/static/img/icon/seller.png" />
        <span style="margin: 0 10px;">{{seller_name}}</span>
        <img src="/static/img/icon/arrow-right.png"/>
      </div>
      <!-- 商品信息 -->
      <div class="goods" @click="goGoodsDetail(goods_id)">
        <img :src="$formatImg(goods_img)"/>
        <div style="margin: 0 15px;">{{goods_name}}</div>
        <div style="margin-left: auto;text-align: right;">
          ￥{{shop_price}}
          <div style="font-size: 12px; color: #BBBBBB;">x1</div>
        </div>
      </div>
      <!-- 退款按钮 -->
      <div class="refound">
        <div class="refound-btn" @click="goTuihuo(order_id,order_status)">
        <span v-if="order_status == 5">修改</span>退款
        </div>
      </div>
      <!-- 价格 -->
      <div class="price">
        <span>商品总价</span><span style="color: #555555;">￥{{totalPrice}}</span>
      </div>
      <div class="price">
        <span>运费</span><span>￥{{freight}}</span>
      </div>
      <div class="price">
        <span>实付款（含运费）</span><span style="color: orangered; font-size: 18px;">￥{{allTotalPrice}}</span>
      </div>
    </div>

    <!-- 客户备注信息 -->
    <div class="order-info">
      <div style="border-left: orangered solid 1px; padding-left:5px;padding-top: -10px; font-size: 12px; font-weight: 500;color: #555555;">客户备注</div>
      <div class="order-info-item" style="margin-top: 20px;">
        {{buyer_remarks}}
      </div>
      <!-- <div class="order-info-more">查看更多<img src="/static/img/icon/arrow-down.png" /></div> -->
    </div>

    <!-- 订单信息 -->
    <div class="order-info">
      <div style="border-left: orangered solid 1px; padding-left:5px;padding-top: -10px; font-size: 12px; font-weight: 500;color: #555555;">订单信息</div>
      <div class="order-info-item" style="margin-top: 20px;">
        订单编号：{{order_sn}}
      </div>
      <div class="order-info-item">
        下单时间：{{add_time}}
      </div>
      <!-- <div class="order-info-more">查看更多<img src="/static/img/icon/arrow-down.png" /></div> -->
    </div>


    <!-- 猜你喜欢 -->
    <guess-u-like :cat_id='cat_id'></guess-u-like>
    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {
    XDialog,
    InlineXNumber,
    XNumber,
    Swiper,
  } from 'vux'
  import {
    VueFoot01,
    VueSwiper2,
    VueShopHeaderNav,
  } from "../component/"
  import guessULike from "../component/guess-u-like.vue"
  export default {
    components: {
      VueFoot01,
      VueSwiper2,
      VueShopHeaderNav,
      XDialog,
      InlineXNumber,
      XNumber,
      Swiper,
      guessULike
    },
    data() {
      return {
        // 卖家相关
        seller_id: false,
        seller_name: false,
        seller_img: false,
        seller_city: false,
        seller_follow: 0,
        // 物流相关
        shipping_code: false,  // 731123456789 运单号
        shipping_name: false, // zhongtong 快递
        logistics: [], // 物流信息
        // 商品信息
        cat_id: 1,
        goods_id: false,
        goods_name: false,
        goods_img: false,
        goods_num: 0,
        goods_state:false,
        market_price: false,
        freight: false,
        shop_price: false,
        // 订单信息
        order_id: false,
        order_sn: false,
        order_status: false, // 1.买家取消 2.卖家取消 3.系统取消 4.订单已确认 5.退货已申请 6.退货已同意 7.确认收货 8.买家已评价 9.卖家已评价 10.交易完成
        add_time: false,
        buyer_remarks: false, // 客户备注
        // 收货人信息
        consignee: false,
        region: false,
        address: false,
        mobile: false,
        // 物流信息
        // to do
        // 猜你喜欢
        goods_like: [],
      }
    },
    computed: {
      user () {
        return this.$store.state.user;
      },
      totalPrice(){
        return this.shop_price * this.goods_num
      },
      allTotalPrice () {
        return this.totalPrice + this.freight
      },
      currentLogitics: () => this.logistics && this.logistics.length != 0 ? this.logistics[0].context : '暂时没有物流信息',
      currentLogiticsTime: () => this.logistics && this.logistics.length != 0 ? this.logistics[0].time : '可能还未发货，请耐心等待'
    },
    created() {
      var _this = this;
      var order_id = this.$route.query.order_id
      _this.order_id = order_id
      console.log('传到订单详情页的order_id:', order_id);
      _this.getOrderData(order_id);
    },
    methods: {

      // 退款 order_status==5 时变为编辑状态
      goTuihuo(order_id,order_status){
        this.$router.push({
          path:'./tuihuo_shenqing',
          query: {order_id,order_status}
        })
      },
      // 获取物流信息
      getLogistics(){
        var _this = this
        _this.$http.post(_this.$store.state.url + "/Cargo/query_order",{shipping_name:_this.shipping_name,shipping_code:_this.shipping_code})
          .then(res=>{
            console.log('获取物流信息：',res);
            _this.logistics = res
          })
      },
      // 转至物流详情页
      goExpress(){
       this.$router.push({
         path: './express',
         query: {
           order_id: this.order_id,
           shipping_code: this.shipping_code,
           shipping_name: this.shipping_name,
         }
       })
      },
      // 到卖家商铺
      goSellerShop (seller_id) {
        this.$router.push({
          path:'./sellershop',
          query: {
            id:seller_id
          }
        })
      },
      // 转到商品详情
      goGoodsDetail(goods_id){
        this.$router.push({
          path:'./shopdetails',
          query:{id:goods_id}
        })
      },
      // 转到我的订单
      goMyOrder(){
        this.$router.push({
          path:'./myorder',
          query:{}
        })
      },
      //获取订单数据
      getOrderData(order_id) {
        var _this = this;
        _this.$http
          .get(_this.$store.state.url + "/Cargo/order_info?order_id=" + order_id)
          .then(function(res) {
            console.log('/Cargo/order_info?order_id获取到的订单详情:',res);
            if (!res) return;
            // 物流相关
            _this.shipping_code = res.shipping_code
            _this.shipping_name = res.shipping_name
            _this.getLogistics()

            // 卖家相关
            _this.seller_id = res.seller.mem_id
            _this.seller_name = res.seller.mem_nickname || "一个优秀的卖家"
            _this.seller_img = res.seller.mem_headimgurl
            _this.seller_city =  res.seller.mem_region
            _this.seller_follow =  res.seller.seller_follow_count

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

            // 订单相关
            _this.order_sn = res.order_sn
            _this.order_status = res.order_status
            _this.add_time = res.add_time
            _this.buyer_remarks = res.buyer_remarks

            // 收货人相关
            _this.consignee = res.consignee
            _this.region = res.region
            _this.address = res.address
            _this.mobile = res.mobile
          });
      },
    }
  }
</script>

<style scoped>
.banner {
  width: 100%;
  height: 170px;
  background-image: url(../../../static/img/order_detail_top.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.banner-top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  padding-top: 10px;
}
.banner-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #FFFFFF;
  width: 200px;
  margin-top: 50px;
  padding-left: 50px;
}
.logistics,
.address {
  padding: 20px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #FFFFFF;
}
.logistics {
  border-bottom: #EEEEEE solid 1px;
}
.logistics>.left-icon,
.address>.left-icon {
  width: 30px;
  height: 30px;
  margin-right: 15px;
  flex-shrink: 0;
}

.goods-info,
.order-info {
  margin-top: 10px;
  padding: 10px;
  background-color: #ffffff;
}
.goods-info .seller{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  color: #555555;
  margin-bottom: 20px;
}

.goods-info .seller img {
  width: 15px;
  height: 15px;
}
.goods-info .goods {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 12px;
  line-height: 16px;
  color: #555555;
  width: 100%;
}

.goods-info .goods img {
  border-radius: 5px;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
}
.refound {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.refound-btn {
  width: 70px;
  height: 20px;
  border-radius: 10px;
  border: #eeeeee solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #979797;
  margin: 10px 0;
}
.price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #979797;
}
.order-info-more {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  color: #555555;
  font-size: 12px
}
.order-info-item {
  margin-left: 5px;
  font-size: 10px;
  color: darkgrey;
}
.order-info-more img {
  width: 10px;
  height: 7px;
  margin-left: 5px;
}
</style>
