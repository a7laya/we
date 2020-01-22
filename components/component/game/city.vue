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
    <div class="title" @click="chooseAll()">全国</div>
    <div class="cityCenter">
      <ul v-for="(item,index) in list">
        <div class="title" @click="letsGetThisFuckingCheck(item.children,item.id)">{{item.typename}}</div>
        <li v-for="(item,index) in item.children" :key="index" class="ell" :class="checkbox.includes(item.id)?'active':''"
            @click="check(item.id,item.parent_id)">
          {{item.typename}}
        </li>
      </ul>
    </div>

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
      // 全国判断是否全部选中
      isCheckAll () {
        let allLength = 0
        for (let i in this.list) {
          allLength = allLength + this.list[i].children.length
        }
        this.allLength = allLength
        if (this.checkbox.length == allLength) {
          return true
        }
        return false
      }
    },
    created () {
      let allLength = 0
      for (let i in this.list) {
        allLength = allLength + this.list[i].children.length
      }
      this.allLength = allLength
    },
    methods: {
      // 兄弟别轻易动这里的代码，因为我自己都看不懂
      onback () {
        this.$emit('onClickBack');
      },
      onnext () {
        if (this.checkbox.length == 0){
          msg('请选择您要投放的城市')
        } else {
          let checkAllData = []
          let checkLength = this.checkbox.length
          for (let i in this.list) {
            let checkData = []
            for (let j in this.list[i].children) {
              checkData.push(this.list[i].children[j].id)
            }
            // 数组checkData 和 checkbox
            if (checkData.every(val => this.checkbox.includes(val))) {
              checkAllData.push(this.list[i].id)
              for (let i = this.checkbox.length - 1; i >= 0; i--) {
                let value = this.checkbox[i]
                if (checkData.indexOf(value) > -1){
                  this.checkbox.splice(i, 1)
                }
              }
            }
          }
          if (checkLength == this.allLength) {
            this.propData = '0'
          } else {
            this.propData = this.checkbox.concat(checkAllData)
          }
          this.$emit('onClickNext', this.propData);
        }
      },
      // 全省判断是否选择
      isCheckProviceAll (item) {
        var checkData = []
        for (let i in item) {
          checkData.push(item[i].id)
        }
        if (checkData.every(val => this.checkbox.includes(val))) {
          return true
        }
        return false
      },
      // 多选
      check (i) {
        var idx = this.checkbox.indexOf(i)
        // 如果已经选中了，那就取消选中，如果没有，则选中
        if (idx > -1) {
          this.checkbox.splice(idx, 1)
        } else {
          this.checkbox.push(i)
        }
        this.propData = this.checkbox
      },
      // 选择全国数据判断是否相等
      chooseAll () {
        if (this.isCheckAll) {
          this.clearCheckbox()
        } else {
          this.chooseAllData()
        }
      },
      // 选择全国
      chooseAllData () {
        this.checkbox = []
        for (let i in this.list) {
          for (let j in this.list[i].children) {
            this.checkbox.push(this.list[i].children[j].id)
          }
        }
        this.propData = 0
      },
      // 清空全国选择
      clearCheckbox () {
        this.checkbox = []
      },
      // 选择全省
      letsGetThisFuckingCheck (item, id) {
        if (this.isCheckProviceAll(item)) {
          this.clearProviceCheckbox(item)
        } else {
          this.checkAll(item, id)
        }
      },
      // 选择全省
      checkAll (item, id) {
        for (let i in item) {
          this.checkbox.push(item[i].id)
        }
        this.propData = this.checkbox
      },
      // 清空全省选择
      clearProviceCheckbox (item) {
        var checkData = []
        for (let i in item) {
          checkData.push(item[i].id)
        }
        for (let i = this.checkbox.length - 1; i>=0; i--) {
          let value = this.checkbox[i]
          if (checkData.indexOf(value) > -1){
            this.checkbox.splice(i, 1)
          }
        }
      },
      // 反选
      checkOpposite () {
        var len = this.checkboxList.length
        var idx
        for (var i = 0; i < len; i++) {
          idx = this.checkbox.indexOf(i)
          // 已经选中的删去，没选中的加进去
          if (idx > -1) {
            this.checkbox.splice(idx, 1)
          } else {
            this.checkbox.push(i)
          }
        }
      }
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
