<template>
	<div class="suspen">
		
		<div class="showsbottom" @click="video()">
			<img src="/static/img/wh.png" alt="" class="wh"/>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
			}
		},
		mounted() {
			var _this = this;
		},
		methods: {
			video() {
				let _this =this;
				_this.$router.push('/zhibo/course');
			}
		}
	}
</script>
<style scoped>
	.suspen .showsbottom {
		position: fixed;
		z-index: 4;
		top: 12.5rem;
		right: 15px;
		border-radius: 50%;
		background: #fff;
		line-height: 40px;
		height: 40px;
		width: 40px;
		text-align: center;
		color: #35495e;
		box-shadow: 0 0 5px 0 rgba(50, 71, 94, 0.5);
		font-size: 12px;
		transition: all 0.4s;
	}
	
	.suspen .showsbottom.on {
		bottom: 30px;
		right: 50%;
		margin-right: -20px;
		transform: rotate(45deg);
	}
	
	.suspen .showsbottom>span {
		font-size: 16px;
	}
	
	.pos_box {
		position: fixed;
		display: table;
		z-index: 3;
		height: 100%;
		width: 100%;
		top: 0;
		left: 100%;
		background: rgba(255, 255, 255, 0.95);
		transform: translate3D(0px, 0px, 0px);
		opacity: 0;
		transition: all 0.4s;
	}
	
	.pos_box.on {
		left: 0;
		opacity: 1;
	}
	
	.pos_logo {
		width: 41px;
		margin: 0 auto;
	}
	
	.pos_logo_txt {
		font-size: 21px;
		color: #1e79ea;
		font-weight: 800;
		margin-top: 12px;
	}
	
	.pos_logo_txt1 {
		margin-top: 12px;
	}
	
	.pos_main_list_li,
	.pos_main_shuming,
	.pos_logo_txt1 {
		font-size: 14px;
		color: #333333;
	}
	
	.pos_main_shuming {
		margin-top: 140px;
	}
	
	.pos_main_list {
		display: flex;
		flex-flow: row wrap;
		margin-top: 50px;
	}
	
	.pos_main_list_li {
		width: 71px;
		margin: 0 26px;
	}
	
	.pos_main_list_li>img {
		width: 45px;
		margin: 0 auto;
		margin-bottom: 10px;
		margin-top: 15px;
	}
	
	.pos_logo_txt,
	.pos_logo_txt1,
	.pos_main_shuming,
	.pos_main_list {
		text-align: center;
	}
	
	.pos_box_cen {
		position: fixed;
		display: table;
		width: 100%;
		z-index: 1;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}
	.wh{
		    width: 30px;
    height: 30px;
    display: block;
    margin-top: 6px;
    margin: 6px auto;
	}
</style>