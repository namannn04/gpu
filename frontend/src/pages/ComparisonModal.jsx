import React from 'react';

const ComparisonModal = ({ isOpen, onClose, instances }) => {
  if (!isOpen) return null;

  // Function to generate contextual recommendation
  const getRecommendationReason = (instance) => {
    const gpuType = instance.gpu_description?.toLowerCase() || '';
    const ram = instance.ram || 0;
    const vcpus = instance.vcpus || 0;
    
    if (gpuType.includes('a100') || gpuType.includes('h100')) {
      return "Best for large-scale training and HPC workloads due to high VRAM and tensor cores";
    }
    if (gpuType.includes('l4')) {
      return "Cost-effective for medium-scale inference and light training workloads";
    }
    if (gpuType.includes('t4')) {
      return "Good for small-scale inference and prototyping with budget constraints";
    }
    if (ram >= 96) {
      return "Recommended for memory-intensive workloads and large datasets";
    }
    if (vcpus >= 16) {
      return "Ideal for CPU-bound preprocessing and multi-task workloads";
    }
    return "Balanced configuration for general purpose ML workloads";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div 
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" 
            onClick={onClose}
          ></div>
        </div>

        {/* Modal content */}
        <div className="inline-block align-bottom bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">
              GPU Instance Comparison
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Detailed cost analysis of recommended configurations
            </p>
          </div>

          <div className="bg-gray-800 px-6 py-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Instance
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      GPU
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      On-Demand ($/hr)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Spot ($/hr)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Monthly Cost
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      vCPUs
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      RAM (GB)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {instances.map((instance, idx) => (
                    <React.Fragment key={idx}>
                      <tr className={idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700/30'}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            {idx === 0 && (
                              <span className="mr-2 text-yellow-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </span>
                            )}
                            <div>
                              <div className="font-medium text-blue-400">
                                {instance.resource_name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {instance.region}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {instance.gpu_description}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-400">
                          ${instance.price_per_hour?.toFixed(3) || 'N/A'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-purple-400">
                          ${instance.price_per_spot?.toFixed(3) || 'N/A'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          ${instance.price_per_month?.toFixed(2) || 'N/A'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {instance.vcpus}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {instance.ram}
                        </td>
                      </tr>
                      <tr className={idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700/30'}>
                        <td colSpan="7" className="px-4 py-2 text-sm text-gray-400 border-t border-gray-700">
                          <span className="font-medium text-blue-300">Recommendation:</span> {getRecommendationReason(instance)}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Key Selection Factors:</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• <span className="font-medium">A100/H100 GPUs</span> preferred for large batch training due to high VRAM (80GB)</li>
                <li>• <span className="font-medium">L4/T4 GPUs</span> recommended for cost-sensitive inference workloads</li>
                <li>• <span className="font-medium">High RAM</span> instances better for large dataset processing</li>
                <li>• <span className="font-medium">Spot instances</span> offer 30-70% cost savings for fault-tolerant workloads</li>
              </ul>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Showing {instances.length} configurations
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;