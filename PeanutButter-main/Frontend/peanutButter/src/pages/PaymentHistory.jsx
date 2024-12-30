import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

const PaymentHistory = () => {
    const userId = window.localStorage.getItem('userId'); // Get the userId from localStorage
    const [payments, setPayments] = useState([]); // State to store payments
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    // Fetch payment history when the component mounts
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/payments/${userId}`);
                setPayments(response.data); // Set payments data from response
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                console.log(err);
                setError("Error fetching payments"); // Set error message
                setLoading(false); // Set loading to false on error
            }
        };

        fetchPayments();
    }, [userId]); // Run effect when userId changes

    // Render loading, error, or payments
    if (loading) return <div className="text-lg font-semibold">Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div>
            <Navbar/>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold mb-6 text-blue-600">Previous Payments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
                {payments.length === 0 ? (
                    <p className="text-center col-span-full text-lg text-gray-500">No payments found.</p>
                ) : (
                    payments.map((payment) => (
                        <div key={payment.razorpay_payment_id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl">
                            <h2 className="font-bold text-lg text-gray-800">Order ID: {payment.razorpay_payment_id}</h2>
                            <p className="text-md text-gray-700">Total Amount: <span className="text-green-600 font-semibold">₹{payment.amount}</span></p>
                            <h3 className="font-semibold mt-2 text-gray-800">Products Purchased:</h3>
                            <ul className="list-disc list-inside">
                                {payment.products.map((product, index) => (
                                    <li key={index} className="text-gray-600">
                                        <span className="font-semibold">{product.title}</span> - Quantity: <span className="text-blue-600 font-semibold">{product.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
        </div>
    );
};

export default PaymentHistory;
