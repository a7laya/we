<template>
	<div style="background: #fff;">
		<x-header :title="$route.params.des" :left-options="{backText:''}" class="header"></x-header>
		<div  class="times">
			<div class="time" >
				<div v-html="list" id="table"></div>
			</div>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, Tab, TabItem, Actionsheet } from 'vux'
	import { VueShareit,} from '../component/'
	export default {
		components:{
			XHeader,
			Tab,
			TabItem,
			VueShareit,
		},
		data(){
			return{
				
				
				index:1,
				list:''
			}
		},
		
		 computed: {
    	user() {
    		return this.$store.state.user;

    	},
        fenxiang() {

        	return {
        		title: this.$route.params.des,
        		dese: this.$store.state.user.mem_nickname + '邀您关注弱电行业项目信息，他在智汇优库等您！',
        		imgUrl: '/static/logo.png',
//         		link:'/project/subject/' + this.$route.params.id + '/' + this.$route.params.type + '/' + this.$route.params.is_error
        		link:'&id=' + this.$route.params.id + '&des=' + this.$route.params.des + '&type=' +  this.$route.params.type
        	}




        },
    },
		
		
		created(){
		},
		mounted(){
			let _this=this;
			_this.zhaobiao()
			console.log(35)
			
		
		},
		methods: {
			zhaobiao(){
				this.$http.post(this.$store.state.url + "/Collection/bid_win_info",{
				bid_win_id:this.$route.params.id,
				info_type:this.$route.params.type
				}).then(res=>{
					this.list = res
				})
			}
		},
		updated(){
		if($("table")){
			$("table").prop("style").width = '100%'
		}
        
     },
	}
</script>

<style scoped>
	.times {
		background: #fff;
		/* width: 90%;
		margin: 0 auto;
		margin-top: 10px */
	}
	.time{
	width: 90%;
    margin: 0 auto;
    margin-top: 10px
	}
	#table >>> table{
	  width:100%;
      overflow-x: scroll;
      display: block;
	}
</style>
