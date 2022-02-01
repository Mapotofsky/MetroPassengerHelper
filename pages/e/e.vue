<template>
	<view>
	<!-- 消息轮播图 -->
	<swiper class="notice" indicator-dots="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#1895b5" autoplay="true" circular="true" interval="3000" 
		duration="1000"  previous-margin="20rpx" next-margin="20rpx">
		<block v-for="(item,index) in notices" :key="index">
			<swiper-item class="notice-item">
				<view class="notice-box">
					<image class="notice-img" :src="item.imgUrl" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</block>
	</swiper>
	<!-- 车票服务 -->
	<view class="shadowBox">
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/movie.png"></image>
			</view>
			<text>乘车优惠</text>
		</view>
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/food.png"></image>
			</view>
			<text>乘车指南</text>
		</view>
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/store.png"></image>
			</view>
			<text>特种票</text>
		</view>
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/store.png"></image>
			</view>
			<text>月账单</text>
		</view>
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/scene.png"></image>
			</view>
			<text>致歉信</text>
		</view>
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/scene.png"></image>
			</view>
			<text>车站详情</text>
		</view>
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/scene.png"></image>
			</view>
			<text>线路详情</text>
		</view>
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/scene.png"></image>
			</view>
			<text>智能客服</text>
		</view>
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/scene.png"></image>
			</view>
			<text>失物招领</text>
		</view>
		<view class="service-item">
			<view>
				<image class="service-pic" src="../../static/pictures/icon/scene.png"></image>
			</view>
			<text>意见建议</text>
		</view>
	</view>
	<!-- 左右滑动块 -->
	<view class="scroll_box"> 
	    <scroll-view scroll-x>
			<view class="scroll_item" >
				1
			</view>
			<view class="scroll_item" id="middle">
				2
			</view>
			<view class="scroll_item" >
				3
			</view>
	    </scroll-view>
	</view>
	<!-- 提示轮播图 -->
	<swiper class="tips" indicator-dots="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#1895b5" autoplay="true" circular="true" interval="3000" duration="1000">
		<block v-for="(item,index) in tips" :key="index">
			<swiper-item class="tips-item">
				<view class="tips-box">
					<image class="tips-img" :src="item.imgUrl" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</block>
	</swiper>
	<!-- 账单 -->
	<view class="bill" @click="seeBill"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notices: [],
				tips: []
			}
		},
		methods: {
			seeBill() {
				console.log("[seeBill] wait to complete");
			}
		},
		onLoad() {
			this.notices = [
				{imgUrl: "../../static/pictures/notices/1.png"},
				{imgUrl: "../../static/pictures/notices/1.png"},
				{imgUrl: "../../static/pictures/notices/1.png"},
				{imgUrl: "../../static/pictures/notices/1.png"},
				{imgUrl: "../../static/pictures/notices/1.png"}
			];
			this.tips = [
				{imgUrl: "../../static/pictures/tips/1.png"},
				{imgUrl: "../../static/pictures/tips/1.png"},
				{imgUrl: "../../static/pictures/tips/1.png"}
			];
		}
	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}
	.notice {
		width: 100%;
		height: 300rpx;
	}
	.notice-item {
		display:flex;
		justify-content: center;
	}
	.notice-box {
		width: 98%;  /* 控制两张图片的间距 */
		height: 100%;
	}
	.notice-img {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.gap {
		height: 50rpx;
	}
	.shadowBox {
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		margin: 20rpx;
		box-shadow:0 10rpx 15rpx -10rpx #808080; 
	}
	.service-item {
		width: 20%;
		text-align: center;
		font-size: 30rpx;
	}
	.service-pic {
		width: 75rpx;
		height: 75rpx;
	}
	.scroll_box {
		width: 100%;
		height: 140rpx;
		overflow: hidden;
		white-space: nowrap;
	}
	.scroll_box scroll-view{
		height: 100%;
		width: auto;
		overflow: hidden;
	}
	.scroll_item {
		width: 35%;
		height: 93%;
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: inline-block;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		box-shadow:0 10rpx 10rpx -10rpx #808080;
	}
	#middle {
		margin: 0;
	}
	.tips {
		height: 300rpx;
		margin: 20rpx;
	}
	.tips-item {
		display:flex;
		justify-content: center;
	}
	.tips-box {
		width: 100%;  /* 控制两张图片的间距 */
		height: 100%;
	}
	.tips-img {
		width: 100%;
		height: 100%;
	}
	.bill {
		width: auto;
		height: 100rpx;
		margin: 20rpx;
		border-radius: 50rpx;
		background-size: 100% 100%;
		background-image: url(../../static/logo.png);
		/* background-attachment: fixed; */
		background-repeat: no-repeat;
		/* background-size: cover; */
	}
</style>
