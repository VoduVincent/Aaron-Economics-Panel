/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],

  "paths": {
    "$components": [
        "src/components"
    ],
    "$components/*": [
        "src/components/*"
    ]
  },
}
