<template>
  <div class="container">
    <x-header class="header">
      <div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
      <div slot="overwrite-title" class="title" :style="borderColor">我的题库</div>
      <div slot="right" class="chutiRules" @click="isShowRules = true">出题规则</div>
    </x-header>
    <tab :line-width="3" active-color="#FF7F00" v-model="index" custom-bar-width="65px">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @on-item-click="go(index+1)"
        :key="index">{{item}}</tab-item>
    </tab>
    <div class="tab-swiper vux-center">
      <vue-list :type="type" :item="list" :result="result"></vue-list>
    </div>
    <!-- <div v-if="isFenxiang" id="share" @click="reInput = true">分享我的竞赛<br>可自定义标题</div> -->
    <!-- <div v-if="demo2 != '正在使用' || "> -->
      <div v-if="isFenxiang && index == 0" id="share" @click="reinput()">建立活动分享<br>可自定义标题</div>
    <!-- </div> -->
    <!-- 用户分享弹窗 -->
    <!-- <div class="share_data" v-if="reInput" @click="reInput = false"> -->
    <div class="share_data" v-if="reInput" @click="reinput1()">
      <div @click.stop>
        <span>(例:<i style="color: #CD6363;">中华杯</i>-弱电知识竞赛)</span>
        <!-- <x-input max='13' v-model="shareTitle" class="shareInput" placeholder="输入自定义标题前缀"></x-input> -->
        <input type="text" v-model="shareTitle" class="shareInput" placeholder="输入自定义标题前缀" maxlength="6">
        <em>-弱电知识竞赛</em>
        <p class="more">(标题最多可输入6个字符)</p>
        <div class="chang_title">
          <span v-for="v in fenxiang_arr" @click="titleClick(v.id)">
            <i class="xuanzhong" :class="{'is_fix':isFixed == v.id}"></i>
            {{v.name}}
          </span>
        </div>
        <div class="title_time" v-if="isDate">
          <span>活动开始时间</span>
          <datetime ref="startTime" v-model="startTime" format="YYYY-MM-DD HH:mm" placeholder="开始时间"></datetime>
          <div style="width: 100%;height: 10px;"></div>
          <span>活动结束时间</span>
          <datetime ref="endTime" v-model="endTime" format="YYYY-MM-DD HH:mm" placeholder="结束时间"></datetime>
        </div>
        <x-button class="shareButton" @click.native="inputSure()">保存</x-button>
      </div>
    </div>
    <!-- 保存可编辑弹窗 -->
    <!-- <div class="share_edit" v-if='reEdit' @click="reEdit = false"> -->
    <div class="share_edit" v-if='reEdit' @click="reedit()">
      <div @click.stop>
        <span>分享答题已保存，请点击屏幕右上角分享给好友！</span>
        <i style="display: inline-block;width: 100%;margin: 0 auto;text-align: center;padding-top: 20px;color: #999;">分享标题:</i>
        <em>{{shareTitle}}-弱电知识竞赛</em>
     <!--   <i @click="edit" style="color: #0115AF;">编辑</i>
        <i class="share_i">请点击右上角'...'分享</i> -->
      </div>
    </div>

    <!-- 创建活动保存按钮显示界面 -->
    <div class="share_edit" v-if='reCreate' @click="reCreateClick()">
      <div @click.stop>
        <span>答题活动已保存至“分享活动”中</span>
        <i style="display: inline-block;width: 100%;margin: 0 auto;text-align: center;padding-top: 20px;color: #999;">分享标题:</i>
        <em>{{shareTitle}}-弱电知识竞赛</em>
        <span style="padding-top: 10px;color: #0000FF;" @click="createClick()">前往分享</span>
     <!--   <i @click="edit" style="color: #0115AF;">编辑</i>
        <i class="share_i">请点击右上角'...'分享</i> -->
      </div>
    </div>
    <!-- <div id="reInput">
       <x-dialog
        v-model="reInput"
        class="dialog-backnone"
        :hide-on-blur="true"
        :dialog-style="{'max-width': '90%', width: '90%','max-height':'180px' ,height: '180px', 'background-color': '#fff','position': 'fixed', 'top': '65%'}"
      >
       <!-- <x-icon class="cose" type="ios-close" size="30" @click="reInput = false"></x-icon> -->
    <!-- <div class="reInputTitle">(例:中华杯-弱电知识竞赛))</div> -->
    <!-- <span class="labletitle">分享标题</span> -->
    <!--  <x-input v-model="shareTitle" class="shareInput" placeholder="输入自定义标题前缀"></x-input>
        <x-button class="shareButton" @click.native="inputSure()">确定</x-button>
      </x-dialog> -->

    <!-- </div> -->
    <!--出题规则-->
    <div class="data" style="position: relative;">
      <x-dialog v-model="isShowRules" class="dialog-backnone" :hide-on-blur="true">

        <div class="toufang">
          <!-- <x-icon type="ios-close-outline" style="fill:#000000;float: right;position: fixed;right: 12%;" @click="isShowRules=false"></x-icon> -->
          <x-icon type="ios-close-outline" style="fill:#000000;float: right;" @click="isShowRules=false"></x-icon>
          <div class="inner">
            <h3 class="title">竞赛介绍</h3>
            <ul class="detail">
              <li>弱电知识竞赛是一款全民H5答题活动，玩家可通过答题方式学习弱电行业专业知识、掌握行业动态信息。还可以赢取某企业赞助发放的实物大奖。同时竞赛活动支持自主上传，发起竞赛题库，获得弱电行业参与者的共鸣，提高企业、品牌、厂商、代理商等在弱电行业内的知名度。</li>
            </ul>
          </div>
          <div class="inner">
            <h3 class="title">发起竞赛题库规则</h3>
            <ul class="detail">
              <li style="padding-bottom: 20px">
                <p>1、竞赛题库必须根据弱电行业内的专业知识、品牌文化、项目案例、企业动态等相关信息来发起。禁止发起与弱电行业无关的竞赛题库。</p>2、发起题库分为两部分：
                <br />① 标题区：问答题目。
                <br />② 选择区：正确答案和错误答案。
                <br />玩家答对后过关领取红包，答错后可重新答题。
                <br />3、为了能够起到最佳的宣传推广效应，请选择难易适中的题目。
                <br />4、请至少上传5道以上题目（推荐数量50道以上题库）。
                <br />5、同一行业分类，每位发起人只能发起一个竞赛题库。
                <br />6、发起题库需要和红包同步进行。投放竞赛答题红包，是为了快速精准拉取行业内专业人士的关注。
                <br />7、添加题库提交并充值，经过智汇优库客服专员审核后正式上线。
                <br />
                <p>8、题库内容不得进行任何侵犯智汇优库的知识产权的行为，不得涉及黄、赌、毒、政等相关违纪违法行为，发起人必须为自己发起的所有题库内容负责，并承担由此产生的任何后果。</p>
              </li>
            </ul>
          </div>
        </div>
      </x-dialog>
    </div>
    <help-share :title="fenxiang.shareTitle" :dese="fenxiang.shareDese" :link="fenxiang.shareLink" :imgUrl="fenxiang.shareimgUrl"></help-share>
  </div>
