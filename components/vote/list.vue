<template>
  <div class="min">
   <!-- <x-header :left-options="{backText: ''}">{{info.vote_title}}</x-header> -->
    <vue-back :name='info.vote_title' :type='1' ></vue-back>
    <!--<vue-swiper :type="4"></vue-swiper>-->
    <div class="tu-pian"><img :src="$store.state.website.website_domain_name + '/uploads/' + info.vote_img"></div>
    <div class="nav">
      <div class="nav-first">
        <p>参与者</p>
        <p>{{info.user_id_num}}</p>
      </div>
      <div class="nav-first nav-two">
        <p>投票数</p>
        <p>{{info.vote_id_sum}}</p>
      </div>
      <div class="nav-first">
        <p>访问量</p>
        <p>{{info.visit}}</p>
      </div>
    </div>

    <div class="time">
      <!--<p class="time-p" v-if="time>=0">
        	投票<span>结束</span>倒计时<span v-html="$options.filters.returntime5(time)"></span>

      </p>-->
       <div class="voteTime">
      <p class="time-p" v-if="0>=time">
        	<span style="color:#D35959">投票已经结束</span>
      </p>
      <p class="time-p " v-else-if="signEnd>0">
        	<span style="color:#D35959">投票开始倒计时</span><span v-html="$options.filters.returntime5(signEnd)"></span>
      </p>
      <p class="time-p " v-else-if="0>=signEnd">
        	<span style="color:#D35959">投票结束倒计时</span><span v-html="$options.filters.returntime5(time)"></span>
      </p>
    </div>
     <div class="selectResult"  @click="selectrule($route.params.id)">
       网选详情
      </div>
    </div>
   <!-- <div class="details">
      <div class="details-first" @click="opens" :class='{on:open==true}'>
        <div>投票详情</div>
        <div><img src="/static/img/jiantou.png"></div>
      </div>
      <div class="details-first details-last" @click="prize" :class='{on:award==true}' v-if="info.vote_prize_set != 1">
        <div>奖品设置</div>
        <div><img src="/static/img/jiantou.png"></div>
      </div>

      投票详情
     <!-- <div class="dtail-lists" v-if="open">
        <div class="detail-list detail-listing">
          <div class="list-huodong">
            <div class="xiangqing">【活动详情】</div>
            <div v-html="info.vote_info" class="list-html">
            </div>
          </div>
        </div>
      </div> -->


      <!-- 奖品设置 -->
     <!-- <div class="dtail-lists detail-award" v-if="award">
        <div class="detail-list ">
          <div class="award-list">
            <div>【奖品设置】</div>
            <div class="award-app" v-for="(item,index) in info.vote_prize_set" :key="index">
	              <div class="award-in">{{list[index]}}</div>
	              <div class="award-it">{{item}}</div>
            </div> -->
            <!--<div class="award-app">
              <div>一等奖</div>
              <div>奖品：500G固态硬盘一个</div>
            </div>
            <div class="award-app">
              <div>二等奖</div>
              <div>奖品：天猫精灵一个</div>
            </div>
            <div class="award-app">
              <div>三等奖</div>
              <div>奖品：32g的U盘一个</div>
            </div>
            <div class="award-app app">
              <div>四等奖</div>
              <div>奖品：智汇优库网页轮播图展示为（7天）</div>
            </div>-->
         <!-- </div>
          <div class="zhu">
            <div style="width:95%;margin:0 auto">
              注：本轮投票禁止作弊，一经发现，取消选手资格。中奖后，
              请在一月内请主动联系客服人员，核实并提交邮寄地址。
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="search">
      <input type="text" placeholder="请输入参赛选手名称、品牌......" class="txt" v-model="add"  onfocus="this.placeholder=''" onblur="this.placeholder='请输入参赛选手名称、品牌......'">
      <span class="search-span" @click="searched">搜索</span>
    </div>

    <div class="control">
      <div class="control-frist" @click="skip(item.id,info.vote_end_time,(index+1),info.vote_title,item.number) " v-for='(item,index) in vote_list' :key="index">
        <div class="triangle"></div>
        <div class="control-num">{{item.v_order}}</div>
        <div class="control-tu"><img :src="$store.state.website.website_domain_name + '/uploads/' + item. img_s"></div>
        <div class="control-title">
          <div class="control-con">
           <!-- <img src="/static/img/wode.png">-->
           	<p style="color:#9B9B9B;font-size:14px">{{item.number}}号</p>&#x3000;
            <div class="control-dui">{{item.title_s}}</div>
          </div>
          <div class="control-con">
            <img src="/static/img/wuxing.png" />&#x3000;
            <div class="control-dui">{{item.s_id}}票</div>
          </div>
        </div>
        <!--<div class="control-tou" @click.stop="cast(item.id)" v-if="time>=0">投票</div>
        <div class="control-tou control-jieshu"   v-else>投票结束</div>-->
        <div class="control-tou" v-if="0>=time" @click.stop="msg">投票已经结束</div>
				<div class="control-tou" v-else-if="signEnd>0" @click.stop="start">投票即将开始</div>
				<div class="control-tou control-jixing" v-else-if="0 >= signEnd" @click.stop="cast(item.id)">投票</div>
      </div>

      <!-- <div class="control-frist" @click="skip()">
				 <div class="triangle"></div>
				 <div class="control-num">1</div>
				 <div class="control-tu"></div>
				 <div class="control-title">
					 <div class="control-con">
					 	<img src="/static/img/wode.png"/>&#x3000;
					 	<div class="control-dui">海达队</div>
					  </div>
					  <div class="control-con">
					 	 <img src="/static/img/wuxing.png"/>&#x3000;
					 	 <div class="control-dui">52634票</div>
					 </div>
				 </div>
				 <div class="control-tou">投票</div>
			 </div> -->
    </div>


    <vue-loading5 :url="$store.state.url + '/Vote/voteInfo?page=1&limit=10&vote_id='+$route.params.id+'&keyword='+keyword" @ievent="loaddata"
      v-if="isshow"></vue-loading5>

    <!--<vue-collect></vue-collect>-->
    <!-- <vue-foot></vue-foot> -->
  <div style="height:60px">
    <div class="foot">
      <div @click="home">平台首页</div>
			<div @click="page">投票首页</div>
			<div @click="present($route.params.id)">当前排名</div>
			<div @click="isShowing=true">投票规则</div>
    </div>
  </div>

  <div v-transfer-dom>
			<x-dialog v-model="isShowing" class="dialog-backnone" hide-on-blur>
				<div class="ding_content">
					<svg @click="isShowing = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
						<path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z" class="st0" />
					</svg>
					<div class="rulelation">
						<p class="rule"></p>
						<p class="rule-vote">投票规则</p>
					</div>
					<div style="font-size: 14px;color:#000000">
						<p>网选规则：</p>
						<p>1.每个微信号每天有3次选投机会。</p>
						<p>2.根据发起规则可以单选或者多选。</p>
						<p>3.可根据需求给选手赞赏，赞赏票数累计到有效投票总数内。</p>
						<p>4.投票结束后，根据排名发放奖品。</p>
						<p>5.获奖选手须在10天内填写奖品寄送地址，逾期视为放弃奖品处理。</p>
						<p>6.本活动最终解释权归主办方所有。</p>
					</div>
					<div style="margin-top:20px;font-size: 14px;color:#000000">
						<p>征集规则：</p>
						<p>1.参赛者上传信息，严禁盗用他人照片等信息。</p>
						<p>2. 禁止参赛作品出现任何非法内容、言论不当等行为。</p>
						<p>3.严禁任何作弊行为，系统发现会自动对票数清空。</p>
						<p>4.作品设计著作权，肖像权等法律责任由活动参与者自行承担法律责任。</p>
						<p>5.以上行为一经发现，主办方有权删除照片并 取消参赛资格。</p>
						<p>6.禁止加入诱导关注/诱导分享内容。</p>
					</div>
				</div>
			</x-dialog>
		</div>


	<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
  import {
    XHeader,TransferDom, XDialog
  } from 'vux'
  import {
    VueSwiper,
    VueFoot,
    VueCollect,
    VueLoading5,
	VueShareit,
  VueBack,
  } from '../component'
  export default {
  	directives: {
			TransferDom
		},
    components: {
      XHeader,
      VueSwiper,
      VueFoot,
      VueCollect,
      VueLoading5,
	    VueShareit,
	    TransferDom,
	    XDialog,
       VueBack
    },
    data() {
      return {
        // time : 14400,
        open: false,
        award: false,
        info: '',
        vote_list: '',
        isshow: true,
        keyword:'',
        time:'',
        add:'',
        isShowing:false,
        list:['特等奖','一等奖','二等奖','三等奖','四等奖','五等奖','参与奖']
      }
    },

	computed: {
		user() {
			return this.$store.state.user;
		},
		fenxiang() {

			return {
				title: this.info.vote_title,
				dese: this.$store.state.user.mem_nickname + '邀您关注弱电投票，他在智汇优库网选频道等您！',
				imgUrl: '/static/logo.png',
				link: '&id=' + this.$route.params.id
			}
		},
	},
    mounted() {
      const timer = setInterval(() => {
			this.time = this.info.vote_end_time-(Date.parse(new Date()) / 1000)
			this.time--
			this.signEnd = this.info.vote_start_time - (Date.parse(new Date()) / 1000);
			this.signEnd--
//						console.log(this.time)
      }, 10);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      })

      this.voteInfo()
    },
    methods: {

      voteInfo() {
        let _this = this
        _this.$http.post(_this.$store.state.url + "/Vote/voteInfo", {
          // vote_id: _this.$route.query.id,
          vote_id: _this.$route.params.id,
          page: 1,
          limit: 10,
          keyword:'',
        }).then(res => {
          _this.info = res
          console.log(_this.info)
        })
      },
      loaddata(res) {
        var _this = this;
        _.each(res, function(e) {
          _this.vote_list = _this.vote_list || [];
          _this.vote_list.push(e);
        })
      },
      searched(){
      	if(!this.add){
					msg("请填搜索内容");
					return;
				}
				var _this = this;
				_this.keyword = _this.add;
				_this.vote_list = [];
				_this.reload();
      },
      reload() {
				var _this = this;
				_this.isshow = false;
				_this.$nextTick(function() {
					_this.isshow = true;
				})
			},
      opens() {
        this.open = !this.open
        this.award = false
      },
      prize() {
        this.award = !this.award
        this.open = false
      },

      skip(id,time,feel,des,num) {
        this.$router.push("/vote/detail/" + id  + "/"+ time + "/"+ feel + "/"+ des + '/' +num)
      },
      present(id){
        this.$router.push("/vote/position/" + id)
      },
      cast(i) {
      		let _this = this
				_this.$http.post(_this.$store.state.url + "/Vote/userVote",{
					vote_id:_this.$route.params.id,
					vote_select_id:i
				}).then(res=>{
					if(res == '您的票数已经用完啦！'){
						msg('您的票数已经用完啦！')
					}else if(res == '您已经为该选手投过票啦！'){
						msg('您已经为该选手投过票啦！')
					}else{
						msg('投票成功')
				  _this.vote_list = [];
				  _this.voteInfo()
				  _this.reload();
					}
				})
      },
      home(){
      	this.$router.push('/index')
      },
      page(){
      	this.$router.push("/vote/index")
      },
      selectrule(id){
         this.$router.push('/vote/selectRule/' +id)
      },
//    msg(){
//    	msg('投票已经结束')
//    },
    },
  }
