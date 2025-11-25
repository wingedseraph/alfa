import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

const OFF = 0;
const WARN = 1;
const ERROR = 2;
const NO_ACCESS_MODIFIER = "There is no need to limit developer access to properties.";

export default [
  {
    ignores: ["build", "dist", "coverage", "eslint.config.*", "vite.*", "stylelint.config.*"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.app.json",
        },
        node: true,
      },
      "import/ignore": "node_modules",
      "import/extensions": ["error", { json: "always" }],
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "better-tailwindcss": {
        entryPoint: "src/index.css",
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
        jsxPragma: null,
      },
    },
  },
  js.configs.recommended,
  reactRefresh.configs.vite,
  reactPlugin.configs.flat.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  perfectionist.configs["recommended-natural"],
  {
    plugins: {
      "react-hooks": reactHooks,
      "@stylistic": stylistic,
      "@typescript-eslint": tseslint.plugin,
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,
      ...jsRules(),
      ...reactRules(),
      ...tsRules(),
      ...tsNamingConventionRule(),
      ...importRules(),
      ...sortRules(),
      ...stylisticRules(),
    },
  },
];

function jsRules() {
  return {
    "no-await-in-loop": OFF,
    "no-shadow": OFF,
    "no-return-await": OFF,
    "no-use-before-define": OFF,
    "no-unused-expressions": OFF,
    "padding-line-between-statements": OFF,
    "prettier/prettier": ERROR,
    radix: ERROR,
    curly: ERROR,
    eqeqeq: ERROR,
    "default-case": ERROR,
    "default-case-last": ERROR,
    "object-shorthand": ERROR,
    "require-atomic-updates": ERROR,
    complexity: [2, 13],
    "max-depth": [2, 4],
    "max-nested-callbacks": [2, 5],
    "id-match": ERROR,
    "id-denylist": ERROR,
    "no-empty": [ERROR, { allowEmptyCatch: true }],
    "no-eval": ERROR,
    "no-alert": ERROR,
    "no-proto": ERROR,
    "no-labels": ERROR,
    "no-plusplus": ERROR,
    "no-lonely-if": ERROR,
    "no-multi-str": ERROR,
    "no-extra-bind": ERROR,
    "no-lone-blocks": ERROR,
    "no-self-compare": ERROR,
    "no-useless-call": ERROR,
    "no-useless-assignment": ERROR,
    "no-multi-assign": ERROR,
    "no-new-wrappers": ERROR,
    "no-octal-escape": ERROR,
    "no-extend-native": ERROR,
    "no-nested-ternary": ERROR,
    "no-unreachable-loop": ERROR,
    "no-negated-condition": ERROR,
    "no-implicit-coercion": ERROR,
    "no-constructor-return": ERROR,
    "no-object-constructor": ERROR,
    "no-promise-executor-return": ERROR,
    "no-new-native-nonconstructor": ERROR,
    "no-unmodified-loop-condition": ERROR,
    "no-constant-binary-expression": ERROR,
    "arrow-body-style": ERROR,
    "prefer-template": ERROR,
    "prefer-object-spread": ERROR,
    "prefer-object-has-own": ERROR,
    "prefer-numeric-literals": ERROR,
    "prefer-exponentiation-operator": ERROR,
    "no-return-assign": [ERROR, "always"],
    "no-void": [ERROR, { allowAsStatement: true }],
    "no-param-reassign": [ERROR, { props: true, ignorePropertyModificationsFor: ["state"] }],
    "no-console": [ERROR, { allow: ["warn", "error", "debug"] }],
    "no-sequences": [ERROR, { allowInParentheses: false }],
    "no-else-return": [ERROR, { allowElseIf: false }],
    "no-unused-vars": [
      ERROR,
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "no-unneeded-ternary": [ERROR, { defaultAssignment: false }],
    "no-duplicate-imports": [ERROR, { includeExports: true }],
    "no-restricted-syntax": [
      ERROR,
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys, values, entries}, and iterate over the resulting array.",
      },
      {
        selector: "Identifier[name='Reflect']",
        message:
          "Avoid the Reflect API. It is a very low-level feature that has only rare and specific use-cases if building complex and hacky libraries. There is no need to use this feature for any kind of normal development",
      },
      {
        selector: "BinaryExpression[operator='in']",
        message: "Prefer Object.hasOwn().",
      },
      {
        selector: "PropertyDefinition[accessibility='public']",
        message: NO_ACCESS_MODIFIER,
      },
      {
        selector: "PropertyDefinition[accessibility='protected']",
        message: NO_ACCESS_MODIFIER,
      },
      {
        selector: "PropertyDefinition[accessibility='private']",
        message: NO_ACCESS_MODIFIER,
      },
      {
        selector: "Identifier[name='PropTypes']",
        message: "No PropTypes. Use Typescript instead.",
      },
      {
        selector: "Identifier[name='propTypes']",
        message: "No PropTypes. Use Typescript instead.",
      },
    ],
    "prefer-destructuring": [ERROR, { array: false, object: true }, { enforceForRenamedProperties: false }],
    "func-style": [ERROR, "expression", { allowArrowFunctions: true }],
    "array-callback-return": [ERROR, { allowImplicit: true, checkForEach: true }],
  };
}

