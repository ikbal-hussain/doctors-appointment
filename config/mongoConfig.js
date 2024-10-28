// config/mongoConfig.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = mongoConfig;
