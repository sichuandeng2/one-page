<template>
	<view class="login-page">

		<!-- 头信息 -->
		<view class="login-header">
			<view class="login-header-icon">{{title}} </view>
			<view class="welcome">欢迎使用uni-app</view>
		</view>

		<!-- 表单 -->
		<view class="login-form">
			<form >

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
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				title: "app",
				username: '',
				password: ''
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token');
			if (token) {
				uni.reLaunch({
					url: '../index/index'
				})
			}
		},
		methods: {
			login() {
				uni.showLoading({
				    title: '加载中'
				});
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
					uni.hideLoading(); //取消加载
					if (res.code == 0) {
						// 本地存储token信息
						uni.setStorageSync('token', res.data.token);
						// 本地存储user信息
						uni.setStorageSync('user', res.data.user);
						// 跳转至app首页
						uni.reLaunch({
							url: '../index/index'
						})
					} 
					else {
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
			margin-top: 238rpx;

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
		}
	}
</style>



