-- SQL para reforçar a segurança do banco antes do deploy oficial

-- 1. Tabela de Doações
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Permitir que qualquer pessoa (anon) veja as doações (necessário para o Dash)
CREATE POLICY "Permitir leitura pública" ON donations 
FOR SELECT USING (true);

-- Permitir que qualquer pessoa (anon) cadastre novas doações (necessário para o Cadastro)
CREATE POLICY "Permitir inserção pública" ON donations
FOR INSERT WITH CHECK (true);

-- Permitir que qualquer pessoa (anon) edite doações (necessário para a Lista de Doações)
CREATE POLICY "Permitir edição pública" ON donations
FOR UPDATE USING (true) WITH CHECK (true);

-- Permitir que qualquer pessoa (anon) exclua doações (necessário para a Lista de Doações)
CREATE POLICY "Permitir exclusão pública" ON donations
FOR DELETE USING (true);


-- 2. Tabela de Unidades
ALTER TABLE units ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública das unidades (nomes das escolas/cursos)
CREATE POLICY "Permitir leitura pública unidades" ON units 
FOR SELECT USING (true);


-- 3. Tabela de Configurações (Meta, datas)
ALTER TABLE campaign_settings ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública das metas e datas
CREATE POLICY "Permitir leitura pública config" ON campaign_settings
FOR SELECT USING (true);

-- Permitir atualização da meta/datas (necessário para o ajuste de meta no Cadastro)
CREATE POLICY "Permitir atualização config" ON campaign_settings
FOR UPDATE USING (true) WITH CHECK (true);
