// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  /* my code */
  // 选择文件
  chooseMyFile() {
    let that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        let path = res.tempFiles[0].path;
        let name = res.tempFiles[0].name;
        name = name.replace('.csv', '');
        console.log("choose file success", path, name);
        that.uploadMyFile(path, name);
      }
    })
  },

  // 上传到云存储
  uploadMyFile(path, name) {
    let that = this;
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.csv',
      filePath: path,
      success: res => {
        console.log("upload file success", res.fileID)
        that.resolve(res.fileID, name)
      },
      fail: err => {
        console.log("upload file fail", err)
      }
    })
  },

  // 使用云函数解析
  resolve(fileID, name) {
    wx.cloud.callFunction({
      name: "csv",
      data: {
        fileID: fileID,
        name: name
      },
      success(res) {
        console.log("resolve success", res)
      },
      fail(res) {
        console.log("resolve fail", res)
      }
    })
  },
  /* my code */

  data: {
    showUploadTip: false,
    powerList: [{
      title: '云函数',
      tip: '安全、免鉴权运行业务代码',
      showItem: false,
      item: [{
        title: '获取OpenId',
        page: 'getOpenId'
      },
      //  {
      //   title: '微信支付'
      // },
       {
        title: '生成小程序码',
        page: 'getMiniProgramCode'
      },
      // {
      //   title: '发送订阅消息',
      // }
    ]
    }, {
      title: '数据库',
      tip: '安全稳定的文档型数据库',
      showItem: false,
      item: [{
        title: '创建集合',
        page: 'createCollection'
      }, {
        title: '更新记录',
        page: 'updateRecord'
      }, {
        title: '查询记录',
        page: 'selectRecord'
      }, {
        title: '聚合操作',
        page: 'sumRecord'
      }]
    }, {
      title: '云存储',
      tip: '自带CDN加速文件存储',
      showItem: false,
      item: [{
        title: '上传文件',
        page: 'uploadFile'
      }]
    }, {
      title: '云托管',
      tip: '不限语言的全托管容器服务',
      showItem: false,
      item: [{
        title: '部署服务',
        page: 'deployService'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  }
});
