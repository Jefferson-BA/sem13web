import { withAuth } from "next-auth/middleware";

// Exportamos explícitamente la función de middleware
export default withAuth;

// Configuramos las rutas protegidas
export const config = {
  matcher: [
    "/dashboard", 
    "/profile"
  ],
};