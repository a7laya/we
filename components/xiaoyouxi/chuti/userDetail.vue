/**
* @Author: feifei
* @Date: 2019-06-11
* @Project: hdzg
*/
<template>
  <div class="con">
    <x-header class="header">
      <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
      <div slot="overwrite-title" class="title" :style="borderColor">答题选手明细</div>
    </x-header>
    <div class="body">
      <div class="list_box" v-for="(item,index) in list">
        <img  :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" alt="">
        <div class="detail">
          <span>领取人</span>
          <span style="width: 3rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.nickname}}</span>
        </div>
        <div class="money">
          <span>领取次数</span>
          <span>{{item.count}}次</span>
        </div>
      </div>
    </div>
    <vue-loading :url="$store.state.url + '/Applets/sponsor_part_list?page=1&limit=10&sponsor_id=' + $route.params.id" @ievent="loaddata"></vue-loading>
  </div>

</template>

<script>
  import { XHeader} from 'vux'
  import { VueLoading } from '../../component/'
  import VueShareit from '../../component/game/gameShareit'

  export default {
    components: {
      XHeader,
      VueLoading,
      VueShareit,
    },
    name: 'userDetail',
    data () {
      return {
        borderColor: {
          borderColor: '#333333'
        },
        list: undefined,
        index: 1,
        type: 25
      }
    },
    created () {
    },
    methods: {
      goBack () {
        history.go(-1)
      },
      loaddata (res) {
        var _this = this;
        _.each(res, function (e) {
          _this.list = _this.list || [];
          _this.list.push(e);
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    position: relative;
    width: 100%;
    -webkit-background-size: 100%;
    background-size: 100%;
    overflow: hidden;
    background: white;
  }

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
    font-size: 18px;
    text-align: center;
    line-height: 1.066667rem;
  }

  .body {
    width: 100%;
    /*height: 90vh;*/
    background: white;
    overflow: scroll;
  }

  .body .list_box {
    width: 345px;
    margin: 0px auto;
  }

  .body .list_box {
    height: 55px;
    font-size: 14px;
    border-bottom: 1px solid #EEEEEE;
    color: #666666;
  }

  .body .list_box img {
    float: left;
    display: inline-block;
    width: 29px;
    height: 29px;
    margin-top: 13px;
    border-radius: 50px;
    border: 1px solid #eee;
  }

  .body .list_box .detail {
    float: left;
    margin-left: 17px;
    margin-top: 11px;
  }

  .body .list_box .detail span:nth-child(1) {
    display: block;
    color: #333;
  }

  .body .list_box .detail span:nth-child(2) {
    display: block;
  }

  .body .list_box .money {
    float: right;
    margin-right: 30px;
    font-size: 16px;
    color: #333;
    margin-top: 18px;
  }

</style>
