import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', 
      'no-unused-vars': 'off', 
      'no-constant-condition': 'off', 
      'react/no-unescaped-entities': 'off', 
    },
    
  },

  {
    ignores: ["build/", "src/components/App.test.js"], 
  },
];