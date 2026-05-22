-- ============================================
-- CATEGORIAS PARA RESTAURANTES
-- Copie apenas os comandos das categorias que deseja
-- ============================================

-- ============================================
-- COMO USAR:
-- 1. Copie o INSERT da categoria desejada
-- 2. Cole no SQL Editor do Supabase
-- 3. Execute o comando
-- 
-- Ou copie um bloco inteiro (ex: todas de Fast Food)
-- ============================================


-- ============================================
-- PROMOCOES E DESTAQUES
-- ============================================

-- Promocoes do Dia
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Promocoes', 'promo', 1, true);

-- Mais Vendidos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Mais Vendidos', 'star', 2, true);

-- Combos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Combos', 'combo', 3, true);


-- ============================================
-- FAST FOOD / LANCHES
-- ============================================

-- Hamburguers
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Hamburguers', 'burger', 10, true);

-- Sanduiches
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sanduiches', 'sandwich', 11, true);

-- Hot Dogs
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Hot Dogs', 'hotdog', 12, true);

-- Batatas Fritas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Batatas Fritas', 'fries', 13, true);

-- Tacos e Burritos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Tacos e Burritos', 'tacos', 14, true);

-- Wraps
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Wraps', 'tacos', 15, true);


-- ============================================
-- PIZZARIA
-- ============================================

-- Pizzas Tradicionais
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pizzas Tradicionais', 'pizza', 20, true);

-- Pizzas Especiais
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pizzas Especiais', 'pizza', 21, true);

-- Pizzas Doces
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pizzas Doces', 'pizza', 22, true);

-- Calzones
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Calzones', 'pizza', 23, true);

-- Esfihas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Esfihas', 'pizza', 24, true);


-- ============================================
-- COMIDA ITALIANA
-- ============================================

-- Massas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Massas', 'pasta', 30, true);

-- Lasanhas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Lasanhas', 'italian', 31, true);

-- Risotos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Risotos', 'rice', 32, true);

-- Nhoques
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Nhoques', 'pasta', 33, true);

-- Raviolis
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Raviolis', 'italian', 34, true);


-- ============================================
-- COMIDA JAPONESA
-- ============================================

-- Sushis
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sushis', 'sushi', 40, true);

-- Sashimis
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sashimis', 'sushi', 41, true);

-- Temakis
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Temakis', 'sushi', 42, true);

-- Hot Rolls
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Hot Rolls', 'sushi', 43, true);

-- Uramakis
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Uramakis', 'sushi', 44, true);

-- Combinados
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Combinados', 'sushi', 45, true);

-- Pratos Quentes Japoneses
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pratos Quentes', 'japanese', 46, true);

-- Yakisoba
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Yakisoba', 'noodles', 47, true);

-- Guiozas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Guiozas', 'asian', 48, true);


-- ============================================
-- COMIDA CHINESA
-- ============================================

-- Pratos Chineses
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pratos Chineses', 'chinese', 50, true);

-- Chop Suey
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Chop Suey', 'noodles', 51, true);

-- Frango Xadrez
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Frango Xadrez', 'chinese', 52, true);

-- Rolinho Primavera
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Rolinho Primavera', 'asian', 53, true);

-- Arroz Chop Suey
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Arroz Chop Suey', 'rice', 54, true);


-- ============================================
-- COMIDA COREANA
-- ============================================

-- Pratos Coreanos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pratos Coreanos', 'asian', 55, true);

-- Korean BBQ
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Korean BBQ', 'bbq', 56, true);


-- ============================================
-- COMIDA TAILANDESA
-- ============================================

-- Pratos Tailandeses
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pratos Tailandeses', 'asian', 57, true);

-- Pad Thai
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pad Thai', 'noodles', 58, true);


-- ============================================
-- COMIDA ARABE
-- ============================================

-- Pratos Arabes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pratos Arabes', 'arabian', 60, true);

-- Esfihas Arabes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Esfihas', 'arabian', 61, true);

-- Quibes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Quibes', 'arabian', 62, true);

-- Shawarma
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Shawarma', 'arabian', 63, true);

-- Falafel
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Falafel', 'arabian', 64, true);

-- Kafta
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Kafta', 'arabian', 65, true);

-- Homus e Pastas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Homus e Pastas', 'arabian', 66, true);


-- ============================================
-- COMIDA INDIANA
-- ============================================

-- Pratos Indianos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pratos Indianos', 'indian', 70, true);

-- Curry
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Curry', 'indian', 71, true);

-- Naan
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Naan', 'indian', 72, true);

-- Tandoori
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Tandoori', 'indian', 73, true);


-- ============================================
-- COMIDA MEXICANA
-- ============================================

-- Pratos Mexicanos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pratos Mexicanos', 'tacos', 75, true);

