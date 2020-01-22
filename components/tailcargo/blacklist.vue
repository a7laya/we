<template>
  <div class="wrap">
    <vue-shop-header-order title="黑名单"></vue-shop-header-order>
    <div class="blacklist_list">
        <div v-for="(item,index) in list" :key="index" class="oneblack">
          <!-- <x-switch :title="item.nickname" v-model="item.value" @click="washWhite(item.index)"></x-switch> -->
              <flexbox>
                <flexbox-item :span="8"><div>{{item.mem_nickname}}</div></flexbox-item>
                <flexbox-item><div class="flex-demo" @click="washWhite(item.index, item.id)">取消黑名单</div></flexbox-item>
              </flexbox>
              <div class="line"></div>

        </div>
    </div>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem,XButton, XSwitch, Group, Divider  } from 'vux'
  import {
    VueShopHeaderOrder,

  } from "../component/";

  export default {
    components: {
      FlexboxItem,
      Flexbox,
      VueShopHeaderOrder,
      XSwitch,
      Group,
      XButton,
      Divider

    },
    data () {
      return {
        show:false,
        list:[]
      }
    },
    mounted() {
      this.getBlacklist();
    },

    methods: {
      washWhite(index, id) {
        var _this = this;
        _this.$http.post(_this.$store.state.url + 'Cargo/del_blacklist', {
            id: id
        }).then(function(res) {
          if(!res) return;
          console.log('res:',res)
          _this.list.splice(index, 1);
        })


      },

      getBlacklist() {
        var _this = this;
        _this.$http.get(_this.$store.state.url + "Cargo/blacklist_list")
        .then(function(res) {
          console.log("getUserInfo res:", res);
          if (!res) return;
          _this.list = res
        })

      }

    }
  }
</script>

<style>
  .wrap {
    background: #fff;
    font-size: 14px;
    color: #333;
  }
  .flex-demo {
    text-align: center;
    color: #fff;
    background-color: #bbb;
    border-radius: 4px;
    background-clip: padding-box;
  }
  .blacklist_list {
    width: 92%;
    margin: 0 auto;
    padding-top: 1.4rem;
  }
  .blacklist_list > div {
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #F1F1F1;
  }

  .oneblack {
    margin-top: 4px;
  }

  .line {
    border-top: #888 solid 1px;
    width: 100%;
  }

</style>
