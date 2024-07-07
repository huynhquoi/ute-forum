import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // schema: "https://kltn2024.onrender.com/graphql",
  schema: "http://localhost:8081/graphql",
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
