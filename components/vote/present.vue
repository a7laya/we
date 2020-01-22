<template>
  <div class="min">
    <x-header :left-options="{backText: ''}">{{$route.params.des}}</x-header>
    <div class="warband">
      <div class="warband-team">
        <div class="warband-tu"><img :src="$store.state.website.website_domain_name + '/uploads/' + gift.select_img"></div>
        <div class="warband-title">
          <p>{{gift.select_name}}</p>
          <p>送Ta一份礼物</p>
        </div>
      </div>
      <img src="/static/img/jt.png" alt="" class="jt" @click="fanhui" />
    </div>

    <div class="nav-cen">
    	<div class="nav-first">
    		<p>排名</p>
    		<p>{{$route.params.v_order}}</p>
    	</div>
    	<div class="nav-first">
    		<p>票数</p>
    		<p>{{gift.select_ticket_num}}</p>
    	</div>
    	<div class="nav-first">
    		<p>访问量</p>
    		<p>{{gift.visit_num}}</p>
    	</div>
    </div>
    <!-- 送礼 -->
    <div class="harting">

      <!-- <div class="heart" v-for="(item,zindex) in gift.gift_list"  :key="zindex" @click="index = zindex">
        <div :class="[zindex==index ? 'on' : '']" ></div>
        <div class="heart-tu"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.pic"/></div>
        <p class="heart-title">{{item.name}}</p>
        <p class="heart-piao">{{item.ticket_num}}票</p>
      </div> -->

      <div class="heart" v-for="(item,zindex) in gift.gift_list"  :key="zindex" @click="event(index = item.id)">
        <div :class="[index==item.id? 'on' : '']" ></div>
        <div class="heart-tu"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.pic"/></div>
        <p class="heart-title">{{item.name}}</p>
        <p class="heart-piao">{{item.ticket_num}}票</p>
      </div>


    </div>

    <div class="foot">

        <!-- <div>礼品数量:</div> -->
        <!-- <group> -->
         <!-- <x-number v-model="changeValue" :min="0" @on-change="change" :step="0.5"></x-number> -->
       <!-- </group> -->
       <div class="foot-jia">
         <span>价值:</span>
         <span class="foot-span">{{money}}</span>
         <span>智汇币</span>
       </div>

        <div >
            <inline-x-number width="40px" v-model="changeValue" :min='1' @on-change="change"></inline-x-number>
          	<!--  <x-number width="40px" v-model="changeValue" :min='1' @on-change="change" disabled="disabled"></x-number>-->
        </div>

      <div class="foot-ji" @click="admire"   id="foot-ji">确认赞赏</div>
      <!-- <button class="foot-button" @click="admire" disabled id="foot-ji">确认赞赏</button> -->
    </div>

    <!-- 支付 -->
    <div v-transfer-dom>
    	<x-dialog v-model="isShow" class="dialog-backnone" hide-on-blur>
    		<div class="ding_content">
    			<svg @click="isShow = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
    				<path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z" class="st0" />
    			</svg>
          <div class="ding-tu"><img :src="$store.state.website.website_domain_name + '/uploads/' + imgs"></div>

    			<div class="des">

           <!-- <div class="ding-title">支付20个智汇币</div> -->
            <div class="ding-title">支付{{fund}}个智汇币</div>
            <div class="ding-title">为TA赞赏</div>
            <div class="ding_bi">+{{poll}}票</div>
    				<div class="ding-sure" @click="sureDing()">确认</div>
    			</div>
    		</div>
    	</x-dialog>
    </div>

    <!-- 充币 -->
    <div v-transfer-dom>
      <x-dialog v-model="exhibit" class="invest_Money">
        <div class="investMoney_img">
        <svg @click="exhibit = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
        	<path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z" class="st0" />
        </svg>
          <div class="ding-tus"><img src="/static/img/222.png"></div>
          <div class="investMoney_title">
            智汇币不足
          </div>
    	   <div class="lessMoney">
    	    赶紧去赚取智汇币吧
    	  </div>
        <!-- <div>平台互动</div> -->
        <div>
          <x-button @click.native="$router.push('/user/myrecharge')">去充值</x-button>
        </div>
        <div>
          <x-button @click.native="$router.push('/index')">平台互动</x-button>
        </div>
        <div>
          <x-button @click.native="$router.push('/user/myrecharge')" class="x-button">分享赚币</x-button>
        </div>
        <div style="font-size:14px;color:#8A8A8A">(推荐)</div>
        </div>
    	<!-- <div class="investMoney_cha">
    		<div class="investMoney_ch" @click="exhibit = false"><img src="/static/img/cha.png"></div>
    	</div> -->
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import { XHeader, XNumber,Group ,InlineXNumber,TransferDom,XDialog,XButton} from 'vux'
  export default{
    directives: {
    	TransferDom
    },
      components:{
        XHeader,
         XNumber,
         Group,
         InlineXNumber,
         TransferDom,
         XDialog,
         XButton,
      },
      data(){
        return{
          changeValue:'',
          gift:'',
           index: -1,
           group:'',
           money:'',
           fund:'',
           num:'',
           isShow: false,
           exhibit:false,
           ticket:'',
           poll:'',
           imgs:'',
        }
      },
      mounted(){
          this.giftList()
      },
      methods:{

        giftList(){
          var _this=this
          _this.$http.post(_this.$store.state.url + '/Vote/giftList',{
            vote_select_id : _this.$route.params.id
          }).then(res=>{
            _this.gift = res,
            _this.group = res.gift_list
          })
        },


        event(i){
          this.changeValue = 1

          // console.log(this.group[i-1].price)
          this.money = this.group[i-1].price
          this.ticket = this.group[i-1].ticket_num
          this.imgs = this.group[i-1].pic
          console.log(this.ticket)
          // $(".foot-ji").removeAttr("disabled");
          // $("#foot-ji").prop("class","foot-ji");

        },

         change (val) {
         	console.log(val)
              // console.log('change', val)
              this.changeValue = val
            },


            admire(){
              if(this.money){
              	this.fund = this.money * this.changeValue
              	this.poll = this.ticket * this.changeValue
              	this.isShow = true
              	
              }else{
              	msg('请先选择礼物')
              }
              
            },
            sureDing(){
              var _this = this;
              _this.$http.post(_this.$store.state.url + "/Vote/userSponser",{
                vote_select_id:_this.$route.params.id,
                vote_id:_this.gift.vote_id,
                gift_num:_this.changeValue,
                money:_this.money,
                ticket_num:_this.ticket
              }).then(res=>{
                if(res == '余额不足，请充值！'){
                  _this.isShow=false
                  _this.exhibit=true
                }else{
                  msg("赞赏成功");
                  _this.isShow = false;
                   this.giftList()

                }
              })
            },

            fanhui(id,time,feel,des){
             /*this.$router.push("/vote/detail/" + id  + "/"+ time + "/"+ feel + "/"+ des)*/
            this.$router.go(-1)
            },

      }
  }
