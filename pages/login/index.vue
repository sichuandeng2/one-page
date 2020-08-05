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
				  <button form-type="submit"><text space="emsp">登  录</text></button>
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
					// var queststr='?username='+formdata.username+'&password='+formdata.password;
	                console.log('form发生了submit事件，携带数据为：' + formdata);
					
					uni.switchTab({
					    url: '/pages/onepage/home'
					});
					// 发起请求
					uni.request({
						// url:'https://localhost:44326/Home',
						// url: 'https://17931s03c3.iok.la/api/v1/login/login', //post请求地址。
						// url: 'http://www.test.testbcxg.cn/api/v1/login/login?username=100051&password=111111', //post请求地址。
						url: 'http://www.test.testbcxg.cn/api/v1/login/login'
						
						// 请求数据集
					    ,data: {
								username:formdata.username,
								password:formdata.password
					    },
						method:'POST',
						
						// // 请求头信息
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
	.login-page{
		text-align: left;
		margin:50px auto;
		width: 80%;
		
		.login-header{
			padding: 18px 0px;;
		}
		.login-form{
			.login-form-item{
				// display:flex;
				// justify-content: center;
				// align-items: center;
				padding:10px 0px;
				button{
					width: 150px;
					background-color: rgb(50,178,218);
				}
				.login-form-item-label{
					.put{
						background-color: rgb(255,255,255);
							border-bottom:1px solid #000000;
							height:35px;
						}
				}
				
			}
		}
	}
	
</style>
