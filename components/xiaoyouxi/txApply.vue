<template>
	<div class="container">
		<x-header class="header">
			<div slot="overwrite-left" class="goBack" :style="borderColor" @click="goBack()"></div>
			<div slot="overwrite-title" class="title" :style="borderColor">提现申请</div>
		</x-header>
		<div class="block">
			<div class="left">
				<img src="/static/img/game/money.png" alt="">
				<span>账户余额</span>
				<span class="money">{{list.money/100}}元</span>
			</div>
			<div class="txrecord" @click="go()">
				提现记录
			</div>
		</div>
		<div class="body">
			<ul>
<!--				<li v-if="game_num <= 1">-->
<!--					<span>您可以提现的金额(元)</span>-->
<!--					<div class="moneyRight">-->
<!--						<span class="txmoney">{{list.money/100}}</span>-->
<!--					</div>-->
<!--				</li>-->
				<li>
					<span>选择提现金额(元)</span>
					<div class="moneyRight">
						<x-number title="" v-model="changeValue" :min="5" :max="maxData" :step="5"></x-number>
					</div>
				</li>
				<li>
					<span>到账方式</span>
					<span class="ways">公众号红包</span>
				</li>
			</ul>
		</div>
		<div class="dztime">
			预计<span class="color">1-3小时</span>到账
		</div>
		<div class="submitApply">
			<x-button @click.native="submitApply()">提交审核</x-button>
			<x-button @click.native="goIndex()">下次再说</x-button>
		</div>
		<div class="explain">
			<p>提现说明:</p>
			<p>1.为避免提现失败，请保持关注公众号</p>
			<p>2.提现最低金额为5元</p>
<!--			<p>3.第一次答题之后提现是无门槛提现</p>-->
		</div>
		<toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText" :position="position"></toast>
		 <vue-game :type="2"></vue-game>
		<vue-shareit ></vue-shareit>
	</div>
</template>