</script>

<style scoped>
  .min{
    background:#EAEAEA
  }
  .warband{
    background:#fff;
    padding:10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .warband-team{
    height:50px;
    /*width:42%;*/
    display: flex;
    /*justify-content: space-between;*/
   width:100%;
  }
  .warband-tu{
    width:50px;
    height:50px;
    border-radius: 50%;
    /* background:#f0f; */
    overflow: hidden;
    margin-right:10px;

  }
  .warband-tu img{
    width:100%;
    height:100%
  }
  .warband-title{
    display: flex;
    flex-flow: column;
    justify-content: center;
    font-size:14px;
    color:#666666;
    width:72%;
  }
  .warband-title :last-child{
    color:#999;
    font-size:12px;

  }
  .warband-title :first-child{
     font-size:14px;
     display: -webkit-box;
	    overflow: hidden;
	    -webkit-box-orient: vertical;
	    text-overflow: ellipsis;
	    -webkit-line-clamp: 1;
  }
  .warband .jt{
    width:30px;
    height:30px;
  }
  .nav-cen{
    background:#fff;
    padding:8px 0;
    width:100%;
    color:#F5FDFE;
    display: flex;
    margin-top:8px;
  }
  .nav-first{
  	width:33.33%;
  	text-align: center;
  }
  .nav-first p{
  	font-size: 14px;
  }
  .nav-cen .nav-first :nth-child(1){
     color:#999999;
  }
  .nav-cen .nav-first :nth-child(2){
     color:#F21B1B
  }
  .harting{
    padding:10px 0 20px 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 50px;
  }
  .heart{
    width:26%;
    background:#fff;
    padding:5px 8px;
    text-align: center;
    margin-top: 10px;
    border-radius: 5px;
    position:relative;
    overflow: hidden;
  }
  .heart-tu{
    width:100%;
    height:100px;
   /* background:#f0f */
  }
  .heart-tu img{
    width:100%;
    height:100%;
  }
  .heart-title{
    color:#999;
    font-size:14px;
  }
 .heart-piao{
   font-size:14px;
   color:#FF4545
 }
 .foot{
   padding:15px 0 15px 0;
   background:#fff;
   display: flex;
   justify-content: space-around;
   align-items: center;
   position: fixed;
   z-index: 666;
   bottom: 0;
   left: 0;
   width: 100%;
 }
 .foot-ji{
   background:#1B8502;
   font-szie:14px;
   padding:10px 15px;
   border-radius: 8px;
   color:#fff;

 }

 .foot-button{
   /* background:#1B8502; */
   font-szie:14px;
   padding:10px 15px;
   border-radius: 8px;
   color:#fff
 }
 .weui-cell p{
   font-size:14px
 }
.on{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 0.8rem solid transparent;
  border-right: 0.8rem solid #1B8502;
  z-index: 1;
}
.foot-jia{
  display: flex;
  align-items: center;
  font-size: 14px;
  color:#8A8A8A
}
.foot-span{
  display: inline-block;
  background: rgb(255, 255, 255);
  width: 40px;
  border: 1px solid #C6C6C6;
  height: 25px;
  border-radius: 5px;
  text-align: center;
}

.ding_content {
  	width: 90%;
  	margin: 0 auto;
  	padding: 10px 20px;
  	box-sizing: border-box;
  	text-align: left;
    background:#fff;
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

  .ding-title,.ding_bi {
  	/* color: rgba(255, 107, 0, 1); */
  	text-align: center;
  	margin-top: 8px;
  	font-size: 15px;
  }
  .ding-title{
    color:#666666
  }
  .ding_bi{
    color:#147AFF
  }

  .ding-sure {
  	background: #FF8000;
  	/* background-size: 100% 100%; */
  	width: 40%;
  	padding: 4px 8px;
  	box-sizing: border-box;
  	color: #ffffff;
  	text-align: center;
  	font-size: 15px;
  	/* margin-top: 20px; */
    border-radius: 20px;
    margin:10px auto 0 auto
  }

  .cose {
  	position: absolute;
  	top: -5px;
  	right: 9px;
  	margin: 0.16rem 0.16rem;
  	color: rgba(0, 0, 0, 0.59);
  	cursor: pointer;
  	font-size: 0.666667rem;
  	opacity: 0.3;
  }
   input.weui-btn{
  	border-radius: 20px;
  	width: 50%;
  	margin-bottom: 20px;
  }
button.weui-btn{
  border-radius: 20px;
  width: 40%;
  margin-bottom: 15px;
}
.x-button{
  margin-bottom:0
}
  .ding-tu{
    position:relative;
    top:5px;
    left:50%;
    height:100px;
    width:45%;
    margin-left:-25%;
    /* background:#f0f; */
  }
 .ding-tus img,.ding-tu img{
    width:100%;
    height:100%;
  }

.ding-tus{
    position:relative;
    top:5px;
    left:50%;
    height:159px;
    width:45%;
    margin-left:-18%;
    /* background:#f0f; */
  }

  .invest_Money {
      border-radius: 8px;
      padding-bottom: 8px;
    }
  .investMoney_img {
    background: #FFFFFF;
    height: 480px;
    overflow: hidden;
  }
  .investMoney_title {
    font-size: 18px;
    text-align: center;
    line-height: 1.066667rem;
   /* margin-top:20px */
  }
  .investMoney_cha{
  	width:100%;
  	display: flex;
  	justify-content: center;
  }
  .investMoney_ch{
  	width:30px;
  	height:30px;
  }
  .investMoney_ch img{
  	width:100%
  }
   .weui-btn_default {
    background: #FF6F3A;
    color: #fff;
    width: 100px;
  }
  .lessMoney {
    width: 44%;
    font-size: 14px;
    margin: 10px auto;
  }

</style>
