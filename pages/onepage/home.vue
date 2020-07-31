<template>
	<view class="home-page">
		<view class="home-page-heder">
			<view class="home-page-header-title">主页</view>
			
		</view>
		<view class="home-page-body">
			<text >登录的员工为：</text><text class="home-page-body-text" v-text="user"></text>
		</view>
	</view>
</template>

<script>
	
	export default {
		
	       data() {
	           return {
					user:{}	
				}
			},
		   mounted() {
			   uni.getStorage({
				key: 'userinfo',
				success: (res) =>{
					this.user=res.data.username;
					//console.log(res.data.username);
					console.log(this);
					
				}
			   });
		   },
		 
	}
</script>

<style lang="scss">
	.home-page{
		.home-page-heder{
			.home-page-header-title{
				margin: 20px auto;
				text-align:center;
			}
			
		}
		.home-page-body-text{
			color: #4CD964;
		}
	}
</style>
