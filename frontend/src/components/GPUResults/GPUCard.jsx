import React from 'react';

const GPUCard = ({ gpu, isBestMatch }) => {
  return (
    <div className={`border rounded-xl p-5 transition-all duration-300 ${isBestMatch ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-600 shadow-lg' : 'bg-gray-700/30 border-gray-600 hover:border-blue-500'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold flex items-center">
            {gpu.resource_class || gpu.gpu_description}
            {isBestMatch && (
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Best Match
              </span>
            )}
          </h3>
          <p className="text-gray-300 text-sm mt-1">{gpu.gpu_description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-400">${gpu.price_per_hour}<span className="text-sm font-normal text-gray-400">/hr</span></p>
          {gpu.price_per_spot > 0 && (
            <p className="text-sm text-purple-400">${gpu.price_per_spot}/hr (spot)</p>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gray-700/50 rounded-lg p-3">
          <p className="text-xs text-gray-400">vCPUs</p>
          <p className="text-lg font-semibold">{gpu.vcpus}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <p className="text-xs text-gray-400">RAM</p>
          <p className="text-lg font-semibold">{gpu.ram} GB</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Region</p>
          <p className="text-lg font-semibold">{gpu.region}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <p className="text-xs text-gray-400">OS</p>
          <p className="text-lg font-semibold">{gpu.operating_system || 'Any'}</p>
        </div>
      </div>
    </div>
  );
};

export default GPUCard;