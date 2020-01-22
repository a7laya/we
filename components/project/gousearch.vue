<template>
	<div class="main_box">
		<div class="header-search">
		    <div class="search-content">
		        <div class="searchbox fl">
		            <input  placeholder="请输入任务/关键字" class="txt" v-model="txt">
		            <i class="iconfont icon-sousuo" @click="form"></i>
		        </div>
		        <div class="button_fabu fl">
		        	<vue-xuanze ref="sfilter" @ievent="ievent" :name="$route.query.id">筛选</vue-xuanze>
		        </div>
		    </div>
		</div>
		<vue-message :type="2" v-for="(item,index) in list" :item="item" :key="index"></vue-message>
		<vue-loading v-if="url" :url="$store.state.url + '/Collection/tenderingRecord?page=1&limit=10&' + url + '&pId='+$route.query.id" @ievent="loaddata"></vue-loading>
	</div>
</template>

<script>
	import { querystring } from 'vux'
	import { VuePosition,VueXuanze,VueMessage,VueLoading} from '../component/'
	export default{
		components: {
		    VuePosition,
		    VueXuanze,
			VueMessage,
		    VueLoading,
			querystring
		},
		data(){
			return{
				list:undefined,
				url:undefined,
				txt:'',
				hangye:[],
			}
		},
		methods: {
			form(){
				this.hangye=[];
				this.url = undefined;
				this.list = undefined;
				this.$refs.sfilter.clickcelbuttom()
				if(!this.txt){
					msg("请输入需搜索的内容");
					return;
				}
				setTimeout(() => {
					this.url = 'keyword=' + this.txt;
				},100)
			}, 
			 ievent(res){
				if(this.txt){
					res.search = this.txt;
				}
				this.url = undefined;
				this.list = undefined;
				this.hangye = []
				setTimeout(() => {
					this.url = querystring.stringify(res);
				},100)
			},
			 loaddata(res) {
			    var _this = this;
			    _.each(res, function(e) {
			        _this.list = _this.list || [];
			        _this.list.push(e);
			    })
			},
		},
	}
</script>

<style scoped>
	
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
	    width: 305px;
	    margin-left: 13px;
	    position: relative;
	}
	
	.searchbox input.txt {
	    width: 100%;
	    background: rgba(255, 255, 255, 0.1);
	    line-height: 30px;
	    height: 30px;
	    border-radius: 30px;
	    text-indent: 10px;
	    color: #fff;
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
</style>
