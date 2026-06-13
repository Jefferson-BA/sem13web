import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { readDB, writeDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const db = readDB();

    const userExists = db.users.find((u: any) => u.email === email);
    if (userExists) {
      return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), name, email, password: hashedPassword };
    
    db.users.push(newUser);
    writeDB(db);

    return NextResponse.json({ message: "Usuario registrado con éxito" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}