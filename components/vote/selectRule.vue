<template>
  <div class="wrap">
    <div class="header">
      <!-- <div class="warning">
        <div class="leftIcon" @click="back($route.params.id)">
          <</div> <div class="rightFigure">{{title}}
        </div> -->
        <!-- <div class="rightFigure">{{info.vote_title}}</div> -->
      <!-- </div> -->
      <x-header :left-options="{backText: ''}"></x-header>
      <marquee scrollamount="3" style="color: #FFFFFF;width: 80%;margin: 0 auto;font-size: 0.48rem;position: fixed;top: 10px;left: 50px;z-index: 111;">{{title}}活动</marquee>
      <div style="width: 100%;height: 1.2rem;background: #fff;"></div>
	  <div class="color">网选详情:</div>
    </div>
    <div class="actionsInstrodece">
      <div class="instrodece">【活动介绍】</div>
      <div class="detail" v-html="info"></div>
    </div>
    <!-- 奖品 -->
    <div class="award-wrap" v-if="prizeSet!=1">
      <div class="award">【奖品设置】</div>
      <div class="awardgoods" v-for="(item,index) in list" :key="index">
        <div class="grade">{{item.name}}:</div>
        <div class="goods">
          奖品：{{item.prize}}
        </div>
      </div>
      <div class="copy">本次奖品由智汇优库网提供赞助</div>
    </div>
    <!-- 奖项提供方 -->
    <div class="support">

      <div class="annotation">注：本轮投票禁止作弊，一经发现，取消选手资格。中奖后，
      </div>
      <div class="secondline">请在一月内请主动联系客服人员，核实并提交邮寄地址。</div>
    </div>
    <!-- 返回 -->
<!--    <div class="bottom-wrap">
      <div class="back" @click="back($route.params.id)">返回</div>
      <div class="blank"></div>
    </div> -->
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
    data() {
      return {
        prizeSet: "",
        title: '',
        info: '',
        signEnd: '',
        time: '',
        arr: '',
        list: [{
            name: '特等奖',
            prize: ''
          },
          {
            name: '一等奖',
            prize: ''
          },
          {
            name: '二等奖',
            prize: ''
          },
          {
            name: '三等奖',
            prize: ''
          },
          {
            name: '四等奖',
            prize: ''
          },
          {
            name: '五等奖',
            prize: ''
          },
          {
            name: '参与奖',
            prize: ''
          }
        ]
      }
    },
    methods: {
      voteInfo() {
        let _this = this
        _this.$http.post(_this.$store.state.url + "/Vote/voteInfo", {
          // vote_id: _this.$route.query.id,
          vote_id: _this.$route.params.id,
          keyword: '',
          page: 1,
          limit: 10,
        }).then(res => {
          _this.info = res
          let count = res.vote_prize_set.length;
          for (let i = 0; i < count; i++) {
            _this.list[i].prize = res.vote_prize_set[i]
          }
          if (this.list.length > count) {
            this.list = this.list.slice(0, count)
          }
          _this.prizeSet = _this.info.vote_prize_set
          _this.title = _this.info.vote_title
          _this.info = _this.info.vote_info
        })
      },
      back(id) {
        this.$router.push("/vote/enrolist/" + id)
      }
    },
    mounted() {

      this.voteInfo()
    }
  }
</script>
<style scoped style="less">
  .header {
    width: 100%;
    height: 100px;
    background-color: #F4F2F2;
  }

  .warning {
    width: 100%;
    height: 60px;
    line-height: 60px;
    margin: 0px auto;
    display: flex;
  }

  .leftIcon {
    width: 20%;
    height: 60px;
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

  .rightFigure {
    width: 60%;
    height: 60px;
    /*    font-size: 18px; */
    text-align: center;
  }

  .color {
    height: 30px;
    line-height: 30px;
    text-indent: 2em;
  }

  .actionsInstrodece,
  .award-wrap {
    border-radius: 10pt;
    width: 100%;
    margin: 0px auto;
    background-color: white;
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .instrodece {
    text-indent: 2em;
    color: #FF0000;
    padding-bottom: 10px;
  }

  .detail {
    width: 90%;
    margin: 0px auto;

  }

  .award-wrap {
    margin-top: 10px;
  }

  .award-wrap .award {
    width: 100px;
    border-bottom: 3px solid #666666;
    color: #FF0000;
    padding-bottom: 10px;
    text-align: center;
  }

  .awardgoods {
    width: 90%;
    text-indent: 2em;
    margin: 6px auto 0px auto;
  }

  .grade {
    margin-top: 8px;
  }

  .goods {
    border-bottom: 3px dotted #EFEFEF;
    padding-bottom: 6px;
  }

  .goodsl {
    border: none;
  }

  .support {
    width: 100%;
    height: 120px;
    /* 暂定 */
    background-color: #F0F0F0;
  }

  .copy {
    width: 100%;
    margin-top: 20px;
    height: 40px;
    line-height: 20px;
    color: orange;
    text-align: center;
    font-size: 18px;
  }

  .annotation {
    width: 90%;
    height: 20px;
    line-height: 20px;
    margin: 0px auto;
    color: #830000;
  }

  .secondline {
    width: 90%;
    height: 20px;
    line-height: 20px;
    text-indent: 2em;
    margin: 0px auto;
    color: #830000;
  }

  .bottom-wrap {
    width: 100%;
    height: 60px;
    background-color: white;
    position: relative;
  }

  .back {
    width: 60px;
    height: 20px;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    top: 20px;
    border: 2px solid #F88509;
    border-radius: 10px;
    text-align: center;
    color: #F88509;
  }

  .blank {
    width: 100%;
    height: 40px;
  }
	.vux-header {
		position: fixed;
		top: 0;
		width: 100%;
	}
</style>
