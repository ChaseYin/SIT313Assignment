const validator = require('validator')
var express = require('express');
var router = express.Router();
var User = require("../models/User");

var crypto = require('crypto');





var responseData;
router.use(function(req,res,next){
    responseData = {
        code:0,
        message:''
    }
    next();
})

router.post('/user/register',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var email = req.body.email;
    var country = req.body.country;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var tel = req.body.tel;
    var zip_postal_code = req.body.zip_postal_code;
    var region = req.body.region;
    var city = req.body.city;
    var adress = req.body.address;


    var md5 = crypto.createHash("md5");
    var hashPassword = md5.update(password).digest("hex");


    // 用户是否为空
    if(username == ''){
        responseData.code = 1;
        responseData.message = 'Username cannot be empty';
        res.json(responseData);
        return;
    }
    if(password == ''){
        responseData.code = 2;
        responseData.message = 'password cannot be empty';
        res.json(responseData);
        return;
    }
    if(password != repassword){
        responseData.code = 3;
        responseData.message = 'Password input not same';
        res.json(responseData);
        return;
    }
    if(!validator.isEmail(email))
    {
        responseData.code = 4;
        responseData.message = 'Wrong email format(test by validator)';
        res.json(responseData);
        return;
    }
    if(!validator.isEmail(username))
    {
        responseData.code = 4;
        responseData.message = 'Wrong email format(test by validator)';
        res.json(responseData);
        return;
    }//make email as username
    // 判断数据库中是否有用户名
    User.findOne({
        username:username
    }).then((userInfo)=>{
        if(userInfo){
            responseData.code = 4;
            responseData.message = 'Username has already exists';
            res.json(responseData);
            return;
        }else{
            var user = new User({
                username:username,
                password:hashPassword,
                email:email,
                country:country,
                first_name:first_name,
                last_name:last_name,
                tel:tel,
                zip_postal_code:zip_postal_code,
                address:adress,
                city:city,
                region:region
            });
            return user.save();
        }
    }).then((newUserInfo) => [ 
        responseData.message = 'Register successfully',
        res.json(responseData)
    ]);
});

router.post('/user/login',function(req,res,next){

    var username = req.body.username;
    var password  = req.body.password;


    var md5 = crypto.createHash("md5");
    var hashPassword = md5.update(password).digest("hex");

    if(username == '' || password == ''){
        responseData.code = 1;
        responseData.message = 'Username or password cannot be empty';
        res.json(responseData);
        return;
    }
    User.find({
        username:username,
        password:hashPassword
    }).then((userInfo)=>{
        if(!userInfo[0]){
            responseData.code = 2;
            responseData.message = 'Wrong Username or Password';
            res.json(responseData);
            return;
        }
        responseData.message = 'Register Successfully!';
        responseData.userInfo = {
            _id:userInfo[0]._id,
            username:userInfo[0].username
        };
        req.cookies.set('userInfo',JSON.stringify({
            _id:userInfo[0]._id,
            username:userInfo[0].username
        }));
        res.json(responseData);
    })
})
// 退出
router.get('/user/logout',function(req,res,next){
    req.cookies.set('userInfo',null);
    res.json(responseData);
})
module.exports = router;