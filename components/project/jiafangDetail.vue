<template>
	<div>
		<x-header :title="'甲方详情'" :left-options="{backText:''}" class="header"></x-header>
		<!-- 商机分析 -->
		<div class="times">
			<div class="fenxi">
				<div class='head-nav'>
					<div class="head-nav2">
						<div>招标单位</div>
						<h2>{{info.tenderingCompany}}</h2>
						<!-- <div class="guanzhu">关注</div> -->
						<div class="guanzhu" @click="follow(info.is_sub,info.company_id)" v-if="info.is_sub==1" style="background:gainsboro;">已关注</div>
						<div class="guanzhu" @click="guanzhu(info.is_sub,info.company_id)" v-else="">关注</div>
					</div>
					<div class="qiye">企业所在地：{{info.address}}</div>
				</div>
				<div class="zhaobiao shangji">
					<div class="zhaobiao1"  @click="zhaobioa2(info.pId,info.tenderingCompany,info.address,info.company_id)">
						<div class="zhaobiao2">
							<div class="tupian" style="margin-top:10px"><img src="/static/img/hangye.png"></div>
							<h2>招标记录</h2>
							<div>该企业历史招标</div>
						</div>
						<div class="zhaobiao3"><span class="big">{{info.tenderingRecord}}</span>条</div>
					</div>

					<div class="daili">
						<div class="history" @click="daili(info.pId,info.tenderingCompany,info.address,info.company_id)">
							<div class="daili2">
								<div class="tupian" ><img src="/static/img/hy.png"></div>
								<div>
									<h2>历史招标代理</h2>
									<div style="white-space:nowrap;">该企业的合作方</div>
								</div>
							</div>
							<div class="daili3"><span class="big">{{info.historyTendering}}</span>个</div>
						</div>
						<div class="history" @click="dailis(info.company_id,info.tenderingCompany,info.address)">
							<div class="daili2">
								<div class="tupian"><img src="/static/img/hy.png"></div>
								<div>
									<h2>历史中标乙方</h2>
									<div style="white-space:nowrap;">该企业的合作方</div>
								</div>
							</div>
							<div class="daili3"><span class="big">{{info.historyOne}}</span>个</div>
						</div>
					</div>
				</div>
				<div style="border:1px solid #E8E8E8;margin-top:15px"></div>

				<div class="youzhi" style="border-bottom:1px solid #707070;">
					<!-- <h2>该甲方优质服务商</h2> -->
					<h2>历史招标代理</h2>
				</div>

				<!-- <div class="foot" >
					<div class="foot-tu"><span>1</span></div>
					<div class="foot-jilu">
						<h2>河南省智慧优库网络科技有限公司</h2>
						<div class="foot-jilu1">
							<div>历史中标乙方</div>&#x3000;&#x3000;
							<div>中标记录</div>
						</div>
					</div>
					<div class="foot-ci">
						<div class="foot-ci2">43%</div>
						<div class="foot-ci3">中标35次</div>
					</div>
				</div> -->
				
				
				<div class="list" v-for="(item,index) in send" :key='index'>
					<div class="list_item">
						<div class="item_name"><span class="red"></span>{{item.agent}}</div>
						<div class="item_left">
							<div class="left_info">
								<svg t="1567475631389" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2016" width="20" height="20">
									<path d="M740.550323 895.229195c-2.236947 0-4.483104-0.505513-6.562463-1.530866l-223.00912-110.0003L287.958364 893.698329c-4.881171 2.408863-10.688433 1.951445-15.131629-1.192152-4.443196-3.14155-6.810103-8.464789-6.167466-13.867846l30.685883-257.948887L128.436184 431.096389c-3.5345-3.968381-4.678556-9.522887-2.996241-14.564717 1.681292-5.04183 5.929036-8.798387 11.137665-9.851369l242.10299-48.90892 119.157867-227.194442c2.562359-4.886287 7.623631-7.946996 13.140275-7.946996 5.516644 0 10.577916 3.060709 13.141298 7.946996l119.151727 227.194442 242.10299 48.90892c5.207605 1.052982 9.456373 4.809539 11.137665 9.850345 1.681292 5.04183 0.538259 10.596336-2.996241 14.564717L724.613352 620.690468l30.674627 257.947863c0.642636 5.40408-1.725294 10.726296-6.16849 13.867846C746.568387 894.310266 743.568053 895.229195 740.550323 895.229195zM167.787424 430.652274l156.160619 175.284165c2.826372 3.172249 4.157693 7.404644 3.65525 11.623735l-28.244274 237.424434 205.055213-101.141538c4.139274-2.041496 8.990768-2.041496 13.129019 0.001023l205.043956 101.140515-28.233018-237.424434c-0.50142-4.219091 0.829901-8.451486 3.65525-11.622712l156.155503-175.285189-223.691665-45.189202c-4.378727-0.88516-8.127098-3.696182-10.202363-7.653307L510.979764 169.417551 401.681452 377.810788c-2.075265 3.956102-5.822612 6.768147-10.202363 7.652284L167.787424 430.652274z" p-id="2017"></path>
								</svg>
								<div>代理招标: <span>{{item.agent_bidding}}</span>条</div>
							</div>
							<div class="left_info">
								<svg t="1567475791689" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2893" width="20" height="20">
									<path d="M159.8 766.5c-9.5 0-17.2-7.7-17.2-17.2V274c0-7.2 4.5-13.6 11.3-16.1 13-4.7 82.5-28.4 178.6-28.4 61.5 0 122.1 9.5 180.1 28.3 7.1 2.3 11.9 8.9 11.9 16.3v471.5c0 9.5-7.7 17.2-17.1 17.2-1.3 0-2.5-0.1-3.8-0.4-21.2-4.8-97.2-20.4-182.8-20.4-60.7 0-112.8 7.9-155 23.4-1.9 0.7-3.9 1.1-6 1.1z m8.8-486.3V737c42.8-13.9 93.9-21 152.2-21 77.3 0 146.9 12.4 177.8 18.8V280.6c-53.5-16.7-109.3-25.1-166-25.1-82-0.1-143.1 17.7-164 24.7z" p-id="2894"></path>
									<path d="M159.8 771.4c-12.2 0-22-9.9-22-22V274c0-9.2 5.8-17.5 14.5-20.7 13.1-4.8 83.3-28.7 180.3-28.7 62.1 0 123.1 9.6 181.6 28.6 9.1 2.9 15.3 11.4 15.2 21v471.5c0 12.2-9.9 22-22 22-1.6 0-3.3-0.2-4.9-0.5-21.1-4.8-96.6-20.3-181.7-20.3-60.1 0-111.7 7.8-153.3 23.1-2.5 0.9-5 1.4-7.7 1.4z m172.8-537c-95.3 0-164.1 23.4-176.9 28.1-4.8 1.8-8 6.4-8 11.5v475.3c0 6.8 5.5 12.3 12.3 12.3 1.5 0 2.9-0.3 4.3-0.8 42.7-15.7 95.4-23.7 156.7-23.7 86.1 0 162.5 15.7 183.8 20.6a12.291 12.291 0 0 0 15-12V274.2c0-5.3-3.4-10-8.5-11.7-57.6-18.7-117.7-28.1-178.7-28.1zM163.7 743.8v-467l3.3-1.1c22.5-7.5 83.6-25.1 165.5-25.1 57.1 0 113.5 8.5 167.5 25.3l3.4 1.1v463.9l-5.9-1.2c-33.6-7-101.3-18.7-176.8-18.7-57.7 0-108.4 7-150.7 20.7l-6.3 2.1z m9.8-460v446.6c41.9-12.7 91.4-19.2 147.3-19.2 72.2 0 137.3 10.6 172.9 17.7V284.2c-52-15.8-106.2-23.8-161.1-23.8-76.8-0.1-134.8 15.5-159.1 23.4z" p-id="2895"></path>
									<path d="M516.7 766.5c-9.5 0-17.2-7.7-17.2-17.2V274c0-7.2 4.5-13.7 11.3-16.1 13-4.7 82.5-28.4 178.6-28.4 61.5 0 122.1 9.5 180.1 28.3 7.1 2.3 11.9 8.9 11.9 16.3v471.5c0 9.5-7.7 17.2-17.1 17.2-1.3 0-2.5-0.1-3.8-0.4-21.2-4.8-97.2-20.4-182.8-20.4-60.7 0-112.8 7.9-155 23.4-2 0.7-4 1.1-6 1.1z m8.7-486.3V737c42.8-13.9 93.9-20.9 152.2-20.9 77.3 0 146.9 12.4 177.8 18.8V280.6c-53.5-16.7-109.3-25.1-166-25.1-81.9-0.1-143.1 17.7-164 24.7zM224.6 382.6c-1.9-7.2 2.6-14.5 9.8-16 13.1-2.8 35.1-6.8 61.7-9.4 52-4.9 97.6-2 136 8.7 7.2 2 11.3 9.6 8.8 16.7-2.2 6.5-9.1 10.2-15.7 8.3-70.6-19.6-154.7-5.4-185.5 1.1-6.6 1.4-13.3-2.7-15.1-9.4z m0 105.7c-1.9-7.2 2.6-14.5 9.8-16 13.1-2.8 35.1-6.8 61.7-9.4 52-4.9 97.6-2 136 8.7 7.2 2 11.3 9.6 8.8 16.7-2.2 6.5-9.1 10.2-15.7 8.3-70.6-19.6-154.7-5.4-185.5 1.1-6.6 1.4-13.3-2.7-15.1-9.4z m0 97.8c-1.9-7.2 2.6-14.5 9.8-16 13.1-2.8 35.1-6.8 61.7-9.4 52-4.9 97.6-2 136 8.7 7.2 2 11.3 9.6 8.8 16.7-2.2 6.5-9.1 10.2-15.7 8.3-70.6-19.6-154.7-5.4-185.5 1.1-6.6 1.4-13.3-2.7-15.1-9.4z" p-id="2896"></path>
									<path d="M516.7 771.4c-12.2 0-22-9.9-22-22V274c0-9.2 5.8-17.5 14.5-20.7 13.1-4.8 83.3-28.7 180.3-28.7 62.1 0 123.1 9.6 181.6 28.6 9.1 2.9 15.3 11.4 15.2 21v471.5c0 12.2-9.9 22-22 22-1.6 0-3.3-0.2-4.9-0.5-21.1-4.8-96.7-20.3-181.7-20.3-60.1 0-111.7 7.8-153.3 23.1-2.6 0.9-5.1 1.4-7.7 1.4z m172.7-537c-95.3 0-164.1 23.4-176.9 28.1-4.8 1.8-8 6.4-8 11.5v475.3c0 6.8 5.5 12.3 12.3 12.3 1.5 0 2.9-0.3 4.2-0.8 42.7-15.7 95.5-23.7 156.7-23.7 86 0 162.5 15.7 183.8 20.5a12.291 12.291 0 0 0 15-12V274.2c0-5.3-3.4-10-8.5-11.7-57.5-18.7-117.6-28.1-178.6-28.1zM520.5 743.8v-467l3.3-1.1c22.5-7.5 83.6-25.1 165.5-25.1 57.1 0 113.5 8.5 167.5 25.3l3.4 1.1v463.9l-5.9-1.2c-33.6-7-101.3-18.7-176.8-18.7-57.7 0-108.4 7-150.7 20.7l-6.3 2.1z m9.8-460v446.6c41.9-12.7 91.4-19.2 147.3-19.2 72.2 0 137.3 10.6 172.9 17.7V284.2c-52-15.8-106.2-23.8-161.1-23.8-76.8-0.1-134.8 15.5-159.1 23.4zM237.1 600.6c-7.9 0-15.1-5.3-17.2-13.3-1.3-4.8-0.5-9.7 2-13.9 2.6-4.2 6.7-7.1 11.5-8.1 13.8-2.9 35.7-6.9 62.3-9.5 52.5-5 98.8-2 137.8 8.8 4.7 1.3 8.8 4.6 11.1 8.9 2.3 4.4 2.7 9.4 1.1 14.1-3.1 8.9-12.6 14-21.6 11.5-69.1-19.2-151.1-5.6-183.2 1.2-1.3 0.2-2.5 0.3-3.8 0.3z m106.3-37.3c-14.9 0-30.5 0.8-46.7 2.3-26.1 2.5-47.7 6.4-61.2 9.3-2.2 0.5-4 1.8-5.2 3.7-1.2 1.9-1.5 4.1-0.9 6.3 1.1 4.2 5.3 6.7 9.5 5.8 32.8-6.9 116.6-20.8 187.8-1 4.1 1.1 8.4-1.1 9.7-5.2 0.7-2.1 0.5-4.4-0.5-6.4-1.1-2-2.8-3.4-5-4-25.9-7.2-55.2-10.8-87.5-10.8z m-106.3-60.4c-8 0-15.1-5.3-17.2-13.3-1.3-4.8-0.5-9.8 2.1-13.9 2.6-4.2 6.7-7.1 11.5-8.1 13.8-2.9 35.7-6.9 62.3-9.5 52.5-5 98.8-2 137.8 8.8 4.7 1.3 8.8 4.6 11.1 8.9 2.3 4.4 2.7 9.4 1.1 14.1-3.1 8.9-12.5 14-21.6 11.5-69.1-19.2-151.1-5.6-183.2 1.2-1.4 0.2-2.6 0.3-3.9 0.3z m106.3-37.4c-14.9 0-30.5 0.8-46.7 2.3-26.1 2.5-47.7 6.4-61.2 9.3-2.2 0.5-4 1.8-5.2 3.7-1.2 1.9-1.5 4.1-0.9 6.3 1.1 4.2 5.3 6.7 9.5 5.8 32.8-6.9 116.6-20.8 187.8-1 4.1 1.1 8.4-1.1 9.7-5.2 0.7-2.1 0.5-4.4-0.5-6.4-1.1-2-2.8-3.4-5-4-25.9-7.2-55.2-10.8-87.5-10.8z m-106.3-68.4c-8 0-15.1-5.3-17.2-13.3-1.3-4.9-0.5-9.8 2.1-13.9 2.6-4.2 6.7-7.1 11.5-8.1 13.7-2.9 35.7-6.9 62.3-9.5 52.5-5 98.8-2 137.8 8.8 4.7 1.3 8.8 4.6 11.1 8.9 2.3 4.4 2.7 9.4 1.1 14.1-3.1 8.9-12.6 14-21.6 11.5-69.1-19.2-151.1-5.6-183.2 1.2-1.4 0.2-2.6 0.3-3.9 0.3z m106.3-37.3c-14.9 0-30.5 0.8-46.7 2.3-26.1 2.5-47.7 6.4-61.2 9.3-2.2 0.5-4 1.8-5.2 3.7-1.2 1.9-1.5 4.1-0.9 6.3 1.1 4.2 5.3 6.7 9.5 5.8 32.8-6.9 116.6-20.8 187.8-1 4.1 1.1 8.4-1.1 9.7-5.2 0.7-2.1 0.5-4.4-0.5-6.4-1.1-2-2.8-3.4-5-4-25.9-7.2-55.2-10.8-87.5-10.8z" p-id="2897"></path>
									<path d="M582.1 382.6c-1.9-7.2 2.6-14.5 9.8-16 13.1-2.8 35.1-6.8 61.7-9.4 52-4.9 97.6-2 136 8.7 7.2 2 11.3 9.6 8.8 16.7-2.2 6.5-9.1 10.2-15.7 8.3-70.6-19.6-154.7-5.4-185.5 1.1-6.7 1.4-13.3-2.7-15.1-9.4z m0 105.7c-1.9-7.2 2.6-14.5 9.8-16 13.1-2.8 35.1-6.8 61.7-9.4 52-4.9 97.6-2 136 8.7 7.2 2 11.3 9.6 8.8 16.7-2.2 6.5-9.1 10.2-15.7 8.3-70.6-19.6-154.7-5.4-185.5 1.1-6.7 1.4-13.3-2.7-15.1-9.4z m0 97.8c-1.9-7.2 2.6-14.5 9.8-16 13.1-2.8 35.1-6.8 61.7-9.4 52-4.9 97.6-2 136 8.7 7.2 2 11.3 9.6 8.8 16.7-2.2 6.5-9.1 10.2-15.7 8.3-70.6-19.6-154.7-5.4-185.5 1.1-6.7 1.4-13.3-2.7-15.1-9.4z" p-id="2898"></path>
									<path d="M594.6 600.6c-8 0-15.1-5.3-17.3-13.3l-0.1-0.2c-1.2-4.7-0.4-9.6 2.1-13.7 2.6-4.2 6.7-7.1 11.5-8.1 13.8-2.9 35.7-6.9 62.3-9.5 52.5-5 98.8-2 137.8 8.8 4.7 1.3 8.8 4.6 11.1 8.9 2.3 4.4 2.7 9.4 1.1 14.1-3.1 8.9-12.5 14-21.6 11.4-69.1-19.2-151.1-5.6-183.2 1.2-1.2 0.3-2.5 0.4-3.7 0.4z m-7.7-15.6c1.2 4.1 5.3 6.6 9.4 5.7 32.8-6.9 116.6-20.8 187.8-1 4.1 1.1 8.4-1.1 9.7-5.2 0.7-2.1 0.5-4.4-0.5-6.4-1.1-2-2.8-3.4-5-4-37.7-10.5-82.9-13.4-134.2-8.5-26.1 2.5-47.7 6.4-61.2 9.3-2.2 0.5-4 1.8-5.2 3.7-1.2 1.9-1.5 4.1-0.9 6.3l0.1 0.1z m7.7-82.1c-8 0-15.1-5.3-17.2-13.3l-0.1-0.2c-1.2-4.7-0.4-9.6 2.1-13.7 2.6-4.2 6.7-7.1 11.5-8.1 13.8-2.9 35.7-6.9 62.3-9.5 52.5-5 98.8-2 137.8 8.8 4.7 1.3 8.8 4.6 11.1 8.9 2.3 4.4 2.7 9.4 1.1 14.1-3 8.9-12.6 14-21.6 11.5-69.1-19.2-151.1-5.6-183.2 1.2-1.3 0.2-2.6 0.3-3.8 0.3z m-7.7-15.7c1.2 4.1 5.3 6.6 9.4 5.7 32.8-6.9 116.6-20.8 187.8-1 4.1 1.1 8.4-1.1 9.7-5.2 0.7-2.1 0.5-4.4-0.5-6.4-1.1-2-2.8-3.4-5-4-37.8-10.5-82.9-13.4-134.2-8.5-26.1 2.5-47.7 6.4-61.2 9.3-2.2 0.5-4 1.8-5.2 3.7s-1.5 4.1-0.9 6.3l0.1 0.1z m7.7-90.1c-8 0-15.1-5.3-17.2-13.3v-0.2c-1.2-4.7-0.5-9.6 2.1-13.8 2.6-4.2 6.7-7.1 11.5-8.1 13.8-2.9 35.7-6.9 62.3-9.5 52.5-5 98.8-2 137.8 8.8 4.7 1.3 8.8 4.6 11.1 8.9 2.3 4.4 2.7 9.4 1.1 14.1-3 8.9-12.5 14-21.6 11.5-69.1-19.2-151.1-5.6-183.2 1.2-1.4 0.3-2.7 0.4-3.9 0.4z m-7.7-15.6c1.1 4.1 5.3 6.6 9.5 5.7 32.8-6.9 116.6-20.8 187.8-1 4.1 1.1 8.4-1.1 9.7-5.2 0.7-2.1 0.5-4.4-0.5-6.4-1.1-2-2.8-3.4-5-4-37.8-10.5-82.9-13.4-134.2-8.5-26.1 2.5-47.7 6.4-61.2 9.3-2.2 0.5-4 1.8-5.2 3.7s-1.5 4.1-0.9 6.3v0.1z" p-id="2899"></path>
								</svg>
								<div>关联企业：<span>{{item.relevant_party_a}}</span>家</div>
							</div>
						</div>
					</div>
					<div class="right">
						<svg t="1567483087308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3621" width="20" height="20">
							<path d="M346.52382345477406 104.43830532674417c-12.257495055447652-12.257495055447652-30.6437359627898-12.257495055447652-42.90123101823747 0s-12.257495055447652 30.6437359627898 0 42.90123101823747L668.2830560915551 512 303.6225924365366 876.6604636550185c-12.257495055447652 12.257495055447652-12.257495055447652 30.6437359627898 0 42.90123101823747 6.128747527723826 6.128747527723826 15.3218679813949 9.193120453671073 21.450615509118734 9.193120453671073s15.3218679813949-3.064372925947246 21.450615509118734-9.193120453671073l386.1110791641372-386.1110791641372c12.257495055447652-12.257495055447652 12.257495055447652-30.6437359627898 0-42.90123101823747L346.52382345477406 104.43830532674417z" fill="" p-id="3622"></path>
						</svg>
					</div>
				</div>
				
				
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	export default {
		components: {
			XHeader,
			
		},
		data() {
			return {
				info:'',
				send:''
			}
		},
		mounted() {
			let _this = this;
			_this.business()
			_this.$http.post(_this.$store.state.url+'/Collection/historyBiddingAgentFive',{
				pId:_this.$route.query.id
			}).then(res=>{
				console.log(res)
				_this.send=res
				// console.log(_this.send)
			})
		},
		methods: {
			
			business() {
				let _this = this;
				_this.$http.post(_this.$store.state.url + '/Collection/businessFive', {
					pId: _this.$route.query.id
				}).then((res) => {
					_this.info = res;
				})
			},
			
			guanzhu(is_sub,id){
				let _this = this;
				_this.$http.post(_this.$store.state.url + "/Collection/coSub",{
					is_sub:is_sub,
					company_id:id
				}).then(res=>{
					_this.business()
				})
			},
			//取消关注
			follow(is_sub,id){
				let _this = this;
				_this.$http.post(_this.$store.state.url + "/Collection/coSub",{
					is_sub:is_sub,
					company_id:id
				}).then(res=>{
					_this.business()
				})
			},
			
			zhaobioa2(id,des,cen,company_id){
				this.$router.push("zhaobiao?id="+id+"&des="+des+"&cen="+cen+"&company_id="+company_id)
			},
			daili(id,des,cen,company_id) {
				let _this = this;
				_this.$router.push("daili?id="+id+"&des="+des+"&cen="+cen+"&company_id="+company_id)
			},
			dailis(id,des,cen) {
				let _this = this;
				_this.$router.push("dailiyifang?id="+id+"&des="+des+"&cen="+cen)
			}
		}
	}
