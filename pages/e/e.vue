<template>
	<view>
	<!-- 消息轮播图 -->
	<swiper class="notice" indicator-dots="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#1895b5" autoplay="true" circular="true" interval="5000" 
		duration="600"  previous-margin="20rpx" next-margin="20rpx">
		<block v-for="(item,index) in notices" :key="index">
			<swiper-item class="notice_item">
				<view class="notice_box">
					<image class="notice_img" :src="item.imgUrl" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</block>
	</swiper>
	<!-- 车票服务 -->
	<view class="shadowBox">
		<view class="service_item" @click="toAnotherPage('discount')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/discount.png"></image>
			</view>
			<text>乘车优惠</text>
		</view>
		<view class="service_item" @click="toAnotherPage('serviceGuide')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/serviceGuide.png"></image>
			</view>
			<text>乘车指南</text>
		</view>
		<view class="service_item" @click="toAnotherPage('invoice')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/invoice.png"></image>
			</view>
			<text>特种票</text>
		</view>
		<view class="service_item" @click="toAnotherPage('bill')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/bill.png"></image>
			</view>
			<text>月账单</text>
		</view>
		<view class="service_item" @click="toAnotherPage('message')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/message.png"></image>
			</view>
			<text>致歉信</text>
		</view>
		<view class="service_item" @click="toAnotherPage('station')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/station.png"></image>
			</view>
			<text>车站详情</text>
		</view>
		<view class="service_item" @click="toAnotherPage('trace')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/trace.png"></image>
			</view>
			<text>线路详情</text>
		</view>
		<view class="service_item" @click="toAnotherPage('customerService')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/customerService.png"></image>
			</view>
			<text>智能客服</text>
		</view>
		<view class="service_item" @click="toAnotherPage('LostandFound')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/LostandFound.png"></image>
			</view>
			<text>失物招领</text>
		</view>
		<view class="service_item" @click="toAnotherPage('advice')">
			<view>
				<image class="service_pic" src="../../static/pictures/icon/advice.png"></image>
			</view>
			<text>意见建议</text>
		</view>
	</view>
	<!-- 左右滑动块 -->
	<view class="scroll_box"> 
	    <scroll-view scroll-x>
			<view class="scroll_item" @click="toAnotherPage('authority')">
				<view class="scroll_item1">
					<view class="scroll_text1">
						官方权威
					</view>
					<view class="scroll_icon">
						<image class="icon_pic" src="../../static/pictures/icon/authority.png"></image>
					</view>
				</view>
				<view class="scroll_text2">
					线路信息、乘车攻略
				</view>
			</view>
			<view class="scroll_item" id="middle" @click="toAnotherPage('features')">
				<view class="scroll_item1">
					<view class="scroll_text1">
						功能介绍
					</view>
					<view class="scroll_icon">
						<image class="icon_pic" src="../../static/pictures/icon/features.png"></image>
					</view>
				</view>
				<view class="scroll_text2">
					玩转E客通
				</view>
			</view>
			<view class="scroll_item" @click="toAnotherPage('artistic')">
				<view class="scroll_item1">
					<view class="scroll_text1">
						生活艺术
					</view>
					<view class="scroll_icon">
						<image class="icon_pic" src="../../static/pictures/icon/artistic.png"></image>
					</view>
				</view>
				<view class="scroll_text2">
					艺术、匠心、生活
				</view>
			</view>
	    </scroll-view>
	</view>
	<!-- 提示轮播图 -->
	<swiper class="tips" indicator-dots="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#1895b5" autoplay="true" circular="true" interval="3000" duration="1000">
		<block v-for="(item,index) in tips" :key="index">
			<swiper-item class="tips_item">
				<view class="tips_box" @click="toAnotherPage('tip ' + item.tip)">
					<image class="tips_img" :src="item.imgUrl" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</block>
	</swiper>
	<!-- 账单 -->
	<view class="bill" @click="toAnotherPage('bill')"></view>
	<!-- 地铁资讯 -->
	<view class="news_title">
		<view class="news_name">
			地铁资讯
		</view>
		<view class="news_more" @click="toAnotherPage('more')">
			查看更多>
		</view>
	</view>
	<view class="news_container" @click="toAnotherPage('news ' + index)" v-for="(item, index) in news">
		<view class="news_pic">
			<image :src="item.imgUrl" mode="" class="news_img"></image>
		</view>
		<view class="news_content">
			<view class="news_description">
				{{item.news}}
			</view>
			<view class="news_class">
				{{item.class}}
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notices: [],
				tips: [],
				news: []
			}
		},
		methods: {
			toAnotherPage(pageName) {
				console.log("[toAnotherPage] wait to complete, now to " + pageName);
			}
		},
		onLoad() {
			this.notices = [
				{
					imgUrl: "../../static/pictures/notices/1.png",
					notice: "1"
				},
				{
					imgUrl: "../../static/pictures/notices/1.png",
					notice: "2"
				},
				{
					imgUrl: "../../static/pictures/notices/1.png",
					notice: "3",
				}
			];
			this.tips = [
				{
					imgUrl: "../../static/pictures/tips/1.png",
					tip: "1"
				},
				{
					imgUrl: "../../static/pictures/tips/1.png",
					tip: "2"
				},
				{
					imgUrl: "../../static/pictures/tips/1.png",
					tip: "3"
				}
			];
			this.news = [
				{
					imgUrl: "../../static/pictures/news/1.png",
					news: "这是第一条新闻",
					class: "站务宣传"
				},
				{
					imgUrl: "../../static/pictures/news/1.png",
					news: "这是第二条新闻",
					class: "站务宣传"
				},
				{
					imgUrl: "../../static/pictures/news/1.png",
					news: "这是第三条新闻",
					class: "站务宣传"
				}
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
		height: 250rpx;
	}
	.notice_item {
		display:flex;
		justify-content: center;
	}
	.notice_box {
		width: 98%;  /* 控制两张图片的间距 */
		height: 100%;
	}
	.notice_img {
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
		padding: 15rpx;
	}
	.service_item {
		width: 20%;
		text-align: center;
		font-size: 20rpx;
	}
	.service_pic {
		width: 55rpx;
		height: 55rpx;
		margin: 10rpx;
	}
	.scroll_box {
		width: 100%;
		height: auto;
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
		display: inline-flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		box-shadow:0 10rpx 10rpx -10rpx #808080;
		padding: 20rpx;
		overflow: hidden;
	}
	.scroll_item1 {
		display: flex;
		margin: 2rpx;
	}
	.scroll_text1 {
		font-size: 35rpx;
		font-weight: bold;
		margin-right: 100rpx;
	}
	.scroll_text2 {
		font-size: 20rpx;
		color: #8F8F94;
		margin-top: 20rpx;
		margin-left: 4rpx;
	}
	.scroll_icon {
		width: 110rpx;
		height: 110rpx;
		margin: -55rpx;
		position: relative;
		left: 15rpx;
		top: 5rpx;
	}
	.icon_pic {
		width: 100%;
		height: 100%;
	}
	#middle {
		margin: 0;
	}
	.tips {
		height: 280rpx;
		margin: 20rpx;
	}
	.tips_item {
		display:flex;
		justify-content: center;
	}
	.tips_box {
		width: 100%;  /* 控制两张图片的间距 */
		height: 100%;
	}
	.tips_img {
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
		background-repeat: no-repeat;
		box-shadow:0 15rpx 15rpx -10rpx #808080;
	}
	.news_title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
	}
	.news_name {
		font-size: 35rpx;
		font-weight: bold;
		margin: 20rpx;
	}
	.news_more {
		font-size: 25rpx;
		color: #8F8F94;
		margin: 20rpx;
	}
	.news_container {
		height: auto;
		margin: 20rpx;
	}
	.news_pic {
		width: auto;
		height: 200rpx;
		box-shadow:0 10rpx 15rpx -10rpx #808080;
	}
	.news_img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10rpx;
	}
	.news_content {
		font-size: 30rpx;
		margin-top: 20rpx;
	}
	.news_class {
		width: 150rpx;
		height: 50rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
		border-radius: 25rpx;
		background-color: #ff87a5;
		color: #FFFFFF;
		font-size: 25rpx;
	}
</style>
