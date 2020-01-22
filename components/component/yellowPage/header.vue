<template>
  <!--
        作者：1209559047@qq.com
        时间：2019-03-05
        描述：首页头部
    -->
  <div class="header-search">
    <div class="search-content">
      <span class="location fl ell">
        <span>
          <x-icon type="ios-arrow-left" class="ios-arrow-left" size="30"></x-icon>
        </span>
        <i class="iconfont icon-dingwei"></i>
        <vue-position></vue-position>
      </span>
      <div class="searchbox fl">
        <span>企业录入</span>
      </div>
      <div class="button_fabu fl">
        <x-icon type="ios-search" size="26" style="margin-top: 10px;margin-right: 15px"></x-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import VuePosition from '../position/pos'
  export default {
    components: {
      VuePosition,
    },
    data(){
      return {}
    },
    mounted() {
      // var _this = this;
      // $(window).scroll(function(){
      //   let ds = $(document).scrollTop();
      //   $('.search-content').css({
      //     'backgroundColor':'rgba(53, 73, 94,'+ ds/100 +')',
      //   })
      // })
    },
    methods: {
      go () {
        this.$router.push('/search')
      }
    },
    // destroyed() {
    //   $(window).unbind('scroll');
    // }
  }
</script>

<style scoped>
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
  .location{
    display: inline-block;
    margin-left: 10px;
    width:120px;
  }
  .location .ios-arrow-left{

  }
  .location i.icon-dingwei{
    font-size: 15px;
  }
  .search-content{
    line-height: 45px;
    height: 45px;
    background: #35495e;
  }
  .searchbox{
    display: inline-block;
    width: 125px;
    margin-left: 13px;
    position: relative;
    text-align: center;
  }
  .searchbox input.txt{
    width: 100%;
    background: rgba(255,255,255,0.1);
    line-height: 30px;
    height: 30px;
    border-radius: 30px;
    text-indent: 10px;
    color: #fff;
  }
  .searchbox input.txt::-webkit-input-placeholder{
    color: #fff;
  }
  .searchbox i.icon-sousuo{
    position: absolute;
    color: #fff;
    font-size: 22px;
    top: 0;
    right: 10px;
    padding: 0 10px;
  }
  .vux-x-icon {
    fill: #FFFFFF;
  }
  .button_fabu{
    float: right;
    display: inline-block;
    margin-left: 13px;
  }
  .button_fabu i{
    font-size: 25px;
  }
  .button_fabu a{
    color: #fff;
  }
</style>
