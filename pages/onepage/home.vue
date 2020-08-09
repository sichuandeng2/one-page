<template>
	<view class="page">
		<view class="home-page-heder">
		</view>
		<view class="home-page-body">
			
			<!-- 打卡统计 -->
			<view class="count">
				<view class="count-title">
					<text>{{month}}月汇总</text>
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
					<text class="record-title-item" >({{month}}月)</text>
				</view>
					<view  class="recor-calendar">
					    <uni-calendar 
					    :insert="true"
					    :showMonth = "false"
					    :start-date=startdate
					    :end-date=enddate
					    @change="change"
					     />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "~@/../../components/uni-icons/uni-icons.vue";
	import uniCalendar from "../../components/uni-calendar/uni-calendar.vue";
	export default {
			components:{
				uniIcons,
				uniCalendar,
				
			},
	       data() {
	           return {
					user:{},
					startdate:null,
					enddate:null,
					month:null
				}
			},
			methods:{
				change(){
					
				}
			},
		   mounted() {
			   
			   //获取月历的开始和结束日期
			   var now = new Date();
			   var year = now.getFullYear();
			   var month = now.getMonth()+1;
			   var day = now.getDate();
			   var lmon = [1,3,5,7,8,10,12];
			   var smon = [4,6,9,11];
				var endday =28;
				if(month==2)
				{
					if(year%4===0&&year%100!==0||year%400===0)
					endday=29;
					else{
						endday=28;
					}
				}
				else{
					lmon.forEach((i)=>{
							if(i===month) endday=31;
						})
						smon.forEach((i)=>{
							if(i===month) endday=30;
						})
					
				}
				this.month=month;
				this.startdate = year +'-' +month+'-' +"1";
				this.enddate = year + '-'+month+'-'+endday;
				
			
			   //加载登录数据
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
	
		.home-page-body{
			.count{
				margin: 38rpx auto;
				height: 230rpx;
				width:700rpx;
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
							font-size: 26rpx;
						}
						
						
						// background-color: #DD524D;
					}
				}
				
			}
			.record{
				margin: 38rpx auto;
				// height: 480rpx;
				width:700rpx;
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
				.recor-calendar
				{
					// width:674rpx ;
					// padding: 10rpx;
				}
			}
			
			
		}
	}
</style>
