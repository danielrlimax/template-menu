-- ============================================
-- CARDAPIO DIGITAL - DADOS INICIAIS (SEED)
-- Execute apos o schema.sql
-- ============================================

-- ============================================
-- CONFIGURACAO DO RESTAURANTE
-- ============================================
INSERT INTO restaurant_config (name, phone, whatsapp, cep, address, opening_hours, banner_image, logo_text)
VALUES (
    'Sabor & Brasa',
    '(11) 99999-9999',
    '5511999999999',
    '01001000',
    'Praca da Se, 100 - Se, Sao Paulo - SP',
    'Seg a Dom: 11h - 23h',
    'https://images.pexels.com/photos/15007045/pexels-photo-15007045.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    'S&B'
);

-- ============================================
-- CATEGORIAS
-- ============================================
INSERT INTO categories (id, name, icon, sort_order) VALUES
    ('c1000000-0000-0000-0000-000000000001', 'Hamburguers', 'burger', 1),
    ('c1000000-0000-0000-0000-000000000002', 'Pizzas', 'pizza', 2),
    ('c1000000-0000-0000-0000-000000000003', 'Bebidas', 'drink', 3),
    ('c1000000-0000-0000-0000-000000000004', 'Sobremesas', 'dessert', 4);

-- ============================================
-- PRODUTOS - HAMBURGUERS
-- ============================================
INSERT INTO products (id, name, description, price, image_url, category_id, sort_order) VALUES
    (
        'p1000000-0000-0000-0000-000000000001',
        'Smash Burger Classico',
        'Dois blends de 90g smash na chapa, queijo cheddar derretido, alface americana crocante, tomate, cebola roxa e molho especial da casa no pao brioche artesanal.',
        32.90,
        'https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000001',
        1
    ),
    (
        'p1000000-0000-0000-0000-000000000002',
        'Burger Bacon Supreme',
        'Blend bovino de 180g, fatias generosas de bacon defumado, queijo prato, cebola caramelizada no shoyu e maionese trufada. Servido no pao australiano.',
        38.90,
        'https://images.pexels.com/photos/14678998/pexels-photo-14678998.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000001',
        2
    ),
    (
        'p1000000-0000-0000-0000-000000000003',
        'Chicken Burger Crispy',
        'File de frango empanado crocante, maionese de ervas, alface, tomate seco e queijo mussarela. Acompanha batata palha artesanal.',
        29.90,
        'https://images.pexels.com/photos/23106708/pexels-photo-23106708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000001',
        3
    ),
    (
        'p1000000-0000-0000-0000-000000000004',
        'Veggie Burger',
        'Hamburguer de grao-de-bico e quinoa, rucula fresca, tomate cereja, cebola roxa em picles e maionese vegana de manjericao. Pao integral artesanal.',
        28.90,
        NULL, -- Produto SEM imagem para teste
        'c1000000-0000-0000-0000-000000000001',
        4
    ),
    (
        'p1000000-0000-0000-0000-000000000005',
        'Double Smash Especial',
        'Tres blends smash de 80g, queijo americano, picles artesanal, ketchup, mostarda e cebola crispy no pao potato bun.',
        42.90,
        'https://images.pexels.com/photos/20722061/pexels-photo-20722061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000001',
        5
    );

