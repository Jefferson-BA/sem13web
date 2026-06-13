'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/dashboard'); // Redirección correcta
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full max-w-md">
        <h1 className="text-3xl text-center font-bold text-white mb-8">Bienvenido</h1>

        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleCredentialsSignIn} className="space-y-5">
          <input type="email" placeholder="Correo" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Contraseña" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:scale-[1.02] disabled:opacity-50">
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="px-4 text-gray-500 text-sm">O continúa con</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <div className="space-y-3">
          <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-3">
            <FaGoogle className="text-red-400 text-xl" /> Google
          </button>
          <button onClick={() => signIn('github', { callbackUrl: '/dashboard' })} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-3">
            <FaGithub className="text-gray-300 text-xl" /> GitHub
          </button>
        </div>

        <p className="text-gray-400 text-center mt-8 text-sm">
          ¿No tienes una cuenta? <Link href="/register" className="text-blue-400 font-semibold">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}