<template>
  <div class="wrap">
    <vue-shop-header-order title='待发尾货'></vue-shop-header-order>
    <!-- <div class="nav">
      <tab :line-width="3" active-color="#F88509" custom-bar-width="60px">
        <tab-item :selected="activeTab === item.id" v-for="(item, index) in list3"
        @on-item-click="changeTab(item.id)" :key="index">{{item.name}}</tab-item>
      </tab>
    </div> -->
    <div style="height: 1.2rem;"></div>
    <!-- 待发尾货 -->
    <div class="nav_list" v-if="activeTab == 0">
      <div class="list" v-for="(item,index) in wait_list" :key='index'>
        <img :src="$formatImg(item.img_name)" @click="shopDetails(item.goods_id)">
        <div class="list_right">
          <span class="title" @click="shopDetails(item.goods_id)">{{item.goods_name}}</span>
          <div>
            <span style="text-decoration: line-through;min-width: 60%;">原价￥{{item.market_price}}</span>
            <span>{{{10:'全新',9:'9新',8:'8新'}[item.goods_state]}}</span>
          </div>
          <div>
            <span style="min-width: 60%;">现价￥<i style="font-size: 14px;">{{item.shop_price}}</i></span>
            <span style="color: #E93939;">{{((item.shop_price / item.market_price) * 10).toFixed(2)}}折<i class="baoyou" v-if="item.is_free_shipping">包邮</i></span>
          </div>
            <p class="order">
              <span>订单号:{{item.order_sn}}</span>
              <span>时间:{{item.add_time}}</span>
            </p>
        </div>
        <div style="font-size: 12px;color: #CCCCCC; padding: 5px;"
        v-if="item.buyer_remarks">
          买家备注:{{item.buyer_remarks}}
        </div>
        <div class="handle1" v-if="item.order_status != 2">
          <span @click.stop="cancelOrder(item.order_id)">取消订单</span>
          <span>联系买家</span>
          <span>确认地址</span>
          <span @click="goConfirm(item.order_id)">去发货</span>
        </div>
        <!-- <div class="handle1" v-if="item.order_status == 2">
          <span >订单已取消</span>
        </div> -->
        <div class="item-badge font-md" v-show="item.order_status == 2">订单已取消</div>
      </div>

    </div>
    <!-- 取消订单 -->
    <div v-transfer-dom>
        <x-dialog v-model="show" class="dialog-demo" hide-on-blur>
              <group title="取消原因">
                 <selector ref="cancelValueRef" placeholder="请选择取消原因" v-model="cancelReasonValue" title="取消原因" :options="cancelReason"></selector>
               </group>
          <x-button  @click.native="confirmCancel('cancelValueRef')">确定取消</x-button>
        </x-dialog>
    </div>

    <!-- 待TA收货 -->

    <!-- 尾货评价 -->

    <!-- 退款/售后 -->



    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {
    XDialog,
    XButton,
    XSwitch,
    TransferDomDirective as TransferDom,
    Selector,
    Group
  } from 'vux'
  import {
    Tab,
    TabItem,
  } from 'vux'
  import {
    VueFoot01,
    VueSwiper2,
    VueShopHeaderOrder
  } from "../component/";
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        cancelReason: [{key: '1', value: '缺货'}, {key: '2', value: '与买家商妥'}, {key: '3', value: '商品出现问题'}, {key: '4', value: '其他'}],
        cancelReasonValue: '',
        activeTab: 0,
        wait_list: [],
        shipped_list: [],
        comment_list: [],
        aftersale_list: [],
        show: false,
        loading:false,
        cancelOrderId: 0,
        showConfirmReceived: false, // 确认收货弹框
        order_id_confirm: false, // 点确认收货后存相应的order_id
        loading2: false ,// 点确认收货之后的loading,
        password: '', // 确认收货支付的密码
        done: false ,// 售后处理完成
        show3: false // 显示后面3个标签tab
      }
    },
    components: {
      VueFoot01,
      VueSwiper2,
      VueShopHeaderOrder,
      Tab,
      TabItem,
      XDialog,
      XButton,
      XSwitch,
      Selector,
      Group
    },
    created() {
      this.show3 = this.$route.query.show3
    },
    mounted() {
      this.getData()
    },
    methods: {
      // 查看退款详情
      foundDetail(order_id){
        this.$router.push({
          path: './refound_detail',
          query:{
            order_id: order_id,
            role: 2
          }
        })
      },
      // 确认收货
      comfirmReceive(order_id){
          this.showConfirmReceived = true
          this.order_id_confirm = order_id
      },
      // 输入支付密码点确定之后
      nowPay() {
        var _this = this;
        if (this.loading2) return
        this.loading2 = true
        // 先付款，后写入订单
        // this.$cargopay.pay(_this, {
        //   order_id: this.goods_id,
        //   money: _this.total_money * 100,
        //   Arrivaltype: 6,
        // }).then(function(res) {
        //   console.log('订单付款页面，提交付款',res);
        //   if (!res) return msg('未完成付款')
          _this.$http
            .get(_this.$store.state.url + "/Cargo/refound_confirm_receipt?order_id=" + this.order_id_confirm + "&password=" + this.password)
            .then(function(res) {
              if(!res) return msg('确认收货失败')
              console.log('确认收货返回:',res);
              _this.loading2 = false
              _this.showConfirmReceived = false
              console.log('页面显示已完成');
              window.location.reload()
            })
        // });
      },
      // 转至评价
      shopCommentOver(order_id){
        this.$router.push({
          path:'./shopcommentover',
          query: {order_id}
        })
      },
      // 转至查看评价
      shopReview(order_id){
        this.$router.push({
          path:'./shop_review',
          query: {order_id}
        })
      },

      // 查看物流信息
      express(order_id){
        this.$router.push({
          path: './express',
          query: {
           order_id
          }
        })
      },
      // 转到商品详情页
      shopDetails(goods_id) {
        this.$router.push({
          path: './shopdetails',
          query: {id:goods_id}
        })
      },
      // 去发货
      goConfirm(order_id){
        this.$router.push({
          path: './shipping_confirm',
          query: {
            order_id:order_id,
            role: 2  // 卖家的确认发货传 2 买家传1
           }
        })
      },
      changeTab(id) {
        this.activeTab = id
      },
      tuihuo(order_id) {
        this.$router.push({
          path: './tuihuo',
          query: {
            order_id
          }
        })
      },
      //获取商品数据
      getData(id) {
        var _this = this;
        // 待发尾货
        _this.$http.get(_this.$store.state.url + "/Cargo/seller_cargo_order?type=1").then(function(res) {
            console.log("待发尾货 res:", res);
            if (!res) return;
            _this.wait_list = res;
        });

      },

      // 取消订单
      cancelOrder(order_id) {
        console.log("cancelOrder order_id", order_id)
        this.show = true
        this.cancelOrderId = order_id
      },


      confirmCancel(ref) {
        var _this = this;
        var selectItem = this.$refs[ref].getFullValue()
        console.log("confirmCancel selectItem ",selectItem)
        // 卖家取消订单
        _this.$http.get(_this.$store.state.url + "/Cargo/cancel_order?order_status=2&cancel_order=" + selectItem[0].key + "&order_id=" + this.cancelOrderId).then(function(res) {
            console.log("confirmCancel res:", res);
            if (!res) return;
            _this.show = false;
            _this.$router.go(0);
        });
      }


    },
  }
