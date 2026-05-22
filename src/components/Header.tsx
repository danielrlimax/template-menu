import { FiShoppingCart, FiClock, FiMapPin } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { RestaurantConfig } from '../types';

interface HeaderProps {
  onCartClick: () => void;
  config: RestaurantConfig;
}

export default function Header({ onCartClick, config }: HeaderProps) {
  const { totalItems } = useCart();

  const primaryColor = config.primaryColor || '#dc2626';
  const accentColor = config.accentColor || '#f59e0b';

  return (
    <header className="w-full">
      {/* Banner */}
      <div className="relative w-full h-48 sm:h-64 overflow-hidden">
        {config.bannerImage ? (
          <img
            src={config.bannerImage}
            alt={config.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full"
            style={{ 
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)` 
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto flex items-end justify-between">
            <div>
              {/* Logo */}
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-2 shadow-lg overflow-hidden"
                style={{ backgroundColor: config.logoImage ? 'white' : primaryColor }}
              >
                {config.logoImage ? (
                  <img 
                    src={config.logoImage} 
                    alt={config.name} 
                    className="w-full h-full object-contain "
                  />
                ) : (
                  <span className="text-white font-extrabold text-lg sm:text-xl">
                    {config.logoText || config.name.charAt(0)}
                  </span>
                )}
              </div>
              <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                {config.name}
              </h1>
              <div className="flex items-center gap-4 mt-1 flex-wrap">
                {config.openingHours && (
                  <span className="flex items-center gap-1 text-gray-200 text-xs sm:text-sm">
                    <FiClock className="w-3.5 h-3.5" />
                    {config.openingHours}
                  </span>
                )}
                {config.address && (
                  <span className="flex items-center gap-1 text-gray-200 text-xs sm:text-sm">
                    <FiMapPin className="w-3.5 h-3.5" />
                    {config.address.split('-')[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Cart Button (mobile) */}
      <button
        onClick={onCartClick}
        className="fixed bottom-4 right-4 z-40 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors lg:hidden"
        style={{ backgroundColor: primaryColor }}
        aria-label="Abrir carrinho"
      >
        <FiShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span 
            className="absolute -top-1 -right-1 text-gray-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
}
