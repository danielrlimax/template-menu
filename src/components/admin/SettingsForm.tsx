import { useState, useRef, useEffect } from 'react';
import {
  FiSave,
  FiUpload,
  FiX,
  FiLoader,
  FiMapPin,
  FiPhone,
  FiClock,
  FiImage,
  FiAlertCircle,
  FiCheck,
  FiDroplet,
} from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { RestaurantConfig } from '../../types';
import { isValidImageFile, fileToBase64 } from '../../utils/image';
import { fetchAddressByCep } from '../../utils/cep';

interface SettingsFormProps {
  config: RestaurantConfig;
  onSave: (config: RestaurantConfig) => Promise<boolean>;
  onImageUpload: (file: File) => Promise<string | null>;
  loading: boolean;
}

const presetColors = [
  { name: 'Vermelho', value: '#dc2626' },
  { name: 'Laranja', value: '#ea580c' },
  { name: 'Amarelo', value: '#ca8a04' },
  { name: 'Verde', value: '#16a34a' },
  { name: 'Esmeralda', value: '#059669' },
  { name: 'Ciano', value: '#0891b2' },
  { name: 'Azul', value: '#2563eb' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Roxo', value: '#7c3aed' },
  { name: 'Rosa', value: '#db2777' },
  { name: 'Marrom', value: '#92400e' },
  { name: 'Cinza', value: '#4b5563' },
];

export default function SettingsForm({ config, onSave, onImageUpload, loading }: SettingsFormProps) {
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(config.name);
  const [phone, setPhone] = useState(config.phone);
  const [whatsapp, setWhatsapp] = useState(config.whatsapp);
  const [cep, setCep] = useState(config.cep);
  const [address, setAddress] = useState(config.address);
  const [openingHours, setOpeningHours] = useState(config.openingHours);
  const [bannerImage, setBannerImage] = useState(config.bannerImage);
  const [bannerPreview, setBannerPreview] = useState(config.bannerImage);
  const [logoText, setLogoText] = useState(config.logoText);
  const [logoImage, setLogoImage] = useState(config.logoImage);
  const [logoPreview, setLogoPreview] = useState(config.logoImage);
  const [primaryColor, setPrimaryColor] = useState(config.primaryColor || '#dc2626');
  const [secondaryColor, setSecondaryColor] = useState(config.secondaryColor || '#16a34a');
  const [accentColor, setAccentColor] = useState(config.accentColor || '#f59e0b');

  const [saving, setSaving] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  useEffect(() => {
    setName(config.name);
    setPhone(config.phone);
    setWhatsapp(config.whatsapp);
    setCep(config.cep);
    setAddress(config.address);
    setOpeningHours(config.openingHours);
    setBannerImage(config.bannerImage);
    setBannerPreview(config.bannerImage);
    setLogoText(config.logoText);
    setLogoImage(config.logoImage);
    setLogoPreview(config.logoImage);
    setPrimaryColor(config.primaryColor || '#dc2626');
    setSecondaryColor(config.secondaryColor || '#16a34a');
    setAccentColor(config.accentColor || '#f59e0b');
  }, [config]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = async (value: string) => {
    const formatted = formatCep(value);
    setCep(formatted);

    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      const addressData = await fetchAddressByCep(cleanCep);
      if (addressData) {
        setAddress(`${addressData.logradouro}, ${addressData.bairro} - ${addressData.localidade}/${addressData.uf}`);
      }
      setLoadingCep(false);
    }
  };

  const handleBannerSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      setError('Formato invalido. Use JPG, PNG ou WebP.');
      return;
    }

    setError('');
    setUploadingBanner(true);

    try {
      const preview = await fileToBase64(file);
      setBannerPreview(preview);

      const url = await onImageUpload(file);
      if (url) {
        setBannerImage(url);
      } else {
        setError('Erro ao fazer upload do banner.');
        setBannerPreview(config.bannerImage);
      }
    } catch {
      setError('Erro ao processar imagem.');
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleLogoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      setError('Formato invalido. Use JPG, PNG ou WebP.');
      return;
    }

    setError('');
    setUploadingLogo(true);

    try {
      const preview = await fileToBase64(file);
      setLogoPreview(preview);

      const url = await onImageUpload(file);
      if (url) {
        setLogoImage(url);
        setLogoText(''); // Limpa texto se usar imagem
      } else {
        setError('Erro ao fazer upload da logo.');
        setLogoPreview(config.logoImage);
      }
    } catch {
      setError('Erro ao processar imagem.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const removeBanner = () => {
    setBannerImage('');
    setBannerPreview('');
    if (bannerInputRef.current) bannerInputRef.current.value = '';
  };

  const removeLogo = () => {
    setLogoImage('');
    setLogoPreview('');
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim()) {
      setError('Digite o nome do restaurante.');
      return;
    }

    if (!whatsapp.trim()) {
      setError('Digite o numero do WhatsApp.');
      return;
    }

    if (!cep.trim()) {
      setError('Digite o CEP do estabelecimento.');
      return;
    }

    setSaving(true);

    const cleanWhatsapp = whatsapp.replace(/\D/g, '');
    const whatsappWithCountry = cleanWhatsapp.startsWith('55') ? cleanWhatsapp : `55${cleanWhatsapp}`;

    const result = await onSave({
      name: name.trim(),
      phone: phone.trim(),
      whatsapp: whatsappWithCountry,
      cep: cep.replace(/\D/g, ''),
      address: address.trim(),
      openingHours: openingHours.trim(),
      bannerImage: bannerImage,
      logoText: logoImage ? '' : logoText.trim().toUpperCase().slice(0, 4),
      logoImage: logoImage,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      accentColor: accentColor,
    });

    setSaving(false);

    if (result) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError('Erro ao salvar configuracoes.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Configuracoes do Restaurante</h2>
        <p className="text-gray-500 text-sm mt-1">
          Personalize a aparencia e informacoes do seu cardapio digital
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner Image */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiImage className="w-5 h-5 text-red-500" />
            Banner do Cardapio
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-72 h-40 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {bannerPreview ? (
                <>
                  <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeBanner}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <FiImage className="w-10 h-10 mb-2" />
                  <span className="text-xs">Sem banner</span>
                </div>
              )}
              {uploadingBanner && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <FiLoader className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <input ref={bannerInputRef} type="file" accept="image/*" onChange={handleBannerSelect} className="hidden" />
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                disabled={uploadingBanner}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <FiUpload className="w-4 h-4" />
                {uploadingBanner ? 'Enviando...' : 'Escolher banner'}
              </button>
              <p className="text-xs text-gray-500 mt-2">Recomendado: 1200x400px. Max 10MB.</p>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiImage className="w-5 h-5 text-red-500" />
            Logo do Restaurante
          </h3>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Logo Image Upload */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-3">Imagem da Logo</p>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-dashed border-gray-300">
                  {logoPreview ? (
                    <>
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-1 -right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage className="w-6 h-6" />
                    </div>
                  )}
                  {uploadingLogo && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <FiLoader className="w-4 h-4 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <div>
                  <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoSelect} className="hidden" />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={uploadingLogo}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FiUpload className="w-4 h-4" />
                    Upload Logo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">PNG com fundo transparente ideal</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:flex items-center">
              <div className="h-full w-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-400 bg-white">OU</span>
              <div className="h-full w-px bg-gray-200" />
            </div>

            {/* Logo Text */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-3">Texto/Sigla</p>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={logoText}
                  onChange={(e) => {
                    setLogoText(e.target.value.toUpperCase().slice(0, 4));
                    if (e.target.value) {
                      setLogoImage('');
                      setLogoPreview('');
                    }
                  }}
                  placeholder="S&B"
                  maxLength={4}
                  disabled={!!logoImage}
                  className="w-24 border border-gray-300 rounded-xl px-4 py-3 text-sm text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: primaryColor }}
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-10 h-10 object-contain" />
                  ) : (
                    <span className="text-white font-bold text-sm">{logoText || 'AB'}</span>
                  )}
                </div>
                <span className="text-xs text-gray-500">Preview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiDroplet className="w-5 h-5 text-red-500" />
            Cores do Tema
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor Principal
                <span className="text-xs text-gray-400 ml-1">(botoes, destaques)</span>
              </label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono uppercase"
                  maxLength={7}
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {presetColors.slice(0, 6).map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setPrimaryColor(c.value)}
                    className={`w-7 h-7 rounded-lg border-2 transition-all ${
                      primaryColor === c.value ? 'border-gray-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor Secundaria
                <span className="text-xs text-gray-400 ml-1">(WhatsApp, sucesso)</span>
              </label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono uppercase"
                  maxLength={7}
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {presetColors.slice(3, 9).map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setSecondaryColor(c.value)}
                    className={`w-7 h-7 rounded-lg border-2 transition-all ${
                      secondaryColor === c.value ? 'border-gray-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor de Destaque
                <span className="text-xs text-gray-400 ml-1">(badges, alertas)</span>
              </label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono uppercase"
                  maxLength={7}
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {presetColors.slice(0, 6).map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setAccentColor(c.value)}
                    className={`w-7 h-7 rounded-lg border-2 transition-all ${
                      accentColor === c.value ? 'border-gray-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs font-medium text-gray-500 mb-3">PREVIEW DAS CORES</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: primaryColor }}
              >
                Botao Principal
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: secondaryColor }}
              >
                Finalizar Pedido
              </button>
              <span
                className="px-3 py-1 rounded-full text-white text-xs font-bold"
                style={{ backgroundColor: accentColor }}
              >
                3 itens
              </span>
              <span className="text-sm font-bold" style={{ color: primaryColor }}>
                R$ 32,90
              </span>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Informacoes Basicas</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome do Restaurante *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Sabor & Brasa"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiPhone className="w-5 h-5 text-red-500" />
            Contato
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(11) 99999-9999"
                maxLength={15}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                <BsWhatsapp className="w-4 h-4 text-green-600" />
                WhatsApp *
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
                placeholder="5511999999999"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Apenas numeros com DDI+DDD</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiMapPin className="w-5 h-5 text-red-500" />
            Endereco
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">CEP *</label>
              <div className="relative">
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => handleCepChange(e.target.value)}
                  placeholder="00000-000"
                  maxLength={9}
                  className="w-full sm:w-48 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {loadingCep && <FiLoader className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />}
              </div>
              <p className="text-xs text-gray-500 mt-1">Usado para calcular o frete</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Endereco Completo</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, numero - Bairro, Cidade/UF"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiClock className="w-5 h-5 text-red-500" />
            Horario de Funcionamento
          </h3>

          <input
            type="text"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            placeholder="Ex: Seg a Dom: 11h - 23h"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-4">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl p-4">
            <FiCheck className="w-5 h-5 flex-shrink-0" />
            Configuracoes salvas com sucesso! Recarregue a pagina para ver as mudancas.
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving || uploadingBanner || uploadingLogo}
            className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 shadow-lg"
            style={{ backgroundColor: primaryColor }}
          >
            {saving ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <FiSave className="w-4 h-4" />
                Salvar Configuracoes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
