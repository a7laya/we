<template>
  <div class="wrap">
    <!-- header -->
    <x-header :left-options="{backText:''}" style="background: #398CD3;color: #000000!important;"><span>添加尾货</span></x-header>
    <!-- list -->
    <div class="nav">
      <div class="nav_top">
        <span>名称:</span>
        <input type="text" placeholder="请输入商品名称" maxlength="15" v-model="goods_name">
      </div>
      <div class="nav_img">
        <div class="img-box user_up_imgfile">
          <span v-for="(item, index) in goods_img" :key="index">
            <img :src="$formatImg(item.img_name)" style="height: 100px; width: 165px;"/>
            <span class="userupicon_cal" @click="deletePic(index)">
              <x-icon type="ios-close" size="26"></x-icon>
            </span>
          </span>
          <vue-cropper @data="fileImgarr" :autoCropWidth="320" :autoCropHeight="180" v-show="goods_img.length < 5">
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
          <popup-picker placeholder="商品状态" :data="goods_states" class="shop" v-model="goods_state" value-text-align="right"></popup-picker>
        </div>
        <div>
          <span>是否上架</span>
          <popup-picker placeholder="商品状态" :data="is_on_sales" class="shop" v-model="is_on_sale" value-text-align="right"></popup-picker>
        </div>
        <div>
          <span>商品分类</span>
          <cate-picker ref="industry" :placeholder="'请选择分类'" v-model="cate_id" class="xing"
          @onHide='catePickerOnHide'></cate-picker>
        </div>
        <div>
          <span>商品品牌</span>
          <brand-picker ref="industry" :placeholder="'请选择品牌'" v-model="brand_id_all" class="xing"
          @onHide='brandPickerOnHide'></brand-picker>
        </div>
        <div>
          <span>商品地址</span>
          <vue-address ref="address" :placeholder="'请选择地址'" v-model="region" class="xing"
          @onHide='region_name = $event'></vue-address>
        </div>
        <div>
          <span>配送方式</span>
          <popup-picker placeholder="配送方式" :data="shipping_types" class="shop" v-model="shipping_type" value-text-align="right"></popup-picker>
        </div>
        <div>
          <span>设置运费</span>
          <span style="display: inline-block;float: right;" @click="setFreight = true">{{!freight ? '包邮' : freight}}</span>
        </div>
        <div>
          <span>原价</span>
          <input type="number" placeholder="输入商品原价" v-model="before_price" width="100%">
        </div>
        <div>
          <span>出售价</span>
          <input type="number" placeholder="输入尾货出售价" v-model="price" width="100%">
        </div>
        <div>
          <span>库存</span>
          <input type="number" placeholder="请输入库存，避免超卖" v-model="shop_num" width="100%">
        </div>
        <div>
          <span style="display: inline-block;vertical-align: top;">参数</span>
          <i style="font-size: 12px;display: inline-block;vertical-align: top;color: #B9B9B9;">请输入规格如尺寸/重量/颜色等</i>
          <!-- <div class="guige"> -->
            <span style="margin-left: auto; color: rgb(57, 140, 211); " @click="sizeEdit = true">编辑</span>
          <!-- </div> -->
        </div>
      </div>
      <!-- 注意说明 -->
      <!-- <div class="notice"><span>添加商品规格</span></div> -->
      <!-- 添加商品规格 -->
      <div class="shop_type">
        <div>
          <span>商品图文详情</span>
          <!-- <i>编辑</i> -->
          <div class="fl" style="z-index: 0;width:100%;overflow-x: auto;padding-top: 10px;">
            <vue-html5-editor :content="goods_content" @change="updateData($event)"></vue-html5-editor>
      <div style="height: 2rem;"></div>
          </div>
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="save" @click="fabu()">
        <span>立即发布尾货</span>
      </div>

      <!-- 运费设置 -->
      <div class="set_money">
        <x-dialog v-model="setFreight" class="dialog-backnone" :hide-on-blur="true">
          <div class="set_content">
            <div style="width: 100%;height: 1rem;"></div>
            <p>运费设置</p>
            <span v-for="(item,index) in setting_list" :key="index" :class="{'is_fix':isFixed == item.id}" @click="checkType(item)">{{item.name}}</span>
            <p v-if="isFixed == 0">自定义邮费</p>
            <input type="text" placeholder="输入快递金额" v-if="isFixed == 0" v-model="freight">
            <div class="set_save">
              <span @click="surePostage()">确定</span>
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

    VueAddress
  } from '../component/'
  import brandPicker from '../component/brand-picker'
  import catePicker from '../component/cate-picker'
  export default {
    data() {
      return {
        is_on_sale: ['上架'],
        is_on_sales: [
          ['上架', '下架']
        ],
        brand_id_all: '', // 行业代码+品牌代码 -XXX-XXX-
        brand_id: 0, // 品牌id
        brand_name: 0, // 品牌名
        hangye_id2: '', // 行业id 和分类中的行业区别开
        hangye_name2: '', // 行业名称 和分类中的行业区别开
        cate_id: '', // 类别代码 -XXX-XXX-
        cat_id: 0, // 类别id
        cat_name: '', // 类别名称
        hangye_id: '', // 行业id
        hangye_name: '', // 行业名称
        region: '', // 地址代码 -XXX-XXX-
        region_name: '', // 地址名 XX省 XX市
        goods_id: '', // 商品id
        goods_name: '', // 商品名称
        goods_states: [
          ['全新', '9成新', '8成新', '7成新','6成新','5成新及以下']
        ],
        goods_state: ['全新'], //商品状态
        shipping_types: [
          ['普通物流', '普通快递', 'EMS', '自取']
        ],
        shipping_type: ['普通物流'], //配送方式
        setFreight: false, //点击运费的div
        setting_list: [{
            id: 1,
            name: '包邮'
          },
          {
            id: 0,
            name: this.freight || '不包邮'
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
        parameter: [], //规格参数
        goods_content: '', //商品详细描述
        goods_img: [], //上传的主图列表
        industry: '', //行业
        before_price: null, //原价
        price: null, //出售价
        shop_num: null, //库存
        isAttrFill: false,
        form: {},
      }
    },
    components: {
      XHeader,
      PopupPicker,
      XDialog,
      VueCropper,
      VueIndustry,
      VueAddress,
      brandPicker,
      catePicker,
    },

    mounted() {
    },

    computed: {
      user() {
        return this.$store.state.user;
      }
    },

    methods: {
      // 类别选择器返回值
      catePickerOnHide (res = '') {
        console.log('catePickerOnHide.res:',res);
        [this.hangye_name, this.cat_name] = res.split(' ')
        console.log('catePickerOnHide.this.cat_name:',this.cat_name);
        console.log('catePickerOnHide.this.hangye_name:',this.hangye_name);
        [this.hangye_id, this.cat_id] = this.cate_id
        console.log('catePickerOnHide.this.cat_id:',this.cat_id);
        console.log('catePickerOnHide.this.hangye_id:',this.hangye_id);
      },

      // 品牌选择器返回值
      brandPickerOnHide (res = '') {
        console.log('brandPickerOnHide.res:',res);
        [this.hangye_name2, this.brand_name] = res.split(' ')
        console.log('brandPickerOnHide.this.brand_name:',this.brand_name);
        console.log('brandPickerOnHide.this.hangye_name2:',this.hangye_name2);
        [this.hangye_id2, this.brand_id] = this.brand_id_all
        console.log('brandPickerOnHide.this.brand_id:',this.brand_id);
        console.log('brandPickerOnHide.this.hangye_id2:',this.hangye_id2);
      },

      //选择包邮或者不包邮
      checkType(item) {
        this.isFixed = item.id
        this.isPostage.id = item.id
        this.isPostage.name = item.name
        if(item.id === 1) {
          this.freight = null;
        }
      },

      //确定运费
      surePostage() {
        var _this = this;
        if (_this.isPostage.id == 0 && _this.freight == '') {
          msg('请填写运费')
        } else {
          _this.setFreight = false
        }
      },

      //确定规格参数
      sureSize() {
        var _this = this;
        _this.isAttrFill = false
        _this.parameter = []
        console.log('_this.parameter:',_this.parameter)
        if (_this.input1 == '' &&  _this.input3 == '' &&  _this.input5 == '' &&  _this.input7 == '' &&  _this.input9 == '') {
          msg('请填写至少一个参数')
        } else {
          if (_this.input1) _this.parameter.push({[_this.input1]:_this.input2})
          if (_this.input3) _this.parameter.push({[_this.input3]:_this.input4})
          if (_this.input5) _this.parameter.push({[_this.input5]:_this.input6})
          if (_this.input7) _this.parameter.push({[_this.input7]:_this.input8})
          if (_this.input9) _this.parameter.push({[_this.input9]:_this.input10})
          _this.sizeEdit = false
          _this.isAttrFill = true
        }
      },

      updateData(data) {
        this.goods_content = data
      },

      //上传主图
      fileImgarr(res) {
        console.log('上传主图：',res);
        this.goods_img.push({
          img_id: this.goods_img.length,
          img_name: res.imgurl
        });
      },

      //删除主图
      deletePic(index) {
        console.log('删除主图：',index);
        this.goods_img.splice(index, 1);
      },

      //发布尾货
      fabu() {
        var _this = this;
        if(!_this.goods_name) return msg('请填写产品名称')
        if(_this.goods_img.length == 0) return msg('请至少上传一张产品图片')
        if(!_this.cate_id) return msg('请选择产品所属分类')
        if(!_this.brand_id) return msg('请选择产品所属品牌')
        if(!_this.region) return msg('请选择产品所属地区')
        if(!_this.before_price) return msg('请填写产品原价')
        if(!_this.price) return msg('请填写产品现价')
        if(!_this.shop_num) return msg('请输入库存')
        if(_this.parameter.length == 0) return msg('请填写产品参数')
        if(!_this.goods_content) return msg('请填写产品详情')
          // _this.$set(_this.form,'goods_id', _this.goods_id)
          _this.$set(_this.form,'is_on_sale',_this.is_on_sale)
          _this.$set(_this.form,'goods_name',_this.goods_name)
          _this.$set(_this.form,'cat_id',_this.cat_id)
          _this.$set(_this.form,'brand_id',_this.brand_id)
          _this.$set(_this.form,'cat_name',_this.cat_name)
          _this.$set(_this.form,'hangye_id',_this.hangye_id)
          _this.$set(_this.form,'hangye_name',_this.hangye_name)
          _this.$set(_this.form,'region',`-${_this.region.join('-')}-`)
          _this.$set(_this.form,'region_name',_this.region_name)
          _this.$set(_this.form,'goods_img',_this.goods_img)
          var goods_state_new;

         if (_this.goods_state == '全新') {
            goods_state_new = 10
          } else if(_this.goods_state == '9成新'){
            goods_state_new = 9
          } else if(_this.goods_state == '8成新'){
            goods_state_new = 8
          } else if(_this.goods_state == '7成新'){
            goods_state_new = 7
          } else if(_this.goods_state == '6成新'){
            goods_state_new = 6
          } else if(_this.goods_state == '5成新及以下') {
            goods_state_new = 5
          }
          _this.$set(_this.form,'goods_state',goods_state_new)

          var is_on_sale_new
          if (_this.is_on_sale == '上架') {
             is_on_sale_new = 1
           } else if(_this.is_on_sale == '下架'){
             is_on_sale_new = 0
           }
           _this.$set(_this.form,'is_on_sale',is_on_sale_new)


          var shop_type;
          if (_this.shipping_type == '普通物流') {
            shop_type = 1
          } else if (_this.shipping_type == '普通快递') {
            shop_type = 2
          } else if (_this.shipping_type == 'EMS') {
            shop_type = 3
          } else if (_this.shipping_type == '自取') {
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
          _this.$set(_this.form,'specs', '')
          // _this.$set(_this.form,'brand_id', 0)
          console.log('this.form==>',this.form);
          _this.setData()

      },

      //请求接口
      setData() {
        var _this = this;
        // console.log("form:", JSON.stringify(_this.form))
        _this.$http.post(_this.$store.state.url + '/Cargo/release_cargo', {
          ..._this.form
        }).then(function(res) {
          console.log('res:',res)
          if(!res) return;
          _this.$router.go(-1)
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
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(57, 140, 211);
    color: #FFFFFF;
    font-size: 0.4rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index:13245678945;
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
    z-index: 2000;
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
