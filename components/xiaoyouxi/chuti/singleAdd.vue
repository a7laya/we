<template>
  <div class="hezuo huodong">
    <x-header :title="'添加题目'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="goBack()"
              class="header step"></x-header>
    <div id="tab">
      <tab :line-width=2 active-color='#FF7F00' v-model="index" custom-bar-width="90px">
        <tab-item class="vux-center" v-for="(item, index) in list2" @on-item-click="goTab(index+1)" :key="index">{{item}}</tab-item>
      </tab>
    </div>
    <div class="mineRankCenter" v-show="typeTab === 1">
      <div class="gameRankData">
        <div class="tishi1">
          <img src="/static/img/game/shuru.png" alt="">
          <p>请输入简洁明了的问题</p>
        </div>
        <div class="w-textarea">
          <textarea v-model="form.problem" placeholder="填写题干（不超过60个字）"
                        onfocus="this.placeholder=''"
                        onblur="this.placeholder='填写题干（不超过60个字）'"
                        maxlength="60"
                        @blur="blur1()"
                        onchange="this.value=this.value.substring(0, 60)"
                        onkeydown="this.value=this.value.substring(0, 60)"
                        onkeyup="this.value=this.value.substring(0, 60)"></textarea>
          <span style="color: red;font-size: 11px" v-show="flag1">题干不能为空</span>
        </div>
      </div>
      <div class="gameRankData2">
        <div class="tishi1">
          <img src="/static/img/game/wentifankui.png" alt="">
          <p>请输入并最少勾选一项为正确选项</p>
        </div>
        <div class="w-textarea">
          <label style="display: block;overflow: hidden;margin-bottom: 10px">
            <input type="radio" name="type" id="adviceRadio1" value="1" v-model="checkedValue" hidden/>
            <label for="adviceRadio1" class="advice"></label>
            <textarea v-model="answer1" placeholder="请输入选项(最多可输入10个字）"
                      onfocus="this.placeholder=''"
                      onblur="this.placeholder='请输入选项(最多可输入10个字）'"
                      @blur="blur2()"
                      maxlength="20"
                      onchange="this.value=this.value.substring(0, 10)"
                      onkeydown="this.value=this.value.substring(0, 10)"
                      onkeyup="this.value=this.value.substring(0, 10)"></textarea>
            <span style="color: red;font-size: 11px;padding-left: 40px" v-show="flag2">选项不能为空</span>
          </label>
          <label style="display: block;overflow: hidden;margin-bottom: 10px">
            <input type="radio" name="type" id="adviceRadio2" value="2" v-model="checkedValue" hidden/>
            <label for="adviceRadio2" class="advice"></label>
            <textarea v-model="answer2" placeholder="请输入选项(最多可输入10个字）"
                      onfocus="this.placeholder=''"
                      onblur="this.placeholder='请输入选项(最多可输入10个字）'"
                      @blur="blur3()"
                      maxlength="10"
                      onchange="this.value=this.value.substring(0, 10)"
                      onkeydown="this.value=this.value.substring(0, 10)"
                      onkeyup="this.value=this.value.substring(0, 10)"></textarea>
            <span style="color: red;font-size: 11px;padding-left: 40px" v-show="flag3">选项不能为空</span>
          </label>
        </div>
      </div>
      <div class="gameRankData3">
<!--        <x-button class="jixvUpdate" @click.native="jixvUpdate()">继续上传</x-button>-->
        <x-button class="checked"  @click.native="shenhe()">提交审核</x-button>
        <div class="action">
          <span class="tishi">温馨提示：</span>
          <br>
          <span>1.选题请务必与弱电行业知识相关。</span>
          <br>
          <span>2.为了给用户好的体验请选择难易适中的题目。</span>
          <br>
          <span>3.请至少上传五道题以供作答。</span>
        </div>
      </div>
    </div>
    <div id="excel" v-show="typeTab === 2">
      <div class="mineRankCenter">
        <a :href = "href" class="down weui-btn" :download = "href">下载题库模版</a>
        <div class="up">
          一键上传附件
          <input type="file" @change="upExcel($event)" name="file" accept="xlsx"/>
        </div>
      </div>
      <div class="gameRankData3">
        <div class="action">
          <span class="tishi">温馨提示：</span>
          <br>
          <span>1.选题请务必与弱电行业知识相关。</span>
          <br>
          <span>2.为了给用户好的体验请选择难易适中的题目。</span>
          <br>
          <span>3.请至少上传五道题以供作答。</span>
        </div>
      </div>
    </div>
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText"
           :position="position"></toast>
    <vue-shareit></vue-shareit>
  </div>

