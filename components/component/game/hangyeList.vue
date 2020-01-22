<template>
  <div class="buzhou">
    <x-header :title="title" :left-options="{backText:'',preventGoBack:true}" @on-click-back="onback" class="header step">
      <div :class="[isclick.id ? '' : 'on']" slot="right" @click="onnext">开始答题</div>
    </x-header>
    <div class="title_show">
      <span class="title_show_shuoming">当前选择：</span><span class="title_show_meiyou">{{isclick.name || '请选择适合的行业'}}</span>
    </div>
    <div class="buzhou_main">
      <div class="title">{{list[2].name}}</div>
      <p style="width: 100%;font-size: 14px" v-if="list[2].list == ''">暂无近期选择</p>
      <ul class="buzou_ul cl" v-else-if="list[2].list != ''">
        <li class="bz_li" v-for="(item , index) in list[2].list" @click="onlist(item)" :class="[item.id == isclick.id ? 'on' : '']">
          <span class="span ell">{{item.name}}</span>
        </li>
      </ul>
      <template v-for="(item , index) in list">
        <div v-if="index < 2">
          <div class="title">{{item.name}}</div>
          <ul class="buzou_ul cl">
            <li class="bz_li" v-for="(item , index) in item.list" @click="onlist(item)" :class="[item.id == isclick.id ? 'on' : '']">
              <span class="span ell">{{item.name}}</span>
            </li>
          </ul>
        </div>

      </template>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
    props: {
      url: String,
      title:String
    },
    data() {
      return {
        list:Array,
        isclick:{}
      }
    },
    components: {
      XHeader
    },
    created() {
      var _this = this;
      _this.$http.post(_this.$store.state.url + _this.url, {
        load: true,
      }).then(function(res) {
        if(!res) return;
        _this.list = res;
      })
    },
    methods: {
      onback() {
        this.$emit('onClickBack');
      },
      onnext(){
        if(!this.isclick.id) msg('请选择适合的行业')
        this.$emit('onClickNext', this.isclick);
        this.$router.push('/game/dati')
      },
      onlist(v){
        this.isclick = v;
      }
    }
  }
</script>

<style>
  .buzhou {
    background: #fff;
    min-height: -webkit-fill-available;
  }

  .buzhou .buzhou_main {
    position: relative;
    padding: 0 15px;
    overflow-y: auto;
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
  /*.buzhou .buzhou_main .bz_li.on::before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-right:5px solid transparent;
      border-left:5px solid transparent;
      border-top:5px solid #ccc;
      left: 50%;
      top: -2px;
      transform:translateX(-50%);
  }*/

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
    border-radius: 50px;
    padding: 0 2px;
  }

  .buzhou .buzhou_main .bz_li .show_show {
    position: absolute;
    top: -10px;
  }

  .buzhou .buzhou_main .bz_li.on .span {
    border-color: #236BEF;
    color: #236BEF;
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
    color: #236BEF;
  }
  .buzhou .title_show{
    border-bottom: 1px solid #f2f2f2;
  }
</style>
