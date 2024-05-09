const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const mongoose = require('mongoose')
const order = require('./routes/order');

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
const DATABASE_NAME = process.env.DATABASE_NAME;


app.use(cors({
    origin: "http://localhost:4200",
}));

// Serve static files from the 'upload' folder
app.use('/uploads', express.static('./uploads'));


app.use(express.json());
app.use('/auth', authRoutes);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/category',categoryRouter);
app.use('/order',order);
//error handling middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error !";
  
    return res.status(statusCode).send({
      success: false,
      statusCode,
      message,
    });
});

mongoose.connect(MONGODB_URI+DATABASE_NAME).then(()=> {
    console.log('connected to the database')
    app.listen(PORT,()=>{
        console.log('server is running on port 3001')
    })
}).catch(err =>{
    console.log('error connecting to database : ', err.message)
})


