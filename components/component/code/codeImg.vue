<template>
    <span><img @click="click" :src="src" /></span>
</template>

<script>
	export default {
		data(){
			return {
				src:this.$store.state.url + '/index/imgphone'
			}
		},
		methods:{
			click(){
				this.src = this.$store.state.url + '/index/imgphone?' + Math.random()
				console.log(this.src);
			}
		}
	}
</script>

<style>

</style>