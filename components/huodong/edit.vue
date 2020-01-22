<template>
  <div class="hezuo huodong">

    <div>
      <x-header :title="'编辑活动'" :left-options="{backText:''}" class="header step"></x-header>
      <div class="biaodin3">
        <x-input v-model="form.subject" :max="5" placeholder="请输入最多五个字" style="font-size: 15px;">
          <div slot="label" class="ban_title bottom" style="margin-right: 10px;">
            <strong>*</strong>
            <span>{{form.name|person}}简称:</span>
          </div>
        </x-input>
        <x-input v-model="form.totalmoney" type="number" placeholder="填写0元活动免费" style="border-bottom: 1px solid #D9D9D9;font-size: 15px;">
          <div slot="label" class="ban_title" style="margin-right: 10px;">
            <strong>*</strong>
            <span>设置收费标准(元/人):</span>
          </div>
        </x-input>
      </div>

      <div class="biaodin3">
        <div class="ban_title" style="margin:0 0 10px  0;">
          <strong>*</strong>
          <span>请编辑活动详情</span>
        </div>
        <vue-html5-editor content="" @change="updateData($event)" :content="content"></vue-html5-editor>
        <!--<div class="hezuo_tishiyuyan" style="margin-top: 10px;">完善的个人信息有助于提升您的真实指数，请认真填 写以下内容</div>-->
        <group gutter="0">

          <div class="labelclass2 weui-cell">
            <div slot="label" class="ban_title weui-cell__hd">
              <strong>*</strong>
              <span>报名截止时间:</span>
            </div>
            <span class="fontsize14px">{{form.endtime}}</span>
           <!-- <datetime v-model="form.endtime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary"
              placeholder="请选择报名截止时间"></datetime> -->
          </div>
          <div class="labelclass2 weui-cell" v-if="is_many == 0">
            <div slot="label" class="ban_title weui-cell__hd">
              <strong>*</strong>
              <span>活动开始时间:</span>
            </div>
            <datetime v-model="form.starttime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary"
              placeholder="请选择活动开始时间"></datetime>
          </div>
          <span v-if="is_many == 1">场次时间</span>
          <div class="moredate" v-if="is_many == 1" v-for="(item,index) in many_arr">
            <span>第{{index+1}}场</span>
            <!-- <datetime @on-change="change_data(item.id,index,item.endtime)" v-model="aaa[index]" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary" :placeholder="item.starttime"></datetime> -->
            <!-- <datetime @on-change="end_data(item.id,index,item.starttime)" v-model="aaa[index]"  format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary" :placeholder="item.endtime"></datetime> -->
            <span style="color: #F88509;">{{item.starttime}}</span><span>到</span>
            <span style="color: #F88509;">{{item.endtime}}</span>
          </div>
          <!--<div class="labelclass2 weui-cell">
						<div slot="label" class="ban_title weui-cell__hd">-->
          <!--<strong>*</strong>-->
          <!--<span>活动结束时间:</span>
						</div>
						<datetime v-model="form.orvertime" format="YYYY-MM-DD HH:mm" class="weui-cell__bd weui-cell__primary" placeholder="请选择活动结束时间"></datetime>
					</div>-->

        </group>
      </div>
      <div class="biaodin4">
        <div class="button_max " @click="upform">保存</div>
      </div>

    </div>

  </div>

</template>

