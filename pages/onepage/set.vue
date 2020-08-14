<template>
	<view class="page">
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
		<view @click="exit()"><setitem title="退出"  ></setitem></view>
		
	</view>
	
</template>

<script>
	import setitem from "../components/setItem.vue";
	export default {
			components:{
				setitem
			},
			methods:{
				exit(){
					console.log("退出触发")
					uni.showModal({
						content:"确定对出吗？"
						,success:function(res){
							if(res.confirm){
								uni.clearStorageSync('token');
								uni.reLaunch({
									url: '../login/login'
								})
							}
							
						}
					})
				}
			}
		}
	
</script>

<style lang="scss">
	
	.page{
		.page-item{
			width:720rpx;
			height:120rpx;
			border-radius: 25rpx;
			margin: 30rpx 15rpx 0rpx 15rpx;
			background-color: #FFFFFF;
			display:inline-flex;
			justify-content: space-between;
			
			.page-item-left{
					padding-left: 30rpx;
					.page-item-left-title{
						height: 60rpx;
						line-height: 80rpx;
					}
					.page-item-left-item{
						color: #6E6E6E;
						font-size: 26rpx;
						height: 60rpx;
					}
				}
				.page-item-right{
					font-size: 28rpx;
					line-height: 120rpx;
					padding-right: 38rpx;
				}
			
		}
	}
</style>
