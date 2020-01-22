<template>
  <div class="wrap" @touchmove.prevent>
    <vue-shop-header-nav>尾货分类</vue-shop-header-nav>
    <p class="left">
      <span v-for="(item,index) in hangye_list" :key='index' :class="{'is_fix':isFixed == index}" @click="change(item.id, index)">{{item.name}}</span>
    </p>
    <div class="right">
      <div class="right_img">
        <img src="../../../static/img/UI的副本24@2x.png" alt="">
        <!-- <span class="my_guanggao">我的广告位</span> -->
      </div>
      <div class="list">
        <div v-for="(v,index) in shop_list" :key='index'>
          <img :src="$store.state.website.website_domain_name + '/uploads/' + v.img_name"
          @click="toShopList(v.hangye_id)">
          <span >{{v.name}}</span>
        </div>
      </div>
      <vue-loading :changeType="changeType" :url="$store.state.url + '/Cargo/select_goods_class?hangye_id=' + hangye_id"
      @ievent="loaddata"></vue-loading>

    </div>
    <vue-foot01></vue-foot01>
  </div>
</template>


<script>
  import {

  } from 'vux'
  import {
    VueFoot01,
    VueShopHeaderNav,
    VueLoading
  } from "../component/";
  export default {
    components: {
      VueFoot01,
      VueShopHeaderNav,
      VueLoading
    },
    data() {
      return {
        changeType: 0, // 用于触发loading组件加载数据
        hangye_id: 0, // 默认空是 热门尾货
        hangye_list: [],
        isFixed: 0,
        shop_list: [],
        defaultId: 0
        //占位
      }
    },
    mounted() {
      this.getHangyeList();
    },
    methods: {
      // 点击一级分类后更新二级分类
      change(id, index) {
        if( this.isFixed === index ) return
        this.isFixed = index
        this.shop_list = []
        this.hangye_id = id
        this.changeType++
      },
      // 加载组件传过来的数据
      loaddata(res) {
        this.shop_list = this.shop_list || []
      	this.shop_list.push(...res)
      },
      // 默认页面热门尾货
      getHangyeList() {
        // console.log("in getHangyeList")
        var _this = this;
        this.$http.get(_this.$store.state.url + '/Cargo/select_goods_hangye_class'
        ).then(function (res) {
          // console.log("getHangyeList:",res)
          if (!res) return
          _this.hangye_list = res.hangye_class;
          // 默认第一个热门尾货
          _this.hangye_list.unshift(
            {
              id: 0,
              name: '热门尾货'
            }
          )
          // 接受传过来的一级分类id
          _this.defaultId = _this.$route.query.id || 0
          // console.log("get $route.query.id:", this.defaultId)
          let index = 0;
          // 如果点击了首页上的分类，则跳转到对应的分类上
          if(0 !== _this.defaultId) {
            // 获取id对应的列表序号index，用于设置isFixed
            // console.log("this.hangye_list:", _this.hangye_list)
            for (let i = 0; i < _this.hangye_list.length; i++) {
              // console.log("this.hangye_list[i].id:", _this.hangye_list[i].id)
              if(_this.defaultId === _this.hangye_list[i].id) {
                index = i;
                break;
              }
            }
            // 切换到点击的一级分类
            _this.change(_this.defaultId, index)
          }
        })



      },

      // 跳转到对应分类的商品列表
      toShopList(hangye_id) {
        console.log("in toShopList hangye_id", hangye_id)
        this.$router.push({path: './shoplist', query: {hangye_id: hangye_id}})
      }
    },
  }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 15.2rem;
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding-top: 1.2rem;
  }

  .left {
    display: block;
    width: 25%;
    height: 15.2rem;
    overflow: scroll;
    background: #F5F5F5;
    padding-bottom: 80px;
    color: #999999;
  }

  .left>span {
    display: block;
    width: 100%;
    text-align: center;
    height: 1rem;
    line-height: 1rem;

    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .right {
    display: block;
    width: 72%;
    height: 15rem;
    overflow: scroll;
    margin: 0.16rem auto 0;
    padding-bottom: 80px;
    color: #333;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .list > div {
    display: inline-block;
    width: 32%;
    margin-top: 5px;
    background: #F7F7F7;
  }
  .list > div >img {
    width: 90%;
    margin: 5px auto 0;
  }
  .list > div >span {
    display: inline-block;
    width: 100%;
    text-align: center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .is_fix {
    background: url(../../../static/img/未标题-2.png) no-repeat!important;
    background-size: 5px 0.35rem!important;
    background-color: #fff !important;
    background-position-y: 12px!important;
    font-size: 14px;
    color: #000;
    font-weight: bold;
  }
  .my_guanggao {
    display: inline-block;
    width: 80px;
    text-align: center;
    background-color: #8E0000;
    color: #fff;
    border-radius: 0 10px 10px 0;
    position: absolute;
    top: 75%;
  }
  .right_img {
    position: relative;
  }
</style>
