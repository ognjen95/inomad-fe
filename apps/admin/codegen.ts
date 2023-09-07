import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_BASE_API_URL,
  documents: ["src/**/.gql"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql-api/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "typescript-apollo-client-helpers",
        "named-operations-object",
      ],
      config: {
        withHooks: true,
        addDocBlocks: true,
        dedupeOperationSuffix: true,
        scalars: {
          DateTime: "Date",
          Date: "Date",
          Decimal: "number",
        },
      },
    },
    "gql-schema.json": {
      plugins: ["introspection"],
      config: {
        minify: true,
      },
    },
  },
};

export default config;
