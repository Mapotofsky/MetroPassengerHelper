<template>
	<view>
	<!-- 地图视图 -->
	<view class="myMap" style="width: 100%; height: 2000rpx;" v-show="map_or_net">
		<map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="marker" v-if="hasMarkers"></map>
		<view class="blocks">
			<!-- 路线选择框 -->
			<view class="route">
				<view class="route_part1">
					<view class="route_locs">
						<view class="route_loc">
							<view class="route_points">
								<view class="route_point1"></view>
							</view>
							<view class="route_texts" @click="chooseLoc('from')">
								<text :style="noFrom?'color: #8F8F94;':''">{{fromLoc}}</text>
							</view>
						</view>
						<view class="route_loc">
							<view class="route_points">
								<view class="route_point2"></view>
								<view class="route_point2"></view>
								<view class="route_point2"></view>
							</view>
							<view class="route_texts">
								<view class="route_line"></view>
							</view>
						</view>
						<view class="route_loc">
							<view class="route_points">
								<view class="route_point3"></view>
							</view>
							<view class="route_texts" @click="chooseLoc('to')">
								<text :style="noTo?'color: #8F8F94;':''">{{toLoc}}</text>
							</view>
						</view>
						<view class="route_loc">
							<view class="route_points"></view>
							<view class="route_texts">
								<view class="route_line"></view>
							</view>
						</view>
					</view>
					<view class="route_switch">
						<image src="../../static/pictures/map_img/switch.png" class="route_img" @click="switchLoc"></image>
					</view>
				</view>
				<view class="route_part2">
					<view class="route_button" @click="chooseHome()">
						<view>
							<image src="../../static/pictures/map_img/home.png" class="route_icon"></image>
						</view>
						<text>家&emsp;&emsp;</text>
					</view>
					<view class="route_button" @click="chooseCompany()">
						<view class="route_separate"></view>
						<view>
							<image src="../../static/pictures/map_img/company.png" class="route_icon"></image>
						</view>
						<text>公司&emsp;</text>
					</view>
					<view class="route_button">
						<view class="route_bt" @click="searchPath(fromLoc, toLoc)">
							<text>搜索</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 功能框 -->
			<view class="functions">
				<view class="function" @click="toAnotherPage('lines')">
					<view>
						<image src="../../static/pictures/map_img/lines.png" class="function_icon"></image>
					</view>
					<text class="function_text">线路列表</text>
				</view>
				<view class="function" @click="toAnotherPage('stations')">
					<view>
						<image src="../../static/pictures/map_img/station.png" class="function_icon"></image>
					</view>
					<text class="function_text">车站详情</text>
				</view>
				<view class="function" @click="toAnotherPage('dirver')">
					<view>
						<image src="../../static/pictures/map_img/driver.png" class="function_icon"></image>
					</view>
					<text class="function_text">司机视角</text>
				</view>
				<view class="function" @click="toAnotherPage('toilets')">
					<view>
						<image src="../../static/pictures/map_img/toilet.png" class="function_icon"></image>
					</view>
					<text class="function_text">卫生间</text>
				</view>
			</view>
		</view>
	</view>
	<!-- 路网视图 -->
	<view class="myNet" style="width: 100%; height: 2000rpx;" v-if="!map_or_net">
		<!-- 还没完成类似地图的绘制 -->
		<view class="net_container">
			<image src="https://metroman.cn/mp/metromap/routemap_hz_cn.png" mode="aspectFill" class="netPic"></image>
		</view>
		<!-- 侧边栏 -->
		<view class="side">
			<view class="side_container" :style="sideChoosed[0]?'background-color: #55aaff':''">
				<image :src="sideIcon[0][sideChoosed[0]?1:0]" class="side_icon" @click="chooseSide(0)"></image>
			</view>
			<view class="side_container" :style="sideChoosed[1]?'background-color: #55aaff':''">
				<image :src="sideIcon[1][sideChoosed[1]?1:0]" class="side_icon" @click="chooseSide(1)"></image>
			</view>
			<view class="side_container" :style="sideChoosed[2]?'background-color: #55aaff':''">
				<image :src="sideIcon[2][sideChoosed[2]?1:0]" class="side_icon" @click="chooseSide(2)"></image>
			</view>
		</view>
		<!-- 侧边栏引导的路线选择框 -->
		<view class="blocks" style="top: 60%;" v-show="sideChoosed[0]">
			<view class="route">
				<view class="route_part1">
					<view class="route_locs">
						<view class="route_loc">
							<view class="route_points">
								<view class="route_point1"></view>
							</view>
							<view class="route_texts" @click="chooseLoc('from')">
								<text :style="noFrom?'color: #8F8F94;':''">{{fromLoc}}</text>
							</view>
						</view>
						<view class="route_loc">
							<view class="route_points">
								<view class="route_point2"></view>
								<view class="route_point2"></view>
								<view class="route_point2"></view>
							</view>
							<view class="route_texts">
								<view class="route_line"></view>
							</view>
						</view>
						<view class="route_loc">
							<view class="route_points">
								<view class="route_point3"></view>
							</view>
							<view class="route_texts" @click="chooseLoc('to')">
								<text :style="noTo?'color: #8F8F94;':''">{{toLoc}}</text>
							</view>
						</view>
						<view class="route_loc">
							<view class="route_points"></view>
							<view class="route_texts">
								<view class="route_line"></view>
							</view>
						</view>
					</view>
					<view class="route_switch">
						<image src="../../static/pictures/map_img/switch.png" class="route_img" @click="switchLoc"></image>
					</view>
				</view>
				<view class="route_part2">
					<view class="route_button" @click="chooseHome()">
						<view>
							<image src="../../static/pictures/map_img/home.png" class="route_icon"></image>
						</view>
						<text>家&emsp;&emsp;</text>
					</view>
					<view class="route_button" @click="chooseCompany()">
						<view class="route_separate"></view>
						<view>
							<image src="../../static/pictures/map_img/company.png" class="route_icon"></image>
						</view>
						<text>公司&emsp;</text>
					</view>
					<view class="route_button">
						<view class="route_bt" @click="searchPath(fromLoc, toLoc)">
							<text>搜索</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 图例框 -->
		<view class="legend" v-show="sideChoosed[2]">
			<view class="legend_title">
				图例
			</view>
			<view class="legend_items">
				<view>
					<image src="../../static/pictures/map_img/icon1.png" class="legend_it" mode="aspectFit"></image>
				</view>
				<view>
					<image src="../../static/pictures/map_img/icon2.png" class="legend_it" mode="aspectFit"></image>
				</view>
			</view>
			<!-- <view class="legend_items">
				<view class="legend_item1">
					<image src="../../static/pictures/map_img/circle.png" mode="aspectFit" class="legend_icon"></image>
					<view class="legend_text">单线车站</view>
				</view>
				<view class="legend_item1">
					<image src="../../static/pictures/map_img/circle.png" mode="aspectFit" class="legend_icon"></image>
					<view class="legend_text">换乘车站</view>
				</view>
				<view class="legend_item1">
					<image src="../../static/pictures/map_img/circle.png" mode="aspectFit" class="legend_icon"></image>
					<view class="legend_text">虚拟换乘车站</view>
				</view>
			</view>
			<view class="legend_items">
				<view class="legend_item2">
					<image src="../../static/pictures/map_img/first.png" mode="aspectFit" class="legend_icon"></image>
					<view class="legend_text">线路号</view>
				</view>
				<view class="legend_item2">
					<image src="../../static/pictures/map_img/circle_g.png" mode="aspectFit" class="legend_icon"></image>
					<view class="legend_text">正常车站</view>
				</view>
				<view class="legend_item2">
					<image src="../../static/pictures/map_img/circle_y.png" mode="aspectFit" class="legend_icon"></image>
					<view class="legend_text">拥堵或限流车站</view>
				</view>
				<view class="legend_item2">
					<image src="../../static/pictures/map_img/circle_r.png" mode="aspectFit" class="legend_icon"></image>
					<view class="legend_text">停运车站</view>
				</view>
			</view>
			<view class="legend_items">
				<view class="legend_item3">
					<image src="../../static/pictures/map_img/rail_g.png" mode="aspectFill" class="legend_icon"></image>
					<view class="legend_text">正常区段</view>
				</view>
				<view class="legend_item3">
					<image src="../../static/pictures/map_img/rail_y.png" mode="aspectFill" class="legend_icon"></image>
					<view class="legend_text">拥堵或限流区段</view>
				</view>
				<view class="legend_item3">
					<image src="../../static/pictures/map_img/rail_r.png" mode="aspectFill" class="legend_icon"></image>
					<view class="legend_text">停运区段</view>
				</view>
			</view> -->
		</view>
		<!-- 信息框 -->
		<view class="info" v-show="!sideChoosed[0]">
			<text>{{infoText[sideChoosed[1]?1:0]}}</text>
		</view>
	</view>
	<!-- 悬浮按钮 -->
	<view class="toggle_button" @click="toggleMap">
		<view class="toggle_text">
			<text>{{tText[flag?1:0]}}</text>
		</view>
		<view class="toggle_icon">
			<image :src="tIcon[flag?1:0]" class="toggle_img"></image>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tText: [],
				flag: false,
				tIcon: [],
				latitude: "",
				longitude: "",
				marker: [{
					id: 0,
					latitude: "",
					longitude: ""
				}],
				hasMarkers: false,
				map_or_net: true,
				fromLoc: "我的位置",
				toLoc: "设置终点",
				noFrom: false,
				noTo: true,
				sideIcon: [],
				sideChoosed: [false, false, false],
				a: false,
				infoText: ['\u2002全网络图', '\u2002客流实时信息显示系统']
			}
		},
		methods: {
			toggleMap() {
				this.flag = ! this.flag;
				this.map_or_net = ! this.map_or_net;
			},
			chooseLoc(fot) {
				console.log("[chooseLoc] wait to complete, now choose " + fot);
			},
			toAnotherPage(pageName) {
				console.log("[toAnotherPage] wait to complete, now to " + pageName);
			},
			switchLoc() {
				var tmp = this.noFrom;
				this.noFrom = this.noTo;
				this.noTo = tmp;
				tmp = this.fromLoc;
				this.fromLoc = this.toLoc;
				this.toLoc = tmp;
				if(this.noFrom) {
					this.fromLoc = "设置起点"
				}
				if(this.noTo) {
					this.toLoc = "设置终点"
				}
			},
			chooseHome() {
				console.log("[chooseHome] wait to complete");
				console.log("noFrom: " + this.noFrom)
				console.log("noTo: " + this.noTo)
				// 未设置"home"
				//   设置"home"
				// noFrom == true
				//   fromLoc = home
				// noTo == true
				//   toLoc = home
				// search
			},
			chooseCompany() {
				console.log("[chooseCompany] wait to complete");
				console.log("noFrom: " + this.noFrom)
				console.log("noTo: " + this.noTo)
				// 未设置"company"
				//   设置"company"
				// noFrom == true
				//   fromLoc = company
				// noTo == true
				//   toLoc = company
				// search
			},
			searchPath(from, to) {
				console.log("[searchPath] wait to complete, from " + this.fromLoc + " to " + this.toLoc);
				if (this.noFrom || this.noTo) {
					wx.showToast({
					    title: '起点和终点信息不能为空',
					    icon: 'none'
					})
					return;
				}
			},
			chooseSide(index) {
				if (index == 0 && !this.sideChoosed[index] && this.sideChoosed[2]) {
					// 打开图例时点击查询，图例自动关闭
					this.sideChoosed[2] = false;
				}
				this.sideChoosed[index] = ! this.sideChoosed[index];
				// 必须得加这一句才有效，天知道为什么
				this.a = ! this.a;
			}
		},
		onLoad() {
			var that = this;
			that.tText = ['切换网络图\u2003\u2003',
						  '切换地图\u2003\u2003\u2003'];
			that.tIcon = ['../../static/pictures/map_img/net.png',
						  '../../static/pictures/map_img/map.png'];
			that.sideIcon = [['../../static/pictures/map_img/search0.png',
			                  '../../static/pictures/map_img/search1.png'],
							  
							 ['../../static/pictures/map_img/trans0.png',
							  '../../static/pictures/map_img/trans1.png'],
							  
							 ['../../static/pictures/map_img/info0.png',
							  '../../static/pictures/map_img/info1.png']];
			// 获取地理位置
			wx.getLocation({
				type: 'gcj02',
				success: function(res) {
					var result = res;
					// 想要实际地理位置就把下面两行注释掉
					result.latitude = 30.2279;
					result.longitude = 120.041175;
					that.latitude = result.latitude - 0.006;  // 定位在视觉中心偏上
					that.longitude = result.longitude;
					// console.log(that.latitude, that.longitude);
					that.marker[0].latitude = result.latitude;
					that.marker[0].longitude = result.longitude;
					that.hasMarkers = true;
				}
			})
		}
	}
