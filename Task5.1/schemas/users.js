var mongoose = require('mongoose');
const validator = require('validator');


var Schema = mongoose.Schema;
module.exports =  new Schema({
    country: String,
    first_name: String,
    last_name: String,
    username:{
        type:String,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('The email is not valid! Tested by validator!')
            }
        }
    }, 
    password:String,
    email: {
        type:String,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('The email is not valid! Tested by validator!')
            }
        }
    },    
    city: String,
    region: String,
    address: String,
    zip_postal_code: String,
    tel: String,
    isAdmin:{
        type:Boolean,
        default:false
    }
});
