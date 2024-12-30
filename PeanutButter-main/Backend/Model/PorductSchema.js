const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    id:{
       type:String,
       required:true
    },
    title:{
        type:String,
        required:true
    },
    disc:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }
})
const ProductModel=mongoose.model('Products',ProductSchema)
module.exports=ProductModel