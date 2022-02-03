<template>
	<view>
		<image class="bg-pic" src="../../static/pictures/bg_pic/myself_bg.jpg"></image>
		<view style="display: flex;">
			<image class="login-pic" :src="`${imgurl}`"></image>
			<image class="setting" src="../../static/pictures/icon/setting.png"></image>
			<text class="nickname" @click="authorize" v-if="!ifAuthorized">{{nickname}}</text>
			<text class="nickname" v-if="ifAuthorized">{{nickname}}</text>
		</view>
		<view class="float">
			<view class="float-bg">
				<view class="click-box">
					<image class="icon-left" src="../../static/pictures/icon/钱包.png"></image>
					<view style="align-items: center; font-size: 30rpx;">卡券包</view>
					<image class="icon-right" src="../../static/pictures/icon/箭头.png"></image>
				</view>
				<view class="click-box">
					<image class="icon-left" src="../../static/pictures/icon/_收藏.png"></image>
					<view style="align-items: center; font-size: 30rpx;">我的收藏</view>
					<image class="icon-right" src="../../static/pictures/icon/箭头.png"></image>
				</view>
				<view class="click-box">
					<image class="icon-left" src="../../static/pictures/icon/闹钟.png"></image>
					<view style="align-items: center; font-size: 30rpx;">出行提醒</view>
					<image class="icon-right" src="../../static/pictures/icon/箭头.png"></image>
				</view>
				<view class="click-box">
					<image class="icon-left" src="../../static/pictures/icon/客服.png"></image>
					<view style="align-items: center; font-size: 30rpx;">智能客服</view>
					<image class="icon-right" src="../../static/pictures/icon/箭头.png"></image>
				</view>
				<view class="click-box">
					<image class="icon-left" src="../../static/pictures/icon/home-active.png"></image>
					<view style="align-items: center; font-size: 30rpx;">关于e客通</view>
					<image class="icon-right" src="../../static/pictures/icon/箭头.png"></image>
				</view>
				<view class="click-box">
					<image class="icon-left" src="../../static/pictures/icon/信息.png"></image>
					<view style="align-items: center; font-size: 30rpx;">意见建议</view>
					<image class="icon-right" src="../../static/pictures/icon/箭头.png"></image>
				</view>
				<view class="click-box">
					<image class="icon-left" src="../../static/pictures/icon/数据统计.png"></image>
					<view style="align-items: center; font-size: 30rpx;">数据分析</view>
					<image class="icon-right" src="../../static/pictures/icon/箭头.png"  @click="DataAnalyze"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: "点击登录",
				imgurl: "/static/pictures/icon/login.png",
				ifAuthorized: false
			}
		},
		methods: {
			authorize() {
				uni.navigateTo({
					url: "../myself/authorize/authorize"
				})
			},
			DataAnalyze() {
				uni.navigateTo({
					url: "../myself/data_analyze/data_analyze"
				})
			}
		},
		onShow() {
			console.log(this.ifAuthorized)
			if(!this.ifAuthorized)
			{
				let userinfo = uni.getStorageSync("userinfo");
				if (userinfo)
				{
					this.nickname = userinfo.nickName;
					this.imgurl = userinfo.avatarUrl
					this.ifAuthorized = uni.getStorageSync("authorized")
				}
			}
		},
	}
</script>

<style>
	.bg-pic{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		/* z-index: -1; */
	}
	.login-pic{
		height: 150rpx;
		width: 150rpx;
		margin-top: 15%;
		border-radius: 50%;
		position: absolute;
		left: 50rpx;
	}
	.nickname{
		font-size: 36rpx;
		color: #FFFFFF;
		margin-top: 21%;
		position: absolute;
		left: 210rpx;
	}
	.setting{
		height: 50rpx;
		width: 50rpx;
		margin-top: 30%;
		position: absolute;
		right: 20rpx;
	}
	.float{
		position: absolute;
		margin-top: 45%;
	}
	.float-bg{
		background-color: #ffffff;
		border-radius: 3%;
		height: 1000rpx;
		width: 650rpx;
		box-shadow: 0 0 20px #CCC;
		margin-left: 50rpx;
	}
	.click-box{
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 5rpx dotted #dedede;
	}
	.icon-left{
		height: 70rpx;
		width: 70rpx;
		margin-left: 5%;
		margin-right: 5%;
	}
	.icon-right{
		height: 40rpx;
		width: 40rpx;
		position: absolute;
		right: 30rpx;
	}
</style>
