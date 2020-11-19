<template name="setitem">
	<view class="page">
		<view class="page-left">
			<view class="page-left-title">
				<text v-text="title"></text>
			</view>
		</view>
		
		<view class="page-right" >
			<view class="page-right-itemtext" v-text="itemtext"></view>
			<uniIcons type="arrowright" size="18"></uniIcons>
			</view>
		
	</view>
</template>

<script>
	//  加载图标
	import uniIcons from "~@/../../components/uni-icons/uni-icons.vue";
	
	export default{
		components:{uniIcons},
		name:"setitem"
		,props:{
			
			//  设置标题
			title:{
				type:String,
				value:"test",
			},
			
			//  设置信息
			itemtext:{
				type:String,
				value:"test"
			},
		}
	}
</script>

<style lang="scss">
	.page{
		width:720rpx;
		height:100rpx;
		background-color: #FFFFFF;
		display:inline-flex;
		justify-content: space-between;
		border-radius: 25rpx;
		margin: 30rpx 15rpx 0rpx 15rpx;
		line-height: 100rpx;
		.page-left{
			padding-left: 28rpx;
			font-size: 32rpx;
			.page-left-title{
				line-height: 100rpx;
			}			
		}
		.page-right{
			// background-color: #00FF11;
			font-size: 28rpx;
			line-height: 100rpx;
			padding-right: 28rpx;
			.page-right-itemtext{
				padding-right: 10rpx;
			}
		}
	}
</style>
