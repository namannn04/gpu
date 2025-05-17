import React from 'react';

const GPUSummary = ({ results, form }) => {
  return (
    <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-4">
      <p className="text-blue-300">
        Found top <span className="font-bold text-white">{results.length}</span> matching GPU configurations
        {form.budget && <span> within your ${form.budget}/hour budget</span>}
      </p>
    </div>
  );
};

export default GPUSummary;
