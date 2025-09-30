import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      // '/api': 'https://blogapp-1-gn6j.onrender.com',
      '/api': 'http://localhost:3000/'
    }
  },
  plugins: [
    react(),
    tailwindcss()

  ],
})
//here in the config file we have added the proxy.