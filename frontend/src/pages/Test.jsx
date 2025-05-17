import React from 'react';
import GPUForm from '../components/GPUForm';
import GPUResults from '../components/GPUResults';
import useGPURecommendation from '../hooks/useGPURecommendation';
import ComparisonModal from './ComparisonModal';

function Test() {
  const {
    form,
    results,
    loading,
    error,
    submitAttempted,
    showComparison,
    requestSubmitted,
    handleChange,
    handleSubmit,
    setShowComparison,
    setRequestSubmitted
  } = useGPURecommendation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-lg mb-4">
            <div className="bg-gray-900 rounded-md px-4 py-2">
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300">
                AI GPU Optimizer
              </h1>
            </div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Find the perfect GPU configuration for your machine learning workloads
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GPUForm 
            form={form}
            loading={loading}
            error={error}
            submitAttempted={submitAttempted}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          
          <GPUResults 
            results={results}
            form={form}
            showComparison={showComparison}
            requestSubmitted={requestSubmitted}
            setShowComparison={setShowComparison}
            setRequestSubmitted={setRequestSubmitted}
          />
        </div>
      </div>
      
      <ComparisonModal
        isOpen={showComparison} 
        onClose={() => setShowComparison(false)} 
        instances={results} 
      />
    </div>
  );
}

export default Test;