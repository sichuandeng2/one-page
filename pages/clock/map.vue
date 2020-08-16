<template>
	<view class="page">
		<!-- <view class="head">定位地图</view> -->
		<view class="map">
			<!-- #ifdef APP-PLUS -->
			<map style="width: 700rpx;height: 400px;" 
			 :latitude="address.latitude" 
			 :longitude="address.longitude" 
			 :markers="mark"
			 :circles="circles">
			 </map>
			 <!-- #endif  -->
		</view>
		<view class="info">
			<view>
				当前位置：{{address.localAdress}}
			</view>
			<view>经度：{{address.longitude}}</view>
			<view>纬度：{{address.latitude}}</view>
			<view><button @click="getPosition">点击提交</button></view>
		</view>
		
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	var getLocationInterval = null;
export default{
	data(){
		return{
			//用户信息
			user:{}
			//地址信息
			,address: {
				latitude: 1.111111 //纬度
				,longitude: 1.111111 //经度
				,localAdress: "当前地址获取失败" //当地名称
			}
			//标记地图
			,mark:[
				{
					latitude:1,
					longitude:1,
					iconPath:'/static/logo.png',
					callout:{
						content:"当前位置"
					}
				}
			],
			// 画圆
			circles:[
				{
					latitude:null,
					longitude:null,
					radius:200,
					fillColor:"#dddddd55"
				}
			]
			,match:true
		}
	}
	,onLoad() {
			this.user = uni.getStorageSync('user');
			this.getLocation();
		
	}
	,methods:{
		//获取地址事件
		getLocation:function() {
			//#ifdef APP-PLUS
			uni.getLocation({
				type: "gcj02",
				geocode:true,
				success:  (res) =>{
					var getAddress = res.address.country+//国家
					res.address.province+//省份名称
					res.address.city+//城市名称
					res.address.district+//区（县）名称
					res.address.street+//街道信息
					res.address.streetNum;//获取街道门牌号信息
					
					this.address.localAdress=getAddress + "，当前精度："+res.accuracy+"米,POI信息:"+res.address.poiName;
					this.address.longitude=res.longitude;
					this.address.latitude = res.latitude;
					
					this.mark[0].latitude=res.latitude;
					this.mark[0].longitude=res.longitude;
					
					this.circles[0].latitude=res.latitude;
					this.circles[0].longitude=res.longitude;
					console.log(this.address.localAdress);
					console.log("经度:"+this.address.longitude+"纬度："+this.address.latitude);
				},
				//获取地址失败
				fail: (res)=>{
					console.log("地址获取失败");
					this.address.localAdress="地址获取失败";
					uni.showToast({
						title:'获取地址失败'
						,icon: "none"
					})
				}
			});
			//#endif
		}
		
		//门店定位事件
		,getPosition:function(){
			//配置参数
			let params={
				userNo :this.user.username,//员工工号
				longitude:this.address.longitude,//经度
				latitude:this.address.latitude,//纬度
			}
			//发送登录请求
			request.post('/api/v1/storePositionConfig/setStoreJW', params)
			.then(res => {
				uni.showToast({
					title:res,
					icon: 'none'
				})
				if (res.code == 0) {
					//提交成功
					uni.showToast({
						title:"提交成功",
						icon:"success"
					})
					// 跳转设置
					uni.reLaunch({
						url: '../onepage/set'
					})
				} else {
					// console.log("提交失败")
					uni.showToast({
						title: "提交失败"+ res.status+res.error ,
						icon:"none"
					})
				}
			})
		}
		,onShow() {
			// 计时器
			console.log("定时器启动");
			getLocationInterval=setInterval(this.getLocation,10000);
			
		}
		,onHide() {
			//清除定时器
			console.log("定时器移除");
			clearInterval(getLocationInterval);
		}
		
	}
}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.page{
		
		.head{
			margin: 0 38rpx;
			text-align: center;
			font-size: 38rpx;
			padding: 30rpx 0;
			font-weight: bolder;
		}
		.map{
			text-align: center;
		}
		.info {
			font-size: 36rpx;
			margin: 28rpx 58rpx;
			button{
				
				margin-top: 52rpx;
				width: 510rpx;
				border-radius: 25rpx;
				font-size: 36rpx;
				background-color: rgb(152, 208, 255);
			}
		}
	}
	
</style>
