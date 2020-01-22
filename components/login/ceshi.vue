<template>
    <div>
        <div v-for="(item,index1) in item.specs" :key="index1" v-if="onclass">
            <span>{{item.key}}:</span>
            <span v-for="(item,index2) in item.value" :key="index2" @click="onclick(item)" :class="[onclass[index1][index2] ? '' : 'wu']">
        		{{item}}
        	</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                onclass: undefined,
                item: {
                    "specs": [{
                        "key": "主材质",
                        "value": ["檀木", "实木"],
                        "insert_way": 0
                    }, {
                        "key": "款式",
                        "value": ["50*60", "60*70"],
                        "insert_way": 0
                    }, {
                        "key": "产地",
                        "value": ["北京", "深圳"],
                        "insert_way": 0
                    }],
                    "skus": [{
                        "specs": [{
                            "spec_name": "主材质",
                            "spec_value": "檀木"
                        }, {
                            "spec_name": "款式",
                            "spec_value": "50*60"
                        }, {
                            "spec_name": "产地",
                            "spec_value": "北京"
                        }],
                    }, {
                        "specs": [{
                            "spec_name": "主材质",
                            "spec_value": "檀木"
                        }, {
                            "spec_name": "款式",
                            "spec_value": "60*70"
                        }, {
                            "spec_name": "产地",
                            "spec_value": "北京"
                        }],
                    }, {
                        "specs": [{
                            "spec_name": "主材质",
                            "spec_value": "实木"
                        }, {
                            "spec_name": "款式",
                            "spec_value": "50*60"
                        }, {
                            "spec_name": "产地",
                            "spec_value": "北京"
                        }],
                    }, {
                        "specs": [{
                            "spec_name": "主材质",
                            "spec_value": "实木"
                        }, {
                            "spec_name": "款式",
                            "spec_value": "60*70"
                        }, {
                            "spec_name": "产地",
                            "spec_value": "北京"
                        }],
                    }, {
                        "specs": [{
                            "spec_name": "主材质",
                            "spec_value": "实木"
                        }, {
                            "spec_name": "款式",
                            "spec_value": "60*70"
                        }, {
                            "spec_name": "产地",
                            "spec_value": "深圳"
                        }],
                    }]

                }
            }
        },
        mounted() {
        	var _this = this;
        	this.onclass = [];
            _.each(_this.item.specs,function(e,index1){
            	_this.onclass[index1] = [];
            	_.each(e.value,function(e,index2){
            		_this.onclass[index1][index2] = true;
	            })
            })
        },
        watch: {
            list: { //监听数据变化
                handler() {
                },
                deep: true
            }
        },
        methods: {
            onclick(value) {
                let bool = this.list.indexOf(value);
                if(bool == -1) {
                    this.list.push(value);
                } else {
                    this.list.splice(bool, 1);
                }
            }
        }
    }
</script>

<style>
    /*span {
        border: 1px solid #eee;
        margin-left: 50px;
    }
    span.wu{
    	color: #999;
    }
    
    div {
        padding: 10px;
    }*/
</style>