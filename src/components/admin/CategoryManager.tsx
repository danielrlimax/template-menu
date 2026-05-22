import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiLoader, FiGrid } from 'react-icons/fi';
import { Category, CATEGORY_ICONS } from '../../types';
import { getCategoryIcon } from '../../utils/categoryIcons';

interface CategoryManagerProps {
  categories: Category[];
  loading: boolean;
  onAdd: (category: Omit<Category, 'id'>) => Promise<boolean>;
  onUpdate: (category: Category) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export default function CategoryManager({
  categories,
  loading,
  onAdd,
  onUpdate,
  onDelete,
}: CategoryManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formIcon, setFormIcon] = useState('grid');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingId(null);
    setFormName('');
    setFormIcon('grid');
    setShowForm(true);
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormName(category.name);
    setFormIcon(category.icon);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormName('');
    setFormIcon('grid');
  };

  const handleSave = async () => {
    if (!formName.trim()) return;

    setSaving(true);

    if (editingId) {
      const success = await onUpdate({
        id: editingId,
        name: formName.trim(),
        icon: formIcon,
      });
      if (success) handleCancel();
    } else {
      const success = await onAdd({
        name: formName.trim(),
        icon: formIcon,
      });
      if (success) handleCancel();
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const success = await onDelete(id);
    if (success) setDeleteConfirm(null);
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Categorias</h2>
          <p className="text-gray-500 text-sm mt-0.5">{categories.length} categorias cadastradas</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
        >
          <FiPlus className="w-4 h-4" />
          Nova Categoria
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            {editingId ? 'Editar Categoria' : 'Nova Categoria'}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nome da Categoria
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Hamburguers"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icone
              </label>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {CATEGORY_ICONS.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => setFormIcon(icon.id)}
                    className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center ${
                      formIcon === icon.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    title={icon.label}
                  >
                    {getCategoryIcon(icon.id)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selecionado: <strong>{CATEGORY_ICONS.find(i => i.id === formIcon)?.label || formIcon}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formName.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <FiCheck className="w-4 h-4" />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <FiGrid className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Nenhuma categoria cadastrada</p>
          <p className="text-gray-400 text-sm mt-1">Clique em "Nova Categoria" para comecar</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-gray-400 text-xs">Icone: {category.icon}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(category.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Excluir categoria?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Todos os produtos desta categoria ficarao sem categoria. Esta acao nao pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium text-sm hover:bg-red-700 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
