<template>
    <div class="main_box">
    	<x-header :title="'忘记密码'" :left-options="{backText:''}"><span @click="form" slot="right" class="button">保存</span></x-header>
        <div class="input">
            <div class="li">
                <img src="/static/img/icon35.png" />
                <input type="number" placeholder="请输入手机号" v-model="ipone" />
            </div>
            <div class="li">
                <img src="/static/img/icon23.png" />
                <input type="password" placeholder="请输入新密码" v-model="password" maxlength="16"/>
            </div>
            <div class="li">
                <img src="/static/img/icon24.png" />
                <input type="password" placeholder="确认新密码" v-model="fpassword" maxlength="16"/>
            </div>
            <div class="li">
                <img src="/static/img/icon40.png" />
                <input type="number" placeholder="请输入验证码" v-model="code" />
				<div class="codeButton"><vue-code :ipone="ipone"></vue-code></div>
            </div>
        </div>
        <div class="txt" style="font-size: 13px;">
        	密码必须是8-16位数字、字符组合（不能是纯数字或字符）
        </div>
    </div>
</template>

<script>
    import { CheckIcon,XHeader} from 'vux'
    import { VueCode,VueXieyi } from '../../component'
    export default {
        components: {
            CheckIcon,
            VueCode,
            VueXieyi,
            XHeader
        },
        data() {
            return {
                ipone: '',
                password: '',
                fpassword:'',
                code:'',
            }
        },
        computed:{
        	user(){
        		return this.$store.state.user;
        	}
        },
        mounted() {
            var _this = this;
        },
        methods: {
            form() {
                var _this = this;
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
                _this.$http.post(_this.$store.state.url + '/index/resetPass', {
                    'load': false,
                    phone:_this.ipone,
                    phonecode:_this.code,
                    newpass:_this.password,
                    repass:_this.fpassword
                }).then((res) => {
                    if(!res) return;
                    msg('修改成功，请重新登录');
                    _this.$store.state.user = undefined;
                    _this.$store.state.token = undefined;
                    _this.$router.replace({ path: '/login' });
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
        width: 200px;
        background: linear-gradient(to right, #5c7fa2, #35495e);
        text-align: center;
        font-size: 18px;
        color: #fff;
        margin: 0 auto;
        margin-top: 10px;
        line-height: 35px;
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