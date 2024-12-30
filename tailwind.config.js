// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  // ...其他配置
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}", // 适用于 React/Vue/其他框架
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
