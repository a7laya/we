<template>
	<div>
		<x-header :title="'历史发布'" :left-options="{backText:''}" class="header">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>

		<div class="card-top">
			<div class="card-left">
				<img :src="$store.state.website.website_domain_name + '/uploads/' + user_row.mem_headimgurl" alt="" class="info-tx" @click="look(user_row.mem_id)" />
				<div class="grxx">
					<div>{{user_row.mem_nickname}}</div>
					<div v-if="user_row.mem_hangye">行业:{{user_row.mem_hangye}}</div>
					<div v-else="">行业:暂无</div>
				</div>
			</div>
			<div class="card-right" v-if="userid!=user_row.mem_id">

				<div v-if="isf==1" style="background:gainsboro;" @click="cancel(user_row.mem_id)">已关注</div>
				<div v-else="" @click="gz(user_row.mem_id)">关注</div>
			</div>
		</div>
		<div class="lsfb">TA的历史发布</div>
		<div class="list">
			<div class="info">
				<div v-for="item in list" class="content">
					<div class="db">
						<div>发布时间：{{item.addtime|returntime8}}</div>
					</div>
					<router-link tag="div" :to="'../detail/'+item.id+'/1/'+item.title" class="nr">
						<div class="fbnr" v-html="item.content">{{item.content}}</div>
						<div class="tp" v-if="item.type==1">
							<img :src="$store.state.website.website_domain_name + '/uploads/' + items" alt="" v-for="items in item.img" />
						</div>
						<div class="tp" v-if="item.type==2" style="width: 50%;height: 250px;">
						<video playsinline="playsinline" webkit-playsinline="true" x5-playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="false" style="width= 100%; height=100%; object-fit: fill" controls="controls" class="vjs-tech sp" id="headvideo" :src="$store.state.website.website_domain_name + '/uploads/' + item.img" >
							<source :src="$store.state.website.website_domain_name + '/uploads/' + item.img" type="video/mp4" >
						</video>
					</div>
					</router-link>
				</div>
				<vue-loading :url="$store.state.url + '/Follow/dy_his2?page=1&limit=10&uid='+$route.params.id" @ievent="loaddata"></vue-loading>

			</div>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, XTextarea } from 'vux'
	import { VueShareit, VueLoading, VueHeaderNav } from '../component/'
	export default {
		components: {
			XHeader,
			VueShareit,
			VueLoading,
			VueHeaderNav
		},
		data() {
			return {
				show: false,
				dy_data: '',
				user_row: '',
				isf: false,
				userid: '',
				mem_id: '',
				list: []
			}
		},
		mounted() {
			var _this = this;
			_this.detail();
			_this.userid = _this.$store.state.token;
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动社区',
					imgUrl: '/static/logo.png',
					link: '/shequ/index'
				}
			},
		},
		methods: {
//			获取信息
			detail() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/dy_his', {
					lood: false,
					uid: _this.$route.params.id
				}).then(function(res) {
					if(!res) return;
					_this.dy_data = res.dy_data;
					_this.user_row = res.user_row;
					_this.isf = res.is_f;

				})
			},
			//关注
			gz(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/follow_ht', {
					lood: false,
					b_uid: id
				}).then(function(res) {
					if(!res) return;
					_this.detail();
				})
			},
			//取关
			cancel(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/cancle_follow', {
					lood: false,
					b_uid: id
				}).then(function(res) {
					if(!res) return;
					_this.detail();
				})
			},
			//查看信息
			look(i) {
				var _this = this;
				_this.$router.push('../../user/usershow/' + i);
			},
			loaddata(res) {
				var _this = this
				_.each(res, function(e) {
					_this.list = _this.list || []
					_this.list.push(e)
				})
			},
		}
	}
</script>

<style scoped>
	.card-top {
		background: #FFFFFF;
		text-align: center;
		padding-bottom: 5px;
	}
	
	.card-left {
		text-align: center;
		padding: 20px 0px 2px;
	}
	
	.card-right {
		margin: 0 auto;
	}
	
	.card-right div:nth-child(1) {
		background: #f74c31;
		color: white;
		padding: 2px 8px;
		border-radius: 4px;
		width: 20%;
		margin: 20px auto;
	}
	
	.lsfb {
		background: white;
		text-align: center;
		font-size: 12px;
		margin: 2px 1px;
		padding: 8px 0;
		font-weight: 600;
	}
	
	.info {
		margin: 0px auto 60px;
		border-radius: 8px;
	}
	
	.content {
		background: white;
		margin-bottom: 2px;
		padding: 10px;
	}
	
	.info-tx {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin-right: 5px;
		display: block;
		margin: 10px auto;
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
	
	.tp img {
		width: 32%;
		height: 100px;
		margin: 0.5%;
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
		color: #f74c31!important;
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
	
	.fbnr {
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical
	}
	.sp {
		width: 100%;
		height: 100%;
	}
</style>