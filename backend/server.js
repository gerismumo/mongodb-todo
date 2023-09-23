const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: 'config/.env' });
const connectDB = require('./config/db')
connectDB();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT ,()=> {
    console.log(`Serve is running a ${PORT} port`);
});