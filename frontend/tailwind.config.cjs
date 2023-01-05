/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js}'],
	theme: {
		fontSize: {
			xxl: ['34px', '75px'],
			xl: ['21px', 1],
			'5xl': ['55px', 1],
		},
		extend: {
			height: {
				100: '100px',
				71: '71px',
			},
			width: {
				504: '504px',
			},
			lineHeight: {
				75: '75px',
			},
		},
	},
	plugins: [
		require('@catppuccin/tailwindcss')({
			prefix: 'ctp',
			defaultFlavour: 'mocha',
		}),
	],
};
