<template>
	<div class="wrap">
		<!-- 头部 -->
		 <x-header style="background-color:#398CD3;">我的订单</x-header>
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
						<div class="send">包邮</div>
						<div class="tprice">￥4000</div>
					</div>
				</div>
        <!-- 退货地址 -->
     <!--   <div class="taddress">
          <h2>退货地址</h2>
        </div> -->
			</div>
		</div>
		<!-- 单号 -->
		<div class="yundan">
			<div>
				预约快递：<input type="text" placeholder="预约快递/物流" style="border-bottom: 2px solid #35495E; margin-top: 5px;">
			</div>
			<div class="express"><img src="/static/img/down.png" alt=""></div>
			<div>
				预约时间：<input type="text" placeholder="请选择预约时间" style="border-bottom: 2px solid #35495E;margin-top: 5px;">
			</div>
			<div class="time"><img src="/static/img/down.png" alt=""></div>
				<div>
				收货地址：<input type="text" placeholder="默认地址" style="border-bottom: 2px solid #35495E;margin-top: 5px;">
			</div>
			<div class="address"><img src="/static/img/down.png" alt=""></div>
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
        XHeader,
		    Cell,
		    Group,
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

			}
      .tupian{
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
			position: relative;
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
		.send{
			width: 32px;
			height: 20px;
			line-height: 20px;
			text-align: center;
			border-radius: 6px;
			background-color: #F88509 ;
			position: absolute;
			top: 0px;
			left: 120px;
			}
		.tprice{
			width: 68px;
			height: 20px;
		}
    .taddress{

      width: 98%;
      height: 20px;
      margin: 0px auto;
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
		.time,.address,.express{
			width: 20px;
			height: 20px;
			background-color: #F88509;
			position: absolute;
			right: 100px;
			top: 4px;
		}
		.time{
			top: 30px;
		}
		.address{
			top: 54px;
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

			 background-color:  #F88509;
			 }
</style>
