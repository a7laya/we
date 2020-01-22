<template>
    <div class="main_box">
        <div class="head" @click="$router.go(-1)"><img src="/static/img/icon89.png" /></div>
        <div class="txt">您好，请登录！</div>
        <div class="input">
            <div class="li">
                <img src="/static/img/icon35.png" />
                <input type="number" placeholder="请输入手机号" v-model="ipone" maxlength="11"/>
            </div>
            <div class="li">
                <img src="/static/img/icon40.png" />
                <input type="password" placeholder="请输入密码" v-model="password" maxlength="16"/>
            </div>
            <div class="li cl" style="border: none;">
                <span class="fl login_remember">
                	<check-icon :value.sync="remember">记住密码</check-icon>
                </span>
                <router-link to="/login/usersetupfpassword" tag="span" class="fr">忘记密码？</router-link>
            </div>
        </div>
        <div class="login" @click="form()">登录</div>
        <div class="register">还没有账号？去<router-link to="/login/register" tag="span" class="color">注册</router-link></div>
    </div>
</template>

<script>
    import { CheckIcon } from 'vux'
    export default {
        components: {
            CheckIcon
        },
        data() {
            return {
                ipone: window.localStorage.ipone || '',
                remember: true,
                password: window.localStorage.password || ''
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
            form() { //登录
                var _this = this;
                _this.$http.post(_this.$store.state.url + '/login/login', {
                    'load': false,
                    phone:_this.ipone,
                    password:_this.password
                }).then((res) => {
                    if(!res) return;
                    if(_this.remember){ //记住密码
                    	window.localStorage.ipone = _this.ipone;
                    	window.localStorage.password = _this.password;
                    }else{
                    	window.localStorage.ipone = '';
                    	window.localStorage.password = '';
                    }

                    window.localStorage.money = res.money;
                    _this.$store.commit('user', res)
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
        margin-top: 35px;
        margin-left: 15px;
        margin-bottom: 70px;
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
        margin-top: 30px;
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
</style>
