<template>
    <!--
    	作者：1209559047@qq.com
    	时间：2019-03-19
    	描述：评价弹窗暂定合作
    -->
    <x-dialog v-model="show" class="dialog-pingjia" :dialog-style="{width:'9.226667rem',maxWidth:'9.226667rem'}">
        <div class="ping_img">
            <img src="/static/img/icon67.png" />
        </div>
        <div class="ping_user">
            <div class="ping_user_headimg"><img :src=" $store.state.website.website_domain_name + '/uploads/' + item.headimgurl" /></div>
            <div class="ping_user_xinxi">
                <div class="name">{{item.nickname}}</div>
                <div class="xing">
                    <vue-pingfen :num="item.score1"></vue-pingfen>
                </div>
                <div class="gongs">{{item.company}}</div>
            </div>
            <div class="ping_user_button" @click="chatto(item)">再次聊聊</div>
        </div>
        <div class="ping_xiangm">
            <div class="ping_xiangm_title">{{item.title}}</div>
            <div class="ping_xiangm_hangye">行业:{{item.hangye}}</div>
            <div class="ping_xiangm_time">合作时间：{{item.hezuoTime | returntime1}}</div>
            <div class="ping_xiangm_a">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
            </div>
        </div>
        <div class="ping_tishi">请为本次合作做出评价</div>
        <div class="ping_dianj_xing">
            <vue-pingfen :num="5" :disabled="true" v-model="pingxing"></vue-pingfen>
            <div class="ping_dianj_zhushi">
                <span v-show="pingxing==1">非常差</span>
                <span v-show="pingxing==2">差</span>
                <span v-show="pingxing==3">一般</span>
                <span v-show="pingxing==4">好</span>
                <span v-show="pingxing==5">非常好</span>
            </div>
        </div>
        <div class="ping_form">
            <div class="button_max" @click="form(item)">提交</div>
            <div class="button_back" @click="show=false">下次再说</div>
        </div>
    </x-dialog>
</template>

<script>
    import { XDialog } from 'vux'
    import VuePingfen from '../pingfen'
    export default {
        created() {
            if(typeof this.value !== 'undefined') {
                this.show = this.value
            }
        },
        props: {
            value: Boolean,
        },
        components: {
            XDialog,
            VuePingfen
        },
        data() {
            return {
                ipone: '',
                code: '',
                pingxing: 5, //评价默认5星
                show: false,
            }
        },
        computed: {
            item() {
                return this.$store.state.comment.data;
            },
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
            value(val) {
                this.show = val;
                console.log(this.show);
            },
            show(val) {
                this.$emit('input', val)
            }
        },
        methods: {
            form(item) {
                var _this = this;
                _this.$http.post(_this.$store.state.url + '/Comment/Comment', {
                    score1: _this.pingxing,
                    type:1,
                    projectid:item.project_id,
                    covermemid:item.covermemid,
                }).then((res) => {
                    if(!res) return;
                    this.show = false;
                    msg('评价成功');
                })
            },
            chatto(item){ //跟他谈谈
            	var _this = this;
            	this.show = false;
                _this.$router.push({ path: `/msg/tcw/${item.covermemid}?isphonetrue=1&type=1&coop=${item.project_id}` })
            }
        }
    }
</script>

<style scoped>
    .dialog-pingjia .ping_img {
        padding-top: 7px;
    }
    
    .ping_user>div {
        display: inline-block;
    }
    
    .ping_user {
        padding: 20px 0;
    }
    
    .ping_user_headimg {
        width: 57px;
        height: 57px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: middle;
    }
    
    .ping_user_xinxi {
        text-align: left;
        width: 170px;
        margin-left: 10px;
        vertical-align: middle;
    }
    
    .ping_user_xinxi .name {
        font-size: 14px;
    }
    
    .ping_user_xinxi .gongs {
        font-size: 12px;
        color: #666;
    }
    
    .ping_user_button {
        width: 77px;
        line-height: 21px;
        height: 21px;
        font-size: 12px;
        color: #1e79ea;
        border: 1px solid #1e79ea;
        vertical-align: middle;
    }
    
    .ping_xiangm {
        text-align: left;
        position: relative;
        padding: 12px 20px;
        background: #fafafa;
    }
    
    .ping_xiangm .ping_xiangm_title {
        font-size: 14px;
    }
    
    .ping_xiangm .ping_xiangm_hangye {
        font-size: 12px;
        color: #666;
    }
    
    .ping_xiangm .ping_xiangm_time {
        font-size: 10px;
        color: #999;
    }
    
    .ping_xiangm .ping_xiangm_a {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    
    .ping_xiangm .ping_xiangm_a .vux-x-icon {
        fill: #999;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .ping_tishi {
        font-size: 12px;
        color: #666;
        margin-top: 32px;
        margin-bottom: 12px;
    }
    
    .ping_dianj_xing {
        margin-bottom: 25px;
    }
    
    .ping_dianj_zhushi {
        font-size: 10px;
        color: #f9b845;
    }
    
    .ping_form .button_max {
        background: #1e79ea;
        font-size: 14px;
        border-radius: 2px;
        height: 35px;
        line-height: 35px;
        width: 244px;
    }
    
    .ping_form .button_back {
        font-size: 12px;
        color: #999;
        line-height: 40px;
    }
</style>