-- Nachos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Nachos', 'tacos', 76, true);

-- Quesadillas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Quesadillas', 'tacos', 77, true);

-- Enchiladas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Enchiladas', 'tacos', 78, true);

-- Guacamole
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Guacamole', 'vegetarian', 79, true);


-- ============================================
-- CHURRASCO E CARNES
-- ============================================

-- Carnes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Carnes', 'meat', 80, true);

-- Churrasco
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Churrasco', 'bbq', 81, true);

-- Picanha
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Picanha', 'steak', 82, true);

-- Costela
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Costela', 'bbq', 83, true);

-- Espetinhos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Espetinhos', 'bbq', 84, true);

-- Grelhados
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Grelhados', 'grill', 85, true);


-- ============================================
-- FRANGOS
-- ============================================

-- Frangos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Frangos', 'chicken', 90, true);

-- Frango Frito
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Frango Frito', 'chicken', 91, true);

-- Frango Assado
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Frango Assado', 'chicken', 92, true);

-- Frango Grelhado
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Frango Grelhado', 'chicken', 93, true);

-- Nuggets
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Nuggets', 'chicken', 94, true);


-- ============================================
-- FRUTOS DO MAR
-- ============================================

-- Frutos do Mar
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Frutos do Mar', 'seafood', 100, true);

-- Peixes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Peixes', 'fish', 101, true);

-- Camaroes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Camaroes', 'shrimp', 102, true);

-- Lagosta
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Lagosta', 'crab', 103, true);

-- Mariscos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Mariscos', 'seafood', 104, true);

-- Moquecas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Moquecas', 'stew', 105, true);


-- ============================================
-- COMIDA BRASILEIRA
-- ============================================

-- Pratos Brasileiros
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pratos Brasileiros', 'meal', 110, true);

-- Feijoada
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Feijoada', 'stew', 111, true);

-- Pratos Feitos (PF)
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pratos Feitos', 'lunch', 112, true);

-- Marmitas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Marmitas', 'meal', 113, true);

-- Executivos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Executivos', 'lunch', 114, true);

-- Tropeiro
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Tropeiro', 'meal', 115, true);

-- Baiao de Dois
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Baiao de Dois', 'rice', 116, true);

-- Galinhada
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Galinhada', 'chicken', 117, true);


-- ============================================
-- SOPAS E CALDOS
-- ============================================

-- Sopas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sopas', 'soup', 120, true);

-- Caldos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Caldos', 'soup', 121, true);

-- Cremes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Cremes', 'soup', 122, true);

-- Canja
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Canja', 'soup', 123, true);


-- ============================================
-- SALADAS E SAUDAVEIS
-- ============================================

-- Saladas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Saladas', 'salad', 130, true);

-- Bowls Saudaveis
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Bowls', 'healthy', 131, true);

-- Fit
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Fit', 'healthy', 132, true);

-- Low Carb
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Low Carb', 'healthy', 133, true);

-- Vegano
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Vegano', 'vegan', 134, true);

-- Vegetariano
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Vegetariano', 'vegetarian', 135, true);

-- Sem Gluten
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sem Gluten', 'healthy', 136, true);

-- Organicos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Organicos', 'vegan', 137, true);


-- ============================================
-- ACAI E FRUTAS
-- ============================================

-- Acai
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Acai', 'fruit', 140, true);

-- Tigelas de Frutas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Tigelas de Frutas', 'fruit', 141, true);

-- Vitaminas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Vitaminas', 'fruit', 142, true);


-- ============================================
-- CAFE DA MANHA E PADARIA
-- ============================================

-- Cafe da Manha
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Cafe da Manha', 'breakfast', 150, true);

-- Paes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Paes', 'bread', 151, true);

-- Paes de Queijo
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Paes de Queijo', 'cheese', 152, true);

-- Croissants
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Croissants', 'bakery', 153, true);

-- Torradas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Torradas', 'bread', 154, true);

-- Panquecas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Panquecas', 'breakfast', 155, true);

-- Waffles
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Waffles', 'breakfast', 156, true);

-- Ovos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Ovos', 'breakfast', 157, true);

-- Tapiocas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Tapiocas', 'breakfast', 158, true);

-- Crepes Salgados
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Crepes Salgados', 'breakfast', 159, true);


-- ============================================
-- DOCES E SOBREMESAS
-- ============================================

-- Sobremesas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sobremesas', 'dessert', 160, true);

-- Bolos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Bolos', 'cake', 161, true);

-- Tortas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Tortas', 'cake', 162, true);

-- Brownies
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Brownies', 'dessert', 163, true);

-- Cheesecakes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Cheesecakes', 'cake', 164, true);

-- Pudins
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Pudins', 'dessert', 165, true);

-- Mousses
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Mousses', 'dessert', 166, true);

