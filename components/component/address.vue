<template>
  <!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：地址选择
    --> 
	<popup-picker ref="picker" :placeholder="placeholder" :title="title" :data="item" v-model="add" :show-name="true" :columns="2" @on-hide="hide"></popup-picker>
</template>

<script>
    import { PopupPicker } from 'vux'
    export default {
        components: {
            PopupPicker
        },
        data() {
            return {
                item: [],
                adds:undefined,
                add: [],
            }
        },
        props:{
        	title:undefined,
        	placeholder:undefined,
        	show:false,//是否开启省市县单选模式
        	value:undefined
        },
        watch: {
            value: {
              // 判断绑定到组件的数据val是否为字符串,如果为字符串则转化为数组
              handler: function(val) {
                var gettype = Object.prototype.toString;
                if(gettype.call(val)=='[object String]'){
                  if(val == '0'){
                    this.add = ['-100'];
                  }else{
                    this.add = val.split("-").splice(1,2);
                  }
                }else{
                  this.add = val || [];
                }
              },
              immediate: true
            },
            add: {
                handler() {
                    this.$emit('input',this.add);
                },
                deep: true
            }
        },
        mounted() {
          var _this = this;
          //获取地址
          _this.getAddress();
        },
        methods: {
        	hide(){
        		this.adds = this.$refs.picker&&this.$refs.picker.getNameValues();
        		this.$emit('onHide', this.adds);
        	},
          //获取地址
          getAddress() {
            var _this = this;
            _this.$http.post(_this.$store.state.url + "/common/region").then(function(res) { //获取城市
                console.log('地址组件：',res);
                if(!res) return;
                if(_this.show) {
                  _this.item.push({
                    name: '全国',
                    value: '-100',
                    parent: '0'
                  });
                  _this.item.push({
                    name: '',
                    value: '-1',
                    parent: '-100'
                  });
                }
                _.each(res, function(e) {

                  _this.item.push({
                    name: e.typename,
                    value: e.id.toString(),
                    parent: e.parent_id.toString()
                  });
                  if(_this.show) {
                    _this.item.push({
                      name: '全部',
                      value: '-1',
                      parent: e.id.toString()
                    });
                  }
                  _.each(e.children, function(e) {
                    if(_this.show) {
                      _this.item.push({
                        name: '全部',
                        value: '-1',
                        parent: e.id.toString()
                      });
                    }
                    _this.item.push({
                      name: e.typename,
                      value: e.id.toString(),
                      parent: e.parent_id.toString()
                    });
                    _.each(e.children, function(e) {
                      _this.item.push({
                        name: e.typename,
                        value: e.id.toString(),
                        parent: e.parent_id.toString()
                      });
                    })
                  })
                })
              });
              console.log('_this.item:',_this.item);
            }
          }

    }
</script>

<style>

</style>
