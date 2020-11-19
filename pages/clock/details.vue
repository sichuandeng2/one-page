<template>
	<!-- 外层最大盒子 -->
	<view class="box">
		<!-- 头部区域 -->
		<view class="nav">
			<view class="datas">
				<view class="week">周</view>
				<view class="month">月</view>
			</view>
		</view>
		<!-- 头部区域结束 -->
		<!-- 打卡月历 -->
		<view class="datum">
			<view class="tou">
				<uni-icons type="contact-filled" color="#DCDCDC" size="45"></uni-icons>
			</view>
			<view class="datum-1">
				<h3 class="myname" >{{user.name}}</h3>
				<view>考勤组</view> 
			</view>
			<view class="card">
				<image src="../../static/icon/rili.png" class="rili"></image>打卡月历
			</view>
		</view>
		<!-- 打卡月历结束 -->
		<!-- 主体 -->
			<uni-collapse accordion="true">
			    <uni-collapse-item title="平均工时">
			        <view style="padding: 30rpx; font-size: 27rpx;"></view>
			    </uni-collapse-item>
				<uni-collapse-item title="出勤天数">
				    <view style="padding: 30rpx; font-size: 27rpx;"> 可自定义内容及样式 </view>
				</uni-collapse-item>
				<uni-collapse-item title="出勤班次">
				    <view style="padding: 30rpx; font-size: 27rpx;"> 可自定义内容及样式 </view>
				</uni-collapse-item>
				<uni-collapse-item title="休息天数">
				    <view style="padding: 30rpx; font-size: 27rpx;"> 可自定义内容及样式 </view>
				</uni-collapse-item>
				<uni-collapse-item title="迟到">
				    <view style="padding: 30rpx; font-size: 27rpx;"> 可自定义内容及样式 </view>
				</uni-collapse-item>
				<uni-collapse-item title="早退">
				    <view style="padding: 30rpx; font-size: 27rpx;"> 折叠内容主体，可自定义内容及样式 </view>
				</uni-collapse-item>
				<uni-collapse-item title="缺卡">
				    <view style="padding: 30rpx font-size: 27rpx;"> 折叠内容主体，可自定义内容及样式 </view>
				</uni-collapse-item>
				<uni-collapse-item title="旷工">
				    <view style="padding: 30rpx; font-size: 27rpx;"> 折叠内容主体，可自定义内容及样式 </view>
				</uni-collapse-item>
				<uni-collapse-item title="外勤">
				    <view style="padding: 30rpx font-size: 27rpx;"> 折叠内容主体，可自定义内容及样式 </view>
				</uni-collapse-item>
				<uni-collapse-item title="加班">
				    <view style="padding: 30rpx font-size: 27rpx;">12312</view>
				</uni-collapse-item>
			</uni-collapse>
		<!-- 主体结束 -->
	</view>
	<!-- 外层最大盒子结束 -->
</template> 
<script>
export default{
	onLoad() {
		
		//  获取用户信息
		this.user = uni.getStorageSync('user');
		if (!this.user) {
			uni.clearStorageSync('token');
			uni.clearStorageSync('user');
			uni.reLaunch({
				url: '../login/login'
			})
		}
		
	}
	,data(){
		return{
			
			//  用户信息
			user:{}
		}
	}
}
</script>
<style>
	page{background-color: #FFFFFF;}
	.box {
		width: 100%;
	}
	.nav {
		width:100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border: 1px solid #F1F1F1;
	}
	.datas {
		padding: 22rpx 30rpx 0;
	}
	.week,
	.month {
		width: 85rpx;
		height: 50rpx;
		float: left;
		border: 1px solid #007AFF;
		text-align: center;
		line-height: 50rpx;
		font-size: 25rpx;
		color: #007AFF;
	} 
	.week {
		border-right: 0;
		border-radius: 5rpx 0 0 5rpx;
	}
	.month {
		border-radius: 0 5rpx 5rpx 0;
	}
	.datum {
		position: relative;
		width: 100%;
		height: 150rpx;
		background-color: #FFFFFF;
		margin:2rpx;
		border-bottom : 1rpx solid #f1f1f1;
	}
	.tou {
		float: left;
		margin: 30rpx 30rpx;
		border-radius: 40rpx;
	}
	.datum-1 {
		padding: 40rpx 35rpx;
		font-size: 27rpx;
	}
	.myname {
		padding-bottom: 5rpx;
	}
	.card {
		position: absolute;
		right: 30rpx;
		top: 60rpx;
		font-size: 25rpx;
	}
	.rili {
		width: 50rpx;
		height: 50rpx;
		position:absolute;
		right: 95rpx;
		top: -13rpx;
	}
	.punch {
		position: relative;
		width: 100%;
	}
</style>
