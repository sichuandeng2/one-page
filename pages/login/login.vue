<template>
	<view class="login-page">

		<!-- 头信息 -->
		<view class="login-header">
			<!-- <view class="login-header-icon">{{userName}} </view> -->
			<view class="welcome">欢迎使用uni-app</view>
		</view>

		<!-- 表单 -->
		<view class="login-form">
			<form @submit="formSubmit">

				<!-- 工号 -->
				<view class="login-form-item ">
					<view class="login-form-item-label">
						<text>工号</text>
					</view>
					<view class="login-form-item-label">
						<input class="put" v-model="username" placeholder="请输入工号" />
					</view>
				</view>

				<!-- 密码 -->
				<view class="login-form-item">
					<view class="login-form-item-label">
						<text>密码</text>
					</view>
					<view class="login-form-item-label">
						<input v-model="password" class="put" placeholder="请输入密码" password="true" />
					</view>
				</view>
				<view class="login-form-item">
					<button @click="login()">登录</button>
				</view>
			</form>
			<view class="login-form-end">
				<!-- <text class="login-form-end-forget">忘记密码</text> -->
				<!-- <text class="login-form-end-newuser">注册密码</text> -->
			</view>
		</view>
	</view>

</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				// userName: "管理员",
				username: '',
				password: ''
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token');
			if (token) {
				uni.reLaunch({
					url: '../onepage/clock'
				})
			}
		},
		methods: {
			login() {
				if (this.username == '') {
					uni.showToast({
						title: '请输入工号',
						icon: 'none'
					})
					return;
				}
				if (this.password == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return;
				}
				var params = {
					username: this.username,
					password: this.password
				}
				//发送登录请求
				request.post('/api/v1/login/login', params).then(res => {
					console.log(res)
					if (res.code == 0) {
						// 本地存储token信息
						uni.setStorageSync('token', res.data.token);
						// 本地存储user信息
						uni.setStorageSync('user', res.data.user);
						// 跳转至app首页
						uni.reLaunch({
							url: '../onepage/clock'
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	//整体页面配置
	page {
		background-color: #FFFFFF;
	}

	//登录页面样式
	.login-page {
		width: 510rpx;
		margin: 0 auto;

		//头信息样式
		.login-header {
			height: 190rpx;
			padding: 18rpx 0rpx;
			margin-bottom: 120rpx;
			margin-top: 38rpx;

			//图标样式
			.login-header-icon {
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				background-color: rgb(0, 157, 254);
				color: #FFFFFF;
				font-size: 32rpx;
				text-align: center;
				line-height: 128rpx;
				margin-bottom: 38rpx;
			}
		}

		//表单样式
		.login-form {

			//表单项样式
			.login-form-item {
				padding: 10px 0px;

				button {
					background-color: rgb(152, 208, 255);
					border-radius: 25rpx;
					font-size: 36rpx;
				}

				.login-form-item-label {
					font-size: 28rpx;

					.put {
						background-color: rgb(255, 255, 255);
						border-bottom: 1px solid #000000;
						height: 35px;
						font-size: 36rpx;
					}
				}

			}

			//底部样式
			.login-form-end {
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
			}

		}

	}
</style>



<!-- <template>
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
 -->
