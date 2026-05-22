import { supabase, PRODUCT_IMAGES_BUCKET, isSupabaseConfigured } from '../lib/supabase';
import { products as mockProducts, categories as mockCategories, restaurantConfig as mockConfig } from '../data/restaurant';
import { Product, Category, RestaurantConfig } from '../types';
import { compressImage, generateUniqueFileName } from '../utils/image';

// ============================================
// TIPOS DO BANCO DE DADOS
// ============================================

interface DbCategory {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
}

interface DbProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string;
  is_active: boolean;
  sort_order: number;
}

interface DbProductAddon {
  id: string;
  product_id: string;
  section_id: string | null;
  name: string;
  price: number;
  is_active: boolean;
}

interface DbAddonSection {
  id: string;
  product_id: string;
  name: string;
  description: string | null;
  is_required: boolean;
  min_quantity: number;
  max_quantity: number;
  sort_order: number;
  is_active: boolean;
}

interface DbRestaurantConfig {
  id: string;
  name: string;
  phone: string | null;
  whatsapp: string;
  cep: string;
  address: string | null;
  opening_hours: string | null;
  banner_image: string | null;
  logo_text: string | null;
  logo_image: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
}

// ============================================
// CATEGORIAS
// ============================================

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) {
    return mockCategories;
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Erro ao buscar categorias:', error);
    return mockCategories;
  }

  return (data as DbCategory[]).map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    sortOrder: cat.sort_order,
    isActive: cat.is_active,
  }));
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }

  return (data as DbCategory[]).map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    sortOrder: cat.sort_order,
    isActive: cat.is_active,
  }));
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: category.name,
      icon: category.icon,
      sort_order: category.sortOrder || 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar categoria:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    icon: data.icon,
    sortOrder: data.sort_order,
    isActive: data.is_active,
  };
}

export async function updateCategory(category: Category): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .update({
      name: category.name,
      icon: category.icon,
      sort_order: category.sortOrder || 0,
    })
    .eq('id', category.id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar categoria:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    icon: data.icon,
    sortOrder: data.sort_order,
    isActive: data.is_active,
  };
}

export async function deleteCategory(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar categoria:', error);
    return false;
  }

  return true;
}

// ============================================
// PRODUTOS
// ============================================

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return mockProducts;
  }

  const { data: productsData, error: productsError } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (productsError) {
    console.error('Erro ao buscar produtos:', productsError);
    return mockProducts;
  }

  // Buscar secoes de adicionais
  const { data: sectionsData } = await supabase
    .from('addon_sections')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  // Buscar adicionais
  const { data: addonsData } = await supabase
    .from('product_addons')
    .select('*')
    .eq('is_active', true);

  const sections = (sectionsData as DbAddonSection[] | null) || [];
  const addons = (addonsData as DbProductAddon[] | null) || [];

  return (productsData as DbProduct[]).map((product) => {
    const productSections = sections
      .filter(s => s.product_id === product.id)
      .map(s => ({
        id: s.id,
        name: s.name,
        description: s.description || undefined,
        isRequired: s.is_required,
        minQuantity: s.min_quantity,
        maxQuantity: s.max_quantity,
        sortOrder: s.sort_order,
        addons: addons
          .filter(a => a.section_id === s.id)
          .map(a => ({ id: a.id, name: a.name, price: Number(a.price), sectionId: s.id })),
      }));

    // Adicionais sem secao (legado)
    const legacyAddons = addons
      .filter(a => a.product_id === product.id && !a.section_id)
      .map(a => ({ id: a.id, name: a.name, price: Number(a.price) }));

    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      image: product.image_url || '',
      categoryId: product.category_id,
      addons: legacyAddons,
      addonSections: productSections.length > 0 ? productSections : undefined,
    };
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return mockProducts.find((p) => p.id === id) || null;
  }

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) return null;

  // Buscar secoes
  const { data: sectionsData } = await supabase
    .from('addon_sections')
    .select('*')
    .eq('product_id', id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  // Buscar adicionais
  const { data: addonsData } = await supabase
    .from('product_addons')
    .select('*')
    .eq('is_active', true);

  const sections = (sectionsData as DbAddonSection[] | null) || [];
  const addons = (addonsData as DbProductAddon[] | null) || [];

  const productSections = sections.map(s => ({
    id: s.id,
    name: s.name,
    description: s.description || undefined,
    isRequired: s.is_required,
    minQuantity: s.min_quantity,
    maxQuantity: s.max_quantity,
    sortOrder: s.sort_order,
    addons: addons
      .filter(a => a.section_id === s.id)
      .map(a => ({ id: a.id, name: a.name, price: Number(a.price), sectionId: s.id })),
  }));

  const legacyAddons = addons
    .filter(a => a.product_id === id && !a.section_id)
    .map(a => ({ id: a.id, name: a.name, price: Number(a.price) }));

  return {
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: Number(product.price),
    image: product.image_url || '',
    categoryId: product.category_id,
    addons: legacyAddons,
    addonSections: productSections.length > 0 ? productSections : undefined,
  };
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  const { data: productsData, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }

  const { data: sectionsData } = await supabase
    .from('addon_sections')
    .select('*')
    .order('sort_order', { ascending: true });

  const { data: addonsData } = await supabase
    .from('product_addons')
    .select('*');

  const sections = (sectionsData as DbAddonSection[] | null) || [];
  const addons = (addonsData as DbProductAddon[] | null) || [];

  return (productsData as DbProduct[]).map((product) => {
    const productSections = sections
      .filter(s => s.product_id === product.id)
      .map(s => ({
        id: s.id,
        name: s.name,
        description: s.description || undefined,
        isRequired: s.is_required,
        minQuantity: s.min_quantity,
        maxQuantity: s.max_quantity,
        sortOrder: s.sort_order,
        addons: addons
          .filter(a => a.section_id === s.id)
          .map(a => ({ id: a.id, name: a.name, price: Number(a.price), sectionId: s.id })),
      }));

    const legacyAddons = addons
      .filter(a => a.product_id === product.id && !a.section_id)
      .map(a => ({ id: a.id, name: a.name, price: Number(a.price) }));

    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      image: product.image_url || '',
      categoryId: product.category_id,
      addons: legacyAddons,
      addonSections: productSections.length > 0 ? productSections : undefined,
    };
  });
}

interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  addonSections?: {
    name: string;
    description?: string;
    isRequired: boolean;
    minQuantity: number;
    maxQuantity: number;
    addons: { name: string; price: number }[];
  }[];
}

export async function createProduct(input: CreateProductInput): Promise<Product | null> {
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert({
      name: input.name,
      description: input.description,
      price: input.price,
      category_id: input.categoryId,
      image_url: input.imageUrl || null,
    })
    .select()
    .single();

  if (productError || !product) {
    console.error('Erro ao criar produto:', productError);
    return null;
  }

  // Criar secoes e adicionais
  if (input.addonSections && input.addonSections.length > 0) {
    for (let i = 0; i < input.addonSections.length; i++) {
      const section = input.addonSections[i];
      
      const { data: sectionData, error: sectionError } = await supabase
        .from('addon_sections')
        .insert({
          product_id: product.id,
          name: section.name,
          description: section.description || null,
          is_required: section.isRequired,
          min_quantity: section.minQuantity,
          max_quantity: section.maxQuantity,
          sort_order: i,
        })
        .select()
        .single();

      if (sectionError || !sectionData) {
        console.error('Erro ao criar secao:', sectionError);
        continue;
      }

      // Criar adicionais da secao
      if (section.addons.length > 0) {
        const addonsToInsert = section.addons.map(addon => ({
          product_id: product.id,
          section_id: sectionData.id,
          name: addon.name,
          price: addon.price,
        }));

        await supabase.from('product_addons').insert(addonsToInsert);
      }
    }
  }

  return getProductById(product.id);
}

interface UpdateProductInput {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  addonSections?: {
    id?: string;
    name: string;
    description?: string;
    isRequired: boolean;
    minQuantity: number;
    maxQuantity: number;
    addons: { id?: string; name: string; price: number }[];
  }[];
}

