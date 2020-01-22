<template>
	<!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：发布内容列表
    -->

  <!-- 合作 -->
	<div class="index_box">
		<slot></slot>
		<div class="li cl li1"  v-if="type==1">

			<div class="img fl" @click="go(type,item.id)">
				<div class="triangle"></div>
				<div class="triangle_txt">包</div>
				<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
				<!-- <div class="time" v-if="item.status==0">待审核</div> -->
				<!-- <div v-if="item.status==1"> -->
					<!-- <div class="time" v-if="time>0">正在招募</div>
					<div class="time" v-else="time<=0">招募截止</div> -->
          <div class="time" v-if="item.state==1">正在招募</div>
          <div class="time" v-if="item.state==2">招募截止</div>
				<!-- </div> -->
				<!-- <div class="time" v-if="item.status==2">审核未通过</div> -->
			</div>
			<div class="txt fr">
				<!-- <div class="zhiding" @click="ding(item.id)" v-if="time>0&&type2!=0">顶</div> -->
        <!-- <div class="zhiding" @click="ding(item.id)" v-if="time>0&&type2!=0"><img src="/static/img/anniu.png"></div> -->
        <div class="zhiding" @click="ding(item.id)" v-if="item.state==1&&type2!=0"><img src="/static/img/anniu.png"></div>
				<div class="txt cl" @click="go(type,item.id)">

					<!--<span class="tit_name ell1">{{item.act_information}}</span>-->
					<span class="tit_name ell1"> <div style="width: 83%;">{{item.title}}</div></span>

				</div>
				<div class="diqu" @click="go(type,item.id)">
					<!-- <span>{{item.is_person||person}}发布</span> -->
         <span v-if="item.is_person == 1">个人发布</span>
          <span v-if="item.is_person == 2">单位发布</span>
          <!-- <span v-else>发布</span> -->
					<span style="margin-left: 15px;">行业：{{item.industry}}</span>
				</div>
				<div class="txtsp2" @click="go(type,item.id)">
					<i class="iconfont icon-dingwei"></i>
					<span class="diqutxt">{{item.region}}</span>
					<span class="money" v-if="item.money<100000">{{item.money}}元/预算</span>
					<span class="money" v-else="">{{item.money/10000}}万/预算</span>
				</div>
			</div>
			<div class="zhang" >
				<img src="/static/img/zhang/zhangg.png" v-if="item.process==1" />
				<!--<img src="/static/img/zhang/zhangw.png" />-->
			</div>
		</div>


    <!-- 活动 -->
		<div class="li cl li2" v-if="type==2">
			<div class="img fl" @click="go(type,item.id)">
				<div class="triangle"></div>
				<div class="triangle_txt">活</div>
				<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
				<!-- <div class="time" v-if="signEnd>0&&item.status==1">正在报名</div>
				<div class="time" v-if="signEnd<0&&item.process==1&&item.status==1">已经结束</div>
				<div class="time" v-if="signEnd<0&&item.process==2&&item.status==1">报名截止</div> -->
        <div class="time" v-if="item.state==1">正在报名</div>
        <div class="time" v-if="item.state==3">已经结束</div>
        <div class="time" v-if="item.state==2">报名截止</div>



				<!-- <div class="time" v-if="item.status==0">待审核</div>
				<div class="time" v-if="item.status==2">审核未通过</div> -->
				<!--<div class="time" v-if="">正在进行</div>
                <div class="time" v-else="">已经结束</div>-->
			</div>
			<div class="txt fr">
				<!-- <div class="zhiding" @click="ding(item.id)" v-if="signEnd>0&&item.status==1&&type2!=0">顶</div> -->
        <div class="zhiding" @click="ding(item.id)" v-if="item.state==1&&type2!=0"><img src="/static/img/anniu.png"></div>


				<div class="txt cl" @click="go(type,item.id)">
					<!--<badge class="color1" :text="'活动'"></badge>-->
					<span class="tit_name ell1"><div style="width: 83%;">{{item.information}}</div></span>
				</div>
				<div class="diqu" @click="go(type,item.id)">
					<!-- <span>{{item.is_person|person}}发布</span> -->
					<span v-if="item.is_person == 0">个人发布</span>
					<span v-if="item.is_person == 1">单位发布</span>
          <!-- <span v-else>发布</span> -->
					<span style="margin-left: 15px;">行业：{{item.industry}}</span>
				</div>
				<div class="txtsp2" @click="go(type,item.id)">
					<i class="iconfont icon-dingwei"></i>
					<span class="diqutxt">{{item.region}}</span>
					<!--<span class="diqutxt">总费用{{item.money}}</span>-->
					<span class="money" v-if="item.money>0">{{item.money}}元/人均</span>
					<span class="money" v-else="">免费参加</span>
				</div>
			</div>
		</div>


   <!-- 直播 -->

		<div class="li cl li3" @click="go(type,item.id)" v-if="type==3">
			<div class="img fl">
				<div class="triangle"></div>
				<div class="triangle_txt">播</div>
				<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
				<!--<div class="time" v-show="time > 0">{{time | returntime}}</div>-->
				<div class="time" v-if="item.state==1">正在进行</div>
				<div class="time" v-if="item.state==2">即将开始</div>
				<div class="time" v-if="item.state==3">已经结束</div>

			</div>
			<div class="txt fr">
				<div class="txt cl">
					<!--<badge class="color1" :text="'直播'"></badge>-->
					<span class="tit_name ell1">
                    	<div style="width: 83%;">{{item.title}}</div>
                   </span>
				</div>
				<div class="diqu">
					<span>{{item.subject}}发布</span>
					<span style="margin-left: 15px;">行业：{{item.industry}}</span>
					<!--<badge class="color3" v-if="item.industry" :text="item.industry"></badge>-->
					<!--<badge class="color4" v-if="item.name" :text="item.name"></badge>-->
				</div>
				<div class="txtsp2">
					<i class="iconfont icon-dingwei"></i>
					<span class="diqutxt">{{item.region}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Badge } from 'vux'
	export default {
		components: {
			Badge
		},
		props: {
			type: Number,
			item: Object,
			type2:Number
//			key:indexs
//          key:num
		},
		data() {
			return {
				time: 0,
				signEnd: 0,
				newtime: ''
			}
		},
		mounted() {
			const timer = setInterval(() => {
				this.time = this.item.end_time - (Date.parse(new Date()) / 1000);
				this.signEnd = this.item.sign_end_time - (Date.parse(new Date()) / 1000);
				if(this.type == 3) {
					this.time = this.item.starttime - (Date.parse(new Date()) / 1000);
				}
			}, 100);

			this.newtime = Date.parse(new Date()) / 1000;

			// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
			this.$once('hook:beforeDestroy', () => {
				clearInterval(timer);
			})
		},
		methods: {
			go(type, id, data) {
				var type = Number(type);
				var url;
				switch(type) {
					case 1:
						url = '/hezuo/details/' + id;
						break;
					case 2:
						url = '/huodong/details/' + id;
						break;
					case 3:
						url = '/zhibo/details/' + id;
						break;
				}
				this.$router.push(url)
			},
			ding(id){
				let _this=this;
				_this.$emit('zhiding',id);
			}
		}
	}
