<template>
  <div style="position: relative;" class="vuxSlider">
    <swiper loop :list="banner_list" :auto="true" :aspect-ratio="1/3" @on-index-change="onIndexChange"  ></swiper>
  </div>
</template>

<script>
  import {Swiper, Actionsheet, Group, XSwitch, Confirm, XInput} from 'vux'
  import VueCropper from './cropper'

  export default {
    components: {
      Swiper,
      Actionsheet,
      VueCropper,
      Confirm,
      XInput,
      Group
    },
    props: {
      type: undefined
    },
    data () {
      return {
        banner_index: 0,
        list: undefined,
        form: {
          show: false,
          id: undefined,
          txt: undefined,
          imgurl: undefined
        }
      }
    },
    watch: {
      propsAdd () {
        this.form.imgurl = this.propsAdd.imgurl
      }
    },
    computed: {
      propsAdd () {
        return this.$store.state.propsAdd
      },
      banner_list () {
        let list = []
        for (var i in this.list) {
          list[i] = {}
          list[i].url = this.list[i].ban_status == 0 ? 'javascript:' : this.list[i].lianjie //跳转的地址
          list[i].img = this.$store.state.website.website_domain_name + '/uploads/' + this.list[i].imgurl //banner图片
        }
        return list
      }
    },
    mounted () {
      var _this = this
			console.log(_this.type)
      _this.$http.post(_this.$store.state.url + '/index/advertisementImg', {
        load: true,
        param: _this.type || 1
      }).then(function (res) {
        if (!res) return
        _this.list = res
      })
    },
    methods: {
      onIndexChange (index) {
        this.banner_index = index
      },
    }
  }
</script>

<style scoped>


</style>
