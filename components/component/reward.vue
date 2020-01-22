<template>
	<div class="zzc" v-if="show==true">
		<!--<div id="getMoney"  class="box2">
			<div class="text"></div>
		</div>-->
		<img src="/static/img/1.png" alt="" class="tp" />
		<div class="aa">

			{{message}}
		</div>

	</div>
</template>

<script>
	// 某个子组件中：
	export default {
		props: ["message"],
		data: function() {
			return {
				timer: null,
				show: true
			}
		},
		mounted() {
			var _this = this;
			_this.setTimer();
		},
		methods: {
			setTimer: function() {
				var _this = this;
				this.timer = setInterval(() => {　
					_this.show = false;
					clearInterval(this.timer)
				}, 6000)
			},
			add() {
				//				var _this=this;
				//				_this.$router.push('../../user/mymdetailed' );
			},

		}

	}
</script>

<style scoped="">
	.zzc {
		position: fixed;
		top: 30%;
		right: 30%;
		left: 30%;
		background: rgba(76, 76, 76, 0.8);
		border-radius: 5px;
		padding: 20px 10px;
	}
	
	.aa {
		width: 100%;
		text-align: center;
		color: #FFFFFF;
	}
	
	.qp {
		width: 70%;
		display: block;
		margin: 0 auto;
	}
	
	.tp {
		width: 60%;
		display: block;
		margin: 0 auto;
	}
</style>