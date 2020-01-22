<template>
  <div class="team_main">
    <x-header :title="'粉丝团队/收益'" :left-options="{backText:''}">
      <div slot="right">
        <vue-header-nav></vue-header-nav>
      </div>
    </x-header>

    <div class="team_title">
      <div class="title_li left">
        <div class="span_list">直接粉丝</div>
        <div class="span_list">人数：{{alldata.memberOneCount}}人</div>
        <div class="span_list">智汇币：<span style="color: rgb(0, 125, 219);">+{{alldata.memberTeamCurrencyTatle/100}}</span></div>
        <div class="span_list">智汇豆：<span style="color: red;">+{{alldata.memberTeamBeanTatle/100}}</span></div>
      </div>
      <div class="title_li left">
        <div class="span_list">间接粉丝</div>
        <div class="span_list">人数：{{alldata.memberTowCount}}人</div>
        <div class="span_list">智汇币：<span style="color: rgb(0, 125, 219);">+{{alldata.memberTowTeamCurrency/100}}</span></div>
        <div class="span_list">智汇豆：<span style="color: red;">+{{alldata.memberTowTeamBean/100}}</span></div>
      </div>
    </div>

    <tab :line-width='2' active-color="#F88F00">
      <tab-item :selected="demo4 === index+1" v-for="(item, index) in list4" @on-item-click="show(index+1)" :key="index">{{item}}</tab-item>
    </tab>


    <div v-if="index==1">
      <div class="team_yi_list">
        <div class="list" v-for="(item,index) in item.memberTeamInfo" :key="index">
          <router-link :to="'/user/usershow/' + item.mem_id" tag="div" class="img">
            <img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" />
          </router-link>
          <div class="nameAphone">
            <div class="name ell">{{item.mem_nickname || '暂无昵称'}}</div>
            <div class="phone">{{item.mem_register_time | returntime6}}</div>
          </div>
          <div class="txtAnumber">
            <div class="txt">给您带来的总收益</div>
            <div class="number"><span style="color:rgb(0, 125, 219)">+{{item.currency/100}}</span><span style="color: red;">+{{item.bean/100}}</span></div>
          </div>
        </div>
        <!-- <load-more v-if="memberTeamInfo.length==0" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
     <!--   <load-more :url="$store.state.url + '/Homecenter/team_num?type=1&page=1&limit=10'" @ievent="loaddatas"
           background-color="#fbf9fe"></load-more> -->
           <vue-loading :url="$store.state.url + '/Homecenter/team_num?type=1&page=1&limit=10'" @ievent="loaddatas"></vue-loading>
      </div>

      <!--<vue-load :url="$store.state.url + '/Homecenter/teamInfo?type=1'" @ievent="loaddatas" v-if="show3"></vue-load>-->
    </div>
    <div v-if="index==2">

      <div class="team_yi_list">
        <div class="list" v-for="(item,index) in erjiList.memberTeamInfo" :key="index">
          <router-link :to="'/user/usershow/' + item.mem_id" tag="div" class="img">
            <img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" />
          </router-link>
          <div class="nameAphone">
            <div class="name ell">{{item.mem_nickname || '暂无昵称'}}</div>
            <div class="phone">{{item.mem_register_time | returntime6}}</div>
          </div>
          <div class="txtAnumber">
            <div class="txt">给您带来的总收益</div>
            <div class="number"><span style="color:rgb(0, 125, 219)">+{{item.currency/100}}</span><span style="color: red;">+{{item.bean/100}}</span></div>
          </div>
        </div>
        <!-- <load-more v-if="member.length==0" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
        <!-- <load-more :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
        <vue-loading-team :url="$store.state.url + '/Homecenter/team_num?type=2&page=1&limit=10'" @ievent="loaddata"></vue-loading-team>
      </div>


    </div>
    <!--<div class="team_title" v-if="item">
            <div class="title_li left">
                <div class="span_list">一级</div>
                <div class="span_list">人数：{{item.memberOneCount}}人</div>
                <div class="span_list">智汇币：<span style="color: rgb(0, 125, 219);">+{{item.memberTeamCurrencyTatle/100}}</span></div>
                <div class="span_list">智汇豆：<span style="color: red;">+{{item.memberTeamBeanTatle/100}}</span></div>
            </div>
            <div class="title_li left">
                <div class="span_list">二级</div>
                <div class="span_list">人数：{{item.memberTowCount}}人</div>
                <div class="span_list">智汇币：<span style="color: rgb(0, 125, 219);">+{{item.memberTowTeamCurrency/100}}</span></div>
                <div class="span_list">智汇豆：<span style="color: red;">+{{item.memberTowTeamBean/100}}</span></div>
            </div>
        </div>-->
    <!--<div class="team_yi_list" v-if="item">
            <div class="list" v-for="(item,index) in item.memberTeamInfo" :key="index">
            	<router-link :to="'/user/usershow/' + item.mem_id" tag="div" class="img">
            		<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" />
            	</router-link>
                <div class="nameAphone">
                    <div class="name ell">{{item.mem_nickname || '暂无昵称'}}</div>
                    <div class="phone">{{item.mem_register_time | returntime6}}</div>
                </div>
                <div class="txtAnumber">
                    <div class="txt">给您带来的总收益</div>
                    <div class="number"><span style="color:rgb(0, 125, 219)">+{{item.totalCurrcncy/100}}</span><span style="color: red;">+{{item.totalBean/100}}</span></div>
                </div>
            </div>
            <load-more v-if="item.memberTeamInfo.length==0" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more>
        </div>-->
    <!--<load-more v-else :show-loading="true" :tip="'暂无数据'" background-color="#fbf9fe"></load-more>-->
    <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
  </div>
