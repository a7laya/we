<template>
	<!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：侧窗搜索
    -->
	<div>
		<span class="slot" @click="show=true"><slot></slot></span>
		<transition name="top-fade">
			<div v-show="show" style="height:100%;position: fixed;top: 0;z-index: 2;left: 0; width: 100%;background: rgba(0,0,0,0.3);z-index: 2;">
				<div class="isshow" @click="show=false" style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;"></div>
				<div class="s_butt_box">
					<div class="on_button_box">
						<div class="yese_button div_butt" @click="clickyesbuttom">确定</div>
						<div class="ons_button div_butt" @click="clickcelbuttom">重置</div>
					</div>
				</div>
				<div class="box_left">
					<div class="s_header">筛选</div>
					<!-- <div class="s_list_box" v-if="!type">
						<div class="title_box">模块</div>
						<div class="min_main_box">
							<div class="class1">招采信息</div>
							<div class="class1" @click="clicktype(1)" :class="{on:form.type==1}">招采信息</div>
							<div class="class1" @click="clicktype(2)" :class="{on:form.type==2}">活动</div>
							<div class="class1" @click="clicktype(3)" :class="{on:form.type==3}">直播</div>
						</div>
					</div> -->
					<!--<div class="s_list_box addres_f">-->
						<!--<div class="title_box">地区</div>-->
						<!--<div class="min_main_box">
							<div class="class1" :class="{on:form.region}">
								<i class="iconfont icon-dingwei" style="margin-right: 3px;"></i>
								<vue-position @ievent="clickregion"></vue-position>
							</div>
						</div>-->
						<!--<i class="iconfont icon-dingwei" style="margin-right: 3px;"></i>-->
						<div class="min_main_box" style="margin-top:20px">
							<div class="class1" :class="{on:form.region}">
								<i class="iconfont icon-dingwei" style="margin-right: 3px;float: left;"></i>
								<div style="float: left;" class="adddress_f">
									<popup-picker placeholder="地区" :data="itemAddress" v-model="add" :show-name="true" :columns="3" @on-hide="hide" value-text-align="left"></popup-picker>
								</div>
							</div>
						</div>

					<!--</div>-->
					
					<div class="s_list_box">
						<div class="title_box">时间</div>
						<div class="min_main_box">
							<!-- <template v-for="(item,index) in main_body"> -->
								<div class="class1" v-for="(zitem,index) in itemList" :key="index" @click="clickmain_body(zitem,index)" :class="{on:txt.searchTime==zitem.time}">{{zitem.time}}</div>
							<!-- </template> -->
						</div>
					</div>
					
					
				<!-- 	<div class="s_list_box">
						<div class="title_box">时间</div>
						<div class="min_main_box"> -->
							<!-- <div class="class1" @click="clicktime" :class="{on:txt.time}">{{txt.time || '不限时间'}}</div> -->
							<!-- <popup-picker  title="时间" :data="time" v-model="Changetime" class="change"></popup-picker>
						</div>
					</div> -->
					
					<!-- <div class="s_list_box">
						<div class="title_box">业务类型</div>
						<div class="min_main_box">
							<div class="class1" v-for="(zitem,index) in business" :key="index" @click="clickbusiness(zitem)" :class="{on:txt.business==zitem.yewuname}">{{zitem.yewuname}}</div>
						</div>
					</div> -->
					<div class="s_list_box">
						<div class="title_box">行业</div>
						<div class="min_main_box">
							<div class="class1" v-for="(zitem,index) in industry" :key="index" @click="clickindustry(zitem,index)" :class="{on:txt.industry==zitem.name}">{{zitem.name}}</div>
						</div>
					</div>
					
					<div class="s_list_box" v-if="showing">
						<div class="title_box">二级行业</div>
						<div class="min_main_box">
							<div class="class1" v-for="(zitem,index) in industryTwoing" :key="index" @click="industryTwos(zitem)" :class="{on:txt.industryTwoing==zitem.name}">{{zitem.name}}</div>
						</div>
					</div>
					<div style="height: 40px;"></div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { PopupPicker } from 'vux'
	import VuePosition from './position/pos'
	const list=[
		 // '今天', '昨天', '本周', '上周','本月', '上月', '今年','去年'
		 {time:'今天',id:1},{time:'本周',id:2},{time:'本月',id:3},{time:'三个月',id:4},{time:'半年',id:5} 
	]
	export default {
		
		components: {
			VuePosition,
			PopupPicker
		},
		data() {
			return {
				show: false,
				form: {

				},
				txt: {

				},
				hangye:[],
				business: undefined, //业务类型
				main_body: undefined, //主体
				industry: undefined, //行业
				industryTwoing: undefined,//二级行业
				shows: true,
				itemAddress: [],
				add: [],
				itemList:list,
// 				time:[['全部', '今天', '昨天', '本周', '上周','本月', '上月', '今年','去年']],
// 				Changetime:[['1']],
				showing:false,
			}
		},
		props: {
			type: Number
		},
		mounted() {
			var _this = this;
			if(this.type) {
				this.clicktype(this.type);
			}
// 			_this.ajaxbusiness();
// 			_this.ajaxmain_body();
			_this.ajaxindustry();
			_this.getCity();

			_this.$http.post(_this.$store.state.url + "Collection/coRegion").then(function(res) { //获取城市
				if(!res) return;
				if(_this.shows) {
					_this.itemAddress.push({
						name: '全国',
						value: '-100',
						parent: '0'
					});
					_this.itemAddress.push({
						name: '',
						value: '-1',
						parent: '-100'
					});
				}
				_.each(res, function(e) {
					_this.itemAddress.push({
						name: e.typename,
						value: e.id.toString(),
						parent: e.parent_id.toString()
					});
					if(_this.shows) {
						_this.itemAddress.push({
							name: '全部',
							value: '-1',
							parent: e.id.toString()
						});
					}
					_.each(e.children, function(e) {
						if(_this.shows) {
							_this.itemAddress.push({
								name: '全部',
								value: '-1',
								parent: e.id.toString()
							});
						}
						_this.itemAddress.push({
							name: e.typename,
							value: e.id.toString(),
							parent: e.parent_id.toString()
						});
						_.each(e.children, function(e) {
							_this.itemAddress.push({
								name: e.typename,
								value: e.id.toString(),
								parent: e.parent_id.toString()
							});
						})
					})
				})
			});
		},
		methods: {
			getCity() {

			},
			hide(i) {
				this.$set(this.form, 'region', this.add[0] +'-' + this.add[1] + '-' );
			},
			/*ajaxbusiness() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Common/business', { //业务类型
					load: false,
					type: _this.form.type || 1,
				}).then(function(res) {
					if(!res) return;
					_this.business = res;
				})
			},
			ajaxmain_body() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Common/main_body', { //主体
					load: false,
				}).then(function(res) {
					if(!res) return;
					_this.main_body = res;
				})
			},*/
			ajaxindustry() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Collection/industryOne', { //一级行业
					load: false,
				}).then(function(res) {
					if(!res) return;
					_this.industry = res;
					// console.log(_this.industry)
				})
			},
			
			
		
			
			clicktype(data) {
				this.$set(this.form, 'type', data);

				delete this.txt.business
				delete this.form.business
				//              this.$set(this.txt, 'business', undefined);
				//              this.$set(this.form, 'business', undefined);
				this.ajaxbusiness();
			},
			
			clickbusiness(data) {
				if(data.yewuname == this.txt.business) {
					this.txt.business = "";
					this.$set(this.form, 'business', '');
				} else {
					this.$set(this.txt, 'business', data.yewuname);
					this.$set(this.form, 'business', data.yewu_id);
				}
			},
			// 时间
			clickmain_body(data,i) {
				if(data.time == this.txt.searchTime) {
					delete this.form.searchTime
					console.log( this.txt.searchTime)
					this.txt.searchTime = "";
					// this.$set(this.form, 'searchTime', '');
				} else {
					this.$set(this.txt, 'searchTime', data.time);
					this.$set(this.form, 'searchTime', data.id);
				}
			},
			//一级行业
			clickindustry(data,i) {
				// console.log(data)
				
				if(data.name == this.txt.industry) {
					this.txt.industry = "";
//					this.$set(this.form, 'industry', '');
//					this.$set(this.hangye, 0, '')
				} else {
//					this.$set(this.txt, 'industry', data.name);
//					this.$set(this.form, 'industry', data.id);
					this.$set(this.hangye, 0, data.id)
					
					
				}
				
				// 二级行业
				this.showing=true
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/Collection/industryTwo",{
					load: false,
					ioId:_this.industry[i].id
				}).then(res=>{
					_this.industryTwoing = res;
				})
				

			},
			//二级行业
			industryTwos(data){   
				if(data.name == this.txt.industryTwoing) {
					this.txt.industryTwoing = "";
//					this.$set(this.form, 'industryTwoing', '');
//					this.$set(this.hangye, 1, '')
					
				} else {
//					this.$set(this.txt, 'industryTwoing', data.name);
//					this.$set(this.form, 'industryTwoing', data.id);
					this.$set(this.hangye, 1, data.id)
//					this.$set(this.form, industry, this.hangye)
					
				}
			},
			
			//			clickregion(data) {
			//				
			//				this.$set(this.form, 'region', data.parent_id + '-' + data.id + '-');
			//			},
			clickyesbuttom() {
				this.show = false;
				this.$set(this.form, 'industry', this.hangye)
				this.$emit('ievent', this.form);
				
				// console.log(this.form)
				
				var _this = this;
				_this.$http.post(_this.$store.state.url + '/Collection/winningList',{
					load: false,
					limit:10,
					page:1,
					industry:_this.hangye
				}).then(res=>{
					// console.log(res)
				})
				
			},
			clickcelbuttom() {
				this.form = {};
				this.txt = {};
				this.add = [];
//				this.hangye=[]
			},
