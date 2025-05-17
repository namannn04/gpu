import React from 'react';
import GPUSummary from './GPUSummary';
import GPUCard from './GPUCard';

const GPUResults = ({ 
  results, 
  form, 
  showComparison, 
  requestSubmitted, 
  setShowComparison, 
  setRequestSubmitted 
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="bg-purple-500 w-2 h-6 rounded-full mr-3"></span>
        GPU Recommendations
      </h2>

      {results.length > 0 ? (
        <div className="space-y-4">
          <GPUSummary results={results} form={form} />
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {results.map((gpu, idx) => (
              <GPUCard 
                key={idx} 
                gpu={gpu} 
                isBestMatch={idx === 0} 
              />
            ))}
            
            <div className={'border rounded-xl p-5 transition-all duration-300 bg-gray-700/30 border-gray-600 hover:border-blue-500'}>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-white">NVIDIA A100</h3>
                <p className="text-gray-300 mt-2">Specs: 40GB HBM2, PCIe Gen4</p>
                <p className="text-gray-300 mt-2">Price: N/A</p>

                {!requestSubmitted && (
                  <button
                    onClick={() => setRequestSubmitted(true)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Request
                  </button>
                )}
              </div>

              {requestSubmitted && (
                <div className="mt-4 bg-green-700 text-white p-4 rounded-lg shadow-md">
                  Your request has been submitted. We'll notify you when this GPU becomes available.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="bg-gray-700/50 rounded-full p-4 mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-300 mb-2">No Recommendations Yet</h3>
          <p className="text-gray-400 max-w-md">
            Submit your machine learning workload details to get optimized GPU recommendations tailored to your needs.
          </p>
        </div>
      )}

      <button 
        onClick={() => setShowComparison(true)}
        disabled={results.length === 0}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          results.length === 0 
            ? 'bg-gray-700 text-gray-500'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-blue-500/20 text-white'
        }`}
      >
        Compare Prices
      </button>
    </div>
  );
};

export default GPUResults;
