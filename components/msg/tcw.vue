<template>
	<div class="layim-panel layui-m-anim-left">
		<x-header :title="''" :left-options="{backText:data.nickname || '暂无昵称'}">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>
		<div class="layui-unselect layim-content statement" style="background: #eee;">
			<div class="layim-chat layim-chat-friend">
				<div class="layim-chat-main">
					<ul v-for="(item , index ) in list" :key="index">
						<li class="layim-chat-system">
							<span>{{item.time | returntime1}}</span>
						</li>
						<!--<li class="layim-chat-system" v-else-if="">
                            <span>{{item.time | returntime1}}</span>
                        </li>-->
						<!--v-if="item.msg.type == 'notification'"-->
						<!--合作-->
						<router-link class="layim-chat-system" v-if="item.msg.type == 'notification'&&item.msg.data.type=='hezuo'" tag="li" :to="'/hezuo/details/' + item.msg.data.pid">
							<div class="li cl notli2">
								<div class="img">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data.coopimgurl" />
								</div>
								<div class="txt">
									<div class="txt cl liaotian">
										<span class="tit_name ell1">{{item.msg.data.title}}</span>
									</div>
									<div class="diqu">
										<span>行业：{{item.msg.data.hangye}}</span>
									</div>
									<div class="txtsp2">
										<i class="iconfont icon-dingwei"></i>
										<span class="diqutxt">{{item.msg.data.region}}</span>
									</div>
									<div class="txtsp2">
										<i class="iconfont icon-shijian"></i>
										<span class="diqutxt">{{item.msg.data.starttime | returntime1}}</span>
									</div>
								</div>
							</div>
						</router-link>
                         
						<!--huodong-->
						<router-link class="layim-chat-system" v-if="item.msg.type == 'notification'&&item.msg.data.type=='huodong'" tag="li" :to="'/huodong/details/' + item.msg.data.sign_actid">
							  
							<div class="li cl notli2">
								<!--<div class="img">
									<img :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data.act_img_url" />
								</div>-->
								<div class="txt">
									<div class="txt cl liaotian">
										<span class="tit_name ell1">{{item.msg.data.act_information}}</span>
									</div>
									<div class="diqu">
										<span>行业：{{item.msg.data.mem_company}}</span>
									</div>
									<div class="txtsp2">
										<i class="iconfont icon-dingwei"></i>
										<span class="diqutxt">{{item.msg.data.act_region}}</span>
									</div>
									<div class="txtsp2">
										<i class="iconfont icon-shijian"></i>
										<span class="diqutxt">{{item.msg.data.act_start_time | returntime1}}</span>
									</div>
								</div>
							</div>
						</router-link>
						<!--{{list.length}}-->
						<!--{{list}}-->
						<li class="layim-chat-li" :class="[user.mem_id != item.to ? 'layim-chat-mine' : '']" v-if="item.msg.type=='txt'">
							<div class="layim-chat-user"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl"><cite>{{item.nickname}}</cite></div>
							<div class="layim-chat-text" v-if="item.msg.type == 'txt'" v-html="$options.filters.content(item.msg.data)"></div>
							<div class="layim-chat-text" v-if="item.msg.type == 'img'">
								<img preview="index" :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data " />
							</div>
						</li>
						<li class="layim-chat-li" :class="[user.mem_id != item.to ? 'layim-chat-mine' : '']" v-if="item.msg.type=='img'">
							<div class="layim-chat-user"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl"><cite>{{item.nickname}}</cite></div>
							<!--<div class="layim-chat-text" v-if="item.msg.type == 'txt'" v-html="$options.filters.content(item.msg.data)"></div>-->
							<div class="layim-chat-text" v-if="item.msg.type == 'img'">
								<img preview="index" :src="$store.state.website.website_domain_name + '/uploads/' + item.msg.data " />
							</div>
						</li>

					</ul>

				</div>

				<div class="layim-chat-footer">
					<div class="layim-chat-send">
						<input autocomplete="off" type="text" class="input" v-model="txt" />
						<button class="layim-send layui-disabled" layim-event="send" @click="form('')">发送</button>
					</div>
					<div class="layim-chat-tool">
						<span @click="onshow('face')" class="layui-icon layim-tool-face" title="选择表情" layim-event="face">
                    		<i class="iconfont icon-biaoqing" style="font-size: inherit;"></i>
                    	</span>
						<span class="layui-icon layim-tool-image" title="上传图片" layim-event="image">
                        	<vue-file-img @data="fileimg">
                        		<i class="iconfont icon-tsh-copy" style="font-size: inherit;"></i>
                    		</vue-file-img>
                    	</span>
						<span class="layui-icon layim-tool-face" title="拨打电话">
                    		<vue-collphone :data="phone" :isbuttonshow="[true,!!$route.query.isphonetrue]"><i class="iconfont icon-dianhuazixunhuawuzongheguanlibl" style="font-size: inherit;"></i></vue-collphone>
                    		
                    	</span>
					</div>
				</div>
			</div>
		</div>
		<div @click="onshow('face')" v-show="face">
			<div style="position: fixed;z-index: 3;top: 0;left: 0;width: 100%;height: 100%;"></div>
			<div class="layui-m-layerchild layim-layer layui-m-anim-scale" style="z-index: 4;">
				<div class="layui-m-layercont" style="padding: 0;text-align: left;">
					<ul class="layui-layim-face">
						<li @click="faceClick($event)" title="[微笑]"><img src="/static/img/face/0.gif"></li>
						<li @click="faceClick($event)" title="[嘻嘻]"><img src="/static/img/face/1.gif"></li>
						<li @click="faceClick($event)" title="[哈哈]"><img src="/static/img/face/2.gif"></li>
						<li @click="faceClick($event)" title="[可爱]"><img src="/static/img/face/3.gif"></li>
						<li @click="faceClick($event)" title="[可怜]"><img src="/static/img/face/4.gif"></li>
						<li @click="faceClick($event)" title="[挖鼻]"><img src="/static/img/face/5.gif"></li>
						<li @click="faceClick($event)" title="[吃惊]"><img src="/static/img/face/6.gif"></li>
						<li @click="faceClick($event)" title="[害羞]"><img src="/static/img/face/7.gif"></li>
						<li @click="faceClick($event)" title="[挤眼]"><img src="/static/img/face/8.gif"></li>
						<li @click="faceClick($event)" title="[闭嘴]"><img src="/static/img/face/9.gif"></li>
						<li @click="faceClick($event)" title="[鄙视]"><img src="/static/img/face/10.gif"></li>
						<li @click="faceClick($event)" title="[爱你]"><img src="/static/img/face/11.gif"></li>
						<li @click="faceClick($event)" title="[泪]"><img src="/static/img/face/12.gif"></li>
						<li @click="faceClick($event)" title="[偷笑]"><img src="/static/img/face/13.gif"></li>
						<li @click="faceClick($event)" title="[亲亲]"><img src="/static/img/face/14.gif"></li>
						<li @click="faceClick($event)" title="[生病]"><img src="/static/img/face/15.gif"></li>
						<li @click="faceClick($event)" title="[太开心]"><img src="/static/img/face/16.gif"></li>
						<li @click="faceClick($event)" title="[白眼]"><img src="/static/img/face/17.gif"></li>
						<li @click="faceClick($event)" title="[右哼哼]"><img src="/static/img/face/18.gif"></li>
						<li @click="faceClick($event)" title="[左哼哼]"><img src="/static/img/face/19.gif"></li>
						<li @click="faceClick($event)" title="[嘘]"><img src="/static/img/face/20.gif"></li>
						<li @click="faceClick($event)" title="[衰]"><img src="/static/img/face/21.gif"></li>
						<li @click="faceClick($event)" title="[委屈]"><img src="/static/img/face/22.gif"></li>
						<li @click="faceClick($event)" title="[吐]"><img src="/static/img/face/23.gif"></li>
						<li @click="faceClick($event)" title="[哈欠]"><img src="/static/img/face/24.gif"></li>
						<li @click="faceClick($event)" title="[抱抱]"><img src="/static/img/face/25.gif"></li>
						<li @click="faceClick($event)" title="[怒]"><img src="/static/img/face/26.gif"></li>
						<li @click="faceClick($event)" title="[疑问]"><img src="/static/img/face/27.gif"></li>
						<li @click="faceClick($event)" title="[馋嘴]"><img src="/static/img/face/28.gif"></li>
						<li @click="faceClick($event)" title="[拜拜]"><img src="/static/img/face/29.gif"></li>
						<li @click="faceClick($event)" title="[思考]"><img src="/static/img/face/30.gif"></li>
						<li @click="faceClick($event)" title="[汗]"><img src="/static/img/face/31.gif"></li>
						<li @click="faceClick($event)" title="[困]"><img src="/static/img/face/32.gif"></li>
						<li @click="faceClick($event)" title="[睡]"><img src="/static/img/face/33.gif"></li>
						<li @click="faceClick($event)" title="[钱]"><img src="/static/img/face/34.gif"></li>
						<li @click="faceClick($event)" title="[失望]"><img src="/static/img/face/35.gif"></li>
						<li @click="faceClick($event)" title="[酷]"><img src="/static/img/face/36.gif"></li>
						<li @click="faceClick($event)" title="[色]"><img src="/static/img/face/37.gif"></li>
						<li @click="faceClick($event)" title="[哼]"><img src="/static/img/face/38.gif"></li>
						<li @click="faceClick($event)" title="[鼓掌]"><img src="/static/img/face/39.gif"></li>
						<li @click="faceClick($event)" title="[晕]"><img src="/static/img/face/40.gif"></li>
						<li @click="faceClick($event)" title="[悲伤]"><img src="/static/img/face/41.gif"></li>
						<li @click="faceClick($event)" title="[抓狂]"><img src="/static/img/face/42.gif"></li>
						<li @click="faceClick($event)" title="[黑线]"><img src="/static/img/face/43.gif"></li>
						<li @click="faceClick($event)" title="[阴险]"><img src="/static/img/face/44.gif"></li>
						<li @click="faceClick($event)" title="[怒骂]"><img src="/static/img/face/45.gif"></li>
						<li @click="faceClick($event)" title="[互粉]"><img src="/static/img/face/46.gif"></li>
						<li @click="faceClick($event)" title="[心]"><img src="/static/img/face/47.gif"></li>
						<li @click="faceClick($event)" title="[伤心]"><img src="/static/img/face/48.gif"></li>
						<li @click="faceClick($event)" title="[猪头]"><img src="/static/img/face/49.gif"></li>
						<li @click="faceClick($event)" title="[熊猫]"><img src="/static/img/face/50.gif"></li>
						<li @click="faceClick($event)" title="[兔子]"><img src="/static/img/face/51.gif"></li>
						<li @click="faceClick($event)" title="[ok]"><img src="/static/img/face/52.gif"></li>
						<li @click="faceClick($event)" title="[耶]"><img src="/static/img/face/53.gif"></li>
						<li @click="faceClick($event)" title="[good]"><img src="/static/img/face/54.gif"></li>
						<li @click="faceClick($event)" title="[NO]"><img src="/static/img/face/55.gif"></li>
						<li @click="faceClick($event)" title="[赞]"><img src="/static/img/face/56.gif"></li>
						<li @click="faceClick($event)" title="[来]"><img src="/static/img/face/57.gif"></li>
						<li @click="faceClick($event)" title="[弱]"><img src="/static/img/face/58.gif"></li>
						<li @click="faceClick($event)" title="[草泥马]"><img src="/static/img/face/59.gif"></li>
						<li @click="faceClick($event)" title="[神马]"><img src="/static/img/face/60.gif"></li>
						<li @click="faceClick($event)" title="[囧]"><img src="/static/img/face/61.gif"></li>
						<li @click="faceClick($event)" title="[浮云]"><img src="/static/img/face/62.gif"></li>
						<li @click="faceClick($event)" title="[给力]"><img src="/static/img/face/63.gif"></li>
						<li @click="faceClick($event)" title="[围观]"><img src="/static/img/face/64.gif"></li>
						<li @click="faceClick($event)" title="[威武]"><img src="/static/img/face/65.gif"></li>
						<li @click="faceClick($event)" title="[奥特曼]"><img src="/static/img/face/66.gif"></li>
						<li @click="faceClick($event)" title="[礼物]"><img src="/static/img/face/67.gif"></li>
						<li @click="faceClick($event)" title="[钟]"><img src="/static/img/face/68.gif"></li>
						<li @click="faceClick($event)" title="[话筒]"><img src="/static/img/face/69.gif"></li>
						<li @click="faceClick($event)" title="[蜡烛]"><img src="/static/img/face/70.gif"></li>
						<li @click="faceClick($event)" title="[蛋糕]"><img src="/static/img/face/71.gif"></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	import { VueFileImg, VueHeaderNav, VueCollphone } from '../component'
	export default {
		components: {
			XHeader,
			VueFileImg,
			VueHeaderNav,
			VueCollphone
		},
		data() {
			return {
				face: false,
				txt: '',
				toname: undefined,

			}
		},
		mounted() {
			var _this = this;
			this.$previewRefresh(); //图片点击查看
			this.read(); //消息已读
			if(this.$store.state.chat.data[this.$route.params.id]) { //修改成已读状态
				this.$store.state.chat.data[this.$route.params.id].is_du = 1
			}
			var is_bu = _.find(this.$store.state.chat.data, function(e) { //检测全部是否已读
				return e.is_du == 0;
			});
			if(is_bu) {
				_this.$store.state.is_du = 0;
			} else {
				_this.$store.state.is_du = 1;
			}
			this.getName();
			setTimeout(function() {
				$('.layim-chat-main').scrollTop(1000000);
			}, 50)

		},
		computed: {
			phone() { //真实电话需要的参数
				return {
					type: this.$route.query.type || 3,
					projectid: this.$route.query.coop,
					memid: this.$route.params.id,
				}
			},
			user() {
				return this.$store.state.user;
			},
			list() {
//				console.log(this.$store.state.chat.list)
				return this.$store.state.chat.list[this.$route.params.id];
			},
			data() {
				return this.$store.state.chat.data[this.$route.params.id] || {};
			},
		},
		watch: {
			list: { //聊天数据变化时滚动条到达底部
				handler() {
					setTimeout(function() {
						$('.layim-chat-main').scrollTop(1000000);
					}, 50)
					this.$previewRefresh()
				},
				deep: true
			}
		},
		methods: {
			onshow(val) {
				this[val] = !this[val];
			},
			faceClick(e) {
				this.txt += 'face' + e.currentTarget.title;
			},
			fileimg(res) {
				this.form(true, res.imgurl);
			},
			form(type, imgurl) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Chat/chats', {
					'load': false,
					uid: _this.$route.params.id,
					type: type ? 'img' : 'txt',
					data: imgurl || _this.txt,
				}).then((res) => {
					if(!res) return;
					var d = {
						"type": "chat",
						"for": _this.user.mem_id,
						"to": _this.$route.params.id,
						"msg": {},
						"time": Date.parse(new Date()) / 1000,
						"nickname": _this.user.mem_nickname,
						"headimgurl": _this.user.mem_headimgurl
					};
					d.msg.type = type ? 'img' : 'txt';
					d.msg.data = imgurl || _this.txt;
					_this.$store.commit('chat', d);
					_this.txt = '';

				})
			},
			getName() { //发起方获取对方基本数据
				var _this = this;
				if(_this.data.nickname) return;
				this.$store.dispatch('chatUser', this.$route.params.id);
			},
			read() { //已读消息
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Chat/alreadyRead', {
					'load': false,
					uid: _this.$route.params.id,
				}).then((res) => {
					if(!res) return;
				})
			}
		},
		beforeUpdate() {
			setTimeout(function() {
				$('.layim-chat-main').scrollTop(1000000);
			}, 50)
		}
	}
