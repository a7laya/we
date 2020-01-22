import Vue from 'vue'
import Vuex from 'vuex'
import http from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {

		// url: 'http://api2.zhyook.com/', //服务器地址? 测试
		   // url: 'http://api.zhyook.com/', //服务器地址 正式
       url: '/API', //服务器地址 本地
		// url: 'http://api.zhyook.com/', //服务器地址 正式
        socketUrl: 'ws://47.92.161.131:8282', //socket服务器地址
        cid: undefined, //sockID
        token: undefined || 0, //用户id
        // website: undefined, //网站总配置
        user: undefined,
        userPos: undefined, //用户省份位置
        isTrue: false, //等待配置文件加载
        codeTime: 60, //全局验证码倒计时
        bingPhone:false,//全局绑定手机号隐藏/显示
        chat: {
            list: {},
            data: {}
        },
        router: undefined, //路由位置
        livechat:[],//直播间聊天
        systemmsg:[],//系统通知
        is_du: 1, //已读
        propsAdd:'',//爷孙组件交换数据使用
        liveStatus:1,//直播间直播的状态1未直播，2直播中，3直播结束
        erweima:false,//关注公众号弹出页面开关
        upuser:false,//完善个人信息全局控制
        loading:false,//全局加载中开关
        delayLoad:false,//load延迟显示使用
        comment:{
        	show:false,
        	data:{},
        },//评价弹出框使用
        successStatus:false,
        num:0,
        Msgnum:0,
        noRead:'',
        data_list:[],
        aaa: [],


    },



    mutations: {


    	loadingOFFON(state,res) { //加载中控制
    		if(state.delayLoad){ //清楚定时器
    			clearTimeout(state.delayLoad);
    		}
    		if(res){
    			state.delayLoad = setTimeout(() => { //不推荐写法
    				Vue.set(state,'loading',res);
	            }, 500)
    		}else{
    			state.delayLoad = setTimeout(() => { //不推荐写法
    				Vue.set(state,'loading',res);
	            }, 100)
    		}
    	},
    	liveStatus(state, res) {//改变直播状态
            Vue.set(state, 'liveStatus', res);
        },
        itemJian(state) {},
        codeTime(state) { //验证码倒计时操作函数
            state.codeTime--
        },
        user(state, res) {
            state.token = res.mem_id;
            Vue.set(state, 'user', res);
        },
        livechat(state, res){ //直播间聊天数据
        	if(state.livechat.length > 300){
        		state.livechat.splice(state.livechat.length-1, 1);
        	}
        	state.livechat.push(res);
        	if(res.msg.type == 'gift'){
        		var index = state.livechat.length-1;
        		setTimeout(function(){
        			Vue.set(state.livechat[index],'isAnimation',true)
        		},10)
        		setTimeout(function(){
        			Vue.set(state.livechat[index],'isAnimation',false)
        		},3000)
        	}
        },
        aaa(state,res) {
           Vue.set(state, 'aaa', res);
        },
        modifyLiveRed(state, res){ //修改直播间红包状态
        	for(var i in state.livechat){
        		if(state.livechat[i].redid == res.redid){
        			Vue.set(state.livechat,i,res)
        		}
        	}
        },
        removelivechat(state, res){ //清空直播间聊天
        	state.livechat.push(res);
        	Vue.set(state,'livechat',[]);
        },
        erweima(state){ //关注公众号弹窗显示
        	Vue.set(state,'erweima',true);
        },
        removeerweima(state){ //关注公众号弹窗隐藏
        	Vue.set(state,'erweima',false);
        },
        systemmsg(state, res) { //系统通知
            var index = res.for;
            var chat = state.systemmsg[index] || [];
            if(state.router == "/msg/system/" + index){
            	res.is_du == 1;
            }else{
            	if(!res.is_du) state.is_du = 0;
            }
            Vue.set(state.systemmsg, index.toString(), 'systemmsg' || []);
            state.systemmsg.push(res);
        },
        chat(state, res) { //聊天接收数据
//      	console.log(res)
            var index = res.for == state.user.mem_id ? res.to : res.for
            var chat = state.chat.list[index] || [];
            Vue.set(state.chat.list, index.toString(), chat || []);
            state.chat.list[index].push(res);
            if(state.chat.data[index]) {
                if(state.chat.data[index].is_du) { //防止位空
                    if(state.router == "/msg/tcw/" + index) { //是否正在看消息
                        state.chat.data[index].is_du = 1;
                        http.post(state.url + '/Chat/alreadyRead', { //通知服务器改变已读状态
		                    load: false,
		                    uid: index
		                })
                    } else {
                        if(res.to == state.user.mem_id) { //是否是本人发送消息
                        	if(!res.is_du){
                        		state.chat.data[index].is_du = 0;
                            	state.is_du = 0;
                        	}
                        }
                    }
                }

            }
        },
        numStatus(state,res){
        	console.log(res)
        },
        removechat(state){
        	//重连后防止重复数据
        	Vue.set(state.chat,'data',{});//整理后的聊天列表展示数据
        	Vue.set(state.chat,'list',{});//聊天数据
        	Vue.set(state,'systemmsg',[]);//系统通知
        	Vue.set(state,'livechat',[]);//直播间聊天数据
        },
        chatUser(state, res) { //获取聊天用户信息
            var index = res.id;
            Vue.set(state.chat.data, res.id.toString(), res);
            if(state.chat.data[index].is_du != undefined) { //防止位空
                if(state.chat.data[index].is_du) {} else {
                    state.is_du = 0;
                }
            }
        },
        propsAdd(state, res) {
            var index = res.id;
            Vue.set(state, 'propsAdd', res);
        },

    },





    actions: {
        codeTime({ //验证码倒计时
            commit
        }) {
            setTimeout(() => {
                commit('codeTime')
                if(this.state.codeTime == 0) {
                    this.state.codeTime = 60;
                    return;
                } else {
                    this.dispatch('codeTime');
                }
            }, 1000)
        },
        incrementAsync({
            commit
        }) {
            setInterval(() => {
                commit('itemJian')
            }, 1000)
        },
        getUser({
            commit,
            state
        }) {
            var _this = this;
            http.post(state.url + '/Homecenter/login', {
                load: true,
            }).then((res) => {
                if(!res) return;
                commit('user', res);
            })
        },
        chatUser({
            commit,
            state
        }, uid) {
            var _this = this;
            var data = {};
            data.id = uid;
            commit('chatUser', data);
            setTimeout(function() {
                http.post(state.url + '/Homecenter/getName', {
                    load: true,
                    uid: uid
                }).then((res) => {
                    if(!res) return;
                    var data = {};
                    data.nickname = res.mem_nickname;
                    data.headimgurl = res.mem_headimgurl;
                    data.id = uid;
                    if(state.router == "/msg/tcw/" + uid) { //消息已读
                        data.is_du = 1;
                    } else {
                        digui(1);
                        function digui(num) {
                            var forUser = state.chat.list[uid][state.chat.list[uid].length - num]; //单条数据
                            if(forUser.to == state.user.mem_id) { //是否是自己
                                if(!forUser.is_du) {
                                    data.is_du = 0;
                                } else {
                                    data.is_du = 1;
                                }
                                return;
                            } else {
                                if(state.chat.list[uid].length == num) { //是否查到第一条数据了
                                    data.is_du = 1;
                                    return;
                                } else {
                                    digui(++num)
                                }
                            }
                        }
                    }
                    commit('chatUser', data);
                })
            }, 100)
        }
    }
})
