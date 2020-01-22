<template>
  <!--
        作者：1209559047@qq.com
        时间：2019-03-05
        描述：加载更多
  -->
  <div>
    <div class="loading">
      <div style="text-align: center; font-size: 0.35rem;color: #797777;">{{text[type]}}</div>
    </div>
    <div class="toup" @click="top()" v-show="show">
      <!-- <i class="iconfont icon-fanhuidingbu3"></i> -->
    </div>
  </div>
</template>

<script>
// import { querystring } from "vux";
const querystring = require("querystring");

export default {
  data() {
    return {
      type: 0,
      show: true,
      text: ["加载中...", "加载完成", "没有更多数据了", "暂无数据"],
      page: 1
    };
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    changeType: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10,
    }
  },
  watch:{
    changeType(newType, oldType){
      console.log('from loading===>changeType:', newType);
      this.page = 1 // 回复初始值，不然会从1页后开始加载
      this.ajax() 　　
    }
  },
  mounted() {
    var _this = this;
    _this.ajax();
    $(document).unbind("scroll");
    $(document).scroll(function() {
      _this.scr();
    });
  },
  methods: {
    top() {
      $(document).animate(
        {
          scrollTop: 0
        },
        "slow"
      );
    },
    scr() {
      var _this = this;
      if ($(document).scrollTop() > 500) {
        _this.show = true;
      } else {
        _this.show = false;
      }
      if ($(document).scrollTop() >= $("#app").height() - $(window).height()) {
        if (_this.type == 2 || _this.type == 0 || _this.type == 3) {
          return;
        }
        _this.ajax();
      }
    },
    ajax() {
      if (!this.url) return;
      var _this = this;
      _this.type = 0;
      var data = querystring.parse(_this.url.split("?")[1]);
      data.page = _this.page;
      var url = _this.url.split("?")[0]
      console.log('_url:',_this.url)
      console.log('data:',data)
      this.$http.post(url, data).then(res => {
        //获取数据
        console.log('res:',res)
        if (res) {
          _this.type = 1;
          _this.$emit("ievent", res);
          if (res.length == 0) {
            _this.type = 3;
          } else {
            if (res.length < _this.limit) {
              _this.type = 2;
            } else {
              _this.type = 1;
            }
            _this.page++;
            // console.log(_this.page)
          }
        } else {
          _this.type = 3;
        }
      });
    }
  },
  destroyed() {
    var _this = this;
    $(document).unbind("scroll");
  }
};
</script>

<style scoped>
.loading {
  padding-top: 0.1rem;
  clear: both;
}

.toup {
  position: fixed;
  right: 0.2rem;
  bottom: 1.5rem;
  z-index: 50;
}

.toup i {
  font-size: 0.4rem;
}

.toup i::before {
  display: block;
  float: left;
  background: #0e8ee7;
  width: 0.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  color: #fff;
}
</style>
