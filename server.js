const express = require('express')
const app = express()
const port = 8000
const dotenv = require('dotenv')
const cors = require('cors')
const Router = require('./UserRoute/userRoute.js')
const AdminRouter = require('./UserRoute/adminRoute.js')
const cookieparser = require('cookie-parser')
const { default: mongoose } = require('mongoose')
app.use(cors({
  origin: "http://localhost:5173", // ✅ your frontend URL
  credentials: true,               // ✅ allow cookies & auth headers
}));
app.use(cookieparser())
app.use(express.json())
dotenv.config()
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log('data connected')}).catch((err)=>{console.log(err)})


app.use('/',Router)
app.use('/admin',AdminRouter)
app.get('/data',(req,res)=>{
    console.log("server working ")
res.send('data have been got')
})


app.listen(port,()=>{
    console.log('app is running in the port',port)
})