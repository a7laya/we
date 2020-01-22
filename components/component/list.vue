<template>
	<!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：发布内容列表
    -->
	<!-- <img src="../../../static/img/heiseduihao.png" alt=""> -->
	<div class="index_box">
		<slot></slot>
		<div class="li cl li1" @click="go(type,item.id)" v-if="type==1">

			<div class="img fl">
				<div class="triangle"></div>
				<div class="triangle_txt">合</div>
				<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
				<div class="time" v-if="item.status==0">待审核</div>
				<div v-if="item.status==1">
					<div class="time" v-if="time>0">正在招募</div>
					<div class="time" v-else="time <= 0">招募截止</div>
				</div>
				<div class="time" v-if="item.status==2">审核未通过</div>
			</div>
			<div class="txt fr">
				<div class="txt cl">
					<!--<span class="tit_name ell1">{{item.act_information}}</span>-->
					<span class="tit_name ell1">
						<div style="width: 83%;">{{item.title}}</div>
					</span>

				</div>
				<div class="diqu">
					<!-- <span>{{item.is_person|person}}发布</span> -->
					<span v-if="item.is_person == 0">个人发布</span>
					<span v-else>单位发布</span>
					<span style="margin-left: 15px;">行业：{{item.industry}}</span>
				</div>
				<div class="txtsp2">
					<i class="iconfont icon-dingwei"></i>
					<span class="diqutxt">{{item.region}}</span>
					<span class="money" v-if="item.money<100000">{{item.money}}元/预算</span>
					<span class="money" v-else="">{{item.money/10000}}万/预算</span>
				</div>
			</div>
			<div class="zhang">
				<img src="/static/img/zhang/zhangg.png" v-if="item.process==1" />
				<!--<img src="/static/img/zhang/zhangw.png" />-->
			</div>
		</div>
		<div class="li cl li2" @click="go(type,item.id)" v-if="type==2">
			<div class="img fl">
				<div class="triangle"></div>
				<div class="triangle_txt">活</div>
				<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
				<div class="time" v-if="signEnd>0&&item.status==1">正在报名</div>
				<div class="time" v-if="signEnd<0&&item.process==1&&item.status==1">已经结束</div>
				<div class="time" v-if="signEnd<0&&item.process==2&&item.status==1">报名截止</div>
				<div class="time" v-if="item.status==0">待审核</div>
				<div class="time" v-if="item.status==2">审核未通过</div>
			</div>
			<div class="txt fr">
				<div class="txt cl">
					<!--<badge class="color1" :text="'活动'"></badge>-->
					<span class="tit_name ell1">
						<div style="width: 83%;">{{item.information}}</div>
					</span>
				</div>
				<div class="diqu">
					<!-- <span>{{item.is_person|person}}发布</span> -->
					<span v-if="item.is_person == 0">个人发布</span>
					<span v-else>单位发布</span>
					<span style="margin-left: 15px;">行业：{{item.industry}}</span>
					<!--<badge class="color3" v-if="item.industry" :text="item.industry"></badge>-->
					<!--<badge class="color4" v-if="item.name" :text="item.name"></badge>-->
				</div>
				<div class="txtsp2">
					<i class="iconfont icon-dingwei"></i>
					<span class="diqutxt">{{item.region}}</span>
					<!--<span class="diqutxt">总费用{{item.money}}</span>-->
					<span class="money" v-if="item.money>0">{{item.money}}元/人均费用</span>
					<span class="money" v-else="">免费参加</span>
				</div>
			</div>
		</div>
		
		
		<div class="li cl li2" @click="go(type,item.id)" v-if="type==6">
			<div class="img fl">
				<div class="triangle"></div>
				<div class="triangle_txt">活</div>
				<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
				<div class="time" v-if="signEnd>0&&item.sign_status==1">正在报名</div>
				<div class="time" v-if="signEnd<0&&item.process==1&&item.sign_status==1">已经结束</div>
				<div class="time" v-if="signEnd<0&&item.process==2&&item.sign_status==1">报名截止</div>
				<div class="time" v-if="item.sign_status==0">待审核</div>
				<div class="time" v-if="item.sign_status==2">报名未通过</div>
			</div>
			<div class="txt fr">
				<div class="txt cl">
					<!--<badge class="color1" :text="'活动'"></badge>-->
					<span class="tit_name ell1">
						<div style="width: 83%;">{{item.information}}</div>
					</span>
				</div>
				<div class="diqu">
					<!-- <span>{{item.is_person|person}}发布</span> -->
					<span v-if="item.is_person == 0">个人发布</span>
					<span v-else>单位发布</span>
					<span style="margin-left: 15px;">行业：{{item.industry}}</span>
					<!--<badge class="color3" v-if="item.industry" :text="item.industry"></badge>-->
					<!--<badge class="color4" v-if="item.name" :text="item.name"></badge>-->
				</div>
				<div class="txtsp2">
					<i class="iconfont icon-dingwei"></i>
					<span class="diqutxt">{{item.region}}</span>
					<!--<span class="diqutxt">总费用{{item.money}}</span>-->
					<span class="money" v-if="item.money>0">{{item.money}}元/人均费用</span>
					<span class="money" v-else="">免费参加</span>
				</div>
			</div>
		</div>
		
		
		<div class="li cl li3" @click="go(type,item.id)" v-if="type==3">
			<div class="img fl">
				<div class="triangle"></div>
				<div class="triangle_txt">播</div>
				<img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgurl" />
				<!--<div class="time" v-show="time > 0">{{time | returntime}}</div>-->
				<!-- 直播的审核状态 -->
				<div v-if="item.status==2">
					<div class="time" v-if="item.state==1">审核未通过</div>
				</div>
				<div v-else>
					<div class="time" v-if="item.state==1">正在直播</div>
					<div class="time" v-if="item.state==2">即将直播</div>
					<div class="time" v-if="item.state==3">直播结束</div>
				</div>
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

		<!-- 发布新闻 -->
		<div class="trade" @click="hangye(item.id,'企业资讯')" v-if="type == 4">
			<!-- <div class="picture" v-for="(item,index) in item.imgUrl" :key="index"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgUrl"></div> -->
			<div class="picture"><img :src="$store.state.website.website_domain_name + '/uploads/' + item.imgUrl[0]"></div>
			<div class="xin-xiangmu">
				<div class="xiangmu-zhuti">{{item.title}}</div>
				<div class="dizhi">
					<span class="dizhi2">发布人：{{item.source}}</span>
					<span class="dizhi3 right_center">{{item.time|returntime6}}</span>
					<!-- <span class="dizhi3 right_center">{{item.time|returntime6}}</span> -->
				</div>
			</div>
		</div>

		<!-- 发布新品 -->
		<div class="spread1" @click="hangye(item.id,'新品展示')" v-if="type == 5">
			<div class="spread">
				<div class="spread-tu">
					<div class="spread-tu-pian" v-for="item in item.imgUrl"><img :src="$store.state.website.website_domain_name + '/uploads/' + item"></div>
				</div>
				<div class="spread-wenzi">
					<div class="xiangmu-zhuti">{{item.title}}</div>
					<div class="dizhi">
						<span class="dizhi2">发布人：{{item.source}}</span>
						<span class="dizhi3 right_center">{{item.time|returntime6}}</span>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import {
		Badge
	} from 'vux'
	export default {
		components: {
			Badge
		},
		props: {
			type: Number,
			item: Object
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
				if (this.type == 3) {
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
			hangye(id, des) {
				this.$router.push("/information/details/" + id + '/' + des)
			},
			go(type, id) {
				var type = Number(type);
				var url;
				switch (type) {
					case 1:
						url = '/hezuo/details/' + id;
						break;
					case 2:
						url = '/huodong/details/' + id;
						break;
					case 6:
						url = '/huodong/details/' + id;
						break;
					case 3:
						url = '/zhibo/details/' + id;
						break;
				}
				this.$router.push(url)
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

	/* 发布新闻样式 */
	.trade {
		/* width: 95%; */
		padding: 10px;
		margin: 10px auto;
		display: flex;
		background: #fff;
	}

	.picture {
		height: 80px;
		width: 40%;
	}

	.picture img {
		width: 100%;
		height: 100%;
	}

	.xin-xiangmu {
		width: 60%;
		/* margin: 0 auto; */
		padding-top: 5px;
		/* border-top: 1px solid rgba(112, 112, 112, 0.5); */
		padding-bottom: 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-between
	}

	.xiangmu-zhuti {
		color: #000000;
		font-size: 14px;
		margin-left: 15px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		width: 4rem;
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
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		margin: 0 0px 0 15px;
		align-items: center;
	}

	.dizhi span {
		/* width: 70%; */
		white-space: nowrap;
		/* overflow: hidden;
  		text-overflow: ellipsis; */
	}

	.message {
		background: #fff;
		margin-top: 10px;
	}

	.right_center {
		text-align: right;
	}

	#dizhi2 {
		width: 70%;
	}

	.center {
		text-align: center;
	}

	.ding {
		/* border-radius: 50%;
  		border:#666666 solid 1px;
  		font-size: 12px; */
		padding: 1px 3px;

	}

	.ding img {
		width: 25px;
		height: 25px;
	}

	.spread1 {
		width: 100%;
		background: #fff;
		margin-top: 10px;
		padding-top: 10px;
	}

	.spread {
		width: 95%;
		margin: 0 auto;

		/* margin-top:10px; */
	}

	.spread-tu {
		display: flex;
		justify-content: space-between;
	}

	.spread-tu-pian {
		width: 48%;
		height: 100px;
		/* background: #F73A3A; */
		/* border:1px solid rgba(112,112,112,1); */
	}

	.spread-tu-pian img {
		width: 100%;
		height: 100%
	}

	.spread-wenzi {
		width: 95%;
		margin: 0 auto;
		padding: 10px 0;
	}

	.ding_content {
		background: url("/static/img/ding.png");
		background-size: 100% 100%;
		width: 90%;
		margin: 0 auto;
		padding: 1.7rem 0.5rem 0.8rem;
		box-sizing: border-box;
		text-align: left;
	}

	.ding_help {
		font-size: 20px;
		font-weight: 600;
		color: #ffffff;
	}

	.ding_px {
		margin-bottom: 2rem;
		background: #ffffff;
		color: rgba(255, 119, 72, 1);
		border-radius: 10px;
		width: 3rem;
		text-align: center;
		font-size: 10px;
	}

	.des {
		font-size: 10px;
	}
</style>
