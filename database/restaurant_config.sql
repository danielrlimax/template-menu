-- ============================================
-- CONFIGURACAO DO RESTAURANTE
-- Execute este SQL para configurar seu restaurante
-- ============================================

-- IMPORTANTE: Edite os valores abaixo antes de executar!

-- Primeiro, limpa configuracao existente (se houver)
DELETE FROM restaurant_config;

-- Insere a configuracao do seu restaurante
INSERT INTO restaurant_config (
    name,
    phone,
    whatsapp,
    cep,
    address,
    opening_hours,
    banner_image,
    logo_text
) VALUES (
    'Nome do Seu Restaurante',           -- Mude para o nome do seu restaurante
    '(11) 99999-9999',                   -- Seu telefone
    '5511999999999',                      -- WhatsApp SEM caracteres especiais (apenas numeros com DDI+DDD)
    '01001000',                           -- CEP do estabelecimento (usado para calcular frete)
    'Rua Exemplo, 123 - Bairro, Cidade - UF',  -- Endereco completo
    'Seg a Dom: 11h - 23h',              -- Horario de funcionamento
    'https://images.pexels.com/photos/15007045/pexels-photo-15007045.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',  -- URL da imagem do banner (ou deixe vazio)
    'S&B'                                 -- Sigla/Logo (2-3 letras)
);

-- ============================================
-- VERIFICAR SE FOI INSERIDO
-- ============================================
-- SELECT * FROM restaurant_config;


-- ============================================
-- EXEMPLOS DE CONFIGURACOES
-- ============================================

-- EXEMPLO 1: Hamburgueria
/*
INSERT INTO restaurant_config (name, phone, whatsapp, cep, address, opening_hours, banner_image, logo_text)
VALUES (
    'Burger House',
    '(11) 98765-4321',
    '5511987654321',
    '04567000',
    'Av. Paulista, 1000 - Bela Vista, Sao Paulo - SP',
    'Ter a Dom: 18h - 00h',
    'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    'BH'
);
*/

-- EXEMPLO 2: Pizzaria
/*
INSERT INTO restaurant_config (name, phone, whatsapp, cep, address, opening_hours, banner_image, logo_text)
VALUES (
    'Pizzaria Napoli',
    '(21) 99876-5432',
    '5521998765432',
    '22041080',
    'Rua Barata Ribeiro, 500 - Copacabana, Rio de Janeiro - RJ',
    'Todos os dias: 18h - 01h',
    'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
    'PN'
);
*/

-- EXEMPLO 3: Restaurante Japones
/*
INSERT INTO restaurant_config (name, phone, whatsapp, cep, address, opening_hours, banner_image, logo_text)
VALUES (
    'Sushi Zen',
    '(11) 91234-5678',
    '5511912345678',
    '01310100',
    'Rua Augusta, 2000 - Consolacao, Sao Paulo - SP',
    'Seg a Sab: 12h - 15h / 19h - 23h',
    'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    'SZ'
);
*/

-- ============================================
-- COMO ATUALIZAR A CONFIGURACAO
-- ============================================

-- Para atualizar apenas o WhatsApp:
-- UPDATE restaurant_config SET whatsapp = '5511999998888';

-- Para atualizar nome e horario:
-- UPDATE restaurant_config SET name = 'Novo Nome', opening_hours = 'Seg a Sex: 11h - 22h';

-- Para atualizar o banner:
-- UPDATE restaurant_config SET banner_image = 'https://sua-url-de-imagem.jpg';
