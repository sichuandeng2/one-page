<template>
	<view class="clock-page">
		<headcomp title="打卡"></headcomp>
		<view class="page-info">
			<view class="page-info-circle">
				<image src="../../static/image/blackimage.gif"></image>
				
			</view>
			<view class="page-info-attence">
				<view><text>{{name}}</text></view>
				<view><text>考勤</text><uniIcons type="arrowright" size="15"></uniIcons></view>
			</view>
			<text class="page-info-circle-text">{{name}}</text>
		</view>
		<view class="page-clock">
			<view class="page-clock-schedule">
				<text>今日未排班</text>
			</view>
			<view class="page-clock-clock">
				<view style="width: 300rpx;height: 300rpx;background: red;margin: 0 auto;border-radius: 50%;">
					<view style="color: #fff;padding-top: 100rpx;">打卡</view>
					<view style="color: #fff;font-size: 28rpx;padding-top: 20rpx;">22:24:00</view>
				</view>
				<!-- <image src="../../static/image/blackimage.gif"></image>
				<view class="page-clock-clock-text">
					<view class="page-clock-clock-text-title">
						<text>打卡</text>
					</view>
					<view class="page-clock-clock-text-info">
						<text>{{name}}</text>
					</view>
					
				</view> -->
				
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import headcomp from "../components/headComp.vue"; //引用头插槽
	import uniIcons from "~@/../../components/uni-icons/uni-icons.vue";
	export default {
			components:{
				headcomp,
				uniIcons
			},
			data(){
				return{
					name:"test"
				}
				
			}
		}
</script>

<style lang="scss">
	.clock-page{
		background-color: #F5F5F5;
		.page-info{
			margin: 38rpx auto;
			height: 120rpx;
			width:674rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: flex-start;
			.page-info-attence{
				padding: 20rpx;
				font-size: 28rpx;
			}
			.page-info-circle{
				padding: 20rpx;
				image{
					width: 85rpx;
					height: 85rpx;
				}
			}
			.page-info-circle-text{
				font-size: 32rpx;
				color: #FFFFFF;
				position: relative;
				left: -212rpx;
				top: 40rpx;
			}	
		}
		.page-clock{
			margin: 38rpx auto;
			padding: 8rpx;
			width:674rpx;
			background-color: #FFFFFF;
			border-radius: 25rpx;
			text-align:center;
			.page-clock-schedule{
				margin: 50rpx;
				padding: 50rpx;
			}
			.page-clock-clock{
				padding: 58rpx;
				image{
					width: 320rpx;
					height: 320rpx;
				}
				.page-clock-clock-text{
					position: relative;
					top:-240rpx;
					.page-clock-clock-text-title{
						color: #FFFFFF;
						font-size: 68rpx;
					}
					.page-clock-clock-text-info{
						color:#DDDDDD
					}
				}
		
			}
			
		}
	}
</style>
