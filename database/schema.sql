-- ============================================
-- CARDAPIO DIGITAL - SCHEMA DO BANCO DE DADOS
-- Para uso com Supabase (PostgreSQL)
-- ============================================

-- Habilitar extensao UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA: restaurant_config
-- Configuracoes gerais do restaurante
-- ============================================
CREATE TABLE IF NOT EXISTS restaurant_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    whatsapp VARCHAR(20) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    address TEXT,
    opening_hours VARCHAR(100),
    banner_image TEXT,
    logo_text VARCHAR(10),
    logo_image TEXT,
    primary_color VARCHAR(7) DEFAULT '#dc2626',
    secondary_color VARCHAR(7) DEFAULT '#16a34a',
    accent_color VARCHAR(7) DEFAULT '#f59e0b',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: categories
-- Categorias dos produtos
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) NOT NULL DEFAULT 'grid',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: products
-- Produtos do cardapio
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT, -- NULL se nao tiver imagem
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: product_addons
-- Adicionais dos produtos
-- ============================================
CREATE TABLE IF NOT EXISTS product_addons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDICES para melhor performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_sort ON products(sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_addons_product ON product_addons(product_id);

-- ============================================
-- FUNCAO: Atualizar updated_at automaticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS para updated_at
-- ============================================
DROP TRIGGER IF EXISTS update_restaurant_config_updated_at ON restaurant_config;
CREATE TRIGGER update_restaurant_config_updated_at
    BEFORE UPDATE ON restaurant_config
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_product_addons_updated_at ON product_addons;
CREATE TRIGGER update_product_addons_updated_at
    BEFORE UPDATE ON product_addons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE restaurant_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_addons ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES: restaurant_config
-- ============================================

-- Qualquer pessoa pode ler (SELECT)
CREATE POLICY "Permitir leitura publica restaurant_config"
ON restaurant_config FOR SELECT
TO public
USING (true);

-- Apenas usuarios logados podem inserir
CREATE POLICY "Permitir insert para autenticados restaurant_config"
ON restaurant_config FOR INSERT
TO authenticated
WITH CHECK (true);

-- Apenas usuarios logados podem atualizar
CREATE POLICY "Permitir update para autenticados restaurant_config"
ON restaurant_config FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Apenas usuarios logados podem deletar
CREATE POLICY "Permitir delete para autenticados restaurant_config"
ON restaurant_config FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- POLICIES: categories
-- ============================================

-- Qualquer pessoa pode ler
CREATE POLICY "Permitir leitura publica categories"
ON categories FOR SELECT
TO public
USING (true);

-- Apenas usuarios logados podem inserir
CREATE POLICY "Permitir insert para autenticados categories"
ON categories FOR INSERT
TO authenticated
WITH CHECK (true);

-- Apenas usuarios logados podem atualizar
CREATE POLICY "Permitir update para autenticados categories"
ON categories FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Apenas usuarios logados podem deletar
CREATE POLICY "Permitir delete para autenticados categories"
ON categories FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- POLICIES: products
-- ============================================

-- Qualquer pessoa pode ler
CREATE POLICY "Permitir leitura publica products"
ON products FOR SELECT
TO public
USING (true);

-- Apenas usuarios logados podem inserir
CREATE POLICY "Permitir insert para autenticados products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Apenas usuarios logados podem atualizar
CREATE POLICY "Permitir update para autenticados products"
ON products FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Apenas usuarios logados podem deletar
CREATE POLICY "Permitir delete para autenticados products"
ON products FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- POLICIES: product_addons
-- ============================================

-- Qualquer pessoa pode ler
CREATE POLICY "Permitir leitura publica product_addons"
ON product_addons FOR SELECT
TO public
USING (true);

-- Apenas usuarios logados podem inserir
CREATE POLICY "Permitir insert para autenticados product_addons"
ON product_addons FOR INSERT
TO authenticated
WITH CHECK (true);

-- Apenas usuarios logados podem atualizar
CREATE POLICY "Permitir update para autenticados product_addons"
ON product_addons FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Apenas usuarios logados podem deletar
CREATE POLICY "Permitir delete para autenticados product_addons"
ON product_addons FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Permissoes para role anon (usuarios nao logados)
GRANT SELECT ON restaurant_config TO anon;
GRANT SELECT ON categories TO anon;
GRANT SELECT ON products TO anon;
GRANT SELECT ON product_addons TO anon;

-- Permissoes para role authenticated (usuarios logados)
GRANT ALL ON restaurant_config TO authenticated;
GRANT ALL ON categories TO authenticated;
GRANT ALL ON products TO authenticated;
GRANT ALL ON product_addons TO authenticated;

-- ============================================
-- VIEW: produtos com categoria (para facilitar consultas)
-- ============================================
CREATE OR REPLACE VIEW products_with_category AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.image_url,
    p.category_id,
    p.is_active,
    p.sort_order,
    p.created_at,
    p.updated_at,
    c.name AS category_name,
    c.icon AS category_icon
FROM products p
INNER JOIN categories c ON p.category_id = c.id
WHERE p.is_active = TRUE AND c.is_active = TRUE
ORDER BY c.sort_order, p.sort_order, p.name;

-- ============================================
-- FIM DO SCHEMA
-- ============================================
