<template>
	<div>
		<x-header :title="'详情'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="fanhui()" class="header">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>

		<div>
			<!--类型下面的大咖-->

			<div class="list">

				<div class="info">
					<div>
						<div class="card-top">
							<div class="card-left">
								<img :src="$store.state.website.website_domain_name + '/uploads/' + user_row.mem_headimgurl" alt="" class="info-tx" />
								<div class="grxx">
									<div>{{user_row.mem_nickname}}</div>
									<div>{{dy_row.addtime|returntime8}}</div>
								</div>
							</div>
							<div class="card-right" v-if="userid!=user_row.mem_id&& $route.params.type==1">
								<div v-if="info.is_f==1" style="background:gainsboro;" @click="cancel(user_row.mem_id)">已关注</div>
								<div v-else="" @click="gz(user_row.mem_id)">关注</div>


								<div v-if="info.is_r==1" style="background:gainsboro;">已举报</div>
								<div v-else="" @click="jb()">举报</div>
							</div>
							<!-- <div v-if="$route.params.type==2 && isDelet" class="card-right"> -->
							<div v-if="isDelet" class="card-right">
								<div @click="deldy()">删除</div>
							</div>

						</div>
						<div class="nr">
							<div class="fb_content" v-html="dy_row.content">{{dy_row.content}}</div>
							<div class="tp" v-if="dy_row.type==1">
								<div v-for="(items,index) in img" class="tp_show">
									<div>
										<img :src="$store.state.website.website_domain_name + '/uploads/' + items" alt="" @click="zoom(index)" />
									</div>
								</div>
							</div>
							<div v-if="dy_row.type==2" class="tp" style="width: 70%;height: 250px;">
								<video playsinline="playsinline" webkit-playsinline="true" x5-playsinline="true" x5-video-player-type="h5"
								 x5-video-player-fullscreen="false" style="width:100%;height:100%;object-fit: fill" controls="controls" class="vjs-tech sp"
								 id="headvideo" :src="$store.state.website.website_domain_name + '/uploads/' +img">
									<source :src="$store.state.website.website_domain_name + '/uploads/' + img" type="video/mp4">
								</video>
							</div>
						</div>
					</div>
					<div class="db">
						<div v-if="info.typename">行业:{{info.typename}}</div>
						<div v-else="">行业：暂无</div>
						<div class="dz1" @click="cancels(user_row.mem_id)" v-if="info.is_s==1">
							<i class="iconfont icon-xin"></i>
						</div>
						<div class="dz" @click="dz(user_row.mem_id)" v-else="">
							<i class="iconfont icon-guanzhu"></i>
						</div>
						<img src="/static/img/dz.gif" alt="" v-if="show1" class="dz_gif" />
					</div>
					<div>
						<div class="gzlist">
							<img src="/static/img/dz1.png" alt="" class="dz_icon" />
							<div class="pl-tx" v-if="dy_mems.length<10">
								<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" alt="" v-for="(item,index) in dy_mems"
								 v-if="index<10" />

							</div>
							<div v-if="dy_mems.length>=10">{{dy_mems.length}}人觉得很赞</div>
						</div>
						<div>
							<div v-for="item in list">

								<div class="plitem">
									<div class="pl-info">
										<div class="grtx" @click="pl(item.mem_nickname,item.id,item.uid)">
											<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" alt="" />
											{{item.mem_nickname}}
										</div>
										<div class="del" @click="del(item.id)" v-if="userid==item.uid">删除</div>
									</div>
									<div class="text-left">{{item.addtime|returntime9}}</div>
									<div class="detail" @click="pl(item.mem_nickname,item.id,item.uid)">
										{{item.content|code}}
									</div>

								</div>
								<div class="plitem" v-for="items in item.reply" style="margin-left: 30px;">
									<div class="pl-info">
										<div class="grtx" @click="pl(items.userid_nickname,items.v_id,items.userid)">
											<img :src="$store.state.website.website_domain_name + '/uploads/' + items.userid_headimgurl" alt="" />
											{{items.userid_nickname}}
											<span style="margin: 0 5px;">回复</span>
											<img :src="$store.state.website.website_domain_name + '/uploads/' + items.b_uid_headimgurl" alt="" />
											{{items.b_uid_nickname}}
										</div>
										<div class="del" @click="dels(items.id)" v-if="userid==items.userid">删除</div>
									</div>
									<div class="text-left">{{item.addtime|returntime9}}</div>
									<div class="detail" @click="pl(items.userid_nickname,items.v_id,items.userid)">
										{{items.content|code}}
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>

		<div class="huifu" @click="pltc(1)">
			<div>{{content}}</div>
			<div>回复</div>
		</div>
		<div class="hhpl" @touchmove.prevent @click="close($event)" v-if="show">
			<div class="hhnr" ref="msk">
				<textarea name="" rows="" cols="" :placeholder="content" v-model="nr"></textarea>
				<div @click="submit()">回复</div>
			</div>
		</div>

		<div class="zooImg" @touchmove.prevent @click="closeimg($event)" v-if="show3">
			<div ref="img" @click="closeImg1()">
				<swiper :list="list1" style="width:80%;margin:10% auto 0;" :aspect-ratio="5/3" dots-position="center"
				 @on-index-change="onChange" v-model="img_index"></swiper>

			</div>
		</div>

		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>

	</div>
