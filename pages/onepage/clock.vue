<template>
	<view class="clock-page">
		
		<view class="page-info">
			<view class="page-info-circle">
				<!-- <image src="../../static/image/blackimage.gif"></image> -->
				<view class="page-info-circle-text">{{user.name}}</view>
			</view>
			<view class="page-info-attence">
				<view><text>{{user.name}}</text></view>
				<view @click="gotoAttendance">
					<text>考勤</text>
					<uniIcons type="arrowright" size="15"></uniIcons>
				</view>
			</view>
			<!-- <text class="page-info-circle-text">{{name}}</text> -->
		</view>
		<view class="page-clock">
			<view class="page-clock-schedule">
				<text>今日未排班</text>
			</view>
			
			<view class="page-clock-clock" @click="clock">
					<view class="page-clock-clock-title">打卡</view>
					<view class="page-clock-clock-text">{{now}}</view>		
			</view>
			
			<view class="page-clock-adress">
				<view class="page-clock-adress-mark">
					<uniIcons v-bind:type="mark" 
					:style="mark=='checkmarkempty' ? 'color:rgb(255,255,255)': 'rgb(255,0,0)'">
					</uniIcons>
				</view>
				{{addres.localAdress}}
			</view>
		
		</view>
	</view>
</template>

<script>

	var thatLocation=null;
	var thatTimer=null;
	
	export default {
		data(){
			return{
				mark:"checkmarkempty",
				user:{
					name:"管理员"
				}, //登录数据
				now:"1111",	//当前时间
				addres:{
					latitude:"",	//纬度
					longitude:"",	//经度
					localAdress:""	//当地名称
				},
			}
		},
		methods:{
			
			clock(){
				console.log("点击打卡");
				
				
				uni.navigateTo({
					url:'../clock/default?clocktiem='+this.now
				})
			},
			gotoAttendance:function (){
				uni.navigateTo({
					url:"../clock/attendanceStandards"
				})
			}
			
		},
		onShow() {
			
			var date = new Date();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var  second=date.getSeconds();
			hour<=9?hour= "0"+hour:hour;
			minute<=9?minute= "0"+minute:minute;
			second<=9?second= "0"+second:second;
			this.now=hour+":"+minute+":"+second;
			
			uni.getLocation({
				type: 'gcj02',
				geocode:true,
				success:  (res) =>{
					console.log("地址为："+res.address.poiName);
					this.addres.localAdress=res.address.poiName;
					this.addres.longitude=res.longitude;
					this.addres.latitude = res.latitude;
					this.mark = "checkmarkempty";
				},
				fail:function (res){
					// uni.showModal({
					// 	content:'失败'
					// 	,showCancel: false
					// })
					console.log("地址获取失败");
					this.mark="closeempty";
					this.addres.localAdress="地址获取失败"
				}
			});
			
			console.log("计时开始");
			
			//定位更新
			thatLocation=setInterval(()=>{
				uni.getLocation({
					type: 'gcj02',
					geocode:true,
					success:  (res) =>{
						console.log("地址为："+res.address.poiName);
						this.addres.localAdress=res.address.poiName;
						this.addres.longitude=res.longitude;
						this.addres.latitude = res.latitude;
						this.mark = "checkmarkempty";
					},
					fail:function (res){
						// uni.showModal({
						// 	content:'失败'
						// 	,showCancel: false
						// })
						console.log("地址获取失败");
						this.mark="closeempty";
						this.addres.localAdress="地址获取失败"
					}
				});
			},5000)
			
			//时间更新
			thatTimer = setInterval(() => {
				var date = new Date();
				var hour = date.getHours();
				var minute = date.getMinutes();
				var  second=date.getSeconds();
				hour<=9?hour= "0"+hour:hour;
				minute<=9?minute= "0"+minute:minute;
				second<=9?second= "0"+second:second;
				this.now=hour+":"+minute+":"+second;
			}, 1000)
			
			
			
			
			
		}
		
		
		,onHide() {
			//清除定时器
			console.log("定时器清除");
			clearInterval(thatLocation);
			clearInterval(thatTimer);
		}
	
		//页面加载方法
		,onLoad() {
			
		},
		//挂载完
		mounted() {
			
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
				// margin: 38rpx auto;
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
			// margin: 0 auto;
			width:674rpx;
			height: 926rpx;
			background-color: #FFFFFF;
			border-radius: 25rpx;
			text-align:center;
				// padding-left: 38rpx;
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
				// background-color: #6E6E6E;
				.page-clock-adress-mark{
					margin-top: 8rpx;
					height: 28rpx;
					width: 28rpx;
					border-radius: 50%;
					background-color: rgb(0,187,82);
					color: #FFFFFF;
					line-height: 28rpx ;
					font-size: 8rpx;
				}
			}
			
		}
	}
</style>
