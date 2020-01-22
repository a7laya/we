<template>
	<div>
		<x-header class="header">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">项目详情</div>
		</x-header>
		<swiper auto :aspect-ratio="9/16">
			<swiper-item class="black" v-for="(item,index) in imgList" :key="index">
				<img :src="$store.state.website.website_domain_name + '/uploads/' + item.img_url" alt="">
			</swiper-item>
		</swiper>
		<div class="content" v-if="projectDetail">
			<div class="titles ">
				{{projectDetail.project_name}}
			</div>
			<div class="center">
				<div class="jianjie">
					<span>项目简介：</span>
					<span v-html="projectDetail.project_details">
                </span>
				</div>
				<div class="zongjia">
					<span>项目总价：</span>
					<span>
                    {{projectDetail.project_price}}&nbsp;元
                </span>
				</div>
				<div class="riqi">
					<span>项目日期：</span>
					<span>
                    {{projectDetail.project_time | returntime6}}
                </span>
				</div>
				<div class="dizhi">
					<span>项目地址：</span>
					<span>
                    {{projectDetail.project_address1}}
                </span>
				</div>
			</div>
		</div>
		<vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
	</div>
</template>

<script>
	import { XHeader, Swiper, SwiperItem } from "vux";
	import VueShareit from "../../component/game/helpShare";
	export default {
		components: {
			XHeader,
			Swiper,
			SwiperItem,
			VueShareit
		},
		data() {
			return {
				imgList: [],
				borderColor: {
					borderColor: '#333'
				},
				projectDetail: null
			};
		},
		computed: {
			user() {
				return this.$store.state.user
			},
			fenxiang() {
				return {
					title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动平台，秒得五十块！',
					imgUrl: '/static/logo.png',
					link: this.$route.path + '?uidkey=' + this.$store.state.mem_id
				}
			},
		},
		created() {
			this.getData();
		},
		methods: {
			goBack() {
				history.go(-1)
			},
			getData() {
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/Homepages/check_project", {
						load: true,
						id: this.$route.query.id
					})
					.then(function(res) {
						_this.projectDetail = res;
						_this.imgList = res.imgs
					});
			}
		}
	};
</script>

<style scoped>
	.vux-header {
		background-color: #ffffff;
	}
	
	.goBack {
		position: absolute;
		width: 12px;
		height: 12px;
		border-style: solid;
		border-color: white;
		border-width: 1px 0 0 1px;
		-webkit-transform: rotate(315deg);
		transform: rotate(315deg);
		top: 3px;
	}
	
	.header .title {
		width: 210px;
		font-size: 16px;
		text-align: center;
		line-height: 1.066667rem;
	}
	
	.content {
		padding: 10px;
		background: #ffffff
	}
	
	.content .titles {
		font-size: 16px;
		color: #333;
		font-weight: bold;
		text-align: center;
		border-radius: 50px;
		padding: 5px ;
		margin: 10px auto;
		word-break: break-all;
	}
	
	.content .center {
		padding: 15px 30px;
		background: #F4F4F4;
		border-radius: 5px
	}
	
	.center {
		overflow: hidden;
	}
	
	.center span:nth-child(1) {
		/*float: left;*/
		width: 80px
	}
	
	.center span:nth-child(2) {
		/*float: left;*/
		width: 210px
	}
</style>