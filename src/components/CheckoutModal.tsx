import { useState } from 'react';
import {
  FiX,
  FiMapPin,
  FiUser,
  FiCreditCard,
  FiLoader,
  FiAlertCircle,
  FiCheck,
} from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import { fetchAddressByCep, calculateDeliveryFee, formatCurrency } from '../utils/cep';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { Address, RestaurantConfig } from '../types';

interface CheckoutModalProps {
  onClose: () => void;
  config: RestaurantConfig;
}

const paymentMethods = [
  { id: 'pix', label: 'PIX' },
  { id: 'credito', label: 'Cartao de Credito' },
  { id: 'debito', label: 'Cartao de Debito' },
  { id: 'dinheiro', label: 'Dinheiro' },
];

export default function CheckoutModal({ onClose, config }: CheckoutModalProps) {
  const { items, subtotal, clearCart } = useCart();

  const primaryColor = config.primaryColor || '#dc2626';
  const secondaryColor = config.secondaryColor || '#16a34a';

  const [customerName, setCustomerName] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [numero, setNumero] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [formError, setFormError] = useState('');

  const handleCepChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 5) {
      formatted = cleaned.substring(0, 5) + '-' + cleaned.substring(5, 8);
    }
    setCep(formatted);
    setCepError('');

    if (cleaned.length === 8) {
      lookupCep(cleaned);
    } else {
      setAddress(null);
      setDeliveryFee(null);
    }
  };

  const lookupCep = async (cleanCep: string) => {
    setLoadingCep(true);
    setCepError('');

    const result = await fetchAddressByCep(cleanCep);

    if (!result) {
      setCepError('CEP nao encontrado. Verifique e tente novamente.');
      setAddress(null);
      setDeliveryFee(null);
    } else {
      setAddress(result);
      const fee = calculateDeliveryFee(config.cep, cleanCep);
      if (fee === -1) {
        setCepError('Infelizmente nao entregamos nessa regiao.');
        setDeliveryFee(null);
      } else {
        setDeliveryFee(fee);
      }
    }

    setLoadingCep(false);
  };

  const total = subtotal + (deliveryFee || 0);

  const handleSubmit = () => {
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Informe seu nome.');
      return;
    }
    if (!address) {
      setFormError('Informe um CEP valido.');
      return;
    }
    if (!numero.trim()) {
      setFormError('Informe o numero da casa/apartamento.');
      return;
    }
    if (!paymentMethod) {
      setFormError('Selecione a forma de pagamento.');
      return;
    }
    if (deliveryFee === null) {
      setFormError('Nao foi possivel calcular o frete.');
      return;
    }

    const fullAddress: Address = { ...address, numero: numero.trim() };
    const selectedPayment = paymentMethods.find(p => p.id === paymentMethod)?.label || paymentMethod;

    const url = buildWhatsAppUrl({
      restaurantName: config.name,
      whatsappNumber: config.whatsapp,
      customerName: customerName.trim(),
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: selectedPayment,
      address: fullAddress,
    });

    window.open(url, '_blank');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg max-h-[95vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Finalizar Pedido</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Customer Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FiUser className="w-4 h-4" style={{ color: primaryColor }} />
              Seu nome
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Digite seu nome completo"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
              style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
            />
          </div>

          {/* CEP */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FiMapPin className="w-4 h-4" style={{ color: primaryColor }} />
              CEP de entrega
            </label>
            <div className="relative">
              <input
                type="text"
                value={cep}
                onChange={(e) => handleCepChange(e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
              />
              {loadingCep && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <FiLoader className="w-5 h-5 text-gray-400 animate-spin" />
                </div>
              )}
            </div>
            {cepError && (
              <p className="flex items-center gap-1 text-red-500 text-xs mt-2">
                <FiAlertCircle className="w-3.5 h-3.5" />
                {cepError}
              </p>
            )}
          </div>

          {/* Address Found */}
          {address && (
            <div 
              className="rounded-xl p-4 space-y-3 border"
              style={{ 
                backgroundColor: secondaryColor + '10',
                borderColor: secondaryColor + '30'
              }}
            >
              <div className="flex items-start gap-2">
                <FiCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: secondaryColor }} />
                <div className="text-sm text-gray-700">
                  <p className="font-medium">{address.logradouro || 'Logradouro nao disponivel'}</p>
                  <p className="text-gray-500">
                    {address.bairro} - {address.localidade}/{address.uf}
                  </p>
                </div>
              </div>

              {/* Numero */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Numero da casa/apto *
                </label>
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Ex: 123, Apt 45B"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white"
                  style={{ '--tw-ring-color': secondaryColor } as React.CSSProperties}
                />
              </div>

              {deliveryFee !== null && (
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: secondaryColor + '30' }}>
                  <span className="text-sm text-gray-600">Taxa de entrega</span>
                  <span className="font-bold" style={{ color: secondaryColor }}>{formatCurrency(deliveryFee)}</span>
                </div>
              )}
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FiCreditCard className="w-4 h-4" style={{ color: primaryColor }} />
              Forma de pagamento
            </label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className="p-3 rounded-xl border text-sm font-medium transition-all text-center"
                  style={{
                    borderColor: paymentMethod === method.id ? primaryColor : '#e5e7eb',
                    backgroundColor: paymentMethod === method.id ? primaryColor + '10' : '#f9fafb',
                    color: paymentMethod === method.id ? primaryColor : '#4b5563',
                  }}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">Resumo do pedido</h3>
            {items.map((item) => {
              const addonsTotal = item.addons.reduce(
                (a, addon) => a + addon.price * addon.quantity,
                0
              );
              const itemTotal = (item.product.price + addonsTotal) * item.quantity;
              return (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="text-gray-800 font-medium">{formatCurrency(itemTotal)}</span>
                </div>
              );
            })}
            <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="text-gray-800">
                  {deliveryFee !== null ? formatCurrency(deliveryFee) : '--'}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1">
                <span className="text-gray-900">Total</span>
                <span style={{ color: primaryColor }}>
                  {deliveryFee !== null ? formatCurrency(total) : '--'}
                </span>
              </div>
            </div>
          </div>

          {/* Error */}
          {formError && (
            <p className="flex items-center gap-1 text-red-500 text-sm bg-red-50 p-3 rounded-xl">
              <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
              {formError}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
          <button
            onClick={handleSubmit}
            className="w-full text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
            style={{ 
              backgroundColor: secondaryColor,
              boxShadow: `0 10px 15px -3px ${secondaryColor}40`
            }}
          >
            <BsWhatsapp className="w-5 h-5" />
            Enviar Pedido pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
