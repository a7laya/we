<template>
  <div class="wrap">
    <vue-shop-header-order :title="title"></vue-shop-header-order>
    <!-- 如果收货地址列表为空 -->
    <div class="order_address" v-if="address_list.length === 0 && !default_address_index" @click="isBuy = true">
      <div style="font-size: 14px;font-weight: 500;">收货地址未设置
        <div class="address">点击设置收货地址</div>
      </div>
    </div>
    <!-- 获取到收货地址 -->
    <div class="order_address" v-else @click="isBuy = true">
      <div style="font-size: 20px;font-weight: 500;">{{default_name}}<span style="margin-left: 5px;">{{default_phone}}</span></div>
      <div class="address">{{default_address}}-{{default_address_detail}}</div>
    </div>
    <div class="order_type">
      <!-- <span>支付方式</span> -->
      <group class="type_change">
        <popup-radio title="支付方式" :options="pay_types" v-model="pay_type" placeholder="在线支付"></popup-radio>
      </group>
    </div>
    <div class="order_user">
      <img :src="$formatImg(this.goods_list.headimgurl)" alt="">
      <span>{{this.goods_list.nickname}}</span>
      <em>联系卖家</em>
    </div>



    <div class="order_details">
      <div calss="buy_title" style="width: 94%;margin: 0 auto;padding: 0.5rem 0 0.5rem 0;">
        <img class="buy_img" :src="$formatImg(this.goods_img)" alt="">
        <div class="buy_right">
          <div>{{goods_list.goods_name}}</div>
          <price :oprice="goods_list.market_price" :price="goods_list.shop_price"></price>
          <div style="font-size: 12px; color: #BBBBBB;">运费:{{goods_list.freight==0 ? '包邮' : '￥'+goods_list.freight}}</div>
        </div>
      </div>
      <div v-if="pay_type == 0" class="explain" style="height: 50px;line-height: 50px;">购买数量<em>{{goods_num}}件</em></div>
      <div v-if="pay_type == 0" class="explain">
        <p>备注</p>
        <textarea placeholder="请输入给商家的备注说明" v-model="buyer_remarks"></textarea>
      </div>
      <div class="fapiao" v-if="pay_type == 0">
        <group>
          <popup-radio title="发票" :options="invoice_titles" v-model="invoice_title" placeholder="发票信息"></popup-radio>
        </group>
        <div v-if="invoice_title == 1" class="invoiceInfo">
          <span>发票抬头</span>
          <input placeholder="请输入发票信息" v-model="invoiceInfo"></input>
        </div>
        <div v-if="invoice_title == 1" class="invoiceInfo">
          <span>企业税号</span>
          <input placeholder="个人无需填写" v-model="tax_number"></input>
        </div>
      </div>
    </div>




    <div class="total" v-if="pay_type == 0">
      合计:
      <em>￥{{all_money}}</em>
    </div>

    <!-- 线下交易 -->
    <div class="xianxia" v-if="pay_type == 1">
      <span>注意事项</span>
      <div>如果发现前方车辆停靠在右边，不可盲目绕行，要考虑到此车是否在让对面来车。超越路边停放的车辆时，要在确认其没有起步的意图而对面又无来车后，从左侧低速绕过。一般不要猛踩或者快松油门，更不能紧急制动和急打方向盘。如果认为确需降低车速时，先缓缓放松油门，然后连续几次轻踩刹车，达到控制车速的目的，防止追尾事故的发生。</div>
    </div>

    <!-- 确认删除地址的弹窗 -->
    <div v-transfer-dom style='z-index: 999999999;'>
      <confirm v-model='show_del_address_confirm' title='确定删除该地址?' hide-on-blur
      @on-confirm='delAddressAction'></confirm>
    </div>
    <!-- 更换地址 -->
    <div class="buy_detail" v-if="isBuy">
      <div class="buy_1" @click="isBuy = false"></div>
      <div class="buy_2">
        <div class="close" @click="isBuy = false">
          <span>选择配送地址</span>
        </div>
        <div class="user_address">
          <span v-for="(item,index) in address_list" :key="index" @click="addressChange(item.region,item.consignee,item.mobile,item.address,index)"
            :class="default_address_index===index ? 'active' : ''">
            {{item.consignee}} {{item.mobile}}
            <span style="float: right; color: #398CD3; text-indent: 0; margin-left: 10px;"
            @click.stop="clickDelAddress(item.address_id)">删除</span>
            <span style="float: right; color: #398CD3; text-indent: 0;"
            @click.stop="clickEditAddress(item.address_id)">修改</span>
            <div>{{item.region}}{{item.address}}</div>
          </span>
        </div>
        <div class="add">
          <span @click="add()">添加其它地址</span>
        </div>

      </div>
    </div>

    <!-- 购买按钮 -->
    <div style="height: 45px;"></div>
    <div class="buy">
      <span @click="noBuy()">取消</span>
      <span style="float: right;background: #F88509;color: #fff;" @click="showBuy">立即购买</span>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="show" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img src="/static/img/zhifu.png">
        </div>
        <div class="buyMsg">
          <p>您的订单在xx小时xx后视为放弃支付，并取消订单，请尽快支付</p>
        </div>
        <div style="margin-bottom:30px;display: flex;align-items: center;justify-content: center;">
          <div class="payNow" :class="loading ? 'paying' : ''" @click="nowPay">
            {{loading ? '正在支付...' : '立即支付'}}</div>
        </div>
      </x-dialog>
    </div>

  </div>



