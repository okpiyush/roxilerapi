
const mongoose = require("mongoose");

const ConnectMongoose = mongoose.connect("mongodb://localhost:27017/roxiler").then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log(err)
})

module.exports={ConnectMongoose}