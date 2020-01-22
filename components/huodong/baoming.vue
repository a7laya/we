<template>
	<div class="baoming hezuod">
		<div style="background: #25C286;">
		<x-header :title="''" :left-options="{backText:''}" class="header step wofr"></x-header>
		<div class="hezuod_user">
            <group gutter="0">
                <cell is-link>
                    <div class="zongnlan" slot="title">
                    	<div class="name class1">活动名称</div>
                        <div class="name" style="font-weight: 800;">
                            {{item.information}}
                        </div>
                        <div class="gongs_name">
                            <i class="iconfont icon-dingwei"></i>{{item.region}}{{item.specreg}}
                        </div>
                    </div>
                </cell>
            </group>
        </div>
        </div>
        <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
   
	</div>
</template>

<script>
    import { XHeader, Group, Cell } from 'vux'
    import { VueSuspen, VueShareit, VuePingfen, VueCollection, VueCommentTxt } from '../component'
    export default {
        components: {
            XHeader,
            VueShareit,
            VueSuspen,
            VuePingfen,
            Group,
            Cell,
            VueShareit
        },
        data() {
            return {
                item: undefined,
                userlist: [],
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            fenxiang(){
            	return {
            	 title: this.$route.meta.title,
                dese: this.$store.state.user.mem_nickname+'邀您参与活动，关注/分享秒得奖励！',
                imgUrl: '/static/img/hd.jpg',
                link: '/huodong/index'
            	}
            }
        },
        mounted() {
            var _this = this;
            _this.$http.post(_this.$store.state.url + '/activityb/new_act_detaile', {
                load: true,
                id: _this.$route.params.id,
            }).then((res) => {
                if(!res) return;
                res.wordurl = res.wordurl ? res.wordurl : [];
                _this.item = res;
            })
        }
    }
</script>

<style scoped>
    .hezuod {
        background: #fff;
        min-height: -webkit-fill-available;
        padding-bottom: 100px;
    }
    
    .hezuod .hezuod_box_main {}
    
    .hezuod_box_main .banner {
        width: 345px;
        box-shadow: 0 0 10px 0 #999;
        border-radius: 5px;
        overflow: hidden;
        margin: 0 auto;
        margin-top: 10px;
    }
    
    .hezuod .hezuod_title,
    .hezuod .hezuod_neirong,
    .hezuod .xiangqing {
        padding: 0 15px;
    }
    
    .hezuod .hezuod_title .title {
        font-size: 17px;
        color: #333;
        line-height: 30px;
        margin-top: 15px;
        font-weight: 800;
    }
    
    .hezuod .hezuod_title .hangye {
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
    }
    
    .hezuod_user .img {
        width: 63px;
        height: 63px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
    }
    
    .hezuod_user .zongnlan .name {
        font-size: 14px;
        color: #fff;
    }
    .hezuod_user .zongnlan .name.class1{
    	font-size: 12px;
    }
    
    .hezuod_user .zongnlan .gongs_name {
        font-size: 12px;
        color: #fff;
    }
    
    .hezuod_user .zongnlan .pingfen {
        line-height: 15px;
    }
    
    .hezuod_user .zongnlan .pingfen .icon-xingxing1 {
        margin-right: 2px;
    }
    
    .hezuod .hezuod_neirong {
        line-height: 55px;
    }
    
    .hezuod .hezuod_neirong .li::after {
        content: '';
        display: block;
        height: 1px;
        width: 90%;
        margin-left: 10%;
        background: #cccccc;
    }
    
    .hezuod .hezuod_neirong .li:nth-child(3)::after {
        display: none;
    }
    
    .hezuod .hezuod_neirong .li .iconfont {
        font-size: 18px;
        color: #d0d0d0;
        display: inline-block;
        vertical-align: middle;
    }
    
    .hezuod .hezuod_neirong .li .xiao {
        font-size: 16px;
        margin-left: 18px;
    }
    
    .hezuod .hezuod_neirong .li .xiao>strong {
        font-weight: 800;
        color: #ea2121;
        margin-right: 10px;
    }
    
    .hezuod .hezuod_neirong .li .xiao>span {
        font-size: 12px;
    }
    
    .xiangqing .xiangtitle>strong {
        font-size: 17px;
        color: #333;
        font-weight: 800;
        line-height: 50px;
    }
    
    .xiangqing .xiangmeirong {
        color: #666;
        font-size: 14px;
        margin-bottom: 15px;
    }
    
    .xiangqing .xiangfujian .xiangfu_tit strong {
        font-size: 12px;
        color: #333;
        font-weight: 800;
    }
    
    .xiangqing .xiangfujian .xiangfu_nei .li {
        display: inline-block;
        text-align: center;
        width: 35px;
        margin-top: 15px;
        margin-left: 10px;
    }
    
    .xiangqing .xiangfujian .xiangfu_nei .li>span {
        font-size: 12px;
        color: #34a2ff;
    }
    
    .hezuod .hezuod_b_button {
        position: fixed;
        bottom: 0;
        width: 100%;
        box-shadow: 0 0 10px 0 #999;
        background: #fff;
        padding: 5px 0;
    }
    
    .hezuod .hezuod_b_button .button_max {
        width: 260px;
        line-height: 34px;
        font-size: 18px;
        background: linear-gradient(to right, #03E1EC, #06E7C7);
    }
    
    .hezuod .hezuod_b_button .hezuo_shouc {
        display: inline-block;
        margin-left: 15px;
        vertical-align: middle;
        text-align: center;
    }
    
    .hezuod .hezuod_b_button .hezuo_shouc>i {
        font-size: 22px;
        line-height: 22px;
        color: #9c9c9c;
    }
    
    .hezuod .hezuod_b_button .hezuo_shouc>span.txt {
        font-size: 12px;
        line-height: 14px;
        display: block;
        color: #9c9c9c;
    }
    
    .hezuod .hezuod_b_button .hezuob_zhen_button {
        display: inline-block;
        vertical-align: middle;
        margin-left: 15px;
    }
    
    .hezuod .user_img {
        padding: 0 15px;
        background: #f2f2f2;
    }
    
    .hezuod .user_img .main_user_im {
        display: inline-block;
        width: 34px;
        height: 34px;
        overflow: hidden;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 3px;
    }
    
    .hezuod .user_img .ainuser_num {
        font-size: 12px;
        color: #999;
    }
</style>