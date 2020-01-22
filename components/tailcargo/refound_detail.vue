<template>
  <div style="font-size: 65%;">
    <shop-header-nav :showLocation="false">退款详情</shop-header-nav>
    <div style="height: 45px;"></div>
    <div class="bg-danger w-100 d-flex j-center a-center" style="height: 49px;font-size: 0.6rem;">
      
    </div>
  </div>
</template>

<script>
  import shopHeaderNav from '../component/shopHeaderNav.vue'
  export default {
    components:{shopHeaderNav},
    data(){
      return {
        order_id: false,
        role: false,
      }
    },
    computed: {
      api(){
        return 1
      }
    },
    created() {
      var _this = this
      var query = this.$route.query
      if (!query) return
      _this.order_id = query.order_id
      _this.role = query.role
      console.log('_this.order_id:',_this.order_id);
      console.log('_this.role:',_this.role);
    }
  }
</script>

<style>
</style>
