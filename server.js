const express = require('express');
const app = express();
const port = 8000;
const dotenv = require('dotenv');
const cors = require('cors');
const Router = require('./UserRoute/userRoute.js');
const AdminRouter = require('./UserRoute/adminRoute.js');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const upload = require('./middleware/Multer.js')
dotenv.config();
const contentRouter = require('./UserRoute/EditRoute.js')
// Apply CORS middleware before routes

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error:', err));
app.use(cors({
  origin: ["http://localhost:5173", "https://softech-chi.vercel.app"], // Include Vercel URL for future deployment
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());
app.use(express.json());

// Define routes after middleware
app.use('/', Router);
app.use('/admin', AdminRouter);
app.use('/content',contentRouter);
app.post('/picture',upload.single('imagestored'),(req,res)=>{
  res.status
})

app.get('/data', (req, res) => {
  console.log("Server working");
  res.send('Data has been received');
});


app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
