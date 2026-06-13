export { default } from "next-auth/middleware";

export const config = {
  // ATENCIÓN: Es obligatorio que todas las rutas empiecen con "/"
  matcher: ["/dashboard", "/profile"],
};