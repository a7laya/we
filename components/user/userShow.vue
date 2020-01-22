<template>
    <div class="usershow" v-if="item">
        <x-header :title="(item.mem_nickname || '暂无昵称') + '的资料'" :left-options="{backText:''}">
            <div slot="right">
                <vue-header-nav></vue-header-nav>
            </div>
        </x-header>
        <div class="usershow_title">
            <div class="usershow_titletop"></div>
            <div class="usershow_titlebott"></div>
            <div class="usershow_titlecen">
                <div class="usershow_titlecen_main">
                    <div class="usershow_title_heimg">
                    	<!--<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl"/>-->
                    	<img :src="$store.state.website.website_domain_name + '/uploads/' + item.mem_headimgurl" />
                    </div>
                    <div class="usershow_title_hename">
                        <div class="usershow_title_hename_name">
                            <span>{{item.mem_nickname || '暂无昵称'}}</span>
                            <i class="iconfont" v-if="item.mem_sex!=2" :class="[item.mem_sex ? 'icon-nan1-copy' : 'icon-nv']"></i>
                        </div>
                        <div class="usershow_title_hename_gongs">
                            {{item.mem_company || '尚未填写单位名称'}}
                        </div>
                    </div>
                </div>
                <div class="usershow_titlecen_fen">
                    <div class="usershow_titlecen_fen_dis">
                        <div class="usershow_titlefen1">
                        	<strong>{{item.mem_score1}}</strong>
                        	<span>分</span>
                        </div>
                        <div class="usershow_titlefenn1">质量</div>
                    </div>
                    <div class="usershow_titlecen_fen_dis">
                        <div class="usershow_titlefen1"><strong>{{item.mem_score2}}</strong>
                        	<span>分</span></div>
                        <div class="usershow_titlefenn1">态度</div>
                    </div>
                    <div class="usershow_titlecen_fen_dis">
                        <div class="usershow_titlefen1"><strong>{{item.mem_score3}}</strong>
                        	<span>分</span></div>
                        <div class="usershow_titlefenn1">效率</div>
                    </div>
                </div>
            </div>
        </div>
        <group>
            <cell :title="'所在城市'">
                <span>{{item.mem_region}}</span>
            </cell>
            <cell :title="'职位'">
                <span>{{item.mem_position || '尚未填写'}}</span>
            </cell>
            <cell :title="'单位主体'">
                <span>{{item.mem_subject || '尚未填写'}}</span>
            </cell>
            <cell :title="'所属行业'">
                <span>{{item.mem_hangye || '尚未填写'}}</span>
            </cell>
            <!--<cell :title="'找TA聊聊'"  v-if="memid!=routeId" >
                <span class="arrow">
                	<img src="../../../static/img/jt.png" alt=""  />
                </span>
            </cell>-->
        </group>
        <group v-if="imglist.length!=0">
        	<cell :title="'个人/企业形象照'"></cell>
	        <div class="usershow_bott_banner">
	        	<swiper :list="imglist" :auto="true" :aspect-ratio="9/16"></swiper>
	        </div>
        </group>
        <!--<div @click="chat()" class="chat" v-if="memid!=routeId">找TA聊聊</div>-->
        <vue-shareit :title="fenxiang.title" :dese="fenxiang.dese" :link="fenxiang.link" :imgUrl="fenxiang.imgUrl"></vue-shareit>
    </div>
</template>

<script>
    import { XHeader, Group,Cell,Swiper} from 'vux'
    import { VueHeaderNav,VueShareit} from '../component'
    export default {
        components: {
            Group,
            Cell,
            XHeader,
            VueHeaderNav,
            Swiper,
            VueShareit
        },
        data() {
            return {
                item: null,
                memid:'',
                routeId:'',
                
            }
        },
        computed:{
        	imglist(){
        		let list=[];
        		var _this = this;
        		if(_this.item){
        			_.each(_this.item.mem_personalimg,(d) => {
        				list.push({img:_this.$store.state.website.website_domain_name + '/uploads/' + d})
        			})
        		}
        		return list
        	},
        	user() {
				return this.$store.state.user;
			},
			fenxiang(){
            	return {
            		title: '智汇优库-' + this.$route.meta.title,
					dese: this.$store.state.user.mem_nickname + '邀您关注弱电智能化互动平台，秒得五十块！',
					imgUrl: '/static/logo.png',
					link: '/user/index'
            	}
            }
        },
        mounted() {
            var _this = this;
            _this.$http.post(_this.$store.state.url + '/Homecenter/getMemberInfo', {
                'load': false,
                id: _this.$route.params.id
            }).then((res) => {
                if(!res) return;
                _this.item = res;
            })
            _this.memid=this.$store.state.user.mem_id;
            _this.routeId= _this.$route.params.id;
            console.log(_this.memid, _this.routeId)
        },
          methods:{
          	chat(){
          		var _this=this;
          		_this.$router.push('../../msg/tcw/' + _this.$route.params.id);
          	}
          }
    }
</script>

<style scoped>
    .usershow_title {
        position: relative;
        background: #fff;
    }
    
    .usershow_titletop {
    	height: 105px;
        background: #35495e;
    }
    
    .usershow_titlebott {
        background: #fff;
        height: 105px;
    }
    .usershow_bott_banner{
    	width: 320px;
    	margin: 0 auto;
    	border-radius: 5px;
    	overflow: hidden;
    	margin-bottom: 15px;
    }
    .usershow_titlecen{
    	position: absolute;
    	top: 10px;
    	background: #fff;
    	border-radius: 5px;
    	box-shadow: 0px 1px 15px 0 rgba(0,0,0,0.1);
    	width: 345px;
    	overflow: hidden;
    	margin-left: 15px;
    	padding: 20px 0 15px 0;
    	text-align: center;
    }
    .usershow_title_heimg{
    	display: inline-block;
    	vertical-align: middle;
    	width: 73px;
    	height: 73px;
    	border-radius: 50%;
    	overflow: hidden;
    }
    .usershow_title_hename{
    	display:inline-block;
    	vertical-align: middle;
    	margin-left: 20px;
    	text-align: left;
    }
    .usershow_title_hename_name {
    	position: relative;
    }
    .usershow_title_hename_name > span{
    	font-size: 17px;
    	color: #000;
    	padding-right:20px ;
    }
    .usershow_title_hename_name i{
    	position: absolute;
    	top: 0;
    	right: 0;
    	font-size: 12px;
    }
    .usershow_title_hename_name i.icon-nv{
    	color: #ff3ec9;
    }
    .usershow_title_hename_name i.icon-nan1-copy{
    	color: #75b9eb;
    }
    .usershow_title_hename_gongs{
    	font-size: 14px;
    	color: #666666;
    }
    .usershow_titlecen_fen{
    	margin-top: 20px;
    }
    .usershow_titlecen_fen .usershow_titlecen_fen_dis{
    	display: inline-block;
    	margin: 0 25px;
    	text-align: left;
    }
    .usershow_titlecen_fen_dis strong{
    	font-size: 18px;
    }
    .usershow_titlecen_fen_dis span{
    	font-size: 12px;
    }
    .chat{
    	background:  #00a0ea;
    	position: fixed;
    	bottom: 20px;
    	left: 20%;
    	right: 20%;
    	border-radius: 10px;
    	font-size: 15px;
    	text-align: center;
    	color: #FFFFFF;
    	padding: 5px 0px;
    }
</style>