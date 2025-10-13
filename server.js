const express = require('express');
const app = express();
const port = 8000;
const dotenv = require('dotenv');
const cors = require('cors');
const Router = require('./UserRoute/userRoute.js');
const AdminRouter = require('./UserRoute/adminRoute.js');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');

dotenv.config();

app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,               // Allow cookies and auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
}));

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error:', err));

app.use('/', Router);
app.use('/admin', AdminRouter);

app.get('/data', (req, res) => {
  console.log("Server working");
  res.send('Data has been received');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
