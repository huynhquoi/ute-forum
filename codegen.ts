import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // schema: "https://kltn2024.onrender.com/graphql",
  schema: "https://forumnew-225d.onrender.com/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/types.ts": {
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
