<template>
	<div class="main_box">
		 <div class="header-search">
		    <div class="search-content">
		        <div class="searchbox fl">
		        	<!--v-focus-->
		            <input  placeholder="请输入任务/关键字" class="txt" v-model="text">
		            <i class="iconfont icon-sousuo" @click="form"></i>
		        </div>
		    </div>
		</div>
		<div class="main-f">
			<div class="class1" v-for="(item,index) in list" :key="index" @click="clickbusiness(index)">{{item.name}}</div>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				text:'',
				list:[]
			}
			
		},
		methods:{
			form(){
				 this.$http.post(this.$store.state.url+'/Collection/contentSearch',{
					keyWord:this.text,
				 }).then(res=>{
					 console.log(res)
					 this.list=res
					 this.text=''
				 })
			},
			clickbusiness(index){
				// console.log(index)
				console.log(this.list[index].show)
				this.list[index].show = !this.list[index].show;
				console.log(this.list[index].show)
				 
			}
		}
	}
</script>

<style scoped>
	
	 .header-search {
	    height: 45px;
	    color: #fff;
	    font-size: 16px;
	}
	
	.location {
	    display: inline-block;
	    margin-left: 10px;
	    width: 70px;
	}
	
	.location i.icon-dingwei {
	    font-size: 15px;
	    margin-right: 5px;
	}
	
	.search-content {
	    line-height: 45px;
	    height: 45px;
	    background: #35495e;
		display: flex;
		justify-content: center;
	}
	
	.searchbox {
	    display: inline-block;
	    width: 305px;
		
	    position: relative;
	}
	
	.searchbox input.txt {
	    width: 100%;
	    background: rgba(255, 255, 255, 0.1);
	    line-height: 30px;
	    height: 30px;
	    border-radius: 30px;
	    text-indent: 10px;
	    color: #fff;
	}
	
	.searchbox input.txt::-webkit-input-placeholder {
	    color: #fff;
	}
	
	.searchbox i.icon-sousuo {
	    position: absolute;
	    color: #fff;
	    font-size: 22px;
	    top: 0;
	    right: 10px;
	    padding: 0 10px;
	}
	
	.searchbox i.icon-sousuo::before {
	    display: inline-block;
	    vertical-align: middle;
	}
	.class1 {
		background: #0f0;
		display: inline-block;
		border-radius: 3px;
		font-size: 12px;
		padding: 5px 10px;
		margin-bottom: 10px;
		margin-right: 15px;
		/* border:1px solid #0f0; */
		
	}
	.main-f{
		margin-top:30px;
		width:95%;
		margin:30px auto 0 ;
	}
	.main-f .on{
		color:#fff;
		background:#FF4500
	}
</style>
