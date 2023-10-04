import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [sveltekit()],
        define: {
			__APP_ENV__: JSON.stringify(env.APP_ENV),
		},
	}
});
