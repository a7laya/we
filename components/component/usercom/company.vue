<template>
    <popup-picker ref="picker" :placeholder="placeholder" :title="title" :data="item" :columns="1" v-model="add" :show-name="true" @on-hide="hide"></popup-picker>
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
                adds: undefined,
                add: [],
            }
        },
        props: {
            title: undefined,
            placeholder: undefined,
            value: undefined,
        },
        watch: {
            value: {
                handler: function(val) {
                    var gettype = Object.prototype.toString;
                    if(gettype.call(val) == '[object String]') {
                        this.add = val.split("-");
                    } else {
                        this.add = val || [];
                    }
                },
                immediate: true
            },
            add: {
                handler() {
                    this.$emit('input', this.add);
                },
                deep: true
            }
        },
        mounted() {
            var _this = this;
            _this.$http.post(_this.$store.state.url + '/Homecenter/getCompany').then(function(res) {
                if(!res) return;
                _.each(res[1].children, function(e) {
                    _this.item.push({name:e.typename,value:e.id.toString(),parent:0});
                })
            })
        },
        methods: {
            hide() {
                this.adds = this.$refs.picker && this.$refs.picker.getNameValues();
                this.$emit('on-hide', this.add);
            }
        }
    }
</script>

<style>

</style>