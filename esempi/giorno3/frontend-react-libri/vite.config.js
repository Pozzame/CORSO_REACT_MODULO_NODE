import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configurazione minima: il plugin react abilita JSX e il fast refresh.
export default defineConfig({
    plugins: [react()]
});
