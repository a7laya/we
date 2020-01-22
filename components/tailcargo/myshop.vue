<template>
  <div class="wrap">
    <vue-shop-header-nav :showLocation='false'>我的尾货</vue-shop-header-nav>
    <vue-shop-header-nav :showMore='false' :showArrow='false'
    top='1.2' :noRouter='true' @changeKeyword='changeKeyword'></vue-shop-header-nav>
    <!-- 占位 防止被vue-shop-header-nav组件遮挡 -->
    <div style="height: 90px;"></div>

    <div class="nav">
      <img :src="$store.state.website.website_domain_name + '/uploads/' + userInfo.headimgurl">
      <div class="user">
        <div class="user_top">
          <span style="font-size: 16px;color: #858585;">{{userInfo.nickname}}</span>
          <span style="text-align: right;">{{userInfo.follow_count}}人关注</span>
        </div>
        <div class="user_bottom">
          <img src="../../../static/img/jiangpai.png" alt="">
          <span>实名制认证</span>
          <span class="evaluate">我的评价</span>
        </div>
      </div>
    </div>
    <div class="nav_top">
      <!-- <tab :line-width="3" active-color="#F88509">
        <tab-item  :selected="demo3 === item.id" v-for="(item, index) in list3"
          @on-item-click="changeTab(item.id)" :key="index">{{item.name}}</tab-item>
      </tab> -->
      <tab active-color="#F88509">
        <tab-item selected @on-item-click="onItemClick(1)">在售尾货</tab-item>
        <tab-item @on-item-click="onItemClick(2)">下架尾货</tab-item>
      </tab>
    </div>
    <!-- 在售尾货 -->
    <template v-if="index == 1">
      <div class="nav_list" v-for="(item,index) in list" :key='index'>
        <div class="list">
          <img :src="$store.state.website.website_domain_name + '/uploads/' + item.goods_img"  @click="goodsDetail(item.goods_id)">
          <div class="list_right">
            <span class="title" @click="goodsDetail(item.goods_id)">{{item.goods_name}}</span>
            <div>
              <span style="text-decoration: line-through; min-width: 60%;">原价￥{{item.market_price}}</span>
              <span>数量:{{item.store_count}}</span>
              <span>{{item.goods_state}}</span>
            </div>
            <div>
              <span style="min-width: 60%;">现价￥<i style="font-size: 16px;">{{item.shop_price}}</i></span>
              <span style="color: #E93939;">{{item.shop_price/item.market_price*10 | roundnum}}折<i class="baoyou" v-if="item.is_free_shipping">包邮</i></span>
            </div>
            <div style="align-self: flex-start;">{{item.region}}</div>
            <p class="handle">
              <span @click="editGoods(item.goods_id)">编辑</span>
              <span @click="uploadGoods(item.goods_id,0)">下架</span>
              <span @click="deleteGoods(item.goods_id,index)">删除</span>
            </p>
          </div>
        </div>
      </div>
      <vue-loading :changeType='changeType' :url="$store.state.url + '/Cargo/my_cargo?type=1&page=1&limit=10&keyword=' + keyword" @ievent="loaddata"></vue-loading>
    </template>
    <!-- 下架尾货 -->
    <template v-if="index == 2">
      <div class="nav_list" v-for="(item,index) in list" :key='index'>
        <div class="list">
          <img :src="$store.state.website.website_domain_name + '/uploads/' + item.goods_img" alt="">
          <div class="list_right">
            <span class="title">{{item.goods_name}}</span>
            <div>
              <span style="text-decoration: line-through;">原价￥{{item.market_price}}</span>
              <span>数量:{{item.store_count}}</span>
              <span>{{item.goods_state}}</span>
            </div>
            <div>
              <span>现价￥<i style="font-size: 16px;">{{item.shop_price}}</i></span>
              <span style="color: #E93939;">{{item.shop_price/item.market_price*10 | roundnum}}折<i class="baoyou" v-if="item.is_free_shipping == 1">包邮</i></span>
            </div>
            <div style="align-self: flex-start;">{{item.region}}</div>
            <div class="handle">
              <span @click="editGoods(item.goods_id)">编辑</span>
              <span @click="uploadGoods(item.goods_id,1)">上架</span>
              <span @click="deleteGoods(item.goods_id,index)">删除</span>
            </div>
          </div>
        </div>
      </div>
      <vue-loading :changeType='changeType' :url="$store.state.url + '/Cargo/my_cargo?type=0&page=1&limit=10&keyword=' + keyword" @ievent="loaddata"></vue-loading>
    </template>
    <!-- <img src="../../../static/img/add_goods.png" class="add-goods" @click="goAddShop"/> -->
    <div style="width: 100%;height: 1.5rem;background: #fff;"></div>
    <vue-foot01></vue-foot01>
  </div>
