/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./**/*.{js,ts,jsx,tsx,mdx,json}",
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/helpers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        "1485": "1485px",
        "1310": "1310px",
        "850": "850px",
      },
      animation: {
        "bounce-slow": "bounce 3s linear infinite",
      },
      colors: {
        primary: {
          DEFAULT: "#3285E1",
          100: "#64A9F5",
        },
        dark: {
          DEFAULT: "#1C1C1C",
        },
        gray: {
          DEFAULT: "#585C65",
          100: "#9A9EA6",
        },
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "60px",
        "7xl": "72px",
        "8xl": "96px",
        "9xl": "128px",
        40: "40px",
      },
      fontWeight: {
        black: 900,
        "semi-bold": 800,
        bold: 700,
        "semi-medium": 600,
        medium: 500,
        regular: 400,
        light: 300,
      },
      lineHeight: {
        default: 1.5,
      },
      boxShadow: {
        myShadow1: "4.1px -5px 0 0 rgba(17, 24, 39, 0.5)",
        myShadow2: "-4.1px -5px 0 0 rgba(17, 24, 39, 0.5)",
      },
    },
  },
  corePlugins: {},
  plugins: [
    plugin(function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-gradient": (angle: any) => ({
            "background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          // values from config and defaults you wish to use most
          values: Object.assign(
            theme("bgGradientDeg", {}), // name of config key. Must be unique
            {
              178: "178deg",
              180: "180deg",
            }
          ),
        }
      );
    }),
    require("@tailwindcss/typography"),
  ],
};
