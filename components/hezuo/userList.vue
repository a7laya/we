<template>
	<div>
		<x-header :title="'参与人名单'" :left-options="{backText:''}" class="header"></x-header>
		<!--<tab>
			<tab-item selected @on-item-click="show(1)">全部</tab-item>
			<tab-item @on-item-click="show(2)">已同意</tab-item>
			<tab-item @on-item-click="show(3)">已拒绝</tab-item>
		</tab>-->
		<div class="user_list_box" v-show="zindex==1">
			<cell v-for="(item,index) in user_list" :title="item.nickname || '暂无昵称'" is-link style="text-align: left;" :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" @click="infoDetail(item.mem_id)">
				<div class="user_list_button_box">
					<!-- 	<span class="button class1" @click="user_sh(index,1)" >{{item.status == 1 ? '已同意' : '同意'}}</span>
                    <span class="button class2" @click="user_sh(index,2)" >{{item.status == 2 ? '已拒绝' : '拒绝'}}</span> -->
					<span class="button class3" v-if="item.status == 0" @click="examine(1,item)">同意</span>
					<span class="button class2" v-if="item.status == 0" @click="examine(2,item)">拒绝</span>
					<span class="button class1" v-if="item.status == 8">已同意</span>
					<span class="button class2" v-if="item.status == 9">已拒绝</span>

					<span class="button class3" @click="joindetail(item.mem_id)">详情</span>
				</div>
			</cell>
		</div>
		<div class="user_list_box" v-show="zindex==2">
			<cell v-for="(item,index) in user_list" v-show="item.status==8" :title="item.nickname || '暂无昵称'" is-link style="text-align: left;"
			 :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl">
				<div class="user_list_button_box">
					<!--<span class="button class2" @click="user_sh(index,2)">拒绝</span>-->
					<span class="button class3" @click="infoDetail(item.mem_id)">详情</span>
				</div>
			</cell>
		</div>
		<div class="user_list_box" v-show="zindex==3">
			<cell v-for="(item,index) in user_list" v-show="item.status==9" :title="item.nickname || '暂无昵称'" is-link style="text-align: left;"
			 :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl">
				<div class="user_list_button_box">
					<!--<span class="button class1" @click="user_sh(index,1)">同意</span>-->
					<span class="button class3" @click="infoDetail(item.mem_id)">详情</span>
				</div>
			</cell>
		</div>
		<!--<x-dialog v-if="user_list!= null || user_list!=[]" v-model="user_list_show" :hide-on-blur="true">
            <div style="padding: 0 10px;">
                <group :title="user_list[show_index].nickname || '暂无昵称'">
                    <div class="hezuo_cog_class1">
                        <div class="hezuo_cog_li">
                            <span>质量：</span><span><rater :disabled="true" v-model="user_list[show_index].score1"></rater></span>
                        </div>
                        <div class="hezuo_cog_li">
                            <span>诚信：</span><span><rater :disabled="true" v-model="user_list[show_index].score2"></rater></span>
                        </div>
                        <div class="hezuo_cog_li">
                            <span>效率：</span><span><rater :disabled="true" v-model="user_list[show_index].score3"></rater></span>
                        </div>
                    </div>
                </group>
            </div>
        </x-dialog>-->
		<div v-if="user_list == null">
			<load-more></load-more>
		</div>
		<div v-else>
			<load-more v-if="user_list.length==0" :show-loading="false" :tip="'暂无数据'"></load-more>
		</div>
	</div>
</template>

<script>
	import {
		XHeader,
		Cell,
		Group,
		Tab,
		TabItem,
		XDialog,
		LoadMore,
		Rater,
	} from 'vux'
	export default {
		components: {
			Group,
			Cell,
			XHeader,
			Tab,
			TabItem,
			XDialog,
			LoadMore,
			Rater,
		},
		data() {
			return {
				zindex: 1,
				user_list_show: false,
				user_list: null,
				//              show_index: 0,
			}
		},
		mounted() {
			var _this = this;
			_this.userlist();
		},
		methods: {
			show(index) {
				this.zindex = index
			},
			user_show(index) {
				this.show_index = index;
				this.user_list_show = true;
			},
			userlist() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Cooperation/coop_sum', {
					load: false,
					id: _this.$route.params.id,
				}).then(function(res) {
					if (!res) return;
					_this.user_list = res;
				})
			},
			//查看个人信息
			infoDetail(i) {
				var _this = this;
				_this.$router.push('../../user/usershow/' + i);
			},
			//审核
			examine(i, item) {

				var _this = this;

				_this.$http.post(_this.$store.state.url + '/Cooperation/hezuo_sh', {
					load: false,
					bid_memid: item.mem_id,
					bid_coopid: _this.$route.params.id,
					type: i
				}).then((res) => {
					if (!res) return;
					_this.userlist();

				})
			},
			joindetail(id) {
				var _this = this;
				_this.$router.push('../joindetail?id=' + this.$route.params.id + '&userId=' + id);
			}
		}
	}
</script>

<style scoped>
	.user_list_box .weui-cell__hd img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 5px;
	}

	.user_list_box .vux-label {
		font-size: 14px;
	}

	.user_list_box .user_list_main {
		max-height: 400px;
		overflow-y: scroll;
	}

	.user_list_box .weui-cell {
		border-bottom: 1px solid #eee;
		background: #fff;
	}

	.user_list_button_box .button {
		margin-left: 10px;
		color: #fff;
		padding: 5px 10px;
		border-radius: 5px;
	}

	.user_list_button_box .button.class1 {
		background: #12a211;
	}

	.user_list_button_box .button.class2 {
		background: #bd1414;
	}

	.user_list_button_box .button.class3 {
		background: #007DDB;
	}

	.hezuo_cog_class1 {
		text-align: left;
		margin-left: 5px;
	}

	.hezuo_cog_li>span {
		display: inline-block;
		vertical-align: middle;
	}

	.class0 {
		background: #365991;
	}
</style>
