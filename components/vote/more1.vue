<template>
	<div class="wrap">
		<x-header :left-options="{backText: ''}"></x-header>
		<marquee scrollamount="3" style="color: #FFFFFF;width: 80%;margin: 0 auto;font-size: 0.48rem;position: fixed;top: 10px;left: 50px;z-index: 11112;">投票详情</marquee>
		<div style="width: 100%;height: 1.2rem;background: #fff;"></div>
		<!-- 投票 -->
		<div class="entry">
			<div class="entry-title">网选列表</div>
			<div class="entry-list" v-for="(item,index) in RankingList" :key="index">
				<div class="list-tu">
					<div class="tu-pian"><img style="width: 30px;height: 30px;float: right;margin-top: 10px;" :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl"></div>
					<div class="list-title">{{item.mem_nickname}}</div>
				</div>
				<div class="list-time times">
					{{item.ticket_total}}票
				</div>
			</div>
		</div>
		
		<vue-loading :url="$store.state.url + '/Vote/voteRankingList?page=1&limit=20&vote_select_id=' + vote_id" @ievent="loading"></vue-loading>
		
	</div>
</template>
<script>
	import {
		XHeader,
	} from 'vux'
	import {
		VueLoading,
	} from '../component'
	export default {
		components: {
			XHeader,
			VueLoading
		},
		data() {
			return {
				title: '',
				RankingList: '',
				info: '',
				vote_id_sum: '', //投票数
				vote_id: '', //投票id
			}
		},
		created() {
			var _this = this
			_this.vote_id = _this.$route.params.id
		},
		mounted() {

		},
		methods: {
			//助力列表
			loading(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.RankingList = _this.RankingList || [];
					_this.RankingList.push(e);
				})
			},
			loaddatas(res) {
				if (res[0].id == null) {
					return
				}
				var _this = this;
				_.each(res, function(e) {
					_this.RankingList = _this.RankingList || [];
					console.log(_this.RankingList)
					_this.RankingList.push(e);
				})
			},
			back(id) {
				this.$router.push("/vote/enroldetail/" + id)
			},
		}
	}
</script>
<style scoped style="less">
	.header {
		width: 100%;
		height: 100px;
		background-color: #F4F2F2;
	}

	.warning {
		width: 100%;
		height: 60px;
		line-height: 60px;
		margin: 0px auto;
		display: flex;
	}

	.leftIcon {
		width: 20%;
		height: 60px;
		font-size: 20px;
		text-align: center;
		color: #CCCCCC;
	}

	.rightFigure {
		width: 60%;
		height: 60px;
		text-align: center;
	}

	.entry {
		width: 95%;
		margin: 10px auto 20px auto;
		background: #fff;
		border-radius: 10px;
		padding-bottom: 10px;
		color: #999;
		background: #fff;
	}

	.entry-title {
		width: 100%;
		text-align: center;
		font-size: 14px;
		padding-top: 10px;
		border-radius: 10px 10px 0px 0px;
		background: #ccc;

	}

	.entry-list {
		width: 94%;
		height: 40px;
		display: flex;
		justify-content: space-between;
		position: relative;
		border-bottom: 1px solid #E3E3E3;
	}

	.list-tu {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-time {
		width: 45%;
		line-height: 50px;
		font-size: 14px;
	}

	.times {
		width: 20%;
		text-align: center;
	}

	..treat {
		width: 93%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		align-items: center;
	}

	.foot {
		font-size: 14px;
		background: #34495E;
		color: #fff;
		height: 45px;
		position: relative;
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.foot div {
		height: 45px;
		width: 25%;
		line-height: 45px;
		text-align: center;
		float: left;
		box-sizing: border-box;
		border-right: 1px solid #C4CAD0
	}

	.foot :nth-child(4) {
		border-right: 0
	}

	.addSelect {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		text-align: center;
		line-height: 60px;
		color: #EFEFEF;
		background: #707070;
		position: fixed;
		right: 20px;
		bottom: 60px;
	}

	.list-title {
		/* overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap; */
		margin-left: 10px;
		width: 65%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.list-tu {
		width: 60%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.vux-header {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 11111;
	}
</style>
