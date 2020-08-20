<template>
	<view class="attendance-page">
		<view class="attendance-page-head">
			<view class="attendance-page-head-circle">{{user.name}}</view>
			<view class="attendance-page-head-text">
				<view class="attendance-page-head-text-username">{{user.name}}</view>
				<view class="attendance-page-head-text-group">
					未加入考勤组
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
		</view>
		<view class="attendance-page-body">
			<!-- 手风琴效果 -->
			<uni-collapse class="attendance-page-body-collapse" accordion="true">
				<uni-collapse-item class="attendance-page-body-collapse-item" style="font-size: 60rpx;" title="考勤时间">
					<view style="padding: 30rpx;">
						<view class="attendance-page-body-collapse-item-title">
							<h5>上下班时间</h5>
						</view>
						<view class="attendance-page-body-collapse-item-text">
							<view> 周一、二、三、四、五、六：09：00-18：00</view>
							<view>周日 休息</view>
						</view>
					</view>
				</uni-collapse-item>

				<uni-collapse-item class="attendance-page-body-collapse-item" title="补卡规则">
					<view style="padding: 30rpx;">
						<view class="attendance-page-body-collapse-item-title">
							<h5>缺卡后可以补卡</h5>
						</view>
						<view class="attendance-page-body-collapse-item-text">
							<view>每个月最多最多补卡5次，可补过去31天内的缺卡</view>
							
						</view>
					</view>

				</uni-collapse-item>
				<uni-collapse-item class="attendance-page-body-collapse-item" title="考勤范围">
					<view style="padding: 30rpx;">
						<view class="attendance-page-body-collapse-item-title">
							<h5>店长配置</h5>
						</view>
						<view class="attendance-page-body-collapse-item-text">
							<view>当前的打卡范围是{{this.distance}}米</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>

		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
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
				user: {},
				distance:100
				
			}
		},
		mounted() {
			
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.attendance-page {
		display: flex;
		flex-direction: column;

		.attendance-page-head {
			height: 160rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-left: 38rpx;

			.attendance-page-head-circle {
				height: 100rpx;
				width: 100rpx;
				border-radius: 50%;
				background-color: rgb(0, 157, 254);
				color: #FFFFFF;
				text-align: center;
				line-height: 100rpx;
				font-size: 24rpx;

			}

			.attendance-page-head-text {
				margin-left: 30rpx;
				font-size: 38rpx;
				display: flex;
				flex-direction: column;
			}
			.attendance-page-head-text-group{
				font-size: 28rpx;
				color: #3C3E49;
			}
		}

		.attendance-page-body {
			.attendance-page-body-collapse {
				.attendance-page-body-collapse-item {
					
					.attendance-page-body-collapse-item-title {
						font-size: 36rpx;
						margin-top:-38rpx;
						margin-bottom:5rpx;
					}

					.attendance-page-body-collapse-item-text {
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>
