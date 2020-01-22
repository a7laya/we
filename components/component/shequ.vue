<template>
	<div>
		<div class="info" :id="item.id">

			<div>
				<div class="card-top">
					<!--<div class="card-left">-->
					<div class="card-left" @click="user(item.mem_id)">
						<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" alt="" class="info-tx" />
						<div class="grxx">
							<div>{{item.mem_nickname}}</div>
							<div>{{item.addtime|returntime9}}</div>
						</div>
					</div>
					<!--</div>-->
					<div class="card-right" v-if="item.company">
						<div @click="company(item.mem_id,item.company)">主页</div>
						<!--<div>进入店铺</div>-->
					</div>
				</div>
				<div class="nr" >
					<div class="fbnr" v-html="item.content" @click="detail(item.id,item.title)">{{item.content}}</div>
					<div class="tp" v-if="item.type==1">
						<div v-for="(items,index) in item.img" class="tp_show">
							<div>
								<img :src="$store.state.website.website_domain_name + '/uploads/' + items" alt="" @click="zoom(index,item)" />
							</div>
						</div>
					</div>
					<div class="tp" v-if="item.type==2" style="width: 70%;height: 250px;" >
						<video playsinline="playsinline" oncontextmenu="return(false);" webkit-playsinline="true" x5-playsinline="true"
						 x5-video-player-type="h5" x5-video-player-fullscreen="false" style="width= 100%; height=100%; object-fit: fill"
						 controls="controls" class="vjs-tech sp" id="headvideo" :src="$store.state.website.website_domain_name + '/uploads/' + item.img">
							<source :src="$store.state.website.website_domain_name + '/uploads/' + item.img" type="video/mp4">
						</video>
						<!--<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions[index]" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)">
						</video-player>-->
						<!-- <video-player  class="vjs-custom-skin"
                           ref="videoPlayer"
                           :options="playerOptions"
                           :playsinline="true"
                           @play="onPlayerPlay($event)"
                           @pause="onPlayerPause($event)"
                           @ended="onPlayerEnded($event)"
                           @loadeddata="onPlayerLoadeddata($event)"
                           @waiting="onPlayerWaiting($event)"
                           @playing="onPlayerPlaying($event)"
                           @timeupdate="onPlayerTimeupdate($event)"
                           @canplay="onPlayerCanplay($event)"
                           @canplaythrough="onPlayerCanplaythrough($event)"
                           @ready="playerReadied"
                           @statechanged="playerStateChanged($event)">
            </video-player> -->
					</div>
				</div>
			</div>
			<div class="db">
				<div v-if="item.typename">行业:{{item.typename}}</div>
				<div v-else="">行业:暂无</div>
				<div class="jbxx">
					<!--<div class="jbxx" >-->
					
					<div>
						<i class="iconfont icon-pinglun"></i> {{item.comment}}
					</div>
					<div v-if="item.is_s==1" class="dzs" @click="cancels(item.id,item.mem_id,item)">
						<i class="iconfont icon-xin"></i> {{item.dianzan}}
					</div>
					<div v-else="" @click="dz(item.id,item.mem_id,item)">
						<i class="iconfont icon-guanzhu"></i> {{item.dianzan}}
					</div>
					<!-- <img src="/static/img/dz.gif" alt="" v-if="show1" class="dz_gif" /> -->
					<!--</div>-->
				</div>

			</div>
			
			<div class="zooImg" @touchmove.prevent @click="closeimg($event)" v-if="show3">
				<div ref="img" @click="closeImg1()">
					<swiper :list="list1" style="width:100%;margin:10% auto 0;" :aspect-ratio="5/3" dots-position="center"
					 @on-index-change="onChange" v-model="img_index"></swiper>
			
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import {
		Badge,
		Swiper
	} from 'vux'

	import {
		videoPlayer
	} from 'vue-video-player';
	export default {
		components: {
			Badge,
			videoPlayer,
			Swiper
		},
		props: {
			item: Object,
			type: Number,
		},
		data() {
			return {
				show1: false,
				time: '',
				show3: false,
				list1: [],
				img_index: 0,
				// playerOptions: {
				//   height: '360',
				//   autoplay: true,
				//   muted: true,
				//   language: 'en',
				//   playbackRates: [0.7, 1.0, 1.5, 2.0],
				//   sources: [{
				//     type: "video/mp4",
				//     src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
				//   }],
				//   poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
				// }
			}
		},
		mounted() {
			// setTimeout(() => {
			//   console.log('dynamic change options', this.player)
			//   this.player.muted(false)
			// }, 5000)
		},
		methods: {
			// playerReadied(player) {
			//   // seek to 10s
			//   console.log('example player 1 readied', player)
			//   player.currentTime(10)
			//   // console.log('example 01: the player is readied', player)
			// },
			detail(id, title) {
				let _this = this;
				if (_this.type == 1) {
					_this.$router.push("detail/" + id + "/" + _this.type + "/" + title)
				} else {
					_this.$router.push("/shequ/detail/" + id + "/" + _this.type + "/" + title)
				}
			},
			user(id) {
				let _this = this;

				if (_this.type == 1) {
					_this.$router.push("history/" + id)
				} else {
					_this.$router.push("/shequ/history/" + id)
				}
			},
			company(memid, companyid) {
				let _this = this;
				_this.$router.push("/yellowPages/index?uid=" + memid + "&id=" + companyid)

			},
			//点赞
			dz(id, mem_id,item) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/support_ht', {
					load: false,
					b_uid: mem_id,
					d_id: id
				}).then(function(res) {
					if (!res) return;
					// _this.show1 = true;
					// _this.time = setInterval(function() {
					// 	_this.show1 = false;
					// 	clearInterval(_this.time);
					// }, 1000)
					// _this.detail();
					_this.item.is_s = 1
					_this.$parent.reload()
				})
			},
			//取消点赞
			cancels(id, mem_id, item) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/cancle_support', {
					load: false,
					b_uid: mem_id,
					d_id: id
				}).then(function(res) {
					if (!res) return;
					// _this.detail();
					_this.item.is_s = null
					_this.$parent.reload()
				})
			},
			
			//放大图片
			zoom(index,item) {
				var _this = this;
				console.log('itemitem')
				console.log(item)
				for (var i in item.img) {
					_this.list1[i] = {};
					_this.list1[i].img = _this.$store.state.website.website_domain_name + '/uploads/' + item.img[i];
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
			onChange(index) {
			
			},
			
		},
		computed: {
			player() {
				return this.$refs.videoPlayer.player
			}
		},


	}
