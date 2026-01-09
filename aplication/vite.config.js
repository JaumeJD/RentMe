import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
//import react from '@vitejs/plugin-react'; -- Omitir para corregir warnings al actualizar.

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        //react(), -- Omitir para corregir warnings al actualizar.
    ],
});
