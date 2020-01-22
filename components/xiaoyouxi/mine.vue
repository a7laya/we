<template>
  <div class="container">
    <x-header class="header step">
      <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
      <div slot="overwrite-title" class="title" style="color: #fff;font-weight: 400">竞赛中心</div>
    </x-header>
    <div class="card" v-if="list !== null">
      <!--<div class="money">
        <span>{{list.money/100}}</span>
        <span>红包余额(元)</span>
      </div>
      <div class="mine">
        <img :src="$store.state.website.website_domain_name + '/uploads/' + list.headimgurl" alt="">
        <span>{{list.nickname}}</span>
      </div>
      <div class="tixian" @click="go(1)">
        <span>去提现</span>
        <img src="/static/img/game/tixian.png" alt="">
      </div>-->
      
         <img :src="$store.state.website.website_domain_name + '/uploads/' + list.headimgurl" alt="" class="headimg">
      <div class="personinfo">
      	<div class="wallet info1">
      		<div>{{list.money/100}}</div>
        <div></div>红包余额(元)</span>
      	</div>
      	<div  class="info1">
      		<div class="info-name">{{list.nickname}}</div>
      	</div>
    
      		<div  class="tixian info1"  @click="go(1)">
      			<span>去提现</span>
        <img src="/static/img/game/tixian.png" alt="">
      		</div>
      		
      </div>
    </div>
    <div class="body">
      <ul>
        <li @click="go(2)">我的题库 <img src="/static/img/game/mineRight.png" alt=""></li>
        <li @click="go(5)">我的分享 <img src="/static/img/game/mineRight.png" alt=""></li>
        <li @click="go(3)">账户明细<img src="/static/img/game/mineRight.png" alt=""></li>
        <li @click="go(4)">我的客服<img src="/static/img/game/mineRight.png" alt=""></li>
      </ul>
      <div class="block"></div>
    </div>
     <vue-game :type="2"></vue-game>
    <vue-shareit></vue-shareit>
  </div>
</template>

<script>
  import {XHeader, Badge, Grid, GridItem} from 'vux'
  import VueShareit from '../component/game/gameShareit'
  import {VueGame} from '../component/'
  export default {
    components: {
      XHeader,
      Badge,
      Grid,
      GridItem,
      VueShareit,
      VueGame
    },
    data () {
      return {
        list: null,
        borderColor: {
          borderColor: '#fff'
        }
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    mounted () {
      var _this = this
    },
    created () {
      this.getMineData()
    },
    methods: {
      getMineData () {
        let _this = this
        _this.$http.post(_this.$store.state.url + '/Applets/personal_center_info', {
          load: true
        }).then(function (res) {
          _this.list = res
        })
      },
      loaddata (res) {
        var _this = this
        _.each(res, function (e) {
          _this.list = _this.list || []
          _this.list.push(e)
        })
      },
      go (type) {
        var type = Number(type)
        var url
        switch (type) {
          case 1:
            url = '/game/txApply'
            break
          case 2:
            url = '/game/tiku'
            break
          case 3:
            url = '/game/zhDetail'
            break
          case 4:
            url = '/game/kefu'
            break
          case 5:
            url = '/game/sharelist'
            break
        }
        this.$router.push(url)
      },
      goBack () {
        this.$router.push('/game/index')
      }
    }
  }
</script>

<style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url("/static/img/game/mineBg.png");
    -webkit-background-size: 100%;
    background-size: 100%;
    overflow: hidden;
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

  .card {
    position: absolute;
    top: 63px;
    left: 15px;
    width: 345px;
    background: #ffffff;
    border-radius: 8px;
    height: 170px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .1);
  }

  .card .money {
    float: left;
    width: 70px;
    margin-left: 21px;
    margin-top: 90px;
    text-align: center;
  }

  .card .money span:nth-child(1) {
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: #F73A3A;
  }

  .card .money span:nth-child(2) {
    display: block;
    font-size: 12px;
    color: #666666;
  }

  .card .mine {
    float: left;
    width: 70px;
    margin-left: 48px;
    margin-top: 18px;
  }

  .headimg {
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .1);
    margin: 20px auto;
  }

  .info-name {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    text-align: center;
  
  }

  .card .tixian {
    text-align: center;
    /*margin-left: 71px;
    margin-top: 105px;*/
  }

  .card .tixian span {
    color: #FF9F4A;
    font-size: 12px;
  }

  .card .tixian img {
    width: 7px;
    height: 7px;
    display: inline-block;
    margin-left: 1px;
  }
.personinfo{
	display: flex;
	justify-content: space-around;
	align-items: center;
}
  .body {
    width: 100%;
    background: white;
    padding-bottom: 400px;
  }

  .body ul {
    width: 345px;
    margin: 0px auto;
    margin-top: 150px;
    padding-top: 70px;
  }

  .body ul li {
    line-height: 45px;
    font-size: 14px;
    padding-left: 21px;
    border-top: 1px solid #EEEEEE;
    color: #666666;
  }

  .body ul li img {
    float: right;
    display: inline-block;
    width: 10px;
    height: 16px;
    margin-top: 15px;
    margin-right: 21px;
  }

  .block {
    width: 100%;
    height: 8px;
    background: #F0F0F0;
  }
  .wallet{
  	text-align: center;
  }
  .wallet div:nth-child(1){
  	font-size: 18px;
    font-weight: bold;
    color: #F73A3A;
  }
  .wallet div:nth-child(2){
  	 font-size: 12px;
    color: #666666;
  }
  .info1{
  	width: 33.33%;
  }
</style>
