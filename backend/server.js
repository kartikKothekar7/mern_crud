const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv').config()
const connectDb=require('./config/db')
const noteRoutes=require('./routes/noteRoutes')

const app=express();
const PORT=process.env.PORT || 5000

connectDb();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/notes',noteRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});