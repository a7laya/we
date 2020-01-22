<template>
  <div class="hezuo huodong">
    <x-header :title="'智汇优库-分享竞赛'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="goBack()" class="header step">
    </x-header>
    <div class="tab_change">
      <tab :line-width="2">
        <!-- @click="demo3 = item" -->
        <tab-item bar-active-color="#F88509" :selected="demo3 === item" v-for="(item, index) in list3" :class="{'vux-1px-r': index===0}"
          @on-item-click="changeTab(item)" :key="index">{{item}}</tab-item>
      </tab>
    </div>


    <!-- 正在进行活动列表 -->
    <div class="listing" v-if="isShow == false">
      <div v-for="(li,index) in list" @click="xuanzhong(li,index)">
        <i :class="{'is_fix': isFixed == index}"></i>
        <span>{{li.title}}</span>
        <em>
          活动时间
          <strong style="color: #F88509;">{{li.start_time | returntime1}} ~ {{li.end_time | returntime1}}</strong>
        </em>
      </div>
      <span style="display: inline-block;width: 100%;text-align: center;" v-if="isjiazai">加载完成</span>
    </div>


    <!-- 历史竞赛活动 -->
    <div class="listing" v-if="isShow == true">
      <div v-for="(li,index) in list">
        <!-- <i :class="{'is_fix': isFixed == index}"></i> -->
        <span>{{li.title}}</span>
        <span style="color: #003BFF;font-size: 12px;float: right;" @click="edit(li)">重新启用</span>
        <em style="margin: 0;margin-top: 15px;">
          活动时间
          <strong>{{li.start_time | returntime1}} ~ {{li.end_time | returntime1}}</strong>
        </em>
      </div>
      <span style="display: inline-block;width: 100%;text-align: center;" v-if="isjiazai">加载完成</span>
    </div>

    <!-- 重新启用div -->
    <div class="share_data" v-if="isEdit" @click='isEdit = false'>
      <div @click.stop>
        <span>(例:<i style="color: #CD6363;">中华杯</i>-弱电知识竞赛)</span>
        <!-- <x-input max='13' v-model="shareTitle" class="shareInput" placeholder="输入自定义标题前缀"></x-input> -->
        <input type="text" v-model="shareTitle" class="shareInput" placeholder="输入自定义标题前缀" maxlength="13">
        <em>-弱电知识竞赛</em>
        <div class="title_time">
          <span>活动开始时间</span>
          <datetime ref="startTime" v-model="startTime" format="YYYY-MM-DD HH:mm" placeholder="开始时间"></datetime>
          <div style="width: 100%;height: 10px;"></div>
          <span>活动结束时间</span>
          <datetime ref="endTime" v-model="endTime" format="YYYY-MM-DD HH:mm" placeholder="结束时间"></datetime>
        </div>
        <x-button class="shareButton" @click.native="inputSure()">保存</x-button>
      </div>
    </div>

    <!-- 重新启用添加红包div -->
    <div class="share_data" v-if="isAdd" @click='isAdd = false' style="padding: 20px 0 30px 0;">
      <div @click.stop style="padding-bottom: 30px;">
        <div class="share_div">{{his_title}}</div>
        <p class="share_p">该题库剩余红包为0</p>
        <span v-for="(i,index) in tiku_list" style="margin: 0 auto;padding: 0;text-align: left;width: 80%;height: 40px;line-height: 40px;">
          {{i.typename}}  <span style="color: #c24f50;">(剩余红包0)</span>
          <i style="color: #007DDB;float: right;" @click="chongzhi(i.spon_id)">充值</i>
        </span>
      </div>
    </div>

    <!-- 进入页面显示提示分享步骤，三秒之后结束 -->
    <div class="prompt">
      选取活动，点击右上角分享给好友
    </div>
    <!-- <vue-shareit></vue-shareit> -->
    <help-share :title="fenxiang.shareTitle" :dese="fenxiang.shareDese" :link="fenxiang.shareLink" :imgUrl="fenxiang.shareimgUrl"></help-share>
  </div>

</template>

