import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';
import AdminLayout from '../components/admin/AdminLayout';
import ProductList from '../components/admin/ProductList';
import ProductForm, { ProductFormData } from '../components/admin/ProductForm';
import CategoryManager from '../components/admin/CategoryManager';
import SettingsForm from '../components/admin/SettingsForm';
import { Product, Category, RestaurantConfig } from '../types';
import {
  getAllProductsAdmin,
  getAllCategoriesAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getRestaurantConfig,
  saveRestaurantConfig,
  uploadBannerImage,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/api';
import { isSupabaseConfigured } from '../lib/supabase';

interface AdminProps {
  onBack: () => void;
}

export default function Admin({ onBack }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'settings'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [config, setConfig] = useState<RestaurantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [configLoading, setConfigLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getAllProductsAdmin(),
        getAllCategoriesAdmin(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadConfig = useCallback(async () => {
    setConfigLoading(true);
    try {
      const configData = await getRestaurantConfig();
      setConfig(configData);
    } catch (error) {
      console.error('Erro ao carregar configuracoes:', error);
    } finally {
      setConfigLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    loadConfig();
  }, [loadData, loadConfig]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeleteConfirm(product);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    const success = await deleteProduct(deleteConfirm.id);
    if (success) {
      toast.success('Produto excluido com sucesso!');
      setProducts(products.filter((p) => p.id !== deleteConfirm.id));
    } else {
      toast.error('Erro ao excluir produto');
    }
    setDeleteConfirm(null);
  };

  const handleSaveProduct = async (data: ProductFormData) => {
    if (data.id) {
      const updated = await updateProduct({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        imageUrl: data.imageUrl,
        addonSections: data.addonSections,
      });

      if (updated) {
        toast.success('Produto atualizado com sucesso!');
        setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
        setShowForm(false);
      } else {
        toast.error('Erro ao atualizar produto');
      }
    } else {
      const created = await createProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        imageUrl: data.imageUrl,
        addonSections: data.addonSections,
      });

      if (created) {
        toast.success('Produto criado com sucesso!');
        setProducts([...products, created]);
        setShowForm(false);
      } else {
        toast.error('Erro ao criar produto');
      }
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const url = await uploadProductImage(file);
    if (!url) {
      toast.error('Erro ao fazer upload da imagem');
    }
    return url;
  };

  const handleBannerUpload = async (file: File): Promise<string | null> => {
    const url = await uploadBannerImage(file);
    if (!url) {
      toast.error('Erro ao fazer upload do banner');
    }
    return url;
  };

  const handleSaveConfig = async (newConfig: RestaurantConfig): Promise<boolean> => {
    const success = await saveRestaurantConfig(newConfig);
    if (success) {
      setConfig(newConfig);
      toast.success('Configuracoes salvas!');
    } else {
      toast.error('Erro ao salvar configuracoes');
    }
    return success;
  };

  // Category handlers
  const handleAddCategory = async (category: Omit<Category, 'id'>): Promise<boolean> => {
    const created = await createCategory(category);
    if (created) {
      toast.success('Categoria criada!');
      setCategories([...categories, created]);
      return true;
    }
    toast.error('Erro ao criar categoria');
    return false;
  };

  const handleUpdateCategory = async (category: Category): Promise<boolean> => {
    const updated = await updateCategory(category);
    if (updated) {
      toast.success('Categoria atualizada!');
      setCategories(categories.map(c => c.id === updated.id ? updated : c));
      return true;
    }
    toast.error('Erro ao atualizar categoria');
    return false;
  };

  const handleDeleteCategory = async (id: string): Promise<boolean> => {
    const success = await deleteCategory(id);
    if (success) {
      toast.success('Categoria excluida!');
      setCategories(categories.filter(c => c.id !== id));
      return true;
    }
    toast.error('Erro ao excluir categoria');
    return false;
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />

      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab} onBack={onBack}>
        {!isSupabaseConfigured && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <FiAlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-800 font-medium">Supabase nao configurado</p>
              <p className="text-yellow-700 text-sm mt-1">
                Configure as variaveis de ambiente para habilitar todas as funcionalidades.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <ProductList
            products={products}
            categories={categories}
            loading={loading}
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}

        {activeTab === 'categories' && (
          <CategoryManager
            categories={categories}
            loading={loading}
            onAdd={handleAddCategory}
            onUpdate={handleUpdateCategory}
            onDelete={handleDeleteCategory}
          />
        )}

        {activeTab === 'settings' && config && (
          <SettingsForm
            config={config}
            onSave={handleSaveConfig}
            onImageUpload={handleBannerUpload}
            loading={configLoading}
          />
        )}
      </AdminLayout>

      {showForm && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSave={handleSaveProduct}
          onClose={() => setShowForm(false)}
          onImageUpload={handleImageUpload}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Excluir produto?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Tem certeza que deseja excluir <strong>{deleteConfirm.name}</strong>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl font-medium text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium text-sm hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
