import {
	server,
	logout
} from '@/utils/api';

let request = {
	async get(url, data) {
		var [error, res] = await uni.request({
			url: server + url,
			header: {
				Authorization: uni.getStorageSync('token')
			},
			data: data ? data : {}
		});
		if (res.data.code == logout) {
			uni.removeStorageSync('user');
			uni.removeStorageSync('token');
			uni.reLaunch({
				url: '../login/login'
			});
			return '登录信息已失效，请重新登录！';
		} else {
			return res.data;
		}
	},
	async post(url, data) {
		var [error, res] = await uni.request({
			url: server + url,
			method: 'POST',
			header: {
				'Authorization': uni.getStorageSync('token'),
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: data ? data : {}
		});
		if (res.data.code == logout) {
			uni.removeStorageSync('user');
			uni.removeStorageSync('token');
			uni.reLaunch({
				url: '../login/login'
			});
			return '登录信息已失效，请重新登录！';
		} else {
			return res.data;
		}
	},
	async postJSON(url, data) {
		var [error, res] = await uni.request({
			url: server + url,
			method: 'POST',
			header: {
				'Authorization': uni.getStorageSync('token'),
			},
			data: data ? data : {}
		});
		if (res.data.code == logout) {
			uni.removeStorageSync('user');
			uni.removeStorageSync('token');
			uni.reLaunch({
				url: '../login/login'
			});
			return '登录信息已失效，请重新登录！';
		} else {
			return res.data;
		}
	}
}
export default request
