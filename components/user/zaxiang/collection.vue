<template>
    <div>
        <x-header :title="'我的收藏'" :left-options="{backText:''}">
        	<div slot="right">
                <vue-header-nav></vue-header-nav>
            </div>
        </x-header>
        <tab>
            <tab-item selected @on-item-click="onItemClick(1)">众包</tab-item>
            <tab-item @on-item-click="onItemClick(2)">活动</tab-item>
            <tab-item @on-item-click="onItemClick(3)">直播</tab-item>
        </tab>
        <template v-if="index==1">
        	<vue-list v-for="(item,index) in list" :type="1" :item="item" :key="index"></vue-list>
        	<vue-loading :url="$store.state.url + '/Comment/see_collection?type=1&page=1&limit=10'" @ievent="loaddata"></vue-loading>
        </template>
        <template v-if="index==2">
        	<vue-list v-for="(item,index) in list" :type="2" :item="item" :key="index"></vue-list>
        	<vue-loading :url="$store.state.url + '/Comment/see_collection?type=2&page=1&limit=10'" @ievent="loaddata"></vue-loading>
        </template>
        <template v-if="index==3">
        	<vue-list v-for="(item,index) in list" :type="3" :item="item" :key="index"></vue-list>
        	<vue-loading :url="$store.state.url + '/Comment/see_collection?type=3&page=1&limit=10'" @ievent="loaddata"></vue-loading>
        </template>
         <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
    </div>
</template>

<script>
    import { XHeader, Tab, TabItem, Badge } from 'vux'
    import { VueLoading ,VueList,VueHeaderNav, VueShareit } from '../../component/'
    export default {
        components: {
            XHeader,
            Tab,
            TabItem,
            VueLoading,
            Badge,VueList,
            VueHeaderNav,
              VueShareit 
        },
        data() {
            return {
                list: undefined,
                index: 1
            }
        },
        	computed: {
			user() {
				return this.$store.state.user;
			},
			fenxiang() {
				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动平台，秒得五十块！',
					imgUrl: '/static/logo.png',
					link: '/user/index'
				}
			}
		},
        methods: {
            remove(index) {
                var _this = this;
                var layindex = layer.open({
                    content: '您确定要删除吗？',
                    btn: ['好的', '不要'],
                    yes: function() {
                        _this.$http.post(_this.$store.state.url + '/Comment/del_data', {
                            lood: false,
							pid:_this.list[index].coop_id || _this.list[index].act_id,
							type:_this.index
                        }).then(function(res) {
                            if(!res) return;
                            _this.list.splice(index, 1);
                        })
                        layer.close(layindex);
                    }
                });
            },
            onItemClick(index) {
                var _this = this;
                this.index = -1
                setTimeout(function() {
                    _this.index = index;
                    _this.list = undefined;
                }, 50)
            },
            loaddata(res) {
                var _this = this;
                _.each(res, function(e) {
                    _this.list = _this.list || [];
                    _this.list.push(e);
                })
            },
            go(type, id) {
                var url;
                switch(type) {
                    case 1:
                        url = '/hezuo/details/' + id;
                        break;
                    case 2:
                        url = '/huodong/details/' + id;
                        break;
                    case 3:
                        url = '/zhibo/details/' + id;
                        break;
                }
                this.$router.push(url)
            }
        }
    }
</script>

<style scoped>
    .index_box .remove_butt {
        position: absolute;
        top: 0;
        right: 5px;
        background: rgba(255, 255, 255, .8);
    }
    
    .index_box .remove_butt .span {
        display: inline-block;
        vertical-align: middle;
    }
    
    .index_box .remove_butt i {
        display: inline-block;
        vertical-align: middle;
    }
    
    .index_box .li {
        margin-top: 10px;
        position: relative;
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
</style>