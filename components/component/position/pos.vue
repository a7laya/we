<template>
    <span class="pos_box">
		<span class="pos" @click="onShow('show')">{{pos.typename || '全国'}}</span>
	    <transition name="top-fade">
	        <vue-pos v-if="show" @ievent="onPos"></vue-pos>
	    </transition>
    </span>
</template>

<script>
    import vuePos from './poslist'
    export default {
        components: {
            vuePos
        },
        data() {
            return {
                pos: {},
                show: false,
            }
        },
        watch: {
            pos(res) {
                this.$emit('ievent', res);
            }
        },
        mounted() {
            var _this = this;
        },
        methods: {
            onShow(val) {
//              this[val] = !this[val]
            },
            onPos(res){
            	this.show=false;
            	if(!res) return;
            	this.pos = res;
            	
            }
        },
    }
</script>

<style>

</style>