<template>
  <!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：尾货头部 组件
      修改时间： 2020-01-11
      修改人： laya
    -->
  <div class="header-search" :style="'top:'+ top +'rem;'">
    <div class="search-content">
      <div class="fanhui">
        <img v-show='showArrow' class="fanhui_img" src="/static/img/fanhui.png" @click="fanhui()">
        <img v-show='showLocation' class="dingwei_img" src="../../../static/img/定位白色.png" alt=""></br>
        <span v-show='showLocation' style="display: block;">郑州</span>
      </div>

      <div class="slot">
        <slot>
          <div class="searchbox">
            <input placeholder="商品关键字搜索" class="txt" v-model='keyword'>
            <i class="iconfont icon-sousuo" @click="goList"></i>
          </div>
        </slot>
      </div>

      <div v-show="showMore" class="button_fabu" @click="show=true"><img src="../../../static/img/三个点.png" alt=""></div>
      <!-- <div class="header-nav-icon" style="margin-left: 5px;" @click="show=true"><i class="iconfont icon-caidan"></i></div> -->
      <div v-transfer-dom>
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
  import {
    XDialog,
    TransferDomDirective as TransferDom
  } from 'vux'

  export default {
    props:{
      // 组件所在页面是否需要转跳到其他页面，为true则不转跳直接更改keyword
      noRouter: {
        type: Boolean,
        default: false
      },
      // 是否显示左边返回箭头
      showArrow: {
        type: Boolean,
        default: true
      },
      // 是否显示右边三个点
      showMore: {
        type: Boolean,
        default: true
      },
      // 是否显示地址定位
      showLocation: {
        type: Boolean,
        default: true
      },
      // 距离页面顶部得距离单位PX
      top: {
        type: [Number,String],
        default: 0
      },

    },
    directives: {
      TransferDom
    },
    components: {
      VuePosition,
      XDialog
    },
    data() {
      return {
        keyword: '',
        show: false
      }
    },
    mounted() {},
    methods: {
      goList() {
        var pageName = this.$route.path.split('/').pop()
        if(this.noRouter) {
          this.$emit('changeKeyword', this.keyword)
          return
        }
        this.$router.push({
          path: './shoplist',
          query: {
            keyword: this.keyword
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
  .slot {
    width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
    display: flex;
		align-items: center;
  }

  .searchbox {
    display: inline-block;
    width: 6rem;
    color: #666;
    font-size: 12px;
    margin-left: 10px;
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
    top: -3px;
    right: 10px;
  }

  .searchbox i.icon-sousuo::before {
    display: inline-block;
    vertical-align: middle;
  }

  .button_fabu {
    margin-left: auto;
    margin-right: 10px;
  }

  .button_fabu i {
    font-size: 25px;
  }

  .button_fabu a {
    color: #fff;
  }

  .button_fabu>img {
    width: 0.5rem;
  }

  .fanhui {
    min-width: 75px;
    height: 45px;
    line-height: 45px;
    float: left;
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-left: 10px;
  }

  .dingwei_img {
    width: 15px;
    height: 15px;
  }
  .fanhui_img {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 5px;
  }
</style>
