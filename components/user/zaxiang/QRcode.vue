<template>
    <div style="min-height: -webkit-fill-available;background: #fff;">
        <x-header :title="user.mem_nickname ? `${user.mem_nickname}的邀请码` : '我的推广码'" :left-options="{backText:''}">
        	<vue-header-nav slot="right"></vue-header-nav>
        </x-header>
        <img id="avatar"/>
        <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
    </div>
</template>

<script>
    import { XHeader, Qrcode } from 'vux'
    import {VueHeaderNav,VueShareit} from '../../component/'
    export default {
        components: {
            XHeader,
            Qrcode,
            VueHeaderNav,
            VueShareit
        },
        data() {
            return {}
        },
        mounted() {
            var _this = this;
            _this.ajax();
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            fenxiang(){
            	return {
            		title:'智汇优库',
            		dese:'智汇优库-' + this.$route.meta.title,
            		imgUrl:this.$store.state.website.website_domain_name + '/uploads/logo.png',
            		link:''
            	}
            }
        },
        methods: {
            drawAndShareImage(imgurl) {
                var canvas = document.createElement("canvas");
                canvas.width = 750;
                canvas.height = 1000;
                var context = canvas.getContext("2d");
                context.rect(0, 0, canvas.width, canvas.height);
                context.fillStyle = "#fff";
                context.fill();

                var myImage = new Image();
                myImage.src = "/static/img/a1e5d3b054ea21d7f58a006ad02dd1e.png"; //背景图片  你自己本地的图片或者在线图片
                myImage.crossOrigin = 'Anonymous';

                myImage.onload = function() {
                    context.drawImage(myImage, 0, 0, 750, 1000);
                    var myImage2 = new Image();
                    myImage2.crossOrigin = 'Anonymous';
                    myImage2.src = imgurl; //你自己本地的图片或者在线图片
                    myImage2.onload = function() {
                        context.drawImage(myImage2, 295, 421, 150, 150);
                        var base64 = canvas.toDataURL("image/png"); //"image/png" 这里注意一下
                        var img = document.getElementById('avatar');
                        img.setAttribute('src', base64);
                    }
                }
            },
            ajax() { //登录
            	var _this = this;
                this.$http.post(this.$store.state.url + '/Homecenter/ewcode', {
                    'load': true,
                }).then((res) => {
                    if(!res) return;
                   this.drawAndShareImage(_this.$store.state.url + res.imgUrl)
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
</style>