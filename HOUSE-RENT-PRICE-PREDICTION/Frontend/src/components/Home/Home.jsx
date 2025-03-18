import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import Button from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { motion } from "framer-motion";
import leftSideImage from "../../assets/images/left-side.jpg";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <section
        className="min-h-screen flex items-center justify-center p-8"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(38, 7, 67, 0.84) 63%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-red-800 mb-4">
            Welcome to House Price Prediction
          </h1>
          <p className="text-lg text-black font-bold mb-6">
            Predict the price of a house based on various features.
          </p>
          <Card>
            <CardContent>
              <p className="text-base mb-4">
                Our model uses machine learning to estimate house prices
                accurately.
              </p>
              <Link to="/predict">
                <Button button onClick={() => navigate("/predict")}>Get Started</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="h-screen flex items-center justify-center p-8 bg-gray-500"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center max-w-5xl mx-auto"
        >
          {/* Left Side: Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={leftSideImage}
              alt="Project Overview"
              className="w-200 h-150 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side: Text Content */}
          <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:ml-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              About Our Project
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              This project leverages machine learning to predict house prices.
              We analyze historical data and provide accurate price estimates.
            </p>
            <p className="text-white">
              Our system considers various factors like{" "}
              <span className="font-bold">location</span>,
              <span className="font-bold"> square footage</span>,
              <span className="font-bold">number of bedrooms and recent
              sales data </span> to provide an accurate price prediction. By using{" "}
              <span className="font-bold">cutting-edge AI models</span>, we
              ensure <span className="font-bold">precision</span> and{" "}
              <span className="font-bold">reliability</span>.
            </p>
          </div>
        </motion.div>
      </section>

      {/*  */}
      <section
      id="whyusesystem"
      className="h-screen flex flex-col items-center justify-center p-8 bg-gray-800"
    >
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-6">
          Why Use Our System?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Our system simplifies house renting by eliminating unnecessary costs and 
          providing seamless digital solutions.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Avoid Brokers */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
              alt="Avoid Brokers"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">Avoid Brokers</h3>
            <p className="text-gray-400">
              No middlemen, no extra fees—directly connect with house owners.
            </p>
          </div>

          {/* Feature 2: Free Listing */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
              alt="Free Listing"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">Free Listing</h3>
            <p className="text-gray-400">
              List your property for free and reach potential tenants easily.
            </p>
          </div>

          {/* Feature 3: Shortlist Without Visiting */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Shortlist Without Visiting"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">Shortlist Without Visiting</h3>
            <p className="text-gray-400">
              View house details, images, and reviews online before visiting.
            </p>
          </div>

          {/* Feature 4: Rental Agreement */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="Rental Agreement"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">Rental Agreement</h3>
            <p className="text-gray-400">
              Generate legal rental agreements online quickly and hassle-free.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
    </div>
  );
}
