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
		_this.$http.post(_this.$store.state.url + '/WeixinPaytest/test3', { //获取支付状态
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
// 查询礼物支付状态
let giftpaystate = () => {
	_this.$vux.loading.show()
	return new Promise((yes, no) => {
		_this.$http.post(_this.$store.state.url + '/Moneytype/payment_success', { //获取支付状态
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
//活动查询支付状态
let paystates = () => {
	_this.$vux.loading.show()
	return new Promise((yes, no) => {
		_this.$http.post(_this.$store.state.url + '/Activityb/payment_successs', { //获取支付状态
			'load': false,
			orderid: orderId
		}).then((res) => {
			_this.$vux.loading.hide()
			if(res.sture) {
				yes({
					sture: true,
					msg: '支付成功'
				})
				_this.$router.push('../../../../../payEnd/')
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
// TODO 查询支付状态
let gamepaystate = () => {
	_this.$vux.loading.show()
	return new Promise((yes, no) => {
		// TODO 换成自己小游戏的接口
		_this.$http.post(_this.$store.state.url + '/Applets/payment_success', { //获取支付状态
			'load': false,
			orderid: orderId
		}).then((res) => {
			_this.$vux.loading.hide()
			if(res.sture) {
				yes({
					sture: true,
					msg: '支付成功'
				})
				_this.$router.push('/game/tiku')
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
// 红包 查询支付状态
let redpaystate = () => {
	_this.$vux.loading.show()
	return new Promise((yes, no) => {
           _this.$http.post(_this.$store.state.url + '/Moneytype/paylive_red_success', { //获取支付状态
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
//礼物微信内部支付
let giftonBridgeReady = () => {
	return new Promise((yes, no) => {
		WeixinJSBridge.invoke('getBrandWCPayRequest', paypar,
			function(res) {
				if(res.err_msg == 'get_brand_wcpay_request:ok') {
					giftpaystate().then(function(res) {
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

//活动支付微信内部支付
let onBridgeReadys = () => {
	return new Promise((yes, no) => {
		WeixinJSBridge.invoke('getBrandWCPayRequest', paypar,
			function(res) {
				if(res.err_msg == 'get_brand_wcpay_request:ok') {
					//alert(res.err_code+res.err_desc+res.err_msg);
					paystates().then(function(res) {
						yes(res)

						_this.$vux.loading.hide()
					})

				} else {
					//返回跳转到订单详情页面
					msg("支付失败");
					//        _this.$router.push('../../../../../index/')
				}

			})
	})
}

// TODO 小游戏支付微信内部支付
let gameonBridgeReadys = () => {
	return new Promise((yes, no) => {
		WeixinJSBridge.invoke('getBrandWCPayRequest', paypar,
			function(res) {
				if(res.err_msg == 'get_brand_wcpay_request:ok') {
					gamepaystate().then(function(res) {
						yes(res)
						_this.$vux.loading.hide()
					})
					// _this.$http.post(_this.$store.state.url + '/Applets/game_money_processing', { //获取拉起支付所需要的参数
					//   money: gameMoney,
					//   spon_id: gameId
					// }).then((res) => {
					//   alert(res)
					// })
					//alert(res.err_code+res.err_desc+res.err_msg);
					// _this.$router.push('/game/tiku')
				} else {
					//返回跳转到订单详情页面
					// _this.$router.push('/game/tiku')
					// _this.$router.push('../../../../../index/')
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
//直播礼物判断浏览器类型并做好准备工作
let giftbrowser = () => {
	return new Promise((yes, no) => {
		switch(Browsertype) {
			case 1: //微信浏览器
				giftonBridgeReady().then(function(res) {
					yes(res)
				})
				break
			default:
				break
		}
	})
}
//活动判断浏览器类型并做好准备工作
let browsers = () => {
	return new Promise((yes, no) => {
		switch(Browsertype) {
			case 1: //微信浏览器
				onBridgeReadys().then(function(res) {
					yes(res)
				})
				break
			default:
				break
		}
	})
}

// 小游戏判断浏览器类型并做好准备工作
let gamebrowsers = () => {
	return new Promise((yes, no) => {
		switch(Browsertype) {
			case 1: //微信浏览器
				gameonBridgeReadys().then(function(res) {
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
	let paytype //默认充值类型默认自动选择比手动选择权限更高
	if(Browsertype == 1) {
		paytype = 'wechat'
	} else if(Browsertype == 2) {
		paytype = 'alipay'
	} else {
		if(!data.paytype) { //手动定义支付渠道
			_this.$router.push({
				path: '/user/myrecharge?num=' + data.num / 100
			})
			return new Promise((yes, no) => {
				yes({
					sture: false,
					msg: '余额不足'
				})
			})
		}
	}
	return new Promise((yes, no) => {
		_this.$http.post(_this.$store.state.url + '/WeixinPaytest/test1', { //获取拉起支付所需要的参数
			paytype: paytype, //充值渠道
			num: (data.num / 100).toFixed(2), //充值钱数
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
//直播礼物
let giftpay = (vue, data) => {
	_this = vue
	let paytype //默认充值类型默认自动选择比手动选择权限更高

	return new Promise((yes, no) => {
		console.log(data)
		var datas = { //获取拉起支付所需要的参数
			reward_id: data.reward_id,
			number: data.number,
			live_id: data.live_id,
			money: data.money,
			Arrivaltype: data.Arrivaltype,
		}
		console.log(datas);
		_this.$http.post(_this.$store.state.url + '/Moneytype/live_gift_pay', datas).then((res) => {
			if(!res) no(false)
			paypar = res.a
			orderId = res.b
			giftbrowser().then(function(res) {
				yes(res)
			})
		})
	})
}
//活动
let pays = (vue, data) => {
	_this = vue

	return new Promise((yes, no) => {
		_this.$http.post(_this.$store.state.url + '/Activityb/new_sign_up', { //获取拉起支付所需要的参数
			sign_money: data.sign_money * 100,
			type: 2,
			sign_name: data.sign_name,
			sign_phone: data.sign_phone,
			sign_actid: data.sign_actid,
			fq_memid: data.fq_memid,
			sign_memid: data.sign_memid
		}).then((res) => {
			if(!res) no(false)
			paypar = res.a
			orderId = res.b
			browsers().then(function(res) {
				yes(res)
			})
		})
	})
}

// 小游戏
let gamePays = (vue, data) => {
	_this = vue
	return new Promise((yes, no) => {
		_this.$http.post(_this.$store.state.url + '/Applets/applets_cash_pay', { //获取拉起支付所需要的参数
			num: data.sign_money,
			Arrivaltype: 3,
			sponsor_id: data.id
		}).then((res) => {
			if(!res) no(false)
			paypar = res.a
			orderId = res.b
			// gameMoney = data.sign_money
			// gameId = data.id
			gamebrowsers().then(function(res) {
				yes(res)
			})
		})
	})
}
//红包
let redPays = (vue, data) => {
	_this = vue
	var datas = {
		num: data.num,
		money: data.money,
		data: data.data,
		id: data.id,
		receive: data.receive,
		type: data.type,
		Arrivaltype: data.Arrivaltype
	}
	console.log(datas)
		return new Promise((yes, no) => {
			_this.$http.post(_this.$store.state.url + '/Moneytype/live_red_money', datas).then((res) => {
				if(!res) no(false)
				paypar = res.a
				orderId = res.b
				// gameMoney = data.sign_money
				// gameId = data.id
				redbrowsers().then(function(res) {
					yes(res)
				})
			})
		})
}
// 红包判断浏览器类型并做好准备工作
let redbrowsers = () => {
	return new Promise((yes, no) => {
		switch(Browsertype) {
			case 1: //微信浏览器
				redonBridgeReadys().then(function(res) {
					yes(res)
				})
				break
			default:
				break
		}
	})
}
// 红包支付微信内部支付
let redonBridgeReadys = () => {
	return new Promise((yes, no) => {
		WeixinJSBridge.invoke('getBrandWCPayRequest', paypar,
			function(res) {
				if(res.err_msg == 'get_brand_wcpay_request:ok') {
					redpaystate().then(function(res) {
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
export {
	pay,
	pays,
	gamePays,
	giftpay,
	redPays
}
//export {
//
//}