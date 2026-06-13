import fs from 'fs';
import path from 'path';

// En Vercel, el único directorio con permisos de escritura es /tmp
const dbPath = process.env.VERCEL ? path.join('/tmp', 'data.json') : path.resolve(process.cwd(), 'data.json');

export function readDB() {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify({ users: [], attempts: {} }));
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Fallback de emergencia en memoria por si Vercel bloquea /tmp
    return { users: [], attempts: {} };
  }
}

export function writeDB(data: any) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("No se pudo escribir en la BD temporal");
  }
}