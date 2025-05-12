//import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
	{
		ignores: ['node_modules/', 'dist/', 'build/'],
	},
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: typescriptParser,
			parserOptions: {
				project: './tsconfig.app.json',
			},
		},
		plugins: {
			'@typescript-eslint': eslintPluginTypescript,
			//react: eslintPluginReact,
			'react-hooks': eslintPluginReactHooks,
			import: eslintPluginImport,
			prettier: eslintPluginPrettier,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' },
			],
			'prettier/prettier': ['error'],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
