const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const protectedRoute = require('./routes/protectedRoute');

app.use(express.json());
const mongoose = require('mongoose')
const dotenv = require( 'dotenv');
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001

mongoose.connect(MONGODB_URI).then(()=> {
    console.log('connected to the database')
    app.listen(PORT,()=>{
        console.log('server is running on port 3001')
    })
}).catch(err =>{
    console.log('error connecting to database : ', err.message)
})

app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);