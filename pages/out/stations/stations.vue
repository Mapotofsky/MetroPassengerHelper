<template>
	<view>
		<van-search
			placeholder='车站/拼音/首字母'
			background='#FAFAFA'
			:value='searchText'
			@change='refreshSearch'>
		</van-search>
		<view class='mmline'></view>
		<van-tree-select
			:items='stationData'
			:main-active-index='mainActiveIndex'
			height='549'
			max-height='604'
			@click-item='onClickItem'
			@click-nav='onClickNav'>
		</van-tree-select>
		<van-toast id='van-toast' />
	</view>
</template>

<script>
	import hzData from '../../../static/data/hz.js';
	import cityData from '../../../static/data/city.js';
	export default {
		data() {
			return {
				city: 'hz',
				hotList: [],
				lineList: [],
				stationList: [],
				searchText: '',
				stationData: [],
				showNearbyToast: false,
				mainActiveIndex: 0,
			}
		},
		methods: {
			onClickNav({detail}) {
				this.mainActiveIndex = detail.index || 0;
			},
			onClickItem({detail}) {
				if(detail.id >= 10000) return;
				var station = this.stationList[detail.id];
				uni.navigateTo({
					url: '../info/info?city=' + this.city + '&station=' + station.name + '&latitude=' + station.lat + '&longitude=' + station.lng
				});
			},
			
			// 推荐车站
			getStationByName(name) {
				var result;
				for(const obj of this.stationList) {
					if(obj.name === name) {
						result = obj;
						break;
					}
				}
				return result;
			},
			getHotByKey(key) {
				var result;
				for(const obj of this.hotList) {
					if(obj.key === key) {
						result = obj;
						break;
					}
				}
				return result;
			},
			getHotList() {
				var result = new Array();
				const hotObj = this.getHotByKey(this.city);
				for(const hot of hotObj.hot) {
					let obj = this.getStationByName(hot);
					if(obj) {
						result.push({ id: obj.id, text: obj.name });
					}
				}
				return result;
			},
			getHot() {
				var list = new Array();
				var hotList = this.getHotList();
				for(const obj of hotList) {
					if(!list.some(e => e.id === obj.id)) {
						list.push(obj);
					}
				}
				return { text: '推荐车站', children: list };
			},
			
			// 搜索车站
			getSearch(e) {
				var list = new Array();
				if(e) {
					for(const obj of this.stationList) {
						if (obj.name.includes(e) || obj.pinyin.includes(e) || obj.py.includes(e)) {
							list.push({ id: obj.id, text: obj.name });
						}
					}
				}
				return { text: '搜索结果', children: list };
			},
			refreshSearch(e) {
				try {
					const searchText = e.detail.toLowerCase().trim();
					var stationData = this.stationData;
					if(stationData.length > 1) {
						stationData[1] = this.getSearch(searchText);
						this.searchText = searchText;
						this.mainActiveIndex = 1;
						this.stationData = stationData;
					}
				} catch (e) {
					console.log(e);
				}
			}
		},
		
		onLoad() {
			const lineList = hzData.lineList;
			const stationList = hzData.stationList;
			const hotList = cityData.hotList;
			this.lineList = lineList;
			this.stationList = stationList;
			this.hotList = hotList;
			var stationData = new Array();
			
			stationData.push(this.getHot());
			stationData.push(this.getSearch(''));
			
			for(const line of lineList) {
				var list = new Array();
				// 检查line.stations中的id与相应序号的station是否匹配
				// 是则加入对应的列表供选择
				for(const stationId of line.stations) {
					var station = stationList[stationId];
					if (!list.some(e => e.id === station.id)) {
						list.push({ id: station.id, text: station.name });
					}
				}
				stationData.push({ text: line.name, children: list });
			}
			this.stationData = stationData;
		},
	}
</script>

<style>
	.van-search__content {
		background-color: white !important;
	}
	.mmline {
		width: 100%;
		height: 1px;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #EEEEEE;
	}
</style>
