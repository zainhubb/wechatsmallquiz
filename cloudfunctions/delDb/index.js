// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
     console.log("进入删除");
    let db = cloud.database()
    let command = db.command
    await db.collection("quizRange").where({
        score:command.eq(0)
    }).remove()
}