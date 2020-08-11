<template>
	<view class="attendance-page">
		<view class="attendance-page-head">
			<view class="attendance-page-head-circle">test</view>
			<view class="attendance-page-head-text">
				<view class="attendance-page-head-text-username">test</view>
				<view>
					     
				</view>
			</view>
		</view>
		<view class="attendance-page-body">
			<!-- 手风琴效果 -->
			<uni-collapse class="attendance-page-body-collapse"  accordion="true">
			    <uni-collapse-item  class="attendance-page-body-collapse-item" title="考勤时间">
			        <view style="padding: 30rpx;">
						<view class="attendance-page-body-collapse-item-title"><h5>上下班时间</h5></view>
						<view class="attendance-page-body-collapse-item-text">
							<view> 周一、二、三、四、五、六：09：00-18：00</view>
							<view>周日 休息</view>
						</view>
			        </view>
			    </uni-collapse-item>
			    
				<uni-collapse-item  class="attendance-page-body-collapse-item" title="补卡规则">
				    <view style="padding: 30rpx;">
						<view class="attendance-page-body-collapse-item-title"><h5>上下班时间</h5></view>
						<view class="attendance-page-body-collapse-item-text">
							<view> 周一、二、三、四、五、六：09：00-18：00</view>
							<view>周日 休息</view>
						</view> 
				    </view>
					
				</uni-collapse-item>
				<uni-collapse-item  class="attendance-page-body-collapse-item" title="考勤范围">
				    <view style="padding: 30rpx;">
						<view class="attendance-page-body-collapse-item-title"><h5>上下班时间</h5></view>
						<view class="attendance-page-body-collapse-item-text">
							<view> 周一、二、三、四、五、六：09：00-18：00</view>
							<view>周日 休息</view>
						</view>
				    </view>
				</uni-collapse-item>
			</uni-collapse>
			
		</view>
	</view>
</template>

<script>
	
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.attendance-page{
		display: flex;
		flex-direction: column;
		.attendance-page-head{
			height: 160rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-left: 38rpx;
			.attendance-page-head-circle{
				height: 100rpx;
				width: 100rpx;
				border-radius: 50%;
				background-color: rgb(0,157,254);
				color: #FFFFFF;
				text-align: center;
				line-height: 100rpx;
				
			}
			.attendance-page-head-text{
				margin-left:30rpx;
				font-size: 38rpx;
				display: flex;
				flex-direction: column;
			}
		}
		.attendance-page-body{
			.attendance-page-body-collapse{
				.attendance-page-body-collapse-item{
					font-size: 28rpx;
					.attendance-page-body-collapse-item-title{
						
					}
					.attendance-page-body-collapse-item-text{
						
					}
				}
			}
		}
	}
</style>
