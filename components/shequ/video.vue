<template>
	<div id="up">
		<x-header :title="'发布视频'" :left-options="{backText:''}" class="header"></x-header>
		<div>
			<x-input  placeholder="请输入标题，以便分享时候使用" v-model="title" :max="20">
					<div slot="label" class="ban_title">
					<strong>*</strong>
					<span>标题：</span>
				</div>
			</x-input>
		</div>
		<div class="sctp">
			<!--<div v-for="(item,index) in ImgList">
				<img src="../../../static/img/d.png" alt="" class="del" @click="del(index)" />
				<img :src="$store.state.website.website_domain_name + '/uploads/' + item" alt="" />
			</div>-->
			<!--<video class="vjs-tech sp"  :src="$store.state.website.website_domain_name + '/uploads/' + src"></video>-->
			<video v-if="src" controls class="vjs-tech sp" style="width= 100%; height=100%; object-fit: fill" id="headvideo" :src="$store.state.website.website_domain_name + '/uploads/' + src">
			<source :src="$store.state.website.website_domain_name + '/uploads/' + src" type="video/mp4" >															
			</video>
			<div id="upload" v-if="!src">
			<form enctype="multipart/form-data" method="post" id="upload" >
					<img src="../../../static/img/jh.png" alt="" class="tp" />
					<input v-if="type==1" type="file" name="upload" capture="camera" accept="image/*" @change="doUpload1($event)" class="upload1" style="width: 100%; height: 100%;  opacity: 0;position: absolute;top: 0;left: 0;">
					<input type="file" name="upload" accept="video/*" @change="doUpload1($event)" class="upload1" style="width: 100%; height: 100%;  opacity: 0;position: absolute;top: 0;left: 0;">
					<input v-if="type==3" type="file" name="upload" accept="image/*" multiple @change="doUpload1($event)" class="upload1" style="width: 100%; height: 100%;  opacity: 0;position: absolute;top: 0;left: 0;">
		    </form>
			</div>
		</div>
    <vue-html5-editor content="想要说的(必须填写)" @change="updateData($event)"  :height="200" :rows="8" ></vue-html5-editor>
		<!-- <x-textarea placeholder="想要说的(必须填写)" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')" :height="200" :rows="8" v-model="content"></x-textarea> -->
		<!--<textarea name="" rows="" cols="" ></textarea>-->
		<div class="button_max" @click="fabu()" style="margin: 30px auto;">发布</div>
	</div>
</template>

<script>
	import { XHeader, XTextarea, XInput } from 'vux'
	import { VueCropper1 } from '../component'

	import { Base64 } from 'js-base64'
	export default {
		components: {
			XHeader,
			XTextarea,
			XInput,
			VueCropper1
		},
		data() {
			return {
				ImgList: [],
				content: '',
				type: '',
				title: '',
				src: '',
				index:1

			}
		},
		mounted() {
			var _this = this;
			_this.type = _this.$route.params.type;

		},
		methods: {
      updateData(data) {
        this.content = data
      },
			fileimg(res) {
				this.ImgList.push(res.imgurl);
			},
			onEvent(event) {

			},
			//删除
			del(i) {
				console.log(i)
				var _this = this;
				_this.ImgList.splice(i, 1);
			},
			//发布
			fabu() {
				var _this = this;
				if(!_this.title) {
					msg("请输入标题");
					return;
				}
				if(!_this.content) {
					msg("请输入发布的内容");
					return;
				}
				if(_this.index==1){
				_this.$http.post(_this.$store.state.url + '/Follow/add_dyn', {
					lood: false,
					img: _this.src,
					content: _this.content,
					title: _this.title,
					type:2
				}).then(function(res) {
					if(!res) return;
					msg("发布成功");
					_this.content = "";
					_this.ImgList = "";
					_this.title = "";
					_this.$router.push('index');

				})
				}
			},
			doUpload1(e) {

				//				 let file = e.currentTarget.files[0];
				//                 console.log(file)
				//                 var a= $("#upload")[0];
				//                 console.log(a);
				//				var formData = new FormData($("#upload")[0]);
				//				console.log(formData)
				var _this = this;
				let file = e.target.files[0]
				let param = new FormData() // 创建form对象
				param.append('img', file) // 通过append向form对象添加数据
				console.log(param)
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				} // 添加请求头
				this.$store.commit('loadingOFFON', true)
				this.isshow = false
				_this.$http.post(_this.$store.state.url + '/index/uploadImgs', param, config).then(function(res) {
					if(!res) return
					console.log(res)
					_this.src = res.imgurl;
					console.log(_this.src)
				})
			}
		}
	}
</script>

<style scoped>
	#up {
		background: white;
		padding-bottom: 30px;
	}
	
	.sctp {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 95%;
		margin: 30px auto;
	}
	
	.sctp div {
		width: 29%;
		height: 100px;
		margin: 2%;
		position: relative;
	}
	
	.sctp div img {
		width: 100%;
		height: 100%;
	}
	
	.del {
		width: 18px!important;
		height: 18px!important;
		position: absolute;
		right: -10px;
		top: -10px;
	}
	.sp{
		width: 70%;
		height:200px;
	}
	.ban_title strong{
	color: red;
	}
</style>