<script>
  import {
    XButton,
    XHeader,
    XTextarea,
    Checklist,
    Toast,
    Tab,
    TabItem,
    querystring,
    Datetime
  } from 'vux'
  import VueShareit from '../../component/game/gameShareit'
  import HelpShare from "../../component/game/helpShare";
  export default {
    inject: ['reload'],
    data() {
      return {
        list3: ['正在分享', '历史分享'],
        demo3: '正在分享',
        isFixed: -1,
        list: [],
        page: 1,
        limit: 10,
        type: 1,
        isShow: false, //判断显示进行活动还是历史活动
        startTime: '',
        endTime: '',
        shareTitle: '',
        isEdit: false,
        title_id: '',
        isAdd: false, //添加红包div
        isjiazai: false,
        tiku_list: [],
        title: '',
        shareId: '',
        his_title: '',
      }
    },
    components: {
      XHeader,
      XButton,
      XTextarea,
      Checklist,
      VueShareit,
      Toast,
      Tab,
      TabItem,
      querystring,
      Datetime,
      HelpShare
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      fenxiang() {
        if (this.title == 'null') {
          return {
            shareTitle: "智汇优库-弱电知识竞赛",
            shareDese: this.$store.state.user.mem_nickname +
              "分享给你Ta的题库！快去答题赢取奖励吧！",
            shareimgUrl: "/static/img/game/share.jpg",
            shareLink:
              "/game/onlyindex?specialUidkey=" + this.$store.state.user.mem_id + "&shareId=" + this.shareId

          };
        } else {
          return {
            shareTitle: this.title,
            shareDese: this.$store.state.user.mem_nickname +
              "分享给你Ta的题库！快去答题赢取奖励吧！",
            shareimgUrl: "/static/img/game/share.jpg",
            shareLink:
              "/game/onlyindex?specialUidkey=" + this.$store.state.user.mem_id + "&shareId=" + this.shareId
          };
        }
      },
    },
    mounted() {
      window.addEventListener('scroll', this.infor_scroll);
      var _this = this;
      //获取数据
      _this.getData(1);
      setTimeout(function() {
        $('.prompt').css('display', 'none')
      }, 3000)
    },
    watch: {
      'startTime': {
        handler() {
          var _this = this;
          let time = Date.parse(new Date()); //当前时间的时间戳
          let endTime = Date.parse(_this.endTime); //结束时间的时间戳
          let startTime = Date.parse(_this.startTime); //开始时间的时间戳
          if (startTime < time) {
            this.$refs.startTime.currentValue = ""
            msg('开始时间不得小于当前时间')
          }
          if (startTime > endTime) {
            this.$refs.startTime.currentValue = ""
            msg('开始时间不得大于结束时间')
          }
        },
        immediate: false
      },
      'endTime': {
        handler() {
          var _this = this;
          let time = Date.parse(new Date()); //当前时间的时间戳
          let endTime = Date.parse(_this.endTime); //结束时间的时间戳
          let startTime = Date.parse(_this.startTime); //开始时间的时间戳
          if (endTime < time) {
            this.$refs.endTime.currentValue = ""
            msg('结束时间不得小于当前时间')
          }
          if (startTime > endTime) {
            this.$refs.endTime.currentValue = ""
            msg('结束时间不得小于开始时间')
          }
        },
        immediate: false
      },
    },
    created() {},
    methods: {
      xuanzhong(data,id) {
        var _this = this;
        _this.isFixed = id
        _this.title = data.title
        _this.shareId = data.id
      },
      changeTab(data) {
        var _this = this;
        _this.demo3 = data;
        if (_this.demo3 == '正在进行活动') {
          _this.list = []
          _this.isShow = false;
          _this.type = 1;
          _this.page = 1;
          _this.getData(_this.type)
        } else if (_this.demo3 == '历史竞赛活动') {
          _this.list = []
          _this.isShow = true;
          _this.type = 2
          _this.page = 1;
          _this.getData(_this.type)
        }
      },
      getData(id) {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Applets/appletsActList', {
          load: false,
          type: id,
          page: _this.page,
          limit: _this.limit
        }).then((res) => {
          if (!res) return
          _this.list = res
        })
      },
      goBack() {
        // this.$router.back(-1)
        this.$router.go(-1)
      },
      //重新启用
      edit(data) {
        var _this = this;
        // _this.isAdd = true;
        //重新启用id
        _this.title_id = data.id
        if (data.red_sum == 0) {
          _this.isAdd = true;
          _this.isEdit = false;
          _this.tiKulist(_this.title_id)
        } else {
          _this.isEdit = true;
          _this.isAdd = false;
        }

      },
      //获取红包为0的题库列表
      tiKulist(id) {
        var _this = this
        _this.$http.post(_this.$store.state.url + '/Applets/sponsorList', {
          load: false,
          act_id: id,
        }).then((res) => {
          if (!res) return
          _this.tiku_list = res.sponsor_res
          _this.his_title = res.title
        })
      },
      //保存更新的数据
      inputSure() {
        var _this = this;
        //判断是否完善信息
        if (_this.shareTitle && _this.startTime && _this.endTime) {
          _this.$http.post(_this.$store.state.url + '/Applets/editActShare', {
            load: false,
            act_id: _this.title_id,
            start_time: _this.startTime,
            end_time: _this.endTime,
            title: _this.shareTitle
          }).then((res) => {
            if (!res) return
            msg('保存完成')
            _this.reload()
          })
        } else {
          msg('请填写完整')
        }
      },
      // 分页
      infor_scroll() {
        if ($(document).scrollTop() >= $('.listing').height() - $(window).height()) {
          this.page++
          var _this = this;
          _this.$http.post(_this.$store.state.url + '/Applets/appletsActList', {
            page: _this.page,
            limit: '10',
            type: _this.type
          }).then(function(res) {
            if (res.length == 0) {
              // msg('没有更多数据')
              _this.isjiazai = true
              return
            } else {
              for (let i in res) {
                _this.list.push(res[i])
              }
              return
            }
          })
        }
      },

      //充值
      chongzhi(id) {
        var _this = this
        _this.$router.push('/game/setHongbao/' + id)
      }


    },

  }
