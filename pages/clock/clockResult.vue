<template>
	<view class="clock-page">
		<view class="clock-page-head">
			<view class="clock-page-head-title">
				打卡成功
			</view>
			<view class="clock-page-head-time">
				打卡时间 {{time}}
			</view>
		</view>
		<view class="clock-page-image">
			<image mode="widthFix" src="../../static/image/clockbk.jpg"></image>

		</view>
		<view class="clock-page-foot">
			<view class="clock-page-foot-result" @click="details">
				打卡结果
			</view>
			<text class="clock-page-foot-holder">|</text>
			<view class="clock-page-foot-share">
				分享
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				//  打卡时间
				time: ''
			}
		},
		methods: {
			
			//  打卡详情
			details() {
				uni.navigateTo({
					url: "details"
				});
			}
		},
		onLoad: function(param) {
			this.time = param.time;
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.clock-page {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 38rpx;
		margin-top: -28rpx;

		// height: 300rpx;
		.clock-page-head {
			margin: 50rpx 0rpx;

			.clock-page-head-title {
				margin: 30rpx 0rpx;
				font-size: 46rpx;
				font-weight: bolder;
			}

			.clock-page-head-time {
				font-size: 28rpx;
			}
		}

		.clock-page-image {
			margin: 0 auto;
			width: 99%;
			height: 850rpx;
		}

		.clock-page-foot {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 168rpx;
			text-align: center;
			color: rgb(24, 132, 205);

			.clock-page-foot-result {
				width: 25%;
			}

			.clock-page-foot-share {
				width: 25%;
				font-weight: bolder;
			}

			.clock-page-foot-holder {
				color: #CCCCCC;
			}
		}
	}
</style>
