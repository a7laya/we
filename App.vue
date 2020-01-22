<template>
  <div id="app" v-if="isRouterAlive">

    <keep-alive>
      <router-view v-wechat-title="'智汇优库-' + $route.meta.title" img-set="/static/favicon.ico" v-if="$route.meta.keepalive "></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>

  </div>
</template>

<script>
  import {
    querystring,
    XDialog
  } from 'vux'
  export default {
    components: {
      XDialog
    },
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        websocket: undefined,
        isWeiXin: isWeiXin(),
        isRouterAlive: true,
      }
    },
    watch: { //全局监听聊天
      chatlist: {
        handler() {
          //兼容后台推送数据
          var _this = this;
          for (let index in _this.$store.state.chat.list) {
            if (!_this.$store.state.chat.data[index]) {
              _this.$store.dispatch('chatUser', index);
            }
          }
        },
        deep: true
      }
    },
    computed: {
      chatlist() {
        return this.$store.state.chat.list;
      },
    },
    mounted() {
      let ua = navigator.userAgent;
      var _this = this;
      var num = 0;
      if (returnisIos()) { //解决ios微信浏览器键盘弹起后页面上滑，关闭后页面不回来问题（暂时未测出来该解决方案bug）
        window.addEventListener('focusout', function() { //软键盘收起的事件处理
          setTimeout(() => {
            window.scrollTo(0, document.documentElement.scrollTop || document.body.scrollTop);
          })
        });
      }
      _this.socket();
      _this.$http.post(_this.$store.state.url + '/index/website').then((res) => { //请求配置文件
        if (!res) return;
        num++;
        _this.$store.state.website = res
        if (num == 3) {
          _this.$store.state.isTrue = true; //网站配置文件载入后允许路由工作
        }
      })
      _this.$http.post(_this.$store.state.url + '/Common/login').then((res) => { //请求配置文件
        num++;
        _this.$store.commit('user', res);
        if (num == 3) {
          _this.$store.state.isTrue = true; //用户配置文件载入后允许路由工作
        }
        //微信分享逻辑处理
        var data = querystring.parse(window.location.href.split('?')[1]);
        data.fenurl = _this.$store.state.router;
        if (!res) { //用户未登录
          if (isWeiXin() == 1) { //是微信浏览器就自动登录
            // window.location.replace('http://api.zhyook.com/Login/weixinlogin?' + querystring.stringify(data)); //正式服务器
            window.location.replace(_this.$store.state.url + '/Login/weixinlogin?' + window.location.href.split('?')[1] + "&fenurl=" + _this.$store.state.router); //测试服务器

            _this.$router.replace('/wxlogin');
            return
          }
        } else {
          if (res.mem_subscribe == 0 && !!res.mem_phone) { //倒计时提示关注公众号
            setTimeout(function() {
              _this.$store.commit('erweima');
            }, 1000 * 60 * 2)
          }
        }
      })

      function sleep() { //检测是否有cid
        setTimeout(function() {
          if (_this.$store.state.cid) {
            num++;
            if (num == 3) {
              _this.$store.state.isTrue = true; //用户配置文件载入后允许路由工作
            }
          } else {
            sleep();
          }
        }, 300)
      }
      sleep();

      //底部的系统消息统计
      _this.$http.post(_this.$store.state.url + '/Homecenter/memssage_tips', {
        load: false,
      }).then(function(res) {
        if (!res) return;
        _this.$store.state.num = res;

      })
      //系统公告
      _this.$http.post(_this.$store.state.url + '/Homecenter/memssage_tips2', {
        load: false,
      }).then(function(res) {
        if (!res) return;
        _this.$store.state.Msgnum = res;
      })
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      },
      socket() { //连接数据推送服务器
        var _this = this;
        _this.websocket = new WebSocket(_this.$store.state.socketUrl); //连接服务器
        _this.websocket.onopen = function(e) {};
        _this.websocket.onmessage = function(e) { //接收数据
          if (JSON.parse(e.data).type == 'ping') {
            return;
          }
          //                  console.log(JSON.parse(e.data))
          _this.Handle(JSON.parse(e.data))
          //					_this.nums();
        };
        _this.websocket.onclose = function(e) { //断开后重新连接
          setTimeout(function() { //后台运行切换前台后再连接
            _this.socket() //执行方法重新连接服务器
          }, 100)
        };
      },
      nums() {
        let _this = this;
        _this.$http.post(_this.$store.state.url + '/Homecenter/tips', {
          load: false,
        }).then(function(res) {
          if (!res) return;
          console.log(res);
          //					_this.$store.state.Msgnum = res;
        })
      },
      Handle(d) {

        var _this = this;
        //              console.log(d)
        //              Homecenter/tips

        switch (d.type) { //根据数据类型处理数据
          case "Connect": //获取所有数据
            _this.$store.state.cid = d.client_id; //绑定cid
            function sleep() { //检测用户登录
              setTimeout(function() {
                if (_this.$store.state.user) {
                  _this.$http.post(_this.$store.state.url + '/Homecenter/scoketBinding', { //绑定socket cid
                    'load': false,
                  }).then((res) => {
                    if (!_this.$store.state.isTrue) return;
                    _this.$store.commit('removechat');
                    _this.$http.post(_this.$store.state.url + '/Cooperation/get_system', { //获取所有系统消息
                      load: true,
                    }).then((res) => {
                      if (!res) return;
                    })
                    _this.$http.post(_this.$store.state.url + '/Chat/listChat', { //获取所有聊天消息
                      load: true,
                    }).then((res) => {
                      if (!res) return;
                    })
                  })
                } else {
                  sleep();
                }

              }, 300)
            }
            sleep();
            break;
          case "systemmsg": //系统通知
            //					    console.log(d)
            _this.$store.commit('systemmsg', d);
            break;
          case "chat": //聊天
            _this.$store.commit('chat', d);
            break;
          case "livechat": //直播间聊天
            _this.$store.commit('livechat', d);
            break;
          case "startLive": //开始直播
            _this.$store.commit('liveStatus', 2);
            break;
          case "endLive": //结束直播
            _this.$store.commit('liveStatus', 3);
            break;
          case "comment": //评价弹出窗
            //						console.log(d.msg.data)
            _this.$store.state.comment.data = d.msg.data;
            _this.$store.state.comment.show = true;
            break;
          case "no_du_num": //系统消息数量统计
            //						console.log(d.msg.data.num)
            _this.$store.state.noRead = d.msg.data.num;
            //                  _this.$store.commit('numStatus', d);
            break;
          case "aaa": //系统消息数量统计
            //						console.log(d.msg.data.num)
            // _this.$store.state.data_list = d.msg.data;
            _this.$store.state.data_list = d.msg.data;
            _this.$store.commit('aaa', d.msg.data);
            //                  _this.$store.commit('numStatus', d);
            break;
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  body {
    background-color: #f3f3f3;
    min-height: -webkit-fill-available;
    overflow-x: hidden;
  }

  .com_ui_modify_vux-header-title.vux-header .vux-header-title {
    margin: 0 10px;
  }

  .weui-grid:after {
    display: none;
  }

  .weui-panel:after {
    display: none;
  }

  .weui-panel__hd:after {
    border-bottom: 1px solid #fbf9fe;
  }

  .slide-fade-enter-active {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.4s ease;
  }

  .slide-fade-enter {
    transform: translateX(6rem);
    opacity: 0;
  }

  .slide-top-enter-active {
    height: 100%;
    transition: all 0.4s ease;
  }

  .slide-top-enter {
    transform: translateY(-100%);
    opacity: 0;
  }

  .top-fade-enter-active {
    height: 100%;
    transition: all 0.4s ease;
  }

  .top-fade-enter {
    transform: translateX(6rem);
    opacity: 0;
  }

  .top-top-enter-active {
    height: 100%;
    transition: all 0.4s ease;
  }

  .top-top-enter {
    transform: translateY(-100%);
    opacity: 0;
  }

  .vux-swiper-desc {
    animation: fontss 1s infinite;
  }

  @keyframes fontss {
    0% {
      color: red;
    }

    50% {
      color: #fff;
    }

    100% {
      color: red;
    }
  }

  .com_douyin_xin {
    -webkit-animation: fadeOutUp .8s ease both;
  }

  @-webkit-keyframes fadeOutUp {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0)
    }

    100% {
      opacity: 0;
      -webkit-transform: translateY(-40px)
    }
  }

  .header-nav-main .weui-dialog {
    background: #fff;
    top: 1.066667rem;
    width: 2.266667rem;
    right: 0.266667rem;
    padding: 0 0.133333rem;
    border-radius: 0.08rem;
    margin-right: 0.3rem;
    margin-top: 0;
    overflow: scroll;
  }

  .button_max {
    width: 8.32rem;
    background: linear-gradient(to right, #5c7fa2, #35495e);
    text-align: center;
    font-size: 0.56rem;
    color: #fff;
    margin: 0 auto;
    line-height: 1.2rem;
    border-radius: 2.666667rem;
  }
</style>
