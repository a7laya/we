<template>
	<div>
		<!--<div class="xin-xiangmu" @click="tab">
			<div class="xiangmu-zhuti">河南长葛市双洎河国家湿地公园科普宣教项目（长葛市双洎河国家湿地公园管理中心）</div>
			<div class="xiangmu-biaoti">项目为工业发展,分两期建设,具体内容包含：项目为工</div>
			<div class="dizhi">
				<span class="dizhi2">地址：郑州市</span>
				<span class="dizhi3">刚刚</span>
			</div>
		</div>-->





		<div class="xin-xiangmu" v-if="type==1" @click="tab(item.id,item.is_error)">
			<div class="xiangmu-zhuti">{{item.title}}</div>
			<!--<div class="xiangmu-biaoti">项目为工业发展,分两期建设,具体内容包含：项目为工</div>-->
			<div class="dizhi">
				<span class="dizhi2">地址：{{item.region}}</span>
				<span  class="center">类型：{{item.zc}}</span>
				<span class="dizhi3 right_center">{{item.time|returntime6}}</span>
			</div>
		</div>

		<!-- 弱电资讯 -->
		<div class="xin-xiangmu" v-if="type==8" @click="hangye(item.id,item.type)">
			<div class="xiangmu-zhuti">{{item.title}}</div>
			<!-- <div class="xiangmu-biaoti">项目为工业发展,分两期建设,具体内容包含：项目为工</div> -->
			<div class="dizhi dizhi1">
				<span class="dizhi2">{{item.source}}</span>
				<!-- <span class="center">类型:采招信息</span> -->
				<span class="dizhi3 right_center" >{{item.time|returntime6}}</span>
			</div>
		</div>


		<div class="xin-xiangmu" v-else-if="type==2" @click="click(item.id,is_error)">
			<div class="xiangmu-zhuti">{{item.title}}</div>
			<!-- <div class="xiangmu-biaoti">{{}}</div> -->
			<div class="dizhi ">
				<span class="dizhi2">地址：{{item.region}}</span>
				<span class="center">类型：{{item.zc}}</span>
				<span class="dizhi3 right_center" >{{item.time|returntime6}}</span>
			</div>
		</div>


		<div class="xin-xiangmu" v-else-if="type==3" @click="zhong(item.id,item.title)">
			<div class="xiangmu-zhuti">{{item.title}}</div>
			<!-- <div class="xiangmu-biaoti">{{}}</div> -->
			<div class="dizhi ">
				<span class="dizhi2">地址：{{item.region}}</span>
				<span class="center">类型：{{item.zc}}</span>
				<span class="dizhi3 right_center" >{{item.time|returntime6}}</span>
			</div>
		</div>

		<div class="xin-xiangmu" v-else-if="type==4"  @click="guan(item.id,item.title,item.info_type)">
			<div class="xiangmu-zhuti">{{item.title}}</div>
			<!-- <div class="xiangmu-biaoti">{{}}</div> -->
			<div class="dizhi ">
				<span class="dizhi2">地址：{{item.region}}</span>
				<span class="center">类型：{{item.zc}}</span>
				<span class="dizhi3 right_center" >{{item.time|returntime6}}</span>
			</div>
		</div>

		<div class="xin-xiangmu" v-else-if="type==5" @click="send(item.id,item.title)">
			<div class="xiangmu-zhuti">{{item.title}}</div>
			<!-- <div class="xiangmu-biaoti">{{}}</div> -->
			<div class="dizhi ">
				<span class="dizhi2">地址：{{item.region}}</span>
				<span class="center">类型：{{item.zb}}</span>
				<span class="dizhi3 right_center" >{{item.time|returntime6}}</span>
			</div>
		</div>

		<div class="xin-xiangmu" v-else-if="type==6" @click="tend(item.id,item.is_error)">
			<div class="xiangmu-zhuti">{{item.title}}</div>
			<!-- <div class="xiangmu-biaoti">{{}}</div> -->
			<div class="dizhi">
				<span class="dizhi2">地址：{{item.region}}</span>
				<span class="center">类型：{{item.zb}}</span>
				<span class="dizhi3 right_center" >{{item.time|returntime6}}</span>
			</div>
		</div>

		<div class="xin-xiangmu" v-else-if="type==7"  @click="guan(item.id,item.title,item.info_type)">
			<div class="xiangmu-zhuti">{{item.title}}</div>
			<div class="dizhi ">
				<span id="dizhi2">地址：{{item.region}}</span>
				<span class="center">类型：{{item.zc}}</span>
				<span class="dizhi3 right_center" >{{item.time|returntime6}}</span>
			</div>
		</div>

		<!-- 弱电资讯 -->
		<!-- <div class="xin-xiangmu"  v-else=''>
			<div class="xiangmu-zhuti">河南长葛市双洎河国家湿地公园科普宣教项目（长葛市双洎河国家湿地公园管理中心）</div>
			<div class="xiangmu-biaoti">项目为工业发展,分两期建设,具体内容包含：项目为工</div>
			<div class="dizhi dizhi1">
				<span class="dizhi2">地址：郑州市</span>
				<span class="center">类型:采招信息</span>
				<span class="dizhi3 right_center" >刚刚</span>
			</div>
		</div> -->

	</div>
