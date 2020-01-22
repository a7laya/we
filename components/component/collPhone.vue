<template>
	<div class="box_afc_phone">
		<div @click="showValue = true">
			<slot></slot>
		</div>
		<div v-transfer-dom>
	        <x-dialog v-model="collshow" :dialog-style="{background:'none'}" :hide-on-blur="true">
	            <div class="afc_phone class1">
	            	<div class="afc_box">
	            		<img src="/static/img/icon66.png"/>
	            	</div>
	            	<div class="afc_mt_15">
	            		<div class="afc_title">获取电话号码成功</div>
		            	<div class="afc_shoming">
		            		<span>本次扣费{{item.money/100}}个智汇币</span>
		            	</div>
		            	<div class="afc_butt_bg">
		            		<div class="button_max">
			            		<a :href="'tel:' + item.phone" class="txt">立即拨打</a>
			            	</div>
		            	</div>
	            	</div>
	            	<div class="afc_back" @click="collshow=false">
	                    <x-icon type="ios-close-outline" size="30"></x-icon>
	                </div>
	            </div>
	        </x-dialog>
	    </div>
		<div v-transfer-dom>
	        <x-dialog v-model="showValue" :dialog-style="{background:'none'}" :hide-on-blur="true">
	            <div class="afc_phone">
	            	<div class="afc_box">
	            		<img src="/static/img/icon33.png"/>
	            	</div>
	            	<div class="afc_mt_15">
	            		<div class="afc_title">选择拨打方式：</div>
		            	<div class="button_max" v-if="isbuttonshow[0]" @click="isniming">
		            		<span class="icon"><img src="/static/img/icon34.png"/></span>
		            		<span class="txt">匿名拨打</span>
		            	</div>
		            	<div class="button_max" v-if="isbuttonshow[1]" @click="isphone">
		            		<span class="icon"><img src="/static/img/cion35.png"/></span>
		            		<span class="txt">直接拨打</span>
		            	</div>
		            	<div class="afc_shoming">
		            		<strong>*</strong>
		            		<span>平台需要扣除一定数额的智汇币</span>
		            	</div>
	            	</div>
	            	<div class="afc_back" @click="showValue=false">
	                    <x-icon type="ios-close-outline" size="30"></x-icon>
	                </div>
	            </div>
	        </x-dialog>
	    </div>
	</div>
</template>

<script>
    import { XDialog, XButton, TransferDom } from 'vux'
    export default {
        directives: {
            TransferDom
        },
        components: {
            XDialog,
            XButton
        },
        data() {
            return {
            	collshow:false,
                showValue: false,
                item:{},
            }
        },
        props: {
            phone: undefined,
            isbuttonshow:Array, //多个按钮自由控制隐藏显示
            data:Object,
        },
        methods: {
            show() {
                this.value = !this.value
            },
            isphone(){
            	var _this = this;
            	_this.$http.post(_this.$store.state.url + '/Cooperation/member_phone', {
                    load:true,
                    ..._this.data
                }).then((res) => {
                    if(!res) return;
                    this.collshow = true;
                    this.showValue = false;
                    this.item = res;
                })
            },
            isniming(){
            	var _this = this;
            	_this.$http.post(_this.$store.state.url + '/Chat/userphone', {
                    load:true,
                    ..._this.data
                }).then((res) => {
                    if(!res) return;
                    this.collshow = true;
                    this.showValue = false;
                    this.item = res;
                })
            }
        }
    }
</script>

<style scoped>
	.afc_phone{
		border-radius: 5px;
	}
	.afc_phone.class1{
		background: none;
	}
	.afc_phone .afc_box{
		background: #c7ecff;
	}
	.afc_phone .afc_title{
		font-size: 17px;
		color: #333;
		line-height: 44px;
		margin-top: 5px;
		margin-bottom: 10px;
	}
	.afc_phone .afc_mt_15{
		background: #fff;
		border-radius: 5px;
		margin-top: -10px;
		position: relative;
		z-index: 2;
	}
	.afc_phone .button_max .icon{
		display: inline-block;
		width: 18px;
		vertical-align: middle;
		position: absolute;
		left: 33px;
		top: 13px;
	}
	.afc_phone .button_max{
		background: none;
		border-radius: 30px;
		border: 1px solid #3e80f9;
		line-height: 39px;
		margin-bottom: 14px;
		width: 240px;
		position: relative;
	}
	.afc_phone .button_max .txt{
		color: #3e80f9;
		font-size: 15px;
		display: inline-block;
		vertical-align: middle;
	}
	.afc_phone .afc_shoming{
		font-size: 12px;
		padding-bottom: 35px;
	}
	.afc_phone .afc_shoming strong{
		color: red;
	}
	.afc_phone .afc_shoming span{
		color: #666;
	}
	.afc_phone .afc_butt_bg{
		background: #50bcff;
		padding: 30px 0 10px 0;
		border-top-left-radius: 50%;
		border-top-right-radius: 50%;
	}
	.afc_phone .afc_butt_bg .button_max{
		border-color: #fff;
		width: 200px;
	}
	.afc_phone .afc_butt_bg .button_max .txt{
		color: #fff;
		font-weight: 800;
	}
	.afc_phone .afc_back{
		margin-top: 30px;
		fill:#fff;
	}
</style>