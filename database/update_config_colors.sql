-- ============================================
-- ATUALIZACAO: Adicionar campos de cores e logo
-- Execute este SQL no Supabase
-- ============================================

-- Adicionar novos campos na tabela restaurant_config
ALTER TABLE restaurant_config 
ADD COLUMN IF NOT EXISTS logo_image TEXT,
ADD COLUMN IF NOT EXISTS primary_color VARCHAR(7) DEFAULT '#dc2626',
ADD COLUMN IF NOT EXISTS secondary_color VARCHAR(7) DEFAULT '#16a34a',
ADD COLUMN IF NOT EXISTS accent_color VARCHAR(7) DEFAULT '#f59e0b';

-- Atualizar registros existentes com cores padrao
UPDATE restaurant_config 
SET 
  primary_color = COALESCE(primary_color, '#dc2626'),
  secondary_color = COALESCE(secondary_color, '#16a34a'),
  accent_color = COALESCE(accent_color, '#f59e0b')
WHERE primary_color IS NULL OR secondary_color IS NULL OR accent_color IS NULL;

-- ============================================
-- CORES PADRAO:
-- primary_color: #dc2626 (vermelho) - Botoes principais, destaques
-- secondary_color: #16a34a (verde) - Botao de finalizar pedido, WhatsApp
-- accent_color: #f59e0b (amarelo/laranja) - Badges, alertas
-- ============================================
