<template>
	<view class="login-page">
		<!-- 头信息 -->
		<view class="login-header">
			<view class="welcome">欢迎使用uni-app</view>
		</view>
		<!-- 表单 -->
		<view class="login-form">
			<form @submit="formSubmit" @reset="formReset">
				<!-- 工号 -->
				<view class="login-form-item ">
				  <text class="login-form-item-label">工号：</text>
				  <input name="username" class="put" placeholder="请输入工号" />
				</view>
				<!-- 密码 -->
				<view class="login-form-item">
				  <text class="login-form-item-label">密码：</text>
				  <input  name="password" class="put"  placeholder="请输入密码" password="true" />
				</view>
				<view class="login-form-item">
				  <button form-type="submit" calss="login-form-item-enter" style="width:48%;"><text space="emsp">登  录</text></button>
				</view>
			</form>
			
		</view>
	</view>
	
</template>

<script>
	 export default {
	        data() {
	            return {
					
	            }
	        },
	        methods: {
				// 表单提交
	            formSubmit: function(e) {
					// 获取表单信息
					var formdata = e.detail.value;
					// var jsonstr =JSON.stringify(formdata);
					var queststr='?username='+formdata.username+'&password='+formdata.password;
	                console.log('form发生了submit事件，携带数据为：' + formdata)
					// 发起请求
					uni.request({
						// url:'https://localhost:44326/Home',
					    // url: 'https://17931s03c3.iok.la/api/v1/Admin/login'+queststr, //get请求地址。
						url: 'https://17931s03c3.iok.la/api/v1/Admin/login', //post请求地址。
						
						// 请求数据集
					    data: {
								username:formdata.username,
								password:formdata.password
					    },
						method:'POST',
						// 请求头信息
					    header: {
					        // 'content-Type': 'application/x-www-form-urlencoded' ,//请求头信息
							'Content-Type':'application/json'
					    },
					    success: (res) => {
							if(res.statusCode==200)
							{
								// console.log(res.data);
								
								try {
								    uni.setStorageSync('userinfo', res.data);
								} catch (e) {
								    // error
								}
								//登录成功，页面跳转
								// uni.navigateTo({
								//     url: '../onepage/home'
								// });
							}
							else{
								
								uni.showModal({
								    content: '工号或者密码输入错误',
								    showCancel: false
								});
							}
					       
					    }
					});
	            },
	        
	        }
	    }
</script>

<style lang="scss">
	.login-page{
		text-align: left;
		margin:50px auto;
		padding-left: 20px;
		width: 80%;
		border:#007AFF;
		.login-header{
			margin-top: 38%;
			padding: 20px 0px;;
		}
		.login-form{
			.login-form-item{
				padding:10px 0px;
				.put{
						border: solid 1px #999;
						height:20px;
						width: 62%;
					}
				
				.login-form-item-label{
					//padding-right: 15px;
					float: left;
				}
				
			}
		}
	}
	/* @import url("/pages/style/main.css"); */
	
</style>
