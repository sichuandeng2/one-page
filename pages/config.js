// 公共信息配置文件
// 创建时间2020/8/6
//最后修改		姓名	日期
//				邓平	2020年8月10日

// 站点配置
const websiteUrl = 'http://www.test.testbcxg.cn';
// const websiteUrl = 'https://17931s03c3.iok.la';

// 调试模式
const debug = true;

//定时器
function timer(that){
	var Interval={};
	
	// 定时时间
	getTime(that);
	Interval.getTime= setInterval(getTime,1000,that);
	
	// 定时地址
	getOnLoction(that);
	Interval.getOnLoction =setInterval(getOnLoction,5000,that);
	
	//获取时间
	function getTime(that){
		var date = new Date();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var  second=date.getSeconds();
		hour<=9?hour= "0"+hour:hour;
		minute<=9?minute= "0"+minute:minute;
		second<=9?second= "0"+second:second;
		that.now=hour+":"+minute+":"+second;	
		console.log(that.now);
	}
	
	//获取定位
	function getOnLoction(that){
		uni.getLocation({
			type: 'gcj02',
			horizontalAccuracy:1,
			geocode:true,
			success:  (res) =>{
				accuracy:2;
				console.log("地址为："+res.address.poiName);
				that.addres.localAdress=res.address.poiName;
				that.addres.longitude=res.longitude;
				that.addres.latitude = res.latitude;
				that.mark = "checkmarkempty";
				that.covers[0].longitude=that.circles[0].longitude=res.longitude;
				that.covers[0].latitude=that.circles[0].latitude=res.latitude;
				console.log("经度：" +that.addres.longitude+"纬度："+that.addres.latitude)
				// uni.showModal({
				// 	content:"经度：" +that.addres.longitude+"纬度："+that.addres.latitude
				// })
			},
			fail:function (res){
				console.log("地址获取失败");
				that.mark="closeempty";
				that.addres.localAdress="地址获取失败"
				uni.showModal({
					content:'失败'
					,showCancel: false
				})
			}
		});
	}
	return Interval;
}

//接口定义
export default{
	websiteUrl 	//web站点
	,debug
	,timer
}