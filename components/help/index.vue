<template>
	<div>
		<x-header :left-options="{backText:'',}" :title="'帮助中心'">
            <!--<div slot="right" class="iconfont icon-3"></div>-->
        </x-header>
        <group>
            <cell v-for="(item , index) in list" :key="index" :title="item.name" :link="'main/' + item.id" is-link></cell>
        </group>
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
                list: undefined,
            }
        },
        mounted() {
            var _this = this;
            _this.$http.post(_this.$store.state.url + '/index/helpname',{load:true}).then(function(res) {
                if(!res) return;
                _this.list = res;
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