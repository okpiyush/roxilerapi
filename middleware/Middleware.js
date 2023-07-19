//seed the data if data is not available in db

const axios =require("axios");
const Order=require("../model/Order");

const seedDB=async()=>{    
    const Orders=await Order.countDocuments({});
    if(Orders===0){
       const wow= await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
       console.log(wow.data);
       const result= Order.insertMany(wow.data);
       console.log(`Seeding Completed with documents`);        
    }else{
        console.log("Data already populated to work with");
    }
}
module.exports={seedDB};