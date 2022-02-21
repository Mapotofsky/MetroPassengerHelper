<template>
	<view>
		<map
			id='mapFull'
			class='map-map'
			:latitude='latitude'
			:longitude='longitude'
			scale='17'>
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				station: '地图',
				latitude: '30.244573',
				longitude: '120.180764'
			}
		},
		methods: {
			
		},
		onLoad(options) {
			this.station = options.station;
			this.latitude = options.latitude;
			this.longitude = options.longitude;
		},
		onReady() {
			wx.setNavigationBarTitle({ title: this.station });
		}
	}
</script>

<style>
	.map-map {
		width: 100%;
		height: 100vh;
	}
</style>
