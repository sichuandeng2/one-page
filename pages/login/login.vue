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
						<view class="login-form-item-label-icon">
							<uni-icons type="person-filled" size="22" style="color: #666;"></uni-icons>
						</view>
						<input  v-model="username" placeholder="工号" ></input>
					</view>
				</view>

				<!-- 密码 -->
				<view class="login-form-item">
					
					<view class="login-form-item-label">
						<view class="login-form-item-label-icon">
							<uni-icons type="locked-filled" size="22" style="color: #666;"></uni-icons>
						</view>
						<input v-model="password" placeholder="密码" password="true" />
						
					</view>
				</view>
				<view class="login-form-item">
					<button @click="login()"><text space="emsp">登  录</text></button>
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

				//  progamer
				title: "app",

				//  用户名
				username: '',

				//  密码
				password: ''
			}
		},
		onLoad() {
			
			//  获取token地址
			let token = uni.getStorageSync('token');

			//  自动登录
			if (token) {
				uni.reLaunch({
					url: '../index/index'
				})
			}
		},
		methods: {
			
			//  登录
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

				//  请求参数
				var params = {
					username: this.username,
					password: this.password
				}

				//发送登录请求
				request.post('/api/v1/login/login', params).then(res => {

					//取消加载
					uni.hideLoading(); 
					if (res.code == 0) {
						//  本地存储token信息
						uni.setStorageSync('token', res.data.token);
						//  本地存储user信息
						uni.setStorageSync('user', res.data.user);
						//  跳转至app首页
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

<style lang="scss" scoped>
	//整体页面配置
	page {
		background-color: #FFFFFF;
	}

	//登录页面样式
	.login-page {
		width: 510rpx;
		margin: 0 auto;
		// text-align: center;
		//头信息样式
		.login-header {
			height: 380rpx;
			padding: 18rpx 0rpx;
			margin-bottom: 180rpx;
			margin-top: 238rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			//图标样式
			.login-header-icon {
				width: 250rpx;
				height: 250rpx;
				border-radius: 50%;
				background-color: #009DFE;
				color: #FFFFFF;
				font-size: 60rpx;
				text-align: center;
				margin: 0 auto;
				line-height: 250rpx;
				margin-bottom: 88rpx;
			}
		}

		//表单样式
		.login-form {

			//表单项样式
			.login-form-item {
				padding: 12rpx 0rpx;
				button {
					background-color: #009DFE;
					border-radius: 8rpx;
					font-size: 42rpx;
					color: #FFFFFF;
					width: 520rpx;
					margin-top: 50rpx;
				}

				.login-form-item-label {
					font-size: 28rpx;
					display: inline-flex;
					justify-content: flex-start;
					align-items: center;
					border: 1px solid #000000;
					border-radius: 8rpx;
					width: 515rpx;
					input {
						height: 25px;
						font-size: 32rpx;
						padding: 12rpx 0rpx;
						
					}
					.login-form-item-label-icon{
						margin:0  15rpx;
					}
				}
			}
		}
	}
</style>