</script>

<style scoped>
	.times {
		background: #fff;
	}
	
	.time {
		color: #666666;
		padding-top: 15px;
		width: 90%;
		margin: 0 auto;
		font-size: 14px;
	}
	
	.time .zhuti {
		color: #F88F00
	}
	
	.time2 {
		margin-top: 10px
	}
	
	.touch,
	.fenxi {
		background: #fff;
		margin: 0 auto;
		width: 90%
	}
	
	.contact {
		border-bottom: 1px solid #707070;
		height: 50px;
		padding-top: 10px
	}
	
	.contact h2 {
		color: #000000;
		font-weight: normal;
		font-size: 14px;
	}
	
	.jiafang {
		font-size: 12px;
		color: #666666;
		display: flex;
		justify-content: space-between;
	}
	
	.jiafang .kuang {
		color: #F88F00;
		padding: 0px 6px;
		border: 1px solid #F88F00;
		border-radius: 20px;
	}
	
	.fanzhan {
		font-size: 14px;
	}
	
	h4 {
		color: #000;
		font-size: 14px;
		font-weight: normal;
		margin-bottom: 10px;
	}
	
	.handset {
		display: flex;
		justify-content: space-between;
	}
	
	.handset .hand {
		width: 23px;
		height: 18px;
	}
	
	.handset .hand img {
		width: 100%
	}
	
	.beizhu {
		color: #F88F00;
		font-size: 12px
	}
	
	.head-nav {
		/*height: 75px;*/
		width: 100%;
		border-bottom: 1px solid #707070;
		padding-top: 15px
	}
	
	.head-nav2 {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
	}
	
	.qiye {
		color: #666666;
		font-size: 14px;
		margin-top: 15px;
	}
	
	.head-nav2 .guanzhu {
		background: #F88F00;
		padding: 0 10px;
		border-radius: 20px;
		color: #fff;
		height: 20px;
	}
	
	.head-nav2 h2 {
		color: #000000;
		width: 64%;
	}
	
	.head-nav2:first-child {
		color: #01B0B7
	}
	
	
	
	.zhaobiao {
		padding: 15px 0;
		/*width: 90%;*/
		margin: 0 auto;
	}
	
	.zhaobiao1 {
		background: #E8E8E8;
		padding: 0 8px;
		color: #333;
	}
	
	.zhaobiao2 {
		display: flex;
		justify-content: space-between;
		height: 48px;
		line-height: 48px;
		border-bottom: 1px solid #707070;
	}
	.zhaobiao2 h2{
		font-size:14px
	}
	
	.tupian {
		height: 30px;
		width: 30px;
		margin-right: 10px
	}
	
	.zhaobiao2 img {
		width: 100%
	}
	
	.zhaobiao3 {
		height: 48px;
		text-align: center;
		color: #F88F00;
		font-size: 10px;
		line-height: 48px;
	}
	
	.daili {
		margin-top: 15px;
		display: flex;
		justify-content: space-between;
	}
	
	.history {
		width: 48%;
	}
	
	.daili2 {
		/*width: 120px;*/
		padding: 8px 8px;
		display: flex;
		/*justify-content: space-between;*/
		align-items: center;
		background: #E8E8E8;
		font-size: 12px;
	}
	
	.daili3 {
		/*width: 120px;*/
		height: 48px;
		line-height: 48px;
		border-top: 1px solid #707070;
		text-align: center;
		font-size: 10px;
		background: #E8E8E8;
		padding: 0 8px;
		color: #F88F00;
	}
	.shangji {
		padding: 10px;
	}
	
	/* .zhaobiao {
		padding: 15px 0;
		
		margin: 0 auto;
	}
	
	.zhaobiao1 {
		background: #E8E8E8;
		padding: 0 8px;
		color: #333;
	}
	
	.zhaobiao2 {
		display: flex;
		justify-content: space-between;
		height: 48px;
		line-height: 48px;
		border-bottom: 1px solid #707070;
	}
	
	.tupian {
		height: 30px;
		width: 30px;
		margin-top: 10px
	}
	
	.zhaobiao2 img {
		width: 100%
	}
	
	.zhaobiao3 {
		height: 48px;
		text-align: center;
		color: #F88F00;
		font-size: 10px;
		line-height: 48px;
	}
	
	.daili {
		margin-top: 15px;
		display: flex;
		justify-content: space-between;
	}
	
	.history {
		width: 48%;
	}
	
	.daili2 {
		
		padding: 8px 8px;
		display: flex;
		justify-content: space-between;
		background: #E8E8E8;
	}
	
	.daili3 {
		
		height: 48px;
		line-height: 48px;
		border-top: 1px solid #707070;
		text-align: center;
		font-size: 10px;
		background: #E8E8E8;
		padding: 0 8px;
		color: #F88F00;
	} */
	
	.youzhi {
		height: 60px;
		padding: 0 0 0 30px;
		line-height: 70px;
	}
	
	.foot {
		padding: 20px 0 15px 0;
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #666
	}
	
	.foot-tu {
		height: 60px;
		width: 50px;
		background: url("/static/img/jiangpai.png");
		background-size: 100% 100%;
		position: relative;
	}
	
	.foot-tu span {
		color: #FFFFFF;
		text-align: center;
		display: block;
		position: relative;
		top: 20px;
		font-size: 18px;
	}
	
	.foot-jilu {
		font-weight: 12px;
		color: #666;
		text-align: right;
	}
	
	.foot-jilu h2,
	.youzhi h2 {
		color: #000;
		font-size: 14px;
		font-weight: normal;
	}
	
	.foot-jilu1 {
		display: flex;
		margin-top: 15px
	}
	
	.foot-ci {
		text-align: right;
	}
	
	.foot-ci2 {
		color: firebrick;
		font-size: 14px;
	}
	
	.foot-ci3 {
		margin-top: 15px;
		color: #F88F00;
		font-size: 12px;
	}
	
	.big {
		font-size: 20px;
	}
	
	.left_info {
		display: flex;
		width: 50%;
		/*justify-content: ;*/
	}
	.item_left {
		display: flex;
		/*width: 80%;*/
	}
	
	.list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		margin-bottom: 1px;
		padding: 10px;
		box-sizing: border-box;
	}
	
	.item_name {
		font-size: 16px;
		display: flex;
		align-items: center;
		font-weight: 600;
	}
	
	.list_item {
		width: 80%;
	}
	
	.red {
		color: #FF0000;
		display: inline-block;
		width: 5px;
		height: 5px;
		background: #FF0000;
		border-radius: 50%;
		margin-right: 5px;
	}
</style>