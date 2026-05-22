-- ============================================
-- ATUALIZACAO: Secoes de Adicionais (estilo iFood)
-- Execute este SQL no Supabase
-- ============================================

-- Criar tabela de secoes de adicionais
CREATE TABLE IF NOT EXISTS addon_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_required BOOLEAN DEFAULT FALSE,
    min_quantity INTEGER DEFAULT 0,
    max_quantity INTEGER DEFAULT 10,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Atualizar tabela de adicionais para referenciar secao
ALTER TABLE product_addons 
ADD COLUMN IF NOT EXISTS section_id UUID REFERENCES addon_sections(id) ON DELETE CASCADE;

-- Indices
CREATE INDEX IF NOT EXISTS idx_addon_sections_product ON addon_sections(product_id);
CREATE INDEX IF NOT EXISTS idx_product_addons_section ON product_addons(section_id);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_addon_sections_updated_at ON addon_sections;
CREATE TRIGGER update_addon_sections_updated_at
    BEFORE UPDATE ON addon_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE addon_sections ENABLE ROW LEVEL SECURITY;

-- Policies para addon_sections
CREATE POLICY "Permitir leitura publica addon_sections"
ON addon_sections FOR SELECT
TO public
USING (true);

CREATE POLICY "Permitir insert para autenticados addon_sections"
ON addon_sections FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Permitir update para autenticados addon_sections"
ON addon_sections FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir delete para autenticados addon_sections"
ON addon_sections FOR DELETE
TO authenticated
USING (true);

-- Grants
GRANT SELECT ON addon_sections TO anon;
GRANT ALL ON addon_sections TO authenticated;
