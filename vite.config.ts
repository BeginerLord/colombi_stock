import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Especifica el puerto deseado
    strictPort: true, // Fuerza el uso del puerto 5173 (falla si está en uso)
  },
});