</template>

<script>
	import {
		VueShareit,
		VueHeaderNav
	} from '../component/'
	import {
		XHeader,
		XTextarea,
		Swiper
	} from 'vux'
	import {
		Base64
	} from 'js-base64'
	import 'swiper/dist/css/swiper.min.css';
	export default {
		components: {
			XHeader,
			VueShareit,
			Swiper,
			VueHeaderNav,
		},
		data() {
			return {
				show: false,
				content: '留下您的评论...',
				info: '',
				userid: '',
				user_row: '',
				dy_row: '',
				dy_mems: '',
				show1: false,
				time: '',
				list: '',
				nr: '',
				show2: '',
				id: '',
				uid: '',
				zoomimg: '',
				show3: false,
				img_index: 0,
				list1: [],
				img: '',
				f_title: '',
				isDelet: true, //判断是否是自己发布的动态来显示删除按钮

			}
		},
		mounted() {
			var _this = this;
			_this.detail();
			_this.pldetail();
			_this.userid = _this.$store.state.token;

		},

		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: this.$route.params.des,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动社区',
					imgUrl: '/static/logo.png',
					link: '/shequ/index/' + this.$route.params.id + '/' + this.$route.params.type
				}
			},
		},
		methods: {
			fanhui() {
				this.urls = new URL(window.location.href)
				if (this.urls.searchParams.get("uidkey")) {
					this.$router.push('/shequ/index')
				} else {
					this.$router.go(-1)
				}
			},
			onChange(index) {

			},
			//评论
			pl(i, id, uid) {
				console.log(i, id, uid)
				var _this = this;
				if (_this.$store.state.token == uid) {
					msg("自己不能评论自己");
					_this.content = "留下您的评论...";
				} else {
					_this.content = "回复" + i;
					_this.show = true;
					_this.show2 = 2;
					_this.id = id;
					_this.uid = uid;
				}

			},
			pltc(i) {
				var _this = this;
				_this.show = true;
				_this.show2 = i;

			},
			//关闭弹窗
			close(ev) {
				var _this = this;
				if (!_this.$refs.msk.contains(ev.target)) {
					_this.show = false;
					_this.id = "";
					_this.uid = "";
					_this.content = "留下您的评论...";
				}
			},
			jb() {
				var _this = this;
				_this.$router.push('../../../jubao/' + _this.$route.params.id);
			},
			detail() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/dy_info', {
					lood: false,
					d_id: _this.$route.params.id
				}).then(function(res) {
					if (!res) return;
					_this.info = res;
					_this.user_row = res.user_row;
					_this.dy_row = res.dy_row;
					_this.dy_mems = res.dy_mems;
					_this.img = _this.dy_row.img;
					_this.f_title = res.dy_row.title;
					if (res.dy_row.uid == _this.$store.state.user.mem_id) {
						_this.isDelet = true
					} else {
						_this.isDelet = false
					} //判断是否是自己发布的动态显示删除按钮

				})
			},
			//关注
			gz(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/follow_ht', {
					lood: false,
					b_uid: id
				}).then(function(res) {
					if (!res) return;
					_this.detail();
				})
			},
			//取消关注
			cancel(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/cancle_follow', {
					lood: false,
					b_uid: id
				}).then(function(res) {
					if (!res) return;
					_this.detail();
				})
			},
			//点赞
			dz(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/support_ht', {
					load: false,
					b_uid: id,
					d_id: _this.$route.params.id
				}).then(function(res) {
					if (!res) return;
					_this.show1 = true;
					_this.time = setInterval(function() {
						_this.show1 = false;
						clearInterval(_this.time);
					}, 1000)
					_this.detail();
				})
			},
			//取消点赞
			cancels(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/cancle_support', {
					load: false,
					b_uid: id,
					d_id: _this.$route.params.id
				}).then(function(res) {
					if (!res) return;
					_this.detail();

				})
			},
			pldetail() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/review', {
					lood: false,
					d_id: _this.$route.params.id
				}).then(function(res) {
					if (!res) return;
					_this.list = res;
				})
			},
			submit() {
				var _this = this;
				_this.content = '留下您的评论...';
				if (!_this.nr) {
					msg("请输入评论内容");
					return;
				}
				_this.show = false;
				_this.nr = Base64.encode(_this.nr);
				if (_this.show2 == 1) {
					_this.$http.post(_this.$store.state.url + '/Follow/v_dy', {
						lood: false,
						d_id: _this.$route.params.id,
						content: _this.nr
					}).then(function(res) {
						if (!res) return;

						msg("评论成功");
						_this.nr = "";
						_this.pldetail();
					})
				} else {
					_this.$http.post(_this.$store.state.url + '/Follow/p_dy', {
						lood: false,
						content: _this.nr,
						v_id: _this.id,
						b_uid: _this.uid
					}).then(function(res) {
						if (!res) return;

						msg("评论成功");
						_this.nr = "";
						_this.pldetail();
					})
				}
			},
			del(i) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/del_review', {
					lood: false,
					id: i
				}).then(function(res) {
					if (!res) return;
					_this.pldetail();
					// _this.$router.push('/user/fabushequ?id=' + 1)
					msg("删除成功");
				})
			},
			dels(i) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/del_reply', {
					lood: false,
					id: i
				}).then(function(res) {
					if (!res) return;
					_this.pldetail();
					msg("删除成功");
				})
			},
			deldy() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/del_dy', {
					lood: false,
					id: _this.$route.params.id
				}).then(function(res) {
					if (!res) return;
					msg("删除成功");
					_this.$router.push('/shequ/index');
				})
			},
			//放大图片
			zoom(index) {
				var _this = this;
				for (var i in _this.img) {
					_this.list1[i] = {};
					_this.list1[i].img = _this.$store.state.website.website_domain_name + '/uploads/' + _this.img[i];
				}
				_this.img_index = index;
				_this.show3 = true;
			},
			//关闭图片
			closeimg(ev) {
				var _this = this;
				if (!_this.$refs.img.contains(ev.target)) {
					_this.show3 = false;
				}
			},
			closeImg1() {
				var _this = this;
				_this.show3 = false;
			},

		},

	}
