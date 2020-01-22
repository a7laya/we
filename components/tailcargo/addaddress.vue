<template>
  <div class="wrap">
    <vue-shop-header-order :title="title"></vue-shop-header-order>
    <div class="address_list">
      <div>
        <span>收货人</span>
        <input type="text" placeholder="请填写收货人姓名" maxlength="4" v-model="name">
      </div>
      <div>
        <span>手机号码</span>
        <input v-model="phone" type="number" placeholder="请输入联系方式" oninput="if(value.length>11)value=value.slice(0,11)">
      </div>
      <div>
        <span>配送区域</span>
        <popup-picker placeholder="地区" @on-hide="hide" :data="itemAddress" v-model="address" :show-name="true" :columns="2"  value-text-align="left" class="sx"></popup-picker>
      </div>
      <div style="height: auto;">
        <span>详细地址</span>
        <input type="text" v-model="address_detail" placeholder="请输入详细的街道/楼牌号等" style="width: 100%;">
      </div>
      <div class="default">
        <span>设置为默认收货地址</span>
         <inline-x-switch class="check" v-model="value" @on-change="change()"></inline-x-switch>
      </div>
    </div>
    <div class="sure">
      <span @click="sure()">保存</span>
    </div>
  </div>
</template>

<script>
  import {
    PopupPicker,
    Group,
    InlineXSwitch
  } from 'vux'
  import {
    VueFoot01,
    VueShopHeaderOrder,

  } from "../component/";

  export default {
    data() {
      return {
        title: '新建配送地址',
        goods_id: 0,  //商品id
        goods_num: 0, //商品数量
        itemAddress: [],
        address: [],
        value: false, // 默认地址开关
        region: [],
        name: '',
        phone: '',
        address_detail: '',
        address_from_api: [], // 从后台获取的地址列表
        form: {

        },
      }
    },
    components: {
      VueFoot01,
      VueShopHeaderOrder,
      PopupPicker,
      Group,
      InlineXSwitch
    },
    created() {
     this.getAddressList()
    },
    methods: {
      // 从后台获取的地址列表
      getAddressList() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + "/Cargo/cargo_address_list", {
          load: false
        }).then(function(res) {
          console.log('获取用户地址列表:',res);
          // 如果该用户没有设置地址则“设置默认”按钮打开
          _this.value = true
          if (!res) return
          _this.address_from_api = res
          for (let i = 0; i < res.length; i++) {
            // 如果存在默认地址，则“设置默认”按钮关闭
            if (res[i].is_default) _this.value = false
          }
        })
      },
      change(currentValue) {
        console.log(this.value)
      },
      hide() {
        this.region = '-' + this.address[0] + '-' + this.address[1] + '-'
      },
      sure() {
        var _this = this;
        _this.$set(_this.form,'consignee',_this.name)
        _this.$set(_this.form,'region',_this.region)
        _this.$set(_this.form,'address',_this.address_detail)
        _this.$set(_this.form,'mobile',_this.phone)
        var val;
        if (_this.value == false) {
          val = 0
        } else {
          val = 1
        }
        _this.$set(_this.form,'is_default',val)
        let obj = {
        	consignee: '收货人',
        	region: '地区',
        	address: '详细地址',
        	mobile: '手机',
        }
        if (!isNull(obj, _this.form)) return

        var _this = this;
        _this.$http.post(_this.$store.state.url + "/Cargo/add_cargo_address", {
          load: false,
          ..._this.form
        }).then(function(res) {
          if (!res) return;
          msg('添加成功')
          setTimeout(function() {
            _this.$router.push({
              path: './order',
              query: {
                goods_id: _this.goods_id,
                num: _this.goods_num
              }
            })
          }, 1000);

        })

      },
      //获取地址
      getAddress() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + "/common/region").then(function(res) { //获取城市
        		if(!res) return;
        		if(_this.show) {
        			_this.itemAddress.push({
        				name: '全国',
        				value: '-100',
        				parent: '0'
        			});
        			_this.itemAddress.push({
        				name: '',
        				value: '-1',
        				parent: '-100'
        			});
        		}
        		_.each(res, function(e) {

        			_this.itemAddress.push({
        				name: e.typename,
        				value: e.id.toString(),
        				parent: e.parent_id.toString()
        			});
        			if(_this.show) {
        				_this.itemAddress.push({
        					name: '全部',
        					value: '-1',
        					parent: e.id.toString()
        				});
        			}
        			_.each(e.children, function(e) {
        				if(_this.show) {
        					_this.itemAddress.push({
        						name: '全部',
        						value: '-1',
        						parent: e.id.toString()
        					});
        				}
        				_this.itemAddress.push({
        					name: e.typename,
        					value: e.id.toString(),
        					parent: e.parent_id.toString()
        				});
        				_.each(e.children, function(e) {
        					_this.itemAddress.push({
        						name: e.typename,
        						value: e.id.toString(),
        						parent: e.parent_id.toString()
        					});
        				})
        			})
        		})
        	});
      }
    },
    mounted() {
      var _this = this;
      //获取商品id和数量
      _this.goods_id = _this.$route.query.goods_id;
      _this.goods_num = _this.$route.query.num;
      //获取地址
      _this.getAddress();
    },
  }
</script>

<style scoped>
  .wrap {
    background: #fff;
    font-size: 14px;
    color: #333;
  }
  .address_list {
    width: 92%;
    margin: 0 auto;
    padding-top: 1.4rem;
  }
  .address_list > div {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #F1F1F1;
  }
  .address_list > div > input {
    font-size: 14px;
    color: #C3C3C3;
    text-indent: 10px;
  }
  .address_list > div > span {
    display: inline-block;
    width: 20%;
  }
  .vux-cell-box {
    display: inline-block;
    width: 80%;
    float: right;
    height: 50px;
    line-height: 0.8rem;
  }
  .vux-cell-box > div {
    padding: 0!important;
  }
  .default > span {
    width: 50%!important;
  }
  .default {
    border-bottom: 0;
  }

  .vux-cell-box:not(:first-child):before {
    border-top: 0!important;
  }
  .check {
    /* width: 100px; */
    /* height: 30px; */
    float: right;
    vertical-align: middle;
    margin-top: 10px;
  }
  .sure {
    background: #fff;
    min-height: 200px;
  }
  .sure > span {
    display: block;
    width: 30%;
    height: 30px;
    line-height: 30px;
    background: #F88509;
    color: #fff;
    font-size: 16px;
    border-radius: 15px;
    text-align: center;
    margin: 50px auto 0;
  }
</style>
