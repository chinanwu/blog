import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';

// eslint-disable-next-line no-undef
const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			// eslint-disable-next-line no-undef
			server = require('child_process').spawn(
				'npm',
				['run', 'start', '--', '--dev'],
				{
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true,
				}
			);

			// eslint-disable-next-line no-undef
			process.on('SIGTERM', toExit);
			// eslint-disable-next-line no-undef
			process.on('exit', toExit);
		},
	};
}

export default {
	input: './src/main.js',
	output: {
		name: 'app',
		file: 'public/build.js',
		format: 'iife',
		sourceMap: true,
	},
	plugins: [
		svelte({
			dev: !production,
			include: 'src/components/**/*.svelte',
			preprocess: sveltePreprocess({
				less: true,
			}),
			css: (css) => {
				css.write('public/bundle.css');
			},
		}),
		terser(),
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
		}),

		!production && serve(),
		!production && livereload('public'),
		production && terser(),
	],

	watch: {
		clearScreen: false,
	},
};