</script>

<style scoped>
	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-left {
		display: flex;
		align-items: center;
	}

	.card-right {
		display: flex;
	}

	.card-right div:nth-child(2) {
		/*border-radius: 20px;*/
		padding: 3px 10px;
		color: #FFFFFF;
		background: forestgreen;
		margin-right: 10px;
	}

	.card-right div:nth-child(1) {
		background: #f74c31;
		color: white;
		padding: 2px 8px;
		border-radius: 4px;
		margin-right: 10px;
	}

	.info {
		padding: 10px;
		background: white;
		margin: 10px auto 60px;
		border-radius: 8px;
	}

	.info-tx {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 5px;
	}

	.nr {
		padding: 10px 0;
		box-sizing: border-box;
	}

	.tp {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.tp .tp_show {
		width: 32%;
		height: 100px;
		height: auto;
		margin: 0.5%;
		overflow: hidden;
	}

	.tp .tp_show div {
		overflow: hidden;
		height: 100px;
	}

	.db {
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.dz_gif {
		width: 70px;
		height: 70px;
		position: absolute;
		right: -17px;
		bottom: -20px;
	}

	.jbxx {
		display: flex;
		align-items: center;
	}

	.jbxx div:nth-child(2) {
		margin: 0 10px;
	}

	.jbxx div:nth-child(4) {
		background: #f74c31;
		color: white;
		padding: 2px 8px;
		border-radius: 4px;
	}

	.grxx div:nth-child(1) {
		font-weight: 600;
		font-size: 11px;
	}

	.pl-tx {
		display: flex;
		flex-wrap: wrap;
		padding: 5px 0;
		width: 90%;
	}

	.pl-tx img {
		width: 9%;
		height: 28px;
		margin: 0.5%;
		border-radius: 50%;
	}

	.gzlist {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-top: solid 1px #f3f3f3;
		border-bottom: solid 1px #f3f3f3;
		padding: 10px 0;
	}

	.gzlist i {
		color: #f74c31 !important;
		position: relative;
		top: 5px;
	}

	.grtx {
		display: flex;
		align-items: center;
	}

	.grtx img {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.pl-info {
		display: flex;
		justify-content: space-between;
	}

	.del {
		background: #f74c31;
		height: 20px;
		color: white;
		padding: 2px 4px;
	}

	.plitem {
		padding: 10px 0;
		border-bottom: solid 1px #f3f3f3;
	}

	.detail {
		padding: 10px 0;
	}

	.xj {
		width: 20px;
		height: 20px;
		position: absolute;
		right: 5px;
		top: 0px;
	}

	.fb {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(210, 210, 210, 0.8);
	}

	.fb-card {
		position: absolute;
		bottom: 50px;
		right: 0;
		left: 0;
	}

	.fb-card div {
		background: white;
		text-align: center;
		font-size: 12px;
		padding: 15px 0;
	}

	.fb-card div:nth-child(2) {
		margin: 1px 0;
	}

	.fb-card div:nth-child(4) {
		margin-top: 3px;
	}

	.huifu {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		border-top: 1px solid gainsboro;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.huifu div:nth-child(1) {
		padding-left: 15px;
	}

	.huifu div:nth-child(2) {
		background: limegreen;
		color: white;
		width: 30px;
		padding: 10px;
	}

	.hhpl {
		position: fixed;
		top: 0;
		bottom: 0px;
		right: 0;
		left: 0;
		background: rgba(210, 210, 210, 0.8);
	}

	.hhnr {
		position: absolute;
		bottom: 0px;
		right: 0;
		left: 0;
		background: white;
		font-size: 12px;
		padding: 15px;
		box-sizing: border-box;
	}

	.hhnr div {
		background: limegreen;
		color: white;
		width: 30px;
		padding: 10px;
		float: right;
	}

	.hhnr textarea {
		border: 1px solid lightgrey;
		margin: 0 auto;
		width: 100%;
		height: 100px;
		padding: 15px;
		box-sizing: border-box;
	}

	.dzs i {
		color: orangered;
	}

	.dz1 i {
		color: #f74c31;
	}

	.dz_icon {
		width: 20px;
		height: 20px;
	}

	/*上传图片*/

	.zooImg {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: black;
	}

	.zoom {
		display: block;
		margin: 15% auto;
		width: 100%;
		height: 80%;
	}

	.text-left {
		font-size: 10px;
		color: #C8C8CD;
		margin-top: 3px;
	}

	.vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-img {
		/* background-size: 100% 100% !important; */
	}

	.fb_content {
		word-wrap: break-word;
	}
	.vux-img {
		background-size: 9rem!important;
	}

</style>
