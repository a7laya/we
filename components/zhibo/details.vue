<template>

	<div v-if="item" class="live_box" style="position: relative;" v-cloak="">
		<x-header :left-options="{backText:'',preventGoBack:true}" @on-click-back="fanhui()" class="header">
			<div class="xj" slot="right" style="width: 8.55rem;margin: 0 auto;">
				<marquee scrollamount="3" style="color: #FFFFFF;width: 80%;margin: 0 auto;font-size: 0.48rem;">{{title}}</marquee>
			</div>
		</x-header>

		<!--<header id="header">
			<div class="header-content">
				<div class="left-arrow" @click="go()"></div>
				<marquee scrollamount="3" style="color: #FFFFFF;width: 80%;margin: 0 auto;font-size: 0.48rem;">{{title}}</marquee>
			</div>
		</header>-->
		<!--
        	作者：1209559047@qq.com
        	时间：2019-02-14
        	描述：观看人数
        -->
		<div class="live_fanhui">{{OnlineNumber}}<i class="iconfont icon-tuandui"></i></div>
		<!--
        	作者：1209559047@qq.com
        	时间：2019-02-14
        	描述：返回按钮
        -->
		<!--<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>-->
		<div style="position: relative;z-index: 1;">
			<div v-if="item.room_type==2" class="zhezhaoceng" :style="{ backgroundImage : 'url(' + $store.state.website.website_domain_name + '/uploads/' + item.room_imgurl + ')'}">
				<!--
                	作者：1209559047@qq.com
                	时间：2019-02-14
                	描述：倒计时
                -->

				<div class="endTime" style="background-image: url(/static/img/timeover.png);" v-if="item.room_starttime>newdata">
					<div class="endTime_main_box" v-html="$options.filters.returntime5(endTime)"></div>
				</div>
			</div>
			<!--
            	作者：1209559047@qq.com
            	时间：2019-02-14
            	描述：视频
            -->
			<video-player class="vjs-custom-skin" style="position: relative;z-index: 1;" v-if="playerOptions" ref="videoPlayer" :playsinline="isIos" :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)" @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied" @statechanged="playerStateChanged($event)">></video-player>

			<!--<video src=""></video>-->
		</div>
		<!--
        	作者：1209559047@qq.com
        	时间：2019-01-25
        	描述：用户自定义导航
        -->
		<tab :line-width="1" class="this_nav_a" style="z-index: 100;">
			<!--@click.native="navdata.index = index"-->
			<tab-item v-for="(item, index) in navdata.list" :selected="navdata.index == index" @click.native="change(index)" :key="index" v-if="item">{{item}}</tab-item>
		</tab>
		<!--
        	作者：1209559047@qq.com
        	时间：2019-01-25
        	描述：自定义导航内容
        -->
		<div class="nav_main1 statement" style="height: 9rem;" v-for="(item , index) in item.room_remarks" v-if="navdata.index==index+1" v-html="item.num"></div>
		<!--
        	作者：1209559047@qq.com
        	时间：2019-01-25
        	描述：排行榜
        -->
		<div class="nav_main1" v-if="navdata.index==navdata.list.length-1">
			<vue-raist></vue-raist>
		</div>
		<div class="nav_main1" v-if="navdata.index==0">
			<!--
            	作者：1209559047@qq.com
            	时间：2019-01-24
            	描述：滚动
            -->
			<section style="position: relative;z-index: 10;background: rgba(0,0,0,0.5); color: #fff;line-height: 25px; height: 25px;font-size: 14px;">
				<marquee scrollamount="3">{{item.room_explain}}</marquee>
			</section>
			<div class="layui-m-anim-left">
				<div class="layui-unselect layim-content" style="background: #eee;">
					<div class="layim-chat layim-chat-friend">
						<!--
                        	作者：1209559047@qq.com
                        	时间：2019-01-24
                        	描述：打赏动画
                        -->
						<!--<div class="isM_box" style="width: 0px; position: absolute; top: 70px;">
							<transition-group v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
								<div class="li" v-for="(item , index ) in list" :key="index" v-if="item.msg.type=='gift' && item.isAnimation">
									<div style="background: rgb(206, 206, 206); text-align: left; width: 150px;position: relative;padding: 5px 0; padding-right: 50px;border-top: 1px solid #fff;border-radius: 5px;">
										<img style="width: 20px;margin-left: 5px; height: 20px;display: inline-block;vertical-align: middle;border-radius: 50%;" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl " />
										<span>{{item.nickname}}</span>
										<span>送出</span>
										<span style="color: #009E94;">{{item.msg.data.number}}</span>
										<span>个</span>
										<img style="position: absolute;bottom: 0;right: 0;max-width: 30px;" :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data.reward_img" />
									</div>
								</div>
							</transition-group>
						</div>-->
						<div class="layim-chat-main" style="bottom: 50px; padding-top: 80px;">
							<!--
                        	作者：1209559047@qq.com
                        	时间：2019-01-24
                        	描述：聊天内容
                        -->

							<ul v-for="(item , index ) in list" :key="index">

								<li v-if="item.msg.type == 'notice'" style="font-size: 12px;padding-left: 0;min-height:auto;margin-bottom: 5px;text-align: center;">
									<div style="background: rgba(0,0,0,0.5);display: inline-block;color: #fff;border-radius: 5px;padding: 2px 5px;">{{item.msg.data}}</div>
								</li>
								<li v-if="item.msg.type=='img' || item.msg.type=='txt' || item.msg.type=='red'">
									<div style="text-align: center;font-size: 15px;color: darkgrey;margin: 10px 0 0;">{{item.time|returntime9}}</div>
									<router-link :to="'/user/usershow/' + item.for" tag="div" class="layim-chat-user">
										<img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl"><cite>{{item.nickname || '暂无昵称'}}</cite>
									</router-link>
									<div class="layim-chat-text" v-if="item.msg.type == 'txt'" v-html="$options.filters.content(item.msg.data)"></div>
									<div class="layim-chat-text" v-if="item.msg.type == 'img'">
										<img :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data " @click="bigPic(item.msg.data)" />
									</div>
									<div style="padding-top: 25px;" v-if="item.msg.type == 'red'">
										<vue-red-msg :reddata="item"></vue-red-msg>
									</div>
								</li>
								<li v-if="item.msg.type=='gift'" style="font-size: 12px;padding-left: 0;min-height:auto;margin-bottom: 10px;text-align: center;">
									<div style="color: #000000;display: flex;justify-content: center;">
										<div>{{item.nickname ||'暂无昵称'}}送出&#X3000;</div>
										<!--<img :src="$store.state.website.website_domain_name + '/uploads/' + item..msg.data.reward_img">-->
										<img :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data.reward_img" style="width: 20px;height: 20px;" />
									</div>
								</li>
							</ul>
						</div>
						<div class="layim-chat-footer" style="padding: 5px 10px;left: 0;right: 0;background: rgb(238, 238, 238);" :style="{ height:func ? '80px' : '40px'}">
							<!--
                            	作者：1209559047@qq.com
                            	时间：2019-01-24
                            	描述：用户操作按钮
                            -->
							<div class="live_user_c" style="position: absolute;">
								<!--
                                	作者：1209559047@qq.com
                                	时间：2019-02-25
                                	描述：链接首页
                                -->
								<div class="button_2">
									<router-link tag="i" to="/" class="iconfont icon-shouye">
										<div style="font-size:12px;color:#9c9c9c;margin-top: -10px;">主页</div>
									</router-link>

								</div>
								<!--
                                	作者：1209559047@qq.com
                                	时间：2019-02-25
                                	描述：收藏
                                -->
								<div class="button_2">
									<vue-collection :id="$route.params.id" :type="3"></vue-collection>
								</div>
								<!--
                                	作者：1209559047@qq.com
                                	时间：2019-02-25
                                	描述：关注公众号
                                -->
								<div class="button_2">
									<i class="iconfont icon-guanzhu" @click="$store.commit('erweima');"></i>
									<div style="font-size:12px;color:#9c9c9c;margin-top: -10px;">关注</div>
								</div>
								<!--
                                	作者：1209559047@qq.com
                                	时间：2019-02-25
                                	描述：邀请
                                -->
								<!--<div class="button_2">
                                    <i class="iconfont icon-yaoqing" @click="button_2show=true"></i>
                                    <div v-transfer-dom>
                                        <x-dialog v-model="button_2show" :hide-on-blur="true">
                                            <vue-qrcode :url="qrcodeurl"></vue-qrcode>
                                        </x-dialog>
                                    </div>
                                </div>-->
								<!--
                                	作者：1209559047@qq.com
                                	时间：2019-02-25
                                	描述：点赞
                                -->
								<div class="button_1" @click="clickzan" v-if="user.mem_id != item.room_memid">
									<i class="iconfont icon-xin"></i>
									<div style="font-size:12px;color:#9c9c9c;margin-top: -10px;"Z>{{onzan | returnNumber}}</div>
								</div>

							</div>
							<!--
                            	作者：1209559047@qq.com
                            	时间：2019-01-24
                            	描述：主播操作按钮
                            -->
							<div class="live_zhbo_box" v-if="user.mem_id == item.room_memid">

								<!--<div style="display: inline-block;vertical-align: middle;" v-if="item.today_ling >newdata||item.today_ba<newdata">
									<img v-if="item.room_type == 3 || item.room_type==2" style="width: 30px;" src="/static/img/kaishi.png" @click="liveStart()" />
									<img v-else style="width: 30px;" src="/static/img/jieshu.png" @click="liveEnd()" />
								</div>-->
								<div style="display: inline-block;">
									<div class="live_bobutton" v-clipboard:copy="item.tlm" v-clipboard:success="onCopy" v-clipboard:error="onError">复制推流码</div>
								</div>
								<a style="display: inline-block;margin-left: 30px;" :href="urls">
									<div class="live_bobutton">下载推流APP</div>
								</a>
							</div>
							<!--
                            	作者：1209559047@qq.com
                            	时间：2019-01-24
                            	描述：礼物
                            -->
							<vue-gift v-model="gift"></vue-gift>
							<!--
                            	作者：1209559047@qq.com
                            	时间：2019-01-24
                            	描述：表情
                            -->
							<vue-face v-model="face" @data="faceClick"></vue-face>
							<!--
                            	作者：1209559047@qq.com
                            	时间：2019-01-24
                            	描述：直播页底部按钮
                            -->
							<div class="layim-chat-send">
								<span @click="onshow('face')" class="layui-icon layim-tool-face" title="选择表情" style="font-size: 28px;display: inline-block;line-height: 40px;margin-right: 5px;">
		                    		<i class="iconfont icon-biaoqing" style="font-size: inherit;"></i>
		                    	</span>
								<input autocomplete="off" type="text" class="input" v-model="txt" />
								<button class="layim-send layui-disabled" @click="form('')" v-if="txt">发送</button>
								<button class="layim-send layui-disabled" @click="ongift()" v-if="!txt" style="padding: 0;width: 40px;text-align: center; background: none;margin-left: 0;"><img src="/static/img/gift.png"/></button>
								<button class="layim-send layui-disabled" @click="onshow('func')" v-if="!txt" style="padding: 0;width: 40px;text-align: center; background: none;margin-left: 0;"><i class="iconfont icon-jia" style="font-size: 30px; color: #999;"></i></button>
							</div>
							<div class="layim-chat-tool">
								<span class="layui-icon layim-tool-image img_left" title="上传图片">
		                        	<vue-file-img @data="fileimg">
		                        		<!-- <i class="iconfont icon-xiangce" style="font-size: inherit;"></i> -->
		                        		<i class="icon iconfont icon-jurassic_image" style="font-size: inherit;"></i>
		                        		<!-- <img src="/static/img/xiangce.png" @click="fileimg" class="layui-tu"> -->

		                    		</vue-file-img>
		                    	</span>
								<span class="layui-icon layim-tool-image img_left" title="红包" layim-event="image">
                    <vue-add-red :many="true" :url="'/ '" :id="$route.params.id">
                      <!--<i class="iconfont icon-hongbao" style="font-size: inherit;"></i>-->
                      <img src="/static/img/hong.png" class="layui-tu">
                    </vue-add-red>
		            </span>
								<span class="layui-icon layim-tool-image img_left" title="举报" layim-event="image">
                    <router-link tag="span" :to="'../jubao/'+$route.params.id" >
		                    			<!--<svg t="1562903021789" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1866" width="25" height="25"><path d="M512.001294 0C229.686794 0 0.001294 229.6855 0.001294 512S229.686794 1024 512.001294 1024 1024.001294 794.3145 1024.001294 512 794.315793 0 512.001294 0z m-46.471523 253.502156C465.529771 229.429907 485.024575 209.935103 509.096824 209.935103h5.80894C538.978013 209.935103 558.472816 229.429907 558.472816 253.502156v331.109598A43.543817 43.543817 0 0 1 514.905764 628.178806h-5.80894A43.543817 43.543817 0 0 1 465.529771 584.611754v-331.109598zM519.274087 809.417744a53.744316 53.744316 0 1 1 0-107.488631 53.744316 53.744316 0 0 1 0 107.488631z" p-id="1867"></path></svg>-->
								    <!--<div>举报</div>-->
								    <!--<i class="iconfont icon-hongbao" style="font-size: inherit;"></i>-->
                      <img src="/static/img/jubao.png" class="layui-tu">
                    </router-link>
                </span>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-transfer-dom>
			<x-dialog v-model="showImg" class="dialog-demo" hide-on-blur>
				<div class="img-box" style="padding: 10px;box-sizing: border-box;">
				<img :src="$store.state.website.website_domain_name + '/uploads/' + Imgs " />
				</div>
				<div @click="showImg=false">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
		<!--
        	作者：1209559047@qq.com
        	时间：2019-02-14
        	描述：分享
        -->
		<vue-shareit v-if="item" :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import Velocity from 'velocity-animate'
	import { VueRaist } from './component'
	import { VueFileImg, VueRedMsg, VueAddRed, VueGift, VueShareit, VueFace, VueQrcode, VueCollection } from '../component'
	import { XHeader, Tab, TabItem, Popover, XDialog, TransferDom } from 'vux'
	export default {
		components: {
			XHeader,
			Tab,
			TabItem,
			VueFileImg,
			VueRedMsg,
			VueAddRed,
			VueGift,
			Popover,
			VueShareit,
			XDialog,
			VueFace,
			VueQrcode,
			VueRaist,
			VueCollection,

		},
		created() {
			//          if(this.list[0]) {
			//              var num = this.list[0].to.replace(/[^0-9]/ig, "");
			//              if(!(num == this.$route.params.id)) {
			//                  this.$store.commit('removelivechat');
			//              }
			//          }
			//          if(!this.list[0]) {
			//              this.$store.commit('livechat', {
			//                  to: this.$route.params.id,
			//                  msg: {
			//                      type: 'notice',
			//                      data: '您已进入直播房间，请文明聊天，营造和谐上网环境人人有责'
			//                  }
			//              });
			//          }
			this.$store.commit('removelivechat');
			this.$store.commit('livechat', {
				to: this.$route.params.id,
				msg: {
					type: 'notice',
					data: '您已进入直播房间，请文明聊天，营造和谐上网环境人人有责'
				}
			});
		},
		directives: {
			TransferDom,
			gttu: { //仿抖音点赞
				// 指令的定义
				inserted: function(el, b, v) {
					var pageX = 0; //点击位置
					var pageY = 0; //点击位置
					var dianj = 0; //点击间隔时间
					var gttu = {
						dianj: function(e) { //记录点击间隔时间
							if((dianj - new Date().getTime()) > -400) { //进行了双击
								dianj = 0;
								pageX = e.changedTouches[0].pageX;
								pageY = e.changedTouches[0].pageY;
								gttu.add();
							} else {
								dianj = new Date().getTime()
							}
						},
						add: function() {
							var img = new Image();
							img.src = 'http://' + window.location.host + '/static/img/xin.png';
							img.className = 'com_douyin_xin';
							img.style.cssText = 'width:50px; height:50px;position: fixed;z-index: 10;top: ' + (pageY - 50) + 'px;left:' + (pageX - 25) + 'px';
							el.appendChild(img);
							v.context.clickzan();
							setTimeout(function() {
								el.removeChild(img);
							}, 1000);
						}
					}
					el.addEventListener('touchend', gttu.dianj, false);
				}
			}
		},
		data() {
			return {
				face: false, //表情隐藏显示
				func: false, //显示功能
				txt: '', //输入框文字
				item: undefined, //直播详情
				gift: false, //礼物显示隐藏
				playerOptions: undefined, //视频播放参数
				navdata: { //导航参数
					index: 0,
					list: ['互动聊天']
				},
				endTime: 0,
				isIos: returnisIos(),
				OnlineNumber: '...', //房间人数
				onzan: 0, //点赞次数
				button_2show: false, //邀请二维码
				urls: '',
				title: '',
				newdata: '',
				changeindex: 0,
				showImg:false,
				Imgs:''
			}
		},
		mounted() {
       console.log(window.location.search)
			this.newdata = Date.parse(new Date()) / 1000;

			this.ajax();
			var _this = this;





			if(_this.$route.query.tid) {
				_this.$http.post(_this.$store.state.url + '/Live/live_Invitation', { //邀请的人
					'load': false,
					..._this.$route.query
				}).then((res) => {

				});
			}
			const timer = setInterval(() => {
				if(this.item) {
					this.endTime = this.item.room_starttime - Date.parse(new Date()) / 1000;
					if(this.endTime % 20 == 0) {
						var _this = this;
						_this.$http.post(_this.$store.state.url + '/Live/getPeopleNum', { //获取直播间人
							'load': false,
							id: _this.$route.params.id,
						}).then((res) => {
							if(!res) return;
							_this.OnlineNumber = res.num;
						});
						_this.$http.post(_this.$store.state.url + '/Live/live_Fabulous_sum', { //获取点赞数量
							'load': false,
							id: _this.$route.params.id,
						}).then((res) => {
							if(!res) return;
							_this.onzan = res.fabulous;
						});
					}
				}
			}, 1000);
			// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
			this.$once('hook:beforeDestroy', () => {
				clearInterval(timer);
			})
			//判断手机系统安卓、ios
			var _this = this;
			var ua = navigator.userAgent.toLowerCase();
			if(/iphone/.test(ua)) {

				_this.urls = "https://itunes.apple.com/cn/app/id1117312745?mt=8";
				return true;
			} else if(/android/.test(ua)) {
				_this.urls = "https://wxz.myapp.com/16891/AB9B860A38321CE9BC9909E2053820B9.apk?fsname=cn.pengxun.vzanmanager_4.7.0_430.apk&hsr=4d5s";
				return false;
			} else if(/ipad|ipod/.test(ua)) {
				_this.urls = "https://wxz.myapp.com/16891/AB9B860A38321CE9BC9909E2053820B9.apk?fsname=cn.pengxun.vzanmanager_4.7.0_430.apk&hsr=4d5s";
				return false;
			}
		},
		watch: {
			item(res) {
				this.playerOptions = {
					controls: true,
					autoplay: false, //如果true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 导致视频一结束就重新开始。
					preload: false, // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [{
						type: this.$store.state.liveStatus != 3 ? "application/x-mpegURL" : "video/mp4",
						src: res.room_flowcode //你的m3u8地址（必填）
					}],

					poster: this.$store.state.website.website_domain_name + '/uploads/' + res.room_imgurl, //你的封面地址
					width: document.documentElement.clientWidth,
					notSupportedMessage: '此直播无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true //全屏按钮
					}
				}
			},
			list: { //聊天数据变化时滚动条到达底部
				handler() {
					setTimeout(function() {
						$('.layim-chat-main').scrollTop(100000000000);
					}, 50)
					this.$previewRefresh()

				},
				deep: true
			},
			changeindex: {
				handler() {
					setTimeout(function() {
						$('.layim-chat-main').scrollTop(100000000000);
					}, 50)
					this.$previewRefresh()

				},
				deep: true
			},
			liveStatus: { //检测直播状态
				handler: function(val) {
					var _this = this;
					_this.$http.post(_this.$store.state.url + '/Live/liveDetails', { //获取直播间数据
						'load': false,
						room_id: _this.$route.params.id,
					}).then((res) => {
						if(!res) return;
						_this.item = res;
						_this.title = res.room_title;
						//						var msg = "";
						//						switch(res.room_type * 1) {
						//							case 1:
						//								msg = "直播尚未开始请耐心等待！！！";
						//								break;
						//							case 2:
						//								msg = "开始直播啦！！！";
						//								break;
						//							case 3:
						//								msg = "直播已结束，可查看回放！！！";
						//								break;
						//							default:
						//								break;
						//						}
						//						_this.$store.state.liveStatus = res.room_type;
						//						_this.$store.commit('livechat', {
						//							to: this.$route.params.id,
						//							msg: {
						//								type: 'notice',
						//								data: msg
						//							}
						//						});
					});
				},
				immediate: true
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			list() {
				return this.$store.state.livechat;
			},
			liveStatus() {
				return this.$store.state.liveStatus;
			},
			fenxiang() {

				if(this.item.room_memid == this.$store.state.user.mem_id) {
					return {
						//						title: '智汇优库-' + this.$route.meta.title,
						title: this.title,
						dese: this.$store.state.user.mem_nickname + '邀您参与直播，关注/分享秒得奖励！',
						imgUrl: '/static/img/zb.jpg',
						link: '&uid=' + this.$store.state.user.mem_id + '&tid=' + this.$route.params.id
					}
				} else {
					return {
						title: this.title,
						dese: this.$store.state.user.mem_nickname + '邀您关注弱电行业直播，TA在智汇优库直播间等您！',
						imgUrl: '/static/img/zb.jpg',
						link: '&uid=' + this.$store.state.user.mem_id + '&tid=' + this.$route.params.id
					}
				}

			},
			qrcodeurl() {
				return `http://${window.location.host}${this.$store.state.router}?uidkey=${this.user.mem_id}&uid=${this.$store.state.user.mem_id}&tid=${this.$route.params.id}`
			}
		},
		methods: {
      fanhui() {
        this.urls = new URL(window.location.href)
        // console.log('aaaa')
        if(this.urls.searchParams.get("uidkey")){
          this.$router.push('/zhibo/index/#link')
        }else{
          if(this.urls.hash){
            this.$router.push('/index')
          }else{
            this.$router.go(-1)
          }

        }
      },
			bigPic(imgUrl) {
				let _this=this;
				_this.showImg=true;
				_this.Imgs=imgUrl;

				console.log(imgUrl)
			},
			change(i) {
				console.log(i)
				//tab栏切换
				let _this = this;
				_this.navdata.index = i;
				_this.changeindex = i;
			},

			//          go(){
			//          	this.$router.go(-1);
			//          },
			ajax() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Live/liveDetails', { //获取直播间数据
					'load': false,
					room_id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
					_this.item = res;
					_.each(res.room_remarks, function(e) {
						_this.navdata.list.push(e.name);
					})
					_this.navdata.list.push('排行榜');
					var msg = "";
					switch(res.room_type * 1) {
						case 1:
							msg = "开始直播啦！！！";
							break;
						case 2:
							msg = "直播尚未开始请耐心等待！！！";
							break;
						case 3:
							msg = "直播已结束，可查看回放！！！";
							break;
						default:
							break;
					}
					_this.$store.state.liveStatus = res.room_type;
					_this.$store.commit('livechat', {
						to: this.$route.params.id,
						msg: {
							type: 'notice',
							data: msg
						}
					});

				});
				_this.$http.post(_this.$store.state.url + '/Common/addGroup', { //绑定直播间聊天
					'load': false,
					type: 2,
					id: _this.$route.params.id,
				}).then((res) => {
					_this.$http.post(_this.$store.state.url + '/live/liveHistoryChat', { //获取历史数据
						'load': false,
						id: _this.$route.params.id,
					}).then((res) => {

					})
				})
				_this.$http.post(_this.$store.state.url + '/Live/live_Fabulous_sum', { //获取点赞数量
					'load': false,
					id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
					_this.onzan = res.fabulous;
				});
			},
			ongift() {
				this.gift = !this.gift;
				this.func = false;
			},
			onshow(val) {
				this[val] = !this[val];
			},
			faceClick(e) {
				this.txt += 'face' + e.currentTarget.title;
			},
			fileimg(res) {
        // console.log('111')
        // console.log(res)
				this.form(true, res.imgurl);
			},
			form(type, imgurl) {
				var _this = this;
				//				if(isWeiXin() == 1 && !_this.$store.state.user.mem_phone) {
				//					_this.$store.state.bingPhone = true;
				//					return;
				//				}

				_this.$http.post(_this.$store.state.url + '/Livechat/chats', { //发送聊天
					'load': false,
					room_id: _this.$route.params.id,
					type: type ? 'img' : 'txt',
					data: imgurl || _this.txt,
				}).then((res) => {
					if(!res) return;
					_this.txt = '';
					_this.func = false;
				})
			},
			clickzan() { //点赞
				var _this = this;
				_this.onzan++;
				_this.$http.post(_this.$store.state.url + '/Live/live_Fabulous', { //获取点赞次数
					'load': false,
					id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
					_this.onzan = res.fabulous;
				});
			},
			// listen event
			onPlayerPlay(player) {
				console.log('player play!', player)
			},
			onPlayerPause(player) {
				player.pause();
				console.log('player pause!', player)
			},
			onPlayerEnded(player) {
				console.log('player ended!', player)
			},
			onPlayerLoadeddata(player) {
				console.log('player Loadeddata!', player)
			},
			onPlayerWaiting(player) {
				console.log('player Waiting!', player)
			},
			onPlayerPlaying(player) {
				console.log('player Playing!', player)
			},
			onPlayerTimeupdate(player) {
				//              console.log('player Timeupdate!', player.currentTime())
			},
			onPlayerCanplay(player) {
				console.log('player Canplay!', player)
			},
			onPlayerCanplaythrough(player) {
				console.log('player Canplaythrough!', player)
			},
			// or listen state event
			playerStateChanged(playerCurrentState) {
				//              console.log('状态改变', playerCurrentState)
			},
			// player is ready
			playerReadied(player) {
				//              console.log('播放器准备完毕', player)
				// console.log('example 01: the player is readied', player)
			},
			beforeEnter: function(el) {
				el.style.opacity = 0;
				el.style.position = 'relative'
				el.style.left = '750px';
			},
			enter: function(el, done) {
				Velocity(el, {
					opacity: 1,
					left: 0,
				}, {
					duration: 300
				})
				Velocity(el, {
					fontSize: '1em'
				}, {
					complete: done
				})
			},
			leave: function(el, done) {
				Velocity(el, {
					left: '750px',
					opacity: 0
				}, {
					complete: done
				})
			},
			liveStart() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Live/startLive', { //开始直播
					'load': false,
					room_id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
				})
			},
			liveEnd() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Live/endLive', { //结束直播
					'load': false,
					room_id: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
				})
			},
			onCopy() {
				msg('复制成功');
			},
			onError() {
				msg('复制失败');
			},
		},
		beforeRouteLeave(to, from, next) {
			var _this = this;
			_this.$http.post(_this.$store.state.url + '/Common/delGroup', { //解绑直播间聊天
				'load': false,
				type: 2,
				id: _this.$route.params.id,
			}).then((res) => {
				if(!res) return;
				_this.$store.commit('removelivechat');
			})
			next();
		},

	}
