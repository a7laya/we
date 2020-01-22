<template>
  <!--
        作者：1209559047@qq.com
        时间：2019-03-05
        描述：微信分享
    -->
  <!--  <span class="span">-->
  <!--		<i class="iconfont icon-fenxiang" :class="{on:show}"></i>-->
  <!--	</span>-->
</template>

<script>
  // 分享
  export default {
    props: {
      title: String,
      dese: String,
      imgUrl: String,
      link: String
    },
    data () {
      return {
        show: false,
        on: true,
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    mounted () {
      var _this = this

      function sleep () { // 检测wxsdk
        setTimeout(function () {
          if (wx.configStutas) {
            let thislink = '?uidkey='
            if (_this.user) {
              thislink += _this.user.mem_phone ? _this.user.mem_id : ''
            }
            let data = {
              title: _this.title,
              desc: _this.dese ,
              link: `http://${window.location.host}${_this.$store.state.router}${thislink}${_this.link}`,
              imgUrl: `http://${window.location.host}${_this.imgUrl}`
            }
            wx.onMenuShareAppMessage({ //分享给朋友
              ...data,
             
              trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //                              alert('用户点击发送给朋友');
              },
              success: function (res) {
                                             // alert('已分享');
                // _this.onback(true)
              },
              cancel: function (res) {
                                             // alert('已取消');
              },
              fail: function (res) {
                // alert(JSON.stringify(res));
              }
            })
            wx.onMenuShareTimeline({ //分享到朋友圈
              ...data,
              trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //                              alert('用户点击分享到朋友圈');
              },
              success: function (res) {
                //                              alert('已分享');
                // _this.onback(true)

              },
              cancel: function (res) {
                //                              alert('已取消');
              },
              fail: function (res) {
                //                              alert(JSON.stringify(res));
              }
            })
            wx.onMenuShareQQ({ //分享到qq
              ...data,
              trigger: function (res) {
                //                              alert('用户点击分享到QQ');
              },
              complete: function (res) {
                //                              alert(JSON.stringify(res));
              },
              success: function (res) {
                //                              alert('已分享');
                // _this.onback(true)

              },
              cancel: function (res) {
                //                              alert('已取消');
              },
              fail: function (res) {
                //                              alert(JSON.stringify(res));
              }
            })
            wx.onMenuShareWeibo({ //分享到微博
              ...data,
              trigger: function (res) {
                //                              alert('用户点击分享到微博');
              },
              complete: function (res) {
                //                              alert(JSON.stringify(res));
              },
              success: function (res) {
                //                              alert('已分享');
                // _this.onback(true)

              },
              cancel: function (res) {
                //                              alert('已取消');
              },
              fail: function (res) {
                //                              alert(JSON.stringify(res));
              }
            })
            wx.onMenuShareQZone({ //分享到qq空间
              ...data,
              trigger: function (res) {
                //                              alert('用户点击分享到QZone');
              },
              complete: function (res) {
                //                              alert(JSON.stringify(res));
              },
              success: function (res) {
                //                              alert('已分享');
                // _this.onback(true)

              },
              cancel: function (res) {
                //                              alert('已取消');
              },
              fail: function (res) {
                //                              alert(JSON.stringify(res));
              }
            })
          } else {
            sleep()
          }
        }, 300)
      }

      sleep()
    },
    methods: {
      // onback (state) { //分享后回调 名字我随便起的等会你改下
      //   if (!this.defaultData) return
      //   this.$emit('onClickBack', state)
      // }
    }
  }
</script>

<style>
  i.icon-shoucang.on {
    color: #f94d4b;
  }
</style>
