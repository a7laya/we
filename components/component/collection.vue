<template>
    <span class="span zujianicon-shoucang">
		<img class="icon-shoucang" v-if="show" @click="click()" src="/static/img/icon15.png" style="margin-left: 7px;"/>
		<img class="icon-shoucang" v-else="!show" @click="click()" src="/static/img/icon14.png"/>
		<div class="txt" style="font-size:12px;margin-top: -3px;" @click="click()" v-if="!show">收藏</div>
		<div class="txt on" style="font-size:12px;margin-top: -3px;"  @click="click()" v-else="show">已收藏</div>
		<!--<alert v-model="alert" title="收藏成功">

		</alert>-->
    </span>
</template>

<script>
    import { Alert } from 'vux'
    //收藏
    export default {
        components: {
            Alert
        },
        props: {
            id: undefined,
            type: undefined,
            txtShow: {
                default: false
            }
        },
        data() {
            return {
                show: false,
                on: true,
                alert:false,
            }
        },
        mounted() {
            var _this = this;
            _this.ajax();
        },
        methods: {
            click() {
                var _this = this;
                _this.$http.post(_this.$store.state.url + '/comment/collection', {
                    'load': false,
                    pid: _this.id,
                    on: _this.show ? 2 : 1,
                    type: _this.type || 1
                }).then((res) => {
                    if(!res) return;
                    _this.show = !_this.show;
                    if(_this.show){
                    	_this.alert = true;
                    }
                    _this.$emit('data', res);
                })
            },
            ajax() {
                var _this = this;
//              if(isWeiXin() == 1 && !_this.user.mem_phone) {
//                  _this.$store.state.bingPhone = true;
//                  return;
//              }
                _this.$http.post(_this.$store.state.url + '/comment/collectiontype', {
                    'load': false,
                    pid: _this.id,
                    type: _this.type || 1
                }).then((res) => {
                    if(!res) return;
                    _this.show = res.status;
                    _this.$emit('data', res);
                })
            }
        }
    }
</script>

<style>
    .icon-shoucang {
        /*width: 25px;*/
        width: 0.55rem;
        padding-left: 0.0625rem;
    }

    .zujianicon-shoucang {
        text-align: center;
        font-size: 12px;
        display: inline-block;
        margin: 0 auto;
    }
    .zujianicon-shoucang .txt{
    	color: #9c9c9c;
    }
    .zujianicon-shoucang .txt.on {
        color: #f6467c;
    }
</style>
