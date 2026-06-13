import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// Importación de iconos profesionales de react-icons
import { FaCheckCircle, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { MdWavingHand } from 'react-icons/md';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signIn');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8">
      <div className="max-w-5xl mx-auto mt-10">
        
        {/* Tarjeta Principal */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
          {/* Decoración de fondo superior */}
          <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 absolute top-0 w-full opacity-20"></div>
          
          <div className="p-8 relative z-10 pt-12">
            <div className="flex items-center gap-4 mb-8">
              {/* Inicial del usuario con un gradiente moderno */}
              <div className="h-16 w-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                {/* Saludo con icono de mano animado */}
                <h1 className="text-4xl text-gray-900 font-extrabold flex items-center gap-2">
                  Hola, {session?.user?.name} 
                  <MdWavingHand className="text-amber-400 animate-[bounce_2s_infinite]" />
                </h1>
                <p className="text-gray-500 mt-1 font-medium">
                  Bienvenido a tu panel de control seguro.
                </p>
              </div>
            </div>

            {/* Reemplazo de viñetas ● por Grid de Tarjetas de Información con Iconos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              
              {/* Tarjeta 1: Estado */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-blue-500 font-semibold flex items-center gap-2 mb-3">
                  <FaCheckCircle className="text-xl" /> 
                  <span>Estado</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">Activa</div>
                <div className="text-sm text-gray-400 mt-2">Sesión verificada correctamente</div>
              </div>
              
              {/* Tarjeta 2: Correo */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-purple-500 font-semibold flex items-center gap-2 mb-3">
                  <FaEnvelope className="text-xl" /> 
                  <span>Correo Electrónico</span>
                </div>
                <div className="text-lg font-bold text-gray-800 truncate" title={session?.user?.email || ''}>
                  {session?.user?.email}
                </div>
                <div className="text-sm text-gray-400 mt-2">Canal de comunicación seguro</div>
              </div>

              {/* Tarjeta 3: Seguridad */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-pink-500 font-semibold flex items-center gap-2 mb-3">
                  <FaShieldAlt className="text-xl" /> 
                  <span>Seguridad</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">Alto</div>
                <div className="text-sm text-gray-400 mt-2">Protección mediante Middleware activa</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}