function reactRules() {
  return {
    "react/button-has-type": ERROR,
    "react/jsx-curly-brace-presence": OFF,
    "better-tailwindcss/enforce-consistent-line-wrapping": OFF,
    "react/prop-types": OFF,
    "react/display-name": OFF,
    "react/jsx-uses-react": OFF,
    "react/react-in-jsx-scope": OFF,
    "react/require-default-props": OFF,
    "react/jsx-props-no-spreading": OFF,
    "react/jsx-fragments": ERROR,
    "react/no-array-index-key": ERROR,
    "react-hooks/rules-of-hooks": ERROR,
    "react-hooks/exhaustive-deps": ERROR,
    "react/jsx-boolean-value": [ERROR, "always"],
    "react/hook-use-state": [ERROR, { allowDestructuredState: true }],
    "react/jsx-no-duplicate-props": [ERROR, { ignoreCase: true }],
    "react/no-multi-comp": [ERROR, { ignoreStateless: true }],
    "react/destructuring-assignment": [ERROR, "always", { ignoreClassFields: true, destructureInSignature: "always" }],
    "react/jsx-no-leaked-render": [ERROR, { validStrategies: ["coerce", "ternary"] }],
    "react/no-unstable-nested-components": [ERROR, { allowAsProps: false }],
    "react/jsx-no-useless-fragment": [ERROR, { allowExpressions: true }],
    "react/boolean-prop-naming": ["error", { rule: "^(is|has|can|did|will|should)[A-Z]([A-Za-z0-9]?)+" }],
    "react/jsx-filename-extension": [
      ERROR,
      {
        extensions: [".jsx", ".cjsx", ".mjsx", ".tsx", ".ctsx", ".mtsx"],
        allow: "as-needed",
        ignoreFilesWithoutCode: true,
      },
    ],
  };
}

function tsRules() {
  return {
    "@typescript-eslint/no-explicit-any": ERROR,
    "@typescript-eslint/triple-slash-reference": [ERROR, { lib: "never", path: "never", types: "always" }],
    "@typescript-eslint/no-misused-promises": [ERROR, { checksVoidReturn: { attributes: false } }],
    "@typescript-eslint/prefer-includes": ERROR,
    "@typescript-eslint/no-base-to-string": ERROR,
    "@typescript-eslint/no-dynamic-delete": ERROR,
    "@typescript-eslint/unified-signatures": ERROR,
    "@typescript-eslint/ban-tslint-comment": ERROR,
    "@typescript-eslint/no-extraneous-class": ERROR,
    "@typescript-eslint/no-invalid-void-type": ERROR,
    "@typescript-eslint/prefer-function-type": ERROR,
    "@typescript-eslint/prefer-optional-chain": ERROR,
    "@typescript-eslint/no-unnecessary-condition": ERROR,
    "@typescript-eslint/consistent-type-definitions": [ERROR, "type"],
    "@typescript-eslint/prefer-reduce-type-parameter": ERROR,
    "@typescript-eslint/consistent-indexed-object-style": ERROR,
    "@typescript-eslint/consistent-generic-constructors": ERROR,
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": ERROR,
    "@typescript-eslint/ban-ts-comment": ERROR,
    "@typescript-eslint/only-throw-error": ERROR,
    "@typescript-eslint/array-type": [ERROR, { default: "array-simple" }],
    "@typescript-eslint/consistent-type-assertions": [ERROR, { assertionStyle: "as", objectLiteralTypeAssertions: "never" }],
    "@typescript-eslint/prefer-nullish-coalescing": [
      ERROR,
      {
        ignoreTernaryTests: false,
        ignoreConditionalTests: false,
        ignoreMixedLogicalExpressions: false,
      },
    ],
    "@typescript-eslint/restrict-plus-operands": [ERROR, { skipCompoundAssignments: true }],
    "@typescript-eslint/no-redeclare": ERROR,
    "@typescript-eslint/method-signature-style": ERROR,
    "@typescript-eslint/promise-function-async": ERROR,
    "@typescript-eslint/no-unsafe-type-assertion": ERROR,
    "@typescript-eslint/switch-exhaustiveness-check": ERROR,
    "@typescript-eslint/no-confusing-void-expression": ERROR,
    "@typescript-eslint/no-redundant-type-constituents": ERROR,
    "@typescript-eslint/consistent-type-imports": [ERROR, { prefer: "type-imports", fixStyle: "separate-type-imports" }],
    "@typescript-eslint/consistent-type-exports": OFF,
    "@typescript-eslint/strict-boolean-expressions": [
      ERROR,
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
      },
    ],
    "@typescript-eslint/require-array-sort-compare": [ERROR, { ignoreStringArrays: true }],
    "@typescript-eslint/no-shadow": [
      ERROR,
      {
        hoist: "all",
        allow: ["resolve", "reject", "done", "next", "err", "error"],
        ignoreTypeValueShadow: true,
        ignoreFunctionTypeParameterNameValueShadow: true,
      },
    ],
    "@typescript-eslint/return-await": [ERROR, "in-try-catch"],
    "@typescript-eslint/no-use-before-define": [ERROR, { ignoreTypeReferences: true }],
    "@typescript-eslint/no-unused-expressions": [
      ERROR,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
        enforceForJSX: true,
      },
    ],
  };
}

