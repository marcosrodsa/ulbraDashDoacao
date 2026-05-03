# Task 1: Create Supabase `campaign_settings` Table - Implementation Guide

## Overview
This task creates a new Supabase table to store campaign configuration (meta goal, dates) for the Maio Solidário ULBRA Dashboard.

## Project Context
- **Project:** Maio Solidário ULBRA Dashboard (donation tracking in real-time)
- **Supabase Instance:** https://supabase.ulbraDashDoacao.site
- **Current Tables:** `donations`, `units`
- **New Table:** `campaign_settings`

## Table Schema

### `campaign_settings` Table Structure

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `id` | UUID | `gen_random_uuid()` | Primary key |
| `campaign_name` | VARCHAR(255) | 'Maio Solidário 2026' | Campaign display name |
| `meta_doacoes` | INT | 500 | Goal/target number of donations |
| `data_inicio` | DATE | CURRENT_DATE | Campaign start date |
| `data_fim` | DATE | CURRENT_DATE + 31 days | Campaign end date |
| `created_by` | UUID | NULL | User who created the configuration |
| `updated_at` | TIMESTAMP | NOW() | Last update timestamp |
| `created_at` | TIMESTAMP | NOW() | Creation timestamp |

## Implementation Steps

### Step 1: Access Supabase Console
1. Navigate to https://supabase.com/dashboard
2. Select the Maio Solidário project
3. Go to **SQL Editor** from the left sidebar

### Step 2: Execute the SQL Migration
Copy and execute the following SQL in the Supabase SQL Editor:

```sql
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
```

### Step 3: Verify Table Creation

1. In the Supabase console, go to **Table Editor**
2. Look for `campaign_settings` in the table list
3. Verify:
   - Table exists with all columns
   - One default row exists with:
     - `campaign_name`: 'Maio Solidário 2026'
     - `meta_doacoes`: 500
     - `data_inicio`: today's date
     - `data_fim`: 31 days from today
   - RLS policies are enabled (check Policies tab for the table)

### Step 4: Create Git Commit

After verifying the table exists in Supabase, commit this change:

```bash
git add -A
git commit -m "db: add campaign_settings table to Supabase"
```

## Table Features

### Row Level Security (RLS)
- **SELECT Policy:** All authenticated users can read campaign settings
- **UPDATE Policy:** All authenticated users can update campaign settings
- This allows the frontend to fetch and update campaign configuration

### Default Values
- The table comes with one default row pre-populated
- Default campaign name: "Maio Solidário 2026"
- Default meta (goal): 500 donations
- Start and end dates are auto-set to current date ±31 days

## Next Steps (Task 2+)

After this table is created, you'll implement:
1. **Task 2:** Create `useCampaignSettings` custom hook for React components to fetch/update this table
2. **Task 8:** Create Meta Config Panel in Cadastro page for admins to modify `campaign_settings`
3. **Task 5:** Create MetaProjection component that uses `meta_doacoes` to calculate progress

## Files Involved

- **Migration SQL:** `/maio-solidario/supabase/migrations/001_create_campaign_settings.sql`
- **Supabase Instance:** https://supabase.ulbraDashDoacao.site
- **Frontend Hook (Task 2):** `/maio-solidario/src/hooks/useCampaignSettings.js`
- **Admin Panel (Task 8):** `/maio-solidario/src/pages/Cadastro.jsx`

## Rollback (if needed)

If you need to rollback, run the following SQL in the Supabase console:

```sql
-- Drop the table (cascades to all dependent objects)
DROP TABLE IF EXISTS campaign_settings CASCADE;
```

## Expected Outcome

✓ Table `campaign_settings` created with proper schema
✓ RLS policies configured
✓ 1 default row inserted
✓ Git commit recorded
✓ Ready for Task 2: Custom Hook Implementation
