const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getLatestValue() {
  const { data, error } = await supabase
    .from('investment_data')
    .select('value')
    .order('timestamp', { ascending: false })
    .limit(1);

  if (error) throw error;
  return data[0]?.value || 1000;
}

async function addNewDataPoint() {
  try {
    const currentValue = await getLatestValue();
    const newValue = currentValue + (Math.random() - 0.5) * 100;
    const timestamp = new Date().toISOString();

    const { error } = await supabase
      .from('investment_data')
      .insert([{
        timestamp,
        value: Math.max(0, newValue),
      }]);

    if (error) throw error;
    console.log(`Added new data point: ${newValue.toFixed(2)} at ${timestamp}`);
  } catch (error) {
    console.error('Error adding new data point:', error.message);
  }
}

// Run the simulation every 3 seconds
setInterval(addNewDataPoint, 3000);
console.log('Simulation started! Press Ctrl+C to stop.'); 