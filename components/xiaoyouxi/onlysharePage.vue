<template>
  <div class="container">
    <x-header class="header step">
    	<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
    	<div slot="overwrite-title" class="title" :style="borderColor">弱电智能化知识竞赛</div>
    </x-header>
    <div class="body">
      <div class="wtHeader">
        <img src="/static/img/game/banner.png" alt="" >
        <span class="rules" @click="$router.push('/game/gameRule')">竞赛规则</span>
      </div>
      <ul class="block" v-if="isTimeDiv">
        <li v-for="(item,index) in list" :key="index" @click="go(item.spon_id)">
          <div class="left">
            <!-- <span v-if="$route.query.shareTitleId == 'null'">{{item.name}}知识竞赛</span> -->
            <span>{{item.typename}}知识竞赛</span>
            <span>答题闯关领取红包</span>
          </div>
          <div class="right">
            <img src="/static/img/game/dati.png" alt="">
          </div>
        </li>
      </ul>
      <ul class="block" v-if="isTimeDiv == false">
        <li class='li'>
          <div class="content">竞赛答题活动未开始</div>
          <div class="content" style="padding-top: 0;">开始时间</div>
          <span class="list_data">{{startTime | returntime1}}</span>
          <em class='gotoback'><i @click="gohome()">返回首页</i></em>
        </li>
      </ul>
      <!-- <div class="mine">
        <div class="mineInner" @click="go(2)">
          <div class="left">
            <div class="top">
              <div class="headerImg">
                <img :src="$store.state.website.website_domain_name + '/uploads/' + user.mem_headimgurl" alt="">
              </div>
              <div class="personlDetail">
                <span>{{user.mem_nickname}}</span>
                <br>
                <span class="level">初出茅庐</span>
              </div>
            </div>
            <div class="bottom">
              <div class="kuai">
                <span>通关数</span>
                <br>
                <span class="number">{{this.game_num}}</span>
              </div>
              <div class="kuai">
                <span>智汇币</span>
                <br>
                <span class="number">{{this.money_currency / 100}}</span>
              </div>
            </div>
          </div> -->
          <!-- <div class="right">
            <img src="/static/img/game/indexgo.png" alt="">
            <img src="/static/img/game/male.png" alt="" v-if="user.mem_sex == 1">
            <img src="/static/img/game/female.png" alt="" v-else-if="user.mem_sex == 2">
          </div> -->
        <!-- </div>
      </div> -->
      <!-- <vue-shareit></vue-shareit> -->
     <help-share
        :title="fenxiang.shareTitle"
        :dese="fenxiang.shareDese"
        :link="fenxiang.shareLink"
        :imgUrl="fenxiang.shareimgUrl"
      ></help-share>
    </div>
  </div>
</template>

<script>
  import { XHeader, Badge, Grid, GridItem, AlertModule, Alert, Confirm, TransferDomDirective as TransferDom } from 'vux'
  import {VueHead} from '../component/'
  // import VueShareit from '../../component/game/gameShareit'
  import HelpShare from "../component/game/helpShare";
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Badge,
      Grid,
      GridItem,
      VueHead,
      Confirm,
      Alert,
      HelpShare,
      // VueShareit
    },
    data () {
      return {
        list: undefined,
        borderColor: {
          borderColor: '#fff'
        },
        game_num: null,
        money_currency: null,
        status: 1,
        show: false,
        list: [],
        contentTitle: '',
        shareTitleId: '',
        sponsor_id: '',
        huodong_id: '',
        startTime: '',
        isTimeDiv: true, //活动未开始提示开始时间
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      fenxiang() {
        return {
          shareTitle: this.contentTitle + "-弱电知识竞赛",
          shareDese: this.$store.state.user.mem_nickname +
          "分享给你Ta的题库！快去答题赢取奖励吧！",
          shareimgUrl: "/static/img/game/share.jpg",
          shareLink:
          "/game/sharePage?shareTitleId=" + this.shareTitleId + '&assist_id=' + this.assist_id + '&fenurl=' + '/game/sharePage' + '&id'
          + this.user.mem_id
        };
      }
    },
    mounted () {
      var _this = this;
      if (_this.$route.query.huodong_id) {
        _this.huodong_id = _this.$route.query.huodong_id; //活动id
        //获取活动开始的时间戳
        _this.startTime = _this.$route.query.id
        let time = Date.parse(new Date()); //当前时间的时间戳
        if (_this.startTime > Number(time)/1000) {
          //当前时间大于活动开始时间
          _this.isTimeDiv = false
        } else {
          _this.getData(_this.huodong_id)
        }



      }
    },
    created (){
    },
    methods: {
      getData(huodong_id){
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Applets/sponsorList', {
          load: true,
          act_id: huodong_id,
        }).then(function (res) {
          if(!res) return;
          //获取活动的题库列表
          _this.list = res.sponsor_res
        })
      },
      gohome() {
        this.$router.push('/game/onlyindex?shareId=' + this.huodong_id)
      },
      go (id) {
        this.$router.push('/game/shareExam?id=' + id + '&huodong_id='+ this.huodong_id)
      },
      goChallenge (type){
      },
      goBack () {
        this.$router.push('/game/onlyindex?shareId=' + this.huodong_id)
      }
    }
  }
