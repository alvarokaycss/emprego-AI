/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fundo: '#EEFAFB',
        superficie: '#FFED75',
        botao: '#FFFDEB',
        botao_hover: '#FBF6C8',
        texto: '#2F2E23',
        primaria: '#2F2E23',
        acento: '#55533B'
      }
    },
  },
  plugins: [],
}