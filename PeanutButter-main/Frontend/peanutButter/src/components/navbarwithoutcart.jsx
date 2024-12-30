import { NavLink, useNavigate } from "react-router-dom"; // Import navigation components from react-router-dom

function Navbarwithoutcart() {
  // Access the cart items from Redux state
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
            <div className="flex space-x-7 items-center">
              {/* Logo */}
              <div>
                <NavLink to='/adminpayment' className="flex items-center py-4 px-2">
                  <img
                    src="https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcTSPFIuI8SwDAeb2CTAq5-6ZGb2ZsURpo6XIqCDPSRJszsZZgQlB1jKOpuymxkgEd8y"
                    alt="Logo"
                    className="h-12 w-10 mr-2 rounded-full"
                  />
                  <span className="font-semibold text-gray-500 text-lg">Desi Hai</span>
                </NavLink>
              </div>

              {/* Order Delivered Button */}
              <NavLink
                to='/adminpayment' // Update with the route for the order delivered page
                className="font-semibold text-gray-500 text-lg"
              >
                Pending Orders
              </NavLink>
              <NavLink
                to='/admincompleteorder' // Update with the route for the order delivered page
                className="font-semibold text-gray-500 text-lg"
              >
                 Completed Orders
              </NavLink>
            </div>

            {/* Right side (buttons) */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Admin Login Button */}
              {!id ? (
                <NavLink
                  to='/adminlogin' // Update this to your actual admin login route
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                >
                  Admin Login
                </NavLink>
              ) : ""}

              {/* Logout Button */}
              {id ? (
                <button
                  onClick={logout}
                  className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                  Logout Admin
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbarwithoutcart;
