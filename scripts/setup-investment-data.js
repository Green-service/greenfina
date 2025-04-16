// This script sets up the investment data by running both the seeding and simulation scripts
// Run with: node scripts/setup-investment-data.js

const { exec } = require('child_process')
const path = require('path')

console.log('Setting up investment data...')

// Run the seeding script
console.log('\n1. Seeding initial data...')
exec('node scripts/seed-investment-data.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error seeding data: ${error}`)
    return
  }
  console.log(stdout)
  console.log('Data seeded successfully!')
  
  // Start the simulation script
  console.log('\n2. Starting simulation...')
  const simulation = exec('node scripts/simulate-investment-data.js')
  
  // Handle simulation output
  simulation.stdout.on('data', (data) => {
    console.log(data)
  })
  
  simulation.stderr.on('data', (data) => {
    console.error(data)
  })
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\nStopping simulation...')
    simulation.kill()
    process.exit()
  })
  
  console.log('\nSimulation started! Press Ctrl+C to stop.')
}) 