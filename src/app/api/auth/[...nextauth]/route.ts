import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { readDB, writeDB } from "@/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Faltan credenciales");

        const db = readDB();
        const { email, password } = credentials;
        const attemptsData = db.attempts[email] || { count: 0, lockUntil: null };
        
        if (attemptsData.lockUntil && attemptsData.lockUntil > Date.now()) {
          const timeLeft = Math.ceil((attemptsData.lockUntil - Date.now()) / 1000);
          throw new Error(`Cuenta bloqueada. Intenta en ${timeLeft} segundos.`);
        }

        const user = db.users.find((u: any) => u.email === email);
        if (!user) throw new Error("Usuario no encontrado");

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          attemptsData.count += 1;
          if (attemptsData.count >= 3) {
            attemptsData.lockUntil = Date.now() + 60 * 1000;
            attemptsData.count = 0;
          }
          db.attempts[email] = attemptsData;
          writeDB(db);
          throw new Error(`Contraseña incorrecta. Intentos restantes: ${3 - attemptsData.count}`);
        }

        if (db.attempts[email]) {
          delete db.attempts[email];
          writeDB(db);
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/signIn', // Redirección si falla sesión
  },
  session: { strategy: "jwt" as any },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };