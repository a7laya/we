/** * @Author: feifei * @Date: 2019-05-31 * @Project: hdzg */
<template>
  <div>
  <header class="header vux-header" @click="goback()">
  	<div class="goBack"></div>
       <div class="title">赛事教程</div>
  </header>
    <div>
    	<img src="/static/img/game.jpg"/>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
   
    components: {
      XHeader
    
    },
    data () {
      return {
      
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    mounted () {
    },
    created () {
    },
    methods: {
      goback(){
      	let _this=this;
      	let type =_this.$route.query.type;
      	if(type==1){
      		_this.$router.push('/game/index');
      	}else{
      		history.go(-1);
      	}
      }
    }
  }
</script>

<style scoped>
  .header{
 	 position: relative;
    padding: 0.08rem 0;
    box-sizing: border-box;
    background-color: #35495e;
  }
  .goBack {
    position: absolute;
    width: 12px;
    height: 12px;
    border-style: solid;
    border-color: white;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 15px;
    left: 15px;
  }

  .title {
    font-size: 18px;
    text-align: center;
    line-height: 1.066667rem;
    color: white;
  }
</style>
