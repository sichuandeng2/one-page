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
					每天打卡结束后，自动发送全天考勤结果
				</view>
			</view>
			<view class="page-item-right">
				<switch name="switch" />
			</view>
		</view>
		<view @click="position()"><setitem title="门店定位"  ></setitem></view>
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
				//退出事件
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
				//定位事件
				,position(){
					uni.navigateTo({
						url: '../set/map'
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
			display:flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			
			.page-item-left{
				height:100rpx;
				display:flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 28rpx;
					.page-item-left-title{
						height: 50rpx;
						line-height: 80rpx;
						font-size: 32rpx;
					}
					.page-item-left-item{
						color: #6E6E6E;
						font-size: 26rpx;
						height: 50rpx;
						margin-top: 10rpx;
					}
				}
				.page-item-right{
					font-size: 28rpx;
					padding-right: 26rpx;
				}
			
		}
	}
</style>
