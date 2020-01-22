<template>
  <div class="main_box">
    <x-header :title="'我的订阅'" :left-options="{backText:''}">
      <!-- <span @click="form1" slot="right" class="button">保存</span> -->
    </x-header>

    <div class="description statement" v-html="shuoming"></div>

    <!-- 关注订阅 -->
    <div class="info_top" v-if="showing" v-cloak>

      <div style="width：65%">请关注官方公众平台，便于第一时间获取订阅信息</div>
      <!-- <div style="white-space: nowrap" >立即关注</div> -->
      <div style="white-space: nowrap" @click="$store.commit('erweima');">立即关注绑定</div>
    </div>



    <div class="main">
      <!-- <div class="myatt">
				<span class="span">项目订阅：</span>
				<span v-for="(item,index) in item" v-if="item.show && item.type==4" class="mav_span on" @click="onadd(index)" :key="index">{{item.yewuname}}</span>
			</div> -->
      <div>
        <div class="myatt">
          <!--<span class="span">项目订阅：</span>-->
          <div class="span">项目订阅：</div>
          <div class="clause">
            <span v-for="(item,index) in hyNameList" class="mav_span on" :key="index" @click="del(index,item.name)">{{item.name}}</span>
          </div>
          <div class="tianjia hold" @click="send" v-if="opends==false">添加订阅</div>
          <div class="tianjia hold baocun" v-else="" @click="hold">保存</div>
        </div>

        <div v-if="opend">
          <div class="noatt">
            <span class="span">待添加的项目订阅：</span>
            <span v-for="(item,index) in item" v-if="!item.show && item.type==4" class="mav_span" @click="fbsq(index)"
              :key="index">{{item.yewuname}}</span>
          </div>
          <!-- <div class="noatt baocun"> -->
            <!-- <div class="hold holds" @click="hold">保&nbsp;&nbsp;存</div> -->
            <!-- <x-button type="primary" mini @click.native="hold" class="makeSureHY">保存</x-button> -->
         <!-- </div> -->
        </div>
      </div>



      <div class="myatt">
        <span class="span">众包订阅：</span>
        <div class="clause">
          <span v-for="(item,index) in item" v-if="item.show && item.type==1" class="mav_span on" @click="onadd(index,item.yewuname)"
            :key="index">{{item.yewuname}}</span>
        </div>
        <div class="tianjia hold" @click="send1" v-if="opend1==false">添加订阅</div>
        <div class="tianjia hold" v-else="" @click="hold1">保存</div>

      </div>
      <div>
        <div v-if="opend1">
          <div class="noatt">
            <span class="span">待添加的众包订阅：</span>
            <span v-for="(item,index) in item" v-if="!item.show && item.type==1" class="mav_span" @click="onadds(index)"
              :key="index">{{item.yewuname}}</span>
          </div>
          <!--<div class="noatt baocun">
						<div class="hold holds" @click="hold1">保&nbsp;&nbsp;存</div>
					</div>-->
        </div>
      </div>



      <div class="myatt">

        <span class="span">活动订阅：</span>
        <div class="clause">
          <span v-for="(item,index) in item" v-if="item.show && item.type==2" class="mav_span on" @click="onadd(index,item.yewuname)"
            :key="index">{{item.yewuname}}</span>
        </div>
        <div class="tianjia hold" @click="send2" v-if="opend2==false">添加订阅</div>
        <div class="tianjia hold" v-else="" @click="hold2">保存</div>
      </div>
      <div>
        <div v-if="opend2">
          <div class="noatt">
            <span class="span">待添加的活动订阅：</span>
            <span v-for="(item,index) in item" v-if="!item.show && item.type==2" class="mav_span" @click="onadds(index)"
              :key="index">{{item.yewuname}}</span>
          </div>
          <!--<div class="noatt baocun">
						<div class="hold holds" @click="hold2">保&nbsp;&nbsp;存</div>
					</div>-->
        </div>

      </div>




      <div class="myatt">
        <span class="span">直播订阅：</span>
        <div class="clause">
          <span v-for="(item,index) in item" v-if="item.show && item.type==3" class="mav_span on" @click="onadd(index,item.yewuname)"
            :key="index">{{item.yewuname}}</span>
        </div>
        <div class="tianjia hold" @click="send3" v-if="opend3==false">添加订阅</div>
        <div class="tianjia hold" v-else="" @click="hold3">保存</div>
      </div>
      <div>
        <div v-if="opend3">
          <div class="noatt">
            <span class="span">待添加的直播订阅：</span>
            <span v-for="(item,index) in item" v-if="!item.show && item.type==3" class="mav_span" @click="onadds(index)"
              :key="index">{{item.yewuname}}</span>
          </div>
          <!--<div class="noatt baocun">
						<div class="hold holds" @click="hold3">保&nbsp;&nbsp;存</div>
					</div>-->
        </div>
      </div>

      <!-- <div class="noatt">
				 <span class="span">我要订阅-项目：</span>
				<checker  type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected" :max="5">
					<checker-item :value="item" v-for="(item, index) in item" :key="index" v-if="!item.show && item.type==4" class="mav_span" @click="fbsq(index)">{{item.yewuname}}</checker-item>
				</checker>
			</div> -->



      <!-- <div class="noatt">
			    <span class="span">我要订阅-项目：</span>
			    <span v-for="(item,index) in item" v-if="!item.show && item.type==4" class="mav_span" @click="fbsq(index)" :key="index" >{{item.yewuname}}</span>
			</div> -->



      <!-- <div class="noatt">
			    <span class="span">我要订阅-项目：</span>
			    <span v-for="(item,index) in item" v-if="!item.show && item.type==4" class="mav_span" @click="onadd(index)" :key="index" >{{item.yewuname}}</span>
			</div> -->




      <!--  <div class="noatt">
                <span class="span">我要订阅-合作：</span>
                <span v-for="(item,index) in item" v-if="!item.show && item.type==1" class="mav_span" @click="onadd(index)" :key="index">{{item.yewuname}}</span>
            </div> -->
      <!--  <div class="noatt">
                <span class="span">我要订阅-活动：</span>
                <span v-for="(item,index) in item" v-if="!item.show && item.type==2" class="mav_span" @click="onadd(index)" :key="index">{{item.yewuname}}</span>
            </div>
            <div class="noatt">
                <span class="span">我要订阅-直播：</span>
                <span v-for="(item,index) in item" v-if="!item.show && item.type==3" class="mav_span" @click="onadd(index)" :key="index">{{item.yewuname}}</span>
            </div> -->
    </div>

    <!-- 弹窗 -->


    <div v-transfer-dom style="position:relative">
      <x-dialog v-model="show3" class="dialogHangye" :hide-on-blur="true">
        <div style="padding:15px;" class="dialogHangyeBox">
          <div class="checkBox">
            <checker v-model="hangyeList" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected"
              :max="5">
              <checker-item :value="items" v-for="(items, index) in itemHangye" :key="index">{{items.name}}</checker-item>
            </checker>
          </div>
          <x-button type="primary" mini @click.native="makeSureHY" class="makeSureHY">确定</x-button>
        </div>
      </x-dialog>
    </div>


    <div class="fb" @touchmove.prevent @click="close($event)" v-if="isshow">
      <div class="fb-card" ref="msk">

        <div class="quxiao">你确定取消</div>
        <div class="guanjian">{{names}}的订阅?</div>
        <div class="queding">
          <div @click="define">确定</div>
          <div @click="cancel">取消</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {
    XHeader,
    XDialog,
    XButton,
    TransferDomDirective as TransferDom,
    Checker,
    CheckerItem
  } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      XDialog,
      XButton,
      Checker,
      CheckerItem
    },
    data() {
      return {
        item: undefined,
        shuoming: null,
        show3: false,
        formCompany: '', //行业分类
        hyNameList: [], //已订阅项目
        hangyeList: [], //选择项目
        itemHangye: [], //弹框展示
        hyList: [],
        opend: false,
        opend1: false,
        opend2: false,
        opend3: false,
        showing: false,
        opends: false,
        isshow: false,
        name: '',
        indexs: '',
        subscript: '',
        //				showing:false,
        //				memSubscribe:false,
      }
    },
    computed: {
      userlabel() {
        return this.$store.state.user.mem_label;
      }
    },

    mounted() {
      //      	console.log(this.indexs)
      var _this = this;
      _this.band()
      // _this.shuji();
      _this.$http.post(_this.$store.state.url + '/Homecenter/get_label_all', {
        'load': true,
      }).then((res) => {
        // console.log(res)
        if (!res) return;
        for (let i in res) {
          res[i].show = _this.userlabel.indexOf(res[i].id.toString()) == -1 ? false : true;
          //                  _this.showing = res[i].show
        }
        _this.item = res;
      })
      _this.$http.post(_this.$store.state.url + '/index/userxieyi', {
        'load': true,
        name: 7
      }).then((res) => {
        if (!res) return;
        _this.shuoming = res.text;
      })


    },
    created() {
      var _this = this;
      _this.shuji();


    },
    methods: {

      onadd(index, name) {
        this.isshow = true
        this.names = name
        this.subscript = index
        this.indexs = -1
        //              this.item[index].show = !this.item[index].show
      },
      onadds(index) {
        this.item[index].show = !this.item[index].show
      },

      /*form1() {
				 var _this = this;
				 _this.$router.push('/user');

			   _this.$http.post(_this.$store.state.url + '/Homecenter/memberLabel', {
			        'load': true,
			        memlabel:_this.filter()
			    }).then((res) => {
			        // if(!res) return;
			        msg('信息已提交');
			        _this.$store.dispatch('getUser');

			    })

				_this.$http.post(_this.$store.state.url+'/Collection/projectSubscribe',{
					'load': true,
					 project:_this.article()
				}).then((res)=>{

				})

			},*/

      form() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Homecenter/memberLabel', {
          'load': true,
          memlabel: _this.filter()
        }).then((res) => {
          // if(!res) return;
          // msg('信息已提交');
          _this.$store.dispatch('getUser');
          // _this.$router.push('/user');
        })

        _this.$http.post(_this.$store.state.url + '/Collection/projectSubscribe', {
          'load': true,
          project: _this.article()
        }).then((res) => {
          if(_this.article().length>0) {
            msg('您已订阅成功')
          } else {
            msg('您已取消订阅')
          }

        })

      },
      filter() {
        let arr = [];
        _.each(this.item, function(e) {
          if (e.show) {
            arr.push(e.id)
          }
        })
        return arr;
      },
      article() {
        let list = [];
        /* _.each(this.item, function(e) {
        	// console.log(this.hyNameList)
        	if(e.type==4 && e.show==true)
                list.push(e.yewuname)

        })
        return list;*/
        this.hyNameList.forEach(v => {
          list.push(v.name)

        })
        return list

      },

      // 显示弹窗
      fbsq(i) {
        this.show3 = true
        this.$http.post(this.$store.state.url + '/Collection/contentSearch', {
          keyWord: this.item[i].yewuname,
          key_id: this.item[i].key_id
        }).then(res => {
          this.itemHangye = res
          // console.log(this.item[i].key_id)
        })
      },
      // 关闭弹窗
      makeSureHY() {
        this.show3 = false;
        this.hyList = this.hangyeList
        /*for(var i in this.hangyeList){
        	this.hyList.push(this.hangyeList[i].name)
        }*/
        this.hyNameList = [...new Set(this.hyList)]
      },
      shuji() {
        this.$http.post(this.$store.state.url + '/Collection/retKeyList', {}).then(res => {
          // console.log(res)
          for (var i in res) {
            this.hyNameList.push(res[i])
          }
          this.hangyeList = res
        })
      },
      del(i, name) {
        this.isshow = true

        this.names = name
        this.indexs = i
        console.log(this.indexs, 0)
        console.log(this.names)
        //				this.hyNameList.splice(i,1)
        //				this.hangyeList=this.hyNameList
        /*this.$http.post(this.$store.state.url+'/Collection/delKeyword',{
        	keyword:this.hyNameList[i]
        }).then(res=>{
        	this.hyNameList.splice(i,1)
        	this.hangyeList=this.hyNameList
        })*/

      },
      //			确定
      define() {
        console.log(this.indexs, 1)
        //				console.log(this.subscript)
        //				console.log(this.item[this.subscript])
        this.item[this.subscript] = !this.item[this.subscript]

        if (this.indexs != -1) {
          this.hyNameList.splice(this.indexs, 1)
          this.hangyeList = this.hyNameList
        }

        this.isshow = false
        this.form()
      },
      //			取消
      cancel() {
        this.isshow = false
      },
      //			关闭弹窗
      close(ev) {
        var _this = this;
        if (!_this.$refs.msk.contains(ev.target)) {
          _this.isshow = false;
        }
      },
      send() {
        this.opend = !this.opend
        if (this.opend == true) {
          this.opends = true
        }
      },
      hold() {
        this.opend = false
        this.opends = false
        this.form()
      },

      send1() {
        this.opend1 = !this.opend1
      },
      hold1() {
        this.opend1 = !this.opend1
        this.form()
      },
      send2() {
        this.opend2 = !this.opend2
      },
      hold2() {
        this.opend2 = false
        this.form()
      },
      send3() {
        this.opend3 = !this.opend3
      },
      hold3() {
        this.opend3 = false
        this.form()
      },
      band() {
        var _this = this;
        _this.$http.post(_this.$store.state.url + '/Collection/isSubscribe', {

        }).then(res => {
          _this.memSubscribe = res.memSubscribe
          if (res.memSubscribe == 1) {
            this.showing = false
          } else {
            this.showing = true
          }
        })
      },
    }

  }
