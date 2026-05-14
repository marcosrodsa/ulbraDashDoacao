ALTER TABLE units ADD COLUMN IF NOT EXISTS display_name VARCHAR(255) NULL;

UPDATE units SET display_name = 'CEULM Manaus' WHERE name = 'Ulbra Manaus';
UPDATE units SET display_name = 'CEULP Palmas' WHERE name = 'Ulbra Palmas';
UPDATE units SET display_name = 'CEULS Santarém' WHERE name = 'Ulbra Santarém';
