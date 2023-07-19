const Order=require("../model/Order");




//monthly stats of sold unsold
const getStats=async (req,res)=>{
    const {month}=req.params;
    try{
        const sold=await Order.countDocuments(
            {
                sold:true,
                //expression //Equation //WhatDid we Search // Where did we search //value fo the search
                "$expr": { "$eq": [{ "$month": "$dateOfSale" }, month] }
            }
        )
        const unsold=await Order.countDocuments(
            {
                sold:false,
                //expression //Equation //WhatDid we Search // Where did we search //value fo the search
                "$expr": { "$eq": [{ "$month": "$dateOfSale" }, month] }
            }
        )
        res.status(200).json({"sold":sold,"unsold":unsold});
    }catch(err){
       console.log(err);
    }
    return;
}

//get barchart data
const getBarStat = async (req, res) => {
  const { month } = req.params;
  try {
    const sold = await Order.aggregate([
      {
        $match: {
          sold: true,
          $where: function () {
            return new Date(this.dateOfSale).getMonth() === parseInt(month) - 1;
          }
        }
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $and: [{ $gte: ["$price", 0] }, { $lt: ["$price", 100] }] }, then: "0-100" },
                { case: { $and: [{ $gte: ["$price", 100] }, { $lt: ["$price", 200] }] }, then: "100-200" },
                { case: { $and: [{ $gte: ["$price", 200] }, { $lt: ["$price", 300] }] }, then: "200-300" },
                { case: { $and: [{ $gte: ["$price", 300] }, { $lt: ["$price", 400] }] }, then: "300-400" },
                { case: { $and: [{ $gte: ["$price", 400] }, { $lt: ["$price", 500] }] }, then: "400-500" },
                { case: { $and: [{ $gte: ["$price", 500] }, { $lt: ["$price", 600] }] }, then: "500-600" },
                { case: { $and: [{ $gte: ["$price", 600] }, { $lt: ["$price", 700] }] }, then: "600-700" },
                { case: { $and: [{ $gte: ["$price", 700] }, { $lt: ["$price", 800] }] }, then: "700-800" },
                { case: { $and: [{ $gte: ["$price", 800] }, { $lt: ["$price", 900] }] }, then: "800-900" },
                { case: { $and: [{ $gte: ["$price", 900] }, { $lt: ["$price", 1000] }] }, then: "900-1000" },
                { case: { $gte: ["$price", 1000] }, then: "1000+" }
              ],
              default: "Unknown"
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({ "sold": sold });
  } catch (err) {
    console.log(err);
  }
};

//Piechart 
const getPieStat=async (req,res)=>{
  try{
    const ratio = await Order.aggregate([
      {
        $group: {
          _id: '$category', // Group by the 'categories' field
          count: { $sum: 1 }, // Count the occurrences of each category
        },
      },
    ]);
    res.send(ratio);
  }catch(err){
    console.log(err);
  }
}

module.exports={getStats,getBarStat,getPieStat};