<template>
  <div class="wrap">
    <div class="nav">
      <tab :line-width="3" active-color="#F88509" custom-bar-width="80px">
        <tab-item :selected="tabIndex === item.id" v-for="(item, index) in tabList" :key="index"
        @on-item-click="changeTab(item.id)">{{item.name}}</tab-item>
      </tab>
    </div>
    <div class="content" v-for="(item,index) in list" :key="index">
      <div class="c_wrap">
        <div class="top">
          <span>{{item.typename}}</span>
          <span @click="toAll(item.hangye_id,item.typename)">全部</span>
        </div>
        <div class="bottom">
          <div v-for="(brand,brandIndex) in item.brands" :key="brandIndex"
          @click="toBrand(brand.brand_id)">
            <img :src="$store.state.website.website_domain_name + '/uploads/' + brand.img_name" alt="">
            <span>{{brand.brand_name}}</span>
          </div>
        </div>
      </div>
    </div>
    <vue-loading :changeType="changeType" :url="$store.state.url + '/Cargo/select_brand_list?&page=' + page + '&limit=' + limit + '&hangye_id=' + hangye_id + '&type=' + type"
    @ievent="loaddata" :limit="limit"></vue-loading>

  </div>
</template>

<script>
  import {
    Tab,
    TabItem,
  } from 'vux'
  import {
    VueLoading
  } from "./";
  export default {
    components: {
      Tab,
      TabItem,
      VueLoading
    },
    data() {
      return {
        hangye_id: '',
        type: '',
        changeType: 0,
        limit: 10,
        page: 1,
        tabIndex: 0,
        tabList: [{
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
        list: [
          {
            "id": 261,
            "name": "会议控制系统1",
            "brands": [
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
            ]
          },
          {
            "id": 262,
            "name": "会议控制系统2",
            "brands": [
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
            ]
          },
          {
            "id": 263,
            "name": "会议控制系统3",
            "brands": [
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
              {
                "brand_id": 1,
                "brand_name": "海达之光",
                "brand_type": 1,
                "img_name": "20190525/ef7a8e2393f48f7b769a26bb857d55c5.jpg"
              },
            ]
          }
        ],
        //占位
      }
    },
    components: {
      Tab,
      TabItem,
      VueLoading
    },
    mounted() {
      this.changeType++
      console.log("mounted,changetype==>",this.changeType)
    },
    methods: {
      // 改变tab
      changeTab(id) {
        this.tabIndex = id
        this.type = id
        this.list = []
        this.changeType++
        console.log("changeTab,changetype==>",this.changeType)
      },
      // 加载数据
      loaddata(res) {
        this.list = res
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
      }
    },
  }
</script>

<style scoped>
  .wrap {
    padding-bottom: 1rem;
  }
  .content {
    background-color: #fff;
    border-bottom: 3px solid #EBEBEB;
  }
  .c_wrap {
    width: 92%;
    margin: 0 auto;
    padding-bottom: 20px;
  }
  .top {
    height: 50px;
    line-height: 50px;
  }
  .top :first-child {
    display: inline-block;
    width: 60%;
    height: 40px;
    font-size: 14px;
    color: #999999;
    border-bottom: 1px solid #eaeaea;
  }
  .top :last-child {
    float: right;
    color: #000AFF;
    background: url(../../../static/img/更多@2x.png) no-repeat;
    background-position: right center;
    background-size: 5px;
    text-indent: 20px;
    display: inline-block;
    width: 15%;
  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .bottom > div {
    display: inline-block;
    width: 32%;
    margin-top: 5px;
    background: #F7F7F7;
  }
  .bottom > div >img {
    width: 90%;
    margin: 5px auto 0;
  }
  .bottom > div >span {
    display: inline-block;
    width: 100%;
    text-align: center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>