-- ============================================
-- PRODUTOS - PIZZAS
-- ============================================
INSERT INTO products (id, name, description, price, image_url, category_id, sort_order) VALUES
    (
        'p1000000-0000-0000-0000-000000000006',
        'Pizza Margherita',
        'Molho de tomates San Marzano, mussarela de bufala fresca, manjericao fresco e azeite extra virgem. Massa artesanal fermentada por 72h.',
        49.90,
        'https://images.pexels.com/photos/11111603/pexels-photo-11111603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000002',
        1
    ),
    (
        'p1000000-0000-0000-0000-000000000007',
        'Pizza Calabresa Especial',
        'Calabresa artesanal fatiada, cebola roxa, azeitonas pretas, oregano e mussarela. Massa fina e crocante assada em forno a lenha.',
        45.90,
        'https://images.pexels.com/photos/9792476/pexels-photo-9792476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000002',
        2
    ),
    (
        'p1000000-0000-0000-0000-000000000008',
        'Pizza Pepperoni Premium',
        'Generosas fatias de pepperoni importado, mussarela, molho de tomate italiano e finalizado com parmesao ralado e flocos de pimenta.',
        54.90,
        'https://images.pexels.com/photos/30504705/pexels-photo-30504705.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000002',
        3
    ),
    (
        'p1000000-0000-0000-0000-000000000009',
        'Pizza Quatro Queijos',
        'Mussarela, gorgonzola, parmesao e provolone derretidos harmoniosamente sobre molho de tomate caseiro. Finalizada com mel e nozes.',
        52.90,
        NULL, -- Produto SEM imagem para teste
        'c1000000-0000-0000-0000-000000000002',
        4
    );

-- ============================================
-- PRODUTOS - BEBIDAS
-- ============================================
INSERT INTO products (id, name, description, price, image_url, category_id, sort_order) VALUES
    (
        'p1000000-0000-0000-0000-000000000010',
        'Refrigerante Lata 350ml',
        'Coca-Cola, Guarana Antarctica, Fanta Laranja ou Sprite. Bem gelado para acompanhar seu pedido.',
        7.90,
        'https://images.pexels.com/photos/34405414/pexels-photo-34405414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000003',
        1
    ),
    (
        'p1000000-0000-0000-0000-000000000011',
        'Suco Natural 500ml',
        'Suco natural feito na hora. Sabores: Laranja, Limao, Maracuja, Morango ou Abacaxi com hortela.',
        12.90,
        'https://images.pexels.com/photos/28944485/pexels-photo-28944485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000003',
        2
    ),
    (
        'p1000000-0000-0000-0000-000000000012',
        'Agua Mineral 500ml',
        'Agua mineral sem gas ou com gas. Servida bem gelada.',
        4.90,
        NULL, -- Produto SEM imagem para teste
        'c1000000-0000-0000-0000-000000000003',
        3
    );

-- ============================================
-- PRODUTOS - SOBREMESAS
-- ============================================
INSERT INTO products (id, name, description, price, image_url, category_id, sort_order) VALUES
    (
        'p1000000-0000-0000-0000-000000000013',
        'Brownie com Sorvete',
        'Brownie de chocolate belga quentinho, servido com bola de sorvete de creme, calda de chocolate e chantilly. Uma explosao de sabor.',
        22.90,
        'https://images.pexels.com/photos/8498186/pexels-photo-8498186.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000004',
        1
    ),
    (
        'p1000000-0000-0000-0000-000000000014',
        'Bolo de Chocolate',
        'Fatia generosa de bolo de chocolate com cobertura de ganache e recheio de brigadeiro gourmet. Acompanha chantilly.',
        19.90,
        'https://images.pexels.com/photos/34718258/pexels-photo-34718258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000004',
        2
    ),
    (
        'p1000000-0000-0000-0000-000000000015',
        'Petit Gateau',
        'Bolinho de chocolate com centro derretido, acompanhado de sorvete de baunilha artesanal e frutas vermelhas frescas.',
        26.90,
        'https://images.pexels.com/photos/13878326/pexels-photo-13878326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'c1000000-0000-0000-0000-000000000004',
        3
    );

