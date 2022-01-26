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
                // data.push({
                //     area: rowData[0],
                //     age: rowData[1],
                //     populationAge: rowData[2],
                //     populationArea: rowData[3]
                // })

                // peaks.csv
                // data.push({
                //     station: rowData[0],
                //     date: rowData[1],
                //     morning_peak_in: rowData[2],
                //     morning_peak_out: rowData[3],
                //     morning_peak_sum: rowData[4],
                //     evening_peak_in: rowData[5],
                //     evening_peak_out: rowData[6],
                //     evening_peak_sum: rowData[7],
                //     morning_color: rowData[8],
                //     evening_color: rowData[9]
                // })

                // station_month.csv
                // data.push({
                //     station: rowData[0],
                //     date: rowData[1],
                //     inflow: rowData[2],
                //     outflow: rowData[3],
                //     sumflow: rowData[4],
                //     refer: rowData[5],
                //     state: rowData[6],
                //     line: rowData[7],
                //     line_in: rowData[8],
                //     line_out: rowData[9],
                //     line_sum: rowData[10]
                // })

                // station_week.csv
                // data.push({
                //     station: rowData[0],
                //     weeknum: rowData[1],
                //     everyday: rowData[2],
                //     weekdayAVG: rowData[3],
                //     Satday: rowData[4],
                //     Sunday: rowData[5],
                //     week_growth: rowData[6]
                // })

                // DM*
                // data.push({
                //     station: rowData[0],
                //     line: rowData[1],
                //     seq: rowData[2],
                //     time: rowData[3],
                //     upstream: rowData[4],
                //     downstream: rowData[5]
                // })

                // fore_aug.csv
                // data.push({
                //     station: rowData[0],
                //     line: rowData[1],
                //     date: rowData[2],
                //     inflow: rowData[3],
                //     outflow: rowData[4],
                //     sumflow: rowData[5],
                //     line_in: rowData[6],
                //     line_out: rowData[7],
                //     line_sum: rowData[8]
                // })

                // fore_lines*
                // data.push({
                //     date: rowData[0],
                //     inflow: rowData[1],
                //     outflow: rowData[2],
                //     sumflow: rowData[3],
                //     line: rowData[4]
                // })

                // fore_sta*
                // data.push({
                //     station: rowData[0],
                //     line: rowData[1],
                //     date: rowData[2],
                //     inflow: rowData[3],
                //     outflow: rowData[4],
                //     sumflow: rowData[5]
                // })

                // station*
                // data.push({
                //     datetime: rowData[0],
                //     date: rowData[1],
                //     time: rowData[2],
                //     inflow: rowData[3],
                //     outflow: rowData[4],
                //     sumflow: rowData[5],
                //     weekday: rowData[6],
                //     week: rowData[7],
                //     line: rowData[8],
                //     line_in: rowData[9],
                //     line_out: rowData[10],
                //     line_sum: rowData[11]
                // })

                // OD*
                var dic = {station: rowData[0]};
                for(var i = 0; i<= 167; ++i) {
                    dic[i] = rowData[i + 1];
                }
                data.push(dic);

                // 全部数据直接上传可能会报错
                // 估计是单次传输大小有限制
                count += 1;
                if(count >= 3000 || rowID >= sheet['data'].length - 1) {
                    const promise = db.collection(name).add({data:data});
                    tasks.push(promise);
                    count = 0;
                    data = [];
                }
            }
        }
    });

    // 需要保证是异步操作，不然可能没法传数据
    let result = await Promise.all(tasks).then(res => {
        return 0
      }).catch(err => {
          return err})
    return 0;
}