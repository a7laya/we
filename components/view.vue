<template>
    <div style="position: relative;z-index: 1;">
        <transition name="slide-fade">
            <router-view v-if="$route.meta.keepAlive"></router-view>
            <router-view v-else></router-view>
        </transition>
        <!--
        	作者：1209559047@qq.com
        	时间：2019-02-13
        	描述：绑定手机号
        -->
        <x-dialog v-model="$store.state.bingPhone" class="com_bing_phone" :hide-on-blur="true">
            <div class="input">
                <div class="title">成为正式会员继续下一步
                    <span @click="$store.state.bingPhone=false">
            			<icon type="cancel" ></icon>
            		</span>
                </div>
                <div class="li">
                    <img src="/static/img/icon35.png" />
                    <input type="number" placeholder="请输入手机号" v-model="ipone" />
                </div>
                <div class="li">
                    <img src="/static/img/icon40.png" />
                    <input type="number" placeholder="请输入验证码" v-model="code" />
                    <div class="codeButton">
                        <vue-code :ipone="ipone"></vue-code>
                    </div>
                </div>
            </div>
            <div class="txt">手机号即您的会员编号，方便日后在浏览器登录。</div>
            <div class="login" @click="form">确定</div>
        </x-dialog>
        <!--
        	作者：1209559047@qq.com
        	时间：2019-03-19
        	描述：提示完善个人信息
        -->
        <confirm  class="biaodin6" v-model="$store.state.upuser" confirm-text="去完善" cancel-text="暂不" @on-confirm="linkgo('/user/updata')" @on-cancel="onCancel()">
        	<div class="uphezuo">
        		<img src="/static/img/icon68.png"/>
        		<div class="txt1">你的个人资料还没有完善</div>
        		<div class="txt2">详细的资料有助于业内人士了解你</div>
        	</div>
        </confirm>
        <!--
        	作者：1209559047@qq.com
        	时间：2019-03-02
        	描述：分享
        -->
        <!--<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>-->
        <!--
        	作者：1209559047@qq.com
        	时间：2019-03-02
        	描述：中间弹出加载中
        -->
        <div v-transfer-dom style="position: relative;z-index: 9999999;">
            <loading :show="loading" :loading="false"></loading>
        </div>
        <!--
        	作者：1209559047@qq.com
        	时间：2019-03-08
        	描述：关注公众号弹窗
        -->
        <template v-if="$store.state.user">
            <x-dialog v-model="$store.state.erweima" class="dialog-ewm">
                <img src="/static/img/zhyookerweim.png" />
                <img @click="$store.commit('removeerweima')" class="vux-x-icon" src="/static/img/icon/icon-close.png" />
            </x-dialog>
        </template>
        <!--
        	作者：1209559047@qq.com
        	时间：2019-03-19
        	描述：评价弹窗暂定合作使用
        -->
        <div v-transfer-dom>
            <vue-pingjia1 v-model="$store.state.comment.show"></vue-pingjia1>
        </div>
        
    </div>
</template>
<script>
    import { XDialog, Icon, Loading, TransferDom,Confirm } from 'vux'
    import { VuePullup, VueCode, VueShareit, VuePingjia1} from './component'
    export default {
        directives: {
            TransferDom
        },
        components: {
            VuePullup,
            XDialog,
            VueCode,
            Icon,
            VueShareit,
            Loading,
            VuePingjia1,
            Confirm
        },
        data() {
            return {
                ipone: '',
                code: '',
                pingxing: 5, //评价默认5星
            }
        },
        computed: {
            loading() {
                return this.$store.state.loading
            },
//          fenxiang() {
//              return {
//                  title: '智汇优库',
//                  dese: '弱电智能化互助互动平台',
//                  imgUrl: this.$store.state.website.website_domain_name + '/uploads/logo.png',
//                  link: ''
//              }
//          }
        },
        mounted(){
        	
        },
        methods: {
            onRefresh() {
                //				alert(0);
            },
            onInfinite() {
                //				alert(1);
            },
            linkgo(url){
            	this.$router.push({ path: url })
            },
            onCancel(){
            	var _this=this;
            	_this.$router.go(-1);
            },
            form() {
                var _this = this;
                _this.$http.post(_this.$store.state.url + '/Homecenter/perfectPhone', {
                    'load': false,
                    phone: _this.ipone,
                    phoneCode: _this.code,
                }).then((res) => {
                    if(!res) return;
                    _this.$store.dispatch('getUser');
                    msg('绑定成功');
                    $store.state.bingPhone = false;
                    history.go(-1);
                })
            }
        }
    }
