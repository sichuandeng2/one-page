<template>
	<view class="clock-page">
		
		<!-- 考勤 -->
		<view class="page-info">
			<view class="page-info-circle">
				<view class="page-info-circle-text">{{user.name}}</view>
			</view>
			<view class="page-info-attence">
				<view><text>{{user.name}}</text></view>
				<view @click="gotoAttendance">
					<text>考勤</text>
					<uniIcons type="arrowright" size="15"></uniIcons>
				</view>
			</view>
		</view>
		
		<!-- 打卡 -->
		<view class="page-clock">
			<view class="page-clock-schedule">
				<text>今日未排班</text>
			</view>
			<view class="page-clock-clock" @click="clock" :style="!isclock ? 'background-color: #EEEEEE':'background-color: rgb(0,157,254)'">
					<view class="page-clock-clock-title">打卡</view>
					<view class="page-clock-clock-text">{{now}}</view>		
			</view>
			
			<view class="page-clock-adress">
				<view class="page-clock-adress-mark" :style="mark=='checkmarkempty' ? 'background-color: rgb(0,187,82)':'background-color: rgb(255,0,0)'">
					<uniIcons v-bind:type="mark" 
					style="color:rgb(255,255,255)">
					</uniIcons>
				</view>
				{{addres.localAdress}}
			</view>
		
		</view>
	<!-- 	 <map style="width: 100%; 
		 height: 300px;" 
		 :latitude="addres.latitude" 
		 :longitude="addres.longitude" 
		 :markers="covers" 
		 :circles="circles"></map> -->
</view>
</template>

<script>

	var	Interval={};
	export default {
		data(){
			return{
				isclock:true,
				mark:"checkmarkempty",
				//登录数据
				user:{
					name:"管理员"
				}, 
				now:"",	//当前时间
				addres:{
					latitude:"",	//纬度
					longitude:"",	//经度
					localAdress:""	//当地名称
				},
				 covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					title:"当前位置",
					iconPath: '/../../static/location.ico'
				}],
				circles:[
					{
						latitude: 39.909,
						longitude: 116.39742,
						color:"#999",
						// radius:100,
						strokeWidth:2
					}
				]
			}
		},
		methods:{
			// 打卡事件
			clock(){
				console.log("点击打卡");
				uni.navigateTo({
					url:'../clock/default?clocktiem='+this.now
				})
			},
			// 考勤标准事件
			gotoAttendance:function (){
				uni.navigateTo({
					url:"../clock/attendanceStandards"
				})
			}
		}
		,onShow() {
			//计时器
			console.log("定时器启动");
			Interval=this.$setter.timer(this);
		}
		,onHide() {
			//清除定时器
			clearInterval(Interval.getTime);
			clearInterval(Interval.getOnLoction);
			console.log("定时器结束");
		}
	}
</script>
	
<style lang="scss">
	.clock-page{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		.page-info{
			height: 180rpx;
			width:674rpx;
			border-radius: 25rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 58rpx;
			margin-top: 30rpx;
			.page-info-attence{
				padding: 20rpx;
				font-size: 28rpx;
			}
			.page-info-circle{
				width: 100rpx;
				height:100rpx;
				border-radius:50%;
				background-color:rgb(0,157,254);
				text-align: center;
				line-height: 100rpx;
				color:#FFFFFF;
				font-size: 32rpx;
				margin-left: 45rpx;
				.page-info-circle-text{
				}
			}
		}
		.page-clock{
			width:674rpx;
			height: 926rpx;
			background-color: #FFFFFF;
			border-radius: 25rpx;
			text-align:center;
			.page-clock-schedule{
				height: 300rpx;
				line-height: 300rpx;
				margin: 0 auto;
			}
			.page-clock-clock{
				width: 300rpx;
				height: 300rpx;
				background: rgb(0,157,254);
				margin: 0 auto;
				border-radius: 50%;
				.page-clock-clock-title{
					color: #fff;
					padding-top: 100rpx;
				}
				.page-clock-clock-text{
					color: #fff;
					font-size: 24rpx;
					padding-top: 20rpx;
				}
			}
			.page-clock-adress{
				font-size: 28rpx;
				margin-top: 30rpx;
				display:flex;
				justify-content: center;
				.page-clock-adress-mark{
					margin-top: 8rpx;
					height: 28rpx;
					width: 28rpx;
					border-radius: 50%;
					color: #FFFFFF;
					line-height: 28rpx ;
					font-size: 8rpx;
				}
			}
			
		}
	}
</style>
