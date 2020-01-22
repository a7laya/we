<template>
	
    <div v-transfer-dom>
        <x-dialog v-model="isShow" class="dialog-backnone" hide-on-blur>
            <div class="redopen">
                <div class="redcenters width640 ovredlist">
                    <div class="hiders">
                        <div class="open-red"></div>
                        <div class="HeadTop"></div>
                        <x-icon class="cose" type="ios-close" size="30" @click="isShow = false"></x-icon>
                        <!--红包信息-->
                        <div class="RedPack_Info">
                            <div class="packimgs">
                                <img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl">
                            </div>
                            <p class="qm text_flow">{{item.nickname}}</p>
                            <p class="qm text_flow" v-if="!item.status">发了一个红包，金额随机</p>
                            <p class="FromWho text_flow" v-if="item.status==2">手慢了,红包派完了</p>
                            <p class="FromWho text_flow" v-if="item.status==1" style="font-size: 16px;">{{item.robmoney/100}}元已经存入您的直播红包账户</p>
                        </div>
                        <div class="openkai" :class="{animation:opening}" v-if="!item.status">
                            <div class="openkais" @click="onopenred()">開</div>
                        </div>
                    </div>
                    <p class="text_flow mar10" @click="onopenlist()">查看大家的手气></p>
                </div>
            </div>
        </x-dialog>
        <vue-redlist v-model="show" :reddata="item"></vue-redlist>
    </div>
    
</template>

<script>
    import { TransferDom, XDialog } from 'vux'
    import VueRedlist from './redlist'
    export default {
        directives: {
            TransferDom,
        },
        components: {
            XDialog,
            VueRedlist
        },
        props: {
            value: undefined,
            item: undefined,
        },
        data() {
            return {
                isShow: false,
                show: false,
                opening:false,
            }
        },
        watch: {
            isShow(val) {
                this.$emit('input', val);
            },
            value: {
                handler: function(val) {
                    this.isShow = val
                },
                immediate: true
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
        	onopenred(){
        		var _this = this;
        		if(isWeiXin()==1 && !_this.user.mem_phone){
                	_this.$store.state.bingPhone = true;
                	return;
                }
        		_this.$http.post(_this.$store.state.url + '/Live/robMoney', {
	                load: false,
	                id: _this.item.redid,
	            }).then(function(res) {
	                if(!res) return;
	                _this.opening = !_this.opening;
	                var data = $.extend({},_this.item,res);
	                if(res.status == 1 || res.status ==2){
	                	_this.$store.commit('modifyLiveRed', data);
	                }
	            })
        	},
            onopenlist() {
                this.show = !this.show;
                this.isShow = !this.isShow;
            },
        }
    }
</script>

<style scoped>
    .animation {
    	position: absolute;
        animation: myfirst 2s infinite linear;
    }
    
    @keyframes myfirst {
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(360deg);
        }
    }
    
    .redopen .redcenters {
        width: 100%;
        margin: 0 auto;
        background-color: #d84e43;
        height: auto;
        border-radius: 8px;
        padding-bottom: 20px;
        height: 420px;
    }
    
    .redopen .open-red {
        height: 150px;
        border-radius: 8px 8px 0 0px;
        background: #E05449;
    }
    
    .redopen .redcenters .HeadTop {
        box-shadow: none;
        background-color: #E05449;
        height: 195px;
        width: 100%;
        border-radius: 8px 8px 46% 46%;
        position: relative;
    }
    
    .redopen .redcenters .hiders .cose {
        position: absolute;
        top: 0px;
        right: 0px;
        margin: 6px 6px;
        color: rgba(0, 0, 0, 0.59);
        cursor: pointer;
        font-size: 25px;
        opacity: 0.3;
    }
    
    .RedPack_Info {
        height: auto;
        width: 200px;
        position: absolute;
        top: 82px;
        left: 50%;
        margin-left: -100px;
    }
    
    .RedPack_Info .packimgs {
        height: 78px;
        width: 100%;
        position: relative;
    }
    
    .packimgs img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 8px;
        margin-left: -30px;
    }
    
    .redcenters .text_flow {
        color: #ddbc84;
        margin: 6px 0px;
        text-align: center;
        font-size: 14px;
    }
    
    .redcenters .RedPack_Info .text_flow:last-child {
        color: #ddbc84;
        font-size: 18px;
    }
    
    .redcenters .mar10 {
        margin-top: 50px;
        font-size: 14px;
    }
    
    .redcenters .openkai {
        background-color: #DDBC84;
        width: 65px;
        height: 65px;
        border-radius: 50%;
        text-align: center;
        line-height: 65px;
        margin: -33px auto;
        padding: 3px;
        position: relative;
        cursor: pointer;
    }
    
    .redcenters .openkai .openkais {
        background-color: #DDBC84;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #d2b27d;
        text-align: center;
        line-height: 61px;
        font-size: 26px;
    }
</style>