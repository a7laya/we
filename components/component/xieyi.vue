<template>
	<!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：协议弹窗
    -->
    <div>
    	<div @click="click">
    		<slot></slot>
    	</div>
        <confirm v-model="show" :title="title" :show-cancel-button="false" @on-show="ajax">
            <div v-html="item.text" v-if="item" style="max-height: 8rem; overflow: scroll;text-align: left;"></div>
            <div v-else>
            	<load-more></load-more>
            </div>
        </confirm>
    </div>
</template>

<script>
    import { Confirm,LoadMore } from 'vux'
    export default {
        components: {
            Confirm,
            LoadMore
        },
        data() {
            return {
                show: false,
                item:undefined,
            }
        },
        props: {
            type: undefined,
            title:undefined
        },
        watch:{
        	type(){
        		this.item=undefined;
        	}
        },
        methods: {
            click() {
				this.show = true;
            },
            ajax(){
            	var _this = this;
            	if(this.item) return;
            	_this.$http.post(_this.$store.state.url + '/index/userxieyi', {
                    'load': false,
                    name:_this.type
                }).then((res) => {
                    if(!res) return;
                    _this.item = res;
                })
            }
        }
    }
</script>

<style>

</style>