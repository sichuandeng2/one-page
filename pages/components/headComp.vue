<template name="headconp">
	<view class="hc-page">
		<view class="page-left">
			<text v-text="title"></text>
		</view>
		<view class="page-right">
			<view class="page-right-help">
				<uniIcons type="help" size="30"></uniIcons>
			</view>
			<view class="page-right-more">
				<uniIcons type="more-filled" size="30"></uniIcons>
				<text>|</text>
				<uniIcons type="close" size="30">...</uniIcons>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "~@/../../components/uni-icons/uni-icons.vue";
	
	export default {
		components:{uniIcons},
		name:"headconp"
		,props:{
			title:{
				type:String,
				value:"test",
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
	.hc-page{
		width:750rpx;
		height:150rpx;
		background-color: #FFFFFF;
		display:inline-flex;
		justify-content: space-between;
		.page-left{
			line-height: 200rpx;
			margin-left: 85rpx;
		}
		.page-right{
			display:inline-flex;
			justify-content:space-between;
			margin-right: 50rpx;
			// border:1px groove #000000;
			.page-right-help{
				line-height: 200rpx;
				
				width: 120rpx;
			}
			.page-right-more{
				line-height: 200rpx;
				width: 200rpx;
				display:inline-flex;
				justify-content: space-around;
			}
		}
	}
</style>
