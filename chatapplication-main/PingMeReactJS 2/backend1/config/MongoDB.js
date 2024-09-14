const mongoose = require('mongoose')

const connectToMongoDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    }
    catch(err){
        console.log("Error connecting to MongoDB\n");
    }
}

module.exports = {connectToMongoDB}