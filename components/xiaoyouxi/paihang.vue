<template>
	<div class="container">
		<div ref="vHeader">
			<x-header class="header">
				<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
				<div slot="overwrite-title" class="title" :style="borderColor">排行榜</div>
			</x-header>
		</div>
		<div ref="tab">
			<tab :line-width=2 active-color='#FF7F00' v-model="index" custom-bar-width="60px">
				<tab-item class="vux-center" v-for="(item, index) in list2" @on-item-click="go(index+1)" :key="index">{{item}}</tab-item>
			</tab>
		</div>
		<div class="dataReflash" ref="dataReflash">
			*排行榜数据实时更新
		</div>
		<swiper v-model="index" :height="vHeight" :show-dots="false">
			<swiper-item>
				<div class="tab-swiper vux-center">
					<vue-list :type="type" :item="list" :result="result" :Cheight="cHeight"></vue-list>
				</div>
			</swiper-item>
		</swiper>
		<div class="footer" ref="footer">
			<swiper :list="banner_list" :show-dots="false" :auto="true" :aspect-ratio="9/16" height="120px"></swiper>
		</div>
		<vue-game :type="2"></vue-game>
		<vue-shareit></vue-shareit>
	</div>

</template>

<script>
	import {
		XHeader,
		Badge,
		Grid,
		GridItem,
		Tab,
		TabItem,
		Swiper,
		SwiperItem
	} from 'vux'
	import VueList from '../component/game/list'
	import VueShareit from '../component/game/gameShareit'
	import {
		VueGame
	} from '../component/'
	// const list = () => ['红包榜', '出题榜', '富豪榜']
	export default {
		components: {
			XHeader,
			Badge,
			Grid,
			GridItem,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			VueList,
			VueShareit,
			VueGame
		},
		data() {
			return {
				list: null,
				result: null,
				borderColor: {
					borderColor: '#333333'
				},
				index: 0,
				list2: ['红包榜', '出题榜', '富豪榜'],
				// demo2: '美食',
				type: 1,
				vHeight: '0px',
				cHeight: 0,
				banner_list: [{
					img: '/static/img/game/guanggao.jpg'
				}, {
					img: '/static/img/game/guanggao.jpg'
				}],
				shareId: '',
				is_info_id: '',  //上个页面传的活动id
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		mounted() {
			if (this.$route.query.id == 1) {
				this.list2 = ['红包榜']
			};
			if (this.$route.query.is_info_id) {
				this.is_info_id = this.$route.query.is_info_id
			} else {
				this.is_info_id = ''
			}
			this.go(this.type)
			//分享的题库id
			if (this.$route.query.shareId) {
				this.shareId = this.$oute.query.shareId
			};
			var _this = this
			var h = document.documentElement.clientHeight || document.body.clientHeight;
			// console.log(_this.$refs.vHeader.offsetHeight)
			_this.vHeight = h - (_this.$refs.vHeader.offsetHeight + _this.$refs.tab.offsetHeight + _this.$refs.dataReflash.offsetHeight +
				140) + 'px'
			_this.cHeight = h - (_this.$refs.vHeader.offsetHeight + _this.$refs.tab.offsetHeight + _this.$refs.dataReflash.offsetHeight +
				140)

		},
		created() {
			
			this.getImgData()
		},
		methods: {
			getImgData() {
				var _this = this
				_this.$http.post(_this.$store.state.url + '/Applets/get_rich_img', {
					'load': false
				}).then((res) => {
					if (res != []) {
						let list = []
						for (let i in res.imgurl) {
							list[i] = {}
							list[i].img = this.$store.state.website.website_domain_name + '/uploads/' + res.imgurl[i] // banner图片
							list[i].fallbackImg = '/static/img/game/guanggao.jpg' // 备用图片
						}
						this.banner_list = list
					}
				})
			},
			go(type) {
				this.type = type
				let _this = this
				if (type === 1) {
					_this.$http.post(_this.$store.state.url + '/Applets/redPackageRanking', {
						load: true,
						assist_id: _this.is_info_id
					}).then(function(res) {
						_this.list = res.datas
						_this.result = res.result
					})
				} else if (type === 2) {
					_this.$http.post(_this.$store.state.url + '/Applets/outTopicRanking', {
						load: true
					}).then(function(res) {
						_this.list = res.datas
						_this.result = res.result
					})
				} else if (type === 3) {
					_this.$http.post(_this.$store.state.url + '/Applets/volvoTopicRanking', {
						load: true
					}).then(function(res) {
						if (!res) return
						_this.list = res.datas
						_this.result = res.result
					})
				}
			},
			goBack() {
				// history.go(-1)
				this.$router.push('/game/index')
			}
		}
	}
</script>

<style scoped>
	.vux-header {
		background-color: #ffffff;
	}

	.goBack {
		position: absolute;
		width: 12px;
		height: 12px;
		border-style: solid;
		border-color: white;
		border-width: 1px 0 0 1px;
		-webkit-transform: rotate(315deg);
		transform: rotate(315deg);
		top: 3px;
	}

	.title {
		font-size: 18px;
		text-align: center;
		line-height: 1.066667rem;
	}

	.dataReflash {
		width: 100%;
		margin-top: 10px;
		background-color: #fff;
		text-align: center;
		color: #FFAA01;
		padding: 9px 0;
		font-size: 14px;
	}

	.footer {
		position: fixed;
		bottom: 0px;
		width: 345px;
		margin: 0px 15px;
	}
</style>
