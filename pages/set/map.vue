<template>
	<view class="page">
		<view class="page-map">
			
			<!-- #ifdef APP-PLUS -->
			<map style="width: 700rpx;height: 600rpx;" 
			 :latitude="latitude" 
			 :longitude="longitude" 
			 :markers="mark"
			 :circles="circles">
			 </map>
			 <!-- #endif  -->
		</view>
		<!-- 位置信息 -->
		<view class="page-info">
		
			<view class="page-info-text">
				<view class="page-info-text-item">当前位置：{{localAdress}}</view>
				<view class="page-info-text-item">经度：{{longitude}}</view>
				<view class="page-info-text-item">纬度：{{latitude}}</view>
			</view>
			<view class="page-info-distance">
				<view class="page-info-distance-input">
					<view class="page-info-distance-input-icon">
						<uni-icons type="map-pin-ellipse" size="22" style="color: #666;"></uni-icons>
					</view>
					<input type="text"  v-model="circles[0].radius" placeholder="请输入打卡范围" />
				</view>
			</view>
			<view class="page-info-sub">
				<button @click="psotPosition">点击提交</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	var locatioMark = null;
export default{
	data(){
		return{
			//用户信息
			user:{}
			//地址信息
			,latitude: null //纬度
			,longitude: null //经度
			,localAdress: "当前地址获取失败" //当地名称
			
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
					radius:100,
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
					
					this.localAdress=res.address.poiName;
					this.longitude=res.longitude;
					this.latitude = res.latitude;
					
					this.mark[0].latitude=res.latitude;
					this.mark[0].longitude=res.longitude;
					
					this.circles[0].latitude=res.latitude;
					this.circles[0].longitude=res.longitude;
					console.log(this.localAdress);
					console.log("经度:"+this.longitude+"纬度："+this.latitude);
				},
				//获取地址失败
				fail: (res)=>{
					console.log("地址获取失败");
					this.localAdress="地址获取失败";
					uni.showToast({
						title:'获取地址失败'
						,icon: "none"
					})
				}
			});
			//#endif
		}
		
		//门店定位事件
		,psotPosition:function(){
			//配置定位参数
			let positionParams={
				userNo :this.user.username,//员工工号
				longitude:this.longitude,//经度
				latitude:this.latitude,//纬度
			}
			
			//发送位置请求
			request.post('/api/v1/storePositionConfig/setStoreJW', positionParams)
			.then(res => {
				if (res.code == 0) {
					//配置距离参数
					let distanceParams={
						userNo :this.user.username,
						distance:this.circles[0].radius //设置打卡范围
					}
					
					//设置范围请求
					request.post('/api/v1/storePositionConfig/setDistance',distanceParams)
					.then(res=>{
						if (res.code == 0) {
							//提交成功
							uni.showToast({
								title:"提交成功",
								icon:"success"
							})
							clearInterval(locatioMark);
								uni.reLaunch({
									url: '../index/set'
								})
						}
						else{
							uni.showToast({
								title: "设置范围失败"+ res.status+res.error ,
								icon:"none"
							})
						}
					})
				}
				else{
					// console.log("提交失败")
					uni.showToast({
						title: "位置信息提交失败"+ res.status+res.error ,
						icon:"none"
					})
				}
			})
			
		}
		
		,onShow() {
			// 计时器
			console.log("定时器启动");
			locatioMark=setInterval(this.getLocation,10000);
		}
		,onHide() {
			//清除定时器
			console.log("定时器移除");
			clearInterval(locatioMark);
		}
	}
}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.page{
		display: flex;
		flex-direction: column;
		align-items: center;
		.page-map{
			text-align: center;
			height:600rpx;
			width: 700rpx;
		}
		.page-info {
			font-size: 36rpx;
			width: 700rpx;
			height: 650rpx;
			
			.page-info-distance {
				display: flex;
				justify-content: center;
				.page-info-distance-input{
					display: flex;
					border: 1px solid #000000;
					border-radius: 8rpx;
					width: 515rpx;
					padding: 8rpx;
					.page-info-distance-input-icon{
						padding:  0 20rpx;
					}
				}
			}
			
			.page-info-text{
				margin: 55rpx;
				.page-info-text-item{
				
					padding-left: 88rpx;
					padding: 15rpx ;
				}
			}
			.page-info-sub{
				button {
					background-color: #009DFE;
					border-radius: 8rpx;
					font-size: 36rpx;
					color: #FFFFFF;
					width: 520rpx;
					margin-top: 50rpx;
				}
				
			}
		}
	}
	
</style>
