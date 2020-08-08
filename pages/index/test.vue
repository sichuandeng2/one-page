<template>
	<view class="page">index/test
	<view >
		当前时间：{{now}}
	</view>

	</view>
</template>

<script>
	export default{
		data(){
			return{
				now:""
			}
		}
		,methods:{
			
		}
		,mounted(){
			var date = new Date(),
			hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
			minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
			second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			month >= 1 && month <= 9 ? (month = "0" + month) : "";
			day >= 0 && day <= 9 ? (day = "0" + day) : "";
			var timer = hour + ':' + minute + ':' + second;
			this.now= timer;
		}
	}

</script>

<style>
	.page{
		background-color: #007AFF;
		margin: 0 auto;
		/* text-align: center; */
	}
</style>
