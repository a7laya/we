<template>
  <div class="buzhou">
    <x-header :title="title" :left-options="{backText:'',preventGoBack:true}" @on-click-back="onback" class="header step">
      <div :class="[isclick.sponId ? '' : 'on']" slot="right" @click="onnext">下一步</div>
    </x-header>
    <div class="title_show">
      <span class="title_show_shuoming" v-show="choose">当前选择：</span><span class="title_show_meiyou">{{isclick.name || '请选择擅长的行业题库'}}</span>
    </div>
      <div class="buzhou_main" ref="main">
        <template v-for="(item, index) in list">
          <div v-if="index == 1">
            <div class="title">{{item.name}}</div>
            <ul class="buzou_ul cl">
              <li class="bz_li" v-for="(item , index) in item.list" @click="onlist(item)" :class="[item.sponId == isclick.sponId ? 'on' : '']">
                <span class="span ell">{{item.name}}</span>
              </li>
            </ul>
          </div>
        </template>
        <template v-for="(item, index) in list">
          <div v-if="index > 1">
            <div class="title">{{item.name}}</div>
            <ul class="buzou_ul cl">
              <li class="bz_li" v-for="(item , index) in item.list" @click="onlist(item)" :class="[item.sponId == isclick.sponId ? 'on' : '']">
                <span class="span ell">{{item.name}}</span>
              </li>
            </ul>
          </div>
        </template>
        <!--<div class="mask" v-show="flag">
          <span @click="zhankai()">
            <img src="/static/img/game/xiahuajiantou.png" alt="">
          </span>
        </div>-->
      </div>
    <audio  hidden="hidden"
            ref="audioAnniu"
            src="/static/audio/anniu.mp3"
            :preload="audio.preload"
    >
    </audio>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
    props: {
      url: String,
      title: String,
      assistId: String
    },
    data () {
      return {
        list: [{
          'name': null
        }],
        isclick:{
        },
        flag: true,
        choose: false,
        audio: {
          preload: 'auto'
        }
      }
    },
    watch: {
      isclick: {
        handler (newName, oldName) {
         this.choose = true
        },
        deep: true
      }
    },
    components: {
      XHeader
    },
    mounted() {
      var _this = this;
      _this.$http.post(_this.$store.state.url + _this.url, {
        load: true,
        assist_id: _this.assistId
      }).then(function (res) {
        if(!res) return;
        for (var i in res[1].list) {
          for (var j in res[2].list) {
            if (res[1].list[i].id === res[2].list[j].hangyeId) {
              res[1].list[i].sponId = res[2].list[j].sponId
            }
          }
        }
        _this.list = res;
      })
    },
    methods: {
      onback () {
        this.$emit('onClickBack');
      },
      onnext () {
        if (!this.isclick.sponId) {
          msg('请选择适合的行业')
        } else {
          this.$emit('onClickNext', this.isclick);
        }
      },
      onlist (v) {
        this.isclick = v;
        this.$refs.audioAnniu.play()
      },
//    zhankai () {
//      this.flag = false
//      this.$refs.main.style.overflowY = 'auto'
//    }
    }
  }
</script>

<style>
  .step.vux-header .vux-header-right{
    color: #FF7F00;
  }
  .buzhou {
    background: #FFFCF3;
    min-height: -webkit-fill-available;
  }

  .buzhou .buzhou_main {
    position: relative;
    padding: 0 15px;
    /*overflow-y: hidden;*/
    overflow-x: hidden;
    height: 500px;
  }

  .buzhou .buzhou_main .title {
    line-height: 75px;
    font-size: 18px;
    font-weight: 800;
  }

  .buzhou .buzhou_main .buzou_ul {
    width: 110%;
    position: relative;
    left: -16px;
  }

  .buzhou .buzhou_main .bz_li {
    position: relative;
    float: left;
    margin-left: 14.5px;
    margin-bottom: 19px;
  }

  .buzhou .buzhou_main .popover {
    display: none;
  }

  .buzhou .buzhou_main .bz_li.on .popover {
    display: block;
    position: absolute;
    top: -20px;
    font-size: 12px;
    background: #ccc;
    color: #fff;
    border-radius: 3px;
    padding: 0 6px;
    white-space: nowrap;
  }

  .buzhou .buzhou_main .popover.left {
    left: 0;
  }

  .buzhou .buzhou_main .popover.right {
    right: 0;
  }

  .buzhou .buzhou_main .popover.center {
    transform: translateX(-50%);
  }

  .buzhou .buzhou_main .bz_li .span {
    display: block;
    font-size: 15px;
    line-height: 30px;
    width: 100px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 3px;
    padding: 0 2px;
  }

  .buzhou .buzhou_main .bz_li .show_show {
    position: absolute;
    top: -10px;
  }

  .buzhou .buzhou_main .bz_li.on .span {
    border-color: #FF7F00;
    color: #FF7F00;
  }
  .buzhou .title_show{
    font-size: 14px;
    line-height: 40px;
    border-top: 5px solid #f2f2f2;
    padding: 0 15px;
  }
  .buzhou .title_show .title_show_shuoming{
    color: #585858;
  }
  .buzhou .title_show .title_show_meiyou{
    color: #FF7F00;
  }
  .buzhou .title_show{
    border-bottom: 1px solid #f2f2f2;
  }
  .mask{
    width: 100%;
    height: 60px;
    background: -webkit-linear-gradient(180deg, rgba(255, 252, 243,.3),  rgba(255, 252, 243,.8)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(180deg, rgba(255, 252, 243,.3),  rgba(255, 252, 243,.8)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(180deg, rgba(255, 252, 243,.3),  rgba(255, 252, 243,.8)); /* Firefox 3.6 - 15 */
    background: linear-gradient(180deg, rgba(255, 252, 243,.3),  rgba(255, 252, 243,.8)); /* 标准的语法 */
    position: absolute;
    bottom: 0;
  }
  .mask span{
    display: block;
    width: 100%;
    text-align: center;
    color: #FF7F00;
    position: absolute;
    bottom: 10px;
    font-size: 14px;
  }
  .mask span img{
    display: block;
    width: 25px;
    margin: 0 auto;
    animation: myfirst 1.5s infinite;
  }
  @keyframes myfirst {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -10px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
</style>
