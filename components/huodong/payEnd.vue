<template>
	<!--<div>
		<div class="payEnd_title">支付成功</div>
		<img src="../../../static/img/payEnd.png" alt="" class="payEnd_img" />
		<div class="payEnd_content">支付成功</div>
		<div class="payEnd_content">报名结果请等待系统消息通知</div>
		<div class="payEnd_tijiao" @click="konw()">知道了</div>
		<vue-reward message="+2个智汇币"></vue-reward>
	</div>-->
	<div style="padding: 10px 15px;">
		<!--<div class="title">
			<div>所在省份：{{data.region}}</div>

			<a :href="data.link" class="old">查看原网站链接</a>
		</div>-->
		<div class="titles">
			<div>所在省份：{{data.region}}</div>
			<div class="time">发布于:{{data.time}}</div>
		</div>
		
		<h3 style="font-size: 17px;text-align: center;">{{data.title}}</h3>
		<div v-html="data.content" id="table"></div>
		<!--<div>{{data}}</div>-->
		 
	</div>
</template>

<script>
	import { XHeader } from 'vux';
	import { VueReward } from '../component'
	export default {
		components: {
			XHeader,
			VueReward
		},
		data() {
			return {
				data: ''

			}
		},
		mounted() {
			var _this = this;
			_this.detail();
			
		},
		methods: {
			konw() {
				var _this = this;
				_this.$router.push('/index/')
			},
			detail() {
				let _this = this;
				//            _this.$http.get('http://homeshop.jingbook.com/index/info', {
				//					load: true,
				//					
				//				}).then((res) => {
				//					if(!res) return;
				//					console.log(res)
				//
				//				})
				console.log(1)
				$.ajax({
					type: "get",
					url: "http://homeshop.jingbook.com/index/info",
					dataType: 'json',
					async: true,
					success: function(res) {
						console.log(res)
						_this.data = res.data;
//						console.log(_this.data)
//                      let p = _this.data.content;
                       
                      
					}
				})
			}

		}
	}
</script>

<style>
	/*body {
		background: #FFFFFF!important;
	}
	
	.header {
		background: #25C286;
	}
	
	.payEnd_tijiao {
		width: 80%;
		color: #FFFFFF;
		background: linear-gradient(90deg, rgba(3, 225, 236, 1), rgba(6, 231, 199, 1));
		border-radius: 20px;
		text-align: center;
		padding: 5px 0;
		font-size: 18px;
		margin: 20% auto;
	}
	
	.payEnd_title {
		font-size: 20px;
		text-align: center;
		line-height: 1.066667rem;
		font-weight: 400;
	}
	
	.payEnd_img {
		width: 40%;
		margin: 20% auto 3%;
	}
	
	.payEnd_content {
		text-align: center;
	}*/
	/*body {
		background: #FFFFFF!important;
	}
	.titles {
		display: flex;
		justify-content: space-between;
	   margin-bottom: 15px;
	}*/
	/*#app{
    overflow: hidden;
}*/
	body {
		background: #FFFFFF!important;
	}
	table {
		width: 100%;
		overflow: scroll;
	}
	#table{
		overflow-x: hidden;
	}
	#table div {
		overflow-y: scroll;
	}
	#table p{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		overflow: hidden;
	}
	.time{
		font-size: 15px;
		padding: 10px 15px;
	}
</style>