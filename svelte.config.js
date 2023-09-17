import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  vite: {
    server: {
      // Configure the server to serve files with the .db extension from the lib folder
      // This sets up a route that will serve .db files from the "lib" folder
      // You can specify other extensions or routes as needed.
      // Make sure to adjust the path to your project structure.
      serve: {
        '/lib': './lib/*.db',
      },
    },
  },
  preprocess: vitePreprocess()
};
export default config;