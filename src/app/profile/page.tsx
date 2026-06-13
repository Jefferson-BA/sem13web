import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
  if (!session) {
    redirect('/signIn');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl text-gray-900 font-bold mb-6">
            Perfil de Usuario
          </h1>
          
          <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Foto de perfil"
                width={80}
                height={80}
                className="rounded-full shadow-sm"
              />
            )}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">
                Nombre
              </p>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {session.user?.name}
              </h2>
              
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">
                Correo Electrónico
              </p>
              <p className="text-gray-600">
                {session.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}