</template>

<script>
 export	default{
 	props: {
			type: Number,
			item: Object,
      is_error:String,
		},
	 data(){
		 return{

		 }
	 },
	 mounted() {
	 	// console.log(this.item)
	 },
	 methods:{
		 tab(id,is_error){
			 // this.$router.push("/project/subject?id="+id+"&type=项目概况"+"&is_error="+is_error)
        this.$router.push('/project/subject/' +  id + "/" + "项目概况" + '/'+ is_error )
			 // this.$router.push("/project/subject?id="+id)

		 },
		 click(id,is_error){
			 // this.$router.push("/project/subject?id="+id+"&des="+des+"&type=项目概况")
			 // this.$router.push("/project/subject?id="+id+"&des="+des)
       this.$router.push('/project/subject/' +  id + "/" + "项目概况" + '/'+ is_error )
		 },
		 zhong(id,des){
		 	 this.$router.push("/project/zhongbiaodetail/"+ id + "/"+ des )
//			 this.$router.push("/project/zhongbiaodetail?id="+id+"&des="+des)
		 },
		 send(id,des){
			 this.$router.push("/project/zhongbiaodetail?id="+id+"&des="+des)
		 },
		 tend(id,is_error){
			 // this.$router.push("/project/subject?id="+id+"&type=项目概况")
       this.$router.push('/project/subject/' +  id + "/" + "项目概况" + '/'+ is_error )
		 },
// 		 danwei(id,des,con){
// 			 this.$router.push("/project/jiafangDetail?id="+id+"&des="+des+"&con="+con)
// 		 },
		 guan(id,des,type){
//			  this.$router.push('zhongbiaodetail?id='+id+'&des='+des+"&info_type="+info_type)
			 this.$router.push('/project/ProDetails/' + id + '/' + des + '/' + type)	
		 },
		 hangye(id,des){
		 	this.$router.push("/information/details?id="+id+"&des="+des)
		 },
	 }
 }
</script>

<style scoped="">
.xin-xiangmu {
		/*width: 95%;*/
		margin: 0 auto;
		padding-top: 15px;
		border-top: 1px solid rgba(112, 112, 112, 0.5);
		padding-bottom: 15px;
	}

	.xiangmu-zhuti {
		color: #000000;
		font-size: 14px;
		margin-left: 15px;
		margin-right: 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical
	}

	.xiangmu-biaoti {
		color: #666;
		font-size: 14px;
		margin-left: 15px;
		margin-right: 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 90%
	}

	.dizhi {
		color: #666;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		margin: 0 21px 0 15px;
	}
	.dizhi span{
		width: 33%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.message {
		background: #fff;
		margin-top: 10px;
	}
	.center{
		text-align: center;
	}
	.right_center{
		text-align: right;
	}
	/* #dizhi2{
		width: 100%;
	} */
</style>
