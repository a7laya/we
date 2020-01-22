<!-- 卖家处理退款售后界面 -->
<template>
  <div class="wrap">
    <vue-shop-header-order title='处理退款/售后'></vue-shop-header-order>
    <!-- 退款商品 -->
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
            <span>现价￥<i style="font-size: 12px;">{{shop_price}}</i></span>
            <span style="color: #E93939;">{{discount}}折<i class="baoyou" v-if="freight == 0">包邮</i></span>
            <span style="color: #E93939;font-size: 16px;">退款￥{{totalPrice}}</span>
          </div>
            <div>订单号:{{order_sn}}</div>
            <div>下单时间:{{add_time}}</div>
            <div>申请退款时间:{{$formatTimestamp(refound_create_time)}}</div>

        </div>
      </div>
    </div>
    <!-- 退款倒计时 -->
    <div class="time" style="display: flex; width: 100%; height: 50px; justify-content: center;align-items: center; flex-direction: column;border-bottom: #EEEEEE solid 1px;">
        <!-- 7天自动处理 7*24*60*60*1000 = 604800000 ms -->
        <div>处理倒计时<span style="color: orangered;">{{rDay}}</span>天<span style="color: orangered;">{{rHour}}</span>小时<span style="color: orangered;">{{rMin}}</span>分<span style="color: orangered;">{{rSecond}}</span>秒</div>
        <div>(超时未处理，执行买家请求)</div>

    </div>
    <!-- 退款原因 -->
    <div class="nav_tab">
      <!-- 原因选择 -->
      <div>
        <span class="text-danger">退款原因</span>
        <span style="color: #BBBBBB;">{{refound_reason}}</span>
      </div>
      <!-- 退款说明 -->
      <div class="border-bottom">
        <span>退款说明</span>
        <div style="color: #BBBBBB;">{{refound_info}}</div>
      </div>
      <!-- 凭证 -->
      <div class="nav_img">
        <div v-for="(item,index) in refound_imgs" :key='index' style="margin-bottom: 10px; border-radius: 5px;">
          <img :src="$formatImg(item.img_name)"  style="width: 100%;height: 250px;"/>
        </div>
      </div>
    </div>

    <!-- 倒计时 -->

    <div style="height: 45px;"></div>
    <div style="height: 45px; width: 100%;display: flex;position: fixed;bottom: 0;left: 0;">
      <div style="width: 50%;height: 100%;display: flex;justify-content: center;align-items: center;background-color: #CCCCCC; color: #555555;"
      @click="refuse">拒绝</div>
      <div style="width: 50%;height: 100%;display: flex;justify-content: center;align-items: center;background-color: orangered;color: white;"
      @click="agree">同意</div>
    </div>
  </div>

</template>

