import { useEffect, useState } from "react";
import {NavLink, useNavigate, } from 'react-router-dom'
import axios from 'axios'
import {toast } from 'react-toastify';
import Navbarwithoutcart from "../components/navbarwithoutcart";
import Navbar from "../components/navbar";

function Register() {
    const navigate=useNavigate()
    useEffect(()=>{
        const Auth=localStorage.getItem("token")
        if(Auth){
            navigate('/')
        }
      },[])
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  
  const body={username,email,password}

  const handleLogin =async (e) => {
    e.preventDefault();
    const response= await axios.post("http://localhost:8000/register",body)
    toast(response.data.msg)
    if(response.data.msg==="User Registered Successfully")
        navigate('/login')
  };
  return (
    <div>
      <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleLogin} className="space-y-6">
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
         Already Registerd?{" "}
          <NavLink to='/login' className="text-blue-500 hover:underline">
            Login Here
          </NavLink>
        </p>
      </div>
    </div>
    </div>
  );
}
export default Register;
