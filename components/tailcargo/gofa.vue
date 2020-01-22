<template>
	<div class="wrap">
		<!-- 头部 -->
			 <x-header style="background-color:#398CD3;">我的收集</x-header>
		<!-- <div class="title">
			<div class="back">返回</div>
			<div class="figure">代发尾货</div>
		</div> -->
		<!-- 脖子 -->
		<div class="header-wrap">
			 <tab class="color">
			    <tab-item selected @on-item-click="onItemClick" class="color active" @click="yuyue">预约发货</tab-item>
			    <tab-item @on-item-click="onItemClick" class="color" @click="fahuo">手动输入</tab-item>
			  </tab>
		</div>
		<!-- 列表 -->
		<div class="list-wrap">
			<div class="list-item">
				<div class="left">
					<div class="tupian"></div>
				</div>
				<div class="right">
					<div class="name">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div>
					<div class="uprice">
						<div class="money">原价</div>
						<div class="count">数量</div>
		<!-- 				<div class="newprecent">全新</div> -->
					</div>
					<div class="nprice">
						<div class="money">原价</div>
						<div class="discount">1.3折</div>
						<div class="tprice">￥4000</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 单号 -->
		<div class="yundan">
			<div>
				输入单号：<input type="text" placeholder="请输入快递/物流单号" style="border-bottom: 2px solid #35495E; margin-top: 5px;">
			</div>
			<div class="saomiao"></div>
			<div>
				选择快递：<input type="text" placeholder="请选择快递/物流" style="border-bottom: 2px solid #35495E;margin-top: 5px;">
				<div  v-if="show">下拉
				<cell-box :border-intent="false" class="sub-item" is-link>圆通快递</cell-box>
        <cell-box class="sub-item" is-link>申通快递</cell-box>
        <cell-box class="sub-item" is-link>韵达快递</cell-box>
				<cell-box class="sub-item" is-link>顺丰快递</cell-box>
				<cell-box class="sub-item" is-link>宇鑫快递</cell-box>
				<cell-box class="sub-item" is-link>京东快递</cell-box>
				<cell-box class="sub-item" is-link>EMS快递</cell-box>
				</div>
			</div>
</div>

		<div class="submit-wrap">
			<div class="submit">提交</div>
		</div>
		<!-- 底部 -->
		<vue-foot01></vue-foot01>

		</div>
</template>

<script>
	import { Tab, TabItem,Drawer,Cell,CellBox, CellFormPreview, Group, Badge,XHeader} from 'vux'
	import { VueFoot01} from "../component/";
	export default {
	    components: {
	      Tab,
	      TabItem,
	      Drawer,
		  Cell,
		  Group,
		  XHeader,
		  CellFormPreview,
          CellBox,
          Badge,
	      VueFoot01
	    },
		data(){

			show:true
			},
		methods:{
			onItemClick(index){
				console.log(index+1)
				},
        yuyue(){
          this.$router.push('/tailcargo/yuyue')
        },
        fahuo(){
          this.$router.push('/tailcargo/fahuo')
        }
		}
	}
</script>

<style scoped>
	.title{
		width: 100%;
		height: 44px;
		display: flex;
		justify-content: space-around;
		line-height:44px;
		font-size:14px ;
		color: #FFFFFF;
		text-align: center;
		background-color:#398CD3 ;
		}
		.back{
			width: 40px;
		}
		.figure{
			width: 300px;
		}
		.list-wrap{
			width: 100%;
			margin-top: 10px;
		}
		.list-item{
			width: 100%;
			border-bottom:3px solid ##F3F3F3 ;
			display: flex;
			justify-content: space-between;
		}
		.left{
			width:85px ;
			height: 85px;
			background-color: aquamarine;
			}
		.right{
			width: 257px;
		}
		.name{
			width: 100%;
			height: 32px;
		}
		.uprice{
			width: 100%;
			display: flex;
			margin-top:5px ;
		}
		.nprice{
			width: 100%;
			display: flex;
			margin-top:5px ;
			justify-content: space-between;
		}
		.money{
			width: 78px;
			height: 14px;
			color: #FF0000;
		}
		.count{
			width: 48px;
			height: 14px;
			color: #000000;
		}
		.discount{
			width: 111px;
			height: 20px;
			color: #FF0000;
		}
		.tprice{
			width: 68px;
			height: 20px;
		}
		.yundan{
			width: 90%;
			margin: 10px auto 0px auto;
			position: relative;
		}
		.sub-item {
         color: #888;
         }
		.submit-wrap{
			width: 100%;
			height: 400px;
			position: relative;
		}
		.saomiao{
			width: 20px;
			height: 20px;
			background-color: #fff;
			position: absolute;
			right: 100px;
			top: 4px;
		}
		 .submit{
			 width: 95px;
			 height: 24px;
			 position: absolute;
			 top: 50%;
			 left: 50%;
			 margin-top: -47px;
			 margin-left: -12px;
			 border-radius: 20px;
			 line-height:24px ;
			 text-align: center;

			 background-color: #F88509;
			 }
</style>