</script>

<style>
	.myMap {
		z-index: 0;
	}
	.toggle_button {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		height: 100rpx;
		width: 230rpx;
		top: 100rpx;
		right: 100rpx;
	}
	.toggle_text {
		width: 200rpx;
		height: 50rpx;
		left: 0;
		display: flex;
		position: absolute;
		justify-content: center;
		align-items: center;
		border-radius: 25rpx;
		background-color: #55aaff;
		color: #FFFFFF;
		font-size: 25rpx;
		box-shadow: 0 10rpx 10rpx -10rpx #808080;
	}
	.toggle_icon {
		width: 70rpx;
		height: 70rpx;
		position: absolute;
		left: 150rpx;
		border-radius: 35rpx;
		background-color: #F1F1F1;
		box-shadow: 0 4rpx 10rpx 2rpx #808080;
		display: flex;
		position: absolute;
		justify-content: center;
	}
	.toggle_img {
		width: 60%;
		height: 60%;
		object-fit: cover;
		position: absolute;
		left: 20%;
		top: 20%;
	}
	.blocks {
		height: 50%;
		width: 100%;
		position: fixed;
		top: 50%;
	}
	.route {
		margin: 20rpx;
		height: 320rpx;
		width: auto;
		border-radius: 15rpx;
		box-shadow: 0 10rpx 10rpx -10rpx #808080;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: #FFFFFF;
	}
	.route_part1 {
		height: 220rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.route_locs {
		height: 100%;
		width: 80%;
	    padding-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.route_loc {
		width: 100%;
		height: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.route_points {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 20rpx;
		width: 50rpx;
		height: 50rpx;
	}
	.route_texts {
		width: 90%;
		padding-right: 10rpx;
	}
	.route_line {
		height: 4rpx;
		width: 100%;
		background-color: #b9b9bf;
	}
	.route_point1 {
		width: 16rpx;
		height: 16rpx;
		border-radius: 8rpx;
		background-color: #00e900;
	}
	.route_point2 {
		width: 8rpx;
		height: 8rpx;
		border-radius: 4rpx;
		background-color: #b9b9bf;
		margin: 4rpx;
	}
	.route_point3 {
		width: 16rpx;
		height: 16rpx;
		border-radius: 8rpx;
		background-color: #ff0000;
	}
	.route_switch {
		height: 100rpx;
		width: 100rpx;
		margin-right: 20rpx;
		border-radius: 50rpx;
	}
	.route_img {
		height: 100%;
		width: 100%;
	}
	.route_part2 {
		height: 100rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.route_button {
		height: 60rpx;
		width: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.route_icon {
		width: 55rpx;
		height: 55rpx;
		margin: 10rpx;
	}
	.route_separate {
		width: 4rpx;
		height: 100%;
		background-color: #b9b9bf;
		margin-right: 30rpx;
	}
	.route_bt {
		width: 140rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30rpx;
		background-color: #55557f;
		color: #FFFFFF;
		font-size: 30rpx;
	}
	.functions {
		margin: 20rpx;
		height: 140rpx;
		width: auto;
		border-radius: 15rpx;
		box-shadow: 0 10rpx 10rpx -10rpx #808080;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #FFFFFF;
	}
	.function {
		height: 100rpx;
		width: 120rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.function_icon {
		width: 60rpx;
		height: 60rpx;
		margin: 5rpx;
	}
	.function_text {
		font-size: 30rpx;
	}
	.net_container {
		width: 180%;
		height: 180%;
	}
	.netPic {
		width: 100%;
		height: 100%;
	}
	.side {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 320rpx;
		width: 90rpx;
		position: fixed;
		top: 300rpx;
		right: 0;
		border-top-left-radius: 15rpx;
		border-bottom-left-radius: 15rpx;
		background-color: #FFFFFF;
		box-shadow: -5rpx 10rpx 15rpx -5rpx #808080;
		opacity: 0.8
	}
	.side_container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		opacity: 1
	}
	.side_icon {
		width: 45rpx;
		height: 45rpx;
	}
	.info {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx;
		width: auto;
		font-size: 30rpx;
		position: fixed;
		top: 900rpx;
		right: 0;
		border-top-left-radius: 45rpx;
		border-bottom-left-radius: 45rpx;
		background-color: #FFFFFF;
		box-shadow: -5rpx 10rpx 15rpx -5rpx #808080;
		opacity: 0.8;
	}
	.legend {
		position: fixed;
		top: 30%;
		/* top: 20%; */
		right: 10%;
		left: 10%;
		width: 80%;
		max-width: 80%;
		/* height: 400rpx; */
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		box-shadow: 0rpx 10rpx 15rpx -5rpx #808080;
		opacity: 0.8;
		overflow: hidden;
	}
	.legend_title {
		position: relative;
		left: 20rpx;
		margin: 20rpx;
		/* margin-bottom: 50rpx; */
		width: 100%;
		height: 35rpx;
		font-size: 30rpx;
	}
	.legend_items {
		width: 100%;
		height: auto;
		/* height: 30%; */
		display: flex;
		justify-content: space-around;
		align-items: baseline;
	}
	.legend_it {
		width: 300rpx;
		height: 200rpx;
	}
	/* .legend_item1 {
		height: 100%;
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.legend_item2 {
		height: 100%;
		width: 23%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.legend_item3 {
		height: 100%;
		width: 33%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.legend_icon {
		width: 50rpx;
		height: 50rpx;
	}
	.legend_text {
		font-size: 25rpx;
		text-align: center;
	} */
</style>
