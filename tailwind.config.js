/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary:       '#58CC02',
        'primary-dark':'#58A700',
        danger:        '#FF4B4B',
        gold:          '#FFD900',
        navy:          '#1CB0F6',
        'bull-green':  '#00C853',
        'bear-red':    '#FF3D00',
        surface:       '#F7F7F7',
        border:        '#E5E5E5',
      },
    },
  },
  plugins: [],
};
