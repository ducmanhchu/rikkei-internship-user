import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
	js.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		languageOptions: {
			globals: globals.browser,
			ecmaVersion: "latest",
			sourceType: "module",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
		},
	},
];
