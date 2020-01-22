<template>
	<div>
		<x-header :title="'参与人名单'" :left-options="{backText:''}" class="header"></x-header>
    <div class="xuanzeTab">
      <p>
        <span style="position: fixed;left: 1%;top: 8%;">场次</span>
        <i></i>
        <span style="position: fixed;left: 11%;top: 6%;">状态</span>
        </p>
      <div v-for="(item,index) in xuanze_arr">
        <span @click="changci(item.id)" :class="{'isfixed':isfixed==item.id}">{{item.name}}</span>
      </div>
    </div>
		<tab>
			<tab-item selected @on-item-click="show(1)">全部</tab-item>
			<tab-item @on-item-click="show(2)">已同意</tab-item>
			<tab-item @on-item-click="show(3)">已拒绝</tab-item>
		</tab>
		<div class="user_list_box" v-show="zindex==1">
			<cell v-for="(item,index) in user_list" :title="item.nickname || '暂无昵称'" is-link style="text-align: left;" :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" @click="infoDetail(item.userid)">
				<div class="user_list_button_box">
					<span class="button class3" v-if="item.status == 0" @click="examine(1,item,index)">同意</span>
					<span class="button class2" v-if="item.status == 0" @click="examine(2,item,index)">拒绝</span>
					<span class="button class1" v-if="item.status == 1">已同意</span>
					<span class="button class2" v-if="item.status == 2">已拒绝</span>

					<span class="button class3" @click="joininfo(item.userid)">详情</span>
				</div>
			</cell>
		</div>
		<div class="user_list_box" v-show="zindex==2">
			<cell v-for="(item,index) in user_list" v-show="item.status==1" :title="item.nickname || '暂无昵称'" is-link style="text-align: left;" :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" @click="infoDetail(item.mem_id)">
				<div class="user_list_button_box">
					<span class="button class2" v-if="$route.query.m>0&&item.is_pay==2" @click="sign(1,item.mem_id)">未支付</span>
					<span class="button class1" v-if="$route.query.m>0&&item.is_pay==1" @click="sign(2,item.mem_id)">已支付</span>
					<span class="button class3" @click="joininfo(item.userid)">详情</span>
				</div>
			</cell>
		</div>
		<div class="user_list_box" v-show="zindex==3">
			<cell v-for="(item,index) in user_list" v-show="item.status==2" :title="item.nickname || '暂无昵称'" is-link style="text-align: left;" :key="index">
				<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" @click="infoDetail(item.mem_id)">
				<div class="user_list_button_box">
					<span class="button class3" @click="joininfo(item.userid)">详情</span>
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
				user_list: [],
				showDialogStyle: false,
				info:'',
        xuanze_arr: [
          {id:0,name:'第一场'},
          {id:1,name:'第二场'},
          {id:2,name:'第三场'},
          {id:3,name:'第四场'},
          {id:4,name:'第五场'},
        ],
        isfixed: 0,
        all_list: [],
			}
		},
		mounted() {
			var _this = this;
			_this.userlist();

		},
		methods: {
      changci(id) {
        var _this = this;
        this.isfixed = id; //给高亮显示的参数赋值
        // 调取接口数据
        _this.$http.post(_this.$store.state.url + '/Activityb/axt_next_sign_user',{
          id: _this.$route.params.id, // 活动id
          next_id: id, // 场次id
        }).then(function(res){
          if(!res) return;
          _this.user_list = []; // 给 user_list 这个数组清空
          // 循环 把获取的数据push到 user_list 这个数组
          for (let i=0; i < res.sign.length;i++) {
           _this.user_list.push(res.sign[i])
          }
        })
      },

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
          type: 1
				}).then(function(res) {
					if(!res) return;
          _this.xuanze_arr = _this.xuanze_arr.slice(0,res.length)

          for (let i = 0; i < res.length; i++) {
            _this.xuanze_arr[i].id = res[i].id
            //获取默认第一个场次的活动报名人员
            if (i == 0) {
              _this.isfixed = res[i].id;
              // 请求接口
              _this.$http.post(_this.$store.state.url + '/Activityb/axt_next_sign_user', {
                id: res[i].act_id, // 活动id
                next_id: res[i].id // 场次id
              }).then(function(res){
                if(!res) return;
                // 循环把报名的人员名单添加到数组里面
                for (let j = 0; j < res.sign.length; j++ ) {
                   _this.all_list.push(res.sign[j])
                }
              })
            }
          }

          _this.user_list = _this.all_list
				})
			},

			//查看个人信息
			infoDetail(i) {
				var _this = this;
				_this.$router.push('../../user/usershow/' + i);
			},
			//审核
			examine(i, item, index) {
        console.log("index")
        console.log(index)
				var _this = this;
				var data = {
					load: false,
					sign_actid: _this.$route.params.id,
					sign_memid: item.userid,
					type: i,
					fq_memid: _this.$store.state.token
				}
				_this.$http.post(_this.$store.state.url + '/activityb/act_sh', data).then((res) => {
					if(!res) return;
          _this.user_list[index].status = res.status

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
  .isfixed {
    color: #fff;
    background: #F88509;
  }
  .xuanzeTab {
    width: 20%;
    float: left;

  }
  .xuanzeTab > div > span {
    display: block;
    height: 1.15rem;
    line-height: 1.15rem;
    text-align: center;
    font-size: 0.35rem;
  }
  .xuanzeTab > p {
    height: 1.15rem;
    line-height: 1.15rem;
    text-align: center;
    background:linear-gradient(30deg, transparent 49.5%, #000 49.5%, #000 50.5%, transparent 50.5%);
    font-size: 0.4rem;
    z-index: 111;
    background: #fff;
  }
  .xuanzeTab > p >i {
    display: inline-block;
    width: 114%;
    border-bottom: 1px solid #666;
    position: relative;
    top: -0.13rem;
    left: -6%;
    transform: rotate(30deg);
  }
  .user_list_box {
    width: 80%;
    float: right;
  }
  .vux-tab-wrap {
    width: 80%;
    float: right;
  }
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
  .weui-loadmore__tips {
    top: 0!important;
  }
  .weui-loadmore_line .weui-loadmore__tips {
    top: 0!important;
  }
  .weui-loadmore {
    padding-top: 0.5rem;
  }
</style>
