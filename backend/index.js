import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

function recommendInstances(instances, input) {
  const {
    task_type,
    dataset_size_gb,
    model_type,
    budget,
    region,
    operating_system,
    min_ram_gb,
  } = input;

  const parsedRam = min_ram_gb ? parseInt(min_ram_gb) : null;
  const parsedBudget = budget ? parseFloat(budget) : Infinity;

  const filtered = instances
    .filter(i =>
      i.region.includes(region.split('-')[2]) &&
      i.price_per_hour > 0 &&
      i.price_per_hour <= parsedBudget &&
      (!parsedRam || i.ram === parsedRam) && 
      (!operating_system || i.operating_system === operating_system) 
    )
    .map(i => ({
      ...i,
      explanation: `Recommended for ${task_type} on ${model_type} models. Handles ~${dataset_size_gb}GB data.`,
    }));

  const lowest5 = [...filtered].sort((a, b) => a.price_per_hour - b.price_per_hour).slice(0, 5);
  const highest5 = [...filtered].sort((a, b) => b.price_per_hour - a.price_per_hour).slice(0, 5);

  const combined = [
    ...new Map([...highest5, ...lowest5].map(i => [i.resource_id || i.price_per_hour, i])).values(),
  ];

  return combined;
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
