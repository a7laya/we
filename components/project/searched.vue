<template>
	<div class="main_box">
		<div class="header-search">
			<div class="search-content">
				<div class="fanhui" @click="back"><img src="/static/img/fanhui.png"></div>
				<div class="searchbox fl">
					<input placeholder="请输入任务/关键字" class="txt" v-model="txt" @focus="changeCount()">
					<i class="iconfont icon-sousuo" @click="form"></i>
				</div>
				<div class="button_fabu fl">
					<!-- <vue-caixuan ref="sfilter" @ievent="ievent">筛选</vue-caixuan> -->
					<span @click="chongzhi()">重置</span>
				</div>
			</div>
		</div>
		<div class="shaixuan" v-show="isshow">
			<div class="area">
				<span class="xuanze">地区选择</span>
				<popup-picker :placeholder="'默认全国'" :data="itemAddress" v-model="add" :show-name="true" :columns="2"></popup-picker>
			</div>
			<div class="area">
				<span class="xuanze">时间选择</span>
				<popup-picker :placeholder="'默认全部'" :data="time" v-model="Changetime" class="change"></popup-picker>
			</div>
			<div class="area">
				<span class="xuanze">行业选择</span>
				<popup-picker :placeholder="'默认全部'" :data="hangyeAddress" v-model="hangye" :show-name="true" :columns="2"></popup-picker>
			</div>
			<div class="sure">
				<span @click="sure()">确定</span>
			</div>
		</div>
		<div class="scrolldata">
			<vue-message :type='1' v-for="(item,index) in list" :item="item" :key="index"></vue-message>
		</div>
		<span style="display: inline-block;width: 100%;text-align: center;border-top: 1px solid rgba(112, 112, 112, 0.5);"
		 v-if="isjiazai">加载完成</span>
		<span style="display: inline-block;width: 100%;text-align: center;border-top: 1px solid rgba(112, 112, 112, 0.5);"
		 v-else-if="isjiatext">暂无数据</span>
		<!-- <vue-loading ref="sousuo" v-if="url" :url="$store.state.url + '/Collection/projectList?page=1&limit=10&' + url" @ievent="loaddata"></vue-loading> -->
	</div>
</template>

