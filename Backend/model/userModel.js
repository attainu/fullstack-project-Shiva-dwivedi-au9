const mongoose = require('mongoose');
var Validator = require('validator')
let UserSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        validate(value){
            if(Validator.isEmpty(value)){
                throw new Error ("Please Provide name")
            }
        }
    },
    username : {
        type:String,
        unique : true
    },
    email :{
        type:String,
        required: true,
        validate(value){
            if(!Validator.isEmail(value)){
                throw new Error ("Invalid Email")
            }
        }
    },
    department : String,
    contactnumber :{
        type:Number,
        validate(value1) {
            if(value1 < 10){
                throw new Error ("Provided Mobile Number is not valid")
            }
        },
        required:true,
    },
    gender : String,

    joining_Date:{
        type:Date,
        default:Date.now
    },

    Employee_added_by:{
        type:String,
        default:"HR"
    },

    password : String,
    role : String,
    isActive : Boolean, 
    attendance:[
        
    ],
    leave:[
    ],
    tasks:[
       
    ]
})

mongoose.model('users', UserSchema)
module.exports = mongoose.model('users')