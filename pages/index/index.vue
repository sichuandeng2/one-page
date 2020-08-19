<template>
	<view class="clock-page">
		<!-- 考勤 -->
		<view class="page-info">
			<view class="page-info-circle">
				<view class="page-info-circle-text">{{user.name}}</view>
			</view>
			<view class="page-info-attence">
				<view style="font-weight: 800;font-size: 32rpx;">{{user.name}}</view>
				<view @click="gotoAttendance()" style="padding-top: 10rpx;color: #666;">
					<text>考勤</text>
					<uni-icons type="arrowright" size="12" style="color: #666;"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 打卡 -->
		<view class="page-clock">
			<view class="page-clock-clock" style="margin-top: 200rpx;" @click="clock()">
				<view class="page-clock-clock-title">打卡</view>
				<view class="page-clock-clock-text">{{now}}</view>
			</view>
			<!-- 地址 -->
			<view class="page-clock-adress" style="padding: 0 30rpx;">
				<view class="page-clock-adress-mark">
					<uni-icons type="location-filled"></uni-icons>
				</view>
				<view style="padding-left: 10rpx;">{{localAdress}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	var timeInterval; //时间定时器
	var locationInterval; //地址定时器
	export default {
		data() {
			return {
				flag: false, //打卡开关
				user: {}, //登录数据
				now: "", //当前时间
				startWork: null, //开始打卡时间
				afterWork: null, //结束打卡时间
				latitude: "", //纬度
				longitude: "", //经度
				localAdress: "", //当地地址
			}
		},
		onLoad() {
			clearInterval(timeInterval);
			clearInterval(locationInterval);
			this.user = uni.getStorageSync('user');
			if (!this.user) {
				uni.clearStorageSync('token');
				uni.clearStorageSync('user');
				uni.reLaunch({
					url: '../login/login'
				})
			}
			this.getTime();
			this.getLocation();
			timeInterval = setInterval(this.getTime, 1000);
			locationInterval = setInterval(this.getLocation, 5000);
		},
		methods: {
			// 获取定位
			getLocation() {
				uni.getLocation({
					type: "gcj02", //国测局坐标
					geocode: true, //允许解析
					success: (res) => {
						this.localAdress = res.address.poiName;
						this.longitude = res.longitude;
						this.latitude = res.latitude;
						let parameter = {
							userNo: this.user.username,
							longitude: this.longitude,
							latitude: this.latitude
						}
						// 获取打卡范围
						request.get('/api/v1/employeePunchInOut/checkDistance', parameter).then(res => {
							if (res.code == '0') {
								if (res.data.gap > res.data.distance) {
									//设定打卡限制,不能打卡
									this.flag = false
								} else {
									//解除打卡限制,允许打卡
									this.flag = true
								}
							} else {
								//设定打卡限制,不能打卡
								this.flag = false
							}
						})
					}
				});
			},

			//获取时间
			getTime() {
				var date = new Date();
				var hour = date.getHours();
				var minute = date.getMinutes();
				var second = date.getSeconds();
				hour <= 9 ? hour = "0" + hour : hour;
				minute <= 9 ? minute = "0" + minute : minute;
				second <= 9 ? second = "0" + second : second;
				this.now = hour + " : " + minute + " : " + second;
			},

			// 打卡事件
			clock() {
				//判断当前打卡是否允许
				if (this.flag) {
					//配置请求参数
					let parameter = {
						no: this.user.username, //员工工号
						longitude: this.longitude, //经度
						latitude: this.latitude //纬度
					}

					request.postJSON('/api/v1/employeePunchInOut/clock', parameter)
						.then(res => {
							if (res.code == 0) { //提交成功
								uni.navigateTo({
									url: '../clock/clockResult?time=' + this.now
								})
							} else {
								uni.showToast({
									title: res.msg,
									icon: "none"
								})
							}
						})
				} else {
					uni.showToast({
						title: '当前定位不在正常打卡范围内，无法打卡！',
						position: 'top'
					})
				}
			},

			// 查看考勤事件
			gotoAttendance() {
				uni.navigateTo({
					url: "../clock/attendanceStandards"
				})
			}
		},
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
			align-items: center;
			margin-bottom: 58rpx;
			margin-top: 30rpx;

			.page-info-attence {
				text-align: left;
				padding-left: 20rpx;
				font-size: 28rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

			}

			.page-info-circle {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: #009DFE;
				text-align: center;
				line-height: 100rpx;
				color: #FFFFFF;
				font-size: 24rpx;
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

				.page-clock-schedule-item {
					padding-top: 35rpx;
					width: 260rpx;

					.page-clock-schedule-item-text {
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
				background: #009DFE;
				margin: 0 auto;
				border-radius: 50%;

				.page-clock-clock-title {
					color: #fff;
					padding-top: 100rpx;
					font-size: 46rpx;
				}

				.page-clock-clock-text {
					color: #fff;
					font-size: 28rpx;
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