</script>

<style scoped>
  .hezuo {
    background: #fff;
    min-height: -webkit-fill-available;
  }

  .box {
    padding: 15px;
  }

  .active-6-1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
  }

  .active-6-2 {
    color: #04be02 !important;
    border-color: #04be02 !important;
  }

  .active-6-3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
  }

  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }

  .tab_change {
    border-top: 1px solid #eaeaea;
  }

  .listing {
    padding-top: 2.4rem;
  }

  .listing>div {
    width: 85%;
    margin: 0 auto;
    height: 70px;
    border-bottom: 1px solid #eaeaea;
  }

  .listing>div>span {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
  }

  .listing>div>i {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid #666;
    position: relative;
    top: 4px;
  }

  .listing>div>em {
    display: block;
    /* margin: 8px 0 0 0.5rem; */
    margin-top: 8px;
  }

  .is_fix {
    background: url(../../../../static/img/heiseduihao.png) no-repeat 0;
  }

  .prompt {
    background: #737171;
    opacity: 0.8;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 18%;
    width: 60%;
    height: 45px;
    line-height: 45px;
    color: #fff;
    text-align: center;
  }

  .share_data>div>p {
    width: 60%;
    margin: 10px auto 0;
    /* padding-top: 20px; */
    font-size: 16px;
    /* background: #8c8181; */
    /* opacity: 0.8; */
    text-align: center;
    border-radius: 10px;
    /* color: #fff; */
  }

  .share_data {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }

  .share_data>div {
    width: 80%;
    /* height: 183px; */
    margin: 0 auto;
    background: #F1F2F3;
    position: relative;
    top: 46%;
    border: 1px solid #E4E5E6;
    border-radius: 20px;
  }

  .share_data>div>span {
    display: block;
    width: 80%;
    text-align: center;
    margin: 0 auto;
    padding-top: 25px;
    font-size: 15px;
  }

  .share_data>div>em {
    display: inline-block;
    font-size: 15px;
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
    padding-bottom: 10px;
  }

  .title_time {
    width: 87%;
    margin: 0 auto;
    height: 30px !important;
    line-height: 30px;
    font-size: 14px;
    border-top: 2px solid #fff;
    padding-top: 10px;
  }

  a:link,
  a:active,
  a:visited,
  a:hover {
    display: inline-block !important;
    width: 58%;
    background: #fff;
    color: #666;
    height: 0.7rem;
    line-height: 0.7rem;
    border: 1px solid #666;
    text-align: left;
    text-indent: 5px;
    margin-left: 15px;
    padding: 0;
  }

  .shareInput {
    display: inline-block;
    width: 45%;
    font-size: 14px;
    display: inline-block;
    float: left;
    border: 1px solid #8D8C8C !important;
    padding: 0;
    margin: 20px 0 0 20px;
    height: 0.7rem;
    line-height: 0.7rem;

  }

  .weui-cell:before {
    border: 0px
  }

  .shareButton {
    width: 40%;
    position: relative;
    top: 20px;
    height: 35px;
    line-height: 35px;
    margin: 30px auto;
    background: #F88509;
    color: #fff;
    border-radius: 30px;

  }

  .vux-header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1111;
  }

  .vux-tab-wrap {
    position: fixed !important;
    top: 1.2rem !important;
    width: 100%;
  }

  .vux-header {
    background: #fff;
    border-bottom: 1px solid #eaeaea;
  }
  .share_div {
    width: 90%;
    text-align: center;
    margin: 20px auto 0;
    font-size: 18px;
    font-weight: bold;
  }
  .share_p {
    width: 80%!important;
    top: 37%;
    color: #c597a2!important;
    border-bottom: 2px solid #cecece;
    border-radius: 0!important;
    padding-bottom: 5px!important;
  }
</style>
