<!-- 卖家给买家的评价 -->
<template>
  <div class="wrap">
    <vue-shop-header-order :title='title'></vue-shop-header-order>
    <div class="top">
      <img :src="$formatImg(buyer_img)" @>
      <div class="info">
        <span class="name">{{buyer_name}}<i>{{buyer_follow}}人关注</i></span>
        <span>来自{{buyer_city}}的买家</span>
      </div>
    </div>
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
            <span>现价￥<i style="font-size: 16px;">{{shop_price}}</i></span>
            <span style="color: #E93939;">{{discount}}折<i v-show='freight==0' class="baoyou">包邮</i></span>
            <span style="color: #E93939;font-size: 16px;">￥{{totalPrice}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 评价 -->
    <div class="comment">
      <div class="com_top">
        <span>整体评价:</span>
        <i v-for="(v,index) in comment" :key='index' :class="{'is_fix': isFixed == index}" @click="commentClick(index)">{{v}}</i>
        <textarea placeholder="此次交易您还满意吗？说说您的意见……" v-model="comment_context"></textarea>
      </div>
      <div class="com_bottom"></div>
    </div>
    <div class="nav_img">
      <div class="img-box user_up_imgfile">
        <span v-for="(item, index) in comment_img" :key="index">
          <img :src="$formatImg(item.img_name)" style="height: 100px; width: 165px;" />
          <span class="userupicon_cal" @click="deletePic(index)">
            <x-icon type="ios-close" size="26"></x-icon>
          </span>
        </span>
        <vue-cropper @data="fileImgarr" :autoCropWidth="320" :autoCropHeight="180" v-show="comment_img.length < 9">
          <!-- <img src="/static/img/icon1.png" alt /> -->
          <span class="update">上传相关图片</span>
        </vue-cropper>
      </div>
    </div>

    <div style="width: 100%; display: flex;justify-content: center;align-items: center; margin-top: 10px; padding-bottom: 30px;">
      <div class="submit" @click="fabu">发布</div>
    </div>
    <div style="height: 45px;"></div>
    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {

  } from 'vux'
  import {
    VueFoot01,
    VueShopHeaderOrder,
    VueCropper
  } from "../component/";
  export default {
    data() {
      return {
        title: '交易评价',
        comment: ['好评', '中评', '差评'],
        comment_range: 0, // 0-好评 1-中评 2-差评
        comment_context: '', // 评价内容
        comment_img: [], // 评价图片
        isFixed: 0,
        
        // 卖家相关
        seller_id: false,
        seller_name: false,
        seller_img: false,
        seller_city: false,
        seller_follow: 0,
        
        // 买家相关
        buyer_id: false,
        buyer_name: false,
        buyer_img: false,
        buyer_city: false,
        buyer_follow: 0,

        // 物流相关
        shipping_code: false, // 731123456789 运单号
        shipping_name: false, // zhongtong 快递
        logistics: [], // 物流信息
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
        // 订单信息
        order_id: false,
        order_sn: false,
        order_status: false, // 1.买家取消 2.卖家取消 3.系统取消 4.订单已确认 5.退货已申请 6.退货已同意 7.确认收货 8.买家已评价 9.卖家已评价 10.交易完成
        add_time: false,
        // 收货人信息
        consignee: false,
        region: false,
        address: false,
        mobile: false,
        // 物流信息
        // to do
        // 猜你喜欢
        form: {},
      }
    },
    components: {
      VueCropper,
      VueFoot01,
      VueShopHeaderOrder
    },
    created() {
      var _this = this;
      var order_id = this.$route.query.order_id
      _this.order_id = order_id
      console.log('传到订单详情页的order_id:', order_id);
      _this.getOrderData(order_id);
    },
    computed: {
      discount() {
        return ((+this.shop_price * 10) / (+this.market_price)).toFixed(2)
      },
      totalPrice() {
        return this.shop_price * this.goods_num + this.freight
      }
    },
    methods: {
      // 提交的东西
      setForm() {
        var _this = this
        var img = []
        _this.comment_img.forEach(v=>{
          console.log(v);
          img.unshift(v.img_name)
        })
        this.form = {
          role: 2, // 1-买家 2-卖家
          goods_id: _this.goods_id,
          user_b_id: _this.seller_id,
          order_id: _this.order_id,
          goods_rank: _this.comment_range + 1, // 1-好评 2-中评 3-差评
          content: _this.comment_context, // 评价内容
          img: img, // 评价图片
          video: '' // 视频
        }
      },
      // 发布评价
      fabu(){
        var _this = this
        this.setForm()
        console.log('发布评价提交的form:', _this.form);
        _this.$http
          .post(_this.$store.state.url + "/Cargo/appraise_user",_this.form)
          .then(function(res) {
            console.log('发布评价接口返回的res:', res);
            if(!res) msg('评价发布失败')
            msg('感谢您的评价')
            _this.$router.push({
              path: './shoporder',
              query: {activeTab:2}
            })
          })
      },
      // 选择评价-评级
      commentClick(index) {
        this.isFixed = index
        this.comment_range = index
      },
      //获取订单数据
      getOrderData(order_id) {
        var _this = this;
        _this.$http
          .get(_this.$store.state.url + "/Cargo/order_info?order_id=" + order_id)
          .then(function(res) {
            console.log('获取到的订单详情:', res);
            if (!res) return;
            // 物流相关
            // _this.shipping_code = res.shipping_code
            // _this.shipping_name = res.shipping_name
            // _this.getLogistics()

            // 买家相关
            _this.buyer_id     = res.buyer.mem_id
            _this.buyer_name   = res.buyer.mem_nickname || "一个优秀的买家"
            _this.buyer_img    = res.buyer.mem_headimgurl
            _this.buyer_city   = res.buyer.mem_region
            _this.buyer_follow = res.buyer.seller_follow_count
            
            // 卖家相关
            _this.seller_id     = res.seller.mem_id
            _this.seller_name   = res.seller.mem_nickname || "一个优秀的卖家"
            _this.seller_img    = res.seller.mem_headimgurl
            _this.seller_city   = res.seller.mem_region
            _this.seller_follow = res.seller.seller_follow_count

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
            // 收货人相关
            _this.consignee = res.consignee
            _this.region = res.region
            _this.address = res.address
            _this.mobile = res.mobile
          });
      },
      //上传主图
      fileImgarr(res) {
        console.log('上传主图：', res);
        this.comment_img.push({
          img_id: this.comment_img.length,
          img_name: res.imgurl
        });
      },

      //删除主图
      deletePic(index) {
        console.log('删除主图：', index);
        this.comment_img.splice(index, 1);
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

  .top>img {
    display: inline-block;
    width: 45px;
    height: 45px;
    vertical-align: middle;
    margin: 18px;
  }

  .info {
    display: inline-block;
    vertical-align: middle;
    width: 76%;
  }

  .name {
    font-size: 14px;
  }

  .name>i {
    display: inline-block;
    float: right;
    margin-right: 16px;
  }

  .info>span {
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
    height: 110px;
    border-bottom: 1px solid #F0F0F0;
    padding-top: 10px;
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

  .com_top>textarea {
    display: block;
    width: 90%;
    height: 80px;
    margin: 10px auto 10px;
    border-radius: 5px;
    text-indent: 10px;
    padding-top: 5px;
  }

  .com_top>span {
    display: inline-block;
    width: 32%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #666666;
  }

  .com_top>i {
    display: inline-block;
    width: 21%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: url(../../../static/img/爱心空心@2x.png) no-repeat;
    background-size: 20px;
    background-position-y: center;
  }

  .is_fix {
    background: url(../../../static/img/微信图片_20191227154338.png) no-repeat !important;
    background-size: 20px !important;
    background-position-y: center !important;
  }

  .add {
    width: 92%;
    height: 70px;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 50px;
  }

  .add_img {
    width: 68px;
    height: 68px;
    border: 1px dashed #808080;
    background: url(../../../static/img/图片@2x.png) no-repeat;
    background-position: center;
    margin-left: 20px;
  }

  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 25px;
    border: orangered solid 1px;
    color: orangered;
    border-radius: 10px;
    font-weight: 500;
  }

  .nav {
    background: #fff;
    font-size: 14px;
  }

  .nav_top {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #e9e9e9;
  }

  .nav_top>span {
    display: inline-block;
    margin-left: 15px;
  }

  .nav_top>input {
    text-indent: 10px;
  }

  .nav_img {
    padding:0 20px;
  }

  .update {
    display: block;
    margin: 20px 0 0 15px;
    width: 110px;
    height: 1rem;
    line-height: 1rem;
    border: 1px dashed #DFDFDF;
    color: #E1E1E1;
    text-align: center;
  }

  .input_img,
  .user_up_imgfile {
    display: inline-block;
  }

  .user_up_imgfile .userupicon_cal {
    position: absolute;
    top: -10px;
    right: -10px;
    fill: #d52121;
  }


  .pos {
    min-height: 100px !important;
    height: auto !important;
  }

  .user_up_imgfile {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    /*justify-content: center;*/
    padding: 15px 15px 10px 15px;
  }

  .user_up_imgfile .userupicon_cal {
    position: absolute;
    top: -10px;
    right: -10px;
    fill: #d52121;
  }

  .user_up_imgfile>span {
    /*display: ;*/
    width: 48%;
    margin-bottom: 10px;
    position: relative;
  }

  .user_up_imgfile>span {
    /*display: ;*/
    width: 48%;
    margin-bottom: 10px;
    position: relative;
  }

  .xing {
    display: inline-block;
    width: 82%;
  }

  input {
    /* border: #000000 solid 1px !important; */
    width: 80%;
    height: 28px;
  }
</style>
