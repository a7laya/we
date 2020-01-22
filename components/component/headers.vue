<template>
	<!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：首页头部
    -->
    <div class="header-search">
        <div class="search-content">
			<div class="fanhui" @click="fanhui(name,is_error)"><img src="/static/img/fanhui.png"></div>

           <!-- <span class="location fl ell"><i class="iconfont icon-dingwei"></i> -->
            	<!-- <vue-position></vue-position> -->
            </span>

            <div class="searchbox fl">
                <input placeholder="请输入任务/关键字" class="txt" @click="go(name)">
                <i class="iconfont icon-sousuo"></i>
            </div>
            <div class="button_fabu fl"><a href="tel:4001186800"><i class="iconfont icon-kefu"></i></a></div>
        </div>
    </div>
</template>

<script>
    import VuePosition from './position/pos'
    export default {
		props:{
      name: String,
      is_error : String
    },
    	components: {
            VuePosition,
        },
        data(){
            return {}
        },
        mounted() {
		},
		methods:{
        	go(id){
				console.log(id)
        		this.$router.push('/project/biaosearch?id='+id)
        	},
			fanhui(id,is_error){
				// this.$router.go(-1)
				// this.$router.push('/project/subject?id='+id+"&type=商机分析")
        this.$router.push('/project/subject/'+ id + '/' + '商机分析'+ '/' + is_error )
			}
       },
    }
</script>

<style scoped>
    .header-search {
      /*  position: fixed;
        top: 0;
        left: 0; */
        width: 100%;
        z-index: 2;
        height: 45px;
        color: #fff;
    	font-size: 16px;

    }
    .location{
    	display: inline-block;
    	margin-left: 25px;
    	width: 50px;
    }
    .location i.icon-dingwei{
    	font-size: 15px;
    	margin-right: 5px;
    }
    .search-content{
        line-height: 45px;
        height: 45px;
        background: rgba(53, 73, 94, 1);
		/* display: flex;
		align-items: center; */
    }
    .searchbox{
    	display: inline-block;
    	/* width: 200px; */
		width:225px;
		margin-left:30px;
    	/* margin-left: 13px; */
    	position: relative;
    }
    .searchbox input.txt{
    	width: 100%;
    	background: rgba(255,255,255,0.1);
    	line-height: 30px;
    	height: 30px;
    	border-radius: 30px;
    	text-indent: 10px;
    	color: #fff;
    }
    .searchbox input.txt::-webkit-input-placeholder{
    	color: #fff;
    }
    .searchbox i.icon-sousuo{
    	position: absolute;
    	color: #fff;
    	font-size: 22px;
    	top: 0;
    	right: 10px;
    	padding: 0 10px;
    }
    .searchbox i.icon-sousuo::before{
    	display: inline-block;
    	vertical-align: middle;
    }
    .button_fabu{
    	display: inline-block;
    	/* margin-left: 13px; */
		margin-left:30px;
    }
    .button_fabu i{
    	font-size: 25px;
    }
    .button_fabu a{
    	color: #fff;
    }

	.fanhui{
		width:30px;
		height:45px;
		line-height:45px;
		float:left;
		display: flex;
		align-items: center;
	}
	.fanhui img{
		height:30px;
		width:100%;
	}
</style>
