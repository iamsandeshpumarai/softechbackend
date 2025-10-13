const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    CompanyName:{
        type:String,
        required:true
    },
    BusinessEmail:{
        type:String,
        required:true
    },
    Jobtitle:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    Country:{
        type:String,
    }
},{
    timestamps:true
}
)

const userModel = mongoose.model('user',userSchema)

module.exports = userModel