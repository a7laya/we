<template>
	<!--
    	作者：1209559047@qq.com
    	时间：2018-12-03
    	描述：瀑布流布局
    -->
    <div class="flowing_water">
        <vue-waterfall-easy ref="waterfall" :imgsArr="imgsArr" :isRouterLink="true" linkRange="img" @scrollReachBottom="getData">
        	<div slot-scope="props" @click.stop="aa">{{props.value}}</div>
        	<div slot="waterfall-over">没有更多数据</div>
        </vue-waterfall-easy>
    </div>
</template>

<script>
    import vueWaterfallEasy from 'vue-waterfall-easy'
    export default {
        data(){
            return {
                imgsArr: [{
                    src: 'http://tp.yiaedu.com/showimg.php?url=http://uploads.xuexila.com/allimg/1703/867-1F330164643.jpg',
                	href:'wwww',
                	link:'aaa',
                },]
            }
        },
        components: {
            vueWaterfallEasy
        },
        methods: {
            aa() {
				
            },
            getData(){
            	this.$refs.waterfall.waterfallOver()
            }
        }
    }
</script>

<style lang="less">
    .flowing_water {
        height: 500px;
    }
</style>