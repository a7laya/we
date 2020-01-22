<template>
  <div class="hezuo huodong">
    <x-header :title="'修改题目'"
              :left-options="{backText:'',preventGoBack:true}"
              @on-click-back="goBack()"
              class="header step">
    </x-header>
    <div class="mineRankCenter">
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
          <p class="refuse" v-if="form.refuse">审核理由：{{form.refuse}}</p>
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
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText"
           :position="position"></toast>
    <vue-shareit></vue-shareit>
  </div>

</template>

<script>
  import {XButton, XHeader, XTextarea, Checklist, Toast} from 'vux'
  import VueShareit from '../../component/game/gameShareit'
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
        imgShow: false,
        moneylist: null,
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
        flag3: false
      }
    },
    components: {
      XHeader,
      XButton,
      XTextarea,
      Checklist,
      VueShareit,
      Toast
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    watch: {},
    created () {
      this.getData()
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
      goBack () {
        this.$router.back(-1)
      },
      getData () {
        var _this = this
        _this.$http.post(_this.$store.state.url + '/Applets/topic_edit', {
          'load': false,
          'topic_id': this.$route.params.id
        }).then((res) => {
          _this.form = res
          _this.answer1 = res.answer_group[0]
          _this.answer2 = res.answer_group[1]
          _this.checkedValue = res.answer_num
        })
      },
      shenhe () {
        if (this.form.problem == '') {
          this.flag1 = true
        } else if (this.answer1 == '') {
          this.flag2 = true
        } else if (this.answer2 == '') {
          this.flag3 = true
        } else {
          var _this = this
          _this.$http.post(_this.$store.state.url + '/Applets/updaadd_topicte_topic_edit', {
            'load': false,
            'id': this.$route.params.id,
            'problem': _this.form.problem,
            'answer_group': [_this.answer1, _this.answer2],
            'answer_num': _this.checkedValue
          }).then((res) => {
            _this.showPositionValue = true
            _this.timer = setInterval(() => {
              this.$router.back(-1)
            }, 1000)
          })
        }
      }
    },
    beforeDestroy () {
      clearInterval(this.timer);
      this.timer = null;
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
    background: -webkit-linear-gradient(left, #FF7F00, #FFAA01); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF7F00, #FFAA01); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF7F00, #FFAA01); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF7F00, #FFAA01); /* 标准的语法 */
    color: #FFFFFF;
    border: 1px solid #FFAA01;
    border-radius: 50px;
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
</style>
