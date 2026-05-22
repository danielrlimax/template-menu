import { useState, useMemo } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiImage, FiLoader, FiFilter, FiX } from 'react-icons/fi';
import { Product, Category } from '../../types';
import { formatCurrency } from '../../utils/cep';
import { getCategoryIcon } from '../../utils/categoryIcons';

interface ProductListProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onAdd: () => void;
}

export default function ProductList({
  products,
  categories,
  loading,
  onEdit,
  onDelete,
  onAdd,
}: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categoryId === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    return result;
  }, [products, selectedCategory, searchTerm]);

  const productsByCategory = useMemo(() => {
    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.id === selectedCategory);
      return cat ? [{ category: cat, products: filteredProducts }] : [];
    }

    return categories
      .map(cat => ({
        category: cat,
        products: filteredProducts.filter(p => p.categoryId === cat.id),
      }))
      .filter(g => g.products.length > 0);
  }, [filteredProducts, categories, selectedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Produtos</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {filteredProducts.length} de {products.length} produtos
          </p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
        >
          <FiPlus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white min-w-[180px]"
            >
              <option value="all">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(selectedCategory !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
            >
              <FiX className="w-4 h-4" />
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Products by Category */}
      {productsByCategory.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <FiImage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">
            {searchTerm || selectedCategory !== 'all'
              ? 'Nenhum produto encontrado'
              : 'Nenhum produto cadastrado'}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {searchTerm || selectedCategory !== 'all'
              ? 'Tente alterar os filtros'
              : 'Clique em "Novo Produto" para comecar'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {productsByCategory.map(({ category, products: catProducts }) => (
            <div key={category.id}>
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {catProducts.length}
                </span>
              </div>

              {/* Products Grid */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {catProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      {/* Image */}
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <FiImage className="w-6 h-6 text-gray-400" />
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-gray-500 text-sm truncate">{product.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-semibold text-red-600 text-sm">
                            {formatCurrency(product.price)}
                          </span>
                          {product.addonSections && product.addonSections.length > 0 && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {product.addonSections.length} secoes
                            </span>
                          )}
                          {product.addons.length > 0 && !product.addonSections?.length && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {product.addons.length} adicionais
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onEdit(product)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(product)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