</script>

<style>
	.live_zhbo_box {
		position: absolute;
		top: -30px;
		right: 15px;
	}

	.live_bobutton {
		background: #04BE02;
		color: #fff;
		border-radius: 5px;
		padding: 3px 5px;
	}

	.endTime {
		background-size: 100%;
		position: absolute;
		bottom: 10px;
		left: 16%;
		width: 268px;
		height: 80px;
		color: #fff;
	}

	.endTime .endTime_main_box {
		position: absolute;
		top: 35px;
		left: 70px;
	}

	.endTime .endTime_main_box .bgtime {
		font-size: 28px;
	}

	.endTime .endTime_main_box .bgtime::after {
		content: ':';
	}

	.endTime .endTime_main_box span:nth-last-child(2)::after {
		opacity: 0;
	}

	.endTime .endTime_main_box .shuoming {
		display: inline-block;
		width: 0;
		position: relative;
		top: -23px;
		left: -8px;
	}

	.video-player {
		position: relative;
		z-index: 1;
	}

	.video-player .video-js .vjs-big-play-button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 200px;
		overflow: hidden;
		width: 46px;
		height: 46px;
		line-height: 46px;
	}

	.video-player .video-js .vjs-big-play-button .vjs-icon-placeholder {
		display: block;
		line-height: initial;
	}

	.video-player .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
		line-height: 42px;
	}

	.video-player .video-js .vjs-modal-dialog {
		display: none !important;
	}

	.nav_main1 .layim-content,
	.nav_main1 .layim-chat-main {
		top: 242px;
	}

	.vux-tab-wrap.this_nav_a {
		padding-top: 30px;
	}

	.this_nav_a .vux-tab-container {
		height: 30px;
	}

	.this_nav_a .vux-tab {
		height: 30px;
	}

	.this_nav_a .vux-tab .vux-tab-item {
		line-height: 30px;
	}

	.live_box .zhezhaoceng.on {
		display: none;
	}

	.live_box .zhezhaoceng {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		background-size: 100%;
	}

	.layim-chat-footer {
		transition: height 0.2s;
	}

	.live_box .isM_box {
		position: relative;
		z-index: 10;
	}

	.live_user_c {
		width: 40px;
		right: 20px;
		/*top: -190px;*/
		/* top:-6.066667rem;  /* 之前数据 */
    top: -4.5rem;
    line-height: 23px;
	}

	.live_user_c>div {
		/* margin-bottom: 10px; */
	}

	.live_user_c>div.button_1 {
		text-align: center;
		color: #555;
	}

	.live_user_c>div.button_1 i {
		font-size: 18px;
		color: #d81e06;
	}

	.live_user_c>div.button_2 {
		text-align: center;
		color: #555;
    margin-top: 5px;
	}

	.live_user_c>div.button_2 i {
		font-size: 20px;
		color: #383737;
	}

	.live_user_c>div.button_2 .pos_left_to {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 11;
		background: rgba(0, 0, 0, 0.3);
	}

	.live_box .live_fanhui {
		position: absolute;
		z-index: 2;
		top: 11px;
		right: 5px;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		font-size: 12px;
		border-radius: 14px;
		line-height: 14px;
		padding: 2px 5px;
	}

	.live_box .live_fanhui .icon-tuandui {
		font-size: 10px;
	}

	.live_box .icon-fanhui {
		position: absolute;
		z-index: 2;
		top: 10px;
		left: 5px;
		padding: 5px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.2);
		line-height: 15px;
		height: 15px;
		width: 15px;
		text-align: center;
		color: rgb(255, 255, 255);
	}

	.layim-chat-text img {
		width: 23px;
		display: inline-block;
	}

	.jubao {
		background: #f74c31;
		padding: 2px 1px;
		border-radius: 5px;
	}

	.jubao div {
		color: #FFFFFF;
	}

	#header {
		position: relative;
		padding: 8px 0;
		box-sizing: border-box;
		background-color: #35495e;
	}
	/*.left-arrow {
		content: "";
		position: absolute;
		width: 0.32rem;
		height: 0.32rem;
		border: 0.026667rem solid #ccc;
		border-width: 0.026667rem 0 0 0.026667rem;
		-webkit-transform: rotate(315deg);
		transform: rotate(315deg);
		top: 13px;
		left:13px;
	}*/

	.header-content {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.nav_main1 .statement {
		height: 10rem;
		overflow-y: scroll;
	}
	.layim-chat-tool{
		display: flex;
		align-items:center
	}
	.layim-chat-tool span{
		width:30px;
		height:30px;
    margin-left: 0;
	}
  .img_left {
    margin-left: 1.2rem!important;
  }
  .img_left > i {
    vertical-align: top;
  }
	.layui-tu{
		height:80%;
		width:80%;
    margin-top: 0.15rem;
	}
	/*.xiangce{
		background: url('/static/img/xiangce.png') 100% 100%;
		width:30px;
		height:30px
	}*/
</style>