</script>

<style scoped>
  .min {
    background: #EAEAEA
  }

  .nav {
    width: 100%;
    background: #05D8E8;
    color: #F5FDFE;
    padding: 15px 0;
    display: flex;
  }

  .nav-first {
    width: 33.33%;
    text-align: center;
    /* float: left; */

  }

  .nav-two {
    border-right: 2px solid #F5FDFE;
    border-left: 2px solid #F5FDFE;
  }

  .nav-first p {
    font-size: 14px;
  }

  .search,
  .time {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
		margin: 10px auto 0 auto;
	}
  .voteTime{
    width: 85%;
  }

  .voteTime p {
  	width: 90%;
  	padding: 8px 0;
  	background: #FFFFFF;
  	border-radius: 20px;
    font-size: 14px;
  	text-align: center;
  	color: #999999;
  }
  .voteTime .voteTime-p span {
    color: #F21B1B
  }
   .voteTime .voteTime-p{
   	background:#999
   }
.selectResult{
   width:30%;
   padding: 8px 0;
   background: #FFFFFF;
   text-align: center;
   border-radius: 20px;
   color: #999999;
  }
  .details {
    background: #fff;
    /* padding:10px 0; */
    width: 100%;
    display: flex;
    margin-top: 10px;
    height: 50px;
    position: relative;
    justify-content:space-around;
  }

  .details-first {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;


  }

  .details-first :nth-child(1) {
    font-size: 14px;
    color: #999;
  }

  .details-first :nth-child(2) {
    height: 20px;
    width: 20px;
  }

  .details-first :nth-child(2) img {
    width: 100%;
    height: 100%;
  }

  .details-last {
    border-left: 1px solid #666;
    box-sizing: border-box;
  }

  .dtail-lists {
    position: absolute;
    top: 55px;
    left: 0;
    z-index: 5;
    width: 100%;
    background: #C2C2C2;
    padding: 10px;
    /*margin-bottom:80px;*/
   margin-bottom:3rem;
  }

  .detail-listing {}

  .detail-list {
    max-height: 230px;
    overflow-y: scroll;
    width: 95%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 2px 2px 2px #C2C2C2;
    word-wrap: break-word;
  }

  .list-huodong {
    width: 95%;
    margin: 0 auto;
    padding: 15px 0;
  }

  .award-list {
    width: 95%;
    margin: 0 auto;
    padding-top: 15px
  }

  .award-list :first-child,
  .list-huodong .xiangqing {
    color: #BE0202;
    font-size: 14px;
  }

  .list-huodong :nth-child(2) {
    color: #929292;
    font-size: 14px;
    /*margin-top: 10px;*/
    width: 100%
  }
  .list-huodong .list-html{
  	color:#929292;
  }

  .award-app {
    padding: 10px 0;
    border-bottom: 1px dashed #707070;
    color: #1C272F;
    font-size: 14px;
  }
  .award-in{
  	 color: #1C272F;
  }
  .award-it{
  	color:#000;
  }

  .app {
    border: 0
  }

  /* .detail-award{
  margin-bottom:70px;
  max-height: 230;
  overflow-y: scroll
} */
  .zhu {
    padding: 8px 0;
    background: #F0F0F0;
    color: #BF8686;
    font-size: 14px;
    border-radius: 0 0 10px 10px;
  }

  .on {
    background: #CCCCCC;
  }

  .search .txt {
    width: 75%;
    /* padding:8px 0; */
    background: #FFFFFF;
    border-radius: 20px 0 0 20px;
    text-align: center;
    font-size: 12px;
    height: 38px;
    float: left;
    color: #000;
  }

  .search-span {
    width: 25%;
    /* padding:8px 0; */
    background: #FFFFFF;
    border-radius: 0 20px 20px 0;
    text-align: center;
    font-size: 14px;
    float: left;
    height: 38px;
    line-height: 38px;
    background: #05D8E8;
    color: #fff;
  }

  .control {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 0px 0 10px 0;
    flex-wrap: wrap;
  }

  .control-frist {
    width: 47%;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    margin-top:10px;
  }

  .triangle {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-top: 30px solid #FF8800;
    border-right: 30px solid transparent;
    z-index: 1;
  }

  .control-num {
    position: absolute;
    color: #fff;
    left: 4px;
    top: 3px;
    line-height: 1em;
    font-size: 12px;
    z-index: 1;
  }

  .control-tu {
    height: 90px;
    width: 100%;
    /* background:#f00; */
  }


  .control-tu img {
    width: 100%;
    height: 100%;
  }

  .control-con {
    display: flex;
    align-items: center;
  }

  .control-title {
    background: #fff;
    padding: 8px;

  }

  .control-title img {
    width: 15px;
    height: 15px;
    /* display: inline-block; */
  }

  .control-dui {
    /* display: inline-block; */
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #9B9B9B;
    width:63%
  }

  .control-tou {
    padding: 8px 0;
    text-align: center;
    color: #FFFFFF;
    background: #999;
    font-size: 14px;
  }
  .control-jixing{
		background: #05D8E8;
	}
  .control-jieshu{
  	 padding: 8px 0;
    text-align: center;
    color: #FFFFFF;
    background: #999;
    font-size: 14px;
  }
  .foot{
    font-size:14px;
    background:#34495E;
    color:#fff;
    height:45px;
    position:fixed;
    left:0;
    bottom:0;
    width: 100%;
    z-index: 200;
  }
  .foot div{
    height:45px;
    width:25%;
    line-height: 45px;
    text-align: center;
    float:left;
    box-sizing: border-box;
    border-right:1px solid #C4CAD0
  }
  .foot :nth-child(4){
    border-right:0
  }
  .ding_content {
		width: 90%;
		margin: 0 auto;
		padding: 10px 20px;
		box-sizing: border-box;
		text-align: left;
		background: #fff;
		height:12rem;
		max-height: 12rem;
		overflow-y: scroll;
		border-radius: 12px;
	}
	.rulelation{
		height: 40px;
    display: flex;
    align-items: center;
	}
	.rule{
		border-left: 0.186667rem solid #FF0000;
		width: 5%;
    border-left: 0.186667rem solid #FF0000;
    display: inline-block;
    padding: 12px 0;
	}
	.rule-vote{
    font-size: 0.426667rem;
    border-bottom: 0.026667rem solid #ff000;
    border-bottom: 1px solid #999;
    width: 95%;
	}
	.cose{
		position: absolute;
		top: -5px;
		right: 9px;
		margin: 0.16rem 0.16rem;
		color: rgba(0, 0, 0, 0.59);
		cursor: pointer;
		font-size: 0.666667rem;
		opacity: 0.3;
	}
	.tu-pian{
    width:100%;
    height:200px;
  }
  .tu-pian img{
    width:100%;
    height:100%
  }
</style>
