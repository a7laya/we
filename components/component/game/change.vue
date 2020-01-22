/**
* @Author: yinger
* @Date: 2019-05-30
* @Project: hdzg
*/
<template>
  <div class="buzhou">
    <x-header :title="title" :left-options="{backText:'',preventGoBack:true}" @on-click-back="onback"
              class="header step">
      <div :class="[checkbox.length != 0 ?  '' : 'on']" slot="right" @click="onnext">下一步</div>
    </x-header>
    <div class="title" >全国</div>
   

  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
    components: {XHeader},
    props: {
      url: String,
      title: String,
    },
    data () {
      return {
        list: null,
        checkbox: [],
        propData: null,
        allLength: null
      }
    },
    mounted () {
      let _this = this
      _this.$http.post(_this.$store.state.url + _this.url, {
        load: true,
      }).then(function (res) {
        if (!res) return
        _this.list = res
      })
    },
    computed: {
     
    },
    created () {
     
    },
    methods: {
    onnext(){
    	
    },
       onback () {
        this.$emit('onClickBack');
      },
      
    }
  }
</script>
<style scoped>
  .step.vux-header .vux-header-right {
    color: #FF7F00;
  }
  .title{
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    margin: 15px;
  }
  .cityCenter{
    height: 450px;
    overflow-y: auto;
  }
  li {
    display: inline-block;
    font-size: 16px;
    padding: 5px;
    background-color: transparent;
    margin: 5px 5px;
    cursor: pointer;
    border: 1px solid #ccc;
    width: 100px;
    border-radius: 2px;
    text-align: center;
  }

  .active {
    border: 1px solid #FF7F00;
    color: #FF7F00;
  }
</style>
