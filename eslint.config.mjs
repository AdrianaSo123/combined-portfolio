import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "scaffold-tmp/**",
      "coverage/**",
    ],
  },
];

export default eslintConfig;
