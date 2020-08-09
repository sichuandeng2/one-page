<template>
	<view class="login-page">
		
		<!-- 头信息 -->
		<view class="login-header">
			<view class="login-header-icon">{{userName}} </view>
			<view class="welcome">欢迎使用uni-app</view>
		</view>
		
		<!-- 表单 -->
		<view class="login-form">
			<form @submit="formSubmit" @reset="formReset">
				
				<!-- 工号 -->
				<view class="login-form-item ">
					<view class="login-form-item-label">
						<text >工号</text>
					</view>
					<view class="login-form-item-label">
						<input  class="put" name="username"  placeholder="请输入工号" />
					</view>
				</view>
				
				<!-- 密码 -->
				<view class="login-form-item">
					<view class="login-form-item-label">
						<text >密码</text>
					</view>
					<view class="login-form-item-label">
						<input  name="password" class="put"  placeholder="请输入密码" password="true" />
					</view>
				</view>
				<view class="login-form-item">
				  <button form-type="submit">登录</button>
				</view>
			</form>
			<view class="login-form-end">
				<text class="login-form-end-forget">忘记密码</text>
				<text class="login-form-end-newuser">注册密码</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	import seter from "../config.js";
	 export default {
	        data() {
	            return {
					userName:"管理员",
					
					//模拟对象
	            }
	        },
	        methods: {
				// 表单提交
	            formSubmit: function(e) {
					// 获取表单信息
					var formdata = e.detail.value;
	                console.log('form发生了submit事件，携带数据为：' + formdata);
					uni.switchTab({
					    url: '/pages/onepage/home'
					});
					// 发起请求
					uni.request({
						url: seter.websiteUrl+'/api/v1/login/login'
						
						// 请求数据集
					    ,data: {
								username:formdata.username,
								password:formdata.password
					    },
						method:'POST',
						
						// 请求头信息
					    header: {
					        'content-Type': 'application/x-www-form-urlencoded' ,//请求头信息
							//'Content-Type':'application/json'
					    },
					    success: (res) => {
							//遍历数据集
							for (var i in res){
								console.log(res.i);
							}
							
							//登录正常
							if(res.code===0)
							{
								console.log(登录正常);
								// 保存数据
								try {
								    uni.setStorageSync('userinfo', res.data);
								} catch (e) {
								    uni.showModal({
								        content: '连接失败',
								        showCancel: false
								    });
								}
								// 页面跳转
								uni.switchTab({
								    url: '/pages/onepage/home'
								});
							}
							//用户信息错误
							else if(res.code===1){
								uni.showModal({
								    content: res.msg,
								    showCancel: false
								});
							}
					       
					    }
						
					});
	            }
	        
	        }
	    }
</script>

<style lang="scss">
	page{//整体页面配置
		background-color: #FFFFFF;
	}
	
	//登录页面样式
	.login-page{
		width: 510rpx;
		margin: 0 auto;
		//头信息样式
		.login-header{
			height: 190rpx;
			padding: 18rpx 0rpx;
			margin-bottom: 120rpx;
			margin-top:38rpx;
			//图标样式
			.login-header-icon{
				width:128rpx;
				height:128rpx;
				border-radius: 50%;
				background-color:rgb(0,157,254);
				color: #FFFFFF;
				font-size: 32rpx;
				text-align: center;
				line-height: 128rpx;
				margin-bottom:38rpx;
			}
		}
		//表单样式
		.login-form{
			//表单项样式
			.login-form-item{
				padding:10px 0px;
				button{
					background-color: rgb(152,208,255);
					border-radius: 25rpx;
					font-size: 36rpx;
				}
				.login-form-item-label{
					font-size: 28rpx;
					.put{
							background-color: rgb(255,255,255);
							border-bottom:1px solid #000000;
							height:35px;
							font-size: 36rpx;
						}
				}
				
			}
			//底部样式
			.login-form-end{
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
			}
			
		}
		
	}
	
</style>
