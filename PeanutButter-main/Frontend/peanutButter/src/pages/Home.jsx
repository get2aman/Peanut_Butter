import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux'
import cartSlice, { fetchCartData } from "../features/cartSlice";
import axios from 'axios'
import Navbar from "../components/navbar";
const Home = () => {
  const userId=window.localStorage.getItem("userId");

  //////
    let[data,setdata]=useState()
   
    

    const getData=async()=>{
        const response=await axios.get('http://localhost:8000')
        setdata(response.data)
    }
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        const Auth=localStorage.getItem("token")
        if(!Auth){
            navigate('/login')
        }
        dispatch(fetchCartData(userId))
        getData()
    },[])
  const handleAddToCart = async (card)=>{
    const response=await axios.put(`http://localhost:8000/${card._id}`,{userId})
    dispatch(cartSlice.actions.Addtocart({product:card,quantity:1}))
    toast(`${card.title} ${response.data.msg}`)
    
  };
  const handleBuyNow = (item) => {
    alert(`Bought ${item}`);
  };
  return (<>
  <Navbar/>
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.map((card) => (
          <div className="bg-white shadow-md rounded-lg p-4" key={card.id}>
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-70 object-cover rounded-3xl mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <h3 className="text-lg font-semibold mb-2">price {card.price}</h3>
            <p className="mb-4 text-gray-600">{card.disc}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-700"
              onClick={() => handleAddToCart(card)}
            >
              Add to Cart
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              onClick={() => handleBuyNow(card.title)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
  };
  

export default Home;
