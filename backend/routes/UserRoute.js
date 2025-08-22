const {getTodayImage}=require("../controllers/UserController")
const express=require('express');
const router=express.Router();
router.get('/today-image', getTodayImage)