export async function updateProduct(input: UpdateProductInput): Promise<Product | null> {
  const { error: productError } = await supabase
    .from('products')
    .update({
      name: input.name,
      description: input.description,
      price: input.price,
      category_id: input.categoryId,
      image_url: input.imageUrl || null,
    })
    .eq('id', input.id);

  if (productError) {
    console.error('Erro ao atualizar produto:', productError);
    return null;
  }

  // Deletar secoes e adicionais antigos
  await supabase.from('addon_sections').delete().eq('product_id', input.id);
  await supabase.from('product_addons').delete().eq('product_id', input.id);

  // Recriar secoes e adicionais
  if (input.addonSections && input.addonSections.length > 0) {
    for (let i = 0; i < input.addonSections.length; i++) {
      const section = input.addonSections[i];
      
      const { data: sectionData, error: sectionError } = await supabase
        .from('addon_sections')
        .insert({
          product_id: input.id,
          name: section.name,
          description: section.description || null,
          is_required: section.isRequired,
          min_quantity: section.minQuantity,
          max_quantity: section.maxQuantity,
          sort_order: i,
        })
        .select()
        .single();

      if (sectionError || !sectionData) {
        console.error('Erro ao criar secao:', sectionError);
        continue;
      }

      if (section.addons.length > 0) {
        const addonsToInsert = section.addons.map(addon => ({
          product_id: input.id,
          section_id: sectionData.id,
          name: addon.name,
          price: addon.price,
        }));

        await supabase.from('product_addons').insert(addonsToInsert);
      }
    }
  }

  return getProductById(input.id);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { data: product } = await supabase
    .from('products')
    .select('image_url')
    .eq('id', id)
    .single();

  if (product?.image_url) {
    const fileName = product.image_url.split('/').pop();
    if (fileName) {
      await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([fileName]);
    }
  }

  // Deletar secoes (cascade deleta adicionais)
  await supabase.from('addon_sections').delete().eq('product_id', id);
  await supabase.from('product_addons').delete().eq('product_id', id);

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('Erro ao deletar produto:', error);
    return false;
  }

  return true;
}

// ============================================
// UPLOAD DE IMAGENS
// ============================================

export async function uploadProductImage(file: File): Promise<string | null> {
  try {
    const compressedFile = await compressImage(file);
    const fileName = generateUniqueFileName(file.name);

    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(fileName, compressedFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Erro ao fazer upload:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return null;
  }
}

// ============================================
// CONFIGURACAO DO RESTAURANTE
// ============================================

export async function getRestaurantConfig(): Promise<RestaurantConfig> {
  if (!isSupabaseConfigured) {
    return mockConfig;
  }

  try {
    const { data, error } = await supabase
      .from('restaurant_config')
      .select('*')
      .limit(1);

    if (error || !data || data.length === 0) {
      return mockConfig;
    }

    const config = data[0] as DbRestaurantConfig;
    return {
      name: config.name,
      phone: config.phone || '',
      whatsapp: config.whatsapp,
      cep: config.cep,
      address: config.address || '',
      openingHours: config.opening_hours || '',
      bannerImage: config.banner_image || '',
      logoText: config.logo_text || '',
      logoImage: config.logo_image || '',
      primaryColor: config.primary_color || '#dc2626',
      secondaryColor: config.secondary_color || '#16a34a',
      accentColor: config.accent_color || '#f59e0b',
    };
  } catch (err) {
    console.error('Erro ao buscar config:', err);
    return mockConfig;
  }
}

export async function saveRestaurantConfig(config: RestaurantConfig): Promise<boolean> {
  if (!isSupabaseConfigured) {
    return false;
  }

  try {
    const { data: existing } = await supabase
      .from('restaurant_config')
      .select('id')
      .limit(1);

    const configData = {
      name: config.name,
      phone: config.phone,
      whatsapp: config.whatsapp,
      cep: config.cep,
      address: config.address,
      opening_hours: config.openingHours,
      banner_image: config.bannerImage,
      logo_text: config.logoText,
      logo_image: config.logoImage,
      primary_color: config.primaryColor,
      secondary_color: config.secondaryColor,
      accent_color: config.accentColor,
    };

    if (existing && existing.length > 0) {
      const { error } = await supabase
        .from('restaurant_config')
        .update(configData)
        .eq('id', existing[0].id);

      if (error) {
        console.error('Erro ao atualizar config:', error);
        return false;
      }
    } else {
      const { error } = await supabase
        .from('restaurant_config')
        .insert(configData);

      if (error) {
        console.error('Erro ao inserir config:', error);
        return false;
      }
    }

    return true;
  } catch (err) {
    console.error('Erro ao salvar config:', err);
    return false;
  }
}

export async function uploadBannerImage(file: File): Promise<string | null> {
  try {
    const compressedFile = await compressImage(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });
    const fileName = `banner-${generateUniqueFileName(file.name)}`;

    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(fileName, compressedFile, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Erro ao fazer upload do banner:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error) {
    console.error('Erro ao fazer upload do banner:', error);
    return null;
  }
}
