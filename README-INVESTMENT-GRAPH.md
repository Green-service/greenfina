# Global Investment Graph

This feature provides a real-time global investment index graph that all users can view. The graph updates in real-time as data changes in the database.

## Features

- Real-time global investment index tracking
- Visual representation of market trends (up, down, stable)
- Percentage change indicators
- Detailed tooltips with value, change percentage, and trend information
- Responsive design that works on all devices

## Database Structure

The investment data is stored in the `investment_data` table with the following structure:

```sql
CREATE TABLE IF NOT EXISTS investment_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    value DECIMAL(10,2) NOT NULL,
    change_percentage DECIMAL(5,2) NOT NULL,
    trend VARCHAR(10) CHECK (trend IN ('up', 'down', 'stable')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## How to Use

### Viewing the Graph

1. Navigate to the Investments page in the dashboard
2. Click on the "View Investment Graph" button
3. The global investment graph will be displayed
4. The graph shows the investment index value over time
5. Hover over data points to see detailed information

### Quick Setup

To quickly set up the investment data and start the simulation:

1. Make sure you have the required environment variables in your `.env` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. Run the setup script:
   ```
   node scripts/setup-investment-data.js
   ```

3. This will:
   - Seed the database with 50 initial data points
   - Start a simulation that adds new data points every 3 seconds
   - The graph will update in real-time as new data is added

4. Press Ctrl+C to stop the simulation when you're done

### Manipulating the Data

To manually change the graph data, you can use the following SQL commands:

```sql
-- Add a new data point
INSERT INTO investment_data (value, change_percentage, trend)
VALUES (1000.00, 0.50, 'up');

-- Update the latest value
UPDATE investment_data
SET value = 1005.00, change_percentage = 0.50, trend = 'up'
WHERE id = (SELECT id FROM investment_data ORDER BY timestamp DESC LIMIT 1);

-- Delete a data point
DELETE FROM investment_data
WHERE id = 'specific-id';
```

## Customization

You can customize the graph by modifying the following files:

- `app/components/InvestmentGraph.tsx`: Change the graph appearance, colors, and animations
- `app/dashboard/investments/page.tsx`: Modify the layout and information displayed
- `scripts/simulate-investment-data.js`: Adjust the simulation parameters

## Troubleshooting

If the graph is not updating:

1. Check that the Supabase real-time subscriptions are working
2. Verify that the database has data in the `investment_data` table
3. Check the browser console for any errors
4. Ensure you have the required permissions to read from the `investment_data` table
5. Try running the setup script again to seed the database with fresh data 