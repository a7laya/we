<template>
  <div class="index_box">


    <div class="li cl li2" v-if="type === 1">
      <!-- <span class="all_anniu" @click="all_anniu()"></span> -->
      <swipeout class="vux-1px-tb">
        <swipeout-item transition-mode="follow" v-for="(data,index) in item" :key="index" class="gameRankData"   >
          <div slot="content"  class="content">
              <span class="anniu" @click="xuanze($event, data)"  ></span>
              <span class="title" @click="goDetail(data.id,2)" >{{data.hangye}}</span>
              <span class="shangchuan" @click.native="goDetail(data.id,2)">共上传题数：<span>{{data.count}}</span></span>
              <span class="shenhe" @click.native="goDetail(data.id,2)">通过审核：<span>{{data.count - data.count_no - data.unaudited}}</span></span>
              <span class="shenhe" @click.native="goDetail(data.id,2)">当前排序：<span>{{data.sort}}</span></span>
              <span class="shijian" @click.native="goDetail(data.id,2)"><img src="/static/img/game/shijian.png" alt=""><span>{{data.addtime | returntime8}}</span><span class="shenhe">剩余红包：<span>{{data.red_count}}</span></span></span>
          </div>
          <div slot="right-menu" >
            <swipeout-button @click.native.stop = "$router.push('/game/userDetail/' + data.id)" style="background-color: #FF7F00">查看明细</swipeout-button>
            <swipeout-button @click.native.stop = "$router.push('/game/editAds/' + data.id)" type="warn">编辑广告</swipeout-button>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
    <div class="li cl li1" v-else-if="type === 2">
      <div class="mineRankCenter">
        <div class="chuti" @click="gostart(1)">
          <img src="/static/img/game/tianjia.png" alt="">
          <span>添加新题</span>
        </div>
        <swipeout class="vux-1px-tb">
          <swipeout-item transition-mode="follow" v-for="(data,index) in item" :key="index" class="gameRankData"  @click.native="goDetail(data.id,1)">
            <div class="content" slot="content">
              <span class="title">{{data.hangye}}</span>
              <span class="shangchuan">共上传题数：<span>{{data.count}}</span></span>
              <span class="shenhe">通过审核：<span>{{data.count - data.count_no - data.unaudited}}</span></span>
              <span class="shijian"><img src="/static/img/game/shijian.png" alt=""><span>{{data.addtime | returntime8}}</span></span>
            </div>
            <div slot="right-menu">

              <swipeout-button style="background-color: #FF7F00" v-if="data.status === 1" @click.native.stop = "goIn(data.to_status, data.id)">继续发布</swipeout-button>
              <swipeout-button  v-if="data.to_status === 2" @click.native.stop = "$router.push('/game/editAds/' + data.id)" type="warn">编辑广告</swipeout-button>
              <swipeout-button v-else-if="data.status === 0" @click.native.stop = "gotToAdd(data.id,data.hangye_id)"  >继续上传</swipeout-button>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </div>
    <div class="li cl li3" v-else-if="type === 3">
      <swipeout class="vux-1px-tb">
        <swipeout-item transition-mode="follow" v-for="(data,index) in item" :key="index" class="gameRankData" @click.native="goDetail(data.id,3)">
          <div slot="content" class="content">
            <span class="title">{{data.hangye}}</span>
            <span class="shangchuan">共上传题数：<span>{{data.count}}</span></span>
            <span class="shenhe">通过审核：<span>{{data.count - data.count_no - data.unaudited}}</span></span>
            <span class="shijian"><img src="/static/img/game/shijian.png" alt=""><span>{{data.addtime | returntime8}}</span></span>
          </div>
          <div slot="right-menu">
            <swipeout-button @click.native.stop = "$router.push('/game/userDetail/' + data.id)" style="background-color: #FF7F00">查看明细</swipeout-button>
            <swipeout-button type="primary" @click.native.stop = "goIn(2, data.id)">重新发布</swipeout-button>
            <swipeout-button type="warn" @click.native.stop = "$router.push('/game/editAds/' + data.id)">编辑广告</swipeout-button>

          </div>
        </swipeout-item>
      </swipeout>
    </div>
  </div>
</template>