</template>

<script>
  import {
    XHeader,
    LoadMore,
    Tab,
    TabItem
  } from 'vux'
  import {
    VueHeaderNav,
    VueShareit,
    VueLoad,
    VueLoading,
    VueLoadingTeam
  } from '../../component/'

  export default {
    components: {
      XHeader,
      LoadMore,
      VueHeaderNav,
      VueShareit,
      Tab,
      TabItem,
      VueLoad,
      VueLoading,
      VueLoadingTeam
    },
    data() {
      return {
        item: [],
        load: true,
        list4: ['直接粉丝', '间接粉丝'],
        index: 1,
        demo4: 1,
        show3: true,
        list: '',
        memberTeamInfo: [],
        member: [],
        type: 1,
        page: 1,
        alldata: [],
        erjiList: [],
      }
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
          link: '/user/index'
        }
      }
    },
    mounted() {
      var _this = this;
      _this.getAlldata();
      _this.$http.post(_this.$store.state.url + '/Homecenter/team_num', {
        // 'load': false,
        type: _this.type,
        page: _this.page,
        limit: 10,
      }).then((res) => {
        if (!res) return;
        _this.item = res;
      })


      // _this.$http.post(_this.$store.state.url + '/Homecenter/teamInfo', {
      //   'load': false,
      //   type: 2,
      //   page: 1,
      //   limit: 10,
      // }).then((res) => {
      //   if (!res) return;
      //   _this.list = res;
      //   _this.member = res.memberTeamInfo

      // })
    },
    methods: {
      getAlldata() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Homecenter/teamInfo', {
          'load': false,
          type: 1,
          page: 1,
          limit: 10,
        }).then((res) => {
          if (!res) return;
          _this.alldata = res;
        })
      },
      loaddatas(res) {
        var _this = this;
        _.each(res.memberTeamInfo, function(e) {
          _this.item = _this.item || [];
          _this.item.memberTeamInfo.push(e);
        })
      },
      loaddata(res) {
        var _this = this;
        _.each(res.memberTeamInfo, function(e) {
          _this.erjiList = _this.erjiList || [];
          _this.erjiList.memberTeamInfo.push(e);
        })
      },
      show(i) {
        let _this = this;
        _this.index = i;
        if (i == 1) {
          _this.type = i;
          _this.item = [];
          _this.$http.post(_this.$store.state.url + '/Homecenter/team_num', {
            'load': false,
            type: _this.type,
            page: 1,
            limit: 10,
          }).then((res) => {
            if (!res) return;
            _this.item = res;
          })
        } else if (i == 2) {
          _this.type = i;
          _this.item = [];
          _this.$http.post(_this.$store.state.url + '/Homecenter/team_num', {
            'load': false,
            type: _this.type,
            page: 1,
            limit: 10,
          }).then((res) => {
            if (!res) return;
            _this.erjiList = res;
          })
        }
      }
    }
  }
</script>

<style scoped>
  .team_main {
    background: #fff;
    min-height: -webkit-fill-available;
  }

  .team_title {
    display: flex;
    box-shadow: 2px 2px 10px #888888;
    padding: 10px 0;
  }

  .team_title .title_li {
    flex: 1;
    text-align: center;
  }

  .team_title .title_li+.title_li {
    border-left: 1px dotted #000;
  }

  .team_yi_list {
    background: #fff;
  }

  .team_yi_list .list {
    border-radius: 5px;
    box-shadow: 2px 2px 10px #888888;
    width: 95%;
    margin: 0 auto;
    padding: 10px 0;
    color: #2b2b2b;
    margin-top: 10px;
  }

  .team_yi_list .list .img {
    display: inline-block;
    width: 40px;
    margin-left: 10px;
    vertical-align: middle;
    border-radius: 50%;
    overflow: hidden;
  }

  .team_yi_list .list .nameAphone {
    display: inline-block;
    width: 140px;
    vertical-align: middle;
    color: #404040;
    line-height: 30px;
  }

  .team_yi_list .list .name {
    font-size: 14px;
  }

  .team_yi_list .list .txtAnumber {
    display: inline-block;
    width: 130px;
    text-align: right;
    vertical-align: middle;
    line-height: 30px;
  }

  .team_yi_list .list .txt {
    color: #999;
  }

  .team_yi_list .list .txtAnumber .number {
    color: #f9a74d;
    font-size: 16px;
  }
</style>
