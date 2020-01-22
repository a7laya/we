<template>
  <!--
    	作者：laya
    	时间：2020-01-14
    	描述：价格组件
    -->
	<div style="color:red; font-size: 12px;">
		<!-- 原价 -->
		<div class="line-through">原价￥{{oprice}}</div>
		<!-- 现价 -->
		<div>
			现价￥<span class="font-weight" style="font-size: 14px;">{{price}}</span>
			<span style="margin-left: 10px;">{{discount}}折</span>
		</div>

	</div>
</template>

<script>
    export default {
      props:{
        oprice:{
          type:[Number,String],
          default: 0.01 // 原价不低于1分钱，防止计算折扣的时候无限大
        },
        price:{
          type:[Number,String],
          default: 0
        }
      },
      data() {
          return {
          }
      },
      computed:{
        discount: function(){return (this.price*10/this.oprice).toFixed(2)}
      }
    }
</script>

<style>

</style>
