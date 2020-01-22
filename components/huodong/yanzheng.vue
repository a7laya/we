<template>
	<div class="yanzheng">
		<x-header :title="'入场验证'" :left-options="{backText:'',showBack:false}" class="header"></x-header>
		<!---->
		<div class="yanzhengma">
			<input type="text" placeholder="请输入入场验证码" v-model="code"/>
             <div @click="yanzheng()">验证</div>
		</div>
		<div class="detail" v-if="huodong">
			<div class="biaoti">{{info.act_ztitle}}</div>
			<div class="info">
				<div> <span>地址:</span>
					<span style="word-break: break-all;">{{info.act_region}}{{info.act_address}}</span>
				</div>
			</div>
			<div class="info">
				<div>票价:</div>
				<div>{{info.act_total_cost/100}}元</div>
			</div>
			<div class="info">
				<div v-if="info.act_total_cost>0">支付方式:线下支付</div>
				<div v-else="">支付方式:免费支付</div>
			</div>
			<div class="info jiben">
				<div>联系人:</div>
				<div>{{info.sign_name}}</div>
			</div>
			<div class="info">
				<div>手机号:</div>
				<div>{{info.sign_phone}}</div>
			</div>
		</div>
		<div class="tishi">
			<div>温馨提示:</div>
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. 
			</div>
		</div>
    </div>

</template>

<script>
	import { XHeader} from 'vux';
	
	export default {
		
		components: {
			XHeader
			
		},
		data() {
			return {
				code:'',
				huodong:false,
				info:''
			}
		},
		mounted() {
			var _this = this;
//			_this.detail();
		},
		methods: {
			yanzheng(){
				var _this=this;
				if(!_this.code){
					msg("请输入入场验证码");
					return;
				}
				var data={
					load: true,
					sign_actid:_this.$route.params.id, 
					sign_code:_this.code,
				
				}
				
				console.log(data);
				_this.$http.post(_this.$store.state.url + '/activityb/act_code', data
				).then((res) => {
					_this.info=res;
					if(_this.info==''){
						msg("验证失败")	
					}else{
						
						_this.huodong=true;
					}
				
					
				})
			}
		}
	}
</script>

<style scoped="">
	.yanzheng{
		background: url(../../../static/img/yanzheng.png);
		background-size: 100% 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.header{
	background: none;
	}
	.yanzhengma{
		background:white;
		border-radius: 20px;
	    display: flex;
	    align-items: center;
	    justify-content:space-between;
	    width: 80%;
	    margin: 50px auto 20px;
	}
	.yanzhengma input{
		margin-left: 20px;
		width: 80%;
	}
	.yanzhengma div{
		text-align: center;
		width: 20%;
		background: #FFA657;
		color: white;
		padding: 10px 20px;
        border-radius: 20px;
        
        
	}
	.detail{
		background: #FFFFFF;
		border-radius: 8px;
		width: 80%;
		margin:0 auto 20px;
		padding: 25px 20px;box-sizing: border-box;
	}
	.biaoti{
		color: #000000;
		font-size: 15px;
		margin-bottom: 15px;
	}
	.tishi{
		width: 80%;
		margin: 0 auto;
		color: #FFFFFF;
	}
	.jiben{
		border-top: rgba(204,204,204,1) 1px solid;
		padding-top: 10px;
	}
	.info{
		display: flex;
		margin-bottom: 10px;
	}
</style>