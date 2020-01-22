<template>
    <div>
    	<x-header :title="title" :left-options="{backText:''}" class="header">
    	 </x-header>
    	 <div class="index_box">
        	<vue-list v-for="(item,index) in list" :type="$route.params.type" :item="item" :key="index" ></vue-list>
            <vue-loading :url="$store.state.url + '/Homepages/moreList?page=1&limit=10&type='+$route.params.type+'&uid='+$route.params.uid" @ievent="loaddata" v-if="isshow"></vue-loading>
        </div>
        
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
    </div>
</template>

<script>
    import { XHeader,Badge,PopupPicker, XDialog,TransferDom } from 'vux'
    import {VueLoading,VueSwiper,VueFoot,VueSuspen,VueList,VueHeaderNav,VueShareit} from '../component'
    export default {
        components: {
            XHeader,
            VueLoading,
            Badge,
            VueSwiper,
            VueFoot,
            VueSuspen,
            VueList,
            VueHeaderNav,
            VueShareit,
            PopupPicker,
            XDialog
        },
        directives: {
			TransferDom
		},
        data() {
            return {
                list: undefined,
                isshow: true,
				title:''
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            fenxiang(){
            	return {
            	title:'智汇优库-' + this.$route.meta.title,
                dese:this.$store.state.user.mem_nickname+'邀您关注弱电行业众包伙伴/项目，他在智汇优库等您！',
                 imgUrl: '/static/img/hz.jpg',
                link: '/hezuo/index'
            	}
            }
        },
        mounted() {
           let _this=this;
          
           if( _this.$route.params.type==1){
           	_this.title="众包列表";
           }else if(_this.$route.params.type==2){
           		_this.title="活动列表";
           }else{
           		_this.title="直播列表";
           }
        },
        methods: {
            loaddata(res) {
                var _this = this;
                _.each(res, function(e) {
                    _this.list = _this.list || [];
                    _this.list.push(e);
                })
            },
          
            reload() {
				var _this = this;
				_this.isshow = false;
				_this.$nextTick(function() {
					_this.isshow = true;
				})
			},
			
        }
    }
</script>

<style scoped>
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
		padding: 10px 10px 0px;
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
		width:4rem;
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

</style>