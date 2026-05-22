import { useState } from 'react';
import { FiMail, FiLock, FiAlertCircle, FiLoader, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';

interface LoginProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function Login({ onBack, onSuccess }: LoginProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos.');
      return;
    }

    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);

    if (signInError) {
      setError(signInError);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Voltar ao cardapio
        </button>

        {/* Login Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-extrabold text-2xl">S&B</span>
            </div>
            <h1 className="text-white text-2xl font-bold">Area Administrativa</h1>
            <p className="text-white/80 text-sm mt-1">Gerencie seu cardapio digital</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {!isSupabaseConfigured && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <p className="text-yellow-500 text-sm flex items-start gap-2">
                  <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Supabase nao configurado. Configure as variaveis de ambiente VITE_SUPABASE_URL
                    e VITE_SUPABASE_ANON_KEY no arquivo .env
                  </span>
                </p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-red-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/25"
            >
              {loading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-6 pb-6 text-center">
            <p className="text-gray-500 text-xs">
              Acesso restrito a administradores
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-gray-600 text-xs text-center mt-6">
          Sabor & Brasa - Sistema de Cardapio Digital
        </p>
      </div>
    </div>
  );
}