</template>

<script>
  import {XButton, XHeader, XTextarea, Toast, Checklist, Tab, TabItem} from 'vux'
  import VueShareit from '../../component/game/gameShareit'
  const list = () => ['手机端逐条录入', '电脑端批量导入']
  const defaultListQuery = {
    problem: '',
    answer_group: [],
    answer_num: []
  }
  export default {
    data () {
      return {
        imgindex: 0,
        imglist: [],
        industry: null, // 行业
        business: null, // 业务类型
        imgShow: false,
        colorShow: true,
        checkedValue: 1,
        borderColor: {
          borderColor: '#333'
        },
        form: Object.assign({}, defaultListQuery),
        topic: [], // 组合全部数据
        answer1: '',
        answer2: '',
        answer_num: null,
        showPositionValue: false,
        toastText: '上传成功，等待审核',
        position: 'middle',
        flag1: false,
        flag2: false,
        flag3: false,
        index: 0,
        href: '',
        wordurl: '',
        list2: list(),
        typeTab: 1
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
      TabItem
    },
    mounted () {
      var _this = this
      _this.$http.post(_this.$store.state.url + '/activityb/new_caver_money', {
        load: true
      }).then(function (res) {
        if (!res) return
        _this.moneylist = res
      })
      _this.href = _this.$store.state.website.website_address + '/static/题库模版.xlsx'
    },
    watch: {
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      blur1 () {
        if (this.form.problem == '') {
          this.flag1 = true
        } else {
          this.flag1 = false
        }
      },
      blur2 () {
        if (this.answer1 == '') {
          this.flag2 = true
        } else {
          this.flag2 = false
        }
      },
      blur3 () {
        if (this.answer2 == '') {
          this.flag3 = true
        } else {
          this.flag3 = false
        }
      },
      jixvUpdate () {
        // 向topic里面添加数据
        this.form.answer_num = this.checkedValue
        this.form.answer_group.push(this.answer1, this.answer2)
        this.topic.push(this.form)
        // 清除数据
        this.form = Object.assign({}, defaultListQuery)
        this.form.answer_group = []
        this.answer1 = null
        this.answer2 = null
        this.checkedValue = 1
        this.form.answer_num = null
      },
      shenhe () {
        if(this.form.problem == ''){
          this.flag1 = true
        }else if (this.answer1 == '') {
          this.flag2 = true
        }else if(this.answer2 == ''){
          this.flag3 = true
        }else {
          var _this = this
          _this.jixvUpdate()
          _this.$http.post(_this.$store.state.url + '/Applets/add_topic', {
            'load': false,
            'sopnsor_id': this.$route.params.id,
            'hangye_id': this.$route.params.hangyeid,
            'topic': _this.topic
          }).then((res) => {
            _this.topic = []
            _this.showPositionValue = true
          })
        }
      },
      goBack () {
        this.$router.back(-1)
      },
      upExcel (e) {
        let _this = this
        let file = e.target.files[0]
        let param = new FormData() // 创建form对象

        param.append('word', file) // 通过append向form对象添加数据,
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        } // 添加请求头
        this.$store.commit('loadingOFFON', true)
        _this.$http.post(_this.$store.state.url + '/Common/get_document', param, config).then(function (res) {
          if (!res) return
          _this.updateData(res.wordurl)
        })
      },
      updateData (file) {
        var _this = this
        _this.$http.post(_this.$store.state.url + '/Applets/applets_sponsor_import', {
          'load': false,
          'sponsor_id': parseInt(this.$route.params.id),
          'hangye_id': this.$route.params.hangyeid,
          file: file
        }).then((res) => {
          _this.showPositionValue = true
        })
      },
      goTab (i) {
        this.typeTab = i
      }
    }
  }
