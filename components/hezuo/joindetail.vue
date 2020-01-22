<template>
	<div>
		<x-header :title="'参与人信息'" :left-options="{backText:''}" class="header"></x-header>

		<div class="content">

			<div class="center">
				<div class="titlecenter">
					{{info.coop_title}}
				</div>
				<div class="jianjie">
					<span>意向：</span><span>{{info.bid_remarks}}</span>
				</div>
				<div class="jianjie">
					<span>TA的报价：</span>
					<span v-if="info.bid_price<10000">{{info.bid_price}}元</span>
					<span v-else="">{{info.bid_price/10000}}万</span>
				</div>
				<div class="jianjie">
					<span>TA的简称：</span><span>{{info.mem_nickname}}</span>
				</div>
				<div class="jianjie">
					<span>TA的联系方式：</span>
					<span>
                	{{info.bid_phone}}
                </span>
				</div>
				<div class="pic" v-if="info.bid_imgurl.length>0">
				<!-- <div class="pic" v-if="info.bid_imgurl"> -->
					<div class="titlecenter">图片</div>
					<div class="pic_list">
						<div v-for="item in info.bid_imgurl">
							<img slot="icon" :src="$store.state.website.website_domain_name + '/uploads/' + item" >
						</div>

					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { XHeader } from "vux";

	export default {
		components: {
			XHeader

		},
		data() {
			return {
				info: ''
			};
		},
		computed: {
			user() {
				return this.$store.state.user
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
        console.log('this.$route.query.id')
        console.log(this.$route.query.id)
        console.log(this.$route.query.userId)
				var _this = this;
				_this.$http.post(_this.$store.state.url + "/Cooperation/coopPartList", {
						load: true,
						coop_id: this.$route.query.id,
						part_user: this.$route.query.userId
					})
					.then(function(res) {
						_this.info = res;
            console.log(_this.info)
					});
			}
		}
	};
</script>

<style scoped>


	.content {
		padding: 10px;
		background: #ffffff
	}

	.content .title {
		font-size: 16px;
		color: #333;
		font-weight: bold;
		text-align: center;
		width: 150px;
		border-radius: 50px;
		padding: 5px 75px;
		margin: 10px auto
	}

	.content .center {
		padding: 15px 30px;
		background: #F4F4F4;
		border-radius: 5px
	}

	.center {
		overflow: hidden;
		font-size: 15px;
	}

	.center span:nth-child(1) {
		/*float: left;*/
		width: 80px;
		font-weight: 600;
	}

	.center span:nth-child(2) {
		/*float: left;*/
		width: 210px
	}

	.pic_list div {
		margin-bottom: 2px;
	}

	.titlecenter {
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 15px;
	}
	.jianjie{
		margin-bottom: 10px;
	}
	</style>
