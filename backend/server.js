const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: 'config/.env' });
const connectDB = require('./config/db')
connectDB();
const todoRoutes = require('./routes/todoRoutes');
app.use(cors());
app.use(express.json());

app.use('/api/Todos', todoRoutes);

const PORT = process.env.PORT;

app.listen(PORT ,()=> {
    console.log(`Serve is running a ${PORT} port`);
});