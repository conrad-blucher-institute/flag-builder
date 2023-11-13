/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './Client/pages/index.html',
    './Client/src/index.ts',
    './ClientBuild/index.html',
    './ClientBuild/index.js'
  ],
  mode: 'jit',
  theme: {
    extend: {},
  },
  plugins: [],
}

