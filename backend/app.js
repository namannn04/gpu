import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// function recommendInstances(instances, input) {
//   const {
//     task_type,
//     dataset_size_gb,
//     model_type,
//     budget,
//     region,
//     operating_system,
//     min_ram_gb,
//   } = input;

//   return instances
//     .filter(i =>
//       i.region.includes(region.split('-')[2]) &&     
//       i.price_per_hour > 0 &&
//       i.price_per_hour <= (budget || Infinity) &&
//       (!min_ram_gb || i.ram >= min_ram_gb) &&       // filter by RAM
//       (!operating_system || i.operating_system === operating_system) 
//     )
//     .map(i => ({
//       ...i,
//       explanation: `Recommended for ${task_type} on ${model_type} models. Handles ~${dataset_size_gb}GB data.`,
//     }))
//     .sort((a, b) => a.price_per_hour - b.price_per_hour)
//     .slice(0, 5)
// }

function recommendGPU(instances, userInput) {
  const { purpose, datasetSizeGB, budgetPerHour, operatingSystem } = userInput;
  
  // Calculate weights based on purpose
  const purposeWeights = {
    training: { vcpuWeight: 1.5, ramWeight: 2.5, budgetWeight: 1.2 },
    inference: { vcpuWeight: 1.2, ramWeight: 1.5, budgetWeight: 1.5 },
    'fine-tuning': { vcpuWeight: 1.8, ramWeight: 2.0, budgetWeight: 1.3 },
    default: { vcpuWeight: 1.0, ramWeight: 1.0, budgetWeight: 1.0 }
  };
  
  const weights = purposeWeights[purpose] || purposeWeights.default;

  // Filter by OS and budget first
  let candidates = instances.filter(instance => {
    return (
      (!operatingSystem || instance.operating_system === operatingSystem) &&
      instance.price_per_hour <= budgetPerHour
    );
  });

  // Score each candidate
  candidates = candidates.map(instance => {
    let score = 0;
    
    // RAM scoring (critical for large datasets)
    const ramScore = Math.min(instance.ram / datasetSizeGB * 10, 20); // Cap at 20
    score += ramScore * weights.ramWeight;
    
    // vCPU scoring
    score += instance.vcpus * weights.vcpuWeight;
    
    // Budget efficiency scoring (lower price = better)
    const budgetEfficiency = (1 / instance.price_per_hour) * 1000;
    score += budgetEfficiency * weights.budgetWeight;
    
    // GPU class bonus (A100/H100 get higher scores)
    if (instance.resource_class.includes('a100') || instance.resource_class.includes('h100')) {
      score += 15;
    }
    
    // Spot instance bonus if available
    if (instance.is_spot && instance.price_per_spot) {
      score += 10;
    }
    
    // Dataset fit penalty (if RAM < dataset size)
    if (instance.ram < datasetSizeGB) {
      score -= 50; // Heavy penalty for insufficient RAM
    }
    
    return {
      ...instance,
      score: Math.round(score * 100) / 100, // Round to 2 decimal places
      matchReasons: generateMatchReasons(instance, userInput)
    };
  });

  // Sort by score descending
  return candidates.sort((a, b) => b.score - a.score);
}

function generateMatchReasons(instance, userInput) {
  const reasons = [];
  
  // RAM related reasons
  if (instance.ram >= userInput.datasetSizeGB * 2) {
    reasons.push("Ample RAM for your dataset");
  } else if (instance.ram >= userInput.datasetSizeGB) {
    reasons.push("Sufficient RAM for your dataset");
  }
  
  // Budget reasons
  if (instance.price_per_hour <= userInput.budgetPerHour * 0.7) {
    reasons.push("Significantly under budget");
  } else if (instance.price_per_hour <= userInput.budgetPerHour * 0.9) {
    reasons.push("Well under budget");
  }
  
  // GPU class reasons
  if (instance.resource_class.includes('a100') || instance.resource_class.includes('h100')) {
    reasons.push("High-performance GPU");
  }
  
  // Purpose-specific reasons
  if (userInput.purpose === 'training' && instance.ram >= 64) {
    reasons.push("Ideal for model training");
  }
  
  if (userInput.purpose === 'inference' && instance.is_spot) {
    reasons.push("Cost-effective for inference");
  }
  
  return reasons.length > 0 ? reasons : ["Good overall match"];
}


app.post('/recommendations', async (req, res) => {
  const input = req.body;

  try {
    const response = await axios.get(
      'https://customer.acecloudhosting.com/api/v1/pricing',
      {
        params: {
          is_gpu: true,
          resource: 'instances',
          region: input.region,
        },
      }
    );

    const allInstances = response.data.data || [];
    const recommended = recommendInstances(allInstances, input);

    res.json(recommended);
  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch GPU instances.' });
  }
});

app.get('/', (req, res) => {
  res.send('GPU Optimizer API is live!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
