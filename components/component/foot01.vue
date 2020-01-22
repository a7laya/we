<template>
  <div class="footer">
    <!--{{systemmsg}}-->
    <flexbox>
      <flexbox-item>
        <!-- <router-link to="/index" tag="div"><span style="background: url(../../../static/img/首页.png);"></span> -->
        <router-link to="/index" tag="div"><i class="iconfont icon-shouye"></i>
          <div class="txt">平台首页</div>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/tailcargo" tag="div"><i class="iconfont icon-faqi"></i>
          <div class="txt">尾货首页</div>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/tailcargo/shopclass" tag="div"><i class="iconfont icon-tuandui"></i>
          <div class="txt">商品分类</div>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/tailcargo/myorder" tag="div">
          <i class="iconfont icon-xinxi"></i>
          <div class="txt">已购尾货</div>
          <badge v-show="num>0" :text="nums"></badge>
          <!--<badge :text="systemmsg.no_du_num" ></badge>-->
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/tailcargo/person" tag="div"><i class="iconfont icon-app_icons--"></i>
          <div class="txt">卖家中心</div>
        </router-link>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {
    Flexbox,
    FlexboxItem,
    Badge
  } from 'vux'
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Badge
    },
    data() {
      return {
        show: false,
        num: 0,
        nums: 0
      }
    },
    computed: {
      systemmsg() {
        return this.$store.state.systemmsg[this.$store.state.systemmsg.length - 1];
      },
    },
    watch: {
      num: {
        handler() {
          var _this = this;
          console.log(_this.num)
        },
        deep: true

      }
    },
    mounted() {
      var _this = this;
      setInterval(function() {
        _this.num = _this.$store.state.noRead;
        if (_this.num < 99) {
          _this.nums = _this.num;
        } else {
          _this.nums = "99+"
        }
      }, 500)

      //        console.log(this.$store.state.systemmsg)
    },
    methods: {
      onIndexChange(index) {
        console.log($('.txt').css('fontSize'));
      }

    }
  }
</script>
<style scoped>
  .footer {
    height: 60px;
    width: 100%;
    position: fixed;
    bottom: 0;
  }

  .footer .vux-flexbox {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    text-align: center;
    z-index: 2000;
    transition: bottom 0.5s;
    box-shadow: 0 0 10px 0 #888888;
  }

  .footer .vux-flexbox.class1 {
    bottom: -60px;
  }

  .footer .vux-flexbox-item {
    position: relative;
  }

  .footer i.iconfont {
    font-size: 20px;
    color: #383838;
  }

  .footer .txt {
    color: #383838;
    font-size: 12px;
  }

  .footer .vux-badge {
    position: absolute;
    top: 0;
    /*right: 15px;*/
  }
</style>