</script>

<style scoped="">
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

	.card-right div {
		border-radius: 20px;
		padding: 3px 10px;
		color: #FFFFFF;
	}

	.card-right div:nth-child(1) {
		background: #007DDB;
		margin-right: 10px;
	}

	.card-right div:nth-child(2) {
		background: #12a211;
	}

	.info {
		padding: 10px;
		background: white;
		margin: 10px;
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

	.fbnr {
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		max-height: 100px;
		padding-bottom: 10px;
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
	}

	.jbxx {
		display: flex;
		align-items: center;
	}

	.jbxx div:nth-child(2) {
		margin: 0 10px;
	}

	.grxx div:nth-child(1) {
		font-weight: 600;
		font-size: 11px;
	}

	.pl-tx {
		display: flex;
		flex-wrap: wrap;
		border-top: solid 1px #f3f3f3;
		border-bottom: solid 1px #f3f3f3;
		padding: 5px 0;
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

	.dzs i {
		color: #f74c31;
	}

	.vjs-tech {
		width: 100% !important;
	}

	.sp {
		width: 100%;
		height: 100%;
	}
	
	.dz_gif {
		width: 70px;
		height: 70px;
		position: absolute;
		right: -17px;
		bottom: -20px;
	}
	
	
	.zooImg {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: black;
		z-index: 100000;
	}
	
</style>
