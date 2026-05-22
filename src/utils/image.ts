import imageCompression from 'browser-image-compression';

export interface ImageCompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
}

const defaultOptions: ImageCompressionOptions = {
  maxSizeMB: 0.5, // 500KB max
  maxWidthOrHeight: 1200, // Max 1200px
  useWebWorker: true,
};

/**
 * Comprime uma imagem antes do upload
 * Reduz tamanho para no maximo 500KB e 1200px
 */
export async function compressImage(
  file: File,
  options: ImageCompressionOptions = {}
): Promise<File> {
  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const compressedFile = await imageCompression(file, mergedOptions);
    return compressedFile;
  } catch (error) {
    console.error('Erro ao comprimir imagem:', error);
    throw error;
  }
}

/**
 * Valida se o arquivo e uma imagem valida
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * Gera um nome unico para o arquivo
 */
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  return `${timestamp}-${random}.${extension}`;
}

/**
 * Converte File para base64 para preview
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