</template>

<script>
  import {
    XHeader,
    Badge,
    Grid,
    GridItem,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    XDialog,
    XInput,
    XButton,
    Datetime
  } from "vux";
  import VueList from "../../component/game/tiku";
  import HelpShare from "../../component/game/helpShare";
  const list = () => ["正在使用", "创建题库", "历史题库"];
  export default {
    components: {
      XHeader,
      Badge,
      Grid,
      GridItem,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      VueList,
      HelpShare,
      XDialog,
      XInput,
      XButton,
      Datetime
    },
    data() {
      return {
        list: null,
        result: null,
        borderColor: {
          borderColor: "#333333"
        },
        index: 0,
        list2: list(),
        demo2: "正在使用",
        type: 1,
        addect: true, // 编辑图片
        isShowRules: false,
        shareBoxShow: false,
        historyList: false,
        reInput: false,
        shareTitle: '',
        shareTitleId: 'null',
        data_list: [],
        reEdit: false,
        data_res: '',
        shareUidk: '',
        isFenxiang: true, //判断是否显示分享按钮
        fenxiang_arr: [{
            id: 0,
            name: '分享'
          },
          {
            id: 1,
            name: '创建活动'
          }
        ],
        isFixed: 0,
        isDate: false,
        startTime: '',
        endTime: '',
        reCreate: false,
      };
    },
    computed: {
      // type为 1 题库分享
      user() {
        return this.$store.state.user;
      },
      fenxiang() {

        if (this.shareTitleId == 'null') {
          return {
            shareTitle: "智汇优库-弱点知识竞赛",
            shareDese: this.$store.state.user.mem_nickname +
              "分享给你Ta的题库！快去答题赢取奖励吧！",
            shareimgUrl: "/static/img/game/share.jpg",
            shareLink:
              //        "/game/index?shareTitleId=" + this.shareTitleId + '&uidkey=' + this.shareUidk + '&fenurl=' + '/game/index'
              //        "/game/index?shareTitleId=" + this.shareTitleId
              "/game/index?specialUidkey=" + this.$store.state.user.mem_id + "&shareTitleId=" + this.shareTitleId

          };
          // sessionStorage.removeItem('data_list')
        } else {
          return {
            shareTitle: this.shareTitle+'-弱点知识竞赛',
            shareDese: this.$store.state.user.mem_nickname +
              "分享给你Ta的题库！快去答题赢取奖励吧！",
            shareimgUrl: "/static/img/game/share.jpg",
            shareLink:
              //        "/game/index?shareTitleId=" + this.shareTitleId + '&uidkey=' + this.shareUidk + '&fenurl=' + '/game/index'
              //        "/game/index?shareTitleId=" + this.shareTitleId
              "/game/index?specialUidkey=" + this.$store.state.user.mem_id + "&shareTitleId=" + this.shareTitleId
          };
          // sessionStorage.removeItem('data_list')
        }

      }
    },
    mounted() {
      // var _this = this
      console.log(this.$store.state.user.mem_id)
    },
    beforeRouteLeave(to, from, next) {
      if (from.path == '/game/tiku') {
        sessionStorage.removeItem('data_list')
      }
      next()
    },
    created() {
      this.go(this.type);
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
            msg('开始时间不得小于等于当前时间')
          }
          if (startTime > endTime) {
            this.$refs.startTime.currentValue = ""
            msg('开始时间不得大于等于结束时间')
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
		 $route(to,from){
		    console.log('to.path');
		    console.log(to.path);
		  }
    },
		
    methods: {
      createClick() {
        this.$router.push('./sharelist')
      },
      titleClick(id) {
        if (id == 1) {
          this.isDate = true
        } else {
          this.isDate = false
        }
        this.isFixed = id
      },
      reedit() {
        if (sessionStorage.getItem('data_list')) {
          this.reEdit = false;
          this.isFenxiang = true;
        } else {
          // this.isFenxiang = true
          msg('请选择题库')
        }
      },
      reCreateClick() {
        this.reCreate = false;
        this.isFenxiang = true;
      },
      reinput1() {
        if (sessionStorage.getItem('data_list')) {
          this.reInput = false;
          this.isFenxiang = true;
        } else {
          // this.isFenxiang = true
          msg('请选择题库')
        }
      },
      //点击分享我的题库按钮  出现分享div
      reinput() {
        if (sessionStorage.getItem('data_list')) {
          this.reInput = true;
          this.isFenxiang = false;
        } else {
          msg('请选择题库')
        }

      },
      edit() {
        this.reEdit = false;
        this.reInput = true;
      },
      inputSure() {
        var _this = this;
        //选择的题库信息
        _this.data_list = sessionStorage.getItem('data_list');
        // 判断选择题库
        console.log('_this.starttime')
        console.log(_this.startTime)
        console.log(_this.endTime)
        if (_this.data_list) {
          // 判断是否填写标题
          if (_this.shareTitle !== '') {
            //判断是创建活动还是分享 isFixed=0是分享 =2是创建活动 (type为1是分享 type为2是创建活动)
            if (_this.isFixed == 0) {
              // 判断是第一次填写还是更新
              if (!_this.data_res) {
                _this.$http
                  .post(_this.$store.state.url + "/Applets/seed_share_assist", {
                    load: true,
                    title: _this.shareTitle + "弱电知识竞赛",
                    sponsor_id: _this.data_list,
                    start_time: 0,
                    end_time: 0,
                    type: 1
                  })
                  .then(function(res) {
                    if (!res) return;
                    _this.data_res = res;
                    msg('保存成功，点击右上角去分享给好友吧')
                    _this.shareTitleId = res.id;
                    _this.shareUidk = res.uid;
                    _this.reEdit = true;
                    _this.reInput = false
                    sessionStorage.setItem('shareTitleId', _this.shareTitleId)
                    sessionStorage.setItem('title', _this.shareTitle + "-弱电知识竞赛")
                  });
              } else {
                _this.$http
                  .post(_this.$store.state.url + "/Applets/update_assist", {
                    load: true,
                    title: _this.shareTitle + "弱电知识竞赛",
                    sponsor_id: _this.data_list,
                    id: _this.data_res.id
                  })
                  .then(function(res) {
                    if (!res) return;
                    if (res == '404') {
                      msg('编辑失败，请重新编辑');
                      _this.reEdit = false;
                      _this.reInput = true;
                    } else {
                      msg('编辑成功，点击右上角去分享给好友吧')
                      _this.reInput = false;
                      _this.reEdit = true;
                      _this.shareTitleId = res.id;
                      _this.shareUidk = res.uid;
                      sessionStorage.removeItem('shareTitleId')
                      sessionStorage.removeItem('title')
                      sessionStorage.setItem('shareTitleId', _this.shareTitleId)
                      sessionStorage.setItem('title', _this.shareTitle + "-弱电知识竞赛")
                    }
                  });
              }
            } else if(_this.isFixed == 1) {
              if (_this.startTime =='' || _this.endTime == '') {
                msg('请选择时间')
              } else {
                _this.$http
                  .post(_this.$store.state.url + "/Applets/seed_share_assist", {
                    load: true,
                    title: _this.shareTitle + "弱电知识竞赛",
                    sponsor_id: _this.data_list,
                    start_time: _this.startTime,
                    end_time: _this.endTime,
                    type: 2
                  })
                  .then(function(res) {
                    if (!res) return;
                    _this.reInput = false;
                    _this.reCreate = true
                  });
              }



            }

          } else {
            msg('请输入分享标题')
          }

        } else {
          msg('请选择题库')
        }


      },
      go(type) {
        this.type = type;
        let _this = this;
        _this.list = [];
        if (type === 1) {
          _this.$http
            .post(_this.$store.state.url + "/Applets/sponsor_use", {
              load: true
            })
            .then(function(res) {
              if (res.length == 0) {
                _this.isFenxiang = false
              }
              if (!res) {
                return
              };
              _this.list = res;
              _this.result = res.result;
            });
        } else if (type === 2) {
          _this.$http
            .post(_this.$store.state.url + "/Applets/sponsor_library", {
              load: true
            })
            .then(function(res) {
              if (!res) return;
              _this.list = res;
            });

        } else if (type === 3) {
          _this.$http
            .post(_this.$store.state.url + "/Applets/sponsor_history", {
              load: true
            })
            .then(function(res) {
              if (!res) return;
              _this.list = res;
              _this.result = res.result;
            });
        }
      },
      goBack() {
        this.$router.push("/game/GameMine");
      }
    }
  };
