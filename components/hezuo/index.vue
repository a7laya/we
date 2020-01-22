<template>
  <div>
    <x-header :title="'众包列表'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="fanhui()" class="header">
      <div slot="right">
        <vue-header-nav></vue-header-nav>
        <!-- <video></video>2 -->
      </div>
    </x-header>
    <vue-swiper :type="4"></vue-swiper>
    <div class="search" :class="{'is_fixed' : isFixed}">
      <div class="searchSelect">
        <popup-picker placeholder="地区" :data="itemAddress" v-model="add" :show-name="true" :columns="2" @on-hide="hide"
          value-text-align="left" class="sx"></popup-picker>
        <popup-picker placeholder="行业" :data="itemHangye" v-model="add2" :show-name="true" :columns="1" @on-hide="hide2"
          value-text-align="left" class="sx"></popup-picker>
      </div>
    </div>
    <div class="index_box" style="padding-top: 2.4rem;">
      <vue-list1 v-for="(item,index) in list" :type="1" :item="item" :type2="index" :key="index" @zhiding="zhiding"></vue-list1>
      <vue-loading :url="$store.state.url + '/Cooperation/getIndexActInfo?page=1&limit=10&region='+region+'&industry='+hangye"
        @ievent="loaddata" v-if="isshow"></vue-loading>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="isShow" class="dialog-backnone" hide-on-blur>
        <div class="ding_content">
          <svg @click="isShow = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
            <path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z"
              class="st0" />
          </svg>
          <div class="ding_help">帮助置顶</div>
          <div class="ding_px"></div>
          <div class="des">
            <div>置顶优势</div>
            <div>&nbsp;1. 刷新企业排序至众包最前端；</div>
            <div>&nbsp;2. 同行中提高信息曝光率；</div>
            <div>&nbsp;3. 促进企业众包及平台互动；</div>
            <div>注：置顶一次需消耗10个智汇币</div>
            <div class="ding_bi">-10个智汇币</div>
            <div class="ding-sure" @click="sureDing()">确定置顶</div>
          </div>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="exhibit" class="invest_Money">
        <div class="investMoney_img">
          <div style="width:100%;display: flex;justify-content: center;margin-top:0.5rem"><img src="/static/img/zhihui.png"
              style="height:4rem;width:70%"></div>
          <div class="investMoney_title">
            <p>智汇币不足</p>
            <p>赶紧去赚取智汇币吧</p>
          </div>
          <div class="lessMoney">
            <p>获取智汇币的途径：</p>
            <p>1、分享任何页面给好友</p>
            <p>2、分享任何页面到朋友圈、群内</p>
            <p>3、参与平台任何互动任务</p>
            <p>4、充值获取(100智汇币=1元)</p>
          </div>
          <div>
            <x-button @click.native="$router.push('/user/myrecharge')">去充值</x-button>
          </div>
        </div>
        <div class="investMoney_cha">
          <div class="investMoney_ch" @click="exhibit = false"><img src="/static/img/cha.png"></div>
        </div>
      </x-dialog>
    </div>

    <vue-foot></vue-foot>
    <vue-suspen></vue-suspen>
    <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
  import {
    XHeader,
    Badge,
    PopupPicker,
    XDialog,
    TransferDom,
    XButton
  } from 'vux'
  import {
    VueLoading,
    VueSwiper,
    VueFoot,
    VueSuspen,
    VueList1,
    VueHeaderNav,
    VueShareit
  } from '../component'
  export default {
    components: {
      XHeader,
      VueLoading,
      Badge,
      VueSwiper,
      VueFoot,
      VueSuspen,
      VueList1,
      VueHeaderNav,
      VueShareit,
      PopupPicker,
      XDialog,
      XButton
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        list: undefined,
        isshow: true,
        itemAddress: [],
        adds: undefined,
        add: [],
        itemHangye: [],
        adds2: undefined,
        add2: [],
        region: '',
        hangye: '',
        show: true, //是否开启省市县单选模式
        show1: false,
        listId: '',
        isShow: false,
        isFixed: false,
        offsetTop: 0,
        exhibit: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      fenxiang() {
        return {
          title: this.$route.meta.title,
          dese: this.$store.state.user.mem_nickname + '邀您关注弱电行业众包伙伴/项目，他在智汇优库等您！',
          imgUrl: '/static/img/hz.jpg',
          link: '/hezuo/index'
        }
      }
    },
    mounted() {

      // this.$http.post(this.$store.state.url + '/Cooperation/getIndexActInfo',{
      //   page:1,
      //   region:'',
      //   industry:'',
      //   limit:10

      // }).then(res=>{
      //   console.log(res,1)
      // })


      window.addEventListener('scroll', this.initHeight);
      this.$nextTick(() => {
        this.offsetTop = document.querySelector('.type-body').offsetTop;
      })


      var _this = this;
      _this.$http.post(_this.$store.state.url + "/common/region").then(function(res) { //获取城市
        if (!res) return;
        if (_this.show) {
          _this.itemAddress.push({
            name: '全国',
            value: '-100',
            parent: '0'
          });
          _this.itemAddress.push({
            name: '',
            value: '-1',
            parent: '-100'
          });
        }
        _.each(res, function(e) {
          _this.itemAddress.push({
            name: e.typename,
            value: e.id.toString(),
            parent: e.parent_id.toString()
          });
          if (_this.show) {
            _this.itemAddress.push({
              name: '全部',
              value: '-1',
              parent: e.id.toString()
            });
          }
          _.each(e.children, function(e) {
            if (_this.show) {
              _this.itemAddress.push({
                name: '全部',
                value: '-1',
                parent: e.id.toString()
              });
            }
            _this.itemAddress.push({
              name: e.typename,
              value: e.id.toString(),
              parent: e.parent_id.toString()
            });
            _.each(e.children, function(e) {
              _this.itemAddress.push({
                name: e.typename,
                value: e.id.toString(),
                parent: e.parent_id.toString()
              });
            })
          })
        })
      });
			
		_this.$http.post(_this.$store.state.url + "/common/hangye").then(function(res) { //获取行业
		  if (!res) return;
		  if (_this.show) {
		    _this.itemHangye.push({
		      name: '全部',
		      value: '',
		      parent: '0'
		    });
		    _this.itemHangye.push({
		      name: '',
		      value: '-1',
		      parent: '-100'
		    });
		  }
		  _.each(res, function(e) {
		    _this.itemHangye.push({
		      name: e.typename,
		      value: e.id.toString(),
		      parent: e.parent_id.toString()
		    });
		    if (_this.show) {
		      _this.itemHangye.push({
		        name: '全部',
		        value: '-1',
		        parent: e.id.toString()
		      });
		    }
		    _.each(e.children, function(e) {
		      if (_this.show) {
		        _this.itemHangye.push({
		          name: '全部',
		          value: '-1',
		          parent: e.id.toString()
		        });
		      }
		      _this.itemHangye.push({
		        name: e.typename,
		        value: e.id.toString(),
		        parent: e.parent_id.toString()
		      });
		      _.each(e.children, function(e) {
		        _this.itemHangye.push({
		          name: e.typename,
		          value: e.id.toString(),
		          parent: e.parent_id.toString()
		        });
		      })
		    })
		  })
		});	
      // _this.$http.post(_this.$store.state.url + "/Common/hangye").then(function(res) { //获取行业
      //   if (!res) return;
      //   if (_this.show1) {
      //     _this.itemHangye.push({
      //       name: "全部",
      //       value: "-100",
      //       parent: "0"
      //     });
      //     _this.itemHangye.push({
      //       name: "",
      //       value: "-1",
      //       parent: "-100"
      //     });
      //   }
      //   _.each(res, function(e) {
      //     _this.itemHangye.push({
      //       name: e.typename,
      //       value: e.id.toString(),
      //       parent: e.parent_id.toString()
      //     });
      //     if (_this.show1) {
      //       _this.itemHangye.push({
      //         name: "全部",
      //         value: "-1",
      //         parent: e.id.toString()
      //       });
      //     }
      //     _.each(e.children, function(e) {
      //       _this.itemHangye.push({
      //         name: e.typename,
      //         value: e.id.toString(),
      //         parent: e.parent_id.toString()
      //       });
      //     });
      //   });
      // });
    },
    methods: {
      fanhui() {
        this.urls = new URL(window.location.href)
        // console.log('aaaa')
        if(this.urls.searchParams.get("uidkey")){
          this.$router.push('/index')
        }else{
          this.$router.go(-1)
        }
      },
      initHeight() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.isFixed = scrollTop > this.offsetTop + 200 ? true : false;
      },
      loaddata(res) {
        var _this = this;
        console.log(res, 66)
        _.each(res, function(e) {

          _this.list = _this.list || [];
          _this.list.push(e);
          console.log(_this.list, 2)
        })
      },
      go(id) {
        this.$router.push('details/' + id)
      },
      reload() {
        var _this = this;
        _this.isshow = false;
        _this.$nextTick(function() {
          _this.isshow = true;
        })
      },
      hide(i) {
        var _this = this;
        _this.region = _this.add;
        _this.list = [];
        _this.reload();
      },
      hide2() {
		  console.log('this.itemHangye')
		  console.log(this.itemHangye)
        var _this = this;
        _this.hangye = _this.add2;
        _this.list = [];
        _this.reload();
      },
      zhiding(res) {
        console.log(res)
        let _this = this;
        _this.listId = res;
        _this.isShow = true;
      },
      sureDing() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + '/Cooperation/coop_top', {
          load: false,
          coop_id: _this.listId,
        }).then(function(res) {
          if (res == '余额不足，请充值！') {
            _this.isShow = false
            _this.exhibit = true
          } else {
            msg("置顶成功");
            _this.isShow = false;
            _this.list = [];
            _this.reload();
          }
        })
      },
    }
  }
