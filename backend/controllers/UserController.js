const axios=require("axios")
require("dotenv").config({
    path: "../config/.env"
})
const getTodayImage=async(req,res)=>{
    try {
        const data=await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API}`)
        res.status(200).json(data)
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports={getTodayImage}