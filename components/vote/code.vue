<template>
	 <div>
	 	<!--<x-header :left-options="{backText: ''}">最美汽车</x-header>-->
		 <div class="productShare">
	        <div class="invitePosterPage ">
	        	<div v-if="posterDataUrl" class="flex">
		      	  <img  :src="posterDataUrl" class="poster-bg" alt="邀请海报" style="position: absolute;"/>
		      	  <div class="share">长按保存海报分享给好朋友</div>
		      	</div>
		    
		   		<div  id="poster" class="flex-row" style="position: relative" v-else=""> 
		      		<!--<div  id="poster" class="flex-row" style="position: relative" >-->
			        <img class="poster-bg" src="/static/img/jinli.png" alt="邀请海报背景"/>
			        <div class="poste-bei">{{sharevote.vote_tile}}</div>
			        <div class="poster-dui">{{sharevote.vote_select_id}}号 &#x3000;{{sharevote.vote_select_title}}</div>
			        <div class="poster-img"><img :src="$store.state.website.website_domain_name + '/uploads/' + sharevote.vote_select_img_s"></div>
			        
			        <div class="nav">
						<div class="nav-first">
							<p class="paiming">排名</p>
							<p class="num">{{$route.params.feel}}</p>
						</div>
						<div class="nav-first nav-two">
							<p class="paiming">投票数</p>
							<p class="num">{{sharevote.vote_select_ticket_num}}</p>
						</div>
						<div class="nav-first">
							<p class="paiming">访问量</p>
							<p class="num">{{sharevote.vote_select_visit}}</p>
						</div>
					</div>
					 <p class="remark">长按识别二维码，为你的好友助力吧！</p>
			        <canvas class="qr" id="qrCode-canvas"></canvas>
	      		</div>
	    	</div>
	    </div>
	</div>
</template>
<script>
	import QRCode from 'qrcode'
	import { qrcanvas } from 'qrcanvas'
	import html2canvas from 'html2canvas'
	import { XHeader} from 'vux'
	export default{
		components:{
			XHeader
		},
		data(){
			return{
				posterDataUrl:'',
                qrCodeUrl: '' ,
                sharevote:''
			}
			
		},
		
		
	created(){
		this.shareVote()
	},
		 mounted(){
		
		this.qrCodeUrl=`http://zhibo1.zhyook.com/index`
     	
     	setTimeout(this.createQRCode, 400)
      
     
   },
   
   

		methods:{
			  shareVote(){
		      	var _this = this
		      	_this.$http.post(_this.$store.state.url + '/Vote/shareVote',{
		      		vote_select_id:_this.$route.params.id
		      	}).then(res=>{
		      		_this.sharevote = res

		      	})
		      	
            },
	   createQRCode () {
        //先用 QRCode 生成二维码 canvas，然后用 html2canvas 合成整张海报并转成 base64 显示出来
        let canvas = document.getElementById('qrCode-canvas')
        QRCode.toCanvas(canvas, this.qrCodeUrl, (error) => {
          if (error) {
            console.log(error)
          } else {
            //qrcode 生成的二维码会带有一些默认样式，需要调整下
            canvas.style.width = '2.5rem'
            canvas.style.height = '2.5rem'
//           canvas.display='block'

			var image = new Image();
		    image.crossOrigin = "*";  // 必须在image之前赋值
		    
            let poster = document.getElementById('poster')
            html2canvas(poster).then(canvas => {
           		
              this.posterDataUrl = canvas.toDataURL('image/png')
            });
          }
        })
      },
     
	 }
	}
</script>
<style type="text/css" scoped="">
.flex{
	height:100%
}
	#qrCode-canvas{
		position: absolute;
	    left: 38%;
	    bottom: 1.78rem;
		}
		.invitePosterPage{
			height:100%;
			width:100%;
		}
		.poster-bg{
			height:16.533333rem;
			width:100%;
			display: block;
		}
		.poster-img img{
			width:80%;
			height:4.333333rem;
			position:absolute;
			top:3.6rem;
			left:10%;
		}
		 .poster-dui{
			width: 100%;
		    text-align: center;
		    font-size: 0.426667rem;
		    font-weight: 600;
		    position: absolute;
		    top: 2.6rem;
		    color:#B94F43;
		}
		.poste-bei{
			width:100%;
			text-align: center;
			 position: absolute;
			 top:1rem;
			 font-size:16px;
			font-weight: 600; 
		}
		.remark{
			width: 100%;
		    text-align: center;
		    font-size: 0.426667rem;
		    font-weight: 600;
		    position: absolute;
    		top: 10.599rem;
    		color:#FE5509
		}
		
	
	
	.nav {
		position:absolute;
		top: 8rem;
	    width: 80%;
	    left: 10%;
		/*background: #05D8E8;*/
		background:#fff;
		padding: 15px 0;
		color: #F5FDFE;
		display: flex;
	}
	
	.nav-first {
		width: 33.33%;
		text-align: center;
		/* float: left; */
	}
	
	.nav-two {
		/*border-right: 2px solid #F5FDFE;
		border-left: 2px solid #F5FDFE;*/
	}
	
	.nav-first .paiming{
		font-size: 14px;
		color:#FE5509
	}
	.nav-first .num{
		font-size: 14px;
		color:#A5A5A5
	}
	.share{
		background:#F8EAAF;
		height:18rem;
		text-align: center;
		font-size:16px;
		line-height:34.8rem;
		color:#868376;
		overflow: hidden;
	}
</style>