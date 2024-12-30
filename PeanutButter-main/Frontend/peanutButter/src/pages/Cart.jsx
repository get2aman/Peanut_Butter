import { useEffect, useState } from 'react';
import axios from 'axios';
import { ImCross } from "react-icons/im";
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import cartSlice from '../features/cartSlice';
import Navbar from '../components/navbar';



const Cart = () => {
  const userId = window.localStorage.getItem('userId');
  const dispatch=useDispatch()
  
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [amount, setTamount] = useState(0);
 // let[amount,setamount]=useState(0)
  
 

  useEffect(() => {
    // Fetch the cart data from the API when the component mounts
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cart/${userId}`);
        setCart(response.data.cart); // Assuming cart is an array of products
        calculateTotal(response.data.cart);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);
  // Function to calculate the total price
  const calculateTotal = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(0);
    setTamount(total);
    //setamount(totalPrice)
    //console.log(amount)
  };
  // Function to handle quantity increment
  const handleIncreaseQuantity = async (productId) => {
    try {
      await axios.put(`http://localhost:8000/incquantity/${productId}`, { userId });
      const updatedCart = cart.map(item => {
        if (item.product._id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
      calculateTotal(updatedCart);
      toast.success('Quantity increased!');
    } catch (error) {
      toast.error('Error increasing quantity!');
      console.error("Error increasing quantity:", error);
    }
  };
  // Function to handle quantity decrement
  const handleDecreaseQuantity = async (productId) => {
    try {
      await axios.put(`http://localhost:8000/decquantity/${productId}`, { userId });
      const updatedCart = cart
        .map(item => {
          if (item.product._id === productId) {
            return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : null;
          }
          return item;
        })
        .filter(item => item !== null); // Remove items with quantity of 0
      setCart(updatedCart);
      calculateTotal(updatedCart);
      toast.info('Quantity decreased!');
    } catch (error) {
      toast.error('Error decreasing quantity!');
      console.error("Error decreasing quantity:", error);
    }
  };
  // Function to handle removing an item from the cart
  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.put(`http://localhost:8000/removecart/${productId}`, { userId });
      const updatedCart = cart.filter(item => item.product._id !== productId); // Update to data instantly
      setCart(updatedCart);
      calculateTotal(updatedCart);
      toast.warning('Item removed from cart!');
    } catch (error) {
      toast.error('Error removing product!');
      console.error("Error removing product:", error);
    }
  };
  const handelNavigate=()=>{
    navigate('/payment', { state: { cart,amount  } })
  }


  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  return (
    <div>
      <Navbar/>
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-3xl text-indigo-800">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl text-gray-600">{cart.length} Items</h2>
          </div>
          {/* Headings for cart items */}
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5 ">Product Details</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 mr-10 text-center">Title</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 mr-10 text-center">Quantity</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 mr-7 text-center">Price</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 mr-5 text-center">Total</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Remove</h3>
          </div>

          {/* Map over the cart items */}
          {cart?.map(item => (
            <div key={item.product._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5 items-center">
                <div className="w-20">
                  <img className="h-24" src={item.product.img} alt={item.product.name} />
                </div>
              </div>
              {/* Title of the product */}
              <div className="flex justify-center w-1/5">
                <span className="font-semibold mr-7 text-sm text-center text-indigo-700">{item.product.title}</span>
              </div>
              {/* Quantity controls */}
              <div className="flex justify-center w-1/5 mr-10">
                <button 
                  onClick={() => handleDecreaseQuantity(item.product._id)} 
                  className="text-gray-600 w-6 h-6 text-center border border-gray-300 hover:bg-gray-200 transition ease-in-out duration-150">
                  -
                </button>
                <span className="mx-2 border text-center w-8">{item.quantity}</span>
                <button 
                  onClick={() => handleIncreaseQuantity(item.product._id)} 
                  className="text-gray-600 w-6 h-6 text-center border border-gray-300 hover:bg-gray-200 transition ease-in-out duration-150">
                  +
                </button>
              </div>

              {/* Price and Total */}
              <span className="text-center w-1/5 font-semibold text-sm text-green-600 mr-5">${item.product.price}</span>
              <span className="text-center w-1/5 font-semibold text-sm text-green-600">${(item.product.price * item.quantity).toFixed(2)}</span>

              {/* Cross icon for removing product */}
              <div className="flex justify-center w-1/5">
                <button 
                  onClick={() => handleRemoveFromCart(item.product._id)} 
                  className="font-semibold hover:text-red-600 text-red-500 transition ease-in-out duration-150">
                  <ImCross fontSize='1.5em' />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-10 mb-5">
            <button onClick={() => navigate('/success', { state: { cart:cart,amount:amount } })} className="flex font-semibold text-sm text-indigo-600 hover:text-indigo-800 transition ease-in-out duration-150">
              Continue Shopping
            </button>
          </div>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10 bg-gray-100 rounded-lg">
          <h1 className="font-semibold text-2xl text-gray-800 border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Total Items</span>
            <span className="font-semibold text-sm">{cart.length}</span>
          </div>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Total Price</span>
            <span className="font-semibold text-sm text-green-600">${amount}</span>
          </div>
          <button onClick={handelNavigate} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full transition ease-in-out duration-150">
            Checkout
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cart;
