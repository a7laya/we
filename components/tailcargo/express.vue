<template>
	<div class="wrap">
    <x-header style="background-color:#398CD3;">物流信息</x-header>
    <!-- 收货信息 -->
    <div style="background-color: white; padding: 15px;">
      <div style="color: #BBBBBB; margin-bottom: 5px;">收货地址</div>
      <div style="font-weight: 600;">{{consignee}}<span style="margin-left: 5px;">{{mobile}}</span></div>
      <div style="color: #555555;">{{region}}{{address}}</div>
    </div>
    <!-- 物流信息 -->
    <div style="background-color: white; padding: 15px; margin-top: 15px;">
      <!-- 快递类别和运单号 -->
      <div style="border-bottom: #EEEEEE solid 1px;padding-bottom: 10px;">
        <div style="font-weight: 600;">物流: {{shipping_name2}}</div>
        <div style="color: #555555;">运单号: {{shipping_code}}</div>
      </div>

      <div style="margin-left: 5px; margin-top: 10px;">
        <div style="border-bottom: #EEEEEE solid 1px; padding: 5px;"
        v-for="(item,index) in logistics" :key='index'
        :class="index != 0 ? 'other' : ''">
          <div style="font-weight: 600;">{{item.context}}</span></div>
          <div style="padding-left: 5px;">{{item.time}}</div>
        </div>
      </div>
    </div>
		<!-- 底部 -->
		<vue-foot01></vue-foot01>

  </div>
</template>

<script>
	import { Tab, TabItem,Drawer,Cell,CellBox, CellFormPreview, Group, Badge,XHeader} from 'vux'
	import { VueFoot01} from "../component/";
	export default {
	    components: {
	      Tab,
	      TabItem,
	      Drawer,
		    Cell,
		    Group,
		    CellFormPreview,
        CellBox,
        Badge,
        XHeader,
	      VueFoot01
	    },
		data(){
      return {
        order_id: '',
        // 物流相关
        shipping_code: '',  // 731123456789 运单号
        shipping_name: '', // zhongtong 快递
        logistics: [], // 物流信息

        // 收货人相关
        consignee: '',
        region: '',
        address: '',
        mobile: '',
        express:{
          zhongtong: '中通快递',
          shentong:  '申通快递',
          yuantong:  '圆通快递',
          yunda:     '韵达快递',
          shunfeng:  '顺丰速运',
          jingdong:  '京东物流',
          yuxin:     '宇鑫快递',
          tiantian:  '天天快递',
          EMS:       'EMS',
          baishihuitong: '百世汇通',
        }
      }
		},
    computed:{
      shipping_name2(){
        return this.express[this.shipping_name]
      }
    },
    created(){
      this.order_id = this.$route.query.order_id
      this.getOrderData(this.order_id)
    },
		methods:{
			// 获取物流信息
			getLogistics(){
			  var _this = this
			  _this.$http.post(_this.$store.state.url + "/Cargo/query_order",{shipping_name:_this.shipping_name,shipping_code:_this.shipping_code})
			    .then(res=>{
			      console.log('获取物流信息：',res);
			      _this.logistics = res
			    })
			},
      //获取订单数据
      getOrderData(order_id) {
        var _this = this;
        _this.$http
          .get(_this.$store.state.url + "/Cargo/order_info?order_id=" + order_id)
          .then(function(res) {
            console.log('获取到的订单详情:',res);
            if (!res) return;
            // 物流相关
            _this.shipping_code = res.shipping_code
            _this.shipping_name = res.shipping_name
            _this.getLogistics()

            // 收货人相关
            _this.consignee = res.consignee
            _this.region    = res.region
            _this.address   = res.address
            _this.mobile    = res.mobile
          });
      },
		}
	}
</script>

<style scoped>
  .other {
    color: #cccccc;
  }
	.title{
		width: 100%;
		height: 44px;
		display: flex;
		justify-content: space-around;
		line-height:44px;
		font-size:14px ;
		color: #FFFFFF;
		text-align: center;
		background-color:#398CD3 ;
		}
		.back{
			width: 40px;
		}
		.figure{
			width: 300px;
		}
		.list-wrap{
			width: 100%;
			margin-top: 10px;
		}
		.list-item{
			width: 100%;
			border-bottom:3px solid ##F3F3F3 ;
			display: flex;
			justify-content: space-between;
		}
		.left{
			width:85px ;
			height: 85px;
      margin-left: 10px;
			background-color: aquamarine;
			}
		.right{
			width: 257px;
		}
		.name{
			width: 100%;
			height: 32px;
		}
		.uprice{
			width: 100%;
			display: flex;
			margin-top:5px ;
		}
		.nprice{
			width: 100%;
			display: flex;
			margin-top:5px ;
			position: relative;
			justify-content: space-between;
		}
		.money1{
			width: 78px;
			height: 14px;
      text-decoration:-line-through ;
			color: #FF0000;
		}
    .money{
    	width: 78px;
    	height: 14px;
    	color: #FF0000;
    }
		.count{
			width: 48px;
			height: 14px;
			color: #000000;
		}
		.discount{
			width: 111px;
			height: 20px;
			color:#FFE5B900;
		}
		.send{
			width: 32px;
			height: 18px;
			line-height: 18px;
			text-align: center;
      font-size: 12px;
			border-radius: 6px;
			background-color: #F88509 ;
			position: absolute;
			top: 0px;
			left: 120px;
			}
		.tprice{
			width: 68px;
			height: 20px;
		}
    .order{
			width: 257px;
			height: 14px;
			color: #CCCCCC;
			display: flex;
			justify-content: space-around;
		}
		.num{
			width: 120px;
		}
		.time1{
      text-align: right;
			width: 160px;
			}
		.yundan{
			width: 90%;
			margin: 10px auto 0px auto;
			position: relative;
		}
    .ul-list{
      width: 276px;
      color:#FFF88509 ;
      }
    .ul-list li:first-child{
     /* height: ; */
       font-style: normal;
       color: #FFF88509;
    }
		.sub-item {
         color: #888;
         }
		.submit-wrap{
			width: 100%;
			height: 400px;
			position: relative;
		}
		.time,.address,.express{
			width: 20px;
			height: 20px;
			background-color: #F88509;
			position: absolute;
			right: 100px;
			top: 4px;
		}
		.time{
			top: 30px;
		}
		.address{
			top: 54px;
		}
		 .submit{
			 width: 95px;
			 height: 24px;
			 position: absolute;
			 top: 50%;
			 left: 50%;
			 margin-top: -47px;
			 margin-left: -12px;
			 border-radius: 20px;
			 line-height:24px ;
			 text-align: center;

			 background-color:  #F88509;
			 }
</style>
