const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AdminModel = require('../Model/AdminDatabase')
const userModel = require('../Model/DatabaseModel')

// Login
async function AdminPanel(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const admin = await AdminModel.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin Email is Incorrect" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Password is Invalid" });

    const tokens = jwt.sign({ id: admin._id }, "ihateyou", { expiresIn: '1h' });

    res.cookie("tokens", tokens, {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,         // Prevent client-side access to cookie
      sameSite: "none",       // Required for cross-origin requests
      secure: true,           // Required for HTTPS
    });

    res.status(200).json({ message: "Successfully Logged In" });
    console.log('Token set in cookie');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


function AdminChecker(req, res) {
  try {

 
    return res.status(200).json({
      message: "Logged In"
    });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
}




async function Userdetails(req,res){
    try{
const UserDetails = await userModel.find()
if(!Userdetails) return res.status(400).json({message:"there is no any user"})
res.status(200).json({userdata:UserDetails})

    }
    catch(err){
res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = { AdminPanel, AdminChecker, AdminLogout ,Userdetails}
