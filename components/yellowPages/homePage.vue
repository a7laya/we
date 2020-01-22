<template>
	<div>
		<div>
			<x-header class="header" ref="head">
				<div slot="overwrite-left" class="goBack" @click="goBack()"></div>
				<div slot="overwrite-title" class="title">企业名录</div>
			</x-header>
			<vue-swiper :type="12"></vue-swiper>
			<div class="type-body" :class="{'is_fixed' : isFixed}">
				<div class="type-change">
					<div v-for="(item, index) in titleList" @click="shequ(index+1)" :class="index==index1?'active':''" :key="index">{{item}}</div>
				</div>
			</div>
			<div class="search" :class="{'is_fix' : isFix}">
				<div class="searchSelect">
					<popup-picker placeholder="地区" :data="itemAddress" v-model="add" :show-name="true" :columns="2" @on-hide="hide" value-text-align="left"></popup-picker>
					<popup-picker placeholder="行业" :data="itemHangye" v-model="add2" :show-name="true" :columns="1" @on-hide="hide2" value-text-align="left"></popup-picker>
				</div>
			</div>
			<div class="moreCompany">
				<div class="moreCompanyInner">
					<!--<div style="text-align:center;padding:10px" v-if="companyList.length == 0 ">暂无数据</div>-->
					<!--v-else-->
					<ul>
						<li v-for="(item, index) in companyList" :key="index" @click="go(item.create_uid,item.id)">

							<div class="left">
								<img :src="$store.state.website.website_domain_name + '/uploads/' + item.logo" alt />
							</div>
							<div class="center">
								<span class="name ell">{{item.name}}</span>
								<div class="bottom">
									<span class="hangye ell">行业:{{item.hangye.typename}}</span>
									<span class="tibs">
                    <span class="yellowClass" v-if="item.is_coop">合</span>
									<span class="yellowClass" v-if="item.is_act">活</span>
									<span class="yellowClass" v-if="item.is_live">播</span>
									</span>
								</div>
							</div>
							<!--<div  class="anniu"></div>-->
							<!--<div class="right">
								<img src="/static/img/game/mineRight.png" alt />
							</div>-->
							<div class="right" v-if="index != 0" @click.stop="ding(item.id)">
								<img src="/static/img/anniu.png">
							</div>
						</li>
					</ul>
					<vue-loading :url="$store.state.url + '/Homepages/get_minglu?page=1&limit=10&region='+region+'&hangye='+hangye+'&class='+sy" @ievent="loaddata" v-if="isshow"></vue-loading>

				</div>
			</div>
		</div>


		<div v-transfer-dom>
			<x-dialog v-model="isShow" class="dialog-backnone" hide-on-blur>
				<div class="ding_content">
					<svg @click="isShow = false" data-v-6955d917 type="ios-close" size="30" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-close cose">
						<path data-v-6955d917 d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zM352 340.2L340.2 352l-84.4-84.2-84 83.8-11.8-11.8 84-83.8-84-83.8 11.8-11.8 84 83.8 84.4-84.2 11.8 11.8-84.4 84.2 84.4 84.2z" class="st0" />
					</svg>
					<div class="ding_help">帮助置顶</div>
					<div class="ding_px"></div>
					<div class="des">
						<div>置顶优势</div>
						<div>&nbsp;1. 刷新企业排序至名录最前端；</div>
						<div>&nbsp;2. 同行中提高企业曝光率；</div>
						<div>&nbsp;3. 促进企业合作及平台互动；</div>
						<div>注：置顶一次需消耗10个智汇币</div>
						<div class="ding_bi">-10个智汇币</div>
						<div class="ding-sure" @click="sureDing()">确定置顶</div>
					</div>
				</div>
			</x-dialog>
		</div>



		<div v-transfer-dom>
		  <x-dialog v-model="exhibit" class="invest_Money">
		    <div class="investMoney_img">
		    	<div style="width:100%;display: flex;justify-content: center;margin-top:0.5rem"><img src="/static/img/zhihui.png" style="height:4rem;width:70%"></div>
		      <div class="investMoney_title">
		        <p>智汇币不足</p>
            	<p>赶紧去赚取智汇币吧</p>
		      </div>
			   <div class="lessMoney">
			   	<p>获取智汇币的途径：</p>
            	<p>1、分享任何页面给好友</p>
            	<p>2、分享任何页面到朋友圈、群内</p>
            	<p>3、参与平台任何互动任务</p>
            	<p>4、充值获取(100智汇币=1元)</p>
			  </div>
		      <div>
		        <x-button @click.native="$router.push('/user/myrecharge')">去充值</x-button>
		      </div>
		    </div>
			<div class="investMoney_cha">
				<div class="investMoney_ch" @click="exhibit = false"><img src="/static/img/cha.png"></div>
			</div>
		  </x-dialog>
		</div>

		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, PopupPicker,TransferDom,XDialog,XButton, } from "vux";
	import { VueSwiper, VueLoading, } from "../component";
	import VueShareit from "../component/game/helpShare";
	export default {
		directives: {
			TransferDom
		},
		components: {
			VueSwiper, // 广告图竞价组
			XHeader, // 头部组件
			PopupPicker, // 筛选下拉框组件
			VueShareit, // 微信分享组件
			VueLoading,
			TransferDom,
		    XDialog,XButton,
		},
		data() {
			return {
				companyList: [], //企业列表数据
				titleList: ["品牌商", "代理商", "集成商", "设计商", "工程队"], //tab切换数据
				index1: 0,
				defaultValue: [],
				list: [],
				itemAddress: [],
				adds: undefined,
				add: [],
				itemHangye: [],
				adds2: undefined,
				add2: [],
				region: '',
				hangye: '',
				//				companyList:[],
				isshow: true,
				sy: 1,
				show: true, //是否开启省市县单选模式
				show1:false,
        isFixed: false,
        isFix: false,
        offsetTop:0,
        isShow:false,
        qy_id:'',
        exhibit:false,
			};
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: "智汇优库-" + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname +
						"邀您关注弱电智能化互动平台，秒得五十块！",
					imgUrl: "/static/logo.png",
					link: this.$route.path + "?uidkey=" + this.$store.state.mem_id
				};
			}
		},
		mounted() {
      window.addEventListener('scroll',this.initHeight);
      // this.$nextTick( () => {
      //   this.offsetTop = document.querySelector('.type-body').offsetTop;
      // })

			var _this = this;
			_this.$http.post(_this.$store.state.url + "/common/region").then(function(res) { //获取城市
				if(!res) return;

				if(_this.show) {

					_this.itemAddress.push({
						name: "全国",
						value: "-100",
						parent: "0"
					});
					_this.itemAddress.push({
						name: "",
						value: "-1",
						parent: "-100"
					});

				}
				_.each(res, function(e) {
					_this.itemAddress.push({
						name: e.typename,
						value: e.id.toString(),
						parent: e.parent_id.toString()
					});
					if(_this.show) {
						_this.itemAddress.push({
							name: "全部",
							value: "-1",
							parent: e.id.toString()
						});
					}
					_.each(e.children, function(e) {
						if(_this.show) {
							_this.itemAddress.push({
								name: "全部",
								value: "-1",
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
						});
					});
				});
			});

			_this.$http.post(_this.$store.state.url + "/Common/hangye").then(function(res) { //获取行业
				if(!res) return;

				if(_this.show1) {
					_this.itemHangye.push({
						name: "全部",
						value: "-100",
						parent: "0"
					});
					_this.itemHangye.push({
						name: "",
						value: "-1",
						parent: "-100"
					});
				}
				_.each(res, function(e) {
					_this.itemHangye.push({
						name: e.typename,
						value: e.id.toString(),
						parent: e.parent_id.toString()
					});
					if(_this.show1) {
						_this.itemHangye.push({
							name: "全部",
							value: "-1",
							parent: e.id.toString()
						});
					}
					_.each(e.children, function(e) {
						_this.itemHangye.push({
							name: e.typename,
							value: e.id.toString(),
							parent: e.parent_id.toString()
						});
					});
				});
			});
		},
		created() {
			this.search("", "");
		},
		methods: {

      initHeight () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.isFixed = scrollTop > this.offsetTop ? true : false;
        this.isFix = scrollTop > this.offsetTop ? true : false;
      },

			//公司下拉加载
			loaddata(res) {
				var _this = this
				_.each(res, function(e) {
					_this.companyList = _this.companyList || []
					_this.companyList.push(e)
				})
			},
			search(region, hangye) { // 搜索
				//				var _this = this;
				//				_this.$http
				//					.post(_this.$store.state.url + "/Homepages/get_minglu", {
				//						load: true,
				//						class: _this.index1 + 1,
				//						region: region,
				//						hangye: hangye,
				//						page: 1,
				//						limit: 10
				//					})
				//					.then(function(res) {
				//						_this.companyList = res;
				//					});
			},
			searchDefalt() { // 根据条件搜索

				if(!this.add[1] && !this.add2[0]) {
					this.companyList = [];
					this.reload();
				} else if(!this.add[1]) {
					this.hangye = this.add2;
					this.companyList = [];
					this.reload();
				} else if(!this.add2[0]) {
					this.region = this.add;
					this.companyList = [];
					this.reload();
				} else {
					this.region = this.add;
					this.hangye = this.add2;
					this.companyList = [];
					this.reload();
				}
			},
			go(uid, id) {
				this.$router.push("/yellowPages/index?uid=" + uid + "&id=" + id);
			},
			goBack() {
				// if(this.$route.query.uidkey) {
				// 	this.$router.push("/index");
				// } else {
				// 	history.go(-1);
				// }
        this.urls = new URL(window.location.href)
        if(this.urls.searchParams.get("uidkey")){
         this.$router.push("/index")
        } else {
          history.go(-1);
        }
			},
			shequ(i) {
				var _this = this;
				_this.index1 = i - 1;
				_this.list = "";
				_this.add = [];
				_this.add2 = [];
				_this.searchDefalt();
				_this.sy = _this.index1 + 1;
				_this.region = "";
				_this.hangye = "";
				_this.companyList = [];
				_this.reload();
			},
			ievent(res) {
				if(this.txt) {
					res.search = this.txt;
				}
				this.url = undefined;
				this.list = undefined;
				setTimeout(() => {
					this.url = querystring.stringify(res);
				}, 100);
			},
			hide() {
				this.searchDefalt();
			},
			hide2() {
				this.searchDefalt();
			},
			//刷新下载刷新节点
			reload() {
				var _this = this;
				_this.isshow = false;
				_this.$nextTick(function() {
					_this.isshow = true;
				})
			},
			ding(id){
				this.isShow=true
				this.qy_id = id
			},

			sureDing() {
				var _this = this;
				_this.$http
					.post(_this.$store.state.url + "/Homepages/qy_top", {
						load: true,
						qy_id: _this.qy_id
					})
					.then(function(res) {

						if(res == '余额不足，请充值！'){
							_this.isShow=false
							_this.exhibit=true
						}else{
							msg("置顶成功");
							_this.isShow = false;
							_this.companyList = []
							_this.reload()
						}
					});
			},


		},
    destroyed () {
      window.removeEventListener('scroll', this.initHeight)
    },
	};