</template>

<script>
  import {
    Tab,
    TabItem,
  } from 'vux'
  import {
    VueFoot01,
    VueSwiper2,
    VueShopHeaderNav,
    VueLoading
  } from "../component/";
  export default {
    inject: ['reload'],
    data() {
      return {
        keyword: '',
        changeType: 0,
        index: 1,
        list: [],
        userInfo: {},
      }
    },
    components: {
      VueFoot01,
      VueSwiper2,
      VueShopHeaderNav,
      Tab,
      TabItem,
      VueLoading
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      // 转到详情页
      goodsDetail(id){
        this.$router.push({
          path:'./shopdetails',
          query:{id}
        })
      },
      // 点击搜索框更改keyword
      changeKeyword(keyword){
        this.keyword = keyword
        this.list = []
        this.changeType++
      },
      onItemClick(index) {
        var _this = this;
        this.index = -1
        setTimeout(function() {
          _this.index = index;
          _this.list = undefined;
        }, 50)
      },
      // 加载用户信息
      getUserInfo() {
        var _this = this;
        _this.$http.get(_this.$store.state.url + "/Cargo/seller_centre")
        .then(function(res) {
          console.log("getUserInfo res:", res);
          if (!res) return;
          console.log('我的尾货=>获取用户信息：',res)
          _this.userInfo = res

        })
      },
      // 组件吐出数据
      loaddata(res) {
        var _this = this;
        _.each(res, function(e) {
          _this.list = _this.list || [];
          _this.list.push(e);
        })
      },
      // 编辑尾货
      editGoods(id) {
        // console.log("in editGoods")
        this.$router.push({path: './editshop', query: {id: id}})
      },
      //上下架
      uploadGoods(id, i) {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Cargo/up_low_cargo',{
          load: true,
          goods_id: id,
          cargo_state: i
        }).then(function(res){
          if(!res) return
          let str;
          if(i == 0) {
            str = '下架'
          } else {
            str = '上架'
          }
          msg(str + '成功')
          _this.reload()
        })
      },
      //删除尾货
      deleteGoods(id,index) {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Cargo/del_cargo',{
          load: true,
          goods_id: id,
        }).then(function(res){
          if(!res) return
          msg('删除成功')
          _this.list.splice(index,1)
        })
      },
      goAddShop(){
        this.$router.push({path: './addshop', query: {}})
      }

    },
  }
</script>

<style scoped>
  .wrap {
    background: #fff;
  }
  .add-goods {
    position: fixed;
    right: 10px;
    bottom: 60px;
    width: 30px;
    height: 30px;
  }
  .list {
    display: flex;
    padding: 10px 20px;
    margin-top: 5px;
  }
  .list > img {
    flex-shrink: 0;
    width: 85px;
    height: 85px;
    border-radius:5px;
    margin-right: 5px;
  }
  .list_right {
    width: 100%;
    color: #989898;
  }

  .list_right > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list_right > div > span:first-child {
    color: red
  }
  .title {
    display: inline-block;
    color: #989898;
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-bottom: 5px;
  }
  .list .handle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    margin-left: auto;
    margin-top: 5px;
    color: #003BFF;
  }

  .nav {
    width: 100%;
    padding-bottom: 10px;
  }

  .nav>img {
    display: inline-block;
    width: 60px;
    height: 60px;
    vertical-align: middle;
    margin: 15px 10px 0 15px;
  }

  .user {
    display: inline-block;
    vertical-align: middle;
    width: 70%;
  }

  .user_top {
    width: 98%;
    height: 30px;
    line-height: 30px;
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .user_top>span {
    display: inline-block;
    width: 50%;

  }

  .user_bottom {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #A2A2A2;
  }

  .user_bottom>img {
    display: inline-block;
    width: 12px;
    height: 15px;
    vertical-align: middle;
  }

  .user_bottom>span {
    display: inline-block;
    width: 46%;
  }

  .guanzhu {
    display: inline-block;
    background-color: #F88509;
    color: #fff;
    border-radius: 10px 0 0 10px;
    height: 20px;
    line-height: 20px;
    width: 50px;
    margin-left: 20px;
    text-align: center;
  }

  .evaluate {
    display: inline-block;
    color: #0031FF;
    text-align: right;
  }

  .nav_top {
    border-top: 1px solid #F3F3F3;
  }

  .nav_list {
    border-top: 3px solid #F1F1F1;
    /* padding-bottom: 10px; */
  }



  .baoyou {
    display: inline-block;
    background-color: #E5B900;
    color: #fff !important;
    border-radius: 5px;
    min-width: 36px;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center !important;
    margin-left: 5px;
    padding: 0 1px;

  }

</style>
