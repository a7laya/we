<template>
  <div>
    <!-- <vue-head></vue-head> -->
    <vue-swiper></vue-swiper>
    <grid :show-lr-borders="false" :show-vertical-dividers="false" class="index_title_nav_grid" id="navgo">
      <grid-item v-for="(item,index) in nav_list" :key="index" :link="item.link" :label="item.txt" style="width:25%">
        <img slot="icon" :src="item.img" alt="">
      </grid-item>

      <!--<grid-item v-for="(item,index) in nav_list" :key="index" :link="item.link" :label="item.txt" style="width:20%">
      	<img slot="icon" :src="item.img" alt="">
      </grid-item> -->
    </grid>


    <!-- <div class="list_box">
      <vue-list v-for="(item,index) in list" :type="item.type" :item="item" :key="index"></vue-list>
    </div> -->
    <!-- <vue-suspen></vue-suspen> -->
    <!-- <vue-loading1 :url="$store.state.url + '/Cooperate/displayData?page=1&limit=5'" @ievent="loaddata"></vue-loading1> -->

    <div class="hots">
      <div class="hots-txt">
        行业自助平台&#x3000;&#x3000;专业服务弱电行业
      </div>
      <!--<div class="hots-right">
			hot
		<span></span>
		</div>-->
    </div>
    <div class="xinxi">
      <div class="xinxi-cai" @click="send">
        <div class="tupian">
          <img src="/static/img/caizhao.png" alt="" />
        </div>
        <div class="chakan">
          <div>招采信息</div>
          <span>0元查看 无隐藏</span>
        </div>
      </div>

      <div>
        <div class="xinxi-cai" @click="zixun">
          <div class="tupian">
            <img src="/static/img/hangye.png" alt="" />
          </div>
          <div class="chakan">
            <div>行业资讯</div>
            <span>最新的行业信息</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 最新项目 -->
    <div class="card">
      <div class="news">
        <h2>最新项目</h2>
        <router-link tag="span" :to="'project/index'">更多...</router-link>
      </div>
      <vue-message :type="1" v-for="(item,index) in project" :item="item" :key="index"></vue-message>
    </div>

    <!-- 最新资讯 -->
    <!-- <div class="card">
			<div class="news">
				<h2>最新资讯</h2>
				<router-link tag="span" :to="'information/index'">更多...</router-link>
			</div>
			<vue-message v-for="(item,index) in information" :item="item" :key="index" :type="8"></vue-message>
		</div> -->
    <!-- 行业动态 -->
    <div class="card">
      <div class="news">
        <h2>行业动态</h2>
        <!-- <router-link tag="span" :to="'information/index?type='+item.type">更多...</router-link> -->
        <router-link tag="span" :to="'/information/index/'+ '行业动态'">更多...</router-link>
      </div>
      <div class="trade" @click="hangyes(item.id,item.type)" v-if="item.type=='行业动态'" v-for="(item,index) in array"
        :key="index">
        <div class="picture"><img :src="item.imgUrl" /></div>
        <div class="xin-xiangmu">
          <div class="xiangmu-zhuti">{{item.title}}</div>
          <div class="dizhi">
            <span class="dizhi2">来源：{{item.source}}</span>
            <span class="dizhi3 right_center">{{item.time|returntime6}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 企业资讯 -->
    <div class="card">
      <div class="news">
        <h2>企业资讯</h2>
        <!-- <router-link tag="span" :to="'/information/index?type='+item.type">更多...</router-link> -->
        <router-link tag="span" :to="'/information/index/'+ '企业资讯'">更多...</router-link>
      </div>
      <div class="trade" @click="hangyes(item.id,item.type)" v-if="item.type=='企业资讯'" v-for="(item,index) in group"
        :key="index">
        <div class="picture"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgUrl"></div>
        <div class="xin-xiangmu">
          <div class="xiangmu-zhuti">{{item.title}}</div>
          <div class="dizhi">
            <span class="dizhi2">发布人：{{item.source}}</span>
            <span class="dizhi3 right_center">{{item.time|returntime6}}</span>
            <!-- <span  class="center ding" @click.stop="ding(item.id)"><img src="/static/img/anniu.png"></span> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 新品展示 -->

    <div class="card">
      <div class="news">
        <h2>新品展示</h2>
        <router-link tag="span" :to="'/information/index/'+'新品展示'">更多...</router-link>
      </div>
      <div class="spread1" v-for="(item,index) in block" :key="index" @click="hangyes(item.id,item.type)" v-if="item.type=='新品展示'">
        <div class="spread">
          <div class="spread-tu">
            <div class="spread-tu-pian" v-for="(item,index) in item.imgUrl" :key="index"><img :src="$store.state.website.website_domain_name + '/uploads/' + item"></div>
          </div>
          <div class="spread-wenzi">
            <div class="xiangmu-zhuti">{{item.title}}</div>
            <div class="dizhi">
              <span class="dizhi2">发布人：{{item.source}}</span>
              <span class="dizhi3 right_center">{{item.time|returntime6}}</span>
              <!-- <span class="center ding" @click.stop="ding(item.id)"><img src="/static/img/anniu.png"></span> -->
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- 直播 -->
    <div class="card">
      <div class="news">
        <h2>最新直播</h2>
        <router-link tag="span" :to="'zhibo/index'">
          更多...
        </router-link>
      </div>
      <div class="card-zhi" v-for="(item,index) in lists" :key="index" style="position:relative" @click="direct(item.id)">
        <div class="card-img">
          <img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
        </div>
        <div class="spread-wenzi">
          <div class="xiangmu-zhuti">{{item.title}}</div>
          <div class="dizhi">
            <span class="dizhi2">发布主体：{{item.subject}}</span>
            <span class="dizhi3 right_center">{{item.starttime|returntime6}}</span>
          </div>
        </div>
        <div class="time" v-if="item.state==1">正在进行</div>
        <div class="time" v-if="item.state==2">即将开始</div>
        <div class="time" v-if="item.state==3">已经结束</div>
      </div>
    </div>

    <!-- 最新合作 -->

    <div class="card">
      <div class="news">
        <h2>最新众包</h2>
        <!-- <router-link tag="span" :to="'information/index?type='+item.type">更多...</router-link> -->
        <router-link tag="span" :to="'hezuo/index'">更多...</router-link>
      </div>
      <div class="trade" @click="coops(item.coop_id)" v-for="(item,index) in cooper" :key="index">
        <div class="picture"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.coop_img " /></div>
        <div class="xin-xiangmu">
          <div class="xiangmu-zhuti">{{item.coop_title}}</div>
          <div class="dizhi">

            <span class="dizhi2">{{item.coop_region}}</span>
            <span class="dizhi3 right_center" v-if="item.coop_budget<100000">{{item.coop_budget}}元/预算</span>
            <span class="dizhi3 right_center" v-else="">{{item.coop_budget/10000}}万/预算</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 最新活动 -->

    <div class="card" style="margin-bottom:40px">
      <div class="news">
        <h2>最新活动</h2>
        <!-- <router-link tag="span" :to="'information/index?type='+item.type">更多...</router-link> -->
        <router-link tag="span" :to="'huodong/index'">更多...</router-link>
      </div>
      <div class="trade" @click="moves(item.act_id)" v-for="(item,index) in moving" :key="index">
        <div class="picture"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.act_img_url" /></div>
        <div class="xin-xiangmu">
          <div class="xiangmu-zhuti">{{item.act_title}}</div>
          <div class="dizhi">
            <!-- <span class="dizhi2">发布者：{{item.mem_nickname}}</span>
						<span class="dizhi3 right_center">{{item.act_add_time|returntime6}}</span> -->
            <!-- <div class="txtsp2" @click="go(type,item.id)"> -->
            <!-- <i class="iconfont icon-dingwei"></i> -->
            <!-- <span class="dizhi2">{{item.coop_region}}</span>
            	<span class="dizhi3 right_center" v-if="item.coop_budget<100000">{{item.coop_budget}}元/预算</span>
            	<span class="dizhi3 right_center" v-else="">{{item.coop_budget/10000}}万/预算</span> -->

            <span class="dizhi2">{{item.act_region}}</span>

            <span class="dizhi3 right_center" v-if="item.act_total_cost>0">{{item.act_total_cost}}元/人均</span>
            <span class="dizhi3 right_center" v-else="">免费参加</span>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>






    <!-- <div class="card" style="margin-bottom: 40px;">
			<div class="news">
				<h2>直播信息</h2>
				<router-link tag="span" :to="'zhibo/index'">
					更多...
				</router-link>
			</div>
			<div class="list_box">
				<vue-list v-for="(item,index) in lists" :type="3" :item="item" :key="index"></vue-list>
			</div>
		</div> -->

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
            <div>&nbsp;1. 刷新企业排序至名录最前端；</div>
            <div>&nbsp;2. 同行中提高企业曝光率；</div>
            <div>&nbsp;3. 促进企业合作及平台互动；</div>
            <div>注：置顶一次需消耗500个智汇币</div>
            <div class="ding_bi">-500个智汇币</div>
            <div class="ding-sure" @click="placement()">确定置顶</div>
          </div>
        </div>
      </x-dialog>
    </div>
    <!-- 充值 -->
    <div v-transfer-dom>
      <x-dialog v-model="exhibit" class="invest_Money">
        <div class="investMoney_img">
          <div class="investMoney_title">
            智汇币不足
          </div>
          <div class="lessMoney">
            智汇币不足赶快去充值吧
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
    <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
  import {
    XHeader,
    Grid,
    GridItem,
    Panel,
    Datetime,
    Badge,
    PopupPicker,
    TransferDom,
    XDialog,
    XButton,
  } from 'vux'
  import {
    VueList,
    VueFoot,
    VueHead,
    VueSwiper,
    VueLoading1,
    VueSuspen,
    VueCollphone,
    VueShareit,
    VueMessage
  } from '../component/'
  import eventVue from '../../eventVue.js'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Grid,
      GridItem,
      Panel,
      VueList,
      VueFoot,
      VueHead,
      VueSwiper,
      Datetime,
      Badge,
      VueLoading1,
      VueSuspen,
      VueCollphone,
      VueShareit,
      PopupPicker,
      VueMessage,
      TransferDom,
      XDialog,
      XButton,
    },
    inject: ['reload'],
    data() {
      return {
        nav_list: [{
            img: '/static/img/paiming.png',
            txt: '赛事',
            link: '/game'
          },
          {
            img: '/static/img/zhibo.png',
            txt: '直播',
            link: '/zhibo'
          }, {
            img: '/static/img/hezuo.png',
            txt: '众包',
            link: '/hezuo'
          }, {
            img: '/static/img/huodong.png',
            txt: '活动',
            link: '/huodong'
          }, {
            img: '/static/img/minglu.png',
            txt: '名录',
            link: '/yellowPages/homePage'
          },
          {
            img: '/static/img/toupiao.png',
            txt: '网选',
            link: '/vote/index'
          }
        ],
        list: undefined,
        itemAddhangye: [],
        itemAddress: [],
        itemzhiwei: [],
        add1: [],
        add2: [],
        add3: [],
        lists: [],
        project: '',
        information: '',
        block: [],
        array: [],
        group: [],
        isShow: false,
        exhibit: false,
        info_id: '',
        cooper: '',
        moving: '',
      }
    },
    mounted() {
      // this.reload()
      var _this = this;
      _this.zhibo();
      _this.projectList();
      // _this.informationList()
      _this.trade();
      _this.business();
      _this.open();
      _this.coop();
      _this.move()
      /*var onv=document.querySelector("#navgo")
			window.addEventListener('scroll',function(){
		 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		 console.log(scrollTop)
		  if(scrollTop>=140){
// 				navgo.style.position="fixed"
// 				navgo.style.top="50px"
// 				navgo.style.width="100%"
				 $("#navgo").addClass("_nav_grid")
				}else{
						// navgo.style.position="static"
						$("#navgo").removeClass("_nav_grid")
				}
			})*/

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
          //					link: this.$route.path + '?uidkey=' + this.$store.state.user.mem_id
          link: ''
        }
      },
    },
    watch: {

    },
    beforeRouteEnter(to, from, next) {
      if (to.path == '/index') {
        next(eventVue => {
          eventVue.reload()
        })
      }
    },

    methods: {

      onIndexChange(index) {
        this.banner_index = index
      },
      loaddata(res) {
        var _this = this
        _.each(res, function(e) {
          _this.list = _this.list || []
          _this.list.push(e)
        })
      },
      go(type, id) {
        var type = Number(type)
        var url
        switch (type) {
          case 1:
            url = '/hezuo/details/' + id
            break
          case 2:
            url = '/huodong/details/' + id
            break
          case 3:
            url = '/zhibo/details/' + id
            break
        }
        this.$router.push(url)
      },
      zhibo() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + '/live/live_index', { //发送聊天
          'load': false,
          page: 1,
          limit: 3,
          region: '',
          industry: ''
        }).then((res) => {
          if (!res) return;
          _this.lists = res;
          // console.log(res);
        })
      },
      projectList() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + '/Collection/projectIndex', {
          'load': false
        }).then((res) => {
          if (!res) return;
          // console.log(res)
          _this.project = res;
        })
      },
      // 资讯
      /*informationList() {
      	let _this = this;
      	_this.$http.post(_this.$store.state.url + '/Information/newInfo', {
      		'load': false
      	}).then((res) => {
      		console.log(res)
      		if (!res) return;
      		_this.information = res;
      	})
      },*/
      // 行业动态
      trade() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + '/Information/newInfo', {
          type: 1
        }).then(res => {
          _this.array = res
        })
      },
      //企业资讯
      business() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + "/Information/newInfo", {
          type: 2
        }).then(res => {
          _this.group = res
        })
      },
      //新品展示
      open() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + "/Information/newInfo", {
          type: 3
        }).then(res => {
          _this.block = res
        })
      },
      // 最新合作
      coop() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + "Homecenter/newCoop", {

        }).then(res => {
          _this.cooper = res
        })
      },
      //最新活动
      move() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + "Homecenter/newAct", {

        }).then(res => {
          _this.moving = res
        })
      },
      ding(id) {
        this.isShow = true
        this.info_id = id
        // console.log(this.info_id)
      },
      placement() {
        var _this = this;
        _this.$http
          .post(_this.$store.state.url + "/Information/infoTop", {
            load: true,
            info_id: _this.info_id
          })
          .then(function(res) {
            if (res == '余额不足，请充值！') {
              _this.isShow = false
              _this.exhibit = true
            } else {
              msg("置顶成功");
              _this.isShow = false;
              _this.business();
              _this.open()
            }

          });
      },
      send() {
        this.$router.push('/project/index')
      },
      zixun() {
        this.$router.push('/information/index/' + '行业动态')
      },
      hangyes(id, des) {
        this.$router.push("/information/details/" + id + "/" + des)
      },
      // 			enter(id, des){
      // 				this.$router.push("/information/details?id=" + id + "&des=" + des +"&cut=企业资讯")
      // 			},
      // 			reveal(id, des){
      // 				this.$router.push("/information/details?id=" + id + "&des=" + des +"&cut=新品展示")
      // 			},
      // 			profession(){
      // 				this.$router.push("/information/details?id=" + id + "&des=" + des)
      // 			},
      direct(id) {
        this.$router.push("/zhibo/details/" + id)
      },
      coops(id) {
        this.$router.push("/hezuo/details/" + id)
      },
      moves(id) {
        this.$router.push("/huodong/details/" + id)
      },
    }
  }
