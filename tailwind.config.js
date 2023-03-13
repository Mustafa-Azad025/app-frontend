/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./layout/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
		colors: {
			primary: "#00ADB5",
			light: "#EEEEEE",
			mid: "#393E46",
			warn: "#ff0000",
			dark: "#222831",
			white: "#fff",
			secondary: "#9DFFFE",
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