-- Pavês
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Paves', 'dessert', 167, true);

-- Brigadeiros
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Brigadeiros', 'candy', 168, true);

-- Trufas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Trufas', 'candy', 169, true);

-- Donuts
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Donuts', 'donut', 170, true);

-- Cookies
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Cookies', 'cookie', 171, true);

-- Cupcakes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Cupcakes', 'cupcake', 172, true);

-- Crepes Doces
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Crepes Doces', 'dessert', 173, true);

-- Churros
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Churros', 'candy', 174, true);

-- Petit Gateau
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Petit Gateau', 'cake', 175, true);


-- ============================================
-- SORVETES E GELADOS
-- ============================================

-- Sorvetes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sorvetes', 'icecream', 180, true);

-- Milkshakes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Milkshakes', 'icecream', 181, true);

-- Sundaes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sundaes', 'icecream', 182, true);

-- Frozen
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Frozen', 'icecream', 183, true);

-- Paletas Mexicanas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Paletas Mexicanas', 'icecream', 184, true);


-- ============================================
-- BEBIDAS
-- ============================================

-- Bebidas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Bebidas', 'drink', 190, true);

-- Refrigerantes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Refrigerantes', 'soda', 191, true);

-- Sucos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sucos', 'juice', 192, true);

-- Sucos Naturais
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Sucos Naturais', 'fruit', 193, true);

-- Aguas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Aguas', 'drink', 194, true);

-- Chas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Chas', 'coffee', 195, true);

-- Cafes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Cafes', 'coffee', 196, true);

-- Cappuccinos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Cappuccinos', 'coffee', 197, true);

-- Chocolate Quente
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Chocolate Quente', 'coffee', 198, true);

-- Smoothies
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Smoothies', 'fruit', 199, true);


-- ============================================
-- BEBIDAS ALCOOLICAS
-- ============================================

-- Cervejas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Cervejas', 'beer', 200, true);

-- Vinhos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Vinhos', 'wine', 201, true);

-- Drinks
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Drinks', 'drink', 202, true);

-- Caipirinhas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Caipirinhas', 'drink', 203, true);

-- Destilados
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Destilados', 'drink', 204, true);

-- Coqueteis
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Coqueteis', 'drink', 205, true);

-- Chopps
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Chopps', 'beer', 206, true);


-- ============================================
-- PORCOES E ENTRADAS
-- ============================================

-- Porcoes
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Porcoes', 'fries', 210, true);

-- Entradas
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Entradas', 'meal', 211, true);

-- Petiscos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Petiscos', 'fries', 212, true);

-- Aperitivos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Aperitivos', 'meal', 213, true);

-- Tiras de Frango
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Tiras de Frango', 'chicken', 214, true);

-- Aneis de Cebola
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Aneis de Cebola', 'fries', 215, true);


-- ============================================
-- ACOMPANHAMENTOS
-- ============================================

-- Acompanhamentos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Acompanhamentos', 'meal', 220, true);

-- Arroz
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Arroz', 'rice', 221, true);

-- Feijao
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Feijao', 'stew', 222, true);

-- Farofa
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Farofa', 'meal', 223, true);

-- Vinagrete
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Vinagrete', 'salad', 224, true);

-- Molhos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Molhos', 'meal', 225, true);


-- ============================================
-- MENU KIDS
-- ============================================

-- Menu Infantil
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Menu Infantil', 'kids', 230, true);

-- Kids Lanches
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Kids Lanches', 'kids', 231, true);

-- Kids Pratos
INSERT INTO categories (name, icon, sort_order, is_active) 
VALUES ('Kids Pratos', 'kids', 232, true);


-- ============================================
-- FIM DAS CATEGORIAS
-- ============================================

-- ============================================
-- EXEMPLO: COMO USAR CATEGORIAS ESPECIFICAS
-- 
-- Para uma HAMBURGUERIA, copie:
-- - Promocoes
-- - Mais Vendidos  
-- - Combos
-- - Hamburguers
-- - Sanduiches
-- - Batatas Fritas
-- - Porcoes
-- - Bebidas
-- - Milkshakes
-- - Sobremesas
--
-- Para uma PIZZARIA, copie:
-- - Promocoes
-- - Pizzas Tradicionais
-- - Pizzas Especiais
-- - Pizzas Doces
-- - Calzones
-- - Esfihas
-- - Bebidas
-- - Sobremesas
--
-- Para um RESTAURANTE JAPONES, copie:
-- - Promocoes
-- - Combinados
-- - Sushis
-- - Sashimis
-- - Temakis
-- - Hot Rolls
-- - Uramakis
-- - Pratos Quentes
-- - Yakisoba
-- - Guiozas
-- - Bebidas
-- - Sobremesas
-- ============================================
