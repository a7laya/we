<template>
    <div class="pingfen">
        <i v-for="item in 5" class="iconfont icon-xingxing1" :style="{color:bcolor}" @click="onclcik(item)"></i>
        <div class="pingfentrue" :style="{width:((currentValue || num) *2)*10 + '%'}">
            <i v-for="item in 5" class="iconfont icon-xingxing1" :style="{color:icolor}" @click="onclcik(item)"></i>
        </div>
    </div>
</template>

<script>
    export default {
    	data(){
    		return{
    			currentValue:0
    		}
    	},
        props: {
            num: { // 必须提供字段
                required: true
            },
            icolor: {
                default: '#f9b845'
            },
            bcolor: {
                default: '#b4b5b5'
            },
            value: {
                type: [Number, String],
                default: 0
            },
            disabled: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            currentValue(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.currentValue = val
            }
        },
        methods:{
        	onclcik(index){
        		if(!this.disabled) return;
        		this.currentValue = index;
        	}
        }
    }
</script>

<style scoped>
    .pingfen {
        position: relative;
        display: inline-block;
    }
    
    .pingfen i {
        font-size: 12px;
    }
    
    .pingfen .pingfentrue {
        position: absolute;
        top: 0;
        width: 58%;
        white-space: nowrap;
        overflow: hidden;
    }
</style>