<script>
  import {
    PopupPicker,
  } from 'vux'
  import {
    VueCropper,
    VueFoot01,
    VueShopHeaderOrder
  } from "../component/";
  export default {
    data() {
      return {
        // 退款申请相关
        refound_reason: '',
        refound_imgs:[],
        refound_info: '',
        refound_create_time: 0,

        // 卖家相关
        seller_id: false,
        seller_name: false,
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
        add_time: false,
        // 收货人信息
        consignee: false,
        region: false,
        address: false,
        mobile: false,
        // 物流信息
        // to do
        // 计时信息
        rDay: 0,
        rHour: 0,
        rMin: 0,
        rSecond: 0,
      }
    },
    computed:{
      user () {
        return this.$store.state.user;
      },
      discount () { // 折扣
        return (this.shop_price*10/this.market_price).toFixed(2)
      },
      totalPrice () { // 总价
        return this.shop_price*this.goods_num + this.freight
      }
    },
    created() {
      var _this = this;
      var order_id = this.$route.query.order_id
      _this.order_id = order_id
      console.log('卖家处理退款售后界面收到的order_id:',order_id);
      _this.getOrderData(order_id);
    },
    mounted() {
    },
    components: {
      PopupPicker,
      VueCropper,
      VueFoot01,
      VueShopHeaderOrder
    },
    methods: {
      // 同意
      agree(){
        var _this = this
        if(!this.order_id) return
        _this.$http
          .post(_this.$store.state.url + "/Cargo/refound_order_agree",{order_id: _this.order_id})
          .then(function(res) {
            if(!res) return msg('提交失败')
            msg('提交成功')
            _this.$router.go(-1)
          })
      },
      // 拒绝
      refuse(){
        var _this = this
        if(!this.order_id) return
        _this.$http
          .post(_this.$store.state.url + "/Cargo/refound_order_reject",{order_id: _this.order_id})
          .then(function(res) {
            if(!res) return msg('提交失败')
            msg('提交成功')
            _this.$router.go(-1)
          })
      },
      autoTime(x) { // 自动处理退货的时间-设定7天自动处理 7*24*60*60*1000 = 604800000 ms
        var _this = this
        var endTS =  this.refound_create_time + x*24*60*60*1000
        console.log('endTS:',endTS);
        var nowTS =  Date.now() // 可能得修改为服务器时间
        console.log('nowTS:',nowTS);
        var remainTS = endTS - nowTS
        console.log('remainTS:',remainTS);
        _this.rDay    = parseInt(remainTS / (24*60*60*1000))
        _this.rHour   = parseInt((remainTS-_this.rDay*24*60*60*1000) / (60*60*1000))
        _this.rMin    = parseInt((remainTS-_this.rDay*24*60*60*1000-_this.rHour*60*60*1000) / (60*1000))
        _this.rSecond = parseInt((remainTS-_this.rDay*24*60*60*1000-_this.rHour*60*60*1000-_this.rMin*60*1000) / 1000)
        function reduceTime() {
          _this.rSecond--
          if (_this.rSecond < 0) {_this.rSecond = 59; _this.rMin--}
          if (_this.rMin    < 0) {_this.rMin    = 59; _this.rHour--}
          if (_this.rHour   < 0) {_this.rHour   = 23; _this.rDay--}
          if (_this.rDay   < 0)  {
            console.log('已自动退款');
          }
        }
        setInterval(reduceTime,1000)
      },

      // 获取订单数据
      getOrderData(order_id) {
        var _this = this;
        _this.$http
          .get(_this.$store.state.url + "/Cargo/order_info?order_id=" + order_id)
          .then(function(res) {
            console.log('获取到的订单详情:',res);
            if (!res) return;
            // 退款申请相关
            _this.refound_reason = {1:'缺货',2:'买卖双方商妥',3:'商品出现问题',4:'其他'}[res.cancel_order]
            _this.refound_imgs = JSON.parse(res.refound_images)
            _this.refound_info = res.refound_info // 退款说明
            _this.refound_create_time = res.refound_create_time * 1000 // 退款申请时间 毫秒数
            // 设置7天倒计时
            _this.autoTime(7)

            // 卖家相关
            _this.seller_id = res.seller.mem_id
            _this.seller_name = res.seller.mem_nickname || "一个优秀的卖家"
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
            _this.add_time = res.add_time
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
    padding-bottom: 0.9rem;
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

  .c_title {
    width: 92%;
    margin: 0 auto;
    font-size: 14px;
  }

  .c_title>em {
    display: inline-block;
    font-size: 12px;
    color: #003BFF;
    float: right;
    padding-bottom: 10px;
  }
  .c_bottom {
    height: 300px;
  }
  .c_title>i {
    display: inline-block;
    color: #999999;
    text-align: center;
  }
  .c_middle {
    display: flex;
    flex-wrap: wrap;
    width: 92%;
    margin: 0 auto;
    justify-content: space-between;
  }
  .c_middle > img {
    width: 30%;
    height: 135px;
    display: inline-block;
  }
  .manage > span{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #999999;
  }
  .sure {
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;
  }
  .sure > span {
    display: inline-block;
    width: 45%;
    text-align: center;
    color: #F88509;
    border-radius: 15px;
    height: 25px;
    border: 2px solid #F88509;
    line-height: 25px;
    font-size: 14px;
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
    padding-bottom: 20px;
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

  .notice {
    width: 100%;
    height: 30px;
    background: #F3F3F3;
    color: #BFBFBF;
    line-height: 30px;
  }

  .notice>span {
    display: inline-block;
    margin-left: 15px;
  }

  .nav_tab {
    height: auto;
  }

  .shop {
    width: 82%;
    display: inline-block;
  }

  .nav_tab>div {
    width: 94%;
    min-height: 1rem;
    height: auto;
    line-height: 1rem;
    margin: 0 auto;
    /* padding-top: 20px; */
    color: #929292;
    border-bottom: 1px solid #ECECEC;
  }

  .vux-cell-box:not(:first-child):before {
    border-top: 0 !important;
  }

  .nav_tab>div>input {
    color: #B9B9B9;
    float: right;
    text-align: right;
    margin-top: 10px;
  }

  .shop_type {
    width: 100%;
    height: 11rem;
    color: #929292;
    border-bottom: 1px solid #ECECEC;
  }

  .shop_type>div {
    width: 94%;
    margin: 0 auto;
    margin-top: 20px;
  }

  .shop_type>div>i {
    display: inline-block;
    float: right;
  }

  .save {
    width: 100%;
    padding-bottom: 20px;
    padding-top: 10px;
  }

  .save>span {
    display: block;
    width: 30%;
    height: 30px;
    text-align: center;
    margin: 0 auto;
    background: #F88509;
    color: #fff;
    line-height: 30px;
    border-radius: 1rem;
  }

  .set_money {
    width: 100px;
    height: 100px;
    position: fixed;
    /* top: 0; */
  }

  .set_content {
    width: 100%;
    /* height: 7rem; */
    background: #fff;
    border-radius: 10px;
  }

  .set_content>p {
    color: #000;
    text-align: left;
    margin-left: 20px;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    padding-bottom: 0.3rem;
  }

  .set_content>span {
    display: inline-block;
    width: 40%;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background: #999;
    color: #fff;
    border-radius: 20px;
    font-size: 13px;
    margin-left: 5px;
    margin-bottom: 10px;
  }

  .is_fix {
    background: #F88509 !important;
  }

  .set_content>input {
    width: 70%;
    height: 0.8rem;
    border: 1px solid #6D6D6D;
    text-indent: 10px;
    color: #999999;
  }

  .set_save {
    width: 80%;
    margin: 0 auto;
    border-top: 1px solid #eaeaea;
    margin-top: 20px;
    padding-bottom: 20px;
  }

  .set_save>span {
    display: inline-block;
    width: 80px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #F88509;
    color: #F88509;
    border-radius: 15px;
    margin-top: 10px;
  }

  .guige {
    display: inline-block;
    width: 42%;
    text-align: right;
  }

  .guige>span {
    display: block;
  }

  .edit {
    width: 100px;
    height: 100px;
    position: fixed;
    /* top: 0; */
  }

  .param {
    width: 90%;
    height: 5rem;
    margin: 0 auto;
  }

  .param>input {
    display: inline-block;
    border: 1px solid #707070;
    text-indent: 5px;
    font-size: 12px;
    margin-top: 6px;
  }

  .input1 {
    width: 20%;
    height: 25px;
  }

  .input2 {
    width: 60%;
    height: 25px;
  }

  .img-box {
    background: #ffffff;
    /* height: 250px; */
    overflow: hidden;
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