</template>
<script>
  import {
    XDialog,
    XButton,
    XSwitch,
    TransferDomDirective as TransferDom
  } from 'vux'

  import {
    Tab,
    TabItem,
    Drawer,
    XHeader,
    Group,
    PopupRadio,
    Confirm
  } from 'vux'
  import {
    VueFoot01,
    VueShopHeaderOrder
  } from "../component/"
  import price from "../component/price.vue"
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        title: '提交订单',
        show_del_address_confirm:false,
        address_id_selected: 0, // 点击了删除按钮的那个地址id
        tax_number: '', // 税号
        phone: '15515975029',
        pay_type: 0,
        pay_types: [{
          key: '0',
          value: '在线支付'
        }, {
          key: '1',
          value: '线下交易'
        }],
        invoice_title: '',
        invoice_titles: [{
          key: '0',
          value: '不开发票'
        }, {
          key: '1',
          value: '发票信息'
        }],
        invoiceInfo: '',
        isBuy: false,
        address_list: [],
        goods_id: 0,
        goods_num: 0,
        freight: 0,
        goods_list: [],
        discount: '', //折扣
        goods_img: [],
        shop_price: false,
        default_address_index: false,
        default_address: '', //默认地址
        default_address_detail: '', //默认详细地址
        default_name: '', //默认姓名
        default_phone: '', //默认电话
        buyer_remarks: '', // 买家备注
        show: false,
        loading: false, // 防止重复提交
        form: {}
      }
    },
    components: {
      Tab,
      TabItem,
      Drawer,
      XHeader,
      VueFoot01,
      VueShopHeaderOrder,
      Group,
      PopupRadio,
      XDialog,
      XButton,
      XSwitch,
      price,
      Confirm
    },
    mounted() {
      var _this = this;
      _this.goods_id = _this.$route.query.goods_id;
      _this.goods_num = _this.$route.query.num;
      _this.isBuy = _this.$route.query.isBuy;
      _this.getData(_this.goods_id);
      _this.getAddress();
    },
    filters: {
      // mobile(value) {
      //   let start = value.slice(0, 3)
      //   let end = value.slice(-4)
      //   return `${start}****${end}`
      // },

    },
    computed:{
      all_money: function(){
        return (this.shop_price * this.goods_num + this.freight).toFixed(2)
      }
    },
    watch : {
        '$route' (to, from) {
            console.log('to:',to)
            console.log('from:',from)
        }
    },
    methods: {
      // 点击修改后转至修改界面
      clickEditAddress(address_id) {
        this.$router.push({
          path: './edit_address',
          query: {address_id}
        })
      },
      // 点击删除 - 弹出确认框
      clickDelAddress(address_id) {
        this.isBuy = true
        this.show_del_address_confirm = true
        this.address_id_selected = address_id
      },
      // 点击删除后执行删除地址操作
      delAddressAction(){
        var _this = this
        this.$http.post(_this.$store.state.url + "/Cargo/del_cargo_address", {address_id:_this.address_id_selected}).then(function(res) {
          if(!res) msg('删除地址失败')
          console.log('删除收货地址接口返回的res:',res);
          // 后台成功删除后，重新获取地址列表
          _this.getAddress()
        })
      },
      // 购买取消
      noBuy() {
        this.$router.go(-1)
      },
      addForm() {
        this.$set(this.form, 'consignee', this.default_name)
        this.$set(this.form, 'region', this.default_address)
        this.$set(this.form, 'address', this.default_address_detail)
        this.$set(this.form, 'mobile', this.default_phone)
        this.$set(this.form, 'pay_type', this.pay_type)
        // 如果需要发票
        if(this.invoice_title == 1) {
          this.$set(this.form, 'invoice_title', this.invoiceInfo)
        } else {
          this.$set(this.form, 'invoice_title', '')
        }
        this.$set(this.form, 'goods_price', this.all_money)
        this.$set(this.form, 'shipping_price', this.goods_list.freight)
        this.$set(this.form, 'goods_id', this.goods_id)
        this.$set(this.form, 'goods_num', this.goods_num)
        this.$set(this.form, 'buyer_remarks', this.buyer_remarks)
        this.$set(this.form, 'tax_number', this.tax_number) // 税号
      },
      showBuy() {
        var _this = this;
        // 以下注释生产环境再解开吧
        if(_this.address_list.length === 0 && !_this.default_address_index) {
          this.$toTop()
          return msg('收货地址未设置')
        }
        this.addForm()
        if (_this.pay_type == 1) {
          if (this.loading) return
          this.loading = true
          return _this.$http.post(_this.$store.state.url + "/Cargo/add_offline_order", _this.form).then(function(res) {
            console.log('/Cargo/add_offline_order接口返回的res:',res);
            if(!res) return
            msg('线下交易下单成功，请注意查看订单')
            _this.loading = false
            _this.$router.push({
              path:'./myorder',
              query:{}
            })
          })
        }
        this.show = true
      },

      nowPay() {
        var _this = this;
        if (this.loading) return
        this.loading = true
        // 先付款，后写入订单
        // this.$cargopay.pay(_this, {
        //   order_id: this.goods_id,
        //   money: _this.all_money * 100,
        //   Arrivaltype: 6,
        // }).then(function(res) {
        //   console.log('订单付款页面，提交付款',res);
        //   if (!res) return msg('未完成付款')
          console.log('写入订单的form:',_this.form);
          _this.$http.post(_this.$store.state.url + "/Cargo/add_order", _this.form).then(function(res) {
            console.log('订单付款页面，付款完成后写入订单',res);
            msg('订单支付成功')
            _this.loading = false
            _this.show = false
            // 转到详情页
            _this.$router.push({
              path: './orderinfo',
              query: {
                order_id: res.id
              }
            })
          })
        // });
      },

      addressChange(address, name, phone, address_detail, index) {
        // this.isFixed = id
        this.default_address_index = index
        this.default_address = address
        this.default_address_detail = address_detail
        this.default_name = name
        this.default_phone = phone
        this.isBuy = false
      },
      //获取商品数据
      getData(id) {
        var _this = this;
        _this.$http.post(_this.$store.state.url + "/Cargo/find_goods_details", {
          goods_id: id
        }).then(function(res) {
			console.log('/Cargo/find_goods_details接口传回的res',res);
          if (!res) return;
          _this.goods_list  = res;
          _this.goods_img   = res.imgs[0].img_name;
          _this.freight     = res.freight;
          _this.discount    = (res.shop_price / res.market_price) * 10;
          _this.shop_price  = res.shop_price
        })
      },
      //获取用户地址
      getAddress() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + "/Cargo/cargo_address_list", {
          load: false
        }).then(function(res) {
          if (!res) return
          _this.address_list = res
          for (let i = 0; i < _this.address_list.length; i++) {
            if (_this.address_list[i].is_default) {
              _this.default_address_index = i
              _this.default_address = _this.address_list[i].region_name
              _this.default_address_detail = _this.address_list[i].address
              _this.default_name = _this.address_list[i].consignee
              _this.default_phone = _this.address_list[i].mobile
            }
          }
        })
      },

      //添加地址
      add() {
        this.$router.push({
          path: './addaddress',
          query: {
            goods_id: this.goods_id,
            num: this.goods_num
          }
        })
      },


    }
  }
