const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;


const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
        console.log("connected to mongoo");
    }

module.exports = connectToMongo