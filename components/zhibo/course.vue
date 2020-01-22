/** * @Author: feifei * @Date: 2019-05-31 * @Project: hdzg */
<template>
  <div >
  <x-header :title="'自助直播教程'" :left-options="{backText:''}" class="header"></x-header>
    <div>
    	<img src="/static/img/zhibo.jpg"/>
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
      
    }
  }
</script>

<style scoped>
  
  .goBack {
    position: absolute;
    width: 12px;
    height: 12px;
    border-style: solid;
    border-color: white;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 3px;
  }

  .title {
    font-size: 18px;
    text-align: center;
    line-height: 1.066667rem;
  }
</style>
