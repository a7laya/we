<template>
  <div style="padding-bottom:1.2rem;">
    <div class="header-search">
      <div class="search-content">
        <div class="fanhui" @click="back(type,ids)"><img src="/static/img/fanhui.png"></div>
        <div class="searchbox">
          {{name}}
        </div>

      </div>
    </div>

  <!-- <div class="header-search" v-if="type==2">
      <div class="search-content">
        <div class="fanhui" @click="back(type,ids)"><img src="/static/img/fanhui.png"></div>
        <div class="searchbox">
          {{name}}
        </div>

      </div>
    </div>

  <div class="header-search" v-if="type==3">
        <div class="search-content">
          <div class="fanhui" @click="back(type,ids)"><img src="/static/img/fanhui.png"></div>
          <div class="searchbox">
            {{name}}
          </div>

        </div>
      </div> -->


  </div>
</template>

<script>
  export default{
    components:{},
     props:{
       name:String,
       type:Number,
       ids:undefined,
     },
    data(){
      return{
          types :'',
          urls:'',
          formData:'',
      }
    },
    mounted() {
   this.urls = new URL(window.location.href)
   console.log(this.urls,2)
    },
      methods:{
        back(type,ids){
         if(type == 1){
           // this.urls = new URL(window.location.href)
           // console.log(this.urls)
           if(this.urls.searchParams.get("uidkey")){
             this.$router.push('/vote/enrolist/' + ids +'/' +'#link')
           }else{
             if(this.urls.hash){
               this.$router.push('/index')
             }else{
               this.$router.go(-1)
             }
             
           }
         }
         else if(type == 2){
             if(this.urls.searchParams.get("uidkey")){
               // console.log('/vote/enrolist/'+ ids)
               this.$router.push('/vote/list/'+ ids + '/' + '#link')
             }else{
                  if(this.urls.hash){
                    this,$router.push('/index')
                  }else{
                    this.$router.go(-1)
                  }
             }
         }
        },
      },
  }
</script>

<style scoped>
  .header-search {

    width: 100%;
    z-index: 11;
    height: 45px;
    color: #fff;
    font-size: 16px;
    position: fixed;

  }

  .search-content{
    line-height: 45px;
    height: 45px;
    background: rgba(53, 73, 94, 1);
    text-align: center;

  }

  .fanhui{
  	width:30px;
  	height:45px;
  	line-height:45px;
  	float:left;
  	display: flex;
  	align-items: center;
  }
  .fanhui img{
  	height:30px;
  	width:100%;
  }

  .searchbox{
  	display: inline-block;
  	width:225px;
  	position: relative;
  	overflow: hidden;
  	text-overflow:ellipsis;
  	white-space: nowrap;
  }
</style>
