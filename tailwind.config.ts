import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      dark: {
        colors: {
          primary: {
            DEFAULT: '#6e76c3',
            '100': '#e5e7f4',
            '200': '#d0d5ed',
            '300': '#b0b9e0',
            '400': '#8a95d0',
            '500': '#6e76c3',
            '600': '#5b5db5',
            '700': '#514fa2',
            '800': '#4a4687',
            '900': '#3e3c6c',
          },
          secondary: {
            DEFAULT: '#ee222b',
            '100': '#ffdfe0',
            '200': '#ffc5c8',
            '300': '#ff9da1',
            '400': '#ff646b',
            '500': '#ff343d',
            '600': '#ee222b',
            '700': '#c80d15',
            '800': '#a50f16',
            '900': '#881419',
          }
        }
      }
    }
  })]
} satisfies Config;
