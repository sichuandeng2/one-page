<template>
	<view class="clock-page">
		<headcomp title="打卡"></headcomp>
		<view class="page-info">
			<view class="page-info-circle">
				<uniIcons type="circle" size="60"></uniIcons>
			</view>
			<view class="page-info-attence">
				<view><text>{{name}}</text></view>
				<view><text>考勤</text><uniIcons type="arrowright" size="15"></uniIcons></view>
			</view>
		</view>
		<view class="page-clock">
			
		</view>
	</view>
</template>

<script>
	import headcomp from "../components/headComp.vue"; //引用插槽
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
		height: 100%;
		.page-info{
			margin: 38rpx auto;
			height: 120rpx;
			width:674rpx;
			background-color: #FFFFFF;
			border-radius: 25rpx;
			display: inline-flex;
			.page-info-attence{
				line-height: 50rpx;
				font-size: 28rpx;
			}
			.page-info-circle{
				
					color: #007AFF;
				
				
			}
		}
		.page-clock{
			margin: 38rpx auto;
			height: 500rpx;
			width:674rpx;
			background-color: #FFFFFF;
			border-radius: 25rpx;
		}
	}
</style>
