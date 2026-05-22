import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useRouter } from './hooks/useRouter';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import Login from './pages/Login';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { getCategories, getProducts, getRestaurantConfig } from './services/api';
import { Product, Category, RestaurantConfig } from './types';
import { categories as mockCategories, products as mockProducts, restaurantConfig as mockConfig } from './data/restaurant';
import { isSupabaseConfigured } from './lib/supabase';

function MenuPage({
  onGoToAdmin,
  products,
  categories,
  config,
  loading,
}: {
  onGoToAdmin: () => void;
  products: Product[];
  categories: Category[];
  config: RestaurantConfig;
  loading: boolean;
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const primaryColor = config.primaryColor || '#dc2626';
  const secondaryColor = config.secondaryColor || '#16a34a';

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory, products]);

  const groupedProducts = useMemo(() => {
    if (activeCategory !== 'all') {
      const cat = categories.find((c) => c.id === activeCategory);
      return cat ? [{ category: cat, products: filteredProducts }] : [];
    }
    return categories
      .map((cat) => ({
        category: cat,
        products: products.filter((p) => p.categoryId === cat.id),
      }))
      .filter((g) => g.products.length > 0);
  }, [activeCategory, filteredProducts, categories, products]);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div 
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto"
            style={{ borderColor: primaryColor, borderTopColor: 'transparent' }}
          />
          <p className="text-gray-500 mt-4">Carregando cardapio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onCartClick={() => setCartOpen(true)} config={config} />
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        primaryColor={primaryColor}
      />

      <div className="flex-1 flex">
        {/* Main Content */}
        <main ref={menuRef} className="flex-1 max-w-4xl mx-auto px-4 py-6 lg:pr-0 w-full">
          {groupedProducts.map(({ category, products: catProducts }) => (
            <section key={category.id} className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span 
                  className="w-1 h-6 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
                {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {catProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                    primaryColor={primaryColor}
                  />
                ))}
              </div>
            </section>
          ))}

          {/* Footer info */}
          <footer className="mt-12 pb-20 lg:pb-8 text-center">
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={onGoToAdmin}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Area Administrativa
              </button>
              <p className="text-xs text-gray-400 mt-2">
                {isSupabaseConfigured
                  ? 'Conectado ao banco de dados'
                  : 'Modo demonstracao - Dados ficticios'}
              </p>
            </div>
          </footer>
        </main>

        {/* Desktop Cart */}
        <div className="hidden lg:block w-96 flex-shrink-0">
          <div className="sticky top-[60px] h-[calc(100vh-60px)]">
            <CartSidebar
              isOpen={true}
              onClose={() => {}}
              onCheckout={() => setCheckoutOpen(true)}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </div>
        </div>
      </div>

      {/* Mobile Cart */}
      <div className="lg:hidden">
        <CartSidebar
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          primaryColor={primaryColor}
        />
      )}

      {/* Checkout Modal */}
      {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} config={config} />}
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { route, goHome, goToAdmin } = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [config, setConfig] = useState<RestaurantConfig>(mockConfig);
  const [dataLoading, setDataLoading] = useState(true);

  const loadData = useCallback(async () => {
    setDataLoading(true);
    try {
      const [productsData, categoriesData, configData] = await Promise.all([
        getProducts(),
        getCategories(),
        getRestaurantConfig(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setConfig(configData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setProducts(mockProducts);
      setCategories(mockCategories);
      setConfig(mockConfig);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle admin route authentication
  useEffect(() => {
    if (route === '/admin' && !authLoading && !isAuthenticated) {
      setShowLogin(true);
    } else if (isAuthenticated) {
      setShowLogin(false);
    }
  }, [route, authLoading, isAuthenticated]);

  const handleGoToAdmin = () => {
    if (isAuthenticated) {
      goToAdmin();
    } else {
      goToAdmin();
      setShowLogin(true);
    }
  };

  const handleBackFromAdmin = () => {
    loadData();
    goHome();
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  // Loading state
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div 
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto"
            style={{ borderColor: config.primaryColor || '#dc2626', borderTopColor: 'transparent' }}
          />
          <p className="text-gray-500 mt-4">Carregando...</p>
        </div>
      </div>
    );
  }

  // 404 Page
  if (route === '404') {
    return <NotFound config={config} onGoHome={goHome} />;
  }

  // Admin Route
  if (route === '/admin') {
    if (showLogin || !isAuthenticated) {
      return (
        <Login 
          onBack={goHome} 
          onSuccess={handleLoginSuccess} 
        />
      );
    }
    return <Admin onBack={handleBackFromAdmin} />;
  }

  // Home / Menu Route
  return (
    <MenuPage
      onGoToAdmin={handleGoToAdmin}
      products={products}
      categories={categories}
      config={config}
      loading={false}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-right" />
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
