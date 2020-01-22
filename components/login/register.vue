<template>
    <div class="main_box">
        <div class="head" @click="$router.go(-1)"><img src="/static/img/icon89.png" /></div>
        <div class="txt">您好，欢迎注册！</div>
        <div class="input">
            <div class="li">
                <img src="/static/img/icon35.png" />
                <input type="number" placeholder="请输入手机号" v-model="ipone" maxlength="11"/>
            </div>
            <div class="li">
                <img src="/static/img/icon23.png" />
                <input type="password" placeholder="请输入密码" v-model="password" maxlength="16"/>
            </div>
            <div class="li">
                <img src="/static/img/icon24.png" />
                <input type="password" placeholder="确认密码" v-model="fpassword" maxlength="16"/>
            </div>
            <div class="li">
                <img src="/static/img/icon40.png" />
                <input type="number" placeholder="请输入验证码" v-model="code" />
				<div class="codeButton"><vue-code :ipone="ipone"></vue-code></div>
            </div>
            <div class="li cl" style="border: none;">
                <span class="fl login_remember">
                	<check-icon :value.sync="remember">我已认真阅读并同意</check-icon>
                	<vue-xieyi :type="1" :title="'智汇优库服务协议'" class="alert"><span>《智汇优库服务协议》</span></vue-xieyi>
                </span>
            </div>
        </div>
        <div class="login" @click="form()">免费注册</div>
        <div class="register">已有账号？去<router-link to="/login/login" tag="span" class="color">登录</router-link></div>
    </div>
</template>

<script>
    import { CheckIcon } from 'vux'
    import { VueCode,VueXieyi } from '../component'
    export default {
        components: {
            CheckIcon,
            VueCode,
            VueXieyi
        },
        data() {
            return {
                ipone: '',
                password: '',
                fpassword:'',
                code:'',
                remember: true,
            }
        },
        computed:{
        	user(){
        		return this.$store.state.user;
        	}
        },
        watch:{
        	user(){
        		if(this.user){
        			this.$router.push( window.sessionStorage.url || '/')
        		}
        	}
        },
        mounted() {
            var _this = this;
        },
        methods: {
            form() { //注册
                var _this = this;
                var query = this.$route.query; //获取地址栏参数
                if(!_this.ipone){
                	msg("手机号不能为空");
                	return;
                }
                if(!_this.password){
                	msg("新密码不能为空");
                	return;
                }
                let reg =/^(?=.*\d)(?=.*[A-Za-z])[\x20-\x7e]{8,16}$/
                if(!reg.test(_this.password)) {
					msg("密码必须是8-16位数字、字符组合（不能是纯数字或字符）");
					return;
				}
                 if(!_this.fpassword){
                	msg("确认密码不能为空");
                	return;
                }
                if(!reg.test(_this.fpassword)) {
					msg("确认密码必须是8-16位数字、字符组合（不能是纯数字或字符）");
					return;
				}
                if(_this.password!=_this.fpassword){
                	msg("两次密码输入不一致");
                	return;
                }
                if(!_this.code){
                	msg("验证码不能为空");
                	return;
                }
                _this.$http.post(_this.$store.state.url + '/login/register', {
                    'load': false,
                    phone:_this.ipone,
                    password:_this.password,
                    passwords:_this.fpassword,
                    yzm:_this.code,
                    xieyi:_this.remember ? '1' : '0',
                    ...query
                }).then((res) => {
                    if(!res) return;
                     _this.$store.commit('user', res);
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
        width: 312px;
        background: linear-gradient(to right, #5c7fa2, #35495e);
        text-align: center;
        font-size: 21px;
        color: #fff;
        margin: 0 auto;
        margin-top: 10px;
        line-height: 45px;
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