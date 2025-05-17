export const validateForm = (form) => {
  return (
    form.model_type.trim() !== '' &&
    form.dataset_size_gb.trim() !== '' &&
    form.task_type !== '' &&
    form.region !== '' &&
    form.operating_system !== ''
  );
};

export const validateField = (name, value) => {
  const validators = {
    model_type: (val) => val.trim() !== '',
    dataset_size_gb: (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    task_type: (val) => ['training', 'inference', 'fine-tuning'].includes(val),
    region: (val) => ['us-east-at-1', 'ap-south-mum-1', 'ap-south-noi-1'].includes(val),
    operating_system: (val) => ['linux', 'windows'].includes(val),
    budget: (val) => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0),
    min_ram_gb: (val) => val === '' || (!isNaN(parseInt(val)) && parseInt(val) >= 0)
  };

  return validators[name] ? validators[name](value) : true;
};
