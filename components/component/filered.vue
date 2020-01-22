<template>
    <i style="display: inline-block;position: relative;">
		<input @change="show($event)" type="file" name="file" accept="image/*" style="position: absolute;width: 100%;height: 100%;opacity:0.1">
		<slot></slot>
	</i>
</template>

<script>
    export default {
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
            hide() {
                this.hshow = false;
            },
            props: {
	            url: undefined,
	            type: undefined,
	            id:undefined
	        },
            file(data) {
                var _this = this;
                _this.$http.post(_this.$store.state.url + _this.url, {
                    lood: false,
                    id: _this.id,
                    type:_this.type,
                }).then(function(res) {
                    if(!res) return;
                    _this.$emit('data', res);
                })
            },
        }
    }
</script>

<style>

</style>