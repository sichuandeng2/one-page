<template>
	<view class="page">
		<view class="home-page-body">

			<!-- 打卡统计 -->
			<view class="count">
				<view class="count-title" @click="details">
					<text>{{month}}月汇总</text>
					<uniIcons type="arrowright" size="25"></uniIcons>
				</view>
				<view class="count-holder">
					<view class="count-holder-item">
						<view>{{test.AverageManHour}}</view>
						<view class="count-holder-item-text">平均工时(小时)</view>
					</view>
					<view class="count-holder-item">
						<view>{{test.beLate}}</view>
						<view class="count-holder-item-text">迟到(次)</view>
					</view>
					<view class="count-holder-item">
						<view>{{test.leaveEarly}}</view>
						<view class="count-holder-item-text">早退(次)</view>
					</view>
				</view>
			</view>

			<!-- 月历信息 -->
			<view class="record">
				<!-- 打卡记录 -->
				<view class="record-title">
					<text>每日记录</text>
					<text class="record-title-item">({{month}}月)</text>
				</view>
				<!-- 月历模块 -->
				<view class="recor-calendar">
					<uni-calendar :insert="true" :showMonth="false" :start-date=startdate :end-date=enddate :selected=test.selected
					 @change="change" @monthSwitch="monthSwitch()" />
				</view>
			</view>

			<!-- 月历信息 -->
			<view class="record-info" style="">
				<view v-text="message" class="message"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCalendar from "~@/../components/uni-calendar/uni-calendar.vue"; //日历挂载
	export default {
		components: {
			uniCalendar
		},
		onLoad() {

			//  加载用户信息
			this.user = uni.getStorageSync('user');
			if (!this.user) {
				uni.clearStorageSync('token');
				uni.clearStorageSync('user');
				uni.reLaunch({
					url: '../login/login'
				})
			}
		},
		data() {
			return {

				//  考勤信息
				test: {
					AverageManHour: 0,
					beLate: 0,
					leaveEarly: 0,
					selected: [{
							date: "2020-08-20",
							info: "打卡",
							data: {
								message: "打卡8小时"
							}
						},
						{
							date: "2020-08-21",
							info: "未打卡",
							data: {
								message: "打卡0小时"
							}
						}
					]
				},
				//  获取登录信息
				user: {},
				//  月历开始日期
				startdate: null,
				//  月历结束日期
				enddate: null,
				//  当前月份 
				month: null,
				//  日期排班信息
				message: "无打卡记录"
			}
		},
		methods: {

			//  点击日期
			change(e) {
				var dates = this.test.selected;

				for (var i = 0; i < dates.length; i++) {
					console.log(e.fulldate)
					if (e.fulldate == dates[i].date) {
						this.message = dates[i].data.message;
						break;
					} else {
						this.message = "无打卡记录";
					}
				}
			},

			// 打卡记录
			details() {
				uni.navigateTo({
					url: "../clock/details"
				});
			},

			monthSwitch(res) {
				// console.log(JSON.stringify(res))
			},
		},
		mounted() {

		}

	}
</script>

<style lang="scss">
	.page {
		.home-page-body {
			.count {
				margin: 38rpx auto;
				height: 230rpx;
				width: 700rpx;
				background-color: #FFFFFF;
				border-radius: 25rpx;

				.count-title {
					display: flex;
					justify-content: space-between;
					font-weight: bolder;
					padding: 26rpx;
					padding-bottom: 5rpx;
				}

				.count-holder {
					// border:1rpx solid #DDDDDD;
					display: flex;
					justify-content: space-between;
					font-size: 38rpx;
					font-family: DFKai-SB;
					padding: 8rpx 26rpx;

					.count-holder-item {
						// border:1rpx solid #00DDDD;
						width: 180rpx;
						text-align: center;

						.count-holder-item-text {
							font-size: 26rpx;
							font-family: "宋体";
							padding-top: 8rpx;
						}
					}
				}
			}

			.record {
				margin: 38rpx auto;
				width: 700rpx;
				background-color: #FFFFFF;
				border-radius: 25rpx;

				.record-title {
					width: 674rpx;
					margin-left: 20rpx;
					padding: 18rpx;
					font-weight: bolder;

					.record-title-item {
						font-size: 28rpx;
						padding-left: 20px;
					}
				}
			}
		}

		.record-info {
			font-size: 28rpx;
			background-color: #FFFFFF;
			height: 100rpx;
			width: 700rpx;
			margin: 38rpx auto;
			border-radius: 25rpx;

			.message {
				padding: 18rpx;
			}
		}
	}
</style>
