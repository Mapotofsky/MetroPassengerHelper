<template>
	<view>
		<view style='margin-left:56rpx;margin-right:56rpx;margin-top:14rpx;margin-bottom:28rpx;height:100%;'>
			<view class='layout-map'>
				<map
					id='mapMini'
					class='map-map'
					:latitude='latitude'
					:longitude='longitude'
					scale='17'
					@tap='tapFull'>
				</map>
			</view>
			<scroll-view scroll-y style='height:860rpx;white-space:nowrap;'>
				<!-- 拥堵度 -->
				<view class="layout-header">
					<text class='mmfont-17sb header-timetable'>拥堵度</text>
					<text class='mmfont-14sb header-congestion'>{{congestion.text}}</text>
					<image src="../../../static/pictures/info/0.png" class="header-icon" v-if="congestion.level === '0'"></image>
					<image src="../../../static/pictures/info/1.png" class="header-icon" v-if="congestion.level === '1'"></image>
					<image src="../../../static/pictures/info/2.png" class="header-icon" v-if="congestion.level === '2'"></image>
					<view class='header-line'></view>
				</view>
				<!-- 发车时间 -->
				<view v-for="(item, index) in info.Info" :key="index">
					<!-- 标题 -->
					<view v-if="info.Info[index].Template === 'infoHeader'">
						<view class='layout-header'>
							<text class='mmfont-17sb header-timetable'>时刻表</text>
							<view class='header-line'></view>
						</view>
					</view>
					<!-- 最下方图标 -->
					<view v-if="info.Info[index].Template === 'infoFooter'">
						<view class='mmfooter-layout'>
							<view class='mmflex-space-around'>
								<button class='mmfooter-button' hover-class='mmhover' @tap='tapFull'>
									<image class='mmicon-large' src='../../../static/pictures/info/metro.png'></image>
									<text class='mmfont-17sb'>地图</text>
								</button>
								<button class='mmfooter-button' hover-class='mmhover' open-type='share'>
									<image class='mmicon-large' src='../../../static/pictures/info/share.png'></image>
									<text class='mmfont-17sb'>分享</text>
								</button>
							</view>
						</view>
					</view>
					<!-- 分隔符 -->
					<view v-if="info.Info[index].Template === 'infoSplit'">
						<view class='layout-split'>
							<view class='split-line' v-if='info.Info[index].Split.Line'></view>
							<view class='split-way' v-if='info.Info[index].Split.Way'></view>
						</view>
					</view>
					<!-- 发车时间 -->
					<view v-if="info.Info[index].Template === 'infoTime'">
						<view class='layout-time'>
							<view class='time-box'>
								<view class='mmflex-start'>
									<text class='time-text mmfont-14sb' v-if='info.Info[index].Time.Title'>{{info.Info[index].Time.Title}}</text>
									<text class='time-text mmfont-14sb' space='nbsp' style="display: block;text-indent: 1em;">首 {{info.Info[index].Time.First}}</text>
									<text class='mmsplit' style="display: block;text-indent: 0.5em;">|</text>
									<text class='time-text mmfont-14sb' space='nbsp' style="display: block;text-indent: 0.5em;">末 {{info.Info[index].Time.Last}}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 线路信息 -->
					<view v-if="info.Info[index].Template === 'infoWay'">
						<view class='layout-way'>
							<view class='way-line' :style='{background:info.Info[index].Way.LineColor}'>
								<view class='mmflex-center'>
									<text class='way-line-text mmfont-17sb'>{{info.Info[index].Way.Line}}</text>
								</view>
							</view>
							<view class='way-way'>
								<view class='mmflex-start'>
									<text class='way-way-value mmfont-17sb'>{{info.Info[index].Way.Way}}</text>
									<text class='way-way-text mmfont-14sb' style="display: block;text-indent: 0.5em;">方向</text>
								</view>
							</view>
							<view class='way-time'>
								<view class='mmflex-start'>
									<text class='way-text mmfont-14sb' v-if='info.Info[index].Way.Title'>{{info.Info[index].Way.Title}}</text>
									<text class='way-text mmfont-14sb' space='nbsp' style="display: block;text-indent: 1em;">首 {{info.Info[index].Way.First}}</text>
									<text class='mmsplit' style="display: block;text-indent: 0.5em;">|</text>
									<text class='way-text mmfont-14sb' space='nbsp' style="display: block;text-indent: 0.5em;">末 {{info.Info[index].Way.Last}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<van-toast id='van-toast' />
	</view>
</template>

<script>
	import Toast from '../../../wxcomponents/vant/dist/toast/toast';
	
	export default {
		data() {
			return {
				city: 'hz',
				station: '城站',
				latitude: '30.244573',
				longitude: '120.180764',
				maxHeight: '1206rpx',
				maxMargin: '56rpx',
				info: {},
				congestion: {}
			}
		},
		
		methods: {
			tapFull(e) {
				const info = this.info;
				if(info && info.Info && info.Info.length > 0) {
					var header = info.Info[0].Header;
					wx.navigateTo({ url: '../map/map?station=' + this.station + '&latitude=' + header.Latitude + '&longitude=' + header.Longitude });
				}
			}
		},
		
		onLoad(options) {
			var lat = this.latitude;
			var lng = this.longitude;
			if(options.latitude) lat = options.latitude;
			if(options.longitude) lng = options.longitude;
			this.city = options.city;
			this.station = options.station;
			this.latitude = lat;
			this.longitude = lng;
			this.maxHeight = '782rpx';
			this.maxMargin = '56rpx';
			this.congestion = { level: '0', text: '正常' };
		},
		  
		onReady() {
			wx.setNavigationBarTitle({ title: this.station });
			Toast.loading({ mask: true, message: '查询中...' });
			const that = this;
			wx.request({
				method: 'POST',
				url: 'https://metroman.cn/api/metroman/info202005/',
				data: {
					city: this.city,
					station: this.station
				},
				success: function (res) {
					if (res.data) {
						if (res.data.Status === 'OK') {
							Toast.clear();
							const info = res.data.Result;
							if(info && info.Info && info.Info.length > 0) {
								const header = info.Info[0].Header;
								if (header.Latitude !== that.latitude || header.Longitude !== that.longitude) {
									that.latitude = header.Latitude;
									that.longitude = header.Longitude;
								}
							}
							that.maxHeight = '782rpx';
							that.maxMargin = '56rpx';
							that.info = res.data.Result;
							// console.log(info.Info)
						} else {
							if (res.data.Message) {
								Toast.clear();
								Toast(res.data.Message);
							} else {
								Toast.clear();
								Toast.fail('查询失败，未知错误');
							}
						}
					} else {
						Toast.clear();
						Toast.fail('查询失败，没有返回值');
					}
				},
				fail: function (res) {
					Toast.clear();
					Toast.fail('查询失败，请检查网络');
				}
			});
			let rn = Math.random();
			if (rn > 0.4) {
				if (rn > 0.9) {
					this.congestion = { level: '2', text: '较为拥堵' };
				} else {
					this.congestion = { level: '1', text: '略显拥堵' };
				}
			} else {
				this.congestion = { level: '0', text: '轻松舒适' };
			}
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
	page {
		background-color: #FAFAFA;
	}
	.layout-map {
		overflow: hidden;
		border-radius: 15rpx;
	}
	.map-map {
		width: 100%;
	}
	.map-full {
		width: 55rpx;
		height: 55rpx;
	}
	.layout-header {
		position: relative;
		width: 100%;
		height: 40px;
	}
	.header-timetable {
		position: absolute;
		left: 0px;
		top: 10px;
		height: 20px;
		line-height: 20px;
		color: #83929E;
	}
	.header-congestion {
		position: absolute;
		right: 50px;
		top: 15px;
		height: 20px;
		line-height: 20px;
	}
	.header-line {
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0px;
		height: 1px;
		background: #E0E0E0;
	}
	.header-icon {
		position: absolute;
		right: 0px;
		height: 40px;
		width: 40px;
	}
	.mmflex-space-around {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: space-around;
	}
	.mmfooter-layout {
		position:relative;
		margin-top: 32px;
		width: 100%;
		height: 96px;
	}
	.mmfooter-button {
		display: flex;
		width: 80px;
		height: 100%;
		margin: 0px;
		padding: 0px;
		flex-direction: column;
		align-items: center;
		background: #FAFAFA;
	}
	.mmfooter-button::after {
		border: none;
	}
	.mmicon-large {
		width: 48px;
		height: 48px;
	}
	.mmfont-17sb {
		font-size: 17px;
		font-weight: 600;
	}
	.mmfont-14sb {
		font-size: 14px;
		font-weight: 600;
	}
	.layout-split {
		position: relative;
		margin-top: 10px;
		width: 100%;
		height: 1px;
	}
	.split-line {
		position: absolute;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		background: #E0E0E0;
	}
	.split-way {
		position: absolute;
		left: 92px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		background: #E0E0E0;
	}
	.mmflex-start {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: flex-start;
	}
	.mmsplit {
		font-size: 17px;
		font-weight: 600;
		line-height: 20px;
		color: #E0E0E0;
	}
	.layout-time {
		position: relative;
		width: 100%;
		height: 20px;
	}
	.time-box {
		position: absolute;
		left: 92px;
		right: 0px;
		top: 0px;
		bottom: 0px;
	}
	.time-text {
		line-height: 20px;
		color: #83929E;
	}
	.mmflex-center {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	.layout-way {
		position: relative;
		width: 100%;
		height: 56px;
	}
	.way-line {
		position: absolute;
		left: 0px;
		top: 16px;
		height: 32px;
		border-radius: 4px;
	}
	.way-line-text {
		margin-left: 12px;
		margin-right: 12px;
		line-height: 20px;
		color: white;
	}
	.way-way {
		position: absolute;
		left: 92px;
		top: 12px;
		height: 20px;
	}
	.way-way-value {
		line-height: 20px;
		color: black;
	}
	.way-way-text {
		line-height: 20px;
		color: #83929E;
	}
	.way-time {
		position: absolute;
		left: 92px;
		top: 36px;
		height: 20px;
	}
	.way-text {
		line-height: 20px;
		color: #83929E;
	}
</style>
