<template>
	<div class="pinglun">
		<div class="title">用户评论</div>
		<div class="pinglunnone" v-if="list.length==0">
			<img src="/static/img/icon69.png" />
			<div class="txt">期待你精彩的评论，让更多人看到</div>
			<div class="a_link" @click="onshow({type:1,module:type,project_id:id,plac:'赶快说说你的感受吧'})">立即评论</div>
		</div>
		<div class="main">
			<div class="li" v-for="(item,index) in list" :key="index">
				<div class="img"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl" /></div>
				<div class="neirong">
					<div class="neirongzhuti">
						<div class="neirongzhu">
							<div class="name">{{item.nickname}}</div>
							<div class="data">{{item.addtime | timeday}}</div>
							<div class="button_huifu">
								<div @click="onshow({type:2,comment_id:item.id,plac: '@' + item.nickname,index:index})" v-if="item.memid!=memberId" class="hf">回复</div>
								<div class="pl_del" @click="pldel(item.id)" v-if="item.memid==memberId"> 删除</div>
							</div>

							<div class="txt">{{item.content|code}}</div>
						</div>
						<div class="neironghuifu" v-if="item.reply.length!=0">
							<div class="huifu_li" v-for="(zitem , zindex) in item.reply" >
								<span class="name">{{zitem.nickname}}</span>
								<span class="txt" v-if="zitem.parent_id!=0">回复</span>
								<span class="name" v-if="zitem.parent_id!=0">{{zitem.reply_nickname}}</span>
								<span class="txt" @click="onshow({type:3,parent_id:zitem.id,comment_id:item.id,plac: '@' + item.nickname,index:index,zindex:zindex})">：{{zitem.content|code}}</span>
								<div class="huif_del" @click="reply(zitem.id)" v-if="zitem.memid == memberId">删除</div>
							</div>
							<div class="huifu_li" v-if="(item.reply_count - item.reply.length) != 0">
								<span class="name" @click="ajax({type:type,status:2,comment_id:item.id,page:(item.reply.length-2)/10,index:index})">展开{{item.reply_count - item.reply.length}}条回复>></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<vue-loading :url="`${$store.state.url}/Comment/get_talk?type=${type}&status=1&project_id=${id}&page=1`" @ievent="loaddata" v-if="isshow"></vue-loading>
		<div v-transfer-dom class="pingluntanchukuang">
			<x-dialog v-model="show" :hide-on-blur="true">
				<div class="mian" v-if="show">
					<group>
						<x-textarea :max="100" :placeholder="updata.plac" v-model="txt" v-focus></x-textarea>
						<div class="a_link" @click="form">发布</div>
					</group>
				</div>
			</x-dialog>
		</div>
	</div>
</template>

<script>
	import { XDialog, TransferDom, XTextarea, Group } from 'vux'
	import { Base64 } from 'js-base64'
	import VueLoading from './loading2'
	export default {
		directives: {
			TransferDom,
			focus: {
				inserted: function(el) {
					setTimeout(function() {
						$(el).find('textarea')[0].focus();
					}, 100);
				}
			}
		},
		components: {
			XDialog,
			XTextarea,
			Group,
			VueLoading
		},
		data() {
			return {
				show: false, //评论输入框显示
				txt: null, //评论输入框内容
				list: [],
				updata: null, //提交评论使用的数据
				znumber: 0,
				memberId: '',
				isshow:true
			}
		},
		props: {
			type: Number, //评论类型1合作，2活动
			id: Number, //项目id
		},
		watch: {
			list: {
				handler: function() {
					var _this = this;
					var num = 0;
					_.each(_this.list, function(e) {
						num += e.reply_count;
					})
					_this.znumber = num;
				},
				deep: true
			},
		},
		mounted() {
			var _this = this;
			_this.memberId = this.$store.state.token;

		},
		methods: {
			ajax(obj) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Comment/get_talk', {
					load: true,
					...obj
				}).then((res) => {
					if(!res) return;
					if(obj.status == 2) {
						var _this = this;
						_.each(res, function(e) {
							_this.list[obj.index].reply.push(e);
						})
					}
				})
			},
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list.push(e);
				})
			},
			onshow(obj) {
				this.show = true;
				obj.module = this.type;
				this.$set(this.$data, 'updata', obj);
			},
			form() {
				var _this = this;
				//				let reader = new FileReader();
				//				reader.readAsBinaryString(_this.txt);
				//
				//				reader.onload = function() {
				//					this.txt = this.result
				//				}
				_this.show = false;
				if(!_this.txt) {
					msg("请输入内容");
					return;
				}
				console.log('_this.txt')
				console.log(_this.txt)
				console.log(_this.updata)
				_this.txt = Base64.encode(_this.txt);
				console.log(_this.txt)
				_this.$http.post(_this.$store.state.url + '/Comment/member_talk_about', {
					load: true,
					..._this.updata,
					content: _this.txt
				}).then((res) => {

					if(!res) return;
				
					this.txt = null;
					msg('评论成功');

					if(_this.updata.type == 1) { //一级评论相应操作
						//						res.content=Base64.decode(res.content);
						_this.list.unshift(res);
					}
					if(_this.updata.type == 2) { //二级评论相关操作
						//						res.content=Base64.decode(res.content);
						_this.list[_this.updata.index].reply_count++;
						_this.list[_this.updata.index].reply.unshift(res);
					}
					if(_this.updata.type == 3) { //三级评论相关操作
						//						res.content=Base64.decode(res.content);
						_this.list[_this.updata.index].reply_count++;
						_this.list[_this.updata.index].reply.splice(_this.updata.zindex, 0, res);
					}

				})
			},
			pldel(id) {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Homecenter/delComment', {
					load: true,
					id: id
				}).then((res) => {
					_this.list=[];
                  _this.reload();
				})
			},
			//刷新下载刷新节点
			reload() {
				var _this = this;
				_this.isshow = false;
				_this.$nextTick(function() {
					_this.isshow = true;
				})
			},
			reply(id){
			var _this = this;
				_this.$http.post(_this.$store.state.url + '/Homecenter/delReply', {
					load: true,
					id: id
				}).then((res) => {
					_this.list=[];
                   _this.reload();
				})
			}
		}
	}
