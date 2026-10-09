import { postBuildPlugin } from '@noodlestan/esbuild/plugins';

export default {
  common: {
    bundle: true,
    tsconfig: 'tsconfig.build.json',
    entryPoints: ['src/index.ts'],
    external: ['typescript'],
  },
  esm: {
    plugins: [
      postBuildPlugin({
        command: 'tsc',
        args: ['--project', 'tsconfig.types.json'],
        target: 'esm',
      }),
    ],
  },
};
