<template>
  <div class="center">
    <x-header class="header">
      <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
      <div slot="overwrite-title" class="title" :style="borderColor">增添资质</div>
    </x-header>
    <div class="top">
      <x-input  class="weui-vcode" placeholder="输入资质名称" v-model="name" :max="14">
      	<div slot="label" class="ban_title">
								<strong>*</strong>
								<span>资质名称:</span>
							</div>
      </x-input>
      <div class="imgBlock">
        <span class="imgTitle"> <strong>* </strong>资质图片：</span>
        <div class="input_img">
          <div class="user_up_imgfile">
            <span v-for="(item, index) in imgUrl" :key="index">
              <img :src="$store.state.url + '/uploads/' + item" alt />
              <span class="userupicon_cal" @click="removeFimg(index)" v-show="addect">
                <x-icon type="ios-close" size="30"></x-icon>
              </span>
            </span>
            <vue-cropper
              @data="fileImgarr"
              :autoCropWidth="180"
              :autoCropHeight="120"
              v-show="imgUrl.length<1"
            >
              <img src="/static/img/icon1.png" alt />
            </vue-cropper>
          </div>
        </div>
      </div>
      <x-Button type="primary" class="saveZZ" @click.native="saveZZ()">保存</x-Button>
    </div>
    <vue-shareit
      :title="fenxiang.title"
      :dese="fenxiang.dese"
      :link="fenxiang.link"
      :imgUrl="fenxiang.imgUrl"
    ></vue-shareit>
  </div>
</template>

<script>
import {
  XHeader,
  Group,
  XInput,
  XButton,
  Alert,
  TransferDomDirective as TransferDom
} from "vux";
import VueCropper from "../../component/yellowPage/companyImg";
import VueShareit from "../../component/game/helpShare"

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    VueCropper,
    VueShareit
  },
  data() {
    return {
      borderColor: {
        borderColor: "#333"
      },
      imgUrl: [],
      addect: false,
      name: null
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    fenxiang() {
      return {
        title: "智汇优库-" + this.$route.meta.title,
        dese:
          this.$store.state.user.mem_nickname +
          "邀您关注弱电智能化互动平台，秒得五十块！",
        imgUrl: "/static/logo.png",
        link: this.$route.path + "?uidkey=" + this.$store.state.mem_id
      };
    }
  },
  created() {},
  methods: {
    fileImgarr(res) {
      this.imgUrl.push(res.imgurl);
    },
    deletePic(index) {
      this.show = true;
      this.suoyin = index;
    },
    saveZZ() {
      var _this = this;
      if(!_this.name){
      	msg("请输入资质名称");
      	return;
      }
      if(! _this.imgUrl[0]){
      	msg("请添加资质图片");
      	return;
      }
      _this.$http
        .post(_this.$store.state.url + "/Homepages/enterprise_zizhi_add", {
          load: true,
          id: _this.$route.query.id,
          img_url: _this.imgUrl[0],
          name: _this.name
        })
        .then(function(res) {
          if (!res) return;
          msg("添加成功");
          _this.timer = setInterval(() => {
            _this.$router.push("/yellowPages/addzizhi?id="+_this.$route.query.id);
          }, 1000);
        });
    },
    goBack() {
      if (this.$route.query.uidkey) {
        this.$router.push("/index");
      } else {
        history.go(-1);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped>
.vux-header {
  background-color: #ffffff;
}

.goBack {
  position: absolute;
  width: 12px;
  height: 12px;
  border-style: solid;
  border-color: white;
  border-width: 1px 0 0 1px;
  -webkit-transform: rotate(315deg);
  transform: rotate(315deg);
  top: 3px;
}

.title {
  width: 210px;
  font-size: 16px;
  text-align: center;
  line-height: 1.066667rem;
}
.top {
  margin-top: 10px;
  background: #ffffff;
}
.imgBlock {
  overflow: hidden;
}
.imgTitle {
  margin-left: 15px;
  float: left;
}

.input_img,
.user_up_imgfile {
  display: inline-block;
  width: 180px;
}

.saveZZ {
  width: 200px;
  margin: 50px auto;
}
strong{
	color: red;
}
</style>