</script>

<style scoped>
	.pinglun {
		border-top: 5px solid #f2f2f2;
		padding: 0 15px;
	}
	
	.pinglun>.title {
		font-size: 17px;
		font-weight: 800;
		line-height: 50px;
		border-bottom: 1px solid #cccccc;
	}
	
	.pinglun .li {
		margin-top: 15px;
	}
	
	.pinglun .li>.img {
		display: inline-block;
		border-radius: 50%;
		overflow: hidden;
		width: 44px;
		height: 44px;
		float: left;
	}
	
	.pinglun .li .neirong {
		padding-left: 50px;
		position: relative;
	}
	
	.pinglun .neirongzhuti {
		padding-bottom: 15px;
		border-bottom: 1px solid #f2f2f2;
	}
	
	.neirongzhuti .neirongzhu .name {
		font-size: 15px;
		font-weight: 500;
	}
	
	.neirongzhuti .neirongzhu .data {
		font-size: 12px;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}
	
	.neirongzhuti .neirongzhu .button_huifu {
		width: 34px;
		height: 17px;
	
		font-size: 10px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: #666;
		line-height: 17px;
		position: absolute;
		right: 0;
		top: 0;
		text-align: center;
	}
	.neirongzhuti .neirongzhu .button_huifu .hf{
		border: 1px solid #ccc;
		border-radius: 8px;
	}
	.neirongzhuti .neirongzhu .txt {
		font-size: 14px;
		line-height: 19px;
		color: #666;
		margin-top: 5px;
		word-break: break-word;
	}
	
	.neirongzhuti .neironghuifu {
		background: #f2f2f2;
		padding: 10px;
		margin-top: 5px;
	}
	
	.neirongzhuti .neironghuifu {
		font-size: 12px;
	}
	
	.neirongzhuti .neironghuifu .name {
		color: #3587EC;
	}
	
	.neirongzhuti .neironghuifu .txt {
		color: #666;
		word-break: break-all;
	}
	
	.pinglunnone {
		text-align: center;
	}
	
	.pinglunnone img {
		display: inline-block;
		width: 110px;
		margin-top: 20px;
	}
	
	.pinglunnone .txt {
		font-size: 12px;
		color: #999;
		margin: 20px 0;
	}
	
	.pinglunnone .a_link {
		font-size: 12px;
		color: #04E2E4;
	}
	
	.pingluntanchukuang .a_link {
		padding: 5px 10px;
		background: #03E1EC;
		color: #fff;
		font-size: 14px;
		border-radius: 3px;
		float: right;
		margin: 5px 15px 15px 0;
	}
	
	.pl_del {
		border: 1px solid #ea2121;
		color: #ea2121;
		margin-top: 10px;
		border-radius: 8px;
	}
	.huif_del{
	width: 0.8rem;
	text-align: center;
	float: right;
	color: #ea2121;
	}
</style>