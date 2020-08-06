<template name="setitem">
	<view class="page">
		<view class="page-left">
			<view class="page-left-title">
				<text v-text="title"></text>
			</view>
		</view>
		
		<view class="page-right" >
			<text v-text="itemtext"></text>
			<uniIcons type="arrowright" size="18"></uniIcons>
			</view>
		
	</view>
</template>

<script>
	import uniIcons from "~@/../../components/uni-icons/uni-icons.vue";
	
	export default{
		components:{uniIcons},
		name:"setitem"
		,props:{
			title:{
				type:String,
				value:"test",
			},
			itemtext:{
				type:String,
				value:"test"
			},
		}
		,data(){
			return{
				
			}
		}
		,methods:{
			
		}
	}
</script>

<style lang="scss">
	.page{
		width:720rpx;
		height:120rpx;
		background-color: #FFFFFF;
		display:inline-flex;
		justify-content: space-between;
		border-radius: 35rpx;
		margin: 15rpx 15rpx;
		.page-left{
			padding-left: 30rpx;
			.page-left-title{
				line-height: 120rpx;
			}
			// .page-left-item{
			// 	color: #6E6E6E;
			// }
		}
		.page-right{
			// background-color: #00FF11;
			font-size: 28rpx;
			line-height: 120rpx;
			padding-right: 38rpx;
		}
	}
</style>
