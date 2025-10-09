import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'child_process';

// Função para obter a tag mais recente do Git
const getGitVersion = () => {
  try {
    const version = execSync('git describe --tags --abbrev=0').toString().trim();
    return version;
  } catch (error) {
    console.error('Erro ao obter a tag do Git:', error.message);
    return 'dev'; 
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(getGitVersion()),
  },
});
