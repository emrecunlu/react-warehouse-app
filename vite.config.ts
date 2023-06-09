import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.join(__dirname, './src'),
		},
	},
	server: {
		host: true,
	},
	plugins: [react()],
});
