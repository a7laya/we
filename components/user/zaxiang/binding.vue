<template>
	<div class="main_box">
    	<x-header :title="'成为正式会员'" :left-options="{backText:''}"></x-header>
    	<div class="txt" style="font-size: 14px;">
    		手机号即您的会员编号，方便日后在其它浏览器登录。
    	</div>
        <div class="input">
            <div class="li">
                <img src="/static/img/icon35.png" />
                <input type="number" placeholder="请输入手机号" v-model="ipone" />
            </div>
            <div class="li">
                <img src="/static/img/icon40.png" />
                <input type="number" placeholder="请输入验证码" v-model="code" />
				<div class="codeButton"><vue-code :ipone="ipone"></vue-code></div>
            </div>
        </div>
        <div class="login" @click="form">保存</div>
                <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
    </div>
</template>

<script>
	import { CheckIcon,XHeader} from 'vux'
    import { VueCode,VueXieyi , VueShareit } from '../../component'
    export default {
        components: {
            CheckIcon,
            VueCode,
            VueXieyi,
            XHeader,
             VueShareit 
        },
        data() {
            return {
                ipone: '',
                code:'',
            }
        },
        mounted() {
            var _this = this;
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
            form() {
                var _this = this;
                _this.$http.post(_this.$store.state.url + '/Homecenter/perfectPhone', {
                    'load': false,
                    phone:_this.ipone,
                    phoneCode:_this.code,
                }).then((res) => {
                    if(!res) return;
                    _this.$http.post(_this.$store.state.url + '/Common/login').then((res) => {
                    	_this.$store.commit('user', res);
                    })
                    msg('绑定成功');
//                  _this.$router.push( window.sessionStorage.url || '/');
                           history.go(-1);
                    
                })
            },
        }
    }
</script>

<style scoped>
    .head img {
        width: 25px;
    }
    
    .head {
        padding: 10px;
    }
    
    .txt {
        font-size: 20px;
        color: #35495e;
        margin-top: 20px;
        margin-left: 15px;
        margin-bottom: 30px;
    }
    
    .input .li {
        line-height: 25px;
        border-bottom: 1px solid #d6dad9;
        padding-bottom: 5px;
        width: 350px;
        margin: 0 auto;
        margin-top: 15px;
        position: relative;
    }
    
    .input .li img {
        width: 30px;
        display: inline;
        vertical-align: middle;
        margin-right: 20px;
    }
    
    .input .li input {
        font-size: 15px;
        background: none;
    }
    
    .input .li .codeButton {
        position: absolute;
        right: 0;
        top: 0;
        width: 110px;
        text-align: center;
        border-left: 2px solid #e6e6e6;
        padding-right: 10px;
        color: #35495e;
    }
    
    .login {
        width: 300px;
        background: linear-gradient(to right, #5c7fa2, #35495e);
        text-align: center;
        font-size: 18px;
        color: #fff;
        margin: 0 auto;
        margin-top: 40px;
        line-height: 40px;
        border-radius: 100px;
    }
    
    .register {
        text-align: center;
        margin-top: 30px;
    }
    
    .register .color {
        color: #35495e;
    }
    .alert{
    	display: inline-block;
	    line-height: 22px;
	    color: #222;
	    vertical-align: middle;
	    color: #35495e;
	}
</style>