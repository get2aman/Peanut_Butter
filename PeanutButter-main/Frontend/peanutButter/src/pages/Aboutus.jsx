import Navbar from "../components/navbar";
import logo from "../img/qr.jpg"
import logo2 from "../img/rahul.jpg"

const AboutUs = () => {
  return (
   <div>
    <Navbar/>
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side: Photo and About Info */}
        <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <img
            src={logo2}
            alt="Peanut Butter Maker"
            className="w-48 h-48 rounded-full mx-auto md:mx-0 mb-4" // Increased size to w-48 h-48
          />
          <h1 className="text-3xl font-semibold mb-4">About Us</h1>
          <p className="text-gray-600 mb-4">
            Welcome! I’m a dedicated peanut butter maker, focused on crafting the finest quality peanut butter with love and care. Using only the best roasted peanuts, I ensure each jar offers a perfect blend of flavor and texture, whether you prefer it smooth or crunchy.
          </p>
          <p className="text-gray-600 mb-4">
            Currently, I’m preparing for the CAT exam to pursue an MBA, aiming to gain the skills and knowledge necessary to take my business to the next level.
          </p>
          <p className="text-gray-600">
            Thank you for being a part of this journey!
          </p>
        </div>

        {/* Right Side: QR Code and UPI Info */}
        <div className="md:w-1/2 text-center">
          <h2 className="text-xl font-semibold mb-2">Support via UPI</h2>
          <p className="text-gray-600 mb-4">Scan the QR code below to support me:</p>

          {/* QR Code Section */}
          <div className="w-32 h-32 bg-gray-200 mx-auto mb-4 rounded-lg flex items-center justify-center">
            <img src={logo} alt="" />
          </div>

          {/* UPI ID Section */}
          <p className="text-gray-600 mb-2">Or use my UPI ID:</p>
          <p className="font-semibold text-gray-800">rahulkohli12348@axl</p>

          {/* Support Button */}
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-green-600">
            Support Me
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
