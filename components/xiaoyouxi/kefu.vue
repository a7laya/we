/** * @Author: feifei * @Date: 2019-05-31 * @Project: hdzg */
<template>
  <div class="container">
    <x-header class="header step">
      <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
      <div slot="overwrite-title" class="title" :style="borderColor">竞赛客服</div>
    </x-header>
    <div class="body">
      <img src="/static/img/game/erweima.png" alt="">
      <div>
        <p>我们会在第一时间回复您的消息</p>
        <p>长按添加客服微信</p>
      </div>
    </div>
    <vue-game :type="2"></vue-game>
    <vue-shareit></vue-shareit>
  </div>
</template>

<script>
  import {XHeader, TransferDomDirective as TransferDom} from 'vux'
  import VueShareit from '../component/game/gameShareit'
  import {VueGame} from '../component/'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      VueShareit,
      VueGame
    },
    data () {
      return {
        borderColor: {
          borderColor: '#333'
        }
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    mounted () {
    },
    created () {
    },
    methods: {
      goBack () {
        history.go(-1)
      }
    }
  }
</script>

<style scoped>
  .vux-header {
    background: transparent;
  }

  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: #FFFCD8;
    -webkit-background-size: 100%;
    background-size: 100%;
    padding-bottom: 15px;
  }

  .wtHeader {
    width: 345px;
    margin: 10px auto;
    position: relative;
    /*box-shadow: 0px 0px 20px rgba(0,0,0,.1);*/
  }

  .wtHeader img {
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, .2);
  }

  .goBack {
    position: absolute;
    width: 12px;
    height: 12px;
    border-style: solid;
    border-color: #333;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 3px;
  }

  .title {
    font-size: 18px;
    text-align: center;
    line-height: 1.066667rem;
    color: #333;
  }

  .body img {
    width: 120px;
    margin: 0px auto;
    margin-top: 100px;
  }

  .body p {
    width: 200px;
    margin: 10px auto;
    text-align: center;
  }

  .body p:nth-child(1) {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 0px;
  }

  .body p:nth-child(2) {
    font-weight: bold;
    font-size: 13px;
    margin-top: 0px;
  }
</style>