function tsNamingConventionRule() {
  return {
    "@typescript-eslint/naming-convention": [
      ERROR,
      {
        selector: "default",
        format: ["strictCamelCase", "StrictPascalCase"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "import",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "variable",
        format: ["strictCamelCase", "UPPER_CASE", "StrictPascalCase"],
        modifiers: ["const"],
        types: ["boolean", "string", "number"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "has", "should", "can", "did", "will"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "variable",
        modifiers: ["destructured"],
        format: null,
      },
      {
        selector: "objectLiteralProperty",
        format: null,
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "parameter",
        format: ["strictCamelCase"],
        leadingUnderscore: "allow",
        trailingUnderscore: "forbid",
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "typeProperty",
        format: ["strictCamelCase", "UPPER_CASE"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "enumMember",
        format: ["strictCamelCase", "StrictPascalCase", "UPPER_CASE"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
    ],
  };
}

function importRules() {
  return {
    "no-restricted-imports": [
      ERROR,
      {
        patterns: [
          {
            group: [
              "app/*/**",
              "assets/*/*/**",
              "core/*/*/**",
              "modules/*/**",
              "features/*/**",
              "types/*/**",
              "@/app/*/**",
              "@/assets/*/*/**",
              "@/core/*/*/**",
              "@/modules/*/**",
              "@/features/*/**",
              "@/types/*/**",
            ],
            message: "Direct access to the internal parts of the module is prohibited",
          },
        ],
      },
    ],
  };
}

function sortRules() {
  return {
    "perfectionist/sort-enums": OFF,
    "perfectionist/sort-jsx-props": [
      WARN,
      {
        customGroups: {
          key: ["^key$", "^keys$"],
          id: ["^id$", "^name$", "^testId$", "^data-testid$", "^data-autotest$"],
          accessibility: ["^title$", "^alt$", "^placeholder$", "^label$", "^description$", "^fallback$"],
          callback: ["^on.+", "^handle.+"],
          className: ["^className$", "^class$", "^style$"],
          control: ["^asChild$", "^as$"],
          data: ["^data-*", "^aria-*"],
          ref: ["^ref$", "^innerRef$"],
          state: [
            "^value$",
            "^checked$",
            "^selected$",
            "^open$",
            "^defaultValue$",
            "^defaultChecked$",
            "^defaultOpen$",
            "^disabled$",
            "^required$",
            "^readOnly$",
            "^loading$",
            "^(is|has|should|can|did|will).+",
          ],
          variant: ["^variant$", "^size$", "^orientation$", "^color$"],
        },
        groups: [
          "id",
          "key",
          "ref",
          "control",
          "variant",
          "className",
          "state",
          "callback",
          "accessibility",
          "data",
          "unknown",
          "shorthand",
          "multiline",
        ],
        type: "natural",
      },
    ],
    "perfectionist/sort-imports": [
      ERROR,
      {
        type: "alphabetical",
        order: "asc",
        fallbackSort: { type: "unsorted" },
        ignoreCase: true,
        specialCharacters: "keep",
        internalPattern: ["^@/.+"],
        partitionByComment: false,
        partitionByNewLine: false,
        newlinesBetween: "always",
        maxLineLength: undefined,
        groups: [
          "react",
          ["builtin", "external", "type"],
          ["internal", "internal-type"],
          ["parent-type", "sibling-type", "index-type", "parent", "sibling", "index"],
          "side-effect",
          "style",
          "object",
          "unknown",
        ],
        customGroups: {
          value: {
            react: ["^react$", "^react-.+"],
          },
          type: {
            react: ["^react$", "^react-.+"],
          },
        },
        environment: "node",
      },
    ],
  };
}

function stylisticRules() {
  return {
    "@stylistic/spaced-comment": [
      ERROR,
      "always",
      {
        line: {
          markers: ["/"],
          exceptions: ["-", "+", "*"],
        },
        block: {
          balanced: true,
        },
      },
    ],
    "@stylistic/padding-line-between-statements": [
      ERROR,
      {
        blankLine: "always",
        prev: ["const", "let", "case", "default", "block", "block-like", "multiline-block-like", "interface", "type"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let"],
        next: ["const", "let"],
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["switch", "while", "try", "return", "if", "interface", "type"],
      },
    ],
    "@stylistic/jsx-pascal-case": ERROR,
    "@stylistic/jsx-sort-props": OFF,
  };
}
