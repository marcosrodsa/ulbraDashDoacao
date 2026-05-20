-- Migration: Update category check constraint to include new categories
-- Added categories: escolar, outros

ALTER TABLE donations DROP CONSTRAINT IF EXISTS donations_category_check;

ALTER TABLE donations ADD CONSTRAINT donations_category_check 
CHECK (category IN ('alimentos', 'higiene', 'vestuario', 'pet', 'escolar', 'outros'));
