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
          DEFAULT: '#F28B74',
          dark: '#E06B50',
          light: '#FBCFC3',
        },
        secondary: '#B8DDD1',
        background: '#FFFBF8',
        surface: '#FFF0EA',
        text: {
          primary: '#4A3832',
          secondary: '#A0887C',
        },
        border: '#F5EBE6',
        success: '#5BAA94',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        sans: ['Noto Sans KR', 'sans-serif'],
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
