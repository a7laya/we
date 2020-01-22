<template>
	<!--
    	作者：laya
      类别：组件
    	时间：2020-01-15
    	描述：猜你喜欢商品列表
  -->
  <!-- 猜你喜欢 -->
  <div class="wrap">
    <div class="top">
      <div class="top-title">
        <img src="/static/img/guess-u-like.png" style="height: 20px;width: 20px;">
        <span style="font-size: 16px; color: #F88509; margin-left: 5px;">猜你喜欢</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="list">
      <div class="item" v-for="(like,index) in goods_like" :key='index'  @click="goodsDetails(like.goods_id)">
        <img class="img" :src="$store.state.website.website_domain_name + '/uploads/' + like.img_name" alt="">
        <div class="title">{{like.goods_name}}</div>
        <div class="price">￥{{like.shop_price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      components: {
      },
      data() {
          return {
            goods_like: [], // 商品列表
          }
      },
      props:{
        cat_id: {
          type: [Number, String],
          default: ''
        },
        limit: {
          type: [Number, String],
          default: 4
        },
        noRouter: {
          type: Boolean,
          default: false
        }
      },
      watch: {
          cat_id: {
              handler: function(val) {
                this.getLikeData(val,this.limit)
              },
              immediate: true
          },
          limit: {
              handler: function(val) {
                this.getLikeData(this.cat_id,val)
              },
              immediate: false
          }
      },
      methods: {
        // 进入猜你喜欢商品详情
        goodsDetails(goods_id) {
          var pageName = this.$route.path.split('/').pop()
          if(this.noRouter) {
            this.$emit('changeGoodID', goods_id)
            this.$toTop()
            return
          }
          this.$router.push({
            path: './shopdetails',
            query: {
              goods_id: goods_id
            }
          })
        },
        // 获取猜你喜欢的商品
        getLikeData(cat_id,limit) {
          var _this = this;
          _this.$http.post(_this.$store.state.url + "/Cargo/select_goods_like", {
              cat_id: cat_id,
              limit: limit
            })
            .then(function(res) {
              if (!res) return;
              _this.goods_like = res
            });
        },
      }
    }
</script>

<style scoped="">
.wrap {
  padding: 10px;
}
.top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 20px;
}
.top-title {
  position: relative;
  top: 10px;
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}
.line {
  border-bottom: #F88509 solid 1px;
  width: 200px;
}
.list {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.item {
  flex-shrink: 0;
  width: 160px;
  height: 185px;
  background-color: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.item .img {
  width: 160px;
  height: 130px;
  margin-bottom: 3px;
}
.item .title {
  font-size: 14px;
  font-weight: 500;
  color: #555555;
  padding: 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  width: 160px;
}
.item .price {
  font-size: 14px;
  color: #FF6565;
  padding: 0 10px;
}

</style>