</script>

<style scoped>
  .vux-header{
    background: transparent;
  }
  .weui-grid{
    padding:10px;
  }
  .weui-grids:before{
    border-top:0px
  }
  .container{
    width: 100%;
    background: url("/static/img/game/indexback.png") no-repeat;
    background-color: #FFebb7;
    -webkit-background-size: 100%;
    background-size: 100%;
    padding-bottom: 15px;
    padding-top: 20px;
  }
  .wtHeader{
    width: 345px;
    margin: 0px auto;
    position: relative;
    /*box-shadow: 0px 0px 20px rgba(0,0,0,.1);*/

  }
  .wtHeader img{
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0,0,0,.2);
  }
  .wtHeader .rules{
    position: absolute;
    right: 0px;
    top:20px;
    padding: 2px 3px 2px 12px;
    background-color: #FFFFFF;
    color: #E8B367;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
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
  .title{
    font-size: 18px;
    text-align: center;
    line-height: 1.066667rem;
    color: #fff;
  }
  .block{
    width: 100%;
  }
  .block li{
    width: 345px;
    background-color: #FFFFFF;
    height: 70px;
    border-radius: 5px;
    margin: 12px auto;
    box-shadow: 0px 0px 20px #FF720030;
  }
  .block li .left{
    float: left;

  }
  .block li .left span{
    display: block;
    margin-left: 24px;

  }
  .block li .left span:nth-child(1) {
    margin-top: 17px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .block li .left span:nth-child(4) {
    margin-top: 17px;
    font-size: 13px;
    color: #333;
  }
  .block li .right{
    float: right;
    width: 52px;
    height: 52px;
    margin-top: 8px;
    margin-right: 10px;
  }
  .mine{
    width: 100%;
    height: 127px;

  }
  .mineInner{
    width: 345px;
    margin: 15px auto 0px;
    height: 127px;
    background: #fff;
  }
  .mineInner .left{
    float: left;
    width: 200px;
    margin-left: 15px;
    margin-top: 15px;
  }
  .mineInner .left .top{
    width: 100%;
    overflow: hidden;

  }
  .mineInner .left .top .headerImg{
    width: 44px;
    height: 44px;
    float: left;
  }
  .mineInner .left .top .headerImg img{
    width: 44px;
    height: 44px;
    border-radius: 50px;

  }
  .mineInner .left .top .personlDetail{
    /* width: 130px; */
    float: left;
    margin-left: 10px;
    height: 44px;
  }
  .mineInner .left .top .personlDetail span:nth-child(1){
    font-size: 16px;
    font-weight: bold;
  }
  .mineInner .left .top .personlDetail .level{
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 1px;
    color: #FF9148;
    background: #FFE9D0;
  }
  .mineInner .left .bottom{
    margin-top: 10px;
    overflow: hidden;
  }
  .mineInner .left .bottom .kuai{
    width: 50px;
    margin-right: 10px;
    text-align: center;
    float: left;
  }
  .mineInner .left .bottom .kuai span:nth-child(1){
    font-size: 12px;
    color: #999;
  }
  .mineInner .left .bottom .kuai .number{
    font-size: 19px;
    color: #333;
  }

  .mineInner .right{
    float: right;
    overflow: hidden;
  }
  .mineInner .right img:nth-child(1){
    float: right;
    width: 10px;
    margin-top: 55px;
    margin-right: 13px;
  }
  .mineInner .right img:nth-child(2){
    float: right;
    width: 82px;
    margin-top: 12px;
    margin-right: 20px;
  }
  .weui-dialog__ft{
    background: -webkit-linear-gradient(left, #FF7F52, #FF678F); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF7F52, #FF678F); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF7F52, #FF678F); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF7F52, #FF678F); /* 标准的语法 */
  }
  .li {
    height: auto!important;
  }
  .content {
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding: 20px 0 20px 0;
  }
  .list_data {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #F88509;
  }
  .gotoback {
    width: 100%;
    display: block;
    height: 50px;
    padding-top: 10px;
  }
  .gotoback > i {
    display: block;
    width: 80px;
    height: 20px;
    line-height: 20px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #F88509;
    border-radius: 15px;
    color: #F88509;
  }
</style>
