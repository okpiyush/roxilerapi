const router=require("express").Router();
const axios=require("axios");
const {getStats,getBarStat,getPieStat}=require("../controllers/OrderController")
router.get("/stats/:month",getStats);

router.get("/bar/:month",getBarStat);
router.get("/pie",getPieStat);

router.get("/all/:month",async (req,res)=>{
    const {month}=req.params;
    const monthlystats=await axios.get(`http://localhost:5000/api/order/stats/${month}`);
    const barchart=await axios.get(`http://localhost:5000/api/order/bar/${month}`);
    const piechart=await axios.get(`http://localhost:5000/api/order/pie`);
    res.json({"stats":monthlystats.data,"barchart":barchart.data,"piechart":piechart.data});
})
module.exports=router;