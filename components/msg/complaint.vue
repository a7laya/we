<template>
    <div class="hezuo hefk">
        <x-header :title="'投诉与反馈'" :left-options="{backText:''}" class="header step"></x-header>
        <div class="biaodin1">
            <div class="ban_title">
                <strong>*</strong>
                <span>请在此输入参与合作的意向</span>
            </div>
            <x-textarea v-model="form.Explain" :placeholder="'请详细描述你当前遇到的问题，写明投诉理由，描述不清楚可能影 响到处理进度'" :rows="5"></x-textarea>
        </div>
        <div class="biaodin1">
        	<div class="ban_title">
                <strong>*</strong>
                <span>请提供相关截图</span>
            </div>
            <div class="txt_fuzhu">
            	请提交能够充分反映当前问题的截图，截图不充分可能会导致问题 无法判断，影响处理效率
            </div>
            <div class="input_img">
                <div class="thsis_maes" v-for="(item , index) in form.imgurl" :key="index">
                    <x-icon type="ios-close" size="20" class="iconcl" @click="removeimg(index)"></x-icon>
                    <img class="biao_back_img isfilezip" :src="$store.state.website.website_domain_name + '/uploads/' + item" />
                </div>
                <vue-file-img @data="fileimg">
                    <img class="biao_back_img" src="/static/img/icon1.png" />
                </vue-file-img>
            </div>
            <div class="button_max" @click="upform">提交</div>
            <div class="txt_fuzhu" style="text-align: center;">平台承诺会保障个人信息安全</div>
        </div>
        <div v-transfer-dom>
            <alert class="biaodin6" v-model="isshow" button-text="我知道了" @on-hide="goback">
            	<div class="uphezuo">
            		<img src="/static/img/icon19.png"/>
            		<div class="txt1">提交成功</div>
            		<div class="txt2">提交成功 我们会认真核实问题，感谢您的反馈</div>
            	</div>
            </alert>
        </div>
    </div>
</template>

<script>
    import { XHeader, XTextarea, Group, XInput, CheckIcon,Alert,TransferDom} from 'vux'
    import { VueStep, VueFileImg } from '../component'
    export default {
    	directives: {
		   TransferDom
		},
        data() {
            return {
            	isshow:false,
                form: {
                    imgurl: [], //图片地址
                    Explain: null, //说明
                },
            }
        },
        components: {
            Group,
            VueStep,
            VueFileImg,
            XHeader,
            XTextarea,
            XInput,
            CheckIcon,
            Alert
        },
        methods: {
            fileimg(res) {
                this.form.imgurl.push(res.imgurl);
            },
            removeimg(index) {
                this.form.imgurl.splice(index, 1);
            },
            upform() {
                var _this = this;
                //验证
                let obj = {
                    imgurl: '图片',
                    Explain: '说明', //说明
                }
                if(!isNull(obj, _this.form)) return;
                _this.$http.post(_this.$store.state.url + '/Cooperation/coop_tousu', {
                    'load': false,
                    ..._this.form,
                    id:_this.$route.query.pid,
                    passive_id: _this.$route.params.tid,
                }).then((res) => {
                    if(!res) return;
                    this.isshow = true;
                })
            },
            goback(){
            	this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .hezuo {
        background: #fff;
        min-height: -webkit-fill-available;
    }
    
    .biaodin1 .vux-x-textarea::before {
        display: none;
    }
    
    .hezuo .ban_title {
        font-size: 15px;
        font-weight: 800;
        padding: 10px 15px;
        background: #f2f2f2;
    }
    
    .hezuo .ban_title>span.min {
        font-size: 12px;
        color: #B2B2B2;
    }
    
    .hezuo .ban_title>strong {
        color: red;
    }
    
    .biaodin1 .vux-x-textarea {
        padding: 5px 12px;
    }
    
    .biaodin1 .biao_back_img {
        display: inline-block;
        width: 70px;
        margin-left: 10px;
    }
    
    .biaodin1 .input_img .ban_title {
        font-size: 12px;
        vertical-align: super;
        margin-left: 10px;
    }
    
    .biaodin1 .input_img .ban_title>span {
        color: #B2B2B2;
    }
    
    .biaodin1 .thsis_maes {
        position: relative;
        margin-right: 20px;
        display: inline-block;
        vertical-align: middle;
    }
    
    .biaodin1 .thsis_maes .iconcl {
        fill: #007DDB;
        position: absolute;
        right: -10px;
        top: -10px;
    }
    
    .biaodin1 .txt_fuzhu{
    	padding: 5px 15px;
    	color: #757575;
    }
    .hefk .button_max{
    	line-height: 35px;
    	font-size: 14px;
    	background: #277be5;
    }
    .hefk .input_img{
    	margin-top: 20px;
    	margin-bottom: 40px;
    }
</style>