</script>

<style scoped>
  .is_fix {
    background: url(../../../../static/img/heiseduihao.png) no-repeat 0;
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

  .chutiRules {
    color: #ff7f00;
    font-size: 12px;
  }

  .toufang {
    background: #ffffff;
    height: 400px;
    text-align: left;
    overflow: auto;
  }

  .inner {
    width: 280px;
    margin: 0px auto;
  }

  .inner .title {
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  ul li {
    overflow: hidden;
    margin-top: 10px;
  }

  #share {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 100px;
    height: 40px;
    padding: 10px;
    border-radius: 50px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    background: #3f8aea;
  }

  #shareBox {
    position: relative;
  }

  #shareBox .bottom {
    background: #fff;
    overflow: hidden;
  }

  #shareBox .bottom .history {
    width: 50%;
    float: left;
  }

  #shareBox .bottom .history span {
    display: inline-block;
    width: 40px;
    height: 40px;
    padding: 10px;
    background: #46843c;
    color: #fff;
    font-size: 14px;
    text-align: center;
    border-radius: 50%;
    margin-top: 20px;
  }

  #shareBox .bottom .reInput {
    width: 100%;
    float: left;
  }

  #shareBox .bottom .reInput span {
    display: inline-block;
    width: 40px;
    height: 40px;
    padding: 10px;
    background: #af7373;
    color: #fff;
    font-size: 14px;
    text-align: center;
    border-radius: 50%;
    margin-top: 20px;
  }

  .reInputTitle {
    font-size: 16px;
    font-weight: bold;
    padding: 10px
  }

  .labletitle {
    text-align: left;
    font-size: 14px;
    color: #333333;
    display: inline-block;
    width: 90%;
    margin: 20px auto 0px
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

  .cose {
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 6px 6px;
    color: rgba(0, 0, 0, 0.59);
    cursor: pointer;
    font-size: 25px;
    opacity: 0.3;
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
    top: 30%;
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
  }

  .share_edit {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }

  .share_edit>div {
    width: 90%;
    height: 183px;
    margin: 0 auto;
    background: #F1F2F3;
    position: relative;
    top: 53%;
    border: 1px solid #E4E5E6;
    border-radius: 20px;
  }

  .share_edit>div>span {
    display: block;
    width: 92%;
    text-align: center;
    margin: 0 auto;
    padding-top: 25px;
    font-size: 0.35rem;
    color: #999999;
  }

  .share_edit>div>em {
    display: inline-block;
    width: 80%;
    text-align: center;
    margin-top: 20px;
    margin-left: 0.85rem;
    font-size: 15px;
    color: #F88509;
    background: #fff;
    border-radius: 5px;
    height: auto;
    line-height: 30px;
  }

  .share_i {
    display: block;
    width: 80%;
    font-size: 15px;
    margin: 0 auto;
    text-align: center;
    padding-top: 26px;
  }

  .chang_title {
    height: 30px;
    padding-top: 8px;
    /* line-height: 30px; */
    font-size: 14px;
    font-weight: bold;
    width: 89%;
    margin: 0 auto;
    border-top: 2px solid #fff;
  }

  .chang_title>span {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    width: 50%;
  }

  .chang_title :first-child {
    text-align: center;
  }

  .chang_title :last-child {
    text-align: left;
  }

  .xuanzhong {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    border: 1px solid #666;
    position: relative;
    top: 3px;
  }

  .title_time {
    width: 87%;
    margin: 0 auto;
    height: 30px !important;
    line-height: 30px;
    font-size: 14px;
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
  .more {
    width: 88%;
    margin: 0 auto;
    color: #8D8C8C;
  }
</style>
