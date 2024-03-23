module.exports = {
	parser: "@typescript-eslint/parser",
	extends: ["prettier", "eslint:recommended", "plugin:prettier/recommended", "plugin:@typescript-eslint/recommended"],
	plugins: ["@typescript-eslint", "prettier"],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module", // Alterado para "module" para suportar imports e exports
		project: "./tsconfig.json",
	},
	env: {
		browser: true,
		node: true,
		es2020: true,
	},
	rules: {
		"no-var": "error",
		"no-console": "warn",
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"no-multi-spaces": "error",
		"space-in-parens": "error",
		"no-multiple-empty-lines": "error",
		"prefer-const": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
		"no-restricted-syntax": [
			"error",
			{
				selector: 'CallExpression[callee.object.name="$match"]',
				message: "$match can be used consecutively.",
			},
		],
		"prettier/prettier": "error",
	},
};