</script>

<style scoped>
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
    width: 80px;
    height: 80px;
  }

  .index_box .li .img img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .index_box .li>.txt {
    width: 250px;
    font-size: 15px;
    color: #636363;
    line-height: 21px;
    margin-top: 5px;
  }

  .index_box .li>.txt .tit_name {
    display: inline-block;
    vertical-align: middle;
  }

  .index_box .li>.txt .txtsp2 {
    font-size: 13px;
    margin-top: 5px;
  }

  .index_box .li>.txt .txtsp2 .money {
    color: #fc2b4e;
    font-size: 12px;
    float: right;
  }
  
  .index_box .li>.txt .diqu {
    color: #565656;
    margin-top: 5px;
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

  /* ._nav_grid{
		z-index: 1000;
		position:fixed;
		top:49px;
		width:100%
	} */

  .hots {
    width: 100%;
    /*height: 36px;*/
    background: rgba(153, 153, 153, 0.2);
    color: #666;
    font-size: 16px;
    text-align: center;
    font-weight: normal;
    /*padding-top: 6px*/
    padding: 10px 0;
    position: relative;
  }

  .hots-right {
    position: absolute;
    right: 10px;
    top: -20px;
  }

  .hots-right span {
    border: 20px solid transparent;
    border-bottom-color: red;
    width: 30px;
  }

  .hots span {
    margin-right: 10px;
  }

  .index_box {
    border-top: 1px solid rgba(112, 112, 112, 0.5);
  }

  .xinxi {
    padding: 15px 0;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .xinxi-cai {
    height: 60px;
    padding: 0 10px;
    /*width: 150px;*/
    background: #57d0c0;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    /*margin: 0 10px;*/
    display: flex;
    align-items: center;
  }

  .tupian {
    height: 40px;
    width: 40px;
    margin-right: 7px;
    /*background: #f00;*/
    /*float: left;*/
    /*margin: 10px 10px 0 10px;*/
  }

  .chakan {
    /*float: left;*/
    margin-top: 10px;
    text-align: center
  }

  .chakan div {
    margin-bottom: 0px;
    color: #fff;
    font-size: 16px;
  }

  .chakan span {
    color: rgba(253, 253, 253, 0.51);
    font-size: 12px
  }

  .card {
    background: #fff;
    margin-top: 10px;
    width: 100%;
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

  .rencai {
    padding: 10px 0;
    background: #fff;
    width: 100%;
  }

  .rencai span {
    color: #000000;
    font-size: 18px;
    margin-left: 25px
  }

  .search1 {
    padding-top: 10px;
  }

  .search1 .title {
    width: 100%;
    text-align: center;
    /*font-weight: 400;*/
    margin: 10px auto;
    font-size: 15px;
    font-weight: bold;
  }

  .search1 .searchSelect {
    width: 100%;
  }

  .search1 .vux-cell-box {
    width: 2.5rem;
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

  .search1 .vux-cell-box .vux-popup-picker-select {
    text-align: left !important;
  }

  .search1 .vux-cell-box::before {
    border: 0px;
  }

  .chaxun {
    background: rgba(77, 173, 255, 1);
    width: 1.2rem;
    border: 1px solid #d3d3d3;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    height: 30px;
    display: inline-block;
    overflow: hidden;
  }

  .rencai-tab {
    background: #fff
  }

  .rencai-tab1 {
    width: 92%;
    margin: 0 auto;
    border-top: 1px solid rgba(112, 112, 112, 1);
  }

  .mores {
    text-align: right;
    margin-right: 18px;
  }


  .trade {
    width: 95%;
    margin: 10px auto;
    display: flex;
  }

  .picture {
    height: 80px;
    width: 40%;
  }

  .picture img {
    width: 100%;
    height: 100%;
  }

  .xin-xiangmu {
    width: 60%;
    /* margin: 0 auto; */
    padding-top: 5px;
    border-top: 1px solid rgba(112, 112, 112, 0.5);
    padding-bottom: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between
  }

  .xiangmu-zhuti {
    color: #000000;
    font-size: 14px;
    margin-left: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .xiangmu-biaoti {
    color: #666;
    font-size: 14px;
    margin-left: 15px;
    margin-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%
  }

  /* .dizhi {
		color: #666;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		margin: 0 0px 0 15px;

	} */
  .dizhi .dizhi3,
  .dizhi .dizhi2 {
    white-space: nowrap;
  }

  .center {
    text-align: center;
  }

  .ding {
    /* 	border-radius: 50%; */
    /* border: #666666 solid 1px;
		font-size: 12px; */
    padding: 1px 3px;
  }

  .ding img {
    width: 25px;
    height: 25px;
  }

  .spread1 {
    width: 100%;
    background: #fff;
    margin-top: 10px
  }

  .spread {
    width: 95%;
    margin: 0 auto;

    /* margin-top:10px; */
  }

  .spread-tu {
    display: flex;
    justify-content: space-between;
  }

  .spread-tu-pian {
    width: 48%;
    height: 100px;
    /* background: #F73A3A; */
    /* border:1px solid rgba(112,112,112,1); */
  }

  .spread-tu-pian img {
    width: 100%;
    height: 100%
  }

  .spread-wenzi {
    width: 95%;
    margin: 0 auto;
    padding: 10px 0;
  }


  .card-zhi {
    width: 95%;
    margin: 0 auto;

  }

  .card-img {
    width: 100%;
    /* background: #f00; */
    height: 200px;
  }

  .card-img img {
    width: 100%;
    height: 100%;
    display: block;
    /* border-radius: 10px;
		box-shadow: 1px 1px 2px; */
    border: 1px solid #B2B2B2;
    box-sizing: border-box;
  }

  .spread-wenzi {
    width: 95%;
    margin: 0 auto;
    padding: 10px 0;
  }

  .xiangmu-zhuti {
    color: #000000;
    font-size: 14px;
    margin-left: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .dizhi {
    color: #666;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    margin: 0 0px 0 15px;
    align-items: center;
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

  button.weui-btn,
  input.weui-btn {
    border-radius: 20px;
    width: 50%;
    margin-bottom: 20px;
  }

  .invest_Money {
    border-radius: 8px;
    padding-bottom: 8px;
  }

  .investMoney_img {
    background: #FFFFFF;
    height: 250px;
    overflow: hidden;
  }

  .investMoney_title {
    font-size: 18px;
    text-align: center;
    line-height: 1.066667rem;
    margin-top: 20px
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
    width: 40%;
    font-size: 14px;
    margin: 20px auto;
  }

  .time {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    /* text-align: center; */
    color: #fff;
    z-index: 1;
    top: 15px;
    left: 1px;
    background: #00D6CF;
    font-size: 12px;
    border-radius: 0 20px 20px 0;
    padding: 2px 10px 2px 20px;

  }
</style>
