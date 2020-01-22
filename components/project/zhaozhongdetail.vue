<template>
	<!-- <x-header :title="'项目'" :left-options="{backText:''}" class="header"></x-header> -->
	
    <div v-if="index==1" class="zhongbiao" >
		<div v-html="list" class="zhongbiao_conter"></div>
	</div>
</template>

<script>
	import { XHeader, Tab, TabItem, Actionsheet} from 'vux'
	export default{
		components:{
		XHeader, Tab, TabItem, Actionsheet
		},
		data(){
			return{
				list:'',
				index:1
			}
		},
		mounted(){
			let _this=this;
			_this.$http.post(_this.$store.state.url + "/Collection/bid_win_info",{
				bid_win_id:_this.$route.query.id,
				info_type:_this.$route.query.des
			}).then(res=>{
				_this.list = res
			})
		}
	}
</script>

<style scoped>
	.zhongbiao{
		background:#fff;
		width:100%;
		margin-top:15px
	}
	.zhongbiao_conter{
		width:95%;
		margin:0 auto;
		
	}
</style>
