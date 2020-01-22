/**
* @Author: feifei
* @Date: 2019-06-24
* @Project: hdzg
*/
<template>
  <div class="con">
    <transition name="slide-fade">
      <div v-if="flag === true">
        <x-header class="header">
          <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
          <div slot="overwrite-title" class="title" :style="borderColor">企业认领</div>
        </x-header>
        <div class="content">
          <div class="top">
            <div class="ImgButton">
              <div class="ban_title">
                <strong>*</strong>
                <span class="ImgButtonTitle">营业执照:</span>
              </div>

              <div class="user_up_imgfile">
                <span v-for="(item, index) in imgUrlLicense" :key="index">
                  <img :src="$store.state.url + '/uploads/' + item" alt />
                  <span class="userupicon_cal" @click="deletePic(index)" v-show="addect">
                    <x-icon type="ios-close" size="26"></x-icon>
                  </span>
                </span>
                <vue-cropper
                  @data="fileImgarrLicense"
                  :autoCropWidth="180"
                  :autoCropHeight="120"
                  v-show="imgUrlLicense.length < 1"
                >
                  <img src="/static/img/icon1.png" alt />
                </vue-cropper>
              </div>
            </div>
            <x-input v-model="formCompany.claim_name" placeholder="请输入姓名">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>姓名:</span>
              </div>
            </x-input>
            <x-input v-model="formCompany.claim_position" placeholder="请输入职位">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>职位:</span>
              </div>
            </x-input>
            <x-input v-model="formCompany.old_name" placeholder="请输入所属人姓名">
              <div slot="label" class="ban_title">
                <span>所属人姓名:</span>
              </div>
            </x-input>
            <x-input v-model="formCompany.old_phone" placeholder="请输入所属人电话">
              <div slot="label" class="ban_title">
                <span>所属人电话:</span>
              </div>
            </x-input>
            <x-input v-model="formCompany.landline" placeholder="请输入企业座机号">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>企业座机号:</span>
              </div>
            </x-input>
            <x-input v-model="formCompany.claim_reason" placeholder="请输入认领原因 ">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>认领原因:</span>
              </div>
            </x-input>
            <div class="ImgButton">
              <div class="ban_title">
                <strong>*</strong>
                <span class="ImgButtonTitle">上传身份证正面:</span>
              </div>

              <div class="user_up_imgfile">
                <span v-for="(item, index) in imgUrlIdA" :key="index">
                  <img :src="$store.state.url + '/uploads/' + item" alt />
                  <span class="userupicon_cal" @click="deletePic1(index)" v-show="addect">
                    <x-icon type="ios-close" size="26"></x-icon>
                  </span>
                </span>
                <vue-cropper
                  @data="fileImgarrIdA"
                  :autoCropWidth="158"
                  :autoCropHeight="100"
                  v-show="imgUrlIdA.length < 1"
                >
                  <img src="/static/img/icon1.png" alt />
                </vue-cropper>
              </div>
            </div>
            <div class="ImgButton">
              <div class="ban_title">
                <strong>*</strong>
                <span class="ImgButtonTitle">上传身份证反面:</span>
              </div>
              <div class="user_up_imgfile">
                <span v-for="(item, index) in imgUrlIdB" :key="index">
                  <img :src="$store.state.url + '/uploads/' + item" alt />
                  <span class="userupicon_cal" @click="deletePic2(index)" v-show="addect">
                    <x-icon type="ios-close" size="26"></x-icon>
                  </span>
                </span>
                <vue-cropper
                  @data="fileImgarrIdB"
                  :autoCropWidth="158"
                  :autoCropHeight="100"
                  v-show="imgUrlIdB.length < 1"
                >
                  <img src="/static/img/icon1.png" alt />
                </vue-cropper>
              </div>
            </div>
            <x-input v-model="formCompany.phone" type="number" placeholder="请输入联系电话">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>联系电话:</span>
              </div>
            </x-input>
            <x-input v-model="formCompany.code" type="number" placeholder="请输入验证码">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>验证码:</span>
              </div>
              <div slot="right-full-height">
                <vue-code :ipone="formCompany.phone" class="right-full-height"></vue-code>
              </div>
            </x-input>
            <div class="biaodin4">
              <div class="button_max" @click="upform()" style="background: #1AAD19;">提 交</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="tlmtc" v-if="flag === false">
        <div class="tc_card" ref="msk">
          <img
            class="userHeader"
            v-if="user"
            :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl"
            alt
          />
          <div>您的认领信息已提交</div>
          <div class="tips">请等待审核</div>
          <div class="turns" @click="$router.push('/yellowPages/homePage')">名录</div>
        </div>
      </div>
    </transition>
    <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link"
                 :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
