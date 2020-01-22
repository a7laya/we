// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import store from './store.js'
import * as filter from './filter.js'
import http from 'axios'
import router from './router'
import App from './App'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import '../static/css/common.css'
import VideoPlayer from 'vue-video-player'
import VueClipboard from 'vue-clipboard2'
import VueHtml5Editor from 'vue-html5-editor'
import * as Vuepay from './pay.js'
import * as VueCargopay from './cargopay.js'
import {
  ConfirmPlugin,
  LoadingPlugin,
  DatetimePlugin,
  querystring
} from 'vux'
import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)
Vue.use(DatetimePlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

Vue.use(VueHtml5Editor, {
  // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
  // global component name
  name: 'vue-html5-editor',
  // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
  showModuleName: false,
  image: {
    // 文件最大体积，单位字节  max file size
    sizeLimit: 99999 * 99999,
    // 上传参数,默认把图片转为base64而不上传
    // upload config,default null and convert image to base64
    upload: {
      url: store.state.url + '/index/uploadImgs',
      headers: {},
      params: {},
      fieldName: 'img'
    },
    // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
    // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
    // set null to disable compression
    compress: {
      width: 1600,
      height: 1600,
      quality: 80
    },
    // 响应数据处理,最终返回图片链接
    // handle response data，return image url
    uploadHandler(responseText) {
      // default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
      var json = JSON.parse(responseText)
      if (json.code == 200) {
        return store.state.website.website_domain_name + '/uploads/' + json.data.imgurl
      } else {
        alert(json.msg)
      }
    }
  },
  // 语言，内建的有英文（en-us）和中文（zh-cn）
  language: 'zh-cn',
  // 自定义语言
  i18n: {
    'zh-cn': {
      'align': '对齐方式',
      'image': '图片',
      'list': '列表',
      'link': '链接',
      'unlink': '去除链接',
      'table': '表格',
      'font': '文字',
      'full screen': '全屏',
      'text': '排版',
      'eraser': '格式清除',
      'info': '关于',
      'color': '颜色',
      'please enter a url': '请输入地址',
      'create link': '创建链接',
      'bold': '加粗',
      'italic': '倾斜',
      'underline': '下划线',
      'strike through': '删除线',
      'subscript': '上标',
      'superscript': '下标',
      'heading': '标题',
      'font name': '字体',
      'font size': '文字大小',
      'left justify': '左对齐',
      'center justify': '居中',
      'right justify': '右对齐',
      'ordered list': '有序列表',
      'unordered list': '无序列表',
      'fore color': '前景色',
      'background color': '背景色',
      'row count': '行数',
      'column count': '列数',
      'save': '确定',
      'upload': '上传',
      'progress': '进度',
      'unknown': '未知',
      'please wait': '请稍等',
      'error': '错误',
      'abort': '中断',
      'reset': '重置'
    }
  },
  // 隐藏不想要显示出来的模块
  hiddenModules: [],
  // 自定义要显示的模块，并控制顺序
  visibleModules: [
    'text',
    'color',
    'font',
    'align',
    'list',
    //      "link",
    //      "unlink",
    'tabulation',
    'image',
    'hr',
    'eraser',
    'undo',
    'full-screen'
    //      "info",
  ],
  // 扩展模块，具体可以参考examples或查看源码
  // extended modules
  modules: {
    // omit,reference to source code of build-in modules
  }
})
Vue.use(VueClipboard)

require('video.js/dist/video-js.css')

require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)

Vue.use(preview)

Vue.use(VueRouter)
Vue.prototype.$http = http
Vue.prototype.$pay = Vuepay
Vue.prototype.$cargopay = VueCargopay

// 格式化处理图片URL
Vue.prototype.$formatImg = function(img_name) {
  return store.state.url + '/uploads/' + img_name
}

// 滚动到页面顶部
Vue.prototype.$toTop = function() {
  let top = document.documentElement.scrollTop || document.body.scrollTop;
  // 实现滚动效果
  const timeTop = setInterval(() => {
    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
    if (top <= 0) {
      clearInterval(timeTop);
    }
  }, 10);
}

