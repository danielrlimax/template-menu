import { FiLogOut, FiArrowLeft, FiPackage, FiSettings, FiGrid } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  onBack: () => void;
  activeTab: 'products' | 'categories' | 'settings';
  onTabChange: (tab: 'products' | 'categories' | 'settings') => void;
}

export default function AdminLayout({ children, onBack, activeTab, onTabChange }: AdminLayoutProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onBack();
  };

  const tabs = [
    { id: 'products' as const, label: 'Produtos', icon: FiPackage },
    { id: 'categories' as const, label: 'Categorias', icon: FiGrid },
    { id: 'settings' as const, label: 'Configuracoes', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Voltar</span>
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">S&B</span>
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-sm">Painel Admin</h1>
                  <p className="text-gray-500 text-xs truncate max-w-32 sm:max-w-none">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Sair</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
