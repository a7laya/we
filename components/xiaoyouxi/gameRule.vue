<template>
  <div class="container">
    <!--    <vue-head></vue-head>-->

    <x-header class="header step">
      <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
      <div slot="overwrite-title" class="title" :style="borderColor">竞赛规则</div>
    </x-header>
    <div class="body">
      <div class="content">
         <div class="inner">
           <h3 class="title">竞赛介绍</h3>
           <ul class="detail">
             <li>弱电知识竞赛是一款全民H5答题活动，玩家可通过答题方式学习弱电行业专业知识、掌握行业动态信息。还可以赢取某企业赞助发放的实物大奖。同时,竞赛活动支持自主上传、发起竞赛题库，获得弱电行业参与者的共鸣，提高企业、品牌、厂商、代理商等在弱电行业内的知名度。</li>
           </ul>
         </div>
        <div class="inner">
          <h3 class="title">竞赛规则</h3>
          <ul class="detail">
            <li style="padding-bottom: 20px">1、您需要在规定时间内选择正确答案。<br>
              2、每条题目答题时间为15秒，每轮共3题。<br>
              3、正确答题一轮，可获得现金红包（随机）。<br>
              4、正常答题：每次需要消耗5个智汇币。<br>
              5、答题通关10轮后，若继续答题，每次将消耗20个智汇币。<br>
              6、答错或超时，重新回答当轮竞赛题库，亦可邀请好友助力答题。<br>
              7、助力好友答对后，好友领取红包（随机），您将获得5个智汇币奖励。<br>
              8、智汇币获取方法：<br>
              ①	将平台网页分享给好友圈/群，免费获得智汇币奖励；<br>
              ②	发起或参与平台互动，免费获得智汇币奖励；<br>
              ③	直接充值获得智汇币（1元=100个智汇币）。<br>
              9、通过答题竞赛首页进入排行榜，可查看：答题榜、出题榜及实物奖品。<br>
            </li>
          </ul>
        </div>
      </div>
      <p class="jieshi">竞赛最终解释权归平台所有</p>
    </div>
    <vue-shareit></vue-shareit>
  </div>
</template>

<script>
  import { XHeader, Badge } from 'vux'
  import VueShareit from '../component/game/gameShareit'
  export default {
    components: {
      XHeader,
      Badge,
      VueShareit
    },
    data () {
      return {
        list: undefined,
        borderColor: {
          borderColor: '#fff'
        }
      }
    },
    computed: {
      user () {
        return this.$store.state.user;
      }
    },
    mounted() {
      var _this = this;
    },
    methods: {
      goBack () {
        history.go(-1)
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
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
    width: 100%;
    height: 100vh;
    background: url("/static/img/game/rule.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    padding-bottom: 15px;
  }
  .wtHeader{
    width: 345px;
    margin: 10px auto;
    position: relative;
    /*box-shadow: 0px 0px 20px rgba(0,0,0,.1);*/

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
  .body{
    position: relative;
    height: 100%;
  }
 .content{
   width: 320px;
   /*height: 400px;*/
   height: 12.666667rem;
   position: absolute;
   /*top:45%;*/
   top:37%;
   left:50%;
   margin-top: -200px;
   margin-left: -160px;
   background: #ffffff;
   overflow: auto;
 }
  .jieshi{
    position: fixed;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #FFA759;
  }
  .inner{
    width: 280px;
    margin: 0px auto;
  }
  .inner .title{
    color: #333333;
    font-size: 15px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ul li{
    overflow: hidden;
    margin-top: 10px;
  }
  .red{
    display: block;
    width: 9px;
    height: 9px;
    border:1px solid #FF3939;
    border-radius: 50px;
    float: left;
    margin-top: 5px;
  }
  .blue{
    width: 9px;
    height: 9px;
    border:1px solid #2C40DA;
    border-radius: 50px;
    float: left;
    margin-top: 5px;
  }
  .neirong{
    width: 260px;
    float: left;
    margin-left: 5px;
    line-height: 19px;
    font-size: 13px;
    color: #333;
  }
</style>
