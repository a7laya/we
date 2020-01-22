<template>
	<div class="hezuo_add" style="padding-bottom: 20px;">
		<x-header :title="'申请自助直播'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="fanhui()"></x-header>
		<group class="fontsize">
			<x-input :placeholder="'用一句话描述您的直播'" :type="'text'" v-model="form.title">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>标题:</span>
				</div>
			</x-input>
			<x-textarea :max="500" :placeholder="'输入循环滚动字幕'" v-model="form.explain">
				<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>字幕:</span>
				</div>
			</x-textarea>
			<div class="input_img">
				<vue-cropper :autoCropWidth="375" :enlarge="3" :autoCropHeight="211" @data="imgfile">
					<div style="text-align:center;width: 2rem;" v-if="!form.imgurl">
						<i class="iconfont icon-tsh-copy"></i>
						<div class="txt"><strong style="color: red;"> *</strong>上传封面图</div>
					</div>
					<img class="showimg" :src="$store.state.website.website_domain_name + '/uploads/' + form.imgurl" v-else="" style="width: auto;" />
				</vue-cropper>
			</div>
			<vue-address ref="address" :title="'所在地区'" :placeholder="'请选择区域'" class="xing"></vue-address>
			<vue-industry ref="industry" :title="'所属行业'" :placeholder="'请选择行业'" class="xing" ></vue-industry>
			<vue-main-body ref="mainbody" :title="'所属主体'" :placeholder="'请选择主体'" class="xing"></vue-main-body>
			<vue-business ref="business" :title="'直播类型'" :type="3" :placeholder="'请选择直播类型'" class="xing"></vue-business>
			<datetime ref="starttime" :title="'开始时间'" v-model="form.starttime" :placeholder="'请选择直播开始时间'" format="YYYY-MM-DD HH:mm" class="xing"></datetime>
			<datetime ref="datetime" :title="'结束时间'" v-model="form.endtime" :placeholder="'请选择直播结束时间'" format="YYYY-MM-DD HH:mm" class="xing"></datetime>
			<cell :title="'发布人电话'" class="pnone">
				<x-input :placeholder="user.mem_phone" v-model="form.phone" :type="'number'" :show-clear="false" class="tel" readonly></x-input>
			</cell>

			<div class="text_right">
				<divider>直播详情内容</divider>
				<div class="cl" v-for="(item,index) in num_list" v-if="index==0">
					<div class="fl" style="position: relative;z-index: 1;width:100%;overflow-x: auto;">
						<vue-html5-editor :content="item.num" placeholder="选填，可上传图片" @change="updateData(index,$event)"></vue-html5-editor>
					</div>
				</div>
				<div style="margin-top:20px">
					<divider>自助添加模块/内容</divider>
					<div class="cl" v-for="(item,index) in num_list" v-if="index==1">
						<x-input :placeholder="'请输入模块标题（最多输入4个字符）'" :type="'text'" v-model="item.name" :max="4">
							<div slot="label" class="ban_title">
							 <span>模块标题：</span>
							</div>
						</x-input>
						<div class="fl" style="position: relative;z-index: 1;width:100%;overflow-x: auto;">
							<vue-html5-editor :content="item.num" @change="updateData(index,$event)"></vue-html5-editor>
						</div>
						<!--
	                    	作者：1209559047@qq.com
	                    	时间：2019-03-06
	                    	描述：官方账号特权可添加多个自定义菜单
	                    -->
						<div class="fl ml" v-if="user.mem_id==14">
							<x-icon class="fill" type="ios-minus-empty" size="30" @click="jia" v-if="num_list.length > 1  "></x-icon>
							<x-icon class="fill" type="ios-plus-empty" size="30" @click="jian" v-if="num_list.length - 1 == index"></x-icon>
						</div>
					</div>
				</div>
			</div>
		</group>
		<div class="button_max" @click="forms">立即申请</div>
		<!---->
		<div class="tlmtc" v-if="zbShow==true" @click="close1($event)" @touchmove.prevent>
			<div class="tc_card" ref="msk">
				<img src="../../../static/img/ch.png" alt="" class="ch" @click="close" />
				<img src="../../../static/img/zb.png" alt="" class="zb" />
				<div>恭喜！您的直播已创建成功</div>
				<div>+10个智汇币</div>
				<!--<div>我们会在24小时内审核</div>
				<div>请关注您的系统消息</div>-->
				<div></div>
				<!--v-if="tlm"-->
				<!--<div class="button_max tgsuccess"   v-clipboard:copy="tlm" v-clipboard:success="onCopy" v-clipboard:error="onError" >复制推流码</div>-->
			</div>
		</div>
	</div>
