const express=require('express')
const app=express()
const mongoose=require('mongoose')
const userRoute=require('./Route/UserRoute')
const productRoute=require('./Route/ProductRoute')
const paymentRoute=require('./Route/PaymentRoute')
require('dotenv').config()
const PORT=process.env.PORT
const URL=process.env.URL
app.use(express.json())
const cors=require('cors')
app.use(cors())
app.listen(PORT,()=>{
    console.log(`Server Is Running On Port = ${PORT}`)
})
mongoose.connect(URL).then(()=>{
    console.log("Mongo DB Is Connected")
}).catch((err)=>{
    console.log(err)
})
app.use(userRoute)
app.use(productRoute)
app.use(paymentRoute)
   

