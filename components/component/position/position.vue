<template>
    <div class="list">
        <cell-box class="list">{{item}}</cell-box>
    </div>
</template>

<script>
    import { Group, CellBox } from 'vux'

    export default {
        components: {
            Group,
            CellBox
        },
        props: {
            item:undefined
        },
    }
</script>
<style scoped>
	.list{
		font-size: 16px;
		color: #000;
	}
</style>