<template>
    <i style="position: relative;">
		<input @change="show($event)" type="file" name="file" accept="image/*" style="position: absolute;width: 100%;height: 100%;opacity:0">
		<slot></slot>
	</i>
</template>

<script>
    export default {
    	data(){
    		return{
    			isshow:true,
    		}
    	},
        methods: {
            show(e) {
                var _this = this;
                let file = e.currentTarget.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function() {
                    _this.file(this.result)
                }
            },
            file(data) {
                var _this = this;
                this.isshow = false;
                _this.$http.post(_this.$store.state.url + '/index/uploadImgs', {
                    lood: false,
                    img: data,
                }).then(function(res) {
                    if(!res) return;
                    _this.$emit('data', res);
                    _this.isshow = true;
                })
            },
        }
    }
</script>

<style>

</style>