-- ============================================
-- ADICIONAIS - HAMBURGUERS
-- ============================================
INSERT INTO product_addons (product_id, name, price) VALUES
    -- Smash Burger Classico
    ('p1000000-0000-0000-0000-000000000001', 'Bacon crocante', 5.00),
    ('p1000000-0000-0000-0000-000000000001', 'Queijo cheddar extra', 4.00),
    ('p1000000-0000-0000-0000-000000000001', 'Ovo frito', 3.00),
    ('p1000000-0000-0000-0000-000000000001', 'Onion rings (4un)', 7.00),
    
    -- Burger Bacon Supreme
    ('p1000000-0000-0000-0000-000000000002', 'Bacon extra', 6.00),
    ('p1000000-0000-0000-0000-000000000002', 'Blend extra 90g', 10.00),
    ('p1000000-0000-0000-0000-000000000002', 'Cheddar extra', 4.00),
    ('p1000000-0000-0000-0000-000000000002', 'Jalapeno', 3.50),
    
    -- Chicken Burger
    ('p1000000-0000-0000-0000-000000000003', 'Catupiry original', 5.00),
    ('p1000000-0000-0000-0000-000000000003', 'Bacon', 5.00),
    ('p1000000-0000-0000-0000-000000000003', 'Queijo cheddar', 4.00),
    
    -- Veggie Burger
    ('p1000000-0000-0000-0000-000000000004', 'Guacamole', 6.00),
    ('p1000000-0000-0000-0000-000000000004', 'Cogumelos salteados', 5.50),
    ('p1000000-0000-0000-0000-000000000004', 'Queijo vegano', 5.00),
    
    -- Double Smash
    ('p1000000-0000-0000-0000-000000000005', 'Blend extra', 10.00),
    ('p1000000-0000-0000-0000-000000000005', 'Bacon', 5.00),
    ('p1000000-0000-0000-0000-000000000005', 'Queijo extra', 4.00),
    ('p1000000-0000-0000-0000-000000000005', 'Molho barbecue', 2.00);

-- ============================================
-- ADICIONAIS - PIZZAS
-- ============================================
INSERT INTO product_addons (product_id, name, price) VALUES
    -- Margherita
    ('p1000000-0000-0000-0000-000000000006', 'Borda recheada cheddar', 8.00),
    ('p1000000-0000-0000-0000-000000000006', 'Borda recheada catupiry', 8.00),
    ('p1000000-0000-0000-0000-000000000006', 'Mussarela extra', 6.00),
    
    -- Calabresa
    ('p1000000-0000-0000-0000-000000000007', 'Borda recheada cheddar', 8.00),
    ('p1000000-0000-0000-0000-000000000007', 'Catupiry extra', 6.00),
    ('p1000000-0000-0000-0000-000000000007', 'Bacon', 7.00),
    
    -- Pepperoni
    ('p1000000-0000-0000-0000-000000000008', 'Borda recheada', 8.00),
    ('p1000000-0000-0000-0000-000000000008', 'Pepperoni extra', 9.00),
    ('p1000000-0000-0000-0000-000000000008', 'Mussarela extra', 6.00),
    
    -- Quatro Queijos
    ('p1000000-0000-0000-0000-000000000009', 'Borda recheada', 8.00),
    ('p1000000-0000-0000-0000-000000000009', 'Queijo extra', 6.00),
    ('p1000000-0000-0000-0000-000000000009', 'Mel trufa', 5.00);

-- ============================================
-- ADICIONAIS - BEBIDAS
-- ============================================
INSERT INTO product_addons (product_id, name, price) VALUES
    ('p1000000-0000-0000-0000-000000000011', 'Acucar extra', 0),
    ('p1000000-0000-0000-0000-000000000011', 'Sem acucar', 0);

-- ============================================
-- ADICIONAIS - SOBREMESAS
-- ============================================
INSERT INTO product_addons (product_id, name, price) VALUES
    -- Brownie
    ('p1000000-0000-0000-0000-000000000013', 'Bola de sorvete extra', 5.00),
    ('p1000000-0000-0000-0000-000000000013', 'Calda de caramelo', 3.00),
    ('p1000000-0000-0000-0000-000000000013', 'Granulado', 2.00),
    
    -- Bolo de Chocolate
    ('p1000000-0000-0000-0000-000000000014', 'Chantilly extra', 3.00),
    ('p1000000-0000-0000-0000-000000000014', 'Calda de morango', 3.50),
    
    -- Petit Gateau
    ('p1000000-0000-0000-0000-000000000015', 'Bola de sorvete extra', 5.00),
    ('p1000000-0000-0000-0000-000000000015', 'Calda de frutas vermelhas', 4.00);

-- ============================================
-- FIM DO SEED
-- ============================================
