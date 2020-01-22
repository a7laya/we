<template>
  <div class="wrap" @click="showPrice = false">
    <vue-shop-header-nav @changeKeyword='changeKeyword'></vue-shop-header-nav>
    <div style="width: 100%;height: 1.2rem;background-color: #398CD3;"></div>
    <!-- 商品和品牌 -->
    <div class="nav">
      <span v-for="(item,index) in nav" :key='index' :class="{'is_fix': isFixed == index}" @click="shopType(index)">{{item}}</span>
      <i @click="toShopClass"><span class="iconfont icon-caidan"
      style="font-size: 10px; margin-right: 2px;"></span>分类</i>
    </div>
    <div class="nav_list1" v-if="isFixed == 0">
      <span v-for="(v,index) in nav_list" :key='index' :class="{'is_click': isClick == index}" @click.stop="shopRank(index)">{{v}}</span>
      <div class="price" v-if="showPrice">
        <div v-for="(pri,index) in price" :key='index' @click="priClick(index)">{{pri}}</div>
      </div>
    </div>

    <!-- 商品 -->
    <div class="nav_list" v-show="isFixed === 0">
      <div class="list" v-for="(item,index) in list" :key='index' @click="shopDetails(item.goods_id)">
        <img :src="$formatImg(item.img_name)" >
        <div class="list_right">
          <span class="title">{{item.goods_name}}</span>
          <div>
            <span style="text-decoration: line-through;min-width: 60%;">原价￥{{item.market_price}}</span>
            <span>销量:{{item.sales_sum}}</span>
            <span>{{{10:'全新',9:'9新',8:'8新'}[item.goods_state]}}</span>
          </div>
          <div>
            <span style="min-width: 50%;">现价￥<i style="font-size: 14px;">{{item.shop_price}}</i></span>
            <span style="color: #E93939;">1.3折<i class="baoyou" v-if="item.is_free_shipping">包邮</i></span>
          </div>
          <p class="order">
            <span>产品地:{{item.region}}</span>
          </p>

        </div>
      </div>
      <vue-loading :changeType="changeType" :url="$store.state.url + '/Cargo/select_goods_searce?keyword=' + keyword + '&type=' + type + '&sales=' + sales + '&price=' + oprice  + '&peripheral=' + peripheral  + '&page=' + page + '&limit=' + limit + '&hangye_id=' + hangye_id + '&brand_id=' + brand_id"
      @ievent="loaddata"></vue-loading>
    </div>


    <!-- 品牌 -->
    <div class="wrap_brand" v-show="isFixed === 1">
      <div class="nav_brand">
        <tab :line-width="3" active-color="#F88509" custom-bar-width="80px">
          <tab-item :selected="tabIndex_brand === item.id" v-for="(item, index) in tabList_brand" :key="index"
          @on-item-click="changeTab_brand(item.id)">{{item.name}}</tab-item>
        </tab>
      </div>
      <div class="content_brand" v-for="(item,index) in list_brand" :key="index">
        <div class="c_wrap_brand">
          <div class="top_brand">
            <span>{{item.typename}}</span>
            <span @click="toAll(item.hangye_id,item.typename)">全部</span>
          </div>
          <div class="bottom_brand">
            <div v-for="(brand,brandIndex) in item.brands" :key="brandIndex"
            @click="toBrand(brand.brand_id)">
              <img :src="$store.state.website.website_domain_name + '/uploads/' + brand.img_name" alt="">
              <span>{{brand.brand_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <vue-loading :changeType="changeType_brand" :url="$store.state.url + '/Cargo/select_brand_list?&brand_limit=6&page=' + page_brand + '&limit=' + limit_brand + '&hangye_id=' + hangye_id_brand + '&type=' + type_brand"
      @ievent="loaddata_brand" :limit="limit_brand"></vue-loading>

    </div>
    <div style="height: 50px;"></div>
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
    VueShopHeaderNav,
    VueShopBrand,
    VueLoading
  } from "../component/";
  export default {
    data () {
      return {
        brand_id: 0, // 品牌id 点击品牌传过来的id
        hangye_id: 0, // 接收到的行业id
        keyword: "", // 关键字
        type: 1, // 搜索的种类，1是商品 2是品牌
        sales: 1, // 按销量排序 1 降序 2 升序
        oprice: 0, // 按价格排序 1 降序 2 升序
        peripheral: 0, // 周边排序 1是周边商品
        onlyPeripheral: 0, // 是否仅显示周边
        page: 1, // 起始页数
        limit: 10, // 每次加载条数
        list: [],  // 搜出来的列表
        changeType: 0,  // 重新加载
        title: '商品列表',
        nav: ['商品','品牌'],
        isFixed: 0,
        nav_list: ['综合','销量','尾价','周边'],
        isClick: 0,
        showPrice: false, //尾货价格排序
        price: ['价格升序','价格降序'],

        // 品牌===============
        hangye_id_brand: '',
        type_brand: '',
        changeType_brand: 0,
        limit_brand: 10,
        page_brand: 1,
        tabIndex_brand: 0,
        tabList_brand: [{
            id: 0,
            name: '综合'
          },
          {
            id: 1,
            name: '国产品牌'
          },
          {
            id: 2,
            name: '国外品牌'
          }
        ],
        list_brand: []
      }
    },
    components: {
      VueFoot01,
      VueShopHeaderNav,
      Tab,
      TabItem,
      VueShopBrand,
      VueLoading
    },
    created() {
      var _this = this;
      var query = this.$route.query
      this.keyword    = query.keyword || ""
      this.hangye_id  = query.hangye_id || 0
      // 如果是从周边尾货连接跳进来的，就直接锁定为只加载周边数据
      if(query.peripheral) {
        this.peripheral = query.peripheral
        this.onlyPeripheral = 1 // 1锁定 0不限制
        this.isClick = 3 // 切换到周边选项卡
      }
    },
    mounted() {
      this.changeType_brand++
      console.log("mounted,changetype==>",changeType_brand)
    },
    methods: {
      // 初始化
      _listInit () {
        var _this = this
        _this.list = []
        _this.oprice = 0
        _this.sales = 0
        if(_this.onlyPeripheral === 0) _this.peripheral = 0
      },
      // 如果搜索组件在本页面被调用的话，直接更改keyword就行了不用转跳
      changeKeyword (keyword) {
        if(!keyword) return
        this.isFixed = 0 // 切换到商品标签
        this.keyword = keyword
        // 清空结果并激活loading组件加载新数据
        this.list = []
        this.changeType++
      },
      // 加载尾货列表
      loaddata(res) {
      	var _this = this
        _this.list = _this.list || []
      	_this.list.push(...res)
      },
      // 进入商品详情
      shopDetails(id) {
        this.$router.push({
          path:'./shopdetails',
          query: {
            id: id
          }
        })
      },
      shopType(id) {
        this.isFixed = id
      },
      shopRank(index) {
        var _this = this
        if(index === 2) _this.showPrice = !_this.showPrice
        if(_this.isClick === index) return
        _this.isClick = index
        _this.showPrice = false
        switch(index) {
          case 0:
            console.log('点击了综合')
            _this._listInit()
            _this.changeType++ // 通过这个去触发loding组件重新加载数据
            break;
          case 1:
            console.log('点击了销量')
            _this._listInit()
            _this.sales = 1
            _this.changeType++ // 通过这个去触发loding组件重新加载数据
            break;
          case 2:
            console.log('点击了价格')
            _this.showPrice = true
            break;
          case 3:
            console.log('点击了周边')
            _this._listInit()
            _this.peripheral = 1
            _this.changeType++ // 通过这个去触发loding组件重新加载数据
            break;
        }
      },
      priClick(id) {
        var _this = this
        if (id == 0) {
          console.log('点击了价格降序')
          _this._listInit()
          _this.oprice = 2
          _this.changeType++ // 通过这个去触发loding组件重新加载数据
          this.showPrice = false
        } else {
          console.log('点击了价格降序')
          _this._listInit()
          _this.oprice = 1
          _this.changeType++ // 通过这个去触发loding组件重新加载数据
          this.showPrice = false
        }
      },
      // 跳转到商品分类
      toShopClass() {
        this.$router.push('./shopclass')
      },

      // 品牌==================
      // 改变tab
      changeTab_brand(id) {
        this.tabIndex_brand = id
        this.type_brand = id
        this.list_brand = []
        this.changeType_brand++
        console.log("changeTab,changetype==>",this.changeType)
      },
      // 加载数据
      loaddata_brand(res) {
        this.list_brand = res
        console.log("loaddata,res==>",res)
      },
      // 转到该类别的全部页面
      toAll(id, name) {
        this.$router.push({
          path: './brandlist',
          query: {
            id: id,
            name: name
          }
        })
      },
      // 转到相应品牌页
      toBrand(id) {
        console.log('转到品牌',id)
        this.isFixed = 0 // 切换到商品列表页
        this.brand_id = id
        this._listInit ()
        this.keyword = ''
        this.changeType++
      }

    }
  }
</script>

<style scoped>
  .wrap {
    background: #fff;
  }
  .nav {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    background-color: #398CD3;
    color: #fff;
    border-top: 1px solid #5D9FD8;
  }
  .nav > span {
    display: inline-block;
    width: 40%;
    text-align: center;
  }
  .nav :first-child {
    text-indent: 70px;
  }
  .nav :nth-child(2) {
    text-indent: 30px;
  }
  .nav > i {
    display: inline-block;
    background-color: #F88509;
    border-radius: 22px;
    font-size: 12px;
    line-height: 18px;
    padding: 4px 10px;
  }
  .is_fix {
    font-size: 16px;
  }
  .nav_list1 {
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: #F5F5F5;
  }
  .nav_list1 > span {
    display: inline-block;
    width: 25%;
    text-align: center;
    color: #666666;
    font-size: 14px;
  }
  .nav_list1 :nth-child(3) {
    background: url(../../../static/img/未标题-1@2x.png) no-repeat;
    background-position: 1.9rem center;
    background-size: 10px;
  }
  .is_click {
    color: #F88509!important;
    border-bottom: 2px solid #F88509;
  }
  .nav_list {
    /* border-top: 3px solid #F1F1F1; */
    padding-bottom: 10px;
  }

  .list {
    width: 92%;
    margin: 0 auto;
    height: 120px;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #F0F0F0;
  }

  .list>img {
    display: inline-block;
    width: 85px;
    height: 85px;
    vertical-align: middle;
  }

  .list_right {
    display: inline-block;
    vertical-align: middle;
    width: 74%;
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
    margin-top: 10px;
  }

  .list_right>div {
    height: 25px;
    line-height: 25px;
    color: #999999;
  }

  .list_right>div>span {
    display: inline-block;
    width: 32%;
  }

  .list_right>div :last-child {
    text-align: right;
  }

  .list_right>div :first-child {
    color: #E93939;
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

  .order {
    height: 30px;
    line-height: 30px;
  }

  .order>span {
    display: inline-block;
    color: #999999;
  }
  .price {
    position: absolute;
    top: 0.83rem;
    width: 100%;
    z-index: 10;
    background-color: #f5f5f5;
    border-radius: 0 0 5px 5px;
  }
  .price > div {
    width: 92%;
    margin: 0 auto;
    color: #999999;
    border-bottom: 1px solid #F0F0F0;
  }

  /* 品牌 */
  .wrap_brand {
    padding-bottom: 1rem;
  }
  .content_brand {
    background-color: #fff;
    border-bottom: 3px solid #EBEBEB;
  }
  .c_wrap_brand {
    width: 92%;
    margin: 0 auto;
    padding-bottom: 20px;
  }
  .top_brand {
    height: 50px;
    line-height: 50px;
  }
  .top_brand :first-child {
    display: inline-block;
    width: 60%;
    height: 40px;
    font-size: 14px;
    color: #999999;
    border-bottom: 1px solid #eaeaea;
  }
  .top_brand :last-child {
    float: right;
    color: #000AFF;
    background: url(../../../static/img/更多@2x.png) no-repeat;
    background-position: right center;
    background-size: 5px;
    text-indent: 20px;
    display: inline-block;
    width: 15%;
  }
  .bottom_brand {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .bottom_brand > div {
    display: inline-block;
    width: 32%;
    margin-top: 5px;
    background: #F7F7F7;
  }
  .bottom_brand > div >img {
    width: 90%;
    margin: 5px auto 0;
  }
  .bottom_brand > div >span {
    display: inline-block;
    width: 100%;
    text-align: center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>