// 格式化时间戳
Vue.prototype.$formatTimestamp = function (unix) {
  var now = new Date(parseInt(unix) * 1);
  now =  now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  if(now.indexOf("下午") > 0) {
      if (now.length == 18) {
          var temp1 = now.substring(0, now.indexOf("下午"));   //2014/7/6
          var temp2 = now.substring(now.indexOf("下午") + 2, now.length);  // 5:17:43
          var temp3 = temp2.substring(0, 1);    //  5
          var temp4 = parseInt(temp3); // 5
          temp4 = 12 + temp4;  // 17
          var temp5 = temp4 + temp2.substring(1, temp2.length); // 17:17:43
          now = temp1 + temp5; // 2014/7/6 17:17:43
          now = now.replace("/", "-"); //  2014-7/6 17:17:43
          now = now.replace("/", "-"); //  2014-7-6 17:17:43
      }else {
          var temp1 = now.substring(0, now.indexOf("下午"));   //2014/7/6
          var temp2 = now.substring(now.indexOf("下午") + 2, now.length);  // 5:17:43
          var temp3 = temp2.substring(0, 2);    //  5
          if (temp3 == 12){
              temp3 -= 12;
          }
          var temp4 = parseInt(temp3); // 5
          temp4 = 12 + temp4;  // 17
          var temp5 = temp4 + temp2.substring(2, temp2.length); // 17:17:43
          now = temp1 + temp5; // 2014/7/6 17:17:43
          now = now.replace("/", "-"); //  2014-7/6 17:17:43
          now = now.replace("/", "-"); //  2014-7-6 17:17:43
      }
  }else {
      var temp1 = now.substring(0,now.indexOf("上午"));   //2014/7/6
      var temp2 = now.substring(now.indexOf("上午")+2,now.length);  // 5:17:43
      var temp3 = temp2.substring(0,1);    //  5
      var index = 1;
      var temp4 = parseInt(temp3); // 5
      if(temp4 == 0 ) {   //  00
          temp4 = "0"+temp4;
      }else if(temp4 == 1) {  // 10  11  12
          index = 2;
          var tempIndex = temp2.substring(1,2);
          if(tempIndex != ":") {
              temp4 = temp4 + "" + tempIndex;
          }else { // 01
              temp4 = "0"+temp4;
          }
      }else {  // 02 03 ... 09
          temp4 = "0"+temp4;
      }
      var temp5 = temp4 + temp2.substring(index,temp2.length); // 07:17:43
      now = temp1 + temp5; // 2014/7/6 07:17:43
      now = now.replace("/","-"); //  2014-7/6 07:17:43
      now = now.replace("/","-"); //  2014-7-6 07:17:43
  }
  return now;
}

// FastClick.attach(document.body)

/* ------注入全局自定义指令指令------ */
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

// 加载必要配置
$.holdReady(true) // hold住，等待a.js加载，后续代码不能执行
$.getScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function() {
  $.holdReady(false) // 释放，a.js加载完成，继续执行后续代码
})

