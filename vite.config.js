import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Desarrollo: /api se redirige a la API local (cambia el puerto al que muestre "dotnet run").
// Producción (AWS): lo hace Apache con ProxyPass hacia el Backend privado.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:5000' } }
});