<script>
  import {
    XHeader,
    XTextarea,
    Group,
    XInput,
    Datetime,
    CheckIcon,
    XDialog,
    TransferDom,
    Swiper,
    SwiperItem
  } from 'vux'
  import {
    VueStep,
    VueCropper,
    VueFileZip,
    VueCode,
    VueAddress,
    VueXieyi
  } from '../component'
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        imgindex: 0,
        imglist: [],
        form: {
          industry: null, //行业
          business: null, //业务类型
          theme: '活动主题', //活动主题
          imgurl: null, //图片地址
          totalmoney: null, //活动赞助
          caver_money: [], //费用明细
          remarks: null, //活动详情
          subject: null, //个人/单位名称
          region: null, //地区
          specreg: null, //具体地址
          endtime: null, //报名截止日期
          starttime: null, //活动开始时间
          orvertime: null, //活动结束时间
          name: null

        },
        imgShow: false,
        moneylist: null,
        colorShow: true,
        info: '',
        content: '',
        is_many: '', //0 单场 1 多场
        many_arr: [], //多场活动时间
        endTime:'',
        startTime: '',
        next: [],
        data_arr: [],
        s_time: '',
        e_time: '',
        aaa_0: '',
        bbb_0: '',
        act_is_many: '',

      }
    },
    components: {
      Group,
      VueStep,
      VueCropper,
      XHeader,
      XTextarea,
      VueFileZip,
      XInput,
      VueCode,
      VueAddress,
      Datetime,
      VueXieyi,
      CheckIcon,
      XDialog,
      Swiper,
      SwiperItem

    },
    mounted() {
      var _this = this;
      _this.detail();
    },

    methods: {
      // change_data(id,index,enddata) {
      //   var _this = this;
      //   if (_this.data_arr == 0) {
      //     _this.data_arr.push(
      //       {'id':id,
      //       'starttime':_this.aaa[index],
      //       'endtime':enddata}
      //     )
      //   } else {
      //     for (let i = 0; i < _this.data_arr.length; i++) {
      //       console.log('s_data')
      //       console.log(_this.data_arr[i].id)
      //       console.log(id)
      //       if(_this.data_arr[i].id == id) {
      //         _this.data_arr[i].starttime = _this.aaa[index]

      //         break
      //       } else {
      //         _this.data_arr.push(
      //           {'id':id,
      //           'starttime':_this.aaa[index],
      //           'endtime':enddata}
      //         )
      //         break
      //       }

      //     }
      //   }
      // },
      // end_data(id,index,startdata) {
      //   var _this = this;
      //   if (_this.data_arr == 0) {
      //     _this.data_arr.push(
      //       {'id':id,
      //       'starttime':startdata,
      //       'endtime':this.aaa[index]}
      //     )
      //   } else {
      //     for (let i = 0; i < _this.data_arr.length; i++) {
      //         _this.data_arr[i].endtime = _this.aaa[index]
      //         break

      //     }
      //   }

      // },
      detail() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Activityb/get_act', {
          load: true,
          id: _this.$route.params.id
        }).then(function(res) {
          if (!res) return;
          _this.info = res;
          _this.content = res.act_remarks;
          _this.form.remarks = res.act_remarks;
          _this.form.subject = res.act_subject;
          _this.form.totalmoney = res.act_total_cost / 100;
          _this.form.endtime = returntime1(res.act_sign_end_time);
          _this.form.starttime = returntime1(res.act_start_time);
          _this.form.orvertime = returntime1(res.act_end_time);
          _this.form.name = res.act_is_person;
          _this.is_many = res.act_is_many;
          _this.many_arr = res.next;
          _this.act_is_many = res.act_is_many
        })
      },
      remindustry() {
        this.$router.back(-1)
      },
      updateData(e) {
        this.form.remarks = e;
      },
      upform() {

        var _this = this;
        let obj = {

          subject: '简称', //个人/单位名称
          totalmoney: '收费标准',
          remarks: '活动详情',
          endtime: '报名截止时间', //截止日期
          starttime: '活动开始时间', //活动开始时间
        }
        if (!isNull(obj, _this.form)) return;
        _this.$http.post(_this.$store.state.url + '/Activityb/up_act', {
          'load': false,
          id: _this.$route.params.id,
          act_remarks: _this.form.remarks,
          act_explain: _this.form.subject,
          act_sign_end_time: _this.form.endtime,
          act_start_time: _this.form.starttime,
          act_end_time: _this.form.orvertime,
          act_information: _this.info.act_information,
          act_total_cost: _this.form.totalmoney,
          next: _this.data_arr,
          act_is_many: _this.act_is_many
        }).then((res) => {
          if (!res) return;
          this.$router.push('../../huodong/myindex');
        })
      },

    }
  }
</script>

