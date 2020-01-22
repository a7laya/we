<template>
    <div v-transfer-dom>
        <x-dialog v-model="isShow" class="dialog-backnone" hide-on-blur>
            <div class="redlist">
                <div class="overflow">
                    <div class="redcenters width640 ovredlist">
                        <div class="hiders">
                            <div class="HeadTop">
                                <x-icon class="cose" type="ios-close" size="30" @click="isShow = false"></x-icon>
                            </div>
                            <!--红包信息-->
                            <div class="RedPack_Info">
                                <div class="packimgs">
                                    <img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl">
                                </div>
                                <p class="FromWho text_flow" style="font-size: 16px;">{{item.nickname}}的红包</p>
                                <p class="qm text_flow" style="font-size: 12px;">{{item.blessing}}</p>
                                <p class="qm text_flow rednull"></p>
                            </div>
                        </div>
                        <ul class="alllist">
                            <h5>{{item.num}}个现金红包,共{{item.money/100}}元</h5>
                            <li v-if="list.length" v-for="(item,index) in list" >
                                <img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl">
                                <div>
                                    <p>{{item.mem_nickname}}</p>
                                    <p>{{item.rang_receivetime | returntime4}}</p>
                                </div>
                                <span>{{item.rand_money/100}}元</span>
                            </li>
                            <load-more v-else :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more>
                        </ul>
                    </div>
                </div>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import { TransferDom, XDialog,LoadMore } from 'vux'
    import VueRedlist from './redlist'
    export default {
        directives: {
            TransferDom,
        },
        components: {
            XDialog,
            VueRedlist,
            LoadMore 
        },
        props: {
            value: undefined,
            reddata: undefined,
        },
        data() {
            return {
                isShow: false,
                list: undefined,
            }
        },
        computed: {
            item() {
                return this.reddata || {}
            }
        },
        watch: {
            isShow(val) {
                this.$emit('input', val)
            },
            value: {
                handler: function(val) {
                	if(!(this.isShow == val)){
                		this.ajax();
                	}
                    this.isShow = val
                },
                immediate: true
            }
        },
        mounted() {

        },
        methods: {
        	ajax(){
            var _this = this;
            _this.$http.post(_this.$store.state.url + '/Live/robTooRed', {
                load: false,
                id: _this.item.redid
            }).then(function(res) {
                if(!res) return;
                _this.list = res;
            })
            }
        }
    }
</script>

<style scoped>
    .redlist .ovredlist {
        max-height: 450px;
        overflow: scroll;
        overflow-x: hidden;
        background: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    
    .hiders {
        height: 180px;
        position: relative;
    }
    
    .HeadTop {
        background-color: #dd594d;
        height: 125px;
        width: 100%;
        border-radius: 8px 8px 46% 46%;
        box-shadow: 0 1px 7px #636363;
        position: relative;
    }
    
    .cose {
        float: right;
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
    
    .text_flow {
        overflow: hidden!important;
        overflow-x: hidden;
        overflow-y: hidden;
        word-wrap: normal!important;
        white-space: nowrap!important;
        text-overflow: ellipsis!important;
        text-align: center;
        color: #636363;
    }
    
    .redlist .alllist {
        margin-top: 5em;
    }
    
    .redlist .alllist h5 {
        height: 45px;
        border: 1px solid #CCC;
        line-height: 45px;
        padding-left: 10px;
        border-style: solid none solid none;
        background-color: rgb(250, 246, 241);
        text-align: left;
    }
    
    .redlist .alllist li {
        display: block;
        border-bottom: 1px solid #ccc;
        padding: 8px 6px;
        clear: both;
        text-align: left;
    }
    
    .redlist .alllist li::after {
        content: '';
        display: block;
        clear: both;
    }
    
    .redlist .alllist li img {
        border-radius: 50%;
        border: 1px solid #fff;
        float: left;
        width: 40px;
        height: 40px;
    }
    
    .redlist .alllist li div {
        float: left;
        margin: 2px 0 0 20px;
        width: 40%;
    }
    
    .redlist .alllist li div p:first-child {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .redlist .alllist li span {
        float: right;
        line-height: 41px;
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
</style>