<template>
  <div style="position: relative;" class="vuxSlider">
    <swiper loop :list="banner_list" :auto="true" :aspect-ratio="9/16" @on-index-change="onIndexChange"  ></swiper>
    <div @click="go()" style="position: absolute;left: 0;bottom: 0;width: 100%;z-index: 1;height: 40px;"></div>
    <confirm :title="'上传广告图'" @on-confirm="onConfirm" v-model="form.show">
      <vue-cropper :autoCropWidth="320" :autoCropHeight="180">
        <i class="iconfont icon-tsh-copy" v-if="!form.imgurl" style="font-size: 40px;"></i>
        <img class="showimg" :src="$store.state.website.website_domain_name + '/uploads/' + form.imgurl" alt="" v-else/>
      </vue-cropper>
    </confirm>
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
        show3: false,
        editId: null,
        menus3: {
          menu1: '竞价',
          menu2: '上传广告图'
        },
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
          if (this.list[i].ban_status == 1) {
            list[i].title = '我的广告' //title
          }
          if (this.list[i].mem_id == this.$store.state.token && this.list[i].ban_status == 2) {
            list[i].title = '编辑我的广告' //title
          }
//        list[i].fallbackImg = '/static/img/ba7f288f80a70e850e4dc449167413a.png' //备用图片
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
				console.log( _this.list)
      })
    },
    methods: {
      onIndexChange (index) {
        this.banner_index = index
      },
      go () {
        if (this.banner_list[this.banner_index].title == '上传广告图/竞价') {
          this.editId = this.list[this.banner_index].id
          this.show3 = true
          return
        }
        if (this.banner_list[this.banner_index].title == '编辑我的广告') {
          this.editId = this.list[this.banner_index].id
          this.form.show = true
          return
        }
        if (this.banner_list[this.banner_index].title == '我的广告') {
          this.$router.push('/jingjia/index/' + this.list[this.banner_index].id)
          return
        }
      },
      onConfirm () {
        var _this = this
        _this.$http.post(_this.$store.state.url + '/index/addimg', {
          load: false,
          id: _this.editId,
          imgurl: _this.form.imgurl,
        }).then(function (res) {
          if (!res) return
          location.reload()
        })
      }
    }
  }
</script>

<style scoped>
	.vux-swiper-desc {
  /* width: 100px;
  height: 30px;
  line-height: 25px;
  padding: 0!important;
  background: #fff;
  opacity:0.8;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 10px!important;
  margin-left: 10px!important; */
  font-size: 15px!important;
   background: url(../../../static/img/123456.png) no-repeat 0!important;
  background-size: 110px!important;
  background-position-y: 18px!important;
  background-position-x: 4px!important;
  opacity: 0.8!important;
}
/* .vux-slider {
  height: 150px!important;
}
.vux-swiper {
  height: 150px!important;
} */
</style>
