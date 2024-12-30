import { FaCartShopping } from "react-icons/fa6"; // Import the cart icon
import { useSelector } from "react-redux"; // Import the useSelector hook to access Redux state
import { NavLink, useNavigate } from "react-router-dom"; // Import navigation components from react-router-dom

function Navbar() {
  
  const cart = useSelector(state => state.cart.cart); // Access the cart items from Redux state
  const id = localStorage.getItem('userId'); // Get the user ID from local storage
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const logout = () => {
    localStorage.clear("token"); // Clear the token from local storage
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex justify-between">
            {/* Left side (logo and links) */}
            <div className="flex space-x-7">
              {/* Logo */}
              <div>
                <a href="/" className="flex items-center py-4 px-2">
                  <img
                    src="https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcTSPFIuI8SwDAeb2CTAq5-6ZGb2ZsURpo6XIqCDPSRJszsZZgQlB1jKOpuymxkgEd8y"
                    alt="Logo"
                    className="h-12 w-10 mr-2 rounded-full"
                  />
                  <span className="font-semibold text-gray-500 text-lg">Desi Hai</span>
                </a>
              </div>
              {/* Primary Nav Links */}
              <div className="hidden md:flex items-center space-x-1">
                {id ? (
                  <>
                    <NavLink
                      to='/'
                      className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to='/aboutus'
                      className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
                    >
                      About Us
                    </NavLink>
                    {/* Payment History Button */}
                    <NavLink
                      to='/history' // Update this to your actual payment history route
                      className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
                    >
                      Payment History
                    </NavLink>
                  </>
                ) : null}
              </div>
            </div>
            {/* Right side (buttons) */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Add to Cart Button with Icon */}
              {id ? (
                <NavLink
                  to='/cart'
                  className="flex items-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                  <FaCartShopping className="h-5 w-5 mr-2" />{cart.length}
                </NavLink>
              ) : null}
              {/* Admin Login Button */}
             {!id ? <NavLink
                to='/adminlogin' // Update this to your actual admin login route
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
              >
                Admin Login
              </NavLink>:""}
              {/* Logout Button */}
              {id ? (
                <button 
                  onClick={logout} 
                  className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
