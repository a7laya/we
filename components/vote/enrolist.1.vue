<template>
	<div class="min">
		 <x-header :left-options="{backText: ''}">2019《兆龙杯》最美汽车投票</x-header>
		 <vue-swiper :type="4"></vue-swiper>
		 <div class="nav">
			 <div class="nav-first">
				 <p>参与者</p>
				 <p>50</p>
			 </div>
			 <div class="nav-first nav-two">
				 <p>投票数</p>
				 <p>66021</p>
			 </div>
			 <div class="nav-first">
				 <p>访问量</p>
				 <p>5866021</p>
			 </div>
		 </div>

		 <div class="time">
			 <p class="time-p">
				 投票<span>结束</span>倒计时<span v-html="$options.filters.returntime5(time)"></span>
         <!-- <span>8</span> 天 <span>10 </span>小时 <span>22</span> 分 <span>45</span> 秒 -->
			</p>
		 </div>

     <div class="details">
       <div class="details-first" @click="opens" :class='{on:open==true}'>
         <div>投票详情</div>
         <div><img src="/static/img/jiantou.png"></div>
       </div>
       <div class="details-first details-last" @click="prize" :class='{on:award==true}'>
         <div>奖品设置</div>
         <div><img src="/static/img/jiantou.png"></div>
       </div>

       <!-- 投票详情 -->
       <div class="dtail-lists" v-if="open">
         <div class="detail-list detail-listing" >
           <div class="list-huodong">
            <div>【活动详情】</div>
            <div>

如今，汽车已经成为越来越普及的交通工具，人们对汽车的需求和品质要求也在不断增加。2018第十一届郑州国际汽车展览会暨新能源·智能网联汽车展览会（简称：2018第11届郑州国际车展），汇聚全球顶级豪车、进口、合资、自主品牌，涵盖家用、商用、新能源汽车、房车等80余个汽车品牌，成为中原地区地区第一室内大车展，满足不同消费者的购车需求，展会即将于11月1-5日在郑州国际会展中心隆重开启。


            </div>
           </div>
         </div>
       </div>


       <!-- 奖品设置 -->
       <div class="dtail-lists detail-award" v-if="award">
         <div class="detail-list " >
           <div class="award-list">
              <div>【奖品设置】</div>
              <div class="award-app">
                <div>特等奖</div>
                <div>奖品：Apple/苹果AirPods一个</div>
              </div>
              <div class="award-app">
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
              </div>
            </div>
              <div class="zhu">
                <div style="width:95%;margin:0 auto">
                    注：本轮投票禁止作弊，一经发现，取消选手资格。中奖后，
                          请在一月内请主动联系客服人员，核实并提交邮寄地址。
                </div>
              </div>
         </div>
       </div>
     </div>


		 <div class="search">
			<input placeholder="请输入参赛编号或选手名称、品牌......" class="txt">
			<span class="search-span">搜索</span>
		 </div>

		 <div class="control">
			 <div class="control-frist" @click="skip()">
				 <div class="triangle"></div>
				 <div class="control-num">1</div>
				 <div class="control-tu"></div>
				 <div class="control-title">
					 <div class="control-con">
						<img src="/static/img/wode.png">&#x3000;
						<div class="control-dui">海达队</div>
					 </div>
					 <div class="control-con">
						 <img src="/static/img/wuxing.png"/>&#x3000;
						 <div class="control-dui">52634票</div>
					</div>
				</div>
				 <div class="control-tou">投票</div>
			  </div>

			 <div class="control-frist" @click="skip()">
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
			 </div>
		 </div>

    <div class="add">
       <span>添加选手</span>
    </div>


    <!-- <vue-collect></vue-collect> -->
		 <vue-foot></vue-foot>
	</div>
</template>

<script>
	import { XHeader, } from 'vux'
	import {VueSwiper,VueFoot,VueCollect,} from '../component'
	export default{
		components:{
			XHeader,
			VueSwiper,
			VueFoot,
      VueCollect,
		},
    data(){
      return{
        time : 14400,
        open:false,
        award:false,
      }
    },
    mounted(){
      const timer = setInterval(() => {

      	this.time--;
        if(this.time==0){
          return
        }


      }, 1000);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
      	clearInterval(timer);
      })
    },
		methods: {

      opens(){
        this.open=!this.open
        this.award=false
      },
      prize(){
        this.award=!this.award
        this.open=false
      },

			skip(){
				this.$router.push("/vote/enrodetail")
			}
		},
	}
</script>

