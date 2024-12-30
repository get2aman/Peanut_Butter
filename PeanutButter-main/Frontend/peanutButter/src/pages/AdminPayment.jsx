import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbarwithoutcart from '../components/navbarwithoutcart';

const AdminPayment = () => {
  const [payments, setPayments] = useState([]);

  // Fetch payments data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/allpayments/"); // Replace with your actual API endpoint
        const NotCompleted=response.data.filter(e=>e.deleverd===false)
        setPayments(NotCompleted);
        console.log(response);
      } catch (error) {
        console.error('Error fetching payment history', error);
      }
    };

    fetchPayments();
  }, []);

  // Handle mark as completed in the background
  const markAsCompleted = async (paymentId) => {
    const response = await axios.put(`http://localhost:8000/deleverd/${paymentId}`);
    console.log(response.data)
    const Update=payments.filter(e=>e._id!=response.data._id)
    setPayments(Update)
  };

  return (
    <div>
      <Navbarwithoutcart />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto bg-slate-300 shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">All Orders</h1>
          {payments.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">No ordrs found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {payments.map((payment) => (
                <div
                  key={payment.razorpay_payment_id}
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                >
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">Order ID: {payment.razorpay_payment_id}</h2>
                  <p className="text-gray-600">
                    <span className="font-semibold">Amount:</span> ₹{payment.amount}
                  </p>

                  {/* Render individual address fields */}
                  <div className="text-gray-600">
                    <p><span className="font-semibold">Street:</span> {payment.address.street}</p>
                    <p><span className="font-semibold">City:</span> {payment.address.city}</p>
                    <p><span className="font-semibold">State:</span> {payment.address.state}</p>
                    <p><span className="font-semibold">Zip Code:</span> {payment.address.zip}</p>
                  </div>

                  {/* Completed button */}
                  <button
                    onClick={() => markAsCompleted(payment._id)}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    Mark as Completed
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPayment;