import {
  Selector,
  XHeader,
  Group,
  XInput,
  XTextarea,
  Datetime,
  XButton,
  XDialog,
  Divider,
  Alert,
  TransferDomDirective as TransferDom
} from "vux";
import { VueSwiper, VueCode } from "../component";
import VueShareit from "../component/game/helpShare"
import VueCropper from "../component/yellowPage/companyImg";
import VueHeader from "../component/yellowPage/header";

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    VueHeader,
    Group,
    XInput,
    XTextarea,
    Datetime,
    XButton,
    XDialog,
    VueCropper,
    Selector,
    Divider,
    Alert,
    VueCode,
    VueShareit
  },
  data() {
    return {
      borderColor: {
        borderColor: "#fff"
      },
      formCompany: {
        enterprise_id: '',
        business: '',
        claim_name: '',
        claim_position: '',
        old_name: '',
        old_phone: '',
        landline: '',
        claim_reason: '',
        Identity_card_A: '',
        Identity_card_B: '',
        phone: '',
        code: '',
      },
      imgUrlLicense: [],
      imgUrlIdA: [],
      imgUrlIdB: [],
      addect: true,
      flag: true,


    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
     fenxiang () {
        return {
          title:'智汇优库-' + this.$route.meta.title,
          dese:this.$store.state.user.mem_nickname+'邀您关注弱电智能化互动平台，秒得五十块！',
          imgUrl:'/static/logo.png',
          link: this.$route.path + '?uidkey=' + this.$store.state.mem_id
        }
      }
  },
  mounted() {},
  created() {},
  methods: {
    deletePic(index) {
      this.show = true;
      this.suoyin = index;
      this.imgUrlLicense.splice(index, 1);
    },
     deletePic1(index){
      	 this.imgUrlIdA.splice(index, 1);
     },
     deletePic2(index){
     	 this.imgUrlIdB.splice(index, 1);
     },
    fileImgarrLicense(res) {
      this.imgUrlLicense.push(res.imgurl);
      this.formCompany.business = this.imgUrlLicense[0];
    },
    fileImgarrIdA (res) {
      this.imgUrlIdA.push(res.imgurl);
      this.formCompany.Identity_card_A = this.imgUrlIdA[0];
    },
     fileImgarrIdB (res) {
      this.imgUrlIdB.push(res.imgurl);
      this.formCompany.Identity_card_B = this.imgUrlIdB[0];
    },
    yanzheng(){
      var _this = this
      _this.$http
        .post(_this.$store.state.url + "/index/yzm", {
          load: true,
          phone: _this.formCompany.phone,
          yzm: _this.vcCode
        })
        .then(function(res) {
          if (!res) return;
          return res
        });
    },
    upform() {
      var _this = this;
      _this.formCompany.enterprise_id = _this.$route.query.id
      if (_this.imgUrlLicense.length == 0) {
        msg("请添加营业执照");
      } else if (_this.formCompany.claim_name == '') {
        msg("请输入姓名");
      } else if (_this.formCompany.claim_position == "") {
        msg("请输入职位");
      } else if (_this.formCompany.landline == "") {
        msg("请输入企业座机号");
      } else if (_this.formCompany.claim_reason == "") {
        msg("请输入认领原因");
      } else if (_this.imgUrlIdA.length == 0) {
        msg("请添加身份证正面");
      } else if (_this.imgUrlIdB.length == 0) {
        msg("请添加身份证反面");
      } else if (_this.formCompany.phone == "") {
        msg("请输入您的电话");
      } else if (_this.formCompany.code == "") {
        msg("请输入验证码");
      } else {
        _this.$http
          .post(_this.$store.state.url + "/Homepages/enterprise_claim", {
            load: true,
            ..._this.formCompany
          })
          .then(function(res) {
            if (!res) return;
            _this.flag = false;
          });
      }
    },
    goBack() {
      if(this.$route.query.uidkey){
        this.$router.push('/index')
      } else {
        history.go(-1);
      }
    }
  }
};
</script>

