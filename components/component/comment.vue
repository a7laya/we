<template>
    <confirm :title=" title || '评分'" v-model="show" @on-cancel="cancel" @on-confirm="confirm">
        <div class="pingbox">
        	<span class="pingtit">质量 :</span>
            <rater v-model="form.mem_score1"></rater>
            <span class="pingfenzhi">({{form.mem_score1}})</span>
        </div>
        <div class="pingbox">
        	<span class="pingtit">诚信 :</span>
            <rater v-model="form.mem_score2"></rater>
            <span class="pingfenzhi">({{form.mem_score2}})</span>
        </div>
        <div class="pingbox">
        	<span class="pingtit">效率 :</span>
            <rater v-model="form.mem_score3"></rater>
            <span class="pingfenzhi">({{form.mem_score3}})</span>
        </div>
    </confirm>
</template>

<script>
    import { Confirm, Rater } from 'vux'
    export default {
        components: {
            Confirm,
            Rater
        },
        props: {
            title: undefined,
            show: undefined,
        },
        data() {
            return {
                form: {
                    mem_score1: 5,
                    mem_score2: 5,
                    mem_score3: 5
                }
            }
        },
        methods: {
            cancel() {
                this.$emit('on-cancel');
            },
            confirm() {
                this.$emit('on-confirm', this.form);
            }
        }
    }
</script>

<style>
	.pingfenzhi{
		display: inline-block;
		vertical-align: middle;
	}
	.pingtit{
		display: inline-block;
		vertical-align: middle;
	}
	.pingbox .vux-rater{
		vertical-align: middle;
	}
</style>