<template>
	<div>
		<x-header :title="'我的评论'" :left-options="{backText:''}" class="header">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>

		<div>
			<vue-she-qu v-for="(item,index) in list" :item="item" :key="index" :type="1"></vue-she-qu>
			<vue-loading :url="$store.state.url + '/Follow/review_list?page=1&limit=10'" @ievent="loaddata"></vue-loading>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	import { VueShareit, VueSheQu, VueLoading, VueHeaderNav } from '../component/'
	export default {
		components: {
			XHeader,
			VueShareit,
			VueSheQu,
			VueLoading,
			VueHeaderNav
		},
		data() {
			return {
				list: [],

			}
		},
		mounted() {
			var _this = this;
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

</style>