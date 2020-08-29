var express = require('express');
var router = express.Router();
var Category = require('../models/Category');

router.get('/',function(req,res,next){
    // 读取所有的分类信息
    Category.find().sort({_id:-1}).then((categories)=>{
        console.log(categories);
        res.render('main/index',{
            userInfo:req.userInfo,
            categories:categories
        })
    })
})

router.get('/about',function(req,res,next){
    res.render('main/about',{});
    console.log('收获请求');
});
module.exports = router;