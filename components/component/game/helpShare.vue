/**
* @Author: yinger
* @Date: 2019-06-18
* @Project: hdzg
*/
<template>
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
        shareTitleId: '',
        title: ''
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    watch: {
      title: {
        handler (newValue, oldValue) {
          this.sleep()
        },
        deep: true
      }
    },
    mounted () {
      var _this = this
      _this.sleep()
    },
    methods: {
      sleep () { // 检测wxsdk
        var _this = this
        setTimeout(function () {
          if (wx.configStutas) {
			// uidkey是分享人的uid 标识符
            let thislink = '&uidkey=' + _this.user.mem_id
            // if (_this.user) {
            //   thislink += _this.user.mem_phone ? _this.user.mem_id : ''
            // }
            // let fenurl = '/game/index'
            // console.log('thislink')
            // console.log(thislink)
            _this.shareTitleId = sessionStorage.getItem('shareTitleId');
            // _this.title = sessionStorage.getItem('shareTitleId');
            let data = {
              title: _this.title,
              desc: _this.dese,
              link: `http://${window.location.host}${_this.link}${thislink}`,
              // link: `http://zhibo1.zhyook.com/game/index?shareTitleId=${_this.shareTitleId}${_this.link}${thislink}`  ,
              // link: `http://zhibo1.zhyook.com/game/index?shareTitleId=${_this.shareTitleId}${_this.link}${thislink}`  ,
              // link: `http://${window.location.host}${fenurl}?uidkey=${this.user.mem_id}`,
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
                // console.log(this.data)
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
                // console.log(111)

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
            _this.sleep()
          }
        }, 300)
      }
    }
  }
</script>

<style scoped>

</style>
