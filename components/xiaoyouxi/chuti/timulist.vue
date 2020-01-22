<template>
  <div class="index_box">
    <x-header class="header">
      <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
      <div slot="overwrite-title" class="title" :style="borderColor">题目列表</div>
      <div slot="right" class="headerRight" @click="add()">继续添加</div>
    </x-header>

    <div class="li cl li1">
      <div class="mineRankCenter">
        <div class="gameRankData" v-for="(data,index) in item" @click="goto(data)">
          <div class="left">
            <span class="title ell">{{data.problem}}</span>
            <span class="answer1 ell">答案一：<span>{{data.Answer_group[0]}}</span></span>
            <span class="answer2 ell">答案二：<span>{{data.Answer_group[1]}}</span></span>
          </div>
          <div class="right">
            <span v-if="data.switch == 2" style="color: #999999;">{{data.typename}}</span>
            <span v-else-if="data.switch == 3" style="color: #EF5F5F;">{{data.typename}}</span>
            <span v-else-if="data.switch == 4" style="color: #56B972;">{{data.typename}}</span>
          </div>
        </div>
      </div>
    </div>
    <vue-shareit></vue-shareit>
  </div>
</template>

<script>
  import { XButton, XHeader } from 'vux'
import VueShareit from '../../component/game/gameShareit'
  export default {
    components: {
      XButton,
      XHeader,
      VueShareit
    },
    name: 'list',
    data () {
      return {
        borderColor: {
          borderColor: '#333'
        },
        item: []
      }
    },
    props: {
      type: Number,
      // item: Array,
      result: Object
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        var _this = this
        _this.$http.post(_this.$store.state.url + '/Applets/sponsor_topic_list', {
          load: true,
          id: this.$route.params.id
        }).then(function (res) {
          _this.item = res
        })
      },

      goto (data) {
        if (this.$route.query.type != 2){
          this.$router.push('/game/problemEdit/' + data.id)
        }
      },
      goBack () {
        history.go(-1)
      },
      add () {
        this.$router.push('/game/singleAdd/' + this.$route.params.id + '/' + this.item[1].hangye)
      },
      deleteData (id) {
        var _this = this
        _this.$http.post(_this.$store.state.url + '/Applets/del_topic', {
          load: true,
          id: id
        }).then(function (res) {
          this.getData()
        })
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
    width: 210px;
    font-size: 16px;
    text-align: center;
    line-height: 1.066667rem;
  }
  .headerRight{
    color: #FF7F00;
  }
  .index_box{
    /*height: 389px;*/
    padding-bottom: 10px;
  }
  .chuti{
    width: 100%;
    height: 43px;
    background: #FF7F00;

    margin-top: 10px;
  }
  .chuti img{
    float: left;
    display: block;
    margin-left: 145px;
    margin-top: 13px;
    width: 17px;
  }
  .chuti span{
    float: left;
    line-height: 43px;
    margin-left: 12px;
    color: #fff;
    font-size: 14px;
  }
  .gameRankData{
    height: 83px;
    box-shadow: 0 0 10px rgba(0,0,0,.05) ;
    background: #fff;
    width: 345px;
    margin: 0px auto;
    margin-top: 10px;
    border-radius: 3px;
    overflow: hidden;
  }
  .gameRankData .left{
    float: left;
  }
  .gameRankData .left .title{
    display: block;
    margin-left: 29px;
    margin-top: 6px;
    color: #333333;
    font-size: 16px;
    text-align: left;
    line-height: 30px;
  }
  .gameRankData .left .answer1,.gameRankData .left .answer2{
    display:block;
    margin-left: 29px;
    font-size: 13px;
    color: #666666;
  }

  .gameRankData .right{
    float: right;
    margin-right: 30px;
    width: 73px;
    text-align: right;
    font-size: 13px;
    line-height: 83px;
  }
</style>
