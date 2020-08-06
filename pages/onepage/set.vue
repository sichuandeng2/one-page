<template>
	<view class="page">
		<headcomp title="设置"></headcomp>
		<setitem title="快捷打卡"  itemtext="急速打卡、提醒打卡"></setitem>
		<setitem title="我的考勤常用手机" itemtext=""></setitem>
		<view class="page-item">
			<view class="page-item-left">
				<view class="page-item-left-title">
					<text >打卡结果确认</text>
				</view>
				<view class="page-item-left-item">
					<text>每天打卡结束后，自动发送全天考勤结果</text>
				</view>
			</view>
			<view class="page-item-right">
				<switch name="switch" />
			</view>
			
		</view>
	</view>
	
</template>

<script>
	import headcomp from "../components/headComp.vue"; //引用插槽
	import setitem from "../components/setItem.vue";
	import uniIcons from "~@/../../components/uni-icons/uni-icons.vue";
	export default {
			components:{
				headcomp,
				setitem,
				uniIcons
			},
		}
	
</script>

<style lang="scss">
	
	.page{
		.page-item{
			width:720rpx;
			height:120rpx;
			border-radius: 35rpx;
			margin: 15rpx 15rpx;
			background-color: #FFFFFF;
			display:inline-flex;
			justify-content: space-between;
			.page-item-left{
					padding-left: 30rpx;
					.page-item-left-title{
					line-height: 60rpx;
					}
					.page-item-left-item{
						color: #6E6E6E;
						font-size: 28rpx;
					}
				}
				.page-item-right{
					// background-color: #00FF11;
					font-size: 28rpx;
					line-height: 120rpx;
					padding-right: 38rpx;
				}
			
		}
	}
</style>