</script>

<style scoped>
  .is_fixed {
    position: fixed !important;
    top: 1.2rem !important;
    /* z-index:200*/
  }

  .vux-header {
    position: fixed;
    width: 100%;
    z-index: 200;
    top: 0;
  }

  .vuxSlider {
    position: absolute;
    width: 100%;
    z-index: 10;
    top: 1.2rem;
  }

  .index_box .li {
    margin-top: 10px;
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

  .search {
    background: #fff;
    /*padding: 10px 10px 0px 0px;*/
    padding-top: 10px;
    position: absolute;
    width: 100%;
    z-index: 2;
    top: 6.8rem;
  }

  .search .title {
    width: 100%;
    text-align: center;
    /*font-weight: 400;*/
    margin: 10px auto;
    font-size: 15px;
    font-weight: bold;
  }

  .search .searchSelect {
    width: 100%;
    text-align: center;
    /*font-weight: 400;*/
  }

  .search .vux-cell-box {
    width: 4rem;
    display: inline-block;
    border: 1px solid #d3d3d3;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 3px;
    padding: 0px 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search .vux-cell-box .vux-popup-picker-select {
    text-align: left !important;
  }

  .search .vux-cell-box::before {
    border: 0px;
  }

  .ding_content {
    background: url("/static/img/ding.png");
    background-size: 100% 100%;
    width: 90%;
    margin: 0 auto;
    padding: 1.7rem 0.5rem 0.8rem;
    box-sizing: border-box;
    text-align: left;
  }

  .ding_help {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
  }

  .ding_px {
    margin-bottom: 2rem;
    background: #ffffff;
    color: rgba(255, 119, 72, 1);
    border-radius: 10px;
    width: 3rem;
    text-align: center;
    font-size: 10px;
  }

  .des {
    font-size: 10px;
  }

  .ding_bi {
    color: rgba(255, 107, 0, 1);
    text-align: center;
    margin-top: 8px;
    font-size: 15px;
  }

  .ding-sure {
    background: url("/static/img/btn.png");
    background-size: 100% 100%;
    width: 90%;
    padding: 8px;
    box-sizing: border-box;
    color: #ffffff;
    text-align: center;
    font-size: 15px;
    margin-top: 20px;
	margin: 0 auto;
  }

  .cose {
    position: absolute;
    top: 57px;
    right: 9px;
    margin: 0.16rem 0.16rem;
    color: rgba(0, 0, 0, 0.59);
    cursor: pointer;
    font-size: 0.666667rem;
    opacity: 0.3;
  }

  .invest_Money {
    border-radius: 8px;
    padding-bottom: 8px;
  }

  .investMoney_img {
    background: #FFFFFF;
    /* height: 250px;*/
    overflow: hidden;
    height: 12rem
  }

  .investMoney_title {
    /*font-size: 18px;
		  text-align: center;
		  margin-top:20px;
		  height:1.9rem;*/
    width: 80%;
    margin: 0 auto;
    border-bottom: 1px solid #999;
    margin-top: 10px;
    height: 1.9rem;
    font-size: 18px;
    text-align: center;

  }

  .investMoney_cha {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .investMoney_ch {
    width: 30px;
    height: 30px;
  }

  .investMoney_ch img {
    width: 100%
  }

  .weui-btn_default {
    background: #FF6F3A;
    color: #fff;
    width: 100px;
  }

  .lessMoney {
    /*width: 40%;
		  font-size: 14px;
		  margin: 20px auto;*/
    width: 220px;
    font-size: 14px;
    margin: 20px auto;
    text-align: left;
  }

  button.weui-btn,
  input.weui-btn {
    border-radius: 20px;
    width: 50%;
    margin-bottom: 20px;
  }
</style>