// 			zhanshi(i){
// 				
// 			}
		}
	}
</script>
<style scoped>
	.box_left {
		position: absolute;
		width: 250px;
		background: #fff;
		right: 0;
		height: 100%;
		color: #555;
		line-height: 1em;
		overflow-y: scroll;
	}
	
	.s_header {
		font-size: 12px;
		color: #999;
		background: #f8f4f5;
		padding-left: 15px;
		line-height: 25px;
	}
	
	.s_list_box {
		padding: 0 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #eeeeee;
	}
	
	.s_list_box+.s_list_box {
		border-bottom: 1px solid #eeeeee;
		padding-top: 7px;
	}
	
	.s_list_box .title_box {
		font-size: 14px;
		color: #565656;
		line-height: 30px;
		margin-top: 5px;
	}
	
	.min_main_box {
		color: #232323;
		max-height: 100px;
		overflow-y: scroll;
	}
	
	.min_main_box .class1 {
		background: #f5f5f5;
		display: inline-block;
		border-radius: 3px;
		font-size: 12px;
		padding: 5px 10px;
		margin-bottom: 10px;
		margin-right: 5px;
	}
	
	.min_main_box .class1.on {
		background: #35495e;
		color: #fff;
	}
	
	.s_butt_box {
		text-align: right;
		position: absolute;
		width: 100%;
		bottom: 0;
		z-index: 1;
		line-height: 20px;
	}
	
	.s_butt_box .div_butt {
		float: right;
	}
	
	.on_button_box {
		display: inline-block;
		background: linear-gradient(to right, #5c7fa2, #35495e);
		color: #fff;
		border-radius: 30px;
		margin-right: 10px;
	}
	
	.on_button_box .div_butt {
		padding: 7px 20px;
		font-size: 12px;
	}
	
	.on_button_box .div_butt+.div_butt {
		border-right: 3px solid #fff;
	}
	
	.vux-popup-picker-select {
		padding-top: 6px!important;
	}
	
	.vux-popup-picker-placeholder {
		color: #000000;
		background: #f5f5f5;
		display: inline-block;
		border-radius: 0.08rem;
		font-size: 0.32rem;
		padding: 0.133333rem 0.266667rem;
		margin-bottom: 0.266667rem;
		margin-right: 0.133333rem;
	}
	
	 .adddress_f .weui-cell{
	 	padding: 20px!important;
	 }
	
	
	.adddress_f .weui-cell_access .weui-cell__ft:after {
		content: none!important;
	}
</style>
