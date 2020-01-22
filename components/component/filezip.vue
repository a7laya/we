<template>
  <i style="display: inline-block;position: relative;">
    <input v-if='isshow' @change="show($event)" type="file" name="file" accept="application/msword,application/pdf"
           style="position: absolute;width: 100%;height: 100%;opacity:0">
    <slot></slot>
  </i>
</template>

<script>
  export default {
    data () {
      return {
        isshow: true
      }
    },
    methods: {
      show (e) {
        var _this = this
        let file = e.target.files[0]
        let param = new FormData() // 创建form对象
        param.append('word', file) // 通过append向form对象添加数据
        if (param.get('word').size > 2097152) {
          msg('文件已超出最大大小')
          return
        } // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        } // 添加请求头
        this.$store.commit('loadingOFFON', true)
        this.isshow = false
        _this.$http.post(_this.$store.state.url + '/Common/get_document', param, config).then(function (res) {
          if (!res) return
          _this.$emit('data', res)
          _this.isshow = true
        })
      }
    }
  }
</script>

<style>

</style>
