const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AdminModel = require('../Model/AdminDatabase')
const userModel = require('../Model/DatabaseModel')

// Login
async function AdminPanel(req, res) {
    const { username, password } = req.body
    console.log(req.body)
    try {
        const admin = await AdminModel.findOne({ username })
        if (!admin) return res.status(400).json({ message: "Admin Email is Incorrect" })

        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) return res.status(400).json({ message: "Password is Invalid" })

        const tokens = jwt.sign({ id: admin._id }, "ihateyou", { expiresIn: '1h' })

        
        res.cookie("tokens", tokens, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            secure: false 
        })

        res.status(200).json({ message: "Successfully LoggedIn" })
        console.log('i got the data')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


function AdminChecker(req, res) {
  try {
    const token = req.cookies.tokens;
    if (!token) return res.status(401).json({ message: "No Token Found" });

    const decoded = jwt.verify(token, "ihateyou");
    return res.status(200).json({
      message: "Logged In",
      adminId: decoded.id,
      token,
    });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
}


function AdminLogout(req, res) {
 
    try{

        res.clearCookie('tokens', { httpOnly: true, sameSite: 'lax' })
        res.status(200).json({ message: "Logged Out Successfully" })
    }
    catch(err){

    }
}


async function Userdetails(req,res){
    try{
const UserDetails = await userModel.find()
if(!Userdetails) return res.status(400).json({message:"there is no any user"})
res.status(200).json({userdata:UserDetails})

    }
    catch(err){

    }
}

module.exports = { AdminPanel, AdminChecker, AdminLogout ,Userdetails}
