module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'prettier',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'eslint:recommended',
		'plugin:react-hooks/recommended',
		// 'plugin:@typescript-eslint/recommended',
		// 'plugin:prettier/recommended',
		// 'prettier/react',
		// 'prettier/@typescript-eslint', // del+
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json']
	},
	plugins: [
		'react',
		'import'
	],
	rules: {
		indent: 'off',
		'@typescript-eslint/indent': 'off',
		'comma-dangle': 'off',
		'@typescript-eslint/comma-dangle': 'off',
		'space-before-function-paren': 'off',
		'@typescript-eslint/space-before-function-paren': 'off',
		semi: 'off',
		'@typescript-eslint/semi': 'off',
		'strict-boolean-expressions': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'no-floating-promises': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'no-misused-promises': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'react/prop-types': 'off',
		'no-extraneous-class': 'off',
		'@typescript-eslint/no-extraneous-class': 'off',
		'sort-imports': [
			'error',
			{
				ignoreCase: false,
				ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
				allowSeparatedGroups: true,
			},
		],
		'import/no-unresolved': 'error',
		'import/order': [
			'error',
			{
				groups: [
					'builtin', // Built-in imports (come from NodeJS native) go first
					'external', // <- External imports
					'internal', // <- Absolute imports
					['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
					'index', // <- index imports
					'unknown', // <- unknown
				],
				'newlines-between': 'always',
				alphabetize: {
					/* sort in ascending order. Options: ["ignore", "asc", "desc"] */
					order: 'asc',
					/* ignore case. Options: [true, false] */
					caseInsensitive: true,
				},
			},
		],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
			typescript: {
				project: './tsconfig.json',
				alwaysTryTypes: true,
			},
		},
	},
	globals: {
		// чтобы ESLint не подсвечивал с ошибкой `ESLint: 'JSX' is not defined.(no-undef)`
		JSX: true
	}
};
