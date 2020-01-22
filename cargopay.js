9//执行本文件js前请务必执行先执行
import { Alert } from 'vux'

let paypar = undefined //拉起支付时所需要的参数
let _this = undefined //传输过来的vue对象
let orderId = undefined //订单id
let gameMoney = undefined // 小游戏金额
let gameId = undefined // 小游戏题库Id

let Browsertype = isWeiXin(); //浏览器类型 1微信2支付宝9其他浏览器

(() => {
	switch(Browsertype) {
		case 1: //微信浏览器
			if(typeof WeixinJSBridge == 'undefined') {
				if(document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
				} else if(document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
				}
			}
			break
		default:
			break
	}
})()
// 查询支付状态
let paystate = () => {
	_this.$vux.loading.show()
	return new Promise((yes, no) => {
		_this.$http.post(_this.$store.state.url + '/Cargo/cargo_success', { //获取支付状态
			'load': false,
			orderid: orderId
		}).then((res) => {
			_this.$vux.loading.hide()
			if(res.sture) {
				yes({
					sture: true,
					msg: '支付成功'
				})

			} else {
				yes({
					sture: false,
					msg: '支付失败'
				})
			}
		}, () => {
			_this.$vux.loading.hide()
			yes({
				sture: false,
				msg: '支付失败'
			})
		})
	})
}




//微信内部支付
let onBridgeReady = () => {
	return new Promise((yes, no) => {
		WeixinJSBridge.invoke('getBrandWCPayRequest', paypar,
			function(res) {
				if(res.err_msg == 'get_brand_wcpay_request:ok') {
					paystate().then(function(res) {
						yes(res)

						_this.$vux.loading.hide()
					})
				} else {
					yes({
						sture: false,
						msg: '支付已取消'
					})
				}
			})
	})
}



//判断浏览器类型并做好准备工作
let browser = () => {
	return new Promise((yes, no) => {
		switch(Browsertype) {
			case 1: //微信浏览器
				onBridgeReady().then(function(res) {
					yes(res)
				})
				break
			default:
				break
		}
	})
}



let pay = (vue, data) => {
	_this = vue
	let paytype  = 'wechat' //默认充值类型默认自动选择比手动选择权限更高
	// if(Browsertype == 1) {
	// 	paytype = 'wechat'
	// } else if(Browsertype == 2) {
	// 	paytype = 'alipay'
	// } else {
	// 	if(!data.paytype) { //手动定义支付渠道
	// 		_this.$router.push({
	// 			path: '/user/myrecharge?num=' + data.num / 100
	// 		})
	// 		return new Promise((yes, no) => {
	// 			yes({
	// 				sture: false,
	// 				msg: '余额不足'
	// 			})
	// 		})
	// 	}
	// }
	return new Promise((yes, no) => {
		_this.$http.post(_this.$store.state.url + '/Cargo/cargo_goods_pay', { //获取拉起支付所需要的参数
			paytype: paytype, //充值渠道
      order_id: data.order_id,
			money: data.money, //充值钱数
			Arrivaltype: data.Arrivaltype, //充值到账货币类型 2智汇豆 1智汇币
			Browsertype: Browsertype, //浏览器类型
			url: _this.$store.state.url + '/#' + _this.$route.fullPath
		}).then((res) => {
			if(!res) no(false)
			paypar = res.a
			orderId = res.b
			browser().then(function(res) {
				yes(res)
			})
		})
	})
}


export {
	pay
}
//export {
//
//}
