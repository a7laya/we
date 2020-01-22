<template>
  <div class="container">
    <div ref="vHeader">
      <x-header class="header">
        <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
        <div slot="overwrite-title" class="title" :style="borderColor">排行榜</div>
      </x-header>
    </div>
    <div ref="tab">
      <tab :line-width=2 active-color='#FF7F00' v-model="index" custom-bar-width="60px">
        <tab-item class="vux-center" v-for="(item, index) in list2" @on-item-click="go(index+1)" :key="index">{{item}}</tab-item>
      </tab>
    </div>
    <div class="dataReflash" ref="dataReflash" @click="aaa()">
      *排行榜数据实时更新
    </div>
    <swiper v-model="index" :height="vHeight" :show-dots="false">
      <swiper-item>
        <div class="tab-swiper vux-center">
          <!-- <vue-list :type="type" :item="list" :result="result" :Cheight="cHeight"></vue-list> -->
          <vue-onlylist :type="type" :item="list" :Cheight="cHeight"></vue-onlylist>
        </div>
      </swiper-item>
    </swiper>
    <div class="footer" ref="footer">
      <swiper :list="banner_list" :show-dots="false" :auto="true" :aspect-ratio="9/16" height="120px"></swiper>
    </div>
    <!-- <vue-game :type="2"></vue-game> -->
    <vue-shareit></vue-shareit>
  </div>

</template>
<!-- <script src="js/jquery-1[1].2.1.pack.js" type="text/javascript"></script> -->
<script src="../../../static/js/jquery-1[1].2.1.pack.js" type="text/javascript"></script>
<script>
  import {
    XHeader,
    Badge,
    Grid,
    GridItem,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  } from 'vux'
  import VueList from '../component/game/list'
  import VueOnlylist from '../component/game/onlylist'
  import VueShareit from '../component/game/gameShareit'
  import {
    VueGame
  } from '../component/'
  // const list = () => ['红包榜', '出题榜', '富豪榜']
  export default {
    components: {
      XHeader,
      Badge,
      Grid,
      GridItem,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      VueList,
      VueShareit,
      VueGame,
      VueOnlylist
    },
    data() {

      return {
        list: [],
        result: null,
        borderColor: {
          borderColor: '#333333'
        },
        index: 0,
        list2: ['红包榜'],
        // demo2: '美食',
        type: 1,
        vHeight: '0px',
        cHeight: 0,
        banner_list: [{
          img: '/static/img/game/guanggao.jpg'
        }, {
          img: '/static/img/game/guanggao.jpg'
        }],
        websock: null,
        websocket: null,
        act_id: '',
        dongtai_list: '',
        new_list : [],
      }
    },
    watch:{
      'dongtai_list' : {
        handler() {
          if (this.data_list.length != 0) {
            var _this = this;
            setTimeout(function(){
              _this.list = _this.dongtai_list
            },2000)
          }

        },
        deep: true,//深度监听
        immediate: false
      },

    },
    computed: {
      user() {
        return this.$store.state.user
      },
      data_list() {
      	return this.$store.state.aaa;
      },
    },
    mounted() {
      var _this = this
      setInterval(function(){
        if (_this.$store.state.aaa.length != 0) {
          _this.list = _this.$store.state.data_list.rank_list;
          sessionStorage.setItem('change_id',_this.$store.state.data_list.rank.c_rank)
          
        }
      },1000)

      this.act_id = this.$route.query.id;
      this.ajax();
      this.getdata();
      var _this = this
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(_this.$refs.vHeader.offsetHeight)
      _this.vHeight = h - (_this.$refs.vHeader.offsetHeight + _this.$refs.tab.offsetHeight + _this.$refs.dataReflash.offsetHeight +
        140) + 'px'
      _this.cHeight = h - (_this.$refs.vHeader.offsetHeight + _this.$refs.tab.offsetHeight + _this.$refs.dataReflash.offsetHeight +
        140)
    },
    created() {
      this.go(this.type);
      this.getImgData();
    },
    // beforeRouteLeave (to, from, next) {
    //   console.log('to')
    //   console.log(to)
    //   console.log(from)
    //   console.log(next)
    // },
    methods: {



      ajax() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Common/addGroup', { //绑定直播间聊天
        	'load': false,
        	type: 3,
        	id: _this.act_id,
        }).then((res) => {
        	_this.$http.post(_this.$store.state.url + '/Applets/redPackageRankingAct', {
        	  'load': false,
        	  'act_id': _this.act_id,
        	}).then((res) => {
            _this.list = res
            _this.new_list = _this.list
        	})
        })
      },

      getdata() {

      },

      getImgData() {
        var _this = this
        _this.$http.post(_this.$store.state.url + '/Applets/get_rich_img', {
          'load': false
        }).then((res) => {
          if (res != []) {
            let list = []
            for (let i in res.imgurl) {
              list[i] = {}
              list[i].img = this.$store.state.website.website_domain_name + '/uploads/' + res.imgurl[i] // banner图片
              list[i].fallbackImg = '/static/img/game/guanggao.jpg' // 备用图片
            }
            this.banner_list = list
          }
        })
      },
      //红包数据
      go(type) {
        // this.type = type
        // let _this = this
        // if (type === 1) {
        //   _this.$http.post(_this.$store.state.url + '/Applets/redPackageRanking', {
        //     load: true
        //   }).then(function(res) {
        //     _this.list = res.datas
        //     _this.result = res.result
        //   })
        // }
      },
      goBack() {
        // history.go(-1)
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Common/delGroup', { //绑定直播间聊天
        	'load': false,
        	type: 3,
        	id: _this.act_id,
        }).then((res) => {

        })
        _this.$router.push('/game/onlyindex?shareId=' + _this.act_id)
      }
    }
  }
</script>

<style scoped>
  .vux-header {
    background-color: #ffffff;
  }

  .goBack {
    position: absolute;
    width: 12px;
    height: 12px;
    border-style: solid;
    border-color: white;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 3px;
  }

  .title {
    font-size: 18px;
    text-align: center;
    line-height: 1.066667rem;
  }

  .dataReflash {
    width: 100%;
    margin-top: 10px;
    background-color: #fff;
    text-align: center;
    color: #FFAA01;
    padding: 9px 0;
    font-size: 14px;
  }

  .footer {
    position: fixed;
    bottom: 0px;
    width: 345px;
    margin: 0px 15px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 2s
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active, 2.1.8 版本以下 */
    {
    opacity: 0
  }
</style>
