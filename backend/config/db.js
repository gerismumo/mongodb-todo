const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log('Connected successiful');
    } catch(error) {
        console.log('Error in connecting to the database',error);
    }
}

module.exports = connectDB;