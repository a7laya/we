<template lang="html">
	<!--
    	作者：1209559047@qq.com
    	时间：2019-03-05
    	描述：上拉下拉刷新加载更多
    -->
    <div class="yo-scroll" :style="{ top:top + 'px' }" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            offset: {
                type: Number,
                default: 80
            },
            enableInfinite: {
                type: Boolean,
                default: true
            },
            enableRefresh: {
                type: Boolean,
                default: true
            },
            onRefresh: {
                type: Function,
                default: undefined,
                required: false
            },
            onInfinite: {
                type: Function,
                default: undefined,
                require: false
            }
        },
        data() {
            return {
                top: 0,
                state: 0,
                startY: 0,
                touching: false,
                infiniteLoading: false
            }
        },
        methods: {
            touchStart(e) {
                this.startY = e.targetTouches[0].pageY
                this.startScroll = $(document).scrollTop() || 0
                this.touching = true
            },
            touchMove(e) {
                if(!this.enableRefresh || $(document).scrollTop() > 0 || !this.touching) {
                    return
                }
                let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
                if(diff > 0) e.preventDefault()
                this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

                if(this.state === 2) { // in refreshing
                    return
                }
                if(this.top >= this.offset) {
                    this.state = 1
                } else {
                    this.state = 0
                }
            },
            touchEnd(e) {
                if(!this.enableRefresh) return
                this.touching = false
                if(this.state === 2) { // in refreshing
                    this.state = 0
                    $(document).scrollTop($(document).scrollTop() + this.top + 'px')
                    this.top = 0
                    return
                }
                if(this.top >= this.offset) { // do refresh
                    this.refresh()
                } else { // cancel refresh
                    this.state = 0
                    this.top = 0
                }
            },
            refresh() {
                this.state = 2
                this.top = this.offset
                this.onRefresh(this.refreshDone)
            },
            refreshDone() {
                this.state = 0
                this.top = 0
            },

            infinite() {
                this.infiniteLoading = true
                this.onInfinite(this.infiniteDone)
            },

            infiniteDone() {
                this.infiniteLoading = false
            },
        }
    }
</script>
<style>
    .yo-scroll {
        position: relative;
        min-height: -webkit-fill-available;
    }
</style>