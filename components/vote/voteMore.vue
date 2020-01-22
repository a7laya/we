<template>
  <div class="wrap">
   <div style="width:95%;margin:10px auto 0 auto">
     选手详情：<p v-html="SelectInfo.select_remark"></p>
   </div>
   <div class="tricketMount">
     <div style="margin-bottom:20px">
     	<div class="sum" v-for='(item,index) in vote_list' :key="index">
     		<div class="sum-frist">
     			<div class="sum-tu" v-if="3>=item.v_order"><span>{{item.v_order}}</span></div>
     			<div class="sum-tus" v-else><span>{{item.v_order}}</span></div>
     			<div class="sum-title">{{item.title_s}}</div>
     		</div>
     		<div class="sum-last">{{item.s_id}}票</div>
     	</div>
   </div>
  </div>
</template>

<script>

export default{

    data(){
      return{
        SelectInfo:'',
        vote_list: '',
      }
    },
    mounted(){
       this.voteSelectInfo()
    console.log(this.$route.params.time)
     const timer = setInterval(() => {
    			this.time = this.SelectInfo.start_time - (Date.parse(new Date()) / 1000);
    			this.signEnd = this.$route.params.time - (Date.parse(new Date()) / 1000);
    		}, 100);
    		this.times = Date.parse(new Date()) / 1000;
    		// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    		this.$once('hook:beforeDestroy', () => {
    			clearInterval(timer);
    		})
     },
      methods:{
        loaddata(res) {
        	var _this = this;
        	_.each(res, function(e) {
        		_this.vote_list = _this.vote_list || [];
        		_this.vote_list.push(e);
        	})
        }
      }
}
</script>
<style>
  .wrap{
    margin-top:10px;
    /* height:80px; */
    height:7rem;
    background:#fff;
    border-radius: 5px;
    color:#999999;
    font-size:14px;
    /* max-height:80px; */
    max-height: 7rem;
    overflow-y:scroll;
    word-wrap: break-word;
    margin-bottom:50px;
  }
</style>