<style scoped>
	.min{
		background:#EAEAEA
	}
	.nav{
		width:100%;
		background:#05D8E8;
		color:#F5FDFE;
		padding:15px 0;
		display: flex;
	}
	.nav-first{
		width:33.33%;
		text-align: center;
		/* float: left; */

	}
	.nav-two{
		border-right: 2px solid #F5FDFE;
		border-left: 2px solid #F5FDFE;
	}
	.nav-first p{
		font-size: 14px;
	}
	.search,.time{

		width:93%;
		margin:10px auto 0 auto;
	}
	.time p{
		width:100%;
		padding:8px 0;
		background: #FFFFFF;
		border-radius: 20px;
		text-align: center;
		font-size:14px;
		color:#999999;
	}
	.time .time-p span{
		color:#F21B1B
	}

  .details{
    background:#fff;
   /* padding:10px 0; */
    widyh:100%;
    display: flex;
    margin-top: 10px;
    height: 50px;
    position: relative;
  }

  .details-first{
    width:50%;
    display: flex;
    justify-content: center;
    align-items: center;


  }
  .details-first :nth-child(1){
    font-size:14px;
    color:#999;
  }
  .details-first :nth-child(2){
    height:20px;
    width:20px;
  }
  .details-first :nth-child(2) img{
    width:100%;
    height:100%;
  }
  .details-last{
    border-left:1px solid #666;
    box-sizing: border-box;
  }

  .dtail-lists{
    position: absolute;
    top:55px;
    left:0;
    z-index: 5;
    width:100%;
    background:#C2C2C2;
    padding:10px;
  }

.detail-listing{

}
  .detail-list{
    max-height:230px;
    overflow-y: scroll;
    width:95%;
    background:#fff;
    border-radius: 10px;
    box-shadow:2px 2px 2px #C2C2C2 ;
  }
  .list-huodong{
    width:95%;
    margin:0 auto;
    padding:15px 0;
  }
  .award-list{
    width:95%;
    margin:0 auto;
    padding-top:15px
  }
  .award-list :first-child,.list-huodong :first-child{
    color:#BE0202;
    font-size:14px;
  }
  .list-huodong :nth-child(2){
    color:#929292;
    font-size:14px;
    margin-top:10px;
    width:100%
  }

  .award-app{
    padding: 10px 0;
   border-bottom:1px dashed #707070;
    color:#1C272F;
    font-size: 14px;
  }
  .app{
    border:0
  }
/* .detail-award{
  margin-bottom:70px;
  max-height: 230;
  overflow-y: scroll
} */
  .zhu{
    padding:8px 0;
    background:#F0F0F0;
    color:#BF8686;
    font-size:14px;
    border-radius: 0 0 10px 10px;
  }
 .on{
   background:#CCCCCC;
 }

	.search .txt{
		width:75%;
		/* padding:8px 0; */
		background: #FFFFFF;
		border-radius: 20px 0 0 20px;
		text-align: center;
		font-size:12px;
		height:38px;
		float:left;
		color:#DBDBDB
	}
	.search-span{
		width:25%;
		/* padding:8px 0; */
		background: #FFFFFF;
		border-radius: 0 20px 20px 0;
		text-align: center;
		font-size:14px;
		float:left;
		height:38px;
		line-height: 38px;
		background:#05D8E8;
		color:#fff;
	}
	.control{
		width:90%;
		margin:0 auto;
		display: flex;
		justify-content: space-between;
		padding:20px 0 10px 0;
	}
	.control-frist{
		width:47%;
		border-radius: 8px;
		position:relative;
		overflow: hidden;
	}
	.triangle{
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		border-top: 30px solid #FF8800;
		border-right: 30px solid transparent;
		z-index: 1;
	}
	.control-num{
		position: absolute;
		color: #fff;
		left: 4px;
		top: 3px;
		line-height: 1em;
		font-size: 12px;
		z-index: 1;
	}
	.control-tu{
		height:80px;
		width:100%;
		background:#f00;
	}
	.control-con{
		display: flex;
		align-items: center;
	}
	.control-title{
		background:#fff;
		padding:8px;

	}
	.control-title img{
		width:15px;
		height:15px;
		/* display: inline-block; */
	}
	.control-dui{
		/* display: inline-block; */
		font-size:14px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		color:#9B9B9B
	}
	.control-tou{
		padding:8px 0;
		text-align: center;
		color:#FFFFFF;
		background:#05D8E8;
		font-size:14px;
	}

  .add{
    width:100%;
    background:#fff;
    text-align: center;
    height:60px;
    line-height: 60px;
  }
  .add span{
    backgeound:#01B0B7;
    color:#fff;
    font-size:14px;
    width:30%;
    padding:5px 0;
  }
</style>
