-- Create campaign_settings table
-- This table stores the campaign configuration: meta goal, dates, and campaign name
-- Purpose: Allow admin UI to configure the campaign dynamically

CREATE TABLE campaign_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name VARCHAR(255) NOT NULL DEFAULT 'Maio Solidário 2026' UNIQUE,
  meta_doacoes INT NOT NULL DEFAULT 500,
  data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  data_fim DATE NOT NULL DEFAULT CURRENT_DATE + INTERVAL '31 days',
  created_by UUID,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Disable Row Level Security (RLS) - table is public, no sensitive data
-- All CRUD operations allowed publicly
ALTER TABLE campaign_settings DISABLE ROW LEVEL SECURITY;

-- Insert default row for initial campaign
INSERT INTO campaign_settings (campaign_name, meta_doacoes, data_inicio, data_fim)
VALUES ('Maio Solidário 2026', 500, CURRENT_DATE, CURRENT_DATE + INTERVAL '31 days');
