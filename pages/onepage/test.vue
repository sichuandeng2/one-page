<template>
	<view class="page">
		<view>欢迎使用XXX,</view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
			  <text class="title">工号</text>
			  <input class="uni-input" name="input" placeholder="这是一个输入框" />
			</view>
			<view class="uni-form-item uni-column">
			  <text class="title">密码</text>
			  <input class="uni-input" name="input" placeholder="这是一个输入框" password="true" />
			</view>
			<view class="uni-form-item uni-column">
			  <button form-type="submit">登录</button>
			</view>
		</form>
	</view>
</template>

<script>
	
</script>

<style>
	*{
		padding:0px;
		margin:0px;
		box-sizing:border-box;
	}
	
	.page{
		margin:30px;
		
	}
</style>
