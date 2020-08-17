<template>
	<view class="clock-page">

		<!-- 考勤 -->
		<view class="page-info">
			<view class="page-info-circle">
				<view class="page-info-circle-text">{{user.name}}</view>
			</view>
			<view class="page-info-attence">
				<view><text>{{user.name}}</text></view>
				<view @click="gotoAttendance">
					<text>考勤</text>
					<uniIcons type="arrowright" size="15"></uniIcons>
				</view>
			</view>
		</view>

		<!-- 打卡 -->
		<view class="page-clock">
			<view class="page-clock-schedule">
				<view class="page-clock-schedule-item">
					<view v-show="startWork!==null" class="page-clock-schedule-item-text" v-text="startWork"></view>
				</view>
				<view class="page-clock-schedule-item">
					<view v-show="afterWork!==null" class="page-clock-schedule-item-text" v-text="afterWork"></view>
				</view>
				
			</view>
			<view class="page-clock-clock" @click="clock" :style="!isLock ? 'background-color: #EEEEEE':'background-color: rgb(0,157,254)'">
				<view class="page-clock-clock-title">{{clockMark ? "上班打卡":"下班打卡"}}</view>
				<view class="page-clock-clock-text">{{now}}</view>
			</view>
			<!-- 地址 -->
			<view class="page-clock-adress">
				<view class="page-clock-adress-mark" :style="mark=='checkmarkempty' ? 'background-color: rgb(0,187,82)':'background-color: rgb(255,0,0)'">
					<uniIcons v-bind:type="mark" style="color:rgb(255,255,255)">
					</uniIcons>
				</view>
				<view>{{address.localAdress}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	var getTimeInterval = null;//时间定时器
	var getLocationInterval = null;//地址定时器
	var timerColck =true; //设置打卡间隙
	export default {
		data() {
			return {
				isLock: true //锁定打卡	
				,clockMark:true  //打卡状态标记：true为上班打卡||false为下班打卡
				,mark: "closeempty" //错误标记
				,user: {}	//登录数据
				,now: "" //当前时间
				,startWork:null
				,afterWork:null
				
				//地址信息	
				,address: {
					latitude: "" //纬度
					,longitude: "" //经度
					,localAdress: "当前地址获取失败" //当地名称
				}
			}
		},
		onLoad() {
			uni.showLoading({
			    title: '加载中'
			});
			this.user = uni.getStorageSync('user');
			if (!this.user) {
				uni.clearStorageSync('token');
				uni.clearStorageSync('user');
				uni.reLaunch({
					url: '../login/login'
				})
			}
			this.getLocation();
		},
		methods: {
			// 获取定位
			getLocation:function() {
				// #ifdef  APP-PLUS
				uni.getLocation({
					type: "gcj02", //国测局坐标
					geocode:true, //允许解析
					success:  (res) =>{
						//获取位置信息
						var getAddress = res.address.country+
						res.address.province+
						res.address.city+
						res.address.district+
						res.address.street+
						res.address.poiName;
												
						this.address.localAdress=getAddress;
						this.address.longitude=res.longitude; //获取经度
						this.address.latitude = res.latitude; //获取纬度
						this.mark = "checkmarkempty"; //获取地点成功标识
						
						//当前位置
						let parameter={
							longitude:this.address.longitude
							,latitude:this.address.latitude
						}
						// 获取打卡范围
						request.post('待定',parameter)
						.then(res=>{
							//配置请求参数
							let p={
								longitudeMax:res.data.longitudeMax,//经度最大值
								longitudeMin:res.data.longitudeMin,//经度最小值
								latitudeMax:res.data.latitudeMax,//纬度最大值
								latitudeMin:res.data.latitudeMin,//纬度最小值
							}
							
							//判断是否在打卡范围内
							if(res.latitude>p2.latitudeMin && 
								res.latitude<p2.latitudeMax &&
								res.longitude>p2.longitudeMin &&
								res.longitude<p2.longitudeMax)
							{
								this.isLock=true//解除打卡限制,允许打卡
							}
							else
							{
								this.isLock=false//设定打卡限制,不能打卡
							}
						})
						// this.isLock=true;
					},
					fail: (res)=>{
						console.log("地址获取失败");
						this.mark="closeempty"; //获取地点失败标识
						this.address.localAdress="地址获取失败";
						this.isLock=false; //打卡限制
						uni.showToast({
							title:'获取地址失败'
							,icon: "none"
						})
					}
				});
				// #endif
				uni.hideLoading(); //取消加载
			}
			//获取时间
			,getTime:function(){
				var date = new Date();
				var hour = date.getHours();
				var minute = date.getMinutes();
				var  second=date.getSeconds();
				hour<=9?hour= "0"+hour:hour;
				minute<=9?minute= "0"+minute:minute;
				second<=9?second= "0"+second:second;
				this.now=hour+":"+minute+":"+second;	
				// console.log(this.now);
			}
			
			// 打卡事件
			,clock() {
				// #ifdef H5
				// 运行时可直接删除该代码块
				if(true&&timerColck)		//为满足调试需求，选用条件H5编译。
				// #endif
				
				// #ifdef APP-PLUS 
				if(this.isLock && timerColck)   //判断当前打卡是否允许
				// #endif
				{
					//配置请求参数
					let parameter={	
						userNo :this.user.username//员工工号
						,longitude:this.address.longitude//经度
						,latitude:this.address.latitude//纬度
					}
					
					//该接口带替换，暂时采用 门店定位接口测试
					request.post('/api/v1/storePositionConfig/setStoreJW',parameter)
					.then(res=>{
						console.log(res)
						if (res.code == 0) {//提交成功
							if(this.clockMark)	//判断打卡标记
							{
								this.afterWork=null;
								timerColck=false;
								setTimeout(()=>{
									timerColck=true;
								},15000)
								this.startWork ="上班时间"+ this.now
							}
							else{
								this.afterWork ="下班时间"+this.now
							}
							uni.navigateTo({
								url: '../clock/clockResult?clockTiem=' + this.now +"&clockMark="+this.clockMark
							})
							this.clockMark = !this.clockMark;
						} 
						else {
							console.log("提交失败")
							uni.showToast({
								title: "提交失败"+ res.status+res.error ,
								icon:"none"
							})
						}
					})
				 }
				else{
					if(!this.isLock||!timerColck){
						if(!this.isLock){
							uni.showToast({
								title:"请到允许的打卡范围打卡",
								icon:"none"
							})
						}
						else{
							uni.showToast({
								title:"上下班打卡时间最少间隔15秒",
								icon:"none"
							})
						}
					}else{
						uni.showToast({
							title:"错了",
							icon:"none"
						})
					}
				}
			}
			
			// 查看考勤事件
			,gotoAttendance() {
				uni.navigateTo({
					url: "../clock/attendanceStandards"
				})
			}
		}
		,onShow() {
			// 计时器
			this.getTime();
			this.getLocation();
			getTimeInterval=setInterval(this.getTime,1000);
			getLocationInterval=setInterval(this.getLocation,5000);
		}
		,onHide() {
			//清除定时器
			clearInterval(getTimeInterval);
			clearInterval(getLocationInterval);
		}
	}
 </script>

<style lang="scss">
	.clock-page {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		.page-info {
			height: 180rpx;
			width: 674rpx;
			border-radius: 25rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 58rpx;
			margin-top: 30rpx;

			.page-info-attence {
				text-align: left;
				padding: 20rpx;
				font-size: 28rpx;
			}

			.page-info-circle {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: rgb(0, 157, 254);
				text-align: center;
				line-height: 100rpx;
				color: #FFFFFF;
				font-size: 32rpx;
				margin-left: 45rpx;
				.page-info-circle-text {}
			}
		}

		.page-clock {
			width: 674rpx;
			height: 926rpx;
			background-color: #FFFFFF;
			border-radius: 25rpx;
			text-align: center;

			.page-clock-schedule {
				height: 350rpx;
				margin: 0 auto;
				display: flex;
				justify-content: space-around;
				align-items: flex-start;
				font-size: 28rpx;
				.page-clock-schedule-item{
					padding-top: 35rpx;
					width: 260rpx;
					.page-clock-schedule-item-text{
						height: 88rpx;
						line-height: 88rpx;
						background-color: #EFEFEF;
						border: 1rpx solid #007AFF;
						border-radius: 10rpx;
					}
				}
			}

			.page-clock-clock {
				width: 300rpx;
				height: 300rpx;
				background: rgb(0, 157, 254);
				margin: 0 auto;
				border-radius: 50%;

				.page-clock-clock-title {
					color: #fff;
					padding-top: 100rpx;
				}

				.page-clock-clock-text {
					color: #fff;
					font-size: 24rpx;
					padding-top: 20rpx;
				}
			}

			.page-clock-adress {
				font-size: 28rpx;
				margin-top: 30rpx;
				display: flex;
				justify-content: center;

				.page-clock-adress-mark {
					margin-top: 8rpx;
					height: 28rpx;
					width: 28rpx;
					border-radius: 50%;
					color: #FFFFFF;
					line-height: 28rpx;
					font-size: 8rpx;
				}
			}
		}
	}
</style>
