<template>
	<view>
		<!--------------------------------------- 发现页轮播图 ------------------------------------------>
		<swiper class="movies" indicator-dots="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#1895b5" autoplay="true" circular="true">
			<swiper-item>
				<image src="../../static/pictures/movies/1.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/2.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/3.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/4.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/5.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/6.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/7.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/8.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/9.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/10.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/pictures/movies/11.jpg"></image>
			</swiper-item>
		</swiper>
		<!------------------------------------------- 间隔 ---------------------------------------------->
		<view class="gap"></view>
		<!----------------------------------------- 导航区域 -------------------------------------------->
		<view class="nav">
			<view class="nav-item">
				<view>
					<image class="nav-pic" src="../../static/pictures/icon/movie.png"></image>
				</view>
				<text>影视</text>
			</view>
			<view class="nav-item">
				<view>
					<image class="nav-pic" src="../../static/pictures/icon/food.png"></image>
				</view>
				<text>美食</text>
			</view>
			<view class="nav-item">
				<view>
					<image class="nav-pic" src="../../static/pictures/icon/store.png"></image>
				</view>
				<text>探店</text>
			</view>
			<view class="nav-item">
				<view>
					<image class="nav-pic" src="../../static/pictures/icon/scene.png"></image>
				</view>
				<text>景点</text>
			</view>
		</view>
		<!------------------------------------------- 间隔 ---------------------------------------------->
		<view class="gap"></view>
		<view class="nav">
			<view class="nav-item">
				<view>
					<image class="nav-pic" src="../../static/pictures/icon/fire.png"></image>
				</view>
				<text>精选</text>
			</view>
			<view class="nav-item">
				<view>
					<image class="nav-pic" src="../../static/pictures/icon/like.png"></image>
				</view>
				<text>收藏</text>
			</view>
		</view>
		<!------------------------------------------- 间隔 ---------------------------------------------->
		<view class="gap"></view>
		<!------------------------------------------- 左右滑块 ---------------------------------------------->
		<view class="scroll-description">精 选</view>
		<scroll-view class="scroll" scroll-x="true">
			<block>
				<image class="scroll_pic" src="../../static/pictures/ads/rio.jpg"></image>
				<image class="scroll_pic" src="../../static/pictures/ads/knife.jpg"></image>
				<image class="scroll_pic" src="../../static/pictures/ads/coke.jpg"></image>
				<image class="scroll_pic" src="../../static/pictures/ads/mihotel.jpg"></image>
				<image class="scroll_pic" src="../../static/pictures/ads/duck.jpg"></image>
			</block>
		</scroll-view>
		<!------------------------------------------- 间隔 ---------------------------------------------->
		<view class="gap"></view>
		<!------------------------------------------- 上下滑动块 ---------------------------------------------->
		<view>
			<view class="block-description">Chromax</view>
			<view class="pic-limit">
				<image class="block-pic" src="../../static/pictures/ads/chromax.jpg"></image>
			</view>
		</view>
		<view>
			<view class="block-description">探店日记</view>
			<view class="pic-limit">
				<image class="block-pic" src="../../static/pictures/ads/store_diary.jpg"></image>
			</view>
		</view>
		<view>
			<view class="block-description">杭州探店 · 来顿蜀大侠</view>
			<view class="pic-limit">
				<image class="block-pic" src="../../static/pictures/ads/master_shu.jpg"></image>
			</view>
		</view>
		<view>
			<view class="block-description">最美是杭州</view>
			<view class="pic-limit">
				<image class="block-pic" src="../../static/pictures/ads/hangzhou.jpg"></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.movies{
		width: 750rpx;
		height: 1000rpx;
		image{
			height: 100%;
			width: 100%;
		}
	}
	.gap{
		height: 50rpx;
	}
	.nav{
		display: flex
	}
	.nav-item{
		width: 25%;
		text-align: center;
		font-size: 30rpx;
	}
	.nav-pic{
		width: 75rpx;
		height: 75rpx;
	}
	.block-description{
		font-size: 40rpx;
		padding-left: 4%;
		padding-bottom: 10rpx;
	}
	.pic-limit{
		padding-left: 3%;
		padding-right: 3%;
		padding-bottom: 4%;
	}
	.block-pic{
		height: 350rpx;
		width: 100%;
		border-radius: 20upx;
	}
	.scroll{
		white-space: nowrap;
		::-webkit-scrollbar {
				width: 0;
				height: 0;
				background-color: transparent;
			} 
	}
	.scroll_pic{
		height: 200rpx;
		width: 200rpx;
		border-radius: 50%;
		margin-left: 4%;
		margin-right: 4%;
	}
	.scroll-description{
		font-size: 50rpx;
		padding-bottom: 10rpx;
		padding-left: 4%;
		font-weight: 700;
	}
</style>
