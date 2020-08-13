<template>
	<view class="page">
		<view class="home-page-body">
			
			<!-- 打卡统计 -->
			<view class="count">
				<view class="count-title" @click="details">
					<text>{{month}}月汇总</text>
					<uniIcons  type="arrowright" size="25"></uniIcons>
				</view>
				<view class="count-holder">
					<view class="count-holder-item">
						<view>{{login.AverageManHour}}</view>
						<view class="count-holder-item-text">平均工时(小时)</view>
					</view>
					<view class="count-holder-item">
						<view>{{login.beLate}}</view>
						<view class="count-holder-item-text">迟到(次)</view>
					</view>
					<view class="count-holder-item">
						<view>{{login.leaveEarly}}</view>
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
					:selected=login.selected
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
	import uniCalendar from "~@/../components/uni-calendar/uni-calendar.vue"; //日历挂载
	export default {
		components:{uniCalendar}
	    ,data() {
		   return {
				login:{}, //获取登录信息
				startdate:null,	//月历开始日期
				enddate:null,//月历结束日期
				month:null,//当前月份
				message:"无打卡记录"//日期排班信息
			}
		}
		,methods:{
			
			open(){
				this.$refs.popup.open()
			}
			,change(e){
				console.log("点击日期");
				
				var dates = this.login.selected;
				
				console.log(dates);
				
				
				for( var i in dates)
				{
					console.log(dates[i].date);
					console.log("数据为："+dates[i].date +"点击获取为："+e.fulldate);
					if(e.fulldate==dates[i].date)
					{
						console.log(this.message);
						this.message = dates[i].data.name;
						console.log(this.message)
						// console.log(dates[i].data.custom)
						 
						break;
					}
					else{
						this.message="无打卡记录";
					}
				}
			}
			,details(){
				uni.navigateTo({
				    url:"../clock/details"
				});
			}
			// 设置日历日期
			,getdate(){
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
				this.month=month;
				this.startdate = year +'-' +month+'-' +"1";
				this.enddate = year + '-'+month+'-'+endday;
			}
		}
	    ,mounted() {
			// 设置日历日期
			this.getdate();
			
			//加载登录数据
		    uni.getStorage({
				key: 'userinfo',
				success: (res) =>{
					this.login=res.data.data;
					console.log(JSON.stringify(res.data.data));
					
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
