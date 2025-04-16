-- Create investment_data table
CREATE TABLE IF NOT EXISTS investment_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    value DECIMAL(10,2) NOT NULL,
    change_percentage DECIMAL(5,2) NOT NULL,
    trend VARCHAR(10) CHECK (trend IN ('up', 'down', 'stable')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_investment_data_timestamp ON investment_data(timestamp);

-- Insert initial data
INSERT INTO investment_data (value, change_percentage, trend)
VALUES 
    (1000.00, 0.00, 'stable'),
    (1005.00, 0.50, 'up'),
    (998.00, -0.70, 'down'),
    (1002.00, 0.40, 'up'),
    (995.00, -0.70, 'down');

-- Enable Row Level Security
ALTER TABLE investment_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read
CREATE POLICY "Allow authenticated users to read investment_data"
    ON investment_data
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow only admins to modify
CREATE POLICY "Allow only admins to modify investment_data"
    ON investment_data
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin'); 