</script>

<style scoped>
	.layim-chat-system .notli2 {
		text-align: left;
	}
	
	.layim-chat-system .notli2 span {
		background: none;
		display: inline;
		color: inherit;
		padding: 0;
		line-height: inherit;
		font-size: inherit;
	}
	
	.layim-panel .li {
		padding: 5px 10px;
		background: #fff;
		border-radius: 5px;
	}
	
	.layim-panel .li .img {
		height: 70px;
		display: inline-block;
		vertical-align: middle;
		margin-right: 15px;
	}
	
	.layim-panel .li .img img {
		width: auto;
		height: 100%;
	}
	
	.layim-panel .li>.txt {
		max-width: 200px;
		font-size: 15px;
		color: #636363;
		line-height: 20px;
		display: inline-block;
		vertical-align: middle;
	}
	
	.layim-panel .li>.txt .tit_name {
		color: #333;
		font-weight: 800;
	}
	
	.layim-panel .li>.txt .txtsp2 {
		font-size: 13px;
	}
	
	.layim-panel .li>.txt .diqu {
		color: #565656;
		font-size: 12px;
	}
	
	.layim-panel .li>.txt .txtsp2 .iconfont {
		font-size: 14px;
		display: inline-block;
		vertical-align: middle;
	}
	
	.layim-panel .li>.txt .txtsp2 .diqutxt {
		font-size: 12px;
		margin-right: 10px;
		color: #999;
	}
	
	.layim-panel .li>.txt .color {
		color: #565656;
	}
	
	.layim-panel .li {
		display: flex;
	}
	
	.liaotian {
		
		overflow: hidden;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		-webkit-text-overflow: ellipsis;
		-moz-text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>