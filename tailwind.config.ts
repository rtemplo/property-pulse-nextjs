// This config file is currently not being effectively used in
// the current installed versions of Next + TailwindCSS.
// We can bump the version in the future to see if it will be resolved

// In the meantime a workaround has been used for the grid layout
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%'
      }
    }
  },
  plugins: []
};

export default config;
