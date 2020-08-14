<template>
	<view>
		<view>测试地图</view>
		<view>
			<map style="width: 100%; height: 500px;" 
			 :latitude="address.latitude" 
			 :longitude="address.longitude" 
			 :markers="mark"
			 :circles="circles">
			 </map>
		</view>
		<view>
			<view>
				当前位置：{{address.localAdress}}
			</view>
			<view>经度：{{address.longitude}}</view>
			<view>纬度：{{address.latitude}}</view>
		</view>
		<view><button @click="getPosition">点击提交</button></view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
var getLocationInterval = null;
export default{
	data(){
		return{
			user:{}
			//地址信息
			,address: {
				latitude: 1 //纬度
				,longitude: 1 //经度
				,localAdress: "当前地址获取失败" //当地名称
			}
			,mark:[
				{
					latitude:1,
					longitude:1,
					iconPath:'/static/logo.png',
					width:1,
					height:1,
					callout:{
						content:"我在这"
					}
				}
				
			],
			circles:[
				{
					latitude:null,
					longitude:null,
					radius:2,
					fillColor:"#dddddd"
				}
			]
		}
	}
	,onLoad() {
		
			this.user = uni.getStorageSync('user');
			console.log(this.user);
			// if (!this.user) {
			// 	uni.clearStorageSync('token');
			// 	uni.clearStorageSync('user');
			// 	uni.reLaunch({
			// 		url: '../login/login'
			// 	})
			// }
			this.getLocation();
		
		// this.adress.latitude = e.latitude
		// this.adress.longitude = e.longitude
		// ,this.circles[0]=e
		// ,this.mark[0].latitude=e.latitude
		// ,this.mark[0].longitude=e.longitude
		// ,console.log(JSON.stringify(this.adress))
	}
	,methods:{
		getLocation:function() {
			uni.getLocation({
				type: "gcj02",
				geocode:true,
				success:  (res) =>{
					var getAddress = res.address.country+
					res.address.province+
					res.address.city+
					res.address.district+
					res.address.street+
					res.address.streetNum;
					
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
				fail: (res)=>{
					console.log("地址获取失败");
					// this.mark="closeempty";
					this.address.localAdress="地址获取失败";
					uni.showToast({
						title:'获取地址失败'
						,icon: "none"
					})
				}
			});
		}
		,getPosition:function(){
		
			let params={
				userName :this.user.username,//员工工号
				longitude:this.address.longitude,//经度
				latitude:this.address.latitude,//纬度
			}
			//发送登录请求
			request.postJSON('/api/v1/login/login', JSON.stringify(params)).then(res => {
				console.log(res)
				if (res.code == 0) {
					//提交成功
					uni.showToast({
						title:"提交成功",
						icon: 'none'
					})
					// 跳转设置
					uni.reLaunch({
						url: '../onepage/set'
					})
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		}
		,onShow() {
			// 计时器
			console.log("定时器启动");
			getLocationInterval=setInterval(this.getLocation,5000);
			
			
		}
		,onHide() {
			//清除定时器
			console.log("定时器移除");
			clearInterval(getLocationInterval);
		}
		
	}
}
</script>

<style>
</style>
