<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class="header">
					<image src="../../../static/logo.png"></image>
				</view>
				<view class="content">
					<view>申请获取以下权限</view>
					<text>获得你的公开信息（昵称、头像、地区等）</text>
				</view>
				<button class="button" type="default" @tap="UserLogin">
					登录授权
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCanUse: true,
			}
		},
		methods: {
			UserLogin() {
				uni.getUserProfile({
				    desc:'用户登录',
				    success:(res)=>{
						uni.showLoading({
							title: "登陆中..."
						})
						setTimeout(function() {
							uni.hideLoading();
							uni.navigateBack({
								delta: 2,
							})
							uni.setStorageSync("userinfo", res.userInfo)
							uni.setStorageSync("authorized", true)
						},4000)
					},
					fail:(err)=>{
					     console.log(err);
				    },
				})
			},
		}
	}
</script>

<style>
	.header{
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}
	.header image {
	    width: 220rpx;
	    height: 220rpx;
	}
	.content {
	    margin-left: 50rpx;
	    margin-bottom: 90rpx;
	}
	.content text {
	    display: block;
	    color: #9d9d9d;
	    margin-top: 40rpx;
	}
	
	.button {
	    margin: 70rpx 50rpx;
	    font-size: 35rpx;
	}
</style>
