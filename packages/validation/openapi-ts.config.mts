import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapi.json',
  output: {
    path: './src/api-gen',
  },
  plugins: [
    {
      name: 'zod',
      requests: true,
      responses: true,
      definitions: true,
    },
  ],
});
