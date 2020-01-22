<template>
  <div class="wrap">
    <vue-shop-header-nav>商品详情</vue-shop-header-nav>
    <!-- 轮播图 -->
    <!-- <vue-swiper2 :type="1"></vue-swiper2> -->
    <!-- <swiper loop auto :list="goods_imgs" :index="demo07_index" @on-index-change="demo07_onIndexChange"></swiper> -->
    <div style="height: 1.2rem;"></div>
    <swiper :aspect-ratio='0.5625' loop auto :list="goods_imgs" ></swiper>
    <!-- 商品详情 -->
    <div class="content">
      <div>
        <p>{{goods_list.goods_name}}</p>
      </div>
      <div>
        <span>商品成色:{{goods_list.goods_state}}</span>
        <span style="float: right;margin-right: 15px;">数量:{{goods_list.store_count}}</span>
      </div>
      <div class="price">
        <span class="before_price">原价￥{{goods_list.market_price}}</span>
        <span>现价￥<i style="font-size: 18px;">{{goods_list.shop_price}}</i></span>
        <span>{{discount}}折</span>
        <span class="collect" v-if="isCollect" @click="collect(goods_list.goods_id)">收藏产品</span>
        <span class="collect active" v-else-if="isCollect==false" @click="noCollect()">已收藏</span>
      </div>
      <div>
        <span>产品所在地</span>
        <span style="float: right;margin-right: 15px;">{{goods_list.region_name}}</span>
      </div>
      <div>
        <span>运费</span>
        <span style="float: right;margin-right: 15px;">{{is_free_shipping}}</span>
      </div>
      <!-- <div>
        <span>地址</span>
        <span>{{address.address}}</span>
      </div> -->
    </div>
    <!-- 商家详情 -->
    <div class="business">
      <div>
        <div class="detail">
          <img class="touxiang" :src="$store.state.website.website_domain_name + '/uploads/' + this.goods_list.headimgurl"
            alt="">
          <div>
            <span class="nickname">{{goods_list.nickname}}</span>
            <i>{{goods_list.follow_count}}关注</i>
          </div>

        </div>
        <!-- <span class="guanzhu">关注</span> -->
        <div class="bus_title">
          <span>TA的尾货</span>
          <i  @click="toSellerShop()">更多</i>
        </div>

        <div class="bus_img">
          <img v-for="(img,index) in sellerData.seller_list" :key='index'
          :src="$store.state.website.website_domain_name + '/uploads/' + img.img_name"
          @click="shopDetails(img.goods_id)">
        </div>

      </div>
    </div>

    <!-- 产品 详情 -->
    <div class="shop_details">
      <div style="color: #fff;">
        <span v-for="(item,index) in shop_list" :key='index' :class="{'is_fix':isFixed == item.id}" @click="shopClick(item.id)">{{item.name}}</span>
      </div>
      <!-- 产品详情 -->
      <div class="detail1" v-html="this.goods_list.goods_content" v-if="isFixed == 0"></div>
      <!-- 产品规格 -->
      <div class="detail2" v-else-if="isFixed == 1">
        <div v-for="(v,index) in goods_list.parameter" :key='index'>{{index}}——{{v}}</div>
        <!-- <div v-html="this.goods_list.parameter"></div> -->
      </div>
    </div>
    <!-- 尾货交易说明 -->
    <div class="text">
      <div>
        <span class="text_shuoming">尾货交易说明</span>
      </div>
    </div>
    <div class="text_contet">
      <div>
        指商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</br>商家详情页（含主图）以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。</br>此说明仅当出现价格比较时有效，具体请参见《智汇优库价格发布规范》。若商家单独对划线价格进行说明的，以商家的表述为准。
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <guess-u-like :cat_id='cat_id' limit='10' noRouter @changeGoodID="goods_id = $event"></guess-u-like>

    <!-- 购买按钮 -->

    <div style="height: 45px;"></div>
    <div class="buy">
      <span>找TA聊聊</span>
      <span style="float: right;background: #F88509;color: #fff;" @click="isBuys()">立即购买</span>
    </div>

    <!-- 回到顶部 -->
    <div class="zhiding" @click="toTop"></div>

    <!-- 购买div -->
    <div class="buy_detail" v-if="isBuy">
      <div class="buy_1" @click="isBuy = false"></div>
      <div class="buy_2">
        <div class="close" @click="isBuy = false"></div>
        <div calss="buy_title" style="width: 94%;margin: 0 auto;padding: 0.5rem 0 0.5rem 0;">
          <img class="buy_img" :src="$store.state.website.website_domain_name + '/uploads/' + this.goods_list.imgs[0].img_name"
            alt="">
          <div class="buy_right">
            <div style="min-height: 48px;">{{goods_list.goods_name}}</div>
            <price :oprice="goods_list.market_price" :price="goods_list.shop_price"></price><!--
            <span style="margin-top: 20px;text-decoration: line-through;">原价￥{{goods_list.market_price}}</span>
            <span>现价￥<i style="font-size: 18px;">{{goods_list.shop_price}}</i>&nbsp;<em>{{discount}}折</em></span> -->
          </div>
        </div>
        <div class="buy_address">
          <div>
            <span>产品所在地:</span>
            <em>{{goods_list.region_name}}</em>
          </div>
        </div>
        <div class="buy_address">
          <div>
            <span>采购数量:</span>
            <button class="btn_minute" @click="btnAdd()">+</button>
            <input class="btn_input" type="text" value="1" size="1" v-model="all_num">
            <button class="btn_minute" @click="btnMinute()">-</button>
          </div>
        </div>

        <div class="buy_address">
          <div>
            <span>运费:</span>
            {{goods_list.freight == 0 ? '包邮' : '￥' + goods_list.freight.toFixed(2)}}
          </div>
        </div>

        <div class="buy_address">
          <div>
            <span style="font-size: 18px;color: #F92929;font-weight: bold;">合计:{{all_money}}</span>
          </div>
        </div>

        <div class="buy_sure">
          <div @click="all_sure()">
            确定
          </div>
        </div>

      </div>
    </div>

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
  import price from "../component/price.vue"
  export default {
    components: {
      VueFoot01,
      VueSwiper2,
      VueShopHeaderNav,
      XDialog,
      InlineXNumber,
      XNumber,
      Swiper,
      guessULike,
      price
    },
    data() {
      return {
        cat_id: '',
        goods_id: '',
        shop_list: [{
            id: 0,
            name: '产品详情'
          },
          {
            id: 1,
            name: '产品规格'
          },
        ],
        isFixed: 0,
        goods_list: [], //商品列表
        discount: '', //折扣
        is_free_shipping: '', //是否包邮  0 不包邮 1包邮
        goods_imgs: [], //主图图片
        goods_like: [], //喜欢的商品
        address: '', //地址
        isCollect: true, //判断是否收藏
        no_collect: '', //取消收藏的id
        isBuy: false, //购买界面
        all_num: 1, //购买总数量
        changeValue: '',
        demo07_index: 0,
        sellerData: {} ,// 卖家数据 包括info: 卖家信息 seller_list:在售商品
        mem_id: 0
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    mounted() {
      var _this = this;
      var id = this.$route.query.id
      console.log('id:', id);
      _this.getData(id);
      // _this.all_num = _this.$refs.changeValue.currentValue
    },
    watch: {
      'goods_id': {
        handler(val) {
          this.getData(val);
        },
        immediate: false
      }

    },
    computed:{
      all_money: function(){
        return (this.all_num * this.goods_list.shop_price + this.goods_list.freight).toFixed(2)
      }

    },
    methods: {
      // 点击更多，挑转他的商品
      toSellerShop() {
        console.log("in toSellerShopid:", this.mem_id)
        this.$router.push({
          path: './sellershop',
          query: {
            id: this.mem_id,
          }
        })
      },
      // 进入猜你喜欢商品详情
      shopDetails(id) {
        // 重新渲染页面
        this.getData(id)
        // 滚动到top
        this.toTop()
      },
      demo07_onIndexChange(index) {
        this.demo07_index = index
      },
      btnMinute() {
        if (this.all_num <= 1) {
          // msg('该宝贝不能减少了哟~')
        } else {
          this.all_num--
        }
      },
      btnAdd() {
        if (this.all_num >= this.goods_list.store_count) {
          // msg('已到达最高库存量~')
        } else {
          this.all_num++
        }
      },
      isBuys() {
        var _this = this;
        _this.isBuy = true
      },
      //点击购买
      all_sure() {
        this.$router.push({
          path: './order',
          query: {
            goods_id: this.goods_list.goods_id,
            num: this.all_num,
            freight:  this.goods_list.freight,
          }
        })
      },

      shopClick(id) {
        this.isFixed = id
      },
      //回到顶部
      toTop() {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        // 实现滚动效果
        const timeTop = setInterval(() => {
          document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
          if (top <= 0) {
            clearInterval(timeTop);
          }
        }, 10);
      },
      //获取商品数据
      getData(id) {
        var _this = this;
        _this.$http
          .post(_this.$store.state.url + "/Cargo/find_goods_details", {
            goods_id: id
          })
          .then(function(res) {
            if (!res) return;
            console.log(res);
            _this.getSellerData(res.user_id) // 获取卖家数据
            _this.goods_list = res;
            _this.discount = ((res.shop_price / res.market_price) * 10).toFixed(2)
            if (res.is_free_shipping == 0) {
              _this.is_free_shipping = res.freight
            } else {
              _this.is_free_shipping = '包邮'
            }
            // _this.goods_imgs = res.imgs
            _this.address = res.address
            _this.cat_id = res.cat_id
            //判断是否关注 is_follow 如果是int类型证明已关注 取反是没有关注
            if (!res.is_follow) {
              //res.is_follow 代表没有关注 点击是关注 调用关注接口
              _this.isCollect = true
            } else {
              _this.isCollect = false
            }
            // _this.all_money = _this.all_num * _this.goods_list.shop_price + '.00'
            let img_list = [];
            img_list = res.imgs;
            _this.goods_imgs = []
            for (let i = 0; i < img_list.length; i++) {
              _this.goods_imgs.push(
                  {
                     url: 'javascript:',
                     img:_this.$store.state.website.website_domain_name + '/uploads/' + img_list[i].img_name,
                     title: '',
                  }

              )
            }
            console.log('_this.goods_imgs')
            console.log(_this.goods_imgs)
          });
      },
      // 获取卖家数据
      getSellerData(user_id) {
        var _this = this;
        _this.$http.post(_this.$store.state.url + "Cargo/seller_list", {
            bu_uid: user_id,
            limit: 3
          }).then(function(res) {
            if (!res) return;
            _this.sellerData = res
            _this.mem_id = res.info.mem_id
          });
      },

      //收藏商品
      collect(id) {
        var _this = this;
        _this.$http
          .post(_this.$store.state.url + "/Cargo/is_add_follow", {
            type: 1,
            goods_id: id
          })
          .then(function(res) {
            if (!res) return;
            // _this.goods_like = res
            console.log("collect res:",res)
            msg('收藏成功')
            _this.isCollect = false
            _this.no_collect = res.id
          });
      },

      //取消收藏
      noCollect() {
        var _this = this;
        _this.$http
          .post(_this.$store.state.url + "/Cargo/is_add_follow", {
            type: 2,
            follow_id: _this.no_collect
          })
          .then(function(res) {
            if (!res) return;
            // _this.goods_like = res
            msg('取消成功')
            _this.isCollect = true
          });
      },

      //购买
      buy(id) {

      },

    }
  }
</script>

<style scoped>
  .is_fix {
    background: #666666 !important;
  }

  .vuxSlider {
    padding-top: 45px;
  }

  .content {
    background: #fff;
    margin-top: 5px;
    font-size: 14px;
    color: #8E8989;
  }

  .content>div {
    min-height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e6e6e6;
  }

  .content>div>p,
  .content>div>span {
    display: inline-block;
    margin-left: 15px;
  }

  .content>div>p {
    width: 90%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .price {
    color: #F92929;
    font-weight: bold;
    line-height: 30px;
  }

  .before_price {
    width: 100%;
    display: block;
    text-decoration: line-through
  }

  .collect {
    float: right;
    margin-right: 15px;
    color: #C6C6C6;
    border: 1px solid #C6C6C6;
    width: 2rem;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
    text-align: center;
    border-radius: 15px;
  }
  .collect.active {
    background-color: orange;
    color: white;
  }

  .business {
    /* background: #fff; */
    width: 100%;
    height: 6rem;
    margin-top: 20px;
  }

  .business>div {
    width: 90%;
    margin: 0 auto;
  }

  .touxiang {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    float: left;
    margin-right: 20px;
  }

  .detail {
    width: 60%;
    float: left;
    border-bottom: 1px solid #999;
    padding-bottom: 3px;
  }

  .detail>div {
    margin: 10px 0 0 5px;
    color: #ACACAC;
  }

  .guanzhu {
    float: right;
    display: inline-block;
    width: 50px;
    text-align: center;
    margin-top: 20px;
    border: 1px solid #999;
    border-radius: 15px;
    color: #999;
  }

  .bus_title {
    padding-top: 20px;
    font-size: 14px;
    clear: both;
  }

  .bus_title>span {
    display: inline-block;
    color: #000;
    clear: both;
  }

  .bus_title>i {
    display: inline-block;
    color: #000AFF;
    float: right;

  }

  .bus_img {
    margin-top: 20px;
  }

  .bus_img>img {
    /* clear: both; */
    width: 30%;
    height: 2.4rem;
    display: inline-block;
    margin-left: 5px;
  }

  .shop_details {
    width: 100%;
    /* height: 50px; */
    background: #fff;
    margin-top: 20px;
    padding-bottom: 10px;
  }

  .shop_details>div {
    /* height: 30px; */
    line-height: 30px;
    font-size: 14px;

  }

  .shop_details>div>span {
    display: inline-block;
    background: #999999;
    width: 50%;
    text-align: center;
  }

  .shop_details>div :last-child {
    /* float: right; */
  }

  .detail1 {
    width: 90%;
    margin: 0 auto;
    color: #666;
    padding-top: 20px;
  }

  .detail2 {
    width: 90%;
    margin: 0 auto;
    color: #666;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .text {
    border-top: 2px solid #eaeaea;
    /* height: 200px; */
    background: #fff;
  }

  .text>div {
    width: 90%;
    margin: 0 auto;
  }

  .text_shuoming {
    display: block;
    height: 1rem;
    line-height: 1rem;
    color: #F88509;
    font-size: 14px;
    font-weight: bold;
  }

  .text_contet {
    background: #F5F5F5;
    color: #999;
  }

  .text_contet>div {
    width: 90%;
    margin: 0 auto;
    padding: 10px 0 10px 0;
  }

  .buy {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #fff;
    border-top: 1px solid #999;
  }

  .buy>span {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 14px;
    color: #666666;
  }

  .zhiding {
    width: 1rem;
    height: 1rem;
    background: url(../../../static/img/zhiding2.png) no-repeat;
    background-size: 1rem;
    position: fixed;
    right: 5px;
    top: 86%;
  }

  .nickname {
    width: 50%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .buy_detail {
    width: 100%;
    height: 100%;
    /* background: #333;
    opacity: 0.5; */
    position: fixed;
    top: 0;
    /* opacity: 0.6; */
    z-index: 6000;
  }

  .buy_1 {
    height: 35%;
    background: #333;
    opacity: 0.6;
  }

  .buy_2 {
    height: 65%;
    background: #fff;
    /* padding: 0.4rem; */
    font-size: 14px;
    color: #8E8989;
  }

  .close {
    background: url(../../../static/img/close01.png) no-repeat;
    height: 20px;
    line-height: 20px;
    background-position-x: right;
    width: 94%;
    margin: 0 auto;
    background-position-y: 0.2rem;
  }

  .buy_img {
    width: 4rem;
    height: 3rem;
    display: inline-block;
  }

  .buy_right {
    display: inline-block;
    vertical-align: top;
    margin-left: 20px;
    width: 48%;
  }

  .buy_right>span {
    display: block;
    color: #F92929;
    font-weight: bold;
  }

  .buy_right>div {
    min-height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .buy_address {
    height: 45px;
    line-height: 45px;
    border-top: 1px solid #e3e3e3;
  }

  .buy_address>div {
    width: 94%;
    margin: 0 auto;
  }

  .address_detail {
    display: inline-block;
    background: url(../../../static/img/select@3x.png) no-repeat;
    background-position: 10px;
    background-size: 14px;
    padding-left: 30px;
  }

  .buy_num {
    width: 3.3rem;
    float: right;
    margin-top: 8px;
  }

  .buy_sure {
    height: 45px;
    line-height: 45px;
  }

  .buy_sure>div {
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
    background: #F88509;
    color: #fff;
    font-size: 18px;
  }

  .btn_minute {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background: #fff;
    border: 1px solid #999;
    float: right;
    margin-top: 12px;
  }

  .btn_input {
    display: inline-block;
    width: 0.6rem;
    height: 0.45rem;
    text-align: center;
    float: right;
    margin-top: 12px;
    border-bottom: 1px solid #999;
    border-top: 1px solid #999;
  }
</style>