</template>


<script>
	import { XHeader, XTextarea, Group, XInput, Cell, CheckIcon, Datetime, Confirm, XButton, Divider } from 'vux'
	import {
		VueAddress,
		VueIndustry,
		VueMainBody,
		VueBusiness,
		VueCropper
	} from '../component'
	export default {
		components: {
			XHeader,
			XTextarea,
			Group,
			XInput,
			Cell,
			CheckIcon,
			Datetime,
			VueAddress,
			VueIndustry,
			VueMainBody,
			VueBusiness,
			VueCropper,
			Confirm,
			XButton,
			Divider
		},
		data() {
			return {
				alsrtShow: true,
				form: {
					title: undefined, //标题
					region: undefined, //地区
					starttime: undefined, //开始时间
					endtime: undefined, //结束时间
					industry: undefined, //行业
					subject: undefined, //主体
					business: undefined, //业务类型
					imgurl: undefined, //图片地址
					explain: undefined, //简介
					phone: undefined, //预留电话
				},
				tlm: undefined,
				num_list: [{
						name: '直播详情',
						num: ''
					},
					{
						name: '',
						num: ''
					}
				],
				num_list1: [],
				room_id: null,
				zbShow: false
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		methods: {
      fanhui() {
        this.urls = new URL(window.location.href)
        if(this.urls.searchParams.get("uidkey")){
          this.$router.push('/index')
        }else{
          this.$router.go(-1)
        }
      },
			forms() { //登录
				var _this = this;
				if(isWeiXin() == 1 && !_this.user.mem_phone) {
					_this.$store.state.bingPhone = true;
					return;
				}
				_this.form.phone = _this.form.phone || _this.user.mem_phone;
				_this.form.region = _this.$refs.address.add[0] == -100 ? 0 : _this.$refs.address.add[_this.$refs.address.add.length - 1] == -1 ? _.initial(_this.$refs.address.add, 1) : _this.$refs.address.add;
				_this.form.subject = _this.$refs.mainbody.add;
				_this.form.business = _this.$refs.business.add;
				_this.form.industry = _this.$refs.industry.add;
				//验证
				let obj = {
					title: '标题',
					explain: '滚动字幕',
					imgurl: '封面图',
					region: '地区',
					industry: '行业',
					subject: '主体',
					business: '直播类型',
					starttime: '开始时间',
					endtime: '结束时间',
				}
				var listLen = _this.num_list[1];
				if(!listLen.name) {
					listLen.name = "";
					listLen.name = "";
				}
				_this.num_list[1].name ? _this.num_list : undefined
				if(!isNull(obj, _this.form)) return;
				_this.$http.post(_this.$store.state.url + '/Live/releaseLive', {
					'load': false,
					..._this.form,
					remarks: _this.num_list,

				}).then((res) => {
					if(!res) return;
					msg('发布成功请复制推流码');
					_this.zbShow = true;
					_this.room_id = res.id;
					_this.tlm = res.room_flowcode;
				})
			},
			imgfile(res) {
				this.form.imgurl = res.imgurl
			},
			jia(index) {
				this.num_list.splice(index, 1);
			},
			jian(index) {
				this.num_list.push({
					name: undefined,
					num: '请填写展现内容'
				});
			},
			onCopy() {
				this.$router.push('details/' + this.room_id);
				msg('复制成功');

			},
			onError() {
				msg('复制失败');
			},
			updateData(value, data) {
				this.num_list[value].num = data;
			},
      //关闭弹窗 并跳转直播列表页
			close() {
				var _this = this;
				_this.$router.push('/zhibo/index');
			},
			//关闭弹窗
			close1(ev) {　
				var _this = this;
				if(!_this.$refs.msk.contains(ev.target)) {　　　　　　
					_this.$router.push('/zhibo/index');　　
				}
			}
		},
    watch: {
      // 监听结束时间
      'form.endtime': {
        handler () {
          let time = Date.parse(new Date()); //当前时间的时间戳
          let endTime = Date.parse(this.form.endtime); //结束时间的时间戳
          let starttime = Date.parse(this.form.starttime); //开始时间的时间戳

          // 判断结束时间是否有值
          if (this.form.endtime) {
            // 判断结束时间不能小于当前时间
            if (endTime < time) {
              msg("结束时间不能小于当前时间");
              this.$refs.datetime.currentValue = ""; //输出：修改后的值
            } else if (this.form.starttime) {
              // 判断结束时间不能小于开始时间
              if (endTime < starttime) {
                msg("结束时间不能小于开始时间");
                this.$refs.datetime.currentValue = ""; //输出：修改后的值
              }
            }
          }
        },
        immediate: false
      },

      // 监听开始时间
      'form.starttime': {
        handler () {
          let time = Date.parse(new Date()); //当前时间的时间戳
          let endTime = Date.parse(this.form.endtime); //结束时间的时间戳
          let starttime = Date.parse(this.form.starttime); //开始时间的时间戳

          // 获取当前时间
          // let time = Date.parse(new Date());
          // 判断开始时间是否有值
          if (this.form.starttime) {
            // 判断开始时间不能小于当前时间
            if (starttime < time) {
              msg("开始时间不能小于当前时间")
              this.$refs.starttime.currentValue = ""; //输出：修改后的值
            }
          } else if (this.form.endtime) {
            // 判断开始时间是否大于结束时间
            if ( starttime > endTime ) { //starttime
              msg("开始时间不能大于结束时间");
              this.$refs.starttime.currentValue = ""; //输出：修改后的值
            }
          }
        },
        immediate: false
      }
    }
	}
</script>

<style>
	.hezuo_add .fontsize .weui-cells {
		font-size: 14px;
		margin-top: 0;
	}

	.hezuo_add .text_right {
		text-align: right;
		margin: 5px 10px;
	}

	.hezuo_add .hezuo_add_r_icon .weui-icon-success,
	.hezuo_add .hezuo_add_r_icon .weui-icon-circle {
		font-size: 16px;
	}

	.hezuo_add .vux-x-input .weui-cell__ft::after {
		/*display: none;*/
	}

	.hezuo_add .weui-cell.pnone {
		padding-top: 0;
		padding-bottom: 0;
	}

	.hezuo_add .pnone .vux-x-input .weui-input {
		text-align: right;
	}

	.input_img {
		position: relative;
		margin-left: 15px;
		text-align: left;
		border-top: 1px solid #D9D9D9;
		margin-bottom: 10px;
	}

	.input_img i {
		font-size: 30px;
		color: #999;
	}

	.input_img .txt {
		font-size: 12px;
	}

	.input_img img.showimg {
		width: auto;
		height: 50px;
	}

	.tlmtc {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(145, 145, 145, 0.8);
		z-index: 100;
	}

	.tc_card {
		position: relative;
		background: #FFFFFF;
		border-radius: 8px;
		width: 50%;
		margin: 50% auto;
		text-align: center;
		font-size: 15px;
		padding: 30px 20px;
	}

	.tgsuccess {
		width: 80%;
		margin-top: 40px!important;
		line-height: 36px;
		font-size: 15px;
	}

	.zb {
		width: 50%;
		display: block;
		margin: 0 auto;
	}

	.ch {
		position: absolute;
		right: 10px;
		top: 10px;
		width: 20px;
	}

	.ban_title {
		font-size: 15px;
		/*font-weight: 800;*/
		margin-right: 5px;
	}

	.ban_title>span.min {
		font-size: 12px;
		color: #B2B2B2;
	}

	.ban_title>strong {
		color: red;
	}
	.xing .weui-cell__hd:before,.xing +.vux-datetime div:nth-child(1) p:before{
		content: "*";
		color: red;
		    position: absolute;
    top: 13px;
    left: 13px;
	}
	.xing .weui-cell__hd,.xing+ .vux-datetime div:nth-child(1) p{
		margin-left: 10px;
	}
	.tel .weui-cell__hd:before{
		content: none!important;

	}
	 .vux-popup-picker-select-box , .vux-popup-picker-select{
	 	overflow: hidden;
	 	white-space: nowrap;
	 	text-overflow: ellipsis;
	 	max-width: 380px;
	 }
</style>
