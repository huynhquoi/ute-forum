import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // schema: "https://kltn2024.onrender.com/graphql",
  schema: process.env.NEXT_PUBLIC_API_GRAPHQL,
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
