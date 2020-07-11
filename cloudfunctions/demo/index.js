'use strict';
let option1 = {
    page: 1,
    count: 10,
    type: "text"
}
let option2 = {
    page: 1,
    count: 10,
    type: "image"
}
let option3 = {
    page: 1,
    count: 10,
    type: "video"
}
let axios = require("axios")
let httpurl = "https://api.apiopen.top/getJoke"

exports.main = async (event, context,callback) => {
    console.log("调用了云函数");
    
    let result =  await axios.get(httpurl,{params:event})
    console.log(event);
    return result.data
};
