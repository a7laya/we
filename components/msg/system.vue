<template>
	<div class="layim-panel layui-m-anim-left">
		<x-header :title="''" :left-options="{backText:'系统消息'}">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>
		<div class="layui-unselect layim-content statement" style="background: #eee;">
			<div class="layim-chat layim-chat-friend">
				<div class="layim-chat-main">
					<ul v-if="list.length==0">
						<li class="layim-chat-system">
							<span>暂无系统消息</span>
						</li>
					</ul>
					<ul v-for="(item,index) in list" :key="index">
						<li class="layim-chat-system" v-if="item.msg.data.display == 'txt'">
							<span>{{item.msg.data}}</span>
						</li>
						<li class="layim-chat-system" v-if="item.msg.data.display == 'img'">
							<img :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data">
						</li>
						<!--
                        	作者：1209559047@qq.com
                        	时间：2019-03-16
                        	描述：关注站内推送点击进入详情
                        -->
						<li class="layim-chat-system" v-if="item.msg.data.display == 'graphic'" @click="go(item.msg.type,item.msg.data.id)">
							<div class="graphic_box">
								<div class="graphic_boxtittle">{{item.msg.title}}:{{item.msg.data.txt}}</div>
								<div class="graphic_boxmain">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data.img" />
								</div>
								<div class="link_a">详情>></div>
							</div>
						</li>
						<!--
                        	作者：1209559047@qq.com
                        	时间：2019-04-01
                        	描述：有人参与活动后推送的系统消息
                        -->
						<!--活动  发布方-->
						<li class="layim-chat-system" v-if="item.msg.type == 'huodong'&&item.msg.data.fq_memid==memid">

							<div v-if="item.msg.data.act_status==1" class="sys_news">
								<div style="color: #333;">{{item.time | returntime1}}{{item.msg.data.tip}}</div>
								<div>{{item.msg.data.act_information}}</div>
								<div>行业：{{item.msg.data.typename}}</div>

							</div>
							<div v-else-if="item.msg.data.act_status==2" class="sys_news">
								<div style="color: red;">{{item.time | returntime1}}{{item.msg.data.tip}}</div>
								<div>{{item.msg.data.act_information}}</div>
								<div>行业：{{item.msg.data.typename}}</div>

								<div style="color: red;">未通过理由：{{item.msg.data.reason}}</div>
							</div>
							<div class="hezuo_msg huodong" v-else="">
								<div class="hemsg_title">
									<div class="title_name" style="color: #333;">
										{{item.msg.title}}
									</div>
									<div class="title_leibie">
										行业：{{item.msg.data.typename}}
									</div>

								</div>
								<router-link :to="'/user/usershow/' + item.msg.data.uid" tag="div" class="hezuod_user">
									<group gutter="0">
										<cell is-link>
											<div class="img" slot="icon">
												<img :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data.mem_headimgurl" />
											</div>
											<div class="zongnlan" slot="title">
												<div class="name">
													{{item.msg.data.nickname}}
												</div>
												<!--<vue-pingfen :num="item.msg.data.score1"></vue-pingfen>-->
												<div class="gongs_name">
													{{item.msg.data.mem_company || '暂无公司'}}
												</div>
											</div>
											<div solt="after-title">
												<router-link :to="'/msg/tcw/' + item.msg.data.mem_id" tag="span" class="coll_huodong">找TA聊聊</router-link>
											</div>
										</cell>
									</group>
								</router-link>
								<div class="he_msg_up_time">
									{{item.time | returntime1}} 发起参加活动申请
								</div>
								<div class="he_msg_buttom" v-if="item.msg.data.sign_status==0">
									<!--'complaint/' + item.msg.data.uid-->
									<span class="no" @click="huodong(2,item)">拒绝</span>
									<span class="yes" @click="huodong(1,item)">同意</span>
								</div>
								<div class="he_msg_buttom">
									<!--'complaint/' + item.msg.data.uid-->
									<span class="yes" v-if="item.msg.data.sign_status==2" style="background: rgb(208, 46, 46);margin-left: 0px;">报名未通过</span>
									<span class="yes" v-if="item.msg.data.sign_status==1" style="margin-left: 0px;">报名已同意</span>
								</div>
							</div>

						</li>
						<!--活动  申请方-->
						<li class="layim-chat-system" v-if="item.msg.type == 'huodong' &&item.msg.data.mem_id==memid">
							<div class="hezuo_msg huodong">

								<div style="color:#D02E2E;font-size: 12px;text-align: left;">
									{{item.time | returntime1}}{{item.msg.title}}
								</div>
								<div class="detail">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data.act_img_url" />
									<div style="text-align: left;">
										<div style="font-size: 12px;"> {{item.msg.data.act_information}}</div>
										<div>行业：{{item.msg.data.typename}}</div>
										<div style="font-size: 10px;"> <i class="iconfont icon-dingwei samll-icon"></i>{{item.msg.data.act_region}}{{item.msg.data.act_address}}</div>
										<div style="font-size: 10px;">
											<i class="iconfont icon-hours samll-icon"></i> {{item.msg.data.act_start_time | returntime8}}-{{item.msg.data.act_end_time| returntime8}}
										</div>
									</div>
								</div>

								<div style="text-align:left;" @click="go(item.msg.data.sign_actid)" v-if="item.msg.data.sign_code!=0">
									<div style="font-size: 16px;">入场码:{{item.msg.data.sign_code}}</div>
									<div style="font-size: 10px;">此码为唯一入场凭证,切不可告诉他人</div>
								</div>

							</div>
						</li>

						<li class="layim-chat-system" v-if="item.msg.type == 'hezuo'&&item.msg.data.coop_memid==memid">
							<div v-if="item.msg.data.coop_status==1" class="sys_news">
								<div>{{item.time | returntime1}}{{item.msg.data.tip}}</div>
								<div>{{item.msg.data.coop_title}}</div>
								<div>行业：{{item.msg.data.typename}}</div>

							</div>
							<div v-else-if="item.msg.data.coop_status==2" class="sys_news">
								<div style="color: red;">{{item.time | returntime1}}{{item.msg.data.tip}}</div>
								<div>{{item.msg.data.coop_title}}</div>
								<div>行业：{{<item class="msg data typen"></item>ame}}</div>

								<div style="color: red;">未通过理由：{{item.msg.data.reason}}</div>
							</div>
							<div class="hezuo_msg huodong" v-else="">
								<div class="hemsg_title">
									<div class="title_name">
										{{item.msg.data.title}}
									</div>
									<div class="title_leibie">
										行业：{{item.msg.data.hangye}}
									</div>
									<div class="title_yusuan" v-if="item.msg.data.prict<10000">
										<span class="yusuan_qian">{{item.msg.data.prict}}</span>
										<span class="yuansuan_suoming">TA的报价(元)</span>
									</div>
									<div class="title_yusuan" v-else="">
										<span class="yusuan_qian">{{item.msg.data.prict/10000}}</span>
										<span class="yuansuan_suoming">TA的报价(万)</span>
									</div>
								</div>
								<router-link :to="'/user/usershow/' + item.msg.data.uid" tag="div" class="hezuod_user">
									<group gutter="0">
										<cell is-link>
											<div class="img" slot="icon">
												<img :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data.headimgurl" />
											</div>
											<div class="zongnlan" slot="title">
												<div class="name">
													{{item.msg.data.nickname}}
												</div>
												<!--<vue-pingfen :num="item.msg.data.score1"></vue-pingfen>-->
												<div class="gongs_name">
													{{item.msg.data.company || '暂无公司'}}
												</div>
											</div>
											<div solt="after-title">
												<router-link :to="'/msg/tcw/' + item.msg.data.uid" tag="span" class="coll_huodong">找TA聊聊</router-link>
											</div>
										</cell>
									</group>
								</router-link>
								<div class="he_msg_up_time">
									{{item.time | returntime1}} 发起参加众包申请
								</div>
								<div class="he_msg_buttom" v-if="item.msg.data.bid_status=='0'">
									<span class="no" @click="chatto(2,item)">拒绝</span>
									<span class="yes" @click="chatto(1,item)">同意</span>
								</div>
								<div class="he_msg_buttom">
									<!--'complaint/' + item.msg.data.uid-->
									<span class="yes" v-if="item.msg.data.bid_status==9" style="background: rgb(208, 46, 46);margin-left: 0px;">未通过</span>
									<span class="yes" v-if="item.msg.data.bid_status==8" style="margin-left: 0px;">已同意</span>
								</div>
							</div>
						</li>
						<!--
                        	作者：1209559047@qq.com
                        	时间：2019-03-16
                        	描述：有人参与合作后推送的系统消息
                        -->
						<li class="layim-chat-system" v-if="item.msg.type == 'hezuo' && item.msg.data.uid==memid">
							<div class="hezuo_msg">
								<div class="hemsg_title">
									<div class="title_name">
										{{item.msg.data.title}}
									</div>
									<div class="title_leibie">
										行业：{{item.msg.data.hangye}}
									</div>
									<div class="title_yusuan" v-if="item.msg.data.prict.length<5">
										<span class="yusuan_qian">{{item.msg.data.prict}}</span>
										<span class="yuansuan_suoming">TA的预算(元)</span>
									</div>
									<div class="title_yusuan" v-else="">
										<span class="yusuan_qian">{{item.msg.data.prict/10000}}</span>
										<span class="yuansuan_suoming">TA的预算(万)</span>
									</div>
								</div>
								<div class="he_msg_main">
									{{item.msg.data.remarks}}
								</div>
								<div class="he_msg_up_img" v-if="item.msg.data.imgurl.length != 0">
									<div class="ul cl">
										<img v-for="(item , index) in item.msg.data.imgurl" preview="index" :src="$store.state.website.website_domain_name + '/uploads/' + item" />
									</div>
								</div>
								<div class="he_msg_up_user">
									<img class="he_msg_user_img" :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data.headimgurl"
									 alt="" />
									<span class="he_msg_user_name">{{item.msg.data.nickname}}{{item.msg.data.company ? '-' + item.msg.data.company : ''}}</span>
								</div>
								<div class="he_msg_up_time">
									{{item.time | returntime1}} 发起的众包申请
								</div>
								<!--<div class="he_msg_buttom" v-if="item.msg.data.bid_status==8">
									<router-link class="no" tag="span" :to="`complaint/${item.msg.data.uid}?pid=${item.msg.data.pid}&type=1`">
										我要投诉
									</router-link>
									<router-link :to="'/msg/tcw/' + item.msg.data.uid" tag="span" class="coll_huodong yes">跟TA谈谈</router-link>
								</div>-->
								<div class="he_msg_buttom">
									<span class="tongyi" v-if="item.msg.data.bid_status==8" style="margin-left: 0px;margin-top: 0;">您的报名已通过</span>
									<span class="yes" v-if="item.msg.data.bid_status==9" style="background: rgb(208, 46, 46);margin-left: 0px;">您的报名未通过</span>
								</div>
							</div>
						</li>
						<!--直播举报-->
						<li v-if="item.msg.type == 'zhibo'" class="sys_news">
							<div>{{item.msg.data.tip}}</div>
							<div>{{item.msg.data.room_title}}</div>
							<div>行业{{item.msg.data.typename}}</div>
							<div>理由：{{item.msg.data.room_reason}}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		XHeader,
		Group,
		Cell,
	} from 'vux'
	import {
		VuePingfen,
		VueHeaderNav
	} from '../component'
	export default {
		components: {
			XHeader,
			Group,
			Cell,
			VuePingfen,
			VueHeaderNav
		},
		inject: ['reload'],
		data() {
			return {
				memid: ''
			}
		},
		mounted() {
			this.$previewRefresh(); //图片点击查看
			this.read(); //消息已读
			for (let i = 0;
				(this.$store.state.systemmsg.length - 1) >= i; i++) {
				this.$store.state.systemmsg[i].is_du = 1;
			}
			this.$store.state.is_du = 1;
			setTimeout(function() {
				$('.layim-chat-main').scrollTop(1000000);
			}, 50)
			this.memid = this.$store.state.token;
		},
		computed: {
			list() {
				// console.log(this.$store.state.systemmsg)
				return this.$store.state.systemmsg;
			},
			user() {
				return this.$store.state.user;
			}
		},

		watch: {
			list: { //聊天数据变化时滚动条到达底部
				handler() {
					this.$previewRefresh()
				},
				deep: true
			}
		},
		methods: {
			go(type, id) {
				var type = Number(type);
				var url;
				switch (type) {
					case 1:
						url = '/hezuo/details/' + id;
						break;
					case 2:
						url = '/huodong/details/' + id;
						break;
					case 3:
						url = '/zhibo/details/' + id;
						break;
				}
				this.$router.push(url)
			},
			read() { //已读消息
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Cooperation/alreadyRead', {
					'load': false,
				}).then((res) => {
					if (!res) return;
				})
			},
			chatto(i, item) { //跟他谈谈
				var _this = this;
				item.msg.data.imgurl = '';
				let data = {
					type: "chat",
					for: _this.user.mem_id,
					to: item.msg.data.uid,
					time: Date.parse(new Date()) / 1000,
					qubie: '0', //合作
					msg: {
						type: 'notification',
						data: item.msg.data,
					}
				}
				_this.$http.post(_this.$store.state.url + '/Cooperation/hezuo_sh', {
					load: false,
					bid_memid: item.msg.data.uid,
					bid_coopid: item.msg.data.pid,
					type: i
				}).then((res) => {
					if (!res) return;
					if (res == 8) {
						item.msg.data.bid_status = 8
					} else if (res == 9) {
						item.msg.data.bid_status = 9
					}
					_this.$http.post(_this.$store.state.url + '/Chat/chats', {
						load: false,
						uid: item.msg.data.uid,
						type: 'notification',
						data: item.msg.data,
					}).then((res) => {
						if (!res) return;
						_this.$store.commit('chat', data);
						// _this.$router.push({
						// 	path: `tcw/${item.msg.data.uid}?isphonetrue=1&type=1&coop=${item.msg.data.pid}`
						// })
						// _this.reload()
						// _this.$previewRefresh()
					})

				})

			},
			huodong(i, item) {
				var _this = this;
				var data = {
					load: false,
					sign_actid: item.msg.data.sign_actid,
					sign_memid: item.msg.data.mem_id,
					type: i,
					fq_memid: _this.$store.state.token
				}
				console.log('huodongdata')
				console.log(data)
				_this.$http.post(_this.$store.state.url + '/activityb/act_sh', data).then((res) => {
					if (res.status == 1) {
						item.msg.data.sign_status = 1
					} else if (res.status == 2) {
						item.msg.data.sign_status = 2
					}
					let data = {
						type: "chat",
						for: _this.user.mem_id,
						to: item.msg.data.fq_memid,
						time: Date.parse(new Date()) / 1000,

						msg: {
							type: 'notification',
							data: item.msg.data,
						}
					}
					_this.$http.post(_this.$store.state.url + '/Chat/chats2', {
						load: false,
						uid: item.msg.data.mem_id,
						type: 'notification',
						data: item.msg.data,
					}).then((res) => {
						if (!res) return;

						_this.$store.commit('chat', data);
						// _this.$router.push('tcw/' + item.msg.data.mem_id);

					})

				})
			},

			go(id) {
				var _this = this;
				_this.$router.push('detail/' + id);
			}
		},
		beforeUpdate() {}
	}