<style scoped>
  .hezuo {
    background: #fff;
    min-height: -webkit-fill-available;
  }

  .hezuo .biaodin1 {
    padding-left: 15px;
    padding-bottom: 10px;
    margin-top: 25px;
    position: relative;
  }

  .hezuo .biaodin2,
  .hezuo .biaodin3,
  .hezuo .biaodin7 {
    padding-top: 8px;
    padding-left: 23px;
    border-top: 6px solid #f2f2f2;
    padding-bottom: 10px;
  }

  .hezuo .biaodin4 {
    border-top: 6px solid #f2f2f2;
  }

  .hezuo .biaodin3 {
    padding-right: 15px;
  }

  .biaodin1 .vux-x-textarea::before {
    display: none;
  }

  .hezuo .ban_title {
    font-size: 15px;
    /*font-weight: 800;*/
  }

  .hezuo .ban_title>span.min {
    font-size: 12px;
    color: #B2B2B2;
  }

  .hezuo .ban_title>strong {
    color: red;
  }

  .biaodin1 .vux-x-textarea {
    padding: 5px 12px;
  }

  .biaodin1 .biao_back_img {
    display: inline-block;
    width: 70px;
    margin-left: 10px;
  }

  .biaodin1 .input_img .ban_title {
    display: inline-block;
    font-size: 12px;
    vertical-align: super;
    margin-left: 10px;
  }

  .biaodin1 .input_img .ban_title>span {
    color: #B2B2B2;
  }

  .biaodin2 .isfilezip {
    margin-top: 15px;
    width: 40px;
    height: 40px;
  }

  .biaodin2 .thsis_maes {
    position: relative;
    margin-right: 20px;
    display: inline-block;
  }

  .biaodin2 .thsis_maes .iconcl {
    margin-left: 5px;
    margin-top: 10px;
  }

  .biaodin3 .ban_title {
    margin-left: -15px;
    margin-right: 10px;
  }

  .biaodin3 .hezuo_tishiyuyan {
    font-size: 15px;
    color: #999;
  }

  .biaodin4 .button_max {
    background: linear-gradient(to right, #03E1EC, #06E7C7);
    margin-top: 10px;
    width: 340px;
    margin-bottom: 40px;
  }

  .biaodin4 .login_remember {
    display: block;
    text-align: center;
    margin-top: 20px;
  }

  .biaodin4 .login_remember .alert {
    display: inline-block;
  }

  .biaodin5 .cen_imglist {
    position: fixed;
    background: #fff;
    border-radius: 5px;
    width: 345px;
    padding: 0 15px;
    width: 315px;
    left: 15px;
    bottom: 100px;
  }

  .biaodin5 .cen_imglist .title {
    font-size: 14px;
    color: #333;
    line-height: 40px;
  }

  .biaodin5 .cen_imglist .yes {
    line-height: 50px;
    font-size: 18px;
    color: #337bf1;
  }

  .biaodin5 .cen_imglist .up,
  .biaodin5 .cen_imglist .next {
    position: absolute;
    z-index: 3;
    top: 50%;
    transform: translateY(-50%);
  }

  .biaodin5 .cen_imglist .up .vux-x-icon,
  .biaodin5 .cen_imglist .next .vux-x-icon {
    fill: #fff;
  }

  .biaodin5 .cen_imglist .up {
    right: 15px;
  }

  .biaodin5 .cen_imglist .next {
    left: 15px;
  }

  .biaodin5 .bottom_imglist {
    position: fixed;
    bottom: 0;
    width: 120px;
    margin-left: 133px;
  }

  .biaodin5 .bottom_imglist .swiper-demo-img .imgbox {
    position: absolute;
    width: 95%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    top: 50%;
    transform: translateY(-50%);
  }

  .biaodin5 .bottom_imglist .swiper-demo-img .imgbox img {
    width: 100%;
    height: 100%;
  }

  .hezuo .biaodin7 {
    padding-right: 20px;
  }

  .biaodin7 .ban_title .fuchu {
    font-size: 12px;
    font-weight: 300;
    color: #999;
  }

  .biaodin7 .list_4 {
    font-size: 12px;
    color: #666;
    position: relative;
    width: 105%;
    left: -17px;
  }

  .biaodin7 .list_4 .main {
    display: inline-block;
    border-radius: 2px;
    border: 1px solid #ccc;
    width: 65px;
    margin-left: 17px;
    margin-top: 10px;
    text-align: center;
    padding: 4px 0px;
  }

  .biaodin7 .list_4 .main.on {
    background: #09CED6;
    border-color: #09CED6;
    color: #fff;
  }

  .biaodin7 .vux-x-input {
    padding-left: 0;
  }

  .biaodin7 .vux-x-input::before {
    bottom: 0;
    top: auto;
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

  .bottom:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 0.026667rem;
    border-top: 0.026667rem solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 0.4rem;
  }
  a:link, a:active, a:visited, a:hover {
    width: 4.1rem;
    display: inline-block;
    padding: 0;
    font-size: 14px;
    border: 0;
  }
  .moredate {
   height: 40px;
    line-height: 40px;
  }
  .moredate > span {
    font-size: 14px;
  }
	.fontsize14px {
		font-size: 14px;
	}
</style>
