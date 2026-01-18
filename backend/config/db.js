const mongoose=require('mongoose')

const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    }
    catch(error)
    {
        console.error("Failed to connect :",error.message)
        process.exit(1);
    }
}

module.exports=connectDb;