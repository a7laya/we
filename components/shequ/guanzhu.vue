<template>
	<div>
		<x-header :title="'我的关注'" :left-options="{backText:''}" class="header">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>

		<div class="gz-list">
			<div class="gz-item" v-for="item in user_list">
				<!--</div>-->
				<router-link tag="div" :to="'history/'+item.b_uid" class="gz-item-left">
					<!--<div class="gz-item-left">-->
					<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" class="tx" @click="detail(item.mem_id)" />
					<div class="info">
						<div>
							{{item.mem_nickname}}
						</div>
						<div v-if="item.typename">
							行业: {{item.typename}}
						</div>
						<div v-else="">行业：暂无</div>
					</div>
					<!--</div>-->
				</router-link>
				<div class="qxgz" @click="cancel(item.mem_id,item.d_id)">取消关注</div>
			</div>
		</div>

		<div v-if="user_list == null">
			<load-more></load-more>
		</div>
		<div v-else>
			<load-more v-if="user_list.length==0" :show-loading="false" :tip="'暂无数据'"></load-more>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>

	</div>
</template>

<script>
	import { XHeader, LoadMore } from 'vux'
	import { VueHeaderNav, VueShareit } from '../component/'
	export default {
		components: {
			XHeader,
			LoadMore,
			VueHeaderNav,
			VueShareit
		},
		data() {
			return {
				user_list: null
			}
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
					link: '/shequ/guanzhu'
				}
			},
		},
		mounted() {
			var _this = this;
			_this.userlist()
		},
		methods: {
			//获取关注的大咖
			userlist() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/get_daka', {
					load: false,
				}).then(function(res) {
					if(!res) return;
					_this.user_list = res;
					

				})
			},
			//取消关注
			cancel(mid, id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Follow/cancle_follow', {
					load: false,
					b_uid: mid,
					d_id: id
				}).then(function(res) {
					if(!res) return;
					msg("取消关注");
					_this.userlist();

				})
			},
			//查看大咖的信息
			detail(i) {
				var _this = this;
				_this.$router.push('../user/usershow/' + i);
			}
		}
	}
</script>

<style scoped>
	.gz-list {
		background: #FFFFFF;
		padding: 10px;
	}
	
	.gz-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px solid #f3f3f3;
	}
	
	.tx {
		width: 35px;
		height: 35px;
		margin-right: 10px;
		border-radius: 50%;
	}
	
	.gz-item-left {
		display: flex;
		align-items: center;
		width: 70%;
	}
	
	.info div:nth-child(1) {
		font-size: 12px;
		font-weight: 600;
	}
	
	.qxgz {
		background: #d81e06;
		color: white;
		padding: 4px 8px;
		border-radius: 5px;
	}
	
</style>