<template>
	<view class="clock-page">
		
		<view class="page-info">
			<view class="page-info-circle">
				<!-- <image src="../../static/image/blackimage.gif"></image> -->
				<view class="page-info-circle-text">{{name}}</view>
			</view>
			<view class="page-info-attence">
				<view><text>{{name}}</text></view>
				<view><text>考勤</text><uniIcons type="arrowright" size="15"></uniIcons></view>
			</view>
			<!-- <text class="page-info-circle-text">{{name}}</text> -->
		</view>
		<view class="page-clock">
			<view class="page-clock-schedule">
				<text>今日未排班</text>
			</view>
			<view>
			<view class="page-clock-clock">
					<view class="page-clock-clock-title">打卡</view>
					<view class="page-clock-clock-text">{{now}}</view>		
			</view>
			<view>地址：{{addres}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	//组件引用
	import uniIcons from "~@/../../components/uni-icons/uni-icons.vue";
	export default {
			components:{
				uniIcons
			},
			data(){
				return{
					name:"test",
					now:null,
					addres:""
					}
				
			},
			methods:{
			
			},
			onLoad() {
				var interval = setInterval(() => {
					var date = new Date();
					var hour = date.getHours();
					var minute = date.getMinutes();
					var  second=date.getSeconds();
					hour<=9?hour= "0"+hour:hour;
					minute<=9?minute= "0"+minute:minute;
					second<=9?second= "0"+second:second;
					this.now=hour+":"+minute+":"+second;
				}, 1000)
			},
	
			mounted() {
				uni.getLocation({
				    type: 'wgs84',
					geocode:true,
				    success: function (res) {
						console.log(address);
						this.addres=address.street;
				        // console.log('当前位置的经度：' + res.longitude);
				        // console.log('当前位置的纬度：' + res.latitude);
						uni.showModal({
							content:res.longitude
							,showCancel: false
						})
				    },
					fail:function (res){
						console.log("错误返回"+res);
					}
				});
				
			}
		
		}
</script>

<style lang="scss">
	
	.clock-page{
		.page-info{
			margin: 38rpx auto;
			height: 180rpx;
			width:674rpx;
			border-radius: 25rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding-left: 38rpx;
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
				.page-info-circle-text{
				}
			}
		}
		.page-clock{
			margin: 0 auto;
			width:674rpx;
			height: 826rpx;
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
		}
	}
</style>
