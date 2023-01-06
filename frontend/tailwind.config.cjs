/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js}'],
	theme: {
		fontSize: {
			xxl: ['34px', '75px'],
			xl: ['21px', 1],
			'5xl': ['55px', 1],
		},
	},
	plugins: [
		require('@catppuccin/tailwindcss')({
			prefix: 'ctp',
			defaultFlavour: 'mocha',
		}),
	],
};