<script>
  import {GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton  } from 'vux'
  export default {
    components: {
      GroupTitle,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XButton
    },
    name: 'list',
    data () {
      return {
        isFixed: false,
        data_list: [],
      }
    },
    props: {
      type: Number,
      item: Array,
      result: Object
    },
    created () {
    },
    methods: {
      gostart () {
        this.$router.push('/game/problemAdd')
      },
      goDetail (id, type) {
				console.log('id,type')
				console.log(id,type)
        this.$router.push('/game/timuList/' + id + '?type=' + type)
      },
      goIn (to_id, id) {
        if (to_id == 1) {
          this.$router.push('/game/setAds/' + id)
        } else if (to_id == 2) {
          this.$router.push('/game/setHongbao/' + id)
        }
      },
      gotToAdd (id, hangye_id) {
        this.$router.push('/game/singleAdd/' + id + '/' + hangye_id)
      },
      xuanze (e, data) {
        var _this = this;
         if (e.target.className.indexOf("is_fixed") == -1) {
             e.target.className = "anniu is_fixed"; //切换按钮样式
             _this.data_list.push(data.id)
         } else {
             e.target.className = "anniu";//切换按钮样式
             for(var i=0;i<_this.data_list.length;i++) {
               if(_this.data_list[i] == data.id) {
                 _this.data_list.splice(i,1)
               }
             }
         };
         sessionStorage.setItem("data_list", _this.data_list);
      }
    }
  }
</script>

<style scoped>
  .all_anniu {
    display: block;
    width: 20px;
    height: 20px;
    border: 1px solid #7C7C7C;
    position: fixed;
    left: 18px;
    top: 11px;
  }
  .anniu {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #7C7C7C;
    position: fixed;
    left: 18px;
    top: 11px;
  }
  .is_fixed {
    background: url(../../../../static/img/heiseduihao.png) no-repeat 0;
  }
  .index_box{
    background-color: #fff;
  }
  .chuti{
    width: 100%;
    height: 43px;
    background: #FF7F00;

    margin-top: 10px;
  }
  .chuti img{
    float: left;
    display: block;
    margin-left: 145px;
    margin-top: 10px;
    width: 17px;
  }
  .chuti span{
    float: left;
    line-height: 43px;
    margin-left: 5px;
    color: #fff;
    font-size: 14px;
  }
  .gameRankData{
    height: 83px;
    box-shadow: 0 0 10px rgba(0,0,0,.05) ;
    margin-top: 10px;
  }
  .gameRankData .content{
    /*float: left;*/
    width: 100%;
    height:  83px;
  }
  .gameRankData .content .title{
    display: block;
    margin-left: 50px;
    padding-top: 10px;
    font-weight: bold;
    color: #333;
    font-size: 16px;
  }
  .gameRankData .content .shangchuan,.gameRankData .content .shenhe{
    display: inline-block;
    margin-left: 50px;
    font-size: 14px;
  }
  .gameRankData .content .shenhe{
    margin-left: 5px;
  }
  .shangchuan span:nth-child(1){
    color: #FF7F00;
  }
  .shenhe span:nth-child(1){
    color: #FF7F00;
  }
  .shijian{
    display: block;
    margin-left: 50px;
    clear: both;
  }
  .shijian img{
    float: left;
    display: inline-block;
    width: 11px;
    margin-top: 5px;
  }
  .shijian span{
    margin-left: 3px;
    font-size: 12px;
  }
  .gameRankData .right{
    float: right;
    margin-right: 30px;
    width: 93px;
  }
  .status0{
    background: #fff;
    color: #FF7F00;
    height: 83px;
    font-size: 14px;
    border: 0px;
  }
  .status1{
    background: -webkit-linear-gradient(left, #FF7F00, #FFAA01 ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF7F00, #FFAA01); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF7F00, #FFAA01); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF7F00, #FFAA01); /* 标准的语法 */
    /*background: transparent;*/
    color: #FFF;
    border-bottom: 1px solid #FF7F00;
    line-height: 30px;
    font-size: 14px;
    /*border: 0px;*/
    margin-top: 6px;
    border-radius: 3px;
  }
  .status2{
    margin-top: 6px;
    font-size: 14px;
    line-height: 30px;
    color: #FF7F00;
    background: transparent;
    border: 1px solid #FF7F00;
    border-radius: 3px;
  }
  .weui-btn:after{
    border: 0px;
  }
  .tikuNull {
    padding: 20px;
    text-align: center;
  }
</style>
