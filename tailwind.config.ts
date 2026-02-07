import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          500: '#6dbc8d',
          600: '#5aa876',
        },
        secondary: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#ebe4d9',
        },
        emotion: {
          happy: '#ffd93d',
          okay: '#a0d8ef',
          tired: '#c9b8e6',
          anxious: '#ffb3ba',
          sad: '#bae1ff',
          angry: '#ffaaa5',
        },
      },
      fontSize: {
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