<script>
  import {XHeader, Badge, XButton, Toast, Group, XNumber} from 'vux'
  import VueShareit from '../component/game/gameShareit'
  import {VueGame} from '../component/'
  export default {
    components: {
      XHeader,
      Badge,
      XButton,
      Toast,
      Group,
      XNumber,
      VueShareit,
      VueGame
    },
    data () {
      return {
        nav_index: 1,
        list: {
          money: null
        },
        borderColor: {
          borderColor: '#333333'
        },
        showPositionValue: false, // 是否显示提示
        toastText: null, // 提示文本
        changeValue: 5,
        position: 'middle',
        maxData: 0,
        // game_num: 0,
        type: 1,
        txMoney: 0
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    mounted () {
      var _this = this
    },
    created () {
      this.getData()
    },
    watch: {
    },
    methods: {
      getData () {
        let _this = this
        _this.$http.post(_this.$store.state.url + '/Applets/personal_center_info', {
          load: true
        }).then(function (res) {
          _this.list = res
          _this.maxData = parseInt(res.money / 500) * 5
        })
        // _this.$http.post(_this.$store.state.url + '/Applets/get_game_info', {
        //   'load': false
        // }).then((res) => {
        //   _this.game_num = res.game_num
        //   if (_this.game_num === 1) {
        //     _this.type = 1
        //     _this.txMoney = _this.list.money
        //   } else {
        //     _this.type = 2
        //     _this.txMoney = _this.changeValue * 100
        //   }
        // })
      },
      go () {
        this.$router.push('/game/txrecord')
      },
      goIndex () {
        this.$router.push('/game/GameMine')
      },
      goBack () {
        history.go(-1)
      },
      submitApply () {
        let _this = this
        // if (_this.game_num === 1) {
        //   _this.$http.post(_this.$store.state.url + '/Applets/personal_center_cash_application', {
        //     load: true,
        //     type: _this.type,
        //     money: _this.txMoney
        //   }).then(function (res) {
        //     _this.getData()
        //     // toast
        //     _this.showPositionValue = true
        //     _this.toastText = '提交成功,等待审核'
        //     _this.timer = setInterval(() => {
        //       _this.$router.push('/game/index')
        //     }, 1000)
        //   })
        // } else {
          if (_this.list.money / 100 < 5) {
            _this.showPositionValue = true
            _this.toastText = '提现金额需为5的倍数'
          } else {
            _this.$http.post(_this.$store.state.url + '/Applets/personal_center_cash_application', {
              load: true,
              money: _this.changeValue * 100
            }).then(function (res) {
              _this.getData()
              // toast
              _this.showPositionValue = true
              _this.toastText = '提交成功,等待审核'
              _this.timer = setInterval(() => {
                _this.$router.push('/game/index')
              }, 1000)
            })
          }
        }
      // }
    },
    beforeDestroy () {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
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

	.title {
		font-size: 18px;
		text-align: center;
		line-height: 1.066667rem;
	}

	.body {
		width: 100%;
		background: white;
	}

	.block {
		width: 100%;
		height: 85px;
		background: -webkit-linear-gradient(left, #FFAA01, #FF7F00);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #FFAA01, #FF7F00);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #FFAA01, #FF7F00);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FFAA01, #FF7F00);
		/* 标准的语法 */
		margin-bottom: 10px;
		overflow: hidden;
	}

	.left {
		float: left;
		color: #fff;
		width: 100px;
	}

	.left img {
		display: inline-block;
		width: 13px;
		height: 13px;
		margin-left: 25px;
		margin-top: 24px;
	}

	.left span:nth-child(1) {
		display: inline-block;
		width: 13px;
		height: 13px;
		margin-left: 25px;
		margin-top: 24px;
		font-size: 12px;
	}

	.left .money {
		display: inline-block;
		font-weight: bold;
		width: 100%;
		text-align: center;
		margin-top: 7px;
		font-size: 18px;
	}

	.txrecord {
		float: right;
		width: 70px;
		margin-top: 25px;
		margin-right: 15px;
		line-height: 18px;
		font-size: 12px;
		background: #fff;
		border-radius: 5px;
		padding: 0px;
		color: #FFA918;
		text-align: center;
	}

	.body ul {
		width: 100%;
		margin: 0px auto;
	}

	.body ul li {
		line-height: 55px;
		font-size: 14px;
		padding-left: 15px;
		border-bottom: 1px solid #EEEEEE;
		color: #666666;
		overflow: hidden;
	}

	.moneyRight {
		float: right;
	}

	.moneyRight .outData {
		display: inline-block;
		width: 41px;
		line-height: 17px;
		text-align: center;
		margin-top: 14px;
		margin-right: 17px;
		background-color: #DCDCDC;
		border-radius: 50px;
		color: #fff;
	}

	.ways {
		float: right;
		margin-right: 17px;
	}

	.dztime {
		text-align: right;
		padding-right: 15px;
		padding-top: 7px;
	}

	.color {
		color: #FF7F00;
	}

	.submitApply {
		width: 100%;
	}

	.submitApply button:nth-child(1) {
		width: 345px;
		height: 45px;
		border-radius: 4px;
		margin-top: 43px;
		color: #fff;
		background: -webkit-linear-gradient(left, #FFAA01, #FF7F00);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #FFAA01, #FF7F00);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #FFAA01, #FF7F00);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FFAA01, #FF7F00);
		/* 标准的语法 */
	}

	.submitApply button:nth-child(2) {
		width: 345px;
		height: 45px;
		border-radius: 4px;
		margin-top: 20px;
		color: #333;
		background: #FFFFFF;
		border: 1px solid #FFAA01;
	}

	.weui-btn:after {
		border: 0px;
		border-radius: 4px;
	}

	.explain {
		width: 345px;
		margin: 0px auto;
		margin-top: 30px;
		color: #666666;
	}

	.explain p:nth-child(1) {
		margin-bottom: 8px;
	}

	.nav-btn1,
	.nav-btn2,
	.nav-btn3,
	.nav-btn4,
	.nav-btn5,
	.nav-btn7 {
		float: left;
		display: block;
		width: 50%;
		height: 36px;
		line-height: 36px;
		margin: 14px 0 6px;
		text-align: center;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		cursor: pointer;
	}
	/*.nav-unselect {*/
	/*  color: #31ac84;*/
	/*}*/

	.nav-select {
		background: -webkit-linear-gradient(left, #FFAA01, #FF7F00);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #FFAA01, #FF7F00);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #FFAA01, #FF7F00);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FFAA01, #FF7F00);
		/* 标准的语法 */
		color: #fff;
	}

	.weui-cell:before {
		border: 0px;
	}

	.weui-cell {
		padding: 15px;
	}

	.txmoney {
		display: inline-block;
		margin-right: 18px;
	}
</style>
