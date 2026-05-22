import { FiHome, FiArrowLeft, FiMapPin } from 'react-icons/fi';
import { RestaurantConfig } from '../types';

interface NotFoundProps {
  config: RestaurantConfig;
  onGoHome: () => void;
}

export default function NotFound({ config, onGoHome }: NotFoundProps) {
  const primaryColor = config.primaryColor || '#dc2626';
  const secondaryColor = config.secondaryColor || '#16a34a';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: primaryColor }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: secondaryColor }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: primaryColor }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${primaryColor} 1px, transparent 1px), linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Logo */}
        <div 
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl overflow-hidden"
          style={{ 
            backgroundColor: config.logoImage ? 'white' : primaryColor,
            boxShadow: `0 25px 50px -12px ${primaryColor}50`
          }}
        >
          {config.logoImage ? (
            <img 
              src={config.logoImage} 
              alt={config.name} 
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <span className="text-white font-extrabold text-2xl">
              {config.logoText || config.name.charAt(0)}
            </span>
          )}
        </div>

        {/* 404 Number */}
        <div className="relative mb-6">
          <h1 
            className="text-[150px] sm:text-[200px] font-black leading-none tracking-tighter opacity-10"
            style={{ color: primaryColor }}
          >
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: primaryColor + '20' }}
            >
              <FiMapPin className="w-12 h-12" style={{ color: primaryColor }} />
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Pagina nao encontrada
        </h2>
        <p className="text-gray-400 mb-8 text-sm sm:text-base leading-relaxed">
          Ops! Parece que voce se perdeu no caminho.
          <br />
          A pagina que voce procura nao existe ou foi movida.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all shadow-lg hover:scale-105"
            style={{ 
              backgroundColor: primaryColor,
              boxShadow: `0 10px 30px -5px ${primaryColor}50`
            }}
          >
            <FiHome className="w-5 h-5" />
            Ir para o Cardapio
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-all"
          >
            <FiArrowLeft className="w-5 h-5" />
            Voltar
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            {config.name}
          </p>
          {config.openingHours && (
            <p className="text-gray-600 text-xs mt-1">
              {config.openingHours}
            </p>
          )}
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
      <div className="absolute top-40 right-20 w-2 h-2 rounded-full animate-pulse delay-100" style={{ backgroundColor: secondaryColor }} />
      <div className="absolute bottom-32 left-20 w-4 h-4 rounded-full animate-pulse delay-200" style={{ backgroundColor: primaryColor, opacity: 0.5 }} />
      <div className="absolute bottom-20 right-10 w-2 h-2 rounded-full animate-pulse delay-300" style={{ backgroundColor: secondaryColor }} />
    </div>
  );
}
