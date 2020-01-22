<template>
	<div>
		<x-header :left-options="{backText:'',}" :title="'帮助中心'">
            <!--<div slot="right" class="iconfont icon-3"></div>-->
        </x-header>
        <div class="statement" v-html="item"></div>
	</div>
</template>

<script>
	import { XHeader,Group,Cell} from 'vux'
    export default {
        components: {
            XHeader,
            Group,
            Cell,
        },
        data() {
            return {
                item: undefined,
            }
        },
        mounted() {
            var _this = this;
            _this.$http.post(_this.$store.state.url + '/index/help',{load:true,id:_this.$route.params.id}).then(function(res) {
                if(!res) return;
                _this.item = res.text;
            })
        },
        computed: {

        },
        methods: {
			
        }
    }
</script>

<style>
</style>