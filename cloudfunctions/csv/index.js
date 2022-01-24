// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var xlsx = require('node-xlsx');
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    console.log("start reloving");
    let {
        fileID,
        name
    } = event;

    // 下载云存储中的文件
    const res = await cloud.downloadFile({
      fileID: fileID
    })
    const buffer = res.fileContent;

    // 创建集合
    await db.createCollection(name);
    
    var count = 0;
    const tasks = [];
    var data = [];
    // 解析文件数据
    var sheets = xlsx.parse(buffer);
    sheets.forEach(function(sheet) {
        console.log(sheet['name']);
        for(var rowID in sheet['data']) {
            var rowData = sheet['data'][rowID];
            if(rowID > 0 && rowID) {
                // age_census.csv
                data.push({
                    area: rowData[0],
                    age: rowData[1],
                    populationAge: rowData[2],
                    populationArea: rowData[3]
                })

                count += 1;
                if(count >= 3000) {
                    const promise = db.collection(name).add({data:data});
                    tasks.push(promise);
                    count = 0;
                    data = [];
                }
            }
        }
    });

    let result = await Promise.all(tasks).then(res => {
        return 0
      }).catch(err => {
          return err})
    return 0;
}