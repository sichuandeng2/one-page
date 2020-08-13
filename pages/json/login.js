
let data ={
	"code":0
	,"msg":""
	,"data":{
		"userName":"邓平"
		,"AverageManHour":"8"//
		,"beLate":"2"//迟到
		,"leaveEarly":"3"//早退
		,"selected":[
			{"date": "2020-08-13"
			// , "info": "签到"
			, "data": {
				"custom": "打卡信息"
				, "name": "今日未打下班卡"
				}
			},
			{"date": "2020-08-12"
			, "info": "已打卡"
			, "data": {
				"custom": "打卡信息"
				, "name": "打卡5小日"
				}
			},
			{"date": "2020-08-11"
			, "info": "已打卡"
			, "data": {
				"custom": "打卡信息"
				, "name": "打卡7小日，早退。"
				}
			}
		]
	}
}
module.exports={
	data:data
}