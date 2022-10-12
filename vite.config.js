import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import zipPack from "vite-plugin-zip-pack";

import manifest from './manifest.json'
import pkg from './package.json'

const isProduction = process.env.NODE_ENV === 'production'
const zipPlugin = isProduction ? [zipPack({outDir: 'releases', outFileName: `${pkg.name}-${pkg.version}.zip`})] : []

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    ...zipPlugin
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
})
