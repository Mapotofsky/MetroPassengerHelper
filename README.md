# MetroPassengerHelper" 

# 2.21

## chr

- 完成了车站详情页面各功能的编写

# 2.17

## chr

- 完成了线路/车站选择界面的编写

# 2.7

## chr

- 完成了"出行"页面的前端编写工作
- 给各组件增加了页面跳转的方法，但由于未编写其他页面，现仅在控制台输出。不涉及页面跳转的交互均已完成
- 存在的问题：
	* "出行"页面在网络图模式下的背景仅仅是一张图片，现不知道如何去将其转换成可以交互的地图（map组件只能自定义样式，无法做到在图片上打点）
	* 各icon可能还需要自己画一下，网上找的感觉不太令人满意
	* 本地图片超过2M，导致真机调试时不能一次性上传，可能需要进行分包（不过如果发行时不受影响的话或许不需要这么做）

# 2.3

## wt

- 完成了"我的"页面的撰写
- 完成用户授权登录操作，演示时需要重复演示需在微信开发者工具中的storage缓存处删除userinfo和authorized两个key
- 因为广告等一些资讯没有后端接口，无法获取放置于变量中，因此没有用v-for来实现而是直接用重复代码仅作展示
- 后面工作还剩下数据分析页面内容则工作基本完成

# 2.2

## chr

- 完成了E客通页面的前端编写工作
- 给各组件增加了页面跳转的方法，但由于未编写其他页面，现仅在控制台输出
- 对于一些可遍历且可能会频繁修改的元素，如滑动块中的通知、广告，以及资讯等，推荐使用v-for来实现，从而可以减少重复代码，还能在script脚本中统一修改

# 2.1

## chr

- 完成了E客通页面的部分编写工作

# 1.30

## wt

- pages.json中的改动已经标出
- manifest.json中添加微信小程序appid
- static静态资源图片的添加
- 页面导航栏标题蓝色改为白色
- 文件夹重新命名，因为中文不适用

# 1.28

## wt

- 删除二维码页面（考虑到支付宝地铁乘车功能）

## chr

- 完成的数据库的建立

# 1.27

## wt

- 上传带tabBar的uniapp框架

## chr

- 初步实现本地数据的上传，但仍有错误"
