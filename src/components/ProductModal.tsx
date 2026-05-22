import { useState, useMemo } from 'react';
import { FiX, FiMinus, FiPlus, FiShoppingCart, FiPackage, FiAlertCircle } from 'react-icons/fi';
import { Product, CartItemAddon, AddonSection } from '../types';
import { formatCurrency } from '../utils/cep';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  primaryColor?: string;
}

interface SectionSelection {
  [sectionId: string]: {
    [addonId: string]: number;
  };
}

export default function ProductModal({ product, onClose, primaryColor = '#dc2626' }: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');
  
  // Selection state for sectioned addons
  const [sectionSelections, setSectionSelections] = useState<SectionSelection>({});
  
  // Legacy addons (without sections)
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});

  const hasSections = product.addonSections && product.addonSections.length > 0;

  // Get total selected in a section
  const getSectionTotal = (sectionId: string): number => {
    const section = sectionSelections[sectionId];
    if (!section) return 0;
    return Object.values(section).reduce((sum, qty) => sum + qty, 0);
  };

  // Check if section requirements are met
  const sectionErrors = useMemo(() => {
    if (!hasSections) return {};
    
    const errors: Record<string, string> = {};
    product.addonSections?.forEach(section => {
      const total = getSectionTotal(section.id);
      if (section.isRequired && total < section.minQuantity) {
        errors[section.id] = `Selecione pelo menos ${section.minQuantity} ${section.minQuantity === 1 ? 'item' : 'itens'}`;
      }
    });
    return errors;
  }, [hasSections, product.addonSections, sectionSelections]);

  const hasErrors = Object.keys(sectionErrors).length > 0;

  // Toggle addon in section
  const toggleSectionAddon = (sectionId: string, addonId: string, section: AddonSection) => {
    setSectionSelections(prev => {
      const sectionData = prev[sectionId] || {};
      const currentQty = sectionData[addonId] || 0;
      
      if (currentQty > 0) {
        // Remove
        const { [addonId]: _, ...rest } = sectionData;
        return { ...prev, [sectionId]: rest };
      } else {
        // Check max
        const total = getSectionTotal(sectionId);
        if (total >= section.maxQuantity) {
          return prev;
        }
        return { ...prev, [sectionId]: { ...sectionData, [addonId]: 1 } };
      }
    });
  };

  const updateSectionAddonQty = (sectionId: string, addonId: string, delta: number, section: AddonSection) => {
    setSectionSelections(prev => {
      const sectionData = prev[sectionId] || {};
      const currentQty = sectionData[addonId] || 0;
      const newQty = currentQty + delta;

      if (newQty <= 0) {
        const { [addonId]: _, ...rest } = sectionData;
        return { ...prev, [sectionId]: rest };
      }

      // Check max
      const otherTotal = Object.entries(sectionData)
        .filter(([id]) => id !== addonId)
        .reduce((sum, [_, qty]) => sum + qty, 0);
      
      if (otherTotal + newQty > section.maxQuantity) {
        return prev;
      }

      return { ...prev, [sectionId]: { ...sectionData, [addonId]: newQty } };
    });
  };

  // Legacy addon handlers
  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => {
      const current = prev[addonId] || 0;
      if (current > 0) {
        const { [addonId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [addonId]: 1 };
    });
  };

  const updateAddonQuantity = (addonId: string, delta: number) => {
    setSelectedAddons(prev => {
      const current = prev[addonId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const { [addonId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [addonId]: next };
    });
  };

  // Calculate totals
  const addonsTotal = useMemo(() => {
    let total = 0;

    // Sectioned addons
    if (hasSections && product.addonSections) {
      product.addonSections.forEach(section => {
        section.addons.forEach(addon => {
          const qty = sectionSelections[section.id]?.[addon.id] || 0;
          total += addon.price * qty;
        });
      });
    }

    // Legacy addons
    product.addons.forEach(addon => {
      const qty = selectedAddons[addon.id] || 0;
      total += addon.price * qty;
    });

    return total;
  }, [hasSections, product, sectionSelections, selectedAddons]);

  const itemTotal = (product.price + addonsTotal) * quantity;

  const handleAdd = () => {
    if (hasErrors) return;

    const addons: CartItemAddon[] = [];

    // Collect sectioned addons
    if (hasSections && product.addonSections) {
      product.addonSections.forEach(section => {
        section.addons.forEach(addon => {
          const qty = sectionSelections[section.id]?.[addon.id] || 0;
          if (qty > 0) {
            addons.push({
              id: addon.id,
              name: addon.name,
              price: addon.price,
              quantity: qty,
              sectionId: section.id,
              sectionName: section.name,
            });
          }
        });
      });
    }

    // Collect legacy addons
    product.addons.forEach(addon => {
      const qty = selectedAddons[addon.id] || 0;
      if (qty > 0) {
        addons.push({
          id: addon.id,
          name: addon.name,
          price: addon.price,
          quantity: qty,
        });
      }
    });

    addItem(product, quantity, addons, observation.trim());
    onClose();
  };

  const primaryLight = primaryColor + '15';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg max-h-[92vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-slide-up">
        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 flex-shrink-0">
          {product.image && product.image.length > 0 ? (
            <>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <FiPackage className="w-16 h-16 text-gray-300" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white"
          >
            <FiX className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">{product.description}</p>
          <p className="font-bold text-xl mt-3" style={{ color: primaryColor }}>
            {formatCurrency(product.price)}
          </p>

          {/* Addon Sections */}
          {hasSections && product.addonSections?.map((section) => {
            const sectionTotal = getSectionTotal(section.id);
            const error = sectionErrors[section.id];

            return (
              <div key={section.id} className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                      {section.name}
                      {section.isRequired && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          Obrigatorio
                        </span>
                      )}
                    </h3>
                    {section.description && (
                      <p className="text-xs text-gray-500">{section.description}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {sectionTotal}/{section.maxQuantity}
                  </span>
                </div>

                {error && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mb-2">
                    <FiAlertCircle className="w-3 h-3" />
                    {error}
                  </p>
                )}

                <div className="space-y-2">
                  {section.addons.map((addon) => {
                    const qty = sectionSelections[section.id]?.[addon.id] || 0;
                    const isDisabled = qty === 0 && sectionTotal >= section.maxQuantity;

                    return (
                      <div
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          isDisabled ? 'opacity-50' : ''
                        }`}
                        style={{
                          borderColor: qty > 0 ? primaryColor + '40' : '#f3f4f6',
                          backgroundColor: qty > 0 ? primaryLight : '#f9fafb',
                        }}
                      >
                        <button
                          className="flex-1 text-left"
                          onClick={() => !isDisabled && toggleSectionAddon(section.id, addon.id, section)}
                          disabled={isDisabled}
                        >
                          <span className="text-sm font-medium text-gray-800">{addon.name}</span>
                          {addon.price > 0 && (
                            <span className="text-xs text-gray-500 ml-2">
                              + {formatCurrency(addon.price)}
                            </span>
                          )}
                        </button>
                        {qty > 0 && (
                          <div className="flex items-center gap-2 ml-3">
                            <button
                              onClick={() => updateSectionAddonQty(section.id, addon.id, -1, section)}
                              className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                            >
                              <FiMinus className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                            <span className="text-sm font-semibold text-gray-800 w-5 text-center">{qty}</span>
                            <button
                              onClick={() => updateSectionAddonQty(section.id, addon.id, 1, section)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                              style={{ backgroundColor: sectionTotal < section.maxQuantity ? primaryColor : '#9ca3af' }}
                              disabled={sectionTotal >= section.maxQuantity}
                            >
                              <FiPlus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Legacy Addons (without sections) */}
          {!hasSections && product.addons.length > 0 && (
            <div className="mt-5">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-3">
                Adicionais
              </h3>
              <div className="space-y-2">
                {product.addons.map((addon) => {
                  const qty = selectedAddons[addon.id] || 0;
                  return (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between p-3 rounded-xl border transition-all"
                      style={{
                        borderColor: qty > 0 ? primaryColor + '40' : '#f3f4f6',
                        backgroundColor: qty > 0 ? primaryLight : '#f9fafb',
                      }}
                    >
                      <button className="flex-1 text-left" onClick={() => toggleAddon(addon.id)}>
                        <span className="text-sm font-medium text-gray-800">{addon.name}</span>
                        {addon.price > 0 && (
                          <span className="text-xs text-gray-500 ml-2">+ {formatCurrency(addon.price)}</span>
                        )}
                      </button>
                      {qty > 0 && (
                        <div className="flex items-center gap-2 ml-3">
                          <button
                            onClick={() => updateAddonQuantity(addon.id, -1)}
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                          >
                            <FiMinus className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                          <span className="text-sm font-semibold text-gray-800 w-5 text-center">{qty}</span>
                          <button
                            onClick={() => updateAddonQuantity(addon.id, 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <FiPlus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Observation */}
          <div className="mt-5">
            <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-2">
              Observacoes
            </h3>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Ex: Sem cebola, ponto da carne mal passado..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 resize-none h-20 focus:outline-none focus:ring-2 focus:border-transparent"
              maxLength={200}
            />
            <p className="text-xs text-gray-400 text-right mt-1">{observation.length}/200</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-200"
              >
                <FiMinus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-semibold text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-200"
              >
                <FiPlus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={hasErrors}
              className="flex-1 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: hasErrors ? '#9ca3af' : primaryColor,
                boxShadow: hasErrors ? 'none' : `0 10px 15px -3px ${primaryColor}40`
              }}
            >
              <FiShoppingCart className="w-4 h-4" />
              Adicionar {formatCurrency(itemTotal)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
