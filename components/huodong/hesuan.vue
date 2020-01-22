<template>
	<div>
		<x-header :title="'参与人名单'" :left-options="{backText:''}" class="header"></x-header>
		<tab>
			<tab-item selected @on-item-click="show(1)">到场</tab-item>
			<tab-item @on-item-click="show(2)">缺席</tab-item>

		</tab>
		<div class="user_list_box" v-show="zindex==1">
			<cell v-for="(item,index) in user_list" :title="item.mem_nickname|| '暂无昵称'" is-link style="text-align: left;" :key="index" >
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl">
				<div class="user_list_button_box">
					<!--<span class="button class1">100</span>-->
					<span class="button class3" @click="infoDetail(item.mem_id)">详情</span>
				</div>
			</cell>
		</div>
		<div class="user_list_box" v-show="zindex==2">
			<cell v-for="(item,index) in user_list"  :title="item.mem_nickname|| '暂无昵称'" is-link style="text-align: left;" :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl">
				<div class="user_list_button_box">
					<span class="button class1">50%</span>
					<!--<span class="button class4">已退回</span>-->
					<span class="button class3" @click="infoDetail(item.mem_id)">详情</span>
				</div>
			</cell>
		</div>

		<!--<div v-if="user_list == null">
			<load-more></load-more>
		</div>
         <div v-else>
			<load-more v-if="user_list.length==0" :show-loading="false" :tip="'暂无数据'"></load-more>
		</div>-->
		<div class="heji">
			<div>总计:</div>
			<div class="button class1" v-if="zindex==1">{{$route.params.money}}</div>
				<div class="button class1" v-else="zindex==2">{{$route.params.money1}}</div>
		</div>
		<div class="konw">
			<div>提现须知：</div>
			<div>
				1.活动发起人提现金额，是根据活动报名审核通过人数统计。提交提现申请后七个工作日内完成审核(前三个工作日为核算期)成功审核后自动打款到指定账户。
			</div>
            <div>
            2.缺席人员须在活动结束后三日内，填写缺席原由并提起申请退款报名费的50%，另50%计入发起人账户内(活动名额占用补偿)。审核通过后自动退目支付账户。
            </div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Cell, Group, Tab, TabItem, XDialog, LoadMore, Rater, } from 'vux'
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
				type:1
			}
		},
		mounted() {
			var _this = this;
			_this.userlist();
		},
		methods: {
			show(index) {
				this.zindex = index
				this.type=index;
				this.userlist();
			},
			user_show(index) {
				this.show_index = index;
				this.user_list_show = true;
			},
			userlist() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Activityb/get_act_mem', {
					load: false,
					act_id: _this.$route.params.id,
					 type:_this.type
				}).then(function(res) {
					if(!res) return;
					_this.user_list = res;
				})
			},

			//查看个人信息
			infoDetail(i) {
				var _this = this;
				_this.$router.push('../../user/usershow/' + i);
			},

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
	
	.class4 {
		background: #faac04;
	}
	
	.heji {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #FFFFFF;
		padding: 50px 0px;
		margin-top: 10px;
	}
	
	.heji .class1 {
		background: #12a211;
		color: #fff;
		padding: 0.133333rem 0.266667rem;
		border-radius: 0.133333rem;
	}
	.konw{
		background: #DDDDDD;
		width: 90%;
		margin: 20px auto;
		padding: 15px;
		box-sizing: border-box;
		border-radius: 10px;
	}
</style>