/* -----------全局导航守卫----------- */
router.beforeEach((to, from, next) => {
  store.commit('loadingOFFON', true)
  store.state.router = to.path

  function wxsleep() { // 检测wxsdk是否加载完毕
    setTimeout(function() {
      if (window.wx) {
        http.post(store.state.url + '/Cooperate/wechatJdk', {
          wechaturl: window.location.href
        }).then(function(res) {
          wx.config({
            debug: false, // true:调试时候弹窗
            ...res,
            jsApiList: [
              // 所有要调用的 API 都要加到这个列表中
              'onMenuShareTimeline', // 分享到朋友圈接口
              'onMenuShareAppMessage', //  分享到朋友接口
              'onMenuShareQQ', // 分享到QQ接口
              'onMenuShareWeibo' // 分享到微博接口
            ]
          })
          wx.ready(function() {
            wx.configStutas = true
          })
        })
      } else {
        wxsleep()
      }
    }, 300)
  }
  wxsleep()

  function sleep() { // 等待加载重要的配置文件
    setTimeout(function() {
      if (store.state.isTrue) {
        if (to.path != '/login/login' && to.path != '/login/usersetupfpassword' && to.path != '/login/register' &&
          to.path != '/wxlogin' && '/login/binding' && to.path != '/login/binding') { // 登录和注册不计入历史
          window.sessionStorage.url = to.fullPath
        }
        if (store.state.user && (to.path == '/login/login' || to.path == '/login/register')) { // 登录用户不允许跳转登录注册页面
          next('/')
          return
        }
        if (store.state.user) { // 限制某些页面弹出完善信息弹框
          var arr = [
            '/zhibo/add',
            '/huodong/add',
            '/hezuo/add',
            '/information/release',
            '/information/pronews',
            '/yellowPages/addCompany',
            '/vote/write'
          ]
          //					if( store.state.user.mem_type==0){
          //						if((!store.state.user.mem_company || !store.state.user.mem_region || !store.state.user.mem_nickname) && arr.indexOf(to.path) != -1) {
          //						store.state.upuser = true;
          //						}else if( store.state.user.mem_type==1){
          //							if(( !store.state.user.mem_nickname) && arr.indexOf(to.path) != -1) {
          //							store.state.upuser = true;
          //							}
          //						}else if(!store.state.user.mem_type){
          //							if((!store.state.user.mem_company || !store.state.user.mem_region || !store.state.user.mem_nickname) && arr.indexOf(to.path) != -1) {
          //							store.state.upuser = true;
          //							}
          //						}
          //					}

          if ((!store.state.user.mem_company || !store.state.user.mem_region || !store.state.user.mem_nickname) &&
            arr.indexOf(to.path) != -1) {
            store.state.upuser = true
          }
        }
        if (store.state.user && to.path != '/login/binding') { // 限制某些页面强制绑定手机号
          var arr = [
            '/user/QRcode',
            '/user/updata'
          ]
          if (!store.state.user.mem_phone && arr.indexOf(to.path) != -1) {
            next('/login/binding')
            return
          }
        }
        next()
      } else {
        sleep()
      }
    }, 200)
  }
  sleep()
})
router.afterEach(function(to) {
  store.commit('loadingOFFON', false)
})

// 路由守卫监听 每次跳转回到顶部
// router.beforeEach((to, from, next) => {
// document.body.scrollTop = 0
/// / firefox
// document.documentElement.scrollTop = 0
/// / safari
// window.pageYOffset = 0
// next()
// })

// 添加请求拦截器
// 加载中队列数组
http.loadings = []
http.defaults.withCredentials = true
http.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  if (config.method == 'post') {
    if (!config.data) {
      config.data = {}
    }
    if (config.data.load == true || config.data.load == false) {
      if (config.data.load) {
        // 记录请求
        http.loadings.push(config.url)
        store.commit('loadingOFFON', true)
      }
      delete config.data.load
    }
    config.data.token = store.state.token
    config.data.client_id = store.state.cid
  }
  return config
}, function(error) {
  return Promise.reject(error)
})
// 添加响应拦截器
http.interceptors.response.use(function(response) {
  // 请求完成删除记录
  if (http.loadings.indexOf(response.config.url) != -1) {
    http.loadings.splice(http.loadings.indexOf(response.config.url), 1)
  }
  if (http.loadings.length == 0) {
    store.commit('loadingOFFON', false)
  }
  if (response.data.code == 200) {
    store.state.successStatus = true
    return response.data.data
  }
  if (response.data.code == 0) {
    msg(response.data.msg)
    store.state.successStatus = false
    response.data.data = ''
  }
  if (response.data.code == 303) {
    store.state.user = undefined
    router.push('/login')
  }
  return response.data.data
}, error => {
  msg('请稍后正在查询')
  http.loadings = []
  store.commit('loadingOFFON', false)
  return Promise.reject(error)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