</script>

<style scoped>
  .myatt {
    position: relative
  }

  .myatt,
  .noatt {
    display: flex;
    align-content: flex-end;
    flex-wrap: wrap;
    background: #fff;
    margin-top: 10px;
    padding: 10px 0;
  }

  .clause {
    display: flex;
    align-content: flex-end;
    flex-wrap: wrap;
    background: #fff;
    width: 100%;
  }

  .description {
    padding: 5px;
    line-height: 0.8rem;
  }

  .myatt .span,
  .noatt .span {
    line-height: 30px;
    padding: 0 10px;
    margin: 5px 10px;
    border: 1px solid #fff;
  }

  .myatt .mav_span,
  .noatt .mav_span {
    font-size: 13px;
    line-height: 30px;
    background: #ebf3fe;
    border-radius: 20px;
    padding: 0 10px;
    margin: 5px 5px;
    border: 1px solid #5b7ec2;
    color: #517fd7;
  }

  .myatt .mav_span.on,
  .noatt .mav_span.on {
    border-color: #d26739;
    background: #ffeee6;
    color: #ff4b28;
  }

  .flip-list-move {
    transition: transform 1s;
  }

  .dialogHangye .dialogHangyeBox {
    height: 300px;
    overflow: auto;
    text-align: initial;
  }

  .dialogHangye .dialogHangyeBox .makeSureHY {
    display: block;
    margin: 0px auto;
  }

  .dialogHangye .dialogHangyeBox .checkBox {
    height: 250px;
    overflow: auto;
    text-align: initial;
    margin-bottom: 10px;
  }

  .dialogHangye .dialogHangyeBox .checkBox .demo1-item {
    font-size: 13px;
    line-height: 20px;
    background: #ebf3fe;
    border-radius: 20px;
    padding: 0 10px;
    margin: 5px 5px;
    border: 1px solid #5b7ec2;
    color: #517fd7;
    display: inline-block;
  }

  .dialogHangye .dialogHangyeBox .checkBox .demo1-item-selected {
    border-color: #d26739;
    background: #ffeee6;
    color: #ff4b28;
  }

  .vux-cell-box:not(:first-child):before {
    border-top: 0px;
  }

  .vux-cell-value {
    font-size: 15px;
  }

  .tianjia {
    /*position:absolute;*/
    /*bottom:0px;
		right:10px;*/
    margin-left: 7.5rem;
    /* margin: 0 auto; */
    padding: 6px 10px;
    width: 1.5rem;
  }
  .baocun {
    /* width: 1.2rem; */
    text-align: center;
  }
  .hold {
    color: #fff;
    background: #05D8E8;
    /*padding:6px 35px;*/
    border-radius: 20px;
    font-size: 14px;
  }

  .holds {
    margin: 0 auto;
    padding: 6px 35px;
  }

  .info_top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
  }

  .info_top div:nth-child(2) {
    /* height: 25px; */

    background: #F88F00;
    color: #FFFFFF;
    padding: 3px 6px;
    border-radius: 20px;
    box-sizing: border-box;
    /* line-height: 25px; */
  }


  .fb {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(210, 210, 210, 0.8);
    z-index: 100;
  }

  .fb-card {
    position: absolute;
    bottom: 0;
    top: 0;
    margin: auto;
    right: 0;
    left: 0;
    height: 200px;
    width: 200px;
    background: #fff;
    border-radius: 10px;
  }

  /*.fb-card div {
		background: white;
		text-align: center;
		font-size: 12px;
		padding: 15px 0;
	}

	.fb-card div:nth-child(2) {
		margin: 1px 0;
	}

	.fb-card div:nth-child(4) {
		margin-top: 3px;
	}*/
  .quxiao {
    width: 100%;
    height: 50px;
    margin-top: 30px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #000;
  }

  .queding {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .queding div {
    padding: 5px 10px;
    width: 40px;
    margin-right: 10px;
    background: #00D6CF;
    text-align: center;
    border-radius: 20px;
    font-size: 14px;
    color: #000;
    margin-top: 15px;
  }

  .guanjian {
    width: 100%;
    text-align: center;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }

  [v-cloak] {
    display: none !important;

  }
</style>
