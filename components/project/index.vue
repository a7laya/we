<template>
  <div>
    <!-- <x-header :title="'项目信息'" :left-options="{showBack: false}" class="header"></x-header> -->

    <div class="header-search">
      <div class="search-content">
        <div class="fanhui" @click="back"><img src="/static/img/fanhui.png"></div>
        <div class="searchbox">
          项目信息
        </div>
        <i class="iconfont icon-sousuo" @click="sousou()"></i>
      </div>
    </div>

    <vue-swiper :type="13"></vue-swiper>
    <grid :show-lr-borders="false" :show-vertical-dividers="false" class="index_title_nav_grid" id="navgo">
      <grid-item v-for="(item,index) in nav_list" :key="index" :link="item.link" :label="item.txt" style="width:33%">
        <img slot="icon" :src="item.img" alt="">
      </grid-item>
    </grid>
    <!--项目信息-->
    <div class="info">
      <!-- <div class="info_top" v-if="showing" >
				<div style="white-space: nowrap">您还没有绑定公众号,不能第一时间收到通知</div>
				<div style="white-space: nowrap" @click="$store.commit('erweima');">立即关注绑定</div>
			</div> -->


      <div class="info_bottom">
        <div class="info_item">
          <div>{{num.gy}}</div>
          <div><b>共有项目</b></div>
        </div>
        <div class="info_item">
          <div>{{num.zx}}</div>
          <div><b>在线查看</b></div>
        </div>
        <!-- <div class="info_item">
					<div>{{num.jr}}</div>
					<div><b>今日更新</b></div>
				</div> -->
        <div class="project-right">
          <div>项目追踪</div>
          <img src="/static/img/map.png" alt="" />
        </div>
      </div>
    </div>

    <!--订阅和项目追踪-->
    <!-- <div class="project_box">

			<div class="project_left" @click="dingyue">
				<div>
					<div>
						<span class="color_box"></span> 项目信息订阅
					</div>
					<div>项目动态一更新，马上获知</div>
				</div>
				<div class="rights"></div>
			</div>
			<div class="project-right">
				<div>项目追踪</div>
				<img src="/static/img/map.png" alt="" />
			</div>
		</div> -->
    <!--项目信息-->
    <div class="project_list">
      <div class="news">
        <h2>最新项目信息</h2>
        <!--<span>更多...</span>-->
      </div>
      <vue-message :type="1" v-for="(item,index) in project" :item="item" :key="index"></vue-message>
      <vue-loading :url="$store.state.url + '/Collection/projectList?page=1&limit=10&type=0'" @ievent="loaddata" v-if="isshow"></vue-loading>
    </div>
    <vue-foot></vue-foot>
    <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
  import {
    XHeader,
    Grid,
    GridItem
  } from 'vux'
  import {
    VueSwiper,
    VueShareit,
    VueMessage,
    VueLoading,
    VueFoot,
    VueCaixuan,
  } from '../component/'




  export default {
    components: {
      XHeader,
      Grid,
      GridItem,
      VueSwiper,
      VueShareit,
      VueMessage,
      VueLoading,
      VueFoot,
      VueCaixuan,
    },
    inject: ['reload'],
    data() {
      return {
        nav_list: [{
            img: '/static/img/nijian.png',
            //txt: '拟建信息',
            txt: '招采信息',
            link: '/project/zhaocai'
            //link: '/project/news'
          },
          {
            img: '/static/img/pingpai.png',
            //txt: '招采信息',
            //link: '/project/zhaocai'
            txt: '评标结果',
            link: '/project/news'
          },
          {
            img: '/static/img/jieguo.png',
            txt: '项目订阅',
            link: '/user/usermyattention',

          }
        ],
        num: '',
        project: [],
        isshow: true,
        showing: false,
        memSubscribe: '',
        url: undefined,
        scroll: 0
      }
    },
    created() {
      var _this = this;
      _this.band()
    },

    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      var _this = this;
      _this.tongji();
      // _this.projectList();

    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      fenxiang() {

        return {
          title: '智汇优库-' + this.$route.meta.title,
          dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动平台，秒得五十块！',
          imgUrl: '/static/img/caizhao.png',
          link: '/project/index'
        }
      },
    },
    methods: {
      handleScroll() {
        this.scroll = $(window).height() + $(document).scrollTop() - $(window).height()
      },
      //搜索
      sousou() {
		this.$router.push({
			path: '/project/searched',
			query: {
				type: 0
			}
		})
        // this.$router.push('/project/searched')
      },
      ievent(res) {
        // console.log(res)
        this.url = undefined;
        setTimeout(() => {
          this.url = querystring.stringify(res);
        }, 100)
      },
      //统计
      tongji() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + '/Collection/proShow', { //发送聊天
          'load': false
        }).then((res) => {
          if (!res) return;
          _this.num = res;
        })
      },
      // ievent(res){
      // 	this.url = undefined;
      // 	this.list = [];
      // 	setTimeout(() => {
      // 		this.url = querystring.stringify(res);
      // 	},100)
      // },
      //项目列表
      // projectList(){
      // 	let _this = this;
      // 	_this.$http.post(_this.$store.state.url + '/Collection/projectList', { //最新项目信息
      // 		'load': false,
      // 		page:1,
      // 		limit:10
      // 	}).then((res) => {
      // 		if(!res) return;
      // 		_this.project= res;

      // 	})
      // },
      loaddata(res) {
        var _this = this;
        _.each(res, function(e) {
          _this.project = _this.project || [];
          _this.project.push(e);
        })
      },
      dingyue() {
        this.$router.push("/user/usermyattention")
      },
      band() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Collection/isSubscribe', {

        }).then(res => {
          _this.memSubscribe = res.memSubscribe
          _this.id = res.memSubscribe
        })
      },
      back() {
        var _this = this;
        _this.$router.push('/index')
      },
      con() {
        // console.log(1)
      }
    },
    activated() {
      if (this.scroll > 0) {
        window.scrollTo(0, this.scroll);
        window.addEventListener('scroll', this.handleScroll);
      }
    },
    deactivated() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    watch: {
      $route(to, from) {
        if (from.path == '/project/zhaocai' || from.path == '/project/news' || from.path == '/index') {
          this.reload()
        }
      }
    }

  }
