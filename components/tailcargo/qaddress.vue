<template>
	<div class="wrap">
	<div class="header">
		<div class="back"><</div>
		<div class="img"><img src="" alt=""></div>
		<div class="name1">小女人</div>
	</div>
	<div class="alert">
		<div class="alert-wrap">
			<div class="left"></div>
			<div class="right">
			<div class="name">给充电宝取名字给充电宝取名字给充电宝取名字给充电宝</div>
			<div class="info">
				<div class="pname">张三丰</div>
				<div class="tel">12345578901</div>
			</div>
			<div class="addwrap">
					<div class="address">海南省海口市海逸县第四初中</div>
					<div class="edit">编辑</div>
			</div>
				<div class="queaddr">确认地址</div>
			</div>
		
		</div>
	</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.wrap{
		position: relative;
		background-color:#999999 ;
		}
		.header{
			width: 100%;
			height: 60px;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			}
			.back{
				width: 40px;
				height: 40px;
				margin: 20px 0px 30px 10px;
			}
			.img{
					width: 50px;
					height: 40px;
					background-color:red ;
					margin: 10px 0px 10px 0px;
				}
				.name1{
					width: 200px;
					height: 20px;
					margin: 30px 0px 10px 0px;
					}
					.alert{
						width: 313px;
						height: 130px;
						background-color: #FFFFFF;
						margin: 40px auto 0px auto;
					}
					.alert-wrap{
						width: 290px;
						height:120px ;
						display: flex;
						justify-content: space-between;
						margin:10px auto 10px 10px ;
					}
					.left{
						width: 56px;
						height: 56px;
						margin:10px auto 10px 10px ;
						background-color:aqua ;
					}
					.right{
						width: 230px;
						height: 110px;
					}
					.name{
						width: 180px;
						height: 32px;
					}
					.info{
						width:154px ;
						height: 14px;
						display: flex;
						margin-top: 10px;
					}
					.pname{
						width:50px ;
						height: 14px;

						color: #FF444444;
					}
					.tel{
						width: 54px;
						height: 14px;
						color: #FF444444;
					}
					.addwrap{
						position: relative;
						display: flex;
						justify-content: space-between;
					}
					.address{
						width: 170px;
						height: 14px;
						color: #FF8E8E8E;
					}
					.edit{
						position: absolute;
						right: 10px;
						color: #003BFF;
					}
					.queaddr{
						width: 60px;
						height: 14px;
						line-height: 14px;
						background-color:#FFF88509 ;
						border: 3px solid #FFF88509;
						margin: 40px auto 0px auto;
						text-align: center;
					}
</style>