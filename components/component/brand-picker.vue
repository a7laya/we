<template>
	<!--
    	作者：laya
    	时间：2020-01-13
    	描述：商品品牌选择
    -->
	<popup-picker ref="picker" :placeholder="placeholder" :title="title" :data="item" v-model="brand_id_all" :show-name="true" :columns="3" @on-hide="hide" id="xing" ></popup-picker>
</template>

<script>
    import { PopupPicker } from 'vux'
    export default {
        components: {
            PopupPicker
        },
        data() {
            return {
                item: [], // 存放所有选项的数组
                brand_name: undefined, // 品牌名 'XX行业 XX品牌'
                brand_id_all: [], // 品牌id'-1234-5678-'
            }
        },
        props:{
        	title:undefined,
        	placeholder:undefined,
        	show:false, //是否开启单选模式
        	value:undefined,
        },
        watch: {
            value: {
                handler: function(val) {
                	var gettype = Object.prototype.toString;
                	if(gettype.call(val)=='[object String]'){
                		if(val == '0'){
                			this.brand_id_all = ['-100'];
                		}else{
                			this.brand_id_all = val.split("-").splice(1,2);
                		}
                	}else{
                		this.brand_id_all = val || [];
                	}
                },
                immediate: true
            },
            brand_id_all: {
                handler() {
                    this.$emit('input',this.brand_id_all);
                },
                deep: true
            }
        },
        mounted() {
            var _this = this;
            _this.$http.post(_this.$store.state.url + '/Cargo/select_brank_category').then(function(res) {
                if(!res) return;
                console.log('/Cargo/select_brank_category接口返回的数据：',res);
                if(_this.show){
                	_this.item.push({name:'全部',value:'-100',parent:'0'});
                	_this.item.push({name:'',value:'-1',parent:'-100'});
                }
                _.each(res, function(e) {
                	_this.item.push({name:e.typename,value:e.id.toString(),parent:e.parent_id.toString()});
                	if(_this.show){
                		_this.item.push({name:'全部',value:'-1',parent:e.id.toString()});
                	}
                    _.each(e.children, function(e2) {
                    	_this.item.push({name:e2.typename,value:e2.id.toString(),parent:e.id.toString()});
                    })
                })
            console.log('分类：',_this.item);
            })
        },
        methods: {
        	hide(){
        		this.brand_name = this.$refs.picker&&this.$refs.picker.getNameValues();
        		this.$emit('onHide', this.brand_name);
        	}
        }
    }
</script>

<style scoped="">
/* 	#xing .vux-popup-picker-select {

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 380px;
	} */

</style>
