import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src="https://videos.pexels.com/video-files/3273637/3273637-hd_1920_1080_30fps.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <motion.h1
          className="text-6xl font-extrabold text-white leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          Supercharge Your AI/ML Projects with Optimal GPU Selection
        </motion.h1>
        <motion.p
          className="mt-4 text-2xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
        >
          Quickly match your GPU needs with the best instances to maximize efficiency and minimize costs.
        </motion.p>

        {/* Shiny Animated Button */}
        <motion.div
          className="relative mt-8 inline-block group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Glowing Border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 group-hover:animate-shiny-spin blur-md z-0"></div>

          {/* Actual Button */}

          <button
      onClick={() => navigate('/test')}
      className="relative z-10 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-full shadow-lg transition duration-300 ease-in-out"
    >
      Get Started Now
    </button>
        </motion.div>

        {/* Down Arrow */}
        <motion.div
          className="mt-10 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
        >
          <span className="text-white text-4xl">&#8595;</span>
        </motion.div>
      </div>

      {/* Custom Animation */}
      <style>
        {`
          @keyframes shiny-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-shiny-spin {
            animation: shiny-spin 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
