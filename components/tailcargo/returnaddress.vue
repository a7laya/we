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
        <popup-picker placeholder="请选择地区" @on-hide="hide" :data="itemAddress" v-model="address"
        :show-name="true" :columns="2"  value-text-align="left" class="sx" ref='addressPicker'></popup-picker>
      </div>
      <div>
        <span>详细地址</span>
        <input type="text" v-model="address_detail" placeholder="请输入详细的街道/楼牌号等" maxlength="10">
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
        title: '退货地址',
        goods_id: 0,  //商品id
        goods_num: 0, //商品数量
        itemAddress: [],
        address: [],
        value: false,
        region: [],
        name: '',
        phone: '',
        address_detail: '',
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
    methods: {
      // 获取退货地址
      getReturnAddress() {
        var _this = this;
        _this.$http.get(_this.$store.state.url + "/Cargo/cargo_address_find?is_return=1")
        .then(function(res) {
          console.log("getrReturnAddress res:", res);
          if (!res) return;
          _this.name = res.consignee;
          _this.phone = res.mobile;
          _this.address_detail = res.address;
          // 将读取到的region转化为数组
          _this.address = res.region.split('-').splice(1,2)
          // msg('操作成功')
          // setTimeout(function() {
          //   _this.$router.push({
          //     path: './order',
          //     query: {
          //       goods_id: _this.goods_id,
          //       num: _this.goods_num
          //     }
          //   })
          // }, 1000);

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
        _this.$set(_this.form,'region','-' + this.address[0] + '-' + this.address[1] + '-')
        _this.$set(_this.form,'address',_this.address_detail)
        _this.$set(_this.form,'mobile',_this.phone)
        _this.$set(_this.form,'is_default',0)
        _this.$set(_this.form,'is_return',1)

        // 获取string：'XX省 XX市' 转换成的数组 ['XX省','XX市']
        let addressName = this.$refs.addressPicker.getNameValues(_this.address).split(' ')
        _this.$set(_this.form,'province',addressName[0])
        _this.$set(_this.form,'city',addressName[1])
        
        console.log('this.form',this.form)

        let obj = {
        	consignee: '收货人',
        	region: '地区',
        	address: '详细地址',
        	mobile: '手机',
        	province: '省份',
        	city: '城市',
        }

        // 检查_this.form中是否包含obj中的字段
        if (!isNull(obj, _this.form)) return

        var _this = this;
        _this.$http.post(_this.$store.state.url + "/Cargo/cargo_address_update", {
          load: false,
          ..._this.form
        }).then(function(res) {
          if (!res) return;
          msg('操作成功')
          _this.$router.go(-1)
          // setTimeout(function() {
          //   _this.$router.push({
          //     path: './order',
          //     query: {
          //       goods_id: _this.goods_id,
          //       num: _this.goods_num
          //     }
          //   })
          // }, 1000);

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
          console.log('_this.itemAddress:',_this.itemAddress);
      }
    },


    mounted() {
      var _this = this;
      // 获取退货地址
      _this.getReturnAddress();
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
