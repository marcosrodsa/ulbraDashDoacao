-- Create campaign_settings table
-- This table stores the campaign configuration: meta goal, dates, and campaign name
-- Purpose: Allow admin UI to configure the campaign dynamically

CREATE TABLE campaign_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name VARCHAR(255) NOT NULL DEFAULT 'Maio Solidário 2026',
  meta_doacoes INT NOT NULL DEFAULT 500,
  data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  data_fim DATE NOT NULL DEFAULT CURRENT_DATE + INTERVAL '31 days',
  created_by UUID,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE campaign_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all authenticated users to READ campaign_settings
CREATE POLICY "Allow read campaign_settings"
  ON campaign_settings FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow all authenticated users to UPDATE campaign_settings
CREATE POLICY "Allow update campaign_settings"
  ON campaign_settings FOR UPDATE
  TO authenticated
  USING (true);

-- Insert default row for initial campaign
INSERT INTO campaign_settings (campaign_name, meta_doacoes, data_inicio, data_fim)
VALUES ('Maio Solidário 2026', 500, CURRENT_DATE, CURRENT_DATE + INTERVAL '31 days');
