<template>
  <div>
    <x-header :title="'活动列表'" :left-options="{backText:''}">
      <div slot="right">
        <vue-header-nav></vue-header-nav>
      </div>
    </x-header>
    <tab>
      <tab-item selected @on-item-click="onItemClick(1)">我发布的</tab-item>
      <tab-item @on-item-click="onItemClick(2)">我参与的</tab-item>
    </tab>
    <!-- 合作 开始 -->
    <div id="divs"></div>
    <template v-if="index==1">
      <div v-for="(item,index) in list">
        <vue-list :type="2" :item="item" :key="index">
          <div class="remove_butt" v-if="item.start_time>dangqian_time/1000" >

            <!--<span @click.stop="remove(index)"><i class="iconfont icon-shanchu"></i><span class="span">删除</span></span>-->
            <router-link :to="'/huodong/edit/' + item.id" tag="span"><i class="iconfont icon-jilu"></i><span class="span">编辑</span></router-link>
          </div>
        </vue-list>
        <div v-if="item.status==2" style="background: gainsboro; color: red;line-height: 25px; height: 25px;font-size: 14px;">
          <marquee scrollamount="3">审核失败原因：{{item.reason}}</marquee>
        </div>
      </div>
      <vue-loading :url="$store.state.url + '/Homecenter/historyRelease?type=2&page=1&limit=10'" @ievent="loaddata"></vue-loading>
    </template>
    <!-- 合作 结束 -->

    <!-- 活动 开始 -->
    <template v-if="index==2">
      <!---->
      <div v-for="(item,index) in list1">
        <vue-list :type="6" :item="item" :key="index">
        </vue-list>
<!--        <div v-if="item.status==2" style="background: gainsboro; color: red;line-height: 25px; height: 25px;font-size: 14px;">
          <marquee scrollamount="3">审核失败原因：{{item.reason}}</marquee>
        </div> -->
      </div>
      <vue-loading :url="$store.state.url + '/Homecenter/my_canyu?type=1&page=1&limit=10'" @ievent="loaddata1"></vue-loading>
    </template>
    <!-- 活动 结束 -->

    <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
  import {
    XHeader,
    Tab,
    TabItem,
    Badge
  } from 'vux'
  import {
    VueLoading,
    VueList,
    VueHeaderNav,
    VueShareit
  } from '../component/'
  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      VueLoading,
      Badge,
      VueList,
      VueHeaderNav,
      VueShareit
    },
    data() {
      return {
        list: undefined,
        list1: undefined,
        index: 1,
        newTime: '',
        isup: '', //0代表可以编辑  1代表不可以编辑
        endtime: '',
        dangqian_time: ''
      }
    },
    mounted() {
      var _this = this;
      _this.newTime = (Date.parse(new Date()) / 1000);
      let time = Date.parse(new Date());
      _this.dangqian_time = time
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      fenxiang() {
        return {
          title: '智汇优库-' + this.$route.meta.title,
          dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动平台，秒得五十块！',
          imgUrl: '/static/logo.png',
          link: '/user/index'
        }
      }
    },
    methods: {
      remove(index) {
        var _this = this;
        var layindex = layer.open({
          content: '您确定要删除吗？',
          btn: ['确定', '取消'],
          yes: function() {
            _this.$http.post(_this.$store.state.url + '/Comment/del_data', {
              lood: false,
              pid: _this.list[index].id,
              type: _this.index
            }).then(function(res) {
              if (!res) return;
              _this.list.splice(index, 1);
            })
            layer.close(layindex);
          }
        });
      },
      onItemClick(index) {
        var _this = this;
        this.index = -1
        setTimeout(function() {
          _this.index = index;
          _this.list = undefined;
          _this.list1 = undefined;
        }, 50)
        // _this.$http.post(_this.$store.state.url + '/Homecenter/historyRelease', {
        //   load: true,
        //   id: _this.$store.state.user.uid,
        //   page: 1,
        //   limit: 10,
        //   type: 2
        // }).then(function(res) {

        //   _this.isup = res.isup;
        //   _this.endtime = res.sign_end_time
        //   console.log('_this.isup')
        //   console.log(res)
        //   console.log(_this.isup)
        //   console.log(_this.endtime)
        // })

      },
      loaddata(res) {
        var _this = this;
        _.each(res, function(e) {
          _this.list = _this.list || [];
          _this.list.push(e);
        })
      },
	  loaddata1(res) {
	    var _this = this;
	    _.each(res, function(e) {
	      _this.list1 = _this.list1 || [];
	      _this.list1.push(e);
	    })
	  },
      go(type, id) {
        var url;
        switch (type) {
          case 1:
            url = '/hezuo/details/' + id;
            break;
          case 2:
            url = '/huodong/details/' + id;
            break;
          case 3:
            url = '/zhibo/details/' + id;
            break;
        }
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped>
  #divs {
    padding-top: 2.35rem;
  }

  .vux-header {
    position: fixed !important;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  .vux-tab-wrap {
    position: fixed !important;
    top: 1.2rem;
    width: 100%;
    z-index: 100;
  }

  .index_box .remove_butt {
    position: absolute;
    top: 13px;
    right: 5px;
    background: rgba(255, 255, 255, .8);
  }

  .index_box .remove_butt .span {
    display: inline-block;
    vertical-align: middle;
  }

  .index_box .remove_butt i {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
  }

  .index_box .li {
    margin-top: 10px;
    position: relative;
  }

  .index_box .li+.li {
    margin-top: 5px;
  }

  .index_box .li {
    padding: 10px 15px;
    background: #fff;
  }

  .index_box .li .img {
    width: 65px;
    height: 65px;
  }

  .index_box .li .img img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .index_box .li>.txt {
    width: 270px;
    font-size: 15px;
    color: #636363;
    line-height: 21px;
  }

  .index_box .li>.txt .tit_name {
    display: inline-block;
    vertical-align: middle;
  }

  .index_box .li>.txt .txtsp2 {
    font-size: 13px;
  }

  .index_box .li>.txt .txtsp2 .money {
    color: #fc2b4e;
  }

  .index_box .li>.txt .diqu {
    color: #565656;
  }

  .index_box .li>.txt .txtsp2 .icon-dingwei {
    font-size: 14px;
  }

  .index_box .li>.txt .txtsp2 .diqutxt {
    font-size: 12px;
    margin-right: 10px;
    color: #999;
  }

  .index_box .li>.txt .color {
    color: #565656;
  }

  .index_box .li>.txt .txtsp2 .shuomign {
    margin-left: 10px;
  }

  .index_box .li>.txt .vux-badge.color1 {
    background: #f74c31;
  }

  .index_box .li>.txt .vux-badge.color4 {
    background: #62dcd2;
  }

  .index_box .li>.txt .vux-badge.color2 {
    background: #42ce74;
  }

  .index_box .li>.txt .vux-badge.color3 {
    background: #4b6bd0;
  }
</style>
