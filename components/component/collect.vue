<template>
		<div class="">
			<div @click="show()" class="dingyue-con dingyue">
        <div>添加</div>
        <div>候选</div>
      </div>
		</div>
</template>

<script>
	export default{
		methods:{
			show(){
				this.$router.push('/vote/enroll')
			}
		}
	}
</script>

<style scoped>
	.dingyue{
		position: fixed;
		bottom: 120px;
		z-index: 4;
		right: 15px;
		border-radius: 50%;
		background: #999999;
		/* line-height: 40px; */
		height: 50px;
		width: 50px;
		/* text-align: center; */
		color: #FFFFFF;
		box-shadow: 0 0 5px 0 rgba(50, 71, 94, 0.5);
		font-size: 14px;
	}
  .dingyue-con{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

</style>
