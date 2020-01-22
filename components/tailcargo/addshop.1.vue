<template>
  <div class="wrap">
    <!-- header -->
    <x-header :left-options="{backText:''}" style="background: #398CD3;color: #000000!important;"><span>新增尾货</span></x-header>
    <!-- list -->
    <div class="nav">
      <div class="nav_top">
        <span>名称:</span>
        <input type="text" placeholder="请输入商品名称" maxlength="15" v-model="shop_name">
      </div>
      <div class="nav_img">
        <div class="img-box user_up_imgfile">
          <span v-for="(item, index) in shop_img" :key="index">
            <img :src="$store.state.url + '/uploads/' + item" alt />
            <span class="userupicon_cal" @click="deletePic(index)">
              <x-icon type="ios-close" size="26"></x-icon>
            </span>
          </span>
          <vue-cropper @data="fileImgarr" :autoCropWidth="320" :autoCropHeight="180" v-show="shop_img.length < 5">
            <!-- <img src="/static/img/icon1.png" alt /> -->
            <span class="update">上传主图</span>
          </vue-cropper>
        </div>

      </div>
      <!-- 注意说明 -->
      <div class="notice"><span>请上传1-5张尾货主图，保证清晰美观</span></div>
      <!-- 商品属性 -->
      <div class="nav_tab">
        <div>
          <span>商品状态</span>
          <popup-picker placeholder="商品状态" :data="shop_status" class="shop" v-model="shop" value-text-align="right"></popup-picker>
        </div>
        <div>
          <span>商品分类</span>
          <vue-industry ref="industry" :placeholder="'请选择分类'" class="xing"></vue-industry>
        </div>
        <div>
          <span>商品地址</span>
          <vue-address ref="address" :placeholder="'请选择地址'" class="xing"></vue-address>
        </div>
        <div>
          <span>配送方式</span>
          <popup-picker placeholder="配送方式" :data="give_type" class="shop" v-model="give" value-text-align="right"></popup-picker>
        </div>
        <div>
          <span>设置运费</span>
          <span style="display: inline-block;float: right;" @click="setMoney = true">{{isPostage.name}}</span>
        </div>
        <div>
          <span>原价</span>
          <input type="number" placeholder="输入商品原价" v-model="before_price">
        </div>
        <div>
          <span>出售价</span>
          <input type="number" placeholder="输入尾货出售价" v-model="price">
        </div>
        <div>
          <span>库存</span>
          <input type="number" placeholder="请输入库存，避免超卖" v-model="shop_num">
        </div>
        <div>
          <span style="display: inline-block;vertical-align: top;">参数</span>
          <i style="font-size: 12px;display: inline-block;vertical-align: top;color: #B9B9B9;">请输入规格如尺寸/重量/颜色等</i>
          <div class="guige">
            <span @click="sizeEdit = true">编辑</span>
          </div>
        </div>
      </div>
      <!-- 注意说明 -->
      <!-- <div class="notice"><span>添加商品规格</span></div> -->
      <!-- 添加商品规格 -->
      <div class="shop_type">
        <div>
          <span>商品图文详情</span>
          <!-- <i>编辑</i> -->
          <div class="fl" style="position: relative;z-index: 0;width:100%;overflow-x: auto;padding-top: 10px;">
            <vue-html5-editor content="" @change="updateData($event)"></vue-html5-editor>
          </div>
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="save">
        <span @click="fabu()">立即发布尾货</span>
      </div>

      <!-- 运费设置 -->
      <div class="set_money">
        <x-dialog v-model="setMoney" class="dialog-backnone" :hide-on-blur="true">
          <div class="set_content">
            <div style="width: 100%;height: 1rem;"></div>
            <p>运费设置</p>
            <span v-for="(item,index) in setting_list" :class="{'is_fix':isFixed == item.id}" @click="checkType(item)">{{item.name}}</span>
            <p v-if="isFixed == 0">自定义邮费</p>
            <input type="text" placeholder="输入快递金额" v-if="isFixed == 0" v-model="freight">
            <div class="set_save">
              <span @click="sureMoney()">确定</span>
            </div>
          </div>
        </x-dialog>
      </div>

      <!-- 编辑规格参数 -->
      <div class="edit">
        <x-dialog v-model="sizeEdit" class="dialog-backnone" :hide-on-blur="true">
          <div class="set_content">
            <div style="width: 100%;height: 0.5rem;"></div>
            <p style="padding-bottom: 0;">参数设置<span style="margin-left: 20px;color: #666;font-size: 12px;">例:(重量:100克)</span></p>
            <div class="param">
              <input type="text" class="input1" v-model="input1" placeholder="重量">&nbsp;:&nbsp;<input type="text"
                placeholder="单个商品的重量" class="input2" v-model="input2">
              <input type="text" class="input1" v-model="input3">&nbsp;:&nbsp;<input type="text" class="input2" v-model="input4">
              <input type="text" class="input1" v-model="input5">&nbsp;:&nbsp;<input type="text" class="input2" v-model="input6">
              <input type="text" class="input1" v-model="input7">&nbsp;:&nbsp;<input type="text" class="input2" v-model="input8">
              <input type="text" class="input1" v-model="input9">&nbsp;:&nbsp;<input type="text" class="input2" v-model="input10">
            </div>
            <div class="set_save">
              <span @click="sureSize()">确定</span>
            </div>
          </div>
        </x-dialog>
      </div>


    </div>
  </div>
