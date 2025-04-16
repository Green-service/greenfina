// This script seeds the investment_data table with initial data
// Run with: node scripts/seed-investment-data.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Function to generate a random value
function generateRandomValue(baseValue, variance) {
  const change = (Math.random() * 2 - 1) * variance
  return (baseValue + change).toFixed(2)
}

// Function to generate a random percentage change
function generateRandomPercentage() {
  return (Math.random() * 4 - 2).toFixed(2)
}

// Function to determine trend based on percentage change
function determineTrend(percentageChange) {
  if (percentageChange > 0.5) return 'up'
  if (percentageChange < -0.5) return 'down'
  return 'stable'
}

// Function to seed the database with initial data
async function seedInvestmentData() {
  try {
    console.log('Seeding investment data...')
    
    // Clear existing data
    const { error: deleteError } = await supabase
      .from('investment_data')
      .delete()
      .neq('id', 0)
    
    if (deleteError) throw deleteError
    
    console.log('Cleared existing data')
    
    // Generate 50 initial data points
    const data = []
    const now = new Date()
    let value = 1000 // Starting value
    
    for (let i = 0; i < 50; i++) {
      const timestamp = new Date(now.getTime() - (49 - i) * 3 * 1000)
      value += (Math.random() - 0.5) * 100 // Random walk
      data.push({
        timestamp: timestamp.toISOString(),
        value: Math.max(0, value), // Ensure value doesn't go negative
      })
    }
    
    // Insert the data
    const { error: insertError } = await supabase
      .from('investment_data')
      .insert(data)
    
    if (insertError) throw insertError
    
    console.log('Successfully seeded 50 initial data points')
  } catch (error) {
    console.error('Error seeding data:', error.message)
    process.exit(1)
  }
}

// Run the seeding function
seedInvestmentData() 