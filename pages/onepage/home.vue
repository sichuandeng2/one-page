<template>
	<view class="page">
		<view class="home-page-heder">
			<headcomp title="统计"></headcomp>
		</view>
		<view class="home-page-body">
			<!-- 打卡统计 -->
			<view class="count">
				<view class="count-title">
					<text>8月汇总</text>
					<uniIcons type="arrowright" size="25"></uniIcons>
					</view>
				<view class="count-holder">
					<view class="count-holder-item">
						<view>0</view>
						<view class="count-holder-item-text">平均工时(小时)</view>
					</view>
					<view class="count-holder-item">
						<view>0</view>
						<view class="count-holder-item-text">迟到(次)</view>
					</view>
					<view class="count-holder-item">
						<view>0</view>
						<view class="count-holder-item-text">早退(次)</view>
					</view>
				</view>
			</view>
			<!-- 打卡记录 -->
			<view class="record">
				<view class="record-title">
					<text>每日记录</text>
					<text class="record-title-item" >(8月)</text>
				</view>
				<view>
					
				</view>
			</view>
			<!-- <text >登录的员工为：</text><text class="home-page-body-text" v-text="user"></text> -->
		</view>
	</view>
</template>

<script>
	import uniIcons from "~@/../../components/uni-icons/uni-icons.vue";
	import headcomp from "../components/headComp.vue"; //引用插槽
	export default {
			components:{
				headcomp,
				uniIcons
			},
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
					console.log(res.data.username);
					console.log(this);
					
				}
			   });
		   },
		 
	}
</script>

<style lang="scss">
	.page{
		background-color: #F5F5F5;
		height: 100%;
		.home-page-heder{
			
		}
		.home-page-body{
			.count{
				margin: 38rpx auto;
				height: 230rpx;
				width:674rpx;
				background-color: #FFFFFF;
				border-radius: 25rpx;
				.count-title{
					width: 580rpx;
					display:inline-flex;
					justify-content:space-between;
					margin-left: 20rpx;
					padding:18rpx;
					font-weight: bolder;
				}
				.count-holder{
					width:674rpx ;
					display:inline-flex;
					justify-content:center;
					.count-holder-item{
						width: 198rpx;
						text-align: center;
						.count-holder-item-text{
							padding-top: 5rpx;
							font-size: 30rpx;
						}
						
						
						// background-color: #DD524D;
					}
				}
				
			}
			.record{
				margin: 38rpx auto;
				height: 480rpx;
				width:674rpx;
				background-color: #FFFFFF;
				border-radius: 25rpx;
				.record-title{
					width:674rpx ;
					margin-left: 20rpx;
					padding:18rpx;
					font-weight: bolder;
					.record-title-item{
						font-size: 28rpx;
						padding-left: 20px;
					}
				}
			}
			
			
		}
	}
</style>
