const express= require("express");
const ConnectMongoose=require("./database/ConnectMongoose");
const {seedDB}=require("./middleware/Middleware")
const app=express();
const OrderRoute=require("./routes/OrderRoute");







app.use("/api/order",OrderRoute);
seedDB();




app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