</script>

<style scoped>
  .payNow {
    border-radius: 20px;
    background-color: #F88509;
    padding: 0 20px;
    height: 40px;
    width: 120px;
    color: #FFFFFF;
    font-size: 18px;
    line-height: 40px;
  }
  .paying {
    background-color: #BBBBBB;
  }

  .dialog-demo .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
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

  .wrap {
    background: #fff;
  }

  .order_address {
    font-size: 14px;
    color: #444;
    padding-top: 60px;
    background: url(../../../static/img/game/mineRight.png) no-repeat;
    background-position: 97% 90%;
    background-size: 0.2rem;
  }

  .order_address>div {
    width: 94%;
    margin: 0 auto;
    line-height: 35px;
  }

  .address {
    color: #BBBBBB;
    font-size: 12px;
    line-height: 20px !important;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-right: 30px;
    /* padding-left: 15px; */
    width: 90% !important;
  }

  .weui-cell {
    padding: 0 !important;
    width: 94%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border: 0 !important;
  }

  .order_user {
    width: 94%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #6B6B6B;
  }

  .order_user>img {
    display: inline-block;
    width: auto;
    height: 30px;
    vertical-align: middle;
  }

  .order_user>em {
    display: inline-block;
    float: right;
    color: #000AFF;
  }

  .order_details {
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
  }

  .buy_img {
    width: 4rem;
    height: 3rem;
    display: inline-block;
  }

  .buy_right {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    width: 48%;
  }

  .buy_right>span {
    display: block;
    color: #F92929;
    font-weight: bold;
  }

  .buy_right>div {
    min-height: 16px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .explain {
    width: 94%;
    margin: 0 auto;
    font-size: 14px;
    color: #6E6E6E;
  }

  .explain>em {
    display: inline-block;
    float: right;
  }

  .explain>textarea {
    width: 100%;
    min-height: 2rem;
    border-radius: 5px;
    margin-top: 5px;
    padding-top: 5px;
    text-indent: 10px;
  }

  .fapiao {
    border-bottom: 1px solid #efefef;
    font-size: 14px;
    color: #656565;
  }

  .invoiceInfo {
    border-bottom: 1px solid #efefef;
    font-size: 14px;
    color: #656565;
    width: 94%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
  }

  .invoiceInfo>span {
    display: inline-block;
    width: 20%;
  }

  .fapiao>div {
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
  }

  .fapiao>div>em {
    display: inline-block;
    float: right;
    width: 20%;
    background: url(../../../static/img/game/mineRight.png) no-repeat;
    background-size: 0.2rem;
    background-position: right;
  }

  .total {
    width: 94%;
    margin: 0 auto;
    font-size: 14px;
    color: #656565;
    height: 100px;
    line-height: 100px;
  }

  .total>em {
    display: inline-block;
    float: right;
    color: #F22222;
    font-size: 18px;
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
    overflow: scroll;
  }

  .close {
    background: url(../../../static/img/close01.png) no-repeat;
    background-position-x: 98%;
    width: 94%;
    margin: 0 auto;
    background-position-y: 55%;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .close>span {
    display: inline-block;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #404040;
    font-size: 0.4rem;
  }

  .user_address {
    width: 92%;
    margin: 0 auto;
    min-height: 281px;
  }

  .user_address>span {
    display: block;
    width: 100%;
    min-height: 50px;
    line-height: 25px;
    padding: 10px 0;
    color: #404040;
    background: url(../../../static/img/me_cpgl_ic_weixuanze@3x.png) no-repeat;
    background-size: 15px;
    background-position-y: 0.45rem;
    text-indent: 33px;
    border-bottom: 1px solid #e2e2e2;
  }

  .user_address>span>div {
    color: #BBBBBB;
  }

  .user_address>span.active {
    background: url(../../../static/img/me_cpgl_ic_xuanze@3x.png) no-repeat;
    background-size: 15px;
    background-position-y: 0.45rem;
  }


  .add {
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
  }

  .add>span {
    display: block;
    width: 140px;
    text-align: center;
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    border: 1px solid #F88509;
    border-radius: 15px;
    color: #F88509;
  }

  .xianxia {
    width: 94%;
    margin: 0 auto;
    padding-top: 20px;
  }

  .xianxia>span {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #B90606;
  }

  .xianxia>div {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 30px;
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
</style>
