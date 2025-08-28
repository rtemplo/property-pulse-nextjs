import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['Poppins', 'sans-serif']
      // },
      gridTemplateColumns: {
        '70/30': '70% 28%'
      }
    }
  },
  plugins: []
};

export default config;
