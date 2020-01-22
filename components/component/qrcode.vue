<template>
	<!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：生成二维码，
    -->
	<div>
		<div v-if="str">{{str}}</div>
		<img v-if="src" :src="src" />
	</div>
    
</template>

<script>
    import QRCode from 'qrcode'
    export default {
        data() {
            return {
                src: null,
            }
        },
        props: {
            url: String,
            str:String,
        },
        watch:{
        	url: {
                handler: function(val) {
                    this.useqrcode();
                },
                immediate: true
            }
        },
        methods: {
            useqrcode() {
            	var _this = this;
                QRCode.toDataURL(_this.url,{margin:1,logoPath:''}).then(url => {
                    _this.src = url;
                }).catch(err => {
                    _this.src = null;
                })
            }
        }
    }
</script>

<style>

</style>