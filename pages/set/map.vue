<template>
	<view class="page">
		<view class="page-map">
			<map style="width: 700rpx;height: 600rpx;" :latitude="latitude" :longitude="longitude" :markers="mark" :circles="circles">
			</map>
		</view>
		<!-- 位置信息 -->
		<view class="page-info">
			<view class="page-info-text">
				<view class="page-info-text-item">当前位置：{{localAdress}}</view>
				<view class="page-info-text-item">经度：{{longitude}}</view>
				<view class="page-info-text-item">纬度：{{latitude}}</view>
			</view>
			<view class="page-info-distance">
				<view class="page-info-distance-input">
					<view class="page-info-distance-input-icon">
						<uni-icons type="map-pin-ellipse" size="22" style="color: #666;"></uni-icons>
					</view>
					<input type="text" v-model="circles[0].radius" placeholder="请输入打卡范围" />
				</view>
			</view>
			<view class="page-info-sub">
				<button @click="commit()">点击提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	var locatioMark = null;
	export default {
		data() {
			return {
				//用户信息
				user: {},
				//地址信息
				latitude: null, //纬度
				longitude: null, //经度
				localAdress: "当前地址获取失败", //当地名称
				//标记地图
				mark: [{
					latitude: 1,
					longitude: 1,
					iconPath: '/static/logo.png',
					callout: {
						content: "当前位置"
					}
				}],
				// 画圆
				circles: [{
					latitude: null,
					longitude: null,
					radius: 100,
					fillColor: "#dddddd55"
				}],
				match: true
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('user');
			this.getLocation();
			this.getData();
		},
		methods: {
			//获取地址事件
			getLocation: function() {
				uni.getLocation({
					type: "gcj02",
					geocode: true,
					success: (res) => {
						this.localAdress = res.address.poiName;
						this.longitude = res.longitude;
						this.latitude = res.latitude;
						this.mark[0].latitude = res.latitude;
						this.mark[0].longitude = res.longitude;
						this.circles[0].latitude = res.latitude;
						this.circles[0].longitude = res.longitude;
					},
					//获取地址失败
					fail: (res) => {
						console.log("地址获取失败");
						this.localAdress = "地址获取失败";
						uni.showToast({
							title: '获取地址失败',
							icon: "none"
						})
					}
				});
			},
			getData() {
				request.get('/api/v1/storePositionConfig/getPosition', {
					userNo: this.user.username
				}).then(res => {
					this.circles[0].radius = res.data.distance;
				})
			},
			//门店定位事件
			commit() {
				//配置定位参数
				let positionParams = {
					userNo: this.user.username, //员工工号
					longitude: this.longitude, //经度
					latitude: this.latitude, //纬度
					distance: this.circles[0].radius
				}

				//发送位置请求
				request.post('/api/v1/storePositionConfig/setStoreJW', positionParams)
					.then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: '提交成功',
								icon: 'none'
							})
							setTimeout(() => {
								uni.navigateBack({})
							}, 1500)
						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						}
					})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.page {
		display: flex;
		flex-direction: column;
		align-items: center;

		.page-map {
			text-align: center;
			height: 600rpx;
			width: 700rpx;
		}

		.page-info {
			font-size: 36rpx;
			width: 700rpx;
			height: 650rpx;

			.page-info-distance {
				display: flex;
				justify-content: center;

				.page-info-distance-input {
					display: flex;
					border: 1px solid #000000;
					border-radius: 8rpx;
					width: 515rpx;
					padding: 8rpx;

					.page-info-distance-input-icon {
						padding: 0 20rpx;
					}
				}
			}

			.page-info-text {
				margin: 55rpx;

				.page-info-text-item {

					padding-left: 88rpx;
					padding: 15rpx;
				}
			}

			.page-info-sub {
				button {
					background-color: #009DFE;
					border-radius: 8rpx;
					font-size: 36rpx;
					color: #FFFFFF;
					width: 520rpx;
					margin-top: 50rpx;
				}

			}
		}
	}
</style>
