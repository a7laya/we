<template>
	<div>
		<x-header :title="'参与人名单'" :left-options="{backText:''}" class="header"></x-header>
		<tab>
			<tab-item selected @on-item-click="show(1)">全部</tab-item>
			<tab-item @on-item-click="show(2)">已同意</tab-item>
			<tab-item @on-item-click="show(3)">已拒绝</tab-item>
		</tab>
		<div class="user_list_box" v-show="zindex==1">
			<cell v-for="(item,index) in user_list" :title="item.nickname || '暂无昵称'" is-link style="text-align: left;" :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" @click="infoDetail(item.mem_id)">
				<div class="user_list_button_box">
					<!--<span class="button class1" @click="user_sh(index,1)" >{{item.status == 1 ? '已同意' : '同意'}}</span>
                    <span class="button class2" @click="user_sh(index,2)" >{{item.status == 2 ? '已拒绝' : '拒绝'}}</span>-->
					<span class="button class3" v-if="item.status == 0" @click="examine(1,item)">同意</span>
					<span class="button class2" v-if="item.status == 0" @click="examine(2,item)">拒绝</span>
					<span class="button class1" v-if="item.status == 1">已同意</span>
					<span class="button class2" v-if="item.status == 2">已拒绝</span>

					<span class="button class3" @click="joininfo(item.mem_id)">详情</span>
				</div>
			</cell>
		</div>
		<div class="user_list_box" v-show="zindex==2">
			<cell v-for="(item,index) in user_list" v-show="item.status==1" :title="item.nickname || '暂无昵称'" is-link style="text-align: left;" :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" @click="infoDetail(item.mem_id)">
				<div class="user_list_button_box">
					<span class="button class2" v-if="$route.query.m>0&&item.is_pay==2" @click="sign(1,item.mem_id)">未支付</span>
					<span class="button class1" v-if="$route.query.m>0&&item.is_pay==1" @click="sign(2,item.mem_id)">已支付</span>
					<span class="button class3" @click="joininfo(item.mem_id)">详情</span>
				</div>
			</cell>
		</div>
		<div class="user_list_box" v-show="zindex==3">
			<cell v-for="(item,index) in user_list" v-show="item.status==2" :title="item.nickname || '暂无昵称'" is-link style="text-align: left;" :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" @click="infoDetail(item.mem_id)">
				<div class="user_list_button_box">
					<!--<span class="button class1" @click="user_sh(index,1)">同意</span>-->
					<span class="button class3" @click="joininfo(item.mem_id)">详情</span>
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
		
		<!--<div v-transfer-dom>
			<x-dialog v-model="showDialogStyle" class="dialog-demo" hide-on-blur>
				<div class="img-box">
					<div>项目名称</div>
					<div>参与人姓名</div>
					<div>xiangmyurenTELPHONE</div>
				</div>
				<div @click="showDialogStyle=false">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>-->
		<!--参与人提交的信息-->
		<div v-transfer-dom>
			<x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '75%', height: '50%', 'background-color': 'transparent'}">
				<div  @click="showDialogStyle = false" style="background: #FFFFFF;padding:15px 10px;">
					<div class="join-info">
						<div>{{info.act_information}}</div>
						<div>申请人姓名：{{info.sign_name}}</div>
                        <div>申请人电话：{{info.mem_phone}}</div>
					</div>
					<br>
					<br>
					<x-icon type="ios-close-outline" style="fill:#000000;"></x-icon>
				</div>
				<!--<p style="color:#fff;text-align:center;">
					
				</p>-->
			</x-dialog>
		</div>

		<div v-if="user_list == null">
			<load-more></load-more>
		</div>
		<div v-else>
			<load-more v-if="user_list.length==0" :show-loading="false" :tip="'暂无数据'"></load-more>
		</div>
	</div>
</template>

<script>
	import { XHeader, Cell, Group, Tab, TabItem, XDialog, LoadMore, Rater, TransferDomDirective as TransferDom } from 'vux'
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
		directives: {
			TransferDom
		},
		data() {
			return {
				zindex: 1,
				user_list_show: false,
				user_list: null,
				showDialogStyle: false,
				info:''
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
				_this.$http.post(_this.$store.state.url + '/Activityb/activity_sum', {
					load: false,
					id: _this.$route.params.id,
				}).then(function(res) {
					if(!res) return;
					_this.user_list = res;
				})
			},
			user_sh(index, s) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Activityb/user_sh', {
					load: false,
					id: _this.$route.params.id,
					userid: _this.user_list[index].userid,
					type: s,
				}).then(function(res) {
					if(!res) return;
					msg(s == 1 ? '已同意' : '已拒绝');
					_this.user_list[index].status = s;
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
				var data = {
					load: false,
					sign_actid: _this.$route.params.id,
					sign_memid: item.mem_id,
					type: i,
					fq_memid: _this.$store.state.token
				}
				_this.$http.post(_this.$store.state.url + '/activityb/act_sh', data).then((res) => {
					if(!res) return;
					_this.userlist();

				})
			},
			sign(i, id) {
				var _this = this;
				var data = {
					type: i,
					sign_memid: id,
					act_id: _this.$route.params.id
				}
				_this.$http.post(_this.$store.state.url + '/Activityb/is_pay', data).then((res) => {
					if(!res) return;
					_this.userlist();

				})
			},
			joininfo(memid) {
				var _this = this;
				var data = {

					act_id: _this.$route.params.id,
					part_user: memid
				}
				_this.$http.post(_this.$store.state.url + '/Activityb/actPartList', data).then((res) => {
					if(!res) return;
                     _this.showDialogStyle=true;
                     _this.info=res;
				})
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
	.join-info div:nth-child(1){
		font-size: 15px;
    font-weight: 600;
	}
	.join-info div:nth-child(2),.join-info div:nth-child(3){
		text-align: left;
		margin: 12px 14px;
	}
</style>