'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/signIn?registered=true'); // Redirección correcta
    } else {
      const data = await res.json();
      setError(data.error || 'Error al registrar');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Crear Cuenta</h1>
        <p className="text-gray-300 text-center mb-8">Únete a nuestra plataforma</p>

        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Nombre completo" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Correo" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Contraseña" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:scale-[1.02] disabled:opacity-50">
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          ¿Ya tienes una cuenta? <Link href="/signIn" className="text-purple-400 font-semibold">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}