<template>
		<div class="dingyue">
			<div @click="show()">订阅</div>
		</div>
</template>

<script>
	export default{       
		methods:{
			show(){}
		}
	}
</script>

<style scoped>
	.dingyue{
		position: fixed;
		z-index: 4;
		top: 12.5rem;
		right: 15px;
		border-radius: 50%;
		background: #999999;
		line-height: 40px;
		height: 40px;
		width: 40px;
		text-align: center;
		color: #FFFFFF;
		box-shadow: 0 0 5px 0 rgba(50, 71, 94, 0.5);
		font-size: 12px;
	}
	
</style>