</script>

<style scoped>
  .hezuo {
    background: #fff;
    min-height: -webkit-fill-available;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #999 !important;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #999 !important;
  }

  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #999 !important;
  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #999 !important;
  }

  .grey {
    background: #dddddd !important;
  }

  .mineRankCenter {
    background: #F2F2F2;
    padding-top: 10px;
  }

  .gameRankData {
    background: #fff;
  }

  .gameRankData .w-textarea {
    width: 345px;
    padding: 20px 15px 15px;
  }

  .gameRankData .w-textarea textarea {
    height: 50px;
    width: 325px;
    background-color: #F7F7F7;
    border: 0;
    padding: 15px 10px 10px;
  }

  .gameRankData .tishi1 {
    padding: 20px 15px 0px;
  }

  .gameRankData .tishi1 img {
    display: inline-block;
    width: 25px;
    height: 21px;
    margin-right: 10px;
  }

  .gameRankData .tishi1 p {
    display: inline-block;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }


  .gameRankData2 {
    background: #fff;
    margin-top: 10px;
  }

  .gameRankData2 .w-textarea {
    width: 345px;
    padding: 20px 15px 15px;
  }

  .gameRankData2 .w-textarea textarea {
    height: 20px;
    width: 260px;
    background-color: #F7F7F7;
    border: 0;
    padding: 10px 15px 10px;
  }

  .gameRankData2 .tishi1 {
    padding: 20px 15px 0px;
  }

  .gameRankData2 .tishi1 img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .gameRankData2 .tishi1 p {
    display: inline-block;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }

  .weui-cells_radio .weui-cell__ft {
    padding-left: 0;
    width: 24px;
    height: 24px;
    background: #eee;
    border-radius: 50px;
    display: inline-block;
  }

  .advice {
    float: left;
    height: 26px;
    width: 26px;
    border-radius: 50px;
    display: inline-block;
    background-image: url('/static/img/game/uncheck.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: middle;
    margin-top: 6px;
    /*   margin-bottom: 30px;*/
    margin-right: 10px;
  }

  input[type="radio"]:checked + .advice {
    background-image: url('/static/img/game/check.png');
  }

  .gameRankData3 {
    background: #FFFFFF;
    margin-top: 10px;
    padding-top: 24px;
  }


  .checked {
    width: 269px;
    margin: 0 auto;
    color: #fff;
    border: 1px solid #FFAA01;
    background: -webkit-linear-gradient(left, #FF7F00, #FFAA01); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF7F00, #FFAA01); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF7F00, #FFAA01); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF7F00, #FFAA01); /* 标准的语法 */
    border-radius: 50px;
    margin-top: 20px;
  }

  .action {
    /*width: 100%;*/
    height: 92px;
    background: #FFEACE;
    margin-top: 26px;
    padding: 20px 30px;
    color: #976421;
    line-height: 22px;
    margin-bottom: 20px;
  }

  .action .tishi {
    width: 100%;
    height: 92px;

    font-weight: bold;
    margin-top: 26px;
  }
  .refuse{
    text-align: right;
    color: #D42E2E;
    font-size: 12px;
  }
  textarea{
    resize:none
  }
  .weui-btn:after {
    border: 0px;
  }
  .down {
    width: 7.146667rem;
    margin: 0 auto;
    background: -webkit-linear-gradient(left, #FF7F00, #FFAA01);
    background: linear-gradient(to right, #FF7F00, #FFAA01);
    margin-top: 30px;
    color: #FFFFFF;
    border-radius: 1.333333rem;
  }

  .up {
    width: 7.146667rem;
    margin: 16px auto 0;
    background: -webkit-linear-gradient(left, #FF7F00, #FFAA01);
    background: linear-gradient(to right, #FF7F00, #FFAA01);
    color: #FFFFFF;
    border-radius: 1.333333rem;
    line-height: 2.33333333;
    display: block !important;
    font-size: 17px;
    text-align: center;
    position: relative;
  }

  .up input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  #excel .mineRankCenter {
    background: #FFFFFF;
  }
</style>
