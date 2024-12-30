import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../features/cartSlice";
import Navbar from "../components/navbar";


function Login() {
  const navigate=useNavigate()
  useEffect(()=>{
    const Auth=localStorage.getItem("token")
    if(Auth){
        navigate('/')
    }
  },[])
 
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const body={username,password}
  const dispatch=useDispatch()
  const handleLogin = async(e)=>{
    e.preventDefault();
   const response=await axios.post("http://localhost:8000/login",body)
   window.localStorage.setItem("token",response.data.token)
   window.localStorage.setItem("userId",response.data.id)
   dispatch(fetchCartData(response.data.id))
   console.log(response.data)
   toast(response.data.msg)

   if(response.data.msg==="Login Success")
    navigate('/')



  };
  return (
    <div>
      <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="Username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
         New User?{" "}
          <NavLink to='/register' className="text-blue-500 hover:underline">
            Register Here
          </NavLink>
        </p>
      </div>
    </div>
    </div>
  );
}
export default Login;
