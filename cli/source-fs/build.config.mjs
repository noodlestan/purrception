import { postBuildPlugin } from '@noodlestan/esbuild/plugins';

export default {
	common: {
		bundle: true,
		tsconfig: 'tsconfig.build.json',
		entryPoints: ['src/index.ts'],
		external: ['chokidar', 'perfect-debounce'],
	},
	esm: {
		plugins: [
			postBuildPlugin({
				command: 'tsc',
				args: ['--project', 'tsconfig.build.json', '--emitDeclarationOnly'],
				target: 'esm',
			}),
		],
	},
};
