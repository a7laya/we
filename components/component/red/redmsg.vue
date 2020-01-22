<template>
    <div class="char_message red_message" @click="onshow()" :style="{opacity:!item.status ? 1 : 0.6}">
        <div class="red-red cl">
            <img class="imgl" src="/static/img/hongbao.png">
            <div class="red-cent">
                <p class="red-title">{{item.blessing || '恭喜发财！'}}</p>
                <p class="red-title2">{{item.status==1 ? "已领取" : ""}}{{item.status==2 ? "已抢完" : ""}}{{item.status ? "" : '领取红包'}}</p>
            </div>
        </div>
        <div class="red_name">
            <span class="red_name1">{{item.scene || '直播间'}}</span>
            <span class="red_name2">{{item.explain || '红包'}}</span>
        </div>
        <vue-openred :item = "item" v-model="isShow"></vue-openred>
    </div>
</template>

<script>
	import VueOpenred from './openred'
	export default {
		components: {
            VueOpenred
        },
		props:{
			reddata:undefined,
		},
		data(){
			return {
				isShow:false,
			}
		},
		computed:{
			item(){
				return this.reddata || {}
			}
		},
		methods:{
			onshow(){
				this.isShow = !this.isShow;
			},
		}
		
	}
</script>

<style scoped>
    .red_message {
        display: inline-block;
        vertical-align: top;
        width: 70%;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        text-align: left;
    }
    
    .red_name {
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        padding-left: 10px;
        color: #B9B7B7;
        background: #f7f7f7;
    }
    
    .red-red {
        padding-bottom: 10px;
        background-color: rgb(249, 156, 49);
    }
    
    .red-red .imgl {
        float: left;
        width: 50px;
        margin-left: 5px;
        margin-top: 10px;
    }
    
    .red-cent {
        float: left;
        width: 60%;
        color: #fff;
    }
    
    .red-title {
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 6px;
    }
    .red-title2{
    	font-size: 12px;
    }
</style>