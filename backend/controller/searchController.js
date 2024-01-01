const searchController = async (req,res)=>{
    const { query } = req.query;

    console.log(query);
    res.json({msg:"reached"})


}
module.exports = searchController;