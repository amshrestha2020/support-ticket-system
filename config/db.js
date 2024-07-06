const mongoose = require('mongoose');



const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://asher0096:gOvfSZIscwiJLGIZ@cluster0.qf5qbes.mongodb.net/');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Exit process with failure
      }
    };
    
    module.exports = connectDB;
