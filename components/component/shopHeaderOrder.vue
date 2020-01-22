<template>
  <!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：尾货头部
    -->
  <div class="header-search">
    <div class="search-content">
      <img class="fanhui_img" src="/static/img/fanhui.png" @click="fanhui()">
      <span class="title">{{title}}</span>

      <div class="button_fabu fl"><img src="../../../static/img/三个点.png" alt=""></div>

    </div>
  </div>
</template>

<script>
  import VuePosition from './position/pos'

  export default {
    components: {
      VuePosition,
    },
    data() {
      return {}
    },
    props: {
      title: String,
    },
    mounted() {},
    methods: {

      fanhui() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style scoped>
  .title {
    display: inline-block;
    margin: 0 auto;
    width: 80%;
    text-align: center;
  }
  .header-search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    height: 45px;
    color: #fff;
    font-size: 16px;

  }

  .location {
    display: inline-block;
    margin-left: 25px;
    width: 50px;
  }

  .location i.icon-dingwei {
    font-size: 15px;
    margin-right: 5px;
  }

  .search-content {
    line-height: 45px;
    height: 45px;
    background: #398CD3;
    /* display: flex;
		align-items: center; */
  }

  .searchbox {
    display: inline-block;
    width: 6.5rem;
    color: #666;
    font-size: 12px;
    position: relative;
  }

  .searchbox input.txt {
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    line-height: 30px;
    height: 30px;
    border-radius: 30px;
    text-indent: 10px;
    color: #fff;
  }

  .searchbox input.txt::-webkit-input-placeholder {
    color: #fff;
  }

  .searchbox i.icon-sousuo {
    position: absolute;
    color: #fff;
    font-size: 22px;
    top: 0;
    right: 10px;
    padding: 0 10px;
  }

  .searchbox i.icon-sousuo::before {
    display: inline-block;
    vertical-align: middle;
  }

  .button_fabu {
    display: inline-block;
    float: right;
    margin-right: 15px;
    /* margin-left: 13px; */

  }

  .button_fabu i {
    font-size: 25px;
  }

  .button_fabu a {
    color: #fff;
  }

  .fanhui {
    width:50px;
    height: 45px;
    line-height: 45px;
    float: left;
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-left: 10px;
  }
  .fanhui> img {
    width: 15px;
    height: 15px;
  }
  .fanhui_img {
    display: inline-block;
    width: 0.6rem;
    height: 0.7rem;
    float: left;
    margin: 8px 0 0 10px;
  }
  .button_fabu > img {
    width: 0.5rem;
    /* height: 20px; */
    margin-top: 0.5rem;
  }
</style>
