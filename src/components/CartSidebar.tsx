import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/cep';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function CartSidebar({ 
  isOpen, 
  onClose, 
  onCheckout, 
  primaryColor = '#dc2626',
  secondaryColor = '#16a34a'
}: CartSidebarProps) {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:static lg:translate-x-0 lg:shadow-none lg:border-l lg:border-gray-100 lg:z-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FiShoppingCart className="w-5 h-5" style={{ color: primaryColor }} />
            <h2 className="font-bold text-gray-900 text-lg">Seu Pedido</h2>
            {totalItems > 0 && (
              <span 
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: primaryColor + '20', color: primaryColor }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
            aria-label="Fechar carrinho"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <FiShoppingCart className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm font-medium">Seu carrinho esta vazio</p>
              <p className="text-xs mt-1">Adicione itens do cardapio</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const addonsTotal = item.addons.reduce(
                  (a, addon) => a + addon.price * addon.quantity,
                  0
                );
                const itemTotal = (item.product.price + addonsTotal) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-xl p-3 border border-gray-100"
                  >
                    <div className="flex gap-3">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <FiShoppingCart className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm truncate">
                          {item.product.name}
                        </h4>
                        {item.addons.length > 0 && (
                          <div className="mt-1">
                            {item.addons.map((addon) => (
                              <p key={addon.id} className="text-xs text-gray-500">
                                + {addon.quantity}x {addon.name}
                                {addon.price > 0 && ` (${formatCurrency(addon.price)})`}
                              </p>
                            ))}
                          </div>
                        )}
                        {item.observation && (
                          <p className="text-xs text-amber-600 mt-1 italic">
                            Obs: {item.observation}
                          </p>
                        )}
                        <p className="font-bold text-sm mt-1" style={{ color: primaryColor }}>
                          {formatCurrency(itemTotal)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remover item"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <FiMinus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="text-sm font-semibold text-gray-800 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors text-white"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 text-sm">Subtotal</span>
              <span className="font-bold text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg"
              style={{ 
                backgroundColor: secondaryColor,
                boxShadow: `0 10px 15px -3px ${secondaryColor}40`
              }}
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
