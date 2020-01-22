<template>
</template>

<script>
  //分享
  export default {
    data () {
      return {
        show: false,
        on: true,
        title: '智汇优库-赛事频道',
        dese: this.$store.state.user.mem_nickname + '邀您免费挑战弱电行业知识竞赛，领现金红包、冲刺夺冠大奖！',
        imgUrl: '/static/img/game/share.jpg',
        link: '/game/index',
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
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
              desc: _this.dese,
              link: `http://${window.location.host}${_this.link}${thislink}`,
              imgUrl: `http://${window.location.host}${_this.imgUrl}`
            }
            console.log('data')
            console.log(data)
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
    }
  }
</script>

<style>
  i.icon-shoucang.on {
    color: #f94d4b;
  }
</style>
