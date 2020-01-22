<template>
	<popup-picker ref="picker" :placeholder="placeholder" :title="title" :data="item" :show-name="true" v-model="add" :columns="1" @on-hide="hide"></popup-picker>
</template>

<script>
    import { PopupPicker } from 'vux'
    export default {
        components: {
            PopupPicker
        },
        data() {
            return {
                item: [],
                adds:undefined,
                add: [],
            }
        },
        props:{
        	value:undefined,
        	title:undefined,
        	placeholder:undefined,
        	show:false,//是否开启省市县单选模式
        	type:undefined,
        	value:undefined,
        },
        watch: {
            value: {
                handler: function(val) {
                    this.add = val
                },
                immediate: true
            }
        },
        mounted() {
            var _this = this;
            _this.$http.post(_this.$store.state.url + '/Common/business',{
            	load:false,
            	type:_this.type || 1,
            }).then(function(res) {
                if(!res) return;
                var item = [];
            	_.each(res, function(e) {
                    _this.item.push({name:e.yewuname,value:e.yewu_id.toString(),parent:'0'});
               })
            })
        },
        methods: {
        	hide(){
        		this.adds = this.$refs.picker&&this.$refs.picker.getNameValues();
        		this.$emit('on-hide', this.add);
        	}
        }
    }
</script>

<style>
	<

