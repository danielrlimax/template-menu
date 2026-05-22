-- ============================================
-- CORRECAO DAS POLICIES RLS
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- ============================================
-- REMOVER POLICIES ANTIGAS (se existirem)
-- ============================================

DROP POLICY IF EXISTS "restaurant_config_select_policy" ON restaurant_config;
DROP POLICY IF EXISTS "restaurant_config_insert_policy" ON restaurant_config;
DROP POLICY IF EXISTS "restaurant_config_update_policy" ON restaurant_config;
DROP POLICY IF EXISTS "restaurant_config_delete_policy" ON restaurant_config;

DROP POLICY IF EXISTS "categories_select_policy" ON categories;
DROP POLICY IF EXISTS "categories_insert_policy" ON categories;
DROP POLICY IF EXISTS "categories_update_policy" ON categories;
DROP POLICY IF EXISTS "categories_delete_policy" ON categories;

DROP POLICY IF EXISTS "products_select_policy" ON products;
DROP POLICY IF EXISTS "products_insert_policy" ON products;
DROP POLICY IF EXISTS "products_update_policy" ON products;
DROP POLICY IF EXISTS "products_delete_policy" ON products;

DROP POLICY IF EXISTS "product_addons_select_policy" ON product_addons;
DROP POLICY IF EXISTS "product_addons_insert_policy" ON product_addons;
DROP POLICY IF EXISTS "product_addons_update_policy" ON product_addons;
DROP POLICY IF EXISTS "product_addons_delete_policy" ON product_addons;

-- ============================================
-- NOVAS POLICIES: restaurant_config
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
-- NOVAS POLICIES: categories
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
-- NOVAS POLICIES: products
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
-- NOVAS POLICIES: product_addons
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
-- VERIFICAR SE RLS ESTA HABILITADO
-- ============================================

ALTER TABLE restaurant_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_addons ENABLE ROW LEVEL SECURITY;

-- ============================================
-- GRANT PERMISSIONS (importante!)
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
-- FIM DA CORRECAO
-- ============================================

-- Apos executar, teste com:
-- SELECT * FROM products LIMIT 5;
