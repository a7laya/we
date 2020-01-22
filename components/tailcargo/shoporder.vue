<template>
  <div class="wrap">
    <vue-shop-header-order :title='title'></vue-shop-header-order>
    <div class="nav">
      <tab :line-width="3" active-color="#F88509" custom-bar-width="60px">
        <tab-item :selected="activeTab === item.id" v-for="(item, index) in list3"
        @on-item-click="changeTab(item.id)" :key="index">{{item.name}}</tab-item>
      </tab>
    </div>


    <!-- 待TA收货 -->
    <div class="nav_list" v-if="activeTab == 0 && shipped_list.length > 0">
      <div class="list" v-for="(item,index) in shipped_list" :key='index'>
        <img :src="$formatImg(item.img_name)"  @click="shopDetails(item.goods_id)">
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
        <div class="handle1">
          <span>联系买家</span>
          <span @click.stop="express(item.order_id)">查看物流</span>
        </div>
      </div>
    </div>
    <!-- 尾货评价 -->
    <div class="nav_list" v-if="activeTab == 1 && comment_list.length > 0">
      <div class="list" v-for="(item,index) in comment_list" :key='index' >
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

        <div class="handle">
          <span>联系买家</span>
          <span v-if="item.order_status == 9 || item.order_status ==10" @click="shopReview(item.order_id)">查看评价</span>
          <span v-else @click="shopCommentOver(item.order_id)">交易评价</span>
        </div>
      </div>
    </div>
    <!-- 退款/售后 -->
    <div class="nav_list" v-if="activeTab == 2 && aftersale_list.length > 0">
      <div class="list" v-for="(item,index) in aftersale_list" :key='index'>
        <img :src="$formatImg(item.img_name)"  @click="shopDetails(item.goods_id)">
        <div class="list_right">
          <span class="title"  @click="shopDetails(item.goods_id)">{{item.goods_name}}</span>
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
      </div>
      <div class="handle2">
        <i v-if="item.order_status == 13">已完成</i>
        <i @click="tuihuo(item.order_id)" v-if="item.order_status == 5">待处理</i>
        <i @click="comfirmReceive(item.order_id)" v-if="item.order_status == 6 || item.order_status == 12">确认收货</i>
        <span>联系买家</span>
        <span @click="foundDetail">查看退款详情</span>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showConfirmReceived" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img src="/static/img/zhifu.png">
        </div>
        <div class="buyMsg">
          <p>输入支付密码表示已收到买家退货，资金会返还卖家账户</p>
        </div>
        <input class="password" type="password" placeholder="输入支付密码" v-model="password" />
        <div style="margin: 0 auto; padding-bottom: 20px;display: flex;align-items: center;justify-content: space-between; width:200px;">
          <div class="payNow paying" @click="showConfirmReceived=false">取消</div>
          <div class="payNow" :class="loading ? 'paying' : ''" @click="nowPay">
            {{loading ? '处理中...' : '确定'}}</div>
        </div>
      </x-dialog>
    </div>

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
        title: '尾货订单',
        list3: [{
            id: 0,
            name: '待TA收货'
          },
          {
            id: 1,
            name: '尾货评价'
          },
          {
            id: 2,
            name: '退款/售后'
          },
        ],
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
        // 待Ta收货
        _this.$http.get(_this.$store.state.url + "/Cargo/seller_cargo_order?type=2").then(function(res) {
            console.log("待Ta收货 res:", res);
            if (!res) return;
            _this.shipped_list = res;
        });
        // 尾货评价
        _this.$http.get(_this.$store.state.url + "/Cargo/seller_cargo_order?type=3").then(function(res) {
            console.log("尾货评价 res:", res);
            if (!res) return;
            _this.comment_list = res;
            console.log('_this.comment_list:',res);
        });
        // 退款/售后
        _this.$http.get(_this.$store.state.url + "/Cargo/seller_cargo_order?type=4").then(function(res) {
            console.log("退款/售后 res:", res);
            if (!res) return;
            _this.aftersale_list = res;

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