</script>

<style scoped>

  .dialog-demo .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }

  .dialog-demo .dialog-title {
    line-height: 30px;
    color: #666;
  }

  .dialog-demo .img-box {
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
    height: 200px;
    overflow: hidden;
  }

  .dialog-demo .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .dialog-demo .buyMsg {
    width: 230px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 30px;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: rgba(153, 153, 153, 1);
    opacity: 1;

  }
  .wrap {
    background-color: #fff;
  }

  .nav {
    padding-top: 1.2rem;
  }

  .nav_list {
    position: relative;
    border-top: 3px solid #F1F1F1;
    padding-bottom: 10px;
  }

  .list {
    position: relative;
    width: 92%;
    margin: 0 auto;
    min-height: 120px;
    padding-bottom: 10px;
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
    min-width: 36px;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center !important;
    margin-left: 5px;
    padding: 0 1px;
  }

  .handle>span {
    display: inline-block;
    width: 49%;
    text-align: right;
    color: #003BFF;
  }

  .handle1 {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }

  .handle1>span {
    display: inline-block;
    width: 24%;
    text-align: left;
    color: #003BFF;
  }

  .order {
    height: 40px;
    line-height: 20px;
  }

  .order>span {
    display: inline-block;
    color: #999999;
  }

/*  .order :first-child {
    width: 39%;
  }

  .order :last-child {
    width: 59%;
    text-align: right;
  } */

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


  .dialog-demo .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
    text-align: center;
  }

  .dialog-demo .dialog-title {
    line-height: 30px;
    color: #666;
  }

  .dialog-demo .img-box {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
    height: 200px;
    overflow: hidden;
  }

  .dialog-demo .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .dialog-demo .buyMsg {
    width: 230px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 30px;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    color: rgba(153, 153, 153, 1);
    opacity: 1;

  }
  .dialog-demo .password {
    width:168px;
    height:35px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(112,112,112,1);
    opacity:1;
  }
  .payNow {
    border-radius: 10px;
    background-color: #F88509;
    height: 21px;
    width: 67px;
    color: #FFFFFF;
    font-size: 10px;
    line-height: 18px;
    margin-top: 10px;
  }
  .paying {
    background-color: #BBBBBB;
  }
  .item-badge {
    height: 0.6rem;
    width: 2.2rem;
    background-color: #DA120C;
    color: white;
    border-radius: 0.3rem 0 0 0.3rem;
    position: absolute;
    top: 0.1rem;
    right: -13px;
    font-size: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
