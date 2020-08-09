// 公共信息配置文件
// 创建时间2020/8/6


// 站点配置
const websiteUrl = 'http://www.test.testbcxg.cn';
// const websiteUrl = 'https://17931s03c3.iok.la';

//定时器,存储器
var intervalMark= ["dd","d52"];
function intervalfun( intervalfunction , time,intervalName)
{
	intervalName=setInterval(intervalfunction(),time);
	intervalMark.push(intervalName);
}
function clearintervalfun(interval)
{
	intervalMark.forEach((i)=>{
		console.log(i);
		clearInterval(interval);
	})
}

export default{
	websiteUrl, 	//web站点
	intervalfun,		//定时器
	clearintervalfun	//清除定时器
}