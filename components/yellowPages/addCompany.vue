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
          <div slot="overwrite-title" class="title" :style="borderColor">企业录入</div>
        </x-header>
        <div class="content">
          <div class="top">
            <div class="ImgButton">
              <strong>*</strong>
              <span class="ImgButtonTitle">企业图片:</span>
              <div class="user_up_imgfile">
                <span v-for="(item, index) in imgUrl" :key="index">
                  <img :src="$store.state.url + '/uploads/' + item" alt />
                  <span class="userupicon_cal" @click="deletePic(index)" v-show="addect">
                    <x-icon type="ios-close" size="26"></x-icon>
                  </span>
                </span>
                <vue-cropper
                  @data="fileImgarr"
                  :autoCropWidth="320"
                  :autoCropHeight="180"
                  v-show="imgUrl.length < 2"
                >
                  <img src="/static/img/icon1.png" alt />
                </vue-cropper>
              </div>
            </div>
            <div class="ImgButton">
              <strong>*</strong>
              <span class="ImgButtonTitle">企业图标:</span>
              <div class="user_up_imgfile">
                <span v-for="(item, index) in imgUrlLogo" :key="index">
                  <img :src="$store.state.url + '/uploads/' + item" alt />
                  <span class="userupicon_cal" @click="deletePic2(index)" v-show="addect">
                    <x-icon type="ios-close" size="26"></x-icon>
                  </span>
                </span>
                <vue-cropper
                  @data="fileImgarrLogo"
                  :autoCropWidth="180"
                  :autoCropHeight="180"
                  v-show="imgUrlLogo.length < 1"
                >
                  <img src="/static/img/icon1.png" alt />
                </vue-cropper>
              </div>
            </div>
            <x-input v-model="formCompany.name" placeholder="输入企业名称">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>企业名称:</span>
              </div>
            </x-input>
            <vue-address
              ref="address"
              :title="'所在地区：'"
              :placeholder="'请选择区域'"
              style="font-size:14px"
            ></vue-address>
            <popup-picker
              :data="mainList"
              v-model="mainValue"
              @on-hide="onHide1"
              placeholder="请选择单位主体"
              :columns="1"
              ref="picker3"
              show-name
              class="HYmain"
            >
              <div slot="title" class="ban_title">
                <strong>*</strong>
                <span>单位主体:</span>
              </div>
            </popup-picker>
						
            <div class="hyNameList">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>所属行业:</span>
              </div>
              <x-button type="primary" mini @click.native="chooseHangye()">选择行业</x-button>
							
              <div class="content">
                <span v-for="(item,index) in hyNameList" class="mav_span on" :key="index">{{item}}</span>
              </div>
            </div>
            <x-input v-model="formCompany.phone" type="number" placeholder="输入联系电话">
              <div slot="label" class="ban_title">
                <strong>*</strong>
                <span>联系电话:</span>
              </div>
            </x-input>
            <x-input v-model="formCompany.mailbox" type="email" placeholder="输入企业邮箱">
              <div slot="label" class="ban_title">
                <strong style="opacity: 0;">*</strong>
                <span>企业邮箱:</span>
              </div>
            </x-input>
            <div class="text_right">
              <divider>企业详情</divider>
              <div class="cl">
                <div class="fl" style="position: relative;z-index: 1;width:100%;overflow-x: auto;">
                  <vue-html5-editor :content="formCompany.details" @change="updateData($event)"></vue-html5-editor>
                </div>
              </div>
            </div>
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
          <div>恭喜您的企业信息已录入</div>
          <div class="tips">资质、案例、资讯等信息可进入“个人中心”“我的主页”编辑或添加</div>
          <div class="turns" @click="$router.push('/yellowPages/mineCompany?id='+id)">我的主页</div>
        </div>
      </div>
    </transition>
		
    <div v-transfer-dom style="position:relative">
      <x-dialog v-model="showHangye" class="dialogHangye" hide-on-blur>
        <div style="padding:15px;" class="dialogHangyeBox">
          <div class="checkBox">
            <checker
              v-model="hangyeList"
              type="checkbox"
              default-item-class="demo1-item"
              selected-item-class="demo1-item-selected"
              :max="5"
            >
              <checker-item
                :value="item"
                v-for="(item, index) in itemHangye"
                :key="index"
              >{{item.typename}}</checker-item>
            </checker>
          </div>
          <x-button type="primary" mini @click.native="makeSureHY" class="makeSureHY">确定</x-button>
        </div>
      </x-dialog>
    </div>
		
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
  Confirm,
  Divider,
  Alert,
  PopupPicker,
  Checker,
  CheckerItem,
  TransferDomDirective as TransferDom
} from "vux";
import { VueSwiper } from "../component";
import VueShareit from "../component/game/helpShare"
import VueCropper from "../component/yellowPage/companyImg";
import VueAddress from "../component/yellowPage/address";
import VueIndustry from "../component/yellowPage/industry";
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
    Confirm,
    Selector,
    VueAddress,
    VueIndustry,
    Divider,
    Alert,
    Checker,
    CheckerItem,
    PopupPicker,
    VueShareit
  },
  data() {
    return {
      borderColor: {
        borderColor: "#fff"
      },
      formCompany: {
        enterprise_imgs: [], // 企业图片（多张）
        logo: "", // logo图
        name: "", // 企业名称
        hangye: [], // 企业分类
        class: "", //主题分类
        region: "", // 企业区域
        phone: "", // 座机号
        mailbox: "", // 企业邮箱
        details: "" // 企业详情
      },
      imgUrl: [],
      addect: true,
      imgUrlLogo: [],
      enterpriseImgs3: false,
      enterpriseImgs4: false,
      show: false,
      flag: true,
      quaImgIndex: 0,
      mainList: [
        { name: "品牌商", value: "1" },
        { name: "代理商", value: "2" },
        { name: "集成商", value: "3" },
        { name: "设计商", value: "4" },
        { name: "工程队", value: "5" }
      ],
      mainValue: ["1"],
      itemHangye: [],
      adds2: undefined,
      add2: [],
      showHangye: false,
      hangyeList: [],
      hyNameList: [],
      id:''
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
  mounted() {
    var _this = this;
    _this.$http
      .post(_this.$store.state.url + "/Common/hangye")
      .then(function(res) {
        _this.itemHangye = res;
      });
  },
  created() {
    this.formCompany.class = this.mainValue[0];
  },
  methods: {
    updateData(data) {
      this.formCompany.details = data;
    },
    deletePic(index) {
      this.imgUrl.splice(index, 1);
    },
    deletePic2(index) {
      this.imgUrlLogo.splice(index, 1);
    },
    fileImgarr(res) {
      this.imgUrl.push(res.imgurl);
      this.formCompany.enterprise_imgs = this.imgUrl;
    },
    fileImgarrLogo(res) {
      this.imgUrlLogo.push(res.imgurl);
      this.formCompany.logo = this.imgUrlLogo[0];
    },
    upform() {
      var _this = this;
      var region = "",
        region =
          _this.$refs.address.add[0] == -100
            ? 0
            : _this.$refs.address.add[_this.$refs.address.add.length - 1] == -1
            ? _.initial(_this.$refs.address.add, 1)
            : _this.$refs.address.add;

      _this.formCompany.region = _this.$refs.address.add;

      if (_this.formCompany.enterprise_imgs.length == 0) {
        msg("请添加企业图片");
      } else if (_this.formCompany.logo.length == 0) {
        msg("请添加企业图标");
      } else if (
        _this.formCompany.name == null ||
        _this.formCompany.name == ""
      ) {
        msg("请添加企业名称");
      } else if (_this.formCompany.region == "") {
        msg("请选择所在地区");
      } else if (_this.formCompany.hangye.length == 0) {
        msg("请选择所属行业");
      } else if (
        _this.formCompany.phone == null ||
        _this.formCompany.phone == ""
      ) {
      
//      msg("请添加企业电话");
        	if(!isPoneAvailable(_this.formCompany.phone)) return;
      } else {
        _this.$http
          .post(_this.$store.state.url + "/Homepages/add_enterprise_info", {
            load: true,
            ..._this.formCompany
          })
          .then(function(res) {
            if (!res) return;
            _this.flag = false;
            _this.id=res.id;
          });
      }
    },
    onConfirm() {},
    goBack() {
      if(this.$route.query.uidkey){
        this.$router.push('/index')
      } else {
        history.go(-1);
      }
    },
    onHide1() {
      this.formCompany.class = this.mainValue[0];
    },
    onItemClick() {},
    makeSureHY() {
      this.showHangye = false;
      this.formCompany.hangye = [];
      this.hyNameList = [];
      for (var i in this.hangyeList) {
        this.formCompany.hangye.push(this.hangyeList[i].id);
        this.hyNameList.push(this.hangyeList[i].typename);
      }
    },
    chooseHangye(){
      this.showHangye = true
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
  font-size: 13px;
  margin-top: 15px;
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
.mav_span {
  font-size: 13px;
  line-height: 20px;
  background: #ebf3fe;
  border-radius: 20px;
  padding: 0 10px;
  margin: 5px 5px;
  border: 1px solid #5b7ec2;
  color: #517fd7;
  display: inline-block;
}
.mav_span.on {
  border-color: #d26739;
  background: #ffeee6;
  color: #ff4b28;
}
/* .dialogHangye {
  overflow: auto;
} */
.dialogHangye .dialogHangyeBox {
  height: 300px;
  overflow: auto;
  text-align: initial;
}
.dialogHangye .dialogHangyeBox .makeSureHY {
  display: block;
  margin: 0px auto;
}
.dialogHangye .dialogHangyeBox .checkBox {
  height: 250px;
  overflow: auto;
  text-align: initial;
  margin-bottom: 10px;
}
.dialogHangye .dialogHangyeBox .checkBox .demo1-item {
  font-size: 13px;
  line-height: 20px;
  background: #ebf3fe;
  border-radius: 20px;
  padding: 0 10px;
  margin: 5px 5px;
  border: 1px solid #5b7ec2;
  color: #517fd7;
  display: inline-block;
}
.dialogHangye .dialogHangyeBox .checkBox .demo1-item-selected {
  border-color: #d26739;
  background: #ffeee6;
  color: #ff4b28;
}
</style>
