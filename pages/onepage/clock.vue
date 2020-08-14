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
				<text>今日未排班</text>
			</view>
			<view class="page-clock-clock" @click="clock" :style="!isclock ? 'background-color: #EEEEEE':'background-color: rgb(0,157,254)'">
				<view class="page-clock-clock-title">打卡</view>
				<view class="page-clock-clock-text">{{now}}</view>
			</view>

			<view class="page-clock-adress">
				<view class="page-clock-adress-mark" :style="mark=='checkmarkempty' ? 'background-color: rgb(0,187,82)':'background-color: rgb(255,0,0)'">
					<uniIcons v-bind:type="mark" style="color:rgb(255,255,255)">
					</uniIcons>
				</view>
				<view @click="goMap()">{{address.localAdress}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	var getTimeInterval = null;
	var getLocationInterval = null;
	export default {
		data() {
			return {
				isclock: true //锁定打卡	
				,mark: "closeempty" //错误标记
				,user: {}	//登录数据
				,now: "" //当前时间
				
				//地址信息	
				,address: {
					latitude: "" //纬度
					,longitude: "" //经度
					,localAdress: "当前地址获取失败" //当地名称
				}
			}
		},
		onLoad() {
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
						res.address.streetNum;
						
						// console.log("全部信息："+JSON.stringify(res))
						
						this.address.localAdress=getAddress + "，当前精度："+res.accuracy;
						this.address.longitude=res.longitude; //获取经度
						this.address.latitude = res.latitude; //获取纬度
						this.mark = "checkmarkempty"; //获取地点成功标识
						this.isclock=true//解除打卡限制
						// console.log(this.address.localAdress);
						// console.log("经度:"+this.address.longitude+"纬度："+this.address.latitude);
						// uni.showModal({
						// 	content:"经度：" +this.address.longitude+"纬度："+this.address.latitude
						// })
					},
					fail: (res)=>{
						console.log("地址获取失败");
						this.mark="closeempty"; //获取地点失败标识
						this.address.localAdress="地址获取失败";
						this.isclock=false; //打卡限制
						uni.showToast({
							title:'获取地址失败'
							,icon: "none"
						})
					}
				});
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
				console.log("点击打卡");
				if(this.isclock)
				{
					uni.navigateTo({
						url: '../clock/default?clocktiem=' + this.now
					})
				}
				else{
					uni.showModal({
						cancelText:"请到允许的打卡范围打卡",
					})
				}
			}
			// 查看考勤事件
			,gotoAttendance: function() {
				uni.navigateTo({
					url: "../clock/attendanceStandards"
				})
			}
			//查看地图
			,goMap(){
				uni.navigateTo({
					url: "../clock/map?longitude="+this.address.longitude+"&latitude="+this.address.latitude
				})
			}
		}
		,onShow() {
			// 计时器
			console.log("定时器启动");
			this.getTime();
			this.getLocation();
			getTimeInterval=setInterval(this.getTime,1000);
			getLocationInterval=setInterval(this.getLocation,5000);
		}
		,onHide() {
			//清除定时器
			console.log("定时器移除");
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
				height: 300rpx;
				line-height: 300rpx;
				margin: 0 auto;
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
