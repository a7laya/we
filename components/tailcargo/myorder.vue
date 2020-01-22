<template>
  <div class="warp">
    <vue-shop-header-order :title="title"></vue-shop-header-order>
    <div class="nav">
     <!-- <tab :line-width="3" active-color="#F88509" custom-bar-width="60px">
        <tab-item :selected="demo3 === item.id" v-for="(item, index) in list3" :class="{'vux-1px-r': index===0}"
          @on-item-click="changeTab(item.id)" :key="index">{{item.name}}</tab-item>
      </tab> -->
      <tab active-color="#F88509" custom-bar-width="60px">
        <tab-item selected @on-item-click="onItemClick(1)">进行中</tab-item>
        <tab-item @on-item-click="onItemClick(2)">已完成</tab-item>
        <tab-item @on-item-click="onItemClick(3)">已取消</tab-item>
      </tab>
    </div>
    <!-- 进行中 -->
    <template v-if="index == 1">
      <div class="nav_list" v-for="(item,index) in list" :key='index'>
        <div class="list">
          <div class="list_top">
            <img :src="$formatImg(item.seller[0].mem_headimgurl)" alt="">
            <div class="nickname">
              <span class="name">{{item.seller[0].mem_nickname}}</span>
              <span>{{item.counts}}关注</span>
            </div>
            <div class="sure">
              {{changeOrderStatus(item.order_status)}}
            </div>
          </div>
          <div class="contet" style="margin-top: 10px;padding-bottom: 8px;border-bottom: 1px solid #f5f5f5;"
          @click="goOrderInfo(item.order_id)">
            <img class="buy_img" :src="$formatImg(item.img_name)" alt="">
            <div class="buy_right">
              <div style="min-height: 48px;">{{item.goods_name}}</div>
              <span style="text-decoration: line-through;">原价￥{{item.market_price}}</span></br>
              <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 24px;margin-bottom: 10px;">
                <span style="color: red;">现价￥<i style="font-size: 14px;">{{item.shop_price}}</i>&nbsp;<em style="font-size: 10px; margin-left: 5px;">{{item.shop_price/item.market_price*10 | roundnum}}折</em></span>
                <span class="shop_num">共{{item.goods_num}}件商品</span>
              </div>
              <span style="width: 100%;font-size: 16px;text-align: right;">￥{{item.goods_num * item.shop_price}}.00</span>
            </div>
          </div>
          <!-- 订单操作 -->
          <div>
            <!-- // 卖家已发货 -->
            <div class="bottom" v-if="item.shipping_status == 1 && item.order_status == 4">
              <span v-for="(item2,index2) in operationList" :key='index2' @click='orderOperate(item.order_id,item2)'>
                {{item2.name}}
              </span>
            </div>
            <!-- // 卖家未发货 -->
            <div class="bottom" v-if="item.shipping_status == 2 && item.order_status != 5 && item.order_status != 11 && item.order_status != 6 && item.order_status != 12">
              <span v-for="(item2,index2) in operationList2" :key='index2' @click='orderOperate(item.order_id,item2)'>
                {{item2.name}}
              </span>
            </div>
            <!-- // 如果申请了退款 -->
            <div class="bottom" v-if="item.order_status == 5 || item.order_status == 11">
              <span v-for="(item2,index2) in operationList3" :key='index2' @click='orderOperate(item.order_id,item2)'>
                {{item2.name}}
              </span>
            </div>
            <!-- // 退货已同意 -->
            <div class="bottom" v-if="item.order_status == 6">
              <span v-for="(item2,index2) in operationList6" :key='index2' @click='orderOperate(item.order_id,item2)'>
                {{item2.name}}
              </span>
            </div>

            <!-- // 退货已发货 -->
            <div class="bottom" v-if="item.order_status == 12">
              <span v-for="(item2,index2) in operationList7" :key='index2' @click='orderOperate(item.order_id,item2)'>
                {{item2.name}}
              </span>
            </div>
          </div>
        </div>

      </div>
      <vue-loading :url="$store.state.url + '/Cargo/buyer_cargo_order?type=1&page=1&limit=10'" @ievent="loaddata"></vue-loading>
    </template>
    <!-- 已完成 -->
    <template v-if="index == 2">
      <div class="nav_list" v-for="(item,index) in list" :key='index'>
        <div class="list">
          <div class="list_top">
            <img :src="$formatImg(item.seller[0].mem_headimgurl)" alt="">
            <div class="nickname">
              <span class="name">{{item.seller[0].mem_nickname}}</span>
              <span>{{item.counts}}关注</span>
            </div>
            <div class="sure">
              {{item.pay_type == 0 ?  '已完成' : '线下交易'}}
            </div>
          </div>
          <div class="contet" style="margin-top: 10px;padding-bottom: 8px;border-bottom: 1px solid #f5f5f5;">
            <img class="buy_img" :src="$formatImg(item.img_name)" alt="">
            <div class="buy_right">
              <div style="min-height: 48px;">{{item.goods_name}}</div>
              <span style="text-decoration: line-through;">原价￥{{item.market_price}}</span></br>
              <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 24px;margin-bottom: 10px;">
                <span style="color: red;">现价￥<i style="font-size: 14px;">{{item.shop_price}}</i>&nbsp;<em style="font-size: 10px; margin-left: 5px;">{{item.shop_price/item.market_price*10 | roundnum}}折</em></span>
                <span class="shop_num">共{{item.goods_num}}件商品</span>
              </div>
              <span style="width: 100%;font-size: 16px;text-align: right;">￥{{item.goods_num * item.shop_price}}.00</span>
            </div>
          </div>
        </div>
        <!-- 订单操作 -->
          <!-- 在线支付  -->
          <div v-if='item.pay_type == 0'>
            <!-- 买家已评价 -->
            <div class="bottom" v-if="item.order_status == 8 || item.order_status == 10">
              <span v-for="(item2,index2) in operationList5" :key='index2' @click='orderOperate(item.order_id,item2)'>
                {{item2.name}}
              </span>
            </div>
            <!-- 买家未评价 -->
            <div class="bottom" v-else>
              <span v-for="(item2,index2) in operationList4" :key='index2' @click='orderOperate(item.order_id,item2)'>
                {{item2.name}}
              </span>
            </div>
          </div>
          <!-- 线下交易  -->
          <div v-else>
            <div class="bottom">
              <span v-for="(item2,index2) in operationList8" :key='index2' @click='orderOperate(item.order_id,item2)'>
                {{item2.name}}
              </span>
            </div>
          </div>

      </div>
      <vue-loading :url="$store.state.url + '/Cargo/buyer_cargo_order?type=2&page=1&limit=10'" @ievent="loaddata"></vue-loading>
    </template>
    <!-- 已取消 -->
    <template v-if="index == 3">
      <div class="nav_list" v-for="(item,index) in list" :key='index'>
        <div class="list">
          <div class="list_top">
            <img :src="$formatImg(item.seller[0].mem_headimgurl)" alt="">
            <div class="nickname">
              <span class="name">{{item.seller[0].mem_nickname}}</span>
              <span>{{item.counts ? item.counts : 0}}关注</span>
            </div>
            <div class="sure">
              已取消
            </div>
          </div>
          <div class="contet" style="margin-top: 10px;padding-bottom: 8px;border-bottom: 1px solid #f5f5f5;">
            <img class="buy_img" :src="$formatImg(item.img_name)" alt="">
            <div class="buy_right">
              <div style="min-height: 48px;">{{item.goods_name}}</div>
              <span style="text-decoration: line-through;">原价￥{{item.market_price}}</span></br>
              <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 24px;margin-bottom: 10px;">
                <span style="color: red;">现价￥<i style="font-size: 14px;">{{item.shop_price}}</i>&nbsp;<em style="font-size: 10px; margin-left: 5px;">{{item.shop_price/item.market_price*10 | roundnum}}折</em></span>
                <span class="shop_num">共{{item.goods_num}}件商品</span>
              </div>
              <span style="width: 100%;font-size: 16px;text-align: right;">￥{{item.goods_num * item.shop_price}}.00</span>
            </div>
          </div>
        </div>

      </div>
      <vue-loading :url="$store.state.url + '/Cargo/buyer_cargo_order?type=3&page=1&limit=10'" @ievent="loaddata"></vue-loading>
    </template>

    <div v-transfer-dom>
      <x-dialog v-model="showConfirmReceived" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img src="/static/img/zhifu.png">
        </div>
        <div class="buyMsg">
          <p>输入支付密码表示交易已成功，资金自动打入卖家账户，是否确定付款？</p>
        </div>
        <input class="password" type="password" placeholder="输入支付密码" v-model="password" />
        <div style="margin: 0 auto; padding-bottom: 20px;display: flex;align-items: center;justify-content: space-between; width:200px;">
          <div class="payNow paying" @click="showConfirmReceived=false">取消</div>
          <div class="payNow" :class="loading ? 'paying' : ''" @click="nowPay">
            {{loading ? '正在支付...' : '立即支付'}}</div>
        </div>
      </x-dialog>
    </div>
    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {
    Tab,
    TabItem,
    XDialog,
    TransferDomDirective as TransferDom
  } from 'vux'
  import {
    VueFoot01,
    VueShopHeaderOrder,
    VueLoading
  } from "../component/";
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        title: '我的订单',
        list3: [{
            id: 0,
            name: '待收货'
          },
          {
            id: 1,
            name: '已完成'
          },
          {
            id: 2,
            name: '已取消'
          },
        ],
        demo3: 0,
        type: 1,
        list: undefined,
        index: 1,
        // 进行中-卖家订单已确认
        operationList:[
          { name: '联系TA', url:''},
          { name: '查看物流', url:'./express'},
          { name: '申请退款', url:'./tuihuo_shenqing'},
          { name: '确认收货', url:''}
        ],
        // 进行中-买家等待发货
        operationList2:[
          { name: '联系TA发货', url:''},
        ],
        // 进行中-买家已申请退货
        operationList3:[
          { name: '联系TA退货', url:''},
        ],
        // 已完成订单-买家未评价
        operationList4:[
          { name: '联系TA', url:''},
          { name: '待评价', url:'./shopcomment'},
        ],
        // 已完成订单-买家已评价
        operationList5:[
          { name: '联系TA', url:''},
          { name: '查看评价', url:'./shop_review'},
        ],

        // 进行中-卖家已同意退货
        operationList6:[
          { name: '联系TA', url:''},
          { name: '去发货', url:'./shipping_confirm'},
        ],

        // 进行中-卖家已同意退货
        operationList7:[
          { name: '联系TA', url:''},
          { name: '退货物流', url:'./express'},
        ],
        
        // 已完成-线下交易
        operationList8:[
          { name: '联系TA', url:''},
        ],

        showConfirmReceived: false, // 确认收货弹框
        order_id_confirm: false, // 点确认收货后存相应的order_id
        loading: false ,// 点确认收货之后的loading,
        password: '', // 确认收货支付的密码
      }
    },
    components: {
      VueFoot01,
      VueShopHeaderOrder,
      Tab,
      TabItem,
      VueLoading,
      XDialog
    },
    mounted() {
      var _this = this;
      // _this.getData(1)
    },
    computed:{
    },
    methods: {
      // 将订单状态转为文字

      changeOrderStatus (order_status) {
        return {4:'订单已确认',5:'退货已申请',6:'退货已同意',8:'买家已评价',9:'卖家已评价',10:'交易完成',11:'卖家拒绝退货申请',12:'退货已发货'}[order_status]
      },

      // 转到订单详情页
      goOrderInfo(order_id) {
        this.$router.push({
          path:'./orderinfo',
          query:{order_id}
        })
      },
      // 订单操作
      orderOperate(order_id,{name,url}) {
        var _this = this
        if (url) {
          _this.$router.push({
            path: url,
            query:{
              order_id: order_id,
              role: 1 // 表示从买家界面出去的
            }
          })
        } else if (name == '确认收货') {
          this.showConfirmReceived = true
          this.order_id_confirm = order_id
        }
      },
      // 输入支付密码点确定之后
      nowPay() {
        var _this = this;
        if (this.loading) return
        this.loading = true
        // 先付款，后写入订单
        // this.$cargopay.pay(_this, {
        //   order_id: this.goods_id,
        //   money: _this.total_money * 100,
        //   Arrivaltype: 6,
        // }).then(function(res) {
        //   console.log('订单付款页面，提交付款',res);
        //   if (!res) return msg('未完成付款')
          _this.$http
            .get(_this.$store.state.url + "/Cargo/confirm_receipt?order_id=" + this.order_id_confirm + "&password=" + this.password)
            .then(function(res) {
              if(!res) return msg('确认收货失败')
              console.log('确认收货返回:',res);
              _this.loading = false
              _this.showConfirmReceived = false
              console.log('转到评价页');
              // 转到评价页
              _this.$router.push({
                path: './shopcomment',
                query: {
                  order_id: _this.order_id_confirm
                }
              })
            })
        // });
      },
      loaddata(res) {
        var _this = this;
        _.each(res, function(e) {
          _this.list = _this.list || [];
          _this.list.push(e);
        })
      },
      onItemClick(index) {
        var _this = this;
        this.index = -1
        setTimeout(function() {
          _this.index = index;
          _this.list = undefined;
        }, 50)
      },
    },
  }