<style scoped>
.vux-header .goBack {
  position: absolute;
  width: 12px;
  height: 12px;
  border-style: solid;
  border-color: white;
  color: #ffffff;
  border-width: 1px 0 0 1px;
  -webkit-transform: rotate(315deg);
  transform: rotate(315deg);
  top: 3px;
}
.vux-header .title {
  width: 210px;
  font-size: 16px;
  text-align: center;
  line-height: 1.066667rem;
  color: #ffffff;
}
.vux-header .vux-header-right {
  top: 5px;
}
.content .top {
  background: #ffffff;
  margin-top: 8px;
  padding-top: 10px;
  padding-bottom: 20px;
}
.content .top .ImgButton {
  padding: 0px 15px;
}
.content .top .ImgButton .ImgButtonTitle {
  margin-right: 20px;
  color: #333;
  font-size: 14px;
}
.content .top .user_up_imgfile {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  /*justify-content: center;*/
  padding: 10px 15px 5px 15px;
}
.content .top .user_up_imgfile .userupicon_cal {
  position: absolute;
  top: -10px;
  right: -10px;
  fill: #d52121;
}
.content .top .user_up_imgfile > span {
  width: 48%;
  margin-bottom: 10px;
  position: relative;
}
.content .top .text_right {
  text-align: right;
  margin: 5px 10px;
}
.content .top .ban_title {
  margin-right: 10px;
  color: #333;
  font-size: 15px;
}
.content .top strong {
  color: red;
}
.content .top .hyNameList {
  padding-left: 15px;
  overflow: hidden;
}
.content .top .hyNameList .ban_title {
  display: inline-block;
}
.content .top .HYmain {
  font-size: 15px;
}
.content .top .biaodin4 {
  margin: 25px auto 0px;
  display: block;
}
.right-full-height{
    color: #1aad19;
    font-size: 0.32rem;
    line-height: 1.2rem;
    margin-right: 10px
}

/* vux重定义 */
.weui-label:before {
  content: "1515" !important;
  color: red;
  font-size: 15px;
  width: 15px;
  height: 15px;
}
.weui-cell:before {
  border-top: 0px;
}
.weui-input {
  font-size: 14px !important;
  color: #333;
}
.vux-cell-box:not(:first-child):before {
  border-top: 0px;
}
.vux-cell-value {
  font-size: 15px;
}
/* vux重定义 */
/* // 创建成功之后的样式 */
.tlmtc {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.tlmtc .tc_card {
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  width: 50%;
  margin: 35% auto;
  text-align: center;
  font-size: 15px;
  padding: 30px 20px;
}
.tlmtc .tc_card img {
  display: inline-block;
  margin: 10px auto;
  width: 80px;
  height: 80px;
  border-radius: 50px;
}
.tlmtc .tc_card .tips {
  color: #999;
  font-size: 15px;
  margin-top: 10px;
}
.tlmtc .tc_card .turns {
  color: #fff;
  font-size: 12px;
  background: #03e1ec;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  margin-top: 15px;
}
</style>
