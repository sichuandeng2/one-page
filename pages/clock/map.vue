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
			<veiw>
				当前位置：{{address.localAdress}}
			</veiw>
			<view>经度：{{address.longitude}}</view>
			<view>纬度：{{address.latitude}}</view>
		</view>
	</view>
</template>

<script>
var getLocationInterval = null;
export default{
	data(){
		return{
			//地址信息
			address: {
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
	,onLoad(e) {
		
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
		,onShow() {
			// 计时器
			console.log("定时器启动");
		
			this.getLocation();

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
