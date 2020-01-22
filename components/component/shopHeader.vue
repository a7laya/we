<template>
  <!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：尾货头部
    -->
  <div class="header-search">
    <div class="search-content">
      <div class="fanhui">
        <img src="../../../static/img/定位白色.png" alt=""></br>
        <span style="display: block;">郑州</span>
        </div>
      <div class="searchbox fl">
        <input placeholder="商品关键字搜索" class="txt" v-model='keyword'>
        <i class="iconfont icon-sousuo" @click="goList"></i>
      </div>
      <div style="font-size: 12px;">
        <span  @click="toShopClass"><span class="iconfont icon-caidan"
        style="font-size: 10px; margin-right: 2px;"></span>分类</span>
      </div>

      <!-- <div class="button_fabu fl"  @click="show=true"><img src="../../../static/img/三个点.png" alt=""></div> -->
      <!-- <div class="header-nav-icon" style="margin-left: 5px;" @click="show=true"><i class="iconfont icon-caidan"></i></div> -->
      <div v-transfer-dom >
      	<x-dialog v-model="show" :hide-on-blur="true" class="header-nav-main">
      		<div class="header-nav-main">
      			<router-link tag="div" to="/" class="header-nav-list">
      				<i class="iconfont icon-shouye"></i><span>官网首页</span>
      			</router-link>
      			<div class="header-nav-list" @click="$store.commit('erweima');show=false">
      				<i class="iconfont icon-guanzhu"></i><span>关注平台</span>
      			</div>
      		</div>
      	</x-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import VuePosition from './position/pos'
  import { XDialog, TransferDomDirective as TransferDom } from 'vux'

  export default {
    directives: {
    	TransferDom
    },
    components: {
      VuePosition,
      XDialog
    },
    data() {
      return {
        keyword:'',
        show: false
      }
    },
    mounted() {},
    methods: {

      // 跳转到商品分类
      toShopClass() {
        this.$router.push('./shopclass')
      },

      goList () {
        var _this = this
        this.$router.push({
            path:'./shoplist',
            query: {
              keyword: _this.keyword
            }
          })
      },
      fanhui() {
        this.$router.go(-1)
      }
    },
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
    width: 6.7rem;
    color: #666;
    font-size: 12px;
    margin-left: 10px;
    position: relative;
  }

  .searchbox input.txt {
    width: 82%;
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
    top: -4px;
    right: 45px;
    padding: 0 10px;
  }

  .searchbox i.icon-sousuo::before {
    display: inline-block;
    vertical-align: middle;
  }

  .button_fabu {
    display: inline-block;
    margin-left: 0.4rem;
    /* margin-left: 13px; */

  }

  .button_fabu i {
    font-size: 25px;
  }

  .button_fabu a {
    color: #fff;
  }
  .button_fabu > img {
    width: 0.5rem;
    /* height: 20px; */
    margin-top: 0.5rem;
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
</style>
