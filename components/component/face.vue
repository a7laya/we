<template>
    <div v-show="show">
        <div class="layui-m-layerchild layim-layer layui-m-anim-scale" style="position: absolute; top: -210px;bottom: auto;">
            <div class="layui-m-layercont" style="padding: 0;text-align: left;">
                <ul class="layui-layim-face">
                    <li @click="faceClick($event)" title="[微笑]"><img src="/static/img/face/0.gif"></li>
                    <li @click="faceClick($event)" title="[嘻嘻]"><img src="/static/img/face/1.gif"></li>
                    <li @click="faceClick($event)" title="[哈哈]"><img src="/static/img/face/2.gif"></li>
                    <li @click="faceClick($event)" title="[可爱]"><img src="/static/img/face/3.gif"></li>
                    <li @click="faceClick($event)" title="[可怜]"><img src="/static/img/face/4.gif"></li>
                    <li @click="faceClick($event)" title="[挖鼻]"><img src="/static/img/face/5.gif"></li>
                    <li @click="faceClick($event)" title="[吃惊]"><img src="/static/img/face/6.gif"></li>
                    <li @click="faceClick($event)" title="[害羞]"><img src="/static/img/face/7.gif"></li>
                    <li @click="faceClick($event)" title="[挤眼]"><img src="/static/img/face/8.gif"></li>
                    <li @click="faceClick($event)" title="[闭嘴]"><img src="/static/img/face/9.gif"></li>
                    <li @click="faceClick($event)" title="[鄙视]"><img src="/static/img/face/10.gif"></li>
                    <li @click="faceClick($event)" title="[爱你]"><img src="/static/img/face/11.gif"></li>
                    <li @click="faceClick($event)" title="[泪]"><img src="/static/img/face/12.gif"></li>
                    <li @click="faceClick($event)" title="[偷笑]"><img src="/static/img/face/13.gif"></li>
                    <li @click="faceClick($event)" title="[亲亲]"><img src="/static/img/face/14.gif"></li>
                    <li @click="faceClick($event)" title="[生病]"><img src="/static/img/face/15.gif"></li>
                    <li @click="faceClick($event)" title="[太开心]"><img src="/static/img/face/16.gif"></li>
                    <li @click="faceClick($event)" title="[白眼]"><img src="/static/img/face/17.gif"></li>
                    <li @click="faceClick($event)" title="[右哼哼]"><img src="/static/img/face/18.gif"></li>
                    <li @click="faceClick($event)" title="[左哼哼]"><img src="/static/img/face/19.gif"></li>
                    <li @click="faceClick($event)" title="[嘘]"><img src="/static/img/face/20.gif"></li>
                    <li @click="faceClick($event)" title="[衰]"><img src="/static/img/face/21.gif"></li>
                    <li @click="faceClick($event)" title="[委屈]"><img src="/static/img/face/22.gif"></li>
                    <li @click="faceClick($event)" title="[吐]"><img src="/static/img/face/23.gif"></li>
                    <li @click="faceClick($event)" title="[哈欠]"><img src="/static/img/face/24.gif"></li>
                    <li @click="faceClick($event)" title="[抱抱]"><img src="/static/img/face/25.gif"></li>
                    <li @click="faceClick($event)" title="[怒]"><img src="/static/img/face/26.gif"></li>
                    <li @click="faceClick($event)" title="[疑问]"><img src="/static/img/face/27.gif"></li>
                    <li @click="faceClick($event)" title="[馋嘴]"><img src="/static/img/face/28.gif"></li>
                    <li @click="faceClick($event)" title="[拜拜]"><img src="/static/img/face/29.gif"></li>
                    <li @click="faceClick($event)" title="[思考]"><img src="/static/img/face/30.gif"></li>
                    <li @click="faceClick($event)" title="[汗]"><img src="/static/img/face/31.gif"></li>
                    <li @click="faceClick($event)" title="[困]"><img src="/static/img/face/32.gif"></li>
                    <li @click="faceClick($event)" title="[睡]"><img src="/static/img/face/33.gif"></li>
                    <li @click="faceClick($event)" title="[钱]"><img src="/static/img/face/34.gif"></li>
                    <li @click="faceClick($event)" title="[失望]"><img src="/static/img/face/35.gif"></li>
                    <li @click="faceClick($event)" title="[酷]"><img src="/static/img/face/36.gif"></li>
                    <li @click="faceClick($event)" title="[色]"><img src="/static/img/face/37.gif"></li>
                    <li @click="faceClick($event)" title="[哼]"><img src="/static/img/face/38.gif"></li>
                    <li @click="faceClick($event)" title="[鼓掌]"><img src="/static/img/face/39.gif"></li>
                    <li @click="faceClick($event)" title="[晕]"><img src="/static/img/face/40.gif"></li>
                    <li @click="faceClick($event)" title="[悲伤]"><img src="/static/img/face/41.gif"></li>
                    <li @click="faceClick($event)" title="[抓狂]"><img src="/static/img/face/42.gif"></li>
                    <li @click="faceClick($event)" title="[黑线]"><img src="/static/img/face/43.gif"></li>
                    <li @click="faceClick($event)" title="[阴险]"><img src="/static/img/face/44.gif"></li>
                    <li @click="faceClick($event)" title="[怒骂]"><img src="/static/img/face/45.gif"></li>
                    <li @click="faceClick($event)" title="[互粉]"><img src="/static/img/face/46.gif"></li>
                    <li @click="faceClick($event)" title="[心]"><img src="/static/img/face/47.gif"></li>
                    <li @click="faceClick($event)" title="[伤心]"><img src="/static/img/face/48.gif"></li>
                    <li @click="faceClick($event)" title="[猪头]"><img src="/static/img/face/49.gif"></li>
                    <li @click="faceClick($event)" title="[熊猫]"><img src="/static/img/face/50.gif"></li>
                    <li @click="faceClick($event)" title="[兔子]"><img src="/static/img/face/51.gif"></li>
                    <li @click="faceClick($event)" title="[ok]"><img src="/static/img/face/52.gif"></li>
                    <li @click="faceClick($event)" title="[耶]"><img src="/static/img/face/53.gif"></li>
                    <li @click="faceClick($event)" title="[good]"><img src="/static/img/face/54.gif"></li>
                    <li @click="faceClick($event)" title="[NO]"><img src="/static/img/face/55.gif"></li>
                    <li @click="faceClick($event)" title="[赞]"><img src="/static/img/face/56.gif"></li>
                    <li @click="faceClick($event)" title="[来]"><img src="/static/img/face/57.gif"></li>
                    <li @click="faceClick($event)" title="[弱]"><img src="/static/img/face/58.gif"></li>
                    <li @click="faceClick($event)" title="[草泥马]"><img src="/static/img/face/59.gif"></li>
                    <li @click="faceClick($event)" title="[神马]"><img src="/static/img/face/60.gif"></li>
                    <li @click="faceClick($event)" title="[囧]"><img src="/static/img/face/61.gif"></li>
                    <li @click="faceClick($event)" title="[浮云]"><img src="/static/img/face/62.gif"></li>
                    <li @click="faceClick($event)" title="[给力]"><img src="/static/img/face/63.gif"></li>
                    <li @click="faceClick($event)" title="[围观]"><img src="/static/img/face/64.gif"></li>
                    <li @click="faceClick($event)" title="[威武]"><img src="/static/img/face/65.gif"></li>
                    <li @click="faceClick($event)" title="[奥特曼]"><img src="/static/img/face/66.gif"></li>
                    <li @click="faceClick($event)" title="[礼物]"><img src="/static/img/face/67.gif"></li>
                    <li @click="faceClick($event)" title="[钟]"><img src="/static/img/face/68.gif"></li>
                    <li @click="faceClick($event)" title="[话筒]"><img src="/static/img/face/69.gif"></li>
                    <li @click="faceClick($event)" title="[蜡烛]"><img src="/static/img/face/70.gif"></li>
                    <li @click="faceClick($event)" title="[蛋糕]"><img src="/static/img/face/71.gif"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: undefined,
        },
        data() {
            return {
                show: false,
            }
        },
        watch: {
            show(val) {
                this.$emit('input', val);
            },
            value: {
                handler: function(val) {
                    this.show = val
                },
                immediate: true
            }
        },
        methods: {
            faceClick(e) {
            	this.show = false;
                this.$emit('data', e);
            }
        }
    }
</script>

<style>

</style>