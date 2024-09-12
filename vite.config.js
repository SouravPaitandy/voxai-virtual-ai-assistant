import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';


dotenv.config(); 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // eslint-disable-next-line no-undef
    'process.env': process.env
  },
  base: '/',
  // build: {
  //   outDir: "dist",
  //   assetsDir: "assets"
  // },
  // server: {
  //   historyApiFallback: true,
  // }
})
