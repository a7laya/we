<template>
	<div>
		<x-header :title="'直播列表'" :left-options="{backText:'',preventGoBack:true}" @on-click-back="fanhui()" class="header" id="headerX">
			<div slot="right">
				<vue-header-nav></vue-header-nav>
			</div>
		</x-header>
		<vue-swiper :type="10"></vue-swiper>
		<div class="search" id="searchId" :class="{'is_fixed' : isFixed}">
			<div class="searchSelect" >
				<popup-picker placeholder="地区" :data="itemAddress" v-model="add" :show-name="true" :columns="2" @on-hide="hide" value-text-align="left" class="sx"></popup-picker>
				<popup-picker placeholder="行业" :data="itemHangye" v-model="add2" :show-name="true" :columns="1" @on-hide="hide2" value-text-align="left" class="sx"></popup-picker>
			</div>
		</div>
		<div class="index_box" style="padding-top: 2.4rem;">
			<vue-list v-for="(item,index) in list" :type="3" :item="item" :key="index"></vue-list>
			<vue-loading :url="$store.state.url + '/live/live_index?page=1&limit=10&region='+region+'&industry='+hangye" @ievent="loaddata" v-if="isshow"></vue-loading>
		</div>
		<vue-foot></vue-foot>
		<!--<vue-suspen></vue-suspen>-->
		<vue-zhibo></vue-zhibo>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, Badge, PopupPicker } from 'vux'
	import { VueLoading, VueSwiper, VueList, VueFoot, VueHeaderNav, VueShareit, VueZhibo } from '../component'

	export default {
		components: {
			XHeader,
			VueLoading,
			Badge,
			VueSwiper,
			VueList,
			VueFoot,
			VueHeaderNav,
			VueShareit,
			PopupPicker,
			VueZhibo
		},
		data() {
			return {
				list: undefined,
				isshow: true,
				itemAddress: [],
				adds: undefined,
				add: [],
				itemHangye: [],
				adds2: undefined,
				add2: [],
				region: '',
				hangye: '',
				show: true, //是否开启省市县单选模式
				show1:false,
        isFixed: false,
        offsetTop:0
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电行业直播，他在智汇优库直播间等您！',
					imgUrl: '/static/img/zb.jpg',
//					link: '/zhibo/index'
					link:''
				}
			}
		},
		mounted() {
      // 1. 事件监听
      window.addEventListener('scroll', this.initHeight);

			var _this = this;

			_this.$http.post(_this.$store.state.url + "/common/region").then(function(res) { //获取城市
				if(!res) return;
				if(_this.show) {
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
					if(_this.show) {
						_this.itemAddress.push({
							name: '全部',
							value: '-1',
							parent: e.id.toString()
						});
					}
					_.each(e.children, function(e) {
						if(_this.show) {
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
							// console.log(e.children)
							_this.itemAddress.push({
								name: e.typename,
								value: e.id.toString(),
								parent: e.parent_id.toString()
							});
						})
					})
				})
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
    activated(){
    	    if(this.scroll > 0){
    	        window.scrollTo(0, this.scroll);
    	        window.addEventListener('scroll', this.handleScroll);
    	    }
       	},
		methods: {
      fanhui() {
        this.urls = new URL(window.location.href)
        // console.log('aaaa')
        if(this.urls.searchParams.get("uidkey")){
          this.$router.push('/index')
        }else{
          this.$router.go(-1)
        }
      },
      // 2. 滚动事件绑定的方法
      initHeight () {
        // 获取高度
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // 判断筛选条件是否显示
        this.isFixed = scrollTop > this.offsetTop+200 ? true : false;
      },

			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					// console.log(e)
					_this.list = _this.list || [];
					_this.list.push(e);
					// console.log(_this.list)
				})
			},
			go(id) {
				this.$router.push('details/' + id)
			},
			reload() {
				var _this = this;
				_this.isshow = false;
				_this.$nextTick(function() {
					_this.isshow = true;
				})
			},
			hide(i) {
				var _this = this;
				_this.region = _this.add;
				_this.list = [];
				_this.reload();
			},
			hide2() {
				var _this = this;
				_this.hangye = _this.add2;
				_this.list = [];
				_this.reload();
			},
		},
    //3. 最后一步必须把绑定的事件删除事 (重要)
    destroyed () {
      window.removeEventListener('scroll', this.initHeight);
    },
	}
</script>

<style scoped>

  .is_fixed{
      position: fixed!important;
      top: 1.2rem!important;
    }
  .header {
    position: fixed;
    width: 100%;
    z-index: 11;
    top: 0;
  }
  .vuxSlider {
    top: 1.2rem;
  }
	.index_box .li {
		margin-top: 10px;
	}

	.index_box .li+.li {
		margin-top: 5px;
	}

	.index_box .li {
		padding: 10px 15px;
		background: #fff;
	}

	.index_box .li .img {
		width: 65px;
		height: 65px;
	}

	.index_box .li .img img {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.index_box .li>.txt {
		width: 270px;
		font-size: 15px;
		color: #636363;
		line-height: 21px;
	}

	.index_box .li>.txt .tit_name {
		display: inline-block;
		vertical-align: middle;
	}

	.index_box .li>.txt .txtsp2 {
		font-size: 13px;
	}

	.index_box .li>.txt .txtsp2 .money {
		color: #fc2b4e;
	}

	.index_box .li>.txt .diqu {
		color: #565656;
	}

	.index_box .li>.txt .txtsp2 .icon-dingwei {
		font-size: 14px;
	}

	.index_box .li>.txt .txtsp2 .diqutxt {
		font-size: 12px;
		margin-right: 10px;
		color: #999;
	}

	.index_box .li>.txt .color {
		color: #565656;
	}

	.index_box .li>.txt .txtsp2 .shuomign {
		margin-left: 10px;
	}

	.index_box .li>.txt .vux-badge.color1 {
		background: #f74c31;
	}

	.index_box .li>.txt .vux-badge.color4 {
		background: #62dcd2;
	}

	.index_box .li>.txt .vux-badge.color2 {
		background: #42ce74;
	}

	.index_box .li>.txt .vux-badge.color3 {
		background: #4b6bd0;
	}

	.search {
		background: #fff;
		padding-top: 10px ;
    position: absolute;
    z-index: 2;
    width: 100%;
    top: 6.8rem;
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

	/* .searchgrid{
		z-index: 1000;
		position:fixed;
		top:45px;
		width:100%;

	} */


	/* #headerX{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 2;

	}
	.vuxSlider{
		margin-top:45px

	} */

</style>
