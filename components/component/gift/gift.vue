<template>
    <div v-show="show">
        <div style="position: fixed; top: 0;left: 0;bottom: 0;right: 0;" @click="show = false"></div>
        <div class="layui-m-layerchild layim-layer layui-m-anim-scale" style="position: absolute; top: -210px;bottom: auto;">
            <div class="layui-m-layercont" style="padding: 0;text-align: left;">
                <ul class="layui-layim-face">
                    <li class="shang" v-for="(item,zindex) in list" :class="[zindex==index ? 'on' : '']" @click="index = zindex" :key="zindex" style="width: 25%;">
                        <img :src="$store.state.website.website_domain_name + '/uploads/' + item.reward_img">
                        <div class="txttxt">{{item.reward_money/100}}</div>
                        <div class="txttxt">{{item.reward_name}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="num_box_button cl" style="position: fixed;background: rgb(238, 238, 238); padding: 5px 0;width: 100%; height: 40px;left: 0;bottom: 0;" v-if="index!=-1">
            <div style="padding: 10px;float: left;font-size: 14px;">向主播送出<span style="color: #d20404;"><input style="width: 50px;text-align: center;" type="number" v-model="num" /></span>个<span style="color: #04BE02;">{{list[index].reward_name}}</span></div>
            <div style="padding: 10px;float: right; background: #5FB878; color: #fff;border-radius: 5px;margin-right: 10px;" @click="form()">发送</div>
        </div>
    </div>
</template>

<script>
    import { TransferDom } from 'vux'
    export default {
        directives: {
            TransferDom
        },
        props: {
            value: undefined,
        },
        data() {
            return {
                list: undefined,
                show: false,
                index: -1,
                num: 1
            }
        },
        watch: {
            show(val) {
                this.$emit('input', val);
            },
            value: {
                handler: function(val) {
                    this.show = val
                },
                immediate: true
            }
        },
        mounted() {
            this.ajax();
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
           form() {
				var _this = this;
				if(isWeiXin() == 1 && !_this.user.mem_phone) {
					_this.$store.state.bingPhone = true;
					return;
				}
				if(!(/(^[1-9]\d*$)/.test(_this.num))) { //个数是否是正整数
					msg('请输入正确个数');
					return;
				}
				var money = _this.num * _this.list[_this.index].reward_money;
				var data = {
					'load': false,
					reward_id: _this.list[_this.index].reward_id,
					number: _this.num,
					live_id: _this.$route.params.id,
					money: money,
					Arrivaltype: 4,

				}
				
				_this.$pay.giftpay(this, data).then((res) => {
					if(!res) return;
					_this.show=false;
				})
			},
            ajax() {
                var _this = this;
                _this.$http.post(_this.$store.state.url + '/Live/reward_type', {
                    'load': false,
                }).then((res) => {
                    if(!res) return;
                    _this.list = res;
                })
            },
        }
    }
</script>

<style scoped>
    .layui-layim-face li img {
        /*width: 100%;*/
       width: 30px;
        height: auto;
        display: block;
        margin: 0 auto;
    }
    
    .txttxt {
        font-size: 13px;
    }
    
    .shang.on {
        border: 1px solid #5fb878;
        border-radius: 5px;
    }
</style>