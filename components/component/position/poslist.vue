<template>
    <div v-transfer-dom style="height:100%;position: fixed;top: 0;z-index: 2;left: 0; width: 100%;background: #fff;z-index: 2;overflow-y: scroll;">
        <x-header :left-options="{backText: '',preventGoBack:true,showBack:true}" @on-click-back="onclick">位置选择<span @click="form" slot="right" class="button">保存</span></x-header>
        <flexbox style="height: 90%;" v-if="item">
            <flexbox-item style="height: 100%;">
                <view-box ref="viewBox1">
                    <vue-li v-for="(item , index) in item" :item="item.typename" :key="index" @click.native="cindex(index)" :class="[navindex == index ? 'on' :'']"></vue-li>
                </view-box>
            </flexbox-item>
            <flexbox-item style="height: 100%;">
                <view-box ref="viewBox2">
                    <vue-li v-for="(item , index) in item[navindex].children" :item="item.typename" :key="index" @click.native="onclick(item)"></vue-li>
                </view-box>
            </flexbox-item>
        </flexbox>
        <p style="text-align:center;" v-else>
            <inline-loading></inline-loading>
        </p>
    </div>
</template>

<script>
    import { XHeader, Flexbox, FlexboxItem, ViewBox, InlineLoading, TransferDom } from 'vux'
    import vueLi from './position'

    export default {
        directives: {
            TransferDom
        },
        components: {
            vueLi,
            XHeader,
            Flexbox,
            FlexboxItem,
            ViewBox,
            InlineLoading
        },
        data() {
            return {
                item: undefined,
                navindex: 0
            }
        },
        mounted() {
            var _this = this;
            stop();
            _this.$http.post(_this.$store.state.url + '/common/region').then(function(res) {
                if(!res) return;
                _this.item = res;
            })
        },
        methods: {
            cindex(index) {
                this.navindex = index;
            },
            onclick(res) {
                this.$emit('ievent', res);
            },
            form(){
            	
            }
        },
//      destroyed() {
//          move();
//      }
    }
</script>
<style scoped>
    .weui-cells {
        /*margin-top: 0;*/
        /*border: 1px solid #000;*/
    }
    
    .list {
        border-right: 1px solid #eee;
    }
    
    .list.on {
        background: #eee;
    }
</style>