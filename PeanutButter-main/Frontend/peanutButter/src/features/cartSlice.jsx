import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';


const initialState={
    cart:[],
    loading:false,
    error:''
};
export var fetchCartData=createAsyncThunk('cart/fetchCartData',async(userId)=>{
    return await axios.get(`http://localhost:8000/cart/${userId}`).then((success)=>{
        return success.data.cart
    })
})
const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        Addtocart:(state,action)=>{
            const cartproduct=action.payload
            const obj=state.cart.find(e=>e.product.id==cartproduct.product.id)
            if(obj){
                obj.quantity++
            }
            else{
                state.cart.push(cartproduct)
            }
        },
        clearCart:(state,action)=>{
                state.cart=[];
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCartData.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(fetchCartData.fulfilled,(state,action)=>{
            state.cart=action.payload
        })
        builder.addCase(fetchCartData.rejected,(state,action)=>{
            state.cart=action.payload
        })
    }
})
export default cartSlice;