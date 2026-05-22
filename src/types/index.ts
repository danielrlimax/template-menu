export interface ProductAddon {
  id: string;
  name: string;
  price: number;
  sectionId?: string;
}

export interface AddonSection {
  id: string;
  name: string;
  description?: string;
  isRequired: boolean;
  minQuantity: number;
  maxQuantity: number;
  sortOrder: number;
  addons: ProductAddon[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  addons: ProductAddon[];
  addonSections?: AddonSection[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface CartItemAddon {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sectionId?: string;
  sectionName?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addons: CartItemAddon[];
  observation: string;
}

export interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
}

export interface RestaurantConfig {
  name: string;
  phone: string;
  whatsapp: string;
  cep: string;
  address: string;
  openingHours: string;
  bannerImage: string;
  logoText: string;
  logoImage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

// Icones disponiveis para categorias
export const CATEGORY_ICONS = [
  // Fast Food
  { id: 'burger', label: 'Hamburguer' },
  { id: 'hotdog', label: 'Hot Dog' },
  { id: 'sandwich', label: 'Sanduiche' },
  { id: 'fries', label: 'Batata Frita' },
  { id: 'tacos', label: 'Tacos' },
  
  // Pizza e Italiana
  { id: 'pizza', label: 'Pizza' },
  { id: 'pasta', label: 'Massa' },
  { id: 'italian', label: 'Italiano' },
  
  // Japonesa e Asiatica
  { id: 'sushi', label: 'Sushi' },
  { id: 'japanese', label: 'Japones' },
  { id: 'asian', label: 'Asiatico' },
  { id: 'chinese', label: 'Chines' },
  { id: 'noodles', label: 'Noodles' },
  { id: 'rice', label: 'Arroz' },
  { id: 'ramen', label: 'Ramen' },
  
  // Carnes
  { id: 'chicken', label: 'Frango' },
  { id: 'meat', label: 'Carne' },
  { id: 'steak', label: 'Bife' },
  { id: 'bbq', label: 'Churrasco' },
  { id: 'grill', label: 'Grelhado' },
  
  // Frutos do Mar
  { id: 'fish', label: 'Peixe' },
  { id: 'seafood', label: 'Frutos do Mar' },
  { id: 'shrimp', label: 'Camarao' },
  { id: 'crab', label: 'Caranguejo' },
  
  // Arabe e Indiana
  { id: 'arabian', label: 'Arabe' },
  { id: 'indian', label: 'Indiano' },
  
  // Saudavel
  { id: 'salad', label: 'Salada' },
  { id: 'healthy', label: 'Saudavel' },
  { id: 'vegan', label: 'Vegano' },
  { id: 'vegetarian', label: 'Vegetariano' },
  { id: 'fruit', label: 'Frutas' },
  
  // Sopas
  { id: 'soup', label: 'Sopa' },
  { id: 'stew', label: 'Cozido' },
  { id: 'hotmeal', label: 'Prato Quente' },
  
  // Cafe e Padaria
  { id: 'breakfast', label: 'Cafe da Manha' },
  { id: 'coffee', label: 'Cafe' },
  { id: 'bakery', label: 'Padaria' },
  { id: 'bread', label: 'Pao' },
  { id: 'cheese', label: 'Queijo' },
  
  // Doces
  { id: 'dessert', label: 'Sobremesa' },
  { id: 'cake', label: 'Bolo' },
  { id: 'cupcake', label: 'Cupcake' },
  { id: 'icecream', label: 'Sorvete' },
  { id: 'candy', label: 'Doce' },
  { id: 'donut', label: 'Donut' },
  { id: 'cookie', label: 'Cookie' },
  
  // Bebidas
  { id: 'drink', label: 'Bebida' },
  { id: 'soda', label: 'Refrigerante' },
  { id: 'beer', label: 'Cerveja' },
  { id: 'wine', label: 'Vinho' },
  { id: 'juice', label: 'Suco' },
  
  // Outros
  { id: 'meal', label: 'Refeicao' },
  { id: 'lunch', label: 'Almoco' },
  { id: 'kids', label: 'Infantil' },
  { id: 'combo', label: 'Combo' },
  { id: 'promo', label: 'Promocao' },
  { id: 'star', label: 'Destaque' },
  { id: 'grid', label: 'Geral' },
];
