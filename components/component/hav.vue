<template>
    <ul class="special-oper">
        <li v-for="(item,index) in list" :key="index" @click="go(index)">
            <i class="iconfont" :class="item.icon" :style="item.style"></i>
            <span class="txt">{{item.txt}}</span>
        </li>
    </ul>
</template>

<script>
	export default{
		props: {
            list:undefined
        },
        methods:{
        	go(index){
        		this.$emit('on-click',index);
        	}
        }
	}
</script>

<style scoped>
    .special-oper {
        margin-top: 15px;
        background-color: #fff;
        padding: 0 0 15px;
        overflow: hidden;
    }
    
    .special-oper li {
        float: left;
        width: 50%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
    }
    
    .special-oper li i.iconfont{
    	display: inline-block;
    	margin-left: 20px;
    	font-size: 20px;
    	vertical-align: middle;
    }
    
    .special-oper span.txt {
    	display: inline-block;
        font-size: 14px;
        color: #555;
        vertical-align: middle;
    }
</style>