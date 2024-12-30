const express=require('express');
const ProductModel = require('../Model/PorductSchema');
const UserModel = require('../Model/UserSchema');
const router=express.Router();
router.post('/',async(req,res)=>{
    try {
        const Product=req.body
    const response=await ProductModel(Product);
    const success=await response.save()
    if(success){
        res.status(200).json({msg:"product Added Successfully"})
    }
    } catch (error) {
        console.log(error)
    }
})
router.get('/',async (req,res)=>{
    try {
        const data=await ProductModel.find();
    if(data){
        res.status(200).json(data)
    }
    } catch (error) {
        console.log(error)
    }
})
router.put("/:id",async(req,res)=>{
    try {
    const productId=req.params.id
    const response=await ProductModel.findById(productId)
    const id=req.body.userId
    const user=await UserModel.findById(id)
    const duplicate=user.cart.find(e=>e.product==productId)
    if(duplicate){
        res.json({msg:"already added"})
    }
    else{
        user.cart.push({
            product: response._id,  // Store the ObjectId of the product
            quantity: 1
        })
    await user.save();
    res.json({msg:"added to cart"})
    }
    } catch (error) {
        console.log(error)
    }
})
router.get("/cart/:id",async (req,res)=>{
    try {
    const userId=req.params.id
    const response = await UserModel.findById(userId).populate({
        path:"cart.product"
    })
    res.json(response)
    } catch (error) {
        console.log(error)
    }
})
router.put('/incquantity/:id',async(req,res)=>{
   try {
    const productId=req.params.id;
    const userId=req.body.userId
    const user=await UserModel.findById(userId)
    const cartItem=user.cart.find(e=>e.product.toString()===productId)
    cartItem.quantity+=1;
    const response=await user.save();
    res.json(response)
   } catch (error) {
    console.log(error)
   }
})
router.put('/decquantity/:id',async(req,res)=>{
    try {
        const productId=req.params.id;
    const userId=req.body.userId
    const userData=await UserModel.findById(userId)
    const cartproduct=userData.cart.find(e=>e.product.toString()===productId)
    const index=userData.cart.find(e=>e.product.toString()===productId)
    if(cartproduct.quantity>1)
    {
        cartproduct.quantity--;
    }
    else{
        userData.cart.splice(index,1)
    }
    const response=await userData.save();
    res.json(response)
    res.json()
    } catch (error) {
        console.log(error)
    }
})
router.put('/removecart/:id',async(req,res)=>{
   try {
    const productId=req.params.id;
    const userId=req.body.userId
    const userData=await UserModel.findById(userId)
    const index=userData.cart.find(e=>e.product.toString()===productId)
    userData.cart.splice(index,1)
    const response=await userData.save();
    res.json(response)
   } catch (error) {
    console.log(error)
   }
})
module.exports=router;