<template>
    <div>
        <div class="allconts rankpm">
            <div class="nav-box clearfix">
                <p class="nav-btn1" @click="nav_index=1" :class="[nav_index==1 ? 'nav-select' : 'nav-unselect']" style="width: 33%;">邀请榜</p>
                <p class="nav-btn2" @click="nav_index=2" :class="[nav_index==2 ? 'nav-select' : 'nav-unselect']" style="width: 33%;">打赏榜</p>
                <p class="nav-btn5" @click="nav_index=3" :class="[nav_index==3 ? 'nav-select' : 'nav-unselect']" style="width: 33%;">点赞榜</p>
            </div>
            <div class="totip">
                <ul class="rankcontent" v-if="list">
                	<template v-if="list.length">
	                    <li style="text-align:center;" v-if="nav_index==1"><em class="names" style="text-align:center;">总计</em>邀请<i class="iconfont men">{{list[0].sum_invitation}}</i>人</li>
	                    <li style="text-align:center;" v-if="nav_index==2"><em class="names" style="text-align:center;">总计</em>￥<i class="iconfont men">{{list[0].sum_money/100}}</i>元</li>
	                    <li style="text-align:center;" v-if="nav_index==3"><em class="names" style="text-align:center;">总计</em>点赞<i class="iconfont men">{{list[0].sum_ranking}}</i>次</li>
	                    <li v-for="(item,index) in list" :key="index">
	                        <span v-if="index<3"><img :src="'/static/img/zhibo/' + (index + 1) + '.png'"/></span>
	                        <span v-else>{{index+1}}</span>
	                        <img :src="$store.state.website.website_domain_name + '/uploads/' + item.headimgurl">
	                        <template v-if="nav_index==1"><em class="names">{{item.nickname || '暂无昵称'}}</em>邀请<i class="iconfont men">{{item.invitation}}</i>人</template>
	                        <template v-if="nav_index==2"><em class="names">{{item.nickname || '暂无昵称'}}</em>￥<i class="iconfont men">{{item.money/100}}</i>元</template>
	                        <template v-if="nav_index==3"><em class="names">{{item.nickname || '暂无昵称'}}</em>点赞<i class="iconfont men">{{item.fabulous}}</i>次</template>
	                    </li>
                    </template>
                    <div v-else style="text-align: center;">
	                    <load-more :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more>
	                </div>
                </ul>
                <div v-else style="text-align: center;">
                    <!--<inline-loading></inline-loading>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { InlineLoading,LoadMore} from 'vux'
    export default {
        components: {
            InlineLoading,
            LoadMore
        },
        data() {
            return {
                nav_index: 1,
                list: null,
            }
        },
        watch: {
            nav_index: {
                handler: function(val) {
                	this.list = null;
                    this.ajax();
                },
                immediate: true
            }
        },
        methods: {
            ajax() {
                var _this = this;
                _this.$http.post(_this.$store.state.url + '/live/Ranking', {
                    'load': false,
                    id: _this.$route.params.id,
                    type: _this.nav_index
                }).then((res) => {
                    if(!res) return;
                    _this.list = res;
                })
            }

        }
    }
</script>

<style scoped>
    .clearfix {
        width: 80%;
        margin: 0 auto;
    }
    
    .allconts {
        background-color: #fff;
        height: 100%;
        padding: 0px 5px;
        line-height: 20px;
        overflow: scroll;
        overflow-x: hidden;
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
    
    .nav-unselect {
        box-shadow: 0 0 1px #31ac84;
        color: #31ac84;
    }
    
    .nav-select {
        background: #31ac84;
        color: #fff;
        box-shadow: 0 0 1px #31ac84;
    }
    
    .totip li {
        width: 90%;
        margin: 10px auto;
        height: 50px;
        line-height: 47px;
        background-color: #fff;
        border-radius: 5px;
        font-size: 15px;
    }
    
    .names {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 115px;
        font-weight: normal;
        font-style: normal;
        float: left;
    }
    
    .totip li .men {
        color: #31ac84;
        border-radius: 5px;
        padding: 1px;
        font-size: 14px;
    }
    
    .totip li span {
        float: left;
        width: 10%;
        text-align: center;
        margin: 8px 10px 0 0;
    }
    
    .totip li>img {
        float: left;
        margin: 8px 10px 0 0;
        border-radius: 5px;
        width: 35px;
        height: 35px;
    }
    
    .names {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 120px;
        font-weight: normal;
        font-style: normal;
        float: left;
    }
</style>