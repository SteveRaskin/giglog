// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   extends: [
//     'plugin:vue/essential',
//     '@vue/standard'
//   ],
//   parserOptions: {
//     parser: 'babel-eslint'
//   },
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
//   }
// }
/*
// https://eslint.org/docs/user-guide/configuring
	// required to lint *.vue files
	plugins: [
		'vue'
	],
}
*/

module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		// https://vuejs.github.io/eslint-plugin-vue/rules/
		// 'plugin:vue/essential', 'plugin:vue/strongly-recommended', 'plugin:vue/recommended'
		'plugin:vue/recommended',
		'@vue/standard',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},

	rules: {
		// TODO: learn wtf these mean
		// ORIG:
		// 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
		// Finn ux.engineer on StackOverflow:
		// 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// allow debugger during development
		// allow async-await
		'generator-star-spacing': 'off',
		"no-tabs": "off",
		"indent": "off",
		"no-multiple-empty-lines": "off",
		"semi": "off",
		"space-before-function-paren": "off",
		"quotes": "off",
		"space-before-blocks": "off",
		"comma-dangle": "off",
		"no-mixed-spaces-and-tabs": "off",
		// block-spacing should be one of: 0 = off, 1 = warn, 2 = error
		"block-spacing": 1,
		// brace-style should be one of: 0 = off, 1 = warn, 2 = error
		"brace-style": 1,
		// "allowTernary": 1,
		// "allowShortCircuit": 1,
		"no-unused-expressions": 0,
		"max-len": 0,
		"array-bracket-spacing": 1,
		"brace-style": 1

	},
};