<script>
	import {
		querystring,
		PopupPicker
	} from 'vux'
	import {
		VuePosition,
		VueCaixuan,
		VueMessage,
		VueLoading
	} from '../component/'
	export default {
		components: {
			VuePosition,
			VueCaixuan,
			VueMessage,
			VueLoading,
			querystring,
			PopupPicker
		},
		data() {
			return {
				list: [],
				url: undefined,
				txt: '',
				isshow: false,
				add: [],
				itemAddress: [],
				form: {

				},
				shows: true,
				Changetime: [],
				time: [
					['今天', '本周', '本月', '三个月', '半年']
				],
				hangye: [],
				hangyeAddress: [],
				page: 1,
				limit: 10,
				industry: '',
				Changetime1: '',
				diqu: '',
				isjiazai: false,
				isjiatext: false,
				search_type: 0,
			}
		},
		watch: {
			'url': {
				handler() {
					// this.list = []
					// this.$refs.sousuo.ajax()
					// this.url = undefined
				},
				immediate: false
			}
		},
		methods: {
			//搜索结果分页
			infor_scroll() {
				if ($(document).scrollTop() >= $('.listing').height() - $(window).height()) {
					var _this = this;
					_this.page++
					_this.$set(_this.form, 'page', _this.page)
					_this.$http.post(_this.$store.state.url + '/Collection/projectList', {
						..._this.form
					}).then(function(res) {
						if (res.length == 0) {
							// msg('没有更多数据')
							_this.isjiazai = true
							_this.isjiatext = false
							return
						} else {
							for (let i in res) {
								_this.list.push(res[i])
							}
							return
						}
					})
				}
			},
			back() {
				var _this = this;
				_this.$router.push('/project/index')
			},
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
				})
			},
			changeCount() {
				this.isshow = true
			},
			sure() {
				this.list = []
				if (this.hangye.length < 1) {
					this.hangye[0] = ''
					this.hangye[1] = ''
				}
				if (this.Changetime.length >= 1) {
					if (this.Changetime[0] == '今天') {
						this.Changetime1 = '1',
							this.Changetime = ['今天']
					}
					if (this.Changetime[0] == '本周') {
						this.Changetime1 = '2'
						this.Changetime = ['本周']
					}
					if (this.Changetime[0] == '本月') {
						this.Changetime1 = '3'
						this.Changetime = ['本月']
					}
					if (this.Changetime[0] == '三个月') {
						this.Changetime1 = '4'
						this.Changetime = ['三个月']
					}
					if (this.Changetime[0] == '半年') {
						this.Changetime1 = '5'
						this.Changetime = ['半年']
					}
				} else {
					this.Changetime1 = ''
					this.Changetime = ['默认全部']
				}
				if (this.add.length == 0) {
					this.diqu = '-100--1'
				} else {
					this.diqu = this.add[0] + '-' + this.add[1]
				}
				this.$set(this.form, 'keyword', this.txt)
				this.$set(this.form, 'region', this.diqu)
				this.$set(this.form, 'industry', [this.hangye[0], this.hangye[1]])
				this.$set(this.form, 'searchTime', this.Changetime1)
				// this.url = querystring.stringify(this.form);
				this.page = 1
				this.$set(this.form, 'page', this.page)
				this.$set(this.form, 'limit', 10)
				this.$set(this.form, 'type', this.search_type)
				console.log('this.form')
				console.log(this.form)
				this.isshow = false
				var _this = this
				_this.$http
					.post(_this.$store.state.url + "/Collection/projectList", {
						..._this.form
					})
					.then(res => {
						if (res.length == 0) {
							_this.isjiazai = false;
							_this.isjiatext = true
						} else {
							_this.list = res
						}


					})
			},

			chongzhi() {
				this.hangye = [],
					this.add = [],
					this.Changetime = [],
					this.txt = []
			},
			// hides(i) {
			//   this.$set(this.form, 'region', this.hangye[0] +'-' + this.hangye[1] + '-' );
			// },
			// hide(i) {
			// 	this.$set(this.form, 'region', this.add[0] +'-' + this.add[1] + '-' );
			// },
			form() {
				this.url = undefined;
				this.list = [];
				this.$refs.sfilter.clickcelbuttom()
				if (!this.txt) {
					msg("请输入需搜索的内容");
					return;
				}
				setTimeout(() => {
					this.url = 'keyword=' + this.txt;
				}, 100)
			},
			ievent(res) {
				this.url = undefined;
				this.list = [];
				setTimeout(() => {
					this.url = querystring.stringify(res);
				}, 100)
			},
			loaddata(res) {
				var _this = this;
				_.each(res, function(e) {
					_this.list = _this.list || [];
					_this.list.push(e);
				})
			},
		},
		beforeDestroy() {
			window.removeEventListener("scroll", this.infor_scroll)
		},
		mounted() {
			window.addEventListener('scroll', this.infor_scroll);
			var _this = this;
			_this.search_type = _this.$route.query.type;
			_this.$http.post(_this.$store.state.url + "Collection/coRegion").then(function(res) { //获取城市
				if (!res) return;
				if (_this.shows) {
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
					if (_this.shows) {
						_this.itemAddress.push({
							name: '全部',
							value: '-1',
							parent: e.id.toString()
						});
					}
					_.each(e.children, function(e) {
						if (_this.shows) {
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

			//行业
			_this.$http.post(_this.$store.state.url + "/Common/hangye").then(function(res) { //获取城市
				if (!res) return;
				if (_this.shows) {
					_this.hangyeAddress.push({
						name: '全部',
						value: '-100',
						parent: '0'
					});
					_this.hangyeAddress.push({
						name: '',
						value: '-1',
						parent: '-100'
					});
				}
				_.each(res, function(e) {
					_this.hangyeAddress.push({
						name: e.typename,
						value: e.id.toString(),
						parent: e.parent_id.toString()
					});
					if (_this.shows) {
						_this.hangyeAddress.push({
							name: '全部',
							value: '-1',
							parent: e.id.toString()
						});
					}
					_.each(e.children, function(e) {
						if (_this.shows) {
							_this.hangyeAddress.push({
								name: '全部',
								value: '-1',
								parent: e.id.toString()
							});
						}
						_this.hangyeAddress.push({
							name: e.typename,
							value: e.id.toString(),
							parent: e.parent_id.toString()
						});
						_.each(e.children, function(e) {
							_this.hangyeAddress.push({
								name: e.typename,
								value: e.id.toString(),
								parent: e.parent_id.toString()
							});
						})
					})
				})

			})


		}
	}
</script>

<style scoped>
	.fanhui {
		width: 30px;
		height: 45px;
		line-height: 45px;
		float: left;
		display: flex;
		align-items: center;
	}

	.fanhui img {
		height: 30px;
		width: 100%;
	}

	.header-search {
		height: 45px;
		color: #fff;
		font-size: 16px;
	}

	.location {
		display: inline-block;
		margin-left: 10px;
		width: 70px;
	}

	.location i.icon-dingwei {
		font-size: 15px;
		margin-right: 5px;
	}

	.search-content {
		line-height: 45px;
		height: 45px;
		background: #35495e;
	}

	.searchbox {
		display: inline-block;
		width: 250px;
		margin-left: 13px;
		position: relative;
	}

	.searchbox input.txt {
		width: 80%;
		background: rgba(255, 255, 255, 0.1);
		line-height: 30px;
		height: 30px;
		border-radius: 30px;
		text-indent: 10px;
		color: #fff;
		margin-left: 40px;
	}

	.searchbox input.txt::-webkit-input-placeholder {
		color: #fff;
	}

	.searchbox i.icon-sousuo {
		position: absolute;
		color: #fff;
		font-size: 22px;
		top: 0;
		right: 10px;
		padding: 0 10px;
	}

	.searchbox i.icon-sousuo::before {
		display: inline-block;
		vertical-align: middle;
	}

	.button_fabu {
		display: inline-block;
		margin-left: 13px;
	}

	.button_fabu i {
		font-size: 25px;
	}

	.vux-cell-box:not(:first-child):before {
		border: none !important;
	}

	.vux-cell-box {
		display: inline-block !important;
	}

	.area {
		width: 100%;
		height: 80px;
		line-height: 80px;
		background: #fff;
		margin-top: 5px;
	}

	.shaixuan :first-child {
		margin-top: 0;
	}

	.xuanze {
		display: inline-block;
		width: 80px;
		height: 0.7rem;
		border-radius: 2px;
		background: #949EAD;
		color: #fff;
		line-height: 0.7rem;
		font-size: 0.35rem;
		text-align: center;

	}

	.vux-popup-picker-select>span {
		display: inline-block;
		background: #00C06B;
	}

	.vux-cell-box {
		display: inline-block;
		width: 200px;
		height: 30px;
		line-height: 30px;
		text-align: center !important;
		/* background: #000!important; */
		font-size: 0.35rem;
		background: url(../../../static/img/未标题-1.png) no-repeat 0;
		background-position: 6rem;
		padding-right: 50px;
	}

	.vux-popup-picker-select {
		text-align: center !important;
	}

	.sure {
		width: 100%;
		height: 50px;
		background: #fff;
	}

	.sure>span {
		display: block;
		width: 2rem;
		height: 0.8rem;
		line-height: 0.8rem;
		background: #F88509;
		border-radius: 15px;
		color: #fff;
		text-align: center;
		margin: 0 auto;
	}
</style>