</template>

<script>
  import {
    XHeader,
    PopupPicker,
    XDialog,
  } from 'vux'
  import {
    VueCropper,
    VueIndustry,
    VueAddress,
  } from '../component/'
  export default {
    data() {
      return {
        shop_name: '',
        shop_status: [
          ['全新', '九成新', '八成新', '七成新','六成新','五成新及以下']
        ],
        shop: ['全新'], //商品状态
        give_type: [
          ['普通物流', '普通快递', 'EMS', '自取']
        ],
        give: ['普通物流'], //配送方式
        setMoney: false, //点击运费的div
        setting_list: [{
            id: 1,
            name: '包邮'
          },
          {
            id: 0,
            name: '不包邮'
          },
        ],
        isFixed: 1,
        isPostage: {
          id: 1,
          name: '包邮'
        }, //是否包邮  1包邮  0不包邮
        freight: null, //邮费
        sizeEdit: false, //编辑规格div
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: '',
        parameter: {}, //规格参数
        goods_content: '', //商品详细描述
        shop_img: [], //上传的主图列表
        industry: '', //行业
        before_price: null, //原价
        price: null, //出售价
        shop_num: null, //库存
        address: '', //商品地址
        form: {

        },
      }
    },
    components: {
      XHeader,
      PopupPicker,
      XDialog,
      VueCropper,
      VueIndustry,
      VueAddress
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      //选择包邮或者不包邮
      checkType(item) {
        this.isFixed = item.id
        this.isPostage.id = item.id
        this.isPostage.name = item.name
      },
      //确定运费
      sureMoney() {
        var _this = this;
        if (_this.isPostage.id == 0 && _this.freight == '') {
          msg('请填写运费')
        } else {
          _this.setMoney = false
        }
      },

      //确定规格参数
      sureSize() {
        var _this = this;
        _this.$set(_this.parameter, _this.input1, _this.input2)
        _this.$set(_this.parameter, _this.input3, _this.input4)
        _this.$set(_this.parameter, _this.input5, _this.input6)
        _this.$set(_this.parameter, _this.input7, _this.input8)
        _this.$set(_this.parameter, _this.input9, _this.input10)
        if (_this.input1 == '' || _this.input2 == '') {
          msg('请填写至少一个参数')
        } else {
          _this.sizeEdit = false
        }
      },
      updateData(data) {
        this.goods_content = data
      },

      //上传主图
      fileImgarr(res) {
        this.shop_img.push(res.imgurl);
      },

      //删除主图
      deletePic(index) {
        this.shop_img.splice(index, 1);
      },

      //发布尾货
      fabu() {
        var _this = this;
        _this.industry = '-'+ _this.$refs.industry.add[0] + '-' + _this.$refs.industry.add[1] + '-'
        _this.address = _this.$refs.address.add[0] + '-' + _this.$refs.address.add[1] + '-'

        if (!_this.shop_name || _this.shop_img.length == 0 || _this.before_price == null || _this.price == null || _this.shop_num == null || !_this.goods_content || !_this.industry || !_this.address) {
          msg('请填写完整信息')
        } else {
          _this.$set(_this.form,'goods_name',_this.shop_name)
          _this.$set(_this.form,'goods_img',_this.shop_img)
          var shop_new;
          if (_this.shop == '全新') {
            shop_new = 10
          } else if(_this.shop == '九成新'){
            shop_new = 9
          } else if(_this.shop == '八成新'){
            shop_new = 8
          } else if(_this.shop == '七成新'){
            shop_new = 7
          } else if(_this.shop == '六成新'){
            shop_new = 6
          } else if(_this.shop == '五成新及以下') {
            shop_new = 5
          }
          _this.$set(_this.form,'goods_state',shop_new)
          _this.$set(_this.form,'cat_id', _this.industry)
          var shop_type;
          if (_this.give == '普通物流') {
            shop_type = 1
          } else if (_this.give == '普通快递') {
            shop_type = 2
          } else if (_this.give == 'EMS') {
            shop_type = 3
          } else if (_this.give == '自取') {
            shop_type = 4
          }
          _this.$set(_this.form,'shipping', shop_type)
          _this.$set(_this.form,'is_free_shipping', _this.isPostage.id)
          console.log(_this.isPostage.id)
          if (_this.isPostage.id == 1) {
            _this.freight = 0
          }
          _this.$set(_this.form,'freight', _this.freight)
          _this.$set(_this.form,'market_price', _this.before_price)
          _this.$set(_this.form,'shop_price', _this.price)
          _this.$set(_this.form,'store_count', _this.shop_num)
          _this.$set(_this.form,'parameter', _this.parameter)
          _this.$set(_this.form,'goods_content', _this.goods_content)
          _this.$set(_this.form,'region', _this.address)
          _this.$set(_this.form,'specs', '')
          _this.$set(_this.form,'hangye', '')
          _this.$set(_this.form,'brand_id', 0)
          _this.setData()
        }
      },

      //请求接口
      setData() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Cargo/release_cargo', {
          ..._this.form
        }).then(function(res) {
          if(!res) return;
          console.log('res:',res)
        })
      },
    }
  }
</script>

<style scoped>
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
    padding-top: 20px;
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
</style>
