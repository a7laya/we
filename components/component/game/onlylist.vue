<template>
  <div class="index_box" ref="index_box">
    <div class="li cl li1" v-if="type === 1 && item !== null">
      <ul class="game-title">
        <li>排名</li>
        <li>名称</li>
        <li>数量(个)</li>
      </ul>
      <transition name="fade">
        <div class="mineRankCenter" :style="{height: Cheight +'px'}">

          <ul class="gameRankData animated" v-for="(data,index) in item" id="change">
            <li class="rank">
              <span v-if="index < 3"><img :src="'/static/img/game/' + (index + 1) + '.png'" alt="" /></span>
              <span v-else>{{index+1}}</span>
            </li>

            <li class="gameUserDetail ell"><img :src="$store.state.website.website_domain_name + '/uploads/' + data.headimgurl"
                alt=""><span>{{data.nickname}}</span></li>
            <li class="count" id="state_val">{{data.count}}</li>

          </ul>

        </div>
      </transition>

      <!--   <div class="mineRank">
        <div class="mineRankImg">
          <img :src="$store.state.website.website_domain_name + '/uploads/' + result.headimgurl" alt="">
        </div>
        <div class="mineRankDetail">
          <p class="nickname">{{result.nickname}}</p>
          <p><span>我的排名：<span class="paiming">{{result.ranging}}</span></span><span>红包数量：<span class="chuticshu">{{result.count}}</span></span></p>
        </div>
      </div> -->
    </div>


  </div>
</template>

<script>
  import {
    XButton,
    TransferDom
  } from 'vux'
  export default {
    components: {
      XButton,
      TransferDom
    },
    name: 'list',
    data() {
      return {
        data_list: []
      }
    },
    props: {
      type: Number,
      item: Array,
      result: Object,
      Cheight: Number
    },
    mounted() {


      var _this = this
      // setInterval(function(){
      //   _this.data_list = item
      // },1000)
    },
    watch: {
      'item': {
        handler() {
          // $('.mineRankCenter').each(function(){
          //   $(this).find('ul').each(function(){
          //     $(this).addClass('flipInX slower')
          //   })
          // })
          // $('#change').addClass('flipInX infinite')
        },
        deep: true, //深度监听
        immediate: false
      },
    },
    methods: {

      //排行榜变化特效
      go(type, id) {
        var type = Number(type)
        var url
        switch (type) {
          case 1:
            url = '/hezuo/details/' + id
            break
          case 2:
            url = '/huodong/details/' + id
            break
          case 3:
            url = '/zhibo/details/' + id
            break
        }
        this.$router.push(url)
      },
      shareFriend() {

        wx.updateAppMessageShareData({
          title: '111', // 分享标题
          desc: '11', // 分享描述
          link: '111', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '11', // 分享图标
          success: function() {
            // 设置成功
          }
        })
      }
    }
  }
</script>

<style scoped>
  .index_box {
    background-color: #fff;
    /*height: 359px;*/
    padding-bottom: 20px;
  }

  .game-title {
    overflow: hidden;
    text-align: center;
    font-size: 15px;
    background-color: #EEEEEE;
    line-height: 26px;
  }

  .game-title li,
  .gameRankData li {
    color: #666666;
  }

  .game-title li:nth-child(1) {
    width: 100px;
    float: left;
  }

  .game-title li:nth-child(2) {
    width: 160px;
    float: left;
  }

  .game-title li:nth-child(3) {
    width: 100px;
    float: left;
    margin-right: 10px;
  }

  .mineRankCenter {
    height: 220px;
    background-color: white;
    overflow: scroll;
  }

  .gameRankData {
    overflow: hidden;
    line-height: 35px;
    text-align: center;
    font-size: 15px;
  }

  .gameRankData li:nth-child(1) {
    width: 100px;
    float: left;
  }

  .gameRankData li:nth-child(2) {
    width: 160px;
    float: left;
    overflow: hidden;
    text-align: left;
    border-bottom: 1px solid #EEEEEE;
  }

  .gameRankData li:nth-child(2) img {
    width: 24px;
    height: 24px;
    border-radius: 50px;
    float: left;
    margin-top: 6px;
    margin-right: 9px;
  }

  .gameRankData li:nth-child(2) span {
    color: #666666;
  }

  .gameRankData li:nth-child(3) {
    width: 100px;
    float: left;
    margin-right: 10px;
    border-bottom: 1px solid #EEEEEE;
  }

  .mineRank {
    overflow: hidden;
    height: 53px;

  }

  .mineRank .mineRankImg {
    float: left;
    margin-left: 20px;
    margin-right: 10px;
  }

  .mineRank .mineRankImg img {
    width: 43px;
    height: 43px;
    border-radius: 50px;
  }

  .mineRank .mineRankDetail {
    float: left;
    font-size: 14px;
    color: #666666;

  }

  .mineRank .mineRankDetail .nickname {
    display: inline-block;
    margin-top: 5px;
  }

  .mineRank .mineRankShare {
    float: right;

  }

  .rank img {
    width: 14px;
    margin: 6px auto;
  }

  .paiming,
  .chuticshu {
    color: #FF7F00;
    font-size: 16px;
  }

  .paiming {
    display: inline-block;
    margin-right: 20px;
  }

  .mineRank .mineRankShare button {
    width: 78px;
    height: 20px;
    border-radius: 50px;
    background: -webkit-linear-gradient(left, #FF7F00, #FFAA01);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF7F00, #FFAA01);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF7F00, #FFAA01);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF7F00, #FFAA01);
    /* 标准的语法 */
    font-size: 12px;
    color: #fff;
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
    margin-right: 20px;
    padding: 0px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 2s
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active, 2.1.8 版本以下 */
    {
    opacity: 0
  }
</style>