</script>

<style scoped>
  .warp {
    background: #fff;
    margin-bottom: 1.5rem;
  }

  .nav {
    padding-top: 1.2rem;
    font-size: 14px;
  }

  .nav_list {
    font-size: 14px;
    border-top: 5px solid #f3f3f3;
    padding-bottom: 20px;
  }

  .list {
    width: 90%;
    margin: 0 auto;
  }

  .list_top {
    margin-top: 20px;
  }

  .nickname {
    display: inline-block;
    margin-left: 10px;
  }

  .nickname :last-child {
    font-size: 12px;
    color: #C6C6C6;
  }

  .sure {
    display: inline-block;
    float: right;
    margin-top: 10px;
    font-size: 12px;
    color: #F88509;
  }

  .content {
    margin-top: 10px;
    border-bottom: 1px solid #f6f6f6;
    padding-bottom: 8px;
  }

  .name {
    display: block;
  }

  .list_top>img {
    width: 1rem;
    height: 1rem;
    display: inline-block;
  }

  .buy_img {
    width: 80px;
    height: 80px;
    display: inline-block;
  }

  .buy_right {
    display: inline-block;
    vertical-align: top;
    margin-left: 0.5rem;
    width: 69%;
  }

  .buy_right>span {
    display: inline-block;
    color: #F92929;
    font-size: 12px;
    font-weight: bold;
  }

  .buy_right>div {
    min-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

  }

  .shop_num {
    display: inline-block;
    width: 42%;
    text-align: right;
    height:17px;
    font-size:12px;
    line-height:17px;
    color:rgba(162,162,162,1)!important;
  }

  .bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }

  .bottom>span {
    width: 26%;
    border: 1px solid #9c9c9c;
    color: #b2b2b2;
    text-align: center;
    border-radius: 12px;
    font-size: 12px;
    margin-right: 20px;
  }
  .bottom>span:hover{
    background-color: #F88509;
    color: #FFFFFF;
    border-color: #F88509;
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
</style>