</script>

<style scoped>
 .is_fixed{
      position: fixed!important;
      top: 1.2rem!important;
    }
    .is_fix{
      position: fixed!important;
      top: 2.4rem!important;
    }
  .vux-header {
    position: fixed;
    z-index: 11;
    width: 100%;
    top: 0;
  }
  .vuxSlider {
    top: 1.2rem;
    z-index: 10;
    width: 100%;
  }
  .type-body {
    position: relative;
    width: 100%;
    z-index: 11;
    top: 1.2rem;
  }
  .search {
    position: relative;
    width: 100%;
    z-index: 11;
    top: 1.3rem;
  }
  .moreCompany {
    padding-top: 1.6rem!important;
  }

	.goBack {
		position: absolute;
		width: 12px;
		height: 12px;
		border-style: solid;
		border-color: white;
		border-width: 1px 0 0 1px;
		-webkit-transform: rotate(315deg);
		transform: rotate(315deg);
		top: 3px;
	}

	.vux-header .title {
		width: 210px;
		font-size: 16px;
		text-align: center;
		line-height: 1.066667rem;
		color: #fff;
	}

	.search {
		background: #fff;
		padding-top: 10px;
	}

	.search .title {
		width: 100%;
		text-align: center;
		/*font-weight: 400;*/
		margin: 10px auto;
		font-size: 15px;
		font-weight: bold;
	}

	.search .searchSelect {
		width: 100%;
		text-align: center;
		/*font-weight: 400;*/
	}

	.search .vux-cell-box {
		width: 4rem;
		display: inline-block;
		border: 1px solid #d3d3d3;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		border-radius: 3px;
		padding: 0px 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.search .vux-cell-box .vux-popup-picker-select {
		text-align: left !important;
	}

	.search .vux-cell-box::before {
		border: 0px;
	}

	.yellowClass {
		background: #edce23;
		border-radius: 50px;
		display: inline-block;
		width: 19px;
		line-height: 19px;
		text-align: center;
		font-size: 10px;
		color: #ffffff;
	}

	.moreCompany {
		width: 100%;
		background: #ffffff;
		padding-bottom: 10px;
		padding-top: 10px;
	}

	.moreCompany .moreCompanyInner {
		width: 330px;
		margin: 0px auto;
	}

	.moreCompany .moreCompanyInner li:nth-child(1) {
		border-top: 1px solid #f3f3f3;
	}

	.moreCompany .moreCompanyInner li {
		width: 100%;
		height: 70px;
		border-bottom: 1px solid #f3f3f3;
		padding-top: 10px;
		overflow: hidden;
	}

	.moreCompany .moreCompanyInner li .left {
		float: left;
		margin-right: 10px;
		margin-left: 10px;
	}

	.moreCompany .moreCompanyInner li .left img {
		width: 64px;
		height: 64px;
		border-radius: 50px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	}

	.moreCompany .moreCompanyInner li .center {
		float: left;
		width: 200px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}

	.moreCompany .moreCompanyInner li .center .name {
		float: left;
		font-size: 15px;
		font-weight: bold;
		width: 220px;
		display: contents;
	}

	.moreCompany .moreCompanyInner li .center div {
		margin-top: 15px;
		overflow: hidden;
	}

	.moreCompany .moreCompanyInner li .center div .hangye {
		float: left;
		width: 100px;
	}

	.moreCompany .moreCompanyInner li .center div .tibs {
		float: right;
	}

	.moreCompany .moreCompanyInner li .right {
		float: right;
		width: 25px;
        height:25px;
	}

	.moreCompany .moreCompanyInner li .right img {
		/*width: 9px;*/
		margin-top: 20px;
		width:100%;
		height:100%;
	}


	/*.anniu{
		float: right;
		width: 25px;
        height:25px;
		text-align: center;
		font-size: 18px;
		margin-top: 5px;

	}
	.anniu img{
		width:100%;
		height:100%;
	}*/
	.type-change {
		width: 95%;
		padding: 0 10px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: middle;
		-ms-flex-align: middle;
		align-items: middle;
		overflow: auto;
		background: #ffffff;
	}

	.type-change div {
		text-align: center;
		font-size: 16px;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		padding: 10px;
		/* margin: 5px; */
	}

	.active {
		color: #04be02;
		border-bottom: 0.08rem solid #04be02;
	}


	.ding_content {
		background: url("/static/img/ding.png");
		background-size: 100% 100%;
		width: 90%;
		margin: 0 auto;
		padding: 1.7rem 0.5rem 0.8rem;
		box-sizing: border-box;
		text-align: left;
	}

	.ding_help {
		font-size: 20px;
		font-weight: 600;
		color: #ffffff;
	}

	.ding_px {
		margin-bottom: 2rem;
		background: #ffffff;
		color: rgba(255, 119, 72, 1);
		border-radius: 10px;
		width: 3rem;
		text-align: center;
		font-size: 10px;
	}

	.des {
		font-size: 10px;
	}

	.ding_bi {
		color: rgba(255, 107, 0, 1);
		text-align: center;
		margin-top: 8px;
		font-size: 15px;
	}

	.ding-sure {
		background: url("/static/img/btn.png");
		background-size: 100% 100%;
		width: 90%;
		padding: 8px;
		box-sizing: border-box;
		color: #ffffff;
		text-align: center;
		font-size: 15px;
		margin-top: 20px;
	}

	.cose {
		position: absolute;
		top: 57px;
		right: 9px;
		margin: 0.16rem 0.16rem;
		color: rgba(0, 0, 0, 0.59);
		cursor: pointer;
		font-size: 0.666667rem;
		opacity: 0.3;
	}
	button.weui-btn, input.weui-btn{
		border-radius: 20px;
		width: 50%;
		margin-bottom: 20px;
	}

	.invest_Money {
		    border-radius: 8px;
		    padding-bottom: 8px;
		  }
		.investMoney_img {
		  background: #FFFFFF;
		  /*height: 250px;*/
		  overflow: hidden;
		  height:12rem;
		}
		.investMoney_title {
		    width:80%;
    	margin:0 auto;
    	border-bottom: 1px solid #999;
    	margin-top:10px;
    	height:1.9rem;
    	font-size: 18px;
      	text-align: center;
		}
		.investMoney_cha{
			width:100%;
			display: flex;
			justify-content: center;
		}
		.investMoney_ch{
			width:30px;
			height:30px;
		}
		.investMoney_ch img{
			width:100%
		}
		 .weui-btn_default {
		  background: #FF6F3A;
		  color: #fff;
		  width: 100px;
		}
		.lessMoney {
		  width: 220px;
	      font-size: 14px;
	      margin: 20px auto;
	      text-align: left;
		}

</style>
