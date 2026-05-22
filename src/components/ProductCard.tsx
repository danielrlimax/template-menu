import { FiPlus, FiPackage } from 'react-icons/fi';
import { Product } from '../types';
import { formatCurrency } from '../utils/cep';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  primaryColor?: string;
}

export default function ProductCard({ product, onSelect, primaryColor = '#dc2626' }: ProductCardProps) {
  const hasImage = product.image && product.image.length > 0;

  return (
    <button
      onClick={() => onSelect(product)}
      className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group text-left flex flex-row sm:flex-col"
    >
      {/* Image or Placeholder */}
      {hasImage ? (
        <div className="relative w-28 h-28 sm:w-full sm:h-48 flex-shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div 
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiPlus className="w-4 h-4" style={{ color: primaryColor }} />
          </div>
        </div>
      ) : (
        <div className="relative w-28 h-28 sm:w-full sm:h-32 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
          <div className="text-center">
            <FiPackage className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mx-auto" />
            <span className="text-gray-400 text-xs mt-1 hidden sm:block">Sem imagem</span>
          </div>
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <FiPlus className="w-4 h-4" style={{ color: primaryColor }} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight truncate">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="mt-2 sm:mt-3 flex items-center justify-between">
          <span className="font-bold text-base sm:text-lg" style={{ color: primaryColor }}>
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs text-gray-400 sm:hidden">Toque para ver</span>
        </div>
      </div>
    </button>
  );
}
