import { useState, useEffect } from 'react';
import axios from 'axios';
import { validateForm, validateField } from '../components/GPUForm/GPUFormValidation';

const useGPURecommendation = () => {
  const [form, setForm] = useState({
    model_type: '',
    dataset_size_gb: '',
    task_type: '',
    budget: '',
    region: '',
    operating_system: '',
    min_ram_gb: '',
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    axios.defaults.timeout = 15000;
    axios.interceptors.request.use(request => {
      console.log('Request:', request);
      return request;
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate individual field
    const isValid = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: isValid ? null : `Invalid ${name.replace('_', ' ')} value`
    }));

    setForm({ ...form, [name]: value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    // Validate entire form using the imported function
    if (!validateForm(form)) {
      setError('Please fill in all required fields');
      return;
    }

    // Check if there are any field-specific errors
    if (Object.values(fieldErrors).some(error => error !== null)) {
      setError('Please correct the highlighted fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = {
        ...form,
        dataset_size_gb: parseFloat(form.dataset_size_gb),
        budget: form.budget ? parseFloat(form.budget) : undefined,
        min_ram_gb: form.min_ram_gb ? parseFloat(form.min_ram_gb) : undefined,
      };
      
      const res = await axios.post('http://localhost:8080/recommendations', formData);
      
      if (Array.isArray(res.data) && res.data.length === 0) {
        setError('No GPU instances found matching your criteria');
        setResults([]);
      } else {
        setResults(Array.isArray(res.data) ? res.data : res.data.recommendations || []);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.error || 
        err.message || 
        'Failed to get recommendations'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    results,
    loading,
    error,
    submitAttempted,
    showComparison,
    requestSubmitted,
    fieldErrors,
    handleChange,
    handleSubmit,
    setShowComparison,
    setRequestSubmitted
  };
};

export default useGPURecommendation;