</script>

<style scoped>
	.index_box {
		position: relative;
	}

	.index_box .li {
		margin-top: 10px;
	}

	.index_box .li+.li {
		margin-top: 5px;
	}

	.index_box .li {
		padding: 10px 15px;
		background: #fff;
	}

	.index_box .li .img {
		height: 80px;
		width: 80px;
		border-radius: 5px;
		overflow: hidden;
		position: relative;
	}

	.index_box .li .img img {
		width: 100%;
		height: 100%;
		position: relative;
		/*left: -30px;*/
		border-radius: 5px;
	}

	.index_box .li>.txt {
		width: 250px;
		font-size: 15px;
		color: #636363;
		line-height: 21px;
		margin-top: 5px;
	}

	.index_box .li>.txt .tit_name {
		vertical-align: middle;
		width: 250px;
		float: right;
	}

	.index_box .li>.txt .txtsp2 {
		font-size: 13px;
		margin-top: 5px;
	}

	.index_box .li>.txt .txtsp2 .money {
		color: #fc2b4e;
		font-size: 12px;
		float: right;
	}

	.index_box .li>.txt .diqu {
		color: #565656;
		margin-top: 5px;
	}

	.index_box .li>.txt .txtsp2 .icon-dingwei {
		font-size: 14px;
	}

	.index_box .li>.txt .txtsp2 .diqutxt {
		font-size: 12px;
		margin-right: 10px;
		color: #999;
	}

	.index_box .li>.txt .color {
		color: #565656;
	}

	.index_box .li>.txt .txtsp2 .shuomign {
		margin-left: 10px;
	}

	.index_box .li>.txt .vux-badge.color1 {
		background: #f74c31;
	}

	.index_box .li>.txt .vux-badge.color4 {
		background: #62dcd2;
	}

	.index_box .li>.txt .vux-badge.color2 {
		background: #42ce74;
	}

	.index_box .li>.txt .vux-badge.color3 {
		background: #4b6bd0;
	}

	.index_box .li>.zhang {
		position: absolute;
		width: 80px;
		right: 10px;
		top: 0;
	}

	.index_box .li .triangle {
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		border-top: 30px solid #f74c31;
		border-right: 30px solid transparent;
		z-index: 1;
	}

	.index_box .li .triangle_txt {
		position: absolute;
		color: #fff;
		left: 2px;
		top: 2px;
		line-height: 1em;
		font-size: 12px;
		z-index: 1;
	}

	.index_box .li .time {
		position: absolute;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		text-align: center;
		color: #fff;
		width: 100%;
		z-index: 1;
	}

	.index_box .li .diqu {
		font-size: 12px;
	}

	.zhiding {
		position: absolute;
		right: 10px;
		top: 10px;
		/* width: 0.533333rem; */
    width:25px;
    height:25px;
		/* line-height: 0.533333rem; */
		/* text-align: center; */
		font-size: 0.48rem;
		/* border: 0.026667rem solid rgb(255, 127, 0); */
		/* border-radius: 1.333333rem; */
		margin-top: 0.133333rem;
		/* color: rgb(255, 127, 0); */
		z-index: 1;
	}
  .zhiding img{
    width:100%;
    height:100%;
  }
</style>
