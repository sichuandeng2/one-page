<template>
	<view class="page">
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
			
			<!-- 月历信息 -->
			<view class="record">
				<!-- 打卡记录 -->
				<view class="record-title">
					<text>每日记录</text>
					<text class="record-title-item" >({{month}}月)</text>
				</view>
				<!-- 月历模块 -->
				<view  class="recor-calendar" >
					<uni-calendar 
					:insert="true"
					:showMonth = "false"
					:start-date=startdate
					:end-date=enddate
					@change="change"
					 />
				</view>
			</view>
			
			<!-- 月历信息 -->
			<view  class="record-info" style="">
					<view v-text="message" class="message"></view>
			</view>
		</view>
	</view>
</template>

<script>
	// 获取日历日期范围
	function getdate(that){
		//获取月历的开始和结束日期
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var day = now.getDate();
		var lmon = [1,3,5,7,8,10,12]; //大月
		var smon = [4,6,9,11];		//小月
		var endday =28;				//2月
		if(month==2)//是否为2月
		{
			//四年一闰，百年不闰，四百年又闰
			if(year%4===0&&year%100!==0||year%400===0)
			endday=29;
			else{
				endday=28;
			}
		}
		else{
			//是否为大月
			lmon.forEach((i)=>{
					if(i===month) endday=31;
			})
			//是否为小月
			smon.forEach((i)=>{
				if(i===month) endday=30;
			})
			
		}
		that.month=month;
		that.startdate = year +'-' +month+'-' +"1";
		that.enddate = year + '-'+month+'-'+endday;
		
	}
	
	import uniCalendar from "~@/../components/uni-calendar/uni-calendar.vue"; //日历挂载
	import uniIcons from "~@/../components/uni-icons/uni-icons.vue"; //字体图标挂载
	export default {
		components:{uniCalendar,uniIcons}
	    ,data() {
		   return {
				user:{},
				startdate:null,
				enddate:null,
				month:null,
				message:"规则：无排班"
			}
		},
		methods:{
			
			open(){
				this.$refs.popup.open()
			}
			,change(){
				
			}
		},
	   mounted() {
			   getdate(this);

			
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
					display:flex;
					justify-content:space-between;
					font-weight: bolder;
					padding:26rpx;
					padding-bottom: 5rpx;
				}
				.count-holder{
					// border:1rpx solid #DDDDDD;
					display:flex;
					justify-content:space-between;
					font-size: 38rpx;
					font-family:DFKai-SB;
					padding:8rpx 26rpx;
					.count-holder-item{
						// border:1rpx solid #00DDDD;
						width:180rpx;
						text-align: center;
						.count-holder-item-text{
							font-size: 26rpx;
							font-family:"宋体";
							padding-top: 8rpx;
						}
					}
				}
			}
			.record{
				margin: 38rpx auto;
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
			}
		}
		.record-info{
			font-size: 28rpx;
			background-color:#FFFFFF;
			height:100rpx;
			width:700rpx;
			margin: 38rpx auto;
			border-radius: 25rpx;
			.message{
				padding: 18rpx;
			}
		}
	}
</style>
