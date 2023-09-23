const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db')
connectDB();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT ,()=> {
    console.log(`Serve is running a ${PORT} port`);
});