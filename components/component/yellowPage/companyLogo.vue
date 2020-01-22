<template>
    <span style="display: inline-block;vertical-align: middle;">
        <span class="pos" :width="autoCropWidth/2" :height="autoCropHeight/2">
        	<input class="inp_fil" @change="show($event)" type="file"/>
        	<slot></slot>
        </span>
        <div v-transfer-dom v-show="hshow" style="position: fixed;left: 0;top: 0;width: 100%;z-index: 9999;">
            <x-header
              :left-options="{backText:'',preventGoBack:true}"
              @on-click-back="hide">
              <span @click="file"
                     slot="right"
                     class="button">使用</span>
            </x-header>
            <div style="position: fixed;width: 100%;height: 100%;background: #000;">
                <vue-cropper ref="cropper"
                             :enlarge="enlarge"
                             :img="option.img"
                             :output-size="option.size"
                             :output-type="option.outputType"
                             :info="false"
                             :full="option.full"
                             :can-move="option.canMove"
                             :can-move-box="option.canMoveBox"
                             :fixed-box="option.fixedBox"
                             :original="option.original"
                             :auto-crop="option.autoCrop"
                             :auto-crop-width="autoCropWidth"
                             :auto-crop-height="autoCropHeight"
                             :center-box="option.centerBox">
                </vue-cropper>
            </div>
        </div>
    </span>
</template>

<script>
  import {VueCropper} from 'vue-cropper'
  import {XHeader, TransferDom} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      VueCropper,
      XHeader
    },
    props: {
      autoCropWidth: undefined,
      autoCropHeight: undefined,
      enlarge: {
        type: [Number, String],
        default: 1
      },
    },
    data () {
      return {
        hshow: false,
        imgInput: undefined,
        option: {
          img: '/static/img/ewm.png',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: true,
          original: false,
          canMoveBox: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          centerBox: false,
          high: true
        },
      }
    },
    mounted () {
      var _this = this
    },
    methods: {
      show (e) {
        var _this = this
        let file = e.currentTarget.files[0]
        this.option.img = file
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          _this.option.img = this.result
          _this.hshow = true
        }
        e.currentTarget.value = ''
      },
      hide () {
        this.hshow = false
      },
      file () {
        var _this = this
        this.$refs.cropper.getCropData((data) => {
          _this.$http.post(_this.$store.state.url + '/index/uploadImgs', {
            load: true,
            img: data,
          }).then(function (res) {
            if (!res) return
            _this.$store.commit('propsAdd', res)
            _this.$emit('data', res)
            _this.hshow = false
          })
        })
      },
    }
  }
</script>

<style scoped>
  .button {
    background: #202e3e;
    padding: 5px 10px;
    border-radius: 5px;
  }

  .pos {
    /* width: 160px;
    height: 90px; */
    position: relative;
    display: block;
    overflow: hidden;
  }

  .vue-cropper {
    background: none;
  }

  .inp_fil {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .pos img{
    width: 100%;
    height: 99%;
  }
</style>
