import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src', 'proto');
const distDir = path.join(process.cwd(), 'dist', 'proto');

console.log('📁 Copiando arquivos .proto...');
console.log('Origem:', srcDir);
console.log('Destino:', distDir);

// cria pasta dist/proto
fs.mkdirSync(distDir, { recursive: true });

// copia todos os arquivos .proto
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.proto'));
for (const file of files) {
  const src = path.join(srcDir, file);
  const dest = path.join(distDir, file);
  fs.copyFileSync(src, dest);
  console.log(`✅ Copiado: ${file}`);
}

console.log('🎉 Todos os .proto foram copiados!');