</script>

<style scoped>
  .vuxSlider {
    padding-top: 1.2rem;
  }

  .header-search {

    width: 100%;
    z-index: 11;
    height: 45px;
    color: #fff;
    font-size: 16px;
    position: fixed;
  }

  .search-content {
    line-height: 45px;
    height: 45px;
    background: rgba(53, 73, 94, 1);
    text-align: center;

  }

  .fanhui {
    width: 30px;
    height: 45px;
    line-height: 45px;
    float: left;
    display: flex;
    align-items: center;
  }

  .fanhui img {
    height: 30px;
    width: 100%;
  }

  .searchbox {
    display: inline-block;
    width: 225px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }





  .info {
    background: rgba(153, 153, 153, 0.2);
    padding: 10px 8px;
  }

  .info .info_top {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .info .info_top div:nth-child(2) {
    height: 25px;
    background: #F88F00;
    color: #FFFFFF;
    padding: 3px;
    border-radius: 6px;
    box-sizing: border-box;
  }

  .info_bottom {
    width: 85%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center
  }

  .info_bottom .info_item div:nth-child(1) {
    font-size: 18px;
    color: #F88F00;
  }

  .project_box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #FFFFFF;
    padding: 15px;
  }

  .color_box {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 3px;
    background: #4DADFF;
  }

  .rights {
    display: inline-block;
    border-right: 2px solid;
    border-bottom: 2px solid;
    width: 10px;
    height: 10px;
    transform: rotate(-45deg);
    margin-left: 12%;
    color: darkgray;
  }

  .project_left,
  .project-right {
    background: rgba(255, 255, 255, 1);
    border: 1px solid #f3f3f3;
    box-shadow: 3px 3px 6px #f3f3f3;
    opacity: 1;
    padding: 5px;
    border-radius: 10px;
    box-sizing: border-box;
    height: 87px;
  }

  .project_left {
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .project-right {
    width: 35%;
    text-align: center;
  }

  .project-right img {
    width: 100%;
  }

  .project_list {
    background: #FFFFFF;
  }

  .news {
    width: 95%;
    margin: 0 auto;
    /*border-bottom: 1px solid rgba(112, 112, 112, 0.5);*/
    height: 50px
  }

  .news h2 {
    float: left;
    /*margin-left: 18px;*/
    font-weight: normal;
    font-size: 18px;
    margin-top: 12px;
    border-left: 7px solid #4DADFF;
    padding-left: 5px;
    /*margin-left: 15px;*/
  }

  .news span {
    float: right;
    font-size: 14px;
    margin-right: 18px;
    margin-top: 15px;
    color: #2921E2
  }


  .box {
    padding: 5px 10px 5px 10px;
  }

  .box:first-child {
    padding: 0 10px 5px 10px;
  }

  .box:last-child {
    padding: 5px 10px 0 10px;
  }

  .list {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #f0f0f0;
    padding: 30px;
  }

  .xs-plugin-pulldown-container {
    line-height: 40px;
  }

  .xs-plugin-pullup-container {
    line-height: 40px;
  }

  .fl {
    float: right !important;
    margin-right: 20px;
  }

  .icon-sousuo {
    font-size: 0.6rem;
    position: absolute;
    padding-top: 0.05rem;
  }
</style>
