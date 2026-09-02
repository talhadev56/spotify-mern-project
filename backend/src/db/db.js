const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected suceesfully");
    }
    catch(error){
        console.error('database connection error:',error);
    }
}

module.exports = connectDB;

