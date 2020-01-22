<template>
    <div class="main_box">
    	<x-header :title="'修改账号'" :left-options="{backText:''}"><span @click="form" slot="right" class="button">保存</span></x-header>
    	<div class="txt" style="font-size: 16px;">
    		更换手机号后，下次登录可使用新手机号登录。当前手机号为：{{user.mem_phone}}
    	</div>
        <div class="input">
            <div class="li">
                <img src="/static/img/icon35.png" />
                <input type="number" placeholder="请输入新手机号" v-model="ipone" />
            </div>
            <div class="li">
                <img src="/static/img/icon40.png" />
                <input type="number" placeholder="请输入验证码" v-model="code" />
				<div class="codeButton"><vue-code :ipone="ipone" :type="1"></vue-code></div>
            </div>
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
                _this.$http.post(_this.$store.state.url + '/Homecenter/upPhone', {
                    'load': false,
                    phone:_this.ipone,
                    yzm:_this.code,
                }).then((res) => {
                    if(!res) return;
                    _this.$store.state.user = undefined;
                    _this.$store.state.token = undefined;
                    _this.$router.push({ path: '/login' });
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