const userModel = require("../Model/DatabaseModel.js")


const userData = async (req,res)=>{
    console.log(req.body)
    const {Country,CompanyName,BusinessEmail,Jobtitle,PhoneNumber,FirstName,LastName} = req.body
    try{
    const existingEmail = await userModel.findOne({BusinessEmail})
    if(existingEmail){
        return res.status(400).json({message:"BusinessEmail Already Existed"})
    }
    const existingPhoneNumber = await userModel.findOne({PhoneNumber})
if(existingPhoneNumber) return res.status(400).json({message:"Phone Number Existed"})

    const UserData = await userModel.create({LastName,FirstName,CompanyName,BusinessEmail,Jobtitle,PhoneNumber,Country})
res.status(200).json({message:"Your Form Have Been Submitted"})
console.log(UserData)

    }


    catch(err){
res.status(500).json({message:err.message || "Internal Server Error"})
    }
}


const deleteUser=async(req,res)=>{
    const id = req.params.id
    console.log(id)

try{
const User = await userModel.findById(id)
if(!User) return res.status(400).json({message:"There is no any user with this name"})
    const userDelete = await userModel.findByIdAndDelete(id)
res.status(200).json({message:"User Got Deleted",data:userDelete})
}
catch(err){
    console.log(err)
res.status(500).json({message:"Internal Server Error"})

}
}

module.exports = {userData,deleteUser}