import { CartItem, Address } from '../types';
import { formatCurrency } from './cep';

interface WhatsAppOrderParams {
  restaurantName: string;
  whatsappNumber: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  address: Address;
}

export function buildWhatsAppUrl(params: WhatsAppOrderParams): string {
  const {
    restaurantName,
    whatsappNumber,
    customerName,
    items,
    subtotal,
    deliveryFee,
    total,
    paymentMethod,
    address,
  } = params;

  let message = '';
  message += `NOVO PEDIDO - ${restaurantName.toUpperCase()}\n`;
  message += `----------------------------------------------\n`;
  message += `Cliente: ${customerName}\n`;
  message += `----------------------------------------------\n`;
  message += `Itens do pedido:\n\n`;

  items.forEach((item) => {
    const addonsTotal = item.addons.reduce((a, addon) => a + addon.price * addon.quantity, 0);
    const itemSubtotal = (item.product.price + addonsTotal) * item.quantity;

    message += `${item.quantity}x ${item.product.name} - ${formatCurrency(item.product.price)}\n`;

    if (item.addons.length > 0) {
      // Group addons by section
      const addonsBySection: Record<string, typeof item.addons> = {};
      
      item.addons.forEach((addon) => {
        const sectionKey = addon.sectionName || 'Adicionais';
        if (!addonsBySection[sectionKey]) {
          addonsBySection[sectionKey] = [];
        }
        addonsBySection[sectionKey].push(addon);
      });

      Object.entries(addonsBySection).forEach(([sectionName, addons]) => {
        if (Object.keys(addonsBySection).length > 1) {
          message += `   [${sectionName}]\n`;
        }
        addons.forEach((addon) => {
          if (addon.quantity > 0) {
            message += `   + ${addon.quantity}x ${addon.name}`;
            if (addon.price > 0) {
              message += ` (${formatCurrency(addon.price)})`;
            }
            message += `\n`;
          }
        });
      });
    }

    if (item.observation) {
      message += `   Obs: ${item.observation}\n`;
    }

    message += `   Subtotal item: ${formatCurrency(itemSubtotal)}\n\n`;
  });

  message += `----------------------------------------------\n`;
  message += `Subtotal: ${formatCurrency(subtotal)}\n`;
  message += `Frete: ${formatCurrency(deliveryFee)}\n`;
  message += `Valor total: ${formatCurrency(total)}\n`;
  message += `Forma de pagamento: ${paymentMethod}\n`;
  message += `----------------------------------------------\n`;
  message += `Endereco: ${address.logradouro}, ${address.numero}, ${address.bairro} - ${address.localidade}/${address.uf}`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}