</script>
<style>
    .com_bing_phone .input>.li {
        width: 90%;
        line-height: 25px;
        border-bottom: 1px solid #d6dad9;
        padding-bottom: 5px;
        margin: 0 auto;
        margin-top: 15px;
        position: relative;
    }
    
    .com_bing_phone .input .li>img {
        width: 30px;
        display: inline;
        vertical-align: middle;
        margin-right: 15px;
    }
    
    .com_bing_phone .input .li>input {
        font-size: 15px;
        background: none;
        width: 200px;
    }
    
    .com_bing_phone .input .li .codeButton {
        position: absolute;
        right: 0;
        top: 0;
        width: 80px;
        text-align: center;
        border-left: 2px solid #e6e6e6;
        color: #35495e;
    }
    
    .com_bing_phone .weui-dialog {}
    
    .com_bing_phone .txt {
        width: 90%;
        margin: 0 auto;
        font-size: 12px;
        margin-top: 3px;
    }
    
    .com_bing_phone .login {
        padding: 10px;
        font-size: 16px;
        color: #fff;
        background: #35495e;
        text-align: center;
        margin: 0 auto;
        position: absolute;
        position: relative;
        bottom: -3px;
    }
    
    .com_bing_phone .title {
        font-size: 14px;
        border-bottom: 1px solid #d6dad9;
        padding: 10px 0;
    }
    
    .com_bing_phone .weui-icon {
        position: absolute;
        top: 5px;
        right: 0;
        color: inherit;
    }
    
    .dialog-ewm .weui-dialog {
        background: none;
    }
    
    .dialog-ewm .vux-x-icon {
        width: 30px;
        margin: 0 auto;
        margin-top: 25px;
    }
    
    .weui-mask {
        background: rgba(0, 0, 0, 0.4) !important
    }
    
    .step.vux-header {
        background: none;
    }
    
    .step.vux-header .vux-header-left .left-arrow:before {
        border-color: #666;
        width: 10px;
        height: 10px;
    }
    
    .wofr.vux-header .vux-header-left .left-arrow:before{
    	border-color: #fff;
    }
    
    .baoming .vux-no-group-title{
    	background-color: #25C286;
    }
    
    .baoming .weui-cells:before{
    	display: none;
    }

    
    .step.vux-header .vux-header-title {
        color: #333;
        font-size: 17px;
        font-weight: 800;
    }
    
    .step.vux-header .vux-header-right {
        color: #236BEF;
        font-size: 15px;
        /*font-weight: 800;*/
    }
    
    .step.vux-header .vux-header-right div.on {
        color: #585858;
    }
    
    .hezuo .biaodin1 .weui-textarea-counter {
        position: absolute;
        right: 15px;
        bottom: -40px;
    }
    
    .biaodin3 .weui-cells::before {
        display: none;
    }
    
    .biaodin3 .right-full-height .txt {
        font-size: 12px;
        color: #3790f5;
        line-height: 45px;
    }
    
    .biaodin3 .labelclass2 .vux-cell-box::before {
        display: none;
    }
    
    .biaodin3 .labelclass2 .weui-cell_access {
        padding: 0;
        min-height: 20px;
    }
    
    .biaodin3 .labelclass2 .weui-cell__ft::after {
        display: none;
    }
    
    .biaodin3 .labelclass2 .vux-popup-picker-value {
        font-size: inherit;
        color: inherit;
    }
    
    .biaodin3 .labelclass2 .vux-popup-picker-select {
        text-align: left !important;
    }
    
    .biaodin3 .labelclass2 .vux-datetime::before {
        display: none;
    }
    
    .biaodin3 .labelclass2 .vux-datetime-value {
        text-align: left;
    }
    
    .biaodin3 .labelclass2 .vux-datetime-value .vux-cell-value {
        color: #282828;
    }
    
    .biaodin4 .login_remember i.weui-icon::before {
        color: #3790f5 !important;
    }
    
    .biaodin5 .b5_list_img_box .weui-dialog {
        display: block;
        width: 100%;
        max-width: 100%;
        background: none;
    }
    
    .biaodin5 .bottom_imglist .vux-slider>.vux-swiper,
    .biaodin5 .bottom_imglist .vux-slider {
        overflow: inherit;
    }
    
    .biaodin5 .bottom_imglist .swiper-demo-img .imgbox .pos {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    
    .biaodin6 .weui-dialog__btn.weui-dialog__btn_primary {
        color: #1b75e2;
        font-size: 14px;
    }
    
    .biaodin6 .weui-dialog__btn.weui-dialog__btn_default {
        color: #666;
        font-size: 14px;
    }
    
    .biaodin6 .uphezuo>img {
        width: 225px;
    }
    
    .biaodin6 .uphezuo .txt1 {
        font-size: 15px;
        color: #333;
        margin-top: 30px;
        font-weight: 800;
    }
    
    .biaodin6 .uphezuo .txt2 {
        margin-top: 15px;
        font-size: 12px;
        color: #666;
        margin-bottom: 30px;
    }
    
    .dialog-pingjia .ping_user_xinxi .pingfen .iconfont,
    .dialog-pingjia .ping_dianj_xing .pingfen .iconfont {
        margin-right: 5px;
        font-size: 14px;
    }
    .pingluntanchukuang .weui-dialog{
    	width: 100%;
    	max-width: 100%;
    	bottom: 0;
    	top: auto;
    	border-radius: 0;
    	background: none;
    	text-align: left;
    }
    .pingluntanchukuang textarea{
    	font-size: 14px;
    	background: #f6f6f6;
    }
    .pingluntanchukuang .weui-textarea-counter{
    	font-size: 14px;
    }
    .pingluntanchukuang .weui-cell__bd{
    	padding: 10px;
    	background: #f6f6f6;
    }
    .hezuo_msg.huodong span{
    	display: inline;
    	padding: 0;
    }
    .huodong .biaodin4 .login_remember i.weui-icon::before{
    	color: #09CED6 !important;
    }
    .huodong .biaodin3 .right-full-height .txt{
    	color: #09CED6;
    }
</style>