import { useState, useRef } from 'react';
import {
  FiX,
  FiImage,
  FiUpload,
  FiPlus,
  FiTrash2,
  FiLoader,
  FiAlertCircle,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { Product, Category } from '../../types';
import { isValidImageFile, fileToBase64 } from '../../utils/image';

interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  onSave: (data: ProductFormData) => Promise<void>;
  onClose: () => void;
  onImageUpload: (file: File) => Promise<string | null>;
}

export interface ProductFormData {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  addonSections: AddonSectionFormData[];
}

interface AddonSectionFormData {
  id?: string;
  name: string;
  description: string;
  isRequired: boolean;
  minQuantity: number;
  maxQuantity: number;
  addons: { id?: string; name: string; price: number }[];
}

export default function ProductForm({
  product,
  categories,
  onSave,
  onClose,
  onImageUpload,
}: ProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [categoryId, setCategoryId] = useState(product?.categoryId || categories[0]?.id || '');
  const [imageUrl, setImageUrl] = useState(product?.image || '');
  const [imagePreview, setImagePreview] = useState(product?.image || '');
  
  // Sections state
  const [sections, setSections] = useState<AddonSectionFormData[]>(() => {
    if (product?.addonSections && product.addonSections.length > 0) {
      return product.addonSections.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description || '',
        isRequired: s.isRequired,
        minQuantity: s.minQuantity,
        maxQuantity: s.maxQuantity,
        addons: s.addons.map(a => ({ id: a.id, name: a.name, price: a.price })),
      }));
    }
    // Convert old addons to a single section if exists
    if (product?.addons && product.addons.length > 0) {
      return [{
        name: 'Adicionais',
        description: '',
        isRequired: false,
        minQuantity: 0,
        maxQuantity: 10,
        addons: product.addons.map(a => ({ id: a.id, name: a.name, price: a.price })),
      }];
    }
    return [];
  });

  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const toggleSectionExpand = (index: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      setError('Formato invalido. Use JPG, PNG ou WebP.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const preview = await fileToBase64(file);
      setImagePreview(preview);

      const url = await onImageUpload(file);
      if (url) {
        setImageUrl(url);
      } else {
        setError('Erro ao fazer upload da imagem.');
        setImagePreview('');
      }
    } catch {
      setError('Erro ao processar imagem.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageUrl('');
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Section handlers
  const addSection = () => {
    setSections([...sections, {
      name: '',
      description: '',
      isRequired: false,
      minQuantity: 0,
      maxQuantity: 10,
      addons: [],
    }]);
    setExpandedSections(prev => new Set([...prev, sections.length]));
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: keyof AddonSectionFormData, value: any) => {
    setSections(sections.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const addAddonToSection = (sectionIndex: number) => {
    setSections(sections.map((s, i) => 
      i === sectionIndex 
        ? { ...s, addons: [...s.addons, { name: '', price: 0 }] }
        : s
    ));
  };

  const removeAddonFromSection = (sectionIndex: number, addonIndex: number) => {
    setSections(sections.map((s, i) => 
      i === sectionIndex 
        ? { ...s, addons: s.addons.filter((_, ai) => ai !== addonIndex) }
        : s
    ));
  };

  const updateAddonInSection = (sectionIndex: number, addonIndex: number, field: 'name' | 'price', value: any) => {
    setSections(sections.map((s, i) => 
      i === sectionIndex 
        ? { 
            ...s, 
            addons: s.addons.map((a, ai) => 
              ai === addonIndex ? { ...a, [field]: value } : a
            )
          }
        : s
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Digite o nome do produto.');
      return;
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setError('Digite um preco valido.');
      return;
    }

    if (!categoryId) {
      setError('Selecione uma categoria.');
      return;
    }

    // Validate sections
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (!section.name.trim()) {
        setError(`A secao ${i + 1} precisa de um nome.`);
        return;
      }
      for (let j = 0; j < section.addons.length; j++) {
        if (!section.addons[j].name.trim()) {
          setError(`O adicional ${j + 1} da secao "${section.name}" precisa de um nome.`);
          return;
        }
      }
    }

    setSaving(true);

    try {
      await onSave({
        id: product?.id,
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        categoryId,
        imageUrl,
        addonSections: sections.filter(s => s.name.trim() && s.addons.length > 0),
      });
    } catch {
      setError('Erro ao salvar produto.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Image Upload */}
          <div className="flex items-start gap-4">
            <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <FiImage className="w-8 h-8 mb-1" />
                  <span className="text-xs">Sem imagem</span>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <FiLoader className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
            <div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <FiUpload className="w-4 h-4" />
                {uploading ? 'Enviando...' : 'Escolher imagem'}
              </button>
              <p className="text-xs text-gray-500 mt-2">JPG, PNG ou WebP. Max 10MB.</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Smash Burger Classico"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Preco (R$) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0,00"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoria *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Descricao</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o produto..."
                rows={2}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Addon Sections */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">Secoes de Adicionais</h3>
                <p className="text-xs text-gray-500">Crie secoes como "Adicionais", "Guarnicoes", etc.</p>
              </div>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <FiPlus className="w-4 h-4" />
                Nova Secao
              </button>
            </div>

            {sections.length === 0 ? (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center">
                <p className="text-gray-500 text-sm">Nenhuma secao adicionada</p>
                <button
                  type="button"
                  onClick={addSection}
                  className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  + Adicionar primeira secao
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Section Header */}
                    <div 
                      className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                      onClick={() => toggleSectionExpand(sectionIndex)}
                    >
                      <div className="flex items-center gap-3">
                        {expandedSections.has(sectionIndex) ? (
                          <FiChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <FiChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="font-medium text-gray-800">
                          {section.name || `Secao ${sectionIndex + 1}`}
                        </span>
                        {section.isRequired && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                            Obrigatoria
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {section.addons.length} itens
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSection(sectionIndex);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Section Content */}
                    {expandedSections.has(sectionIndex) && (
                      <div className="p-4 space-y-4">
                        {/* Section Settings */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Nome da Secao *
                            </label>
                            <input
                              type="text"
                              value={section.name}
                              onChange={(e) => updateSection(sectionIndex, 'name', e.target.value)}
                              placeholder="Ex: Adicionais, Guarnicoes"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Descricao (opcional)
                            </label>
                            <input
                              type="text"
                              value={section.description}
                              onChange={(e) => updateSection(sectionIndex, 'description', e.target.value)}
                              placeholder="Ex: Escolha ate 3 opcoes"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={section.isRequired}
                              onChange={(e) => updateSection(sectionIndex, 'isRequired', e.target.checked)}
                              className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">Selecao obrigatoria</span>
                          </label>

                          <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-600">Min:</label>
                            <input
                              type="number"
                              min="0"
                              value={section.minQuantity}
                              onChange={(e) => updateSection(sectionIndex, 'minQuantity', parseInt(e.target.value) || 0)}
                              className="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-center"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-600">Max:</label>
                            <input
                              type="number"
                              min="1"
                              value={section.maxQuantity}
                              onChange={(e) => updateSection(sectionIndex, 'maxQuantity', parseInt(e.target.value) || 1)}
                              className="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-center"
                            />
                          </div>
                        </div>

                        {/* Addons */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-medium text-gray-600">Itens desta secao</label>
                            <button
                              type="button"
                              onClick={() => addAddonToSection(sectionIndex)}
                              className="text-xs text-red-600 hover:text-red-700 font-medium"
                            >
                              + Adicionar item
                            </button>
                          </div>

                          {section.addons.length === 0 ? (
                            <p className="text-xs text-gray-400 italic">Nenhum item adicionado</p>
                          ) : (
                            <div className="space-y-2">
                              {section.addons.map((addon, addonIndex) => (
                                <div key={addonIndex} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={addon.name}
                                    onChange={(e) => updateAddonInSection(sectionIndex, addonIndex, 'name', e.target.value)}
                                    placeholder="Nome do item"
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                  />
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs text-gray-400">R$</span>
                                    <input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={addon.price}
                                      onChange={(e) => updateAddonInSection(sectionIndex, addonIndex, 'price', parseFloat(e.target.value) || 0)}
                                      placeholder="0,00"
                                      className="w-20 border border-gray-300 rounded-lg px-2 py-2 text-sm text-right"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeAddonFromSection(sectionIndex, addonIndex)}
                                    className="p-1.5 text-gray-400 hover:text-red-500"
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3">
              <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center gap-3 p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || uploading}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-xl font-medium text-sm hover:bg-red-700 disabled:opacity-50"
          >
            {saving ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Produto'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
