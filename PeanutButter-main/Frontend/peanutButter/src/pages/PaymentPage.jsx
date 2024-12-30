import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import cartSlice from '../features/cartSlice';
import Navbar from '../components/navbar';


const PaymentPage = () => {
    const dispatch=useDispatch()
  
  const navigate = useNavigate();
    const userId = window.localStorage.getItem('userId');
  const location = useLocation();
  const { cart,amount } = location.state || { cart: [], amount: 0 }; // Using `location.state` to get cart and amount

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState('');
  const[paymentData,setPaymentData]=useState()

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setError('');
  };

 
  const handlePayment = async ()=>{
   
   
        const { street, city, state, zip } = address;
        if (!street || !city || !state || !zip) {
          setError('Please fill out all address fields.');
          return;
        }
        // Call your payment handler function here, e.g., Razorpay integration.
       
      ;
    const response=await axios.post('http://localhost:8000/order',{amount})
    console.log(response.data.data)
    handlePaymentVerify(response.data.data,cart)
  }
  const handlePaymentVerify = async (data, cart) => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    console.log("Razorpay Key:", razorpayKey); // Log the key to verify

    if (!razorpayKey) {
        console.error("Razorpay key is missing!");
        return;
    }

    const options = {
        key: razorpayKey, // Razorpay Key ID
        amount: data.amount, // amount in paise (e.g., 50000 for ₹500)
        currency: data.currency,
        name: "Desi Hai",
        description: "Test Mode",
        order_id: data.id,
        handler: async (response) => {
            console.log("Payment response:", response);
            try {
                // Prepare the names of all products and their quantities
                const productsData = cart?.map(item => ({
                    title: item.product.title, // Product name
                    quantity: item.quantity // Product quantity
                }));

                console.log("Products Data:", productsData); // Log the product names and quantities

                const result = await axios.post('http://localhost:8000/verify', {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    amount: data.amount, // Include the amount here
                    products: productsData, // Include product names and quantities here
                    userId,
                    address
                });

                // Check the message
                console.log(result);
                if (result.data.msg ==="Payment Successfully") {
                    try {
                        const clearResponse = await axios.post('http://localhost:8000/clear', { userId });
                        console.log("Clear cart response:", clearResponse.data);
                       setPaymentData(result.data.paymentdata);
                        console.log(result.data.paymentdata)
                        dispatch(cartSlice.actions.clearCart())
                        navigate('/success', { state: { paymentData: result.data.paymentdata } });
                    } catch (error) {
                        console.error("Error while clearing cart:", error);
                    }
                }
            } catch (error) {
                console.error("Error during payment verification:", error);
            }
        },
        theme: {
            color: "#5f63b8",
        },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};

  return (
    <div>
      <Navbar/>
    <div className="max-w-lg mx-auto p-6 mt-5 bg-slate-300 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>

      {/* Cart summary */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Cart Summary</h2>
        <ul className="list-disc list-inside">
          {cart.map((item, index) => (
            <li key={index}>
              {item.product.title} - Quantity {item.quantity} - ${item.product.price*item.quantity}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-semibold">Total Amount: ${amount}</p>
      </div>
      {/* Address fields */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleChange}
          placeholder="Street Address"
          className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="zip"
          value={address.zip}
          onChange={handleChange}
          placeholder="ZIP Code"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Payment button */}
      <button
        onClick={handlePayment}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Proceed to Pay
      </button>
    </div>
    </div>
  );
};

export default PaymentPage;
