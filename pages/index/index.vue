<template>
	<view class="container">
		<button @click="getLocation()">点我获取定位</button>
		<view class="test">
			<text>test</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			getLocation() {
				console.log("事件启动");
				uni.switchTab({
				    url: '/pages/onepage/home'
					,success(e){
						console.log("跳转成功")
					},fail(e){
						console.log("跳转失败" +e);
						for (var i  in e){
							
							console.log(i+e[i]);
						}
						
					}
				});
				// uni.switchTab({
				//     url: 'pages/login/index'
				// });
				// uni.preloadPage({url: "pages/onepage/home"});
				// console.log(111111111111)
				// uni.getLocation({
				// 	type: 'wgs84',
				// 	success: function(res) {
				// 		console.log(2222222222222)
				// 		uni.showModal({
				// 			title: '当前位置的经度：' + res.longitude
				// 		})
				// 		console.log('当前位置的经度：' + res.longitude);
				// 		console.log('当前位置的纬度：' + res.latitude);
				// 	}
				// });
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		
	}
	
</style>
