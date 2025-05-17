import { motion } from 'framer-motion';
import { FaLaptopCode, FaChartLine, FaDollarSign } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-100 text-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">Our Key Features</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <motion.div
            className="bg-white text-black p-8 rounded-xl shadow-xl hover:shadow-2xl transform transition duration-500 ease-in-out"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <FaLaptopCode className="text-4xl text-blue-600 mx-auto" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">Real-time Pricing</h3>
            <p className="mt-2 text-lg text-gray-600">Stay up-to-date with dynamic, real-time GPU pricing data.</p>
          </motion.div>

          <motion.div
            className="bg-white text-black p-8 rounded-xl shadow-xl hover:shadow-2xl transform transition duration-500 ease-in-out"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <FaChartLine className="text-4xl text-blue-600 mx-auto" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">Tailored Recommendations</h3>
            <p className="mt-2 text-lg text-gray-600">Get personalized GPU instance suggestions based on your project’s needs.</p>
          </motion.div>

          <motion.div
            className="bg-white text-black p-8 rounded-xl shadow-xl hover:shadow-2xl transform transition duration-500 ease-in-out"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <FaDollarSign className="text-4xl text-blue-600 mx-auto" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">Cost Comparison</h3>
            <p className="mt-2 text-lg text-gray-600">Compare the cost of multiple GPU options and make the best choice for your budget.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