</script>

<style scoped>
	.layim-chat-main {
		bottom: 0;
		padding-top: 0;
	}

	.graphic_box {
		font-size: 14px;
		text-align: left;
		background: #fff;
		padding: 0 10px;
	}

	.graphic_box .link_a {
		color: #35495e;
		line-height: 30px;
		border-top: 1px solid #eee;
		text-align: right;
	}

	.graphic_box .graphic_boxmain {
		padding: 10px 0;
	}

	.graphic_box .graphic_boxtittle {
		line-height: 30px;
		border-bottom: 1px solid #eee;
	}

	.layim-chat-system {
		font-size: 12px;
	}

	.hezuo_msg span {
		display: inline;
		line-height: inherit;
		padding: 0;
		border-radius: 0;
		background: none;
		color: #333;
		font-size: inherit;
	}

	.hezuo_msg {
		width: 320px;
		margin: 0 auto;
		padding: 20px 10px;
		background: #fff;
		border-radius: 5px;
		overflow: hidden;
	}

	.hezuo_msg .hemsg_title {
		position: relative;
		border-bottom: 1px solid #e7e7e7;
		padding-bottom: 10px;
	}

	.hezuo_msg .hemsg_title .title_name {
		font-size: 14px;
		font-weight: 800;
		text-align: left;
	}

	.hezuo_msg .hemsg_title .title_leibie {
		font-size: 14px;
		text-align: left;
	}

	.hezuo_msg .hemsg_title .title_yusuan {
		position: absolute;
		right: 0;
		top: 0;
	}

	.hezuo_msg .hemsg_title .title_yusuan>span {
		display: block;
	}

	.hezuo_msg .hemsg_title .title_yusuan .yusuan_qian {
		font-size: 12px;
		color: #da120c;
		font-weight: 800;
	}

	.hezuo_msg .hemsg_title .title_yusuan .yuansuan_suoming {
		font-size: 12px;
		color: #9b9b9b;
	}

	.hezuo_msg .he_msg_main {
		color: #3b3b3b;
		font-size: 12px;
		text-align: left;
		padding: 15px 0;
	}

	.hezuo_msg .he_msg_up_img img {
		float: left;
		width: 155px;
		margin-left: 10px;
		margin-top: 10px;
	}

	.hezuo_msg .he_msg_up_img .ul {
		position: relative;
		width: 110%;
		margin-left: -10px;
	}

	.hezuo_msg .he_msg_up_user {
		margin-top: 18px;
		text-align: left;
		border-bottom: 1px solid #e7e7e7;
		padding-bottom: 10px;
	}

	.hezuo_msg .he_msg_up_user .he_msg_user_img {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: inline-block;
		vertical-align: middle;
		margin-right: 5px;
	}

	.hezuo_msg .he_msg_up_user .he_msg_user_name {
		font-size: 14px;
		color: #545454;
		display: inline-block;
		vertical-align: middle;
	}

	.hezuo_msg .he_msg_up_time {
		text-align: left;
		font-size: 12px;
		color: #828282;
		line-height: 30px;
	}

	.hezuo_msg .he_msg_buttom {
		/*margin-top: 20px;*/
		font-size: 14px;
	}

	.hezuo_msg .he_msg_buttom .no {
		color: #267be5;
		display: inline-block;
		vertical-align: middle;
	}

	.hezuo_msg .he_msg_buttom .yes {
		display: inline-block;
		line-height: 33px;
		background: #267be5;
		color: #fff;
		width: 157px;
		border-radius: 30px;
		margin-left: 30px;
	}

	.hezuo_msg .he_msg_buttom .tongyi {
		display: inline-block;
		line-height: 33px;
		background: linear-gradient(to right, #03E1EC, #06E7C7);
		color: #fff;
		width: 157px;
		border-radius: 30px;
		/*margin: 30px;*/
	}

	.huodong .hezuod_user {
		text-align: left;
	}

	.huodong .hezuod_user .img {
		width: 63px;
		height: 63px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10px;
	}

	.huodong .hezuod_user .zongnlan .name {
		font-size: 14px;
		color: #333;
	}

	.huodong .hezuod_user .zongnlan .gongs_name {
		font-size: 12px;
		color: #666;
	}

	.huodong .hezuod_user .zongnlan .pingfen {
		line-height: 15px;
	}

	.huodong .hezuod_user .zongnlan .pingfen .icon-xingxing1 {
		margin-right: 2px;
	}

	.huodong .he_msg_buttom {
		margin-top: 5px;
	}

	.hezuo_msg.huodong {
		padding-bottom: 10px;
	}

	.hezuo_msg.huodong .he_msg_buttom .no {
		padding: 0 15px;
	}

	.hezuo_msg.huodong .he_msg_buttom .yes {
		background: linear-gradient(to right, #03E1EC, #06E7C7);
	}

	.hezuo_msg.huodong .coll_huodong {
		font-size: 14px;
		color: #333;
	}

	.detail {
		border-top: 1px solid #e7e7e7;
		border-bottom: 1px solid #e7e7e7;
		padding: 5px 0;
		display: flex;
		align-items: center;
	}

	.detail img {
		width: 30%;
		/* height: 100%; */
		margin-right: 0.266667rem;
		height: 75px;
		border-radius: 5px;
	}

	.samll-icon {
		display: inline-block;
		margin-right: 13px;
		width: 8px;
		height: 8px;
	}

	.sys_news {
		background: #FFFFFF;
		text-align: left;
		font-size: 10px;
		padding: 10px;
		box-sizing: border-box;
	}

	.sys_news div:nth-child(1) {
		/* color: rgb(208, 46, 46); */
		border-bottom: 1px solid gainsboro;
	}

	.sys_news div:nth-child(2) {
		font-size: 0.373333rem;
		font-weight: 800;
	}

	.sys_news div:nth-child(3) {
		margin: 5px 0;
	}
</style>
