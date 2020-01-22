<template>
<div class="wrap">
  <!-- <div class="header"> -->
    <!-- <div class="warning">
     <div class="leftIcon" @click="back($route.params.id)"><</div>
    <div class="rightFigure">{{title}}</div> -->
   <!-- <div class="rightFigure">{{info.vote_title}}</div> -->
   <!-- </div> -->
<!--    </div> -->
      <x-header :left-options="{backText: ''}"></x-header>
      <marquee scrollamount="3" style="color: #FFFFFF;width: 80%;margin: 0 auto;font-size: 0.48rem;position: fixed;top: 10px;left: 50px;z-index: 111;">助力详情</marquee>
    <!-- 投票 -->
    <div class="entry">
    <div class="entry-title">助力列表</div>
    <div class="entry-list" v-for="(item,index) in array" :key="index">
      <div class="list-tu">
        <div class="tu-pian"><img style="width: 30px;height: 30px;float: right;margin-top: 10px;" :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl"></div>
        <div class="list-title">{{item.add_time}}</div>
         <div class="list-title">{{item.mem_nickname}}</div>
      </div>
</div>
    </div>
</div>
</template>
<script>
  import {
  	XHeader,
  } from 'vux'

  export default {
    components: {
    	XHeader,
    },
  data(){
    return{
     title:'',
     array:'',
     info:'',
     // vote_id_sum: '', 投票数
    }
  },
  mounted() {
    this.voteInfo()

    var _this = this
    // const timer = setInterval(() => {
      // _this.time = _this.SelectInfo.start_time - Date.parse(new Date())/1000 ;
      // _this.signEnd = _this.SelectInfo.end_time - Date.parse(new Date())/1000 ;
    //   _this.s_time = _this.SelectInfo.start_time
    //   _this.e_time = _this.SelectInfo.end_time
    //   _this.a_time = Date.parse(new Date())/1000
    //   _this.s_a = _this.s_time-_this.a_time
    //   _this.e_a = _this.e_time-_this.a_time
    // }, 1000);
    // _this.times = Date.parse(new Date()) / 1000;
    // // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    // _this.$once('hook:beforeDestroy', () => {
    //   clearInterval(timer);
    // })

    //投票信息
    // this.voteInfo()
    // var _this = this;
    // const timer1 = setInterval(() => {
      // _this.time = _this.info.vote_start_time - (Date.parse(new Date()) / 1000);
      // _this.signEnd = _this.info.vote_end_time - (Date.parse(new Date()) / 1000);
      // _this.prizeSet = _this.info.vote_prize_set


      // this.signEnd--
      // this.time--

    // }, 1000);
    // _this.times = Date.parse(new Date()) / 1000;
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    // _this.$once('hook:beforeDestroy', () => {
    //   clearInterval(timer1);
    // })
  },
  methods: {
    voteInfo() {
      let _this = this
      _this.$http.post(_this.$store.state.url + "/Vote/voteSelectHelpList", {
        // vote_id: _this.$route.query.id,
        vote_select_id: _this.$route.params.vote_select_id,
        keyword: '',
        page: 1,
        limit: 10,
      }).then(res => {
          console.log('res')
          console.log(res)
        _this.array = res


      })
    },
    // voteSelectInfo() {
    //   var _this = this
    //   _this.$http.post(_this.$store.state.url + "/Vote/voteSelectInfo", {
    //     vote_select_id: _this.$route.params.id
    //   }).then(res => {
    //     _this.RankingList = res.vote_select_list
    //      _this.title= res.vote_title
    //     console.log('_this.RankingLis')
    //     console.log(_this.RankingList)

    //   })
    // },
    //助力列表
    loading(res) {
      var _this = this;
      _.each(res, function(e) {
        _this.array = _this.array || [];
        _this.array.push(e);
      })
    },
    loaddatas(res) {
      if (res[0].id == null) {
        return
      }
      var _this = this;
      _.each(res, function(e) {
        _this.RankingList = _this.RankingList || [];
        console.log(_this.RankingList)
        _this.RankingList.push(e);
      })
    },
    back(id){
           this.$router.push("/vote/enroldetail/" + id)
          },
  }
  }
</script>
<style scoped style="less">
.header{
  width: 100%;
  height: 100px;
  background-color:#F4F2F2 ;
}
.warning{
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin: 0px auto;
  display: flex;
}
.leftIcon{
  width:20%;
  height:60px;
  font-size: 20px;
  text-align: center;
  color: #CCCCCC;
  /*width:0px;
  height:0px;
  border: 10px solid black;
  border-left: transparent;
  border-top: transparent;
  border-bottom: transparent; */
  }
  .rightFigure{
    width: 60%;
    height: 60px;
/*    font-size: 18px; */
    text-align: center;
  }
  .entry {
    width: 95%;
    margin: 10px auto 20px auto;
    background: #fff;
    /*   border-radius: 15px; */
    border-radius: 10px;
    /* padding:10px 0; */
    padding-bottom: 10px;

    color: #999;
    background: #fff;
  }

  .entry-title {
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding-top: 10px;
    /* border-radius: 15px 15px 0 0; */
    border-radius: 10px 10px 0px 0px;
    background: #ccc;

  }
  .entry-list {
    width: 94%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    position: relative;
    /* padding-bottom:8px; */
    border-bottom: 1px solid #E3E3E3;
    /* margin:10px auto 0 auto; */
  }

  .list-tu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-time {
    width: 45%;
    line-height: 50px;
    font-size: 14px;
  }

  .times {
    width: 20%;
    text-align: center;
  }

..treat{
    width:93%;
    margin:0 auto;
    display: flex;
    justify-content: space-between;
    padding:10px 0;
    align-items: center;
  }
.foot{
    font-size:14px;
    background:#34495E;
    color:#fff;
    height:45px;
    position: relative;
    position:fixed;
    z-index: 999;
    bottom:0;
    left:0;
    width: 100%;
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
   .addSelect{
     width: 60px;
     height: 60px;
     border-radius: 50%;
     text-align: center;
     line-height: 60px;
     color: #EFEFEF;
     background:#707070;
     position: fixed;
     right: 20px;
     bottom: 60px;
     }

</style>
