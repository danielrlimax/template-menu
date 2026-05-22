import { Address } from '../types';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  erro?: boolean;
}

export async function fetchAddressByCep(cep: string): Promise<Address | null> {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data: ViaCepResponse = await response.json();

    if (data.erro) return null;

    return {
      cep: data.cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      numero: '',
    };
  } catch {
    return null;
  }
}

/**
 * Calcula o frete baseado na distância estimada entre CEPs.
 * Lógica simplificada no estilo iFood:
 * - Mesmo bairro/região: taxa base
 * - Distância estimada por diferença de CEP (prefixo)
 * - Taxa por km estimado
 */
export function calculateDeliveryFee(storeCep: string, clientCep: string): number {
  const storePrefix = parseInt(storeCep.replace(/\D/g, '').substring(0, 5));
  const clientPrefix = parseInt(clientCep.replace(/\D/g, '').substring(0, 5));

  const storeRegion = parseInt(storeCep.replace(/\D/g, '').substring(0, 3));
  const clientRegion = parseInt(clientCep.replace(/\D/g, '').substring(0, 3));

  // Mesmo CEP ou muito próximo
  if (Math.abs(storePrefix - clientPrefix) <= 5) {
    return 5.00;
  }

  // Mesma região (3 primeiros dígitos)
  if (storeRegion === clientRegion) {
    return 8.00;
  }

  // Diferença de região próxima
  const regionDiff = Math.abs(storeRegion - clientRegion);

  if (regionDiff <= 5) {
    return 12.00;
  }

  if (regionDiff <= 15) {
    return 16.00;
  }

  if (regionDiff <= 30) {
    return 22.00;
  }

  // Muito longe - fora da área de entrega
  if (regionDiff <= 100) {
    return 30.00;
  }

  return -1; // Fora da área de entrega
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
