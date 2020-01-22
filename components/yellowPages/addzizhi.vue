<template>
  <div class="index_box">
    <x-header class="header">
      <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
      <div slot="overwrite-title" class="title" :style="borderColor">资质列表</div>
      <div slot="right" class="headerRight" @click="add()" v-if="user.uid == cid">添加</div>
    </x-header>
    <div v-if="!item" style="text-align:center;padding:10px">
        暂无资质数据
    </div>
    <div class="li cl li1" v-else>
      <swipeout class="vux-1px-tb">
        <swipeout-item
          transition-mode="follow"
          v-for="(data,index) in item"
          :key="index"
          class="gameRankData"
        >
          <div class="content" slot="content">
            <img :src="$store.state.website.website_domain_name + '/uploads/' + data.img_url" alt @click="largeImg(data.img_url)"/>
            <span class="ell">{{data.name}}</span>
          </div>
          <div slot="right-menu" v-if="user.uid == cid">
            <swipeout-button style="background-color: #FF7F00" @click.native.stop="edit(data.id)">编辑</swipeout-button>
            <swipeout-button @click.native.stop="deleteZZ(data.id)" type="warn">删除</swipeout-button>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
    <div class="imgMask" v-if="imgFlag" @click="imgFlag = false">
       <img :src="$store.state.website.website_domain_name + '/uploads/' + imgPath" alt />
    </div>
    <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link"
                 :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
import {
  GroupTitle,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XButton,
  XHeader
} from "vux";
import VueShareit from "../component/game/helpShare"
export default {
  components: {
    XButton,
    XHeader,
    GroupTitle,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    VueShareit
  },
  name: "list",
  data() {
    return {
      borderColor: {
        borderColor: "#333"
      },
      item: [],
      imgPath: null,
      imgFlag: false,
      cid: null
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
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var _this = this;
      _this.$http
        .post(_this.$store.state.url + "/Homepages/zizhi_img_list", {
          load: true,
          id: this.$route.query.id
        })
        .then(function(res) {
          _this.item = res.zizhi;
          _this.cid = res.cid
        });
    },
    goto(data) {
      if (this.$route.query.type != 2) {
        this.$router.push("/game/problemEdit/" + data.id);
      }
    },
    goBack() {
      if(this.$route.query.uidkey){
        this.$router.push('/index')
      } else {
        history.go(-1);
      }
    },
    add() {
      this.$router.push("/yellowPages/addZZ?id=" + this.$route.query.id);
    },
    edit(id) {
      this.$router.push("/yellowPages/editZZ?id=" + id);
    },
    deleteZZ(id) {
      var _this = this;
      _this.$http
        .post(_this.$store.state.url + "/Homepages/del_zizhi", {
          load: true,
          id: id
        })
        .then(function(res) {
          _this.getData();
        });
    },
    largeImg (imgPath) {
      this.imgPath = imgPath
      this.imgFlag = true
    }
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
.headerRight {
  color: #ff7f00;
}
.index_box {
  /* background-color: #fff; */
}
.chuti {
  width: 100%;
  height: 43px;
  background: #ff7f00;

  margin-top: 10px;
}
.chuti img {
  float: left;
  display: block;
  margin-left: 145px;
  margin-top: 10px;
  width: 17px;
}
.chuti span {
  float: left;
  line-height: 43px;
  margin-left: 5px;
  color: #fff;
  font-size: 14px;
}
.gameRankData {
  height: 83px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin-top: 10px;
}
.gameRankData .content {
  /*float: left;*/
  width: 100%;
  height: 83px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.gameRankData .content img {
  /*float: left;*/
  float: left;
  display: inline-block;
  width: 100px;
  margin-left: 15px;
  margin-top: 13px;
}
.gameRankData .content span {
  /*float: left;*/
  width: 200px;
  float: left;
  margin-left: 15px;
  margin-top: 30px;
  display: block;
}
.imgMask{
     position: fixed;
    left: 0px;
    bottom: 0px;
    right: 0px;
    top: 0px;
    background: rgba(0,0,0,.5);
}
.imgMask img{
    position: absolute;
    top: 50%;
    margin-top: -100px;
}
</style>
