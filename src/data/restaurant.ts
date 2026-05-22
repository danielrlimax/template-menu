import { Category, Product, RestaurantConfig } from '../types';

export const restaurantConfig: RestaurantConfig = {
  name: 'Sabor & Brasa',
  phone: '(11) 99999-9999',
  whatsapp: '5511999999999',
  cep: '01001000',
  address: 'Praca da Se, 100 - Se, Sao Paulo - SP',
  openingHours: 'Seg a Dom: 11h - 23h',
  bannerImage: 'https://images.pexels.com/photos/15007045/pexels-photo-15007045.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  logoText: 'S&B',
  logoImage: '',
  primaryColor: '#dc2626',
  secondaryColor: '#16a34a',
  accentColor: '#f59e0b',
};

export const categories: Category[] = [
  { id: 'burgers', name: 'Hamburguers', icon: 'burger' },
  { id: 'pizzas', name: 'Pizzas', icon: 'pizza' },
  { id: 'bebidas', name: 'Bebidas', icon: 'drink' },
  { id: 'sobremesas', name: 'Sobremesas', icon: 'dessert' },
];

export const products: Product[] = [
  // HAMBURGUERS
  {
    id: 'burger-01',
    name: 'Smash Burger Classico',
    description: 'Dois blends de 90g smash na chapa, queijo cheddar derretido, alface americana crocante, tomate, cebola roxa e molho especial da casa no pao brioche artesanal.',
    price: 32.90,
    image: 'https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'burgers',
    addons: [
      { id: 'addon-b1', name: 'Bacon crocante', price: 5.00 },
      { id: 'addon-b2', name: 'Queijo cheddar extra', price: 4.00 },
      { id: 'addon-b3', name: 'Ovo frito', price: 3.00 },
      { id: 'addon-b4', name: 'Onion rings (4un)', price: 7.00 },
    ],
  },
  {
    id: 'burger-02',
    name: 'Burger Bacon Supreme',
    description: 'Blend bovino de 180g, fatias generosas de bacon defumado, queijo prato, cebola caramelizada no shoyu e maionese trufada. Servido no pao australiano.',
    price: 38.90,
    image: 'https://images.pexels.com/photos/14678998/pexels-photo-14678998.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'burgers',
    addons: [
      { id: 'addon-b5', name: 'Bacon extra', price: 6.00 },
      { id: 'addon-b6', name: 'Blend extra 90g', price: 10.00 },
      { id: 'addon-b7', name: 'Cheddar extra', price: 4.00 },
      { id: 'addon-b8', name: 'Jalapeno', price: 3.50 },
    ],
  },
  {
    id: 'burger-03',
    name: 'Chicken Burger Crispy',
    description: 'Filé de frango empanado crocante, maionese de ervas, alface, tomate seco e queijo mussarela. Acompanha batata palha artesanal.',
    price: 29.90,
    image: 'https://images.pexels.com/photos/23106708/pexels-photo-23106708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'burgers',
    addons: [
      { id: 'addon-b9', name: 'Catupiry original', price: 5.00 },
      { id: 'addon-b10', name: 'Bacon', price: 5.00 },
      { id: 'addon-b11', name: 'Queijo cheddar', price: 4.00 },
    ],
  },
  {
    id: 'burger-04',
    name: 'Veggie Burger',
    description: 'Hamburguer de grao-de-bico e quinoa, rucula fresca, tomate cereja, cebola roxa em picles e maionese vegana de manjericao. Pao integral artesanal.',
    price: 28.90,
    image: '', // Produto sem imagem para teste
    categoryId: 'burgers',
    addons: [
      { id: 'addon-b12', name: 'Guacamole', price: 6.00 },
      { id: 'addon-b13', name: 'Cogumelos salteados', price: 5.50 },
      { id: 'addon-b14', name: 'Queijo vegano', price: 5.00 },
    ],
  },
  {
    id: 'burger-05',
    name: 'Double Smash Especial',
    description: 'Tres blends smash de 80g, queijo americano, picles artesanal, ketchup, mostarda e cebola crispy no pao potato bun.',
    price: 42.90,
    image: 'https://images.pexels.com/photos/20722061/pexels-photo-20722061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'burgers',
    addons: [
      { id: 'addon-b15', name: 'Blend extra', price: 10.00 },
      { id: 'addon-b16', name: 'Bacon', price: 5.00 },
      { id: 'addon-b17', name: 'Queijo extra', price: 4.00 },
      { id: 'addon-b18', name: 'Molho barbecue', price: 2.00 },
    ],
  },

  // PIZZAS
  {
    id: 'pizza-01',
    name: 'Pizza Margherita',
    description: 'Molho de tomates San Marzano, mussarela de bufala fresca, manjericao fresco e azeite extra virgem. Massa artesanal fermentada por 72h.',
    price: 49.90,
    image: 'https://images.pexels.com/photos/11111603/pexels-photo-11111603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'pizzas',
    addons: [
      { id: 'addon-p1', name: 'Borda recheada cheddar', price: 8.00 },
      { id: 'addon-p2', name: 'Borda recheada catupiry', price: 8.00 },
      { id: 'addon-p3', name: 'Mussarela extra', price: 6.00 },
    ],
  },
  {
    id: 'pizza-02',
    name: 'Pizza Calabresa Especial',
    description: 'Calabresa artesanal fatiada, cebola roxa, azeitonas pretas, oregano e mussarela. Massa fina e crocante assada em forno a lenha.',
    price: 45.90,
    image: 'https://images.pexels.com/photos/9792476/pexels-photo-9792476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'pizzas',
    addons: [
      { id: 'addon-p4', name: 'Borda recheada cheddar', price: 8.00 },
      { id: 'addon-p5', name: 'Catupiry extra', price: 6.00 },
      { id: 'addon-p6', name: 'Bacon', price: 7.00 },
    ],
  },
  {
    id: 'pizza-03',
    name: 'Pizza Pepperoni Premium',
    description: 'Generosas fatias de pepperoni importado, mussarela, molho de tomate italiano e finalizado com parmesao ralado e flocos de pimenta.',
    price: 54.90,
    image: 'https://images.pexels.com/photos/30504705/pexels-photo-30504705.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'pizzas',
    addons: [
      { id: 'addon-p7', name: 'Borda recheada', price: 8.00 },
      { id: 'addon-p8', name: 'Pepperoni extra', price: 9.00 },
      { id: 'addon-p9', name: 'Mussarela extra', price: 6.00 },
    ],
  },
  {
    id: 'pizza-04',
    name: 'Pizza Quatro Queijos',
    description: 'Mussarela, gorgonzola, parmesao e provolone derretidos harmoniosamente sobre molho de tomate caseiro. Finalizada com mel e nozes.',
    price: 52.90,
    image: 'https://images.pexels.com/photos/19239118/pexels-photo-19239118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'pizzas',
    addons: [
      { id: 'addon-p10', name: 'Borda recheada', price: 8.00 },
      { id: 'addon-p11', name: 'Queijo extra', price: 6.00 },
      { id: 'addon-p12', name: 'Mel trufa', price: 5.00 },
    ],
  },

  // BEBIDAS
  {
    id: 'bebida-01',
    name: 'Refrigerante Lata 350ml',
    description: 'Coca-Cola, Guarana Antarctica, Fanta Laranja ou Sprite. Bem gelado para acompanhar seu pedido.',
    price: 7.90,
    image: 'https://images.pexels.com/photos/34405414/pexels-photo-34405414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'bebidas',
    addons: [],
  },
  {
    id: 'bebida-02',
    name: 'Suco Natural 500ml',
    description: 'Suco natural feito na hora. Sabores: Laranja, Limao, Maracuja, Morango ou Abacaxi com hortela.',
    price: 12.90,
    image: 'https://images.pexels.com/photos/28944485/pexels-photo-28944485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'bebidas',
    addons: [
      { id: 'addon-d1', name: 'Acucar extra', price: 0 },
      { id: 'addon-d2', name: 'Sem acucar', price: 0 },
    ],
  },
  {
    id: 'bebida-03',
    name: 'Agua Mineral 500ml',
    description: 'Agua mineral sem gas ou com gas. Servida bem gelada.',
    price: 4.90,
    image: '', // Produto sem imagem para teste
    categoryId: 'bebidas',
    addons: [],
  },

  // SOBREMESAS
  {
    id: 'sobremesa-01',
    name: 'Brownie com Sorvete',
    description: 'Brownie de chocolate belga quentinho, servido com bola de sorvete de creme, calda de chocolate e chantilly. Uma explosao de sabor.',
    price: 22.90,
    image: 'https://images.pexels.com/photos/8498186/pexels-photo-8498186.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'sobremesas',
    addons: [
      { id: 'addon-s1', name: 'Bola de sorvete extra', price: 5.00 },
      { id: 'addon-s2', name: 'Calda de caramelo', price: 3.00 },
      { id: 'addon-s3', name: 'Granulado', price: 2.00 },
    ],
  },
  {
    id: 'sobremesa-02',
    name: 'Bolo de Chocolate',
    description: 'Fatia generosa de bolo de chocolate com cobertura de ganache e recheio de brigadeiro gourmet. Acompanha chantilly.',
    price: 19.90,
    image: 'https://images.pexels.com/photos/34718258/pexels-photo-34718258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'sobremesas',
    addons: [
      { id: 'addon-s4', name: 'Chantilly extra', price: 3.00 },
      { id: 'addon-s5', name: 'Calda de morango', price: 3.50 },
    ],
  },
  {
    id: 'sobremesa-03',
    name: 'Petit Gateau',
    description: 'Bolinho de chocolate com centro derretido, acompanhado de sorvete de baunilha artesanal e frutas vermelhas frescas.',
    price: 26.90,
    image: 'https://images.pexels.com/photos/13878326/pexels-photo-13878326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    categoryId: 'sobremesas',
    addons: [
      { id: 'addon-s6', name: 'Bola de sorvete extra', price: 5.00 },
      { id: 'addon-s7', name: 'Calda de frutas vermelhas', price: 4.00 },
    ],
  },
];
