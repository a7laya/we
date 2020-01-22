<template>
    <div class="footer">
    	<!--{{systemmsg}}-->
        <flexbox>
            <flexbox-item>
                <router-link to="/" tag="div"><i class="iconfont icon-shouye"></i>
                    <div class="txt">首页</div>
                </router-link>
            </flexbox-item>
            <flexbox-item>
                <router-link to="/fabu/index" tag="div"><i class="iconfont icon-faqi"></i>
                    <div class="txt">发布</div>
                </router-link>
            </flexbox-item>
            <flexbox-item>
                <router-link to="/shequ/index" tag="div"><i class="iconfont icon-tuandui"></i>
                    <div class="txt">社区</div>
                </router-link>
            </flexbox-item>
            <flexbox-item>
                <router-link to="/msg/index" tag="div">
                	<i class="iconfont icon-xinxi"></i>
                    <div class="txt">消息</div>
                    <badge v-show="num>0" :text="nums"></badge>
                    <!--<badge :text="systemmsg.no_du_num" ></badge>-->
                </router-link>
            </flexbox-item>
            <flexbox-item>
                <router-link to="/user" tag="div"><i class="iconfont icon-app_icons--"></i>
                    <div class="txt">个人中心</div>
                </router-link>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, Badge } from 'vux'
    export default {
        components: {
            Flexbox,
            FlexboxItem,
            Badge
        },
        data() {
            return {
                show: false,
                num:0,
                nums:0
            }
        },
        computed: {
			systemmsg() {
				return this.$store.state.systemmsg[this.$store.state.systemmsg.length - 1];
			},
		},
		watch: {
			num: {
				handler() {
					var _this = this;
					console.log(_this.num)
				},
				deep: true

			}
		},
        mounted() {
            var _this = this;
            setInterval(function(){
            	_this.num=_this.$store.state.noRead;
            if(_this.num<99){
            	_this.nums=_this.num;
            }else{
            	_this.nums="99+"
            }
            },500)
            
//        console.log(this.$store.state.systemmsg)
        },
        methods: {
            onIndexChange(index) {
                console.log($('.txt').css('fontSize'));
            }
            
        }
    }
</script>
<style scoped>
    .footer {
        height: 60px;
    }
    
    .footer .vux-flexbox {
        position: fixed;
        bottom: 0;
        background-color: #35495e;
        text-align: center;
        z-index: 2000;
        transition:bottom 0.5s;
        
    }
    
    .footer .vux-flexbox.class1{
    	bottom: -60px;
    }
    
    .footer .vux-flexbox-item {
        position: relative;
    }
    
    .footer i.iconfont {
        font-size: 20px;
        color: #fff;
    }
    
    .footer .txt {
        color: #fff;
        font-size: 12px;
    }
    
    .footer .vux-badge {
        position: absolute;
        top: 0;
        /*right: 15px;*/
    }
   
   
    
</style>