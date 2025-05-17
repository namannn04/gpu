import React from 'react';

const GPUFormFields = ({ form, submitAttempted, handleChange }) => {
  return (
    <>
      {/* Model Type */}
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Purpose of Usage <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="model_type"
            placeholder="e.g. LLM, Vision Transformer, CNN"
            value={form.model_type}
            onChange={handleChange}
            required
            className={`w-full bg-gray-700/50 border ${submitAttempted && !form.model_type.trim() ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        {submitAttempted && !form.model_type.trim() && (
          <p className="mt-1 text-sm text-red-400">Please specify your model type</p>
        )}
      </div>

      {/* Dataset Size */}
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Dataset Size (GB) <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            name="dataset_size_gb"
            placeholder="e.g. 50, 100, 500"
            value={form.dataset_size_gb}
            onChange={handleChange}
            required
            min="0"
            step="0.1"
            className={`w-full bg-gray-700/50 border ${submitAttempted && !form.dataset_size_gb ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
            </svg>
          </div>
        </div>
        {submitAttempted && !form.dataset_size_gb && (
          <p className="mt-1 text-sm text-red-400">Please enter your dataset size</p>
        )}
      </div>

      {/* Task Type */}
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Task Type <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <select
            name="task_type"
            value={form.task_type}
            onChange={handleChange}
            required
            className={`w-full bg-gray-700/50 border ${submitAttempted && !form.task_type ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400 appearance-none`}
          >
            <option value="">Select your task</option>
            <option value="training">Model Training</option>
            <option value="inference">Inference</option>
            <option value="fine-tuning">Fine-tuning</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        {submitAttempted && !form.task_type && (
          <p className="mt-1 text-sm text-red-400">Please select a task type</p>
        )}
      </div>

      {/* Budget */}
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Budget ($/hour)
        </label>
        <div className="relative">
          <input
            type="number"
            name="budget"
            placeholder="Maximum hourly cost (optional)"
            value={form.budget}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Region */}
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Region <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            required
            className={`w-full bg-gray-700/50 border ${submitAttempted && !form.region ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400 appearance-none`}
          >
            <option value="">Select deployment region</option>
            <option value="us-east-at-1">us-east-at-1</option>
            <option value="ap-south-mum-1">ap-south-mum-1</option>
            <option value="ap-south-noi-1">ap-south-noi-1</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        {submitAttempted && !form.region && (
          <p className="mt-1 text-sm text-red-400">Please select a region</p>
        )}
      </div>

      {/* Operating System */}
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Operating System <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <select
            name="operating_system"
            value={form.operating_system}
            onChange={handleChange}
            required
            className={`w-full bg-gray-700/50 border ${submitAttempted && !form.operating_system ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400 appearance-none`}
          >
            <option value="">Select operating system</option>
            <option value="linux">Linux</option>
            <option value="windows">Windows</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
        </div>
        {submitAttempted && !form.operating_system && (
          <p className="mt-1 text-sm text-red-400">Please select an operating system</p>
        )}
      </div>
        
      {/* Minimum RAM */}
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Minimum RAM (GB) (optional)
        </label>
        <div className="relative">
          <input
            type="number"
            name="min_ram_gb"
            placeholder="e.g. 8, 16, 32"
            value={form.min_ram_gb}
            onChange={handleChange}
            min="0"
            step="1"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400"
          />
        </div>
      </div>
    </>
  );
};

export default GPUFormFields;
